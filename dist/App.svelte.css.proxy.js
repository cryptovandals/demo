// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".marquee.svelte-1eddprt.svelte-1eddprt{font-weight:bold;font-style:italic;font-size:var(--size-m);margin-bottom:0}.links.svelte-1eddprt.svelte-1eddprt{text-align:center;font-weight:bold;margin-top:0;margin-bottom:var(--size-xl);background-color:black;color:white;padding:var(--size-m) var(--size-s);display:flex;justify-content:space-around}.links.svelte-1eddprt a.svelte-1eddprt{display:inline-block}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}