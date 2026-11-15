# Prompt de auditoría para tu plataforma

Copia todo lo que está debajo de la línea y pégalo en el Claude que tiene acceso al código de tu plataforma. Cuando termine, pásame el reporte que genere (el archivo `AUDITORIA.md`) y hago la comparación contra el brainstorm: gaps, riesgos y mejoras priorizadas.

---

## PROMPT (copiar desde aquí)

Necesito que audites esta plataforma de gestión de propiedades en renta y generes un reporte técnico completo. Otro analista lo va a leer sin acceso al código, así que el reporte tiene que bastar por sí solo para entender qué existe, cómo funciona y qué falta.

### Reglas de la auditoría

1. **Solo lectura.** No modifiques código, no corras migraciones, no hagas commits y no instales nada. Puedes ejecutar comandos de lectura (listar archivos, buscar, leer).
2. **Cada afirmación lleva evidencia.** Cita la ruta del archivo y la línea, por ejemplo `src/billing/ledger.ts:84`. Sin evidencia, escribe "no encontré".
3. **Marca el estado de cada capacidad** con una de estas etiquetas:
   - **Implementado:** funciona de punta a punta (UI, lógica y persistencia).
   - **Parcial:** existe una parte (por ejemplo, la pantalla sin la lógica, o la lógica sin pruebas).
   - **Stub:** hay un esqueleto, datos de ejemplo o respuestas fijas.
   - **Ausente:** no existe nada.
4. **No inventes.** Si algo no está claro, escribe "no está claro" y explica qué viste.
5. **Protege secretos.** Si encuentras llaves, tokens o contraseñas en el código, reporta solo la ruta y escribe `[REDACTADO]` en lugar del valor.
6. **Prefiere precisión sobre extensión.** Fórmulas, reglas, estados, campos y números concretos valen más que descripciones generales.

### Formato de salida

Genera un único archivo `AUDITORIA.md` en la raíz del proyecto con las secciones numeradas de abajo, en el mismo orden. Dentro de cada sección usa este molde:

```
### Estado: Implementado | Parcial | Stub | Ausente
**Evidencia:** rutas y líneas
**Cómo funciona:** descripción corta y concreta
**Reglas, fórmulas y valores por defecto:** lo que dicta el código
**Huecos que veo:** lo que falta o está frágil
```

### Secciones a cubrir

**1. Resumen general**
- Qué hace la plataforma, en cinco líneas.
- Stack completo: lenguajes, framework web, base de datos, ORM, autenticación, hosting, servicios externos, gestor de paquetes.
- Estructura de carpetas (árbol de dos niveles) y qué contiene cada una.
- Cómo se corre en local y cómo se despliega.
- Tamaño aproximado: número de archivos, líneas de código, tablas, endpoints y pantallas.

**2. Modelo de datos**
- Lista de todas las tablas o colecciones, con sus campos (nombre, tipo, nulabilidad, valores por defecto), claves y relaciones.
- Diagrama de relaciones en texto o en Mermaid.
- Responde estas preguntas puntuales:
  - ¿Prospecto e inquilino son el mismo registro o tablas distintas?
  - ¿Cargos, pagos y créditos son una transacción con líneas, o cada uno tiene su tabla?
  - ¿Cada línea apunta a una cuenta contable?
  - ¿Existe una tabla de tareas unificada (tarea interna, solicitud de inquilino, solicitud de propietario, orden de trabajo)?
  - ¿Cómo se adjuntan notas y archivos a otras entidades (vínculo polimórfico o tablas separadas)?
  - ¿Hay saldos precalculados (saldo adeudado, depósitos retenidos) y cuándo se actualizan?
  - ¿Cómo se registra una corrección: se edita el registro o se crea una reversa?
- Migraciones: cuántas hay, si el esquema está versionado.
- Índices y restricciones de unicidad.

**3. Libro del lease (cargos, pagos, depósitos)**
- Tipos de transacción disponibles y qué hace cada una.
- Regla de asignación de pagos a cargos (más antiguo primero, prioridad por categoría, configurable por empresa, propiedad o lease).
- Estados de un pago y qué evento provoca cada transición. ¿Existe separación entre pago recibido y depósito bancario?
- Manejo de pagos devueltos, fallidos y disputados.
- Cargos recurrentes: cómo se generan (programador, cron, al abrir la app), qué pasa si el proceso falla o corre dos veces.
- Depósitos de garantía: cómo se registran, se retienen y se devuelven.
- Cuotas por mora: reglas (días de gracia, porcentaje o monto fijo, tope), quién las dispara.

