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
	mount_component,
	noop,
	safe_not_equal,
	set_data,
	space,
	text,
	transition_in,
	transition_out
} from "../_snowpack/pkg/svelte/internal.js";

import Connect from "./Connect.svelte.js";
import MintKitty from "./MintKitty.svelte.js";

import {
	address,
	kittyTokens,
	cryptoVandalsTokens,
	cryptoVandals,
	kitty,
	chainId
} from "./state.js";

import Tokens from "./Tokens.svelte.js";

function create_if_block_3(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "Please connect your wallet to the Kovan test network.";
			attr(p, "class", "note level-error");
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (37:0) {:else}
function create_else_block(ctx) {
	let div1;
	let t5;
	let p0;
	let t13;
	let section;
	let p1;
	let t14;
	let t15;
	let t16;
	let current;
	let if_block = /*$cryptoVandals*/ ctx[2] && /*$kitty*/ ctx[3] && create_if_block_1(ctx);

	return {
		c() {
			div1 = element("div");

			div1.innerHTML = `<div class="marquee__inner"><span>Welcome to CryptoVandals.com, you can be anything you want at
        CryptoVandals.com</span> 
      <span>Welcome to CryptoVandals.com, you can be anything you want at
        CryptoVandals.com</span> 
      <span>Welcome to CryptoVandals.com, you can be anything you want at
        CryptoVandals.com</span></div>`;

			t5 = space();
			p0 = element("p");

			p0.innerHTML = `<a href="https://github.com/cryptovandals/contracts/blob/main/MANIFESTO.md" class="svelte-1eddprt">CryptoVandals MANIFESTO</a> 
    <a href="https://github.com/cryptovandals/demo" class="svelte-1eddprt">Dapp code</a> 
    <a href="https://github.com/cryptovandals/contracts" class="svelte-1eddprt">Contract code</a> 
    <a href="https://twitter.com/cryptovandals" class="svelte-1eddprt">Twitter</a>`;

			t13 = space();
			section = element("section");
			p1 = element("p");
			t14 = text("Your address: ");
			t15 = text(/*$address*/ ctx[1]);
			t16 = space();
			if (if_block) if_block.c();
			attr(div1, "class", "marquee svelte-1eddprt");
			attr(p0, "class", "links svelte-1eddprt");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			insert(target, t5, anchor);
			insert(target, p0, anchor);
			insert(target, t13, anchor);
			insert(target, section, anchor);
			append(section, p1);
			append(p1, t14);
			append(p1, t15);
			append(section, t16);
			if (if_block) if_block.m(section, null);
			current = true;
		},
		p(ctx, dirty) {
			if (!current || dirty & /*$address*/ 2) set_data(t15, /*$address*/ ctx[1]);

			if (/*$cryptoVandals*/ ctx[2] && /*$kitty*/ ctx[3]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*$cryptoVandals, $kitty*/ 12) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(section, null);
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
			if (detaching) detach(div1);
			if (detaching) detach(t5);
			if (detaching) detach(p0);
			if (detaching) detach(t13);
			if (detaching) detach(section);
			if (if_block) if_block.d();
		}
	};
}

// (35:0) {#if !$address}
function create_if_block(ctx) {
	let connect;
	let current;
	connect = new Connect({});

	return {
		c() {
			create_component(connect.$$.fragment);
		},
		m(target, anchor) {
			mount_component(connect, target, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(connect.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(connect.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(connect, detaching);
		}
	};
}

// (68:4) {#if $cryptoVandals && $kitty}
function create_if_block_1(ctx) {
	let current_block_type_index;
	let if_block;
	let t0;
	let h2;
	let t2;
	let tokens;
	let current;
	const if_block_creators = [create_if_block_2, create_else_block_1];
	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (/*$kittyTokens*/ ctx[4] && /*$kittyTokens*/ ctx[4].length === 0) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_1(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	tokens = new Tokens({
			props: {
				list: /*$cryptoVandalsTokens*/ ctx[5],
				vandalizer: /*$cryptoVandals*/ ctx[2]
			}
		});

	return {
		c() {
			if_block.c();
			t0 = space();
			h2 = element("h2");
			h2.textContent = "CryptoVandals contract";
			t2 = space();
			create_component(tokens.$$.fragment);
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, t0, anchor);
			insert(target, h2, anchor);
			insert(target, t2, anchor);
			mount_component(tokens, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_1(ctx, dirty);

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
				if_block.m(t0.parentNode, t0);
			}

			const tokens_changes = {};
			if (dirty & /*$cryptoVandalsTokens*/ 32) tokens_changes.list = /*$cryptoVandalsTokens*/ ctx[5];
			if (dirty & /*$cryptoVandals*/ 4) tokens_changes.vandalizer = /*$cryptoVandals*/ ctx[2];
			tokens.$set(tokens_changes);
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			transition_in(tokens.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			transition_out(tokens.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(t0);
			if (detaching) detach(h2);
			if (detaching) detach(t2);
			destroy_component(tokens, detaching);
		}
	};
}

// (74:6) {:else}
function create_else_block_1(ctx) {
	let h2;
	let t0;
	let mintkitty;
	let t1;
	let tokens;
	let current;
	mintkitty = new MintKitty({ props: { kitty: /*$kitty*/ ctx[3] } });

	tokens = new Tokens({
			props: {
				list: /*$kittyTokens*/ ctx[4],
				vandalizer: /*$cryptoVandals*/ ctx[2]
			}
		});

	return {
		c() {
			h2 = element("h2");
			t0 = text("Test NFT: Kitty contract\n          ");
			create_component(mintkitty.$$.fragment);
			t1 = space();
			create_component(tokens.$$.fragment);
		},
		m(target, anchor) {
			insert(target, h2, anchor);
			append(h2, t0);
			mount_component(mintkitty, h2, null);
			insert(target, t1, anchor);
			mount_component(tokens, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const mintkitty_changes = {};
			if (dirty & /*$kitty*/ 8) mintkitty_changes.kitty = /*$kitty*/ ctx[3];
			mintkitty.$set(mintkitty_changes);
			const tokens_changes = {};
			if (dirty & /*$kittyTokens*/ 16) tokens_changes.list = /*$kittyTokens*/ ctx[4];
			if (dirty & /*$cryptoVandals*/ 4) tokens_changes.vandalizer = /*$cryptoVandals*/ ctx[2];
			tokens.$set(tokens_changes);
		},
		i(local) {
			if (current) return;
			transition_in(mintkitty.$$.fragment, local);
			transition_in(tokens.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(mintkitty.$$.fragment, local);
			transition_out(tokens.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(h2);
			destroy_component(mintkitty);
			if (detaching) detach(t1);
			destroy_component(tokens, detaching);
		}
	};
}

// (69:6) {#if $kittyTokens && $kittyTokens.length === 0}
function create_if_block_2(ctx) {
	let p;
	let t;
	let mintkitty;
	let current;
	mintkitty = new MintKitty({ props: { kitty: /*$kitty*/ ctx[3] } });

	return {
		c() {
			p = element("p");
			t = text("You have no NFTs. Try creating a test NFT so you can vandalize it.\n          ");
			create_component(mintkitty.$$.fragment);
			attr(p, "class", "note level-warning");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t);
			mount_component(mintkitty, p, null);
			current = true;
		},
		p(ctx, dirty) {
			const mintkitty_changes = {};
			if (dirty & /*$kitty*/ 8) mintkitty_changes.kitty = /*$kitty*/ ctx[3];
			mintkitty.$set(mintkitty_changes);
		},
		i(local) {
			if (current) return;
			transition_in(mintkitty.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(mintkitty.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(p);
			destroy_component(mintkitty);
		}
	};
}

function create_fragment(ctx) {
	let t;
	let current_block_type_index;
	let if_block1;
	let if_block1_anchor;
	let current;
	let if_block0 = /*$chainId*/ ctx[0] && /*$chainId*/ ctx[0] !== 42 && create_if_block_3(ctx);
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (!/*$address*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if (if_block0) if_block0.c();
			t = space();
			if_block1.c();
			if_block1_anchor = empty();
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t, anchor);
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block1_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*$chainId*/ ctx[0] && /*$chainId*/ ctx[0] !== 42) {
				if (if_block0) {
					
				} else {
					if_block0 = create_if_block_3(ctx);
					if_block0.c();
					if_block0.m(t.parentNode, t);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

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
				if_block1 = if_blocks[current_block_type_index];

				if (!if_block1) {
					if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block1.c();
				} else {
					if_block1.p(ctx, dirty);
				}

				transition_in(if_block1, 1);
				if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
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
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block1_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $chainId;
	let $address;
	let $cryptoVandals;
	let $kitty;
	let $kittyTokens;
	let $cryptoVandalsTokens;
	component_subscribe($$self, chainId, $$value => $$invalidate(0, $chainId = $$value));
	component_subscribe($$self, address, $$value => $$invalidate(1, $address = $$value));
	component_subscribe($$self, cryptoVandals, $$value => $$invalidate(2, $cryptoVandals = $$value));
	component_subscribe($$self, kitty, $$value => $$invalidate(3, $kitty = $$value));
	component_subscribe($$self, kittyTokens, $$value => $$invalidate(4, $kittyTokens = $$value));
	component_subscribe($$self, cryptoVandalsTokens, $$value => $$invalidate(5, $cryptoVandalsTokens = $$value));
	return [$chainId, $address, $cryptoVandals, $kitty, $kittyTokens, $cryptoVandalsTokens];
}

class App extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default App;