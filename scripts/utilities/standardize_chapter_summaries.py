#!/usr/bin/env python3
"""
Script to standardize chapter summaries in Elder Theory manuscript.
This script finds all chapter files and converts various summary formats to the standard tcolorbox format.
"""

import os
import re
import sys
from pathlib import Path

# The standard tcolorbox format we want to use
TCOLORBOX_TEMPLATE = r'''\begin{tcolorbox}[colback=blue!5!white,colframe=blue!75!black,title=Chapter Summary]
{}
\end{tcolorbox}'''

def process_file(file_path):
    """Process a single TeX file to standardize chapter summary."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Original content for comparison later
    original_content = content
    
    # Check if already using tcolorbox - if so, skip
    if r'\begin{tcolorbox}' in content and 'title=Chapter Summary' in content:
        return False
    
    # Pattern 1: Check for \textit{...} summaries at the beginning of a chapter
    textit_pattern = r'\\chapter{.*?}\s*\n\s*\\textit{(.*?)}'
    if re.search(textit_pattern, content, re.DOTALL):
        summary_text = re.search(textit_pattern, content, re.DOTALL).group(1)
        replacement = r'\chapter{\1}\n\n' + TCOLORBOX_TEMPLATE.format(summary_text)
        content = re.sub(r'\\chapter{(.*?)}\s*\n\s*\\textit{.*?}', replacement, content, flags=re.DOTALL)
    
    # Pattern 2: Check for chapterabstract environment
    abstract_pattern = r'\\begin{chapterabstract}(.*?)\\end{chapterabstract}'
    if re.search(abstract_pattern, content, re.DOTALL):
        summary_text = re.search(abstract_pattern, content, re.DOTALL).group(1).strip()
        content = re.sub(abstract_pattern, TCOLORBOX_TEMPLATE.format(summary_text), content, flags=re.DOTALL)
    
    # If content was modified, write it back
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    
    return False

def main():
    """Main function to process all TeX files."""
    chapters_dir = Path('chapters')
    count = 0
    
    for tex_file in chapters_dir.glob('**/*.tex'):
        if process_file(tex_file):
            print(f"Updated: {tex_file}")
            count += 1
    
    print(f"\nTotal chapters updated: {count}")

if __name__ == "__main__":
    main()