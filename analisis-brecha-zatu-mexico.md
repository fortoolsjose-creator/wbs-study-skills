# Zatu frente al mercado: análisis de brechas y plan de construcción (México)

Base del análisis: la auditoría técnica de Zatu (commit `d4a3c414`, 15-nov-2026) y la investigación del producto de referencia (el brainstorm). Donde afirmo algo sobre proveedores, comisiones o leyes mexicanas, lo marco como **[por validar]**, porque no lo verifiqué contra fuentes actuales.

---

## 1. Veredicto

Zatu es un producto más maduro de lo que suele serlo un código "vibe codeado". Tiene RLS en las 96 tablas, un RPC transaccional para registrar pagos con candado y claim, idempotencia por `submit_id` y `lote`, auditoría a nivel de campo, 5 roles reales y más de 5,000 casos de prueba. En lo fiscal mexicano está por delante del producto de referencia: IVA, retenciones ISR/IVA, depósito esperado, lectura de CFDI 4.0, INPC en renovaciones y paquete del contador. Nada de eso se compra hecho.

Le faltan tres cosas grandes y una decisión:

1. **Cobro automático.** Hoy todo es manual (el arrendatario avisa "ya pagué", alguien confirma, alguien concilia un CSV). El producto de referencia gana su dinero y su retención justo ahí.
2. **Timbrado de CFDI.** Zatu lee facturas y no las emite. En México, emitir factura y complemento de pago es el trabajo más tedioso del arrendador. Automatizarlo es el diferenciador local más fuerte que veo.
3. **Contabilidad y ciclo del dueño.** Sin catálogo de cuentas, sin libro con líneas, sin comisión del administrador, sin distribuciones. Esto solo importa si el cliente es un administrador de propiedades ajenas.
4. **La decisión pendiente es el cliente objetivo** (sección 4). De ahí depende si las brechas 3 y parte de la 2 son prioridad o ruido.

Además hay un bloque de riesgos de dinero y seguridad que conviene cerrar antes de abrir el producto a más clientes (sección 5). Ninguno es difícil de arreglar.

---

## 2. Dónde Zatu ya gana

| Área | Qué tiene Zatu | Qué tiene el producto de referencia |
|---|---|---|
| Fiscal mexicano | Motor con IVA, retenciones ISR/IVA, depósito esperado, reconocimiento por abono, lectura de CFDI y complementos pendientes | No aplica (mercado de EE. UU.) |
| Mora | 5 tipos (proporcional, diaria, fija, única, escalonada de hasta 6 tramos), base, gracia, tope, sin cobro doble por recibo | Mora configurable, menos variantes visibles |
| Integridad del dinero | RPC todo o nada, candado consultivo por lote, claim de "pagado antes", disparadores guardia, folio de efectivo sin huecos | Claims y candados no documentados |
| Control de cuadre | "Vigilante de cuadre" con reglas que detectan descuadres a diario | No vi un equivalente |
| Renovaciones | Oferta por portal con INPC, porcentaje o pesos, respuesta del arrendatario, linaje de contratos, aplicación por cron | Asistente de renovación y agente de IA |
| Auditoría | 28 tablas, antes y después por campo | Equivalente |
| Seguridad de datos | RLS en todo, dos pasos exigible por organización, prueba local con dos organizaciones y 5 roles | Equivalente |
| IA | 5 usos reales (contrato, comprobante, Excel, machote, mantenimiento) con humano al final y registro de tokens y costo | Asistente y agentes, en su mayoría de marketing |
| Privacidad | LFPDPPP, aviso versionado, solicitudes ARCO, constancias de borrado | No aplica |
| Portales | Arrendatario y dueño externo por sociedad | Arrendatario, propietario y proveedor |

Conclusión de esta sección: la base técnica está bien. Construir encima es razonable y no hay razón para rehacer nada.

---

## 3. Matriz de brechas contra el brainstorm

Prioridad: **P0** (hacer ya), **P1** (siguiente), **P2** (después), **P3** (si el cliente lo pide). Esfuerzo relativo: **S** (días), **M** (1 a 3 semanas), **L** (más de un mes).

