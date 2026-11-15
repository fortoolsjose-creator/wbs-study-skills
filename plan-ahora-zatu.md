# Plan de "ahora" para Zatu (Ola 0)

Alcance: lo que se hace **antes de tener clientes con dinero real**. Todo lo demás (alcance por propiedad activo, dashboard, comisión, WhatsApp entrante, workflows) queda fuera de este plan.

Este plan sale de la auditoría de `origin/main` (commit `d4a3c414`). Las rutas y líneas son de esa auditoría. Quien ejecute cada tarea debe **leer primero el código real** y confirmar que las líneas siguen vigentes antes de cambiar nada.

Esfuerzo: **S** días, **M** 1 a 3 semanas.

---

## 0. Reglas para el Claude que ejecuta (pegar al inicio)

1. Una tarea por rama y por pull request. No mezclar tareas.
2. Antes de editar, lee los archivos citados y resume en tres líneas qué encontraste. Si el código no coincide con la descripción, detente y repórtalo.
3. Escribe primero la prueba que falla y después el cambio.
4. Las migraciones son archivos nuevos `AAAAMMDDhhmmss_nombre.sql` posteriores a `20261113000004`, idempotentes (`if not exists`, `create or replace`). Después corre `npm run schema` para regenerar `schema.sql`. No edites `schema.sql` a mano.
5. **No apliques nada a ninguna base.** Entrega el SQL listo para pegar y el comando de revisión.
6. Respeta las reglas internas del proyecto (Regla 2 del motor fiscal, Regla 3 de vista previa, Regla 6 de lecturas con `consulta.ts`).
7. Cada pull request termina con: `npm test`, `tsc --noEmit` y `lint` en verde, y una nota con qué se probó y qué no.
8. No cambies comportamiento fuera de la tarea. Si ves otro problema, lo anotas en una lista aparte.

---

## 1. Orden de ejecución

| Lote | Tareas | Por qué en este orden |
|---|---|---|
| **1. Rápidos y seguros** | A1, A2, A3, A4, A5, A6 | Cierran fallas conocidas con poco código |
| **2. Cimientos** | B1, B2, B3, C1 | El control de migraciones va primero. El abono transaccional y las columnas de abono se hacen juntos porque tocan las mismas tablas |
| **3. Esquema** | B4, B5, B6, B7, B8, B9 | Cambios que hoy cuestan una migración y con clientes costarían semanas |
| **4. Red de seguridad** | D1, D2, D3 | Las pruebas de dinero protegen todo lo anterior. Se escriben en paralelo desde el lote 2 y se cierran aquí |
| **Acciones manuales** | M1 a M3 | No son código, pero bloquean cobrar |

---

## 2. Lote 1 · Rápidos y seguros

### A1 · 2FA obligatorio para superadmin (S)

- **Problema:** `necesitaCodigo` solo exige código si la cuenta ya tiene factores (`src/app/_lib/dos-pasos.ts:75-77`) y `isSuperadmin` hereda esa regla (`superadmin.ts:28`). Con solo la contraseña de una cuenta de `SUPERADMIN_EMAILS` se pueden borrar organizaciones (`alta/borrar/actions.ts:55-66`).
- **Cambio:**
  1. `isSuperadmin` devuelve verdadero solo si el correo está en `SUPERADMIN_EMAILS` **y** la sesión es `aal2`.
  2. Si es superadmin sin factor registrado, redirigir a registrarlo antes de entrar a `/alta`.
  3. Las acciones destructivas (`borrarOrganizacion`, regenerar enlace del dueño en `alta/actions.ts:220`) piden `aal2` reciente.
- **Pruebas:** superadmin sin factor no entra a `/alta`; con `aal1` no ejecuta `borrarOrganizacion`; con `aal2` sí.
- **Aceptación:** ninguna acción de `/alta` corre con `aal1`.

### A2 · Correo de cobranza sin duplicados y cron sin doble corrida (S a M)

