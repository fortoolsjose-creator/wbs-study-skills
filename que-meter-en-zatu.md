# Qué meter en Zatu del análisis del producto de referencia

Este documento filtra todo lo investigado con lo que me dijiste de Zatu:

- Los clientes son **propietarios directos** o **propietarios que tienen administrador**.
- **No hay dinero real en producción** todavía.
- **La facturación la hace el contador o el propio cliente.** Zatu no entra a facturar.
- La pregunta es qué capacidades del producto de referencia conviene traer a Zatu.

Tags: **[visto]** lo leí en documentación pública del producto de referencia; **[auditoría]** viene de la auditoría de Zatu; **[supuesto]** es mi hipótesis. Esfuerzo: **S** días, **M** 1 a 3 semanas, **L** más de un mes.

---

## 1. Qué cambia en mi plan con tus respuestas

| Antes recomendé | Ahora |
|---|---|
| Integrar un PAC y timbrar CFDI | **Se cae.** Zatu sigue leyendo y validando facturas y complementos pendientes. El valor está en dejar al contador el paquete completo y ordenado |
| Construir catálogo de cuentas y partida doble | **Se baja de prioridad** (ver sección 5) |
| Comisión y distribuciones como feature de administrador | **Se reorienta.** El cliente es el dueño, y el administrador es alguien a quien el dueño vigila. La comisión y las distribuciones se construyen desde el lado del dueño: verificar, registrar y aprobar |
| Endurecer lo antes posible por riesgo de dinero | **Sigue siendo prioridad,** pero sin presión de migrar datos reales. Es la mejor ventana para cambiar el esquema |

**Sobre mi pregunta de "dinero real en producción":** me refería a si ya hay clientes usando Zatu con cobros y datos reales. Con tu respuesta, las migraciones y los refactors de dinero no tienen costo de datos. Cualquier cambio de esquema que hoy cuesta días, con clientes cuesta semanas y riesgo. Esa es la razón de la sección 4.

---

## 2. Respuesta corta: las 12 cosas que meter, en orden

| # | Qué meter | De dónde sale | Para quién | Esfuerzo |
|---|---|---|---|---|
| 1 | **Alcance por propiedad** para usuarios (el administrador de la casa A no ve la casa B) | Los usuarios del producto de referencia pueden limitarse a propiedades [visto] | Dueño con varios administradores | M |
| 2 | **Aprobación del dueño por monto** en gastos y órdenes de trabajo | Campo de aprobación del dueño en la orden de trabajo [visto]. En Zatu las reglas `aprobacion_quien` y `aprobacion_monto_minimo` ya existen, ocultas y sin lector [auditoría] | Dueño con administrador | S a M |
| 3 | **Bandeja de WhatsApp entrante** con la IA leyendo el comprobante y proponiendo el abono | Centro de comunicación unificado [visto]. Zatu ya tiene la lectura de comprobantes y el webhook que hoy ignora mensajes entrantes [auditoría] | Todos | M |
| 4 | **Dashboard de cobranza con acciones** | Métricas con botón de acción: recordatorio, reenviar invitación, avisar [visto] | Todos | S a M |
| 5 | **Reglas de asignación de pagos reales** (más antiguo primero, renta antes de cuotas y mora) | Regla por defecto y prioridad por categoría [visto]. En Zatu dos opciones dicen "(sin efecto)" [auditoría] | Todos | S |
| 6 | **Cierre de mes con dependencias** | Orden de operaciones del ciclo mensual [visto] | Todos y el contador | M |
| 7 | **Estado del dueño automático** cada mes, con aprobación previa | El producto de referencia lo envía a mano cada mes [visto]; ahí hay una oportunidad de ganar | Dueño con administrador | S a M |
| 8 | **Motor de comisión en modo verificador** | Tipos de comisión, mínimo, categorías retenidas y simulador [visto] | Dueño con administrador | M |
| 9 | **Distribución recibida y aportaciones** | Asistente de distribución y contribuciones [visto] | Dueño con administrador | M |
| 10 | **Reportes baratos que hoy faltan** | Catálogo de reportes [visto] | El contador | S cada uno |
| 11 | **Workflows con plantillas** | Trigger, pasos, esperas, corridas [visto] | Todos | L |
| 12 | **Migración asistida de datos** como parte del producto | Equipo de migración desde Excel [visto]. Zatu ya tiene mapeo de Excel con IA [auditoría] | Todos | M |

