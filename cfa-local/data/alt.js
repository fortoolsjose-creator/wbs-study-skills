window.CFA_CONTENT = window.CFA_CONTENT || {};
window.CFA_CONTENT["alt"] = {
  resumen: [
    {
      titulo: "Características de las inversiones alternativas",
      puntos: [
        "Incluyen hedge funds, capital privado (private equity), bienes raíces (real estate), materias primas (commodities), infraestructura y activos digitales; se distinguen de las acciones y bonos tradicionales.",
        "Suelen ser menos líquidas, con mayor dispersión de retornos entre gestores y más difíciles de valorar; muchas se valoran con tasaciones o modelos, lo que suaviza (smooths) los retornos reportados.",
        "Estructuras habituales: fondos de inversión privados (limited partnership) con un socio general (GP) y socios limitados (LPs), con comisiones de gestión y de desempeño.",
        "La diversificación frente a acciones y bonos es el argumento clásico, aunque la correlación sube en crisis y la iliquidez eleva el riesgo real."
      ]
    },
    {
      titulo: "Hedge funds: estrategias y comisiones",
      puntos: [
        "Categorías principales: de acciones (long/short, market neutral), eventos (merger arbitrage, distressed), relative value (convertible arbitrage, fixed income arbitrage), oportunistas (global macro, managed futures).",
        "Merger arbitrage: en una fusión con pago en acciones, se compra la empresa objetivo y se vende en corto la adquirente para capturar el diferencial (spread) hasta el cierre.",
        "Comisiones típicas '2 y 20': 2% de gestión (management fee) sobre activos y 20% de desempeño (incentive fee) sobre las ganancias.",
        "High-water mark: el fondo solo cobra comisión de desempeño por ganancias que superen el valor máximo previo del NAV, para no cobrar dos veces por recuperar pérdidas.",
        "Hurdle rate: retorno mínimo antes de cobrar comisión de desempeño. Hard hurdle: solo se cobra sobre el exceso; soft hurdle: una vez superada la barrera se cobra sobre todo el retorno."
      ]
    },
    {
      titulo: "Capital privado (private equity)",
      puntos: [
        "Buyouts (LBO): se adquiere una empresa madura usando mucha deuda; el servicio de la deuda se paga con los flujos de la empresa y venta de activos, y se crea valor por mejoras operativas y reducción de deuda.",
        "Capital de riesgo (venture capital): etapas formativas (angel, seed, early stage) y de expansión; alto riesgo de fracaso con pocos ganadores que generan la mayor parte del retorno.",
        "Capital de crecimiento y mezzanine financian empresas más desarrolladas, con menor riesgo que las etapas iniciales.",
        "Salidas (exits): IPO, venta a un comprador estratégico, venta a otro fondo (secondary buyout) o recapitalización.",
        "El ciclo del fondo implica llamadas de capital (capital calls), inversión, distribuciones y una vida de unos 10 años con efecto de curva J (J-curve) en los retornos."
      ]
    },
    {
      titulo: "Métricas de retorno de private equity",
      puntos: [
        "IRR (tasa interna de retorno): refleja el momento de los flujos; puede inflarse al retrasar llamadas de capital con líneas de crédito de suscripción (subscription lines) o al distribuir rápido.",
        "DPI (Distributed to Paid-In) = distribuciones acumuladas / capital pagado; mide lo ya realizado en efectivo.",
        "RVPI (Residual Value to Paid-In) = valor residual (NAV) / capital pagado; parte aún no realizada.",
        "TVPI (Total Value to Paid-In) = DPI + RVPI; múltiplo total sobre el capital aportado, sin considerar el tiempo.",
        "Conviene leer IRR y múltiplos juntos: un IRR alto con TVPI bajo puede indicar apalancamiento temporal más que creación real de valor."
      ]
    },
    {
      titulo: "Bienes raíces",
      puntos: [
        "Inversión directa (direct): propiedad física, control, ilíquida y con tasaciones. Indirecta (indirect): REITs y fondos, más líquida por cotizar en bolsa o con acciones negociables.",
        "NOI (Net Operating Income) = ingresos brutos potenciales - vacancia - gastos operativos; excluye depreciación, intereses e impuestos sobre la renta.",
        "Capitalización directa (direct capitalization): valor = NOI / cap rate; el cap rate equivale aproximadamente a r - g.",
        "Enfoques de valoración: comparables (sales comparison), ingresos (income) y costo (cost); los REITs se valoran con múltiplos como P/FFO y P/AFFO.",
        "Los REITs deben distribuir gran parte de su utilidad gravable, por lo que tienen alto dividend yield y dependen de capital externo para crecer."
      ]
    },
    {
      titulo: "Materias primas e infraestructura",
      puntos: [
        "Se invierte vía futuros, ETFs o empresas productoras; el retorno de futuros incluye el rendimiento del colateral, el cambio en el precio spot y el rendimiento por rolado (roll yield).",
        "Contango: futuros por encima del spot; al rolar, la convergencia genera un roll yield negativo. Backwardation: futuros por debajo del spot, por alto convenience yield; el roll yield es positivo.",
        "Convenience yield: beneficio de mantener el bien físico (por ejemplo, evitar interrupciones de producción) cuando el inventario es escaso.",
        "Infraestructura: activos de larga vida con flujos estables (peajes, servicios públicos, energía). Brownfield: activos ya construidos y operando; greenfield: proyectos nuevos con mayor riesgo de construcción y mayor potencial de retorno.",
        "Los flujos de infraestructura pueden estar ligados a la inflación y a contratos regulados, pero enfrentan riesgo regulatorio y político."
      ]
    },
    {
      titulo: "Activos digitales y diligencia debida",
      puntos: [
        "Activos digitales (digital assets): criptomonedas, tokens y stablecoins registrados en una cadena de bloques (blockchain) o libro mayor distribuido (DLT).",
        "Consenso: proof of work (potencia de cómputo) y proof of stake (monedas bloqueadas como garantía); definen cómo se validan los bloques.",
        "Riesgos: alta volatilidad, custodia y ciberseguridad, incertidumbre regulatoria y falta de flujos de caja fundamentales para valorar.",
        "Diligencia debida (due diligence) en alternativas: estrategia, gestor y equipo, valoración y gobierno, controles operativos y fuentes independientes de precios.",
        "Sesgos de las bases de datos de hedge funds: survivorship bias, backfill bias y retornos suavizados por precios obsoletos (stale pricing)."
      ]
    }
  ],
  formulas: [
    {
      nombre: "Retorno neto de un hedge fund (2 y 20)",
      formula: "Retorno neto = Retorno bruto - comisión de gestión - comisión de desempeño; comisión de desempeño = 20% x (ganancia - comisión de gestión - hurdle, si aplica)",
      nota: "Verifica sobre qué base se cobra cada comisión. Error común: calcular la comisión de desempeño sobre la ganancia bruta, sin restar la comisión de gestión."
    },
    {
      nombre: "Comisión con high-water mark",
      formula: "Comisión = % incentivo x max(0, NAV final - max(NAV inicial, HWM))",
      nota: "Solo se cobra sobre el avance por encima del máximo previo. Error común: cobrar sobre toda la subida desde el NAV inicial."
    },
    {
      nombre: "Hard vs. soft hurdle",
      formula: "Hard: incentivo x (R - H); soft: incentivo x R (si R > H)",
      nota: "R = retorno antes de comisión de desempeño, H = hurdle. El soft hurdle es más caro para el inversionista."
    },
    {
      nombre: "NOI",
      formula: "NOI = renta bruta potencial - vacancia y cobranza - gastos operativos",
      nota: "No incluye depreciación, intereses ni impuestos sobre la renta. Error común: partir de la renta bruta sin descontar vacancia."
    },
    {
      nombre: "Valor por capitalización directa",
      formula: "Valor = NOI / cap rate; cap rate = r - g",
      nota: "Con NOI del primer año (NOI1) y crecimiento perpetuo. Error común: dividir entre r en vez de r - g."
    },
    {
      nombre: "DPI, RVPI y TVPI",
      formula: "DPI = distribuciones / capital pagado; RVPI = NAV / capital pagado; TVPI = DPI + RVPI",
      nota: "Los múltiplos ignoran el tiempo; complemento del IRR. Error común: usar solo el NAV o solo las distribuciones como TVPI."
    },
    {
      nombre: "Retorno de futuros de commodities",
      formula: "Retorno total = retorno del colateral + retorno spot + roll yield",
      nota: "En contango, el roll yield suele ser negativo; en backwardation, positivo."
    },
    {
      nombre: "Relación futuros-spot",
      formula: "Contango: F > S; backwardation: F < S; ganancia por convergencia = S(vencimiento) - F(entrada) para una posición larga",
      nota: "Si el spot no cambia, un largo en contango pierde F - S por convergencia."
    }
  ],
  tarjetas: [
    {
      f: "What does a '2 and 20' fee structure mean?",
      b: "Comisión de gestión (management fee) de 2% sobre los activos y comisión de desempeño (incentive fee) de 20% sobre las ganancias."
    },
    {
      f: "High-water mark",
      b: "Valor máximo previo del NAV; el gestor solo cobra comisión de desempeño por ganancias que lo superen, para no cobrar dos veces por recuperar pérdidas."
    },
    {
      f: "Hard hurdle vs. soft hurdle",
      b: "Hard: la comisión se cobra solo sobre el exceso del retorno sobre el hurdle; soft: superado el hurdle se cobra sobre todo el retorno."
    },
    {
      f: "Merger arbitrage (stock deal)",
      b: "Comprar la empresa objetivo y vender en corto la adquirente para capturar el diferencial (spread) hasta que cierre la fusión."
    },
    {
      f: "Leveraged buyout (LBO)",
      b: "Compra de una empresa con mucha deuda, que se repaga con los flujos de la empresa y la venta de activos."
    },
    {
      f: "Venture capital stages",
      b: "Angel, seed y early stage son las etapas formativas; después vienen expansión y mezzanine con menor riesgo."
    },
    {
      f: "DPI, RVPI, TVPI",
      b: "DPI = distribuciones / capital pagado; RVPI = NAV / capital pagado; TVPI = DPI + RVPI."
    },
    {
      f: "Subscription credit line effect on IRR",
      b: "Retrasar las llamadas de capital acorta el tiempo de capital aportado y eleva el IRR sin mejorar el múltiplo (TVPI)."
    },
    {
      f: "NOI",
      b: "Ingreso operativo neto (net operating income): renta bruta - vacancia - gastos operativos; sin depreciación, intereses ni impuestos sobre la renta."
    },
    {
      f: "Direct capitalization",
      b: "Valor = NOI / cap rate, con cap rate = r - g si el NOI crece a perpetuidad."
    },
    {
      f: "Contango vs. backwardation",
      b: "Contango: futuros por encima del spot (roll yield negativo); backwardation: futuros por debajo del spot (roll yield positivo)."
    },
    {
      f: "Proof of stake",
      b: "Mecanismo de consenso donde los validadores se eligen según las monedas que bloquean como garantía, en lugar de poder de cómputo (proof of work)."
    }
  ],
  preguntas: [
    {
      id: "alt-01",
      q: "Vantor Partners, a hedge fund, starts the year with $100 million. It charges a 2% management fee on beginning assets and a 20% incentive fee on profits after the management fee, with no hurdle. Assets before any fees end the year at $118 million. The net return to investors is closest to",
      o: ["12.4%", "12.8%", "14.4%"],
      c: 1,
      e: "La ganancia bruta es $18 millones. La comisión de gestión es 2% x 100 = $2 millones, por lo que la base del incentivo es 16 y la comisión de desempeño es 0,20 x 16 = $3,2 millones. El retorno neto es (18 - 2 - 3,2) / 100 = 12,8%. El 12,4% calcula el incentivo sobre la ganancia bruta (3,6) y el 14,4% omite la comisión de gestión.",
      d: 2,
      tag: "Hedge fund fees"
    },
    {
      id: "alt-02",
      q: "A hedge fund charges a 20% incentive fee on gains above its high-water mark and has no hurdle. Ignore the management fee. A unit's high-water mark is $120, the unit began the year at $105, and it ends the year at $130 before the incentive fee. The incentive fee per unit is",
      o: ["$2.00", "$5.00", "$26.00"],
      c: 0,
      e: "Solo se cobra por la parte que supera el high-water mark: 130 - 120 = $10, y 20% x 10 = $2,00. $5,00 cobra sobre la subida desde el NAV inicial (130 - 105 = 25), ignorando el HWM. $26,00 aplica el 20% sobre todo el NAV de $130.",
      d: 2,
      tag: "High-water mark"
    },
    {
      id: "alt-03",
      q: "A hedge fund earns 12% in a year after management fees. It charges a 20% incentive fee with an 8% hurdle. Relative to a hard hurdle, a soft hurdle makes the incentive fee higher, as a percentage of assets, by",
      o: ["0.8%", "1.6%", "2.4%"],
      c: 1,
      e: "Con un soft hurdle, superado el 8% la comisión se cobra sobre todo el retorno: 20% x 12% = 2,4%. Con un hard hurdle solo se cobra sobre el exceso: 20% x (12% - 8%) = 0,8%. La diferencia es 2,4% - 0,8% = 1,6%. El 0,8% es la comisión con hard hurdle y el 2,4% es la comisión con soft hurdle, no su diferencia.",
      d: 3,
      tag: "Hurdle rate"
    },
    {
      id: "alt-04",
      q: "After a stock-for-stock merger is announced, a hedge fund buys the target's shares and sells short the acquirer's shares, hoping the price spread narrows. This strategy is best described as",
      o: ["Global macro", "Merger arbitrage", "Equity market neutral"],
      c: 1,
      e: "Comprar la empresa objetivo y vender en corto la adquirente tras anunciar una fusión con pago en acciones, para capturar el diferencial hasta el cierre, es merger arbitrage. Global macro apuesta por tendencias macroeconómicas y equity market neutral busca neutralizar la exposición de mercado con pares long/short sin depender de un evento corporativo.",
      d: 1,
      tag: "Hedge fund strategies"
    },
    {
      id: "alt-05",
      q: "In a leveraged buyout, the acquisition debt is mainly expected to be repaid from",
      o: [
        "Capital calls on limited partners",
        "Personal guarantees from management",
        "The target's cash flows and asset sales"
      ],
      c: 2,
      e: "En un LBO la deuda se asegura con los activos y flujos de la empresa adquirida, y se repaga con su flujo de caja operativo y la venta de activos. Las llamadas de capital financian la parte de capital propio, no el servicio de la deuda. Las garantías personales de la gerencia no son la fuente normal de repago.",
      d: 1,
      tag: "Leveraged buyout"
    },
    {
      id: "alt-06",
      q: "Lumen Bio has a working prototype and a management team, and it now raises its first institutional round to begin commercial production and marketing. Which venture capital stage does this describe?",
      o: ["Angel stage", "Early stage", "Mezzanine stage"],
      c: 1,
      e: "Una empresa con producto desarrollado que busca su primera ronda institucional para iniciar la producción y comercialización está en etapa temprana (early stage). La etapa angel financia la idea o un concepto previo al prototipo funcional. El mezzanine es financiamiento de una etapa tardía, antes de una salida como IPO.",
      d: 1,
      tag: "Venture capital stages"
    },
    {
      id: "alt-07",
      q: "A buyout fund has called $160 million from its limited partners, has distributed $56 million, and reports a remaining net asset value of $184 million. The fund's TVPI is",
      o: ["0.35", "1.15", "1.50"],
      c: 2,
      e: "TVPI = (distribuciones + NAV residual) / capital pagado = (56 + 184) / 160 = 1,50. El 0,35 es el DPI (56 / 160) y el 1,15 es el RVPI (184 / 160); TVPI es la suma DPI + RVPI.",
      d: 2,
      tag: "PE return metrics"
    },
    {
      id: "alt-08",
      q: "Why can a private equity fund's use of a subscription credit line raise its reported IRR without improving its multiple of invested capital?",
      o: [
        "It lowers the fund's management fee",
        "It raises the cash flows of portfolio companies",
        "It shortens the period over which LP capital is outstanding"
      ],
      c: 2,
      e: "Al financiar inversiones con la línea de crédito y retrasar las llamadas de capital, se acorta el tiempo en que el capital de los LPs está invertido, lo que eleva el IRR. Los flujos de las empresas del portafolio no cambian y el múltiplo (TVPI) no mejora, e incluso baja un poco por los intereses. La línea de crédito no reduce la comisión de gestión.",
      d: 3,
      tag: "IRR and subscription lines"
    },
    {
      id: "alt-09",
      q: "An office building has potential gross rent of $1,200,000, vacancy and collection losses of 5%, and operating expenses of $380,000. Using direct capitalization with a market cap rate of 8%, the estimated value is closest to",
      o: ["$9.50 million", "$10.25 million", "$15.00 million"],
      c: 0,
      e: "Renta efectiva = 1.200.000 x 0,95 = 1.140.000. NOI = 1.140.000 - 380.000 = $760.000. Valor = 760.000 / 0,08 = $9,50 millones. $10,25 millones ignora la vacancia (820.000 / 0,08) y $15,00 millones capitaliza la renta bruta (1,2 millones / 0,08).",
      d: 2,
      tag: "Direct capitalization"
    },
    {
      id: "alt-10",
      q: "Which is an advantage of REIT shares compared with direct ownership of a property?",
      o: [
        "Control over leasing decisions",
        "Easier trading on a stock exchange",
        "Lower exposure to equity market moves"
      ],
      c: 1,
      e: "Las acciones de un REIT cotizan en bolsa y son más líquidas que una propiedad física. El control de las decisiones de arrendamiento es una ventaja de la propiedad directa. Los REITs cotizados suelen estar más expuestos al mercado de acciones que las propiedades directas, cuyos retornos tasados se ven suavizados.",
      d: 1,
      tag: "Real estate"
    },
    {
      id: "alt-11",
      q: "The spot price of a commodity is $100 and the one-year futures price is $104. An investor holds a long futures position to expiry, when the spot price is still $100. The per-unit gain or loss on the futures position is",
      o: ["-$4.00", "$0.00", "+$4.00"],
      c: 0,
      e: "Al vencimiento el precio de futuros converge al spot ($100). Quien compró a $104 pierde 104 - 100 = $4,00 por unidad. Es el roll yield negativo del contango. No hay ganancia por la prima de los futuros: esa prima desaparece con la convergencia.",
      d: 2,
      tag: "Commodity futures"
    },
    {
      id: "alt-12",
      q: "Which condition is most likely to produce a backwardated commodity futures curve?",
      o: [
        "Tight current supply",
        "Large inventories on hand",
        "High storage and insurance costs"
      ],
      c: 0,
      e: "La backwardation aparece cuando el convenience yield (beneficio de tener el bien físico ahora) supera los costos de almacenamiento y financiamiento, algo típico cuando la oferta actual es escasa. Inventarios grandes y costos altos de almacenamiento y seguro favorecen el contango, no la backwardation.",
      d: 2,
      tag: "Backwardation"
    },
    {
      id: "alt-13",
      q: "Compared with brownfield assets, greenfield infrastructure projects typically involve",
      o: ["More construction risk", "Lower return potential", "Immediate toll revenues"],
      c: 0,
      e: "Los proyectos greenfield se construyen desde cero, por lo que enfrentan mayor riesgo de construcción y retrasos, a cambio de mayor potencial de retorno. Los ingresos inmediatos por peajes son propios de activos brownfield ya en operación. Un menor potencial de retorno tampoco corresponde a greenfield.",
      d: 1,
      tag: "Infrastructure"
    },
    {
      id: "alt-14",
      q: "In a proof-of-stake blockchain, validators are chosen to add new blocks mainly based on",
      o: [
        "Computing power spent on puzzles",
        "Their regulatory licensing status",
        "The amount of coins they stake as collateral"
      ],
      c: 2,
      e: "En proof of stake los validadores se seleccionan según las monedas que bloquean (stake) como garantía, y pueden perderlas si validan mal. La potencia de cómputo gastada en resolver acertijos es el mecanismo de proof of work. Una licencia regulatoria no determina la selección.",
      d: 2,
      tag: "Digital assets"
    },
    {
      id: "alt-15",
      q: "A property is expected to produce NOI of $600,000 next year. NOI is expected to grow 2% a year indefinitely and investors require a 9.5% return. The property's value is closest to",
      o: ["$5.22 million", "$6.32 million", "$8.00 million"],
      c: 2,
      e: "El cap rate es r - g = 9,5% - 2,0% = 7,5%. Valor = 600.000 / 0,075 = $8,00 millones. $6,32 millones divide entre r sin restar el crecimiento (600.000 / 0,095) y $5,22 millones divide entre r + g (600.000 / 0,115).",
      d: 3,
      tag: "Cap rate and growth"
    }
  ]
};
