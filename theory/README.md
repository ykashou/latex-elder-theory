# Elder Theory - Main Mathematical Document

This directory contains the complete mathematical theory of Elder spaces, heliomorphic functions, and the Elder-Mentor-Erudite learning framework.

## Building

From repository root:

```bash
make theory
```

**Output**: `../build/theory/elder_arcane_realization.pdf` (940 pages, 4.2 MB)

## Contents

- **Part I: Theory** (7 Units, 896 pages)
- **Part II: Experiments** (3 Units)
- **Appendices**: Glossary, Notation, Advanced Proofs
- **Bibliography & Index**

## Compilation Details

The build runs 5 LaTeX passes for complete lists and cross-references (~5-10 minutes).

## File Structure

```
theory/
├── main.tex              # Main document entry point
├── chapters/             # All chapter content
│   ├── part1_theory/    # Theoretical foundations (Units I-VII)
│   ├── part2_experiments/ # Empirical validation (Units I-III)
│   └── appendix/        # Appendices
└── bibliography.bib      # References
```

## Dependencies

Uses shared resources:
- `../shared/macros/` - Mathematical notation macros
- `../shared/figures/` - TikZ diagrams and illustrations
- `../shared/examples/` - Code examples and algorithms

---

See main repository [README](../README.md) for complete documentation.
