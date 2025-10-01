# Repository Reorganization Checklist

**Date**: October 1, 2025  
**Estimated Time**: 3-4 hours

---

## PRE-MIGRATION

- [ ] Commit all current changes
- [ ] Create backup branch: `backup/pre-reorganization`
- [ ] Push backup branch to remote
- [ ] Create working branch: `refactor/repository-structure`
- [ ] Verify current build works: `make pdf`

---

## CREATE DIRECTORIES

- [ ] Create `theory/` directory
- [ ] Create `teaching_guide/` directory
- [ ] Create `student_workbook/` directory
- [ ] Create `shared/` directory
- [ ] Create `shared/macros/` directory
- [ ] Create `shared/figures/` directory
- [ ] Create `shared/examples/` directory
- [ ] Create `student_workbook/chapter1/components/` directory
- [ ] Create `student_workbook/chapter2/` directory
- [ ] Create `teaching_guide/lecture_notes/` directory
- [ ] Create `teaching_guide/assessment_rubrics/` directory
- [ ] Create `teaching_guide/solutions_manual/` directory
- [ ] Create `build/theory/` directory
- [ ] Create `build/teaching_guide/` directory
- [ ] Create `build/student_workbook/` directory

---

## MOVE THEORY FILES

- [ ] Move `main.tex` to `theory/`
- [ ] Move `chapters/` to `theory/`
- [ ] Move `bibliography.bib` to `theory/`
- [ ] Verify theory files moved correctly

---

## MOVE STUDENT WORKBOOK FILES

- [ ] Move `student_workbook_chapter1.tex` to `student_workbook/chapter1/workbook.tex`
- [ ] Move `student_workbook_chapter1_enhanced.tex` to `student_workbook/chapter1/workbook_enhanced.tex`
- [ ] Move `student_study_book_chapter1.tex` to `student_workbook/chapter1/study_book.tex`
- [ ] Move `workbooks/chapter1/*` to `student_workbook/chapter1/components/`
- [ ] Remove empty `workbooks/` directory
- [ ] Move `student_workbook_README.md` to `student_workbook/README.md`
- [ ] Verify workbook files moved correctly

---

## MOVE SHARED RESOURCES

- [ ] Move `macros/*` to `shared/macros/`
- [ ] Remove empty `macros/` directory
- [ ] Move `figures/*` to `shared/figures/`
- [ ] Remove empty `figures/` directory
- [ ] Move `examples/*` to `shared/examples/`
- [ ] Remove empty `examples/` directory
- [ ] Verify shared resources moved correctly

---

## ARCHIVE OLD DOCUMENTATION

- [ ] Create `docs/archive/` directory
- [ ] Move `ENHANCED_STUDY_BOOK.md` to `docs/archive/`
- [ ] Move `student_workbook_chapter1_enhanced_outline.md` to `docs/archive/`
- [ ] Move `WORKBOOK_ENHANCEMENT_PLAN.md` to `docs/archive/`

---

## UPDATE THEORY FILE PATHS

- [ ] Update `theory/main.tex`: Change `macros/math_macros.tex` to `../shared/macros/math_macros.tex`
- [ ] Update `theory/main.tex`: Change `macros/tikz_styles.tex` to `../shared/macros/tikz_styles.tex`
- [ ] Update `theory/main.tex`: Change `macros/chapter_summary.tex` to `../shared/macros/chapter_summary.tex`
- [ ] Update `theory/main.tex`: Change `figures/elder_symbol.pdf` to `../shared/figures/elder_symbol.pdf`
- [ ] Update all chapter files: Change `figures/` to `../../shared/figures/`
- [ ] Update all chapter files: Change `examples/` to `../../shared/examples/`

---

## UPDATE WORKBOOK FILE PATHS

- [ ] Update `student_workbook/chapter1/workbook.tex`: Change `macros/math_macros.tex` to `../../shared/macros/math_macros.tex`
- [ ] Update `student_workbook/chapter1/workbook_enhanced.tex`: Change `macros/math_macros.tex` to `../../shared/macros/math_macros.tex`
- [ ] Update `student_workbook/chapter1/study_book.tex`: Change `macros/math_macros.tex` to `../../shared/macros/math_macros.tex`
- [ ] Update workbook component includes: Change `workbooks/chapter1/` to `components/`

---

## CREATE TEACHING GUIDE PLACEHOLDERS

- [ ] Create `teaching_guide/README.md`
- [ ] Create `teaching_guide/chapter1_guide.tex` placeholder

---

## UPDATE BUILD SYSTEM

- [ ] Backup existing Makefile to `Makefile.old`
- [ ] Create new Makefile with updated targets
- [ ] Update `.gitignore` for new build paths
- [ ] Create `build/theory/.gitkeep`
- [ ] Create `build/teaching_guide/.gitkeep`
- [ ] Create `build/student_workbook/.gitkeep`

---

## UPDATE DOCUMENTATION

- [ ] Update root `README.md` structure diagram
- [ ] Update root `README.md` build instructions
- [ ] Update root `README.md` file paths
- [ ] Create `theory/README.md`
- [ ] Verify `student_workbook/README.md` is up to date

---

## TEST COMPILATION

- [ ] Test: `make theory`
- [ ] Test: `make workbook-chapter1`
- [ ] Test: `make workbook-chapter1-enhanced`
- [ ] Test: `make workbook-chapter1-study`
- [ ] Test: `make theory-quick`
- [ ] Test: `make clean`
- [ ] Test: `make realclean`
- [ ] Test: `make all`

---

## VERIFY OUTPUTS

- [ ] Open `build/theory/elder_arcane_realization.pdf`
- [ ] Verify all figures display correctly in theory PDF
- [ ] Verify table of contents works
- [ ] Verify cross-references work
- [ ] Verify bibliography compiled
- [ ] Verify index compiled
- [ ] Open all workbook PDFs in `build/student_workbook/`
- [ ] Verify workbook exercises render correctly
- [ ] Verify workbook formulas display correctly
- [ ] Verify TikZ diagrams appear in workbooks

---

## GIT COMMIT

- [ ] Stage all changes: `git add -A`
- [ ] Review changes: `git status` and `git diff --staged --stat`
- [ ] Commit with descriptive message
- [ ] Push to remote: `git push origin refactor/repository-structure`

---

## BACKWARD COMPATIBILITY (OPTIONAL)

- [ ] Create symlink: `ln -s theory/main.tex main.tex`
- [ ] Create symlink: `ln -s theory/chapters chapters`
- [ ] Create symlink: `ln -s shared/macros macros`
- [ ] Create symlink: `ln -s shared/figures figures`
- [ ] Update `.gitignore` to ignore symlinks
- [ ] Test that old commands still work

---

## CLEANUP

- [ ] Remove `Makefile.old` after confirming new one works
- [ ] Archive this task list to `docs/archive/TASKLIST_COMPLETED_2025_10_01.md`
- [ ] Update `CHAPTER1_COMPLETE.md` with new paths

---

## POST-MIGRATION

- [ ] Create pull request for reorganization
- [ ] Update CI/CD pipelines (if applicable)
- [ ] Update external documentation
- [ ] Notify collaborators of new structure

---

## SUCCESS CRITERIA

- [ ] All builds complete without errors
- [ ] All PDFs generate correctly with figures
- [ ] All cross-references resolve
- [ ] Bibliography compiles
- [ ] Index generates
- [ ] Git history preserved
- [ ] No broken symlinks
- [ ] Documentation updated
- [ ] Build system works from repository root

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

