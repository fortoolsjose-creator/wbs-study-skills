# Brainstorm: software de gestión de propiedades en renta

Notas mías para pensar el producto completo antes de construir nada. Escribo todo en abierto: ideas, dudas y decisiones pendientes. Donde no estoy seguro de algo lo marco como "por validar".

---

## 0. Punto de partida

Quiero entender bien qué hace un software de este tipo, cómo lo hace y por qué se diseña así. Después viene la parte de construir.

Mi primera conclusión: esto es un sistema contable con ropa de herramienta de gestión. Cada acción que hace un administrador (cobrar renta, pagar un proveedor, cobrar su comisión, repartir ganancias) termina en un libro contable y en un reporte. Ahí está la complejidad y también el valor. Lo demás (portales, mensajes, listados) alimenta ese libro o se alimenta de él.

---

## 1. Para quién lo haría

Tres tipos de cliente, y cada uno estira el producto en una dirección distinta:

1. **El dueño que administra lo suyo.** Pocas unidades, quiere cobrar y llevar sus números sin llamar a un contador.
2. **El administrador de propiedades de terceros.** Cobra una comisión, maneja dinero ajeno, rinde cuentas a cada propietario. Aquí viven las reglas fiduciarias.
3. **El administrador comercial o de asociaciones.** Necesita gastos compartidos (CAM), prorrateos por metro cuadrado y cuotas de HOA.

Duda: ¿arranco con el tipo 1 y 2, que comparten el 80 % del producto, y dejo el tipo 3 para una fase posterior? Me inclino por sí. El cálculo comercial se puede agregar después sobre el mismo libro.

---

## 2. El ciclo de vida de una unidad

Este es el hilo que une todos los módulos. Lo dibujo como una secuencia:

1. **Vacante.** La unidad se marca abierta y se publica un listado que se sindica a portales como Zillow.
2. **Prospecto.** Consultas, solicitudes de tour y solicitudes de aplicación llegan a una bandeja de comunicación.
3. **Showing.** Disponibilidad por agente, y el prospecto agenda solo.
4. **Aplicación.** El prospecto llena una solicitud con cuota opcional.
5. **Screening.** Reporte de crédito, criminal y desalojos a través de un proveedor.
6. **Contrato.** Se crea el lease, el prospecto pasa a inquilino y se firma con firma electrónica.
7. **Cargos recurrentes.** Renta, depósito, otras cuotas.
8. **Cobro.** Portal, autopago, enlace de pago o efectivo.
9. **Contabilidad.** Cada movimiento afecta el libro.
10. **Mantenimiento.** Solicitudes y órdenes de trabajo durante la ocupación.
11. **Renovación o salida.**
12. **Reporte al propietario.** Statements, distribuciones, contribuciones.

Idea que me gusta: tener un solo registro de persona con un campo `type` (prospecto o inquilino). Cuando alguien firma, cambia el tipo y conserva historial, notas y archivos. Evita duplicar contactos.

---

## 3. Mapa de módulos

**Financieros:** cobro de renta, contabilidad de partida doble, sincronización bancaria, reportes, exportación o sync con un programa contable externo.

**Arrendamiento:** listados y sindicación, sitio web de propiedades, CRM de prospectos, aplicaciones, screening, firma electrónica, seguro de inquilinos.

**Operaciones:** mantenimiento, portales (inquilino, propietario, proveedor, agente), comunicación, workflows, archivos, app móvil, inspecciones.

**Capa de IA:** asistente, recepcionista de mensajes y llamadas, y agentes para mantenimiento, renovaciones, cobranza y arrendamiento.

---

## 4. Modelo de datos

Borrador de entidades. Cada una lleva su relación principal:

| Entidad | Campos que me parecen clave | Relaciones |
|---|---|---|
| Account (cuenta contable) | nombre, tipo, activa, descripción | Plan de cuentas; la referencian todas las líneas de transacción |
| Property | nombre, tipo, dirección, clase, amenidades, fotos | Pertenece a portafolios; tiene unidades y propietarios con porcentaje |
| Portfolio | nombre, lista de propiedades | Agrupa propiedades para reportes |
| Unit | camas, baños, tamaño, renta de mercado, ocupada, estado del lease, depósitos retenidos, etapa de renovación, último pago, último pago devuelto | Pertenece a Property |
| Lease | inicio, fin, plazo, paso a mes-a-mes, estado, desalojo pendiente, seguro requerido, saldo adeudado, depósitos, renta recurrente | Une Property, Unit y Tenants |
| Person (prospecto o inquilino) | contacto, tipo, portal, fechas de mudanza, interés, fuente del lead, puntaje de crédito, ingreso mensual | Un registro sirve para las dos etapas |
| LeaseTenant | lease, tenant | Tabla de unión |
| Charge / Credit | líneas (monto, cuenta, memo, saldo), fecha, lote | Lease y Account |
| Payment | monto recibido, método, cuenta de depósito, auto-aplicar, estado de depósito, devuelto | Lease, Tenant y Account |
| ReversedPayment | pago original, líneas, monto | Reversa un Payment |
| Owner | fechas de gestión, datos fiscales para 1099, contacto | Propiedades con porcentaje |
| Vendor | contacto, vencimiento de seguro, saldo abierto, datos fiscales | Propiedades que atiende |
| VendorBill / VendorCredit | proveedor, líneas, vencimiento, saldo | Vendor, Account y recurso vinculado |
| Expense | cuenta de pago, método, a quién se paga, líneas | Account y recursos |
| Task | tipo (interna, solicitud de inquilino, solicitud de propietario, orden de trabajo), prioridad, estado, asignados, permiso de entrada, aprobación del dueño, facturado, factura del proveedor | Property, Unit, Vendor, VendorBill |
| Note / File | texto o archivo, etiquetas | Vínculo polimórfico (`resourceType` + `resourceId`) a casi cualquier entidad |
| Communication | asunto, cuerpo, de/para, apertura, clic, rebote, hilo | Registro de cada mensaje |
| User | rol, propiedades permitidas, último acceso | Operadores de la cuenta |

Decisiones de diseño que quiero tomar desde el día uno:

- **Una sola tabla de personas** para prospecto e inquilino.
- **Cargos, créditos y pagos como transacciones con líneas**, y cada línea apunta a una cuenta contable. Así un cargo puede repartirse en renta, estacionamiento y cuota de mascota.
- **Un solo tipo `Task`** para tareas internas, solicitudes y órdenes de trabajo. Una solicitud escala a orden de trabajo sin migrar datos.
- **Vínculo polimórfico** para notas y archivos. Un solo mecanismo adjunta documentos a cualquier cosa.
- **Saldos precalculados** en lease y unidad (saldo adeudado, depósitos retenidos). Las listas cargan rápido sin recorrer el libro.
- **Correcciones por reversa.** Si un pago se devuelve o se corrige, se crea una transacción nueva y el historial queda intacto.

Convenciones de API que me parecen sensatas: token Bearer, paginación con `page_number` y `page_size` (50 por defecto, máximo 1000), filtros con prefijo `filter_` (`filter_property`, `filter_date_from`), reportes con filtro de método contable (efectivo o devengado).

---

## 5. El libro del lease: cargo, pago y depósito

Tres transacciones básicas:

- **Cargo.** Crea una deuda del inquilino (renta, mora, cuota).
- **Pago.** Registra el dinero recibido. Al principio queda como fondos no depositados.
- **Depósito.** Agrupa pagos y los lleva a una cuenta bancaria real.

Por qué separar pago y depósito: el dinero que el inquilino pagó todavía no está en el banco. Con lotes de depósito puedo conciliar el banco contra transacciones reales. Necesito un reporte de fondos no depositados y reportes de resumen y detalle de depósitos.

**Asignación de pagos.** Regla por defecto: el pago se aplica al cargo más antiguo. Quiero poder definir prioridad por categoría de cuenta, de arriba hacia abajo, en tres niveles: empresa, propiedad y lease. Importa cuando alguien paga menos de lo debido. Muchos administradores quieren cobrar primero la renta y después las multas.

**Estados de un pago electrónico:**

| Estado | Significado |
|---|---|
| Processing | En manos del procesador |
| Succeeded | Capturado, aún sin depositar |
| Undeposited | Sin llegar al banco |
| Deposited | En el banco |
| Failed | No se completó |
| Disputed | El inquilino lo disputó |

Además un indicador `returned` y pagos reversados. Los estados reflejan algo concreto: el ACH tarda días y puede devolverse después de parecer exitoso.

**Cargos automáticos:** mora, cuotas ACH del administrador y cuotas por pago devuelto. Pendiente investigar las reglas exactas (gracia, tope, porcentaje o fijo).

---

## 6. Cobro de renta

Piezas que quiero:

- Tarjeta, débito y ACH. Efectivo en puntos de pago y registro manual de cheques.
- Autopago recurrente, recordatorios y portal del inquilino.
- Enlace de pago sin necesidad de portal.
- Procesamiento con un procesador de pagos tipo Stripe. No guardo datos de tarjeta nunca.
- Pagos salientes (a proveedores y propietarios) con un servicio de cheques electrónicos tipo Checkbook.io, más impresión de cheques.
- Cuota de conveniencia opcional que el administrador cobra en ACH y se queda como ingreso.

**Dashboard de cobranza.** Lo que me gustaría mostrar:

- Tasa de cobro del ciclo, saldo pendiente, tiempo promedio de cobro, contratos vencidos.
- Proporción de pagos automáticos y manuales de los últimos seis meses.
- Inquilinos sin invitar, invitados que nunca entraron, inquilinos que están en el portal y pagan fuera.
- Porcentaje en autopago y cuántos "están listos para pasar a autopago".
- Acciones a un clic: reenviar invitación, recordatorio de pago, enlace de autoactivación, aviso de pay-or-quit.

Observación importante: cada métrica del dashboard lleva a una acción que empuja al inquilino hacia el autopago. El autopago reduce el trabajo de cobranza y los pagos tardíos, y además es el motor de ingresos del producto, porque el procesamiento paga por transacción.

---

## 7. Contabilidad

- Partida doble con plan de cuentas editable.
- Saldos de apertura, transferencias bancarias, activos fijos y pasivos, presupuestos por propiedad.
- Cuentas por cobrar y por pagar, con aging.
- Formularios 1099-NEC y 1099-MISC para propietarios y proveedores.
- Soporte de varias entidades (LLC, portafolios) dentro de una misma cuenta.
- **Sincronización bancaria y conciliación** en pocos clics.
- Sync con un programa contable externo para evitar doble captura.
- Reportes: P&L, balance general, flujo de efectivo, rent roll, lista de transacciones, estado de cuenta del lease, mora, comisiones, owner statement, aging de cuentas por pagar, seguros, pagos recurrentes, registro de cheques, transacciones por proveedor, recibos de efectivo, y más.
- Método contable seleccionable en cada reporte: efectivo o devengado.

**Registro de auditoría.** Me parece indispensable desde el inicio:

- Qué se registra: cada creación, actualización, borrado y consulta.
- Qué campos: quién, tipo de persona, acción, tipo y id de entidad, IP, user agent y, en actualizaciones, el valor viejo y el nuevo de cada campo.
- Retención: toda la vida de la cuenta.
- Filtros: rango de fechas, tipo de persona, usuario, acción, tipo de entidad, IP.
- Debe distinguir acciones hechas por llaves de API y por soporte con impersonación.

Por qué: se maneja dinero de terceros. Los propietarios y los auditores preguntan quién cambió un monto y cuándo. Las preguntas típicas son "quién cambió la renta de la unidad 4B" y "quién borró esa factura".

### Reconciliación de gastos compartidos (CAM)

Para propiedades comerciales. Cada año hay que cuadrar lo que cada inquilino pagó como estimado mensual contra los gastos reales del edificio.

1. Leo los gastos reales por cuenta del P&L de la propiedad en el periodo.
2. Calculo la parte de cada inquilino con prorrata por metros cuadrados.
3. Aplico excepciones por lease (montos fijos, cuentas excluidas, cuota administrativa, gross-up).
4. Calculo el ajuste.

Fórmulas:

- Prorrata = m² del inquilino ÷ m² totales (o solo ocupados, según la base elegida).
- Parte real = suma de cada cuenta de gasto × prorrata.
- Ajuste = parte real − estimado ya pagado. Positivo, el inquilino debe. Negativo, recibe crédito.

Esto en hojas de cálculo toma horas. Lo dejo para una fase posterior.

---

## 8. Arrendamiento

**Listados.** Publicación de unidades vacantes con sindicación a portales (Zillow, Trulia, HotPads y otros). Las consultas que llegan de esos portales se enrutan a la bandeja de comunicación. Un enlace de aplicación por propiedad, con cuotas, preguntas y requisitos propios.

**Showings.** Disponibilidad por agente, ajustes por defecto, autoagendamiento del prospecto, seguimiento.

**Aplicación.** Pasos de configuración que imagino: ajustes de empresa, ajustes por propiedad, marcar unidades abiertas para aplicaciones, probar, enviar el enlace (correo, texto o web) y notificar cuando llegue una solicitud. Cuando se envía, la persona queda como prospecto. Si se aprueba y se crea el lease, pasa a inquilino. Verificación de ingresos como paso opcional.

