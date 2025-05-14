# Makefile for "Elder, the Arcane Realization"

# Directories
BUILD_DIR = build
PDF_DIR = $(BUILD_DIR)/pdf
LATEX_DIR = $(BUILD_DIR)/latex

# Main filename
MAIN = main
OUTPUT = elder_arcane_realization

# LaTeX commands
LATEX = pdflatex
BIBER = biber
MAKEINDEX = makeindex

# LaTeX options
LATEX_OPTS = -interaction=nonstopmode -output-directory=$(PDF_DIR)

# Ensure build directories exist
$(shell mkdir -p $(PDF_DIR))

# Default target
all: pdf

# Main PDF target
pdf: $(PDF_DIR)/$(OUTPUT).pdf

# Clean build artifacts
clean:
	rm -f $(PDF_DIR)/*.aux $(PDF_DIR)/*.bbl $(PDF_DIR)/*.blg $(PDF_DIR)/*.log $(PDF_DIR)/*.out
	rm -f $(PDF_DIR)/*.toc $(PDF_DIR)/*.lof $(PDF_DIR)/*.lot $(PDF_DIR)/*.ind $(PDF_DIR)/*.ilg
	rm -f $(PDF_DIR)/*.idx $(PDF_DIR)/*.bcf $(PDF_DIR)/*.run.xml

# Clean everything including PDFs
realclean: clean
	rm -f $(PDF_DIR)/$(MAIN).pdf $(PDF_DIR)/$(OUTPUT).pdf

# Compile PDF with full pipeline
$(PDF_DIR)/$(OUTPUT).pdf: $(MAIN).tex
	$(LATEX) $(LATEX_OPTS) $(MAIN)
	cd $(PDF_DIR) && $(BIBER) $(MAIN)
	$(LATEX) $(LATEX_OPTS) $(MAIN)
	cd $(PDF_DIR) && $(MAKEINDEX) $(MAIN)
	$(LATEX) $(LATEX_OPTS) $(MAIN)
	$(LATEX) $(LATEX_OPTS) $(MAIN)
	cp $(PDF_DIR)/$(MAIN).pdf $(PDF_DIR)/$(OUTPUT).pdf

# Quick compilation without bibliography or index
quick:
	$(LATEX) $(LATEX_OPTS) $(MAIN)
	cp $(PDF_DIR)/$(MAIN).pdf $(PDF_DIR)/$(OUTPUT).pdf

# Watch for changes and recompile
watch:
	@echo "Watching for changes to recompile automatically..."
	@while true; do \
		find . -name "*.tex" -newer $(PDF_DIR)/$(OUTPUT).pdf -print -quit | grep -q .; \
		if [ $$? -eq 0 ]; then \
			make quick; \
			echo "Recompiled at $$(date)"; \
		fi; \
		sleep 2; \
	done

.PHONY: all pdf clean realclean quick watch