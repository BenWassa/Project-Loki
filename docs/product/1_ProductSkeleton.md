# **PROJECT LOKI – V1 PRODUCT SKELETON**

**Navigation Tree, Routing Structure, and Page Responsibilities**

This is the canonical map.
Everything else will hang from this.

---

# **TOP LEVEL ROUTES (Primary Navigation)**

```
/
├─ /philosophy
├─ /system
├─ /tools
├─ /practice
├─ /metrics
├─ /library
└─ /field-manual
```

These correspond one to one with the major sections defined in InitialVision.md and serve as **stable, high level pillars** that do not change across versions.

---

# **0. ROOT – “Orientation Chamber”**

### **Route:** `/`

**Purpose:**
Orient the user, state the worldview, and offer clear entry paths.

**Sections:**

* Hero statement
* The crisis (precision tech vs low precision living)
* The synthesis (philosophy + engineering + craft)
* The promise of the system
* Entry paths

  * Begin the Analyzer
  * Explore philosophy
  * Explore tools
  * Take first steps (Field Manual)

---

# **1. PHILOSOPHY SECTION (Why)**

### **Route:** `/philosophy`

This section houses the worldview and meaning architecture.
Pages:

```
/philosophy
   ├─ /philosophy/what-is-quality
   ├─ /philosophy/dynamic-vs-static
   ├─ /philosophy/classical-vs-romantic
   └─ /philosophy/gumption-traps
```

**Responsibilities:**

* Introduce MOQ
* Explain Quality as primary reality
* Show Dynamic vs Static Quality
* Explain why people resist systems
* Introduce trap categories
* Bridge into the operating model

This section reframes the **worldview layer**.

---

# **2. SYSTEM SECTION (How)**

### **Route:** `/system`

This is the Deming + Juran + Life-System lens.

```
/system
   ├─ /system/life-as-a-system
   ├─ /system/variation
   ├─ /system/theory-of-knowledge
   ├─ /system/psychology
   ├─ /system/juran-trilogy
   └─ /system/constancy-of-purpose
```

**Responsibilities:**

* Show life as interconnected systems
* Teach variation and realistic expectations
* Introduce empirical thinking
* Introduce motivation psychology
* Establish the lifecycle (Design → Maintenance → Breakthrough)

This clarifies the **framework layer**.

---

# **3. TOOLS SECTION (What)**

### **Route:** `/tools`

This section is the mechanical core.

```
/tools
   ├─ /tools/kanban
   ├─ /tools/five-s
   ├─ /tools/root-cause
   └─ /tools/pdca
```

**Responsibilities:**

* Replace motivation with systems
* Provide actionable, real world protocols
* Serve as the long term toolbox for daily friction

This section delivers the **applications layer**.

---

# **4. PRACTICE SECTION (Daily Use)**

### **Route:** `/practice`

This is where craft, repetition, flow, and Shokunin mindset live.

```
/practice
   ├─ /practice/shokunin
   ├─ /practice/deliberate-practice
   └─ /practice/flow
```

**Responsibilities:**

* Show how Quality becomes lived skill
* Connect daily motion to long term craft
* Provide techniques for attention, repetition, mastery

This section trains **identity-level practice**.

---

# **5. METRICS SECTION (Measurement)**

### **Route:** `/metrics`

This makes Quality trackable and real.

```
/metrics
   ├─ /metrics/whoqol
   ├─ /metrics/wheel-of-life
   ├─ /metrics/level-10
   └─ /metrics/vital-few
```

**Responsibilities:**

* Convert ambiguity into data
* Help users see baseline shifts
* Anchor the “Static Layer” improvements
* Create long term dashboards

This is the **visibility layer** for user evolution.

---

# **6. LIBRARY (Depth + Credibility)**

### **Route:** `/library`

```
/library
   ├─ /library/moq
   ├─ /library/deming
   ├─ /library/juran
   ├─ /library/lean
   ├─ /library/flow
   ├─ /library/information-hygiene
   └─ /library/material-quality
```

**Responsibilities:**

* Serve as the intellectual backbone
* Allow exploration without bloating the main pages
* Anchor claims
* Support credibility

This prevents the platform from feeling like “motivational content”.

---

# **7. FIELD MANUAL (Action Guides)**

### **Route:** `/field-manual`

```
/field-manual
   ├─ /field-manual/first-7-days
   ├─ /field-manual/30-day-static-reset
   ├─ /field-manual/home-5s-blitz
   ├─ /field-manual/attention-detox
   └─ /field-manual/system-redesign-sprint
```

**Responsibilities:**

* Make philosophy actionable
* Offer structured, time-boxed transformations
* Provide starter journeys for new users
* Lower entry friction

This is the **bridge between theory and lived behavior**.

---

# **8. FLAGSHIP TOOL – THE ANALYZER**

### **Route:** `/analyzer`

This is the V1 core feature.

```
/analyzer
   ├─ /analyzer/start
   ├─ /analyzer/questions
   ├─ /analyzer/result
   ├─ /analyzer/intervention
   └─ /analyzer/review
```

**Responsibilities:**

* Deliver the first fracture (“Systems beat willpower”)
* Diagnose gumption traps
* Deliver first system win
* Lead naturally into deeper content
* Act as recurring maintenance tool

This is the **Operating Model embodied**.

---

# **9. USER ECOSYSTEM (Optional for V1, but scaffold now)**

```
/account
   ├─ /account/settings
   └─ /account/history
```

Even if authentication is not built in V1, the routes should exist for future extension.

The analyzer’s weekly pattern views will eventually live here.

---

# **10. ROUTE SUMMARY (Flattened)**

For clarity:

```
/
 /philosophy/*
 /system/*
 /tools/*
 /practice/*
 /metrics/*
 /library/*
 /field-manual/*
 /analyzer/*
 /account/*
```

This is a clean, scalable architecture with no redundancy, no conceptual overlap, and perfect alignment with the Operational Model and Transformation Arc.