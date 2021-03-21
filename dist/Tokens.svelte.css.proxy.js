// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "ul.svelte-11x41wc.svelte-11x41wc{display:flex;margin:0;padding:0}li.svelte-11x41wc.svelte-11x41wc{max-width:300px;list-style-type:none}.token.svelte-11x41wc.svelte-11x41wc{border:1px solid #ccc;border-radius:var(--size-xxs);margin:0 var(--size-s)}.token.svelte-11x41wc .footer.svelte-11x41wc{border-top:1px solid #ccc}.token.svelte-11x41wc .header.svelte-11x41wc{background-color:hotpink}.token.svelte-11x41wc .header.svelte-11x41wc,.token.svelte-11x41wc .body.svelte-11x41wc,.token.svelte-11x41wc .footer.svelte-11x41wc{padding:var(--size-s)}img.svelte-11x41wc.svelte-11x41wc{display:block;width:100%}.vandalizer.svelte-11x41wc.svelte-11x41wc{margin-top:var(--size-xl)}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}