**Screening.** Proveedor tipo TransUnion SmartMove: crédito completo, historial criminal y de desalojos. Solo propiedades de EE. UU. por ahora. Cobro por reporte alrededor de $35.

**Screening en dos fases.** Este detalle me llamó la atención. En ciertas jurisdicciones la ley obliga a decidir primero sin ver antecedentes penales ni desalojos:

1. Fase uno: el reporte llega con esa información retenida. Evalúo con los demás criterios y tomo una decisión condicional.
2. Fase dos: si decido avanzar, se libera lo retenido para la revisión final.

El proveedor lo aplica solo donde corresponde. La lección para mí: el cumplimiento legal tiene que vivir dentro del flujo, de modo que el administrador no pueda infringirlo por descuido.

**Contrato.** Firma electrónica ilimitada con plantillas que se llenan con datos del sistema. Seguimiento de renovaciones y asistente de renovación: ver plazos, ajustar términos y enviar a firma en pocos clics.

**Otros:** CRM de prospectos con fuente del lead, sitio web con hosting para listados y enlace al portal, venta de seguro de inquilinos dentro del portal.

---

## 9. Comunicación y portales

**Portal del inquilino.** Pagar renta, ver historial, subir comprobante de seguro, enviar solicitudes con fotos, leer anuncios. Invitación al crear el lease, después, o en lote. El inquilino recibe un correo para crear su contraseña. Opcional: asistente de IA 24/7 que responde preguntas y arma solicitudes de mantenimiento completas.

**Portal del propietario.** Reportes instantáneos, tableros en tiempo real, estatus de solicitudes, archivos compartidos con permisos. Las contribuciones se pagan desde aquí.

**Portal de proveedor.** Para que publiquen actualizaciones en las órdenes de trabajo.

**Centro de comunicación.** Bandeja única con llamadas, textos, mensajes de portal y correo, atada al registro de la persona. Historial por persona o lease. Línea de negocio con grabación, transcripción y resumen de llamadas. Anuncios masivos. Notificaciones del sistema (recibos, recordatorios) gratis, y un conjunto de créditos para anuncios, textos y mensajes de IA.

---

## 10. Mantenimiento

Todo vive en `Task`:

- Prioridad, estado, asignación a usuarios o a un proveedor, instrucciones al proveedor.
- Permiso de entrada y notas de acceso.
- Opción de notificar al inquilino y a los asignados.
- Aprobación del propietario cuando el gasto lo requiere.
- Vínculo a la factura del proveedor (`billed`, `vendorBill`).

Cierra el círculo financiero: la orden de trabajo termina en una factura del proveedor, que genera un gasto asignado a la propiedad y aparece en el statement del propietario. Eso es lo que hace valiosa la integración entre operaciones y contabilidad.

---

## 11. El dinero del propietario

La parte que más me interesa entender, porque aquí se juega la confianza del cliente.

### 11.1 La cadena de dinero

1. El inquilino paga. El pago queda sin depositar, luego se deposita.
2. Se registran gastos y facturas de proveedores.
3. El administrador cobra su comisión (management fee).
4. Lo que queda disponible se manda al propietario como distribución.
5. El owner statement documenta todo el periodo.

El orden importa. La fee se registra después de recibir la renta y antes de la distribución, porque su pago reduce el efectivo disponible. Si me salto ese paso, distribuyo de más.

### 11.2 Management fees

Se configuran una vez a nivel de empresa, con opción de sobrescribir por propiedad.

**Destinatario.** La empresa administradora se registra como proveedor. La fee es una factura pagada a ese proveedor. Idea: modelarla así me regala todo el flujo de cuentas por pagar (aging, pagos, cheques, auditoría).

**Tres tipos:**

| Tipo | Base de cálculo | Cuándo se usa |
|---|---|---|
| Porcentaje de ingreso cargado (devengado) | Cargos creados en el lease para las cuentas elegidas, sin importar si hubo pago | La fee se debe aunque no se haya cobrado |
| Porcentaje de ingreso cobrado (efectivo) | Pagos recibidos en las cuentas elegidas | La fee depende del dinero cobrado. Lo más común |
| Fee fija | Monto mensual | Tarifa plana por propiedad |

Cada fee tiene categoría base (renta, por ejemplo), porcentaje y categoría de gasto. Puedo sumar varias fees sobre distintas cuentas base. También una **fee mínima**: si el total de las demás queda por debajo, se cobra el mínimo.

