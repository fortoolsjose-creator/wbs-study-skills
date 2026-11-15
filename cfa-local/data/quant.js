window.CFA_CONTENT = window.CFA_CONTENT || {};
window.CFA_CONTENT["quant"] = {
  resumen: [
    {
      titulo: "Valor del dinero en el tiempo (TVM)",
      puntos: [
        "El valor futuro (FV) crece con la tasa por periodo y el número de periodos de capitalización: FV = PV × (1 + r/m)^(m×N). Siempre convierte años a periodos antes de calcular.",
        "La tasa efectiva anual (EAR, effective annual rate) es mayor que la nominal (stated annual rate) cuando se capitaliza más de una vez al año; con capitalización continua, EAR = e^r − 1.",
        "Una anualidad ordinaria (ordinary annuity) paga al final de cada periodo; una anualidad anticipada (annuity due) paga al inicio y vale (1 + r) veces más.",
        "Una perpetuidad (perpetuity) vale PMT / r un periodo antes del primer pago; si el primer pago está lejos, hay que descontar ese valor los periodos restantes.",
        "En una calculadora financiera: verifica el modo END/BEGIN, el signo de PV y FV, y que N, I/Y y PMT usen la misma frecuencia."
      ]
    },
    {
      titulo: "Flujos descontados: NPV e IRR",
      puntos: [
        "El valor presente neto (NPV) es la suma de los flujos descontados al costo de capital menos la inversión inicial; NPV > 0 crea valor para el accionista.",
        "La tasa interna de retorno (IRR) es la tasa que hace NPV = 0; se acepta el proyecto si IRR supera el costo de capital.",
        "Con proyectos mutuamente excluyentes y rankings contradictorios (por escala o patrón temporal de flujos), prevalece el NPV porque mide la riqueza añadida en unidades monetarias.",
        "Flujos con signos que cambian más de una vez pueden producir varias IRR o ninguna; el NPV no tiene ese problema.",
        "El periodo de recuperación (payback) ignora los flujos posteriores y, en su versión simple, el valor del dinero en el tiempo."
      ]
    },
    {
      titulo: "Medidas de rendimiento",
      puntos: [
        "Rendimiento del periodo de tenencia (HPR) = (P1 − P0 + flujos intermedios) / P0.",
        "La media aritmética sirve para estimar el rendimiento esperado de un solo periodo; la media geométrica (geometric mean) describe el crecimiento compuesto real y siempre es menor o igual que la aritmética.",
        "El rendimiento ponderado por tiempo (time-weighted return, TWR) encadena rendimientos de subperiodos y no se ve afectado por el momento de aportes y retiros; es el estándar para evaluar al gestor.",
        "El rendimiento ponderado por dinero (money-weighted return, MWR) es la IRR de los flujos del inversionista y sí refleja el momento de los aportes.",
        "El rendimiento continuamente compuesto es ln(P1/P0); es aditivo entre periodos, y es la base del modelo lognormal de precios."
      ]
    },
    {
      titulo: "Estadística descriptiva",
      puntos: [
        "Media, mediana y moda describen la tendencia central; en una distribución con sesgo positivo (positive skew) se cumple moda < mediana < media.",
        "La varianza muestral divide entre n − 1 (no n) para que sea un estimador insesgado; la desviación estándar es su raíz cuadrada.",
        "El coeficiente de variación (CV = s / media) permite comparar dispersión entre activos con distinta escala.",
        "La curtosis excesiva positiva (leptokurtic) implica colas más gruesas que la normal: más probabilidad de resultados extremos.",
        "Los cuantiles (cuartiles, deciles) y el rango intercuartil resisten mejor a los valores atípicos que el rango."
      ]
    },
    {
      titulo: "Probabilidad",
      puntos: [
        "El valor esperado es el promedio ponderado por probabilidades: E(X) = Σ p_i × x_i; la varianza pondera las desviaciones al cuadrado.",
        "Teorema de Bayes: P(A|S) = P(S|A) × P(A) / P(S), donde P(S) se obtiene con la ley de probabilidad total.",
        "La covarianza indica si dos variables se mueven juntas, pero su magnitud depende de las unidades; la correlación (ρ = Cov / (σ1 σ2)) está acotada entre −1 y +1.",
        "Para dos activos, la varianza del portafolio es w1²σ1² + w2²σ2² + 2 w1 w2 σ1 σ2 ρ; menor correlación implica mayor diversificación.",
        "Eventos independientes: P(A y B) = P(A) × P(B); mutuamente excluyentes no es lo mismo que independientes."
      ]
    },
    {
      titulo: "Distribuciones y muestreo",
      puntos: [
        "La normal queda definida por media y desviación estándar; el z-score = (x − μ) / σ lo lleva a la normal estándar.",
        "Regla práctica: ≈68 % de los datos a ±1σ, ≈90 % a ±1.645σ, ≈95 % a ±1.96σ y ≈99 % a ±2.58σ.",
        "El criterio de seguridad primero (safety-first ratio, SFRatio) = (E(R) − R_mínimo) / σ; se prefiere el portafolio con el mayor ratio.",
        "Si los rendimientos continuos son normales, el precio sigue una distribución lognormal (nunca negativa y con sesgo positivo).",
        "El teorema del límite central (CLT) dice que la media muestral es aproximadamente normal con error estándar σ/√n si n es grande, sea cual sea la población."
      ]
    },
    {
      titulo: "Intervalos de confianza y pruebas de hipótesis",
      puntos: [
        "Intervalo de confianza = estimación puntual ± (valor crítico × error estándar); usa z con σ conocida o n grande, y t con σ desconocida (n − 1 grados de libertad).",
        "Pasos de una prueba: plantear H0 y Ha, elegir el nivel de significancia α, calcular el estadístico, compararlo con el valor crítico y decidir.",
        "Error Tipo I = rechazar una H0 verdadera (probabilidad α); Error Tipo II = no rechazar una H0 falsa (probabilidad β); la potencia es 1 − β.",
        "Si el p-value es menor que α se rechaza H0; el p-value es el menor nivel de significancia al que se rechazaría.",
        "Reducir α disminuye el riesgo de Error Tipo I pero aumenta el de Tipo II con la misma muestra; solo una muestra mayor mejora ambos."
      ]
    },
    {
      titulo: "Regresión lineal simple, machine learning y big data",
      puntos: [
        "En Y = b0 + b1 X + ε, la pendiente es b1 = Cov(X,Y) / Var(X) y el intercepto es b0 = Ȳ − b1 X̄; la recta siempre pasa por (X̄, Ȳ).",
        "R² = proporción de la variación de Y explicada por X; en regresión simple, R² = r². El error estándar de la estimación mide la dispersión de los residuos.",
        "Supuestos clave: linealidad, homocedasticidad, independencia de residuos y normalidad de errores; su violación afecta la inferencia sobre los coeficientes.",
        "Aprendizaje supervisado (supervised): hay variable objetivo; no supervisado (unsupervised): se buscan estructuras, como clústeres, sin etiquetas.",
        "Sobreajuste (overfitting) = excelente en entrenamiento, pobre en datos nuevos; se combate con validación cruzada y modelos más simples. Big data se describe con volumen, velocidad, variedad y veracidad."
      ]
    }
  ],
  formulas: [
    {
      nombre: "Valor futuro con capitalización",
      formula: "FV = PV × (1 + r/m)^(m×N);  continua: FV = PV × e^(r×N)",
      nota: "m = capitalizaciones por año. Error común: usar N en años con la tasa por periodo, o la tasa nominal sin dividir entre m."
    },
    {
      nombre: "Tasa efectiva anual (EAR)",
      formula: "EAR = (1 + r_nominal/m)^m − 1;  continua: EAR = e^r − 1",
      nota: "Sirve para comparar ofertas con distinta frecuencia de capitalización. Error común: comparar tasas nominales directamente."
    },
    {
      nombre: "PV de una anualidad ordinaria",
      formula: "PV = PMT × [1 − (1 + r)^(−N)] / r",
      nota: "Pagos al final del periodo. Para anualidad anticipada multiplica el resultado por (1 + r). Error común: olvidar el modo BEGIN."
    },
    {
      nombre: "PV de una perpetuidad",
      formula: "PV = PMT / r  (un periodo antes del primer pago)",
      nota: "Si el primer pago ocurre en t = k, el valor PMT/r está en t = k − 1 y hay que descontarlo k − 1 periodos más."
    },
    {
      nombre: "Valor presente neto (NPV)",
      formula: "NPV = Σ CF_t / (1 + r)^t − CF_0,  t = 1…N",
      nota: "Acepta si NPV > 0. Error común: descontar el flujo del año 1 dos veces o ignorar el signo de la inversión inicial."
    },
    {
      nombre: "Media geométrica de rendimientos",
      formula: "R_G = [Π (1 + R_t)]^(1/N) − 1",
      nota: "Mide el crecimiento compuesto histórico. Siempre ≤ media aritmética; la brecha crece con la volatilidad."
    },
    {
      nombre: "Rendimiento ponderado por tiempo (TWR)",
      formula: "TWR = [(1 + R_1) × (1 + R_2) × … × (1 + R_n)] − 1;  anualizado = (1 + TWR)^(1/años) − 1",
      nota: "Cada R_i se mide justo antes de cada aporte o retiro. Error común: promediar aritméticamente los subperiodos."
    },
    {
      nombre: "Varianza y desviación estándar muestral",
      formula: "s² = Σ (X_i − X̄)² / (n − 1);  s = √s²",
      nota: "Usa n − 1 para muestras. Error común: dividir entre n (eso es la varianza poblacional) o reportar la varianza como si fuera desviación."
    },
    {
      nombre: "Teorema de Bayes",
      formula: "P(A|S) = P(S|A) × P(A) / [P(S|A) × P(A) + P(S|no A) × P(no A)]",
      nota: "El denominador es la probabilidad total de la señal. Error común: confundir P(S|A) con P(A|S) o ignorar el prior P(A)."
    },
    {
      nombre: "Correlación",
      formula: "ρ = Cov(X, Y) / (σ_X × σ_Y)",
      nota: "Adimensional entre −1 y +1. Error común: dividir solo entre una desviación estándar o usar varianzas en lugar de desviaciones."
    },
    {
      nombre: "Varianza de un portafolio de dos activos",
      formula: "σ_p² = w1² σ1² + w2² σ2² + 2 w1 w2 σ1 σ2 ρ12",
      nota: "σ_p es la raíz de la varianza. Error común: promediar las desviaciones con los pesos (solo es válido si ρ = 1)."
    },
    {
      nombre: "Safety-first ratio",
      formula: "SFRatio = (E(R_p) − R_L) / σ_p",
      nota: "R_L es el rendimiento mínimo aceptable. Gana el portafolio con mayor ratio (menor probabilidad de quedar por debajo). Error común: no restar R_L."
    },
    {
      nombre: "Intervalo de confianza y estadístico t",
      formula: "IC = X̄ ± z_(α/2) × σ/√n  (o t_(α/2, n−1) × s/√n);  t = (X̄ − μ0) / (s/√n)",
      nota: "Usa z con σ conocida; t con σ desconocida (gl = n − 1). Error común: usar σ o s en lugar del error estándar, es decir, olvidar dividir entre √n."
    },
    {
      nombre: "Pendiente e intercepto de la regresión simple",
      formula: "b1 = Cov(X, Y) / Var(X);  b0 = Ȳ − b1 × X̄",
      nota: "Para predecir: Ŷ = b0 + b1 X. Error común: usar Ȳ como intercepto o predecir fuera del rango de los datos."
    }
  ],
  tarjetas: [
    {
      f: "What is the NPV decision rule?",
      b: "Acepta el proyecto si el NPV (valor presente neto) es positivo, porque el rendimiento supera el costo de capital. Con proyectos mutuamente excluyentes se elige el de mayor NPV."
    },
    {
      f: "IRR (internal rate of return)",
      b: "Tasa de descuento que hace que el NPV sea cero. Puede ser engañosa con flujos no convencionales (varias IRR) y con rankings contradictorios frente al NPV."
    },
    {
      f: "Time-weighted vs. money-weighted return",
      b: "El TWR (time-weighted) elimina el efecto de aportes y retiros y evalúa al gestor; el MWR (money-weighted) es la IRR del inversionista y depende del momento de los flujos."
    },
    {
      f: "Positive skew: order of mean, median, mode",
      b: "Moda < mediana < media. La cola larga a la derecha jala la media hacia arriba; ocurre, por ejemplo, con rendimientos de opciones o ingresos de una población."
    },
    {
      f: "Leptokurtic distribution",
      b: "Curtosis excesiva positiva: pico más alto y colas más gruesas (fat tails) que la normal. Implica más riesgo de eventos extremos de lo que sugiere la desviación estándar."
    },
    {
      f: "Bayes' theorem in words",
      b: "Probabilidad posterior = verosimilitud × prior / probabilidad total de la evidencia. Sirve para actualizar creencias al observar una señal."
    },
    {
      f: "Central limit theorem (CLT)",
      b: "Para n grande, la media muestral es aproximadamente normal con media μ y error estándar σ/√n, aunque la población no sea normal."
    },
    {
      f: "Type I vs. Type II error",
      b: "Tipo I: rechazar una H0 verdadera (probabilidad α, nivel de significancia). Tipo II: no rechazar una H0 falsa (probabilidad β). Potencia = 1 − β."
    },
    {
      f: "How do you read a p-value?",
      b: "Es el menor nivel de significancia al que se rechazaría H0. Si p-value < α, se rechaza H0. No es la probabilidad de que H0 sea cierta."
    },
    {
      f: "R² in simple linear regression",
      b: "Fracción de la variación total de Y explicada por la regresión (SSR/SST). En regresión simple, R² es el cuadrado del coeficiente de correlación entre X e Y."
    },
    {
      f: "Supervised vs. unsupervised learning",
      b: "Supervisado: se entrena con datos etiquetados para predecir un objetivo (regresión, clasificación). No supervisado: encuentra estructura sin etiquetas (clustering, reducción de dimensión)."
    },
    {
      f: "The four Vs of big data",
      b: "Volume (volumen), velocity (velocidad), variety (variedad) y veracity (veracidad o calidad). Exigen técnicas especiales de almacenamiento, limpieza y análisis."
    }
  ],
  preguntas: [
    {
      id: "quant-01",
      q: "Marlow Tools invests 8,000 in an account that pays a stated annual rate of 12%, compounded quarterly. Assuming no withdrawals, the account balance after three years is closest to:",
      o: ["8,742", "11,239", "11,406"],
      c: 2,
      e: "Hay 3 × 4 = 12 periodos trimestrales con tasa de 12%/4 = 3% por periodo, así que FV = 8,000 × 1.03^12 = 11,406. La opción 11,239 usa capitalización anual (1.12^3), ignorando la frecuencia trimestral. La opción 8,742 usa solo 3 periodos (1.03^3): olvida convertir los años en trimestres.",
      d: 1,
      tag: "TVM"
    },
    {
      id: "quant-02",
      q: "A savings plan quotes a stated annual rate of 9% with monthly compounding. The effective annual rate is closest to:",
      o: ["9.00%", "9.31%", "9.38%"],
      c: 2,
      e: "EAR = (1 + 0.09/12)^12 − 1 = 1.0075^12 − 1 = 9.38%. La opción 9.00% es la tasa nominal sin efecto de capitalización; 9.31% corresponde a capitalización trimestral ((1.0225)^4 − 1), no mensual.",
      d: 1,
      tag: "TVM"
    },
    {
      id: "quant-03",
      q: "Brightwell Dairy will receive 1,200 at the end of each year for six years. Using a discount rate of 7%, the present value of these payments is closest to:",
      o: ["5,720", "6,120", "7,200"],
      c: 0,
      e: "Es una anualidad ordinaria: PV = 1,200 × [1 − 1.07^−6] / 0.07 = 1,200 × 4.7665 = 5,720. La opción 6,120 es el valor de una anualidad anticipada (5,720 × 1.07), que no aplica porque los pagos son al final del año. La opción 7,200 suma los pagos sin descontarlos.",
      d: 2,
      tag: "TVM"
    },
    {
      id: "quant-04",
      q: "A trust will pay a beneficiary 450 per year forever, with the first payment made four years from today. At a discount rate of 6%, the present value of the payment stream is closest to:",
      o: ["6,297", "7,075", "7,500"],
      c: 0,
      e: "La fórmula PMT/r da el valor un periodo antes del primer pago, es decir en t = 3: 450 / 0.06 = 7,500. Hay que descontar ese valor tres años: 7,500 / 1.06^3 = 6,297. La opción 7,500 no descuenta; la opción 7,075 descuenta solo un año, como si el primer pago fuera en t = 2.",
      d: 3,
      tag: "perpetuities"
    },
    {
      id: "quant-05",
      q: "A firm borrows 25,000 and repays it with 48 equal end-of-month payments. The stated annual rate is 6%, compounded monthly. The monthly payment is closest to:",
      o: ["587", "601", "646"],
      c: 0,
      e: "Con i = 0.06/12 = 0.5 % y N = 48, PMT = 25,000 × 0.005 / (1 − 1.005^−48) = 587. La opción 601 divide entre 12 el pago anual calculado con 6 % anual, ignorando la capitalización mensual. La opción 646 mezcla amortización lineal de principal (521) con el interés del primer mes (125), pero el pago nivelado no se calcula así.",
      d: 2,
      tag: "TVM"
    },
    {
      id: "quant-06",
      q: "Corvane Labs can invest 50,000 today in a project expected to return 18,000, 20,000 and 22,000 at the end of years 1, 2 and 3. With a required return of 10%, the project's net present value is closest to:",
      o: ["-579", "579", "10,000"],
      c: 0,
      e: "NPV = −50,000 + 18,000/1.10 + 20,000/1.10² + 22,000/1.10³ = −50,000 + 16,364 + 16,529 + 16,529 = −579, por lo que el proyecto destruye valor. La opción 579 invierte el signo. La opción 10,000 suma los flujos sin descontar (60,000 − 50,000), olvidando el valor del dinero en el tiempo.",
      d: 2,
      tag: "NPV"
    },
    {
      id: "quant-07",
      q: "Two mutually exclusive projects have conflicting rankings: Project P has the higher IRR, while Project Q has the higher NPV at the firm's cost of capital. The analyst should:",
      o: [
        "Select the project with the higher NPV",
        "Select the project with the higher IRR because it ignores project scale",
        "Average the two rankings and select the project with the better combined rank"
      ],
      c: 0,
      e: "Con proyectos mutuamente excluyentes, el NPV es el criterio correcto porque mide en unidades monetarias la riqueza que se añade al accionista. La IRR puede favorecer proyectos pequeños o de recuperación rápida y asume una reinversión implícita a la propia IRR. Promediar rankings no tiene fundamento económico.",
      d: 2,
      tag: "NPV vs IRR"
    },
    {
      id: "quant-08",
      q: "An investor buys a share for 40, receives a dividend of 1.20 during the year, and sells the share for 43. The holding period return is closest to:",
      o: ["7.5%", "9.8%", "10.5%"],
      c: 2,
      e: "HPR = (43 − 40 + 1.20) / 40 = 4.20 / 40 = 10.5 %. La opción 7.5 % omite el dividendo. La opción 9.8 % divide la ganancia total entre el precio final (4.20 / 43) en lugar del precio inicial.",
      d: 1,
      tag: "returns"
    },
    {
      id: "quant-09",
      q: "A fund reports annual returns of +12%, -8% and +20% over three consecutive years. The geometric mean annual return is closest to:",
      o: ["7.33%", "8.00%", "23.65%"],
      c: 0,
      e: "Media geométrica = (1.12 × 0.92 × 1.20)^(1/3) − 1 = 1.23648^(1/3) − 1 = 7.33 %. La opción 8.00 % es la media aritmética, que sobreestima el crecimiento compuesto. La opción 23.65 % es el rendimiento acumulado de los tres años, sin anualizar.",
      d: 1,
      tag: "returns"
    },
    {
      id: "quant-10",
      q: "A client opens an account with 100,000. At the end of year 1 the account is worth 130,000, and the client then adds 50,000. At the end of year 2 the account is worth 162,000. The annualized time-weighted return is closest to:",
      o: ["4.71%", "8.17%", "10.00%"],
      c: 1,
      e: "Subperiodo 1: 130,000/100,000 − 1 = +30 %. Subperiodo 2: 162,000/(130,000 + 50,000) − 1 = −10 %. TWR de dos años = 1.30 × 0.90 = 1.17, y anualizado = √1.17 − 1 = 8.17 %. La opción 10.00 % es el promedio aritmético; 4.71 % es el rendimiento ponderado por dinero (IRR de los flujos del cliente), que no es lo que se pide.",
      d: 3,
      tag: "time-weighted return"
    },
    {
      id: "quant-11",
      q: "An analyst records five monthly returns (in %): 4, 6, 9, 11 and 15. The sample standard deviation is closest to:",
      o: ["3.85", "4.30", "18.50"],
      c: 1,
      e: "La media es 9. Las desviaciones al cuadrado son 25, 9, 0, 4 y 36, que suman 74. Varianza muestral = 74 / (5 − 1) = 18.5 y desviación estándar = √18.5 = 4.30. La opción 3.85 divide entre n (varianza poblacional); la opción 18.50 es la varianza, no la desviación estándar.",
      d: 2,
      tag: "descriptive statistics"
    },
    {
      id: "quant-12",
      q: "A return distribution has a long right tail. The relationship among its measures of central tendency is most likely:",
      o: ["Mean < median < mode", "Mode < median < mean", "Mean = median = mode"],
      c: 1,
      e: "Una cola larga a la derecha indica sesgo positivo: los valores extremos altos jalan la media hacia arriba, de modo que moda < mediana < media. Mean < median < mode describe el sesgo negativo, y la igualdad de las tres medidas corresponde a una distribución simétrica unimodal.",
      d: 1,
      tag: "skewness"
    },
    {
      id: "quant-13",
      q: "Relative to a normal distribution, a return series with an excess kurtosis of +2.5 most likely has:",
      o: [
        "A larger mean than median",
        "Fatter tails than a normal distribution",
        "A flatter peak with thinner tails than normal"
      ],
      c: 1,
      e: "Una curtosis excesiva positiva (leptokurtic) indica colas más gruesas y pico más alto que la normal, es decir, mayor probabilidad de resultados extremos. La relación media-mediana depende del sesgo, no de la curtosis. Un pico más plano con colas delgadas corresponde a curtosis excesiva negativa (platykurtic).",
      d: 2,
      tag: "kurtosis"
    },
    {
      id: "quant-14",
      q: "An analyst assigns these scenarios for a stock's return next year: 20% probability of -5%, 50% probability of +6%, and 30% probability of +14%. The expected return is closest to:",
      o: ["5.0%", "6.2%", "14.0%"],
      c: 1,
      e: "E(R) = 0.20 × (−5) + 0.50 × 6 + 0.30 × 14 = −1.0 + 3.0 + 4.2 = 6.2 %. La opción 5.0 % es el promedio simple de los tres rendimientos, que ignora las probabilidades. La opción 14.0 % es el mejor escenario, no el valor esperado.",
      d: 1,
      tag: "expected value"
    },
    {
      id: "quant-15",
      q: "A screening model flags a loan as risky. Historically, 20% of loans are risky. The model flags 70% of risky loans and also flags 10% of non-risky loans. Given that a loan is flagged, the probability it is actually risky is closest to:",
      o: ["63.6%", "70.0%", "87.5%"],
      c: 0,
      e: "P(flag) = 0.20 × 0.70 + 0.80 × 0.10 = 0.14 + 0.08 = 0.22. Por Bayes, P(riesgoso|flag) = 0.14 / 0.22 = 63.6 %. La opción 70.0 % es P(flag|riesgoso), la probabilidad condicional invertida. La opción 87.5 % (0.70 / 0.80) compara las tasas de detección ignorando la probabilidad previa de 20 %.",
      d: 3,
      tag: "Bayes"
    },
    {
      id: "quant-16",
      q: "Two assets have a covariance of returns of 0.0018. Their standard deviations are 6% and 5%. The correlation between the assets is closest to:",
      o: ["0.03", "0.04", "0.60"],
      c: 2,
      e: "ρ = Cov / (σ1 × σ2) = 0.0018 / (0.06 × 0.05) = 0.0018 / 0.0030 = 0.60. Las opciones 0.03 y 0.04 resultan de dividir la covarianza entre una sola desviación estándar (0.06 o 0.05), olvidando el producto de ambas.",
      d: 1,
      tag: "correlation"
    },
    {
      id: "quant-17",
      q: "A portfolio holds 60% in Asset X (standard deviation 20%) and 40% in Asset Y (standard deviation 10%). The correlation between X and Y is 0.30. The portfolio standard deviation is closest to:",
      o: ["12.6%", "13.7%", "16.0%"],
      c: 1,
      e: "Varianza = (0.6 × 0.20)² + (0.4 × 0.10)² + 2 × 0.6 × 0.4 × 0.20 × 0.10 × 0.30 = 0.0144 + 0.0016 + 0.00288 = 0.01888, y su raíz es 13.7 %. La opción 16.0 % es el promedio ponderado de las desviaciones (válido solo con ρ = 1). La opción 12.6 % supone correlación cero y omite el término de covarianza.",
      d: 3,
      tag: "portfolio variance"
    },
    {
      id: "quant-18",
      q: "A portfolio has an expected return of 10% and a standard deviation of 16%. The investor requires a minimum return of 4%. The safety-first ratio is closest to:",
      o: ["0.250", "0.375", "0.625"],
      c: 1,
      e: "SFRatio = (E(R) − R_L) / σ = (10 − 4) / 16 = 0.375. La opción 0.625 no resta el rendimiento mínimo (10 / 16), lo que lo convierte en una relación rendimiento-riesgo sin umbral. La opción 0.250 divide solo el umbral entre la desviación (4 / 16).",
      d: 2,
      tag: "safety-first"
    },
    {
      id: "quant-19",
      q: "A stock's price rises from 45 to 52 over six months, with no dividends. Assuming the same continuously compounded return in each half-year, the annualized continuously compounded return is closest to:",
      o: ["14.46%", "15.56%", "28.92%"],
      c: 2,
      e: "El rendimiento continuo de seis meses es ln(52/45) = 14.46 %. Anualizado, se duplica porque los rendimientos continuos son aditivos: 2 × 14.46 % = 28.92 %. La opción 14.46 % no está anualizada. La opción 15.56 % es el rendimiento simple del semestre (7/45), no el continuo.",
      d: 3,
      tag: "continuous compounding"
    },
    {
      id: "quant-20",
      q: "A machine learning model achieves near-perfect accuracy on its training data but performs poorly on new data. The most likely explanation is:",
      o: [
        "Underfitting of the training data",
        "A model with excessive bias error",
        "Overfitting to noise in the training data"
      ],
      c: 2,
      e: "Un modelo que se ajusta incluso al ruido de la muestra de entrenamiento (overfitting) tiene alta varianza y no generaliza. El underfitting y el error de sesgo alto producen mal desempeño también en el entrenamiento, no solo en datos nuevos. Se mitiga con validación cruzada, regularización o un modelo más simple.",
      d: 2,
      tag: "machine learning"
    },
    {
      id: "quant-21",
      q: "A sample of 64 observations has a mean of 12. The population standard deviation is known to be 8. The upper limit of a 95% confidence interval for the population mean is closest to:",
      o: ["12.25", "13.65", "13.96"],
      c: 2,
      e: "Error estándar = 8 / √64 = 1. Con σ conocida se usa z = 1.96: límite superior = 12 + 1.96 × 1 = 13.96. La opción 13.65 usa 1.645, que corresponde a 90 % de confianza bilateral. La opción 12.25 divide entre n (64) en vez de √n, subestimando el error estándar.",
      d: 2,
      tag: "confidence intervals"
    },
    {
      id: "quant-22",
      q: "An analyst tests whether a mean monthly return differs from 6.0%. A sample of 36 months gives a mean of 7.2% and a standard deviation of 4.5%. The test statistic is closest to:",
      o: ["0.27", "1.60", "9.60"],
      c: 1,
      e: "Error estándar = s/√n = 4.5/6 = 0.75, así que t = (7.2 − 6.0) / 0.75 = 1.60. La opción 0.27 omite el denominador √n (1.2 / 4.5). La opción 9.60 divide s entre n en lugar de √n. Con 35 grados de libertad el valor crítico bilateral al 5 % es cercano a 2.03, de modo que no se rechazaría H0.",
      d: 2,
      tag: "hypothesis testing"
    },
    {
      id: "quant-23",
      q: "An analyst lowers the significance level of a test from 5% to 1% while keeping the sample size unchanged. The most likely result is:",
      o: [
        "Higher power of the test",
        "A higher chance of a Type I error",
        "A higher chance of a Type II error"
      ],
      c: 2,
      e: "Reducir α hace más difícil rechazar H0, lo que disminuye la probabilidad de Error Tipo I pero aumenta la de Error Tipo II (β) y reduce la potencia (1 − β). Para mejorar ambos errores a la vez se necesita una muestra mayor.",
      d: 2,
      tag: "hypothesis testing"
    },
    {
      id: "quant-24",
      q: "In a simple regression of Y on X, Cov(X, Y) = 18, Var(X) = 12, the mean of X is 4 and the mean of Y is 10. The predicted value of Y when X = 6 is closest to:",
      o: ["13", "19", "25"],
      c: 0,
      e: "Pendiente b1 = 18/12 = 1.5; intercepto b0 = 10 − 1.5 × 4 = 4. Predicción: 4 + 1.5 × 6 = 13. La opción 19 usa la media de Y (10) como intercepto: 10 + 1.5 × 6. La opción 25 calcula mal el intercepto como Ȳ + b1 X̄ = 16 y le suma 1.5 × 6.",
      d: 2,
      tag: "regression"
    }
  ]
};
