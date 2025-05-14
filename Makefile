# Makefile for Elder, the Arcane Realization

BUILD_DIR = build/pdf
OUTPUT_NAME = elder_arcane_realization

.PHONY: all clean

all: document

document:
	mkdir -p $(BUILD_DIR)
	pdflatex -interaction=nonstopmode -output-directory=$(BUILD_DIR) main.tex
	biber --output-directory $(BUILD_DIR) main
	pdflatex -interaction=nonstopmode -output-directory=$(BUILD_DIR) main.tex
	pdflatex -interaction=nonstopmode -output-directory=$(BUILD_DIR) main.tex
	cp $(BUILD_DIR)/main.pdf $(BUILD_DIR)/$(OUTPUT_NAME).pdf
	@echo "Document compilation complete. PDF is available at $(BUILD_DIR)/$(OUTPUT_NAME).pdf"

clean:
	rm -f $(BUILD_DIR)/*.aux $(BUILD_DIR)/*.log $(BUILD_DIR)/*.toc $(BUILD_DIR)/*.out $(BUILD_DIR)/*.bbl $(BUILD_DIR)/*.bcf $(BUILD_DIR)/*.blg $(BUILD_DIR)/*.run.xml

clean-all: clean
	rm -f $(BUILD_DIR)/*.pdf