**Categorías de pago retenido.** Cuentas de ingreso que el administrador se queda al 100 %: mora, cuotas de conveniencia, cuotas de aplicación. No se distribuyen y no aparecen en el P&L ni en el statement del propietario.

**Simulador.** Una ventana junto a la configuración que muestra cómo se calculan los montos con valores de ejemplo editables. Me parece una idea excelente para evitar errores de configuración.

**Caso especial: quedarse con la primera renta.** Se crea una cuenta de ingreso "Primera renta", se pone como categoría retenida (100 %) o como base de un porcentaje, se pospone un mes la fecha de primera renta del lease y se postea un cargo único.

Limitaciones que veo: si en una misma propiedad conviven unidades de propietarios con fees distintas, hay que separar cada unidad en su propia propiedad, lo que delata que la fee se resuelve a nivel de propiedad. Y las fees no se generan solas cada mes. Eso lo haría distinto: generación programada con revisión antes de confirmar.

### 11.3 Crear y pagar las facturas de fee

Asistente:

1. Elijo propiedades. El periodo por defecto es el mes anterior.
2. Las propiedades ya facturadas en ese rango se ocultan para evitar duplicados.
3. El sistema calcula los montos con las reglas.
4. Reviso las facturas o paso directo a pagarlas.
5. Pago por cheque (impreso o ya enviado), por pago electrónico o por un medio externo.

Reglas:

- Antes de generar las fees hay que tener todas las transacciones del mes, porque la base sale de ellas.
- La fee aparece en reportes solo cuando la factura está creada y pagada.
- Si el dinero de la fee nunca sale del banco operativo, hay que registrar un depósito manual que lo regrese.
- Si el propietario cobra la renta directamente, registro la factura primero y el pago cuando el propietario me paga.

### 11.4 Distribuciones

Una distribución paga las ganancias al propietario. Conviene registrarla incluso cuando el dueño administra lo suyo, para que el balance de la propiedad quede correcto.

**Asistente, paso a paso:**

1. **Inicio.** Crear distribución.
2. **Destinatarios.** Todas las propiedades, algunas o portafolios. Todos los propietarios o algunos.
3. **Revisión de cuentas.** Muestra propiedades con información faltante. Exijo propietario asignado. El saldo de apertura es opcional, con advertencia. Muestra fondos no depositados con enlace para depositarlos. Permite excluir propiedades.
4. **Asignación de fondos.** Fecha de corte. Por propiedad calculo: **caja, menos no depositado, menos depósitos de garantía, menos reservas, igual al efectivo disponible para distribuir.** Con varios propietarios muestro porcentaje y monto de cada uno, editable. Solo las propiedades con efectivo vienen marcadas, aunque se pueden marcar otras. Permito distribuir sin fondos si el administrador lo decide.
5. **Método.** Cheque, pago electrónico, giro, transferencia u otro. Opción de **consolidar pagos**: un solo pago por propietario aunque tenga varias propiedades. Cada propietario puede recibir por un método distinto.
6. **Resumen.** Enlaces al reporte de transacciones (con número de lote), al statement, a imprimir cheques o a completar el envío.

Los pagos electrónicos salen como eCheck por un servicio de cheques. El depósito directo queda fuera por ahora.

Por qué resto reservas y depósitos de garantía: son fondos que pertenecen al inquilino o están acordados con el dueño. Distribuirlos sería usar dinero ajeno.

### 11.5 Contribuciones del propietario

Flujo inverso: el propietario aporta dinero para reparaciones, mantenimiento o reservas. Se registran a mano o se pagan desde su portal.

Flujo en el portal: el administrador activa "contribuciones en línea". El propietario elige propiedad, monto y memo, y paga con tarjeta (3,25 % de comisión) o cuenta bancaria (tarifa fija de $0,99). Todo pasa por el procesador y yo no guardo datos de pago. La contribución aparece en las transacciones de la propiedad.

### 11.6 Owner statement

Resumen de ingresos y gastos de la inversión del propietario, mensual o trimestral.

Filtros: periodo, portafolio, propiedad, propietarios, tipo (todo, resumen o detallado), agrupación (propiedad, total, mes, trimestre, año), método contable, comparación (periodo anterior, año anterior o personalizado). Se genera para todos los propietarios a la vez, se exporta a PDF, CSV o Excel y se envía por correo.

Reglas que me parecen finas:

- Los depósitos de garantía aparecen solo si están registrados por completo (cargo posteado y pago o crédito aplicado). Los que retiene el propietario se llevan aparte.
- Las categorías retenidas y las fees pagadas definen qué ve el propietario.
- Aquí lo mejoraría: envío automático mensual del statement, con aprobación previa del administrador.

### 11.7 Cierre mensual

La secuencia completa, con dependencias estrictas:

1. Registrar todas las transacciones del mes en cada lease.
2. Depositar los fondos pendientes al banco.
3. Registrar gastos y facturas de proveedores.
4. Conciliar el banco.
5. Crear y pagar las facturas de management fee.
6. Revisar el efectivo disponible por propiedad.
7. Registrar las distribuciones.
8. Generar y enviar los statements.

Cada paso depende del anterior. Si salto los pasos 1 a 3, las fees salen con base incorrecta y las distribuciones salen infladas. Idea fuerte para mi producto: una pantalla de "cierre del mes" que muestre estos ocho pasos como lista de verificación con estado, y que bloquee pasos cuando un requisito previo falte.

---

## 12. Workflows y automatizaciones

**Modelo mental:**

| Término | Significado |
|---|---|
| Trigger | Evento y condiciones que inician el flujo |
| Step | Una acción o una pausa |
| Action | Tarea automatizada (correo, SMS, crear tarea) |
| Delay | Pausa antes del siguiente paso |
| Run | Cada disparo crea una instancia independiente |

**Acciones iniciales:** crear tarea, enviar correo (a usuario, propietario o inquilino), enviar SMS, pausar.

**Plantillas de arranque:** aviso de pay-or-quit, bienvenida al inquilino, renovación de lease. Ejemplo de trigger: 90 días antes de que termine un lease de plazo fijo sin renovación iniciada.

**Monitoreo:** una pestaña de actividad con los leases afectados, el estado y cada corrida.

Por qué me convence esta forma:

- El trabajo del administrador gira alrededor de fechas: fin de contrato, mudanza, vencimiento de seguro, mora. Un motor de eventos con retrasos convierte fechas en acciones sin depender de la memoria de alguien.
- Las plantillas bajan la barrera. Activo una y la ajusto.
- Un conjunto chico de acciones mantiene el motor simple y deja el trabajo con juicio para la capa de IA.
- Cada corrida queda registrada, igual que el registro de auditoría.

Implementación que imagino: máquina de estados con cola de trabajos diferidos. Cada run guarda su posición y la hora de su próximo paso, y un programador revisa qué pasos vencieron.

---

## 13. Agentes de IA

Ideas para la capa de IA, organizadas por nivel de riesgo:

1. **Asistente** (riesgo bajo): responde preguntas, procesa facturas, arma reportes.
2. **Recepcionista** (riesgo medio): contesta textos, llamadas y mensajes de portal 24/7 con las políticas del cliente, resuelve lo rutinario y escala el resto.
3. **Agente de mantenimiento** (riesgo alto): lleva una reparación desde la solicitud hasta el proveedor, la finalización y la factura, con pausas para aprobaciones.
4. **Agente de renovaciones** (riesgo alto): detecta leases por vencer, arma la oferta con los datos del sistema y la lleva hasta la firma.
5. **Agentes de cobranza y arrendamiento.**

Principios que quiero desde el diseño:

- El cliente define qué maneja la IA y qué llega a una persona.
- Nivel de supervisión configurable por agente.
- Cada acción queda en el registro en lenguaje claro y atribuida al agente.
- Los agentes de alto riesgo se liberan de forma gradual.

Dato de mercado que me hace pensar en el alcance: se promete resolver hasta el 80 % de las solicitudes de inquilinos con IA. Pendiente validar qué tan cierto es en la práctica.

Preguntas abiertas: qué modelo usar, qué datos consulta cada agente, cuándo traspasa a una persona y cómo medir errores.

---

## 14. Permisos y roles

**Roles de fábrica que pondría:** acceso total, contador, equipo de mantenimiento, agente de arrendamiento y propietario. Además un rol de administrador de propiedades, que me parece un hueco evidente en el mercado.

**Estructura de un rol:** cuatro pestañas.

1. **Información general.**
2. **Objetos.** Donde vive la mayoría de permisos.
3. **Reportes.** Casilla por reporte.
4. **Configuración.** Sin acceso, solo lectura o edición, para empresa y propiedad.

**Secciones de objetos:**

