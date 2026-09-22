MAIN = explanatory_note
LATEX = xelatex -interaction=nonstopmode -shell-escape

.PHONY: all check clean

all:
	$(LATEX) $(MAIN).tex
	-bibtex $(MAIN)
	$(LATEX) $(MAIN).tex
	$(LATEX) $(MAIN).tex
	@$(MAKE) --no-print-directory check

# xelatex в nonstopmode возвращает 0 даже при ошибках — судим по логам.
check:
	@bash check.sh $(MAIN)

clean:
	rm -f $(MAIN).{aux,log,toc,bbl,blg,out}