- **Problema:** los recordatorios por correo no tienen registro anti-duplicado (`reminders/cobranza.ts:251-256`) y el cron diario no tiene candado (`api/cron/reminders/route.ts:61-200`).
- **Cambio:**
  1. Para correo, reutilizar el patrón de WhatsApp: una `clave_envio` única en `notificacion_envios` (por ejemplo `org|contrato|mes|etapa|canal`). Si la clave existe, no se envía. La clave se inserta antes de enviar y se marca el resultado después.
  2. Candado del cron: `pg_try_advisory_lock` o una fila única en `cron_runs` por `(job, fecha)` con `insert … on conflict do nothing`. Si no obtiene el candado, responde 200 con `{saltado: true}`.
- **Pruebas:** dos invocaciones seguidas del cron el mismo día producen un solo correo por arrendatario y etapa; dos invocaciones en paralelo ejecutan los barridos una sola vez.
- **Aceptación:** el cron es idempotente por día. Se documenta cómo forzar una repetición con motivo.

### A3 · Compensación de gasto con error revisado (S)

- **Problema:** `autorizaciones/actions.ts:273,277` borra un gasto de compensación sin revisar el error. Si el borrado falla, queda un gasto duplicado.
- **Cambio:** mover el par "crear gasto y marcar solicitud resuelta" (y su compensación) a una función SQL transaccional. Si no se puede en este lote, como mínimo revisar el error con `escrituraAfecto` y devolver el error al usuario.
- **Pruebas:** simular fallo en el segundo paso y verificar que no queda gasto huérfano ni solicitud en estado inconsistente.
- **Aceptación:** no existe camino que deje un gasto sin su solicitud o al revés.

### A4 · Tope de IA por organización y precios en un solo lugar (S)

- **Problema:** el tope diario existe solo en mantenimiento (`MANTENIMIENTO_IA_TOPE_USD_DIA`, `orden-mantenimiento.ts:75-90`). Contrato (Opus, 32,000 tokens de salida), comprobante, Excel y machote no tienen tope. La tabla de precios está a mano y no incluye `claude-haiku-5-5`.
- **Cambio:**
  1. Un módulo único `ia-costo.ts` con precios por modelo (incluye haiku y un modelo desconocido con precio alto) y una función `reservarCupo(org, usoEstimado)` que consulta lo gastado hoy en `ordenes_mantenimiento_ia`, `lecturas_contrato`, `lecturas_comprobante` y las tablas de los otros usos.
  2. Tope diario por organización configurable (`IA_TOPE_USD_DIA` global y sobrescribible por organización).
  3. Todos los usos llaman `reservarCupo` antes de invocar al modelo y registran tokens y costo después.
  4. Si falta el cupo, mensaje honesto al usuario y no se llama a la API.
- **Pruebas:** al superar el tope, ningún uso llama a la API; los costos se suman por organización y día; modelo desconocido se cobra con el precio alto.
- **Aceptación:** los cinco usos de IA respetan el tope y registran costo.

### A5 · Candado de mes cerrado en disparadores de dinero (S a M)

- **Problema:** el candado vive en la app y en las RPC (`schema.sql:10914-10922, 13184, 11318`). Una escritura directa con el cliente de sesión que no lo revise puede mover dinero de un mes cerrado.
- **Cambio:** función `mes_cerrado(org, fecha)` y disparadores `before insert or update or delete` en `payments`, `payment_allocations`, `maintenance_fees`, `maintenance_fee_allocations`, `expenses` y `expense_allocations`. Rechazan cambios cuyo mes (o fecha del abono) esté en `period_locks`. Excepción: la función de reapertura del dueño o la designada.
- **Pruebas** (pg-local): insertar, editar y borrar en un mes cerrado falla por cada tabla; en un mes abierto funciona; el dueño reabre y puede escribir.
- **Aceptación:** ninguna ruta de código mueve dinero de un mes cerrado, incluidas escrituras directas.

### A6 · Limpiezas pequeñas (S)

- Corregir el comentario obsoleto de `fiscal.ts:9-16` que menciona `desgloseFiscal` ya inexistente.
- Unificar "vencido": una función `estaVencido(cargo, hoy)` que cuente también `partial` con fecha pasada. `marcarVencidos` y los filtros por estado la usan.
- Pasar `bancos` y demás constantes sueltas a un solo lugar si se duplican (solo si aparecen en la lectura).
- **Aceptación:** una prueba que cubre `pending`, `partial` y `paid` vencidos y no vencidos.

---

