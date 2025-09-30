# Elder Theory: The Arcane Realization

A novel mathematical framework for multi-domain learning and knowledge representation.

## About This Project

"Elder Theory: The Arcane Realization" is a comprehensive mathematical textbook that introduces a theoretical framework for hierarchical knowledge representation and multi-domain learning. The book presents the Elder-Mentor-Erudite system, which models how learning occurs at different levels of abstraction through orbital dynamics and gravitational interactions.

## Repository Structure

```
elder-theory/
├── chapters/               # All chapter content organized by section
│   ├── part1_theory/       # Theoretical foundations (Units I-VII)
│   │   ├── unit1_foundation_layer/
│   │   ├── unit2_heliomorphic_functions_and_geometry/
│   │   ├── unit3_elder_heliosystem_architecture/
│   │   ├── unit4_learning_dynamics_and_algorithms/
│   │   ├── unit5_cross_domain_knowledge_transfer/
│   │   ├── unit6_theoretical_unification_and_closure/
│   │   └── unit7_memory_and_efficiency_properties/
│   ├── part2_experiments/  # Empirical validation (Units I-III)
│   └── appendix/           # Advanced proofs and references
├── figures/                # Diagrams, illustrations, and figures
├── macros/                 # LaTeX macros and custom commands
│   ├── math_macros.tex     # Mathematical notation definitions
│   ├── chapter_summary.tex # Chapter summary template
│   └── tikz_styles.tex     # TikZ diagram styles
├── docs/                   # Documentation and review materials
│   ├── reviews/            # Chapter reviews and assessments
│   ├── annotations/        # Annotation tracking
│   └── *.md                # Various documentation files
├── build/                  # Compilation artifacts (generated, gitignored)
│   └── pdf/                # Output PDF files
├── student_workbook_chapter1.tex  # Chapter 1 pedagogical companion
├── student_workbook_README.md     # Workbook documentation
├── main.tex                # Main document file
├── bibliography.bib        # Bibliography references
└── Makefile                # Build automation
```

## Building the Document

### Method 1: Using Containers (Recommended - No Local Installation)

The easiest way to build the PDFs is using **Podman** or **Docker** with the official TeX Live container. This requires no local LaTeX installation.

#### Prerequisites:
- Podman (recommended) or Docker installed
- No LaTeX installation needed!

#### Build Main Document:

```bash
# Full compilation pipeline (4 passes: latex → biber → makeindex → latex → latex)
# Creates: build/pdf/elder_arcane_realization.pdf (936 pages, ~4.2 MB)

podman run --rm -v $(pwd):/workspace:Z -w /workspace \
  docker.io/texlive/texlive:latest \
  bash -c "mkdir -p build/pdf && \
    lualatex --interaction=nonstopmode --output-directory=build/pdf main.tex && \
    biber --output-directory build/pdf main && \
    makeindex build/pdf/main.idx && \
    lualatex --interaction=nonstopmode --output-directory=build/pdf main.tex && \
    lualatex --interaction=nonstopmode --output-directory=build/pdf main.tex && \
    cp build/pdf/main.pdf build/pdf/elder_arcane_realization.pdf"
```

**For Docker**, replace `podman` with `docker` and remove the `:Z` SELinux label:
```bash
docker run --rm -v $(pwd):/workspace -w /workspace \
  docker.io/texlive/texlive:latest \
  bash -c "mkdir -p build/pdf && ..."
```

#### Build Student Workbook:

```bash
# Single-pass compilation (no bibliography needed)
# Creates: build/pdf/student_workbook_chapter1.pdf (37 pages, ~245 KB)

podman run --rm -v $(pwd):/workspace:Z -w /workspace \
  docker.io/texlive/texlive:latest \
  lualatex --interaction=nonstopmode --output-directory=build/pdf student_workbook_chapter1.tex
```

#### Quick Build (Main Document Only):

```bash
# Single pass - faster but may have incomplete cross-references
podman run --rm -v $(pwd):/workspace:Z -w /workspace \
  docker.io/texlive/texlive:latest \
  lualatex --interaction=nonstopmode --output-directory=build/pdf main.tex
```

### Method 2: Using Local LaTeX Installation

#### Prerequisites:

- **Full TeX Live distribution** (2024 or later recommended)
  ```bash
  # Fedora/RHEL
  sudo dnf install texlive-scheme-full biber
  
  # Ubuntu/Debian  
  sudo apt-get install texlive-full biber
  
  # macOS with Homebrew
  brew install --cask mactex
  ```

- **GNU Make** (usually pre-installed)

#### Compilation Using Makefile:

The included Makefile provides convenient targets:

```bash
# Full build with bibliography, index, and all references
make pdf

# Quick build without rebuilding references  
make quick

# Clean auxiliary files but keep PDFs
make clean

# Clean everything including PDFs
make realclean

# Watch for changes and automatically rebuild
make watch
```

#### Manual Compilation:

```bash
# Main document (full pipeline)
mkdir -p build/pdf
lualatex --interaction=nonstopmode --output-directory=build/pdf main.tex
biber --output-directory build/pdf main
makeindex build/pdf/main.idx
lualatex --interaction=nonstopmode --output-directory=build/pdf main.tex
lualatex --interaction=nonstopmode --output-directory=build/pdf main.tex
cp build/pdf/main.pdf build/pdf/elder_arcane_realization.pdf

# Student workbook
lualatex --output-directory=build/pdf student_workbook_chapter1.tex
```

