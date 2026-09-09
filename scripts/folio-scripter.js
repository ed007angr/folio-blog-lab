/**
 * Folio UI Kit — скрипт для плагина Scripter (Figma).
 *
 * Как запустить:
 * 1. Откройте файл labs: https://www.figma.com/design/EFldmsi6T5KTOauN2LTj03
 * 2. Plugins → Scripter (или Community → Scripter).
 * 3. Вставьте ЭТОТ файл целиком → Run.
 * 4. Повторный запуск очищает страницы Cover / Components / Prototype и собирает заново.
 *
 * Starter: максимум 3 страницы — Cover, Components, Prototype.
 * Стили лежат на Cover. JPEG превью встроен; оригинал также в assets/raster/.
 *
 * Не вызывайте figma.closePlugin() — Scripter сам держит консоль print().
 */

const C = {
  brand: "#0F3D3A",
  brandHover: "#0A2E2C",
  brandSoft: "#E7F1F0",
  like: "#C45C4A",
  likeHover: "#A84A3B",
  likeSoft: "#F8EBE8",
  ink: "#1C1917",
  ink2: "#57534E",
  muted: "#A8A29E",
  paper: "#FAF6F1",
  elevated: "#FFFFFF",
  line: "#E7E5E4",
  disabled: "#D6D3D1",
  white: "#FFFFFF",
};

const SVG = {
  like:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#C45C4A" fill-rule="evenodd" d="M12 20.4c-.42 0-.82-.15-1.13-.42C7.82 17.4 3.2 13.18 3.2 8.92A4.72 4.72 0 0 1 8.04 4.1c1.55 0 2.98.72 3.96 1.9A4.98 4.98 0 0 1 15.96 4.1 4.72 4.72 0 0 1 20.8 8.92c0 4.26-4.62 8.48-7.67 11.06-.31.27-.71.42-1.13.42Zm0-2.62c2.96-2.45 6.7-6.12 6.7-8.86a2.62 2.62 0 0 0-2.74-2.72c-1.14 0-2.2.6-2.78 1.58L12 9.28l-1.18-1.5A3.22 3.22 0 0 0 8.04 6.2 2.62 2.62 0 0 0 5.3 8.92c0 2.74 3.74 6.41 6.7 8.86Z"/></svg>',
  likeFilled:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#C45C4A" d="M12 20.4c-.42 0-.82-.15-1.13-.42C7.82 17.4 3.2 13.18 3.2 8.92A4.72 4.72 0 0 1 8.04 4.1c1.55 0 2.98.72 3.96 1.9A4.98 4.98 0 0 1 15.96 4.1 4.72 4.72 0 0 1 20.8 8.92c0 4.26-4.62 8.48-7.67 11.06-.31.27-.71.42-1.13.42Z"/></svg>',
  comment:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#0F3D3A" fill-rule="evenodd" d="M6.2 3.5h11.6A3.7 3.7 0 0 1 21.5 7.2v7.4a3.7 3.7 0 0 1-3.7 3.7H10.2l-4.55 3.28A1.15 1.15 0 0 1 3.8 20.6V7.2A3.7 3.7 0 0 1 6.2 3.5Zm11.6 2.1H6.2c-.88 0-1.6.72-1.6 1.6v11.05l2.95-2.12h10.25c.88 0 1.6-.72 1.6-1.6V7.2c0-.88-.72-1.6-1.6-1.6Z"/></svg>',
  share:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#0F3D3A" d="M17.4 9.35a2.85 2.85 0 1 1 .86 2.02l-6.08 3.24a2.86 2.86 0 0 1 0 1.78l6.08 3.24a2.85 2.85 0 1 1-.86 1.72l-6.08-3.24a2.85 2.85 0 1 1 0-5.22l6.08-3.24c.2.18.43.33.68.44Z"/></svg>',
  send:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FAF6F1" d="M3.4 4.2c-.7-.3-1.4.4-1.2 1.1l2.3 7.1H12a.9.9 0 0 1 0 1.8H4.5l-2.3 7.1c-.2.7.5 1.4 1.2 1.1l17.2-8.1c.7-.3.7-1.3 0-1.6L3.4 4.2Z"/></svg>',
  avatar:
    '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#E7E5E4"/><path fill="#A8A29E" d="M32 33.2c-5.15 0-9.3-4.2-9.3-9.4 0-5.18 4.15-9.38 9.3-9.38s9.3 4.2 9.3 9.38c0 5.2-4.15 9.4-9.3 9.4Zm0 3.5c8.85 0 16.4 4.55 19.55 11.12A31.7 31.7 0 0 1 32 64a31.7 31.7 0 0 1-19.55-16.18C15.6 41.25 23.15 36.7 32 36.7Z"/></svg>',
  logo:
    '<svg xmlns="http://www.w3.org/2000/svg" width="148" height="32" viewBox="0 0 148 32"><path fill="#0F3D3A" d="M6.2 4.4C6.2 3.1 7.3 2 8.6 2h6.7c1.3 0 2.4 1.1 2.4 2.4v19.3c0 .9-.7 1.6-1.6 1.6H7.8c-.9 0-1.6-.7-1.6-1.6V4.4Z"/><path fill="#1F5C57" d="M17.7 4.4C17.7 3.1 18.8 2 20.1 2H26.8c1.3 0 2.4 1.1 2.4 2.4v19.3c0 .9-.7 1.6-1.6 1.6h-8.3c-.9 0-1.6-.7-1.6-1.6V4.4Z"/><path fill="#FAF6F1" d="M8.8 5.2h6.1v16.4H8.8z"/><path fill="#FAF6F1" d="M20.3 5.2h6.1v16.4h-6.1z"/><path fill="#C45C4A" d="M13.2 2h2.6v7.2L14.5 7.6 13.2 9.2V2Z"/><path fill="#0F3D3A" d="M43.1 24.2c-5.3 0-8.8-3.3-8.8-8.4 0-5.2 3.6-8.5 8.9-8.5 3.4 0 6 1.4 7.3 3.7l-2.5 1.5c-.9-1.6-2.6-2.6-4.8-2.6-3.3 0-5.4 2.3-5.4 5.9 0 3.5 2.1 5.8 5.4 5.8 2.3 0 4.1-1 5-2.7l2.6 1.4c-1.4 2.5-4.2 3.9-7.7 3.9Zm16.6.1c-4.6 0-7.6-3.2-7.6-8.3 0-5.2 3.1-8.4 7.6-8.4s7.6 3.2 7.6 8.4c0 5.1-3.1 8.3-7.6 8.3Zm0-2.6c2.6 0 4.2-2.1 4.2-5.7 0-3.7-1.6-5.8-4.2-5.8s-4.2 2.1-4.2 5.8c0 3.6 1.6 5.7 4.2 5.7Zm12.8 2.3V7.8h3.3v16.2h-3.3Zm8.4 0V7.8h3.2l6.6 10.4h.1V7.8h3.2v16.2h-3.2l-6.6-10.5h-.1v10.5h-3.2Zm17.4.3c-4.6 0-7.6-3.2-7.6-8.3 0-5.2 3.1-8.4 7.6-8.4s7.6 3.2 7.6 8.4c0 5.1-3.1 8.3-7.6 8.3Zm0-2.6c2.6 0 4.2-2.1 4.2-5.7 0-3.7-1.6-5.8-4.2-5.8s-4.2 2.1-4.2 5.8c0 3.6 1.6 5.7 4.2 5.7Z"/></svg>',
  mark:
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#0F3D3A" d="M4.2 5.4C4.2 4.1 5.3 3 6.6 3h8.2c1.3 0 2.4 1.1 2.4 2.4v19.2c0 1.1-.9 2-2 2H6.2c-1.1 0-2-.9-2-2V5.4Z"/><path fill="#1F5C57" d="M17.2 5.4C17.2 4.1 18.3 3 19.6 3h8.2c1.3 0 2.4 1.1 2.4 2.4v19.2c0 1.1-.9 2-2 2h-8.6c-1.1 0-2-.9-2-2V5.4Z"/><path fill="#FAF6F1" d="M7.2 6.6h7.2v16.6H7.2z"/><path fill="#FAF6F1" d="M20 6.6h7.2v16.6H20z"/><path fill="#C45C4A" d="M12.4 3h3.2v8.4L14 9.6l-1.6 1.8V3Z"/></svg>',
};

