# Estudio CFA Nivel I (local)

App web que funciona sin internet y sin servidor. Abre `index.html` en tu navegador.

## Qué incluye

- **Panel:** días para tu examen, preguntas vistas, aciertos, racha y aciertos ponderados por el peso de cada tema.
- **Estudiar:** resumen y fórmulas por tema, con términos clave en inglés.
- **Tarjetas:** repaso espaciado con cinco cajas (intervalos de 0, 1, 3, 7 y 16 días).
- **Práctica:** por tema, dificultad y estado (nuevas o falladas), con explicación inmediata.
- **Simulador:** mini (30 preguntas), una sesión (hasta 90, 135 minutos) o examen completo (dos sesiones). Preguntas de tres opciones, cronómetro, marcas para revisar, selección según los pesos del examen y revisión al final.
- **Historial y ajustes:** resultados de simuladores, exportar e importar progreso.

## Estructura

```
cfa-local/
  index.html
  styles.css
  app.js
  data/
    meta.js          temas, pesos y formato del examen
    <tema>.js        contenido por tema: resumen, fórmulas, tarjetas y preguntas
```

El progreso se guarda en `localStorage` del navegador. Exporta una copia desde Ajustes.

## Sobre el contenido

Todo el material de estudio es original y sigue la estructura pública del examen (temas, pesos, formato). No es material oficial del CFA Institute, no reproduce su currículo ni sus preguntas, y puede contener errores. Para el examen real usa el currículo oficial que incluye tu inscripción. No existe una nota mínima oficial publicada, por eso la referencia de 70 % de la app es orientativa.

## Agregar contenido propio

Crea o edita `data/<tema>.js` con este formato:

```js
window.CFA_CONTENT = window.CFA_CONTENT || {};
window.CFA_CONTENT["quant"] = {
  resumen:  [ { titulo: "…", puntos: ["…"] } ],
  formulas: [ { nombre: "…", formula: "…", nota: "…" } ],
  tarjetas: [ { f: "anverso", b: "reverso" } ],
  preguntas: [ { id: "quant-01", q: "…", o: ["A", "B", "C"], c: 1, e: "explicación", d: 2, tag: "TVM" } ]
};
```

`c` es el índice de la opción correcta (0 a 2) y `d` la dificultad (1 a 3).