| # | Capacidad | Zatu hoy | Brecha | Prioridad | Esfuerzo |
|---|---|---|---|---|---|
| 1 | Cobro en línea (SPEI con CLABE por arrendatario, tarjeta, OXXO) | Ausente | Todo el cobro es manual | P1 | L |
| 2 | Autopago / domiciliación | Ausente | Sin ingreso recurrente automático | P1 | L |
| 3 | Conciliación automática | CSV y 1 a 1 | Con CLABE por arrendatario se concilia sola; hoy un depósito no cubre varios cargos | P1 | M |
| 4 | Timbrado de CFDI (ingreso y complemento de pago) | Solo lee | Falta integrar un PAC | P1 | L |
| 5 | Pagos devueltos, fallidos y disputados | Ausente | Sin estado ni flujo | P1 (cuando entre el cobro en línea) | M |
| 6 | Enlace de pago | Ausente | Se resuelve con el procesador | P1 | S tras #1 |
| 7 | Catálogo de cuentas y libro con líneas | Ausente | Base de balance, mayor y contabilidad electrónica | P2 | L |
| 8 | Depósito en garantía como pasivo | Banderas en `leases` | Difícil de cuadrar contra el banco | P1 | M |
| 9 | Aging de cuentas por pagar | Ausente | Reporte directo | P2 | S |
| 10 | Comisión del administrador | Ausente | Solo si el cliente administra para terceros | Depende del cliente | M |
| 11 | Distribuciones y aportaciones del dueño | Ausente | Ídem | Depende del cliente | M |
| 12 | Cierre de mes con dependencias | Lista de 15 pasos sin orden | Bloquear pasos con requisitos previos | P2 | M |
| 13 | Firma electrónica con constancia (NOM-151) | Manual (`contract_signed_at`) | Falta integración | P2 | M |
| 14 | Investigación del arrendatario (buró, SAT) | Manual | Falta integración | P2 | M |
| 15 | Listados en portales inmobiliarios | Página pública propia | Sin sindicación | P2 | M |
| 16 | Visitas de prospectos con agenda | Ausente | Solo existen visitas de mantenimiento | P2 | M |
| 17 | Bandeja de entrada (WhatsApp, correo) | Solo envío | El webhook ignora mensajes entrantes | P1 | M |
| 18 | Motor de workflows configurable | 19 barridos fijos | Sin automatizaciones del usuario | P2 | L |
| 19 | Portal de proveedor | Ausente | Mantenimiento más autónomo | P3 | M |
| 20 | Alcance por propiedad para el equipo | Ausente | Equipos grandes lo piden | P2 | M |
| 21 | SSO | Ausente | Clientes medianos | P3 | S |
| 22 | API pública y webhooks salientes | Ausente | Integraciones | P3 | M |
| 23 | Facturación del propio producto | Ausente | Sin ingresos recurrentes propios | P0 de negocio | M |
| 24 | Agentes de IA (recepcionista, renovaciones, cobranza) | Solo apoyo con humano | Capa de mayor valor y mayor riesgo | P2 | L |
| 25 | Integración contable (CONTPAQi, Aspel, exportación de pólizas) | Excel y ZIP | Depende de #7 | P2 | M |

---

## 4. La decisión de fondo: a quién le vendes

La auditoría deja una pista: Zatu tiene sociedades, dueño externo, estado del dueño, plantillas `plaza_comercial` y `portafolio_familiar`, pero no tiene comisión ni distribuciones. Hay tres perfiles posibles y cada uno cambia el plan:

| Perfil | Qué necesita | Brechas que se vuelven prioritarias |
|---|---|---|
| **A. Propietario con varias propiedades** (persona física o familia) | Cobrar, facturar, saber cuánto le queda | #1, #2, #3, #4, #8 |
| **B. Administrador de propiedades de terceros** | Lo anterior más comisión, distribuciones, estados por dueño, cierre confiable | A más #10, #11, #12, #7 |
| **C. Operador comercial o de plazas** | Cuotas de mantenimiento, prorrateo de gastos, conciliación de servicios | A más reconciliación de gastos compartidos |

