all: main.pdf

main.pdf: main.tex nomenclature.tex chapters/*.tex macros/*.tex styles/*.tex bibliography.bib
	pdflatex -interaction=nonstopmode -output-directory=output main.tex
	makeindex output/main.nlo -s nomencl.ist -o output/main.nls
	biber --output-directory output main
	pdflatex -interaction=nonstopmode -output-directory=output main.tex
	pdflatex -interaction=nonstopmode -output-directory=output main.tex
	cp output/main.pdf output/elder_arcane_realization.pdf
	@echo "Compilation complete. PDF is available in the output directory."

clean:
	rm -f output/*.aux output/*.bbl output/*.blg output/*.log output/*.out output/*.toc output/*.lof output/*.lot output/*.nlo output/*.nls output/*.ilg output/*.ind output/*.idx output/*.glo output/*.gls output/*.acn output/*.acr output/*.alg output/*.glg output/*.glo output/*.ist output/*.bcf output/*.run.xml