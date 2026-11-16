# Análisis completo de DoorLoop

Incluye tres partes:

1. **Parte 1:** qué hace, cómo funciona y por qué (módulos, modelo de datos, libro del contrato, cobro, contabilidad, arrendamiento, portales, mantenimiento, IA).
2. **Parte 2:** dinero del propietario y cierre mensual, workflows, arquitectura inferida, permisos y roles, y modelo de pricing.
3. **Parte 3:** egresos y gastos a profundidad (gastos, facturas, pagos salientes, cheques, proveedores, presupuestos, IA de captura) y qué significa para Zatu.

Etiquetas de confianza: **[Fuente]** lo dice la documentación pública, **[Inferencia]** lo deduzco yo, **[Vacío]** no lo pude confirmar.

---

# Entender DoorLoop: qué hace, cómo lo hace y por qué

Fecha de la investigación: 2026-11-15.

## Cómo leer este documento

Cada afirmación lleva una etiqueta de confianza:

- **[Fuente]**: dicho directamente por DoorLoop (sitio, centro de ayuda o documentación de la API).
- **[Inferencia]**: deducido de la fuente más conocimiento general del sector de property management. Sirve para entender el porqué, pero conviene validarlo con una demo o prueba gratuita.
- **[Vacío]**: no pude confirmarlo con las páginas públicas leídas.

Fuentes usadas: doorloop.com (features, accounting, rapid-rent, leasing, operations, owners, ai-assistant, pricing), support.doorloop.com (centro de ayuda) y la documentación de la API REST (api.doorloop.com, leída vía Context7). Las páginas de marketing son superficiales. El detalle viene del centro de ayuda y de la API.

---

## 1. El problema que resuelve

DoorLoop es software de gestión de propiedades en renta. Atiende a tres tipos de cliente:

1. Propietarios que administran sus propias unidades.
2. Property managers que administran propiedades de terceros y cobran una comisión (management fee).
3. Administradores de propiedades comerciales y asociaciones de propietarios (HOA). El centro de ayuda tiene colecciones para HOA y reportes CAM. [Fuente]

El trabajo de fondo es siempre el mismo ciclo: llenar vacantes, firmar contratos, cobrar renta, pagar gastos, reportar al dueño y mantener las propiedades. Antes de este tipo de software se hacía con hojas de cálculo, QuickBooks y correos. [Inferencia]

La propuesta de DoorLoop es "todo en uno": una sola plataforma, un solo login, sin add-ons. [Fuente]

---

## 2. Mapa completo del producto

El menú del sitio agrupa el producto en tres bloques. [Fuente]

**Financieros:** cobro de renta (RapidRent), contabilidad, bookkeeping, sincronización bancaria, reportes, integración con QuickBooks.

**Arrendamiento:** listados y publicidad, solicitudes y firma electrónica, screening de inquilinos, sitios web, CRM, seguro de inquilinos.

**Operaciones:** mantenimiento, portal de propietarios, gestión de inquilinos, comunicación, workflows, app móvil, almacenamiento de archivos, inspecciones con IA.

**Agentes de IA:** recepcionista, centro de comunicación, teléfono de negocio, y agentes de mantenimiento, renovaciones, cobranza y arrendamiento.

El centro de ayuda organiza todo en doce colecciones: primeros pasos, propiedades y unidades, contratos y personas, contabilidad y pagos, comunicaciones y portales, DoorLoop Rentals, HOA, sitios web e integraciones, actualizaciones, propietarios, prospectos e inquilinos.

---

## 3. El ciclo de vida de una unidad

Este es el hilo que conecta todos los módulos. [Inferencia a partir de las fuentes]

1. **Vacante.** La unidad se marca abierta. Se publica un listado, que se sindica a sitios como Zillow. [Fuente: "turn on listing syndications"]
2. **Prospecto.** Las consultas, solicitudes de tour y solicitudes de aplicación de los listados llegan al Centro de Comunicación. [Fuente]
3. **Showing.** Hay una función de showings: disponibilidad por agente, ajustes por defecto, y autoagendamiento del prospecto. [Fuente: colección "Showings"]
4. **Aplicación.** El prospecto llena una solicitud. Cuando la envía queda como Prospect. [Fuente]
5. **Screening.** Se piden reportes a TransUnion SmartMove. [Fuente]
6. **Contrato.** Al crear el lease y añadir al prospecto, este se convierte en Tenant. [Fuente] Se firma con firma electrónica. [Fuente]
7. **Cargos recurrentes.** El lease genera renta mensual, depósito y otros cargos.
8. **Cobro.** El inquilino paga por portal, autopago, PayLink o efectivo.
9. **Contabilidad.** Cada movimiento afecta el libro contable y los reportes.
10. **Mantenimiento.** Solicitudes y órdenes de trabajo durante la ocupación.
11. **Renovación o salida.** Existen colecciones de lease renewals y de move-in/out. [Fuente]
12. **Reporte al propietario.** Statements, contribuciones y distribuciones. [Fuente: colecciones del centro de ayuda]

---

## 4. Modelo de datos (lo más sólido que encontré)

La API REST usa Bearer token en el header `Authorization`, URL base `https://app.doorloop.com/api`, paginación con `page_number` y `page_size` (por defecto 50, máximo 1000) y filtros con prefijo `filter_` (por ejemplo `filter_property`, `filter_date_from`). No encontré límites de tasa ni webhooks documentados. [Fuente: documentación de la API]

### Entidades y relaciones [Fuente]

| Recurso (`/ruta`) | Campos relevantes | Relaciones |
|---|---|---|
| Accounts `/accounts` | nombre, tipo, activo | Es el plan de cuentas; lo referencian todas las líneas de transacción |
| Properties `/properties` | nombre, tipo, dirección, clase, owners, amenidades, fotos | Pertenece a Portfolios; tiene Units y Owners |
| Portfolios `/property-groups` | nombre, lista de propiedades | Agrupa propiedades |
| Units `/units` | camas, baños, tamaño, renta de mercado, ocupada, estado del lease, depósitos retenidos, etapa de renovación, último pago, último pago devuelto | Pertenece a una Property |
| Leases `/leases` | inicio, fin, plazo, rollover a mes-a-mes, estado, desalojo pendiente, seguro requerido, saldo adeudado, depósitos, renta recurrente | Une Property, Unit y Tenants |
| Tenants `/tenants` | tipo (LEASE_TENANT o PROSPECT_TENANT), contacto, portal, fechas de mudanza, interés, fuente del lead, puntaje de crédito, ingreso mensual | Un mismo registro sirve para prospecto e inquilino |
| Lease Tenants `/leases/tenants` | lease, tenant | Tabla de unión |
| Lease Charges `/lease-charges` | líneas (monto, cuenta, memo, saldo) | Lease y Account |
| Lease Credits `/lease-credits` | líneas | Lease y Account |
| Lease Payments `/lease-payments` | monto recibido, método, cuenta de depósito, auto-aplicar a cargos, auto-depósito, estado de depósito, devuelto | Lease, Tenant y Account |
| Lease Reversed Payments | pago original, líneas, monto | Reversa un Lease Payment |
| Owners `/owners` | fechas de gestión, datos fiscales 1099, contacto | Propiedades con porcentaje de propiedad |
| Vendors `/vendors` | contacto, vencimiento del seguro, saldo abierto, datos fiscales | Propiedades que atiende |
| Vendor Bills / Credits | proveedor, líneas, fecha de vencimiento, saldo | Vendor, Account y recurso vinculado |
| Expenses `/expenses` | cuenta de pago, método, a quién se paga, líneas | Account y recursos |
| Tasks `/tasks` | tipo (INTERNAL_TASK, TENANT_REQUEST, OWNER_REQUEST, WORK_ORDER), prioridad, estado, asignados, permiso de entrada, aprobación del dueño, facturado, factura del proveedor | Property, Unit, Vendor y Vendor Bill |
| Notes / Files `/notes`, `/files` | texto o archivo, etiquetas | Se vinculan a casi cualquier recurso (tenant, lease, property, task, solicitud de aplicación, factura) |
| Communications `/communications` | asunto, cuerpo, de/para, apertura, clic, rebote, hilo | Registro de cada mensaje |
| Users `/users` | rol, propiedades permitidas, último acceso | Operadores de la cuenta |
| Reports `/reports/...` | P&L, balance general, flujo de efectivo, rent roll | Filtros por método contable (CASH o ACCRUAL), propiedad, grupo, propietario y fechas |

### Decisiones de diseño visibles en el modelo

- **Una sola tabla de personas para prospecto e inquilino.** Cambia el `type` y se conservan historial, notas y archivos. Evita duplicar contactos cuando un prospecto firma. [Inferencia]
- **Cargos, créditos y pagos son transacciones separadas con líneas.** Cada línea apunta a una cuenta contable. Así un solo cargo puede repartirse en renta, estacionamiento y cuota de mascota. [Inferencia]
- **Tasks unifica cuatro cosas** (tarea interna, solicitud de inquilino, solicitud de propietario, orden de trabajo) en un mismo tipo. Una solicitud puede escalar a orden de trabajo sin migrar datos. [Inferencia]
- **Notes y Files usan un vínculo polimórfico** (`resourceType` más `resourceId`). Un solo mecanismo adjunta documentos a cualquier entidad. [Fuente: estructura] [Inferencia: motivo]
- **Los saldos viven en el lease y en la unidad** (`totalBalanceDue`, `totalDepositsHeld`). Se leen sin recalcular el libro cada vez. [Inferencia]

