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