**Mi recomendación:** apuntar al perfil A y B en ese orden. El perfil A comparte el 80 % del producto con el B, y las brechas 1 a 4 sirven a ambos. Dejar C para cuando haya un cliente concreto.

Esta es tu decisión y la necesito para cerrar el plan. Si hoy ya tienes clientes, dime qué perfil son: eso pesa más que cualquier hipótesis mía.

---

## 5. Riesgos de la auditoría, reordenados

Reordené los diez riesgos por impacto en dinero y confianza, con el arreglo que propongo. Los tres primeros caben en un sprint.

| # | Riesgo | Por qué importa | Arreglo propuesto | Esfuerzo |
|---|---|---|---|---|
| 1 | Abono sencillo no atómico (`aplica-abono.ts:73-161`) | Un fallo a medias deja el abono sin actualizar el cargo; el arrendatario recibe cobros y mora de algo que ya pagó | Mover la ruta a un RPC transaccional con el mismo patrón de `registrar_pago_contrato` (lote, candado, claim). Que `confirmPayment`, el importador de históricos y el finiquito la usen | M |
| 2 | Compensación de gasto sin revisar error (`autorizaciones/actions.ts:273,277`) | Gasto duplicado en reportes y en el estado del dueño | Revisar el error y convertir el par crear y borrar en una sola función SQL | S |
| 3 | Recordatorios por correo sin anti-duplicado y cron sin candado | Correo doble de cobranza si el cron corre dos veces | Reusar el patrón de WhatsApp: `clave_envio` única en `notificacion_envios`. Para el cron, un registro `cron_runs` único por trabajo y día o un candado consultivo | S |
| 4 | Superadmin sin 2FA obligatorio (`dos-pasos.ts:75-77`) | Con una contraseña se pueden borrar organizaciones | Exigir factor registrado para cualquier cuenta de `SUPERADMIN_EMAILS` y para cualquier acción destructiva | S |
| 5 | 106 archivos con cliente de servicio (salta RLS) | Una consulta sin `org_id` filtra datos entre clientes | Prueba automatizada que recorra esos archivos y exija un filtro por organización o una lista de excepciones revisadas, igual que la Regla 6 | M |
| 6 | Cierre de mes sin disparador en tablas de dinero | Una escritura directa puede mover dinero de un mes cerrado | Disparador `before insert/update` en `payments`, allocations y `expenses` que consulte `period_locks` | S |
| 7 | Depósito sin pasivo | Difícil de cuadrar contra el banco | Cuenta o tabla de movimientos de depósito (recibido, aplicado, devuelto) | M |
| 8 | Conciliación 1 a 1 | No sirve cuando un depósito cubre varios cargos | Tabla de vínculos muchos a muchos entre depósito bancario y cargos o abonos | M |
| 9 | Migraciones a mano en dos bases y SQL suelto | Una base a medio migrar degrada en silencio | Tabla de migraciones aplicadas, aplicación desde CI, y mover `no_es_renta` a una migración numerada | M |
| 10 | IA sin tope fuera de mantenimiento y Vercel Hobby | Costo no controlado y términos del plan | Tope por organización en todos los usos de IA, tabla de precios en un solo lugar, y subir a un plan comercial | S |

Otros puntos que aparecen en la auditoría y atiendo en el mismo bloque:

- El estado `partial` vencido no pasa a `overdue`. Unificar la definición de "vencido" en una sola función.
- `payment_allocations.monto` sin escala. Pasarlo a `numeric(12,2)`.
- Comentario obsoleto en `fiscal.ts:9-16`. Corregirlo, porque un motor fiscal con documentación falsa es una trampa para quien lo toque.
- Términos y condiciones con cinco marcadores "Pendiente" (sociedad en constitución, RFC, domicilio, cobro y cancelación, ley aplicable). Hay que cerrarlos antes de cobrar a alguien.
- CSP solo con `frame-ancestors`. Agregar `script-src` con nonces.