### Build Outputs

After successful compilation, you'll have:

| File | Pages | Size | Description |
|------|-------|------|-------------|
| `build/pdf/elder_arcane_realization.pdf` | ~936 | ~4.2 MB | Complete theoretical document |
| `build/pdf/student_workbook_chapter1.pdf` | 37 | ~245 KB | Chapter 1 pedagogical companion |
| `build/pdf/main.pdf` | ~936 | ~4.2 MB | Same as elder_arcane_realization.pdf |

### Troubleshooting Build Issues

#### Common Issues:

**Issue**: `lualatex: command not found`  
**Solution**: Use container method (Method 1) or install TeX Live

**Issue**: "Too deeply nested" errors  
**Solution**: These are in appendix files, not core chapters. PDF still generates.

**Issue**: Bibliography warnings  
**Solution**: Ensure `bibliography.bib` exists. Some citations may reference future work.

**Issue**: Missing fonts  
**Solution**: Install complete TeX Live distribution, not minimal install

**Issue**: Permission errors with containers  
**Solution**: Add `:Z` flag for Podman on SELinux systems (Fedora/RHEL)

## Editing Guidelines

### Adding a New Chapter

1. Create a new `.tex` file in the appropriate subdirectory under `chapters/`
2. Add an `\input{}` command in `main.tex` at the appropriate position
3. Follow the established chapter structure:
   - Begin with `\chapter{Title}`
   - Include a concise abstract
   - Use consistent section numbering
   - End with a chapter summary using `\chaptersummary{}`

### Mathematical Notation

Custom mathematical notation for Elder Theory is defined in `macros/math_macros.tex`. Please use these consistent macros rather than defining new commands for the same concepts.

Key notation includes:
- `\elder{d}` - Elder space of dimension d
- `\realization{X}` - Realization mapping of entity X
- `\elderloss`, `\mentorloss`, `\eruditeloss` - Loss functions

### Figures and Diagrams

- Place all figures in the `figures/` directory
- Use TikZ for diagrams when possible for consistent styling
- Use the Elder color scheme defined in `main.tex`

## Student Workbooks

### Overview

**Student workbooks** are pedagogical companions to the main theoretical chapters. They provide:
- **Worked examples** with complete step-by-step solutions
- **Practice exercises** with detailed answer keys
- **Numerical calculations** demonstrating abstract concepts
- **Intuition building** for complex mathematical ideas

### Available Workbooks:

| Workbook | Chapters Covered | Pages | Exercises | Status |
|----------|------------------|-------|-----------|--------|
| `student_workbook_chapter1.tex` | Introduction to Elder Spaces | 37 | 10+ | ✅ Complete |
| `student_workbook_chapter2.tex` | Elder Topology | TBD | TBD | 🚧 Planned |
| `student_workbook_chapter3.tex` | Parameter Spaces | TBD | TBD | 🚧 Planned |

### Building Student Workbooks:

**Using containers** (recommended):
```bash
# Chapter 1 workbook
podman run --rm -v $(pwd):/workspace:Z -w /workspace \
  docker.io/texlive/texlive:latest \
  lualatex --output-directory=build/pdf student_workbook_chapter1.tex
```

**Using local LaTeX**:
```bash
lualatex --output-directory=build/pdf student_workbook_chapter1.tex
```

### What's Inside:

Each workbook includes:
- 15+ worked examples with every arithmetic step shown
- 10+ practice exercises with complete solutions
- Intuition boxes explaining abstract concepts
- Common mistakes and how to avoid them
- Formula reference sheets
- Calculation checklists
- Real-world application examples

### Target Audience:

- **Students** learning Elder Theory for the first time
- **Researchers** implementing Elder algorithms
- **Instructors** preparing course materials
- **Self-learners** wanting hands-on practice

See `student_workbook_README.md` for complete documentation.

### Creating New Workbooks:

To create a workbook for a new chapter:
1. Follow the template in `.cursor/rules/student-workbook-guidelines.mdc`
2. Include worked examples for all major theorems
3. Provide exercises at beginner/intermediate/advanced levels
4. Add formula reference boxes and calculation checklists
5. Compile and verify all arithmetic

**Guidelines**: See `.cursor/rules/student-workbook-guidelines.mdc` for comprehensive creation guidelines.

## Content Guidelines

### For Main Document:
- Maintain mathematical rigor with formal definitions, theorems, and proofs
- Follow the ruleset in `.cursor/rules/*.mdc` for consistency
- Include complete proofs (no "proof sketches")
- Add dependency comments to all theorems
- Use macros from `macros/math_macros.tex` consistently
- Add new terms to the glossary and index

### For Student Workbooks:
- Show all arithmetic steps explicitly
- Use concrete numerical values (not just variables)
- Provide intuition before formal calculations
- Include interpretations of results
- Progressive difficulty (beginner → advanced)
- Self-contained sections (can be studied independently)

See `.cursor/rules/student-workbook-guidelines.mdc` for detailed workbook creation standards.

## Contact

For questions or contributions, please contact the author at ykashou@example.edu.

## License

Copyright © 2025 by Yanal Luay Kashou. All rights reserved.