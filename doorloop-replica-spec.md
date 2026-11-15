# Especificación para replicar DoorLoop

Fuente: páginas públicas de doorloop.com (features, integraciones, API abierta). Solo describe funciones visibles al público y no usa código ni tráfico privado.

## 1. Módulos del producto

### Financieros
- Cobro de renta (RapidRent): tarjeta y ACH, autopago, recordatorios, cargos por mora, reportes.
- Contabilidad de partida doble: plan de cuentas, bookkeeping, conciliación bancaria (bank sync).
- Reportes financieros personalizables.
- Integración con QuickBooks Online.

### Arrendamiento
- Listados y publicidad de vacantes.
- Solicitudes de renta y firma electrónica de contratos.
- Screening de inquilinos.
- Sitio web de propiedades, CRM de prospectos, seguro de inquilinos (Assurant).

### Operaciones
- Mantenimiento: órdenes de trabajo, proveedores.
- Portales de inquilino y de propietario (reportes, distribuciones).
- Gestión de inquilinos, herramientas de comunicación, workflows, app móvil, almacenamiento de archivos, inspecciones con IA.

### Agentes de IA
- Recepcionista, centro de comunicación, teléfono de negocio.
- Agentes de mantenimiento, renovaciones, cobranza y arrendamiento.
- Asistente de IA para solicitudes de inquilinos (anuncia hasta 80 % de resolución).

## 2. Entidades de datos (modelo sugerido)

Según la descripción pública de su API REST: propiedades, unidades, contratos (leases), inquilinos, propietarios, proveedores, pagos, gastos, solicitudes de mantenimiento y cuentas contables.

| Entidad | Campos clave | Relaciones |
|---|---|---|
| Property | nombre, dirección, tipo | tiene muchas Units, pertenece a Owner(s) |
| Unit | número, recámaras, baños, renta de mercado | pertenece a Property |
| Lease | inicio, fin, renta, depósito, estado | une Unit y Tenant(s) |
| Tenant | contacto, método de pago | tiene Leases |
| Charge / Payment | monto, fecha, cuenta, método | pertenece a Lease |
| Account / JournalEntry | tipo, código, débito, crédito | base de contabilidad |
| WorkOrder | prioridad, estado, proveedor | pertenece a Unit |
| Owner / Distribution | porcentaje, periodo | pertenece a Property |
| Application / Listing | estado, screening | genera Lease |

## 3. Arquitectura propuesta

- Backend REST (Node/NestJS o Django) con PostgreSQL y multi-tenant por cuenta.
- Libro contable de partida doble como núcleo; todo cargo y pago genera asientos.
- Pagos con Stripe (tarjeta y ACH) y webhooks.
- eSign con DocuSign o Dropbox Sign; screening con un proveedor como TransUnion SmartMove.
- Notificaciones con cola de trabajos (cargos recurrentes, recordatorios, mora).
- Portales web (inquilino y propietario) y app móvil con React Native.
- Capa de IA con Claude para triage de mantenimiento y respuestas a inquilinos.

## 4. Fases

1. MVP: propiedades, unidades, inquilinos, contratos, cargos recurrentes y cobro con Stripe.
2. Contabilidad, reportes y portal de propietario.
3. Mantenimiento, comunicación y portal de inquilino.
4. Arrendamiento: listados, solicitudes, eSign, screening.
5. Agentes de IA y app móvil.

## 5. Siguientes pasos

- Leer la documentación oficial de la API (support.doorloop.com, api.doorloop.com) para ajustar nombres de campos.
- Decidir mercado (EE. UU. o México) porque cambia pagos, impuestos y screening.
- Respetar marca, textos e imágenes de DoorLoop: el producto replicado debe tener nombre y diseño propios.