---

## 5. Cómo funciona cada área

### 5.1 Libro del lease: cargo, pago y depósito

DoorLoop presenta tres transacciones básicas al cobrar renta: **Charge, Payment y Deposit**. [Fuente]

- El **cargo** crea una deuda del inquilino (renta, mora, cuota).
- El **pago** registra el dinero recibido. Al principio queda en fondos no depositados.
- El **depósito** agrupa pagos y los lleva a una cuenta bancaria real.

Por qué se separa el pago del depósito: en contabilidad, el dinero que el inquilino pagó todavía no está en el banco. Existe un reporte de Undeposited Funds y reportes de Deposit Summary y Deposit Detail. Esta separación permite conciliar el banco contra lotes de depósitos. [Fuente: reportes] [Inferencia: razón contable]

**Reglas de asignación de pagos.** Por defecto el pago se aplica primero al cargo más antiguo. Se puede definir una prioridad por categoría de cuenta, de arriba hacia abajo, a nivel de empresa, de propiedad o de lease. [Fuente] Por qué importa: si un inquilino paga menos de lo debido, el orden decide qué queda pendiente. Muchos administradores quieren cobrar primero la renta y después las multas. [Inferencia]

**Estados de un pago con tarjeta o ACH** [Fuente]: Processing (en Stripe), Succeeded (capturado, sin depositar), Undeposited, Deposited, Failed y Disputed. El modelo también tiene `returned` y pagos reversados. [Fuente: API] Los estados reflejan el hecho de que ACH tarda días y puede ser devuelto después de parecer exitoso. [Inferencia]

**Cargos automáticos.** Hay colecciones de late fees, ACH fees del manager y returned payment fees. [Fuente: títulos] Los detalles de configuración no los pude leer.

### 5.2 Cobro de renta (RapidRent)

- Métodos: tarjeta de crédito, débito y eCheck (ACH). El sitio también menciona efectivo y existe un módulo CashPayments. [Fuente]
- Autopago recurrente, recordatorios, portal del inquilino, y PayLink para pagar sin portal. [Fuente]
- Procesamiento con Stripe. El centro de ayuda tiene una colección de verificación de negocio "powered by Stripe". [Fuente]
- Pagos salientes con Checkbook.io e impresión de cheques. [Fuente: títulos]

**Dashboard de cobranza** [Fuente]: tasa de cobro, saldo pendiente, tiempo promedio de cobro, contratos vencidos, proporción de pagos automáticos versus manuales, inquilinos sin invitar, invitados que nunca entraron, inquilinos en el portal que pagan offline, porcentaje en autopago, y la cantidad "listos para pasar a autopago". Tiene acciones: reenviar invitación, enviar recordatorio, compartir enlace de autoactivación y enviar aviso de pay-or-quit.

Por qué este diseño: el dashboard no solo muestra números. Cada métrica lleva a una acción que empuja al inquilino hacia el autopago. El autopago reduce el esfuerzo de cobranza y los pagos tardíos. [Inferencia] Es también el motor del negocio de DoorLoop, porque la procesadora cobra por transacción (ver sección 7).

### 5.3 Contabilidad

- Contabilidad de partida doble con plan de cuentas. El centro de ayuda tiene secciones de saldos de apertura, transferencias bancarias, activos fijos y pasivos, presupuestos, cuentas por cobrar y por pagar, y formularios 1099. [Fuente: títulos]
- **BankConnect:** sincroniza transacciones de banco o tarjeta y permite conciliar con pocos clics. [Fuente]
- Integración con QuickBooks para evitar la doble captura. [Fuente]
- Dos métodos contables en reportes: CASH y ACCRUAL. [Fuente: API]
- Reportes: P&L, balance general, flujo de efectivo, rent roll, transacciones, estado de cuenta del lease, mora, comisiones de administración, owner statement, aging de cuentas por pagar, seguro, reporte de pagos recurrentes, y más de veinte adicionales. [Fuente: lista]
- **Audit log:** registra cada creación, actualización, borrado y consulta, con usuario, tipo de persona, IP, user agent, y para actualizaciones los valores viejos y nuevos de cada campo. Se conserva durante toda la vida de la cuenta. Registra también acciones hechas por API keys y por impersonación de soporte. [Fuente]

Por qué un audit log tan completo: las cuentas manejan dinero de terceros, y los propietarios y auditores exigen saber quién cambió un monto y cuándo. [Fuente: casos de uso listados] [Inferencia: obligación fiduciaria]

### 5.4 CAM (propiedades comerciales)

El reporte de reconciliación CAM calcula el cierre anual de gastos operativos. [Fuente]

1. Lee el P&L detallado de la propiedad y el periodo para obtener los gastos reales por cuenta.
2. Calcula la parte de cada inquilino con prorrata por metros cuadrados, aplicando excepciones por lease (montos fijos, cuentas excluidas, cuota administrativa, gross-up).
3. Calcula el ajuste: **parte real menos CAM estimado ya pagado**. Si es positivo, el inquilino debe; si es negativo, recibe crédito.

Fórmulas [Fuente]: prorrata = m² del inquilino ÷ m² totales (o solo ocupados, según la base elegida); parte real = suma de cada cuenta × prorrata; ajuste = parte real − estimado pagado.

Por qué existe: los inquilinos comerciales pagan una estimación mensual de gastos del edificio y al cierre del año hay que ajustar. Hacerlo en hojas de cálculo con decenas de cuentas y términos distintos toma horas. [Fuente]

### 5.5 Arrendamiento: aplicaciones y screening

- Pasos de configuración: ajustes de empresa, ajustes por propiedad (cuotas, preguntas y requisitos distintos), marcar unidades "abiertas para aplicaciones", probar, enviar enlace (correo, texto o web) y recibir notificación. [Fuente]
- Screening con TransUnion (paquete SmartCheck Plus vía MySmartMove: crédito completo, historial criminal y de desalojo). Solo propiedades de EE. UU. [Fuente]
- Verificación de ingresos para aplicaciones. [Fuente: título]
- **Screening en dos fases:** en jurisdicciones con leyes específicas, la primera fase entrega el reporte con el historial criminal y de desalojo retenido, para que se evalúe al solicitante con otros criterios y se tome una decisión condicional. Si se decide avanzar, la segunda fase libera esa información. TransUnion lo aplica automáticamente donde corresponde. [Fuente]

Por qué: leyes locales tipo "fair chance" obligan a decidir primero con criterios no penales. El software lleva el cumplimiento incorporado para que el administrador no lo infrinja por error. [Fuente: razón legal] 

### 5.6 Comunicación y portales

- **Portal del inquilino:** pagar renta, ver historial, subir comprobante de seguro, enviar solicitudes, leer anuncios. Se invita al crear el lease, después, o en lote. El inquilino recibe un correo para crear su contraseña. Opcionalmente trae un asistente de IA 24/7 para preguntas y solicitudes de mantenimiento. [Fuente]
- **Centro de Comunicación:** bandeja central para SMS, anuncios y notificaciones con inquilinos, propietarios, proveedores y prospectos; hay historial por persona o lease, y colecciones de voz entrante y saliente. [Fuente]
- **Portal del propietario:** reportes instantáneos, tableros en tiempo real, acceso a solicitudes de inquilinos, permisos y archivos compartidos. [Fuente]

### 5.7 Mantenimiento

Las órdenes de trabajo viven en Tasks. Campos: prioridad, asignado a usuarios o proveedor, instrucciones al proveedor, permiso de entrada, notificar al inquilino, aprobación del propietario, y vínculo a la factura del proveedor (`billed`, `vendorBill`). [Fuente: API]

Esto cierra el círculo financiero: una orden de trabajo termina en una factura del proveedor, que genera un gasto asignado a la propiedad y se refleja en el owner statement. [Inferencia]

### 5.8 Agentes de IA

El sitio afirma que el Asistente de IA maneja hasta el 80 % de las solicitudes de inquilinos y que hay agentes especializados (recepción, mantenimiento, renovaciones, cobranza, arrendamiento). [Fuente: marketing]
[Vacío] No encontré cómo funcionan por dentro (modelo, datos que consultan, reglas de traspaso a una persona). La página del asistente solo da el resumen.

---

## 6. Por qué está diseñado así (síntesis)

1. **El dinero ajeno exige trazabilidad.** De ahí la partida doble, la separación pago/depósito, el audit log a nivel de campo y los reportes por propietario. [Inferencia]
2. **Cobrar renta es la mayor fuente de trabajo repetitivo.** Todo el producto empuja hacia el autopago: dashboard con acciones, recordatorios, PayLink, invitaciones. [Inferencia]
3. **La ley varía por lugar.** Screening en dos fases, avisos pay-or-quit, límites de mora y 1099 muestran que el cumplimiento está dentro del software. [Fuente parcial]
4. **Un solo registro de persona y un solo tipo de tarea reducen fricción.** Menos migraciones entre etapas. [Inferencia]
5. **Alcance amplio vende.** Incluir comercial (CAM), HOA y residencial amplía el mercado, a costa de un producto más complejo. [Inferencia]

---

## 7. Modelo de negocio

[Vacío] La página de precios no mostró planes ni cifras en la lectura automática. Lo que se puede deducir:

- Suscripción por tamaño de portafolio. [Inferencia]
- Ingresos por procesamiento de pagos (RapidRent), por screening, por seguro de inquilinos (socio Assurant) y por servicios como teléfono y agentes de IA. [Fuente: existencia de los módulos] [Inferencia: monetización]
- Soporte, migración y capacitación gratuitos, con gerente de cuenta dedicado. [Fuente]

Para confirmar precios hay que abrir la página manualmente o pedir la demo.

---

## 8. Lo que falta por entender

| Tema | Qué falta | Cómo cerrarlo |
|---|---|---|
| Lógica de asignación y mora | Reglas exactas de late fees, devoluciones y fees de ACH | Leer las colecciones "Late Fees", "Manager ACH Fees" y "Returned Payment Fees" |
| Owner statements y distribuciones | Fórmulas de comisión, reservas y contribuciones | Leer las colecciones "Management Fees" y "Owner Contributions and Distributions" |
| Workflows y automatizaciones | Disparadores y acciones disponibles | Artículos de workflows en el centro de ayuda |
| Agentes de IA | Arquitectura, herramientas, traspaso a humano | Demo o contacto comercial |
| Arquitectura técnica interna | Stack, base de datos, colas | No es público; solo se puede inferir |
| Permisos y roles | Matriz de roles de usuarios | Colección "User Management" |
| Precios | Planes y comisiones de pago | Página de precios en navegador o demo |

## 9. Siguiente paso recomendado

Leer los artículos de las colecciones pendientes (mora, comisiones, distribuciones, workflows, usuarios y roles). Después, probar la cuenta de prueba o pedir la demo para ver pantallas reales. Con eso se cierran los vacíos antes de pasar a la fase de construir.


---

# Entender DoorLoop, parte 2

Continuación de `doorloop-entendimiento.md`. Fecha: 2026-11-15.

Esta parte cubre: owner statements, distribuciones y cierre mensual; workflows y automatizaciones; arquitectura técnica (inferida); permisos y roles; modelo de pricing.

Etiquetas: **[Fuente]** dicho por DoorLoop, **[Terceros]** dicho por un sitio externo, **[Inferencia]** deducido por mí, **[Vacío]** no confirmado.

---

## 1. Management fees, owner statements, distribuciones y cierre mensual

### 1.1 El flujo de dinero completo

El dinero de un propietario recorre esta cadena. [Fuente + Inferencia]

1. El inquilino paga renta. El pago queda en fondos no depositados, luego se deposita al banco.
2. Se registran gastos y facturas de proveedores de la propiedad.
3. La empresa administradora cobra su **management fee**.
4. Lo que queda disponible se envía al propietario como **distribución**.
5. El **owner statement** documenta todo el periodo.

El orden importa. DoorLoop lo dice explícitamente: se registran las management fees después de recibir la renta y antes de registrar las distribuciones, porque el pago de la fee reduce el efectivo disponible para distribuir. Así no se distribuye por error el ingreso completo. [Fuente]

### 1.2 Management fees: cómo se calculan

Se configuran una vez a nivel de empresa en Settings > Company Defaults > Fees > Management Fees, y pueden sobrescribirse por propiedad. [Fuente]

**Destinatario del pago.** La empresa administradora se registra primero como **vendor** (proveedor). La fee es una factura (bill) pagada a ese vendor. [Fuente]

**Tres tipos de fee.** [Fuente]

| Tipo | Base de cálculo | Cuándo usarlo |
|---|---|---|
| Porcentaje de ingreso cargado (base devengado, Accrual) | Cargos creados en el lease para las cuentas de ingreso elegidas, sin importar si el inquilino pagó | La fee se debe aunque el inquilino no haya pagado |
| Porcentaje de ingreso cobrado (base efectivo, Cash) | Pagos efectivamente recibidos en las cuentas elegidas | La fee depende del dinero cobrado (lo más común) |
| Fee fija | Monto fijo mensual | Tarifa plana por propiedad |

Cada fee se define con una **categoría base** (por ejemplo, Renta), un porcentaje y una **categoría de gasto** (Management Fees). Se pueden añadir varias fees sobre distintas cuentas base. Existe también una **fee mínima**: si el total de las otras fees es menor, se cobra el mínimo; cuando el total la supera, se usa el total. [Fuente]

**Categorías de pago (payout categories).** Son cuentas de ingreso que la administradora se queda al 100 %, por ejemplo cuotas por pago tardío, cuotas de conveniencia y cuotas de solicitud. Ese dinero no se distribuye al propietario y no aparece como ingreso en el P&L ni en el owner statement. [Fuente]

**Simulación.** La pantalla de configuración incluye una ventana "Simulation" que muestra cómo se calculan los montos con valores de ejemplo editables. [Fuente]

**Caso especial: primera renta como fee.** Para quedarse con la primera renta, se crea una cuenta de ingreso "First Month's Rent", se pone como payout category (100 %) o como base de un porcentaje, se pospone la fecha de primera renta del lease un mes y se postea un cargo único con esa categoría. [Fuente]

**Limitaciones que se leen entre líneas.** [Inferencia a partir de [Fuente]]
- Si distintas unidades de una misma propiedad tienen propietarios con fees diferentes, hay que crear una propiedad separada por unidad. Esto indica que la fee se resuelve a nivel de propiedad en el modelo de datos.
- Las fees no se generan solas cada mes. Se crean manualmente con un asistente.

### 1.3 Crear y pagar las bills de management fee

[Fuente] Asistente "Create Management Fee Bills":
1. Se eligen las propiedades. El periodo por defecto es el mes anterior.
2. Las propiedades que ya tienen fees generadas en el rango se ocultan para evitar duplicados.
3. El sistema calcula los montos con las reglas configuradas.
4. Al terminar se puede revisar las bills o pasar directo al asistente de **Pay Bills**.
5. El pago se hace por cheque (impreso en DoorLoop o ya enviado), por ePay (si hay pagos salientes configurados) o por otro medio externo.

Reglas visibles:
- Antes de generar fees hay que haber registrado todas las transacciones de lease del mes, porque la base del cálculo sale de ellas.
- La fee aparece en reportes (como el Owner Statement) solo cuando la bill está creada **y** pagada.
- Si el dinero de la fee nunca sale del banco operativo, hay que registrar un depósito bancario manual que lo devuelva a la cuenta.
- Si el propietario recibe la renta directamente, se registra la bill primero y el pago cuando el propietario paga a la administradora.

Por qué una bill y un pago en lugar de un asiento directo: la administradora es una entidad con su propio ingreso. Modelarla como vendor permite reutilizar todo el flujo de cuentas por pagar (aging, pagos, cheques, auditoría). [Inferencia]

### 1.4 Distribuciones al propietario

Una distribución paga las ganancias al propietario. DoorLoop recomienda registrarla incluso cuando el dueño administra sus propias propiedades, para que la transacción quede reflejada en el balance de la propiedad. [Fuente]

**Asistente de distribución, paso a paso.** [Fuente]

1. **Inicio.** Create New > Owner Distribution.
2. **Destinatarios.** Todas las propiedades, algunas o portafolios; todos los propietarios o algunos.
3. **Revisión de cuentas.** Muestra propiedades con información faltante. Se exige tener un propietario asignado; el saldo de apertura es opcional (con advertencia). Muestra fondos no depositados por propiedad con enlace para depositarlos. Se puede excluir propiedades con la X.
4. **Asignación de fondos.** Se define una fecha de corte ("As of date"). Por propiedad se ve el efectivo disponible: **saldo de caja, menos fondos no depositados, menos depósitos de garantía, menos reservas de la propiedad**, igual al efectivo disponible para distribuir. Se ve también la cuenta bancaria asociada y su efectivo. Con varios propietarios se muestra el porcentaje de propiedad y el monto de cada uno, y se puede editar o excluir a alguien. Solo las propiedades con efectivo disponible vienen marcadas, aunque se pueden marcar otras. Se permite distribuir aunque el banco no tenga fondos.
5. **Método.** Cheque, ePay, giro, EFT u otro. Se puede **consolidar pagos**: un solo pago por propietario aunque posea varias propiedades. Cada propietario puede recibir por un método distinto.
6. **Resumen.** Enlaces al reporte de transacciones (con número de lote), al owner statement, a imprimir cheques o a completar el ePay.

Las distribuciones por ePay se envían como eCheck con Checkbook.io. No se pueden enviar por depósito directo. [Fuente]

**Por qué el efectivo distribuible resta reservas y depósitos de garantía.** El administrador maneja dinero de terceros. Los depósitos de garantía pertenecen al inquilino y las reservas están acordadas con el dueño. Distribuirlos sería usar fondos ajenos. [Inferencia]

### 1.5 Contribuciones del propietario

Es el flujo inverso: el propietario aporta dinero para reparaciones, mantenimiento o reservas. Se registran manualmente o el propietario las paga desde su portal. [Fuente]

Flujo en el portal: se activa "Online Contributions" en Settings > Company Defaults > Owner Portal > Permissions. El propietario elige propiedad, monto y memo, y paga con tarjeta (comisión de 3,25 %) o cuenta bancaria/eCheck (tarifa fija de $0,99). Todo se procesa con Stripe y DoorLoop no guarda datos de pago. La contribución aparece en las transacciones de la propiedad. [Fuente]

### 1.6 Owner Statement

Es un resumen de ingresos y gastos de la inversión del propietario, normalmente mensual o trimestral. [Fuente]

