// Keeps hyphenated words (for example "end-to-end", "8-week", "JShield-ready") on one line.
// Inserts an invisible word joiner after the hyphen in visible text. Form fields, code and
// email links are left untouched, so copied addresses stay valid.
const WJ = "⁠";
const PATTERN = /([\p{L}\p{N}])-(?!⁠)([\p{L}\p{N}])/gu;
const SKIP = "script, style, textarea, input, select, code, pre, a[href^='mailto:'], [contenteditable='true']";

function fix(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || node.nodeValue.indexOf("-") === -1) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent || parent.closest(SKIP)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const next = node.nodeValue.replace(/\S+/g, (tok) =>
      /@|:\/\/|^www\.|\.(ai|com|in|io|org|net)\b/i.test(tok) ? tok : tok.replace(PATTERN, `$1-${WJ}$2`),
    );
    if (next !== node.nodeValue) node.nodeValue = next;
  }
}

export function keepHyphenatedWordsTogether() {
  if (typeof window === "undefined" || !document.body) return;
  let queued = false;
  const run = () => {
    queued = false;
    fix(document.body);
  };
  run();
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(run);
  }).observe(document.body, { childList: true, subtree: true, characterData: true });
}
