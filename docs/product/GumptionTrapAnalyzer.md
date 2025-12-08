# The Gumption Trap Analyzer

## 1. Purpose

A small diagnostic that:

1. Starts from a specific stuck task.
2. Identifies the active gumption trap type.
3. Prescribes a tailored, 5 to 20 minute intervention.
4. Logs the episode so patterns emerge over time. 

Think of it as a crash cart for Quality when enthusiasm drops.

---

## 2. Data Model (if you were coding it)

Each **Session** stores:

* `timestamp`
* `context_area`

  * work, relationships, learning, maintenance, creative, health, other
* `task_name`
* `task_stage`

  * starting, in progress, finishing, rework
* `felt_state` (free text + sliders: clarity, energy, mood)
* `trap_detected`

  * egotism, anxiety, boredom, intermittent_failure, parts_reassembly
* `intervention_used`
* `result`

  * back on track, partial recovery, still stuck
* `notes`

Each **Trap** has:

* `name`
* `description`
* `symptoms`
* `diagnostic_questions`
* `intervention_playbook`
* `escalation_if_not_resolved`

All of this can sit in a simple table or database.

---

## 3. User Flow

### Step 1 – Anchor in a single task

Prompt:

> “What are you trying to do right now that feels sticky or dead?”

Fields:

* Task name
* One sentence description
* Where you are stuck

  * starting, middle, finishing, fixing something that broke

### Step 2 – Symptom check (fast self report)

Show a short checklist. User picks **one best fit**.

> “Right now, which of these feels most true?”

1. **I am annoyed because the world is wrong**

   * “They are idiots.”
   * “The instructions are stupid.”
   * “I should not have to deal with this.”
     → Candidate: **Egotism** (internal value rigidity). 

2. **I am keyed up and nervous about getting it wrong**

   * Racing thoughts, tight chest, urge to rush.
   * I keep staring at the task then looking away.
     → Candidate: **Anxiety** (internal value rigidity). 

3. **I feel flat and vaguely repulsed by the task**

   * I reach for my phone.
   * I am going through the motions without attention.
     → Candidate: **Boredom** (internal value rigidity). 

4. **Reality keeps “flickering” on me**

   * The problem comes and goes.
   * Bugs or symptoms appear only sometimes.
   * Every time I try to observe, it behaves.
     → Candidate: **Intermittent failure** (external setback). 

5. **I pulled it apart and now I cannot put it back together**

   * Project, codebase, room, schedule, or relationship dynamics.
   * Lots of open loops, scattered pieces, confusion.
     → Candidate: **Parts reassembly** (external setback). 

If the user genuinely cannot choose, let them select top two and run both mini playbooks.

### Step 3 – Trap specific micro questionnaire

For the selected trap, show 3 to 5 items (Yes or No).

Example for **Egotism**:

* I have not seriously looked for information that might prove me wrong.
* I have not read the “manual” or docs in full.
* I am more focused on who is to blame than what is true.
* I feel a twinge of embarrassment imagining I might be missing something obvious.

If 2 or more are Yes, confirm: “You are likely in an **Egotism Gumption Trap**.”

Build similar micro items for the other traps.

---

## 4. Intervention Playbooks

Each trap maps to a **concrete 5 to 20 minute routine** derived from your table. 

Think: “click a card, follow a script”.

### 4.1 Egotism Playbook – Humility reset

**Intent:** Loosen value rigidity by submitting to reality.

Steps:

1. **Reality snapshot (3 minutes)**

   * Write: “What exactly is in front of me right now?”
   * List only observable facts, no blame language.

2. **The manual ritual (7 minutes)**

   * Find the closest equivalent of “the manual”: docs, help page, email thread, partner’s message.
   * Read with this prompt at the top of the page:

     > “Assume the problem is my model, not the universe. What did I miss?”

3. **One correction (5 minutes)**

   * Write: “If I assume I am wrong somewhere, what is the smallest thing I can test?”
   * Implement exactly one change.

4. **Close the loop (1 minute)**

   * Log: “What did reality tell me when I stopped defending myself?”

