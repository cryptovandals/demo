// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "ul.svelte-1c0f2mk.svelte-1c0f2mk{display:flex;flex-wrap:wrap;margin:0;padding:0}li.svelte-1c0f2mk.svelte-1c0f2mk{max-width:300px;list-style-type:none}.token.svelte-1c0f2mk.svelte-1c0f2mk{border:1px solid #ccc;border-radius:var(--size-xxs);margin:0 var(--size-s) var(--size-s)}.token.svelte-1c0f2mk .footer.svelte-1c0f2mk{border-top:1px solid #ccc}.token.svelte-1c0f2mk .header.svelte-1c0f2mk{background-color:hotpink}.token.svelte-1c0f2mk .header.svelte-1c0f2mk,.token.svelte-1c0f2mk .body.svelte-1c0f2mk,.token.svelte-1c0f2mk .footer.svelte-1c0f2mk{padding:var(--size-s)}img.svelte-1c0f2mk.svelte-1c0f2mk{display:block;width:100%}.vandalizer.svelte-1c0f2mk.svelte-1c0f2mk{margin-top:var(--size-xl)}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}