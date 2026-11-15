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