Las secciones siguientes explican cada uno.

---

## 3. Detalle de lo que meter

### 3.1 Alcance por propiedad (1)

**Situación:** hoy el equipo ve toda la organización. Solo el dueño externo está acotado por sociedad [auditoría].

**Por qué importa en tu caso:** un dueño con tres propiedades y dos administradores necesita darle a cada uno acceso solo a lo suyo. Es la primera pregunta de seguridad que hace ese cliente.

**Cómo encajaría:** tabla `user_properties (profile_id, property_id)` con RLS que combine el rol con la lista. Los roles que ya existen (`staff`, `accountant`) se acotan con la tabla. Un usuario sin filas ve todo (compatibilidad con lo actual). Acompaña con la vista "probar como este rol" que usa el producto de referencia para detectar huecos en la matriz de permisos [visto].

**Dependencia:** conviene hacerlo antes de que existan clientes, porque toca políticas RLS de casi todas las tablas.

### 3.2 Aprobación del dueño por monto (2)

**Situación:** toda solicitud de pago pide autorización, sin importar el monto, y solo la resuelve el dueño [auditoría, reglas 5 y 6 ocultas].

**Propuesta:** activar esas dos reglas. Ejemplo: gastos menores de $2,000 los autoriza el administrador, hasta $10,000 el dueño o su designado, y arriba de eso dos firmas. Registra quién aprobó y cuándo. Esto cubre el "aprobado por el dueño" que el producto de referencia guarda en la orden de trabajo [visto].

**Valor:** da tranquilidad al dueño que delega.

### 3.3 Bandeja de WhatsApp entrante + IA de comprobantes (3)

**Situación:** el webhook solo procesa estados de entrega y descarta mensajes entrantes. La lectura de comprobantes con IA existe [auditoría].

**Flujo propuesto:**
1. El arrendatario manda por WhatsApp la foto del comprobante.
2. La bandeja lo asocia a la persona por su número (+52).
3. La IA lee monto, fecha, banco y clave de rastreo, y propone el abono.
4. Una persona confirma con un clic. Queda registro de lo que propuso la IA y de quién aprobó.

**Por qué es el mejor candidato de la lista:** reutiliza dos piezas que Zatu ya tiene (webhook y lectura de comprobantes), resuelve el hábito real de cobro en México y deja la base para la recepcionista de IA y las solicitudes de mantenimiento por chat.

**Cuidados:** consentimiento (`whatsapp_opt_in`), ventana de 24 horas de WhatsApp para responder libremente, y el límite de tasa de la API **[por validar]**.

### 3.4 Dashboard de cobranza con acciones (4)

El producto de referencia muestra tasa de cobro, saldo pendiente, tiempo promedio de cobro, contratos vencidos, pagos automáticos contra manuales, invitados que nunca entraron al portal, y la lista de quienes pagan fuera del portal [visto]. Cada tarjeta lleva una acción.

**En Zatu:** ya existen el corte de cobranza, el "cubo del dinero" y los recordatorios [auditoría]. Falta unirlos en una pantalla con acciones por tarjeta: recordatorio por WhatsApp, reenviar invitación al portal, ver ficha de pago. Si algún día hay cobro en línea, se suma el porcentaje en autopago.

### 3.5 Reglas de asignación de pagos (5)

Las opciones `mas_viejo_primero` y `renta_antes_cuotas_mora` están marcadas "sin efecto" [auditoría]. Hay que implementarlas en la función que arma el reparto precargado del diálogo de pago, y en la RPC `registrar_pago_contrato` cuando el reparto llega vacío. El producto de referencia usa "más antiguo primero" como default, con prioridad por categoría configurable a nivel de empresa, propiedad y contrato [visto]. Zatu ya tiene la jerarquía de reglas por organización y contrato, así que solo falta el comportamiento.

### 3.6 Cierre de mes con dependencias (6)

**Situación:** 15 pasos "de guía" sin orden ni bloqueos, y "no hace falta palomear la lista para cerrar" [auditoría].

**Propuesta:** convertir los pasos que se pueden calcular solos en pasos con estado automático:

| Paso | Cómo se calcula |
|---|---|
| Todos los cobros del mes registrados | Cargos sin abono ni cancelación a la fecha de corte |
| Conciliación al día | Depósitos del banco sin casar |
| Gastos del mes capturados | Gastos recurrentes generados y solicitudes de pago resueltas |
| Facturas pendientes | Cargos con `fiscal_status = pendiente` |
| Vigilante en verde | Hallazgos abiertos del vigilante de cuadre |
| Paquete del contador listo | Generable |

Los pasos que dependen de una persona se quedan manuales. El cierre bloquea solo cuando falla un requisito calculable, y el dueño puede forzar con motivo registrado. Para quien trabaja con un contador, esta pantalla es el entregable más claro que le puedes dar.

### 3.7 Estado del dueño automático (7)

El producto de referencia no manda el statement solo; lo deja a mano cada mes [visto]. En Zatu existen la cascada mensual y los estados por sociedad [auditoría].

**Propuesta:** envío programado el día X de cada mes por correo y WhatsApp, con un paso previo de aprobación del administrador o del dueño. PDF con el logo de la organización. Registro de quién lo recibió y si lo abrió.

### 3.8 Motor de comisión en modo verificador (8)

**Cómo funciona en el producto de referencia** [visto]: tres tipos (porcentaje de lo cobrado, porcentaje de lo cargado, fija), una comisión mínima, categorías de ingreso que el administrador se queda al 100 %, cálculo por propiedad con configuración por empresa y un simulador con valores de ejemplo.

**Cómo usarlo en tu caso:** el dueño con administrador configura el contrato con su administrador (porcentaje, mínimo, qué se queda el administrador). Zatu calcula cuánto debió cobrar el administrador cada mes con los datos de cobros que el dueño ve. Si el administrador lo reporta distinto, Zatu muestra la diferencia.

**Valor:** transparencia. Es una promesa de venta concreta para ese cliente.

**Si el administrador también usa Zatu:** el mismo motor sirve para que cobre su comisión. Un solo componente, dos usos.

### 3.9 Distribución recibida y aportaciones (9)

El producto de referencia calcula el efectivo distribuible como **caja, menos no depositado, menos depósitos de garantía, menos reservas** [visto]. Para el dueño que recibe:

- Registrar "distribución recibida" (fecha, monto, método) y casarla con el depósito del banco.
- Mostrar el **efectivo distribuible esperado** y compararlo con lo que recibió. La diferencia es el primer indicio de un problema.
- Registrar **aportaciones** que el dueño hizo al administrador (para reparaciones o reservas) con su comprobante.

### 3.10 Reportes baratos que hoy faltan (10)

Comparé el catálogo del producto de referencia con lo que tiene Zatu [auditoría]. Estos son los candidatos baratos y útiles para el contador:

| Reporte | Qué responde | Fuente de datos que ya tienes |
|---|---|---|
| Antigüedad de cuentas por pagar | Qué se debe a proveedores y desde cuándo | `payment_requests`, `expenses`, `providers` |
| Transacciones por proveedor | Cuánto se pagó a cada proveedor, con retenciones | `expenses`, `providers` |
| Efectivo en mano | Efectivo recibido y no depositado, por persona y propiedad | `folios_efectivo`, fuente `efectivo_rentas` |
| Cumplimiento de pólizas y seguros | Qué pólizas vencen y de quién | Datos de póliza en `leases` y la alarma de pólizas |
| Cargos y créditos recurrentes | Qué cuotas se generan cada mes y cuánto suman | `lease_fees`, `maintenance_fees` |
| Cobros devueltos o anulados | Abonos cancelados con motivo | `payment_allocations` con `deleted_at` |
| Reporte de propiedad por dueño | Qué sociedad posee qué | `legal_entities`, `properties` |

Cada uno es una consulta más una hoja de Excel. Alimentan el paquete del contador.

### 3.11 Workflows con plantillas (11)

El modelo del producto de referencia: **trigger**, **pasos** (crear tarea, correo, SMS, espera), **corrida** registrada y una pestaña de actividad [visto]. Plantillas de arranque: bienvenida, aviso de pago vencido, renovación a 90 días.

