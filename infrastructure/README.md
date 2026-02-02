# Project Loki - Analyzer Data Model (V3 Infrastructure)

## Status

**FROZEN - REFERENCE ONLY. NOT USED IN V1/V2.**

This schema defines the future database structure for Project Loki's Gumption Trap Analyzer when it moves to cloud storage (V3). It is designed for Supabase/PostgreSQL deployment.

## Current Implementation (V1/V2)

- **Storage**: Local only (LocalStorage / IndexedDB)
- **No database deployment**: This schema is for planning purposes only
- **Local constraints**: All data persists client-side without server synchronization

## Schema Overview

- **traps**: Static knowledge base of gumption trap definitions
- **sessions**: User interaction logs from analyzer runs
- **Enums**: Define controlled vocabularies for context areas, trap types, and intervention results

## Future Migration Notes

- When moving to V3, ensure backward compatibility with local data exports
- User authentication will enable the `user_id` field
- Interventions table may be added in future phases for playbook storage

## Files

- `analyzer_schema_v3.sql`: Complete PostgreSQL schema definition
