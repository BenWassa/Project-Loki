Phase 2: Analyzer Wireframe Specification (Local-First Edition)

Version: 1.1
Architecture: Local Storage (No Cloud Dependency)
Design System: Project Loki DS V2 (Glass/Pane Metaphors)

1. Start Screen (The Lens)

Objective: Zero-friction entry. Establish the "Diagnostic" tone.

Background: Deep atmospheric fog (Slate-950). Slow, subtle pulse animation.

Center: A single "Glass-1" Pane.

Content:

Headline (Serif): "Where are you stuck?"

Subhead (Sans): "Gumption Trap Analyzer V1.0"

Action: Large "Amber Gem" button: [ Initiate Diagnosis ]

Footer: Small "History" icon to access the Dashboard.

2. Task Anchor Screen (The Signal)

Objective: Capture the "Signal" defined in the Operating Model.

Container: BigInputPane (Glass-1).

Input 1: "Task Name" (Large, serif input, feels like a book title).

Input 2: "Context" (Pill selector: Work, Health, Creative, Maintenance, Social).

Input 3: "Friction Level" (Slider 0-100% with label feedback: "Annoying" -> "Painful" -> "Impossible").

Navigation: [ Back ] [ Analyze Signal > ]

3. Symptom Selection (The Filter)

Objective: Broad categorization of the stuckness.

Header: "What does the resistance feel like?"

List View (Vertical Stack): 5 Cards (Glass-0).

Card 1 (Egotism): "The world is wrong / They are idiots." (Crimson Accent)

Card 2 (Anxiety): "Keyed up / Fear of starting." (Amethyst Accent)

Card 3 (Boredom): "Flat / Repulsed / Reaching for phone." (Slate Accent)

Card 4 (Intermittent): "It flickers / Reality is gaslighting me." (Emerald Accent)

Card 5 (Reassembly): "Too many pieces / Can't put it back." (Cyan Accent)

Interaction: Tapping a card selects it immediately or expands for details.

4. Trap Micro-Questionnaire (The Calibration)

Objective: Confirm the diagnosis with high precision.

Header: "Let's calibrate..."

Content: 3 "Yes/No" toggle switches specific to the chosen symptom.

Logic:

If 2+ "Yes": [ Confirm Diagnosis ] button appears (Amber).

If <2 "Yes": [ "This doesn't fit" ] button appears (Ghost).

5. Diagnosis Reveal (The Pivot)

Objective: Identity shift. Move from "I am bad" to "I am in a trap."

Visual: Screen dims. A "Prism" of the Trap's color glows in the center.

Headline: "Trap Detected: [Trap Name]"

Body (Serif): A compassionate, philosophical definition of the trap.

Reframe (Italic): The specific mental shift required (e.g., Trade fear for curiosity).

Action: [ Open Intervention Deck ]

6. Intervention Page (The Lever)

Objective: The "Lever" phase. Concrete, scripted action.

Structure: A "PlaybookStepper" component.

Header: Step X of Y.

Main Content: Large instruction text.

Interactive Tool (Dynamic):

Timer: Circular countdown for timeboxed steps.

Input: Text area for "Naming the fear" or "Reality snapshot".

Branch: Simple A/B choice for traps like Boredom (Tired vs. Under-challenged).

Navigation: [ Next Step ] (Unlocks after interaction).

7. Stabilization Prompt (The Anchor)

Objective: "Stabilize" phase. Lock in the win.

Input: "Outcome Tag" (Back on track / Partial / Still Stuck).

Input: "Reflection" (One sentence text field).

Action: [ Save Session ] -> Writes to LocalStorage.

8. Dashboard (The Iterate Loop)

Objective: Show patterns and provide data agency.

Visual: Scrollable list of past sessions.

Metrics: "Total Sessions", "Top Trap".

Data Agency: [ Export Data (JSON) ] and [ Clear History ] buttons.