Filtros: periodo, portafolio, propiedad, propietarios, tipo de reporte (todo, resumen o detallado), agrupación (propiedad, total, mes, trimestre, año), método contable (efectivo o devengado) y comparación (periodo anterior, año anterior o personalizado). Se genera para todos los propietarios a la vez, se exporta a PDF, CSV o Excel y se envía por correo al propietario. [Fuente]

Detalles que revelan la lógica del sistema: [Fuente]
- Los depósitos de garantía solo aparecen si están completamente registrados en el lease (cargo posteado y pago o crédito aplicado). Los depósitos retenidos por el propietario se llevan aparte.
- El owner statement **no se envía automáticamente**. El envío es manual cada mes.
- Las payout categories y las fees pagadas definen qué aparece en el statement.

### 1.7 El cierre mensual (secuencia de operaciones)

Armado a partir de las reglas anteriores. [Inferencia respaldada por [Fuente]]

1. Registrar todas las transacciones del mes en cada lease (cargos, pagos, créditos).
2. Depositar los fondos no depositados al banco.
3. Registrar gastos y bills de proveedores del mes.
4. Conciliar el banco (BankConnect).
5. Crear y pagar las bills de management fee del mes.
6. Revisar el efectivo disponible por propiedad (menos depósitos y reservas).
7. Registrar las distribuciones a propietarios.
8. Generar y enviar los owner statements.

Cada paso depende del anterior. Si se saltan los pasos 1 a 3, las fees salen con una base incorrecta y las distribuciones salen infladas.

---

## 2. Workflows y automatizaciones

Fuente principal: artículo "Workflows - Getting Started With Automations" (agosto de 2026). [Fuente]

### 2.1 Modelo mental

Un workflow es una secuencia de pasos que arranca con un trigger.

| Término | Significado |
|---|---|
| Trigger | El evento y sus condiciones que inician el workflow |
| Step | Una acción o una pausa individual |
| Action | Tarea automatizada (enviar correo, crear tarea) |
| Delay | Pausa antes del siguiente paso, por ejemplo 2 horas |
| Run | Cada vez que se dispara el workflow se crea una instancia independiente que sigue la lógica configurada |

### 2.2 Acciones disponibles

- **Create Task:** crea una tarea para un usuario de la cuenta.
- **Send Automated Email:** correo a un usuario, propietario o inquilino.
- **Send Text Message:** SMS a un usuario, propietario o inquilino (requiere suscripción a SMS en el Centro de Comunicación).
- **Time Delay:** pausa.

### 2.3 Plantillas

Hay plantillas prediseñadas: **Pay-or-Quit notice**, **Tenant Welcome** y **Lease Renewals**. Se elige una plantilla, se revisan trigger, acciones y delays, se editan los pasos (no todas las variables son editables), y se guarda con "Save and Activate". [Fuente]

Ejemplo de trigger por defecto: el de renovación se dispara 90 días antes de que termine un lease de plazo fijo que aún no tiene una renovación iniciada. [Fuente]

### 2.4 Monitoreo

La pestaña **Activity** lista los leases afectados, el estado y cada corrida del workflow. Hay una lista general de workflows (activos y borradores). Existe un artículo "Workflows for the Advanced User" que no leí. [Fuente] [Vacío]

### 2.5 Por qué existen y cómo encajan

- El trabajo de un administrador gira alrededor de **fechas**: fin de contrato, mudanza, vencimiento de seguro, mora. Un motor de eventos con retrasos convierte esas fechas en acciones sin que alguien las recuerde. [Inferencia]
- Las plantillas bajan la barrera: el cliente activa una plantilla y la ajusta. Es más simple que un constructor visual en blanco. [Inferencia]
- Las acciones se limitan a correo, SMS y tareas. El motor es deliberadamente chico. El valor mayor se reserva para los **agentes de IA** (plan Multiply), que hacen trabajos de varios pasos con juicio. [Inferencia]
- Las corridas se registran una por una, igual que el audit log, para que cualquier automatización sea auditable. [Inferencia]

### 2.6 Lo que se puede deducir del diseño técnico

Un workflow se parece a una máquina de estados con cola de trabajos retrasados: cada run guarda su posición actual y la hora de su próximo paso, y un programador revisa periódicamente qué pasos vencieron. [Inferencia]

---

## 3. Arquitectura técnica (inferida)

DoorLoop no publica su arquitectura interna. Lo siguiente combina pistas públicas con prácticas comunes. Todo es **[Inferencia]** salvo donde se indica.

### 3.1 Pistas públicas

| Pista | Qué indica |
|---|---|
| API REST en `app.doorloop.com/api` con Bearer token, paginación por `page_number`/`page_size`, filtros `filter_*` [Fuente] | Backend con API propia; el frontend probablemente usa la misma API |
| Recursos con ids y vínculos polimórficos (`resourceType` + `resourceId`) [Fuente] | Base de datos de documentos o esquema flexible; objetos con referencias |
| Cada objeto con `createdAt`, `batch`, líneas de transacción [Fuente] | Modelo contable por lotes con líneas |
| Audit log con valores viejos y nuevos por campo, IP y user agent [Fuente] | Registro de eventos de cambio (event log) en cada escritura |
| Stripe para cobros, Checkbook.io para pagos salientes, TransUnion SmartMove para screening [Fuente] | Arquitectura de integraciones con terceros; DoorLoop no toca datos de tarjeta |
| Respaldo cada cinco minutos en servidores geo-redundantes, cifrado de 256 bits, 2FA, SSO con Google, cumplimiento PCI [Fuente: página de precios] | Base de datos replicada con respaldos continuos |
| Apps iOS y Android con notificaciones push [Fuente] | Clientes móviles sobre la misma API |
| Sitio de marketing en Webflow, centro de ayuda en Intercom, videos en Wistia [Fuente: código de las páginas] | Marketing y soporte en plataformas SaaS aparte del producto |
| Zapier y API abierta [Fuente] | Integraciones de cara al cliente |
| Cuenta de empresa con propiedades, usuarios y datos aislados [Fuente: modelo] | Multi-tenant |
| Impersonación de soporte y "technician access" visibles en el audit log [Fuente] | Herramientas internas de soporte con trazabilidad |

### 3.2 Arquitectura probable

```
Clientes: web app (SPA), iOS, Android, portales (inquilino / propietario / proveedor / agente)
        |
   API REST (Bearer tokens, sesiones, SSO Google, 2FA)
        |
 +--------------+-------------------+------------------+
 | Dominio      | Contabilidad      | Comunicaciones   |
 | (propiedades,| (libro por líneas,| (SMS, correo,    |
 |  leases,     |  lotes, reportes, |  voz, portal,    |
 |  tareas)     |  conciliación)    |  IA)             |
 +--------------+-------------------+------------------+
        |
  Cola de trabajos / programador (cargos recurrentes, mora, workflows,
  recordatorios, sincronización bancaria, webhooks de Stripe)
        |
  Base de datos principal (replicada) + almacenamiento de archivos
        |
  Integraciones: Stripe, Checkbook.io, TransUnion, QuickBooks,
  proveedor de sincronización bancaria, listados (Zillow y otros),
  telefonía/SMS, modelos de lenguaje
```

### 3.3 Decisiones técnicas que el producto exige

1. **Libro contable inmutable con reversas.** Existen "Lease Reversed Payments" y pagos devueltos. Las correcciones se hacen con transacciones nuevas y no sobrescribiendo. [Fuente: recursos de la API]
2. **Cálculo de saldos denormalizado.** `totalBalanceDue` en lease y unidad permite listar saldos rápido. Se actualiza en cada transacción. [Inferencia]
3. **Trabajos programados idempotentes.** Cargos recurrentes, mora y workflows corren por reloj; deben tolerar reintentos sin duplicar. El asistente de fees oculta propiedades ya facturadas, por lo que existe un control de duplicados a nivel de aplicación. [Fuente parcial]
4. **Permisos por objeto y acción.** Ver sección 4.
5. **Procesamiento de pagos asíncrono.** Los estados Processing, Succeeded, Deposited, Failed y Disputed corresponden a los eventos de Stripe que llegan por webhook. [Fuente + Inferencia]
6. **Multi-entidad contable.** "Advanced A/P and A/R across multiple portfolios, LLCs and business entities" apunta a que cada propiedad o portafolio puede pertenecer a una entidad contable distinta dentro de una misma cuenta. [Fuente + Inferencia]

---

## 4. Permisos y roles

### 4.1 Roles por defecto

La documentación menciona cinco roles predeterminados: **Full Access, Accountants, Maintenance Team, Leasing Agents y Property Owners**. Otro texto del mismo artículo habla de cuatro roles por defecto, así que hay una inconsistencia menor en su propia documentación. [Fuente]

No existe un rol "Property Manager" por defecto. Se recomienda crear uno personalizado o usar Full Access, que da acceso a todo. [Fuente]

Se pueden agregar **usuarios ilimitados sin costo adicional**. [Fuente]

### 4.2 Estructura de un rol personalizado

Un rol se compone de cuatro pestañas: **General Info, Objects, Reports y Settings**. [Fuente]

**Objects.** Aquí vive la mayoría de permisos. Secciones: [Fuente]

