Phase 2: Component Functional Specifications

1. Text Block (The Voice)

Purpose: Handles the shift between Philosophy (Why) and Instruction (How).

Variants:

Philosophy: Font-Serif (Lora), larger line-height, italic accents. Used for Diagnosis Reveal.

Interface: Font-Sans (Inter), tight tracking, clean. Used for labels/buttons.

Data: Font-Mono (JetBrains), distinct color (slate-400). Used for timers/logs.

2. Multi-Select Input (The Sifter)

Purpose: Used in Context Selection and Symptom Selection.

Behavior:

Pill-shaped buttons.

Active state applies a subtle ring-2 of the theme color.

Inactive state fades to 50% opacity but remains clickable.

3. Playbook Stepper (The Guide)

Purpose: Renders the Intervention steps.

State: currentStep (Index), isActive (Timer state).

Logic:

Timer Step: Must run timer to completion (or user override) to advance.

Input Step: Must enter >5 chars to advance.

Branch Step: Selection updates the playbook array dynamically.

4. LocalStorage Manager (The Recorder)

Purpose: Manages data persistence without a backend.

Key: loki_sessions_v1

Format: Array of JSON objects.

Methods:

saveSession(session): Appends to array.

getSessions(): Returns sorted array (newest first).

exportData(): Triggers a file download of the JSON.

clearData(): Wipes the key (with confirmation).

5. Redirect Gems (The Navigation)

Purpose: Primary action buttons.

Visuals:

Indigo Gem: Standard system navigation.

Amber Gem: "Do the work" actions (Start Timer, Complete Step).

States: Default, Hover (Lift), Active (Press), Disabled (Glass-0).

6. Log Timeline (The History)

Purpose: Visualizes the "Redesign" loop.

Rendering:

Reverse chronological list.

Each item is a "Micro-Pane" showing: Time, Trap Icon (colored), Result Tag.
