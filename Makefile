# Makefile for Elder Theory Repository
# Uses TeX Live container for all builds

# Container command (change to 'docker' if not using podman)
CONTAINER = podman
TEXLIVE_IMAGE = docker.io/texlive/texlive:latest
CONTAINER_OPTS = --rm -v $(CURDIR):/workspace:Z -w /workspace

# Build directories
BUILD_THEORY = build/theory
BUILD_TEACHING = build/teaching_guide
BUILD_WORKBOOK = build/student_workbook

# Ensure build directories exist
$(shell mkdir -p $(BUILD_THEORY) $(BUILD_TEACHING) $(BUILD_WORKBOOK))

# Default target
all: theory

# Theory (main document) - Full compilation with 5 LaTeX passes for complete TOC/LOF/LOT
theory:
	@echo "Building Elder Theory (main document)..."
	@echo "This will take several minutes (5 LaTeX passes for complete lists)..."
	$(CONTAINER) run $(CONTAINER_OPTS) $(TEXLIVE_IMAGE) bash -c "cd theory && \
		lualatex --interaction=nonstopmode --output-directory=../$(BUILD_THEORY) main.tex && \
		cd ../$(BUILD_THEORY) && biber main && cd ../../theory && \
		makeindex ../$(BUILD_THEORY)/main.idx && \
		lualatex --interaction=nonstopmode --output-directory=../$(BUILD_THEORY) main.tex && \
		lualatex --interaction=nonstopmode --output-directory=../$(BUILD_THEORY) main.tex && \
		lualatex --interaction=nonstopmode --output-directory=../$(BUILD_THEORY) main.tex && \
		lualatex --interaction=nonstopmode --output-directory=../$(BUILD_THEORY) main.tex && \
		cp ../$(BUILD_THEORY)/main.pdf ../$(BUILD_THEORY)/elder_arcane_realization.pdf" 2>&1 | grep -E "(Output written|Error)" || true
	@echo "Theory PDF: $(BUILD_THEORY)/elder_arcane_realization.pdf"
	@ls -lh $(BUILD_THEORY)/elder_arcane_realization.pdf 2>/dev/null || echo "Build may have failed"

# Teaching Guide
teaching_guide:
	@echo "Building Teaching Guide..."
	$(CONTAINER) run $(CONTAINER_OPTS) $(TEXLIVE_IMAGE) lualatex --interaction=nonstopmode --output-directory=$(BUILD_TEACHING) teaching_guide/chapter1_guide.tex 2>&1 | grep -E "(Output written|Error)" || true
	@echo "Teaching Guide PDF: $(BUILD_TEACHING)/chapter1_guide.pdf"

# Student Workbook (regular version only)
student_workbook:
	@echo "Building Student Workbook..."
	@$(CONTAINER) run $(CONTAINER_OPTS) $(TEXLIVE_IMAGE) bash -c "lualatex --interaction=nonstopmode --output-directory=$(BUILD_WORKBOOK) student_workbook/chapter1/workbook.tex" 2>&1 | grep -E "(Output written|Error)" || true
	@echo "Workbook PDF: $(BUILD_WORKBOOK)/workbook.pdf"
	@ls -lh $(BUILD_WORKBOOK)/workbook.pdf 2>/dev/null || echo "Build may have failed"

# Clean auxiliary files
clean:
	rm -f $(BUILD_THEORY)/*.aux $(BUILD_THEORY)/*.log $(BUILD_THEORY)/*.bbl $(BUILD_THEORY)/*.blg
	rm -f $(BUILD_THEORY)/*.toc $(BUILD_THEORY)/*.lof $(BUILD_THEORY)/*.lot $(BUILD_THEORY)/*.out
	rm -f $(BUILD_THEORY)/*.idx $(BUILD_THEORY)/*.ilg $(BUILD_THEORY)/*.ind $(BUILD_THEORY)/*.bcf $(BUILD_THEORY)/*.run.xml
	rm -f $(BUILD_TEACHING)/*.aux $(BUILD_TEACHING)/*.log $(BUILD_TEACHING)/*.out $(BUILD_TEACHING)/*.toc
	rm -f $(BUILD_WORKBOOK)/*.aux $(BUILD_WORKBOOK)/*.log $(BUILD_WORKBOOK)/*.out $(BUILD_WORKBOOK)/*.toc

# Clean everything including PDFs
realclean: clean
	rm -f $(BUILD_THEORY)/*.pdf
	rm -f $(BUILD_TEACHING)/*.pdf
	rm -f $(BUILD_WORKBOOK)/*.pdf

# Help message
help:
	@echo "Elder Theory Build System"
	@echo ""
	@echo "Available targets:"
	@echo "  make theory           - Build main theory document (default, ~5-10 min)"
	@echo "                          Includes: Table of Contents, List of Figures,"
	@echo "                          List of Tables, Bibliography, Index"
	@echo "  make teaching_guide   - Build teaching guide"
	@echo "  make student_workbook - Build student workbook (regular version)"
	@echo "  make clean            - Remove auxiliary files"
	@echo "  make realclean        - Remove all generated files including PDFs"
	@echo "  make help             - Show this help message"
	@echo ""
	@echo "Output locations:"
	@echo "  Theory:         $(BUILD_THEORY)/elder_arcane_realization.pdf"
	@echo "  Teaching Guide: $(BUILD_TEACHING)/chapter1_guide.pdf"
	@echo "  Workbook:       $(BUILD_WORKBOOK)/workbook.pdf"
	@echo ""
	@echo "Note: All builds use the TeX Live container (podman/docker)"

.PHONY: all theory teaching_guide student_workbook clean realclean help