**Atajo en Zatu:** los 19 barridos fijos y las reglas ocultas ya cubren la mitad. Antes de construir un motor, cierra las reglas ocultas del `reglas.ts` (cadencia de avisos, incremento anual en lote, mora en lote con aprobación, prorrateo de salida) [auditoría]. Son plantillas disfrazadas: el producto ya sabe qué hacer y falta el lector. El motor configurable llega después.

### 3.12 Migración asistida (12)

El producto de referencia vende "equipo de migración que importa desde Excel u otro software" [visto]. Zatu ya tiene mapeo de Excel con IA y carga de históricos [auditoría]. Falta empaquetarlo como un asistente guiado de alta: descargar plantilla, subir, ver vista previa de lo que se creará (propiedades, unidades, contratos, saldos de apertura) y confirmar. Baja la barrera de entrada y es una ventaja de venta real.

---

## 4. Cambios de esquema que hoy son baratos

Sin datos reales, estos cambios se hacen con una migración y sin plan de conversión. Con clientes, cada uno exige scripts, pruebas y ventana de mantenimiento.

| Cambio | Por qué | De dónde sale |
|---|---|---|
| **Varios arrendatarios por contrato** (`lease_tenants`) | Hoy un contrato admite uno (`tenant_profile_id`). En México es común tener titular, cónyuge, obligado solidario o aval | El producto de referencia usa una tabla de unión entre contrato y personas [visto] |
| **Porcentaje de propiedad por dueño** (`property_owners`) | Hoy solo existe el reparto de gastos entre sociedades | Propiedades con propietarios y porcentaje [visto] |
| **Alcance por propiedad** (`user_properties`) | Ver sección 3.1 | [visto] |
| **Movimientos del depósito en garantía** | Hoy son banderas; el depósito no cuadra contra el banco | [supuesto] |
| **Conciliación muchos a muchos** (`bank_transaction_matches`) | Un depósito puede cubrir renta y cuota, o varios meses | [auditoría] |
| **Origen y referencia externa en los abonos** (`origen`, `referencia_externa` única) | Prepara cualquier fuente futura (WhatsApp, SPEI, tarjeta) y da idempotencia | [supuesto] |
| **Notas polimórficas** | Hoy hay notas 1 a 1 por tabla; el producto de referencia vincula notas a casi cualquier entidad | [visto] |
| **`payment_allocations.monto` a `numeric(12,2)`** | Hoy no tiene escala | [auditoría] |
| **Tabla de migraciones aplicadas y SQL suelto dentro de la secuencia** | Hoy se pegan a mano en dos bases | [auditoría] |
| **Abono sencillo como RPC transaccional** | Hoy son dos escrituras separadas | [auditoría] |

Mi recomendación es hacer estos diez antes de abrir el producto a clientes con dinero real.

---

## 5. Sobre la "doble contabilidad" (partida doble)

**Mi recomendación: no la construyas ahora.**

**Razones:**
1. El contador lleva la contabilidad. Zatu le entrega los datos.
2. Zatu no factura, así que no necesita el ciclo completo de ingresos contables.
3. Es una obra grande (L) con riesgo alto. Un error en el libro mayor erosiona la confianza que hoy sostiene el motor fiscal.
4. La partida doble del producto de referencia existe porque sus clientes administradores manejan dinero de terceros, con balance, mayor y conciliación formales. Tu cliente es un dueño.

**Qué hacer en su lugar (S a M):**
1. **Mapa de cuentas ligero.** Cada categoría de gasto y cada concepto de ingreso con un código de cuenta (editable). Sin asientos.
2. **Exportación de pólizas en formato de importación** para el sistema contable que use el contador. Una hoja con fecha, cuenta, cargo, abono y referencia por cada movimiento.
3. **Depósito en garantía** como tabla de movimientos (ver sección 4).
4. Reevaluar la partida doble cuando un cliente la pida por escrito.

Con eso el contador recibe un archivo que importa directo, y tú evitas construir un libro mayor.

---

## 6. Qué no meter