**Una observación sobre las pruebas:** 198 de 362 archivos leen código fuente en vez de ejecutar comportamiento. Los 5,318 casos dan menos garantía de la que sugiere el número. Para el dinero conviene reforzar las pruebas contra Postgres local (`tools/pg-local`) sobre `registrar_pago_contrato`, el nuevo RPC de abonos, la mora y el cierre de mes.

---

## 6. Lo que cambia por estar en México

### 6.1 Cobro

En México el pago dominante es SPEI, con tarjeta, efectivo en tiendas (OXXO) y domiciliación como complementos. La jugada de mayor impacto es **asignar una CLABE por arrendatario o por contrato**: el arrendatario transfiere a esa CLABE y la plataforma recibe un webhook con el depósito ya identificado. Esto elimina el CSV, la clave de rastreo manual y el "ya pagué" sin comprobante. Opciones a evaluar **[por validar condiciones, comisiones y requisitos de alta]**: Stripe México, Conekta, Openpay, Mercado Pago, STP y agregadores de CLABE. Evalúa también cobro por tarjeta y OXXO como segundo método.

Consecuencias de diseño:
- Cada pago en línea es asíncrono, así que entran los estados que hoy faltan: procesando, acreditado, fallido, devuelto, disputado.
- El libro del contrato necesita un abono con origen (`manual`, `spei_clabe`, `tarjeta`, `oxxo`) y referencia externa única para idempotencia ante reintentos del webhook.
- La conciliación pasa de reglas sobre un CSV a eventos del procesador. El CSV queda para depósitos que lleguen por otro camino.

### 6.2 Factura

- **Timbrado de ingreso y complemento de pago.** Integra un PAC (candidatos a evaluar **[por validar]**: Facturama, Facturapi, SW Sapien, Finkok). El motor fiscal ya calcula el desglose, así que la pieza nueva es generar el XML 4.0, enviarlo al PAC, guardar el UUID y el XML timbrado, y soportar cancelación y sustitución.
- **Complemento de pago automático.** Ya tienes la lista de complementos pendientes. Pasar de "pendiente para el contador" a "emitido" cierra el flujo.
- **Validación de RFC y régimen del arrendatario** antes de timbrar, con la constancia de situación fiscal que ya lees con IA.
- Precio del timbrado: es un costo variable que se puede trasladar como cargo por CFDI.

### 6.3 Contabilidad

La contabilidad electrónica (catálogo con código agrupador, balanza mensual, pólizas) exige partida doble. Si tu cliente la necesita depende de su régimen y de si un contador la lleva fuera **[por validar con un contador]**. Mi sugerencia es construir primero el libro con líneas y cuentas (brecha 7), porque además habilita balance, aging, depósito como pasivo y exportación de pólizas a los sistemas contables más usados. Sin esa base, cada reporte nuevo se programa a mano.

### 6.4 Contratos y personas

- **Firma electrónica con constancia de conservación NOM-151.** Hay proveedores nacionales **[por validar]**: Mifiel, Firmamex, Cincel. Reemplaza el `contract_signed_at` manual y da valor probatorio.
- **Investigación del arrendatario.** Buró de crédito (Círculo de Crédito, Buró de Crédito) y validación de RFC. El consentimiento por escrito para consultar buró es obligatorio; el diseño debe guardarlo.
- **Figuras locales:** aval, obligado solidario, póliza jurídica y pagaré. Ya tienes campos para aval, póliza y pagaré en `leases`. Falta verificación de vigencia de la póliza y un flujo de alta del aval con su propia documentación.
- **Desalojo y procedimientos:** varían por estado, así que conviene un módulo de seguimiento genérico (etapas editables) en lugar de un flujo único.
- **Listados:** portales mexicanos como Inmuebles24, Lamudi o Propiedades.com **[por validar API disponible]**. Puede resolverse con feeds o con publicación asistida.

### 6.5 Mensajería

