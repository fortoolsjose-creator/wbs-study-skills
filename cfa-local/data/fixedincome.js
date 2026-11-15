window.CFA_CONTENT = window.CFA_CONTENT || {};
window.CFA_CONTENT["fixedincome"] = {
  resumen: [
    {
      titulo: "Características de un bono",
      puntos: [
        "Elementos básicos: emisor, valor nominal o principal (par value / face value), tasa de cupón (coupon rate), frecuencia de pago, fecha de vencimiento (maturity) y moneda.",
        "Los bonos cupón cero (zero-coupon bonds) se emiten con descuento y pagan solo el principal al vencimiento; los bonos con amortización (amortizing) devuelven principal durante su vida.",
        "Las cláusulas de protección (covenants) afirmativas obligan a hacer algo (entregar estados auditados, mantener seguros); las negativas restringen acciones (límite de deuda adicional, restricción de dividendos).",
        "La seguridad (seniority) determina la prioridad de cobro en un impago: deuda garantizada (secured) antes que sin garantía (unsecured), y esta antes que la subordinada.",
        "Los bonos con opciones embebidas (callable, putable, convertible) alteran el flujo esperado y su sensibilidad a las tasas."
      ]
    },
    {
      titulo: "Precio y rendimiento",
      puntos: [
        "El precio de un bono es el valor presente de sus flujos descontados al rendimiento al vencimiento (yield to maturity, YTM), que es la TIR de comprar y mantener hasta el final.",
        "Relación inversa: si el YTM sube, el precio baja. Si YTM = cupón el bono cotiza a la par; si YTM > cupón, con descuento (discount); si YTM < cupón, con prima (premium).",
        "Con el paso del tiempo y rendimiento constante, el precio converge a la par (pull to par); un bono con prima pierde valor, uno con descuento lo gana.",
        "El rendimiento corriente (current yield) = cupón anual / precio; ignora ganancias o pérdidas de capital y el valor del dinero en el tiempo.",
        "Con pagos semestrales, el YTM se cotiza como tasa nominal anual (bond equivalent yield) = 2 x tasa semestral; el rendimiento efectivo anual (effective annual yield) = (1 + tasa semestral)^2 - 1."
      ]
    },
    {
      titulo: "Curva de rendimiento y estructura de plazos",
      puntos: [
        "Las tasas spot (spot rates) son los rendimientos de bonos cupón cero; sirven para valorar cada flujo al descuento de su propio plazo.",
        "Las tasas forward implícitas salen de la no existencia de arbitraje: (1 + S_b)^b = (1 + S_a)^a x (1 + f_{a,b-a})^(b-a).",
        "Teoría de las expectativas puras (pure expectations): la pendiente solo refleja tasas cortas esperadas. Preferencia por la liquidez (liquidity preference): se añade una prima por plazo (term premium) positiva a los plazos largos.",
        "Segmentación de mercado (market segmentation): oferta y demanda distintas por tramo explican la forma de la curva.",
        "Una curva invertida (inverted) tiene tasas largas por debajo de las cortas; una curva plana (flat) tiene tasas similares en todos los plazos."
      ]
    },
    {
      titulo: "Duración y convexidad",
      puntos: [
        "La duración de Macaulay (Macaulay duration) es el plazo medio ponderado de los flujos en valor presente; la duración modificada (modified duration) = Macaulay / (1 + y/m) mide el cambio porcentual del precio por unidad de cambio en el rendimiento.",
        "Aproximación: %ΔP ≈ -DurMod x Δy + 1/2 x Convexidad x (Δy)^2. El término de convexidad siempre mejora el resultado en un bono con convexidad positiva.",
        "La duración efectiva (effective duration) = (V- − V+) / (2 x V0 x Δcurva) es la medida adecuada para bonos con opciones embebidas, porque no supone flujos fijos.",
        "Menor cupón, mayor plazo y menor rendimiento implican mayor duración y mayor sensibilidad.",
        "El valor del punto base (PVBP o DV01) = DurMod x 0,0001 x valor de mercado de la posición."
      ]
    },
    {
      titulo: "Riesgo de crédito",
      puntos: [
        "Pérdida esperada (expected loss) = probabilidad de impago (PD) x pérdida dada el impago (LGD) x exposición; LGD = 1 - tasa de recuperación (recovery rate).",
        "Grado de inversión (investment grade): Baa3/BBB- o superior; grado especulativo o high yield: Ba1/BB+ o inferior.",
        "El diferencial de crédito (credit spread) compensa por riesgo de impago, liquidez y otros factores; se amplía en recesiones y se reduce en expansiones.",
        "El G-spread es el rendimiento del bono menos el de un bono gubernamental de plazo comparable; el Z-spread se suma a toda la curva spot para igualar el precio.",
        "Las calificaciones (credit ratings) incorporan la capacidad y la voluntad de pago; una perspectiva (outlook) negativa anticipa posible rebaja."
      ]
    },
    {
      titulo: "Bonos con tasa flotante y con opciones embebidas",
      puntos: [
        "Un bono de tasa flotante (floating-rate note, FRN) paga tasa de referencia + margen cotizado (quoted margin). En cada reseteo su precio vuelve cerca de la par si el margen requerido (discount margin) es igual al cotizado.",
        "Si el margen requerido sube por deterioro crediticio, el FRN cotiza por debajo de la par; su duración es muy corta, cercana al periodo hasta el siguiente reseteo.",
        "Bono rescatable (callable): valor = bono sin opciones (straight) − valor de la opción de compra del emisor. Ofrece mayor rendimiento y exhibe convexidad negativa cuando las tasas bajan mucho.",
        "Bono con opción de venta (putable): valor = bono straight + valor de la opción de venta del inversionista; rinde menos al emisor y tiene un piso de precio.",
        "El rendimiento al peor escenario (yield to worst) es el menor entre el YTM y los rendimientos a cada fecha de rescate."
      ]
    },
    {
      titulo: "Titulización a nivel conceptual",
      puntos: [
        "La titulización (securitization) agrupa préstamos en un vehículo de propósito especial (special purpose entity) que emite títulos respaldados por esos flujos; esto aísla los activos de la quiebra del originador.",
        "En los títulos respaldados por hipotecas (mortgage pass-throughs) el inversionista recibe intereses, amortización y prepagos.",
        "Riesgo de contracción (contraction risk): cuando las tasas bajan, los prepagos aumentan y el plazo se acorta justo cuando el reinversionista obtiene menores rendimientos. Riesgo de extensión (extension risk): cuando las tasas suben, los prepagos caen y el plazo se alarga.",
        "Mejoras crediticias (credit enhancements): subordinación en tramos, sobrecolateralización (overcollateralization) y exceso de margen (excess spread).",
        "Las estructuras por tramos (tranches) redistribuyen el riesgo de prepago y de crédito entre inversionistas."
      ]
    },
    {
      titulo: "Fuentes de rendimiento y riesgo de reinversión",
      puntos: [
        "El retorno de un bono proviene de los cupones, la reinversión de cupones, la ganancia o pérdida de capital y, si hay incumplimiento, de la recuperación.",
        "El YTM solo iguala el retorno realizado si se mantiene hasta el vencimiento, no hay impago y los cupones se reinvierten al YTM.",
        "Riesgo de reinversión (reinvestment risk): importa más con cupones altos y plazos largos; riesgo de precio: pesa más si se vende antes del vencimiento.",
        "Cuando el horizonte de inversión coincide con la duración de Macaulay, los efectos de precio y de reinversión tienden a compensarse (inmunización).",
        "El retorno total realizado se calcula con el valor futuro de cupones reinvertidos más el valor de venta o principal."
      ]
    }
  ],
  formulas: [
    {
      nombre: "Precio de un bono con cupones",
      formula: "P = Σ C/(1+y)^t + FV/(1+y)^n",
      nota: "Con pagos semestrales usa y/2 por periodo y 2n periodos. Error común: usar la tasa anual con el número de periodos semestrales."
    },
    {
      nombre: "Precio de un bono cupón cero",
      formula: "P = FV / (1+y)^n",
      nota: "Con composición semestral, n se duplica y y se divide en dos. No uses descuento simple (1 - y x n)."
    },
    {
      nombre: "Rendimiento corriente",
      formula: "Current yield = cupón anual / precio de mercado",
      nota: "Divide entre el precio, no entre la par. No incluye ganancias de capital ni reinversión."
    },
    {
      nombre: "Rendimiento efectivo anual (semestral)",
      formula: "EAY = (1 + y_BEY/2)^2 - 1",
      nota: "El BEY es 2 x tasa semestral; el efectivo anual siempre es algo mayor. Error común: reportar la tasa del periodo como anual."
    },
    {
      nombre: "Tasa forward implícita",
      formula: "(1+S_b)^b = (1+S_a)^a x (1+f)^(b-a)  =>  f = [(1+S_b)^b / (1+S_a)^a]^(1/(b-a)) - 1",
      nota: "Sirve para la forward de a a b. Error común: restar tasas spot o promediarlas."
    },
    {
      nombre: "Duración modificada",
      formula: "DurMod = DurMac / (1 + y/m)",
      nota: "m es la frecuencia de capitalización del YTM. Error común: multiplicar en lugar de dividir."
    },
    {
      nombre: "Cambio de precio aproximado",
      formula: "%ΔP ≈ -DurMod x Δy + 0,5 x Convexidad x (Δy)^2",
      nota: "Δy en forma decimal (200 pb = 0,02). El término de convexidad se suma con signo positivo en ambos sentidos."
    },
    {
      nombre: "Duración efectiva",
      formula: "EffDur = (V- − V+) / (2 x V0 x Δcurva)",
      nota: "V- es el precio con la curva a la baja y V+ con la curva al alza. Es la medida adecuada con opciones embebidas."
    },
    {
      nombre: "Valor del punto base (PVBP)",
      formula: "PVBP ≈ DurMod x 0,0001 x valor de mercado de la posición",
      nota: "Usa el valor de mercado, no el nominal, y 0,0001 (un punto base)."
    },
    {
      nombre: "Pérdida esperada",
      formula: "EL = PD x (1 - Recuperación) x Exposición",
      nota: "Error común: multiplicar la PD por la recuperación en lugar de por la pérdida dada el impago (LGD)."
    },
    {
      nombre: "Valor de bonos con opciones",
      formula: "Callable = Straight - Call;  Putable = Straight + Put",
      nota: "La opción de compra pertenece al emisor, por eso resta valor al inversionista; la de venta pertenece al inversionista."
    },
    {
      nombre: "Retorno realizado con reinversión",
      formula: "r_real = (VF total de cupones reinvertidos + principal / precio)^(1/n) - 1",
      nota: "Si la tasa de reinversión es inferior al YTM, el retorno realizado queda por debajo del YTM."
    }
  ],
  tarjetas: [
    {
      f: "Negative covenant vs affirmative covenant",
      b: "Un negative covenant restringe acciones del emisor (límite de deuda, restricción de dividendos); un affirmative covenant exige acciones (entregar estados auditados, mantener seguros)."
    },
    {
      f: "Relationship between bond price and yield",
      b: "Es inversa y convexa. Si el yield sube, el precio baja; YTM = cupón implica precio a la par, YTM > cupón implica descuento, YTM < cupón implica prima."
    },
    {
      f: "What is the pull to par effect?",
      b: "Con rendimiento constante, el precio de un bono con prima o descuento converge a la par conforme se acerca el vencimiento."
    },
    {
      f: "Spot rate vs forward rate",
      b: "Spot rate es el rendimiento de un cupón cero hoy para un plazo; forward rate es la tasa implícita para un periodo futuro, derivada por no arbitraje a partir de las spot."
    },
    {
      f: "Macaulay duration vs modified duration",
      b: "Macaulay duration es el plazo medio ponderado de los flujos en valor presente (en años). Modified duration = Macaulay / (1 + y/m) y mide la sensibilidad porcentual del precio al yield."
    },
    {
      f: "Why does positive convexity benefit a bondholder?",
      b: "Porque el aumento de precio por una baja de yield es mayor que la caída por una subida igual; la convexity corrige la aproximación lineal de la duration."
    },
    {
      f: "Effective duration: when is it used?",
      b: "Para bonos con embedded options (callable, putable), donde los flujos cambian con las tasas; se calcula con precios de choques paralelos hacia arriba y hacia abajo."
    },
    {
      f: "Expected loss formula",
      b: "Expected loss = probability of default x loss given default x exposure; LGD = 1 - recovery rate."
    },
    {
      f: "Value of a callable bond",
      b: "Callable = straight bond - value of the call option (que pertenece al emisor). Tiene convexity negativa cuando las tasas bajan mucho y limita el alza de precio (price compression)."
    },
    {
      f: "Floating-rate note: why does price stay near par?",
      b: "Porque el cupón se reajusta a la reference rate + quoted margin; el precio se desvía de la par solo si el discount margin requerido difiere del quoted margin."
    },
    {
      f: "Contraction risk vs extension risk in MBS",
      b: "Contraction risk: con tasas a la baja suben los prepayments y el plazo se acorta. Extension risk: con tasas al alza caen los prepayments y el plazo se alarga."
    },
    {
      f: "When does YTM equal the realized return?",
      b: "Solo si se mantiene hasta el vencimiento, no hay default y los cupones se reinvierten al YTM; de lo contrario aparecen reinvestment risk y price risk."
    }
  ],
  preguntas: [
    {
      id: "fixedincome-01",
      q: "Harbor Ridge Utilities issued a 5-year bond with a 6.0% annual coupon and a par value of 1,000. Similar bonds currently yield 7.0% (annual compounding). The bond's price is closest to:",
      o: ["959.00", "1,000.00", "1,043.29"],
      c: 0,
      e: "Precio = 60 x [1 - 1,07^-5]/0,07 + 1.000/1,07^5 = 246,01 + 712,99 = 959,00. Como el YTM (7%) supera al cupón (6%), el bono cotiza con descuento. 1.000,00 sería el precio solo si YTM = cupón; 1.043,29 es el precio con YTM de 5%, es decir, invertir la relación precio-rendimiento.",
      d: 1,
      tag: "Bond pricing"
    },
    {
      id: "fixedincome-02",
      q: "A zero-coupon bond from Meridian Rail pays 1,000 in 8 years. With a yield to maturity of 5.0% using annual compounding, the price is closest to:",
      o: ["600.00", "676.84", "1,477.46"],
      c: 1,
      e: "P = 1.000/1,05^8 = 676,84. 600,00 resulta de descuento simple (1.000 x (1 - 0,05 x 8)), que no refleja capitalización compuesta. 1.477,46 es 1.000 x 1,05^8, el valor futuro, no el valor presente.",
      d: 1,
      tag: "Zero-coupon bonds"
    },
    {
      id: "fixedincome-03",
      q: "A 6-year bond pays an annual coupon of 4.50 per 100 of par and trades at a price of 92.00. The bond's current yield is closest to:",
      o: ["4.14%", "4.50%", "4.89%"],
      c: 2,
      e: "Current yield = cupón anual / precio = 4,50 / 92,00 = 4,89%. 4,50% es la tasa de cupón (se divide entre la par, no entre el precio). 4,14% proviene de multiplicar 4,50 x 0,92 en lugar de dividir.",
      d: 1,
      tag: "Current yield"
    },
    {
      id: "fixedincome-04",
      q: "Two bonds have the same maturity and the same yield to maturity. One pays a 3% coupon and the other a 7% coupon. For an identical small change in yield, which bond has the larger percentage price change?",
      o: ["The 3% coupon bond", "The 7% coupon bond", "Both change by the same percentage"],
      c: 0,
      e: "Con igual plazo y YTM, el bono de menor cupón entrega una mayor proporción de su valor al final, por lo que su duración es mayor y su precio es más sensible. El bono de 7% recibe más flujo antes y tiene menor duración. Las sensibilidades no son iguales salvo que las duraciones coincidan.",
      d: 1,
      tag: "Price-yield relationship"
    },
    {
      id: "fixedincome-05",
      q: "In the indenture of a corporate bond, which of the following is best described as a negative covenant?",
      o: [
        "Capping new borrowing at 3.0x EBITDA",
        "Maintaining adequate insurance on all pledged collateral",
        "Delivering audited financial statements to the trustee each year"
      ],
      c: 0,
      e: "Un negative covenant restringe lo que el emisor puede hacer; limitar la deuda nueva a 3,0x EBITDA es una restricción. Mantener seguros y entregar estados auditados son acciones que el emisor debe ejecutar, es decir, affirmative covenants.",
      d: 1,
      tag: "Covenants"
    },
    {
      id: "fixedincome-06",
      q: "The annual spot rates are 3.0% for 1 year, 4.0% for 2 years and 5.0% for 3 years. A 3-year bond pays a 6.0% annual coupon with a par value of 100. The arbitrage-free price is closest to:",
      o: ["97.75", "102.72", "102.94"],
      c: 2,
      e: "Se descuenta cada flujo con su spot: 6/1,03 + 6/1,04^2 + 106/1,05^3 = 5,825 + 5,547 + 91,567 = 102,94. 102,72 descuenta todo al 5% (la spot de 3 años), ignorando que los primeros flujos tienen tasas menores. 97,75 omite el cupón final al usar 100 en el último flujo.",
      d: 2,
      tag: "Spot rates and pricing"
    },
    {
      id: "fixedincome-07",
      q: "The 1-year spot rate is 3.0% and the 2-year spot rate is 4.0%, both annual-compounding. The implied 1-year forward rate one year from now is closest to:",
      o: ["3.50%", "4.00%", "5.01%"],
      c: 2,
      e: "(1 + f) = 1,04^2 / 1,03 = 1,0816/1,03 = 1,0501, así que f = 5,01%. 3,50% es el promedio simple de las dos spots, y 4,00% es la propia spot de 2 años; ninguna respeta la condición de no arbitraje.",
      d: 2,
      tag: "Forward rates"
    },
    {
      id: "fixedincome-08",
      q: "A bond has a Macaulay duration of 7.20 years and a yield to maturity of 6.0% (annual percentage rate, semiannual compounding). The bond's modified duration is closest to:",
      o: ["6.79", "6.99", "7.42"],
      c: 1,
      e: "DurMod = DurMac / (1 + y/m) = 7,20 / (1 + 0,06/2) = 7,20/1,03 = 6,99. 6,79 divide entre 1,06 (ignora la capitalización semestral). 7,42 multiplica en lugar de dividir.",
      d: 2,
      tag: "Modified duration"
    },
    {
      id: "fixedincome-09",
      q: "A lender has an exposure of 1,000,000 to a corporate borrower. The one-year probability of default is 2.0%, and the expected recovery in a default is 60% of the exposure. The expected loss is closest to:",
      o: ["8,000", "12,000", "20,000"],
      c: 0,
      e: "Pérdida esperada = PD x LGD x exposición = 0,02 x (1 - 0,60) x 1.000.000 = 8.000. 12.000 usa la recuperación (60%) como si fuera la pérdida. 20.000 ignora la recuperación y asume pérdida total.",
      d: 2,
      tag: "Credit risk"
    },
    {
      id: "fixedincome-10",
      q: "A floating-rate note pays the 3-month reference rate plus a quoted margin of 0.75%. Immediately after a coupon reset, investors require a margin of 0.95% for comparable credit risk. The note's price is most likely:",
      o: ["At par", "Above par", "Below par"],
      c: 2,
      e: "Tras el reseteo el cupón ya refleja la tasa de referencia vigente, así que solo cuenta la diferencia de márgenes. Como el margen requerido (0,95%) supera al cotizado (0,75%), los flujos se descuentan a una tasa mayor que el cupón y el precio queda bajo la par. Estaría a la par solo si ambos márgenes fueran iguales, y sobre la par si el requerido fuera menor.",
      d: 2,
      tag: "Floating-rate notes"
    },
    {
      id: "fixedincome-11",
      q: "A straight (option-free) bond issued by Cobalt Freight is worth 103.50. An otherwise identical bond callable by the issuer embeds a call option worth 4.20. The value of the callable bond is closest to:",
      o: ["99.30", "103.50", "107.70"],
      c: 0,
      e: "Callable = straight - call = 103,50 - 4,20 = 99,30. El inversionista vende la opción al emisor, por lo que recibe un bono de menor valor. 107,70 suma la opción (sería el cálculo de un bono putable) y 103,50 ignora la opción.",
      d: 2,
      tag: "Callable bonds"
    },
    {
      id: "fixedincome-12",
      q: "A straight bond is worth 96.80. An otherwise identical bond gives the investor a put option, valued at 3.10. The value of the putable bond is closest to:",
      o: ["93.70", "96.80", "99.90"],
      c: 2,
      e: "Putable = straight + put = 96,80 + 3,10 = 99,90, porque la opción de venta pertenece al inversionista y añade valor. 93,70 resta la opción (es el error de tratarla como call del emisor) y 96,80 la ignora.",
      d: 2,
      tag: "Putable bonds"
    },
    {
      id: "fixedincome-13",
      q: "For a bond with an embedded option priced at 100.00, a 50 bp parallel downward shift of the benchmark curve gives a price of 102.40, and a 50 bp upward shift gives 97.80. The bond's effective duration is closest to:",
      o: ["2.30", "4.60", "9.20"],
      c: 1,
      e: "EffDur = (V- - V+) / (2 x V0 x Δcurva) = (102,40 - 97,80) / (2 x 100 x 0,005) = 4,60 / 1,00 = 4,60. 9,20 olvida el 2 del denominador, y 2,30 lo aplica dos veces.",
      d: 2,
      tag: "Effective duration"
    },
    {
      id: "fixedincome-14",
      q: "Interest rates fall sharply, and homeowners refinance their mortgages. A holder of a mortgage pass-through security will most likely be exposed to:",
      o: ["Extension risk", "Contraction risk", "Subordination risk"],
      c: 1,
      e: "Cuando las tasas bajan aumentan los prepagos, el plazo efectivo se acorta y el inversionista debe reinvertir a tasas menores: eso es contraction risk. Extension risk aparece cuando las tasas suben y los prepagos disminuyen. Subordination es un mecanismo de mejora crediticia, no una consecuencia de la caída de tasas.",
      d: 2,
      tag: "Securitization"
    },
    {
      id: "fixedincome-15",
      q: "Short-term rates are expected to stay at 2.0% for the next ten years, yet the 10-year spot rate is 2.6%. Which theory best explains the 0.6% difference?",
      o: ["Pure expectations theory", "Market segmentation theory", "Liquidity preference theory"],
      c: 2,
      e: "La liquidity preference theory añade a las expectativas una prima por plazo (term premium) para compensar el mayor riesgo de precio de los bonos largos; con tasas cortas esperadas planas, eso explica los 0,6%. La pure expectations theory implicaría una tasa de 10 años igual a 2,0%. La market segmentation theory atribuye la forma a oferta y demanda por tramos, no a una prima sobre las expectativas.",
      d: 2,
      tag: "Term structure theories"
    },
    {
      id: "fixedincome-16",
      q: "A corporate bond is rated BB+ by S&P Global. The bond is best classified as:",
      o: ["Investment grade", "Speculative grade", "Investment grade, lowest rating notch"],
      c: 1,
      e: "En la escala de S&P, el grado de inversión termina en BBB-; BB+ queda un escalón por debajo, en grado especulativo (high yield). Investment grade en su nivel más bajo corresponde a BBB-, no a BB+.",
      d: 1,
      tag: "Credit ratings"
    },
    {
      id: "fixedincome-17",
      q: "A 3-year bond with a par value of 1,000 pays a 5.0% annual coupon in semiannual installments. The yield to maturity is 6.0% (annual percentage rate, semiannual compounding). The price is closest to:",
      o: ["827.89", "972.91", "985.86"],
      c: 1,
      e: "Hay 6 periodos, cupón 25 y tasa 3% por periodo: P = 25 x [1 - 1,03^-6]/0,03 + 1.000/1,03^6 = 135,43 + 837,48 = 972,91. 985,86 usa solo 3 periodos con 3%, y 827,89 usa 6 periodos con 6% (no se divide la tasa entre 2).",
      d: 2,
      tag: "Semiannual bond pricing"
    },
    {
      id: "fixedincome-18",
      q: "A 3-year bond pays a 7.0% annual coupon on a par value of 100 and currently yields 5.0%, so its price is 105.45. Assuming the yield is unchanged, the price one year from now, immediately after the coupon is paid, is closest to:",
      o: ["100.00", "103.72", "105.45"],
      c: 1,
      e: "Quedan 2 años: P = 7/1,05 + 107/1,05^2 = 6,67 + 97,05 = 103,72. El precio converge hacia la par (pull to par) pero no llega aún; con un rendimiento constante no se queda en 105,45 y tampoco cae a 100 antes del vencimiento.",
      d: 3,
      tag: "Pull to par"
    },
    {
      id: "fixedincome-19",
      q: "An investor buys a 3-year, 6.0% annual-coupon bond at par (1,000) and holds it to maturity. All coupons are reinvested at 4.0%. The investor's realized annual return is closest to:",
      o: ["4.00%", "5.89%", "6.00%"],
      c: 1,
      e: "Valor futuro de cupones: 60 x 1,04^2 + 60 x 1,04 + 60 = 187,30; más el principal de 1.000 da 1.187,30. Retorno = (1.187,30/1.000)^(1/3) - 1 = 5,89%. El YTM de 6,00% exigiría reinvertir al 6%. El 4,00% sería el retorno si todo el valor se generara a la tasa de reinversión.",
      d: 3,
      tag: "Reinvestment risk"
    },
    {
      id: "fixedincome-20",
      q: "An investor holds bonds with a par value of 10 million, quoted at 98.50 per 100 of par. The bonds have a modified duration of 5.2. The approximate loss in value for a 1 basis point increase in yield is closest to:",
      o: ["5,122", "5,200", "512,200"],
      c: 0,
      e: "Valor de mercado = 10.000.000 x 0,985 = 9.850.000. PVBP ≈ 5,2 x 0,0001 x 9.850.000 = 5.122. 5.200 usa el nominal en lugar del valor de mercado. 512.200 corresponde a un cambio de 100 pb en vez de 1 pb.",
      d: 3,
      tag: "Price value of a basis point"
    },
    {
      id: "fixedincome-21",
      q: "A bond with 5 years to maturity pays a 5.00% annual coupon and trades at 102.50 per 100 of par. It can be called once, in exactly 3 years, at 102.00. Its yield to maturity is 4.43% and its yield to call is 4.72%. The bond's yield to worst is closest to:",
      o: ["4.43%", "4.72%", "4.88%"],
      c: 0,
      e: "El yield to worst es el menor de los rendimientos posibles: min(4,43%; 4,72%) = 4,43%. Aquí la opción de rescate a 102,00 apenas pierde 0,50 frente al precio de compra, así que el YTM es el peor caso. 4,72% es el rendimiento al rescate, y 4,88% = 5,00/102,50 es el rendimiento corriente, no un yield to worst.",
      d: 3,
      tag: "Yield to worst"
    },
    {
      id: "fixedincome-22",
      q: "A bond has a modified duration of 6.0 and a convexity of 80. The yield falls by 200 basis points. Using duration and convexity, the approximate percentage price change is closest to:",
      o: ["10.40%", "12.00%", "13.60%"],
      c: 2,
      e: "%ΔP ≈ -6,0 x (-0,02) + 0,5 x 80 x 0,02^2 = 12,00% + 1,60% = 13,60%. 12,00% omite la convexidad. 10,40% resta el término de convexidad (12,00% - 1,60%), cuando en realidad se suma por ser positivo (Δy)^2.",
      d: 3,
      tag: "Convexity"
    },
    {
      id: "fixedincome-23",
      q: "The yield to maturity of a fixed-rate bond equals the investor's realized annual return only if:",
      o: [
        "coupons are reinvested at the YTM and the bond is held to maturity",
        "coupons are reinvested at the coupon rate and the bond is sold after one year",
        "the yield curve is flat and the issuer later redeems the bond early at a premium"
      ],
      c: 0,
      e: "El YTM es una TIR y supone mantener el bono hasta el vencimiento, ausencia de impago y reinversión de cupones al propio YTM. Reinvertir a la tasa de cupón o vender antes del vencimiento introduce riesgo de reinversión y de precio. Un rescate anticipado también altera el flujo supuesto.",
      d: 1,
      tag: "Sources of return"
    },
    {
      id: "fixedincome-24",
      q: "A semiannual-pay bond has a yield per six-month period of 3.20%. Its effective annual yield is closest to:",
      o: ["3.20%", "6.40%", "6.50%"],
      c: 2,
      e: "EAY = (1,032)^2 - 1 = 6,50%. 6,40% es la tasa nominal anual (bond equivalent yield = 2 x 3,20%), que no capitaliza. 3,20% es la tasa del periodo semestral, no una tasa anual.",
      d: 2,
      tag: "Yield conventions"
    }
  ]
};