| Sección | Qué cubre |
|---|---|
| Personas | Prospectos, inquilinos, propietarios, proveedores |
| Tareas y mantenimiento | Tareas, solicitudes y órdenes de trabajo |
| Rentas | Propiedades y unidades |
| Arrendamiento | Leases activos e inactivos y solicitudes |
| Transacciones de inquilino | Cargos, pagos y reembolsos |
| Transacciones de proveedor | Facturas, pagos y créditos |
| Transacciones de propietario | Distribuciones y contribuciones |
| Otras transacciones | Asientos, transferencias, depósitos, gastos, cuotas de aplicación, fees, envío de pagos |
| Objetos generales | Cuentas, banco, calendario, portafolios, etiquetas, archivos, notas, anuncios, firmas, conciliaciones, seguros, presupuestos |
| Centro de comunicación | Mensajería en tiempo real |

Cada objeto admite cinco permisos: **ver lista, ver uno, crear, editar y borrar**. Separar "ver lista" de "ver uno" deja que alguien vea un listado sin abrir el detalle sensible.

Tareas y mantenimiento usa tres niveles: ninguno, solo las asignadas al usuario, o todas.

**Rol de agente de arrendamiento (interno o externo, como un realtor):** publica unidades a sindicación, responde consultas, envía aplicaciones, ve reportes de screening y crea firmas de contrato. No ve finanzas ni datos de propietarios. Entra con invitación aceptada.

**Otros controles:** acceso por usuario a cuentas bancarias, notificaciones por usuario, 2FA, SSO con Google, trazabilidad de quién creó, editó o borró una transacción.

Decisiones que tomo:

- Usuarios ilimitados sin costo. El precio escala con unidades. Quita una razón para no adoptar.
- Alcance por propiedad en cada usuario. Lo veo necesario y por validar cómo se resuelve a nivel de datos.
- Un modo de "probar como este rol" para detectar huecos antes de asignarlo. Una matriz así de grande se presta a errores.

---

## 15. Arquitectura técnica (mi hipótesis)

Lo que pienso construir, con las piezas que el producto exige:

```
Clientes: web app, iOS, Android, portales (inquilino / propietario / proveedor / agente)
        |
   API REST (tokens Bearer, sesiones, SSO, 2FA)
        |
 +--------------+-------------------+------------------+
 | Dominio      | Contabilidad      | Comunicaciones   |
 | (propiedades,| (libro por líneas,| (SMS, correo,    |
 |  leases,     |  lotes, reportes, |  voz, portal,    |
 |  tareas)     |  conciliación)    |  IA)             |
 +--------------+-------------------+------------------+
        |
  Cola de trabajos / programador (cargos recurrentes, mora, workflows,
  recordatorios, sync bancario, webhooks del procesador de pagos)
        |
  Base de datos principal replicada + almacenamiento de archivos
        |
  Integraciones: procesador de pagos, cheques electrónicos, screening,
  programa contable externo, sync bancario, portales de listados,
  telefonía y SMS, modelos de lenguaje
```

Decisiones técnicas que me parecen obligatorias:

1. **Libro inmutable con reversas.** Las correcciones son transacciones nuevas.
2. **Saldos denormalizados** en lease y unidad, actualizados en cada transacción.
3. **Trabajos programados idempotentes.** Cargos recurrentes, mora y workflows corren por reloj y deben tolerar reintentos sin duplicar. Un control de duplicados a nivel de aplicación, como ocultar propiedades ya facturadas.
4. **Permisos por objeto y acción**, revisados en el servidor.
5. **Pagos asíncronos.** Los estados del pago corresponden a eventos que llegan por webhook del procesador.
6. **Multi-entidad contable.** Propiedades y portafolios pertenecen a entidades distintas dentro de una misma cuenta.
7. **Registro de eventos de cambio** en cada escritura, que alimenta la auditoría.
8. **Multi-tenant** con aislamiento por cuenta.
9. **Respaldos frecuentes** (cada pocos minutos) en servidores replicados, cifrado de 256 bits, cumplimiento PCI al delegar toda la captura de tarjetas al procesador.
10. **Herramientas internas de soporte** con impersonación y trazabilidad.

Marketing, ayuda y videos los dejaría en plataformas SaaS aparte del producto.

---

## 16. Pricing

Miré cómo se cobra en el mercado para formarme una idea. El patrón que veo:

**Estructura por escalones de automatización.** Todo el producto está en todos los planes. Lo que cambia es cuánto trabajo hace la IA.