WhatsApp es el canal natural. Hoy solo envías. Una **bandeja de entrada de WhatsApp** (recibir, hilar por persona, responder, adjuntar comprobantes) desbloquea tres cosas a la vez: cobranza conversacional, solicitudes de mantenimiento por chat y la recepcionista de IA. Es la brecha 17 y la que más habilita.

### 6.6 Privacidad y operación

- LFPDPPP ya está cubierta en lo básico. Falta revisar el tratamiento de datos sensibles (INE, buró) y la política de retención de `audit_log` y `errores_app`.
- Términos y aviso con datos reales de la sociedad antes de cobrar.

---

## 7. Qué tomar del producto de referencia

Ideas que ya validó el mercado y que encajan con Zatu:

1. **Dashboard de cobranza con acciones.** Cada métrica con un botón: reenviar invitación, recordatorio, enlace de pago. Mide también el porcentaje en autopago y cuántos están "listos para pasar a autopago".
2. **Simulador de comisión.** Una ventana junto a la configuración que muestra el cálculo con valores de ejemplo. Aplica en cuanto exista la comisión.
3. **Asistente de distribución con efectivo distribuible.** Caja, menos no depositado, menos depósitos de garantía, menos reservas. Aplica en cuanto existan distribuciones.
4. **Cierre de mes con dependencias.** Los 15 pasos que ya tienes como lista de verificación, con bloqueo cuando falta un requisito previo (por ejemplo, no generar la comisión sin transacciones del mes ni conciliación).
5. **Plantillas de workflow.** Un motor chico (trigger, acción, espera) con plantillas: bienvenida, aviso de pago vencido, renovación a 90 días. Ya tienes los 19 barridos; el siguiente paso es exponer lo configurable.
6. **Rol de agente de arrendamiento.** Acceso limitado a vacantes, solicitudes y firmas, sin finanzas. Útil para corredores externos.
7. **"Probar como este rol".** Reduce errores en una matriz de permisos grande.
8. **Estados de pago en línea y auditoría por campo** (esta última ya la tienes).

Lo que no aplica a México tal cual: formularios 1099, ACH, programas de vivienda de EE. UU., la regla de screening en dos fases por jurisdicción de EE. UU. y los términos de sindicación de portales estadounidenses.

---

## 8. Plan de construcción

Sin fechas, porque dependen de tu equipo. El orden respeta las dependencias.

### Fase 0 · Endurecer (primero, en paralelo con todo lo demás)
Riesgos 1 a 4, 6 y 10 de la sección 5, más cerrar los términos y condiciones. Meta: que ninguna falla conocida mueva dinero o filtre datos. Incluye pruebas de comportamiento contra Postgres local para los RPC de dinero.

### Fase 1 · Cobro y factura automáticos (la ventaja económica)
1. Procesador de pagos con CLABE por contrato, webhooks idempotentes y estados de pago en línea.
2. Abono con origen y referencia externa, y flujo de pago devuelto.
3. Conciliación automática y vínculos muchos a muchos (riesgo 8).
4. Timbrado de CFDI y complemento de pago con PAC.
5. Autopago o domiciliación como segundo paso.
6. Dashboard de cobranza con acciones.
7. Bandeja de entrada de WhatsApp (habilita lo que viene después).

### Fase 2 · Base contable
1. Catálogo de cuentas y libro con líneas, alimentado desde cargos, abonos, gastos y nómina existentes.
2. Depósito en garantía como pasivo (riesgo 7).
3. Balance, mayor y aging de cuentas por pagar.
4. Exportación de pólizas a sistemas contables y, si el cliente lo requiere, contabilidad electrónica.
5. Candado de mes con disparador en todas las tablas de dinero (riesgo 6).

### Fase 3 · Administración por terceros (si el perfil B es el objetivo)
1. Comisión del administrador con simulador, categorías retenidas y factura al dueño.
2. Distribuciones con efectivo distribuible, aportaciones y estado del dueño automático.
3. Cierre de mes con dependencias y bloqueos.
4. Porcentaje de participación por dueño en cada propiedad.

