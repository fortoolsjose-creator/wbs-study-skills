# Casandra, Vivook y Comunidad Feliz: análisis con fuentes públicas

Fecha de la investigación: 23 de noviembre de 2026.
Método: lectura de sitios oficiales, fichas de App Store y páginas de comparación. No se creó ninguna cuenta, no se usó ninguna demo y no se interceptó tráfico de las apps.

Etiquetas de confianza: **[Fuente]** dato leído en la página oficial del producto. **[Tercero]** dato de un sitio de comparación o de un competidor. **[Inferencia]** conclusión mía. **[Vacío]** dato que no encontré.

## 1. Respuesta corta a tus dos preguntas

**¿Manejan contratos de arrendamiento?** En lo que pude leer, ninguno de los tres tiene un módulo de contratos de arrendamiento. Los tres administran condominios: cobran cuotas de mantenimiento a propietarios, registran egresos del condominio y se comunican con residentes. Esto es [Inferencia] apoyada en que ninguna página de funciones lista contratos, rentas, depósitos en garantía ni renovaciones. Se queda como [Vacío] hasta que alguien revise el producto por dentro.

Dos datos relacionados:
- Vivook tiene un artículo de blog sobre arrendamiento de condominios [Fuente: vivook.com/blog/arrendamiento-de-condominios]. Es contenido educativo para administradores y no una función del software.
- La ficha de App Store de Comunidad Feliz dice que el usuario puede registrar sus propiedades "no importa si eres arrendatario, dueño o inversionista" [Fuente]. El arrendatario aparece como un tipo de residente y la ficha no menciona ningún contrato.

**¿Vale la pena revisar los sitios de Vivook y Comunidad Feliz para precios?** Ya los revisé. Vivook publica precios completos. Comunidad Feliz y Casandra los dan por cotización.

## 2. Datos de identidad que se contradicen

| Tema | Lo que dicen las fuentes | Lectura |
|---|---|---|
| Nombre de la app | App Store muestra "Casandra" con una sola s [Fuente] | Correcto: Casandra |
| Proveedor de Vivook | Vendedor en App Store: MCTEKK SRL. Copyright de la misma ficha: © 2012 Abits SA de CV [Fuente] | Las dos razones sociales aparecen en la misma ficha. Puede ser un cambio de cuenta de desarrollador o una relación entre empresas. [Vacío] sobre cuál es la titular actual |
| Proveedor de Casandra | Vendedor en App Store: Subvertis Cero Uno Cero S de RL de CV. Marca registrada a nombre de una persona física en el pie de casandra.com.mx [Fuente]. Una base de datos de empresas indica "ADU Ventures, Inc", fundada en 2017, con 30 empleados [Tercero] | La base de datos choca con "desde 2006" de la ficha de App Store y "2005-2026" del sitio. Le doy poco peso a ese dato de tercero |
| Años de Casandra | "Líderes desde 2006" (App Store) y "más de 17 años" (sitio) [Fuente] | 2006 más 17 años da 2023. El texto del sitio no se ha actualizado |
| Comunidad Feliz en App Store | La ficha que extraje es la de Chile (4.2 de 5 con 2.8 mil calificaciones, puesto 9 en Estilo de vida de Chile) [Fuente]. Existe una ficha mexicana con el mismo id de app [Fuente] y una app aparte para administradores, "Admin CF" [Fuente] | La nota de 4.2 es de Chile. No leí la nota de la tienda mexicana |
| Precios de Comunidad Feliz en ComparaSoftware | La página dice "precios en México", pero los planes Light y Premium mencionan WebPay Plus, Previred y UF, que son de Chile [Tercero] | No uso esa página como dato de México |

## 3. Ficha de cada producto

### 3.1 Casandra

Fuente principal: casandra.com.mx (quees, es_para_ti), App Store México, ComparaSoftware.

