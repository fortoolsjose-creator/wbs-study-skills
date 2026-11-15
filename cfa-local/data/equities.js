window.CFA_CONTENT = window.CFA_CONTENT || {};
window.CFA_CONTENT["equities"] = {
  resumen: [
    {
      titulo: "Organización de mercados y tipos de órdenes",
      puntos: [
        "Mercado primario (primary market): la empresa emite acciones nuevas (IPO, oferta secundaria); mercado secundario (secondary market): los inversionistas se intercambian títulos ya emitidos.",
        "Mercado impulsado por cotizaciones (quote-driven): los dealers publican precios bid y ask y operan con su propio inventario. Mercado impulsado por órdenes (order-driven): un libro de órdenes cruza compras y ventas por prioridad de precio y tiempo.",
        "Orden de mercado (market order): ejecución inmediata al mejor precio disponible, sin certeza de precio. Orden limitada (limit order): fija un precio máximo de compra o mínimo de venta, sin certeza de ejecución.",
        "Orden stop (stop-loss): se activa cuando el precio toca el nivel stop y entonces se convierte en orden de mercado (o limitada); sirve para limitar pérdidas.",
        "El bid-ask spread compensa al dealer por el riesgo de inventario y por operar contra inversionistas mejor informados; un mercado más líquido tiene un spread más estrecho."
      ]
    },
    {
      titulo: "Margen y ventas en corto",
      puntos: [
        "Compra con margen (buying on margin): el inversionista aporta el margen inicial (initial margin) y pide prestado el resto; el apalancamiento amplifica ganancias y pérdidas.",
        "Retorno sobre el capital propio = (ganancia del activo - intereses) / capital aportado. Los intereses del préstamo se restan siempre, aunque no haya dividendos.",
        "Llamada de margen en una posición larga: ocurre si el precio cae hasta P0 x (1 - margen inicial) / (1 - margen de mantenimiento).",
        "Venta en corto (short sale): se pide prestada la acción, se vende y se recompra después; el vendedor en corto debe pagar al prestamista los dividendos de la acción y puede enfrentar una pérdida teóricamente ilimitada.",
        "Llamada de margen en corto: P0 x (1 + margen inicial) / (1 + margen de mantenimiento). Una subida de precio es lo que activa la llamada."
      ]
    },
    {
      titulo: "Índices de renta variable y su construcción",
      puntos: [
        "Ponderado por precio (price-weighted): suma de precios / divisor; las acciones de precio alto pesan más y un split exige ajustar el divisor para que el valor del índice no cambie.",
        "Ponderado por capitalización (market-cap-weighted): cada peso es la capitalización bursátil de la acción dividida entre la del conjunto; refleja el mercado y se reequilibra de forma automática con poca rotación (turnover).",
        "Ponderado igual (equal-weighted): mayor exposición relativa a empresas pequeñas y más rotación por el reequilibrio periódico; se inclina hacia el efecto tamaño y valor.",
        "Ponderado por flotante (float-adjusted): excluye acciones que no cotizan libremente (accionistas de control, gobierno), y se considera la práctica estándar de los índices de capitalización.",
        "Un índice de retorno total (total return) reinvierte los dividendos; un índice de precio (price return) solo captura el cambio en precios."
      ]
    },
    {
      titulo: "Eficiencia de mercado y anomalías",
      puntos: [
        "Forma débil (weak form): los precios ya reflejan los datos históricos de precios y volumen, así que el análisis técnico (technical analysis) no genera exceso de retorno ajustado por riesgo.",
        "Forma semifuerte (semi-strong form): los precios reflejan toda la información pública; ni el análisis técnico ni el fundamental permiten ganar sistemáticamente al mercado.",
        "Forma fuerte (strong form): los precios reflejan también la información privilegiada (insider information); es la forma que la evidencia rechaza con más claridad.",
        "Anomalías (anomalies): efecto enero, efecto tamaño, efecto valor, momentum, efecto fin de semana. Pueden desaparecer tras costos de transacción, ser compensaciones por riesgo o resultar de data mining.",
        "Finanzas conductuales (behavioral finance): sesgos como exceso de confianza, aversión a la pérdida y comportamiento de rebaño ayudarían a explicar desviaciones persistentes."
      ]
    },
    {
      titulo: "Tipos de acciones y mercados globales",
      puntos: [
        "Acciones ordinarias (common shares): derecho residual sobre activos y utilidades, derecho a voto, dividendos variables; pueden tener clases con distintos derechos de voto.",
        "Acciones preferentes (preferred shares): dividendo fijo con prioridad sobre las ordinarias, normalmente sin voto. Acumulativas (cumulative): los dividendos omitidos se acumulan y deben pagarse antes de cualquier dividendo común. Convertibles, rescatables (callable) y participantes son otras variantes.",
        "Capital privado (private equity) frente a público: menos liquidez, menos regulación y mayor prima de iliquidez esperada.",
        "ADR (American Depositary Receipt): certificado negociable en EE. UU. que representa acciones extranjeras y cotiza en dólares, pero el inversionista conserva el riesgo cambiario. Nivel I: OTC; Nivel II: bolsa con registro SEC; Nivel III: permite oferta pública para captar capital nuevo.",
        "Los mercados emergentes (emerging markets) suelen ofrecer mayor crecimiento esperado pero más riesgo político, de liquidez y de gobierno corporativo."
      ]
    },
    {
      titulo: "Valoración con descuento de dividendos",
      puntos: [
        "El valor intrínseco (intrinsic value) de una acción es el valor presente de los dividendos futuros descontados al costo del capital propio (required return on equity), que se estima con CAPM: rf + beta x prima de riesgo.",
        "Modelo de Gordon (constant growth): V0 = D1 / (r - g), válido solo si g < r y el crecimiento es estable. Error común: usar D0 en lugar de D1.",
        "Modelo de dos etapas (two-stage DDM): se proyectan dividendos explícitos durante el periodo de alto crecimiento y se agrega un valor terminal (terminal value) con Gordon al final de esa etapa; todo se descuenta al presente.",
        "Crecimiento sostenible (sustainable growth): g = retención x ROE = (1 - payout) x ROE.",
        "Los modelos de dividendos son más útiles para empresas con política de dividendos estable y predecible; son poco útiles si la empresa no paga dividendos."
      ]
    },
    {
      titulo: "Múltiplos, flujo libre de caja y valor residual",
      puntos: [
        "P/E (precio/utilidad): sencillo y popular, pero distorsionado por utilidades negativas, volátiles o contables. El P/E justificado de avance (justified leading P/E) es payout / (r - g).",
        "P/B (precio/valor en libros): útil para bancos y empresas con activos mayormente financieros; poco útil para empresas de servicios o tecnología con activos intangibles o con patrimonio negativo.",
        "EV/EBITDA: valor empresa (enterprise value) = capitalización + deuda + acciones preferentes - efectivo; permite comparar empresas con distinta estructura de capital.",
        "FCFF (flujo libre para la empresa) se descuenta al WACC; FCFE (flujo libre para el accionista) se descuenta al costo del capital propio. FCFE = FCFF - intereses x (1 - t) + endeudamiento neto.",
        "Ingreso residual (residual income) = utilidad neta - (costo del capital propio x valor en libros inicial); valora la creación de riqueza por encima del costo de capital."
      ]
    },
    {
      titulo: "Análisis de industria y de compañía",
      puntos: [
        "Ciclo de vida de la industria (industry life cycle): embrionaria, crecimiento, shakeout (depuración), madura y declive; cada etapa implica crecimiento, márgenes y política de dividendos distintos.",
        "Cinco fuerzas de Porter (Porter's five forces): rivalidad entre competidores, poder de los compradores, poder de los proveedores, amenaza de nuevos entrantes y amenaza de sustitutos.",
        "Industrias cíclicas (cyclical) dependen del ciclo económico; las defensivas (defensive) tienen demanda más estable.",
        "Análisis de la compañía: estrategia competitiva (liderazgo en costos o diferenciación), calidad de la gestión, ventajas sostenibles y calidad de las utilidades.",
        "Valoración relativa (relative valuation) compara múltiplos con comparables; la valoración absoluta (absolute valuation) usa flujos descontados. Conviene contrastar ambas."
      ]
    }
  ],
  formulas: [
    {
      nombre: "Retorno de periodo de tenencia (holding period return)",
      formula: "HPR = (P1 - P0 + D) / P0",
      nota: "Se usa para un solo periodo con dividendos. Error común: olvidar incluir los dividendos o dividir entre P1 en vez de P0."
    },
    {
      nombre: "Retorno sobre capital propio con margen",
      formula: "ROE = [ (P1 - P0 + D) x N - intereses ] / (margen inicial x P0 x N)",
      nota: "Compra apalancada. Error común: ignorar los intereses o calcular la rentabilidad sobre el valor total de la posición."
    },
    {
      nombre: "Precio de llamada de margen (posición larga)",
      formula: "P* = P0 x (1 - IM) / (1 - MM)",
      nota: "IM = margen inicial, MM = margen de mantenimiento. Es un precio inferior al inicial."
    },
    {
      nombre: "Precio de llamada de margen (posición corta)",
      formula: "P* = P0 x (1 + IM) / (1 + MM)",
      nota: "Aquí el margen se mide sobre el valor de mercado de las acciones prestadas; la llamada ocurre cuando el precio sube."
    },
    {
      nombre: "Índice ponderado por precio",
      formula: "Índice = suma de precios / divisor; nuevo divisor = suma de precios nuevos / (suma de precios antiguos / divisor antiguo)",
      nota: "Tras un split se recalcula el divisor para mantener el valor del índice. Error común: invertir la razón."
    },
    {
      nombre: "Retorno del índice por capitalización",
      formula: "R = suma(capitalización final) / suma(capitalización inicial) - 1",
      nota: "Equivale a la media de los retornos ponderada por capitalización inicial. No confundir con la media simple (equal-weight)."
    },
    {
      nombre: "Costo del capital propio (CAPM)",
      formula: "r = rf + beta x (E(Rm) - rf)",
      nota: "Insumo de los modelos de dividendos y de FCFE. Error común: omitir la beta y sumar la prima de riesgo completa."
    },
    {
      nombre: "Modelo de Gordon (crecimiento constante)",
      formula: "V0 = D1 / (r - g) = D0 x (1 + g) / (r - g)",
      nota: "Requiere g < r. Error común: usar D0 como si fuera D1."
    },
    {
      nombre: "Dos etapas (two-stage DDM)",
      formula: "V0 = sum[ Dt / (1 + r)^t ] + Vn / (1 + r)^n, con Vn = D(n+1) / (r - g_estable)",
      nota: "Vn ya incluye todos los dividendos posteriores al año n. Error común: olvidar sumar Dn al valor terminal o descontar el valor terminal un periodo de menos."
    },
    {
      nombre: "Tasa de crecimiento sostenible",
      formula: "g = (1 - payout) x ROE",
      nota: "Supone ROE y payout constantes. Error común: multiplicar el payout, en lugar de la retención, por el ROE."
    },
    {
      nombre: "P/E justificado de avance (leading)",
      formula: "P0 / E1 = payout / (r - g); trailing: P0 / E0 = payout x (1 + g) / (r - g)",
      nota: "Se deriva del modelo de Gordon. El trailing es mayor por el factor (1 + g)."
    },
    {
      nombre: "Valor empresa y EV/EBITDA",
      formula: "EV = capitalización + deuda + preferentes + participaciones minoritarias - efectivo; múltiplo = EV / EBITDA",
      nota: "Se resta el efectivo, no se suma. Útil para comparar empresas con estructuras de capital distintas."
    },
    {
      nombre: "FCFF y FCFE",
      formula: "FCFF = NI + NCC + Int x (1 - t) - FCInv - WCInv; FCFE = FCFF - Int x (1 - t) + endeudamiento neto",
      nota: "NCC = cargos no monetarios, FCInv = inversión en activo fijo, WCInv = inversión en capital de trabajo. Error común: sumar los intereses antes de impuestos."
    },
    {
      nombre: "Ingreso residual (residual income)",
      formula: "RI = NI - r x BV(inicial)",
      nota: "El cargo por capital se calcula sobre el valor en libros del inicio del periodo."
    }
  ],
  tarjetas: [
    {
      f: "Limit order vs. market order",
      b: "La orden limitada (limit order) garantiza el precio pero no la ejecución; la orden de mercado (market order) garantiza la ejecución pero no el precio."
    },
    {
      f: "Quote-driven vs. order-driven market",
      b: "En un mercado impulsado por cotizaciones (quote-driven) los dealers publican bid y ask; en uno impulsado por órdenes (order-driven) un libro de órdenes cruza compradores y vendedores."
    },
    {
      f: "Margin call price for a long position",
      b: "P0 x (1 - margen inicial) / (1 - margen de mantenimiento). La llamada ocurre cuando el precio cae."
    },
    {
      f: "Who pays dividends on a shorted stock?",
      b: "El vendedor en corto (short seller) debe reembolsar al prestamista los dividendos, lo que reduce su ganancia."
    },
    {
      f: "Price-weighted index after a split",
      b: "Se ajusta el divisor (divisor) a la baja para que el valor del índice no cambie; las acciones de precio alto pesan más."
    },
    {
      f: "Equal-weighted vs. cap-weighted index",
      b: "El índice de ponderación igual (equal-weighted) tiene mayor exposición a empresas pequeñas y más rotación (turnover) por reequilibrio."
    },
    {
      f: "Weak-form efficient market",
      b: "Los precios ya reflejan los datos históricos de precio y volumen, así que el análisis técnico (technical analysis) no produce exceso de retorno ajustado por riesgo."
    },
    {
      f: "Data mining bias",
      b: "Probar muchas reglas en el mismo conjunto de datos produce hallazgos espurios; una anomalía (anomaly) debe confirmarse fuera de la muestra."
    },
    {
      f: "Cumulative preferred shares",
      b: "Los dividendos omitidos se acumulan (arrears) y deben pagarse antes de cualquier dividendo a las acciones ordinarias."
    },
    {
      f: "Gordon growth model",
      b: "V0 = D1 / (r - g); válido solo si g < r y el crecimiento es constante. Se usa D1, no D0."
    },
    {
      f: "Sustainable growth rate",
      b: "g = retención x ROE = (1 - payout) x ROE. Representa el crecimiento financiado con utilidades retenidas."
    },
    {
      f: "FCFE from FCFF",
      b: "FCFE = FCFF - intereses x (1 - t) + endeudamiento neto (net borrowing). Se descuenta al costo del capital propio."
    }
  ],
  preguntas: [
    {
      id: "equities-01",
      q: "Marlow wants to buy shares of Brightmoor Foods only at a price no higher than $18.50 and is willing to wait for execution. Which order type matches this instruction?",
      o: ["Market order", "Limit buy order at $18.50", "Stop-loss sell order at $18.50"],
      c: 1,
      e: "Una orden limitada de compra (limit buy) fija el precio máximo y puede esperar hasta que el mercado llegue a ese nivel. La orden de mercado se ejecuta de inmediato al precio vigente, sin control del precio. La orden stop-loss de venta se usa para vender, no para comprar.",
      d: 1,
      tag: "Order types"
    },
    {
      id: "equities-02",
      q: "Rhodes owns Kestrel Marine, currently trading at $52. She wants protection if the price falls to $47 and accepts execution at the prevailing price once that level is reached. Which order should she place?",
      o: ["A market sell order", "A stop sell order at $47", "A limit sell order at $47"],
      c: 1,
      e: "La orden stop de venta se activa cuando el precio toca $47 y entonces se ejecuta como orden de mercado, que es lo que ella quiere. La orden de mercado vendería hoy a unos $52. Una orden limitada de venta a $47 está por debajo del precio actual, por lo que se ejecutaría de inmediato a aproximadamente $52 y no daría protección.",
      d: 2,
      tag: "Stop orders"
    },
    {
      id: "equities-03",
      q: "Which statement best describes a quote-driven market?",
      o: [
        "Dealers trade at their own bid and ask quotes",
        "Orders are matched in a book by price and time priority",
        "All orders are collected and cleared at a single auction price"
      ],
      c: 0,
      e: "En un mercado impulsado por cotizaciones (quote-driven) los dealers publican precios bid y ask y operan contra su propio inventario. La opción de libro de órdenes con prioridad de precio y tiempo describe un mercado impulsado por órdenes (order-driven). La compensación a un único precio de subasta corresponde a una subasta de call (call auction).",
      d: 1,
      tag: "Market structure"
    },
    {
      id: "equities-04",
      q: "Okafor buys 1,000 shares of Dalton Robotics at $50 using an initial margin of 40%. He borrows the rest at 5% annual interest. After one year the price is $58 and no dividends were paid. What is his return on equity?",
      o: ["16.0%", "32.5%", "40.0%"],
      c: 1,
      e: "Capital propio = 0,40 x $50.000 = $20.000; préstamo = $30.000 y el interés es 5% x $30.000 = $1.500. La ganancia es 1.000 x $8 = $8.000, que menos intereses deja $6.500. Retorno = 6.500 / 20.000 = 32,5%. El 16,0% ignora el apalancamiento (8.000 / 50.000) y el 40,0% olvida restar los intereses.",
      d: 2,
      tag: "Margin purchase"
    },
    {
      id: "equities-05",
      q: "A trader sells short 400 shares of Veltrix Energy at $60. The initial margin requirement is 50% and the maintenance margin is 30%, both based on the market value of the borrowed shares. At what share price will a margin call occur?",
      o: ["$69.23", "$72.00", "$78.00"],
      c: 0,
      e: "Por acción, el activo es el producto de la venta ($60) más el margen inicial ($30), es decir $90. El capital es 90 - P y el requisito es (90 - P) / P = 0,30, de donde P = 90 / 1,30 = $69,23. La fórmula equivale a 60 x 1,5 / 1,3. $72 resulta de sumar 50% - 30% al precio y $78 de aplicar solo el margen de mantenimiento (60 x 1,3).",
      d: 3,
      tag: "Short sale margin"
    },
    {
      id: "equities-06",
      q: "A price-weighted index contains three stocks priced at $90, $50 and $25, with an initial divisor of 3. The $90 stock undergoes a 3-for-1 split. What is the new divisor?",
      o: ["1.57", "1.91", "3.00"],
      c: 1,
      e: "Antes del split el valor del índice es (90 + 50 + 25) / 3 = 55. Tras el split el precio de la primera acción es $30 y la suma es 30 + 50 + 25 = 105. Para conservar el valor 55, el nuevo divisor es 105 / 55 = 1,91. 3,00 ignora el ajuste y 1,57 invierte la razón (165 / 105).",
      d: 2,
      tag: "Price-weighted index"
    },
    {
      id: "equities-07",
      q: "A market-capitalization-weighted index holds three stocks: Alpha (10 million shares, price rises from $20 to $22), Beta (5 million shares, $30 to $27) and Gamma (20 million shares, $5 to $6). What is the index price return?",
      o: ["0.0%", "5.6%", "6.7%"],
      c: 1,
      e: "Capitalización inicial: 200 + 150 + 100 = $450 millones. Capitalización final: 220 + 135 + 120 = $475 millones. Retorno = 475 / 450 - 1 = 5,6%. El 0,0% sería el resultado del índice ponderado por precio (suma de precios 55 antes y después) y el 6,7% el del índice de ponderación igual (promedio de +10%, -10% y +20%).",
      d: 2,
      tag: "Market-cap-weighted index"
    },
    {
      id: "equities-08",
      q: "Compared with a market-capitalization-weighted index, an equal-weighted index of the same stocks is more likely to have",
      o: [
        "Lower rebalancing turnover",
        "A larger weight on mega-cap firms",
        "Greater exposure to small companies"
      ],
      c: 2,
      e: "Con igual ponderación, una empresa pequeña recibe el mismo peso que una gigante, por lo que hay mayor exposición a empresas pequeñas. Además requiere reequilibrar periódicamente, lo que eleva la rotación (turnover) en lugar de reducirla. Un mayor peso en mega-caps es característico del índice ponderado por capitalización.",
      d: 1,
      tag: "Equal-weighted index"
    },
    {
      id: "equities-09",
      q: "Which approach would a weak-form efficient market rule out as a source of consistent excess returns?",
      o: [
        "Technical analysis of past prices",
        "Trading on non-public information",
        "Analysis of published financial statements"
      ],
      c: 0,
      e: "La forma débil implica que los precios pasados ya están incorporados en el precio actual, así que el análisis técnico no genera exceso de retorno sistemático. Esa forma no descarta el análisis fundamental de información pública, que solo queda descartado bajo la forma semifuerte. Tampoco descarta la información privilegiada, que solo queda cubierta en la forma fuerte.",
      d: 1,
      tag: "Market efficiency"
    },
    {
      id: "equities-10",
      q: "An analyst tests 400 trading rules on the same 20-year price history and reports the single rule with the highest excess return. Which concern is most relevant?",
      o: ["Data-mining bias", "Inflation illusion", "Dividend clientele effect"],
      c: 0,
      e: "Al probar cientos de reglas sobre los mismos datos, es probable que alguna parezca rentable por azar: es el sesgo de data mining. La ilusión inflacionaria (inflation illusion) se refiere a la confusión entre tasas nominales y reales, y el efecto clientela de dividendos (dividend clientele) a las preferencias de los inversionistas por la política de dividendos. Ninguno es relevante para esta prueba.",
      d: 2,
      tag: "Anomalies"
    },
    {
      id: "equities-11",
      q: "Sentinel Utilities omits its annual dividend on a cumulative preferred issue. Which statement is correct?",
      o: [
        "The omitted dividend is permanently forgone",
        "Holders automatically convert into common shares",
        "Omitted dividends must be paid before any common dividend"
      ],
      c: 2,
      e: "En las acciones preferentes acumulativas (cumulative), los dividendos no pagados se acumulan como atrasos (arrears) y la empresa debe liquidarlos antes de pagar dividendos a las ordinarias. Perder el dividendo caracteriza a las preferentes no acumulativas. La conversión automática solo ocurre si la acción es convertible y se cumplen las condiciones pactadas.",
      d: 1,
      tag: "Preferred shares"
    },
    {
      id: "equities-12",
      q: "Hollis Corp. just paid an annual dividend of $2.00 per share (D0), expected to grow 4% a year forever. The required return is 9%. What is the intrinsic value per share?",
      o: ["$22.22", "$40.00", "$41.60"],
      c: 2,
      e: "D1 = 2,00 x 1,04 = $2,08 y V0 = 2,08 / (0,09 - 0,04) = $41,60. $40,00 usa D0 en lugar de D1, y $22,22 divide D0 entre la tasa de rendimiento exigida sin restar el crecimiento (2,00 / 0,09).",
      d: 1,
      tag: "Gordon growth model"
    },
    {
      id: "equities-13",
      q: "Pinecrest Co. will pay a dividend of $1.80 next year, growing 3% indefinitely. The risk-free rate is 3%, the equity risk premium is 5%, and the stock's beta is 1.2. Using CAPM and the Gordon growth model, the value per share is closest to",
      o: ["$20.00", "$30.00", "$36.00"],
      c: 1,
      e: "Por CAPM, r = 3% + 1,2 x 5% = 9%. Entonces V0 = 1,80 / (0,09 - 0,03) = $30,00. $36,00 ignora la beta (r = 8%) y $20,00 olvida restar el crecimiento (1,80 / 0,09).",
      d: 2,
      tag: "CAPM and DDM"
    },
    {
      id: "equities-14",
      q: "Norwick Inc. just paid a dividend of $1.00 per share. Dividends are expected to grow 10% in each of the next two years and 3% annually thereafter. The required return is 10%. The intrinsic value per share is closest to",
      o: ["$15.71", "$16.29", "$16.71"],
      c: 2,
      e: "D1 = 1,10 y D2 = 1,21; D3 = 1,21 x 1,03 = 1,2463. El valor al año 2 es V2 = 1,2463 / (0,10 - 0,03) = $17,80. V0 = 1,10 / 1,10 + (1,21 + 17,80) / 1,10^2 = 1,00 + 15,71 = $16,71. $15,71 olvida sumar D2 al valor terminal y $16,29 usa D2 en lugar de D3 para el valor terminal.",
      d: 3,
      tag: "Two-stage DDM"
    },
    {
      id: "equities-15",
      q: "Tallis Corp. has an ROE of 15% and pays out 40% of earnings as dividends. Its sustainable growth rate is closest to",
      o: ["6.0%", "9.0%", "15.0%"],
      c: 1,
      e: "La retención es 1 - 0,40 = 0,60, por lo que g = 0,60 x 15% = 9,0%. El 6,0% multiplica el payout (0,40) por el ROE, que es un error común, y el 15,0% supone que se retiene todo el ingreso.",
      d: 2,
      tag: "Sustainable growth"
    },
    {
      id: "equities-16",
      q: "Brandt Co. has an expected ROE of 12%, a dividend payout ratio of 40%, and a required return of 10%. Assuming constant growth, its justified leading P/E is closest to",
      o: ["7.7", "14.3", "15.3"],
      c: 1,
      e: "Primero g = (1 - 0,40) x 12% = 7,2%. El P/E justificado de avance es payout / (r - g) = 0,40 / (0,10 - 0,072) = 14,3. El 15,3 es el P/E trailing (multiplicado por 1,072) y el 7,7 resulta de usar g = 0,40 x 12% = 4,8% por error.",
      d: 3,
      tag: "Justified P/E"
    },
    {
      id: "equities-17",
      q: "Price-to-book is generally most appropriate as a primary valuation metric for",
      o: [
        "A firm with negative book equity",
        "A software firm built on intangibles",
        "A bank holding mostly financial assets"
      ],
      c: 2,
      e: "El P/B funciona mejor cuando los activos son mayormente financieros y a valor razonable, como en un banco. En una empresa de software, el valor reside en intangibles que casi no aparecen en el balance. Con patrimonio negativo, el P/B no tiene significado.",
      d: 2,
      tag: "Price-to-book"
    },
    {
      id: "equities-18",
      q: "Marden Industries has a market capitalization of $800 million, debt of $300 million, cash of $100 million and EBITDA of $120 million. Its EV/EBITDA is closest to",
      o: ["5.00", "6.67", "8.33"],
      c: 2,
      e: "EV = 800 + 300 - 100 = $1.000 millones y EV/EBITDA = 1.000 / 120 = 8,33. El 6,67 usa solo la capitalización (800 / 120) y el 5,00 invierte los signos (800 - 300 + 100 = 600), restando la deuda y sumando el efectivo.",
      d: 2,
      tag: "EV/EBITDA"
    },
    {
      id: "equities-19",
      q: "Calder Co. reports net income of $90 million, non-cash charges of $40 million, interest expense of $20 million, fixed capital investment of $50 million and working capital investment of $10 million. The tax rate is 30%. FCFF is",
      o: ["$84 million", "$90 million", "$104 million"],
      c: 0,
      e: "FCFF = NI + NCC + Int x (1 - t) - FCInv - WCInv = 90 + 40 + 14 - 50 - 10 = $84 millones. $90 millones suma los intereses antes de impuestos (20) y $104 millones suma la inversión en capital de trabajo en lugar de restarla.",
      d: 2,
      tag: "FCFF"
    },
    {
      id: "equities-20",
      q: "A firm has FCFF of $84 million, interest expense of $20 million, a 30% tax rate, and expects to borrow a net $15 million this year. FCFE is",
      o: ["$55 million", "$70 million", "$85 million"],
      c: 2,
      e: "FCFE = FCFF - Int x (1 - t) + endeudamiento neto = 84 - 14 + 15 = $85 millones. $70 millones omite el endeudamiento neto y $55 millones lo resta en vez de sumarlo.",
      d: 3,
      tag: "FCFE"
    },
    {
      id: "equities-21",
      q: "Ellison Co. earned net income of $15.6 million. Beginning book value of equity was $120 million and the cost of equity is 11%. Residual income is",
      o: ["$2.4 million", "$13.2 million", "$15.6 million"],
      c: 0,
      e: "El cargo de capital es 0,11 x 120 = $13,2 millones, y RI = 15,6 - 13,2 = $2,4 millones. $13,2 millones es solo el cargo de capital y $15,6 millones es la utilidad neta sin descontar el costo del capital.",
      d: 2,
      tag: "Residual income"
    },
    {
      id: "equities-22",
      q: "An industry's sales growth now tracks GDP, a few surviving firms hold stable market shares, free cash flow is high and dividend payouts are rising. Which life-cycle stage is it in?",
      o: ["Mature stage", "Shakeout stage", "Embryonic stage"],
      c: 0,
      e: "Crecimiento alineado con el PIB, cuotas de mercado estables entre pocos sobrevivientes, alto flujo de caja y mayores dividendos son rasgos de la etapa madura. En el shakeout hay guerra de precios y salida de empresas, y en la etapa embrionaria hay ventas mínimas, pérdidas y fuerte inversión.",
      d: 2,
      tag: "Industry life cycle"
    },
    {
      id: "equities-23",
      q: "A foreign company wants to raise new capital through a public offering in the U.S. using ADRs. What is the minimum ADR program level required?",
      o: ["Level I", "Level II", "Level III"],
      c: 2,
      e: "Solo el Nivel III permite una oferta pública para captar capital nuevo en EE. UU. Los Niveles I y II sirven para negociar acciones existentes: el Nivel I en mercados OTC y el Nivel II en una bolsa con registro ante la SEC. Una colocación privada podría hacerse con ADR 144A, pero no es una oferta pública.",
      d: 1,
      tag: "ADR"
    },
    {
      id: "equities-24",
      q: "An investor sells short 200 shares at $60, posting initial margin equal to 40% of the proceeds. The stock pays a $1.50 dividend and the investor covers at $54. Ignoring commissions and interest, the return on the investor's initial margin is closest to",
      o: ["18.75%", "25.00%", "31.25%"],
      c: 0,
      e: "Ganancia por precio = (60 - 54) x 200 = $1.200, menos dividendos pagados 1,50 x 200 = $300, para una ganancia neta de $900. El margen inicial es 0,40 x 12.000 = $4.800 y el retorno es 900 / 4.800 = 18,75%. El 25,00% ignora los dividendos y el 31,25% los suma en lugar de restarlos.",
      d: 3,
      tag: "Short sale return"
    }
  ]
};
