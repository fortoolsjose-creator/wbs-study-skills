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