- **Qué es:** plataforma web para condominios residenciales, privadas de casas, edificios de oficinas y centros comerciales [Fuente].
- **Ingresos:** genera el conjunto de cuotas de cada periodo, emite avisos de cobro en papel o correo, registra pagos parciales o totales, emite recibos (pueden ser CFDI), cancela y concilia ingresos, acepta pagos adelantados, maneja Depósitos No Identificados (DNI) e ingresos extraordinarios [Fuente].
- **Cuotas:** mensuales, bimestrales, trimestrales, semestrales, anuales y extraordinarias, incluidas cuotas de gas, agua y energía eléctrica. Es multi-moneda, multi-cuenta de banco y multi-idioma [Fuente].
- **Egresos:** catálogo de proveedores, captura de facturas, pagos a proveedores (con pagos parciales), impresión de cheques, cancelación de pagos, conciliación, reclasificación de egresos ya registrados, adjuntar el CFDI de egreso (XML y PDF) a cada factura y caja chica [Fuente].
- **Presupuesto:** registro y reportes que comparan gasto real contra presupuestado [Fuente].
- **Pagos del residente:** SPEI y CODI mediante un módulo llamado Auris Plus, tarjeta de crédito y débito (Visa y MasterCard) y PayPal [Fuente]. El sitio afirma que está "conectada con todos los bancos de México" con conciliación automática [Fuente].
- **Otros módulos:** mesa de ayuda, reservaciones de áreas comunes, control de accesos con QR, paquetería [Fuente].
- **Precio:** por cotización. El sitio tiene una calculadora que pide cantidad de unidades y cuota promedio de mantenimiento, con tres opcionales (CFDI, Auris Plus, procesar tarjetas), y muestra una cuota mensual y una cuota de implantación, más IVA [Fuente]. Sin datos capturados la calculadora muestra $0.00, así que no obtuve cifras.
- **App móvil:** 2.5 de 5 con 41 calificaciones, versión 2.2.9, "no se recopilan datos" [Fuente]. Las reseñas citan interfaz lenta, reservas de amenidades que no funcionan y fallas al generar el QR de pago [Fuente: reseñas de App Store, cuatro visibles].

### 3.2 Vivook

Fuente principal: vivook.com (inicio, precios, administrativo, pagos, facturación, seguridad), App Store México.

- **Tamaño que declara:** "más de 3,000 condominios" y "13 países de LATAM" en la sección final de la portada [Fuente]. Los contadores de la parte superior de la página cargan en cero en mi lectura, así que uso las cifras del texto.
- **Precios por condominio al mes, sin IVA** [Fuente: vivook.com/precios]:

| Plan | Viviendas | Cargo automático | Con transferencia o depósito | Administradores | Soporte |
|---|---|---|---|---|---|
| Básico | 1 a 15 | $460 | $569 | 1 | email |
| Estándar | 16 a 50 | $709 | $809 | 3 | email y chat |
| Pro | 51 a 100 | $989 | $1,139 | ilimitados | email, chat y teléfono |
| Class | 101 a 250 | $2,199 | $2,529 | ilimitados | email, chat y teléfono |
| Elite | más de 250 | cotización | cotización | ilimitados | premium dedicado |

  Todos incluyen residentes ilimitados y 15 días de prueba sin tarjeta, sin plazo forzoso, con cambio de plan prorrateado. Todas las funciones vienen en todos los planes. Mi lectura de "TB / Depósito" es transferencia bancaria o depósito como forma de pago de la suscripción [Inferencia]. El timbrado de CFDI cuesta $1.99 por timbre según una búsqueda previa [Tercero, no confirmado en la página de precios].
- **Finanzas:** estado de cuenta por residencial y por vivienda, conciliación bancaria, múltiples cuentas y cajas, conexión con Contpaq, factura CFDI (Vivook Invoice), cuotas por factor de indiviso y por lectura de consumo, recordatorios automáticos [Fuente].
- **Egresos:** gastos y proveedores, comprobantes digitales, pólizas de cheque y gasto, impresión de cheques. En "Cuentas por pagar" el administrador aprueba o rechaza cuentas antes de convertirlas en gasto registrado. Los residentes pueden ver comprobantes si el administrador lo permite [Fuente: vivook.com/administrativo].
- **Presupuesto:** mensual y anual, comparado en tiempo real contra lo real [Fuente].
- **Pagos:**
  - Pagos Referenciados: una CLABE única por vivienda, SPEI desde cualquier banco, identificación y conciliación automática [Fuente].
  - Pagos en Línea: tarjeta de crédito o débito en pesos o dólares y efectivo en OXXO. La comisión la cubre quien paga [Fuente].
