# Human authorship with AI (Week 2 lecture and Toolkit 6.7)

Contents: what slop is, why AI produces it, Drive-Shape-Own, the 4D framework applied to an assignment, working practices and guardrails, using AI to learn, prompt patterns, record and declaration, evidence the lecturers show.

## Evidence-based writing versus AI slop

- **Evidence-based writing**: a verifiable connection runs between evidence and argument. A reader can look up the cited sources and check how the argument was derived from reading them.
- **AI slop**: the connection is absent, too vague or misconstrued. Typical signs: much of the argument lacks support; the logic linking sources to argument is flimsy or obscure; inaccuracies such as conflated terms, truncated lists, and cited sources that do not say what is claimed.
- The Week 2 deck shows a 2025 student paragraph on tacit knowledge. Its giveaways: a source's key term ("situated") dropped from a definition, citations that could not be matched, conclusions stated more strongly than the evidence allows. The lecturer ran the paragraph through a model, which first praised it and then, under pressure, produced a harsh verdict. Both verdicts came without reading the sources.
- "Grown-ups" produce slop too: headlines on the slide cite PwC, Deloitte (refund for an error-ridden Australian government report), EY (retracted study) and KPMG (report with fabricated case studies).

## Why AI produces slop

- A large language model stitches together sequences of linguistic forms according to probabilities, "without any reference to meaning: a stochastic parrot" (Bender et al., 2021, pp. 616-7).
- It gives probabilistic approximations. It does not read, understand or reason as a human would, including about its own output.
- It has no direct access to most paywalled research and will still produce confident text about it.
- It is tuned to please and to keep the user engaged.
- The lecture's list of what an LLM is not: an expert, factual or truthful; intelligent, critical or logical; creative or original; balanced, reasonable or unbiased.

## Be the author: Drive, Shape, Own

- **Drive**: give detailed, purposeful initial and ongoing input.
- **Shape**: improve and develop the text across multiple iterations and drafts.
- **Own**: check and vouch for every bit of the text before submission.

## 4D AI Fluency framework (Dakan and Feller, 2025) applied to an assignment

| D | Meaning | In an assignment |
|---|---|---|
| Delegation | Decide when and how to use AI | Plan the steps of writing. Which steps involve AI, which stay human, why, which tool and why |
| Description | Prompt the AI | Plan the prompting strategy, state what you are and are not aiming for, give context from the start |
| Discernment | Evaluate the output | Scrutinise each output. Identify and read each cited source: quality, valid citation, logical and well supported argument derived from the sources. Revisit the prompt |
| Diligence | Take responsibility | Keep a record of all interactions with AI. Be clear and transparent in the AI declaration |

Slide mapping: Delegation and Description sit under Drive; Description and Discernment under Shape; Discernment and Diligence under Own. Two loops: Description with Discernment (prompt, evaluate), Delegation with Diligence (decide, take responsibility). The course the lecturer points to: Anthropic Academy, "AI fluency for students" (academy.claude.com/courses/ai-fluency-for-students).

## Working practices from the lecture

1. Break broad tasks into small, specific steps, small enough that the student can give adequate input and scrutinise the output.
2. Long interactions produce the best outcomes. Start early and explore bit by bit over days or weeks.
3. Build guardrails to push back and stay in control:
   - pace the AI: one question and one output at a time;
   - acknowledge input neutrally, without praise;
   - make no suggestions beyond what is explicitly requested;
   - never generate full answers; help think through topics and issues.
4. Check everything at the source. Assume everything AI gives is an inaccurate approximation with errors big and small.

### Guardrail block the student can paste into other AI tools (this skill applies it to itself only in coach mode)

> I am a first-year business student. Work as my coach. Ask one question at a time and wait for my answer. Acknowledge my input in a neutral tone. Offer suggestions only on what I ask. Leave full answers to me and help me think through the topic. Ask me questions until you have enough information to help. Tell me where you are unsure and which claims I must check at the source.

Claude follows this block when the student turns coach mode on. Otherwise Claude delivers full results in one message.

## Using AI to learn (Toolkit 6.7)

First decide whether AI is the right tool. General chatbots are weak at calculations; a specialised system may suit better, and it may not be AI. Tools change quickly, so the principles matter more than any tool guide.

Many people treat AI like a search engine. Chatbots shine in dialogue. Uses the toolkit demonstrates (details and prompts in `wbs/study-modes.md`):

- coach: the AI asks questions, the student answers, the AI gives feedback and a follow-up that builds on the answer;
- brainstorm after thinking alone first, then ask for feedback; refine and research further before settling an outline;
- reflect after a class with the AI as a mentor, one question at a time;
- explain a term with an analogy, after stating background and field;
- teach the AI: the AI plays a student who asks clarifying questions; difficulty in explaining signals a gap to revisit in the textbook;
- generate multiple-choice questions one at a time (quick check of grasp; it does not prepare for structuring arguments, so use it as a supplement).

In all of them: think critically, check textbook or lecture notes, ask the tutor when unsure. AI supplements tutors and lecturers.

## Prompt patterns (Toolkit 6.7)

- **Context**: "I am an MBA student studying Finance. Please explain arbitrage with an analogy."
- **Persona**: "You are my mentor. I am a student at a business school and I would like you to help me reflect on today's seminar."
- **Specificity**: "Generate 3 MCQs, one at a time. Wait for me to answer, then ask me the next one. When I have answered all, tell me how many I got correct and give me feedback."
- **Flipped interaction**: "Ask me questions one at a time until you have enough information, then produce a study plan."
- **Gameplay**: "Let's play a role-play game. I am a CEO at an SME; you present a scenario and play the key protagonist."
- Custom instructions in some tools can store how the student likes to be coached.

## Record and declaration

- Keep a record of all interactions with AI in `wbs/templates/ai-interaction-log.md`: date, tool and version, purpose, the prompt, what came back in one line, what the student accepted or rejected and why, and how it was verified.
- Write the AI declaration from the log with `wbs/templates/ai-declaration-draft.md`. Use the module's official form if one exists, since the form sets the required content.
- Be transparent. The declaration protects the student when slop checks occur.

## What Claude does under this reference

- Produce the AI use note and log entry (`wbs/templates/ai-interaction-log.md`, `wbs/templates/ai-declaration-draft.md`) for every assessed deliverable, written from what happened in the session, so the student pastes it into the module's declaration form.
- Cover the 4D steps inside the deliverable: say which steps used AI (Delegation), the prompts and context (Description), the checks made on sources and claims (Discernment) and the record kept (Diligence).
- When the student pastes AI output from another tool for review, run the review protocol in `wbs/writing-and-argument.md` and report on every citation.