| Escalón | Precio de partida (por unidad al mes) | Qué agrega |
|---|---|---|
| Base | Alrededor de $2,50. Cerca de $1,50 por unidad por encima de 100 | Toda la plataforma, portales, sitio web, número de negocio, asistente de IA, usuarios y almacenamiento ilimitados, API |
| Intermedio | Alrededor de $4,00 | Base más recepcionista 24/7, solicitudes rutinarias resueltas sin el equipo, ACH entrante gratis, reglas de lo que maneja la IA, soporte prioritario |
| Superior (por invitación) | Alrededor de $5,00 | Intermedio más agentes de mantenimiento y renovaciones, supervisión por agente, registro de cada acción y agentes nuevos incluidos |

Hay mínimos de gasto y de unidades. Un sitio de reseñas habla de unos $199 al mes en el escalón base (por validar). Facturación anual con hasta 25 % de ahorro.

**Ingresos adicionales que veo:**

| Concepto | Idea |
|---|---|
| Screening | Alrededor de $35 por reporte |
| ACH entrante | Cobrarlo en el escalón base (cerca de $1,50) y regalarlo en el intermedio para empujar la subida |
| Tarjeta | Margen sobre el procesador. En contribuciones de propietario, 3,25 % con tarjeta y $0,99 con ACH |
| Pagos salientes | Gratis, para fomentar que todo el flujo pase por el sistema |
| Cuota de conveniencia | El administrador la cobra al inquilino y se la queda |
| Créditos de mensajería | Un solo conjunto de créditos para anuncios, textos y mensajes de IA (por definir unidad y periodo) |
| Seguro de inquilinos | Comisión por venta en el portal |
| Asistente de IA en el portal del inquilino | Complemento |
| Incorporación y capacitación | Gratis, como gancho de adopción |

**Lo que aprendo de esa estrategia:**

1. El precio por unidad hace crecer el ingreso con el portafolio del cliente.
2. La IA es el motor de subida entre escalones. Se vende como "cuánto quieres delegar".
3. El ACH gratis en el escalón intermedio empuja hacia arriba y gana con la adopción del pago en línea.
4. Usuarios, almacenamiento y API ilimitados quitan razones para no adoptar y concentran el cobro en la unidad.
5. Los cobros por transacción (screening, pagos, seguro) crecen con el uso.
6. Un escalón superior por invitación protege la calidad de los agentes de mayor riesgo.

Mi decisión pendiente: arrancar con un solo plan por unidad con mínimo bajo, y sumar el escalón de IA cuando los agentes estén probados.

---

## 17. Qué me llevo de todo esto

- El **libro contable** es el corazón. Todo lo demás se conecta a él.
- El **cierre mensual** tiene dependencias estrictas. Si lo modelo bien, evito los errores más caros.
- Las **automatizaciones simples** cubren fechas y eventos, y los **agentes de IA** cubren tareas con juicio. Son dos capas con dueños distintos.
- Los **permisos** son una matriz de objeto por acción. Fácil de construir y difícil de configurar bien, así que necesito buena experiencia de prueba de roles.
- La **monetización** descansa en tres patas: unidades, nivel de IA y flujo de dinero.
- El **cumplimiento legal** (screening en dos fases, avisos, 1099) tiene que vivir dentro del flujo.

---

## 18. Preguntas abiertas

| Tema | Qué me falta |
|---|---|
| Reglas de mora | Gracia, topes, porcentaje o fijo, cuotas ACH del administrador, pagos devueltos |
| Workflows avanzados | Qué condiciones y ramificaciones conviene soportar además del flujo lineal |
| Alcance por propiedad | Cómo limitar a un usuario a ciertas propiedades en el modelo de datos |
| Pricing | Mínimos reales por escalón, unidad de los créditos de mensajería |
| Agentes de IA | Modelo, herramientas, traspaso a una persona, métricas de error |
| Mercado inicial | EE. UU. o México (cambia pagos, impuestos y screening) |
| Fase del producto comercial | Cuándo sumar gastos compartidos y prorrateos |
| Cuentas bancarias de propietarios | Cómo manejar cuentas fiduciarias separadas por propietario |

## 19. Siguiente paso

Tres cosas, en este orden:

1. Cerrar las preguntas abiertas de mora y alcance por propiedad.
2. Bocetar el esquema de base de datos del MVP: propiedades, unidades, personas, leases, cargos, pagos, cuentas y libro.
3. Definir el MVP: cobro de renta con autopago, libro contable, pantalla de cierre mensual y statement para el propietario.
