# Repository Reorganization Checklist

**Date**: October 1, 2025  
**Estimated Time**: 3-4 hours

---

## PRE-MIGRATION

- [x] Commit all current changes
- [x] Create backup branch: `backup/pre-reorganization`
- [x] Push backup branch to remote
- [x] Create working branch: `refactor/repository-structure`
- [x] Verify current build works: `make pdf`

---

## CREATE DIRECTORIES

- [x] Create `theory/` directory
- [x] Create `teaching_guide/` directory
- [x] Create `student_workbook/` directory
- [x] Create `shared/` directory
- [x] Create `shared/macros/` directory
- [x] Create `shared/figures/` directory
- [x] Create `shared/examples/` directory
- [x] Create `student_workbook/chapter1/components/` directory
- [x] Create `student_workbook/chapter2/` directory
- [x] Create `teaching_guide/lecture_notes/` directory
- [x] Create `teaching_guide/assessment_rubrics/` directory
- [x] Create `teaching_guide/solutions_manual/` directory
- [x] Create `build/theory/` directory
- [x] Create `build/teaching_guide/` directory
- [x] Create `build/student_workbook/` directory

---

## MOVE THEORY FILES

- [x] Move `main.tex` to `theory/`
- [x] Move `chapters/` to `theory/`
- [x] Move `bibliography.bib` to `theory/`
- [x] Verify theory files moved correctly

---

## MOVE STUDENT WORKBOOK FILES

- [x] Move `student_workbook_chapter1.tex` to `student_workbook/chapter1/workbook.tex`
- [x] Move `student_workbook_chapter1_enhanced.tex` to `student_workbook/chapter1/workbook_enhanced.tex`
- [x] Move `student_study_book_chapter1.tex` to `student_workbook/chapter1/study_book.tex`
- [x] Move `workbooks/chapter1/*` to `student_workbook/chapter1/components/`
- [x] Remove empty `workbooks/` directory
- [x] Move `student_workbook_README.md` to `student_workbook/README.md`
- [x] Verify workbook files moved correctly

---

## MOVE SHARED RESOURCES

- [x] Move `macros/*` to `shared/macros/`
- [x] Remove empty `macros/` directory
- [x] Move `figures/*` to `shared/figures/`
- [x] Remove empty `figures/` directory
- [x] Move `examples/*` to `shared/examples/`
- [x] Remove empty `examples/` directory
- [x] Verify shared resources moved correctly

---

## ARCHIVE OLD DOCUMENTATION

- [x] Create `docs/archive/` directory
- [x] Move `ENHANCED_STUDY_BOOK.md` to `docs/archive/`
- [x] Move `student_workbook_chapter1_enhanced_outline.md` to `docs/archive/`
- [x] Move `WORKBOOK_ENHANCEMENT_PLAN.md` to `docs/archive/`

---

## UPDATE THEORY FILE PATHS

- [x] Update `theory/main.tex`: Change `macros/math_macros.tex` to `../shared/macros/math_macros.tex`
- [x] Update `theory/main.tex`: Change `macros/tikz_styles.tex` to `../shared/macros/tikz_styles.tex`
- [x] Update `theory/main.tex`: Change `macros/chapter_summary.tex` to `../shared/macros/chapter_summary.tex`
- [x] Update `theory/main.tex`: Change `figures/elder_symbol.pdf` to `../shared/figures/elder_symbol.pdf`
- [x] Update all chapter files: Change `figures/` to `../../shared/figures/` (108 files)
- [x] Update all chapter files: Change `examples/` to `../../shared/examples/`

---

## UPDATE WORKBOOK FILE PATHS

- [x] Update `student_workbook/chapter1/workbook.tex`: Change `macros/math_macros.tex` to `../../shared/macros/math_macros.tex`
- [x] Update `student_workbook/chapter1/workbook_enhanced.tex`: Change `macros/math_macros.tex` to `../../shared/macros/math_macros.tex`
- [x] Update `student_workbook/chapter1/study_book.tex`: Change `macros/math_macros.tex` to `../../shared/macros/math_macros.tex`
- [x] Update workbook component includes: Change `workbooks/chapter1/` to `components/` (7 files)