const PREVIEW_JPEG_B64 = "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";

function log(msg) {
  if (typeof print === "function") print(String(msg));
}

function hexToRgb(hex) {
  const n = hex.replace("#", "");
  return {
    r: parseInt(n.slice(0, 2), 16) / 255,
    g: parseInt(n.slice(2, 4), 16) / 255,
    b: parseInt(n.slice(4, 6), 16) / 255,
  };
}

function solid(hex, opacity) {
  const paint = { type: "SOLID", color: hexToRgb(hex) };
  if (opacity != null) paint.opacity = opacity;
  return paint;
}

async function goTo(page) {
  if (figma.setCurrentPageAsync) await figma.setCurrentPageAsync(page);
  else figma.currentPage = page;
}

async function setReactions(node, reactions) {
  if (node.setReactionsAsync) await node.setReactionsAsync(reactions);
  else node.reactions = reactions;
}

function changeTo(destinationId, duration) {
  return {
    type: "NODE",
    navigation: "CHANGE_TO",
    destinationId,
    transition: {
      type: "SMART_ANIMATE",
      easing: { type: "EASE_OUT" },
      duration: duration,
    },
    preserveScrollPosition: false,
  };
}

function al(direction, props) {
  const f = figma.createFrame();
  f.layoutMode = direction === "VERTICAL" ? "VERTICAL" : "HORIZONTAL";
  f.primaryAxisSizingMode = "AUTO";
  f.counterAxisSizingMode = "AUTO";
  if (props) {
    for (const k in props) {
      if (k === "width" || k === "height") continue;
      f[k] = props[k];
    }
  }
  if (props && props.width) {
    f.resize(props.width, props.height || Math.max(1, f.height));
    f.layoutSizingHorizontal = "FIXED";
    f.counterAxisSizingMode = "FIXED";
  }
  return f;
}

function hug(node) {
  if ("layoutSizingHorizontal" in node) {
    try {
      node.layoutSizingHorizontal = "HUG";
      node.layoutSizingVertical = "HUG";
    } catch (e) {}
  }
}

function fillH(node) {
  try {
    node.layoutSizingHorizontal = "FILL";
  } catch (e) {}
}

function fillAll(node) {
  try {
    node.layoutSizingHorizontal = "FILL";
    node.layoutSizingVertical = "FILL";
  } catch (e) {}
}

async function pickFont(family, styles, fallback) {
  for (let i = 0; i < styles.length; i++) {
    try {
      await figma.loadFontAsync({ family: family, style: styles[i] });
      return { family: family, style: styles[i] };
    } catch (e) {}
  }
  await figma.loadFontAsync(fallback);
  return fallback;
}

