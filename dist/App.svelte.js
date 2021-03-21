import './App.svelte.css.proxy.js';
/* src/App.svelte generated by Svelte v3.35.0 */
import {
	SvelteComponent,
	append,
	attr,
	check_outros,
	component_subscribe,
	create_component,
	destroy_component,
	detach,
	element,
	empty,
	group_outros,
	init,
	insert,
	listen,
	mount_component,
	noop,
	safe_not_equal,
	set_data,
	space,
	text,
	transition_in,
	transition_out
} from "../_snowpack/pkg/svelte/internal.js";

import { onMount } from "../_snowpack/pkg/svelte.js";
import { cat } from "./ipfs.js";
import MintKitty from "./MintKitty.svelte.js";

import {
	connect,
	address,
	kittyTokens,
	cryptoVandalsTokens,
	cryptoVandals,
	kitty
} from "./state.js";

import Tokens from "./Tokens.svelte.js";

function create_else_block(ctx) {
	let t0;
	let t1;
	let t2;
	let if_block_anchor;
	let current;
	let if_block = /*$cryptoVandals*/ ctx[1] && /*$kitty*/ ctx[2] && create_if_block_1(ctx);

	return {
		c() {
			t0 = text("Your address: ");
			t1 = text(/*$address*/ ctx[0]);
			t2 = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			insert(target, t0, anchor);
			insert(target, t1, anchor);
			insert(target, t2, anchor);
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (!current || dirty & /*$address*/ 1) set_data(t1, /*$address*/ ctx[0]);

			if (/*$cryptoVandals*/ ctx[1] && /*$kitty*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*$cryptoVandals, $kitty*/ 6) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(t0);
			if (detaching) detach(t1);
			if (detaching) detach(t2);
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (20:0) {#if !$address}
function create_if_block(ctx) {
	let div;
	let section;
	let h1;
	let t1;
	let img;
	let img_src_value;
	let t2;
	let button;
	let t4;
	let br;
	let t5;
	let a;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			section = element("section");
			h1 = element("h1");
			h1.textContent = "CryptoVandals";
			t1 = space();
			img = element("img");
			t2 = space();
			button = element("button");
			button.innerHTML = `<span>Connect your wallet</span>`;
			t4 = space();
			br = element("br");
			t5 = space();
			a = element("a");
			a.textContent = "About CryptoVandals";
			attr(h1, "class", "svelte-1nav557");
			if (img.src !== (img_src_value = "./images/header.png")) attr(img, "src", img_src_value);
			attr(img, "alt", "CryptoVandals logo");
			attr(img, "class", "svelte-1nav557");
			attr(button, "class", "button-shadow");
			attr(a, "href", "https://github.com/cryptovandals/contracts");
			attr(section, "class", "svelte-1nav557");
			attr(div, "class", "fullpage");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, section);
			append(section, h1);
			append(section, t1);
			append(section, img);
			append(section, t2);
			append(section, button);
			append(section, t4);
			append(section, br);
			append(section, t5);
			append(section, a);

			if (!mounted) {
				dispose = listen(button, "click", connect);
				mounted = true;
			}
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

// (37:2) {#if $cryptoVandals && $kitty}
function create_if_block_1(ctx) {
	let h20;
	let t1;
	let mintkitty;
	let t2;
	let tokens0;
	let t3;
	let h21;
	let t5;
	let tokens1;
	let current;
	mintkitty = new MintKitty({ props: { kitty: /*$kitty*/ ctx[2] } });

	tokens0 = new Tokens({
			props: {
				list: /*$kittyTokens*/ ctx[3],
				vandalizer: /*$cryptoVandals*/ ctx[1]
			}
		});

	tokens1 = new Tokens({
			props: {
				list: /*$cryptoVandalsTokens*/ ctx[4],
				vandalizer: /*$cryptoVandals*/ ctx[1]
			}
		});

	return {
		c() {
			h20 = element("h2");
			h20.textContent = "Kitty contract";
			t1 = space();
			create_component(mintkitty.$$.fragment);
			t2 = space();
			create_component(tokens0.$$.fragment);
			t3 = space();
			h21 = element("h2");
			h21.textContent = "CryptoVandals contract";
			t5 = space();
			create_component(tokens1.$$.fragment);
		},
		m(target, anchor) {
			insert(target, h20, anchor);
			insert(target, t1, anchor);
			mount_component(mintkitty, target, anchor);
			insert(target, t2, anchor);
			mount_component(tokens0, target, anchor);
			insert(target, t3, anchor);
			insert(target, h21, anchor);
			insert(target, t5, anchor);
			mount_component(tokens1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const mintkitty_changes = {};
			if (dirty & /*$kitty*/ 4) mintkitty_changes.kitty = /*$kitty*/ ctx[2];
			mintkitty.$set(mintkitty_changes);
			const tokens0_changes = {};
			if (dirty & /*$kittyTokens*/ 8) tokens0_changes.list = /*$kittyTokens*/ ctx[3];
			if (dirty & /*$cryptoVandals*/ 2) tokens0_changes.vandalizer = /*$cryptoVandals*/ ctx[1];
			tokens0.$set(tokens0_changes);
			const tokens1_changes = {};
			if (dirty & /*$cryptoVandalsTokens*/ 16) tokens1_changes.list = /*$cryptoVandalsTokens*/ ctx[4];
			if (dirty & /*$cryptoVandals*/ 2) tokens1_changes.vandalizer = /*$cryptoVandals*/ ctx[1];
			tokens1.$set(tokens1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(mintkitty.$$.fragment, local);
			transition_in(tokens0.$$.fragment, local);
			transition_in(tokens1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(mintkitty.$$.fragment, local);
			transition_out(tokens0.$$.fragment, local);
			transition_out(tokens1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(h20);
			if (detaching) detach(t1);
			destroy_component(mintkitty, detaching);
			if (detaching) detach(t2);
			destroy_component(tokens0, detaching);
			if (detaching) detach(t3);
			if (detaching) detach(h21);
			if (detaching) detach(t5);
			destroy_component(tokens1, detaching);
		}
	};
}

function create_fragment(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (!/*$address*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $address;
	let $cryptoVandals;
	let $kitty;
	let $kittyTokens;
	let $cryptoVandalsTokens;
	component_subscribe($$self, address, $$value => $$invalidate(0, $address = $$value));
	component_subscribe($$self, cryptoVandals, $$value => $$invalidate(1, $cryptoVandals = $$value));
	component_subscribe($$self, kitty, $$value => $$invalidate(2, $kitty = $$value));
	component_subscribe($$self, kittyTokens, $$value => $$invalidate(3, $kittyTokens = $$value));
	component_subscribe($$self, cryptoVandalsTokens, $$value => $$invalidate(4, $cryptoVandalsTokens = $$value));
	return [$address, $cryptoVandals, $kitty, $kittyTokens, $cryptoVandalsTokens];
}

class App extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default App;