**4. Cobro de renta**
- Procesador de pagos usado (si hay), métodos aceptados, comisiones y quién las paga.
- Autopago: cómo se configura, cuándo corre, qué reintentos hace.
- Recordatorios y notificaciones de pago: canales, plantillas y disparadores.
- Webhooks del procesador: qué eventos escucha, cómo valida la firma y cómo evita procesar el mismo evento dos veces.
- Enlace de pago sin portal.
- Dashboard de cobranza: lista de métricas y cómo se calcula cada una.
- Pagos salientes (a proveedores y propietarios): métodos, estado.
- Cuota de conveniencia al inquilino.

**5. Contabilidad**
- Plan de cuentas: ¿es editable? ¿viene con cuentas por defecto? ¿qué tipos existen?
- ¿Hay partida doble real (cada transacción genera asientos que cuadran) o saldos sueltos?
- Conciliación bancaria y sincronización con bancos.
- Cuentas por pagar: facturas de proveedores, pagos, aging.
- Reportes existentes (lista completa) y para cada uno: filtros, método contable (efectivo o devengado), fórmula principal. Reportes que me interesan: P&L, balance general, flujo de efectivo, rent roll, estado de cuenta del lease, mora, fondos no depositados, aging de cuentas por pagar, comisiones de administración.
- Bitácora de auditoría: qué registra, con qué campos, si guarda valor viejo y nuevo, retención.
- Formularios 1099.
- Gastos compartidos (CAM) y prorrateo por metros cuadrados.
- Presupuestos.
- Integración con programas contables externos.

**6. Arrendamiento**
- Listados y sindicación a portales.
- Showings y agenda.
- Solicitudes de renta: campos, cuotas, estados, flujo de aprobación.
- Screening de inquilinos: proveedor, reportes pedidos, manejo de datos sensibles, cumplimiento legal por jurisdicción (por ejemplo, retención de antecedentes penales en una primera fase).
- Verificación de ingresos.
- Contratos y firma electrónica: plantillas, campos que se llenan solos.
- Renovaciones: cómo se detectan y cómo se ejecutan.
- CRM de prospectos: fuentes de lead, seguimiento.
- Conversión de prospecto a inquilino.

**7. Comunicación y portales**
- Portal del inquilino: funciones, invitación, autenticación.
- Portal del propietario: funciones y permisos.
- Portal de proveedor, si existe.
- Mensajería: canales (correo, SMS, voz, portal), bandeja unificada, hilos, historial por persona.
- Anuncios masivos.
- Consentimiento y opt-in para SMS.
- Plantillas de mensajes y variables disponibles.

**8. Mantenimiento**
- Flujo de una solicitud: quién la crea, cómo se asigna, estados, prioridades.
- Orden de trabajo: campos, asignación a proveedor, permiso de entrada, aprobación del propietario.
- Vínculo con facturas de proveedor y con la contabilidad.
- Gestión de proveedores: seguros, documentos, saldo.

**9. Dinero del propietario**
- Propietarios: datos fiscales, porcentaje de propiedad por propiedad.
- Comisiones de administración (management fees): tipos soportados (porcentaje de lo cobrado, porcentaje de lo cargado, fija, mínima), configuración por empresa y por propiedad, cómo se calculan, cómo se contabilizan (¿como factura a un proveedor?), si se generan solas o a mano, cómo evitan duplicarse.
- Categorías de ingreso que se queda el administrador (mora, cuotas de conveniencia, cuotas de aplicación).
- Distribuciones: asistente o flujo, cómo se calcula el efectivo distribuible (caja menos no depositado, menos depósitos de garantía, menos reservas), distribución entre varios propietarios, métodos de pago, consolidación.
- Contribuciones del propietario y su pago desde el portal.
- Owner statement: contenido, filtros, exportación, envío manual o automático.
- Cierre mensual: ¿existe un flujo guiado? ¿qué orden impone?

**10. Workflows y automatizaciones**
- Motor de eventos: triggers, acciones disponibles, retrasos.
- Plantillas incluidas.
- Cómo se ejecuta (cola, cron, base de datos) y cómo se registra cada corrida.
- Manejo de errores y reintentos.

**11. Inteligencia artificial**
- Dónde se usa IA en el producto (asistente, respuestas a inquilinos, triage de mantenimiento, redacción, reportes).
- Modelos y proveedores, prompts del sistema (cítalos), herramientas o funciones que el modelo puede invocar.
- Datos que consulta.
- Traspaso a una persona y reglas de escalamiento.
- Registro de las acciones de la IA y nivel de supervisión.
- Controles de costo y límites.

