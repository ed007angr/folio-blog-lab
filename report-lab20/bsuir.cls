%%% metadata
% define class
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{bsuir}[2024/02/14 BSUIR ENSTD 2017 compatible class]
% configure paper and margins
\LoadClass[14pt,final,onecolumn,oneside,titlepage,openany]{extreport}
% СТП 01-2024, прил. Л: левое 30 мм, правое 15 мм, верхнее и нижнее 20 мм,
% номер страницы — 10 мм от нижнего края листа.
% headheight=0pt и headsep=0pt обнуляют место, которое geometry резервирует
% под пустую шапку: без этого тело документа начинается в ~33 мм, а не в 20 мм.
\RequirePackage[    
    a4paper,
    left=30mm,
    right=15mm,
    top=20mm,
    bottom=20mm,
    footskip=10mm,
    headheight=0pt,
    headsep=0pt
]{geometry}
% СТП 01-2024, п. 2.1.1: межстрочный интервал — 1,0 (18 пунктов) для TNR 14 pt.
% extreport при 14 pt задаёт \baselineskip = 17 pt, поэтому растягиваем на 18/17.
\RequirePackage{setspace}
\setstretch{1.0588}
\setlength{\parindent}{1.25cm}
% extreport при 14pt устанавливает \topskip=14pt, что добавляет ~4 pt пустого
% пространства над первой строкой на каждой новой странице. Возвращаем
% стандартное значение ядра LaTeX: 10pt. При cap-height ≈ 10pt первые прописные
% буквы оказываются ровно на верхней границе текстовой области (= 20 мм).
\setlength{\topskip}{10pt}

%%% class options
\RequirePackage{kvoptions}
% init
\SetupKeyvalOptions{
    family=KVO,
    prefix=KVO@
}
% variant is one of: custom, labwork, practical, courcework, courceproject, diploma, practice
\DeclareStringOption[custom]{variant}
% load them
\ProcessKeyvalOptions{KVO}
% validate variant
\RequirePackage{xifthen}
\ifthenelse{
    \equal{\KVO@variant}{custom}\OR
    \equal{\KVO@variant}{labwork}\OR
    \equal{\KVO@variant}{practical}\OR
    \equal{\KVO@variant}{courcework}\OR
    \equal{\KVO@variant}{courceproject}\OR
    \equal{\KVO@variant}{diploma}\OR
    \equal{\KVO@variant}{practice}
}{}{
    \ClassError{bsuir}{Unknown variant. Use one of: custom, labwork, practical,
        courcework, courceproject, diploma, practice}{\KVO@variant variant not available}
}

%%% language
% translations
\RequirePackage{iftex}
\ifPDFTeX
    % pdfLaTeX doesn't support \babelfont (XeLaTeX/LuaLaTeX only).
    % Keep the class usable under pdfLaTeX with Cyrillic support.
    \RequirePackage[T2A]{fontenc}
    \RequirePackage[main=russian,english]{babel}
\else
    \RequirePackage[main=russian,english]{babel}
    % fonts (XeLaTeX/LuaLaTeX)
    \babelfont{rm}{Times New Roman}
    \babelfont{sf}{Times New Roman}
    \babelfont{tt}{Courier New}
\fi

%%% TeX improvements
% for ...DocumentCommand
\RequirePackage{xparse}

%%% math
% Загружаем amsmath ДО hyperref, иначе ломается \label внутри equation.
\RequirePackage{amsmath}

%%% misc
% break long URLs
\RequirePackage{xurl}
% to merge other pdf files into document
\RequirePackage{pdfpages}
% fancy quotes
\RequirePackage{csquotes}
% enable links
\RequirePackage[
    hidelinks,
    unicode,
    bookmarksdepth=3,
    breaklinks
]{hyperref}
% make metadata toc
\RequirePackage{bookmark}
% for rows of images
\RequirePackage{subcaption}
% bibliography style
\bibliographystyle{ugost2003}

