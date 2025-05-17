# Gravitational Field Migration Checklist

This document tracks the migration from the shell-based model to the continuous gravitational field model across the codebase.

## Figures Files

- [x] `figures/heliomorphic/heliomorphic_shells.tex` → `figures/heliomorphic/heliomorphic_gravitational_field.tex` - Files exist in parallel
- [x] `figures/heliomorphic/heliomorphic_shell_decomposition.tex` → `figures/heliomorphic/heliomorphic_gravitational_field_decomposition.tex` - Files exist in parallel

## Primary Theory Files

- [x] `chapters/part1_theory/functions_and_geometry/heliomorphism.tex` - Replace ~25+ shell references, "shell decomposition," "intershell coupling tensor," etc.
- [ ] `chapters/part1_theory/functions_and_geometry/heliomorphic_geometry.tex` - Replace "spherical shells" and algorithmic shell determination
- [ ] `chapters/part1_theory/functions_and_geometry/heliomorphic_axiom_system.tex` - Remove references to "discrete shells"

## Mechanics and Dynamics

- [x] `chapters/part1_theory/mechanics_and_dynamics/elder_heliosystem_unified.tex`
- [ ] `chapters/part1_theory/mechanics_and_dynamics/gravitational_field_dynamics.tex`
- [x] `chapters/part1_theory/mechanics_and_dynamics/elder_training_loop.tex`

## Memory and Loss Functions

- [ ] `chapters/part1_theory/memory_and_efficiency/infinite_memory_dynamics.tex`
- [x] `chapters/part1_theory/loss_functions/elder_loss.tex`
- [x] `chapters/part1_theory/loss_functions/mentor_loss.tex`
- [x] `chapters/part1_theory/loss_functions/erudite_loss.tex`

## Applications

- [x] `chapters/part1_theory/applications/audio_understanding.tex`
- [x] `chapters/part1_theory/applications/model_unification.tex`
- [ ] `chapters/part1_theory/applications/additional_domain_applications.tex`

## Experimental Section

- [ ] `chapters/part2_experiment/experiment.tex`

## Supporting Files

- [ ] `chapters/appendix/symbol_glossary.tex`
- [x] `glossary.tex`
- [ ] `main.tex`

## Documentation

- [ ] `docs/contraction/system_closure_proof.md`
- [ ] `docs/contraction/contraction_phase_checklist.md`

## Terminology Migration Guide

| Shell-Based Term | Gravitational Field Equivalent |
|------------------|--------------------------------|
| Concentric shells | Continuous gravitational field |
| Inner/Middle/Outer Shell | Central/Intermediate/Peripheral field region |
| Shell boundary | Gravitational gradient transition |
| Intershell coupling | Field-phase coupling |
| Shell-based decomposition | Gravitational field decomposition |
| Shell membership | Field position |
| Shell radius | Radial distance from field center |
| Shell count | Field stratification |
| Shell-aligned | Field-aligned |