-- PROJECT LOKI: ANALYZER DATA MODEL (V3 INFRASTRUCTURE)
-- STATUS: FROZEN — REFERENCE ONLY. NOT USED IN V1.
-- PHASE 2 + 2.5 WILL USE LOCALSTORAGE / INDEXEDDB ONLY.

------------------------------------------------------------
-- 1. ENUM DEFINITIONS
------------------------------------------------------------

CREATE TYPE context_area AS ENUM (
    'work',
    'relationships',
    'learning',
    'maintenance',
    'creative',
    'health',
    'other'
);

CREATE TYPE trap_type AS ENUM (
    'egotism',
    'anxiety',
    'boredom',
    'intermittent_failure',
    'parts_reassembly'
);

CREATE TYPE intervention_result AS ENUM (
    'back_on_track',
    'partial_recovery',
    'still_stuck'
);

------------------------------------------------------------
-- 2. STATIC KNOWLEDGE BASE: TRAPS
-- Future: "interventions" will likely become its own table,
-- but is intentionally omitted in V1-V2 infrastructure.
------------------------------------------------------------

CREATE TABLE traps (
    trap_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug trap_type UNIQUE NOT NULL,                  -- canonical stable key
    display_name TEXT NOT NULL,                     -- human readable label
    description TEXT NOT NULL,                      -- philosophical/psych clarifier
    symptoms JSONB NOT NULL,                        -- e.g. ["feels flat", ...]
    diagnostic_questions JSONB NOT NULL,            -- list of yes/no tester items
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

------------------------------------------------------------
-- 3. USER LOG: SESSIONS
-- Stores each run of the Analyzer workflow.
-- V1 writes locally; V3 writes into this table.
------------------------------------------------------------

CREATE TABLE sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- NOT USED UNTIL FUTURE AUTH EXISTS
    user_id UUID,  -- nullable until accounts ship
    
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    --------------------------------------------------------
    -- Step 1: Signal / Anchor
    --------------------------------------------------------
    task_name TEXT NOT NULL,
    context context_area NOT NULL,
    friction_level INT CHECK (friction_level BETWEEN 0 AND 100),

    --------------------------------------------------------
    -- Step 2: Diagnosis
    --------------------------------------------------------
    trap_detected trap_type,

    --------------------------------------------------------
    -- Step 3: Intervention
    --------------------------------------------------------
    steps_completed INT DEFAULT 0,

    --------------------------------------------------------
    -- Step 4: Stabilization
    --------------------------------------------------------
    result intervention_result,
    notes TEXT
);

------------------------------------------------------------
-- 4. INDEXES
------------------------------------------------------------

CREATE INDEX idx_sessions_user_time
    ON sessions(user_id, timestamp DESC);