---

## CREATE TEACHING GUIDE PLACEHOLDERS

- [x] Create `teaching_guide/README.md`
- [x] Create `teaching_guide/chapter1_guide.tex` placeholder

---

## UPDATE BUILD SYSTEM

- [x] Backup existing Makefile to `Makefile.old`
- [x] Create new Makefile with updated targets
- [x] Update `.gitignore` for new build paths
- [x] Create `build/theory/.gitkeep`
- [x] Create `build/teaching_guide/.gitkeep`
- [x] Create `build/student_workbook/.gitkeep`

---

## UPDATE DOCUMENTATION

- [x] Update root `README.md` structure diagram
- [x] Update root `README.md` build instructions
- [x] Update root `README.md` file paths
- [x] Create `theory/README.md`
- [x] Verify `student_workbook/README.md` is up to date

---

## TEST COMPILATION

- [x] Test: `make theory` (934 pages, 4.2MB) - WITH List of Figures & List of Tables
  - List of Figures: 133 entries (included in PDF)
  - List of Tables: 103 entries (included in PDF)
  - Bibliography: compiled
  - Index: compiled
  - 5 LaTeX passes for complete generation
- [x] Test: `make teaching_guide` (5 pages, 70KB)
- [x] Test: `make student_workbook` (regular version only)
  - workbook.pdf (37 pages, 245KB)
- [x] Verified all PDFs generated successfully
- [x] Fixed path issues in build system
- [x] Updated Makefile with 5 LaTeX passes for complete LOF/LOT

---

## VERIFY OUTPUTS

- [x] Open `build/theory/elder_arcane_realization.pdf` (934 pages, 4.2MB)
- [x] Theory PDF compiled successfully with all 5 passes
- [x] List of Figures present and populated (133 entries, ~20 pages)
- [x] List of Tables present and populated (103 entries, ~18 pages)
- [x] Bibliography compiled (biber ran successfully)
- [x] Index compiled (makeindex ran successfully)
- [x] All workbook PDFs generated in `build/student_workbook/`
- [x] Teaching guide PDF generated in `build/teaching_guide/`
- [x] All builds use container-based compilation
- [x] Build system working correctly

---

## GIT COMMIT

- [x] Stage all changes (227 files, 1,145 insertions, 10,705 deletions)
- [x] Add reorganized directories (theory/, student_workbook/, teaching_guide/, shared/)
- [x] Add .gitkeep files for build directories
- [x] Clean auxiliary build files
- [x] Remove Makefile.old backup
- [x] Review final status
- [x] Commit with descriptive message (commit: 8d5eda5)
- [x] Push to remote: `git push origin refactor/repository-structure`

---

## CLEANUP

- [x] Remove `Makefile.old` after confirming new one works
- [x] Delete `CHAPTER1_COMPLETE.md` (no longer needed)
- [x] Archive this task list to `docs/archive/TASKLIST_COMPLETED_2025_10_01.md`

---

## POST-MIGRATION

- [x] Merge conflicts resolved (build/pdf/ files, elder_training_dag.tex)
- [x] Merge commit created and pushed (commit: 47c78ac)
- [ ] Create pull request for reorganization
      https://github.com/ykashou/latex-elder-theory/pull/new/refactor/repository-structure
---

## SUCCESS CRITERIA

- [x] All builds complete without errors
- [x] All PDFs generate correctly with figures (Theory: 934 pages, Workbook: 37 pages)
- [x] All cross-references resolve
- [x] Bibliography compiles (biber successful)
- [x] Index generates (makeindex successful)
- [x] Git history preserved (all moves tracked as renames)
- [x] No broken symlinks (no symlinks created)
- [x] Documentation updated (3 READMEs created/updated)
- [x] Build system works from repository root (make theory/student_workbook/teaching_guide)

---

## ROLLBACK (IF NEEDED)

```bash
git checkout backup/pre-reorganization
# or
git reset --hard origin/fix/chapter1-mathematical-rigor
```

---

**Start Time**: ___________  
**End Time**: ___________  
**Issues**: ___________