| Sección | Qué cubre |
|---|---|
| People | Prospectos, inquilinos, propietarios, proveedores |
| Tasks & Maintenance | Tareas, solicitudes y órdenes de trabajo |
| Rentals | Propiedades y unidades |
| Leasing | Leases activos e inactivos y solicitudes de renta |
| Tenant Transactions | Cargos, pagos y reembolsos de leases |
| Vendor Transactions | Bills, pagos de bills y créditos de proveedor |
| Owner Transactions | Distribuciones y contribuciones |
| Other Transactions | Asientos, transferencias, depósitos, gastos, cuotas de solicitud, management fees, envío de pagos |
| General Objects | Cuentas, BankConnect, calendario, merchant accounts, portafolios, etiquetas, archivos, notas, anuncios, log de comunicaciones, firmas, plantillas de firma, conciliaciones, pólizas de seguro, presupuestos |
| Communications Center | Mensajería en tiempo real |

Cada objeto admite cinco permisos: **View List, View One, Create, Edit y Delete**. Separar "ver lista" de "ver uno" permite que alguien vea un listado sin abrir el detalle sensible. [Fuente]

**Tasks & Maintenance** funciona con tres niveles: ninguno, solo tareas asignadas al usuario, o todas. [Fuente]

**Reports.** Casillas por reporte. Lo que no se marca, el usuario no lo ve. [Fuente]

**Settings.** Para configuración de empresa y de propiedad: sin acceso, solo lectura o edición. [Fuente]

### 4.3 Roles externos y características de seguridad

- **Leasing Agents:** pensado para agentes internos o externos (realtors, brokers). Pueden publicar unidades a sindicación, responder consultas, enviar solicitudes y ver reportes de screening, y crear firmas de contratos. No acceden a finanzas ni datos de propietarios. Requieren aceptar una invitación antes de entrar. [Fuente]
- **Acceso a cuentas bancarias por usuario:** existe un artículo para controlar y diagnosticar qué cuentas bancarias ve cada usuario. [Fuente: título]
- **Notificaciones por usuario:** cada usuario configura sus notificaciones y puede activar push en el móvil. [Fuente: títulos]
- **Merchant account de propietario:** un propietario puede recibir el permiso de solicitar una cuenta de comerciante como usuario. [Fuente: título]
- **Rastro de quién creó, editó o borró una transacción**, apoyado en el audit log. [Fuente: títulos]
- **Seguridad:** 2FA, SSO con Google. [Fuente]

### 4.4 Por qué este diseño

- Una matriz por objeto y acción es flexible. Sirve para contadores, equipos de mantenimiento y agentes externos sin crear un tipo de usuario para cada uno. [Inferencia]
- Usuarios ilimitados gratuitos eliminan la fricción de dar acceso a más personas. El precio escala con unidades y no con asientos. [Inferencia]
- La función de probar un rol con un segundo usuario propio lo recomienda el propio manual, lo que sugiere que la matriz es grande y es fácil dejar un hueco. [Fuente: tip] [Inferencia: motivo]
- [Vacío] No encontré alcance por propiedad documentado en los artículos leídos. La API de usuarios incluye un campo `properties`, lo que sugiere que un usuario puede limitarse a ciertas propiedades. [Fuente: API] [Inferencia]

---

## 5. Modelo de pricing

### 5.1 Estructura actual (página oficial de precios, noviembre de 2026)

La página cambió de los planes Starter, Pro y Premium a tres planes basados en **cuánto trabajo hace DoorLoop por ti**. La página tiene una pregunta "What happened to Starter, Pro and Premium?" cuya respuesta no pude leer. [Fuente]

| Plan | Precio de partida (por unidad al mes) | Qué agrega |
|---|---|---|
| **DoorLoop One** | Desde $2,50. Hasta $1,50 por unidad por encima de 100 unidades | Toda la plataforma: contabilidad, leasing, mantenimiento, pagos, showings, portales, sitio web, un número de negocio, asistente de IA (preguntas, facturas, reportes), usuarios ilimitados, almacenamiento ilimitado, acceso completo a la API |
| **DoorLoop Connect** (el "más popular") | Desde $4,00 | Todo One más Receptionist Agent 24/7 para textos, llamadas y mensajes de portal, solicitudes rutinarias resueltas sin tu equipo, ACH entrante gratis, reglas de lo que maneja la IA y lo que llega a ti, soporte VIP |
| **DoorLoop Multiply** (solo por invitación) | Desde $5,00 | Todo Connect más Maintenance Ops Agent (de la orden de trabajo a la factura), Lease Renewal Agent (de la primera comunicación a la firma), nivel de supervisión por agente, cada acción registrada en lenguaje claro con atribución al agente, y acceso a agentes nuevos sin costo extra |

Todos los planes tienen la nota: "Minimum spend and units apply". Hay facturación anual y mensual, con "hasta 25 % de ahorro" en la anual. [Fuente]

**Mínimos [Terceros]:** un sitio de reseñas indica que One tiene un mínimo de $199 al mes facturado anualmente, y que por debajo de 80 unidades aplica ese mínimo (10 unidades equivalen a $19,90 por unidad). Las cifras mensuales serían $3,00 y $1,80. Este dato proviene de un tercero y no lo pude confirmar con la página oficial.

**Planes anteriores [Terceros]:** Starter ($69 al mes facturado anual o $99 mensual, máximo 10 unidades), Pro ($149 o $189) y Premium ($209 o $239). Según un tercero, esos planes se retiraron alrededor de octubre de 2026. Ese mismo tercero confirma que la página oficial mostró los planes viejos hasta mediados de septiembre.

### 5.2 Fuentes de ingreso adicionales visibles [Fuente]

| Concepto | Detalle visible |
|---|---|
| Screening de inquilinos | $35 por reporte (se repite en las columnas de los tres planes) |
| ACH entrante | Cuesta $1,50 en One y es gratis en Connect según la lista de características; la tabla de comparación es ambigua en las columnas |
| Pagos con tarjeta | Se procesan con Stripe; la contribución del propietario con tarjeta cuesta 3,25 % |
| ACH en contribución de propietario | $0,99 fijo |
| Pagos salientes a proveedores y propietarios | Gratis |
| Cuota de conveniencia | El administrador puede cobrar al inquilino una comisión en pagos ACH y quedársela como ingreso |
| Créditos de mensajería | Un solo conjunto de créditos cubre anuncios, textos y mensajes de IA. La tabla muestra 5, 10 y 20, pero no aclara la unidad ni el periodo |
| Seguro de inquilinos | Venta dentro del portal del inquilino con Assurant |
| Asistente de IA en el portal del inquilino | Disponible como complemento ("add-on") según la tabla |
| Incorporación y capacitación | Gratis, un onboarding virtual uno a uno |

### 5.3 Qué revela la estrategia de precios

1. **Precio por unidad con mínimo.** El ingreso crece con el portafolio del cliente. El descuento sobre 100 unidades premia a los grandes. [Fuente + Inferencia]
2. **Escalera por nivel de automatización.** Todo el producto está disponible en los tres planes. Lo que cambia es cuánto trabajo hace la IA. El plan se vende como "cuánto quieres delegar" y esto convierte la IA en el motor de subida de precio. [Fuente: "The platform is the same in all three"]
3. **El ACH entrante gratis en Connect** empuja a los clientes hacia el plan superior y deja a DoorLoop ganar con la adopción de pagos online. El ACH es barato para la procesadora. [Inferencia]
4. **Usuarios, almacenamiento y API ilimitados.** Quitan razones para no adoptar y concentran el cobro en la unidad. [Inferencia]
5. **Cobros transaccionales sobre el flujo de dinero** (screening, pagos, seguro) dan ingreso que crece con el uso. [Inferencia]
6. **Multiply por invitación** limita el despliegue de agentes de mayor riesgo a clientes elegidos y protege la calidad. [Inferencia]

---

## 6. Qué cambia en la comprensión general

- El producto es un **sistema contable disfrazado de herramienta de gestión**. Cada acción (cargo, pago, fee, distribución) termina en el libro y en un reporte. Ahí está la complejidad y el valor.
- El **cierre mensual** es un flujo con dependencias estrictas. Un replicador que ignore el orden producirá números incorrectos para los propietarios.
- Las **automatizaciones simples** (workflows) y las **de IA** (agentes) son capas distintas. Una cubre eventos de calendario, la otra cubre tareas con juicio.
- El **modelo de permisos** es una matriz de objeto por acción. Esto es sencillo de construir y es difícil de configurar bien.
- La **monetización** descansa en unidad, nivel de IA y flujo de dinero.

## 7. Lo que sigue sin confirmar

| Tema | Estado |
|---|---|
| Reglas exactas de cargos por mora, fees ACH del manager y fees por pago devuelto | No leídas |
| Artículo "Workflows for the Advanced User" | No leído |
| Alcance por propiedad de los usuarios | Solo inferido |
| Columnas exactas de la tabla de precios (ACH, créditos) | Ambiguas |
| Mínimos de gasto por plan | Solo por terceros |
| Funcionamiento interno de los agentes de IA | No público |
| Arquitectura interna | Solo inferida |


---

# Parte 3: Egresos y gastos en DoorLoop, a profundidad

Fecha de la investigación: 2026-11-16. Fuente: artículos del centro de ayuda de DoorLoop (colecciones "A/P: What You Owe (Bills and Expenses)", "Outgoing Payments", "Check Printing", "Vendor Management", "Budgeting" y "Forms 1099").

Etiquetas: **[Fuente]** lo dice la documentación pública. **[Inferencia]** lo deduzco yo. **[Vacío]** la página no lo dice o no pude leerla.

---

## 1. El modelo mental: dos caminos para registrar un egreso

