window.CFA_CONTENT = window.CFA_CONTENT || {};
window.CFA_CONTENT["econ"] = {
  resumen: [
    {
      titulo: "Oferta, demanda y excedentes",
      puntos: [
        "El equilibrio de mercado (market equilibrium) se da donde la cantidad demandada iguala a la ofrecida; un cambio en el precio mueve a lo largo de la curva, mientras que un cambio en ingreso, gustos o costos desplaza la curva.",
        "El excedente del consumidor (consumer surplus) es la diferencia entre lo que el comprador está dispuesto a pagar y lo que paga; el del productor (producer surplus) es precio menos costo marginal.",
        "Un precio máximo (price ceiling) vinculante, por debajo del equilibrio, genera escasez (shortage); un precio mínimo (price floor) por encima genera excedente de oferta (surplus).",
        "Los impuestos y las cuotas crean una pérdida irrecuperable de eficiencia (deadweight loss) al reducir la cantidad intercambiada por debajo del nivel eficiente."
      ]
    },
    {
      titulo: "Elasticidad",
      puntos: [
        "La elasticidad precio de la demanda es el cambio porcentual en la cantidad dividido por el cambio porcentual en el precio; |E| > 1 es elástica y |E| < 1 inelástica.",
        "Si la demanda es elástica, subir el precio reduce el ingreso total; si es inelástica, lo aumenta.",
        "La elasticidad ingreso distingue bienes normales (positiva), de lujo (mayor que 1) e inferiores (negativa).",
        "La elasticidad cruzada es positiva para sustitutos y negativa para complementos.",
        "La demanda es más elástica con más sustitutos cercanos, mayor proporción del presupuesto y horizontes de tiempo más largos."
      ]
    },
    {
      titulo: "Estructuras de mercado",
      puntos: [
        "Competencia perfecta (perfect competition): muchos vendedores, producto homogéneo, precio dado; en el largo plazo P = MC = mínimo ATC y beneficio económico cero.",
        "Competencia monopolística (monopolistic competition): productos diferenciados y libre entrada; en el largo plazo hay beneficio económico cero pero P > MC y capacidad ociosa.",
        "Oligopolio (oligopoly): pocas empresas interdependientes; los cárteles tienden a romperse porque cada miembro gana al engañar (dilema del prisionero, equilibrio de Nash).",
        "Monopolio (monopoly): maximiza beneficio donde MR = MC y cobra un precio mayor que MC, con pérdida de eficiencia.",
        "El índice de Herfindahl-Hirschman (HHI) suma los cuadrados de las cuotas de mercado; valores más altos indican mayor concentración."
      ]
    },
    {
      titulo: "PIB e inflación",
      puntos: [
        "Enfoque del gasto: PIB = C + I + G + (X − M); el PIB nominal usa precios corrientes y el real usa precios de un año base.",
        "Deflactor del PIB = PIB nominal / PIB real × 100; se usa para convertir nominal en real.",
        "El IPC (CPI) mide una canasta fija; tiende a sobreestimar la inflación por el sesgo de sustitución (substitution bias) y por mejoras de calidad no capturadas.",
        "Tipos de inflación: de demanda (demand-pull) cuando la demanda agregada supera la capacidad; de costos (cost-push) cuando suben los insumos o salarios.",
        "La tasa real aproximada es la nominal menos la inflación esperada (efecto Fisher); la exacta es (1 + nominal)/(1 + inflación) − 1."
      ]
    },
    {
      titulo: "Ciclo económico y desempleo",
      puntos: [
        "El ciclo tiene fases de expansión, pico, contracción y valle (trough); el crecimiento potencial depende de trabajo, capital y productividad.",
        "Indicadores adelantados (leading): permisos de construcción, pedidos nuevos, curva de rendimientos; coincidentes: producción industrial y empleo; rezagados (lagging): duración del desempleo, crédito al consumo.",
        "Desempleo friccional (frictional), estructural (structural) y cíclico (cyclical); la tasa natural incluye los dos primeros.",
        "La brecha del producto (output gap) compara el PIB real con el potencial y orienta la política económica."
      ]
    },
    {
      titulo: "Política monetaria y fiscal",
      puntos: [
        "Los bancos centrales buscan estabilidad de precios; sus herramientas son la tasa de política (policy rate), las operaciones de mercado abierto y el requerimiento de reservas.",
        "Multiplicador monetario simple = 1 / coeficiente de reservas; una compra de bonos del banco central amplía reservas y, potencialmente, el dinero en circulación.",
        "Una política monetaria expansiva baja las tasas y estimula el consumo y la inversión; con tasas de interés muy bajas se recurre a la flexibilización cuantitativa (quantitative easing).",
        "La política fiscal usa gasto e impuestos; el multiplicador fiscal con impuesto proporcional es 1 / [1 − MPC × (1 − t)].",
        "El déficit financiado con deuda puede desplazar inversión privada (crowding out); una mezcla de política fiscal expansiva y monetaria restrictiva sube las tasas de interés."
      ]
    },
    {
      titulo: "Tipos de cambio y balanza de pagos",
      puntos: [
        "La cotización A/B indica cuántas unidades de la moneda A (precio) hay por una unidad de la moneda B (base); un tipo cruzado se obtiene dividiendo o multiplicando cotizaciones con una moneda común.",
        "Paridad de tasas de interés cubierta (covered interest parity): F = S × (1 + i_precio) / (1 + i_base); la moneda con tasa mayor se deprecia a plazo.",
        "La paridad del poder adquisitivo (PPP) relativa sostiene que la moneda del país con mayor inflación se deprecia; sirve a largo plazo, no en el corto.",
        "Balanza de pagos: cuenta corriente + cuenta de capital y financiera + discrepancia estadística ≈ 0; un déficit de cuenta corriente se financia con entrada neta de capital.",
        "Un déficit de cuenta corriente refleja que la inversión doméstica supera el ahorro doméstico."
      ]
    },
    {
      titulo: "Comercio internacional",
      puntos: [
        "Ventaja absoluta (absolute advantage): produce más con los mismos recursos; ventaja comparativa (comparative advantage): menor costo de oportunidad.",
        "Ambos países ganan al especializarse según su ventaja comparativa, aunque uno tenga ventaja absoluta en todo.",
        "Un arancel (tariff) eleva el precio interno, favorece al productor local y al gobierno, perjudica al consumidor y genera pérdida irrecuperable.",
        "Las cuotas de importación tienen efectos similares, pero la renta puede quedar en manos de exportadores extranjeros.",
        "Los bloques comerciales van de la zona de libre comercio (free trade area) a la unión aduanera (customs union), el mercado común y la unión económica."
      ]
    }
  ],
  formulas: [
    {
      nombre: "Elasticidad precio de la demanda",
      formula: "E_p = %ΔQ_d / %ΔP",
      nota: "Es negativa en bienes normales; se compara su valor absoluto con 1. Error común: confundir el signo o usar cantidades en vez de variaciones porcentuales."
    },
    {
      nombre: "Elasticidad ingreso",
      formula: "E_y = %ΔQ_d / %Δ ingreso",
      nota: "Negativa implica bien inferior; mayor que 1, bien de lujo. Error común: llamar inferior a un bien con elasticidad pequeña pero positiva."
    },
    {
      nombre: "Elasticidad cruzada",
      formula: "E_xy = %ΔQ_d(X) / %ΔP(Y)",
      nota: "Positiva: sustitutos. Negativa: complementos. Error común: invertir la interpretación."
    },
    {
      nombre: "Índice HHI",
      formula: "HHI = Σ (cuota_i en %)²",
      nota: "Con cuotas en porcentaje el máximo es 10,000 (monopolio). Error común: sumar las cuotas en vez de elevarlas al cuadrado."
    },
    {
      nombre: "PIB por el enfoque del gasto",
      formula: "GDP = C + I + G + X − M",
      nota: "Las importaciones se restan. Error común: sumar M o incluir transferencias como gasto del gobierno."
    },
    {
      nombre: "PIB real y deflactor",
      formula: "Real GDP = Nominal GDP / (Deflator / 100)",
      nota: "El deflactor mide la inflación de toda la economía. Error común: multiplicar en vez de dividir."
    },
    {
      nombre: "Tasa de inflación con un índice de precios",
      formula: "π = (CPI_t / CPI_(t−1)) − 1",
      nota: "Usa el índice del mismo mes o año anterior. Error común: dividir la diferencia entre el índice final."
    },
    {
      nombre: "Relación de Fisher (tasa real)",
      formula: "(1 + i_nominal) = (1 + r_real) × (1 + π);  aprox.: r ≈ i − π",
      nota: "Con inflación alta, la aproximación se aleja de la fórmula exacta."
    },
    {
      nombre: "Multiplicador monetario simple",
      formula: "m = 1 / coeficiente de reservas;  ΔDinero máx. = ΔReservas × m",
      nota: "Es un máximo teórico. Error común: multiplicar por el coeficiente en vez de dividir."
    },
    {
      nombre: "Multiplicador fiscal",
      formula: "k = 1 / [1 − MPC × (1 − t)]",
      nota: "El impuesto proporcional t lo reduce. Error común: usar 1/(1 − MPC) ignorando t."
    },
    {
      nombre: "Tipo de cambio cruzado",
      formula: "A/C = (A/B) × (B/C)",
      nota: "Alinea la moneda común al cancelarla. Error común: multiplicar cuando debes dividir."
    },
    {
      nombre: "Paridad de tasas de interés cubierta",
      formula: "F(P/B) = S(P/B) × (1 + i_P) / (1 + i_B)",
      nota: "P = moneda precio, B = moneda base, ambas tasas por el mismo plazo. Error común: invertir los términos de las tasas."
    },
    {
      nombre: "Identidad de la balanza de pagos",
      formula: "Cuenta corriente + cuenta de capital y financiera + discrepancia ≈ 0",
      nota: "Un déficit corriente exige entrada neta de capital. Error común: pensar que un déficit comercial siempre indica debilidad económica."
    }
  ],
  tarjetas: [
    {
      f: "Price ceiling below equilibrium",
      b: "Si es vinculante, la cantidad demandada excede la ofrecida: hay escasez (shortage), la cantidad intercambiada cae y aparece pérdida irrecuperable de eficiencia."
    },
    {
      f: "Elastic vs. inelastic demand",
      b: "Elástica: |E| > 1, un alza de precio reduce el ingreso total. Inelástica: |E| < 1, un alza de precio lo aumenta. Unitaria: |E| = 1, el ingreso no cambia."
    },
    {
      f: "Inferior good",
      b: "Bien con elasticidad ingreso negativa: la demanda baja cuando sube el ingreso del consumidor, como el transporte en autobús frente al auto propio."
    },
    {
      f: "Long-run equilibrium in monopolistic competition",
      b: "Beneficio económico cero por la libre entrada, pero P > MC y el precio supera el mínimo de ATC (excess capacity). Hay diferenciación de producto."
    },
    {
      f: "Why do cartels tend to break down?",
      b: "Cada miembro gana si produce más que su cuota mientras los demás respetan el acuerdo; es un dilema del prisionero y la tendencia a engañar (cheating) lo desestabiliza."
    },
    {
      f: "GDP deflator",
      b: "Índice de precios de todos los bienes producidos: PIB nominal / PIB real × 100. Abarca más bienes que el IPC y usa canasta variable."
    },
    {
      f: "Leading, coincident and lagging indicators",
      b: "Leading anticipa el ciclo (permisos de construcción, pedidos nuevos); coincident se mueve con él (empleo, producción); lagging confirma (duración del desempleo, crédito al consumo)."
    },
    {
      f: "Crowding out",
      b: "El déficit fiscal financiado con deuda eleva las tasas de interés y desplaza inversión privada, reduciendo el efecto expansivo del gasto público."
    },
    {
      f: "Covered interest parity in one sentence",
      b: "El tipo forward refleja el diferencial de tasas: la moneda con tasa de interés más alta cotiza con descuento a plazo, de modo que no hay arbitraje sin riesgo."
    },
    {
      f: "Relative purchasing power parity (PPP)",
      b: "La moneda del país con mayor inflación esperada tiende a depreciarse en la misma proporción del diferencial; se cumple mejor a largo plazo que a corto."
    },
    {
      f: "Current account deficit means…",
      b: "El país gasta más de lo que ahorra: la inversión doméstica supera el ahorro doméstico y debe financiarse con entrada neta de capital extranjero (superávit de cuenta de capital y financiera)."
    },
    {
      f: "Comparative advantage",
      b: "Un país tiene ventaja comparativa en el bien que produce con menor costo de oportunidad. El comercio beneficia a ambos aun si uno tiene ventaja absoluta en todo."
    }
  ],
  preguntas: [
    {
      id: "econ-01",
      q: "The own-price elasticity of demand for a bakery's loaves is -1.5. If the bakery raises its price by 4%, the quantity demanded will change by approximately:",
      o: ["-6.0%", "-2.7%", "-1.5%"],
      c: 0,
      e: "Elasticidad = %ΔQ / %ΔP, de modo que %ΔQ = −1.5 × 4 % = −6.0 %. La opción −2.7 % divide (4 / 1.5) en vez de multiplicar. La opción −1.5 % simplemente repite la elasticidad como si fuera un cambio porcentual. Como |E| > 1, el ingreso total también cae.",
      d: 1,
      tag: "elasticity"
    },
    {
      id: "econ-02",
      q: "When household income rises by 5%, quantity demanded of a store-brand noodle falls by 2%. The noodle is most likely:",
      o: ["A luxury good", "An inferior good", "A normal good with elastic demand"],
      c: 1,
      e: "La elasticidad ingreso es −2 % / 5 % = −0.4. Un valor negativo identifica un bien inferior. Un bien de lujo tendría elasticidad ingreso mayor que 1, y un bien normal tiene elasticidad ingreso positiva.",
      d: 1,
      tag: "income elasticity"
    },
    {
      id: "econ-03",
      q: "A government sets a binding maximum price on rental flats, below the competitive equilibrium rent. The most likely result in that market is:",
      o: [
        "A surplus of the good",
        "No change in quantity traded",
        "A shortage, with quantity traded below the equilibrium level"
      ],
      c: 2,
      e: "Un precio máximo por debajo del equilibrio hace que la cantidad demandada supere la ofrecida: hay escasez. Como la cantidad que realmente se intercambia es la ofrecida, queda por debajo del equilibrio. Un excedente (surplus) aparece con un precio mínimo vinculante, no con un máximo.",
      d: 1,
      tag: "supply and demand"
    },
    {
      id: "econ-04",
      q: "In long-run equilibrium, a firm in a monopolistically competitive market most likely earns:",
      o: [
        "Zero economic profit with price above marginal cost",
        "Positive economic profit due to product differentiation",
        "Zero economic profit with price equal to minimum average total cost"
      ],
      c: 0,
      e: "La libre entrada elimina los beneficios económicos, pero la diferenciación de producto da a cada empresa una curva de demanda con pendiente negativa, por lo que P > MC y el precio es igual al ATC (por encima de su mínimo). La opción con beneficio positivo es incompatible con la entrada libre. P = mínimo ATC es el resultado de la competencia perfecta.",
      d: 2,
      tag: "market structure"
    },
    {
      id: "econ-05",
      q: "Four firms supply a market with shares of 45%, 25%, 20% and 10%. The Herfindahl-Hirschman Index for this market is closest to:",
      o: ["100", "2,650", "3,150"],
      c: 2,
      e: "HHI = 45² + 25² + 20² + 10² = 2,025 + 625 + 400 + 100 = 3,150. La opción 100 es la suma de las cuotas (la razón de concentración de cuatro empresas), no el HHI. La opción 2,650 eleva al cuadrado solo las dos mayores cuotas (2,025 + 625).",
      d: 2,
      tag: "market concentration"
    },
    {
      id: "econ-06",
      q: "An economy reports consumption of 620, investment of 180, government spending of 210, exports of 150 and imports of 170. Using the expenditure approach, gross domestic product is:",
      o: ["990", "1,160", "1,330"],
      c: 0,
      e: "GDP = C + I + G + (X − M) = 620 + 180 + 210 + (150 − 170) = 990. La opción 1,160 suma las exportaciones pero olvida restar las importaciones. La opción 1,330 suma las importaciones en lugar de restarlas.",
      d: 1,
      tag: "GDP"
    },
    {
      id: "econ-07",
      q: "Nominal GDP in a given year is 1,200 and the GDP deflator is 120 (base year = 100). Real GDP is closest to:",
      o: ["960", "1,000", "1,440"],
      c: 1,
      e: "Real GDP = Nominal GDP / (deflactor/100) = 1,200 / 1.20 = 1,000. La opción 1,440 multiplica en vez de dividir. La opción 960 resta el 20 % del nominal (1,200 × 0.8), pero un aumento de precios de 20 % se elimina dividiendo entre 1.20, no restando 20 %.",
      d: 2,
      tag: "real vs nominal GDP"
    },
    {
      id: "econ-08",
      q: "A fixed-basket consumer price index tends to overstate the true rise in the cost of living mainly because it ignores:",
      o: [
        "Changes in the central bank policy rate",
        "Consumers' substitution toward relatively cheaper goods",
        "The share of national output that is sold to export markets"
      ],
      c: 1,
      e: "El sesgo de sustitución (substitution bias) surge porque la canasta fija no refleja que los consumidores compran menos de lo que se encareció y más de lo relativamente barato, por lo que el IPC sobreestima el aumento del costo de vida. La tasa de política y las exportaciones no entran en la medición de la canasta del consumidor.",
      d: 2,
      tag: "inflation measurement"
    },
    {
      id: "econ-09",
      q: "The reserve requirement in a banking system is 12.5%. The central bank buys 40 million of government securities from the public, and banks hold no excess reserves. The maximum increase in the money supply is closest to:",
      o: ["5 million", "40 million", "320 million"],
      c: 2,
      e: "El multiplicador monetario simple es 1 / 0.125 = 8, por lo que el aumento máximo es 40 × 8 = 320 millones. La opción 5 millones multiplica por el coeficiente (40 × 0.125) en vez de dividir. La opción 40 millones ignora por completo el efecto multiplicador.",
      d: 2,
      tag: "monetary policy"
    },
    {
      id: "econ-10",
      q: "In an economy the marginal propensity to consume is 0.75 and the proportional income tax rate is 20%. The fiscal spending multiplier is closest to:",
      o: ["2.5", "3.0", "4.0"],
      c: 0,
      e: "k = 1 / [1 − MPC × (1 − t)] = 1 / [1 − 0.75 × 0.80] = 1 / 0.40 = 2.5. La opción 4.0 usa 1/(1 − MPC) e ignora el impuesto. La opción 3.0 usa MPC/(1 − MPC), que no es el multiplicador del gasto.",
      d: 3,
      tag: "fiscal policy"
    },
    {
      id: "econ-11",
      q: "Which of the following is most likely a leading indicator of the business cycle?",
      o: [
        "Building permits issued",
        "Consumer credit outstanding",
        "Average duration of unemployment"
      ],
      c: 0,
      e: "Los permisos de construcción cambian antes de que el ciclo gire, porque reflejan expectativas de inversión, por lo que son un indicador adelantado. El crédito al consumo y la duración promedio del desempleo se ajustan después de que el ciclo ya cambió, es decir, son indicadores rezagados.",
      d: 1,
      tag: "business cycle"
    },
    {
      id: "econ-12",
      q: "One euro is quoted at 1.10 US dollars and one pound sterling is quoted at 1.32 US dollars. The cross rate, in euros per pound, is closest to:",
      o: ["0.83", "1.20", "1.45"],
      c: 1,
      e: "EUR/GBP = (USD/GBP) / (USD/EUR) = 1.32 / 1.10 = 1.20 euros por libra. La opción 0.83 es la cotización invertida (libras por euro). La opción 1.45 multiplica las dos cotizaciones, lo que no cancela el dólar.",
      d: 2,
      tag: "exchange rates"
    },
    {
      id: "econ-13",
      q: "The spot rate is 1.2500 US dollars per euro. One-year interest rates are 4% in the United States and 2% in the euro area. Under covered interest rate parity, the one-year forward rate in USD per EUR is closest to:",
      o: ["1.2260", "1.2500", "1.2745"],
      c: 2,
      e: "F = S × (1 + i_USD) / (1 + i_EUR) = 1.2500 × 1.04 / 1.02 = 1.2745. El dólar tiene la tasa mayor, por lo que se deprecia a plazo y el euro cuesta más dólares. La opción 1.2260 invierte el cociente de tasas; la opción 1.2500 supone que el forward es igual al spot, lo que permitiría arbitraje.",
      d: 3,
      tag: "interest rate parity"
    },
    {
      id: "econ-14",
      q: "A country runs a persistent current account deficit. By the balance of payments identity, the country must most likely also have:",
      o: [
        "A fiscal budget surplus",
        "A net outflow of financial capital",
        "A net inflow of capital from abroad that finances the gap"
      ],
      c: 2,
      e: "Como cuenta corriente + cuenta de capital y financiera ≈ 0, un déficit corriente se financia con un superávit de capital: la entrada neta de capital extranjero. Una salida neta de capital agravaría el desequilibrio. No existe una relación contable que obligue a un superávit fiscal.",
      d: 2,
      tag: "balance of payments"
    },
    {
      id: "econ-15",
      q: "In one day, Country X can produce 12 tonnes of grain or 6 bolts of cloth. Country Y can produce 4 tonnes of grain or 1 bolt of cloth. Which statement is correct?",
      o: [
        "Country X has no advantage in either good",
        "Country Y has a comparative advantage in grain",
        "Country X has a comparative advantage in grain only because it produces more of it"
      ],
      c: 1,
      e: "Costo de oportunidad de una tonelada de grano: X renuncia a 0.5 tela y Y renuncia a 0.25. Y tiene el menor costo de oportunidad en grano, así que posee la ventaja comparativa en grano, y X la tiene en tela (2 granos frente a 4). X tiene ventaja absoluta en ambos bienes, pero la ventaja comparativa depende del costo de oportunidad, no de producir más.",
      d: 3,
      tag: "comparative advantage"
    }
  ]
};