## 3. Lote 2 · Cimientos

### B1 · Control de migraciones (M)

- **Problema:** las migraciones se pegan a mano en dos bases y no hay tabla de migraciones aplicadas. Existe SQL suelto: `supabase/APLICAR-no-es-renta-banco.sql` ("NO se ha corrido en ninguna base").
- **Cambio:**
  1. Migración que crea `schema_migrations (version text primary key, aplicada_en timestamptz default now(), checksum text)`.
  2. Script `tools/aplica-migraciones.mjs` que recibe una URL de base, lista lo pendiente, aplica en orden dentro de transacción y registra la versión.
  3. Backfill: marcar las 154 migraciones existentes como aplicadas en bases ya al día.
  4. Mover el contenido de `APLICAR-no-es-renta-banco.sql` a una migración numerada. Agregar `no_es_renta` al esquema.
  5. CI: una prueba que falla si hay SQL fuera de `supabase/migrations/`.
  6. Un chequeo que compare `schema_migrations` contra los archivos y reporte diferencias. Sustituye a `chequeo-esquema/1-revisar.sql`.
- **Pruebas:** aplicar a una base vacía de pg-local deja el mismo esquema que `schema.sql`; reaplicar no cambia nada.
- **Aceptación:** una base nueva se levanta con un solo comando y `salud` informa la versión de esquema.

### B2 · `payment_allocations.monto` con escala (S)

- **Cambio:** migración `alter column monto type numeric(12,2)` con redondeo previo, más una restricción `monto <> 0`. Revisar que `registrar_pago_contrato` y los disparadores guardia sigan cuadrando.
- **Pruebas:** abonos con 3 decimales entran redondeados; las pruebas de reparto en centavos siguen en verde.

### B3 · Origen y referencia externa en los abonos (S)

- **Cambio:** en `payment_allocations` y `maintenance_fee_allocations`:
  - `origen text not null default 'manual' check (origen in ('manual','spei_clabe','tarjeta','oxxo','whatsapp','importacion','conciliacion'))`;
  - `referencia_externa text` con índice único `(org_id, origen, referencia_externa) where referencia_externa is not null`.
- **Uso:** hoy todo es `manual` o `importacion`. Queda lista la idempotencia para cualquier fuente futura.
- **Pruebas:** dos abonos con la misma referencia externa y origen fallan; abonos manuales sin referencia no chocan.

### C1 · Abono sencillo como RPC transaccional (M)

- **Problema:** `aplicaAbono` hace dos escrituras no atómicas y guarda el desglose fiscal del abono en modo *best-effort* (`src/app/_lib/aplica-abono.ts:73-161`). Lo usan `confirmPayment` (`cobros/actions.ts:437`), la importación de históricos y el finiquito.
- **Cambio:**
  1. Función SQL `aplicar_abono(p_cargo, p_monto, p_fecha, p_metodo, p_referencia, p_origen, p_submit_id, p_desglose jsonb, …)` con el mismo patrón de `registrar_pago_contrato`: `security invoker`, candado por `submit_id`, claim del "pagado antes", verificación de mes cerrado, inserción del abono con su desglose y actualización del cargo en una sola transacción. Devuelve `{duplicado:true}` si el `submit_id` ya existe.
  2. El desglose lo sigue calculando la app (`calculaAbono`, `cargo-fiscal.ts:543`) y lo pasa como parámetro. Si el desglose falla, la operación falla completa.
  3. `aplica-abono.ts` y `aplica-abono-cuota.ts` pasan a ser envoltorios de la RPC. Se eliminan las escrituras sueltas.
- **Pruebas** (pg-local): abono completo, parcial y excedente; reintento con el mismo `submit_id`; dos llamadas en paralelo sobre el mismo cargo; fallo a mitad (se fuerza una excepción) deja todo sin cambios; mes cerrado rechaza.
- **Aceptación:** ningún camino inserta un abono sin actualizar el cargo en la misma transacción. El vigilante de cuadre no reporta hallazgos nuevos tras correr las pruebas.

---

## 4. Lote 3 · Cambios de esquema

Cada uno incluye migración, ajuste de RLS, actualización de lecturas y pruebas. Como no hay datos reales, se puede reemplazar la columna vieja una vez migrado el código.