### Fase 4 · Arrendamiento completo
Firma electrónica con NOM-151, buró y validación de RFC, visitas con agenda, sindicación en portales, módulo de seguimiento de desalojo por etapas.

### Fase 5 · Automatización e IA
1. Motor de workflows configurable con plantillas.
2. Recepcionista de WhatsApp (requiere la bandeja de entrada) con reglas, escalamiento y registro de cada acción.
3. Agente de renovaciones (ya tienes oferta, INPC y portal; falta el orquestador).
4. Tope de costo y supervisión por agente.

### Fase 6 · Producto y negocio
Facturación del propio producto, límites por unidad, periodo de prueba, portal de proveedor, alcance por propiedad para el equipo, SSO, API pública y webhooks salientes.

La facturación del producto (brecha 23) puede entrar antes si ya hay clientes. Tu documento de negocio fija $100 por unidad al mes con mínimo de $400 y admite que `precios.ts` y `/precios` no existen en `main`.

---

## 9. Pricing

El producto de referencia cobra entre 2.50 y 5.00 USD por unidad al mes según cuánto trabajo hace la IA, con descuento arriba de 100 unidades, mínimos de cuenta y cobros adicionales por pagos, screening y seguro. Si tomas $100 MXN por unidad y un tipo de cambio cercano a 20 pesos por dólar **[por validar al día]**, Zatu queda cerca del extremo alto de ese rango, sin agentes de IA ni cobro en línea.

Hipótesis para probar, en orden:

1. **Antes de la Fase 1**, el precio por unidad se justifica por el motor fiscal, las renovaciones y el vigilante. Pregunta a tus clientes actuales cuánto ahorran en horas de contador.
2. **Después de la Fase 1**, el cobro en línea y el timbrado abren ingresos por transacción: comisión sobre cobros por CLABE o tarjeta, y precio por CFDI timbrado. Es el patrón del mercado y escala con el uso.
3. **Con la Fase 5**, un escalón superior con agentes de IA, por unidad, siguiendo el patrón de "cuánto quieres delegar".
4. El descuento por volumen y un mínimo de cuenta baratos para el arranque, para no frenar a quien tiene pocas unidades.

El costo variable de IA (sobre todo la lectura de contratos con el modelo más grande) tiene que medirse por organización antes de fijar precios.

---

## 10. Lo que necesito de ti para afinar el plan

1. **¿Quién es tu cliente hoy y cuántos hay?** Propietarios directos, administradores o comerciales. ¿Cuántas unidades en total y cuántos pagan?
2. **¿Hay dinero real moviéndose en producción?** Si sí, la Fase 0 sube de prioridad.
3. **¿Quién emite hoy las facturas de tus clientes?** ¿El contador o ellos? ¿Cuántos CFDI al mes?
4. **¿Cómo cobran hoy los arrendadores de tus clientes?** Porcentaje en SPEI, efectivo y tarjeta. Define qué métodos de cobro valen la pena primero.
5. **¿Tienes sociedad constituida y datos para los términos?** Bloquea el cobro.
6. **¿Cuánto equipo y tiempo tienes?** Con eso convierto los esfuerzos S, M y L en un calendario.
7. **¿Quieres que el cliente administre para terceros con comisión?** Define si la Fase 3 existe.

---

## 11. Siguiente paso que propongo

Dos opciones, no excluyentes:

- **A.** Redacto la **Fase 0 como tareas concretas** para el Claude que tiene tu código: cada una con archivos, el cambio exacto, las pruebas que debe escribir y el criterio de aceptación. Son tareas pequeñas que se pueden revisar una por una.
- **B.** Redacto la **especificación de la Fase 1**: modelo de datos del cobro en línea (tabla de intentos de pago, referencias externas, estados), flujo del webhook idempotente, y cómo se integra con `registrar_pago_contrato` y con el timbrado.

Mi recomendación es empezar por A, porque son cambios chicos que bajan el riesgo, y pasar a B apenas decidas el perfil de cliente y el procesador.