- **Facturación:** el administrador carga RFC y CSD una vez, elige pagos recibidos, se timbra con un PAC autorizado y el residente recibe PDF y XML. Hay facturación masiva al cierre del mes. Solo México [Fuente].
- **Seguridad:** QR para visitas y personal doméstico, paquetería con firma digital, recorridos del supervisor, control de infantes, chat entre caseta y residentes [Fuente].
- **Comité:** el comité o mesa directiva revisa finanzas, aprueba gastos y ve el registro de actividades del personal de mantenimiento [Fuente].
- **Onboarding:** crear cuenta, migración de datos asistida, capacitación 1 a 1 y soporte; configuración en 24 horas [Fuente].
- **App móvil:** 2.8 de 5 con 100 calificaciones, versión 5.5.6, iPhone con iOS 15.6 o posterior [Fuente]. Las reseñas citan sesión que falla al entrar, marca de mensajes no leídos que no se quita y un cambio en el que lo que carga un vecino ahora pasa por aprobación del administrador [Fuente: reseñas de App Store, cuatro visibles].

### 3.3 Comunidad Feliz (México)

Fuente principal: comunidadfeliz.mx, App Store, página de contratación, blog propio. Donde cito a Koti es [Tercero con interés]: Koti es un competidor y su propia tabla incluye una nota de que corrigió datos que antes tenía mal.

- **Escala que declara:** más de 100,000 unidades privativas en México, más de 7,000 condominios activos en México, 4.5 de calificación con más de 5,000 reseñas, más de 100,000 descargas en el sitio mexicano y "más de 1 millón de descargas" en la página de contratación [Fuente, cifras propias sin auditar]. Las dos cifras de descargas no coinciden entre páginas.
- **Origen:** empresa chilena (ComunidadFeliz SpA, Providencia, Santiago) con fundación en 2015 según una base de datos de empresas [Tercero]. Opera en 10 países [Fuente].
- **Producto para el administrador:** plataforma web tipo ERP, app para residentes, app de conserjería y app "Admin CF" [Fuente]. Módulos: finanzas en línea, ingresos, gastos, medidores de agua y luz, cálculo de cuotas, amenidades, visitas y bitácora, remuneraciones (esta última parece de Chile) [Fuente].
- **Cobranza:** programa cobro de cuotas, multas y recargos de forma automática [Fuente]. Pagos en línea con Kushki como procesador certificado PCI DSS [Fuente: blog propio]. Cobros por STP/SPEI y timbrado CFDI 4.0 con el PAC Finkok [Tercero: Koti].
- **Egresos:** el módulo de egresos guarda respaldo de facturas, boletas, comprobantes y lista de proveedores asociada al gasto [Fuente: video oficial, transcripción]. Los residentes ven el informe del proveedor, cuánto se le pagó y los comprobantes [Fuente: video oficial].
- **Conciliación:** el sistema concilia pagos registrados sin unidad, y hay conciliación bancaria masiva mes a mes. En un video de Chile, el presentador dice que la conciliación tiene costo extra si se contrata [Fuente: video oficial, no verificado para México].
- **Control de acceso:** tarjetas, reconocimiento facial, QR, tags vehiculares y apertura remota [Tercero: Koti, que cita la página oficial].
- **IA:** planes "Smart CF" con créditos de IA que se renuevan el día 1 de cada mes [Fuente: página de contratación]. Qué hace la IA está en [Vacío] salvo que ayuda a redactar publicaciones en la app de administradores [Fuente: App Store de Admin CF].
- **Precio:** no publicado. Su página de contratación es una calculadora de unidades que dice que el precio depende del número de unidades privativas, con IVA y ajuste anual por inflación [Tercero: Koti citando la página, consultada el 21 de agosto de 2026]. Hay una prueba de 15 días sin costo y una demo en línea [Fuente].
- **App móvil (tienda de Chile):** 4.2 de 5 con 2.8 mil calificaciones, versión 5.9.14. Las quejas incluyen lentitud, caídas y la falta de una opción para registrar comprobantes de depósito hechos fuera de la plataforma [Fuente].

## 4. Comparación lado a lado

| Función | Casandra | Vivook | Comunidad Feliz |
|---|---|---|---|
| Cliente objetivo | Condominios, oficinas, plazas comerciales | Condominios y residenciales | Condominios y fraccionamientos |
| Precio público | No (calculadora) | Sí, desde $460 sin IVA | No (cotización) |
| Prueba gratis | [Vacío] | 15 días sin tarjeta | 15 días |
| CLABE por unidad | [Vacío] (SPEI y CODI con Auris Plus) | Sí, una por vivienda | STP/SPEI [Tercero] |
| Tarjeta | Visa y MasterCard | Crédito y débito, pesos y dólares | Sí, vía Kushki |
| OXXO | [Vacío] | Sí | [Vacío] |
| Conciliación bancaria | Sí, "todos los bancos" | Sí | Sí, algunas versiones con costo extra |
| Pagos sin identificar | Depósitos No Identificados | Identificación automática | Registro de pago sin unidad |
| CFDI de ingreso | Sí | Sí, PAC propio de la plataforma | Sí, CFDI 4.0 |
| Cuentas por pagar con aprobación | [Vacío] | Sí, aprobar o rechazar | [Vacío] |
| Cheques y pólizas | Cheques, cancelación | Cheques y pólizas | [Vacío] |
| Caja chica | Sí | Múltiples cajas | [Vacío] |
| Presupuesto contra real | Sí | Sí | Reportes de presupuesto [Tercero] |
| Conexión con contabilidad | [Vacío] | Contpaq | [Vacío] |
| Contratos de arrendamiento | [Vacío] | [Vacío] | [Vacío] |
| Nota en App Store | 2.5 (41) | 2.8 (100) | 4.2 (2.8 mil, Chile) |

