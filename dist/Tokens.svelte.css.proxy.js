// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "ul.svelte-fl5ttt.svelte-fl5ttt{display:flex;flex-wrap:wrap;margin:0;padding:0}li.svelte-fl5ttt.svelte-fl5ttt{max-width:300px;list-style-type:none}.token.svelte-fl5ttt.svelte-fl5ttt{border:1px solid #ccc;border-radius:var(--size-xxs);margin:0 var(--size-s) var(--size-s)}.token.svelte-fl5ttt .footer.svelte-fl5ttt{border-top:1px solid #ccc}.token.svelte-fl5ttt .header.svelte-fl5ttt{background-color:hotpink}.token.svelte-fl5ttt .header.svelte-fl5ttt,.token.svelte-fl5ttt .body.svelte-fl5ttt,.token.svelte-fl5ttt .footer.svelte-fl5ttt{padding:var(--size-s)}img.svelte-fl5ttt.svelte-fl5ttt{display:block;width:100%}.vandalizer.svelte-fl5ttt.svelte-fl5ttt{margin-top:var(--size-xl)}.hidden.svelte-fl5ttt.svelte-fl5ttt{visibility:none}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}