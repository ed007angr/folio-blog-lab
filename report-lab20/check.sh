#!/usr/bin/env bash
# Проверка собранного отчёта. Вызывается из Makefile (make check).
# xelatex в nonstopmode возвращает 0 даже при ошибках, поэтому судить можно
# только по логам. Использование: bash check.sh [имя_без_расширения]
MAIN="${1:-explanatory_note}"
LOG="$MAIN.log"
BLG="$MAIN.blg"
TEX="$MAIN.tex"
fail=0

if [ ! -f "$LOG" ]; then
  echo "ОШИБКА: нет $LOG — сборка не запускалась"
  exit 1
fi

# 1. Ошибки TeX
errors=$(grep -c '^!' "$LOG" || true)
if [ "$errors" != "0" ]; then
  echo "ОШИБКА: ошибок TeX в логе — $errors:"
  grep -n -A3 '^!' "$LOG"
  fail=1
fi

# 2. Неразрешённые \ref и \cite — печатаются в PDF как ?? и [?]
if grep -q 'There were undefined references' "$LOG"; then
  echo "ОШИБКА: неразрешённые ссылки (в PDF будут ?? и [?]):"
  grep -n 'Reference .* undefined\|Citation .* undefined' "$LOG" | sort -u -t: -k2 | head -20
  fail=1
fi

# 3. Вылезание за поля: при \sloppy почти всегда означает
#    неверную формулу ширины longtable или слишком широкий рисунок.
overfull=$(grep -c 'Overfull \\hbox' "$LOG" || true)
if [ "$overfull" != "0" ]; then
  echo "ПРЕДУПРЕЖДЕНИЕ: Overfull hbox — $overfull шт. (проверить ширины таблиц и рисунков):"
  grep -n 'Overfull \\hbox' "$LOG" | head -10
fi

# 4. Молчаливые сбои bibtex (в Makefile он вызван с -, ошибки не всплывают)
bibpat="^Warning--|couldn't open|didn't find a database entry|I was expecting|^Repeated entry"
if [ -f "$BLG" ] && grep -qE "$bibpat" "$BLG"; then
  echo "ОШИБКА: проблемы в bibtex:"
  grep -nE "$bibpat" "$BLG" | head -10
  fail=1
fi

# 5. Незаполненные заглушки шаблона
if [ -f "$TEX" ]; then
  placeholders=$(grep -n 'НАЗВАНИЕ ДИСЦИПЛИНЫ\|Фамилия И\.О\.\|Название работы\|Название раздела\|Название подраздела\|screenshots/example\.png\|ref_key\|Подпись рисунка без точки\|Подпись таблицы' "$TEX" || true)
  if [ -n "$placeholders" ]; then
    echo "ОШИБКА: в тексте остались заглушки шаблона:"
    echo "$placeholders" | head -15
    fail=1
  fi
fi

pages=$(grep -oP 'Output written .*\(\K[0-9]+' "$LOG" | tail -1)
count() { if [ -f "$2" ]; then grep -c "$1" "$2" 2>/dev/null | head -1; else echo 0; fi; }
figs=$(count 'label{fig:' "$TEX")
tabs=$(count 'label{tab:' "$TEX")
srcs=$(count '\\bibitem' "$MAIN.bbl")
echo "Страниц: ${pages:-?}, рисунков: $figs, таблиц: $tabs, источников: $srcs"

if [ "$fail" != "0" ]; then
  echo "ПРОВЕРКА НЕ ПРОЙДЕНА — отчёт сдавать нельзя"
  exit 1
fi
echo "Проверка пройдена"
