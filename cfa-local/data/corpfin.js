window.CFA_CONTENT = window.CFA_CONTENT || {};
window.CFA_CONTENT["corpfin"] = {
  resumen: [
    {
      titulo: "Presupuesto de capital (capital budgeting)",
      puntos: [
        "NPV (valor presente neto) = suma de flujos descontados − inversión inicial; acepta proyectos con NPV > 0 y mide directamente la creación de riqueza para el accionista.",
        "IRR (tasa interna de retorno) es la tasa que hace NPV = 0; se acepta si IRR > costo de capital. Puede dar resultados múltiples o ninguno con flujos no convencionales.",
        "Payback ignora el valor del dinero en el tiempo y los flujos posteriores; el discounted payback corrige lo primero pero no lo segundo.",
        "Índice de rentabilidad (profitability index, PI) = 1 + NPV / inversión inicial; útil bajo racionamiento de capital.",
        "Con proyectos mutuamente excluyentes y ranking contradictorio entre NPV e IRR, se elige el de mayor NPV. Con vidas distintas se usa el equivalent annual annuity (EAA) o la cadena de reemplazo.",
        "Se analizan flujos incrementales, después de impuestos, sin costos hundidos (sunk costs), incluyendo costos de oportunidad y efectos en capital de trabajo."
      ]
    },
    {
      titulo: "Costo de capital (cost of capital)",
      puntos: [
        "WACC = wd × Kd × (1 − t) + wp × Kp + we × Ke, con pesos a valor de mercado o a la estructura objetivo.",
        "Costo del patrimonio con CAPM: Ke = Rf + β × (Rm − Rf). Alternativas: modelo de dividendos (Gordon) y bond yield plus risk premium.",
        "El costo de la deuda se mide por el rendimiento al vencimiento (YTM) actual, no por la tasa cupón histórica; el interés es deducible, de ahí el factor (1 − t).",
        "Costo marginal: el WACC relevante para un proyecto es el de su riesgo. Para un proyecto distinto del negocio central se usa un beta de empresa comparable (pure-play).",
        "Se desapalanca el beta del comparable: β activos = β patrimonio / [1 + (1 − t) × D/E] y luego se reapalanca con la estructura objetivo del proyecto.",
        "Costos de flotación (flotation costs) se incorporan a los flujos del proyecto, no al costo del capital."
      ]
    },
    {
      titulo: "Estructura de capital (capital structure)",
      puntos: [
        "Modigliani-Miller sin impuestos: el valor de la empresa no depende de su estructura de capital (Proposición I); el costo del patrimonio sube con el apalancamiento (Proposición II).",
        "Con impuestos corporativos: V apalancada = V no apalancada + t × D; el escudo fiscal de intereses (interest tax shield) favorece la deuda.",
        "Costos de dificultades financieras (costs of financial distress) y costos de agencia (agency costs) compensan el beneficio fiscal en la teoría del trade-off.",
        "En el punto óptimo de la teoría estática, el beneficio marginal del escudo fiscal iguala el costo marginal de la dificultad financiera, y el WACC es mínimo.",
        "La teoría del pecking order sostiene que las empresas prefieren fondos internos, luego deuda y al final emisión de acciones por asimetría de información.",
        "La estructura objetivo (target capital structure) es la referencia para el WACC cuando la actual difiere de la meta de largo plazo."
      ]
    },
    {
      titulo: "Apalancamiento operativo y financiero",
      puntos: [
        "El apalancamiento operativo (DOL) surge de costos fijos operativos: DOL = Q(P − V) / [Q(P − V) − F] = cambio % en EBIT / cambio % en ventas.",
        "El apalancamiento financiero (DFL) surge de los intereses: DFL = EBIT / (EBIT − intereses) = cambio % en EPS / cambio % en EBIT.",
        "El apalancamiento total (DTL) = DOL × DFL mide el cambio % del EPS ante un cambio % en ventas.",
        "A mayor DOL, mayor riesgo del negocio (business risk); a mayor DFL, mayor riesgo financiero. Ambos amplifican resultados al alza y a la baja.",
        "El punto de equilibrio operativo (breakeven) es Q = F / (P − V); ventas por debajo generan pérdidas operativas.",
        "Las empresas con costos fijos altos deberían usar menos deuda para no combinar dos fuentes de riesgo."
      ]
    },
    {
      titulo: "Administración del capital de trabajo (working capital)",
      puntos: [
        "La liquidez se gestiona con efectivo, valores negociables, cuentas por cobrar e inventarios, buscando el equilibrio entre riesgo y rentabilidad.",
        "Ciclo de conversión de efectivo (CCC) = días de inventario + días de cobro − días de pago; reducirlo libera efectivo.",
        "Costo del crédito comercial: con términos 2/10 net 40, el costo de no tomar el descuento es (2 / 98) anualizado con 365 / 30 periodos; compuesto da más de 27 %.",
        "Fuentes de financiamiento de corto plazo: líneas de crédito comprometidas (committed), papel comercial, factoraje, créditos garantizados con inventarios o cuentas por cobrar.",
        "Políticas de inversión del efectivo: valores de corto plazo de alta calidad crediticia (Treasury bills, money market funds), buscando seguridad y liquidez antes que rendimiento.",
        "Mayor eficiencia en el capital de trabajo mejora ROA y flujo libre, pero ajustar demasiado el inventario puede causar faltantes y pérdida de ventas."
      ]
    },
    {
      titulo: "Dividendos y recompras (payout policy)",
      puntos: [
        "Tipos de dividendos: en efectivo (regular, extraordinario), en acciones y escisiones. Los splits cambian el número de acciones y no el valor total de la empresa.",
        "Las recompras (share repurchases) reducen el efectivo y las acciones; el EPS sube solo si el rendimiento después de impuestos del efectivo gastado es menor que el earnings yield de la acción.",
        "Bajo teoría de irrelevancia (MM), en mercados perfectos la política de dividendos no afecta el valor; en la práctica influyen impuestos, costos de flotación y señales (signaling).",
        "Teorías: bird-in-the-hand (prefiere dividendos), tax-aversion (prefiere recompras) y clientele effect (los inversionistas se agrupan según su preferencia de pago).",
        "Políticas: dividendo residual (residual), dividendo estable (stable) y tasa de pago objetivo (target payout), con ajuste gradual hacia la meta.",
        "Fechas clave del dividendo: declaración (declaration), ex-dividendo (ex-date), registro (record date) y pago (payment date); el precio cae aproximadamente el dividendo en la ex-date."
      ]
    },
    {
      titulo: "Gobierno corporativo y factores ESG",
      puntos: [
        "El gobierno corporativo (corporate governance) es el sistema de controles y relaciones entre accionistas, consejo (board), gerencia y otras partes interesadas.",
        "El problema de agencia (agency problem) surge cuando la gerencia persigue intereses distintos a los de los accionistas; se mitiga con compensación ligada al desempeño y consejos independientes.",
        "Comités clave: auditoría (supervisa reportes financieros y auditoría), compensación y nominaciones; deben estar compuestos mayoritariamente por consejeros independientes.",
        "Riesgos de gobierno: concentración de poder, estructuras de doble clase de acciones, consejos sin independencia, compensación que no se alinea con el largo plazo.",
        "ESG: ambiental (emisiones, uso de agua), social (seguridad laboral, relaciones con comunidades, cadena de suministro) y gobierno (independencia del consejo, derechos de accionistas).",
        "Los factores ESG se integran al análisis mediante ajustes a flujos, a tasas de descuento o a escenarios, y mediante filtros (screens) y engagement con las empresas."
      ]
    },
    {
      titulo: "Fusiones y adquisiciones (M&A)",
      puntos: [
        "Clasificación por relación: horizontal (competidores), vertical (proveedor o cliente) y conglomerada (negocios no relacionados).",
        "Motivos: sinergias de costos o ingresos, crecimiento, diversificación, acceso a mercados o tecnología. Diversificar por sí solo rara vez crea valor para el accionista.",
        "Valor creado para el adquirente = valor presente de sinergias − prima pagada. La prima sobre el valor de mercado del objetivo (takeover premium) transfiere valor a los accionistas del objetivo.",
        "Formas de pago: efectivo, acciones o mixta; el pago en acciones comparte el riesgo de las sinergias con los accionistas del objetivo.",
        "Defensas del objetivo: poison pill, white knight, golden parachute, escalonar al consejo (staggered board) y recompras.",
        "Las autoridades de competencia (antitrust) revisan transacciones horizontales por riesgo de concentración y pueden bloquearlas o exigir desinversiones."
      ]
    }
  ],
  formulas: [
    {
      nombre: "Valor presente neto (NPV)",
      formula: "NPV = −CF0 + Σ CFt / (1 + r)^t",
      nota: "Regla: aceptar si NPV > 0. Error común: usar flujos antes de impuestos o incluir costos hundidos."
    },
    {
      nombre: "Tasa interna de retorno (IRR)",
      formula: "0 = −CF0 + Σ CFt / (1 + IRR)^t",
      nota: "Aceptar si IRR > r. Con proyectos mutuamente excluyentes y ranking contradictorio, prevalece el NPV."
    },
    {
      nombre: "Índice de rentabilidad (PI)",
      formula: "PI = 1 + NPV / Inversión inicial = VP de flujos futuros / Inversión inicial",
      nota: "Aceptar si PI > 1. Útil con racionamiento de capital; no confundir con IRR."
    },
    {
      nombre: "Payback",
      formula: "Payback = años completos + (saldo por recuperar / flujo del año siguiente)",
      nota: "Supone flujos uniformes dentro del año. Ignora el valor del dinero en el tiempo y los flujos posteriores."
    },
    {
      nombre: "Anualidad equivalente (EAA)",
      formula: "EAA = NPV / Factor de anualidad (r, n)",
      nota: "Se usa para comparar proyectos con vidas distintas; no es NPV / n."
    },
    {
      nombre: "CAPM",
      formula: "Ke = Rf + β × (Rm − Rf)",
      nota: "El término (Rm − Rf) es la prima de riesgo; error común: multiplicar β por Rm completo o sumar Rm."
    },
    {
      nombre: "Costo de deuda después de impuestos",
      formula: "Kd × (1 − t)",
      nota: "Kd es el rendimiento al vencimiento actual de la deuda, no la tasa cupón histórica."
    },
    {
      nombre: "WACC",
      formula: "WACC = wd × Kd × (1 − t) + wp × Kp + we × Ke",
      nota: "Usa pesos a valor de mercado o estructura objetivo; no olvidar el escudo fiscal solo en la deuda."
    },
    {
      nombre: "Desapalancar y reapalancar beta",
      formula: "β activos = β patrimonio / [1 + (1 − t) × D/E]; β patrimonio = β activos × [1 + (1 − t) × D/E]",
      nota: "Se usa para proyectos con riesgo distinto al de la empresa, con un comparable pure-play y la estructura del proyecto."
    },
    {
      nombre: "Apalancamiento operativo, financiero y total",
      formula: "DOL = Q(P − V) / [Q(P − V) − F]; DFL = EBIT / (EBIT − I); DTL = DOL × DFL",
      nota: "El cambio % en EPS = DTL × cambio % en ventas. Error: usar solo el DOL o solo el DFL."
    },
    {
      nombre: "Modigliani-Miller con impuestos (Proposición I)",
      formula: "V apalancada = V no apalancada + t × D",
      nota: "No incluye costos de dificultades financieras; sin impuestos, V apalancada = V no apalancada."
    },
    {
      nombre: "Modigliani-Miller sin impuestos (Proposición II)",
      formula: "Ke = R0 + (R0 − Kd) × D/E",
      nota: "El costo del patrimonio sube linealmente con el apalancamiento, y el WACC permanece constante sin impuestos."
    },
    {
      nombre: "Costo del crédito comercial",
      formula: "Costo = [1 + d / (1 − d)]^(365 / (N − días de descuento)) − 1",
      nota: "d es el descuento (2 % en 2/10 net 40). La versión simple (d/(1−d) × 365/días) subestima el costo efectivo."
    },
    {
      nombre: "Valor creado en una adquisición",
      formula: "Valor para el adquirente = VP de sinergias − Prima pagada; Prima = (Precio ofrecido − Valor de mercado) × acciones",
      nota: "La prima transfiere valor a los accionistas del objetivo; no es un costo contable del adquirente sino un reparto de las sinergias."
    }
  ],
  tarjetas: [
    {
      f: "NPV decision rule",
      b: "Aceptar el proyecto si NPV > 0 (el valor presente de los flujos supera la inversión). Es el criterio que mide directamente la creación de riqueza para los accionistas."
    },
    {
      f: "When do NPV and IRR rankings conflict?",
      b: "En proyectos mutuamente excluyentes con distinto tamaño o patrón temporal de flujos. Se elige el de mayor NPV porque supone reinversión al costo de capital."
    },
    {
      f: "Main weaknesses of the payback period",
      b: "Ignora el valor del dinero en el tiempo y los flujos posteriores al periodo de recuperación; el discounted payback corrige solo lo primero."
    },
    {
      f: "Equivalent annual annuity (EAA)",
      b: "NPV dividido entre el factor de anualidad de la vida del proyecto. Permite comparar proyectos mutuamente excluyentes con vidas distintas."
    },
    {
      f: "CAPM cost of equity",
      b: "Ke = Rf + β × (Rm − Rf). La prima de riesgo del mercado se multiplica por el beta y se suma a la tasa libre de riesgo."
    },
    {
      f: "Why is debt cost multiplied by (1 − t) in WACC?",
      b: "Porque los intereses son deducibles de impuestos: el costo efectivo de la deuda es Kd × (1 − t). Es el interest tax shield."
    },
    {
      f: "Pure-play method for project beta",
      b: "Se toma el beta de una empresa comparable del mismo negocio, se desapalanca con su D/E y se reapalanca con la estructura de capital del proyecto."
    },
    {
      f: "Trade-off theory of capital structure",
      b: "El valor de la empresa sube con la deuda por el escudo fiscal hasta que los costos de dificultades financieras (costs of financial distress) lo compensan; el óptimo minimiza el WACC."
    },
    {
      f: "Degree of total leverage (DTL)",
      b: "DOL × DFL. Indica el cambio porcentual del EPS ante un cambio porcentual en ventas, combinando riesgo del negocio y riesgo financiero."
    },
    {
      f: "How does a share repurchase affect EPS?",
      b: "Reduce acciones y también el efectivo que genera intereses. El EPS sube solo si el earnings yield de la acción es mayor que el rendimiento después de impuestos del efectivo usado."
    },
    {
      f: "Role of the audit committee",
      b: "Supervisar los reportes financieros, el control interno y la relación con los auditores externos. Debe estar integrado por consejeros independientes."
    },
    {
      f: "Value created for the acquirer in an M&A deal",
      b: "VP de las sinergias menos la prima pagada. Si la prima supera las sinergias, el valor se destruye para los accionistas del adquirente."
    }
  ],
  preguntas: [
    {
      id: "corpfin-01",
      q: "Harbor Foods is evaluating a project that requires an initial outlay of 50,000 and is expected to produce four annual cash flows of 18,000 at the end of each year. The required return is 9%. The project's net present value is closest to:",
      o: ["8,315", "13,563", "22,000"],
      c: 0,
      e: "VP de la anualidad = 18,000 × 3.2397 = 58,315 (N = 4, I = 9, PMT = 18,000). NPV = 58,315 − 50,000 = 8,315. Los 13,563 resultan de usar una anualidad anticipada (flujos al inicio del año) y los 22,000 de sumar los flujos sin descontarlos (72,000 − 50,000).",
      d: 1,
      tag: "NPV"
    },
    {
      id: "corpfin-02",
      q: "A project costs 100,000 and produces cash flows of 40,000, 35,000, 30,000, and 25,000 in years 1 to 4, received evenly through each year. The payback period is closest to:",
      o: ["2.00 years", "2.83 years", "3.00 years"],
      c: 1,
      e: "Al cierre del año 2 se han recuperado 40,000 + 35,000 = 75,000, y faltan 25,000. Como el flujo del año 3 es 30,000, la fracción es 25,000 / 30,000 = 0.83. Payback = 2.83 años. Los 2.00 omiten la fracción y los 3.00 redondean el año completo en que se termina de recuperar.",
      d: 2,
      tag: "Payback"
    },
    {
      id: "corpfin-03",
      q: "Two mutually exclusive projects of different sizes give conflicting rankings: Project X has the higher IRR and Project Y has the higher NPV. To maximize shareholder wealth, the analyst should rank the projects using:",
      o: ["Highest IRR", "Highest NPV", "Shortest payback period"],
      c: 1,
      e: "Con proyectos mutuamente excluyentes, el NPV mide la riqueza adicional en unidades monetarias y supone reinversión al costo de capital, por lo que prevalece cuando contradice a la IRR. La IRR ignora la escala del proyecto y el payback ignora el valor del dinero en el tiempo y los flujos posteriores.",
      d: 2,
      tag: "NPV vs IRR conflict"
    },
    {
      id: "corpfin-04",
      q: "A firm must choose one of two non-repeatable alternatives and uses a 10% discount rate. Project A has an NPV of 12,000 over a 3-year life. Project B has an NPV of 15,000 over a 5-year life. The equivalent annual annuity of Project A is closest to:",
      o: ["3,957", "4,000", "4,825"],
      c: 2,
      e: "EAA = NPV / factor de anualidad. Para A, el factor con N = 3 e I = 10 % es 2.4869, por lo que EAA = 12,000 / 2.4869 = 4,825. Los 3,957 son el EAA del proyecto B (15,000 / 3.7908), y los 4,000 dividen el NPV entre los años (12,000 / 3), lo que ignora el valor del dinero en el tiempo. Como 4,825 supera a 3,957, A es preferible.",
      d: 3,
      tag: "Unequal lives EAA"
    },
    {
      id: "corpfin-05",
      q: "The risk-free rate is 3%, the expected market return is 8.5%, and a stock's beta is 1.3. Using the CAPM, the stock's cost of equity is closest to:",
      o: ["7.15%", "8.50%", "10.15%"],
      c: 2,
      e: "Ke = Rf + β × (Rm − Rf) = 3 % + 1.3 × (8.5 % − 3 %) = 3 % + 7.15 % = 10.15 %. Los 7.15 % son solo el término de prima de riesgo (β × prima) sin sumar la tasa libre de riesgo, y los 8.5 % son el rendimiento esperado del mercado, que aplicaría solo con un beta igual a 1.",
      d: 1,
      tag: "CAPM"
    },
    {
      id: "corpfin-06",
      q: "A firm targets 60% equity and 40% debt at market values. Its cost of equity is 12%, its pretax cost of debt is 6%, and its tax rate is 25%. The firm's WACC is closest to:",
      o: ["7.5%", "9.0%", "9.6%"],
      c: 1,
      e: "WACC = 0.60 × 12 % + 0.40 × 6 % × (1 − 0.25) = 7.2 % + 1.8 % = 9.0 %. Los 9.6 % omiten el escudo fiscal de la deuda (7.2 % + 2.4 %) y los 7.5 % invierten los pesos (0.40 × 12 % + 0.60 × 4.5 %).",
      d: 2,
      tag: "WACC"
    },
    {
      id: "corpfin-07",
      q: "A pure-play comparable has an equity beta of 1.20, a debt-to-equity ratio of 0.50, and a tax rate of 30%. A project of similar business risk will be financed with a debt-to-equity ratio of 0.25 at the same tax rate. The project's equity beta is closest to:",
      o: ["0.89", "1.04", "1.20"],
      c: 1,
      e: "Beta de activos = 1.20 / [1 + 0.70 × 0.50] = 1.20 / 1.35 = 0.889. Reapalancando con D/E = 0.25: 0.889 × [1 + 0.70 × 0.25] = 0.889 × 1.175 = 1.04. Los 0.89 son el beta de activos sin reapalancar, y los 1.20 ignoran por completo la diferencia de estructura de capital.",
      d: 3,
      tag: "Project beta"
    },
    {
      id: "corpfin-08",
      q: "An all-equity firm has a value of 2,000. It issues permanent debt of 500 and uses the proceeds to repurchase shares. The tax rate is 30% and there are no costs of financial distress. According to Modigliani-Miller with corporate taxes, the value of the levered firm is:",
      o: ["1,850", "2,000", "2,150"],
      c: 2,
      e: "V apalancada = V no apalancada + t × D = 2,000 + 0.30 × 500 = 2,150, porque el escudo fiscal de intereses agrega valor. Los 2,000 corresponden al mundo sin impuestos y los 1,850 restan el escudo fiscal en lugar de sumarlo.",
      d: 2,
      tag: "MM with taxes"
    },
    {
      id: "corpfin-09",
      q: "Selling price is 40 per unit, variable cost is 24 per unit, and fixed operating costs are 60,000. Current sales are 10,000 units and interest expense is 20,000. If unit sales increase by 5%, earnings per share would increase by approximately:",
      o: ["6.25%", "8.00%", "10.00%"],
      c: 2,
      e: "EBIT = 10,000 × 16 − 60,000 = 100,000. DOL = 160,000 / 100,000 = 1.6; DFL = 100,000 / (100,000 − 20,000) = 1.25; DTL = 2.0. El EPS sube 2.0 × 5 % = 10 %. Los 8 % usan solo el DOL (1.6 × 5 %) y los 6.25 % solo el DFL (1.25 × 5 %).",
      d: 2,
      tag: "Operating and financial leverage"
    },
    {
      id: "corpfin-10",
      q: "A supplier offers credit terms of 2/10 net 40. Using a 365-day year, the effective annual cost of forgoing the discount and paying on day 40 is closest to:",
      o: ["2.0%", "24.8%", "27.9%"],
      c: 2,
      e: "El costo por periodo = 2 / 98 = 2.04 % y se financian 30 días (40 − 10), así que hay 365 / 30 = 12.17 periodos al año. Costo efectivo anual = (1.0204)^12.17 − 1 = 27.9 %. Los 24.8 % anualizan sin capitalizar (2.04 % × 12.17) y los 2.0 % son solo el costo del periodo sin anualizar.",
      d: 3,
      tag: "Trade credit cost"
    },
    {
      id: "corpfin-11",
      q: "Sable Corp has net income of 500 and 250 shares outstanding, so EPS is 2.00. It repurchases 50 shares at 30 per share using cash that was earning 4% after tax. Assuming no other changes, pro forma EPS is closest to:",
      o: ["2.00", "2.20", "2.50"],
      c: 1,
      e: "Se gastan 50 × 30 = 1,500 de efectivo que rendía 4 %, es decir 60 de utilidad después de impuestos. La utilidad neta cae a 440 y las acciones a 200, así que EPS = 440 / 200 = 2.20. Los 2.50 (500 / 200) ignoran el rendimiento perdido del efectivo, y los 2.00 suponen que la recompra no cambia el EPS.",
      d: 2,
      tag: "Share repurchase"
    },
    {
      id: "corpfin-12",
      q: "The primary responsibility of a board's audit committee is to:",
      o: ["Oversee financial reporting", "Set executive pay and incentive plans", "Nominate director candidates for shareholders"],
      c: 0,
      e: "El comité de auditoría supervisa los reportes financieros, el control interno y la relación con los auditores externos. Fijar la compensación de los ejecutivos corresponde al comité de compensación, y proponer candidatos a consejero al comité de nominaciones.",
      d: 2,
      tag: "Corporate governance"
    },
    {
      id: "corpfin-13",
      q: "Which of the following is most clearly a social factor in ESG analysis?",
      o: ["Workplace safety", "Board independence", "Greenhouse gas emissions"],
      c: 0,
      e: "La seguridad laboral (workplace safety) pertenece al pilar social, que abarca relaciones con empleados, comunidades y cadena de suministro. La independencia del consejo es un factor de gobierno (governance) y las emisiones de gases de efecto invernadero son un factor ambiental (environmental).",
      d: 1,
      tag: "ESG factors"
    },
    {
      id: "corpfin-14",
      q: "An automaker's acquisition of its main component supplier is best classified as a:",
      o: ["Vertical merger", "Horizontal merger", "Conglomerate merger"],
      c: 0,
      e: "Una fusión vertical combina empresas en distintas etapas de la misma cadena de valor, como un fabricante y su proveedor. La horizontal une competidores del mismo negocio y la conglomerada combina negocios sin relación entre sí.",
      d: 1,
      tag: "M&A types"
    },
    {
      id: "corpfin-15",
      q: "A bidder offers a 30% premium for a target with 10 million shares trading at 25 each. The bidder estimates the present value of synergies at 100 million. The net value created for the bidder's shareholders is closest to:",
      o: ["25 million", "75 million", "100 million"],
      c: 0,
      e: "Valor de mercado del objetivo = 10 millones × 25 = 250 millones; prima = 30 % × 250 = 75 millones. Valor creado para el adquirente = sinergias − prima = 100 − 75 = 25 millones. Los 75 millones son solo la prima transferida a los accionistas del objetivo, y los 100 millones ignoran la prima pagada.",
      d: 2,
      tag: "M&A synergies"
    }
  ]
};
