# WBS study skills

Skill para Claude pensada para estudiantes de Warwick Business School (WBS). Combina un pipeline fuerte de investigación (búsqueda y verificación de fuentes reales, revisiones de literatura, verificación de afirmaciones) con lo que enseña y pide WBS en el módulo IB1450 Core: Foundations, Skills and Debates.

A Claude skill for Warwick Business School students. It combines a research pipeline (finding and verifying real sources, literature reviews, fact-checks) with what WBS teaches and expects in IB1450.

## Qué hace

- Busca fuentes académicas, abre la página de la revista o del índice para confirmar autores, año, DOI y resumen, y entrega un dossier con referencias en Harvard.
- Escribe bibliografías anotadas, ensayos, reportes y resúmenes ejecutivos, con una autoauditoría contra los criterios de "AI slop" que mencionan los profesores.
- Entrega con cada trabajo una nota de uso de IA lista para copiar al formulario de declaración.
- Trae el paquete de IB1450: proyecto grupal de sostenibilidad, juicio profesional, fundamentos de negocio, hábitos de participación.
- Otras materias se agregan llenando `skills/deep-research-wbs/wbs/templates/module-profile.md`.

## Instalación

Claude Code, con Node instalado:

```
npx skills add fortoolsjose-creator/wbs-study-skills@deep-research-wbs -g -y
```

Instalación manual en Claude Code: copia la carpeta `skills/deep-research-wbs` a `~/.claude/skills/`.

claude.ai: comprime la carpeta `deep-research-wbs` en un `.zip`, renómbralo a `.skill` y súbelo en Settings > Capabilities > Skills.

## Uso

Escribe lo que necesitas con tus palabras, por ejemplo:

- "Necesito 8 fuentes académicas en Harvard para la sección de evidencia, sector retail, al menos 2 en contra."
- "Revisa este párrafo y dime qué le falta."
- "Hazme preguntas para repasar tacit knowledge."

Pega la frase del brief que habla del uso de IA. Si el brief prohíbe la IA para ese trabajo, la skill solo explica conceptos y enseña la habilidad.

## Importante

- Revisa siempre el brief de cada trabajo y declara el uso de IA como pida tu módulo.
- Las herramientas de verificación dependen de tu entorno. Cuando no pueden abrir las páginas, la skill lo avisa y marca las referencias como pendientes de confirmar.
- El contenido de IB1450 resume materiales de clase. Los briefs y rúbricas oficiales mandan sobre esta skill.

## Licencia y créditos

El pipeline de investigación viene de Academic Research Skills de Cheng-I Wu (https://github.com/imbad0202/academic-research-skills), licencia CC BY-NC 4.0. Este repositorio es para uso no comercial. Ver `skills/deep-research-wbs/NOTICE`.