DoorLoop separa los egresos en dos caminos que terminan en el mismo lugar contable. La elección depende de si ya pagaste. [Fuente]

| | **Bill (factura de proveedor)** | **Expense (gasto)** |
|---|---|---|
| Qué es | Un documento de un proveedor por algo que debes y pagarás después | Un pago que ya hiciste |
| Estado | Sin pagar. El pago se registra más adelante | Pagado en el momento del registro |
| Cuándo usarlo | Recibes una factura y la pagarás después | Ya pagaste con tarjeta, efectivo o transferencia |
| Efecto contable | Aumenta cuentas por pagar (pasivo) | Disminuye efectivo o saldo bancario (activo) |
| Flujo | Crear la factura, y después registrar el pago | Crear el gasto y terminar |
| Quién puede ser el acreedor | Solo un proveedor (vendor) | Inquilino, propietario o proveedor |
| De dónde puede salir el dinero | Solo de los fondos de la propiedad a la que está ligada | De la cuenta operativa de cualquier propiedad, tenga o no fondos |

Frase clave de la documentación: un gasto "accomplishes the same accounting end result as a bill and bill payment, but in one step rather than two". [Fuente]

Regla que protege el libro: **no se paga una factura abierta creando un gasto.** "An expense doesn't mark a bill as paid." [Fuente]

**Por qué lo diseñaron así** [Inferencia]: la factura sirve para llevar cuentas por pagar con fechas de vencimiento. El gasto es la salida rápida para lo que ya ocurrió. Tener ambos evita obligar al usuario a registrar dos transacciones para una compra con tarjeta.

---

## 2. El gasto (Expense) a fondo

### 2.1 Campos [Fuente]

| Campo | Qué hace |
|---|---|
| Select Payee | Inquilino, propietario o proveedor. Se pueden crear nuevos sobre la marcha |
| Reference | Número único por defecto, editable |
| One Time Expense | Se deja marcado salvo que quieras un gasto recurrente |
| Expense Date | La fecha de pago |
| Pay From Account | Cuenta bancaria que paga |
| Payment Method | Cheque, ePay (pago electrónico) u otros métodos que se pagan fuera de DoorLoop |
| Property | Propiedad que genera el gasto |
| Unit | Opcional |
| Category | Cuenta de gasto, para contabilidad y reportes |
| Description | Aparece en el comprobante (voucher) del cheque impreso |
| Amount | Monto de la línea |
| Add Memo | Aparece en la línea de memo del cheque |
| Archivos | Se arrastran o se suben |

Un gasto admite **varias líneas** ("Add Line Item"). La propiedad de las líneas nuevas se rellena sola con la de la primera. [Fuente]

### 2.2 Reglas del método de pago [Fuente]

- **Cheque:** se escribe el número si el cheque se emitió fuera de DoorLoop, o se elige "Add to Print Queue" para imprimirlo desde el sistema.
- **ePay:** solo si ya configuraste Outgoing Payments. Tras guardar, hay que ir a enviar el pago.
- **Los demás métodos** (transferencia, efectivo, giro, otros) se pagan fuera de DoorLoop y el sistema solo los registra.

### 2.3 Fecha de pago contra envío real [Fuente]

"The Payment Date is when you actually paid the expense." Con ePay, la fecha no retrasa el envío. El pago sale el día en que se hace clic en Send, manualmente, y se procesa el mismo día.

### 2.4 Captura con IA [Fuente]

Hay una zona "AI Expense Capture" a la derecha del formulario. Se arrastra una factura o recibo y la IA llena la descripción y el monto de cada línea. Ver sección 12.

### 2.5 Editar y borrar [Fuente]

Se cambia cualquier campo y se guarda, o se borra con el icono de basura. Los reportes se actualizan solos. [Vacío] La página no menciona restricciones por periodo cerrado, conciliación o cheque ya impreso.

---

## 3. La factura (Bill) a fondo

### 3.1 Campos [Fuente]

| Campo | Qué hace |
|---|---|
| Select Vendor | Proveedor al que se le debe |
| Invoice Date | Fecha en que se recibió la factura |
| Due Date | Fecha de vencimiento. Los reportes la usan para mostrar cuántos días faltan y qué facturas están vencidas |
| Reference | Número de factura del proveedor |
| Repeat this Bill | Apagado para facturas de una sola vez |
| Property, Unit, Category, Description, Amount | Igual que en un gasto, por línea |
| Add Memo | Aparece en el memo del cheque |
| Share These Files With Owners | Comparte los archivos con el propietario (portal) |

Se puede **guardar como borrador** y continuar después ("Save Draft"), o crear la factura directamente. [Fuente]

### 3.2 Restricciones [Fuente]

- Una factura solo se liga a un proveedor.
- Solo se puede pagar con los fondos de la propiedad a la que está ligada (ver sección 5).

### 3.3 Editar y borrar [Fuente]

Se puede corregir monto, fecha o cuenta, o borrarla si se creó por error. **No se puede editar ni borrar una factura que ya tiene un pago.** Hay que borrar primero el pago de la factura. Los reportes se actualizan solos.

---

## 4. Pagar una factura (Bill Payment)

La pantalla "Pay Bills" funciona como un asistente de tres paneles. [Fuente]

1. **Panel izquierdo:** se eligen proveedores con casilla. Solo aparecen los que tienen facturas abiertas.
2. **Panel central:** se ven las facturas abiertas de los proveedores elegidos. Se marcan una o varias.
3. **Resumen del pago:** fecha de pago, fondos de la propiedad ("Property Funds in Account", con desglose al pasar el cursor), opción de **consolidar pagos** (varias facturas del mismo proveedor en un solo pago) y método de pago.

Métodos de pago:
- **Cheque:** entra automáticamente a la cola "Ready to Print".
- **ePay:** envío electrónico por correo.
- **Otros:** se pagan fuera de DoorLoop.

Luego "Review Payment" y "Create Payment". Si el método fue ePay o cheque, el sistema recuerda que falta terminar el envío o la impresión. [Fuente]

**Pagos parciales.** En la versión anterior del asistente se desactiva "Automatically Pay", se hace clic en Edit y se escribe el monto a pagar de cada factura y la cuenta bancaria. "You can also partially pay a bill and pay the rest of later." [Fuente]

**Crédito de proveedor.** Se activa "Apply Available Credit" y el resumen muestra un pago menor (ver sección 8). [Fuente]

---

## 5. La regla de fondos disponibles (la pieza más interesante)

DoorLoop **bloquea** el pago de una factura si la propiedad no tiene fondos. [Fuente]

**Cómo se calcula:** "A property's available funds consist of its Cash Balance minus Deposits Held for the property." [Fuente]

- El **Cash Balance** incluye los ingresos de la propiedad, menos gastos y distribuciones a propietarios. También incluye el dinero asignado a la propiedad en los **saldos de apertura** de las cuentas bancarias. [Fuente]
- Los **depósitos de garantía** retenidos se restan, para no gastar dinero que pertenece al inquilino. [Fuente]

**Mensaje de error:** "You either did not select a bill, don't have any unpaid bills, or you don't have enough available funds for payment." [Fuente]

**Causas comunes** [Fuente]: no hay fondos liquidados en la cuenta, pasivos pendientes, saldo de apertura mal capturado, o fondos en otras cuentas específicas de la propiedad. También gastos duplicados por accidente y pagos de inquilinos mal registrados.

**Cómo se anula** [Fuente]: en el asistente se desactiva "Automatically Pay", se hace clic en Edit, se escribe el monto y la cuenta. Aparece una advertencia pero se puede continuar. Dos cuadros ayudan a decidir: "Property Account Balance" (dinero de la propiedad en esa cuenta) y "Property Available Funds" (total en todas las cuentas), con enlace a un reporte "Bank Balance By Property".

**Excepción:** "expenses don't check for sufficient funds." Registrar el egreso como gasto evita la verificación. [Fuente]

**Por qué existe** [Fuente + Inferencia]: la documentación dice que sirve para evitar "accidentally paying out money not meant for a property". Esto protege dinero de terceros cuando una misma cuenta bancaria guarda fondos de varias propiedades. Es una regla pensada para administradores, y explica por qué el gasto queda como puerta de escape para el administrador que no necesita ese control.

---

## 6. Gastos y facturas recurrentes

**Gasto recurrente** [Fuente]: campos Start Date, End Date, Frequency y "Repeat Forever", más los campos normales (pagador, cuenta, método, categoría, propiedad, memo, monto). Al crearlo "doesn't create all of its future expenses right away", solo programa un calendario. Cada gasto se contabiliza automáticamente en su fecha y no aparece en reportes antes.

**Factura recurrente** [Fuente]: "Repeat this Bill", Frequency, First Bill Date, End Date (o "Never") y **Days Until Due**, el número de días entre la creación y el vencimiento. Ejemplo de la documentación: si te facturan el día 1 y vence el 10, se escribe 9.

[Vacío] Las páginas no listan las opciones de frecuencia ni explican qué pasa con las ocurrencias futuras al editar o borrar la serie. Existe un artículo "Edit or Delete Recurring Bills and Expenses" que no leí.

---

## 7. Dónde se carga el gasto: propiedades, unidades y portafolios

### 7.1 Líneas por propiedad y unidad [Fuente]

Cada línea lleva su propiedad y, opcionalmente, su unidad. Un mismo gasto puede dividirse en varias propiedades.

### 7.2 Asignación masiva por portafolio [Fuente]

Aplica a gastos, facturas y créditos de proveedor.