%%% page numbering
\RequirePackage{fancyhdr}
% define style
\fancypagestyle{plain}{
    \fancyhf{}
    \rfoot{\thepage}
    \renewcommand{\headrulewidth}{0pt}
    \renewcommand{\footrulewidth}{0pt}
}
\pagestyle{plain}

%%% load bsuir packages
% headings, toc, appendices
\RequirePackage{bsuir-sectioning}

% bsuir-sectioning открывает окружение tocexception сразу после \begin{document},
% поэтому \let\ltx@label\label из amsmath попадает в локальную группу и теряется
% после \tableofcontents. Гарантированно переопределяем глобально, чтобы \label
% работал внутри equation/figure после ToC.
\AddToHook{begindocument/end}[bsuir-fix]{\global\let\ltx@label\label}

%%% lists
\RequirePackage{enumitem}
% itemize
\setlist[itemize]{
    label=--,
    leftmargin=1.4\parindent,
    topsep=0pt,
    itemsep=0pt,
    parsep=0pt
}
% enumerate
\setlist[enumerate]{
    label=\arabic*,
    leftmargin=1.5\parindent,
    topsep=0pt,
    itemsep=0pt,
    parsep=0pt
}
\setlist[enumerate,2]{label=\arabic*}
\setlist[enumerate,3]{label=\arabic*}

%%% equations
% СТП 01-2024, п. 2.4.6: нумерация формул в пределах раздела, например (2.7).
% Внутри .cls символ @ уже является буквой, поэтому \makeatletter не нужен
% (а \makeatother здесь сломал бы все последующие внутренние команды).
\renewcommand{\theequation}{\arabic{chapter}.\arabic{equation}}
\@addtoreset{equation}{chapter}

% СТП 01-2024, п. 2.5: нумерация рисунков в пределах раздела, например «Рисунок 2.1».
\renewcommand{\thefigure}{\arabic{chapter}.\arabic{figure}}
\@addtoreset{figure}{chapter}

% СТП 01-2024, п. 2.6.2: нумерация таблиц в пределах раздела, например «Таблица 1.2».
\renewcommand{\thetable}{\arabic{chapter}.\arabic{table}}
\@addtoreset{table}{chapter}