async function tx(characters, font, opts) {
  const t = figma.createText();
  t.fontName = font;
  t.characters = characters;
  if (opts) {
    if (opts.size) t.fontSize = opts.size;
    if (opts.lineHeight) t.lineHeight = opts.lineHeight;
    if (opts.fills) t.fills = opts.fills;
    if (opts.name) t.name = opts.name;
    if (opts.styleId) t.textStyleId = opts.styleId;
  }
  return t;
}

function svgNode(markup, w, h) {
  const n = figma.createNodeFromSvg(markup);
  n.resize(w, h);
  return n;
}

function toComponent(node, name, description) {
  const comp = figma.createComponentFromNode(node);
  comp.name = name;
  if (description) comp.description = description;
  return comp;
}

async function localPaintStyles() {
  return figma.getLocalPaintStylesAsync
    ? await figma.getLocalPaintStylesAsync()
    : figma.getLocalPaintStyles();
}

async function localTextStyles() {
  return figma.getLocalTextStylesAsync
    ? await figma.getLocalTextStylesAsync()
    : figma.getLocalTextStyles();
}

async function localEffectStyles() {
  return figma.getLocalEffectStylesAsync
    ? await figma.getLocalEffectStylesAsync()
    : figma.getLocalEffectStyles();
}

async function paintStyle(name, hex) {
  const list = await localPaintStyles();
  let s = list.find(function (x) {
    return x.name === name;
  });
  if (!s) s = figma.createPaintStyle();
  s.name = name;
  s.paints = [solid(hex)];
  return s;
}

async function textStyle(name, font, size, linePx) {
  const list = await localTextStyles();
  let s = list.find(function (x) {
    return x.name === name;
  });
  if (!s) s = figma.createTextStyle();
  s.name = name;
  s.fontName = font;
  s.fontSize = size;
  s.lineHeight = { unit: "PIXELS", value: linePx };
  s.letterSpacing = { unit: "PIXELS", value: 0 };
  return s;
}

async function effectStyle(name, y, radius, a) {
  const list = await localEffectStyles();
  let s = list.find(function (x) {
    return x.name === name;
  });
  if (!s) s = figma.createEffectStyle();
  s.name = name;
  s.effects = [
    {
      type: "DROP_SHADOW",
      color: { r: 28 / 255, g: 25 / 255, b: 23 / 255, a: a },
      offset: { x: 0, y: y },
      radius: radius,
      spread: 0,
      visible: true,
      blendMode: "NORMAL",
    },
  ];
  return s;
}

function clearPage(page) {
  const kids = page.children.slice();
  for (let i = 0; i < kids.length; i++) kids[i].remove();
}

function ensurePages() {
  const wanted = ["Cover", "Components", "Prototype"];
  const untitled = [];
  const named = {};
  const pages = figma.root.children;
  for (let i = 0; i < pages.length; i++) {
    const p = pages[i];
    if (/^Page \d+$/i.test(p.name)) untitled.push(p);
    named[p.name] = p;
  }
  for (let i = 0; i < wanted.length; i++) {
    const name = wanted[i];
    if (named[name]) continue;
    if (untitled.length) {
      const p = untitled.shift();
      p.name = name;
      named[name] = p;
    } else {
      try {
        const p = figma.createPage();
        p.name = name;
        named[name] = p;
      } catch (e) {
        log("Не удалось создать страницу " + name + " (лимит Starter: 3). " + e);
      }
    }
  }
  return named;
}

function layoutSet(set, cols, cellW, cellH) {
  const kids = set.children;
  let maxX = 0;
  let maxY = 0;
  for (let i = 0; i < kids.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    kids[i].x = 32 + col * cellW;
    kids[i].y = 32 + row * cellH;
    maxX = Math.max(maxX, kids[i].x + kids[i].width);
    maxY = Math.max(maxY, kids[i].y + kids[i].height);
  }
  try {
    set.resizeWithoutConstraints(maxX + 32, maxY + 32);
  } catch (e) {}
}

function previewImage() {
  if (!PREVIEW_JPEG_B64 || PREVIEW_JPEG_B64 === "PLACEHOLDER_B64") return null;
  try {
    const bytes = figma.base64Decode(PREVIEW_JPEG_B64);
    return figma.createImage(bytes);
  } catch (e) {
    log("JPEG не декодировался: " + e);
    return null;
  }
}

function findNamed(root, name) {
  return root.findOne(function (n) {
    return n.name === name;
  });
}

function variantNamed(set, part) {
  return set.children.find(function (c) {
    return c.name.indexOf(part) !== -1;
  });
}