1. Menú junto a "Add Line" y "Add Line Items to Properties From a Portfolio".
2. Se elige el portafolio. Todas sus propiedades se agregan, y se desmarcan las que no aplican.
3. Se elige la categoría.
4. **Método de asignación:**
   - **Allocate Evenly:** reparte un monto en partes iguales.
   - **Fixed Amount:** el mismo monto fijo para cada propiedad.
   - **Allocate Manually:** monto escrito a mano por propiedad.
5. **Redondeo:** por defecto "Nearest Hundredth" (centésimas), también "Nearest Tenth" o "Nearest Whole Number".
6. Se escribe el monto y se ve cómo se reparte.

Después de guardar, cada propiedad queda como una línea independiente. "You won't be able to adjust the line items in bulk anymore." Para cambiar en bloque hay que borrar y rehacer. [Fuente]

### 7.3 Asignación por unidades [Fuente]

Lo mismo pero entre las unidades de una propiedad, con los mismos tres métodos y el mismo redondeo. Sirve para costos compartidos como jardinería o servicios.

[Vacío] No encontré reparto por metros cuadrados ni explicación de cómo se manejan los centavos sobrantes.

---

## 8. Créditos de proveedor

[Fuente]

- **Qué es:** una transacción que reduce lo que se le debe al proveedor en una factura futura. Ejemplo de la documentación: pagaste 400 por jardinería y salió en 350, el proveedor te da un crédito de 50.
- **Crear:** Create New > Add Credit. Campos: proveedor, propiedad, categoría (normalmente una cuenta de gasto), descripción opcional y monto, con varias líneas posibles, memo y archivos.
- **Aplicar:** en Pay Bills se activa "Apply Available Credit". El resumen muestra el pago ya reducido.
- **Regla:** "Vendor credits are only applied to bills for the correct vendor and property that the original Vendor Credit was made for."

[Vacío] La página no dice qué pasa con un crédito sobrante ni cómo se contabiliza. También existe un artículo de reembolso del proveedor a una tarjeta o cuenta bancaria que no leí.

---

## 9. Casos especiales

### 9.1 Gasto pagado con tarjeta de crédito [Fuente]

- Se crea una cuenta **Liability > Credit Card** en el plan de cuentas.
- En el gasto, "Pay From Account" es esa cuenta y el método es Credit Card.
- Para sacar el gasto de los "Adjustments to Reconcile Net Income to Net Cash" en el flujo de efectivo, se registra el pago de la tarjeta con una **transferencia bancaria**.
- Efecto en el flujo: el gasto aparece negativo en Expenses y positivo en los ajustes para conciliar, así que no afecta el efectivo real hasta que se paga la tarjeta.

### 9.2 Gasto que paga el propietario directamente [Fuente]

Se registra con un **asiento contable (Journal Entry)**, porque el dinero no sale de la cuenta operativa: se debita la cuenta de gasto y se acredita **Equity > Owner Contribution**, con la fecha en que el propietario pagó. El resultado aparece como aportación del propietario y como gasto en los reportes.

### 9.3 Factura al propietario [Fuente]

Cuando el propietario debe pagar algo, el administrador crea una factura (bill), la imprime como PDF desde el reporte "Bills & Expenses" y la envía **fuera de DoorLoop**. El propietario paga fuera de la plataforma. Después se registra el pago de la factura y, según el caso, una aportación del propietario.

### 9.4 Comisión a un corredor o agente inmobiliario [Fuente]

Se registra como **gasto** con una cuenta "Commissions" de tipo Expense, y el agente se crea como proveedor.

### 9.5 Comisión de administración

Se paga como factura al propio administrador (ver Parte 2, sección 1.3).

---

## 10. Pagos salientes (Outgoing Payments)

### 10.1 Qué es [Fuente]

Una integración con **Checkbook.io** y **Plaid** para pagar facturas de proveedores, distribuir a propietarios y devolver depósitos o pagos de más a inquilinos. El receptor decide cómo recibir el dinero. Solo en EE. UU. y solo hacia bancos de EE. UU.

### 10.2 Configuración [Fuente]

1. Accounting > Outgoing Payments > pestaña "Payment Account Setup" > Connect.
2. Aceptar términos y "Connect Bank".
3. Conectar con Plaid, con dos opciones:
   - **Verificación instantánea:** se inicia sesión en el banco a través de Plaid.
   - **Verificación manual:** se escriben la cuenta y el número de ruta y se confirma con un **microdepósito** (tarda de 1 a 2 días).
4. Requisito: el banco elegido debe ser el mismo que se usa como cuenta de pago en el merchant account.
5. Antes hace falta un merchant account para recibir pagos.

### 10.3 Flujo de envío [Fuente]

1. Se crea el gasto, pago de factura, reembolso o distribución con método **ePay** (no EFT).
2. En Accounting > Outgoing Payments aparece el pago. Si hay un botón "Add Info", se completa la información del receptor: método Email y correo.
3. Clic en **Send**.
4. Verificación de identidad con un **código de 6 dígitos** enviado al celular.
5. Revisión (sobre todo la dirección postal) y "Send Payment".

Tiempos: el pago sale **dentro de 3 horas** desde el clic, y en ese lapso se puede anular. El correo del receptor tarda alrededor de 4 horas en llegar. El remitente recibe copia.

El receptor abre el correo y elige **depósito directo ACH** o **imprimir el cheque** y depositarlo. Si quiere cambiar la cuenta donde cae, lo hace desde su lado en Checkbook.io. DoorLoop no necesita guardar sus datos bancarios. [Fuente]

### 10.4 Envío masivo [Fuente]

Se marcan varios pagos en la pestaña Transactions y "Send Payments". Se verifica con el código de 6 dígitos y se confirma. El resumen indica cuáles se enviaron, cuáles no por falta de información y cuáles ya se habían enviado antes.

### 10.5 Estados [Fuente]

Solo vi dos definidos: **Voided** (anulado, se puede reenviar) y **Paid** (recibido y depositado). [Vacío] No encontré otros estados como fallido o en tránsito.

### 10.6 Comisiones [Fuente]

| Concepto | Costo |
|---|---|
| Pago digital | USD 1.00 |
| Cheque físico | USD 1.79 |
| Devolución | USD 25 |
| Contracargo | USD 35 |

**Quién paga** (Settings > Fees Settings > Outgoing Payment Fee):
- **El propietario** (por defecto): la comisión se carga a la propiedad, aparece en el owner statement y genera un asiento contable.
- **La empresa administradora:** absorbe el costo. Se cobra por Stripe Billing contra la suscripción mediante un **saldo prepagado de USD 25 que se recarga solo**. No genera asiento contra la propiedad. Si la suscripción no está activa, la comisión se carga a la propiedad.
- Las comisiones de devolución y contracargo siguen la misma regla que el pago original.
- Hay una "propiedad por defecto" para comisiones que no pertenecen a una propiedad concreta.

### 10.7 Límites [Fuente]

Existe un **límite mensual** por cuenta bancaria y total ("Monthly Limit" y "Max Monthly Payment per Account"), visibles en la pestaña "Usage & Limits info". Su propósito declarado: "protect you from any fraudulent behavior from tenants that could cause a loss in finances." [Vacío] No dice los montos ni cómo se fijan, pero el título del artículo menciona cómo solicitar un aumento.

---

## 11. Impresión de cheques

[Fuente]

- **Formatos:** voucher (un cheque por página, con comprobante) o estándar (tres por página, sin comprobante).
- **Datos del banco:** se pueden imprimir cuenta, ruta y número de cheque, o apagar la opción si el papel ya los trae impresos. También se configuran el nombre del titular, la información de contacto del banco y el **siguiente número de cheque**.
- **Qué se imprime dónde:** el número arriba a la derecha, el banco arriba al centro, el titular arriba a la izquierda, la dirección del beneficiario sobre la línea de memo, y el memo del gasto o factura.
- **Formato del beneficiario:** nombre de empresa, nombre completo o ambos.
- **Alineación:** ajuste de altura con pruebas en papel normal. Recomiendan Google Chrome, márgenes por defecto, escala por defecto o tamaño real, sin encabezados ni pies, sin gráficos de fondo y sin impresión a dos caras.
- **Cola de impresión:** los cheques "Ready to Print" esperan ahí. Existen artículos para crear, imprimir, reimprimir y anular un cheque.
- **Alcance:** estos pasos son para cheques impresos desde DoorLoop. Los cheques de ePay por Checkbook.io son otro camino.

[Vacío] No leí las reglas de reimpresión y anulación.

---

## 12. Captura de facturas con IA (QuickBill)

[Fuente]

- Disponible como complemento pagado o incluido en los planes One, Connect y Multiply.
- Se sube un archivo y en unos segundos la IA llena **descripción y monto de cada línea**.
- **Lo que debe hacer la persona:** elegir proveedor o propietario, cuenta de pago, método, propiedad, unidad y categoría. Revisar los datos y agregar a mano el impuesto sobre ventas si no apareció.
- **Límites:** formatos jpg, pdf y png, máximo 10 MB, un archivo a la vez (una factura de varias páginas cuenta como un archivo si comparte el mismo número de referencia).

**Lectura** [Inferencia]: la IA reduce la captura de dos campos y deja la clasificación contable en manos de la persona. El diseño es conservador, porque la categoría y la propiedad son los datos cuyo error cuesta más.

---

## 13. Proveedores (Vendors)

[Fuente salvo indicación]

