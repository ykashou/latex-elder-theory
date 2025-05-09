# Elder, the Arcane Realization

A sophisticated LaTeX book template for "Elder, the Arcane Realization," focusing on mathematical text precision and advanced typesetting capabilities.

## Project Structure

- `main.tex`: The primary LaTeX document that imports all chapters and sets up the document structure
- `chapters/`: Contains individual chapter files
  - `chapter1.tex`: Introduction to Elder Framework
  - `chapter2.tex`: Mathematical Framework and Erudite Loss Derivation
  - `chapter3.tex`: Elder Learning and Cross-Domain Transfer
- `macros/`: Contains custom LaTeX macros and styling
  - `math_macros.tex`: Defines mathematical notation for the Elder framework
  - `theorem_styles.tex`: Custom styling for theorems, definitions, and other environments
- `nomenclature.tex`: List of mathematical symbols and their descriptions
- `bibliography.bib`: Bibliography entries in BibTeX format
- `output/`: Contains the compiled PDF and auxiliary files

## Compilation

To compile the document, run:

```bash
mkdir -p output
pdflatex -interaction=nonstopmode -output-directory=output main.tex
biber --output-directory output main
pdflatex -interaction=nonstopmode -output-directory=output main.tex
pdflatex -interaction=nonstopmode -output-directory=output main.tex
```

Or use the provided LaTeX compilation workflow.

## Features

- Custom mathematical notation for Elder, Mentor, and Erudite entities
- Specialized theorem environments with visual styling
- Comprehensive derivation of the Erudite loss function
- Bibliography management with BibLaTeX
- Symbol reference in the nomenclature section

## Sample Content

The document includes a detailed derivation of the Erudite loss function, which combines:
- Task-specific base loss
- Mentor guidance through KL divergence
- Elder phase alignment
- Information bottleneck optimization

These components form a unified mathematical framework for hierarchical knowledge transfer.