Optional UI: a small “Humility Timer” that walks them through these phases.

---

### 4.2 Anxiety Playbook – Study and preparation

**Intent:** Trade fear for structured understanding and a tiny, safe start. 

Steps:

1. **Name the fear (2 minutes)**

   * “What bad thing do I imagine happens if I start?”
   * Capture single sentence.

2. **Shrink the task (5 minutes)**

   * Break into 3 micro steps that each take less than 10 minutes.
   * Highlight Step 1.

3. **Dry run without consequence (5 to 10 minutes)**

   * Do Step 1 in a sandbox: draft only, local file, fake data, or private note.
   * No one else sees it.

4. **Prepare tools (3 minutes)**

   * Gather logins, files, notes, etc, so “starting” no longer involves a scavenger hunt.

5. **Timebox (3 minutes)**

   * Set a 10 minute timer. The only goal is to touch Step 1, not complete the whole task.

---

### 4.3 Boredom Playbook – Ritualization or rest

**Intent:** Distinguish true fatigue from lack of engagement and respond accordingly. 

Branch A – **You are actually tired**

* Check: If sleep last night was poor or your eyes feel heavy, choose this branch.

Steps:

1. Drink water and eat a small, stable snack if hungry.
2. Set a 20 minute rest timer. Eyes closed or light walk, no phone.
3. After timer: Either resume task for 10 focused minutes, or explicitly choose to stop for the day.

Branch B – **You are under challenged**

Steps:

1. **Sensory zoom in (3 minutes)**

   * Focus attention on physical details of the task: sounds, textures, precision of movement.

2. **Gamify the challenge (5 to 15 minutes)**
   Examples:

   * “How perfectly can I align these?”
   * “Can I write this paragraph in 7 sentences exactly?”
   * “Can I process 5 emails in 8 minutes with zero errors?”

3. **Add meaning (5 minutes)**

   * Ask: “Who benefits from this being done with care?”
   * Write a one line dedication above the task.

---

### 4.4 Intermittent Failure Playbook – Patience and documentation

**Intent:** Turn a maddening flicker into a captured pattern. 

Steps:

1. **Create a fault log (5 minutes)**

   * New page or file. Columns: Date/Time, Context, Exact Symptom, Possible Triggers.

2. **Define “observation mode” (5 minutes)**

   * Decide: For the next N days or runs, aim only to observe and log, not fix.
   * Remove pressure to solve now.

3. **Instrument the system (5 to 15 minutes)**

   * Add logging, screenshots, or photos.
   * For life problems, note conditions: time of day, people present, prior events.

4. **Schedule the revisit (1 minute)**

   * Set a future review to scan the log for patterns once data exists.

---

### 4.5 Parts Reassembly Playbook – Visual logic

**Intent:** Respect complexity and rebuild a visible sequence. 

Steps:

1. **Clear space (3 to 5 minutes)**

   * Physical or digital. Create a single work zone for this reassembly.

2. **Lay out components in order (10 to 20 minutes)**

   * Group related pieces: files, steps, physical parts, stakeholders.
   * If possible, line them up roughly in the original flow.

3. **Rebuild from reference (10 to 30 minutes)**

   * Search for diagrams, previous versions, or photos.
   * If you have none, sketch a rough “before” from memory.

4. **Name checkpoints (5 minutes)**

   * Define 3 intermediate “good enough” states.
   * Rebuild only up to checkpoint 1 right now, not the whole project.

---

## 5. Session Close and Pattern View

At the end of each session, the tool prompts:

1. **Outcome tag**

   * “I am back in motion on this task.”
   * “Improved a bit, still not great.”
   * “Still stuck.”

2. **One sentence reflection**

   * “What did I notice about how my mind works in this situation?”

Then it stores the record.

On a **weekly review screen** you can surface:

* Most frequent gumption traps for this person.
* Contexts where each trap appears most.
* Interventions that worked best.

This transforms “ugh, I got stuck again” into data about systemic friction in their Quality operating model. 