## 5. Lo que esto significa para Zatu

Todo este apartado es [Inferencia].

1. **Clientes distintos, mismo flujo de dinero.** Estos tres cobran cuotas de mantenimiento a propietarios. Zatu cobra rentas a inquilinos de un propietario o administrador. El flujo de cobro es parecido (cargo mensual, mora, recargo, conciliación), y los contratos de arrendamiento, depósitos en garantía, renovaciones e INPC quedan sin competir con estos tres. Eso es terreno de Zatu y de productos de rentas.
2. **La CLABE por unidad es el estándar mexicano.** Vivook la vende como producto y Comunidad Feliz cobra por STP/SPEI. La auditoría de Zatu dijo que no hay procesador de pagos. Una CLABE por contrato con conciliación automática pasa a ser la función que más cierra distancia con el mercado y con DoorLoop (que usa ACH de Estados Unidos y no sirve en México).
3. **Pagos sin identificar.** Casandra, Vivook y Comunidad Feliz tratan el depósito sin referencia como caso de primera clase. Para Zatu esto se conecta con la tabla `bank_transaction_matches` del plan Ola 0 (tarea B8).
4. **Egresos con aprobación y pólizas.** Vivook aprueba o rechaza cuentas por pagar antes de volverlas gasto y genera pólizas de cheque. Esto coincide con el modelo Bill contra Expense de DoorLoop y con las reglas `aprobacion_*` que la auditoría encontró sin usar en Zatu.
5. **Presupuesto contra real** aparece en los tres. DoorLoop también lo tiene. Es una función de reportes con costo de desarrollo bajo si los egresos ya están clasificados.
6. **Comunicación con el pagador:** las apps de los tres tienen notas bajas en App Store (2.5 y 2.8 en México). Las quejas se repiten: lentitud, sesión que falla, QR que no se genera. Un portal web móvil de inquilino sin app nativa es una opción defendible en un producto vibe-coded.
7. **Precio de referencia en México:** Vivook cobra de $460 a $2,199 por condominio al mes según el tamaño. Zatu puede comparar su plan contra una cuota por propiedad o por contrato, que es la unidad natural de un arrendador.

## 6. Qué falta y cómo se cierra

- Comunidad Feliz y Casandra: precios reales. Requiere cotización o la demo. Casandra: probar la calculadora con datos de ejemplo.
- Contratos de arrendamiento: confirmar con la demo de Comunidad Feliz (demo en línea gratis) y la prueba de 15 días de Vivook. Crear una cuenta en cualquiera de las dos es una acción externa y necesita tu aprobación antes de hacerla.
- Nota de Comunidad Feliz en México: leer la ficha de la tienda mexicana (id1477486368) y la de Admin CF (id6778468762).
- Razón social de Vivook: revisar el aviso de privacidad y los términos en vivook.com para ver quién firma los contratos.

## 7. Fuentes consultadas

- casandra.com.mx (inicio, quees.aspx, es_para_ti.aspx)
- apps.apple.com/mx/app/casandra/id1415558500
- vivook.com (inicio, /precios, /administrativo, /pagos, /facturacion, /seguridad, /blog/arrendamiento-de-condominios)
- apps.apple.com/mx/app/vivook/id1449471008
- comunidadfeliz.mx (inicio, /contratar, /app, blog de pagos de cuotas)
- apps.apple.com/cl/app/comunidadfeliz/id1477486368 y apps.apple.com/mx/app/admin-cf/id6778468762
- comparasoftware.com/casandra y comparasoftware.com/comunidadfeliz
- koti.mx/es/blog/mejor-software-condominios-mexico (competidor: uso sus datos como pista)
- Videos de YouTube de Comunidad Feliz (transcripciones)