- **Qué son:** contratistas, proveedores y prestadores de servicio. Se pueden ligar a gastos, facturas, órdenes de trabajo y solicitudes de inquilinos.
- **Campos** (de la API, Parte 1): contacto, vencimiento del seguro, saldo abierto, propiedades que atiende, datos fiscales para 1099.
- **Categorías por defecto:** en People > Vendors > Edit > pestaña Services se eligen categorías. Al crear una factura o gasto con ese proveedor, **las líneas se rellenan solas** con esas categorías.
- **Clasificaciones (vendor classifications):** etiquetas personalizadas en Settings > Related Lists para organizar y filtrar la lista de proveedores.
- **Proveedor como usuario:** un proveedor puede tener acceso a la cuenta (portal). Existe un artículo "How to Collect Your Payment From the Property Manager" para el lado del proveedor.
- **Órdenes de trabajo:** se asigna o notifica al proveedor desde la orden.
- **Inactivar:** existe la opción de dejar un proveedor inactivo.
- [Vacío] La vista general del proveedor no detalló qué muestra su página (facturas, gastos, saldos).

---

## 14. Presupuestos (Budgeting)

[Fuente]

- **Tipo:** Profit & Loss o Balance Sheet.
- **Nivel:** por propiedad o por portafolio.
- **Parámetros:** mes de inicio (normalmente el primer mes del año fiscal) y año fiscal (solo el actual o futuros).
- **Desglose:** mensual, trimestral o anual.
- **Captura:** se escribe en cada celda. Un monto en la columna **Total** se reparte en partes iguales entre los meses. "Fill Totals" aplica eso a filas seleccionadas. Un icono de copiar lleva el monto a las columnas de la derecha. "Clear Data" limpia filas. "Fill With Reference Data" llena con datos de referencia mostrados debajo de cada campo.
- **Duplicar y borrar** presupuestos están soportados.
- **Reporte "Budget vs Actual":** compara lo presupuestado con lo real, con método contable de efectivo por defecto. [Vacío] No encontré la fórmula de variación ni las columnas exactas.

---

## 15. Formularios fiscales de EE. UU.

Para proveedores y propietarios se generan 1099-NEC y 1099-MISC y se presentan con Avalara. También hay un artículo sobre la forma 1099-K. [Fuente] No aplica a México.

---

## 16. Reportes relacionados con egresos

Del catálogo de reportes de la Parte 1 [Fuente]: Bills & Expenses, antigüedad de cuentas por pagar (detalle y resumen), transacciones por proveedor, registro de cheques, reporte de comisiones de administración, undeposited funds, owner statement, P&L, flujo de efectivo y la bitácora de auditoría.

---

## 17. Cómo se conecta todo

```
Factura del proveedor
   |  (Create Bill, con vencimiento)
   v
BILL (pasivo) ---- fondos de la propiedad suficientes? ----> si no: error, o se anula a mano
   |  (Pay Bill: consolida, aplica crédito, parcial)
   v
BILL PAYMENT ---> método: cheque (cola de impresión) | ePay (Outgoing Payments) | externo
   |
   v
Reportes (P&L, flujo, owner statement, antigüedad CxP)

Compra ya pagada --> EXPENSE (activo baja) --> mismo destino contable, sin verificar fondos

Compra con tarjeta --> EXPENSE contra cuenta de pasivo de tarjeta --> transferencia bancaria para pagar la tarjeta
Pago del propietario --> ASIENTO: debe gasto, haber Owner Contribution
Gasto en varias propiedades o unidades --> líneas (portafolio o unidad) con reparto parejo, fijo o manual
```

---

## 18. Por qué está diseñado así (lectura de conjunto)

1. **Separar "deber" de "pagar".** Permite fechas de vencimiento, reportes de antigüedad y pagos parciales, que es lo que un administrador necesita para no pagar dos veces ni tarde. [Inferencia]
2. **Proteger el dinero de cada propiedad.** La verificación de fondos disponibles evita que el efectivo de una propiedad pague las facturas de otra. [Fuente: propósito declarado]
3. **Dejar una salida para el usuario sencillo.** El gasto sin verificación sirve a quien no lleva balance por propiedad. [Fuente: tip del artículo]
4. **Que el costo del pago saliente tenga dueño explícito.** Se decide si lo asume el propietario o la administradora, y cada opción tiene su contabilidad. [Fuente]
5. **Humano al final en la IA.** La captura llena montos y descripciones y deja categorías y propiedad a una persona. [Fuente + Inferencia]
6. **Todo sobre un mismo libro.** Facturas, gastos, cheques, ePay, comisiones, distribuciones y aportaciones terminan en las mismas cuentas, así los reportes concuerdan. [Inferencia]

---

## 19. Lo que no pude confirmar

| Tema | Falta |
|---|---|
| Frecuencias de recurrentes | No se listan en los artículos |
| Qué pasa al editar o borrar una serie recurrente | Artículo no leído |
| Crédito de proveedor sobrante y su contabilidad | No explicado |
| Restricciones por periodo cerrado o conciliación | No mencionadas en edición de gastos |
| Estados de pago saliente (fallido, en tránsito) | Solo vi Voided y Paid |
| Montos de límites mensuales | No publicados |
| Fórmula del reporte Budget vs Actual | No explicada |
| Reglas de reimpresión y anulación de cheques | Artículos no leídos |
| Reembolso de proveedor a banco o tarjeta | Artículo no leído |
| Transferencias bancarias y depósitos manuales | Fuera del alcance de esta parte |

---

## 20. Qué significa para Zatu

Comparación con la auditoría de Zatu (commit `d4a3c414`). Cada fila indica lo que Zatu tiene hoy, según la auditoría, y lo que haría falta.

| Capacidad en DoorLoop | Zatu hoy | Qué haría falta |
|---|---|---|
| Gasto ya pagado con líneas | `expenses` con categoría, propiedad, fecha y periodo | Líneas múltiples por gasto con cuenta por línea |
| Factura por pagar con vencimiento | Ausente. Existen `payment_requests` (autorizaciones) y `recurring_expenses` | Entidad de factura de proveedor con fechas de recepción y vencimiento, estado y pagos parciales |
| Antigüedad de cuentas por pagar | Ausente | Reporte de vencidos por proveedor y rango de días |
| Pago de factura (uno o varios, parcial, consolidado) | Parcial: el gasto se registra como pagado | Asistente de pago con selección múltiple, pago parcial y consolidación por proveedor |
| Crédito de proveedor | Ausente | Entidad de crédito aplicable a facturas del mismo proveedor y propiedad |
| Verificación de fondos por propiedad | Ausente. Existe "cubo del dinero" por propiedad | Cálculo de efectivo disponible (caja menos depósitos retenidos) con advertencia al pagar |
| Reparto entre varias propiedades | `expense_allocations` entre **sociedades**, suma 100 % ± 0.5, reparto en centavos por residuo mayor | Reparto entre propiedades y unidades con métodos parejo, fijo y manual, y redondeo configurable |
| Recurrentes | `recurring_expenses` con barrido diario | Facturas recurrentes con "días hasta el vencimiento" |
| Aprobación de pagos | `payment_requests` con autorización del dueño. Regla de monto mínimo oculta | Activar la aprobación por monto y por rol |
| Pago saliente | Sin dispersión SPEI. El pago se registra | Opcional: dispersión SPEI y cola de pagos pendientes con verificación de dos pasos |
| Cheques | Fuera de contexto en México | Se omite |
| Captura con IA | Lectura de comprobantes, contratos y mapeo de Excel; CFDI se lee por XML | Captura de facturas recibidas (XML y PDF) que proponga proveedor, monto, IVA, retenciones y categoría, con revisión humana |
| Proveedores con categorías por defecto | `providers` con retención y presupuesto con aviso al 80 % | Categorías por defecto por proveedor que rellenen las líneas |
| Aportación del propietario por gasto pagado directo | Ausente | Movimiento de aportación ligado al gasto |
| Presupuesto por propiedad contra real | Parcial: expectativas de gasto y tope por proveedor | Presupuesto mensual por propiedad y reporte contra real |
| Comisión de administración | Ausente | Ver Parte 2 (fees como factura al administrador) |
| Comisiones por pago saliente y límites mensuales | No aplican sin pasarela | Solo si se agrega dispersión |

### Prioridades que se desprenden (Ola 1 y 2 del plan)

1. **Factura de proveedor con vencimiento y antigüedad de cuentas por pagar.** Es la brecha con mayor valor para un dueño que paga a proveedores a crédito. Se alimenta del XML de CFDI que Zatu ya sabe leer.
2. **Captura asistida de facturas recibidas** con revisión humana, siguiendo el patrón de QuickBill y apoyándose en la lectura de CFDI.
3. **Reparto de un gasto entre propiedades y unidades** con métodos parejo, fijo y manual y redondeo en centavos (Zatu ya tiene la lógica de residuo mayor).
4. **Aprobación por monto** activando las reglas ocultas.
5. **Efectivo disponible por propiedad** como advertencia antes de pagar, con bloqueo opcional, para quien no lleva fondos separados.
6. **Crédito de proveedor** y **pago parcial** como complementos.
7. **Presupuesto por propiedad contra real**.

Lo que no conviene copiar para México: cheques impresos, 1099, ACH y la mecánica de Checkbook.io. La alternativa local es una cola de pagos por SPEI, que depende de la decisión de cobro en línea y pagos del plan.
