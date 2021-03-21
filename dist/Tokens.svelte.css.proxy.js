// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "ul.svelte-os00ec{display:flex;margin:0;padding:0}li.svelte-os00ec{list-style-type:none}.token.svelte-os00ec{max-width:300px}img.svelte-os00ec{display:block;width:100%}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}