**12. Permisos y roles**
- Modelo de autorización: roles fijos o permisos por objeto y acción.
- Lista de roles y qué puede hacer cada uno.
- ¿Existe alcance por propiedad (un usuario limitado a ciertas propiedades)?
- Dónde se verifica el permiso (servidor, cliente o ambos). Reporta cualquier endpoint que no verifique.
- Autenticación: métodos, 2FA, SSO, recuperación de contraseña, sesiones y expiración.
- Aislamiento entre cuentas (multi-tenant): cómo se garantiza que una cuenta no vea datos de otra. Reporta cualquier consulta sin filtro de cuenta.

**13. Arquitectura y operación**
- Diagrama de componentes en texto.
- Trabajos programados y colas: qué existe, cómo se garantiza que corran una sola vez.
- Idempotencia en operaciones que mueven dinero.
- Manejo de zonas horarias, monedas y redondeo (¿usa enteros en centavos o decimales?).
- Almacenamiento de archivos.
- Respaldos y recuperación.
- Registro de logs y monitoreo de errores.
- Variables de entorno requeridas (solo nombres).
- Seguridad: validación de entradas, protección contra inyección y XSS, límites de tasa, manejo de datos sensibles, cifrado.

**14. API y rutas**
- Tabla de todos los endpoints: método, ruta, qué hace, si exige autenticación y permiso.
- Convenciones: paginación, filtros, formato de errores, versionado.
- Documentación de la API, si existe.
- Webhooks hacia afuera, si existen.

**15. Pantallas y experiencia de usuario**
- Lista de pantallas por rol (administrador, inquilino, propietario, proveedor) y qué permite hacer cada una.
- Flujos principales que se pueden completar de punta a punta hoy.
- Estados vacíos, de carga y de error: ¿están manejados?
- App móvil o diseño responsivo.
- Idiomas soportados.

**16. Facturación del propio producto**
- Cómo se cobra a los clientes: planes, precios, límites por unidades, periodo de prueba.
- Medición de uso.

**17. Calidad del código**
- Pruebas: cantidad, tipo (unitarias, integración, extremo a extremo), cobertura estimada y qué áreas tienen pruebas. Marca si el libro contable y el cálculo de fees tienen pruebas.
- Datos semilla y datos de ejemplo.
- Deuda técnica visible: `TODO`, `FIXME`, `HACK`, código duplicado, archivos muy largos, funciones sin uso.
- Dependencias desactualizadas o con vulnerabilidades conocidas (si puedes detectarlas leyendo los manifiestos).
- Manejo de errores y casos límite en las partes que mueven dinero.

**18. Lo que el propio código admite que falta**
- Lista literal de todos los `TODO`, `FIXME`, funciones que lanzan "not implemented", rutas con respuestas fijas y pantallas con datos de ejemplo.

### Cierre del reporte

Al final del archivo agrega:

1. **Tabla de cobertura:** una fila por sección (1 a 18) con su estado general (Implementado, Parcial, Stub o Ausente) y una línea de justificación.
2. **Diez riesgos principales**, ordenados por gravedad. Prioriza errores que puedan perder o falsear dinero (cálculos, reversas, idempotencia), fugas de datos entre cuentas y endpoints sin permisos.
3. **Preguntas que no pude responder con el código:** decisiones de negocio o configuraciones externas que se necesitan para completar el cuadro.

Antes de entregar, revisa que cada sección tenga estado, evidencia y huecos. Si una sección no aplica, escribe "Ausente" y explica en una línea.

## FIN DEL PROMPT

---

## Cómo usarlo

1. Abre el proyecto en el Claude que tiene acceso al código y pega el prompt.
2. Espera a que genere `AUDITORIA.md`. En proyectos grandes puede tomar varios minutos.
3. Si el reporte queda corto en alguna sección, pídele "profundiza en la sección N con más evidencia".
4. Pásame el archivo completo. Si no hay forma de moverlo, pega el contenido aquí por partes (por ejemplo, tres secciones por mensaje).

## Qué voy a hacer con el reporte

- Compararlo sección por sección contra el brainstorm.
- Entregarte una tabla de gaps con prioridad (crítico, importante, deseable).
- Señalar errores de diseño que pueden costarte dinero o confianza (libro contable, cierre mensual, permisos).
- Proponer un orden de mejoras con esfuerzo estimado.
