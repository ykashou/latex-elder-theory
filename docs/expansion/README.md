# Elder, the Arcane Realization - LaTeX Book Template

This is a comprehensive LaTeX template for the mathematical text "Elder, the Arcane Realization". The template is designed to handle extensive mathematical content with advanced typesetting features and custom styling.

## Features

- Structured hierarchy with parts, units, and chapters
- Support for complex mathematical notation, algorithms, tables, and graphs
- Pre-configured packages for mathematical typesetting
- Two-column layout with chapter numbers in margin
- Theorem boxes with proper styling
- Latin Modern Math for mathematical content and Latin Modern Roman for body text
- GoLang syntax highlighting for code examples
- Custom color scheme with Dark Sky Blue for "Elder" in the title

## Directory Structure

```
.
├── chapters/                # Chapter content files
│   ├── chapter1.tex         # Chapter 1: Fundamentals of Arcane Notation
│   └── chapter2.tex         # Chapter 2: Structure Theory of Elder Spaces
├── examples/                # Example files for demonstration
│   ├── algorithm_example.tex # Algorithm examples
│   ├── code_example.tex     # GoLang code examples
│   └── graph_example.tex    # TikZ graph examples
├── macros/                  # Custom macro definitions
│   ├── math_macros.tex      # Mathematical notation macros
│   └── theorem_styles.tex   # Theorem environment styling macros
├── parts/                   # Part structure files
│   └── part1.tex            # Part 1: Foundations of Arcane Realization
├── styles/                  # Custom style files
│   ├── chapter_style.tex    # Chapter styling
│   └── layout_style.tex     # Page layout styling
├── units/                   # Unit files (intermediary between parts and chapters)
│   └── unit1.tex            # Unit 1: Basic Structures and Notation
├── bibliography.bib         # Bibliography entries in BibTeX format
├── main.tex                 # Main document file
└── preamble.tex             # Package imports and global settings
```

## Compilation Requirements

To compile this document, you need:

1. A complete LaTeX distribution (TeX Live, MikTeX, etc.)
2. The Biber bibliography processor
3. Required LaTeX packages (most are included in standard distributions)

## How to Compile

Run the following commands in sequence:

```bash
# Create the output directory if it doesn't exist
mkdir -p output

# Run LaTeX compilation with output to output directory
pdflatex -output-directory=output main.tex
biber --output-directory output main
pdflatex -output-directory=output main.tex
pdflatex -output-directory=output main.tex

# Optional: Create a renamed copy
cp output/main.pdf output/elder_arcane_realization.pdf
```

Multiple runs of pdflatex are needed to resolve cross-references, citations, and table of contents entries.

## Output Management

All LaTeX-generated files including the final PDF are stored in the `output/` directory. This keeps the root directory clean and separates source files from generated files.

## Version Control

A `.gitignore` file is included that excludes:
- All LaTeX temporary and auxiliary files
- Generated PDFs in the root directory
- The entire contents of the `output/` directory

This configuration ensures that only source files are tracked in version control, keeping repository size small and avoiding conflicts with binary files.