### B4 · Varios arrendatarios por contrato (M)

- **Hoy:** `leases.tenant_profile_id` único.
- **Cambio:** tabla `lease_tenants (org_id, lease_id, profile_id, rol, es_titular, created_at)` con `rol in ('titular','conyuge','obligado_solidario','aval','ocupante')` y un único titular por contrato (índice parcial). Backfill desde `tenant_profile_id`. Actualizar RLS del portal para que el arrendatario vea los contratos donde figura. Las lecturas de saldo, avisos, ofertas de renovación y estado de cuenta usan el titular por defecto y permiten ver a todos. Retirar `tenant_profile_id` al final del lote o dejarlo como columna derivada con disparador.
- **Pruebas:** un contrato con titular y aval; el aval ve el contrato en su portal solo si se le da acceso; los avisos de cobro van al titular; el aislamiento entre organizaciones se mantiene.

### B5 · Porcentaje de propiedad por dueño (S a M)

- **Cambio:** tabla `property_owners (org_id, property_id, entity_id, porcentaje numeric(5,2))` con disparador que impide que la suma por propiedad pase de 100. Backfill: 100 % a la sociedad actual de `properties.entity_id`. Las lecturas de estado del dueño siguen funcionando con el valor derivado.
- **Pruebas:** dos dueños 60/40; no se permite 60/50; el estado por sociedad reparte según el porcentaje.

### B6 · Estructura de alcance por propiedad (S)

- **Alcance de este lote:** solo la estructura. Las políticas RLS que la usan llegan en la Ola 1.
- **Cambio:** tabla `user_properties (org_id, profile_id, property_id)` y función `puede_ver_propiedad(p_property_id uuid)` que devuelve verdadero si el usuario es dueño, o no tiene filas (ve todo, compatibilidad), o tiene una fila para esa propiedad. La función queda probada y sin políticas conectadas.
- **Pruebas:** casos de dueño, equipo sin filas, equipo con filas, otra organización.

### B7 · Movimientos del depósito en garantía (M)

- **Cambio:** tabla `deposit_movements (org_id, lease_id, tipo, monto, fecha, nota, created_by)` con `tipo in ('recibido','aplicado','devuelto','retenido','heredado')`. Backfill desde `deposit_paid`, `deposit_amount`, `deposito_devuelto`, `deposit_discount` y `deposito_heredado`. Una vista calcula el saldo del depósito por contrato. `depositoEnMano` (`oferta-renovacion.ts:226`) lee la vista. Las columnas actuales quedan como derivadas hasta retirarlas.
- **Pruebas:** recibir, aplicar a mora, devolver parcial; el saldo cuadra con los movimientos; la regla del vigilante "Depósito contado dos veces" sigue pasando.

### B8 · Conciliación muchos a muchos (M)

- **Cambio:** tabla `bank_transaction_matches (org_id, bank_transaction_id, payment_id, allocation_id, monto)`. Backfill desde `matched_payment_id`. La pantalla de conciliación permite casar un depósito contra varios cargos y un cargo contra varios depósitos, y exige que la suma de los vínculos no exceda el monto del depósito. `matched_payment_id` queda como columna derivada.
- **Pruebas:** un depósito cubre renta y cuota; tolerancia de $2; no se casa un depósito de monto ≤ 0; no se duplica un vínculo.

### B9 · Notas polimórficas (S)

- **Cambio:** tabla `notas (org_id, resource_type, resource_id, body, created_by, created_at)` con índice por recurso. Migrar `payment_notas` y `lease_notas`. Las pantallas leen de la nueva tabla. Se retiran las tablas viejas al final.
- **Pruebas:** nota por cargo, por contrato y por propiedad; RLS por organización; auditoría activa en `notas`.

---

## 5. Lote 4 · Red de seguridad

### D1 · Pruebas de comportamiento del dinero contra Postgres local (M)

Sobre `tools/pg-local/*`, escribir pruebas que ejecuten SQL real (no lectura de código fuente) para:

- `registrar_pago_contrato`: pago completo, parcial, con mora, lote duplicado, dos llamadas simultáneas con el mismo lote, claim con `pagado_antes` desfasado, mes cerrado.
- `aplicar_abono` (C1): las mismas variantes.
- Cálculo de mora en sus cinco tipos, gracia, tope y escalonada, sin cobro doble entre cargas.
- Cierre y reapertura de mes (A5).
- Disparadores guardia de `payments` y `payment_allocations`.
- Cargos recurrentes: dos corridas el mismo mes no duplican.
- **Aceptación:** la suite corre en CI y bloquea el merge si falla.

### D2 · Barrido automático de `org_id` en el cliente de servicio (M)

- **Problema:** `createAdminClient` aparece en 106 archivos y salta RLS. El aislamiento depende de filtros escritos a mano.
- **Cambio:** una prueba que recorra esos archivos, detecte consultas `.from('tabla')` hechas con el cliente de servicio y exija un filtro por organización o por un identificador ya validado, o una entrada en una lista de excepciones revisadas con motivo. La prueba falla si aparece un uso nuevo sin filtro ni excepción.
- **Aceptación:** la lista de excepciones queda en el repositorio y cada una lleva fecha y motivo.

### D3 · Prueba de aislamiento entre organizaciones en CI (S a M)

Llevar `tools/pg-local/dos-organizaciones/corre.sh` a un flujo de CI y ampliarlo con las tablas nuevas (`lease_tenants`, `property_owners`, `user_properties`, `deposit_movements`, `bank_transaction_matches`, `notas`): cada rol de una organización no puede leer ni escribir datos de otra.

---

## 6. Acciones manuales (no son código)

| # | Acción | Quién | Por qué |
|---|---|---|---|
| M1 | Pasar Vercel a un plan comercial | Tú | El plan Hobby no es para uso comercial (comentario en `avisos-programados/route.ts:14-18`) |
| M2 | Cerrar los cinco marcadores "Pendiente" de los términos (sociedad, RFC, domicilio, cobro y cancelación, ley aplicable) | Tú con un abogado | `src/app/(public)/terminos/page.tsx:45-47,109,124`. No se puede cobrar con ellos abiertos |
| M3 | Activar respaldo con recuperación a un punto en el tiempo en Supabase **[por validar plan y costo]** y definir retención de `audit_log` y `errores_app` | Tú | Hoy el respaldo es semanal |

---

## 7. Tareas opcionales si queda tiempo en esta ola

- **CSP con `script-src` y nonces** (S a M). Hoy solo tiene `frame-ancestors 'none'` (`next.config.ts:15-38`).
- **Verificador del enmascarado de datos sensibles** (INE, buró) que hoy está escrito en `docs/reglas-screening.md:9-15` sin verificador (S).
- **Cuatro reglas ocultas con lector** que son baratas porque el diseño ya existe: `reparto_abonos` (dos opciones "sin efecto"), `aprobacion_quien` y `aprobacion_monto_minimo`, `avisos_cobro_cadencia` (S cada una). Entran aquí solo si ya están cerradas las tareas anteriores. Si no, pasan a la Ola 1.

---

## 8. Criterio de cierre de la Ola 0

La ola está terminada cuando se cumple todo esto:

1. Ninguna ruta de código mueve dinero fuera de una transacción atómica.
2. Un mes cerrado no admite escrituras de dinero por ningún camino.
3. El cron y los recordatorios son idempotentes por día.
4. Todas las migraciones están numeradas, registradas en `schema_migrations` y aplicables con un solo comando.
5. Los diez cambios de esquema de este plan están aplicados en pg-local y cubiertos por pruebas.
6. Los cinco usos de IA respetan un tope por organización.
7. Las cuentas de superadmin exigen `aal2`.
8. La suite de pruebas de dinero contra Postgres corre en CI.
9. M1 y M2 están hechas.

---

## 9. Supuestos que hice

Tus cuatro preguntas pendientes no bloquean la Ola 0, así que asumí lo siguiente:

- **Cobro en línea:** se deja lista la base (`origen` y `referencia_externa`) sin decidir procesador.
- **Administrador del dueño:** la estructura de alcance por propiedad (B6) y el porcentaje por dueño (B5) sirven en cualquier caso.
- **Clientes comerciales:** no se toca nada de CAM.
- **Sistema contable del contador:** se decide en la Ola 2, cuando se haga la exportación de pólizas.
