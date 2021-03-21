// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "img.svelte-1qflc1w.svelte-1qflc1w{width:100%}.token.svelte-1qflc1w.svelte-1qflc1w{border:1px solid #ccc;border-radius:var(--size-xxs);margin:0 var(--size-s)}.token.svelte-1qflc1w .log.svelte-1qflc1w{border-bottom:1px solid #ccc}.token.svelte-1qflc1w .header.svelte-1qflc1w{background-color:hotpink}.token.svelte-1qflc1w .header.svelte-1qflc1w,.token.svelte-1qflc1w .body.svelte-1qflc1w,.token.svelte-1qflc1w .log.svelte-1qflc1w{padding:var(--size-s)}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}