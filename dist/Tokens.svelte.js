import './Tokens.svelte.css.proxy.js';
/* src/Tokens.svelte generated by Svelte v3.35.0 */
import {
	SvelteComponent,
	append,
	attr,
	check_outros,
	create_component,
	destroy_component,
	destroy_each,
	detach,
	element,
	empty,
	group_outros,
	init,
	insert,
	listen,
	mount_component,
	safe_not_equal,
	set_data,
	space,
	text,
	transition_in,
	transition_out
} from "../_snowpack/pkg/svelte/internal.js";

import Vandalize from "./Vandalize.svelte.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

// (48:0) {#if list}
function create_if_block_1(ctx) {
	let ul;
	let each_value = /*list*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(ul, "class", "svelte-11x41wc");
		},
		m(target, anchor) {
			insert(target, ul, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}
		},
		p(ctx, dirty) {
			if (dirty & /*fromToken, list*/ 5) {
				each_value = /*list*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(ul, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d(detaching) {
			if (detaching) detach(ul);
			destroy_each(each_blocks, detaching);
		}
	};
}

// (50:4) {#each list as t}
function create_each_block(ctx) {
	let li;
	let div0;
	let t0_value = /*t*/ ctx[4].metadata.name + "";
	let t0;
	let t1;
	let div1;
	let img;
	let img_src_value;
	let img_alt_value;
	let t2;
	let div2;
	let button;
	let t4;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[3](/*t*/ ctx[4]);
	}

	return {
		c() {
			li = element("li");
			div0 = element("div");
			t0 = text(t0_value);
			t1 = space();
			div1 = element("div");
			img = element("img");
			t2 = space();
			div2 = element("div");
			button = element("button");
			button.textContent = "Select";
			t4 = space();
			attr(div0, "class", "header svelte-11x41wc");
			if (img.src !== (img_src_value = /*t*/ ctx[4].metadata.image)) attr(img, "src", img_src_value);
			attr(img, "alt", img_alt_value = /*t*/ ctx[4].metadata.description);
			attr(img, "class", "svelte-11x41wc");
			attr(div1, "class", "body svelte-11x41wc");
			attr(div2, "class", "footer svelte-11x41wc");
			attr(li, "class", "token svelte-11x41wc");
		},
		m(target, anchor) {
			insert(target, li, anchor);
			append(li, div0);
			append(div0, t0);
			append(li, t1);
			append(li, div1);
			append(div1, img);
			append(li, t2);
			append(li, div2);
			append(div2, button);
			append(li, t4);

			if (!mounted) {
				dispose = listen(button, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*list*/ 1 && t0_value !== (t0_value = /*t*/ ctx[4].metadata.name + "")) set_data(t0, t0_value);

			if (dirty & /*list*/ 1 && img.src !== (img_src_value = /*t*/ ctx[4].metadata.image)) {
				attr(img, "src", img_src_value);
			}

			if (dirty & /*list*/ 1 && img_alt_value !== (img_alt_value = /*t*/ ctx[4].metadata.description)) {
				attr(img, "alt", img_alt_value);
			}
		},
		d(detaching) {
			if (detaching) detach(li);
			mounted = false;
			dispose();
		}
	};
}

// (66:0) {#if fromToken}
function create_if_block(ctx) {
	let div;
	let vandalize;
	let current;

	vandalize = new Vandalize({
			props: {
				vandalizer: /*vandalizer*/ ctx[1],
				fromToken: /*fromToken*/ ctx[2]
			}
		});

	return {
		c() {
			div = element("div");
			create_component(vandalize.$$.fragment);
			attr(div, "class", "vandalizer svelte-11x41wc");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(vandalize, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const vandalize_changes = {};
			if (dirty & /*vandalizer*/ 2) vandalize_changes.vandalizer = /*vandalizer*/ ctx[1];
			if (dirty & /*fromToken*/ 4) vandalize_changes.fromToken = /*fromToken*/ ctx[2];
			vandalize.$set(vandalize_changes);
		},
		i(local) {
			if (current) return;
			transition_in(vandalize.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(vandalize.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(vandalize);
		}
	};
}

function create_fragment(ctx) {
	let t;
	let if_block1_anchor;
	let current;
	let if_block0 = /*list*/ ctx[0] && create_if_block_1(ctx);
	let if_block1 = /*fromToken*/ ctx[2] && create_if_block(ctx);

	return {
		c() {
			if (if_block0) if_block0.c();
			t = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, if_block1_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*list*/ ctx[0]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_1(ctx);
					if_block0.c();
					if_block0.m(t.parentNode, t);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*fromToken*/ ctx[2]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*fromToken*/ 4) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block1);
			current = true;
		},
		o(local) {
			transition_out(if_block1);
			current = false;
		},
		d(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach(if_block1_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	
	
	let { list } = $$props;
	let { vandalizer } = $$props;
	let fromToken;
	const click_handler = t => $$invalidate(2, fromToken = t);

	$$self.$$set = $$props => {
		if ("list" in $$props) $$invalidate(0, list = $$props.list);
		if ("vandalizer" in $$props) $$invalidate(1, vandalizer = $$props.vandalizer);
	};

	return [list, vandalizer, fromToken, click_handler];
}

class Tokens extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { list: 0, vandalizer: 1 });
	}
}

export default Tokens;