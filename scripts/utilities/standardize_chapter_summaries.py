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
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Original content for comparison later
        original_content = content
        
        # Check if already using tcolorbox - if so, skip
        if r'\begin{tcolorbox}' in content and 'title=Chapter Summary' in content:
            return False
        
        # Pattern 1: Check for \textit{...} summaries at the beginning of a chapter
        textit_pattern = r'\\chapter{(.*?)}\s*\n\s*\\textit{(.*?)}'
        textit_match = re.search(textit_pattern, content, re.DOTALL)
        if textit_match:
            chapter_title = textit_match.group(1)
            summary_text = textit_match.group(2)
            replacement = f'\\chapter{{{chapter_title}}}\n\n' + TCOLORBOX_TEMPLATE.format(summary_text)
            content = re.sub(textit_pattern, replacement, content, flags=re.DOTALL)
        
        # Pattern 2: Check for chapterabstract environment
        abstract_pattern = r'\\begin{chapterabstract}(.*?)\\end{chapterabstract}'
        abstract_match = re.search(abstract_pattern, content, re.DOTALL)
        if abstract_match:
            summary_text = abstract_match.group(1).strip()
            content = re.sub(abstract_pattern, TCOLORBOX_TEMPLATE.format(summary_text), content, flags=re.DOTALL)
        
        # Pattern 3: Check for other italic text formats like \emph{...} that might be used for summaries
        emph_pattern = r'\\chapter{(.*?)}\s*\n\s*\\emph{(.*?)}'
        emph_match = re.search(emph_pattern, content, re.DOTALL)
        if emph_match:
            chapter_title = emph_match.group(1)
            summary_text = emph_match.group(2)
            replacement = f'\\chapter{{{chapter_title}}}\n\n' + TCOLORBOX_TEMPLATE.format(summary_text)
            content = re.sub(emph_pattern, replacement, content, flags=re.DOTALL)
        
        # Pattern 4: Check for plain text summaries that might be in a paragraph after the chapter title
        # This is more challenging and might require manual review
        plain_summary_pattern = r'\\chapter{(.*?)}\s*\n\s*\n((?:[^\\\n]|\\[^\n])+)\n\s*\n\\section'
        plain_match = re.search(plain_summary_pattern, content, re.DOTALL)
        if plain_match and not content.startswith(r'\begin{tcolorbox}'):
            chapter_title = plain_match.group(1)
            potential_summary = plain_match.group(2).strip()
            # Check if the second group contains a tcolorbox
            if '\\begin{tcolorbox}' not in potential_summary:
                # Only convert if it looks like a summary (not too short, not code)
                if len(potential_summary) > 100 and '\\begin{' not in potential_summary:
                    replacement = f'\\chapter{{{chapter_title}}}\n\n' + TCOLORBOX_TEMPLATE.format(potential_summary) + '\n\n\\section'
                    content = re.sub(plain_summary_pattern, replacement, content, flags=re.DOTALL)
        
        # If content was modified, write it back
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}")
        return False

def main():
    """Main function to process all TeX files."""
    # Make sure we're in the correct directory
    script_dir = Path(os.path.dirname(os.path.abspath(__file__)))
    repo_root = script_dir.parent.parent  # Go up two levels to get to repo root
    
    os.chdir(repo_root)
    print(f"Working directory: {os.getcwd()}")
    
    chapters_dir = Path('chapters')
    if not chapters_dir.exists():
        print(f"Error: Chapters directory not found at {chapters_dir.absolute()}")
        return
    
    count = 0
    all_tex_files = list(chapters_dir.glob('**/*.tex'))
    print(f"Found {len(all_tex_files)} TeX files to process")
    
    for tex_file in all_tex_files:
        if process_file(tex_file):
            print(f"Updated: {tex_file}")
            count += 1
    
    print(f"\nTotal chapters updated: {count}")

if __name__ == "__main__":
    main()