%%% figures
% figures factory
\RequirePackage{float}
\RequirePackage[
    aboveskip=1.2\baselineskip,
    belowskip=-0.3\baselineskip
]{caption}
% СТП 01-2024, п. 2.5.5: подпись рисунка по центру относительно рисунка,
% многострочная подпись также центрируется по каждой строке.
\captionsetup[figure]{
    name=Рисунок,
    labelsep=endash,
    justification=centering,
    singlelinecheck=false
}
% \makefigure
\NewDocumentCommand{\makefigure}{
    O{img} % figure prefix
    m % figure name
    m % code to make figure
}{
    \vspace{0.5\baselineskip}
    \begin{figure}[H]
        \centering
        #3
        \label{#1:#2}
    \end{figure}
    \vspace{-0.6\baselineskip}
}

%%% images
% \makeimage
\RequirePackage{graphicx}
\NewDocumentCommand{\makeimage}{
    o % caption
    m % filename
    O{width=\textwidth} % image width
}{
    \makefigure{#2}{
        \includegraphics[#3]{#2}
        \IfValueT{#1}{\caption{#1}}
    }
}
% \makesvg
\RequirePackage{svg}
\NewDocumentCommand{\makesvg}{
    o % caption
    m % filename
    O{width=\textwidth} % image width
}{
    \makefigure{#2}{
        \includesvg[inkscapelatex=false,#3]{#2}
        \IfValueT{#1}{\caption{#1}}
    }
}

%%% listings
\RequirePackage{minted}
\setminted{
    fontsize=\fontsize{12}{\baselineskip},
    tabsize=2,
    breaklines,
    mathescape,
    stripnl,
    breakanywhere,
    breaksymbolleft=,
    breaksymbolright=,
    breakbeforesymbolpre=,
    breakaftersymbolpre=,
    breakanywheresymbolpre=,
    breakautoindent=false,
}
% unite counters
\BeforeBeginEnvironment{document}{
    \makeatletter
    \let\c@figure\c@listing
    \makeatother
}
% set caption
\renewcommand\listingscaption{Рисунок}
\newenvironment{listingcaption}
{\captionsetup{type=listing,name=Рисунок,labelsep=endash}}{}
% fix listings numbering
\renewcommand{\thelisting}{\arabic{chapter}.\arabic{listing}}
% \makelisting
\NewDocumentCommand{\makelisting}{
    m % file
    o % caption
}{
    \begin{listingcaption}
        \centering
        \inputminted{text}{#1}
        \IfValueT{#2}{\caption{#2}~\\}
        \label{lst:#1}
    \end{listingcaption}
}

%%% tables
\RequirePackage{array}
\RequirePackage{longtable}
% caption
% СТП 01-2024, п. 2.6: подпись начинается от левой границы таблицы (raggedright),
% без пробельного отступа между подписью и самой таблицей (skip=0pt).
% ВАЖНО: skip=0pt работает корректно только без indent=0pt и без LTleft=0pt —
% иначе ltcaption.sty вычисляет ширину caption в двойном размере (Overfull hbox).
\captionsetup[longtable]{
    name=Таблица,
    labelsep=endash,
    justification=raggedright,
    singlelinecheck=false,
    skip=0pt
}
% margins
\LTpre=\baselineskip
\LTpost=\baselineskip
% По умолчанию longtable центрирует таблицу (\LTleft=\fill, \LTright=\fill).
% Для полноширинных таблиц (столбцы суммарно = \textwidth) центрирование и
% \LTleft=0pt дают одинаковый результат — \LTleft менять не нужно.

%%% translations
\addto\captionsrussian{
    \renewcommand{\contentsname}{Содержание}
    \renewcommand{\bibname}{Список использованных источников}
}

%%% template variables
\newcommand{\faculty}[1]{\def\@faculty{#1}}
\newcommand{\departmentlong}[1]{\def\@departmentlong{#1}}
\newcommand{\departmentshort}[1]{\def\@departmentshort{#1}}
\newcommand{\manager}[1]{\def\@manager{#1}}
\newcommand{\worktitle}[1]{\def\@worktitle{#1}}
\newcommand{\workcode}[1]{\def\@workcode{#1}}
\newcommand{\titlepageyear}[1]{\def\@titlepageyear{#1}}
\newcommand{\titleright}[1]{\def\@titleright{#1}}
\newcommand{\titlecenter}[1]{\def\@titlecenter{#1}}
\newcommand{\titleleft}[1]{\def\@titleleft{#1}}
\newcommand{\group}[1]{\def\@group{#1}}
\newcommand{\student}[1]{\def\@student{#1}}
\newcommand{\coursename}[1]{\def\@coursename{#1}}

%%% titlepage
\renewcommand{\maketitle}{
    \begin{titlepage}
        % all
        \centering
        Министерство образования Республики Беларусь\\
        [\the\baselineskip]
        Учреждение образования\\
        \MakeUppercase{
            Белорусский Государственный Университет\\
            Информатики и Радиоэлектроники
        }\\
        [\the\baselineskip]

        
        \ifthenelse{\equal{\KVO@variant}{diploma}}{
            % diploma
            \raggedright
            \begin{tabular}{l l}
                Факультет & \@faculty        \\
                Кафедра   & \@departmentlong
            \end{tabular}\\
            [\the\baselineskip]
        }{
        % other
        \raggedright
        \begin{tabular}{l l l}
            Факультет & \@faculty        \\
            Кафедра   & \@departmentlong \\
            Дисциплина & \@coursename
        \end{tabular}\\
        [\dimexpr\the\baselineskip * 3]
        }

        \ifthenelse{\equal{\KVO@variant}{diploma}}{
        % diploma
        \raggedleft
        \begin{tabular}{l}
            \textit{К защите допустить}:          \\\\
            Заведующий кафедрой \@departmentshort \\
            \hrulefill \@manager
        \end{tabular}\\
        [\the\baselineskip]
        }{
        % other
        ~\\[\dimexpr\the\baselineskip * 4]
        }

        \ifthenelse{\equal{\KVO@variant}{custom}}{
        % custom
        \@worktitle\\
        [\dimexpr\the\baselineskip * 7]
        }{\ifthenelse{\equal{\KVO@variant}{practice}}{
        % practice
        \MakeUppercase{Отчет по учебной (\@worktitle) практике}\\
        [\dimexpr\the\baselineskip * 7]
        }{\ifthenelse{\equal{\KVO@variant}{labwork}\OR\equal{\KVO@variant}{practical}}{
        % labwork / practical
        \center
        \ifthenelse{\equal{\KVO@variant}{practical}}{Практическое занятие}{Лабораторная работа} \textnumero\@workcode\\
        \textquote{\@worktitle}\\
        [\dimexpr\the\baselineskip * 7]
        }{
        % courcework, diploma
        \centering
        \MakeUppercase{Пояснительная записка}\\
        \ifthenelse{\equal{\KVO@variant}{courcework}}{к курсовой работе}{
        \ifthenelse{\equal{\KVO@variant}{courceproject}}{к курсовому проекту}{к дипломной работе}}\\
        на тему\\
        [\the\baselineskip]
        \textbf{\MakeUppercase{\@worktitle}}\\
        [\the\baselineskip]
        \@workcode\\
        [\the\baselineskip]
        }}}

        \ifthenelse{\equal{\KVO@variant}{practice}}{
            % practice
            \begin{tabular}{l}
                Студент группы \@group \\\\
                Руководитель практики  \\
                от кафедры \@departmentshort
            \end{tabular}\hfill
            \begin{tabular}{c c l}
                \hrulefill & \hspace{30pt} & \@student \\
                \textsuperscript{(подпись)}            \\
                \hrulefill &               & \@manager \\
                ~
            \end{tabular}
        }{\ifthenelse{
            \equal{\KVO@variant}{courcework}\OR
            \equal{\KVO@variant}{courceproject}
        }{
            % courcework / courceproject
            \vspace{4\baselineskip}
            \begin{tabular}[t]{l}
                Студент группы \@group \\\\
                Руководитель  \\
            \end{tabular}\hfill
            \begin{tabular}[t]{c c l}
                \hrulefill & \hspace{30pt} & \@student \\
                \textsuperscript{(подпись)}            \\
                \hrulefill &               & \@manager \\
                \textsuperscript{(подпись)}            \\
                ~
            \end{tabular}
        
            % other
            \begin{tabular}{l}
                \@titleleft
            \end{tabular}\hfill
            \begin{tabular}{l}
                \@titleright
            \end{tabular}
        }}{\ifthenelse{\equal{\KVO@variant}{labwork}\OR\equal{\KVO@variant}{practical}}{
            % labwork / practical
            \vspace{4\baselineskip}
            \begin{tabular}[t]{l}
                Студент группы \@group \\\\
                Руководитель  \\
            \end{tabular}\hfill
            \begin{tabular}[t]{c c l}
                \hrulefill & \hspace{30pt} & \@student \\
                \textsuperscript{(подпись)}            \\
                \hrulefill &               & \@manager \\
                \textsuperscript{(подпись)}            \\
                ~
            \end{tabular}
        
            % other
            \begin{tabular}{l}
                \@titleleft
            \end{tabular}\hfill
            \begin{tabular}{l}
                \@titleright
            \end{tabular}
        }}

        % all
        \vfill
        \centering
        Минск \@titlepageyear
    \end{titlepage}
    \stepcounter{page}
}
