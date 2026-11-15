window.CFA_CONTENT = window.CFA_CONTENT || {};
window.CFA_CONTENT["portfolio"] = {
  resumen: [
    {
      titulo: "Riesgo, retorno y aversión al riesgo",
      puntos: [
        "El retorno esperado compensa el riesgo asumido; un inversor averso al riesgo (risk-averse) exige más retorno por cada unidad adicional de riesgo.",
        "Las curvas de indiferencia (indifference curves) en el plano retorno esperado-desviación estándar tienen pendiente positiva; cuanto más averso es el inversor, más empinadas son.",
        "El riesgo se mide con la varianza o la desviación estándar (standard deviation); el retorno de un portafolio es el promedio ponderado de los retornos de sus activos.",
        "Un inversor neutral al riesgo (risk-neutral) solo mira el retorno esperado; uno que busca riesgo (risk-seeking) acepta menor retorno por más varianza.",
        "El rendimiento histórico no garantiza el futuro: todo cálculo de esta sección usa retornos esperados (ex ante)."
      ]
    },
    {
      titulo: "Diversificación y correlación",
      puntos: [
        "La covarianza mide cómo se mueven juntos dos retornos; la correlación (rho) la estandariza entre -1 y +1.",
        "La varianza del portafolio incluye el término de covarianza: 2 w1 w2 rho s1 s2. Menor correlación implica menor riesgo del portafolio.",
        "Con rho = +1 no hay beneficio de diversificación: la desviación estándar es el promedio ponderado. Con rho < 1 siempre hay beneficio.",
        "Al añadir activos se elimina el riesgo específico (diversifiable), pero el riesgo de mercado permanece; los beneficios decrecen rápido tras unas decenas de títulos.",
        "En crisis las correlaciones tienden a subir, de modo que el beneficio de diversificación puede ser menor justo cuando más se necesita."
      ]
    },
    {
      titulo: "Frontera eficiente, CAL y CML",
      puntos: [
        "La frontera de mínima varianza (minimum-variance frontier) reúne los portafolios con menor riesgo para cada retorno; la frontera eficiente (efficient frontier) es su tramo desde el portafolio de mínima varianza global hacia arriba.",
        "Al añadir un activo libre de riesgo, la línea de asignación de capital (CAL) parte de la tasa libre de riesgo y es tangente a la frontera en el portafolio óptimo de activos riesgosos.",
        "Si todos los inversores comparten expectativas homogéneas, la tangente es el portafolio de mercado y la CAL pasa a llamarse línea del mercado de capitales (CML).",
        "Sobre la CML: E(Rp) = Rf + [(E(Rm) - Rf)/sigma_m] x sigma_p; la pendiente es el Sharpe del portafolio de mercado.",
        "Invertir más del 100% en el portafolio riesgoso implica apalancamiento (tomar prestado a Rf) y aumenta tanto retorno esperado como riesgo.",
        "Teorema de separación: la elección del portafolio riesgoso es igual para todos; el apetito de riesgo solo decide la mezcla con el activo libre de riesgo."
      ]
    },
    {
      titulo: "CAPM, SML y tipos de riesgo",
      puntos: [
        "Riesgo total = riesgo sistemático (systematic, de mercado, no diversificable) + riesgo no sistemático (unsystematic, específico, diversificable).",
        "El mercado solo remunera el riesgo sistemático, medido por la beta: beta = Cov(i,m) / Var(m).",
        "CAPM / SML: E(Ri) = Rf + beta x [E(Rm) - Rf]. Un título que se ubica sobre la SML está subvaluado (alfa positivo); bajo la SML, sobrevaluado.",
        "La SML grafica retorno contra beta (riesgo sistemático); la CML grafica retorno contra desviación estándar (riesgo total) y solo aplica a portafolios eficientes.",
        "Supuestos del CAPM: expectativas homogéneas, mercados sin fricciones, inversores que buscan eficiencia media-varianza y una sola tasa libre de riesgo."
      ]
    },
    {
      titulo: "Medidas de desempeño ajustadas por riesgo",
      puntos: [
        "Sharpe = (Rp - Rf) / sigma_p: exceso de retorno por unidad de riesgo total; es la pendiente de la CAL del portafolio.",
        "Treynor = (Rp - Rf) / beta_p: exceso de retorno por unidad de riesgo sistemático; apropiado para un portafolio que es una parte de uno mayor bien diversificado.",
        "Alfa (alpha) = retorno esperado o realizado menos retorno requerido por la SML; mide valor agregado o mal precio.",
        "Para comparar portafolios con distinta volatilidad se prefiere la medida que escale por riesgo, no el retorno bruto más alto.",
        "Más retorno absoluto no implica mejor Sharpe: un portafolio de mayor retorno puede tener peor retorno por unidad de riesgo."
      ]
    },
    {
      titulo: "Planificación de portafolios e IPS",
      puntos: [
        "El proceso de gestión: planificación (identificar objetivos y restricciones, redactar la IPS), ejecución (asignación de activos y selección) y retroalimentación (monitoreo, rebalanceo, evaluación).",
        "La Investment Policy Statement (IPS) documenta objetivos de retorno y de riesgo, y las restricciones: liquidez (liquidity), horizonte temporal (time horizon), impuestos (taxes), legales y regulatorias, y circunstancias únicas (unique).",
        "Riesgo del cliente = capacidad para asumir riesgo (ability) y disposición (willingness). Si difieren, manda el menor de los dos.",
        "Los objetivos pueden ser absolutos (retorno requerido) o relativos (contra un benchmark); el riesgo se define con límites de volatilidad, pérdida máxima o tracking error.",
        "La IPS se revisa cuando cambian las circunstancias del cliente o las condiciones de mercado."
      ]
    },
    {
      titulo: "Gestión activa y pasiva",
      puntos: [
        "Gestión pasiva (passive): replica un índice con bajo costo y baja rotación; gestión activa (active): busca alfa mediante selección de títulos y market timing, con mayores comisiones.",
        "En mercados muy eficientes es difícil que la gestión activa supere al benchmark después de costos; en segmentos menos eficientes hay más espacio.",
        "El enfoque núcleo-satélite (core-satellite) combina un núcleo pasivo de bajo costo con satélites activos en segmentos donde se cree tener ventaja.",
        "Tracking error mide la dispersión del retorno activo; el information ratio relaciona retorno activo con tracking error.",
        "Otras estrategias: smart beta / factores (value, size, momentum, calidad) y enfoques de gestión cuantitativa o de reglas."
      ]
    },
    {
      titulo: "Finanzas conductuales, ESG y fintech",
      puntos: [
        "Sesgos cognitivos (cognitive errors) provienen de procesos de razonamiento y se corrigen con mejor información: confirmación, representatividad, anclaje, disponibilidad, ilusión de control.",
        "Sesgos emocionales (emotional biases) surgen de impulsos o sentimientos y es difícil corregirlos, por lo que se acomodan en el plan: aversión a la pérdida (loss aversion), sobreconfianza, autocontrol, estatus quo, dotación (endowment).",
        "Efecto de disposición: vender ganadores pronto y mantener perdedores; es consecuencia de la aversión a la pérdida. El comportamiento de rebaño (herding) amplifica burbujas.",
        "Integración ESG: selección negativa (negative screening), best-in-class, inversión temática (thematic), engagement o propiedad activa, e inversión de impacto (impact).",
        "Fintech: robo-advisors (asesoría automatizada de bajo costo), machine learning y big data; riesgos de sobreajuste (overfitting), falta de interpretabilidad y calidad de datos."
      ]
    }
  ],
  formulas: [
    {
      nombre: "Retorno esperado del portafolio",
      formula: "E(Rp) = suma de wi x E(Ri)",
      nota: "Los pesos deben sumar 100%. Invertir los pesos es un error frecuente."
    },
    {
      nombre: "Varianza de dos activos",
      formula: "sigma_p^2 = w1^2 s1^2 + w2^2 s2^2 + 2 w1 w2 rho12 s1 s2",
      nota: "La desviación estándar es la raíz cuadrada. Omitir el último término sobreestima o subestima el riesgo."
    },
    {
      nombre: "Covarianza y correlación",
      formula: "rho12 = Cov(1,2) / (s1 x s2)",
      nota: "Divide entre el producto de desviaciones estándar, no entre una sola varianza."
    },
    {
      nombre: "Línea de asignación de capital (CAL)",
      formula: "E(Rc) = w x E(Rp) + (1 - w) x Rf ; sigma_c = w x sigma_p",
      nota: "w > 1 implica apalancamiento: el préstamo cuesta Rf y resta retorno."
    },
    {
      nombre: "Línea del mercado de capitales (CML)",
      formula: "E(Rp) = Rf + [(E(Rm) - Rf) / sigma_m] x sigma_p",
      nota: "Solo portafolios eficientes. La pendiente es la prima de riesgo por unidad de desviación estándar."
    },
    {
      nombre: "Ratio de Sharpe",
      formula: "Sharpe = (Rp - Rf) / sigma_p",
      nota: "Usa riesgo total. Se compara entre portafolios: mayor es mejor."
    },
    {
      nombre: "Beta",
      formula: "beta_i = Cov(i,m) / Var(m) = rho_im x s_i / s_m",
      nota: "Se divide entre la varianza del mercado, no entre su desviación estándar."
    },
    {
      nombre: "CAPM / SML",
      formula: "E(Ri) = Rf + beta_i x [E(Rm) - Rf]",
      nota: "Retorno requerido. Rf se suma una sola vez y la beta multiplica la prima de mercado."
    },
    {
      nombre: "Beta de un portafolio",
      formula: "beta_p = suma de wi x beta_i",
      nota: "El activo libre de riesgo tiene beta 0 y el mercado tiene beta 1."
    },
    {
      nombre: "Alfa (alpha)",
      formula: "alpha = E(R) pronosticado - [Rf + beta x (E(Rm) - Rf)]",
      nota: "Alfa positivo: sobre la SML, subvaluado. Alfa negativo: bajo la SML, sobrevaluado."
    },
    {
      nombre: "Ratio de Treynor",
      formula: "Treynor = (Rp - Rf) / beta_p",
      nota: "Usa riesgo sistemático; útil si el portafolio forma parte de uno mayor diversificado."
    },
    {
      nombre: "Descomposición del riesgo",
      formula: "sigma_i^2 = beta_i^2 x sigma_m^2 + sigma_e^2",
      nota: "Primer término: sistemático. Segundo: específico (diversificable)."
    }
  ],
  tarjetas: [
    {
      f: "Systematic vs. unsystematic risk: which one does the CAPM reward?",
      b: "Solo el riesgo sistemático (systematic risk), medido por la beta. El no sistemático (unsystematic, específico) se elimina diversificando y por eso no recibe prima."
    },
    {
      f: "What is the global minimum-variance portfolio?",
      b: "El portafolio de riesgo más bajo posible en la frontera de mínima varianza (minimum-variance frontier). La frontera eficiente (efficient frontier) comienza en él y sube."
    },
    {
      f: "CML vs. SML: what does each plot?",
      b: "La CML grafica retorno contra riesgo total (desviación estándar) y solo para portafolios eficientes. La SML grafica retorno contra beta (riesgo sistemático) y sirve para cualquier activo."
    },
    {
      f: "Sharpe ratio: formula and meaning",
      b: "(Rp - Rf) / sigma_p. Exceso de retorno por unidad de riesgo total (total risk); es la pendiente de la CAL. Se prefiere el portafolio con mayor Sharpe."
    },
    {
      f: "How is beta defined?",
      b: "Beta = Cov(i,m) / Var(m). Mide la sensibilidad del activo al mercado (systematic risk). Beta > 1 amplifica los movimientos del mercado; beta < 1 los atenúa."
    },
    {
      f: "What does a positive alpha mean on the SML?",
      b: "El retorno esperado supera al requerido por el CAPM: el título se ubica sobre la SML y está subvaluado (undervalued). Con alfa negativo, queda bajo la SML y está sobrevaluado (overvalued)."
    },
    {
      f: "Ability vs. willingness to take risk",
      b: "Ability: capacidad financiera objetiva (patrimonio, horizonte, necesidades). Willingness: actitud psicológica. Cuando difieren, la IPS adopta la menor de las dos."
    },
    {
      f: "IPS constraints (the five categories)",
      b: "Liquidity (necesidades de efectivo), time horizon, taxes, legal and regulatory, y unique circumstances. Junto con los objetivos de return y risk forman el contenido central de la IPS."
    },
    {
      f: "What is a core-satellite approach?",
      b: "Un núcleo pasivo (passive core) de bajo costo y varios satélites activos (active satellites) en segmentos menos eficientes. Equilibra costos y búsqueda de alfa."
    },
    {
      f: "Loss aversion and the disposition effect",
      b: "Loss aversion (sesgo emocional): las pérdidas duelen más que las ganancias equivalentes. Efecto de disposición: vender ganadores pronto y conservar perdedores esperando recuperar el costo."
    },
    {
      f: "Name the main approaches to ESG integration",
      b: "Negative screening (exclusión), best-in-class, thematic investing, engagement o active ownership (voto y diálogo con la empresa) e impact investing."
    },
    {
      f: "Robo-advisors and machine learning: main benefits and risks",
      b: "Robo-advisors: asesoría automatizada, bajo costo, perfil por cuestionario, rebalanceo y tax-loss harvesting; limitados en casos complejos. Machine learning: detecta patrones, pero hay riesgo de overfitting y baja interpretabilidad."
    }
  ],
  preguntas: [
    {
      id: "portfolio-01",
      q: "A portfolio is invested 60% in Asset A (expected return 10%) and 40% in Asset B (expected return 6%). What is the portfolio's expected return?",
      o: ["7.6%", "8.0%", "8.4%"],
      c: 2,
      e: "El retorno esperado es el promedio ponderado: 0.60 x 10% + 0.40 x 6% = 8.4%. El 8.0% resulta de promediar sin ponderar (50/50) y el 7.6% de invertir los pesos (40% en A y 60% en B).",
      d: 1,
      tag: "Portfolio expected return"
    },
    {
      id: "portfolio-02",
      q: "A portfolio holds 60% in Asset X (standard deviation 25%) and 40% in Asset Y (standard deviation 20%). The correlation between X and Y is -0.5. What is the portfolio's standard deviation?",
      o: ["13.0%", "17.0%", "23.0%"],
      c: 0,
      e: "Varianza = (0.6 x 25)^2 + (0.4 x 20)^2 + 2 x 0.6 x 0.4 x (-0.5) x 25 x 20 = 225 + 64 - 120 = 169, y su raíz es 13.0%. El 17.0% omite el término de covarianza (raíz de 289) y el 23.0% es el promedio ponderado de desviaciones, válido solo con correlación +1.",
      d: 2,
      tag: "Two-asset portfolio risk"
    },
    {
      id: "portfolio-03",
      q: "The covariance between the returns of Fund P and Fund Q is 0.012. Fund P has a standard deviation of 20% and Fund Q has a standard deviation of 30%. What is the correlation between the two funds?",
      o: ["0.13", "0.20", "0.30"],
      c: 1,
      e: "Correlación = covarianza / (sigma_P x sigma_Q) = 0.012 / (0.20 x 0.30) = 0.20. El 0.30 resulta de dividir solo entre la varianza de P (0.04) y el 0.13 de dividir solo entre la varianza de Q (0.09).",
      d: 1,
      tag: "Covariance and correlation"
    },
    {
      id: "portfolio-04",
      q: "The risk-free rate is 3%, the expected market return is 9%, and a stock has a beta of 1.2. According to the CAPM, what is the stock's required return?",
      o: ["10.2%", "10.8%", "13.8%"],
      c: 0,
      e: "CAPM: 3% + 1.2 x (9% - 3%) = 10.2%. El 10.8% multiplica la beta por el retorno de mercado completo sin sumar Rf, y el 13.8% suma Rf a beta x retorno de mercado en lugar de usar la prima de riesgo.",
      d: 1,
      tag: "CAPM required return"
    },
    {
      id: "portfolio-05",
      q: "The risk-free rate is 3%. Portfolio A has an expected return of 7% and a standard deviation of 9%. Portfolio B has 16% and 26%. Portfolio C has 12% and 14%. Which portfolio has the highest Sharpe ratio?",
      o: ["Portfolio A", "Portfolio B", "Portfolio C"],
      c: 2,
      e: "Sharpe = (R - Rf) / sigma: A = 4/9 = 0.44; B = 13/26 = 0.50; C = 9/14 = 0.64. Gana el portafolio C aunque no tiene ni el mayor retorno (B) ni el menor riesgo (A); el Sharpe mide exceso de retorno por unidad de riesgo total.",
      d: 2,
      tag: "Sharpe ratio comparison"
    },
    {
      id: "portfolio-06",
      q: "The risk-free rate is 3%, and the market portfolio has an expected return of 9% and a standard deviation of 12%. An investor holds an efficient portfolio on the capital market line with a standard deviation of 18%. What is its expected return?",
      o: ["9.0%", "12.0%", "13.5%"],
      c: 1,
      e: "La pendiente de la CML es (9% - 3%) / 12% = 0.5, por lo que E(Rp) = 3% + 0.5 x 18% = 12.0%. El 9.0% solo incluye la prima de riesgo y olvida sumar Rf; el 13.5% escala el retorno de mercado (9% x 18/12) en vez de la prima.",
      d: 2,
      tag: "Capital market line"
    },
    {
      id: "portfolio-07",
      q: "An analyst forecasts a return of 8.0% for Valdor Corp, which has a beta of 1.3. The risk-free rate is 3% and the expected market return is 9%. Which statement is correct?",
      o: [
        "It plots on the SML and is fairly priced",
        "It is overvalued, with an alpha of -2.8%",
        "It is undervalued, with an alpha of +2.8%"
      ],
      c: 1,
      e: "El retorno requerido es 3% + 1.3 x 6% = 10.8%. El pronóstico (8.0%) es menor, así que el alfa es -2.8% y el título queda bajo la SML: está sobrevaluado. Las otras opciones invierten el signo o ignoran la beta al juzgar si está en equilibrio.",
      d: 2,
      tag: "SML and alpha"
    },
    {
      id: "portfolio-08",
      q: "Stock Z has a covariance with the market of 0.036, and the market's standard deviation is 20%. The risk-free rate is 3% and the expected market return is 9%. What is the required return on Stock Z?",
      o: ["4.1%", "8.1%", "8.4%"],
      c: 2,
      e: "Beta = Cov / Var(m) = 0.036 / 0.04 = 0.90, y E(R) = 3% + 0.90 x 6% = 8.4%. El 4.1% divide entre la desviación estándar (beta 0.18) y el 8.1% multiplica la beta por el retorno de mercado omitiendo Rf.",
      d: 3,
      tag: "Beta and CAPM"
    },
    {
      id: "portfolio-09",
      q: "A portfolio holds 20% in Stock 1 (beta 0.6), 50% in Stock 2 (beta 1.0), and 30% in Stock 3 (beta 1.8). What is the portfolio's beta?",
      o: ["1.04", "1.13", "1.16"],
      c: 2,
      e: "La beta del portafolio es el promedio ponderado: 0.2 x 0.6 + 0.5 x 1.0 + 0.3 x 1.8 = 0.12 + 0.50 + 0.54 = 1.16. El 1.13 es el promedio simple de las tres betas y el 1.04 sale de aplicar los pesos en orden invertido.",
      d: 2,
      tag: "Portfolio beta"
    },
    {
      id: "portfolio-10",
      q: "In equilibrium under the CAPM, which type of risk earns a risk premium?",
      o: [
        "Systematic risk only",
        "Total risk, measured by standard deviation",
        "Unsystematic risk, because it cannot be diversified away"
      ],
      c: 0,
      e: "El CAPM remunera solo el riesgo sistemático (beta), porque el riesgo específico se elimina diversificando y los inversores no reciben prima por asumir lo evitable. El riesgo total incluye la parte diversificable, y el no sistemático sí puede diversificarse, así que la tercera opción es falsa.",
      d: 1,
      tag: "Systematic risk"
    },
    {
      id: "portfolio-11",
      q: "Compared with a moderately risk-averse investor, a highly risk-averse investor's indifference curves in expected return-standard deviation space are:",
      o: [
        "Flatter, requiring less return per unit of added risk",
        "Steeper, requiring more extra return per unit of added risk",
        "Vertical, because the investor ignores expected return entirely"
      ],
      c: 1,
      e: "Un inversor más averso al riesgo exige más retorno adicional por cada unidad de riesgo, por lo que sus curvas de indiferencia son más empinadas. Curvas más planas describen a quien tolera más riesgo, y una curva vertical implicaría indiferencia ante el retorno, lo que no describe aversión al riesgo.",
      d: 1,
      tag: "Risk aversion"
    },
    {
      id: "portfolio-12",
      q: "An investor with $100,000 borrows $30,000 at the 3% risk-free rate and invests $130,000 in a risky portfolio with an expected return of 11% and a standard deviation of 18%. What is the expected return on the investor's own capital?",
      o: ["13.4%", "14.3%", "15.2%"],
      c: 0,
      e: "Retorno = 1.3 x 11% - 0.3 x 3% = 14.3% - 0.9% = 13.4%. El 14.3% olvida el costo del préstamo y el 15.2% lo suma en lugar de restarlo. La desviación estándar sería 1.3 x 18% = 23.4%: el apalancamiento aumenta retorno y riesgo.",
      d: 2,
      tag: "Leveraged portfolio on the CAL"
    },
    {
      id: "portfolio-13",
      q: "Which statement about the efficient frontier is correct?",
      o: [
        "Every portfolio on the minimum-variance frontier is efficient",
        "The efficient frontier is the part below the global minimum-variance portfolio",
        "The efficient frontier is the part of the minimum-variance frontier from the global minimum-variance portfolio upward"
      ],
      c: 2,
      e: "La frontera eficiente es el tramo de la frontera de mínima varianza que parte del portafolio de mínima varianza global y sube, pues solo ahí cada riesgo ofrece el mayor retorno posible. Los puntos por debajo de ese portafolio tienen otro con igual riesgo y mayor retorno, así que no son eficientes.",
      d: 3,
      tag: "Efficient frontier"
    },
    {
      id: "portfolio-14",
      q: "A 58-year-old client says she is comfortable with large losses, but her pension is small and she needs the portfolio to fund her retirement in five years. Her risk tolerance in the IPS should be:",
      o: [
        "Low, because ability to bear risk governs",
        "High, because her willingness is what she reports",
        "Moderate, taking the average of willingness and ability"
      ],
      c: 0,
      e: "Cuando la disposición (willingness) es alta pero la capacidad (ability) es baja, la IPS adopta la menor de las dos: la tolerancia al riesgo es baja. Fijarla por la disposición pondría en peligro el objetivo de jubilación, y promediar ambos factores no es la regla del proceso de planificación.",
      d: 2,
      tag: "IPS risk tolerance"
    },
    {
      id: "portfolio-15",
      q: "A client must withdraw $60,000 in nine months to pay a tuition bill. Which IPS constraint does this best illustrate?",
      o: ["Tax", "Liquidity", "Legal and regulatory"],
      c: 1,
      e: "Una necesidad de efectivo conocida y cercana es una restricción de liquidez (liquidity): parte del portafolio debe mantenerse en activos fáciles de convertir en efectivo sin pérdida. No es una restricción fiscal ni legal, pues el enunciado no menciona impuestos ni normas.",
      d: 1,
      tag: "IPS constraints"
    },
    {
      id: "portfolio-16",
      q: "A pension plan believes large-cap equity markets are very efficient but that small-cap and emerging-market segments contain exploitable mispricing. Which portfolio structure fits this view?",
      o: [
        "Full active management of every segment",
        "A single low-cost index fund covering all segments",
        "Core-satellite, with a passive core and active satellites in inefficient segments"
      ],
      c: 2,
      e: "El enfoque núcleo-satélite (core-satellite) usa gestión pasiva donde el mercado es eficiente y gestión activa donde se cree haber ineficiencias. Gestionar activamente todo paga comisiones altas incluso en segmentos eficientes, y un solo fondo indexado ignora la creencia de que existen oportunidades en small caps y mercados emergentes.",
      d: 2,
      tag: "Active vs. passive"
    },
    {
      id: "portfolio-17",
      q: "An investor sells a stock that has risen 20% to lock in the gain, but keeps another stock that is down 25% hoping it recovers to its purchase price. This behavior is best explained by:",
      o: ["Loss aversion", "Availability bias", "Representativeness"],
      c: 0,
      e: "La aversión a la pérdida (loss aversion) hace que el inversor evite materializar pérdidas y se apure a asegurar ganancias; el resultado es el efecto de disposición. El sesgo de disponibilidad se basa en recuerdos fáciles de evocar y la representatividad en clasificar según parecidos con experiencias previas, ninguno explica esta conducta.",
      d: 2,
      tag: "Behavioral finance"
    },
    {
      id: "portfolio-18",
      q: "A client who owns a stock reads only analyst reports that support his position and dismisses contradicting data. This behavior is best described as:",
      o: [
        "An emotional bias that is best accommodated in the plan",
        "A cognitive error that can be reduced with better information",
        "A cognitive error that persists regardless of the information provided"
      ],
      c: 1,
      e: "Buscar solo evidencia favorable es sesgo de confirmación, un error cognitivo (cognitive error) que se origina en el razonamiento y puede reducirse con más información y análisis. Los sesgos emocionales provienen de impulsos y se acomodan en lugar de corregirse; afirmar que el error persiste con cualquier información contradice la naturaleza de los errores cognitivos.",
      d: 3,
      tag: "Cognitive vs. emotional bias"
    },
    {
      id: "portfolio-19",
      q: "A manager votes proxies and meets company management to press for stronger emissions targets and board diversity. Which ESG approach does this describe?",
      o: ["Active ownership", "Negative screening", "Best-in-class selection"],
      c: 0,
      e: "Votar y dialogar con la gerencia para influir en la empresa es engagement o propiedad activa (active ownership). La selección negativa excluye emisores o sectores sin dialogar con ellos, y best-in-class elige a los emisores con mejor puntaje ESG dentro de cada sector.",
      d: 2,
      tag: "ESG integration"
    },
    {
      id: "portfolio-20",
      q: "A fund uses a machine-learning model with 200 predictors trained on five years of monthly returns. Which risk is most relevant?",
      o: [
        "Higher transaction costs",
        "Overfitting to noise in the sample, leading to poor out-of-sample results",
        "Inability to use any unstructured data such as text, images, or satellite data"
      ],
      c: 1,
      e: "Con muchos predictores y una muestra corta (60 observaciones), el modelo puede ajustarse al ruido (overfitting) y fallar fuera de la muestra. Los costos de transacción dependen de la rotación, no del número de variables, y el machine learning sí puede procesar datos no estructurados.",
      d: 3,
      tag: "Fintech and machine learning"
    }
  ]
};
