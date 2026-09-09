# Folio — сборка файла в Figma

Точные значения для лабораторной: Frames, Auto Layout, Variants, Styles, Prototype.

## Быстрый способ — Scripter

1. Откройте [labs](https://www.figma.com/design/EFldmsi6T5KTOauN2LTj03/labs?m=auto&t=Xsfa9UB2NnQIQYx6-6).
2. В Figma: **Plugins → Scripter** (Community plugin by Gleb / rsms).
3. Вставьте содержимое [`scripts/folio-scripter.js`](scripts/folio-scripter.js) целиком и нажмите **Run**.
4. Скрипт создаёт страницы Cover / Components / Prototype, Color·Text·Effect Styles, компоненты с Variants и прототип Like.
5. **Share → Anyone with the link can view.**

Ниже — ручная сборка, если Scripter недоступен.

## 0. Файл и страницы

1. Откройте файл [labs](https://www.figma.com/design/EFldmsi6T5KTOauN2LTj03) (`https://www.figma.com/design/EFldmsi6T5KTOauN2LTj03`). Если создаёте с нуля: New design file → имя: `labs`.
2. Создайте страницы (переименуйте Page 1 и добавьте остальные):
   - `Cover`
   - `Styles`
   - `Components`
   - `Prototype`
   - `Drafts`

## 1. Импорт ассетов

Перетащите в файл (или File → Place image / drag-and-drop):

| Файл | Куда |
| --- | --- |
| `assets/svg/logo.svg` | Cover + шапка Components |
| `assets/svg/logo-mark.svg` | Favicon / маленький знак |
| `assets/svg/icon-like.svg` | Button / Card actions |
| `assets/svg/icon-like-filled.svg` | Liked variant |
| `assets/svg/icon-comment.svg` | Comment button / card |
| `assets/svg/icon-share.svg` | Card share |
| `assets/svg/avatar-placeholder.svg` | Avatar component |
| `assets/raster/article-preview@2x.jpg` | Article Card image (лучше @2x) |

После импорта SVG: Outline Stroke не нужен — пути уже кривые, заливки sRGB, лишних групп нет.

## 2. Styles (страница Styles)

### Color styles

Создайте стили (справа Fill → Style icon → +):

- `color/brand/primary` `#0F3D3A`
- `color/brand/primary-hover` `#0A2E2C`
- `color/brand/primary-soft` `#E7F1F0`
- `color/accent/like` `#C45C4A`
- `color/accent/like-hover` `#A84A3B`
- `color/ink/primary` `#1C1917`
- `color/ink/secondary` `#57534E`
- `color/ink/muted` `#A8A29E`
- `color/paper/default` `#FAF6F1`
- `color/paper/elevated` `#FFFFFF`
- `color/line/subtle` `#E7E5E4`
- `color/state/disabled` `#D6D3D1`

Разложите swatch-фреймы 120×80 с подписью имени стиля и HEX (Text style `type/caption`).

### Text styles

Подключите Google Fonts: **Playfair Display**, **Inter**.

- `type/display` Playfair Display SemiBold 28 / 34, letter 0
- `type/title` Playfair Display SemiBold 20 / 28
- `type/body` Inter Regular 16 / 24
- `type/caption` Inter Medium 13 / 18
- `type/button` Inter SemiBold 14 / 20

### Effect styles

- `elevation/card` Drop shadow X0 Y8 Blur 24 Spread 0 `#1C1917` 8%
- `elevation/hover` Drop shadow X0 Y12 Blur 32 Spread 0 `#1C1917` 12%
- `focus/ring` Inner/outer: лучше отдельный stroke 2px `brand/primary` + fill overlay не нужен; для прототипа Comment Input: stroke `brand/primary`

Фон страницы Styles: `#FAF6F1`.

## 3. Components (страница Components)

Сетка: секции с заголовком `type/display`, отступ между блоками 80.

### 3.1 Avatar

1. Frame `Avatar` 32×32, clip content, corner radius 16 (полный круг).
2. Внутри: `avatar-placeholder.svg` (constraints Fill) или PNG `@64`.
3. Create component.
4. Variants property `Size`: `32` / `48` / `64` (фреймы 32, 48, 64, radius = половина стороны).

Auto Layout не обязателен (фиксированный квадрат), но удобно: Auto Layout, Hug, padding 0.

### 3.2 Button

1. Frame, Auto Layout **Horizontal**:
   - Padding: 12 / 20
   - Gap: 8
   - Align: Center
   - Hug contents
   - Radius: 10
2. Иконка 18×18 + текст `type/button`.
3. Create component `Button`.
4. Variants:
   - Property `Type`: `Post` | `Like` | `Comment`
   - Property `State`: `Default` | `Hover` | `Disabled`

| Type | State | Fill | Text/icon color |
| --- | --- | --- | --- |
| Post | Default | brand/primary | white |
| Post | Hover | brand/primary-hover | white |
| Post | Disabled | state/disabled | white |
| Like | Default | paper/elevated + stroke line/subtle | accent/like |
| Like | Hover | #F8EBE8 | accent/like-hover |
| Comment | Default | paper/elevated + stroke line/subtle | brand/primary |
| Comment | Hover | brand/primary-soft | brand/primary-hover |

Иконки: Like → `icon-like.svg`, Comment → `icon-comment.svg`, Post → простая иконка «отправить» (прямоугольник + стрелка) или без иконки — в варианте проекта указаны Post, Like, Comment.

### 3.3 Article Card

1. Frame `Article Card` width **360**, Auto Layout **Vertical**, Hug height, clip content, radius 16, fill `paper/elevated`, effect `elevation/card`.
2. Image: 360×200, fill Image (article-preview @2x), crop.
3. Content frame Auto Layout Vertical, padding 20, gap 12:
   - Title `type/title`
   - Excerpt `type/body`, color ink/secondary
   - Meta: Auto Layout Horizontal, gap 10 — instance Avatar/32 + колонка имени/даты `type/caption`
   - Actions: Auto Layout Horizontal, gap 8 — Like / Comment / Share (можно мелкие icon-buttons: padding 8/12, radius 999)

4. Variants:
   - `State=Default`
   - `State=Hover` — effect `elevation/hover`, чуть темнее overlay на фото 4% black
   - `State=Liked` — filled heart, счётчик +1, цвет accent/like

### 3.4 Comment Input

1. Frame width 560, Auto Layout Horizontal, padding 16, gap 12, radius 12, fill elevated, stroke `line/subtle`.
2. Avatar/48.
3. Right column Auto Layout Vertical, Fill, gap 10:
   - Text `Напишите комментарий…` `type/body`, ink/muted (placeholder) / ink/primary (filled)
   - Bar: Auto Layout Horizontal, Space between — caption + instance Button/Post

4. Variants `State=Default | Focused | Filled`:
   - Focused: stroke `brand/primary`, optional 4px ring `#0F3D3A` at 12% (второй drop-shadow или отдельный stroke overlay)

## 4. Prototype (страница Prototype)

Скопируйте Article Card Default и Liked рядом (или используйте Interactive components).

**Способ A — Interactive component (предпочтительно):**

1. Выделите набор вариантов Article Card.
2. Prototype tab.
3. С иконки Like на `Default` → `Liked`:
   - Trigger: `On click`
   - Action: `Change to` → Liked
   - Animation: Instant или Smart animate 120ms
4. Обратно с Liked → Default тем же кликом.
5. Для Button: While hovering Default → Hover (Smart animate 80ms).

**Способ B — отдельные фреймы-экраны** `Card / Default` → `Card / Liked` с Flow starting point.

Добавьте Flow: `Like interaction`.

## 5. Cover

Фрейм 1440×900, fill `brand/primary`, логотип `logo.svg`, заголовок «Folio UI Kit», подзаголовок «Блоговая платформа · компоненты и ассеты».

## 6. Доступ

Share → Anyone with the link can view → скопировать ссылку в отчёт.