| Capacidad del producto de referencia | Por qué se queda fuera |
|---|---|
| Formularios 1099, ACH, programas de vivienda de EE. UU. | No aplican en México |
| Screening en dos fases por jurisdicción de EE. UU. | La ley que lo motiva no existe aquí. El principio sí aplica: cumplimiento legal dentro del flujo. Implementa el verificador de enmascarado de datos sensibles que hoy está escrito sin verificar [auditoría] |
| Timbrado de CFDI | Dijiste que no entran a facturación |
| Teléfono de negocio con grabación y transcripción | Costo y complejidad altos para el tamaño del cliente. WhatsApp cubre el canal |
| Reconciliación CAM | Solo si hay clientes de plazas comerciales. La plantilla `plaza_comercial` ya existe; espera una petición concreta |
| Módulo de asociaciones de propietarios (HOA) | Fuera de tu perfil actual |
| Agentes de IA de alto riesgo (mantenimiento y renovaciones autónomos) | Primero hay que construir la bandeja de WhatsApp, el registro de acciones y el tope de costo. Se deja para una ola posterior |

---

## 7. Orden propuesto

**Ola 0 · Ahora, sin clientes**
- Cambios de esquema de la sección 4.
- Los arreglos de riesgo del análisis anterior: abono transaccional, compensación de gasto con error revisado, correo sin duplicados, candado del cron, 2FA del superadmin, candado de mes en tablas de dinero, tope de IA, plan comercial en Vercel, cierre de los términos y condiciones.
- Pruebas de comportamiento de los RPC de dinero contra Postgres local.

**Ola 1 · Valor visible para el dueño**
- Alcance por propiedad y vista "probar como este rol" (1).
- Aprobación por monto (2).
- Reglas de asignación reales (5).
- Dashboard de cobranza con acciones (4).
- Reportes baratos (10).
- Cierre de mes con dependencias (6).
- Estado del dueño automático (7).
- Reglas ocultas con lector (parte de 11).

**Ola 2 · El dueño que tiene administrador**
- Motor de comisión en modo verificador (8).
- Distribución recibida y aportaciones (9).
- Mapa de cuentas ligero y exportación de pólizas (sección 5).
- Migración asistida (12).

**Ola 3 · Canal y automatización**
- Bandeja de WhatsApp entrante con IA de comprobantes (3). Si prefieres adelantarla, es el candidato con mejor relación valor-esfuerzo y puede entrar en la Ola 1.
- Workflows configurables (11).
- Visitas con agenda y listados en portales mexicanos **[por validar]**.
- Firma electrónica con constancia NOM-151 y consulta de buró **[por validar proveedores]**.

**Ola 4 · Lo que depende de decisiones tuyas**
- Cobro en línea con CLABE por arrendatario (ver pregunta 1 abajo).
- Agentes de IA con supervisión.
- Facturación del propio producto y pricing.
- Portal de proveedor, SSO, API pública.

---

## 8. Cómo se refleja en el pricing

El producto de referencia escala por unidad y por cuánto delega el cliente a la IA, con cobros adicionales por transacción [visto]. En Zatu, sin cobro en línea ni timbrado, esos ingresos transaccionales no existen. Queda:

- **Plan base por unidad** con todo el motor fiscal, cobranza, renovaciones y reportes.
- **Escalón con IA** (lectura de comprobantes, bandeja de WhatsApp, recepcionista) con un conjunto de créditos incluido.
- **Complementos con costo variable:** consulta de buró, firma electrónica, mensajes de WhatsApp adicionales. Se trasladan al costo.

Antes de fijar precios, mide el costo de IA por organización. Hoy solo mantenimiento lo mide [auditoría].

---

## 9. Preguntas abiertas

1. **¿Cobro en línea sí o no?** Dijiste que no entran a facturación. Si tampoco entran a cobros, Zatu sigue siendo un sistema de registro y control, y la Ola 4 se simplifica. Si algún día quieres CLABE por arrendatario, conviene dejar listo `origen` y `referencia_externa` en los abonos desde la Ola 0.
2. **¿El administrador del dueño también usa Zatu, o Zatu es solo del dueño?** Cambia cómo se construye la comisión (modo verificador o modo cobro) y quién ve qué.
3. **¿Los clientes comerciales (plazas, locales) están en el plan?** Decide si CAM entra.
4. **¿Cuántas propiedades y unidades suele tener un cliente?** Define si la Ola 1 prioriza el alcance por propiedad o el dashboard.
5. **¿Qué sistema contable usan los contadores de tus clientes?** Define el formato de exportación de pólizas.
