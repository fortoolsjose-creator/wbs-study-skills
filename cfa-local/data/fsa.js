window.CFA_CONTENT = window.CFA_CONTENT || {};
window.CFA_CONTENT["fsa"] = {
  resumen: [
    {
      titulo: "Estado de resultados y reconocimiento de ingresos",
      puntos: [
        "El estado de resultados (income statement) mide el desempeño del periodo: ingresos (revenues), gastos (expenses), ganancias y pérdidas (gains and losses) y utilidad neta (net income).",
        "El modelo de ingresos convergente (IFRS 15 / ASC 606) reconoce ingreso cuando se satisface una obligación de desempeño (performance obligation), es decir, cuando el control del bien o servicio pasa al cliente.",
        "Cinco pasos: identificar el contrato, identificar las obligaciones de desempeño, determinar el precio de la transacción, asignarlo a cada obligación y reconocer el ingreso al cumplirla.",
        "Reconocimiento agresivo de ingresos (por ejemplo, adelantar ventas o enviar producto no pedido) infla la utilidad actual a costa de periodos futuros; es una señal clásica de baja calidad de utilidades.",
        "La utilidad por acción básica (basic EPS) = (utilidad neta − dividendos preferentes) / acciones promedio ponderadas; la diluida (diluted EPS) usa el método if-converted o treasury stock y solo incluye instrumentos dilutivos.",
        "Capitalizar un desembolso en lugar de gastarlo eleva la utilidad y el flujo de operación (CFO) del año, pero reduce las utilidades futuras mediante la depreciación."
      ]
    },
    {
      titulo: "Balance general y estado de flujo de efectivo",
      puntos: [
        "El balance (balance sheet) muestra activos = pasivos + patrimonio en una fecha; la clasificación corriente/no corriente y el uso de valor razonable (fair value) frente a costo amortizado afectan los ratios.",
        "El flujo de efectivo se divide en operación (CFO), inversión (CFI) y financiamiento (CFF). Bajo US GAAP los intereses pagados, intereses recibidos y dividendos recibidos van en CFO; los dividendos pagados van en CFF.",
        "Bajo IFRS los intereses y dividendos recibidos pueden ir en CFO o CFI, y los intereses y dividendos pagados en CFO o CFF (elección de política).",
        "Método directo (direct method): muestra cobros a clientes, pagos a proveedores, etc. Método indirecto (indirect method): parte de la utilidad neta, suma partidas no monetarias y ajusta por cambios en capital de trabajo.",
        "Un aumento en cuentas por cobrar resta del CFO; un aumento en cuentas por pagar o ingresos diferidos suma. Las ganancias en venta de activos se restan de la utilidad neta y los ingresos van a CFI.",
        "FCFF = CFO + intereses × (1 − t) − inversión en capital fijo; FCFE = CFO − inversión en capital fijo + endeudamiento neto."
      ]
    },
    {
      titulo: "Inventarios",
      puntos: [
        "Métodos de costo: FIFO (first-in, first-out), LIFO (last-in, first-out; solo US GAAP) y costo promedio ponderado (weighted average cost). IFRS prohíbe LIFO.",
        "Con precios al alza y niveles estables: LIFO da mayor COGS, menor utilidad, menores impuestos y menor inventario; FIFO da lo contrario. El costo promedio queda en medio.",
        "LIFO reserve = inventario FIFO − inventario LIFO. Para convertir a FIFO: inventario FIFO = inventario LIFO + reserva; COGS FIFO = COGS LIFO − aumento de la reserva.",
        "Al convertir a FIFO, el patrimonio sube por reserva × (1 − t) y el pasivo por impuestos sube por reserva × t; mejora el current ratio y puede cambiar la rotación de inventarios.",
        "Valuación al menor entre costo y valor neto realizable (lower of cost and net realizable value). IFRS permite revertir rebajas hasta el costo original; US GAAP no permite reversión.",
        "Una liquidación de capas LIFO (LIFO liquidation) con precios al alza reduce el COGS y eleva artificialmente la utilidad."
      ]
    },
    {
      titulo: "Activos de larga vida, depreciación y deterioro",
      puntos: [
        "Los costos de adquisición se capitalizan. Los intereses durante la construcción de un activo propio también (capitalized interest), lo que sube utilidad y CFO presentes y baja la cobertura de intereses.",
        "Depreciación: línea recta (straight-line) = (costo − valor residual) / vida útil; saldo decreciente doble (DDB) = 2/vida × valor en libros inicial, sin restar el valor residual en la base.",
        "Costos de desarrollo: bajo IFRS se capitalizan cuando se cumplen criterios de factibilidad; bajo US GAAP generalmente se gastan (excepto software y algunos casos).",
        "Modelo de costo (cost model) frente a modelo de revaluación (revaluation model, IFRS): este último reconoce aumentos en otros resultados integrales (OCI).",
        "Deterioro IFRS: pérdida = valor en libros − monto recuperable (el mayor entre valor razonable menos costos de venta y valor en uso); permite reversión (salvo goodwill).",
        "Deterioro US GAAP (activos mantenidos para uso): primero prueba de recuperabilidad con flujos sin descontar; si falla, pérdida = valor en libros − valor razonable; sin reversión."
      ]
    },
    {
      titulo: "Impuestos diferidos",
      puntos: [
        "Diferencias temporales (temporary differences) entre la base contable y la fiscal generan pasivos por impuesto diferido (DTL) o activos (DTA).",
        "Gasto por impuesto a la renta = impuesto por pagar (taxes payable) + aumento de DTL − aumento de DTA.",
        "Depreciación acelerada fiscal con depreciación en línea recta contable crea un DTL; gastos contables reconocidos antes que fiscales (provisiones por garantía) crean un DTA.",
        "Un cambio en la tasa legal se aplica a los saldos diferidos en el periodo de promulgación: una baja de tasa reduce el DTL y el gasto por impuestos de ese año.",
        "Diferencias permanentes (por ejemplo, intereses de bonos municipales exentos) no generan impuestos diferidos y cambian la tasa efectiva.",
        "Un valuation allowance reduce el DTA cuando es probable que no se realice; es un área de juicio gerencial."
      ]
    },
    {
      titulo: "Arrendamientos (leases)",
      puntos: [
        "Para el arrendatario (lessee) casi todos los arrendamientos largos reconocen un pasivo por arrendamiento (lease liability) y un activo por derecho de uso (right-of-use asset).",
        "Pasivo inicial = valor presente de los pagos restantes descontados a la tasa implícita o la tasa incremental de endeudamiento; el interés de cada periodo = tasa × saldo inicial.",
        "IFRS 16: modelo único; el arrendatario reporta depreciación e interés (gasto frontal, mayor al inicio). Excepciones: arrendamientos a corto plazo y de bajo valor.",
        "US GAAP (ASC 842): clasifica en finance leases (depreciación + interés) y operating leases (un solo gasto lineal por arrendamiento), aunque ambos tienen pasivo y activo en balance.",
        "Bajo IFRS, el pago del principal va en CFF y el interés según política; en operating leases de US GAAP todo el pago va en CFO, lo que hace parecer mayor el CFO de IFRS.",
        "El arrendador (lessor) clasifica en financiero u operativo según la transferencia de riesgos y beneficios; el operativo mantiene el activo en su balance."
      ]
    },
    {
      titulo: "Inversiones intercorporativas",
      puntos: [
        "Participación menor al 20 %, sin influencia: instrumento financiero a valor razonable (con cambios en resultados u OCI según clasificación).",
        "Influencia significativa (aprox. 20 % a 50 %): método de la participación (equity method). Se registra al costo y luego se suma la participación en la utilidad y se resta los dividendos recibidos.",
        "En el equity method los dividendos reducen el valor en libros de la inversión y no son ingreso; la utilidad participada sí afecta resultados pero no genera efectivo.",
        "Control (más de 50 % o poder de dirigir): consolidación completa (acquisition method), con interés no controlador (NCI) mostrado dentro del patrimonio.",
        "Goodwill = contraprestación + valor razonable del NCI − valor razonable de los activos netos identificables. Con el método de goodwill parcial (solo IFRS) el NCI se mide por su parte proporcional.",
        "El goodwill no se amortiza; se prueba al menos anualmente por deterioro. Una compra en condiciones ventajosas (bargain purchase) genera una ganancia."
      ]
    },
    {
      titulo: "Análisis de razones, DuPont y calidad de utilidades",
      puntos: [
        "Liquidez: current ratio, quick ratio, cash ratio. Actividad: rotación de inventarios, de cuentas por cobrar y de pagar; ciclo de conversión de efectivo (CCC = DIO + DSO − DPO).",
        "Solvencia: deuda sobre patrimonio, cobertura de intereses (interest coverage), apalancamiento financiero. Rentabilidad: márgenes, ROA y ROE.",
        "DuPont de 3 pasos: ROE = margen neto × rotación de activos × apalancamiento. De 5 pasos: carga impositiva × carga de intereses × margen EBIT × rotación × apalancamiento.",
        "Calidad de utilidades (earnings quality): utilidades sostenibles, respaldadas por flujo de efectivo y políticas contables conservadoras y consistentes.",
        "Señales de alerta: cuentas por cobrar creciendo más rápido que ventas, CFO persistentemente menor que utilidad neta, cambios frecuentes de políticas, capitalización agresiva.",
        "Comparar con pares exige ajustar diferencias contables (LIFO vs FIFO, IFRS vs US GAAP, arrendamientos) antes de interpretar los ratios."
      ]
    }
  ],
  formulas: [
    {
      nombre: "Costo de ventas (COGS)",
      formula: "COGS = Inventario inicial + Compras − Inventario final",
      nota: "Base de todos los métodos de inventario; en periodos de inflación LIFO da el COGS más alto y FIFO el más bajo."
    },
    {
      nombre: "Conversión de LIFO a FIFO",
      formula: "Inv FIFO = Inv LIFO + Reserva LIFO; COGS FIFO = COGS LIFO − (Reserva final − Reserva inicial)",
      nota: "Error común: sumar el cambio de la reserva al COGS en vez de restarlo. Ajusta también el patrimonio por reserva × (1 − t)."
    },
    {
      nombre: "Depreciación en línea recta y DDB",
      formula: "SL = (Costo − Residual) / Vida; DDB = (2 / Vida) × Valor en libros inicial",
      nota: "En DDB no se resta el valor residual de la base y nunca se deprecia por debajo del residual."
    },
    {
      nombre: "Efectivo cobrado a clientes (método directo)",
      formula: "Cobros = Ingresos − Aumento de CxC + Aumento de ingresos diferidos",
      nota: "Un aumento en cuentas por cobrar (CxC) resta; un aumento en ingresos diferidos (cobro anticipado) suma."
    },
    {
      nombre: "CFO por método indirecto",
      formula: "CFO = Utilidad neta + No monetarios − Ganancias en ventas ± Cambios en capital de trabajo",
      nota: "Las ganancias de venta de activos se restan en CFO y el producto de la venta va a CFI."
    },
    {
      nombre: "FCFF y FCFE",
      formula: "FCFF = CFO + Intereses × (1 − t) − CapEx; FCFE = CFO − CapEx + Endeudamiento neto",
      nota: "Con US GAAP el interés ya está restado en CFO, por eso se suma después de impuestos. No sumar el interés bruto."
    },
    {
      nombre: "Gasto por impuesto a la renta",
      formula: "Gasto = Impuesto por pagar + ΔDTL − ΔDTA",
      nota: "El impuesto por pagar usa la utilidad gravable; el gasto contable usa la utilidad antes de impuestos."
    },
    {
      nombre: "Efecto de un cambio de tasa en el DTL",
      formula: "ΔDTL = Diferencia temporal × (Tasa nueva − Tasa anterior)",
      nota: "Una baja de tasa reduce el DTL y también el gasto por impuestos del año; no confundir con el saldo final."
    },
    {
      nombre: "Pasivo por arrendamiento",
      formula: "Pasivo = VP(pagos restantes); Interés del periodo = Tasa × Pasivo inicial",
      nota: "El saldo al final de un periodo es el VP de los pagos que aún faltan, no el VP inicial menos un pago."
    },
    {
      nombre: "Método de la participación (equity method)",
      formula: "Valor final = Costo + % × Utilidad neta de la asociada − % × Dividendos",
      nota: "Los dividendos recibidos reducen la inversión y no se reconocen como ingreso."
    },
    {
      nombre: "Goodwill (método de goodwill completo)",
      formula: "Goodwill = Contraprestación + VR del NCI − VR de activos netos identificables",
      nota: "Con NCI proporcional (solo IFRS) el goodwill resulta menor; es un error omitir el NCI."
    },
    {
      nombre: "DuPont de cinco pasos",
      formula: "ROE = (UN/UAI) × (UAI/EBIT) × (EBIT/Ventas) × (Ventas/Activos) × (Activos/Patrimonio)",
      nota: "Los dos primeros factores son las cargas impositiva y de intereses; omitir el apalancamiento es un error frecuente."
    },
    {
      nombre: "Ciclo de conversión de efectivo",
      formula: "CCC = DIO + DSO − DPO; DIO = Inv. prom / COGS × 365; DSO = CxC prom / Ventas × 365; DPO = CxP prom / COGS × 365",
      nota: "DPO se calcula sobre COGS (compras), no sobre ventas."
    },
    {
      nombre: "Utilidad por acción diluida (if-converted)",
      formula: "EPS dil = (UN + Interés × (1 − t)) / (Acciones + Acciones por conversión)",
      nota: "Se suma el interés después de impuestos; solo se incluye si el efecto es dilutivo."
    }
  ],
  tarjetas: [
    {
      f: "Rising prices, stable inventory: which method gives highest COGS and lowest taxes?",
      b: "LIFO. Asigna los costos más recientes (más altos) al COGS, por eso reduce utilidad e impuestos y deja el inventario del balance subvaluado."
    },
    {
      f: "LIFO reserve",
      b: "Diferencia entre inventario FIFO e inventario LIFO. Sirve para convertir estados LIFO a FIFO: inventario FIFO = inventario LIFO + reserva."
    },
    {
      f: "Impairment test: IFRS vs US GAAP (held for use)",
      b: "IFRS: pérdida si valor en libros > monto recuperable (mayor entre valor razonable menos costos de venta y valor en uso), con reversión permitida. US GAAP: prueba de recuperabilidad con flujos sin descontar, y sin reversión."
    },
    {
      f: "Deferred tax liability (DTL) arises when...",
      b: "El gasto fiscal deducible es mayor al contable en el presente (por ejemplo, depreciación acelerada fiscal): se paga menos hoy y más después. Es una diferencia temporal (temporary difference)."
    },
    {
      f: "Lessee accounting under IFRS 16",
      b: "Un modelo único: reconoce right-of-use asset y lease liability, y reporta depreciación más interés (gasto mayor al inicio). Excepto arrendamientos de corto plazo y bajo valor."
    },
    {
      f: "Operating lease under US GAAP (ASC 842), lessee",
      b: "Se reconocen activo y pasivo en balance, pero el estado de resultados muestra un solo gasto lineal (straight-line lease cost) y el pago completo va en CFO."
    },
    {
      f: "Equity method: how do dividends from the investee affect the investment?",
      b: "Reducen el valor en libros de la inversión; no son ingreso. La utilidad participada (share of net income) aumenta la inversión."
    },
    {
      f: "Full goodwill method",
      b: "Goodwill = contraprestación + valor razonable del NCI − valor razonable de activos netos identificables. Exigido bajo US GAAP; opcional bajo IFRS junto con el método proporcional."
    },
    {
      f: "Three-step DuPont",
      b: "ROE = net profit margin × total asset turnover × financial leverage (margen neto × rotación de activos × apalancamiento)."
    },
    {
      f: "Cash conversion cycle (CCC)",
      b: "DIO + DSO − DPO. Mide los días entre pagar a proveedores y cobrar a clientes; un ciclo más corto indica uso más eficiente del capital de trabajo."
    },
    {
      f: "Interest paid: classification under US GAAP and IFRS",
      b: "US GAAP: siempre CFO. IFRS: CFO o CFF a elección de la empresa. Los intereses y dividendos recibidos: US GAAP en CFO; IFRS en CFO o CFI."
    },
    {
      f: "Warning signs of low earnings quality",
      b: "Cuentas por cobrar creciendo más rápido que ventas, CFO persistentemente por debajo de la utilidad neta, cambios frecuentes de políticas contables y capitalización agresiva de gastos."
    }
  ],
  preguntas: [
    {
      id: "fsa-01",
      q: "In a period of rising purchase prices and stable inventory quantities, which inventory cost-flow method reports the highest cost of goods sold?",
      o: ["FIFO", "LIFO", "Weighted average cost"],
      c: 1,
      e: "LIFO envía al COGS las unidades compradas más recientemente, que son las más caras cuando los precios suben. FIFO asigna al COGS las unidades más antiguas y baratas, por lo que da el COGS más bajo. El costo promedio ponderado queda entre ambos extremos, así que no puede ser el más alto.",
      d: 1,
      tag: "Inventory cost flow"
    },
    {
      id: "fsa-02",
      q: "Calder Tools began the year with 200 units at 10 each. It then bought 300 units at 12 and later 400 units at 14, and sold 600 units during the year. Using the weighted average cost method with a periodic system, cost of goods sold is closest to:",
      o: ["7,000", "7,467", "8,000"],
      c: 1,
      e: "Costo total disponible = 200×10 + 300×12 + 400×14 = 2,000 + 3,600 + 5,600 = 11,200 para 900 unidades, o sea 12.444 por unidad. COGS = 600 × 12.444 = 7,467. Los 7,000 corresponden a FIFO (200×10 + 300×12 + 100×14) y los 8,000 a LIFO (400×14 + 200×12).",
      d: 2,
      tag: "Weighted average COGS"
    },
    {
      id: "fsa-03",
      q: "A company using LIFO reports cost of goods sold of 1,900. Its LIFO reserve was 55 at the start of the year and 75 at the end of the year. Cost of goods sold if the company had used FIFO would be:",
      o: ["1,880", "1,900", "1,920"],
      c: 0,
      e: "COGS FIFO = COGS LIFO − (reserva final − reserva inicial) = 1,900 − (75 − 55) = 1,880. La reserva creciente indica que LIFO cargó costos más altos al COGS, por lo que FIFO debe mostrar un COGS menor. Los 1,920 resultan de sumar el cambio de la reserva en vez de restarlo, y los 1,900 de no hacer el ajuste.",
      d: 2,
      tag: "LIFO to FIFO conversion"
    },
    {
      id: "fsa-04",
      q: "An analyst compares two firms by converting Quill Corp from LIFO to FIFO. Quill reports total liabilities of 600 and equity of 800 under LIFO, a LIFO reserve of 120, and a tax rate of 25%. After the adjustment, the ratio of total liabilities to equity is closest to:",
      o: ["0.65", "0.71", "0.75"],
      c: 1,
      e: "El ajuste sube el patrimonio en 120 × (1 − 0.25) = 90, es decir a 890, y sube los pasivos (impuesto diferido) en 120 × 0.25 = 30, es decir a 630. La razón es 630 / 890 = 0.71. La razón 0.75 es la original sin ajuste y 0.65 (600 / 920) olvida el efecto fiscal: suma toda la reserva al patrimonio y no aumenta el pasivo.",
      d: 3,
      tag: "LIFO reserve and leverage"
    },
    {
      id: "fsa-05",
      q: "Last year a manufacturer wrote inventory down to net realizable value. This year net realizable value has recovered above the written-down amount. The reversal of the write-down is:",
      o: ["Allowed under IFRS only", "Allowed under US GAAP only", "Prohibited under IFRS and US GAAP"],
      c: 0,
      e: "IFRS permite revertir la rebaja de inventario hasta el monto del costo original, y el crédito se reconoce en resultados. US GAAP trata la rebaja como una nueva base de costo y no permite la reversión. Por tanto, solo la primera opción es correcta; las otras dos invierten o ignoran esta diferencia conocida entre ambos marcos.",
      d: 2,
      tag: "IFRS vs US GAAP inventory"
    },
    {
      id: "fsa-06",
      q: "A machine costs 120,000, has a salvage value of 12,000, and a useful life of 6 years. Using the double-declining balance method, depreciation expense in year 2 is closest to:",
      o: ["18,000", "24,000", "26,667"],
      c: 2,
      e: "La tasa DDB es 2/6 = 33.33 % y se aplica al valor en libros sin restar el residual. Año 1 = 120,000 × 33.33 % = 40,000; año 2 = (120,000 − 40,000) × 33.33 % = 26,667. Los 18,000 son la depreciación en línea recta (108,000 / 6) y los 24,000 resultan de restar el valor residual de la base inicial, lo cual no se hace en DDB.",
      d: 2,
      tag: "Depreciation"
    },
    {
      id: "fsa-07",
      q: "Under US GAAP, a firm tests an asset held for use that has a carrying amount of 850. Undiscounted future cash flows total 800, the present value of future cash flows is 790, and fair value is 700. The impairment loss recognized is closest to:",
      o: ["0", "60", "150"],
      c: 2,
      e: "Bajo US GAAP primero se prueba la recuperabilidad: los flujos sin descontar (800) son menores que el valor en libros (850), así que hay deterioro. La pérdida = valor en libros − valor razonable = 850 − 700 = 150. Los 60 salen de usar el valor presente (790) como si se aplicara el criterio IFRS (monto recuperable), y 0 supondría que la prueba de recuperabilidad se pasó.",
      d: 2,
      tag: "Impairment US GAAP"
    },
    {
      id: "fsa-08",
      q: "Company A capitalized a 400 expenditure that comparable Company B expensed immediately. All else equal, in the year of the expenditure Company A reports, relative to Company B:",
      o: ["Higher net income and CFO", "Higher net income but lower CFO", "Lower net income but higher CFO"],
      c: 0,
      e: "Al capitalizar, el desembolso no pasa por el estado de resultados en el año, por lo que la utilidad neta es mayor. Además, la salida de efectivo se clasifica en inversión (CFI) y no en operación, por lo que el CFO también es mayor. Más adelante, la depreciación reduce las utilidades futuras de A. Las otras opciones combinan mal los efectos sobre utilidad y CFO.",
      d: 2,
      tag: "Capitalization vs expensing"
    },
    {
      id: "fsa-09",
      q: "Pretax income is 600 and taxable income is 480 because of accelerated tax depreciation. The tax rate is 25%. Income tax expense reported on the income statement is:",
      o: ["30", "120", "150"],
      c: 2,
      e: "El gasto por impuestos contable = tasa × utilidad antes de impuestos = 0.25 × 600 = 150. Está compuesto por el impuesto por pagar (0.25 × 480 = 120) más el aumento del DTL (0.25 × 120 = 30). Los 120 son solo el impuesto corriente por pagar y los 30 solo el DTL.",
      d: 1,
      tag: "Income tax expense"
    },
    {
      id: "fsa-10",
      q: "At the start of the year, Lumen Corp carried a deferred tax liability of 300, based on a 1,000 temporary difference taxed at 30%. Newly enacted legislation lowers the tax rate to 24%, and the temporary difference is unchanged. The resulting reduction in income tax expense is:",
      o: ["60", "240", "300"],
      c: 0,
      e: "El nuevo DTL = 1,000 × 24 % = 240, así que el pasivo baja en 300 − 240 = 60. Esa reducción se reconoce como menor gasto por impuestos en el periodo de la promulgación. Los 240 son el saldo nuevo del DTL, no el cambio, y los 300 son el saldo anterior.",
      d: 3,
      tag: "Deferred tax rate change"
    },
    {
      id: "fsa-11",
      q: "Under IFRS, a lessee signs a ten-year lease of a delivery vehicle that is neither short-term nor low-value. In its income statement the lessee reports:",
      o: ["Rent expense only", "Depreciation and interest expense", "One straight-line lease expense, in all cases"],
      c: 1,
      e: "IFRS 16 usa un modelo único para el arrendatario: reconoce el activo por derecho de uso, que se deprecia, y el pasivo por arrendamiento, que genera interés. El gasto total es mayor al inicio del plazo. Un gasto único lineal corresponde a los operating leases de US GAAP, no a IFRS, y reportar solo renta ignora el reconocimiento del pasivo.",
      d: 1,
      tag: "Leases IFRS 16"
    },
    {
      id: "fsa-12",
      q: "A lessee signs a 3-year lease requiring payments of 10,000 at the end of each year, discounted at 8%. Immediately after the first payment is made at the end of year 1, the lease liability is closest to:",
      o: ["15,771", "17,833", "20,000"],
      c: 1,
      e: "VP inicial = 10,000 × 2.5771 = 25,771; interés del año 1 = 25,771 × 8 % = 2,062; saldo = 25,771 + 2,062 − 10,000 = 17,833. Equivale al VP de los dos pagos restantes (10,000 × 1.7833). Los 15,771 restan el pago sin acumular interés y los 20,000 suman los pagos restantes sin descontarlos.",
      d: 3,
      tag: "Lease liability"
    },
    {
      id: "fsa-13",
      q: "Bridgeway Ltd. reported revenue of 1,240. During the year, accounts receivable decreased by 35 and unearned revenue decreased by 10. Cash collected from customers is:",
      o: ["1,195", "1,215", "1,265"],
      c: 2,
      e: "Cobros = ingresos + disminución de CxC − disminución de ingresos diferidos = 1,240 + 35 − 10 = 1,265. Una baja en CxC significa que se cobró más que lo vendido; una baja en ingresos diferidos significa que parte del ingreso ya se había cobrado antes, por lo que resta. Los 1,195 y 1,215 aplican mal uno o ambos signos.",
      d: 2,
      tag: "Direct method CFO"
    },
    {
      id: "fsa-14",
      q: "Under US GAAP, interest paid by a manufacturer on its bank loan is classified in the statement of cash flows as an:",
      o: ["Financing activity", "Investing activity", "Operating activity"],
      c: 2,
      e: "US GAAP clasifica los intereses pagados como actividad de operación (CFO) porque entran en la determinación de la utilidad neta. IFRS, en cambio, permite elegir entre operación y financiamiento. El financiamiento corresponde al principal de la deuda, y la inversión no se aplica a intereses pagados.",
      d: 1,
      tag: "Cash flow classification"
    },
    {
      id: "fsa-15",
      q: "Net income is 400, depreciation is 60, and the company recorded a 10 gain on sale of equipment. Accounts receivable increased by 25 and accounts payable decreased by 15. Cash flow from operations using the indirect method is:",
      o: ["410", "430", "490"],
      c: 0,
      e: "CFO = 400 + 60 − 10 (la ganancia se resta porque el producto de la venta va a CFI) − 25 (aumento de CxC) − 15 (baja de CxP) = 410. Los 430 suman la ganancia en lugar de restarla, y los 490 invierten los signos de los cambios en capital de trabajo.",
      d: 2,
      tag: "Indirect method CFO"
    },
    {
      id: "fsa-16",
      q: "A firm reports cash flow from operations of 640 after paying interest of 80, which is classified in operating activities. The tax rate is 30% and capital expenditures are 300. Free cash flow to the firm is closest to:",
      o: ["340", "396", "420"],
      c: 1,
      e: "FCFF = CFO + intereses × (1 − t) − CapEx = 640 + 80 × 0.70 − 300 = 396. El interés se suma después de impuestos porque su escudo fiscal ya está incluido en el CFO. Los 340 omiten el ajuste del interés y los 420 suman el interés bruto sin considerar el impuesto.",
      d: 2,
      tag: "FCFF"
    },
    {
      id: "fsa-17",
      q: "Under the converged revenue recognition standards, a seller recognizes revenue when:",
      o: ["The contract is signed", "Cash is collected in full", "A performance obligation is satisfied"],
      c: 2,
      e: "IFRS 15 y ASC 606 reconocen ingreso cuando se satisface una obligación de desempeño, es decir, cuando el control del bien o servicio se transfiere al cliente. La firma del contrato es solo el primer paso del modelo y el cobro puede ocurrir antes o después del reconocimiento.",
      d: 1,
      tag: "Revenue recognition"
    },
    {
      id: "fsa-18",
      q: "An investor buys 30% of Delta Co. for 300, equal to 30% of the book value and fair value of Delta's net assets, and applies the equity method. Delta reports net income of 200 and pays dividends of 80 for the year. The investment's year-end carrying amount is:",
      o: ["324", "336", "360"],
      c: 1,
      e: "Valor final = 300 + 30 % × 200 − 30 % × 80 = 300 + 60 − 24 = 336. La utilidad participada aumenta la inversión y los dividendos la reducen. Los 360 ignoran los dividendos, y los 324 tratan los dividendos recibidos como si aumentaran la inversión (300 + 24) sin reconocer la utilidad.",
      d: 2,
      tag: "Equity method"
    },
    {
      id: "fsa-19",
      q: "An acquirer pays 800 for 80% of a target. The fair value of the target's identifiable net assets is 700 and the fair value of the 20% noncontrolling interest is 180. Under the full goodwill method, goodwill is:",
      o: ["100", "240", "280"],
      c: 2,
      e: "Goodwill = contraprestación + valor razonable del NCI − valor razonable de activos netos identificables = 800 + 180 − 700 = 280. Los 240 aplican el NCI proporcional (20 % × 700 = 140, método parcial permitido solo bajo IFRS), y los 100 omiten el NCI por completo.",
      d: 3,
      tag: "Goodwill and NCI"
    },
    {
      id: "fsa-20",
      q: "A company has cash of 90, marketable securities of 60, receivables of 150, inventory of 180, and prepaid expenses of 20. Current liabilities are 250. The quick ratio is closest to:",
      o: ["1.20", "1.28", "2.00"],
      c: 0,
      e: "Quick ratio = (efectivo + valores negociables + cuentas por cobrar) / pasivo corriente = (90 + 60 + 150) / 250 = 1.20. Los 1.28 incluyen los gastos prepagados, que no son líquidos, y los 2.00 corresponden al current ratio (500 / 250), que incluye inventarios.",
      d: 1,
      tag: "Liquidity ratios"
    },
    {
      id: "fsa-21",
      q: "A firm has revenue of 3,650, cost of goods sold of 2,555, average inventory of 350, average receivables of 300, and average payables of 280. Using 365 days, its cash conversion cycle is closest to:",
      o: ["40 days", "52 days", "120 days"],
      c: 0,
      e: "DIO = 350 / 2,555 × 365 = 50; DSO = 300 / 3,650 × 365 = 30; DPO = 280 / 2,555 × 365 = 40. CCC = 50 + 30 − 40 = 40 días. Los 52 calculan el DPO sobre ventas (28 días) en lugar de COGS, y los 120 suman el DPO en vez de restarlo.",
      d: 2,
      tag: "Cash conversion cycle"
    },
    {
      id: "fsa-22",
      q: "A firm has a tax burden of 0.75, an interest burden of 0.80, an EBIT margin of 10%, total asset turnover of 1.25, and financial leverage of 1.8. Its return on equity is closest to:",
      o: ["7.5%", "10.8%", "13.5%"],
      c: 2,
      e: "ROE = 0.75 × 0.80 × 0.10 × 1.25 × 1.8 = 0.135, es decir 13.5 %. Los 7.5 % se obtienen omitiendo el apalancamiento (0.075) y los 10.8 % omitiendo la rotación de activos (0.06 × 1.8). En DuPont de cinco pasos deben multiplicarse los cinco factores.",
      d: 2,
      tag: "DuPont"
    },
    {
      id: "fsa-23",
      q: "A company has net income of 800 and 400 weighted average shares. It also has convertible bonds with a face value of 2,000 and a 5% coupon, convertible into 100 shares. The tax rate is 30%. Diluted EPS is closest to:",
      o: ["1.60", "1.74", "1.80"],
      c: 1,
      e: "Método if-converted: se suma el interés después de impuestos al numerador (2,000 × 5 % × 0.70 = 70) y las acciones de conversión al denominador: (800 + 70) / (400 + 100) = 1.74. Es dilutivo porque 1.74 es menor que el EPS básico de 2.00. Los 1.80 suman el interés antes de impuestos y los 1.60 omiten el ajuste al numerador.",
      d: 3,
      tag: "Diluted EPS"
    },
    {
      id: "fsa-24",
      q: "Which finding most likely indicates lower earnings quality?",
      o: ["Receivables growing much faster than sales", "Consistent accounting policies across periods", "Operating cash flow that tracks net income closely"],
      c: 0,
      e: "Cuentas por cobrar que crecen mucho más que las ventas sugieren reconocimiento agresivo de ingresos o cobros dudosos, y por tanto utilidades menos sostenibles. Políticas consistentes y un CFO alineado con la utilidad neta son señales de buena calidad, porque las utilidades están respaldadas por efectivo y son comparables en el tiempo.",
      d: 1,
      tag: "Earnings quality"
    }
  ]
};
