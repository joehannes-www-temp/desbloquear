'use strict';

import $ from "jquery";

var node = function (selector) {
 	return $(selector.replace(/\W/g, ".")).get(0);
}, baseify = function (node, selector) {
	let n = $(node);
	if (has(node, selector)) {
		return n.get(0);
	} else {
		n = n.parentsUntil($(selector.replace(/\W/g, ".")).parent());
    n = n.get(n.length - 1) || document.body;
		if (has(n, selector)) {
			return n;
		} else {
			return $("body").get(0);
		}
	}
}, has = function (node, classes) {
	let list = classes.split(" ");
  let retVal = true;
	list.shift();
	for (var i = 0; i < list.length; i++) {
    let _retVal = false;
    for (let key of node.classList.values()) {
      _retVal = _retVal || (list[i] == key);
		}
    retVal = retVal && _retVal
	}
	return retVal;
}

export default class Link {
	constructor () {
		let m = this.constructor.prototype,
				_m = [];
		for (let key of Object.getOwnPropertyNames(m)) {
			if (key !== "constructor") {
				_m.push(m[key]);
			}
		}
		for (let i = 0; i < _m.length; i++) {
			let mod = _m[i]();
			for (var trigger of Object.keys(mod)) {
				$("body").on(trigger, function (ev) {
					mod[trigger].forEach((algorithm) => {
						if (algorithm.condition(ev)) {
							return algorithm.foo();
						}
					});
				});
			}
		}
	}
	menu () {
		return {
			click: [
			//*********
			//nosotros*
			//*********
			//activate
			{
				condition: (ev) => {
					let base = " item right",
							target = baseify(ev.target, base);
					return	target.isSameNode(node(base)) &&
									!$(target).hasClass("active");
				},
				foo: () => {
					$(".header.overlay").removeClass("hidden");
					$(".maincontent.container").addClass("blurring dimmable dimmed");
					$(".menu .item.right").addClass("active");
					return true;
				}
			},
			//deactivate
			{
				condition: (ev) => {
					let area51 = " header overlay",
							area52 = " item right",
							target51 = baseify(ev.target, area51),
							target52 = baseify(ev.target, area52);
					return	!target51.isSameNode(node(area51)) &&
									!target52.isSameNode(node(area52)) &&
									$(node(area52)).hasClass("active");
				},
				foo: () => {
					$(".header.overlay").addClass("hidden");
					$(".maincontent.container").removeClass("blurring dimmable dimmed");
					$(".menu .item.right").removeClass("active");
					return true;
				}
			}]/*,
      mouseenter: [
        //**ribbons
        {
          condition: (ev) => {
            let base = " item"
            return $(".ui.items .item");
          },
          foo: () => {

          }
        }
      ]*/
		}
	}
}
