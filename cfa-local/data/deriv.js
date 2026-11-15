window.CFA_CONTENT = window.CFA_CONTENT || {};
window.CFA_CONTENT["deriv"] = {
  resumen: [
    {
      titulo: "Forwards y futuros",
      puntos: [
        "Un contrato forward es un acuerdo bilateral privado para comprar o vender un activo a un precio fijo en una fecha futura; no se paga nada al inicio y se liquida al vencimiento.",
        "Un contrato de futuros (futures) es estandarizado, cotiza en bolsa y pasa por una cámara de compensación (clearinghouse) que elimina casi todo el riesgo de contraparte.",
        "La marcación a mercado (mark to market) liquida ganancias y pérdidas todos los días contra la cuenta de margen. El margen inicial (initial margin) se deposita al abrir; si el saldo cae bajo el margen de mantenimiento (maintenance margin) llega una llamada de margen (margin call) que repone hasta el margen inicial.",
        "La posición larga (long) gana si el precio sube; la corta (short) gana si baja.",
        "La liquidación puede ser por entrega física (physical delivery) o en efectivo (cash settlement)."
      ]
    },
    {
      titulo: "Precio forward y valor de un forward",
      puntos: [
        "Sin ingresos ni costos de mantenimiento: F0 = S0 x (1 + r)^T; el precio forward es el costo de financiar la compra del activo hoy.",
        "Con ingresos conocidos (dividendos, cupones): F0 = (S0 - PV(ingresos)) x (1 + r)^T; con costos de almacenamiento, se suman.",
        "Al inicio el valor del forward es cero porque el precio pactado es el de no arbitraje; después, V_t = S_t - F0/(1 + r)^(T-t) para el comprador sin ingresos.",
        "El precio forward y el valor del contrato son conceptos distintos: uno es el precio de entrega pactado, el otro el valor actual de esa posición.",
        "Si el precio de mercado del forward difiere del precio justo, se arbitra comprando barato y vendiendo caro con financiamiento."
      ]
    },
    {
      titulo: "Swaps",
      puntos: [
        "Un swap de tasa de interés (interest rate swap) intercambia pagos fijos por pagos flotantes sobre un nocional (notional) que no se intercambia.",
        "El pagador fijo (pay-fixed) se beneficia si las tasas flotantes suben; es una cobertura natural para quien tiene deuda a tasa variable.",
        "Al inicio el swap tiene valor cero: la tasa fija del swap iguala el valor presente de los pagos fijos al de los flotantes. Con factores de descuento DF_i: tasa fija = (1 - DF_n) / Σ DF_i.",
        "Cada swap equivale a una cartera de forwards (strip) de tasas; su valor posterior depende de la curva vigente y se liquida en neto.",
        "Los swaps también se usan para cambiar la exposición cambiaria (currency swaps), de renta variable y de materias primas."
      ]
    },
    {
      titulo: "Opciones: payoffs, valor intrínseco y valor temporal",
      puntos: [
        "Una opción de compra (call) da el derecho a comprar al precio de ejercicio X; una opción de venta (put), el derecho a vender. El comprador paga la prima (premium) y el vendedor asume la obligación.",
        "Payoff al vencimiento: call = max(0, S_T - X); put = max(0, X - S_T). El resultado neto resta la prima pagada al comprador.",
        "Valor intrínseco (intrinsic value) = pago inmediato si se ejerciera hoy; valor temporal (time value) = prima - valor intrínseco, nunca negativo.",
        "Moneyness: in-the-money si ejercer deja ganancia, at-the-money si S = X, out-of-the-money si no.",
        "El vendedor del call tiene pérdida potencial ilimitada; el comprador, pérdida máxima igual a la prima. Opciones europeas se ejercen solo al vencimiento; americanas, en cualquier momento."
      ]
    },
    {
      titulo: "Paridad put-call y límites de precio",
      puntos: [
        "Paridad put-call europea sin dividendos: C + X/(1+r)^T = P + S. Un call más bono cero es equivalente a un put más la acción (protective put).",
        "De la paridad: C = P + S - X/(1+r)^T y P = C - S + X/(1+r)^T. Error común: no descontar X.",
        "Límite inferior de un call europeo sin dividendos: max(0, S - X/(1+r)^T). Un call americano nunca vale menos que S - X.",
        "El call vale como máximo S; el put europeo vale como máximo X/(1+r)^T.",
        "Si un precio viola un límite, existe arbitraje: se compra la opción barata, se vende el replicante caro y se obtiene ganancia sin riesgo."
      ]
    },
    {
      titulo: "Estrategias básicas con opciones",
      puntos: [
        "Call cubierto (covered call): tener la acción y vender un call. Ganancia máxima = (X - S0) + prima; punto de equilibrio = S0 - prima; la pérdida es grande si el precio cae.",
        "Put protector (protective put): acción más put comprado. Pérdida máxima = S0 + prima - X; el potencial de alza permanece abierto; funciona como un seguro.",
        "Un collar combina acción, put comprado y call vendido: acota la pérdida y también la ganancia, y puede costar poco o nada.",
        "Modelo binomial de un periodo: valor = [q x payoff_up + (1 - q) x payoff_down]/(1 + r), con q = (1 + r - d)/(u - d) (probabilidad neutral al riesgo).",
        "El valor de una opción es independiente de las probabilidades reales del precio; solo importa el replicante sin arbitraje."
      ]
    },
    {
      titulo: "Arbitraje y ley de un solo precio",
      puntos: [
        "La ley de un solo precio (law of one price) establece que dos activos con idénticos flujos futuros deben tener el mismo precio.",
        "Un arbitraje (arbitrage) es una ganancia sin riesgo y sin inversión neta; su existencia hace que el mercado vuelva al precio justo.",
        "Si F de mercado > F justo: vender el forward, pedir prestado y comprar el activo. Si F de mercado < F justo: comprar el forward, vender el activo en corto e invertir el producto.",
        "Los precios de derivados se calculan por replicación, no por preferencias de riesgo; por eso se descuenta a la tasa libre de riesgo.",
        "La paridad put-call y la paridad forward son aplicaciones del mismo principio."
      ]
    },
    {
      titulo: "Gestión de riesgo y riesgo de contraparte",
      puntos: [
        "Los derivados permiten cubrir (hedge) exposiciones: swaps para fijar tasas, forwards o futuros para fijar precios, puts para limitar pérdidas manteniendo el alza.",
        "También se usan para ajustar la exposición (reasignar activos con menores costos de transacción) y para especular.",
        "El riesgo de crédito en un forward o swap lo soporta quien tiene valor positivo, porque la otra parte le debe ese monto; la parte con valor negativo no tiene exposición.",
        "Las cámaras de compensación, el margen y la liquidación diaria reducen el riesgo de contraparte en futuros; en contratos OTC se usan garantías y acuerdos de neteo (netting).",
        "Un derivado de crédito (credit default swap) transfiere el riesgo de impago de un emisor: el comprador de protección paga una prima y recibe un pago si hay evento de crédito."
      ]
    }
  ],
  formulas: [
    {
      nombre: "Precio forward sin ingresos",
      formula: "F0 = S0 x (1 + r)^T",
      nota: "Es el precio justo por no arbitraje. Error común: usar tasa simple o aplicar un descuento en lugar de una capitalización."
    },
    {
      nombre: "Precio forward con ingresos",
      formula: "F0 = (S0 - PV(ingresos)) x (1 + r)^T",
      nota: "Los dividendos o cupones reducen el precio forward; hay que descontar el ingreso hasta hoy antes de restarlo."
    },
    {
      nombre: "Valor de un forward largo en el tiempo t",
      formula: "V_t = S_t - F0/(1 + r)^(T-t)   (sin ingresos)",
      nota: "El valor es cero al inicio. Error común: no descontar F0 o usar el plazo completo en vez del plazo restante."
    },
    {
      nombre: "Payoff de call y put (comprador)",
      formula: "Call: max(0, S_T - X);  Put: max(0, X - S_T)",
      nota: "Para la ganancia neta resta la prima pagada; para el vendedor, el signo es el contrario."
    },
    {
      nombre: "Valor temporal de una opción",
      formula: "Valor temporal = prima - valor intrínseco",
      nota: "Nunca es negativo; el valor intrínseco de un put es max(0, X - S)."
    },
    {
      nombre: "Paridad put-call (europeas, sin dividendos)",
      formula: "C + X/(1+r)^T = P + S",
      nota: "Despeja el elemento que falta. Error común: olvidar descontar el precio de ejercicio."
    },
    {
      nombre: "Límite inferior de un call europeo",
      formula: "C >= max(0, S - X/(1+r)^T)",
      nota: "Es mayor que el valor intrínseco S - X porque X se paga más adelante."
    },
    {
      nombre: "Call cubierto",
      formula: "Ganancia máx = X - S0 + prima;  equilibrio = S0 - prima",
      nota: "Se pierde el potencial de alza por encima de X; el riesgo a la baja se reduce solo por la prima."
    },
    {
      nombre: "Put protector",
      formula: "Pérdida máx = S0 + prima - X;  equilibrio = S0 + prima",
      nota: "Con X menor que S0, la pérdida máxima incluye la parte entre S0 y X más la prima."
    },
    {
      nombre: "Probabilidad neutral al riesgo (binomial)",
      formula: "q = (1 + r - d)/(u - d);  Valor = [q x V_up + (1 - q) x V_down]/(1 + r)",
      nota: "No uses probabilidades reales ni 50%; q depende de r, u y d."
    },
    {
      nombre: "Tasa fija de un swap",
      formula: "Tasa fija = (1 - DF_n) / Σ DF_i",
      nota: "DF_i son los factores de descuento de cada pago. Error común: usar la spot de largo plazo o el promedio de las spot."
    },
    {
      nombre: "Llamada de margen en futuros",
      formula: "Depósito = margen inicial − saldo actual   (si saldo < mantenimiento)",
      nota: "Se repone hasta el margen inicial, no hasta el margen de mantenimiento."
    }
  ],
  tarjetas: [
    {
      f: "Forward contract vs futures contract",
      b: "Forward: privado, personalizado, se liquida al vencimiento y tiene riesgo de contraparte. Futures: estandarizado, en bolsa, con daily settlement (mark to market) y clearinghouse."
    },
    {
      f: "What is initial margin vs maintenance margin?",
      b: "Initial margin es el depósito al abrir la posición; maintenance margin es el mínimo de saldo. Si el saldo cae por debajo, hay margin call y se repone hasta el initial margin."
    },
    {
      f: "Forward price with a known dividend",
      b: "F0 = (S0 - PV de los dividendos) x (1 + r)^T. El dividend reduce el forward porque el comprador del forward no lo recibe."
    },
    {
      f: "Value of a long forward at time t",
      b: "V_t = S_t - F0/(1 + r)^(T-t) sin ingresos; vale cero al inicio y refleja la ganancia acumulada descontada."
    },
    {
      f: "Intrinsic value vs time value of an option",
      b: "Intrinsic value = payoff si se ejerciera hoy (max(0, S - X) en call). Time value = prima - intrinsic value; nunca es negativo."
    },
    {
      f: "State put-call parity",
      b: "C + X/(1+r)^T = P + S para europeas sin dividendos: un call más un bono cero equivale a un put más la acción."
    },
    {
      f: "Covered call: payoff profile",
      b: "Acción más call vendido. Ganancia máxima = X - S0 + prima; breakeven = S0 - prima; se sacrifica el alza por encima de X a cambio de la prima."
    },
    {
      f: "Protective put: payoff profile",
      b: "Acción más put comprado. Pérdida máxima = S0 + prima - X; el alza queda abierta; actúa como seguro con deducible (S0 - X)."
    },
    {
      f: "Pay-fixed interest rate swap",
      b: "El pay-fixed party paga tasa fija y recibe flotante sobre un notional; gana si suben las tasas y cubre deuda a tasa flotante."
    },
    {
      f: "What is the law of one price?",
      b: "Activos con flujos idénticos deben tener el mismo precio; si no, hay arbitrage. Es la base de la valoración de forwards, swaps y opciones por replicación."
    },
    {
      f: "Who bears credit risk in a forward contract?",
      b: "La parte con valor positivo (a quien le deben); la parte con valor negativo no tiene exposición de crédito. Netting y collateral reducen el counterparty risk."
    },
    {
      f: "Credit default swap (CDS): what does the buyer receive?",
      b: "El comprador de protección paga una prima periódica (spread) y recibe un pago si hay un credit event del emisor de referencia; transfiere el default risk."
    }
  ],
  preguntas: [
    {
      id: "deriv-01",
      q: "A stock trades at 120. It will pay a dividend of 3 in three months. The annual risk-free rate is 5.0% (annual compounding). The no-arbitrage price of a 6-month forward contract on the stock is closest to:",
      o: ["119.93", "122.96", "125.96"],
      c: 0,
      e: "F0 = (S0 - PV del dividendo) x (1 + r)^T = (120 - 3/1,05^0,25) x 1,05^0,5 = (120 - 2,96) x 1,02470 = 117,04 x 1,02470 = 119,93. 122,96 ignora el dividendo (120 x 1,05^0,5). 125,96 suma el dividendo en lugar de restarlo.",
      d: 2,
      tag: "Forward pricing"
    },
    {
      id: "deriv-02",
      q: "Which feature most clearly distinguishes an exchange-traded futures contract from a forward contract?",
      o: [
        "Daily mark-to-market settlement",
        "Payment of the full contract value at initiation",
        "Bilateral negotiation of terms between two counterparties"
      ],
      c: 0,
      e: "Los futuros se liquidan diariamente (mark to market) a través de una cámara de compensación. Los forwards se pactan bilateralmente y se liquidan al vencimiento, y ningún contrato exige pagar el valor completo al inicio.",
      d: 1,
      tag: "Futures vs forwards"
    },
    {
      id: "deriv-03",
      q: "An investor buys a call option on a stock with an exercise price of 50 for a premium of 3.20. At expiration, the stock price is 58. The investor's net profit per share is closest to:",
      o: ["4.80", "8.00", "11.20"],
      c: 0,
      e: "Payoff = max(0, 58 - 50) = 8,00. Ganancia neta = 8,00 - 3,20 = 4,80. 8,00 ignora la prima pagada. 11,20 suma la prima en lugar de restarla.",
      d: 1,
      tag: "Option payoffs"
    },
    {
      id: "deriv-04",
      q: "A put option with an exercise price of 40 trades at 6.10 while the underlying stock price is 36. The time value of the option is closest to:",
      o: ["2.10", "4.00", "6.10"],
      c: 0,
      e: "Valor intrínseco del put = max(0, 40 - 36) = 4,00. Valor temporal = 6,10 - 4,00 = 2,10. 4,00 es el valor intrínseco, y 6,10 es la prima completa.",
      d: 1,
      tag: "Intrinsic and time value"
    },
    {
      id: "deriv-05",
      q: "A company has a floating-rate bank loan and wants to fix its interest cost. The company could most appropriately enter an interest rate swap as the party that will:",
      o: [
        "Pay fixed and receive floating",
        "Sell an interest rate floor on the floating rate",
        "Receive fixed and pay floating on the same notional"
      ],
      c: 0,
      e: "Al pagar fijo y recibir flotante, el flotante recibido compensa el flotante pagado por el préstamo y el costo neto queda fijo. Recibir fijo y pagar flotante duplica la exposición variable. Vender un floor genera obligaciones si las tasas bajan y no cubre la deuda.",
      d: 1,
      tag: "Interest rate swaps"
    },
    {
      id: "deriv-06",
      q: "A European put with an exercise price of 100 and one year to expiration is worth 4.10. The underlying stock, which pays no dividends, trades at 105, and the annual risk-free rate is 4.0%. The value of the European call with the same strike and expiration is closest to:",
      o: ["5.10", "9.10", "12.95"],
      c: 2,
      e: "Paridad put-call: C = P + S - X/(1 + r) = 4,10 + 105 - 100/1,04 = 4,10 + 105 - 96,15 = 12,95. 9,10 no descuenta el precio de ejercicio (P + S - X). 5,10 capitaliza X (100 x 1,04 = 104) en vez de descontarla.",
      d: 2,
      tag: "Put-call parity"
    },
    {
      id: "deriv-07",
      q: "An investor buys a stock at 60 and sells a call option on it with an exercise price of 65 for a premium of 2.40. The maximum profit per share on this covered call, ignoring dividends, is closest to:",
      o: ["2.40", "5.00", "7.40"],
      c: 2,
      e: "Ganancia máxima = (X - S0) + prima = (65 - 60) + 2,40 = 7,40, que ocurre si el precio finaliza en 65 o más. 5,00 ignora la prima, y 2,40 es solo la prima, es decir, la ganancia si no hay alza del activo.",
      d: 2,
      tag: "Covered call"
    },
    {
      id: "deriv-08",
      q: "An investor buys a stock at 48 and buys a put with an exercise price of 45 for a premium of 1.90. The maximum loss per share on this protective put position at expiration is closest to:",
      o: ["1.90", "4.90", "48.00"],
      c: 1,
      e: "Pérdida máxima = S0 + prima - X = 48 + 1,90 - 45 = 4,90, porque el put permite vender a 45. 1,90 considera solo la prima. 48,00 sería la pérdida si la acción fuera a cero y no existiera cobertura.",
      d: 2,
      tag: "Protective put"
    },
    {
      id: "deriv-09",
      q: "A non-dividend-paying asset trades at 100. The one-year risk-free rate is 5.0%, and a one-year forward contract on the asset is quoted at 107. An arbitrageur should most appropriately:",
      o: [
        "Buy the forward and short the asset",
        "Sell the forward and borrow to buy the asset",
        "Sell the forward and short the asset, lending proceeds"
      ],
      c: 1,
      e: "El precio justo es 100 x 1,05 = 105, así que el forward a 107 está caro. Se vende el forward, se pide prestado para comprar el activo y, al vencimiento, se entrega el activo por 107 y se paga 105: ganancia sin riesgo de 2. Comprar el forward y vender en corto aplica a un forward barato. Vender el forward y el activo en corto deja la posición sin cobertura.",
      d: 2,
      tag: "Arbitrage"
    },
    {
      id: "deriv-10",
      q: "An investor entered a long forward on a non-dividend-paying stock with an agreed price of 50. Six months before expiration, the stock trades at 54 and the annual risk-free rate is 3.0%. The current value of the long forward is closest to:",
      o: ["4.00", "4.73", "5.46"],
      c: 1,
      e: "V = S - F0/(1 + r)^(T-t) = 54 - 50/1,03^0,5 = 54 - 49,27 = 4,73. 4,00 es la diferencia sin descontar (54 - 50). 5,46 descuenta 50 por un año completo (54 - 50/1,03) en lugar del plazo restante de medio año.",
      d: 3,
      tag: "Forward valuation"
    },
    {
      id: "deriv-11",
      q: "A stock that pays no dividends trades at 70. A European call has an exercise price of 65 and expires in one year. The annual risk-free rate is 5.0%. The lowest no-arbitrage price for the call is closest to:",
      o: ["1.75", "5.00", "8.10"],
      c: 2,
      e: "Límite inferior = max(0, S - X/(1 + r)^T) = 70 - 65/1,05 = 70 - 61,90 = 8,10. 5,00 es el valor intrínseco S - X, que es el límite de un call americano, pero para el europeo el límite es mayor. 1,75 capitaliza X (65 x 1,05 = 68,25).",
      d: 2,
      tag: "Option price bounds"
    },
    {
      id: "deriv-12",
      q: "An investor buys 4 index futures contracts with a multiplier of 50 per index point. The initial margin is 4,000 per contract and the maintenance margin is 3,000 per contract. The futures price falls by 25 points, and the account is marked to market. The deposit needed to meet the margin call is closest to:",
      o: ["1,000", "1,250", "5,000"],
      c: 2,
      e: "Pérdida por contrato = 25 x 50 = 1.250, y el saldo cae a 4.000 - 1.250 = 2.750, por debajo de 3.000. Se debe reponer hasta el margen inicial: 1.250 x 4 contratos = 5.000. 1.000 sería reponer solo hasta el nivel de mantenimiento (250 x 4), y 1.250 corresponde a un único contrato.",
      d: 2,
      tag: "Margin and marking to market"
    },
    {
      id: "deriv-13",
      q: "A stock trades at 50. In one period it will either rise to 60 or fall to 40. The one-period risk-free rate is 5.0%. A European call option with an exercise price of 50 expires at the end of the period. Using a one-period binomial model, the call value is closest to:",
      o: ["4.76", "5.95", "9.52"],
      c: 1,
      e: "u = 1,2 y d = 0,8, así que q = (1,05 - 0,8)/(1,2 - 0,8) = 0,625. El payoff es 10 si sube y 0 si baja. C = (0,625 x 10)/1,05 = 5,95. 4,76 usa probabilidad de 50% en lugar de la neutral al riesgo; 9,52 descuenta el payoff de 10 sin ponderar por q.",
      d: 3,
      tag: "Binomial model"
    },
    {
      id: "deriv-14",
      q: "The annual spot rates are 2.0% (1 year), 3.0% (2 years) and 4.0% (3 years), which imply discount factors of 0.9804, 0.9426 and 0.8890. The fixed rate on a 3-year annual-pay interest rate swap is closest to:",
      o: ["3.00%", "3.95%", "4.00%"],
      c: 1,
      e: "Tasa fija = (1 - DF3)/(DF1 + DF2 + DF3) = (1 - 0,8890)/(0,9804 + 0,9426 + 0,8890) = 0,1110/2,8120 = 3,95%. 4,00% es la spot de 3 años (el swap no iguala una spot) y 3,00% es el promedio simple de las tres spots.",
      d: 3,
      tag: "Swap pricing"
    },
    {
      id: "deriv-15",
      q: "Two parties enter a forward contract at no cost. After six months, the spot price has risen so that the long position has a positive value. Which party faces credit risk on the contract?",
      o: [
        "Neither party until the contract expires",
        "The short party, because it is the one that must pay",
        "The long party, since the short party owes it a net payment"
      ],
      c: 2,
      e: "El riesgo de crédito recae en quien tiene valor positivo, porque la contraparte le debe ese monto; aquí es la parte larga. La parte corta tiene valor negativo y no está expuesta a un incumplimiento de la otra. Esperar al vencimiento no elimina el riesgo, porque el valor ya existe aunque se liquide después.",
      d: 1,
      tag: "Counterparty credit risk"
    }
  ]
};
