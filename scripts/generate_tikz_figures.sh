#!/bin/bash

# Create output directory if it doesn't exist
mkdir -p figures/pdf

# Loop through all .tex files in the figures directory
for tikz_file in figures/*.tex; do
    # Extract the base name without extension
    base_name=$(basename "$tikz_file" .tex)
    
    # Create a temporary LaTeX file that includes the TikZ figure
    cat > "figures/temp_$base_name.tex" << EOF
\\documentclass{standalone}
\\usepackage{tikz}
\\usepackage{amsmath,amssymb}
\\begin{document}
\\input{$tikz_file}
\\end{document}
EOF
    
    # Compile the temporary LaTeX file to create a PDF
    cd figures
    pdflatex -interaction=nonstopmode "temp_$base_name.tex"
    
    # Move the resulting PDF to the pdf subdirectory
    mv "temp_$base_name.pdf" "$base_name.pdf"
    
    # Clean up temporary files
    rm "temp_$base_name.tex" "temp_$base_name.log" "temp_$base_name.aux"
    
    cd ..
    
    echo "Generated PDF for $base_name"
done

echo "All TikZ figures have been converted to PDFs."