async function main() {
  log("Folio UI Kit → сборка в Scripter…");

  const display = await pickFont(
    "Playfair Display",
    ["SemiBold", "Semi Bold", "Bold"],
    { family: "Inter", style: "Bold" }
  );
  const body = await pickFont("Inter", ["Regular"], { family: "Inter", style: "Regular" });
  const medium = await pickFont("Inter", ["Medium"], { family: "Inter", style: "Medium" });
  const buttonFont = await pickFont("Inter", ["Semi Bold", "SemiBold", "Bold"], {
    family: "Inter",
    style: "Bold",
  });

  const pages = ensurePages();
  const coverPage = pages.Cover || figma.root.children[0];
  const componentsPage = pages.Components || coverPage;
  const prototypePage = pages.Prototype || componentsPage;

  const ps = {
    brand: await paintStyle("color/brand/primary", C.brand),
    brandHover: await paintStyle("color/brand/primary-hover", C.brandHover),
    brandSoft: await paintStyle("color/brand/primary-soft", C.brandSoft),
    like: await paintStyle("color/accent/like", C.like),
    likeHover: await paintStyle("color/accent/like-hover", C.likeHover),
    ink: await paintStyle("color/ink/primary", C.ink),
    ink2: await paintStyle("color/ink/secondary", C.ink2),
    muted: await paintStyle("color/ink/muted", C.muted),
    paper: await paintStyle("color/paper/default", C.paper),
    elevated: await paintStyle("color/paper/elevated", C.elevated),
    line: await paintStyle("color/line/subtle", C.line),
    disabled: await paintStyle("color/state/disabled", C.disabled),
  };
  const ts = {
    display: await textStyle("type/display", display, 28, 34),
    title: await textStyle("type/title", display, 20, 28),
    body: await textStyle("type/body", body, 16, 24),
    caption: await textStyle("type/caption", medium, 13, 18),
    button: await textStyle("type/button", buttonFont, 14, 20),
  };
  const es = {
    card: await effectStyle("elevation/card", 8, 24, 0.08),
    hover: await effectStyle("elevation/hover", 12, 32, 0.12),
  };

  await goTo(componentsPage);
  clearPage(componentsPage);
  componentsPage.backgrounds = [solid(C.paper)];

  const iconLike = toComponent(svgNode(SVG.like, 24, 24), "Icon / Like", "Like outline SVG");
  const iconLikeFilled = toComponent(
    svgNode(SVG.likeFilled, 24, 24),
    "Icon / Like filled",
    "Like filled SVG"
  );
  const iconComment = toComponent(svgNode(SVG.comment, 24, 24), "Icon / Comment", "Comment SVG");
  const iconShare = toComponent(svgNode(SVG.share, 24, 24), "Icon / Share", "Share SVG");
  const iconSend = toComponent(svgNode(SVG.send, 24, 24), "Icon / Send", "Post / send SVG");
  const logo = toComponent(svgNode(SVG.logo, 148, 32), "Logo / Folio", "Wordmark SVG");
  const mark = toComponent(svgNode(SVG.mark, 32, 32), "Logo / Mark", "Favicon / mark SVG");
  const avatarPlaceholder = toComponent(
    svgNode(SVG.avatar, 64, 64),
    "Icon / Avatar placeholder",
    "Placeholder SVG for avatars"
  );

  function tintIcon(comp, hex) {
    const vectors = comp.findAll(function (n) {
      return n.fills && n.fills !== figma.mixed;
    });
    for (let i = 0; i < vectors.length; i++) {
      const n = vectors[i];
      if (!Array.isArray(n.fills)) continue;
      const next = [];
      for (let j = 0; j < n.fills.length; j++) {
        const f = n.fills[j];
        if (f.type === "SOLID") next.push(solid(hex, f.opacity));
        else next.push(f);
      }
      n.fills = next;
    }
  }

  function makeAvatar(size) {
    const c = figma.createComponent();
    c.name = "Size=" + size;
    c.resize(size, size);
    c.layoutMode = "HORIZONTAL";
    c.primaryAxisAlignItems = "CENTER";
    c.counterAxisAlignItems = "CENTER";
    c.primaryAxisSizingMode = "FIXED";
    c.counterAxisSizingMode = "FIXED";
    c.clipsContent = true;
    c.cornerRadius = size / 2;
    c.fills = [solid("#E7E5E4")];
    const inst = avatarPlaceholder.createInstance();
    inst.resize(size, size);
    c.appendChild(inst);
    inst.layoutSizingHorizontal = "FIXED";
    inst.layoutSizingVertical = "FIXED";
    c.description = "Avatar placeholder " + size + "px";
    return c;
  }

  const av32 = makeAvatar(32);
  const av48 = makeAvatar(48);
  const av64 = makeAvatar(64);
  const avatarSet = figma.combineAsVariants([av32, av48, av64], componentsPage);
  avatarSet.name = "Avatar";
  avatarSet.description = "User avatar placeholder. Property Size: 32 / 48 / 64.";
  layoutSet(avatarSet, 3, 96, 96);

  function makeButton(type, state) {
    const c = figma.createComponent();
    c.name = "Type=" + type + ", State=" + state;
    c.layoutMode = "HORIZONTAL";
    c.primaryAxisAlignItems = "CENTER";
    c.counterAxisAlignItems = "CENTER";
    c.primaryAxisSizingMode = "AUTO";
    c.counterAxisSizingMode = "AUTO";
    c.paddingLeft = 20;
    c.paddingRight = 20;
    c.paddingTop = 12;
    c.paddingBottom = 12;
    c.itemSpacing = 8;
    c.cornerRadius = 10;
    c.strokes = [];
    c.strokeWeight = 1;

    let iconComp = iconSend;
    let label = type;
    let bg = C.brand;
    let fg = C.white;
    let stroke = null;
    if (type === "Post") {
      iconComp = iconSend;
      if (state === "Hover") bg = C.brandHover;
      if (state === "Disabled") bg = C.disabled;
      c.fills = [solid(bg)];
      c.fillStyleId =
        state === "Hover" ? ps.brandHover.id : state === "Disabled" ? ps.disabled.id : ps.brand.id;
    } else if (type === "Like") {
      iconComp = iconLike;
      fg = state === "Hover" ? C.likeHover : C.like;
      bg = state === "Hover" ? C.likeSoft : C.elevated;
      stroke = C.line;
      c.fills = [solid(bg)];
      if (state !== "Hover") c.fillStyleId = ps.elevated.id;
    } else {
      iconComp = iconComment;
      fg = state === "Hover" ? C.brandHover : C.brand;
      bg = state === "Hover" ? C.brandSoft : C.elevated;
      stroke = C.line;
      c.fills = [solid(bg)];
      if (state === "Hover") c.fillStyleId = ps.brandSoft.id;
      else c.fillStyleId = ps.elevated.id;
    }
    if (stroke) {
      c.strokes = [solid(stroke)];
      c.strokeStyleId = ps.line.id;
    }

    const icon = iconComp.createInstance();
    icon.resize(18, 18);
    icon.name = "Icon";
    c.appendChild(icon);
    icon.layoutSizingHorizontal = "FIXED";
    icon.layoutSizingVertical = "FIXED";
    if (type === "Post") tintIcon(icon, C.white);
    else tintIcon(icon, fg);

    const labelNode = figma.createText();
    labelNode.name = "Label";
    labelNode.fontName = buttonFont;
    labelNode.characters = label;
    labelNode.fontSize = 14;
    labelNode.lineHeight = { unit: "PIXELS", value: 20 };
    labelNode.fills = [solid(fg)];
    labelNode.textStyleId = ts.button.id;
    c.appendChild(labelNode);
    hug(labelNode);

    const propId = c.addComponentProperty("Label", "TEXT", label);
    labelNode.componentPropertyReferences = { characters: propId };
    return c;
  }

  const buttonVariants = [
    makeButton("Post", "Default"),
    makeButton("Post", "Hover"),
    makeButton("Post", "Disabled"),
    makeButton("Like", "Default"),
    makeButton("Like", "Hover"),
    makeButton("Comment", "Default"),
    makeButton("Comment", "Hover"),
  ];
  const buttonSet = figma.combineAsVariants(buttonVariants, componentsPage);
  buttonSet.name = "Button";
  buttonSet.description =
    "Post / Like / Comment. States Default, Hover (Disabled у Post). Auto Layout Hug, padding 12/20.";
  layoutSet(buttonSet, 3, 200, 80);

  await setReactions(variantNamed(buttonSet, "Type=Post, State=Default"), [
    { trigger: { type: "ON_HOVER" }, actions: [changeTo(variantNamed(buttonSet, "Type=Post, State=Hover").id, 0.08)] },
  ]);
  await setReactions(variantNamed(buttonSet, "Type=Like, State=Default"), [
    { trigger: { type: "ON_HOVER" }, actions: [changeTo(variantNamed(buttonSet, "Type=Like, State=Hover").id, 0.08)] },
  ]);
  await setReactions(variantNamed(buttonSet, "Type=Comment, State=Default"), [
    {
      trigger: { type: "ON_HOVER" },
      actions: [changeTo(variantNamed(buttonSet, "Type=Comment, State=Hover").id, 0.08)],
    },
  ]);

  const image = previewImage();

  function actionChip(iconComp, text, colorHex, name) {
    const row = al("HORIZONTAL");
    row.name = name;
    row.primaryAxisAlignItems = "CENTER";
    row.counterAxisAlignItems = "CENTER";
    row.itemSpacing = 6;
    row.paddingLeft = 12;
    row.paddingRight = 12;
    row.paddingTop = 8;
    row.paddingBottom = 8;
    row.cornerRadius = 999;
    row.fills = [];
    const ic = iconComp.createInstance();
    ic.resize(16, 16);
    row.appendChild(ic);
    ic.layoutSizingHorizontal = "FIXED";
    ic.layoutSizingVertical = "FIXED";
    tintIcon(ic, colorHex);
    const t = figma.createText();
    t.fontName = medium;
    t.characters = text;
    t.fontSize = 12;
    t.fills = [solid(colorHex)];
    row.appendChild(t);
    hug(t);
    hug(row);
    return row;
  }

  function makeCard(state) {
    const c = figma.createComponent();
    c.name = "State=" + state;
    c.layoutMode = "VERTICAL";
    c.primaryAxisSizingMode = "AUTO";
    c.counterAxisSizingMode = "FIXED";
    c.resize(360, 100);
    c.layoutSizingHorizontal = "FIXED";
    c.layoutSizingVertical = "HUG";
    c.itemSpacing = 0;
    c.clipsContent = true;
    c.cornerRadius = 16;
    c.fills = [solid(C.elevated)];
    c.fillStyleId = ps.elevated.id;
    c.effectStyleId = state === "Hover" ? es.hover.id : es.card.id;

    const media = figma.createFrame();
    media.name = "Preview";
    media.resize(360, 200);
    media.clipsContent = true;
    media.fills = image
      ? [{ type: "IMAGE", scaleMode: "FILL", imageHash: image.hash }]
      : [solid("#D7CBC0")];
    c.appendChild(media);
    media.layoutSizingHorizontal = "FILL";
    media.layoutSizingVertical = "FIXED";
    if (state === "Hover") {
      const overlay = figma.createRectangle();
      overlay.name = "Hover overlay";
      overlay.resize(360, 200);
      overlay.fills = [solid("#000000", 0.04)];
      media.appendChild(overlay);
    }

    const content = al("VERTICAL", { width: 360 });
    content.name = "Content";
    content.paddingLeft = 20;
    content.paddingRight = 20;
    content.paddingTop = 20;
    content.paddingBottom = 20;
    content.itemSpacing = 12;
    content.fills = [];
    c.appendChild(content);
    fillH(content);
    content.layoutSizingVertical = "HUG";

    const title = figma.createText();
    title.name = "Title";
    title.fontName = display;
    title.characters = "Утренние страницы: ритуал, который возвращает голос";
    title.fontSize = 20;
    title.lineHeight = { unit: "PIXELS", value: 28 };
    title.fills = [solid(C.ink)];
    title.textStyleId = ts.title.id;
    title.textAutoResize = "HEIGHT";
    content.appendChild(title);
    fillH(title);

    const excerpt = figma.createText();
    excerpt.name = "Excerpt";
    excerpt.fontName = body;
    excerpt.characters =
      "Три страницы от руки до завтрака — не про продуктивность, а про то, чтобы услышать себя раньше ленты.";
    excerpt.fontSize = 16;
    excerpt.lineHeight = { unit: "PIXELS", value: 24 };
    excerpt.fills = [solid(C.ink2)];
    excerpt.textStyleId = ts.body.id;
    excerpt.textAutoResize = "HEIGHT";
    content.appendChild(excerpt);
    fillH(excerpt);

    const meta = al("HORIZONTAL");
    meta.name = "Meta";
    meta.itemSpacing = 10;
    meta.counterAxisAlignItems = "CENTER";
    meta.fills = [];
    content.appendChild(meta);
    fillH(meta);

    const av = av32.createInstance();
    meta.appendChild(av);

    const metaCol = al("VERTICAL");
    metaCol.name = "Author";
    metaCol.itemSpacing = 2;
    metaCol.fills = [];
    meta.appendChild(metaCol);
    const author = figma.createText();
    author.fontName = medium;
    author.characters = "Анна Волкова";
    author.fontSize = 13;
    author.lineHeight = { unit: "PIXELS", value: 18 };
    author.fills = [solid(C.ink)];
    author.textStyleId = ts.caption.id;
    metaCol.appendChild(author);
    hug(author);
    const date = figma.createText();
    date.fontName = medium;
    date.characters = "4 сентября · 8 мин";
    date.fontSize = 13;
    date.fills = [solid(C.ink2)];
    date.textStyleId = ts.caption.id;
    metaCol.appendChild(date);
    hug(date);

    const actions = al("HORIZONTAL");
    actions.name = "Actions";
    actions.itemSpacing = 8;
    actions.fills = [];
    content.appendChild(actions);
    fillH(actions);

    const likeColor = state === "Liked" ? C.like : C.ink2;
    const likeIcon = state === "Liked" ? iconLikeFilled : iconLike;
    const likeCount = state === "Liked" ? "129" : "128";
    const like = actionChip(likeIcon, likeCount, likeColor, "Like hotspot");
    if (state === "Liked") like.fills = [solid(C.likeSoft)];
    actions.appendChild(like);
    actions.appendChild(actionChip(iconComment, "24", C.ink2, "Comment count"));
    actions.appendChild(actionChip(iconShare, "Share", C.ink2, "Share"));

    c.description = "Article card 360, Auto Layout vertical. State " + state + ".";
    return c;
  }

  const cardDefault = makeCard("Default");
  const cardHover = makeCard("Hover");
  const cardLiked = makeCard("Liked");
  const cardSet = figma.combineAsVariants([cardDefault, cardHover, cardLiked], componentsPage);
  cardSet.name = "Article Card";
  cardSet.description =
    "Карточка статьи. State Default / Hover / Liked. Превью JPEG, лайк — интерактивный компонент.";
  layoutSet(cardSet, 3, 400, 520);

  await setReactions(cardDefault, [
    { trigger: { type: "ON_HOVER" }, actions: [changeTo(cardHover.id, 0.12)] },
  ]);
  const likeDefault = findNamed(cardDefault, "Like hotspot");
  const likeLiked = findNamed(cardLiked, "Like hotspot");
  if (likeDefault) {
    await setReactions(likeDefault, [
      { trigger: { type: "ON_CLICK" }, actions: [changeTo(cardLiked.id, 0.12)] },
    ]);
  }
  if (likeLiked) {
    await setReactions(likeLiked, [
      { trigger: { type: "ON_CLICK" }, actions: [changeTo(cardDefault.id, 0.12)] },
    ]);
  }

  const postDefault = variantNamed(buttonSet, "Type=Post, State=Default");

  function makeComment(state) {
    const c = figma.createComponent();
    c.name = "State=" + state;
    c.layoutMode = "HORIZONTAL";
    c.primaryAxisSizingMode = "FIXED";
    c.counterAxisSizingMode = "AUTO";
    c.resize(560, 80);
    c.layoutSizingHorizontal = "FIXED";
    c.layoutSizingVertical = "HUG";
    c.paddingLeft = 16;
    c.paddingRight = 16;
    c.paddingTop = 16;
    c.paddingBottom = 16;
    c.itemSpacing = 12;
    c.cornerRadius = 12;
    c.fills = [solid(C.elevated)];
    c.fillStyleId = ps.elevated.id;
    c.strokes = [solid(state === "Focused" ? C.brand : C.line)];
    c.strokeWeight = state === "Focused" ? 2 : 1;
    c.strokeStyleId = state === "Focused" ? ps.brand.id : ps.line.id;
    if (state === "Focused") {
      c.effects = [
        {
          type: "DROP_SHADOW",
          color: { r: 15 / 255, g: 61 / 255, b: 58 / 255, a: 0.12 },
          offset: { x: 0, y: 0 },
          radius: 0,
          spread: 4,
          visible: true,
          blendMode: "NORMAL",
        },
      ];
    }
    const av = av48.createInstance();
    c.appendChild(av);
    const col = al("VERTICAL");
    col.name = "Field";
    col.itemSpacing = 10;
    col.fills = [];
    c.appendChild(col);
    fillH(col);
    const placeholder = figma.createText();
    placeholder.name = "Value";
    placeholder.fontName = body;
    placeholder.characters =
      state === "Filled" ? "Спасибо за текст — очень откликается." : "Напишите комментарий…";
    placeholder.fontSize = 16;
    placeholder.lineHeight = { unit: "PIXELS", value: 24 };
    placeholder.fills = [solid(state === "Filled" ? C.ink : C.muted)];
    placeholder.textStyleId = ts.body.id;
    placeholder.textAutoResize = "HEIGHT";
    col.appendChild(placeholder);
    fillH(placeholder);
    const bar = al("HORIZONTAL");
    bar.name = "Bar";
    bar.primaryAxisAlignItems = "SPACE_BETWEEN";
    bar.counterAxisAlignItems = "CENTER";
    bar.fills = [];
    col.appendChild(bar);
    fillH(bar);
    const hint = figma.createText();
    hint.fontName = medium;
    hint.characters = "Enter — отправить";
    hint.fontSize = 13;
    hint.fills = [solid(C.muted)];
    hint.textStyleId = ts.caption.id;
    bar.appendChild(hint);
    hug(hint);
    const post = postDefault.createInstance();
    bar.appendChild(post);
    return c;
  }

  const commentSet = figma.combineAsVariants(
    [makeComment("Default"), makeComment("Focused"), makeComment("Filled")],
    componentsPage
  );
  commentSet.name = "Comment Input";
  commentSet.description = "Поле комментария. State Default / Focused / Filled. Avatar 48 + Button/Post.";
  layoutSet(commentSet, 1, 600, 160);

  const pageTitle = await tx("Components", display, {
    size: 28,
    styleId: ts.display.id,
    fills: [solid(C.ink)],
    name: "Page title",
  });
  const pageLead = await tx(
    "Переиспользуемые компоненты блоговой платформы Folio. Auto Layout, Variants, Styles.",
    body,
    { size: 16, styleId: ts.body.id, fills: [solid(C.ink2)], name: "Lead" }
  );
  pageTitle.x = 80;
  pageTitle.y = 48;
  pageLead.x = 80;
  pageLead.y = 90;

  const iconsRow = [iconLike, iconLikeFilled, iconComment, iconShare, iconSend, logo, mark, avatarPlaceholder];
  let ix = 80;
  for (let i = 0; i < iconsRow.length; i++) {
    iconsRow[i].x = ix;
    iconsRow[i].y = 160;
    ix += iconsRow[i].width + 24;
  }
  avatarSet.x = 80;
  avatarSet.y = 260;
  buttonSet.x = 80;
  buttonSet.y = 420;
  cardSet.x = 80;
  cardSet.y = 620;
  commentSet.x = 80;
  commentSet.y = 1220;

  await goTo(coverPage);
  clearPage(coverPage);
  coverPage.backgrounds = [solid(C.paper)];

  const cover = al("VERTICAL", { width: 1440 });
  cover.name = "Cover / Folio UI Kit";
  cover.resize(1440, 900);
  cover.primaryAxisSizingMode = "FIXED";
  cover.counterAxisSizingMode = "FIXED";
  cover.layoutSizingHorizontal = "FIXED";
  cover.layoutSizingVertical = "FIXED";
  cover.primaryAxisAlignItems = "SPACE_BETWEEN";
  cover.paddingLeft = 80;
  cover.paddingRight = 80;
  cover.paddingTop = 80;
  cover.paddingBottom = 80;
  cover.fills = [solid(C.brand)];
  cover.fillStyleId = ps.brand.id;
  cover.x = 0;
  cover.y = 0;

  const coverTop = al("VERTICAL");
  coverTop.itemSpacing = 20;
  coverTop.fills = [];
  cover.appendChild(coverTop);
  fillH(coverTop);

  const markInst = mark.createInstance();
  markInst.resize(48, 48);
  coverTop.appendChild(markInst);

  const coverKicker = await tx("FIGMA DESIGN SYSTEM  ·  LAB", medium, {
    size: 13,
    fills: [solid(C.brandSoft)],
    name: "Kicker",
  });
  coverKicker.letterSpacing = { unit: "PIXELS", value: 2 };
  coverTop.appendChild(coverKicker);

  const coverH = await tx("Folio", display, { size: 72, fills: [solid(C.paper)], name: "Title" });
  coverH.lineHeight = { unit: "PIXELS", value: 80 };
  coverTop.appendChild(coverH);

  const coverSub = await tx(
    "Блоговая платформа · кнопки Post / Like / Comment, карточка статьи, поле комментария, аватар.",
    body,
    { size: 18, fills: [solid(C.brandSoft)], name: "Subtitle" }
  );
  coverSub.resize(640, 60);
  coverSub.textAutoResize = "HEIGHT";
  coverTop.appendChild(coverSub);

  const coverFoot = await tx("UI Kit  ·  Auto Layout  ·  Variants  ·  Styles  ·  SVG / JPEG / WebP", medium, {
    size: 13,
    fills: [solid(C.brandSoft)],
    name: "Footer",
  });
  cover.appendChild(coverFoot);

  const stylesDoc = al("VERTICAL", { width: 1440 });
  stylesDoc.name = "Foundations / Styles";
  stylesDoc.x = 0;
  stylesDoc.y = 960;
  stylesDoc.paddingLeft = 80;
  stylesDoc.paddingRight = 80;
  stylesDoc.paddingTop = 64;
  stylesDoc.paddingBottom = 64;
  stylesDoc.itemSpacing = 28;
  stylesDoc.fills = [solid(C.paper)];
  stylesDoc.fillStyleId = ps.paper.id;

  const stTitle = await tx("Styles", display, { size: 28, styleId: ts.display.id, fills: [solid(C.ink)] });
  stylesDoc.appendChild(stTitle);

  const swatches = al("HORIZONTAL");
  swatches.name = "Color styles";
  swatches.itemSpacing = 12;
  swatches.fills = [];
  try {
    swatches.layoutWrap = "WRAP";
    swatches.counterAxisSpacing = 12;
  } catch (e) {}
  stylesDoc.appendChild(swatches);
  fillH(swatches);

  const swatchDefs = [
    ["brand/primary", C.brand, ps.brand],
    ["brand/primary-hover", C.brandHover, ps.brandHover],
    ["brand/primary-soft", C.brandSoft, ps.brandSoft],
    ["accent/like", C.like, ps.like],
    ["ink/primary", C.ink, ps.ink],
    ["ink/secondary", C.ink2, ps.ink2],
    ["paper/default", C.paper, ps.paper],
    ["paper/elevated", C.elevated, ps.elevated],
    ["line/subtle", C.line, ps.line],
    ["state/disabled", C.disabled, ps.disabled],
  ];
  for (let i = 0; i < swatchDefs.length; i++) {
    const card = al("VERTICAL");
    card.resize(120, 80);
    card.layoutSizingHorizontal = "FIXED";
    card.itemSpacing = 0;
    card.cornerRadius = 14;
    card.strokes = [solid(C.line)];
    card.strokeWeight = 1;
    card.clipsContent = true;
    card.fills = [solid(C.elevated)];
    const chip = figma.createRectangle();
    chip.resize(120, 48);
    chip.fills = [solid(swatchDefs[i][1])];
    chip.fillStyleId = swatchDefs[i][2].id;
    card.appendChild(chip);
    chip.layoutSizingHorizontal = "FILL";
    const cap = al("VERTICAL");
    cap.paddingLeft = 10;
    cap.paddingRight = 10;
    cap.paddingTop = 8;
    cap.paddingBottom = 10;
    cap.fills = [];
    card.appendChild(cap);
    fillH(cap);
    const n = await tx(swatchDefs[i][0], medium, { size: 11, fills: [solid(C.ink)] });
    const h = await tx(swatchDefs[i][1], medium, { size: 11, fills: [solid(C.muted)] });
    cap.appendChild(n);
    cap.appendChild(h);
    swatches.appendChild(card);
  }

  const typeBlock = al("VERTICAL");
  typeBlock.itemSpacing = 16;
  typeBlock.fills = [];
  stylesDoc.appendChild(typeBlock);
  fillH(typeBlock);
  const d1 = await tx("Как писать, когда не хочется писать", display, {
    size: 28,
    styleId: ts.display.id,
    fills: [solid(C.ink)],
  });
  const d2 = await tx("Утренние страницы как ритуал", display, {
    size: 20,
    styleId: ts.title.id,
    fills: [solid(C.ink)],
  });
  const d3 = await tx("Короткий лид статьи: две–три строки, чтобы карточка оставалась сканируемой.", body, {
    size: 16,
    styleId: ts.body.id,
    fills: [solid(C.ink2)],
  });
  const d4 = await tx("type/caption · Inter Medium 13/18", medium, {
    size: 13,
    styleId: ts.caption.id,
    fills: [solid(C.ink2)],
  });
  typeBlock.appendChild(d1);
  typeBlock.appendChild(d2);
  typeBlock.appendChild(d3);
  typeBlock.appendChild(d4);

  await goTo(prototypePage);
  clearPage(prototypePage);
  prototypePage.backgrounds = [solid(C.paper)];

  const proto = al("VERTICAL", { width: 1280 });
  proto.name = "Feed / Like interaction";
  proto.x = 80;
  proto.y = 80;
  proto.paddingLeft = 64;
  proto.paddingRight = 64;
  proto.paddingTop = 48;
  proto.paddingBottom = 64;
  proto.itemSpacing = 32;
  proto.fills = [solid(C.paper)];
  proto.fillStyleId = ps.paper.id;
  proto.cornerRadius = 24;

  const protoHead = al("HORIZONTAL");
  protoHead.counterAxisAlignItems = "CENTER";
  protoHead.itemSpacing = 16;
  protoHead.fills = [];
  proto.appendChild(protoHead);
  fillH(protoHead);
  const logoInst = logo.createInstance();
  protoHead.appendChild(logoInst);
  const protoLabel = await tx("Prototype  ·  клик по Like на карточке", medium, {
    size: 13,
    fills: [solid(C.ink2)],
  });
  protoHead.appendChild(protoLabel);

  const cardInst = cardDefault.createInstance();
  proto.appendChild(cardInst);

  const commentInst = variantNamed(commentSet, "State=Default").createInstance();
  proto.appendChild(commentInst);

  const protoHint = await tx(
    "Интерактивные компоненты: While hovering на Button Default→Hover; On click Like Default↔Liked.",
    body,
    { size: 14, fills: [solid(C.ink2)] }
  );
  proto.appendChild(protoHint);

  try {
    prototypePage.flowStartingPoints = [{ nodeId: proto.id, name: "Like interaction" }];
  } catch (e) {
    log("flowStartingPoints: " + e);
  }

  await goTo(coverPage);
  figma.viewport.scrollAndZoomIntoView([cover]);
  figma.currentPage.selection = [cover];

  log("Готово. Страницы: Cover, Components, Prototype.");
  log("Стили: color/*, type/*, elevation/*");
  log("Компоненты: Button, Article Card, Comment Input, Avatar + SVG-иконки.");
  log("Прототип: страница Prototype → Present, клик по Like.");
}

main().catch(function (err) {
  log("ERROR: " + (err && err.stack ? err.stack : err));
});
