window._ssp_global = window._ssp_global || {},
	function(t) {
		var e = {
			global: t,
			proxyName: !1,
			basePath: "http://cpro.baidustatic.com/cpro/ui/dup/"
		};
		! function() {
			var i = {
				name: "oojs",
				namespace: "",
				classes: {},
				noop: function() {},
				$oojs: function() {
					var i = {};
					if ("undefined" != typeof window && "undefined" != typeof document ? (this.runtime = "browser", i.global = window) : (this.runtime = "node", i.global = t), i.proxyName = "proxy", i.path = "node" === this.runtime ? process.cwd() + "/src/" : "/src/", "undefined" != typeof e)
						for (var n in e) n && e.hasOwnProperty(n) && (i[n] = e[n]);
					this.global = i.global || {}, i.proxyName && (Function.prototype[i.proxyName] = this.proxy), this.setPath(i.path), this.global.oojs = this.global.oojs || this
				},
				path: {},
				pathCache: {},
				getPath: function(t) {
					var e = t ? t.split(".") : !1,
						i = this.path;
					if (e)
						for (var n = 0, o = e.length; o > n; n++) {
							var r = e[n].toLowerCase();
							if (!i[r]) break;
							i = i[r]
						}
					return i.pathValue
				},
				setPath: function(t, e) {
					var i = this.path;
					if ("object" != typeof t) {
						if (e)
							for (var n = t.split("."), o = 0, r = n.length; r > o; o++) {
								var s = n[o].toLowerCase();
								i[s] = i[s] || {
									pathValue: i.pathValue
								}, i = i[s]
							} else e = t;
						e && e.lastIndexOf("\\") !== e.length - 1 && e.lastIndexOf("/") !== e.length - 1 && (e += "/"), i.pathValue = e, this.pathCache = {}
					} else
						for (var a in t) a && t.hasOwnProperty(a) && this.setPath(a, t[a])
				},
				getClassPath: function(t) {
					return this.pathCache[t] || (this.pathCache[t] = this.getPath(t) + t.replace(/\./gi, "/") + ".js"), this.pathCache[t]
				},
				loadDeps: function(t, e) {
					e = e || {};
					var i = t.__deps,
						n = (t.__namespace, []);
					for (var o in i)
						if (i.hasOwnProperty(o) && i[o]) {
							var r;
							if ("string" != typeof i[o] ? (t[o] = i[o], t[o] && t[o].__name && (r = t[o].__full)) : (r = i[o], t[o] = this.find(r)), !r || e[r]) continue;
							if (e[r] = !0, t[o]) t[o].__deps && (n = n.concat(this.loadDeps(t[o], e)));
							else {
								if ("node" === this.runtime && (t[o] = require(this.getClassPath(r)), !t[o])) throw new Error(t.name + " loadDeps failed: " + r);
								t[o] || n.push(r)
							}
						}
					return n
				},
				fastClone: function(t) {
					var e = function() {};
					e.prototype = t;
					var i = new e;
					return i
				},
				deepClone: function(t, e) {
					"number" != typeof e && (e = 10);
					var i, n = e - 1;
					if (e > 0)
						if (t instanceof Date) i = new Date, i.setTime(t.getTime());
						else if (t instanceof Array) {
						i = [];
						for (var o = 0, r = t.length; r > o; o++) i[o] = this.deepClone(t[o], n)
					} else if ("object" == typeof t) {
						i = {};
						for (var s in t)
							if (t.hasOwnProperty(s)) {
								var a = t[s];
								i[s] = this.deepClone(a, n)
							}
					} else i = t;
					else i = t;
					return i
				},
				proxy: function(t, e) {
					var i = Array.prototype.slice.apply(arguments),
						n = i.shift(),
						o = "function" == typeof this ? this : i.shift();
					return function() {
						var t = Array.prototype.slice.apply(arguments);
						return o.apply(n, t.concat(i))
					}
				},
				find: function(t) {
					var e, i = t.split(".");
					e = this.classes[i[0]];
					for (var n = 1, o = i.length; o > n; n++) {
						if (!e || !e[i[n]]) {
							e = null;
							break
						}
						e = e[i[n]]
					}
					return e
				},
				reload: function(t) {
					var e = this.find(t);
					if (e)
						if (e.__registed = !1, "node" === this.runtime) {
							var i = this.getClassPath(t);
							delete require.cache[require.resolve(i)], e = require(i)
						} else this.define(e);
					else e = this.using(t);
					return e
				},
				create: function(t, e, i, n, o, r) {
					"string" == typeof t && (t = this.using(t));
					var s = new t.__constructor(e, i, n, o, r);
					return s
				},
				using: function(t) {
					var e = this.find(t);
					return e || "node" === this.runtime && (require(this.getClassPath(t)), e = this.find(t)), e
				},
				define: function(t) {
					var e = t.name || "__tempName",
						i = t.namespace || "";
					t.__name = e, t.__namespace = i, t.__full = i.length > 1 ? i + "." + e : e, t.__deps = t.deps, t.__oojs = this, t.__constructor = function(t, e, i, n, o) {
						if (this.__clones && this.__clones.length > 0)
							for (var r = 0, s = this.__clones.length; s > r; r++) {
								var a = this.__clones[r];
								this[a] = this.__oojs.deepClone(this[a])
							}
						this.__constructorSource(t, e, i, n, o)
					}, t.__constructorSource = t[e] || this.noop, t.__staticSource = t["$" + e] || this.noop, t.__staticUpdate = function() {
						var e = [];
						for (var i in this)
							if (this.hasOwnProperty(i)) {
								var n = this[i];
								"object" != typeof n || null === n || "deps" === i || 0 === i.indexOf("__") || t.__deps && t.__deps[i] || e.push(i)
							}
						this.__clones = e, this.__constructor.prototype = this
					}, t.__static = function() {
						this.__staticSource(), this.__staticUpdate()
					};
					for (var n, o = !1, r = !1, s = i.split("."), a = s.length, l = this.classes, d = 0; a > d; d++) n = s[d], n && (l[n] = l[n] || {}, l = l[n]);
					l[e] = l[e] || {};
					var c = l;
					if (l = l[e], l.__name && l.__registed) {
						if (l.__registed) {
							o = !0;
							for (var h in t) h && t.hasOwnProperty(h) && ("undefined" == typeof l[h] || l[h] === this.noop) && (r = !0, l[h] = t[h])
						}
					} else t.__registed = !0, c[e] = t;
					if (t = c[e], !o || r) {
						var u = this.loadDeps(t);
						if (u.length > 0) {
							if (this.loader = this.loader || this.using("oojs.loader"), "browser" !== this.runtime || !this.loader) throw new Error('class "' + t.name + '" loadDeps error:' + u.join(","));
							this.loader.loadDepsBrowser(t, u)
						} else t.__static()
					}
					return "node" === this.runtime && arguments.callee.caller.arguments[2] && (arguments.callee.caller.arguments[2].exports = t), t
				}
			};
			i.define(i)
		}()
	}(_ssp_global),
	function(t) {
		var e = +new Date,
			i = "",
			n = "",
			o = !0,
			r = !1,
			s = !0,
			a = !0;
		t.setPath("http://dup.baidustatic.com/"), t.define({
			name: "static",
			namespace: "dup.ui.assertion.dan",
			deps: {},
			painterName: "static",
			assert: function(t) {
				var e = t.pdb_deliv,
					i = e.deliv_des;
				return !(1 !== e.brandad || 24 !== i.product_type)
			}
		}), t.define({
			name: "couplet",
			namespace: "dup.ui.assertion.dan",
			deps: {},
			painterName: "couplet",
			assert: function(t) {
				var e = t.pdb_deliv,
					i = e.deliv_des;
				return 1 === e.brandad && 22 === i.product_type ? !0 : !1
			}
		}), t.define({
			name: "danEexpand",
			namespace: "dup.ui.assertion",
			deps: {},
			painterName: "danEexpand",
			assert: function(t) {
				var e = t.pdb_deliv,
					i = e.deliv_des;
				return 1 === e.brandad && 25 === i.product_type ? !0 : !1
			}
		}), t.define({
			name: "barrier",
			namespace: "dup.ui.assertion.dan",
			deps: {},
			painterName: "barrier",
			assert: function(t) {
				var e = t.pdb_deliv,
					i = e.deliv_des;
				return 1 === e.brandad && 23 === i.product_type ? !0 : !1
			}
		}), t.define({
			name: "video",
			namespace: "dup.ui.assertion.dan",
			deps: {},
			painterName: "video",
			assert: function(t) {
				var e = t.pdb_deliv,
					i = e.deliv_des;
				return !(1 !== e.brandad || 20 !== i.product_type && 21 !== i.product_type)
			}
		}), t.define({
			name: "topSearchBar",
			namespace: "dup.ui.assertion",
			deps: {},
			painterName: "topSearchBar",
			assert: function(t) {
				var e = t.placement,
					i = e.container,
					n = e.fillstyle;
				return 3 == i.anchoredType && i.slide && 8 == n.btnStyleId ? !0 : !1
			}
		}), t.define({
			name: "bottomSearchBar",
			namespace: "dup.ui.assertion",
			deps: {},
			painterName: "bottomSearchBar",
			assert: function(t) {
				var e = t.placement,
					i = (e.basic, e.container),
					n = e.fillstyle;
				return 3 == i.anchoredType && i.slide && 9 == n.btnStyleId ? !0 : !1
			}
		}), t.define({
			name: "slide",
			namespace: "dup.ui.assertion",
			deps: {},
			painterName: "slide",
			assert: function(t) {
				var e = t.placement,
					i = e.container,
					n = e.fillstyle;
				return 10 == i.anchoredType && i.slide && n.btnStyleId <= 7 ? !0 : !1
			}
		}), t.define({
			name: "baiduRec",
			namespace: "dup.ui.assertion",
			deps: {},
			painterName: "baiduRec",
			assert: function(t) {
				var e = t.placement,
					i = e.basic,
					n = e.container;
				return 3 === i.rspFormat && 1 === i.flowType && 1 === n.anchoredType ? !0 : !1
			}
		}), t.define({
			name: "inlayFix",
			namespace: "dup.ui.assertion",
			deps: {},
			painterName: "inlayFix",
			assert: function(t) {
				var e = t.placement,
					i = e.basic,
					n = e.container,
					o = n.floated;
				return 1 === i.rspFormat && 1 === i.flowType && 1 === n.anchoredType ? o ? 1 === o.trigger ? !0 : this.isFloat(o) ? !1 : !0 : !0 : !1
			},
			isFloat: function(t) {
				for (var e in t) return !0;
				return !1
			}
		}), t.define({
			name: "insideText",
			namespace: "dup.ui.assertion",
			deps: {},
			painterName: "insideText",
			assert: function(t) {
				var e = t.placement,
					i = e.basic,
					n = e.container;
				return 3 === i.rspFormat && 1 === i.flowType && 8 === n.occurrence && 11 === n.anchoredType ? !0 : !1
			}
		}), t.define({
			name: "dynamicFloat",
			namespace: "dup.ui.assertion",
			deps: {},
			painterName: "dynamicFloat",
			assert: function(t) {
				var e = t.placement,
					i = e.basic,
					n = e.container,
					o = n.floated;
				return 1 === i.rspFormat && 1 === i.flowType && 1 === n.anchoredType && o && 8 === o.trigger ? !0 : !1
			}
		}), t.define({
			name: "float",
			namespace: "dup.ui.assertion",
			deps: {},
			painterName: "float",
			assert: function(t) {
				var e = t.placement,
					i = e.basic,
					n = e.container;
				return 1 === i.rspFormat && 1 === i.flowType && 3 === n.anchoredType ? !0 : !1
			}
		}), t.define({
			name: "inlayFix",
			namespace: "dup.ui.assertion.mobile",
			deps: {},
			painterName: "inlayFix",
			assert: function(t) {
				var e = t.placement,
					i = e.basic,
					n = e.container;
				return 1 === i.rspFormat && 2 === i.flowType && 1 === n.anchoredType ? !0 : !1
			}
		}), t.define({
			name: "float",
			namespace: "dup.ui.assertion.mobile",
			painterName: "float",
			assert: function(t) {
				var e = t.placement,
					i = e.basic,
					n = e.container;
				return 1 === i.rspFormat && 2 === i.flowType && 3 === n.anchoredType ? !0 : !1
			}
		}), t.define({
			name: "config",
			namespace: "dup.common",
			DUP_PREFIX: "BAIDU_SSP_",
			LOADER_DEFINE_NAME: "BAIDU_SSP_define",
			LCR_COOKIE_NAME: "BAIDU_SSP_lcr",
			POS_URL: "http://pos.baidu.com/acom?",
			DUP_TM: "BAIDU_DUP_SETJSONADSLOT",
			LOG_URL: "http://cbjslog.baidu.com/log",
			CACHE_URL: "http://snippet.pos.baidu.com/bfp/snippetcacher.php?",
			STATUS_CREATE: 1,
			STATUS_REQUEST: 2,
			STATUS_RESPONSE: 4,
			STATUS_RENDERED: 8,
			STATUS_FINISH: 16,
			$config: function() {
				i && (this.DUP_PREFIX = i), n && (this.LOADER_DEFINE_NAME = n)
			}
		}), t.define({
			name: "lang",
			namespace: "dup.common.utility",
			hasOwn: Object.prototype.hasOwnProperty,
			getAttribute: function(t, e) {
				for (var i = t, n = e.split("."); n.length;) {
					if (void 0 === i || null === i) return;
					i = i[n.shift()]
				}
				return i
			},
			serialize: function(t) {
				if ("object" != typeof t) return "";
				var e = [];
				for (var i in t) this.hasOwn.call(t, i) && e.push(i + "=" + encodeURIComponent(t[i]));
				return e.join("&")
			},
			getType: function(t) {
				for (var e = {}, i = "Array Boolean Date Error Function Number RegExp String".split(" "), n = 0, o = i.length; o > n; n++) e["[object " + i[n] + "]"] = i[n].toLowerCase();
				return null == t ? "null" : e[Object.prototype.toString.call(t)] || "object"
			},
			isEmptyObj: function(t) {
				for (var e in t) return !1;
				return !0
			},
			argumentsToArray: function(t) {
				var e = [];
				switch (this.getType(t)) {
					case "object":
						e = Array.prototype.slice.call(t);
						break;
					case "array":
						e = t;
						break;
					case "number":
					case "string":
						e.push(t)
				}
				return e
			},
			template: function(t, e) {
				var i = /{(.*?)}/g;
				return t.replace(i, function(t, i, n, o) {
					return e[i] || ""
				})
			},
			encodeHTML: function(t) {
				var e = {
					'"': "&quot;",
					">": "&gt;",
					"<": "&lt;",
					"&": "&amp;"
				};
				return t.replace(/[\"<>\&]/g, function(t) {
					return e[t]
				})
			},
			format: function(t, e) {
				var i = /\{(\w+)\:(\w+)\}/g,
					n = this;
				return t.replace(i, function(t, i, o) {
					var r = e[i];
					switch (o) {
						case "number":
							r = +r || 0;
							break;
						case "boolean":
							r = !!r;
							break;
						case "html":
							r = n.encodeHTML(r)
					}
					return r
				})
			},
			jsonToObj: function(t) {
				var e = "";
				return window.JSON && window.JSON.parse && (e = window.JSON.parse(t)), e
			},
			objToString: function(t) {
				var e = "";
				try {
					e = window.JSON && window.JSON.stringify ? window.JSON.stringify(t) : window.eval(t)
				} catch (i) {}
				return e
			},
			trim: function(t) {
				return t.replace(/(^\s*)|(\s*$)/g, "")
			},
			unique: function(t) {
				for (var e = [], i = {}, n = t.length, o = 0; n > o; o++) {
					var r = t[o];
					i[r] || (e[e.length] = r, i[r] = !0)
				}
				return e
			},
			isArray: function(t) {
				return "[object Array]" == Object.prototype.toString.call(t)
			},
			isFunction: function(t) {
				return "[object Function]" == Object.prototype.toString.call(t)
			},
			toArray: function(t) {
				if (null === t || void 0 === t) return [];
				if (this.isArray(t)) return t;
				if ("number" != typeof t.length || "string" == typeof t || this.isFunction(t)) return [t];
				if (t.item) {
					for (var e = t.length, i = new Array(e); e--;) i[e] = t[e];
					return i
				}
				return [].slice.call(t)
			},
			encode: function(t) {
				return void 0 === t ? "" : encodeURIComponent(t)
			},
			encodeUrl: function(t) {
				var e = escape(t);
				return e = e.replace(/([*+-.\/@_])/g, function(t) {
					return "%" + t.charCodeAt(0).toString(16)
				}), e.replace(/%/g, "_")
			},
			isPlain: function(t) {
				var e, i = Object.prototype.hasOwnProperty;
				if (!(t && "[object Object]" === Object.prototype.toString.call(t) && "isPrototypeOf" in t)) return !1;
				if (t.constructor && !i.call(t, "constructor") && !i.call(t.constructor.prototype, "isPrototypeOf")) return !1;
				for (e in t);
				return void 0 === e || i.call(t, e)
			},
			clone: function(t) {
				var e, i, n = t;
				if (!t || t instanceof Number || t instanceof String || t instanceof Boolean) return n;
				if (this.isArray(t)) {
					n = [];
					var o = 0;
					for (e = 0, i = t.length; i > e; e++) n[o++] = this.clone(t[e])
				} else if (this.isPlain(t)) {
					n = {};
					for (e in t) t.hasOwnProperty(e) && (n[e] = this.clone(t[e]))
				}
				return n
			}
		}), t.define({
			name: "browser",
			namespace: "dup.common.utility",
			deps: {
				lang: "dup.common.utility.lang"
			},
			$browser: function() {
				this.win = window, this.nav = window.navigator, this.checkBrowser()
			},
			checkBrowser: function() {
				var t = navigator.userAgent,
					e = window.RegExp;
				/msie (\d+\.\d)/i.test(t) && (this.ie = document.documentMode || +e.$1), /opera\/(\d+\.\d)/i.test(t) && (this.opera = +e.$1), /firefox\/(\d+\.\d)/i.test(t) && (this.firefox = +e.$1), /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(t) && !/chrome/i.test(t) && (this.safari = +(e.$1 || e.$2)), /chrome\/(\d+\.\d)/i.test(t) && (this.chrome = +e.$1, this.test360() && (this.qihoo = !0));
				try {
					/(\d+\.\d)/.test(this.lang.getAttribute(window, "external.max_version")) && (this.maxthon = +e.$1)
				} catch (i) {}
				this.isWebkit = /webkit/i.test(t), this.isGecko = /gecko/i.test(t) && !/like gecko/i.test(t);
				for (var n = ["Android", "iPad", "Phone", "iOS", "iPod", "Linux", "Macintosh", "Windows"], o = "", r = 0; r < n.length; r++) {
					if (o = n[r], "iPad" === o || "iPhone" === o || "iOS" === o || "iPod" === o) {
						this.isIOS = !0;
						break
					}
					if ("Android" === o) {
						this.isAndroid = !0;
						break
					}
					if (t.match(new RegExp(o.toLowerCase(), "i"))) break
				}
				this.platform = o
			},
			test360: function() {
				try {
					return "scoped" in document.createElement("style")
				} catch (t) {
					return !1
				}
			},
			getFlashPlayerVersion: function() {
				var t = 0;
				try {
					if (this.chrome >= 45) return 0;
					if (this.nav.plugins && this.nav.mimeTypes.length) {
						var e = this.nav.plugins["Shockwave Flash"];
						e && e.description && (t = e.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0")
					}
					if (0 === t && (this.win.ActiveXObject || this.win.hasOwnProperty("ActiveXObject")))
						for (var i = 30; i >= 2; i--) try {
							var n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
							if (n) {
								var o = n.GetVariable("$version");
								if (t = o.replace(/WIN/g, "").replace(/,/g, "."), t > 0) break
							}
						} catch (r) {}
					t = parseInt(t, 10), this.getFlashPlayerVersion = function() {
						return t
					}
				} catch (s) {
					t = 0
				}
				return t
			}
		}), t.define({
			name: "cookie",
			namespace: "dup.common.utility",
			deps: {
				lang: "dup.common.utility.lang"
			},
			get: function(t, e) {
				var i = new RegExp("(^| )" + t + "=([^;]*)(;|$)"),
					n = i.exec(document.cookie);
				return n ? e ? decodeURIComponent(n[2]) : n[2] : ""
			},
			set: function(t, e, i, n) {
				var o = i.expires;
				document.cookie = t + "=" + (n ? encodeURIComponent(e) : e) + (i.path ? "; path=" + i.path : "") + (o ? "; expires=" + o.toGMTString() : "") + (i.domain ? "; domain=" + i.domain : "")
			},
			remove: function(t) {
				var e = new Date;
				e.setTime(e.getTime() - 86400), this.set(t, "", {
					path: "/",
					expires: e
				})
			}
		}), t.define({
			name: "additionalParam",
			namespace: "dup.business.parameter",
			deps: {},
			$additionalParam: function() {
				this.paramsList = []
			},
			ParamsMap: {
				clid: {
					key: "apdi",
					encode: !0
				},
				cuid: {
					key: "udi",
					encode: !0
				}
			},
			paramCheck: function(t, e) {
				for (var i in e)
					if (i && e.hasOwnProperty(i) && this.ParamsMap[i]) {
						var n = this.ParamsMap[i],
							o = {};
						try {
							n.key && (o.key = n.key, o.value = this.paramEncode(n, e[i])), n && !n.key && (o.key = i, o.value = this.paramEncode(n, e[i])), this.paramsList.push(o)
						} catch (r) {}
					}
			},
			paramEncode: function(t, e) {
				var i;
				return i = t.encode ? encodeURIComponent(e) : e
			}
		}), t.define({
			name: "md5",
			namespace: "dup.common.utility",
			md5: function(t) {
				function e(t, e) {
					return t << e | t >>> 32 - e
				}

				function i(t, e) {
					var i, n, o, r, s;
					return o = 2147483648 & t, r = 2147483648 & e, i = 1073741824 & t, n = 1073741824 & e, s = (1073741823 & t) + (1073741823 & e), i & n ? 2147483648 ^ s ^ o ^ r : i | n ? 1073741824 & s ? 3221225472 ^ s ^ o ^ r : 1073741824 ^ s ^ o ^ r : s ^ o ^ r
				}

				function n(t, e, i) {
					return t & e | ~t & i
				}

				function o(t, e, i) {
					return t & i | e & ~i
				}

				function r(t, e, i) {
					return t ^ e ^ i
				}

				function s(t, e, i) {
					return e ^ (t | ~i)
				}

				function a(t, o, r, s, a, l, d) {
					return t = i(t, i(i(n(o, r, s), a), d)), i(e(t, l), o)
				}

				function l(t, n, r, s, a, l, d) {
					return t = i(t, i(i(o(n, r, s), a), d)), i(e(t, l), n)
				}

				function d(t, n, o, s, a, l, d) {
					return t = i(t, i(i(r(n, o, s), a), d)), i(e(t, l), n)
				}

				function c(t, n, o, r, a, l, d) {
					return t = i(t, i(i(s(n, o, r), a), d)), i(e(t, l), n)
				}

				function h(t) {
					for (var e, i = t.length, n = i + 8, o = (n - n % 64) / 64, r = 16 * (o + 1), s = Array(r - 1), a = 0, l = 0; i > l;) e = (l - l % 4) / 4, a = l % 4 * 8, s[e] = s[e] | t.charCodeAt(l) << a, l++;
					return e = (l - l % 4) / 4, a = l % 4 * 8, s[e] = s[e] | 128 << a, s[r - 2] = i << 3, s[r - 1] = i >>> 29, s
				}

				function u(t) {
					var e, i, n = "",
						o = "";
					for (i = 0; 3 >= i; i++) e = t >>> 8 * i & 255, o = "0" + e.toString(16), n += o.substr(o.length - 2, 2);
					return n
				}

				function p(t) {
					t = t.replace(/\r\n/g, "\n");
					for (var e = "", i = 0; i < t.length; i++) {
						var n = t.charCodeAt(i);
						128 > n ? e += String.fromCharCode(n) : n > 127 && 2048 > n ? (e += String.fromCharCode(n >> 6 | 192), e += String.fromCharCode(63 & n | 128)) : (e += String.fromCharCode(n >> 12 | 224), e += String.fromCharCode(n >> 6 & 63 | 128), e += String.fromCharCode(63 & n | 128))
					}
					return e
				}
				var m, f, g, y, v, w, b, I, S, _ = Array(),
					T = 7,
					x = 12,
					C = 17,
					A = 22,
					O = 5,
					E = 9,
					P = 14,
					k = 20,
					D = 4,
					L = 11,
					U = 16,
					F = 23,
					B = 6,
					M = 10,
					N = 15,
					H = 21;
				for (t = p(t), _ = h(t), w = 1732584193, b = 4023233417, I = 2562383102, S = 271733878, m = 0; m < _.length; m += 16) f = w, g = b, y = I, v = S, w = a(w, b, I, S, _[m + 0], T, 3614090360), S = a(S, w, b, I, _[m + 1], x, 3905402710), I = a(I, S, w, b, _[m + 2], C, 606105819), b = a(b, I, S, w, _[m + 3], A, 3250441966), w = a(w, b, I, S, _[m + 4], T, 4118548399), S = a(S, w, b, I, _[m + 5], x, 1200080426), I = a(I, S, w, b, _[m + 6], C, 2821735955), b = a(b, I, S, w, _[m + 7], A, 4249261313), w = a(w, b, I, S, _[m + 8], T, 1770035416), S = a(S, w, b, I, _[m + 9], x, 2336552879), I = a(I, S, w, b, _[m + 10], C, 4294925233), b = a(b, I, S, w, _[m + 11], A, 2304563134), w = a(w, b, I, S, _[m + 12], T, 1804603682), S = a(S, w, b, I, _[m + 13], x, 4254626195), I = a(I, S, w, b, _[m + 14], C, 2792965006), b = a(b, I, S, w, _[m + 15], A, 1236535329), w = l(w, b, I, S, _[m + 1], O, 4129170786), S = l(S, w, b, I, _[m + 6], E, 3225465664), I = l(I, S, w, b, _[m + 11], P, 643717713), b = l(b, I, S, w, _[m + 0], k, 3921069994), w = l(w, b, I, S, _[m + 5], O, 3593408605), S = l(S, w, b, I, _[m + 10], E, 38016083), I = l(I, S, w, b, _[m + 15], P, 3634488961), b = l(b, I, S, w, _[m + 4], k, 3889429448), w = l(w, b, I, S, _[m + 9], O, 568446438), S = l(S, w, b, I, _[m + 14], E, 3275163606), I = l(I, S, w, b, _[m + 3], P, 4107603335), b = l(b, I, S, w, _[m + 8], k, 1163531501), w = l(w, b, I, S, _[m + 13], O, 2850285829), S = l(S, w, b, I, _[m + 2], E, 4243563512), I = l(I, S, w, b, _[m + 7], P, 1735328473), b = l(b, I, S, w, _[m + 12], k, 2368359562), w = d(w, b, I, S, _[m + 5], D, 4294588738), S = d(S, w, b, I, _[m + 8], L, 2272392833), I = d(I, S, w, b, _[m + 11], U, 1839030562), b = d(b, I, S, w, _[m + 14], F, 4259657740), w = d(w, b, I, S, _[m + 1], D, 2763975236), S = d(S, w, b, I, _[m + 4], L, 1272893353), I = d(I, S, w, b, _[m + 7], U, 4139469664), b = d(b, I, S, w, _[m + 10], F, 3200236656), w = d(w, b, I, S, _[m + 13], D, 681279174), S = d(S, w, b, I, _[m + 0], L, 3936430074), I = d(I, S, w, b, _[m + 3], U, 3572445317), b = d(b, I, S, w, _[m + 6], F, 76029189), w = d(w, b, I, S, _[m + 9], D, 3654602809), S = d(S, w, b, I, _[m + 12], L, 3873151461), I = d(I, S, w, b, _[m + 15], U, 530742520), b = d(b, I, S, w, _[m + 2], F, 3299628645), w = c(w, b, I, S, _[m + 0], B, 4096336452), S = c(S, w, b, I, _[m + 7], M, 1126891415), I = c(I, S, w, b, _[m + 14], N, 2878612391), b = c(b, I, S, w, _[m + 5], H, 4237533241), w = c(w, b, I, S, _[m + 12], B, 1700485571), S = c(S, w, b, I, _[m + 3], M, 2399980690), I = c(I, S, w, b, _[m + 10], N, 4293915773), b = c(b, I, S, w, _[m + 1], H, 2240044497), w = c(w, b, I, S, _[m + 8], B, 1873313359), S = c(S, w, b, I, _[m + 15], M, 4264355552), I = c(I, S, w, b, _[m + 6], N, 2734768916), b = c(b, I, S, w, _[m + 13], H, 1309151649), w = c(w, b, I, S, _[m + 4], B, 4149444226), S = c(S, w, b, I, _[m + 11], M, 3174756917), I = c(I, S, w, b, _[m + 2], N, 718787259), b = c(b, I, S, w, _[m + 9], H, 3951481745), w = i(w, f), b = i(b, g), I = i(I, y), S = i(S, v);
				var W = function(t) {
						for (var e = t, i = 0, n = 8 - t.length; n > i; i++) e = "0" + e;
						return e
					},
					R = ((parseInt("0x" + u(w), 16) + parseInt("0x" + u(b), 16)) % 4294967296).toString(16),
					j = ((parseInt("0x" + u(I), 16) + parseInt("0x" + u(S), 16)) % 4294967296).toString(16);
				return R.length < 8 && (R = W(R)), j.length < 8 && (j = W(j)), R + j
			}
		}), t.define({
			name: "requestCache",
			namespace: "dup.business",
			deps: {
				config: "dup.common.config"
			},
			slotInfoMap: {},
			secondResult: {},
			add: function(t, e) {
				this.slotInfoMap[t] = e
			},
			get: function(t) {
				return this.slotInfoMap[t]
			},
			cacheRequest: function(t, e) {
				if (!t || this.secondResult[t]) return !1;
				this.secondResult[t] = e;
				var i = this.get(t),
					n = this.config.CACHE_URL + "dpv=" + t + "&di=" + i.slotId;
				this.loadScript(n)
			},
			loadScript: function(t) {
				var e = document.createElement("script");
				e.charset = "utf-8", e.async = !0, e.src = t;
				var i = document.getElementsByTagName("head")[0] || document.body;
				i.insertBefore(e, i.firstChild)
			}
		}), t.define({
			name: "storage",
			namespace: "dup.common.utility",
			store: null,
			$storage: function() {
				try {
					this.store = window.localStorage || {}
				} catch (t) {}
			},
			available: function() {
				var t = !1,
					e = "BAIDU_DUP_storage_available";
				try {
					this.store.removeItem(e), this.setItem(e, "1"), this.getItem(e) && (t = !0), this.store.removeItem(e)
				} catch (i) {}
				return t
			},
			setItem: function(t, e, i) {
				if (this.store) {
					e = i ? encodeURIComponent(e) : e;
					try {
						this.store.setItem(t, e)
					} catch (n) {}
				}
			},
			getItem: function(t, e) {
				if (this.store) {
					var i = this.store.getItem(t);
					return e && i ? decodeURIComponent(i) : i
				}
				return null
			},
			addItem: function(t, e, i) {
				if (this.store) {
					e = i ? encodeURIComponent(e) : e;
					var n = this.getItem(t) || "";
					n += (n && "|") + e;
					try {
						this.setItem(t, n)
					} catch (o) {}
				}
			},
			spliceItem: function(t, e, i) {
				if (this.store) {
					e = i ? encodeURIComponent(e) : e;
					var n = this.getItem(t) || "";
					if (n = n.replace(new RegExp(e + "\\|?", "g"), "").replace(/\|$/, "")) try {
						this.setItem(t, n)
					} catch (o) {} else this.store.removeItem(t)
				}
			}
		}), t.define({
			name: "loader",
			namespace: "dup.common",
			deps: {
				config: "dup.common.config"
			},
			$loader: function() {
				this.loadingCls = this.loadingCls || {}
			},
			load: function(e, i, n) {
				var o = t.getClassPath(i),
					r = this.check(o);
				if (!r) {
					var s = document.createElement("script");
					s.type = "text/javascript", s.async = !0, s.src = o;
					var a = t.proxy(this, this.onLoadStatusHandler, e, s);
					s.onload = s.onerror = s.onreadystatechange = a;
					var l = document.getElementsByTagName("script")[0];
					l.parentNode.insertBefore(s, l), this.loadingCls[e] = n
				}
			},
			check: function() {
				for (var t in this.loadingCls)
					if (this.loadingCls.hasOwnProperty(t) && this.loadingCls[t] === !0) return !0;
				return !1
			},
			onLoadStatusHandler: function(t, e, i) {
				var e, i;
				3 === arguments.length ? (e = arguments[1], i = arguments[2]) : (e = arguments[0], i = arguments[1]);
				var n = this.loadingCls[e];
				i && /loaded|complete|undefined/.test(i.readyState) && (i.onload = i.onerror = i.onreadystatechange = null, i = void 0, n && n())
			}
		}), t.define({
			name: "float",
			namespace: "dup.ui.assertion.mobile",
			painterName: "float",
			assert: function(t) {
				var e = t.placement,
					i = e.basic,
					n = e.container;
				return 1 === i.rspFormat && 2 === i.flowType && 3 === n.anchoredType ? !0 : !1
			}
		}), t.define({
			name: "dynamicFloat",
			namespace: "dup.ui.assertion",
			deps: {},
			painterName: "dynamicFloat",
			assert: function(t) {
				var e = t.placement,
					i = e.basic,
					n = e.container,
					o = n.floated;
				return 1 === i.rspFormat && 1 === i.flowType && 1 === n.anchoredType && o && 8 === o.trigger ? !0 : !1
			}
		}), t.define({
			name: "interface",
			namespace: "dup.business",
			deps: {
				lang: "dup.common.utility.lang"
			},
			apiMap: {},
			$Interface: function() {},
			register: function(e, i, n) {
				this.apiMap[e] = t.proxy(i, n)
			},
			executeTask: function(t) {
				for (var e in t) {
					var i = t[e];
					if ("array" === this.lang.getType(i) && ("id" !== e || "container" !== e || "size" !== e || "async" !== e)) {
						var n = this.apiMap[e];
						if (n) return n.apply(null, i)
					}
				}
			},
			perform: function(t, e) {
				var i = this.apiMap[t];
				return i ? i.apply(null, e) : void 0
			}
		}), t.define({
			name: "material",
			namespace: "dup.business",
			deps: {
				lang: "dup.common.utility.lang"
			},
			$material: function() {
				var t = this;
				this.materialFactory = {}, this.materialFactory.text = function(e) {
					var i = "font-size:{size:number}{unit:string};color:{defaultColor:string};font-weight:{defaultBold:string};font-style:{defaultItalic:string};text-decoration:{defaultUnderline:string};",
						n = '<span style="word-wrap:break-word;"><a href="{clickUrl:string}" target="{target:string}" style="' + i + '"{events}>{text:string}</a></span>',
						o = /\{events\}/;
					if (1 === e.version) n = n.replace(o, "");
					else if (2 === e.version) {
						var r = "this.style.color='{defaultColor:string}';this.style.fontWeight='{defaultBold:string}';this.style.fontStyle='{defaultItalic:string}';this.style.textDecoration='{defaultUnderline:string}';",
							s = "this.style.color='{hoverColor:string}';this.style.fontWeight='{hoverBold:string}';this.style.fontStyle='{hoverItalic:string}';this.style.textDecoration='{hoverUnderline:string}';",
							a = ' onmouseover="' + s + '" onmouseout="' + r + '"';
						n = n.replace(o, a);
						for (var l = ["default", "hover"], d = 0; d < l.length; d++) {
							var c = l[d],
								h = c + "Color",
								u = c + "Bold",
								p = c + "Italic",
								m = c + "Underline";
							e[h] = "#" + e[h], e[u] = e[u] ? "bold" : "normal", e[p] = e[p] ? "italic" : "normal", e[m] = e[m] ? "underline" : "none"
						}
					}
					return t.lang.format(n, e)
				}, this.materialFactory.image = '<a href="{clickUrl:string}" target="{target:string}"><img src="{src:string}" title="{title:html}" alt="{title:html}" border="0" height="{height:number}" width="{width:number}" /></a>', this.materialFactory.flash = function(e) {
					var i = ["<script>", "var BD = BD || {};", "BD.MC = BD.MC || {};", "BD.MC.ADFlash = BD.MC.ADFlash || {};", "BD.MC.ADImg = BD.MC.ADImg || {};", "BD.MC.ADFlash.w = {width:number};", "BD.MC.ADFlash.h = {height:number};", 'BD.MC.ADFlash.mu = "{src:string}";', 'BD.MC.ADFlash.cu = "{clickUrl:string}";', "BD.MC.ADFlash.wm = {wmode:number};", 'BD.MC.ADFlash.ct = "{clickTag:string}";', "BD.MC.ADImg.w = {imageWidth:number};", "BD.MC.ADImg.h = {imageHeight:number};", 'BD.MC.ADImg.mu = "{imageSrc:string}";', 'BD.MC.ADImg.cu = "{imageClickUrl:string}";', 'BD.MC.ADImg.tw = "{target:string}";', "BD.MC.ADImg.flag = {backupImage:number};", "</script>", '<script src ="http://cbjs.baidu.com/js/{file:string}.js">', "</script>"];
					return e.file = e.hasLink ? "cflash" : "flash", e.imageClickUrl = e.clickUrl, e.hasLink || (e.clickUrl = ""), t.lang.format(i.join(""), e)
				}, this.materialFactory.rich = function(t) {
					return t.content
				}, this.materialFactory.slide = function(e, i) {
					for (var n = '<div id="bd_ec_clb_asp" style="width:{width:number}px;height:{height:number}px;overflow:hidden;">{html:string}</div><script>(function(){var d = document;function G(id) { return d.getElementById(id); };var container = G("bd_ec_clb_asp");var pages = container.childNodes;var pl = 0;for (var i = 0; i < pages.length; i++) {if (pages[i].nodeType === 1) {pl++;}}var cp = 0;function showPage(pn) { pages[pn].style.display = ""; };function hidePages() {for (var i = 0; i < pl; i++) {pages[i].style.display = "none";}};function roll() {hidePages();showPage(cp);cp == (pages.length - 1) ? cp = 0 : cp++;};var autoRoll;function setRoll() { autoRoll = window.setInterval(function() { roll(); }, {interval:number});};roll();setRoll();container.onmouseover = function() { window.clearInterval(autoRoll); };container.onmouseout = function() {setRoll(); };})();</script>', o = [], r = e.materials, s = 0; s < r.length; s++) {
						var a = r[s];
						"string" != typeof a && (a = t.formatMaterial(a, i, !0)), o.push(a)
					}
					e.html = "<div>" + o.join("</div><div>") + "</div>";
					var l = i.response.placement,
						d = l.container;
					return e.width = i.width || d.width, e.height = i.height || d.height, t.lang.format(n, e)
				}
			},
			formatMaterial: function(t, e, i) {
				if ("string" == typeof t) return t;
				if (!t.type) return "";
				var n = this.materialFactory[t.type];
				if (n) {
					var o = "string" == typeof n ? this.lang.format(n, t) : n(t, e);
					return i ? o : "<!DOCTYPE html><body>" + o
				}
				return ""
			}
		}), t.define({
			name: "monitor",
			namespace: "dup.business",
			sendLog: function(t) {
				if (t.response) {
					var e = t.response.pdb_deliv.deliv_des,
						i = e._html,
						n = i && i.monitorUrl;
					if (n) {
						var o = new Image,
							r = "log" + +new Date;
						window[r] = o, n = "http://" == n.substr(0, 7).toLowerCase() ? n : "http://" + n;
						var s = function() {
							o.onload = o.onerror = o.onabort = null;
							try {
								delete window[r]
							} catch (t) {
								window[r] = void 0
							}
						};
						o.onload = o.onerror = o.onabort = s, o.src = n
					}
				}
			}
		}), t.define({
			name: "inlayFix",
			namespace: "dup.ui.assertion",
			deps: {},
			painterName: "inlayFix",
			assert: function(t) {
				var e = t.placement,
					i = e.basic,
					n = e.container,
					o = n.floated;
				return 1 === i.rspFormat && 1 === i.flowType && 1 === n.anchoredType ? o ? 1 === o.trigger ? !0 : this.isFloat(o) ? !1 : !0 : !0 : !1
			},
			isFloat: function(t) {
				for (var e in t) return !0;
				return !1
			}
		}), t.define({
			name: "float",
			namespace: "dup.ui.assertion",
			deps: {},
			painterName: "float",
			assert: function(t) {
				var e = t.placement,
					i = e.basic,
					n = e.container;
				return 1 === i.rspFormat && 1 === i.flowType && 3 === n.anchoredType ? !0 : !1
			}
		}), t.define({
			name: "unicode",
			namespace: "dup.common.utility",
			deps: {},
			toDecode: function(t) {
				var e = [];
				if (t instanceof Array) {
					for (var i = 0; i < t.length; i++) {
						var n = t[i];
						e.push(this.decode(n))
					}
					return e
				}
				return "string" == typeof t ? this.decode(t) : void 0
			},
			toEncode: function(t) {
				var e = [];
				if (t instanceof Array) {
					for (var i = 0; i < t.length; i++) {
						var n = t[i];
						e.push(this.encode(n))
					}
					return e
				}
				return "string" == typeof t ? this.encode(t) : void 0
			},
			decode: function(t) {
				return unescape(t.replace(/\\(u[0-9a-fA-F]{4})/gm, "%$1"))
			},
			encode: function(t) {
				return escape(t).replace(/%(u[0-9A-F]{4})|(%[0-9A-F]{2})/gm, function(t, e, i) {
					return e && "\\" + e.toLowerCase() || unescape(i)
				})
			}
		}), t.define({
			name: "dom",
			namespace: "dup.common.utility",
			deps: {
				lang: "dup.common.utility.lang",
				browser: "dup.common.utility.browser"
			},
			$dom: function() {},
			g: function(t, e) {
				return "string" === this.lang.getType(t) && t.length > 0 ? (e = e || window, e.document.getElementById(t)) : !t.nodeName || 1 !== t.nodeType && 9 !== t.nodeType ? null : t
			},
			getDocument: function(t) {
				return 9 === t.nodeType ? t : t.ownerDocument || t.document
			},
			getWindow: function(t) {
				var e = this.getDocument(t);
				return e.parentWindow || e.defaultView || null
			},
			isWindow: function(t) {
				try {
					if (t && "object" == typeof t && t.document && "setInterval" in t) return !0
				} catch (e) {
					return !1
				}
				return !1
			},
			isInIframe: function(t, e) {
				return t = t || window, t != window.top && t != t.parent || !this.isWindow(t)
			},
			checkParentAccess: function(t) {
				try {
					return !!t.parent.location.toString()
				} catch (e) {
					return !1
				}
			},
			isInCrossDomainIframe: function(t, e) {
				e = 2 === arguments.length ? e : t.parent;
				for (var i = 0, n = 10; i++ < n && this.isInIframe(t, e);) {
					if (!this.checkParentAccess(t)) return !0;
					t = t.parent
				}
				return i >= n
			},
			ready: function(e, i, n) {
				n = n || this.win || window;
				var o = n.document;
				i = i || 0, this.domReadyMonitorRunTimes = 0, this.readyFuncArray = this.readyFuncArray || [], this.readyFuncArray.push({
					func: e,
					delay: i,
					done: !1
				});
				var r = t.proxy(this, function() {
						var t = !1;
						this.domReadyMonitorRunTimes++;
						var e = !1;
						try {
							n.frameElement && (e = !0)
						} catch (i) {
							e = !0
						}
						if (this.browser.ie && this.browser.ie < 9 && !e) try {
								o.documentElement.doScroll("left"), t = !0
							} catch (i) {} else if ("complete" === o.readyState || this.domContentLoaded) t = !0;
							else if (this.domReadyMonitorRunTimes > 3e5) return void(this.domReadyMonitorId && (n.clearInterval(this.domReadyMonitorId), this.domReadyMonitorId = null));
						if (t) try {
							if (this.readyFuncArray && this.readyFuncArray.length)
								for (var r = 0, s = this.readyFuncArray.length; s > r; r++) {
									var a = this.readyFuncArray[r];
									a && a.func && !a.done && (a.delay ? (a.done = !0, n.setTimeout(a.func, a.delay)) : (a.done = !0, a.func()))
								}
						} catch (l) {
							throw l
						} finally {
							this.domReadyMonitorId && (n.clearInterval(this.domReadyMonitorId), this.domReadyMonitorId = null)
						}
					}, this),
					s = t.proxy(this, function() {
						this.domContentLoaded = !0, r()
					});
				this.domReadyMonitorId || (this.domReadyMonitorId = n.setInterval(r, 50), o.addEventListener ? (o.addEventListener("DOMContentLoaded", s, !1), n.addEventListener("load", s, !1)) : o.attachEvent && n.attachEvent("onload", s, !1))
			},
			bind: function(t, e, i) {
				return "string" == typeof t && (t = this.g(t)), e = e.replace(/^on/i, "").toLowerCase(), t.addEventListener ? t.addEventListener(e, i, !1) : t.attachEvent && t.attachEvent("on" + e, i), t
			},
			getNotCrossDomainTopWindow: function(t, e) {
				1 === arguments.length && "number" === this.lang.getType(arguments[0]) && (e = arguments[0], t = void 0), e = e || 10;
				for (var i = window, n = 0; n++ < e && this.isInIframe(i) && !this.isInCrossDomainIframe(i) && (!t || !t(i));) i = i.parent;
				return i
			},
			getTopElement: function(t) {
				var e = this.isWindow(t) ? t.document : this.getDocument(t);
				return "CSS1Compat" === e.compatMode ? e.documentElement : e.body
			},
			getDocumentTitle: function() {
				var t = this.getNotCrossDomainTopWindow(),
					e = t.document.title,
					i = 60;
				return e.length > i && (e = e.substr(0, i)), e
			},
			getPageClient: function() {
				var t;
				return "number" == typeof window.innerWidth ? t = {
					width: window.innerWidth,
					height: window.innerHeight
				} : document.documentElement && document.documentElement.clientWidth ? t = {
					width: document.documentElement.clientWidth,
					height: document.documentElement.clientHeight
				} : document.body && document.body.clientWidth && (t = {
					width: document.body.clientWidth,
					height: document.body.clientHeight
				}), t
			},
			getNotCrossDomainWin: function() {
				var t = this.getWinList();
				return t[t.length - 1]
			},
			getWinList: function() {
				for (var t = 0, e = window, i = e.top, n = [e]; e !== i && t++ < 10 && this.isWindow(e) && this.isWindow(e.parent);) e = e.parent, n.push(e);
				return getWinList = function() {
					return n
				}, n
			}
		}), t.define({
			name: "style",
			namespace: "dup.common.utility",
			deps: {
				dom: "dup.common.utility.dom",
				lang: "dup.common.utility.lang",
				browser: "dup.common.utility.browser"
			},
			$style: function() {},
			getClientWidth: function(t) {
				t = t || window;
				try {
					var e = this.dom.getTopElement(t).clientWidth;
					if (e || 0 === e) return e
				} catch (i) {}
				return -1
			},
			getClientHeight: function(t) {
				t = t || window;
				try {
					var e = this.dom.getTopElement(t).clientHeight;
					if (e || 0 === e) return e
				} catch (i) {}
				return -1
			},
			getPositionCore: function(t) {
				var e = {
					top: 0,
					left: 0
				};
				if (t === this.dom.getTopElement(t)) return e;
				var i = this.dom.getDocument(t),
					n = i.body,
					o = i.documentElement;
				if (t.getBoundingClientRect) {
					var r = t.getBoundingClientRect();
					e.left = Math.floor(r.left) + Math.max(o.scrollLeft, n.scrollLeft), e.top = Math.floor(r.top) + Math.max(o.scrollTop, n.scrollTop), e.left -= o.clientLeft, e.top -= o.clientTop;
					var s = this.getStyle(n, "borderLeftWidth"),
						a = this.getStyle(n, "borderTopWidth"),
						l = parseInt(s, 10),
						d = parseInt(a, 10);
					e.left -= isNaN(l) ? 2 : l, e.top -= isNaN(d) ? 2 : d
				}
				return e
			},
			getStyle: function(t, e) {
				if (!t) return "";
				var i = "";
				i = e.indexOf("-") > -1 ? e.replace(/[-][^-]{1}/g, function(t) {
					return t.charAt(1).toUpperCase()
				}) : e.replace(/[A-Z]{1}/g, function(t) {
					return "-" + t.charAt(0).toLowerCase()
				});
				var n, o = this.dom.getWindow(t);
				if (o && o.getComputedStyle) {
					if (n = o.getComputedStyle(t, null)) return n.getPropertyValue(e) || n.getPropertyValue(i)
				} else if (t.currentStyle) return n = t.currentStyle, n[e] || n[i];
				return ""
			},
			getPosition: function(t) {
				if (t) {
					var e = this.dom.g(t);
					if (!e) return !1;
					var i = this.getPositionCore(e),
						n = this.dom.getWindow(e);
					if (!n) return i;
					for (var o = 0, r = 10; n !== n.parent && o++ < r && !this.dom.isInCrossDomainIframe(n) && n.frameElement;) {
						var s = this.getPositionCore(n.frameElement);
						i.left += s.left, i.top += s.top, n = n.parent
					}
					return i
				}
			},
			getOpacityInWin: function(t) {
				for (var e = t, i = this.dom.getWindow(e), n = 100; e && e.tagName;) {
					var o = 100;
					if (this.browser.ie) {
						if (this.browser.ie > 5) try {
							o = parseInt(this.lang.getAttribute(e, "filters.alpha.opacity"), 10) || 100
						} catch (r) {}
						n = n > o ? o : n
					} else {
						try {
							o = 100 * (i.getComputedStyle(e, null).opacity || 1)
						} catch (r) {}
						n *= o / 100
					}
					e = e.parentNode
				}
				return 0 === n ? 0 : n || 100
			},
			getOpacity: function(t) {
				for (var e = this.dom.g(t), i = this.dom.getWindow(e), n = this.getOpacityInWin(e), o = 0, r = 10; o++ < r && this.dom.isInIframe(i) && !this.dom.isInCrossDomainIframe(i);) {
					var s = i.frameElement ? this.getOpacityInWin(i.frameElement) : 100;
					n *= s / 100, i = i.parent
				}
				return n
			},
			getScrollWidth: function(t) {
				t = t || window;
				try {
					var e = this.dom.getTopElement(t).scrollWidth;
					if (e || 0 === e) return e
				} catch (i) {}
				return -1
			},
			getScrollHeight: function(t) {
				t = t || window;
				try {
					var e = this.dom.getTopElement(t).scrollHeight;
					if (e || 0 === e) return e
				} catch (i) {}
				return -1
			},
			getScrollTop: function(t) {
				t = t || window;
				var e = t.document;
				return t.pageYOffset || e.documentElement.scrollTop || e.body.scrollTop
			},
			getScrollLeft: function(t) {
				var e = t || window,
					i = this.dom.getTopElement(e);
				return e.pageXOffset || i.scrollLeft
			},
			getOuterWidth: function(t, e) {
				var i = this.dom.g(t),
					n = i.offsetWidth;
				return e && (n += this.getMargin(i, "Left") + this.getMargin(i, "Right")), n
			},
			getMargin: function(t, e) {
				var i = this.getStyle(t, "margin" + e).toString().toLowerCase().replace("px", "").replace("auto", "0");
				return parseInt(i, 10) || 0
			},
			getOuterHeight: function(t, e) {
				var i = this.dom.g(t),
					n = i.offsetHeight;
				return e && (n += this.getMargin(i, "Top") + this.getMargin(i, "Bottom")), n
			},
			canFixed: function() {
				var t = !0;
				return this.browser.ie && (this.browser.ie < 7 || "BackCompat" === document.compatMode) && (t = !1), t
			},
			setStyle: function(t, e, i) {
				var n = this.dom.g(t);
				n.style[e] = i
			},
			setStyles: function(t, e) {
				for (var i in e) e.hasOwnProperty(i) && this.setStyle(t, i, e[i]);
				return t
			},
			getDefaultStyle: function(t, e) {
				return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, !1)[e]
			},
			isVisible: function(t) {
				return "none" === this.getDefaultStyle(t, "display") || "hidden" === this.getDefaultStyle(t, "visibility") || "100" != this.getOpacity(t) ? !1 : !0
			}
		}), t.define({
			name: "url",
			namespace: "dup.common.utility",
			deps: {
				dom: "dup.common.utility.dom"
			},
			getQueryValue: function(t, e, i) {
				var n = new RegExp("(\\?|&|#)" + e + "=([^&#]*)(&|#)?"),
					o = t.match(n),
					r = "";
				return o && (r = o[2]), i && (r = decodeURIComponent(r)), r
			},
			getTopWindowUrl: function(t) {
				var e = this.dom.getNotCrossDomainTopWindow(t),
					i = "";
				return this.dom.isInIframe(e) && (i = e.document.referrer), i = i || e.location.href
			},
			getMainDomain: function(t) {
				t = t || document.domain, 0 === t.indexOf("www.") && (t = t.substr(4)), "." === t.charAt(t.length - 1) && (t = t.substring(0, t.length - 1));
				var e = ["com", "cn", "net", "org", "gov", "info", "la", "cc", "co", "jp", "us", "hk", "tv", "me", "biz", "in", "be", "io", "tk", "cm", "li", "ru", "ws", "hn", "fm", "tw", "ma", "in", "vn", "name", "mx", "gd", "im"],
					i = new RegExp("([a-z0-9][a-z0-9\\-]*?\\.(?:" + e.join("|") + ")(?:\\.(?:cn|jp|tw|ru|th))?)$", "i"),
					n = t.match(i);
				return n ? n[0] : t
			},
			queryToJson: function(t) {
				for (var e, i, n, o, r = t.substr(t.indexOf("?") + 1), s = r.split("&"), a = s.length, l = {}, d = 0; a > d; d++) o = s[d].split("="), e = o[0], i = o[1], n = l[e], "undefined" == typeof n ? l[e] = i : "[object Array]" == Object.prototype.toString.call(n) ? n.push(i) : l[e] = [n, i];
				return l
			}
		}), t.define({
			name: "data",
			namespace: "dup.common.utility",
			deps: {
				lang: "dup.common.utility.lang",
				dom: "dup.common.utility.dom"
			},
			$data: function() {
				this.pageInfo = {}
			},
			data: function() {
				this.topWin = this.dom.getNotCrossDomainTopWindow(), this.globalInfo = this.topWin.BAIDU_SSP__info || (this.topWin.BAIDU_SSP__info = {})
			},
			forEach: function(t, e) {
				var i, n, o, r = t.length;
				if ("function" == typeof e)
					for (o = 0; r > o && (n = t[o], i = e.call(t, n, o), i !== !1); o++);
				return t
			},
			putInfo: function(t, e, i) {
				var n, o = i ? this.globalInfo : this.pageInfo;
				if ("string" === this.lang.getType(t)) {
					for (var r = t.split("."), s = o; r.length;) {
						var a = r.shift();
						s[a] = r.length ? void 0 !== s[a] ? s[a] : {} : e, s = s[a]
					}
					n = e
				}
				return n
			},
			removeInfo: function(t, e) {
				var i = e ? this.globalInfo : this.pageInfo;
				switch (this.lang.getType(t)) {
					default: return !1;
					case "string":
							for (var n = t.split("."); n.length;) {
							var o = n.shift();
							if (!n.length || void 0 === i[o]) return delete i[o], !0;
							i = i[o]
						}
				}
				return !1
			},
			getInfo: function(t, e) {
				var i, n = e ? this.globalInfo : this.pageInfo;
				return "string" === this.lang.getType(t) && (i = this.lang.getAttribute(n, t)), i
			},
			getOnce: function(t) {
				var e = window,
					i = e[t];
				return e[t] = void 0, i
			},
			defineOnce: function(t, e) {
				var i = window;
				return i[t] ? i[t] : (i[t] = e, e)
			},
			getConfig: function(t) {
				return t ? (this.pageInfo = this.getInfo("pageConfig") || {}, this.pageInfo[t]) : !1
			},
			putConfig: function(t, e) {
				return t && e ? (this.pageInfo = this.getInfo("pageConfig") || {}, this.pageInfo[t] = e, this.putInfo("pageConfig", this.pageInfo), !0) : !1
			}
		}), t.define({
			name: "origentation",
			namespace: "dup.business",
			deps: {
				lang: "dup.common.utility.lang",
				data: "dup.common.utility.data"
			},
			orientKey: "bizOrientations",
			orientUrgentKey: "bizUrgentOrientations",
			hasOwn: Object.prototype.hasOwnProperty,
			watchingSlotsMap: {},
			slotFinishedCallback: function() {},
			addOrientation: function(t, e) {
				var i = this.beforeSavingOrientation.apply(this, arguments);
				return this.saveOrientation(t, i)
			},
			addOrientationOnce: function(t, e) {
				var i = this.beforeSavingOrientation.apply(this, arguments);
				return this.saveOrientation(t, i, {
					urgent: !0,
					merge: !0
				})
			},
			setOrientationOnce: function(t, e) {
				var i = this.beforeSavingOrientation.apply(this, arguments);
				return this.saveOrientation(t, i, {
					urgent: !0,
					override: !0
				})
			},
			beforeSavingOrientation: function(t, e) {
				var i = /^[0-9a-zA-Z]+$/;
				return t && i.test(t) && e ? e = "array" === this.lang.getType(e) ? e : Array.prototype.slice.call(arguments, 1) : []
			},
			saveOrientation: function(t, e, i) {
				if (!e || !e.length) return !1;
				i = i || {
					urgent: !1,
					merge: !1,
					override: !1
				};
				var n = i.merge ? this.data.getInfo(this.orientKey) : {},
					o = i.urgent ? this.orientUrgentKey : this.orientKey,
					r = i.override ? {} : this.data.getInfo(o) || n,
					s = {};
				for (var a in r) this.hasOwn.call(r, a) && (s[a] = "array" === this.lang.getType(r[a]) ? r[a].slice() : r[a]);
				for (var l = s[t] || [], d = e.length, c = 0; d > c; c++) {
					var h = e[c];
					"string" == typeof h && (h = encodeURIComponent(h), h.length <= 100 && (l[l.length] = h))
				}
				return l.length ? (s[t] = this.lang.unique(l), this.data.putInfo(o, s), !0) : !1
			},
			getOrientationQuery: function(t) {
				t = t || 500, t = Math.max(0, Math.min(t, 500));
				var e, i = [],
					n = this.data.getInfo(this.orientUrgentKey) || this.data.getInfo(this.orientKey) || {};
				if ("object" === this.lang.getType(n))
					for (var o in n) this.lang.hasOwn.call(n, o) && (e = o + "=" + n[o].join(","), i[i.length] = e);
				this.data.putInfo(this.orientUrgentKey, void 0), i.sort(function(t, e) {
					return t.length - e.length
				});
				for (var r = "", s = i.length, a = 0; s > a && !(r.length + i[a].length >= t); a++) r += (a ? "&" : "") + i[a];
				return r
			},
			addSlotStatusCallback: function(t, e) {
				this.setSlotFinishCallback(t), this.addWatchSlotId(e)
			},
			setSlotFinishCallback: function(t) {
				this.slotFinishedCallback = t
			},
			addWatchSlotId: function(t) {
				this.watchingSlotsMap[t] = !0
			}
		}), t.define({
			name: "browserParam",
			namespace: "dup.business.parameter",
			deps: {
				config: "dup.common.config",
				browser: "dup.common.utility.browser",
				dom: "dup.common.utility.dom",
				style: "dup.common.utility.style",
				url: "dup.common.utility.url",
				cookie: "dup.common.utility.cookie"
			},
			$browserParam: function() {
				this.win = window, this.doc = this.win.document, this.nav = this.win.navigator
			},
			getTopWin: function() {
				return this.topWindow || (this.topWindow = this.dom.getNotCrossDomainTopWindow()), this.topWindow
			},
			paramsList: [{
				key: "dbv",
				value: function() {
					return this.browser.qihoo ? "1" : this.browser.chrome ? "2" : "0"
				}
			}, {
				key: "drs",
				value: function() {
					var t = {
						uninitialized: 0,
						loading: 1,
						loaded: 2,
						interactive: 3,
						complete: 4
					};
					try {
						return t[this.doc.readyState]
					} catch (e) {
						return -1
					}
				}
			}, {
				key: "pcs",
				value: function() {
					var t = [this.style.getClientWidth(this.getTopWin()), this.style.getClientHeight(this.getTopWin())];
					return t.join("x")
				}
			}, {
				key: "pss",
				value: function() {
					var t = [this.style.getScrollWidth(this.getTopWin()), this.style.getScrollHeight(this.getTopWin())];
					return t.join("x")
				}
			}, {
				key: "cfv",
				value: function() {
					return this.browser.getFlashPlayerVersion()
				}
			}, {
				key: "cpl",
				value: function() {
					return this.nav.plugins.length || 0
				}
			}, {
				key: "chi",
				value: function() {
					return this.win.history.length || 0
				}
			}, {
				key: "cce",
				value: function() {
					return this.nav.cookieEnabled || 0
				}
			}, {
				key: "cec",
				value: function() {
					return (this.doc.characterSet ? this.doc.characterSet : this.doc.charset) || ""
				}
			}, {
				key: "tlm",
				value: function() {
					return Date.parse(this.doc.lastModified) / 1e3
				}
			}, {
				key: "ltu",
				encode: !0,
				value: function() {
					var e = t.proxy(this, function(t) {
							var e = 200,
								i = 60,
								n = this.style.getClientWidth(t),
								o = this.style.getClientHeight(t);
							return e > 0 && i > 0 && n > 2 * e && o > 2 * i ? !0 : !1
						}),
						i = this.url.getTopWindowUrl(e);
					return i.indexOf("cpro_prev") > 0 && (i = i.slice(0, i.indexOf("?"))), i
				}
			}, {
				key: "liu",
				encode: !0,
				value: function() {
					return this.dom.isInIframe(this.win) ? this.doc.URL : ""
				}
			}, {
				key: "ltr",
				encode: !0,
				value: function() {
					var t = this.getTopWin(),
						e = "";
					try {
						e = t.opener ? t.opener.document.location.href : ""
					} catch (i) {}
					return e || t.document.referrer
				}
			}, {
				key: "lcr",
				encode: !0,
				value: function() {
					if ("union" === this.slotInfo.productLine) return "";
					var t = this.doc.referrer,
						e = t.replace(/^https?:\/\//, "");
					e = e.split("/")[0], e = e.split(":")[0], e = this.url.getMainDomain(e);
					var i = this.url.getMainDomain(),
						n = this.cookie.get(this.config.LCR_COOKIE_NAME);
					return n && i === e ? n : i !== e ? (this.cookie.set(this.config.LCR_COOKIE_NAME, t, {
						domain: i
					}), t) : ""
				}
			}, {
				key: "ecd",
				encode: !0,
				value: function() {
					return this.browser.ie && this.browser.ie < 8 ? 0 : 1
				}
			}],
			setSlotInfo: function(t) {
				this.slotInfo = t
			}
		}), t.define({
			name: "systemParam",
			namespace: "dup.business.parameter",
			deps: {
				dom: "dup.common.utility.dom",
				style: "dup.common.utility.style"
			},
			$systemParam: function() {
				this.win = window, this.doc = this.win.document, this.screen = this.win.screen, this.nav = this.win.navigator
			},
			paramsList: [{
				key: "psr",
				value: function() {
					var t = [this.screen.width, this.screen.height];
					return t.join("x")
				}
			}, {
				key: "par",
				value: function() {
					var t = [this.screen.availWidth, this.screen.availHeight];
					return t.join("x")
				}
			}, {
				key: "pis",
				value: function() {
					var t = this.dom.isInIframe(this.win) ? [this.style.getClientWidth(), this.style.getClientHeight()] : [-1, -1];
					return t.join("x")
				}
			}, {
				key: "ccd",
				value: function() {
					return this.screen.colorDepth || 0
				}
			}, {
				key: "cja",
				value: function() {
					return this.nav.javaEnabled().toString()
				}
			}, {
				key: "cmi",
				value: function() {
					return this.nav.mimeTypes.length || 0
				}
			}, {
				key: "col",
				value: function() {
					return (this.nav.language || this.nav.browserLanguage || this.nav.systemLanguage || "").replace(/[^a-zA-Z0-9\-]/g, "")
				}
			}, {
				key: "cdo",
				value: function() {
					var t = this.win.orientation;
					return void 0 === t && (t = -1), t
				}
			}, {
				key: "tcn",
				value: function() {
					var t = +new Date;
					return Math.round(t / 1e3)
				}
			}]
		}), t.define({
			name: "event",
			namespace: "dup.common.utility",
			deps: {
				dom: "dup.common.utility.dom"
			},
			bind: function(t, e, i) {
				var n = this.dom.isWindow(t) ? t : this.dom.g(t);
				if (n)
					if (n.addEventListener) n.addEventListener(e, i, !1);
					else if (n.attachEvent) n.attachEvent("on" + e, i);
				else {
					var o = n["on" + e];
					n["on" + e] = function() {
						o && o.apply(this, arguments), i.apply(this, arguments)
					}
				}
				return n
			},
			off: function(t, e, i) {
				var n, o, r = t._listeners_;
				if (!r) return t;
				if ("undefined" == typeof e) {
					for (n in r) delete r[n];
					return t
				}
				if (e.indexOf("on") && (e = "on" + e), "undefined" == typeof i) delete r[e];
				else if (o = r[e])
					for (n = o.length - 1; n >= 0; n--) o[n].handler === i && o.splice(n, 1);
				return t
			},
			unBind: function(t, e, i) {
				return "string" == typeof t && (t = this.dom.g(t)), t = this.off(t, e.replace(/^\s*on/, ""), i)
			},
			app: function(t, e) {
				return t.bind.apply(t, Array.prototype.slice.call(arguments, 1))
			}
		}), t.define({
			name: "fingerPrint",
			namespace: "dup.business",
			deps: {
				browser: "dup.common.utility.browser",
				event: "dup.common.utility.event",
				dom: "dup.common.utility.dom"
			},
			start: function() {
				this.idPrefix = "BAIDU_DUP_fp_", this.fpElId = this.idPrefix + "wrapper", this.dom.g(this.fpElId) || this.event.bind(window, "load", t.proxy(this, this.createFPIframe))
			},
			createFPIframe: function() {
				if (!this.dom.g(this.fpElId)) {
					var t = window,
						e = t.document,
						i = e.body,
						n = "http://pos.baidu.com/wh/o.htm?ltr=",
						o = e.createElement("div");
					o.id = this.fpElId, o.style.position = "absolute", o.style.left = "-1px", o.style.bottom = "-1px", o.style.zIndex = 0, o.style.width = 0, o.style.height = 0, o.style.overflow = "hidden", o.style.visibility = "hidden", o.style.display = "none";
					var r = e.createElement("iframe");
					r.id = this.idPrefix + "iframe", r.src = n, r.style.width = 0, r.style.height = 0, r.style.visibility = "hidden", r.style.display = "none";
					try {
						o.insertBefore(r, o.firstChild), i && i.insertBefore(o, i.firstChild)
					} catch (s) {}
				}
			}
		}), t.define({
			name: "asserter",
			namespace: "dup.ui.assertion",
			deps: {
				mobile: "dup.ui.assertion.mobile.float",
				dynamicFloat: "dup.ui.assertion.dynamicFloat"
			},
			assert: function(t) {
				for (var e = t.response.placement.userdefine || "", i = e.split("|"), n = {}, o = 0, r = i.length; r > o; o++) {
					var s = i[o],
						a = s.split("="),
						l = a[0];
					l && (n[l] = a[1])
				}
				if (n.hasOwnProperty("painter")) return n.painter;
				var d = t.styleOpenApi.tn || "",
					c = parseInt(t.styleOpenApi.xuanting || 0, 10);
				return d.indexOf("mobile") >= 0 ? c > 0 || this.mobile.assert(t.response) ? "mobile.float" : "mobile.inlayFix" : "template_float_searchBar" === d ? "searchBar" : "template_float_bottom_lu" === d ? "slide" : d.indexOf("_xuanfu") >= 0 || d.indexOf("float") >= 0 ? "float" : c > 0 || this.dynamicFloat.assert(t.response) ? "dynamicFloat" : d && d.length > 0 ? "inlayFix" : ""
			}
		}), t.define({
			name: "creativePreview",
			namespace: "dup.business",
			deps: {
				url: "dup.common.utility.url",
				dom: "dup.common.utility.dom",
				cookie: "dup.common.utility.cookie",
				lang: "dup.common.utility.lang"
			},
			PREV_TEMP_URL: "http://cpro.baidu.com/cpro/ui/preview/templates/",
			validate: function(t, e, i, n, o) {
				var r = !1,
					s = this.getPrevValue(i, o);
				if (!s) return r;
				for (var a = this.parsePreviewData(s), l = 1 === parseInt(a.type, 10), d = n.length > 0 ? !1 : !0, c = n.length > 0 ? !1 : !0, h = 0, u = n.length; u > h; h++) {
					var p = n[h];
					0 === p ? c = !0 : 4 === p || 50 === p ? (c = !0, d = !0) : (1 === p || 2 === p) && (d = !0)
				}
				return !l && d ? r = parseInt(a.imgWidth, 10) === parseInt(t, 10) && parseInt(a.imgHeight, 10) === parseInt(e, 10) : l && c && this.isAvalibleTextSize(t, e) && (r = !0), r
			},
			isAvalibleTextSize: function(t, e) {
				for (var i = ["1024_60", "120_240", "120_600", "125_125", "160_600", "180_150", "200_200", "234_60", "250_250", "300_120", "300_250", "300_280", "336_280", "360_150", "360_300", "460_60", "468_60", "480_160", "500_200", "580_90", "640_60", "728_90", "760_60", "760_75", "760_90", "960_60", "960_75", "960_90"], n = 0, o = i.length; o > n; n++)
					if (t + "_" + e === i[n]) return !0;
				return !1
			},
			getPreviewUrl: function(t, e, i, n) {
				var o = window.location.href;
				if (!this.validate(t, e, n, i, o)) return "";
				var r = n.indexOf("inlay") >= 0 ? "bd_cpro_prev" : "bd_cpro_fprev",
					s = this.getPrevValue(n, o),
					a = this.parsePreviewData(s),
					l = "";
				return n.indexOf("inlay") >= 0 ? l = this.getInlayUrl(parseInt(a.type, 10), r, s, "text_default_" + t + "_" + e) : n.indexOf("float") >= 0 && (l = this.getFloatUrl(parseInt(a.type, 10), r, s)), l
			},
			getPrevValue: function(t, e) {
				var i;
				i = e ? e.substring(e.indexOf("?")) : this.dom.isInCrossDomainIframe(window) ? window.location.search.slice(1) : window.top.location.search.slice(1);
				var n, o = document.referrer,
					r = t.indexOf("inlay") >= 0 || "ui" === t ? "bd_cpro_prev" : "bd_cpro_fprev",
					s = "";
				try {
					n = document.cookie
				} catch (a) {}
				return i.indexOf(r) > -1 && (s = this.url.getQueryValue(i, r)), !s && n && -1 !== n.indexOf(r) && (s = this.cookie.get(r)), s || -1 === o.indexOf(r) || (s = this.url.getQueryValue(o, r)), s
			},
			parsePreviewData: function(t) {
				return t = decodeURIComponent(t).replace(/\\x1e/g, "&").replace(/\\x1d/g, "=").replace(/\\x1c/g, "?").replace(/\\x5c/g, "\\"), this.lang.jsonToObj(t)
			},
			getFloatUrl: function(t, e, i) {
				var n;
				n = 2 === t ? "float_image.html" : 4 === t || 3 === t ? "float_flash.html" : "blank_tips.html";
				var o = this.PREV_TEMP_URL + n + "?",
					r = "tn=template_float_all_normal" + ("&" + e + "=" + i).replace(/\./g, "%252e") + "&ut=" + +new Date;
				return o + r
			},
			getInlayUrl: function(t, e, i, n) {
				var o;
				o = 1 === t ? n + ".html" : 2 === t ? "image.html" : 4 === t || 3 === t ? "flash.html" : "blank_tips.html";
				var r = this.PREV_TEMP_URL + o + "?";
				return r += ("" + e + "=#" + i + "&ut=" + +new Date).replace(/\.(?!swf)/g, "%252e")
			}
		}), t.define({
			name: "deliveryLimit",
			namespace: "dup.business",
			deps: {
				inlayFixAssert: "dup.ui.assertion.inlayFix",
				dynamicFloatAssert: "dup.ui.assertion.dynamicFloat",
				floatAssert: "dup.ui.assertion.float",
				dom: "dup.common.utility.dom"
			},
			MAX_COUNT: {},
			TYPE: {
				INLAY: "inlay",
				COUPLET: "couplet",
				POPUP: "popup",
				LINKUNIT: "linkunit"
			},
			$deliveryLimit: function() {
				this.displayedMap = this.displayedMap || {}, this.MAX_COUNT[this.TYPE.INLAY] = 8, this.MAX_COUNT[this.TYPE.COUPLET] = 2, this.MAX_COUNT[this.TYPE.POPUP] = 1, this.MAX_COUNT[this.TYPE.LINKUNIT] = 25
			},
			validate: function(t) {
				if ("union" !== t.productLine) return !0;
				var e = this.getSlotType(t),
					i = this.getAdCount(e),
					n = this.MAX_COUNT[e];
				return n > i ? !0 : !1
			},
			getAdCount: function(t) {
				var e = this.displayedMap[t] || {},
					i = 0;
				for (var n in e) n && e[n] && e.hasOwnProperty(n) && (this.dom.g(n) ? i++ : e[n] = void 0);
				return i
			},
			setAdsCount: function(t, e) {
				var i = this.displayedMap[t];
				return i || (this.displayedMap[t] = {}, i = this.displayedMap[t]), i[e] = 1, !0
			},
			getSlotType: function(t) {
				var e = this.TYPE.INLAY,
					i = t.response;
				if (!i) return e;
				var n = i.placement;
				if ((this.inlayFixAssert.assert(i) || this.dynamicFloatAssert.assert(i)) && (e = this.TYPE.INLAY), n && n.fillstyle)
					for (var o = i.placement.fillstyle.elements || [], r = 0, s = o.length; s > r; r++)
						if (5 === o[r]) return this.TYPE.LINKUNIT;
				return e
			}
		}), t.define({
			name: "dynamicFloatDecorator",
			namespace: "dup.ui.painter",
			deps: {
				dom: "dup.common.utility.dom",
				style: "dup.common.utility.style"
			},
			decorate: function(t, e, i) {
				this.el = t, this.width = e, this.height = i, this.topSpace = 5, this.resetTargetStyle(), this.initializeEvent(), this.checkStatus()
			},
			initializeEvent: function(e) {
				this.dom.bind(window, "scroll", t.proxy(this, this.onScrollHandler)), this.dom.bind(window, "resize", t.proxy(this, this.onScrollHandler))
			},
			resetTargetStyle: function() {
				this.el.style.width = this.width + "px", this.el.style.height = this.height + "px", this.el.style.display = "inline-block"
			},
			onScrollHandler: function() {
				this.checkStatus()
			},
			checkStatus: function() {
				return this.el && document.getElementById(this.el.getAttribute("id")) ? void(this.style.canFixed() ? this.updateStatusFixedly() : this.updateStatusAbsolutly()) : (this.el = null, !1)
			},
			updateStatusFixedly: function() {
				if (this.isFloating) this.alignTargetLeft(), this.isBackToHolder() && (this.isFloating = !1, this.el.style.cssText = null, this.resetTargetStyle(), this.removePlaceHolder());
				else {
					var t = this.isTouchRoof();
					t && (this.el.style.zIndex = 2147483646, this.el.style.position = "fixed", this.createPlaceHolder(), this.alignTargetLeft(), t ? this.el.style.top = this.topSpace + "px" : this.el.style.bottom = this.topSpace + "px", this.isFloating = !0)
				}
			},
			updateStatusAbsolutly: function() {
				if (this.isFloating) this.updatePosition(), this.isBackToHolder() && (this.isFloating = !1, this.el.style.cssText = null, this.resetTargetStyle(), this.removePlaceHolder());
				else {
					var t = this.isTouchRoof();
					t && (this.el.style.position = "absolute", this.el.style.zIndex = 2147483646, this.el.style.visibility = "visible", this.createPlaceHolder(), this.isFloating = !0, this.updatePosition())
				}
			},
			updatePosition: function() {
				if (this.holderEl) {
					var t = (this.style.getClientWidth(window), this.style.getClientHeight(window)),
						e = this.style.getScrollTop(window),
						i = this.style.getPositionCore(document.body),
						n = i.left,
						o = i.top,
						r = this.getPosition(this.holderEl),
						s = this.getPosition(this.el),
						a = this.style.getStyle(document.body, "position").toString(),
						l = e + this.topSpace;
					r.top > s.top && (l = e + (t - this.topSpace - s.bottom + s.top)), this.el.style.top = "" + l + "px", this.el.style.left = "" + r.leftAbs + "px", "relative" == a && (this.el.style.top = e + this.topSpace - o + "px", this.el.style.left = r.leftAbs - n + "px"), this.el.style.visibility = "visible"
				}
			},
			createPlaceHolder: function() {
				var t = this.el.id + "_placeholder";
				this.holderEl = document.createElement("div"), this.holderEl.id = t, this.holderEl.align && (this.holderEl.align = this.el.getAttribute("align"));
				var e = this.style.getOuterWidth(this.el, !1),
					i = this.style.getOuterHeight(this.el, !1);
				this.holderEl.style.width = "" + parseInt(e, 10) + "px", this.holderEl.style.height = "" + parseInt(i, 10) + "px", this.holderEl.style.margin = "0", this.holderEl.style.padding = "0", this.holderEl.style.background = "none", this.holderEl.style.border = "none", this.holderEl.style.display = "inline-block", this.holderEl.style.left = this.el.getAttribute("left"), this.el.parentNode.insertBefore(this.holderEl, this.el)
			},
			removePlaceHolder: function() {
				return this.holderEl ? (this.holderEl.parentNode.removeChild(this.holderEl), this.holderEl = null, !0) : !1
			},
			isTouchRoof: function() {
				var t = this.getPosition(this.el),
					e = (this.style.getClientHeight(), t.top);
				return e < this.topSpace ? !0 : !1
			},
			isTouchBottom: function() {
				var t = this.getPosition(this.el),
					e = this.style.getClientHeight(),
					i = t.bottom;
				return i > e - this.topSpace ? !0 : !1
			},
			isBackToHolder: function() {
				if (this.el && this.holderEl) {
					var t = (this.style.getClientHeight(), this.getPosition(this.el)),
						e = (t.top, t.bottom, this.getPosition(this.holderEl)),
						i = e.top;
					if (i >= this.topSpace) return !0
				}
				return !1
			},
			alignTargetLeft: function() {
				if (this.el && this.holderEl) {
					var t = this.getPosition(this.holderEl).left;
					this.el.style.left = t + "px"
				}
			},
			getPosition: function(t) {
				var e = this.style.getPositionCore(t),
					i = this.style.getScrollLeft(window),
					n = this.style.getScrollTop(window),
					o = this.style.getOuterWidth(t, !1),
					r = this.style.getOuterHeight(t, !1);
				return {
					top: e.top - n,
					bottom: e.top - n + r,
					left: e.left - i,
					right: e.left - i + o,
					topAbs: e.top,
					bottomAbs: e.top + r,
					leftAbs: e.left,
					rightAbs: e.left + o
				}
			}
		}), t.define({
			name: "landingPage",
			namespace: "dup.ui.painter",
			deps: {
				lang: "dup.common.utility.lang",
				style: "dup.common.utility.style",
				browser: "dup.common.utility.browser",
				dom: "dup.common.utility.dom"
			},
			activate: function(e) {
				return this.validate(e) ? (this.expansionActionName = "BaiduCproExpansion" + e.containerId, this.pageIframeId = e.containerId + "_ExpansionLP", e.paramObj.expToken = this.expansionActionName, this.dom.bind(window, "message", t.proxy(this, this.onPostMessageHandler)), !0) : !1
			},
			validate: function(t) {
				var e = parseInt(t.styleOpenApi.expansion || 0, 10);
				return 1 === e && !this.browser.isIOS && "postMessage" in window
			},
			onPostMessageHandler: function(e) {
				if ("object" == typeof e && e.data) {
					var i = e.data;
					if (!(i.indexOf(this.expansionActionName) < 0)) {
						this.expandContainerEl = document.createElement("div");
						var n = Math.max(this.style.getClientWidth(), this.style.getClientHeight()),
							o = this.expandContainerEl.style;
						o.position = "fixed", o.left = "0", o.top = n + "px", o.zIndex = 2147483647, o.background = "#ffffff", o.width = "100%", o.transition = o.WebkitTransition = o.MozTransition = o.OTransition = "top 1s ease-in-out", i = i.slice(this.expansionActionName.length);
						var r = ['<iframe id="{lpIframeId}" ', 'src="{clickUrl}" width="{iframeWidth}" ', 'height="{iframeHeight}" align="center,center" ', 'marginwidth="0"  marginheight="0" ', 'frameborder="0"></iframe>', '<div id="{lpIframeId}_closeBtn" ', 'style="position:absolute;right:0;top:0;', "width:{closeBtnSize}px;", "height:{closeBtnSize}px;", "overflow:hidden;display:block;", "background:url('http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.0/xuantingClose.png') ", "no-repeat 0 0; ", "_filter:progid:DXImageTransform", ".Microsoft.AlphaImageLoader(", "enabled=true, sizingMethod=none, ", "src='http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.0/xuantingClose.png');", "_background:none;cursor:pointer;", 'background-position:center;background-size:100%,100%;">&nbsp;</div>'].join(""),
							s = Math.min(this.style.getClientWidth(), this.style.getClientHeight()),
							a = {
								lpIframeId: this.pageIframeId,
								clickUrl: i,
								iframeWidth: this.style.getClientWidth(),
								iframeHeight: this.style.getClientHeight(),
								closeBtnSize: 80 * s / 640
							};
						this.expandContainerEl.innerHTML = this.lang.template(r, a), this.expandContainerEl.style.top = "0", document.body.appendChild(this.expandContainerEl), this.dom.bind(window, "resize", t.proxy(this, this.onResizeHandler));
						var l = this.dom.g(this.pageIframeId + "_closeBtn");
						this.dom.bind(l, "click", t.proxy(this, this.onCloseBtnClickHandler))
					}
				}
			},
			onCloseBtnClickHandler: function() {
				this.expandContainerEl.style.top = Math.max(this.style.getClientWidth(), this.style.getClientHeight()) + "px", this.expandContainerEl && this.expandContainerEl.parentNode ? (this.expandContainerEl.parentNode.removeChild(this.expandContainerEl), this.expandContainerEl = null) : this.expandContainerEl.innerHTML = ""
			},
			onResizeHandler: function() {
				var t = this.style.getClientWidth(),
					e = this.style.getClientHeight(),
					i = this.dom.g(this.pageIframeId);
				i.style.width = t + "px", i.style.height = e + "px", i.setAttribute("width", t), i.setAttribute("height", e)
			}
		}), t.define({
			name: "hiddenFloatAd",
			namespace: "dup.ui.painter",
			deps: {
				style: "dup.common.utility.style",
				dom: "dup.common.utility.dom"
			},
			TOP: 2,
			BOTTOM: 3,
			activate: function(e) {
				if (!this.validate(e)) return !1;
				this.alreadyEnableHidden = !0, this.autoCloseTime = parseInt(e.styleOpenApi.cpro_close_time, 10) || 5, this.autoCloseTime = this.autoCloseTime >= 3 ? this.autoCloseTime : 3;
				var i = parseInt(e.styleOpenApi.cpro_show_dist, 10) || 5;
				i = i >= 5 ? i : 5, this.percentage = (1 / i).toFixed(2);
				var n = e.response.placement,
					o = n.container;
				this.dockTo = parseInt(o.location, 10), this.adWrapEl = document.getElementById(e.containerId), this.adWrapEl.style.display = "block", this.adIframe = document.getElementById("cproIframe_" + e.id);
				var r = document.getElementById(e.containerId + "_closebtn"),
					s = parseInt(this.adWrapEl.style.height || e.height, 10),
					a = parseInt(r.style.height, 10);
				this.hiddenHeight = -1 * (s + a), this.haveSetIframeUrl = !0, this.countDownTimerId = !1, this.close4ever = !1, this.shrinkAd(), this.transitionDecorator(this.adWrapEl), this.lastScrollTop = this.style.getScrollTop(), this.dom.bind(r, "click", t.proxy(this, this.closeBtnOnClickHandler)), this.dom.bind(window, "scroll", t.proxy(this, this.onScrollHandler))
			},
			validate: function(t) {
				var e = "true" === t.styleOpenApi.cpro_enable_hidden_float ? !0 : !1;
				return e ? this.alreadyEnableHidden ? !1 : (this.alreadyEnableHidden = !0, !0) : !1
			},
			shrinkAd: function() {
				this.dockTo === this.TOP ? this.adWrapEl.style.top = this.hiddenHeight + "px" : this.dockTo === this.BOTTOM && (this.adWrapEl.style.bottom = this.hiddenHeight + "px")
			},
			expandAd: function() {
				this.dockTo === this.TOP ? this.adWrapEl.style.top = 0 : this.adWrapEl.style.bottom = 0, this.adIframe && !this.haveSetIframeUrl && (this.adIframe.src = this.adIframe.getAttribute("_src"), this.haveSetIframeUrl = !0)
			},
			transitionDecorator: function(t) {
				var e = "-webkit-transition: all .3s linear;-moz-transition: all .3s linear;-ms-transition: all .3s linear;-o-transition: all .3s linear;transition: all .3s linear;";
				t.style.cssText = t.style.cssText + e
			},
			startCountDown: function(t, e) {
				var i = t,
					n = setInterval(function() {
						i--, 0 >= i && (clearInterval(n), e && e())
					}, 1e3);
				this.countDownTimerId = n
			},
			closeBtnOnClickHandler: function() {
				this.shrinkAd(), this.close4ever = !0, this.setCloseCookie(this.slotId)
			},
			onScrollHandler: function() {
				var e = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * this.percentage,
					i = this.style.getScrollTop(),
					n = i > this.lastScrollTop ? "down" : "top";
				this.totalScrollLength += i - this.lastScrollTop, this.lastScrollTop = i, "top" === n && !this.close4ever && Math.abs(this.totalScrollLength) >= e && !this.countDownTimerId ? (this.expandAd(), this.startCountDown(this.autoCloseTime, t.proxy(this, this.onTimeCountDownHandler))) : "down" === n && (this.totalScrollLength = 0)
			},
			onTimeCountDownHandler: function() {
				this.shrinkAd(), this.countDownTimerId = !1, this.totalScrollLength = 0
			}
		}), t.define({
			name: "slotParam",
			namespace: "dup.business.parameter",
			deps: {
				dom: "dup.common.utility.dom",
				style: "dup.common.utility.style"
			},
			$slotParam: function() {
				this.win = window
			},
			paramsList: [{
				key: "di",
				value: function() {
					return this.slotInfo.slotId
				}
			}, {
				key: "dri",
				value: function() {
					return this.slotInfo.index
				}
			}, {
				key: "dis",
				value: function() {
					var t = 0;
					this.dom.isInIframe(this.win) && (t += 1), this.dom.isInCrossDomainIframe(this.win, this.win.top) && (t += 2);
					var e = this.style.getClientWidth(),
						i = this.style.getClientHeight();
					return (40 > e || 10 > i) && (t += 4), t
				}
			}, {
				key: "dai",
				value: function() {
					return this.slotInfo.count
				}
			}, {
				key: "ps",
				value: function() {
					var t = this.dom.g(this.slotInfo.containerId),
						e = this.style.getPosition(t);
					return e.top + "x" + e.left
				}
			}, {
				key: "coa",
				encode: !0,
				value: function() {
					var t = [],
						e = this.slotInfo.styleOpenApi;
					for (var i in e)
						if (i && "undefined" != typeof e[i] && e.hasOwnProperty(i)) {
							var n = i;
							"cpro_w" === i && (n = "rsi0"), "cpro_h" === i && (n = "rsi1"), t.push(n + "=" + encodeURIComponent(e[i]))
						}
					return t.join("&")
				}
			}],
			setSlotInfo: function(t) {
				this.slotInfo = t
			}
		}), t.define({
			name: "preview",
			namespace: "dup.business",
			deps: {
				url: "dup.common.utility.url",
				data: "dup.common.utility.data"
			},
			CLB_PREFIX: "baidu_clb_preview_",
			DUP_PREFIX: "baidu_dup_preview_",
			getValue: function(t) {
				var e, i = this.url.getTopWindowUrl();
				return e = this.url.getQueryValue(i, this.CLB_PREFIX + t), e || (e = this.url.getQueryValue(i, this.DUP_PREFIX + t)), e
			},
			getInfo: function() {
				var t, e = this.getValue("sid"),
					i = this.getValue("mid"),
					n = this.getValue("vc"),
					o = +this.getValue("ts"),
					r = +new Date;
				return 3e4 >= r - o && (t = {
					sid: e,
					mid: i,
					vc: n
				}), this.getInfo = function() {
					return t
				}, t
			},
			isUnionPreview: function(t) {
				var e = !1;
				return t ? /cpro_template=/gi.test(t) && (this.data.putInfo("#unionPreviewSwitch", !0), e = !0) : e = !!this.data.getInfo("#unionPreviewSwitch"), e
			},
			setUnionPreviewData: function(t) {
				this.data.putInfo("#unionPreviewData", t)
			},
			getUnionPreviewData: function() {
				var t = this.data.getInfo("#unionPreviewData");
				return t ? "prev=" + encodeURIComponent(t) + "&pt=union" : ""
			},
			clearUnionPreviewData: function() {
				this.data.removeInfo("#unionPreviewSwitch"), this.data.removeInfo("#unionPreviewData")
			},
			getSearchParams: function(t) {
				var e = {},
					i = this.getInfo();
				return i && t == i.sid && (e.mid = i.mid, e.sid = i.vc), e
			}
		}), t.define({
			name: "log",
			namespace: "dup.common.utility",
			deps: {
				config: "dup.common.config",
				lang: "dup.common.utility.lang",
				event: "dup.common.utility.event",
				storage: "dup.common.utility.storage"
			},
			storageKey: "BAIDU_DUP_log_storage",
			loadImage: function(t, e) {
				var i = new Image,
					n = "BAIDU_DUP_log_" + Math.floor(2147483648 * Math.random()).toString(36);
				window[n] = i, i.onload = i.onerror = i.onabort = function() {
					i.onload = i.onerror = i.onabort = null, window[n] = null, i = null, e && e(this.storageKey, t, !0)
				}, i.src = t
			},
			resendLog: function() {
				var t = this.storage.getItem(this.storageKey);
				if (t) {
					t = t.split("|");
					for (var e = 0, i = t.length; i > e; e++) this.loadImage(decodeURIComponent(t[e]), this.storage.spliceItem)
				}
			},
			monitorLog: function(t) {
				var e, i = t.id ? t.id : "-1",
					n = t.async ? t.async : "-1";
				e = "http://cbjslog.baidu.com/log?" + ["type=ssplog", "id=" + i, "error=" + t.error, "status=" + t.status, "async=" + n, "from=ssp", "tm=" + +new Date].join("&"), this.sendLogRequest(e)
			},
			sendLogRequest: function(t) {
				var e = new Image,
					i = +new Date,
					n = "baidu_dan_log_" + i;
				window[n] = e, e.onload = e.onerror = e.onabort = function() {
					try {
						delete window[n]
					} catch (t) {
						window[n] = void 0
					}
					e = null
				}, t += t.indexOf("?") > -1 ? "&" : "?", t += ".stamp=" + Math.random(), e.src = t
			},
			sendLog: function(t) {
				t = "object" === this.lang.getType(t) ? t : {};
				var e = t.url || this.config.LOG_URL,
					i = t.data || {},
					n = t.option || "now",
					o = this.lang.serialize(i);
				switch (e += (e.indexOf("?") >= 0 ? "&" : "?") + o + (o ? "&" : "") + "rdm=" + +new Date, n) {
					case "now":
						this.loadImage(e);
						break;
					case "block":
						break;
					case "unload":
					default:
						this.storage.addItem(this.storageKey, e, !0), this.event.bind(window, "unload", function() {
							this.loadImage(e, this.storage.spliceItem)
						})
				}
			}
		}), t.define({
			name: "painterSelector",
			namespace: "dup.business",
			deps: {
				asserter: "dup.ui.assertion.asserter"
			},
			getPainter: function(e) {
				var i = this.asserter.assert(e);
				if (i) return "dup.ui.painter." + i;
				for (var n = e.response, o = ["dan.static", "dan.couplet", "dan.expand", "dan.barrier", "dan.video", "topSearchBar", "bottomSearchBar", "slide", "inlayFix", "baiduRec", "dynamicFloat", "float", "insideText", "mobile.inlayFix", "mobile.float"], r = 0, s = o.length; s > r; r++) {
					var a = t.using("dup.ui.assertion." + o[r]);
					if (a && a.assert(n)) return "dup.ui.painter." + o[r]
				}
				return i || (e.errors = e.errors || [], e.errors.push("painterName is empty")), "dup.ui.painter.inlayFix"
			}
		}), t.define({
			name: "businessParam",
			namespace: "dup.business.parameter",
			deps: {
				config: "dup.common.config",
				preview: "dup.business.preview",
				dom: "dup.common.utility.dom",
				origentation: "dup.business.origentation"
			},
			paramsList: [{
				key: "dcb",
				value: function() {
					return this.config.LOADER_DEFINE_NAME
				}
			}, {
				key: "dtm",
				value: function() {
					return this.config.DUP_TM
				}
			}, {
				key: "dvi",
				value: function() {
					return "0.0"
				}
			}, {
				key: "dci",
				value: function() {
					return "-1"
				}
			}, {
				key: "dds",
				value: function() {
					return ""
				}
			}, {
				key: "dpt",
				value: function() {
					var t = "none";
					return this.preview.isUnionPreview() && (t = "union"), t
				}
			}, {
				key: "tsr",
				value: function() {
					var t = 0,
						e = +new Date;
					return this.config.startTime && (t = e - this.config.startTime), t
				}
			}, {
				key: "tpr",
				value: function() {
					function t(t) {
						try {
							return !!t.top.location.toString()
						} catch (e) {
							return !1
						}
					}
					var e, i, n = 24e4,
						o = (new Date).getTime();
					return i = t(window) ? window.top : window, e = i.BAIDU_DUP2_pageFirstRequestTime, e ? o - e >= n && (e = i.BAIDU_DUP2_pageFirstRequestTime = o) : e = i.BAIDU_DUP2_pageFirstRequestTime = o, e || ""
				}
			}, {
				key: "cop",
				encode: !0,
				value: function() {
					return this.origentation.getOrientationQuery()
				}
			}, {
				key: "ti",
				encode: !0,
				value: function() {
					return this.dom.getDocumentTitle()
				}
			}, {
				key: "ari",
				value: function() {
					return 1
				}
			}]
		}), t.define({
			name: "param",
			namespace: "dup.business",
			deps: {
				config: "dup.common.config",
				slotParams: "dup.business.parameter.slotParam",
				businessParams: "dup.business.parameter.businessParam",
				browserParams: "dup.business.parameter.browserParam",
				systemParams: "dup.business.parameter.systemParam",
				additionalParam: "dup.business.parameter.additionalParam",
				style: "dup.common.utility.style",
				dom: "dup.common.utility.dom",
				md5: "dup.common.utility.md5",
				preview: "dup.business.preview",
				requestCache: "dup.business.requestCache"
			},
			snap: function(t) {
				for (var e = [], i = t.paramsList, n = 0, o = i.length; o > n; n++) {
					var r = i[n],
						s = r.key,
						a = r.encode,
						l = r.value;
					try {
						l = "function" == typeof l ? l.apply(t) : l, l = a ? encodeURIComponent(l) : l, e.push({
							key: s,
							value: l
						})
					} catch (d) {
						var c = "http://cbjslog.baidu.com/log?";
						c += "type=adcodex_error", c += "&info=" + encodeURIComponent(d.message), c += "&stack=" + encodeURIComponent(d.stack || ""), c += "&key=" + encodeURIComponent(s), c += "&t=" + +new Date, (new Image).src = c
					}
				}
				return e
			},
			processExtendsParam: function(t) {
				var e = t.response,
					i = e.placement.container,
					n = e.pdb_deliv,
					o = e.rtb_deliv,
					r = e.order_deliv;
				0 === parseInt(n.deliv_id, 10) && (n.deliv_id = 0), 0 === parseInt(n.demand_id, 10) && (n.demand_id = 0), 0 === parseInt(o.deliv_id, 10) && (o.deliv_id = 0), 0 === parseInt(o.demand_id, 10) && (o.demand_id = 0), 0 === parseInt(r.deliv_id, 10) && (r.deliv_id = 0), 0 === parseInt(r.demand_id, 10) && (r.demand_id = 0);
				var s, a = e["extends"];
				if (a) {
					s = {};
					for (var l = a.split("&"), d = 0, c = l.length; c > d; d++) {
						var h = l[d].split("=");
						s[h[0]] = h[1]
					}
				}
				if (s && s.hasOwnProperty("cbcw") && s.hasOwnProperty("cbch")) {
					var u = parseInt(s.cbcw || 0, 10),
						p = parseInt(s.cbch || 0, 10),
						m = parseInt(s.cbsz || 0, 10);
					if (u && p && (i.width = u, i.height = p), m > 0 && (i.sizeType = m), 1 === m) t.width = u, t.height = p;
					else if (2 === m) {
						var f = this.translateScaleToPixelSize(u, p);
						t.width = f.width, t.height = f.height
					}
				}
				var g = t.width || i.width,
					y = t.height || i.height,
					v = e.placement.complement_type;
				if (0 === v) {
					var w = this.dom.g(t.containerId);
					w.style.width = g + "px", w.style.height = y + "px", w.style.display = "inline-block"
				}
			},
			translateScaleToPixelSize: function(t, e, i) {
				i || (i = Math.max(320, Math.min(window.innerWidth, window.innerHeight)), isNaN(i) && (i = Math.min(this.style.getClientWidth(), this.style.getClientHeight())));
				var n = Math.ceil(i / t * e);
				return {
					width: i,
					height: n
				}
			},
			getParamObj: function(t) {
				var e = [];
				this.slotParams.setSlotInfo(t), this.browserParams.setSlotInfo(t), e = e.concat(this.snap(this.slotParams)), e = e.concat(this.snap(this.businessParams)), e = e.concat(this.snap(this.browserParams)), e = e.concat(this.snap(this.systemParams)), e = e.concat(this.snap(this.additionalParam));
				for (var i = {}, n = 0, o = e.length; o > n; n++) {
					var r = e[n];
					i[r.key] = r.value
				}
				t.width > 0 && t.height > 0 && (i.sz = t.width + "x" + t.height);
				var s = this.preview.getSearchParams(t.slotId);
				return i.mid = s.mid, i.sid = s.sid, i
			},
			getParamString: function(t) {
				var e = [];
				for (var i in t)
					if (i && (t[i] || 0 === t[i]) && t.hasOwnProperty(i)) {
						var n = t[i];
						e.push(i + "=" + n)
					}
				return e = e.join("&"), e.slice(0, 2048)
			},
			getPmpRequestUrl: function(t) {
				var e = {},
					i = [],
					n = t.paramObj;
				for (var o in n) o && n.hasOwnProperty(o) && (e[o] = n[o]);
				var r = t.timestampWatcher,
					s = r.t1,
					a = r.t2,
					l = r.t3,
					d = t.response;
				if (d) {
					d.basic;
					e.qn = d.queryid, t.paramObj.qn = d.queryid;
					var c = t.width,
						h = t.height;
					c > 0 && h > 0 && (e.sz && (e.sz = ""), i.push("sz=" + c + "x" + h));
					var u = d.pdb_deliv;
					u.deliv_id && i.push("pdbid=" + u.deliv_id);
					var p = d.order_deliv;
					p.deliv_id && i.push("orderid=" + p.deliv_id), p.demand_id && i.push("odid=" + p.demand_id);
					var m = d.rtb_deliv;
					m.deliv_id && i.push("rtbid=" + m.deliv_id), m.demand_id && i.push("rdid=" + m.demand_id);
					var f = d.placement.complement_type;
					if (t.isNeedCacheRequest || 4 === f || 7 === f) {
						var g = window.document,
							y = +new Date + "" + 1e6 * Math.random() + 1e6 * Math.random() + g.location.href + t.tuid + g.cookie,
							v = this.md5.md5(y);
						e.dpv = v, t.paramObj.dpv = v, this.requestCache.add(v, t)
					}
					i.push("dc=2"), r && s > 0 && (e.tt = s + "." + (a - s) + "." + (l - s) + "." + (+new Date - s)), e.exps && (i.push("exps=" + e.exps), e.exps = "")
				} else e.dcf = 1, r && s > 0 && (e.tt = s + ".0.0." + (+new Date - s), e.feid = "7401");
				var w = i.join("&");
				return this.config.POS_URL + w + "&" + this.getParamString(e)
			}
		}), t.define({
			name: "slot",
			namespace: "dup.business",
			deps: {
				config: "dup.common.config",
				param: "dup.business.param",
				dom: "dup.common.utility.dom",
				log: "dup.common.utility.log",
				lang: "dup.common.utility.lang",
				storage: "dup.common.utility.storage",
				origentation: "dup.business.origentation"
			},
			slotIdCountMap: {},
			slotCount: 0,
			$slot: function() {
				this.slotsMap = this.slotsMap || {}
			},
			getSlotInfo: function(t) {
				return this.slotsMap[t]
			},
			getSlotInfoByRawId: function(t) {
				for (var e in this.slotsMap)
					if (this.slotsMap.hasOwnProperty(e) && e.indexOf(t) > -1) return this.slotsMap[e];
				return {}
			},
			createSlot: function(t) {
				var i = "" + t.slotId;
				this.slotIdCountMap[i] = this.slotIdCountMap[i] || 0;
				var n = {};
				return n.index = this.slotIdCountMap[i]++, n.count = ++this.slotCount, n.id = i + "_" + n.index, n.containerId = this.config.DUP_PREFIX + "_wrapper_" + i + "_" + n.index, n.slotId = t.slotId, n.productLine = t.productLine, n.errors = [], n.isAsync = t.isAsync, this.setStatus(n.id, this.config.STATUS_CREATE), e ? n.timestampWatcher = {
					t1: e
				} : n.timestampWatcher = {
					t1: 0
				}, window.cproStyleApi ? n.styleOpenApi = window.cproStyleApi[i] || {} : n.styleOpenApi = {}, 0 === i.indexOf("u") && (n.productLine = "union", n.width = n.styleOpenApi.cpro_w || n.styleOpenApi.rsi0 || 0, n.height = n.styleOpenApi.cpro_h || n.styleOpenApi.rsi1 || 0), n
			},
			cloneSlot: function(t) {
				var e;
				return e = window.JSON && window.JSON.parse ? JSON.parse(JSON.stringify(t)) : this.lang.clone(t), e.index = this.slotIdCountMap[e.slotId]++, e.id = e.slotId + "_" + e.index, e
			},
			processSlot: function(t) {
				var e = !1,
					i = !1;
				if (t.response) {
					var n = t.response.rtb_deliv,
						o = t.response.order_deliv,
						r = parseInt(n.deliv_id, 10),
						s = parseInt(n.demand_id, 10),
						a = parseInt(o.deliv_id, 10),
						l = parseInt(o.demand_id, 10);
					e = !(r || s || a || l), i = 0 !== r || 0 !== a
				}
				t.isPdbAd = e, t.isNeedCacheRequest = i
			},
			addSlot: function(t) {
				this.slotsMap[t.id] = t
			},
			clearStatus: function(t, e) {
				t.status = t.status ^ e
			},
			checkStatus: function(t, e) {
				return (t.status & e) > 0
			},
			setStatus: function(t, e) {
				var i = this.getSlotInfo(t);
				i && (i.status |= e), (e & this.config.STATUS_FINISH) > 0 && this.adSlotFinish(t)
			},
			addErrorInfo: function(t, e) {
				t.errors = t.errors || [], t.errors.push(e)
			},
			adSlotFinish: function(t) {
				var e = {},
					i = !1,
					n = this.getSlotInfo(t);
				if (n.response) {
					var o = n.response ? n.response.pdb_deliv : {};
					for (var r in this.origentation.watchingSlotsMap)
						if (r && this.origentation.watchingSlotsMap.hasOwnProperty(r) && this.origentation.watchingSlotsMap[r] && 0 === ("" + t).indexOf("" + r) && n.response) {
							var s = o.deliv_des,
								a = s.width || 0,
								l = s.height || 0;
							0 === a || 0 === l ? e[t] = !1 : e[t] = !0, i = !0
						}
					i && this.origentation.slotFinishedCallback(e)
				}
			},
			process: function() {
				var t = this.slotsMap;
				for (var e in t)
					if (e && t[e] && t.hasOwnProperty(e)) {
						var i = t[e];
						if (i.status >= this.config.STATUS_REQUEST) continue;
						this.createContainer(i), this.requestSlotInfo(i)
					}
			},
			requestSlotInfo: function(t) {
				t.paramObj = this.param.getParamObj(t);
				var e = this.param.getParamString(t.paramObj),
					i = this.config.POS_URL + e;
				t.timestampWatcher.t2 = +new Date;
				var n = !1;
				"union" === t.productLine && (n = !0), t.isAsync === !0 && (n = !0), this.sendJsonpRequest(i, n), this.setStatus(t.id, this.config.STATUS_REQUEST)
			},
			createContainer: function(t) {
				if (!(t.status > this.config.STATUS_CREATE)) {
					var e = this.dom.g(t.containerId);
					if (e) return void this.setStatus(t.id, this.config.STATUS_CREATE);
					t.isAsync ? "union" === t.productLine && (t.containerId = "cpro_" + t.slotId) : (document.write('<div id="' + t.containerId + '"></div>'), this.dom.g(t.containerId) || this.createBackupWrapper(t)), this.setStatus(t.id, this.config.STATUS_CREATE)
				}
			},
			createBackupWrapper: function(t) {
				try {
					var e = document.getElementsByTagName("script"),
						i = e[e.length - 1];
					if (i) {
						var n = i.parentNode;
						if (n) {
							var o = document.createElement("div");
							return o.id = t.containerId, n.insertBefore(o, i), !0
						}
					}
				} catch (r) {}
				return !1
			},
			sendJsonpRequest: function(t, e) {
				if (e) {
					var i = document.createElement("script");
					i.type = "text/javascript", i.async = !0, i.src = t;
					var n = document.getElementsByTagName("script")[0];
					if (n && n.parentNode) return void n.parentNode.insertBefore(i, n);
					document.write('<script charset="utf-8" src="' + t + '"></script>')
				} else document.write('<script charset="utf-8" src="' + t + '"></script>')
			},
			adInfoIsAvailable: function(t) {
				var e = t.response;
				if (!e) return !0;
				var i = e.pdb_deliv,
					n = e.rtb_deliv,
					o = e.order_deliv,
					r = e.pdb_deliv.deliv_des,
					s = (r._html, e.placement.complement_type);
				return 0 === i.deliv_id && 0 === n.deliv_id && 0 === o.deliv_id && 7 == s ? (this.log.monitorLog({
					error: "responseEmpty",
					status: "renderFail"
				}), !1) : !0
			}
		}), t.define({
			name: "detect",
			namespace: "dup.business",
			deps: {
				config: "dup.common.config",
				log: "dup.common.utility.log",
				slot: "dup.business.slot"
			},
			$detect: function() {},
			sendLog: function(t) {
				t.url = "", t.host = window.location.hostname, t.from = "SSP", this.config.EXP_ID && (t.exp = this.config.EXP_ID), this.log.sendLog({
					data: t,
					option: "now"
				})
			},
			checkFail: function() {
				var t = this.slot.slotsMap;
				for (var e in t)
					if (e && t.hasOwnProperty(e) && t[e]) {
						var i = t[e],
							n = i.slotId,
							o = "";
						i.response && (o = i.response.queryid);
						var r = i.status,
							s = i.errors || [],
							a = decodeURIComponent(s.join(","));
						a && this.sendLog({
							type: "sspFail",
							exp: this.config.EXP_ID || "",
							status: r,
							id: n,
							sid: o,
							index: i.index,
							errorInfo: a
						})
					}
			}
		}), t.define({
			name: "viewWatch",
			namespace: "dup.business",
			deps: {
				dom: "dup.common.utility.dom",
				lang: "dup.common.utility.lang",
				style: "dup.common.utility.style",
				browser: "dup.common.utility.browser",
				log: "dup.common.utility.log",
				slot: "dup.business.slot"
			},
			analysisUrl: "http://eclick.baidu.com/a.js",
			maxTime: 72e5,
			STATUS: {
				WAIT: 0,
				LOAD: 1,
				RUN: 2,
				UNLOAD: 3
			},
			clientParam: {},
			focusSwitch: !0,
			watchingList: null,
			intervalId: null,
			intervalTimeSpan: 500,
			isEventInited: !1,
			$viewWatch: function() {
				this.winFocused = !0, this.win = window, this.pageStayTime = null == this.pageStayTime ? 0 : this.pageStayTime, this.intervalStatus = this.STATUS.WAIT
			},
			regisetViewWatch: function(t) {
				this.isEventInited || (this.initializeEvent(), this.isEventInited = !0), this.watchingList = this.watchingList || [];
				var e = this.dom.g(t.containerId);
				if (e) {
					var i = t.paramObj,
						n = t.width,
						o = t.height,
						r = "";
					if (t.response) {
						var s = t.response.placement,
							a = s.container;
						n = a.width, o = a.height, r = t.response.queryid
					}
					var l = new Date,
						d = {
							slotId: t.slotId,
							domId: t.containerId,
							jk: r,
							word: i.ltu,
							iframeStatus: i.dis,
							aw: n,
							ah: o,
							viewContext: {
								pageStayTime: 0,
								pageStayTimeStamp: l,
								inViewTime: 0,
								inViewTimeStamp: l,
								currViewStatus: !1,
								focusTime: 0,
								adViewTime: 0,
								currAdViewStatus: !1,
								adViewTimeStamp: l
							}
						};
					this.calculateClientParam(d, e), this.watchingList.push(d)
				}
			},
			unregisetViewWatch: function(t) {
				if (this.watchingList)
					for (var e = t.containerId, i = 0; i < this.watchingList.length; i++) {
						var n = this.watchingList[i];
						if (n.domId == e) return void this.watchingList.splice(i, 1)
					}
			},
			buildAnalysisUrl: function(t, e) {
				if (t && e) {
					var i = t + "?",
						n = e.viewContext;
					n.inViewTime > this.maxTime && (n.inViewTime = this.maxTime), n.adViewTime > this.maxTime && (n.adViewTime = this.maxTime), n.pageStayTime >= this.maxTime && (n.pageStayTime = this.maxTime);
					var o = [];
					return o.push("tu=" + e.slotId), o.push("jk=" + e.jk), o.push("word=" + e.word), o.push("if=" + e.iframeStatus), o.push("aw=" + e.aw), o.push("ah=" + e.ah), o.push("pt=" + n.pageStayTime), o.push("it=" + n.inViewTime), o.push("vt=" + n.adViewTime), o.push("csp=" + e.desktopResolution), o.push("bcl=" + e.browserRegion), o.push("pof=" + e.pageRegion), o.push("top=" + e.top), o.push("left=" + e.left), i + o.join("&")
				}
			},
			initializeEvent: function() {
				this.windowOnLoadHandler(), this.dom.ready(t.proxy(this, this.windowOnLoadDelay), 2e3), this.dom.bind(this.win, "beforeunload", t.proxy(this, this.windowOnUnloadHandler))
			},
			calculateClientParam: function(t, e) {
				var i = this.style.getPosition(e);
				t.left = i.left || 0, t.top = i.top || 0;
				var n = window.screen.availWidth,
					o = window.screen.availHeight;
				n > 1e4 && (n = 0), o > 1e4 && (o = 0), t.desktopResolution = n + "," + o, t.browserRegion = this.style.getClientWidth(window) + "," + this.style.getClientHeight(window), t.pageRegion = this.style.getScrollWidth(window) + "," + this.style.getScrollHeight(window)
			},
			updateViewStatus: function(t, e, i) {
				var n, o, r, s = new Date;
				return n = o = r = this.intervalTimeSpan, this.intervalStatus === this.STATUS.LOAD && (this.intervalStatus = this.STATUS.RUN, n = o = 0, r = o = 0), t.currViewStatus ? (this.intervalStatus === this.STATUS.LOAD && (n = parseInt(s.getTime() - t.inViewTimeStamp.getTime(), 10), 0 > n ? n = 0 : n > this.intervalTimeSpan && (n = this.intervalTimeSpan)), t.inViewTime += n, t.inViewTimeStamp = s) : e && (t.inViewTimeStamp = s), t.currViewStatus = e, t.currAdViewStatus ? (this.intervalStatus === this.STATUS.UNLOAD && (r = parseInt(s.getTime() - t.adViewTimeStamp.getTime(), 10), 0 > r ? r = 0 : r > this.intervalTimeSpan && (r = this.intervalTimeSpan)), t.adViewTime += r, t.adViewTimeStamp = s) : i && (t.adViewTimeStamp = s), t.currAdViewStatus = i, t.pageStayTime = t.pageStayTime || 0, this.pageStayTime = this.pageStayTime || 0, this.intervalStatus === this.STATUS.UNLOAD && (this.pageTimeSpan = parseInt(s.getTime() - t.pageStayTimeStamp.getTime(), 10), 0 > o ? o = 0 : o > this.intervalTimeSpan && (o = this.intervalTimeSpan)), t.pageStayTime += o, this.pageStayTime += o, this.winFocused && (t.focusTime += o), t.pageStayTimeStamp = s, t
			},
			computeViewStatus: function(t) {
				var e = t.domId,
					i = this.dom.g(e);
				if (!i) return {
					isInView: !1,
					isAdView: !1
				};
				var n = !1,
					o = !1;
				if (this.winFocused) try {
					var r = this.style.getClientWidth(this.win),
						s = this.style.getClientHeight(this.win),
						a = this.getPosition(i),
						l = this.style.getOuterWidth(i),
						d = this.style.getOuterHeight(i);
					n = a.top >= 0 && a.bottom <= s && a.left >= 0 && a.left <= r;
					var c = a.top > 0 ? a.top : 0,
						h = a.bottom > s ? s : a.bottom,
						u = a.left > 0 ? a.left : 0,
						p = a.right > r ? r : a.right,
						m = l * d;
					if (h > c && p > u) {
						var f = (h - c) * (p - u);
						o = f > .5 * m ? !0 : !1
					}
				} catch (g) {}
				return {
					isInView: n,
					isAdView: o
				}
			},
			getPosition: function(t) {
				var e = this.style.getPositionCore(t),
					i = this.style.getScrollLeft(window),
					n = this.style.getScrollTop(window),
					o = this.style.getOuterWidth(t, !1),
					r = this.style.getOuterHeight(t, !1);
				return {
					top: e.top - n,
					bottom: e.top - n + r,
					left: e.left - i,
					right: e.left - i + o,
					topAbs: e.top,
					bottomAbs: e.top + r,
					leftAbs: e.left,
					rightAbs: e.left + o
				}
			},
			viewableCompute: function() {
				if (this.watchingList) {
					var t, e;
					for (t = 0, e = this.watchingList.length; e > t; t++) {
						var i = this.watchingList[t],
							n = this.computeViewStatus(i);
						i.viewContext = this.updateViewStatus(i.viewContext, n.isInView, n.isAdView), i.analysisUrl = this.buildAnalysisUrl(this.analysisUrl, i)
					}
				}
			},
			viewOnChange: function() {
				this.viewableCompute(), this.pageStayTime >= this.maxTime && this.windowOnUnloadHandler(!1)
			},
			windowOnLoadHandler: function(e) {
				this.intervalStatus = this.STATUS.LOAD, this.registerFocusEvent(this.win), (!this.browser.ie || this.browser.ie && this.browser.ie > 6) && this.viewOnChange(), this.intervalId = setInterval(t.proxy(this, this.viewOnChange), this.intervalTimeSpan)
			},
			windowOnLoadDelay: function(t) {
				var e, i, n, o, r;
				for (e = 0, i = this.watchingList.length; i > e; e++) n = this.watchingList[e], n && (r = n.domId, r && (o = this.win.document.getElementById(r)), o && (n.clientParam = n.clientParam || {}, this.calculateClientParam(n, o)))
			},
			windowOnUnloadHandler: function(t) {
				try {
					if (clearInterval(this.intervalId), this.intervalStatus !== this.STATUS.RUN) return void(this.intervalStatus = this.STATUS.UNLOAD);
					this.intervalStatus = this.STATUS.UNLOAD, this.viewableCompute();
					for (var e = 0, i = this.watchingList.length; i > e; e++) {
						var n = this.watchingList[e];
						n && n.analysisUrl && !n.isSended && (n.isSended = !0, 0 === e && (n.analysisUrl += "&total=" + this.watchingList.length), this.log.sendLog({
							url: n.analysisUrl
						}))
					}
					if (t) {
						var o, r = 200,
							s = (new Date).getTime();
						if (this.browser.ie)
							for (o = s + r; o > s;) s = (new Date).getTime();
						else {
							for (var i = 1e5, e = 0; i > e; e++);
							o = (new Date).getTime(), i = 1e5 * r / (o - s), i = i > 1e7 ? 1e7 : i;
							for (var e = 0; i > e; e++);
						}
					}
				} catch (a) {}
			},
			registerFocusEvent: function(e) {
				var e = e || this.win;
				this.winFocused = !0, this.browser.ie ? (this.dom.bind(e, "focusin", t.proxy(this, this.allDomOnFocusHandler)), this.dom.bind(e, "focusout", t.proxy(this, this.allDomOnBlurHandler))) : (this.dom.bind(e, "focus", t.proxy(this, this.allDomOnFocusHandler)), this.dom.bind(e, "blur", t.proxy(this, this.allDomOnBlurHandler)))
			},
			allDomOnFocusHandler: function(t) {
				this.winFocused = !0
			},
			allDomOnBlurHandler: function(t) {
				this.winFocused = !1
			}
		}), t.define({
			name: "unionDelivery",
			namespace: "dup.business.delivery",
			deps: {
				slot: "dup.business.slot"
			},
			launch: function() {
				var t, e = window.cpro_id;
				window.cpro_id = null, e && (t = this.slot.createSlot({
					slotId: e,
					productLine: "union",
					isAsync: !1
				}), this.slot.addSlot(t));
				var i = window.cproArray;
				if (window.cproArray = null, i)
					for (var n = 0, o = i.length; o > n; n++) t = this.slot.createSlot({
						slotId: i[n].id,
						productLine: "union",
						isAsync: !0
					}), this.slot.addSlot(t);
				var r = window.cpro_mobile_slot;
				if (window.cpro_mobile_slot = null, r)
					for (var n = 0, o = r.length; o > n; n++) {
						var s = r[n];
						t = this.slot.createSlot({
							slotId: s.id,
							productLine: "union",
							isAsync: !0
						}), t.styleOpenApi = t.styleOpenApi || {};
						for (var a in s) a && s[a] && s.hasOwnProperty(a) && (t.styleOpenApi[a] = s[a]);
						this.slot.addSlot(t)
					}
				this.slot.process()
			}
		}), t.define({
			name: "dupDelivery",
			namespace: "dup.business.delivery",
			deps: {
				slot: "dup.business.slot",
				"interface": "dup.business.interface"
			},
			launch: function() {
				this.delieveryObjArray = this.delieveryObjArray || [], window.BAIDU_DUP = window.BAIDU_DUP || [], window.BAIDU_DUP && window.BAIDU_DUP instanceof Array && (this.delieveryObjArray = this.delieveryObjArray.concat(window.BAIDU_DUP), window.BAIDU_DUP = []), this.updateApi(), this.process()
			},
			updateApi: function() {
				window.BAIDU_DUP = this, window.BAIDU_DUP.load = !0, this["interface"].register("fill", this, this.fill), this["interface"].register("fillAsync", this, this.fillAsync)
			},
			process: function() {
				for (var t = 0, e = this.delieveryObjArray.length; e > t; t++) {
					var i = this.delieveryObjArray[t];
					if (i instanceof Array) {
						var n = i.splice(0, 1)[0],
							o = i;
						this["interface"].perform(n, o)
					}
				}
				this.delieveryObjArray = [], this.slot.process()
			},
			push: function(t) {
				this.delieveryObjArray = this.delieveryObjArray && [], this.delieveryObjArray.push(t), this.process()
			},
			fill: function(t) {
				var e = this.slot.createSlot({
					slotId: t,
					productLine: "dup",
					isAsync: !1
				});
				this.slot.addSlot(e), this.slot.process()
			},
			fillAsync: function(t, e) {
				var i = this.slot.createSlot({
					slotId: t,
					productLine: "dup",
					isAsync: !0
				});
				i.containerId = e, this.slot.addSlot(i), this.slot.process()
			}
		}), t.define({
			name: "expand",
			namespace: "dup.ui.painter",
			deps: {
				config: "dup.common.config",
				dom: "dup.common.utility.dom",
				style: "dup.common.utility.style",
				event: "dup.common.utility.event",
				slot: "dup.business.slot"
			},
			validate: function(t) {
				return !0
			},
			sendMessage: function(t, e) {
				var i = this.slot.getSlotInfo(t),
					n = this.dom.g(i.containerId);
				if (n) {
					var o = n.getElementsByTagName("iframe")[0];
					e = JSON.stringify(e), o.contentWindow.postMessage(e, "*")
				}
			},
			getComputedWidth: function(t) {
				return window.getComputedStyle ? window.getComputedStyle(t).width : t.currentStyle.width
			},
			init: function() {
				function t(t) {
					var i = JSON.parse(t.data);
					if (!i.title || "baidudup" != i.title) return !1;
					if ("invokeMethod" == i.type) switch (i.method) {
						case "expand":
							e.expandAd(i.parameters[0]);
							break;
						case "close":
							e.collapseAd(i.parameters[0])
					}
				}
				var e = this;
				(window.addEventListener || window.attachEvent) && JSON && JSON.parse && this.event.bind(window, "message", t), this.event.bind(window, "scroll", function() {
					e.adjustPosWhenViewportChanged()
				}), this.event.bind(window, "resize", function() {
					e.adjustPosWhenViewportChanged()
				})
			},
			adjustPosWhenViewportChanged: function() {
				var t = this.scrollObserver;
				t.up, t.down, t.left, t.right;
				for (var e in t)
					for (var i in t[e]) {
						var n = t[e][i];
						if (!n.isExpand) return;
						var o = n.origin,
							r = o.getElementsByTagName("iframe")[0],
							s = (n.targetWidth, n.targetHeight, n.originWidth);
						n.originHeight;
						switch (e) {
							case "up":
								var a = parseInt(this.getComputedWidth(o), 10);
								r.style.left = 0;
								break;
							case "down":
								var a = parseInt(this.getComputedWidth(o), 10);
								r.style.left = 0;
								break;
							case "left":
								var a = parseInt(this.getComputedWidth(o));
								r.style.right = a - s + "px";
								break;
							case "right":
								var a = parseInt(this.getComputedWidth(o));
								r.style.left = 0
						}
					}
			},
			$expand: function() {
				this.observerObjs = [], this.expandStatus = {}, this.timers = {}, this.hasInit = !1, this.maxExpandTime = 5e3, this.canFixed = this.style.canFixed(), this.scrollObserver = {
					up: {},
					down: {},
					left: {},
					right: {}
				}
			},
			registerScrollSubject: function(t, e, i, n, o, r, s) {
				if (!this.scrollObserver[t][e]) {
					var a = this.scrollObserver[t][e] = {};
					a.isExpand = !0, a.origin = i, a.originWidth = n, a.originHeight = o, a.targetWidth = r, a.targetHeight = s
				}
			},
			expand2Up: function(t, e, i, n, o, r) {
				this.registerScrollSubject("up", t, e, i, n, o, r);
				var s = e.getElementsByTagName("iframe")[0];
				parseInt(this.getComputedWidth(e));
				s.style.bottom = 0, s.style.left = 0
			},
			expand2Down: function(t, e, i, n, o, r) {
				this.registerScrollSubject("down", t, e, i, n, o, r);
				var s = e.getElementsByTagName("iframe")[0];
				parseInt(this.getComputedWidth(e));
				s.style.top = 0, s.style.left = 0
			},
			expand2Left: function(t, e, i, n, o, r) {
				this.registerScrollSubject("left", t, e, i, n, o, r);
				var s = e.getElementsByTagName("iframe")[0],
					a = parseInt(this.getComputedWidth(e));
				s.style.bottom = 0, s.style.right = a - i + "px"
			},
			expand2Right: function(t, e, i, n, o, r) {
				this.registerScrollSubject("right", t, e, i, n, o, r);
				var s = e.getElementsByTagName("iframe")[0];
				parseInt(this.getComputedWidth(e));
				s.style.bottom = 0, s.style.left = 0
			},
			expandAd: function(t) {
				if (!this.expandStatus[t]) {
					this.expandStatus[t] = !0;
					var e = this.slot.getSlotInfoByRawId(t),
						i = e.response.placement.container,
						n = i.width,
						o = i.height,
						r = e.response.placement.container.slide,
						s = r.slideWidth,
						a = r.slideHeight,
						l = 1e3 * parseInt(r.extendTime, 10),
						d = parseInt(r.slideMode, 10),
						c = parseInt(r.direction, 10),
						h = e.containerId,
						u = this.dom.g(h),
						p = u.getElementsByTagName("iframe")[0];
					if (1 === c || 2 === c ? (p.setAttribute("height", a), p.style.height = a + "px") : (3 === c || 4 === c) && (p.setAttribute("width", s), p.style.width = s + "px"), 2 == d && 2 == c || 2 == d && 4 == c) switch (c) {
						case 2:
							p.setAttribute("height", a), p.style.height = a + "px";
							break;
						case 4:
							p.setAttribute("width", s), p.style.width = s + "px"
					} else switch (u.style.position = "relative", p.style.position = "absolute", u.style.height = o + "px", c) {
						case 1:
							this.expand2Up(t, u, n, o, s, a);
							break;
						case 2:
							this.expand2Down(t, u, n, o, s, a);
							break;
						case 3:
							this.expand2Left(t, u, n, o, s, a);
							break;
						case 4:
							this.expand2Right(t, u, n, o, s, a)
					}
					var m = this;
					this.timers[t] = setTimeout(function() {
						m.expandStatus[t] && m.collapseAd(t)
					}, Math.min(l))
				}
			},
			collapseAd: function(t) {
				if (this.expandStatus[t]) {
					this.expandStatus[t] = !1, clearTimeout(this.timers[t]);
					var e = this.slot.getSlotInfoByRawId(t),
						i = e.response.placement.container,
						n = i.width,
						o = i.height,
						r = e.containerId,
						s = this.dom.g(r),
						a = s.getElementsByTagName("iframe")[0];
					s.style.position = "", s.style.width = "", s.style.height = "", s.style.top = "", s.style.left = "", a.style.position = "", a.style.display = "", a.style.top = "", a.style.left = "", a.style.right = "", a.style.width = "", a.style.height = "", a.setAttribute("height", o), a.setAttribute("width", n);
					for (var l in this.scrollObserver)
						for (var d in this.scrollObserver[l]) d == t && (this.scrollObserver[l][d].isExpand = !1)
				}
			},
			observer: function(t) {
				var t = this.slot.getSlotInfoByRawId(t.slotId),
					e = t.response.placement.container.slide,
					i = t.containerId,
					n = this.dom.g(i);
				e.slideMode, e.direction;
				n.style.textAlign = "left", this.hasInit || (this.hasInit = !0, this.init())
			},
			fire: function(t, e) {
				var i, n = function(t) {
						return "[object Array]" == Object.prototype.toString.call(t) ? !0 : !1
					},
					o = this.slot.getSlotInfoByRawId(e),
					r = o.response.placement.container.slide;
				r && (i = r.trigger);
				var s = n(i) ? i[0] : i ? i : 0,
					a = ["", "BEFORE_PAGELOAD", "AFTER_PAGECLOSE", "PAGE_PERCENT", "mouseover", "click", "adloaded", "SLIP"];
				a[s] === t && this.sendMessage(e, {
					title: "baidudup",
					type: "eventHappen",
					parameters: [t]
				})
			}
		}), t.define({
			name: "baiduRec",
			namespace: "dup.ui.painter",
			deps: {
				config: "dup.common.config",
				data: "dup.common.utility.data",
				lang: "dup.common.utility.lang",
				param: "dup.business.param",
				slot: "dup.business.slot"
			},
			render: function(t) {
				this.slot.setStatus(t.id, this.config.STATUS_RENDERED);
				var e = window,
					i = "baiduRecProxyCallback",
					n = this.data.getInfo("baiduRecCallback"),
					o = this;
				e[i] = function(t) {
					return n && "function" == o.lang.getType(e[n]) ? void e[n](t) : !1
				}, t.paramObj.dtm = "BAIDU_DUP_JSONTEMPLATE", t.paramObj.dcb = i;
				var r = this.param.getPmpRequestUrl(t),
					s = document.createElement("script");
				s.type = "text/javascript", s.charset = "utf-8", s.async = !0, s.src = r;
				var a = document.getElementsByTagName("script")[0];
				a.parentNode.insertBefore(s, a), this.slot.setStatus(t.id, this.config.STATUS_FINISH)
			}
		}), t.define({
			name: "frame",
			namespace: "dup.business",
			deps: {
				config: "dup.common.config",
				slot: "dup.business.slot",
				material: "dup.business.material",
				log: "dup.common.utility.log",
				requestCache: "dup.business.requestCache",
				param: "dup.business.param",
				lang: "dup.common.utility.lang",
				data: "dup.common.utility.data",
				viewWatch: "dup.business.viewWatch",
				creativePreview: "dup.business.creativePreview"
			},
			checkRichAdType: function(t) {
				for (var e = "", i = ["dui-lian", "popup", "right-down", "slide", "top-down", "barrier"], n = 0; n < i.length; n++)
					if (t.indexOf(i[n]) > -1) {
						e = i[n];
						break
					}
				return e
			},
			cacheRequestCallback: function(e) {
				var i = e.html || "success";
				if ("success" !== i) {
					var n = this.requestCache.get(e.dpv),
						o = n.response.pdb_deliv.deliv_des;
					o = o._html;
					var r = n.response,
						s = r.pdb_deliv,
						a = r.rtb_deliv,
						l = r.order_deliv;
					if (0 === s.deliv_id && (0 !== parseInt(l.deliv_id, 10) || 0 !== parseInt(a.deliv_id, 10)) && "success" !== i && 7 === r.placement.complement_type) {
						var d = document.getElementById(n.containerId),
							c = document.getElementById(n.containerId + "_left"),
							h = document.getElementById(n.containerId + "_right");
						return d && (this.viewWatch.unregisetViewWatch(n), d.parentNode.removeChild(d)), c && c.parentNode.removeChild(c), void(h && h.parentNode.removeChild(h))
					}
					if (n)
						if (o.type && "rich" === o.type) {
							var u = this.material.formatMaterial(o, n),
								p = document.getElementById(n.containerId),
								m = "<!DOCTYPE html><body>";
							u.indexOf(m) > -1 && (u = u.slice(m.length));
							var f = this.checkRichAdType(u);
							if ("popup" === f) p.style.display = "none";
							else if ("barrier" === f) {
								p.style.display = "none";
								var g = document.getElementById(n.containerId + "_placeholder");
								g && (g.style.display = "none")
							}
							var y = t.using("dup.ui.painter.richMaterial");
							y.render(n, !0)
						} else {
							var v = this.requestCache.secondResult[e.dpv];
							this.slot.clearStatus(n, this.config.STATUS_FINISH), n.isPdbAd = !0, n.isNeedCacheRequest = !1, v.outerHTML = this.getFrameHTML(n)
						}
				}
			},
			requireDomainPolicy: function() {
				function t(t) {
					try {
						return !t.contentWindow.document
					} catch (e) {
						return !0
					}
				}
				var e = document.createElement("iframe"),
					i = !1;
				return e.src = "about:blank", document.body.insertBefore(e, document.body.firstChild), i = t(e), document.body.removeChild(e), this.requireDomainPolicy = function() {
					return i
				}, i
			},
			requireBlankPolicy: function() {
				var t = navigator.userAgent,
					e = t && t.match(/iphone.*micromessenger/i) ? !0 : !1;
				return this.requireBlankPolicy = function() {
					return e
				}, e
			},
			renderFrame: function(t, e) {
				var i = this.slot.getSlotInfo(t);
				if (i && !this.slot.checkStatus(i, this.config.STATUS_FINISH)) {
					var n = i.response.pdb_deliv.deliv_des;
					n = n._html;
					var o = this.getFrameUrl();
					if (this.requireDomainPolicy() && e.getAttribute("src", 2) !== o) return void(e.src = o);
					if (n && "url" === n.type) return e.src = n.content, void this.slot.setStatus(i.id, this.config.STATUS_FINISH);
					try {
						this.slot.setStatus(i.id, this.config.STATUS_FINISH);
						var r = this.material.formatMaterial(n, i);
						r.indexOf("<body>") < 0 && (r = "<!DOCTYPE html><body>" + r);
						var s = e.contentWindow.document;
						s.open("text/html", "replace"), s.write(r), s.close(), s.body && (s.body.style.backgroundColor = "transparent")
					} catch (a) {
						this.log.monitorLog({
							id: t,
							error: "frameFail",
							status: "renderFail"
						})
					}
				}
			},
			getFrameUrl: function() {
				return this.requireDomainPolicy() ? this.data.getConfig("domainPolicyFileUrl") || "/domain-policy.htm" : this.requireBlankPolicy() ? this.data.getConfig("blankPolicyFileUrl") || "/blank-policy.htm" : "about:blank"
			},
			getFrameHTML: function(t, e) {
				e = e || "iframe" + t.id, t.iframeId = e;
				var i = this.processFrameData(t);
				return this.renderFrameHTML(i)
			},
			processFrameData: function(e) {
				var i, n, o = "",
					r = [];
				if (e.response) {
					var s = e.response.placement;
					n = s.container;
					try {
						r = s.fillstyle.elements || []
					} catch (a) {}
				}
				var l = e.width || n && n.width,
					d = e.height || n && n.height,
					c = this.creativePreview.getPreviewUrl(l, d, r, e.displayType || "inlay");
				if (c) i = c;
				else if (e.isPdbAd) {
					var h = this.config.DUP_PREFIX + "renderFrame";
					this.data.defineOnce(h, t.proxy(this, this.renderFrame)), i = this.getFrameUrl(), o = 'onload="' + h + "('" + e.id + "', this);\""
				} else if (e.isNeedCacheRequest) {
					var u = this.config.DUP_PREFIX + "cacheRequest",
						p = "adsbybaidu_callback";
					this.data.defineOnce(p, t.proxy(this, this.cacheRequestCallback)), this.data.defineOnce(u, t.proxy(this.requestCache, this.requestCache.cacheRequest)), i = this.param.getPmpRequestUrl(e), o = 'onload="' + u + "('" + e.paramObj.dpv + "', this);\""
				} else i = this.param.getPmpRequestUrl(e);
				var m = {};
				return m.iframeId = e.iframeId, m.srcAttriName = "src", m.onloadDefine = o, m.iframeWidth = "" + l, m.iframeHeight = "" + d, m.url = i, m
			},
			renderFrameHTML: function(t) {
				var e = ["<iframe", ' id="{iframeId}"', " {onloadDefine}", ' {srcAttriName}="{url}"', ' width="{iframeWidth}"', ' height="{iframeHeight}"', ' align="center,center"', ' vspace="0"', ' hspace="0"', ' marginwidth="0"', ' marginheight="0"', ' scrolling="no"', ' frameborder="0"', ' style="border:0; vertical-align:bottom;margin:0;"', ' allowtransparency="true">', "</iframe>"].join("");
				return this.lang.template(e, t)
			}
		}), t.define({
			name: "richMaterial",
			namespace: "dup.ui.painter",
			deps: {
				dom: "dup.common.utility.dom",
				config: "dup.common.config",
				slot: "dup.business.slot",
				param: "dup.business.param",
				frame: "dup.business.frame",
				log: "dup.common.utility.log",
				data: "dup.common.utility.data"
			},
			isNeededNode: function(t, e) {
				return t.nodeName && t.nodeName.toUpperCase() === e.toUpperCase()
			},
			evalScript: function(t, e) {
				try {
					var i = document.createElement("script");
					i.type = "text/javascript", t.src ? i.src = t.src : i.text = t.text || t.textContent || t.innerHTML || "", e.insertBefore(i, e.firstChild)
				} catch (n) {
					this.log.monitorLog({
						error: "createscripterror",
						status: "renderFail"
					})
				}
			},
			render: function(t, e) {
				try {
					if (!t.response) return;
					var i = t.response,
						n = (i.pdb_deliv, i.rtb_deliv),
						o = i.order_deliv,
						r = i.pdb_deliv.deliv_des,
						s = r._html,
						a = 0 !== n.deliv_id || o.deliv_id;
					if (!e && (!s || "rich" !== s.type || a)) return !1;
					var l = s.content
				} catch (d) {
					this.log.monitorLog({
						id: t.id,
						error: "responseDataFail",
						status: "responseFail"
					})
				}
				try {
					if (!t.isAsync && !a) return document.write(l), this.slot.setStatus(t.id, this.config.STATUS_FINISH), !0
				} catch (d) {
					this.log.monitorLog({
						id: t.id,
						error: "writeFail",
						status: "renderFail",
						async: "0"
					})
				}
				var c = this.dom.g(t.containerId);
				try {
					if (c && t.isAsync && ("clb" === t.productLine || "dup" === t.productLine) && !a) {
						var h = this.frame.getFrameHTML(t);
						return c.innerHTML = h, !0
					}
				} catch (d) {
					this.log.monitorLog({
						id: t.id,
						error: "writeFail",
						status: "renderFail",
						async: "1"
					})
				}
				if (!c) return !1;
				c.innerHTML = '<span style="display: none">ie</span>' + l;
				for (var u = c.childNodes, p = [], m = 0; u[m]; m++) !this.isNeededNode(u[m], "script") || u[m].type && "text/javascript" !== u[m].type.toLowerCase() || p.push(u[m]);
				p.reverse();
				for (var f = 0, g = p.length; g > f; f++) this.evalScript(p[f].parentNode.removeChild(p[f]), c);
				return !0
			}
		}), t.define({
			name: "dynamicFloat",
			namespace: "dup.ui.painter",
			deps: {
				config: "dup.common.config",
				dom: "dup.common.utility.dom",
				slot: "dup.business.slot",
				frame: "dup.business.frame",
				decorator: "dup.ui.painter.dynamicFloatDecorator",
				viewWatch: "dup.business.viewWatch",
				richMaterial: "dup.ui.painter.richMaterial",
				monitor: "dup.business.monitor"
			},
			validate: function(t) {
				return !0
			},
			render: function(t) {
				if (this.slot.setStatus(t.id, this.config.STATUS_RENDERED), this.validate(t)) {
					if (!this.slot.adInfoIsAvailable(t)) return !1;
					this.monitor.sendLog(t);
					var e = this.richMaterial.render(t);
					if (!e) {
						var i = t.response.placement,
							n = i.container,
							o = this.dom.g(t.containerId);
						if (o) {
							var r = this.frame.getFrameHTML(t);
							o.innerHTML = r, this.decorator.decorate(o, t.width || n.width, t.height || n.height), this.viewWatch.regisetViewWatch(t)
						}
					}
				}
			}
		}), t.define({
			name: "floatBlock",
			namespace: "dup.ui.painter",
			deps: {
				config: "dup.common.config",
				style: "dup.common.utility.style",
				log: "dup.common.utility.log",
				dom: "dup.common.utility.dom",
				lang: "dup.common.utility.lang",
				cookie: "dup.common.utility.cookie",
				unicode: "dup.common.utility.unicode",
				frame: "dup.business.frame",
				slot: "dup.business.slot",
				deliveryLimit: "dup.business.deliveryLimit"
			},
			GAP: 5,
			NORMAL_CLOSE_BTN_HEIGHT: 17,
			COUPLET_CLOSE_BTN_HEIGHT: 20,
			validate: function(t) {
				if ("union" === t.productLine) {
					var e = this.deliveryLimit.TYPE.POPUP;
					("couplet" === t.blockType || "button" === t.blockType) && (e = this.deliveryLimit.TYPE.COUPLET);
					var i = this.validateLimit(e);
					if (!i) return !1;
					this.deliveryLimit.setAdsCount(e, t.domId)
				}
				var n = this.getCloseCookieName(t);
				return 2 === t.closeType && this.cookie.get(n) ? !1 : !0
			},
			validateLimit: function(t) {
				var e = this.deliveryLimit.getAdCount(t),
					i = this.deliveryLimit.MAX_COUNT[t];
				return i > e ? !0 : void 0
			},
			createBlockHtmlTemplate: function(t) {
				var e = ["{iframe}", "{closeBtn}"].join("");
				if (!t.blockType || "default" === t.blockType) return e;
				var i = ["box-sizing: content-box;", "width:{width}px;", "height:{height}px;", "padding:4px;", "border:#acacac 1px solid;", "overflow:hidden;"];
				return ("button" === t.blockType || "popup" === t.blockType) && i.push("position:absolute;left:0;top:" + (this.COUPLET_CLOSE_BTN_HEIGHT + this.GAP) + "px;"), e = ['<div style="' + i.join("") + '">', "{iframe}", "</div>", "{closeBtn}"].join("")
			},
			createCloseElement: function(t) {
				var e = {},
					i = "\\u5FAE\\u8F6F\\u96C5\\u9ED1",
					n = "\\u5173\\u95ED",
					o = t.domId + "_closebtn",
					r = this;
				return e.couplet = function() {
					var e = ["box-sizing: content-box;", "position:absolute;", "width:" + t.containerWidth + "px;", "height:20px;", "top:" + (t.containerHeight - this.COUPLET_CLOSE_BTN_HEIGHT) + "px;", "left:0;", "cursor:pointer;", "background-color:#999999;", "color:#fff;font-size:12px;", "font-family: " + r.unicode.toDecode(i) + ";", "text-align:center;line-height:20px;"].join(""),
						s = '<div id="' + o + '" style="' + e + '">' + r.unicode.toDecode(n) + "</div>";
					return s
				}, e.button = e.popup = function() {
					var e = 61,
						i = t.containerWidth - e,
						n = "\\u5FAE\\u8F6F\\u96C5\\u9ED1",
						s = "\\u5173\\u95ED",
						a = ["box-sizing: content-box;", "position:absolute;width:" + e + "px;", "height:20px;top:0;", "left:" + i + "px;", "margin:0;padding:0;margin-bottom:5px;", "cursor:pointer;overflow:hidden;"].join(""),
						l = ['<div id="' + o + '" style="' + a + '">', '<div style="', "box-sizing: content-box;", "width:40px;height:20px;", "background-color:#999999;", "color:#fff;float:left;", "margin-right:1px;font-size:12px;", "font-family:" + r.unicode.toDecode(n) + ";", "text-align: center;line-height:20px;", '">' + r.unicode.toDecode(s) + "</div>", '<a style="maring:0;padding:0;', "display:inline-block;border:none;", "overflow:hidden;height:20px;", "line-height:20px;cursor:pointer;", "width:20px;background:url(", "'http://cpro.baidustatic.com/cpro/ui/", "noexpire/img/2.0.1/xuanfu_close.png", "') no-repeat 0 0;margin-bottom:3px;", 'float:left" ></a>', "</div>"].join("");
					return l
				}, e["default"] = function() {
					var e = "http://cpro.baidustatic.com/cpro/ui/noexpire/img/clb/1.0.0/close.gif",
						i = ["box-sizing: content-box;", "height:15px;", "border:1px solid #e1e1e1;", "background:#f0f0f0;", "margin:0;", "padding:0;", "overflow:hidden;"].join(""),
						n = ["box-sizing: content-box;", "float:right;", "clear:right;", "margin:2px 5px 0 0;", "width:39px;", "height:13px;", "cursor:pointer;", "background:url(" + e + ") no-repeat scroll 0 0;"].join(""),
						o = ['<div style="' + i + '">', '<span id="' + t.domId + '_closebtn" style="' + n + '" ', "onmouseover=\"this.style.backgroundPosition='0 -20px';\" ", "onmouseout=\"this.style.backgroundPosition='0 0';\" ", ">", "</span>", "</div>"].join("");
					return o
				}, e[t.blockType]()
			},
			getVerticalStyle: function(t) {
				var e = t.vSpace || 10;
				"center" === t.verticalType && (e = .5 * (this.style.getClientHeight() - t.containerHeight));
				var i = t.verticalType;
				return i && "center" !== i || (i = "top"), {
					cssName: i,
					cssValue: e
				}
			},
			getHorizontalStyle: function(t) {
				var e = t.hSpace || 10;
				if (t.contentWidth > 0 && 1 === t.dockType) {
					var i = Math.floor(.5 * (this.style.getClientWidth() - t.contentWidth));
					i >= t.width && (e = "right" === t.horizontalType ? i - t.containerWidth - e : i - t.containerWidth - e)
				} else "center" === t.horizontalType && (e = .5 * (this.style.getClientWidth() - t.containerWidth));
				var n = t.horizontalType;
				return n && "center" !== n || (n = "left"), {
					cssName: n,
					cssValue: e
				}
			},
			createContainerElementByInfo: function(t) {
				var e = null;
				this.dom.g(t.domId) ? e = this.dom.g(t.domId) : (e = document.createElement("div"), e.id = t.domId);
				var i = ["box-sizing: content-box;", "width: " + t.containerWidth + "px;", "height: " + t.containerHeight + "px;", "overflow: hidden;", "z-index: 2147483647;"];
				if (1 === t.followType)
					if (this.style.canFixed()) {
						i.push("position: fixed;");
						var n = this.getVerticalStyle(t),
							o = this.getHorizontalStyle(t);
						i.push(n.cssName + ":" + n.cssValue + "px;"), i.push(o.cssName + ":" + o.cssValue + "px;")
					} else {
						i.push("position: absolute;"), this.updatePosition(t, e);
						var r = this;
						this.dom.bind(window, "scroll", function() {
							r.updatePosition(t, t.domId)
						}), this.dom.bind(window, "resize", function() {
							r.updatePosition(t, t.domId)
						})
					} else {
					i.push("position: absolute;");
					var n = this.getVerticalStyle(t),
						o = this.getHorizontalStyle(t);
					i.push(n.cssName + ":" + n.cssValue + "px;"), i.push(o.cssName + ":" + o.cssValue + "px;")
				}
				return e.style.cssText = i.join(""), e
			},
			updatePosition: function(t, e) {
				var i = this.dom.g(e);
				if (i) {
					var n = i.style,
						o = "CSS1Compat" !== document.compatMode,
						r = o ? document.body : document.documentElement,
						s = r.clientWidth,
						a = r.clientHeight,
						l = window.pageXOffset || r.scrollLeft,
						d = window.pageYOffset || r.scrollTop,
						c = t.contentWidth > 0 && 1 === t.dockType;
					"top" === t.verticalType || 0 === t.verticalType.length ? n.top = d + t.vSpace + "px" : n.top = d + a - t.vSpace - t.containerHeight + "px";
					var h = Math.floor(.5 * (this.style.getClientWidth() - t.contentWidth));
					"left" === t.horizontalType || 0 === t.horizontalType ? c ? n.left = l + h - t.hSpace - t.containerWidth + "px" : n.left = l + t.hSpace + "px" : c ? n.left = l + h + t.contentWidth + t.hSpace + "px" : n.left = l + s - t.hSpace - t.containerWidth + "px"
				}
			},
			getCloseCookieName: function(t) {
				var e = "bd_close_" + t.id;
				return ("couplet" === t.blockType || "button" === t.blockType) && (e += "_" + t.horizontalType), e
			},
			setCookieClose: function(t) {
				var e = this.getCloseCookieName(t),
					i = new Date;
				i.setTime(i.getTime() + 9e5), this.cookie.set(e, !0, {
					expires: i,
					path: "/"
				})
			},
			registEvent: function(e) {
				var i = e.domId + "_closebtn",
					n = this.dom.g(i);
				this.dom.bind(n, "click", t.proxy(this, this.closeBtnOnClickHandler)), this.dom.bind(n, "mouseover", t.proxy(this, this.closeBtnOnMouseOverHandler)), this.dom.bind(n, "mouseout", t.proxy(this, this.closeBtnOnMouseOutHandler))
			},
			closeBtnOnClickHandler: function() {
				var t = document.getElementById(this.info.domId);
				t && t.parentNode && t.parentNode.removeChild(t), 2 === this.info.closeType && this.setCookieClose(this.info);
				var e = "http://eclick.baidu.com/fcb.jpg?jk={jk}&dt={dt}&rnd={rnd}",
					i = {
						jk: this.info.queryId || "",
						dt: (new Date).getTime(),
						rnd: Math.floor(2147483648 * Math.random())
					};
				try {
					this.log.loadImage(this.lang.template(e, i))
				} catch (n) {}
			},
			closeBtnOnMouseOverHandler: function() {
				var t = this.info.domId + "_closebtn",
					e = this.dom.g(t);
				if (e)
					if ("couplet" === this.info.blockType) e.style.backgroundColor = "#0066cc";
					else if ("popup" === this.info.blockType || "button" === this.info.blockType) {
					var i = e.getElementsByTagName("div")[0];
					i.style.backgroundColor = "#0066cc";
					var n = e.getElementsByTagName("a")[0];
					n.style.backgroundImage = "url(http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.0/xuanfu_mouseover_close.png)"
				}
			},
			closeBtnOnMouseOutHandler: function() {
				var t = this.info.domId + "_closebtn",
					e = this.dom.g(t);
				if (e)
					if ("couplet" === this.info.blockType) e.style.backgroundColor = "#999999";
					else if ("popup" === this.info.blockType || "button" === this.info.blockType) {
					var i = e.getElementsByTagName("div")[0];
					i.style.backgroundColor = "#999999";
					var n = e.getElementsByTagName("a")[0];
					n.style.backgroundImage = "url(http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/xuanfu_close.png)"
				}
			},
			autoClose: function() {
				var t = document.getElementById(this.adInfo.domId);
				t && t.parentNode && t.parentNode.removeChild(t)
			},
			render: function(e, i) {
				if (this.validate(e)) {
					this.info = e;
					var n = this.createCloseElement(e),
						o = this.createBlockHtmlTemplate(e),
						r = {
							width: e.width,
							height: e.height,
							iframe: this.frame.getFrameHTML(i, e.domId + "_iframe"),
							closeBtn: n
						},
						s = this.createContainerElementByInfo(e);
					s.innerHTML = this.lang.template(o, r), this.dom.g(e.domId) || document.body.insertBefore(s, document.body.firstChild), this.registEvent(e);
					var a = e.closeTime || 0;
					a > 0 && setTimeout(t.proxy(this, this.autoClose), 1e3 * a), i.isPdbAd || this.slot.setStatus(i.id, this.config.STATUS_FINISH)
				}
			}
		}), t.define({
			name: "inlayFix",
			namespace: "dup.ui.painter.mobile",
			deps: {
				config: "dup.common.config",
				lang: "dup.common.utility.lang",
				style: "dup.common.utility.style",
				dom: "dup.common.utility.dom",
				slot: "dup.business.slot",
				param: "dup.business.param",
				monitor: "dup.business.monitor",
				frame: "dup.business.frame",
				richMaterial: "dup.ui.painter.richMaterial",
				landingPage: "dup.ui.painter.landingPage"
			},
			$inlayFix: function() {
				this.win = window
			},
			processSlotInfo: function(t) {
				var e = {},
					i = t.response.placement,
					n = i.container,
					o = (i.fillstyle, n.sizeType),
					r = n.width,
					s = n.height;
				if (t.styleOpenApi.scale) {
					o = 2;
					var a = t.styleOpenApi.scale,
						l = a.split(".");
					r = l[0], s = l[1]
				}
				if (2 === o) {
					e.wScale = r, e.hScale = s;
					var d = 0,
						c = t.styleOpenApi.cpro_ftpc || "true" === t.styleOpenApi.cpro_ftpc ? !0 : !1,
						h = this.dom.g(t.containerId);
					c && h && h.parentElement.clientWidth && (d = h.parentElement.clientWidth || 0);
					var u = this.param.translateScaleToPixelSize(e.wScale, e.hScale, d);
					n.width = u.width, n.height = u.height, t.width = u.width, t.height = u.height, e.width = u.width, e.height = u.height
				} else e.width = r, e.height = s;
				e.sizeType = o;
				var p = t.styleOpenApi,
					m = p.cpro_w || p.rsi0 || 0,
					f = p.cpro_h || p.rsi1 || 0;
				return (m || f) && (e.width = m || this.getCurViewportWidth(r), e.height = f || s, t.width = e.width, t.height = e.height), e
			},
			getCurViewportWidth: function(t) {
				var e = this.isUnionPreview ? t : Math.max(320, this.win.innerWidth);
				return isNaN && isNaN(e) && (e = this.style.getClientWidth()), e
			},
			parseHtmlSnippet: function(t) {
				var e = ['<div style="box-sizing: content-box;width:{width}px;height:{height}px;position:relative;margin:0 auto;">', "{closeBtnHtml}", "{iframeHtml}", "</div>"].join("");
				return this.lang.template(e, t)
			},
			decorateContainer: function(t, e) {
				if (t) {
					var i = t.style;
					i.cssText = ["box-sizing: content-box;", "text-align:center;", "display:block;", "font-size:0;", "width:100%;", "height:" + e.height + "px;"].join("")
				}
			},
			validate: function(t) {
				return !0
			},
			render: function(t) {
				if (this.slot.setStatus(t.id, this.config.STATUS_RENDERED), this.validate(t)) {
					if (!this.slot.adInfoIsAvailable(t)) return !1;
					this.monitor.sendLog(t), t.displayType = "inlay-mobile";
					var e = this.dom.g(t.containerId);
					if (e) {
						this.monitor.sendLog(t);
						var i = this.richMaterial.render(t),
							n = this;
						if (i) return void(this.supportPostMessage && setTimeout(function() {
							n.expand.fire("adloaded", t.id)
						}, 800));
						this.landingPage.activate(t);
						var o = this.processSlotInfo(t);
						if (this.decorateContainer(e, o), t.width = o.width, t.height = o.height, 2 === o.sizeType) {
							var r = t.response.pdb_deliv.deliv_des;
							if (r && r._html) {
								r = r._html;
								var s = r.type;
								("text" === s || "image" === s || "flash" === s) && (r.width = t.width, r.height = t.height)
							}
						}
						var a = {
								id: t.id,
								width: o.width,
								height: o.height,
								closeBtnHtml: "",
								iframeHtml: this.frame.getFrameHTML(t)
							},
							l = this.parseHtmlSnippet(a);
						e.innerHTML = l, t.isPdbAd || this.slot.setStatus(t.id, this.config.STATUS_FINISH)
					}
				}
			}
		}), t.define({
			name: "float",
			namespace: "dup.ui.painter.mobile",
			deps: {
				config: "dup.common.config",
				lang: "dup.common.utility.lang",
				style: "dup.common.utility.style",
				dom: "dup.common.utility.dom",
				cookie: "dup.common.utility.cookie",
				slot: "dup.business.slot",
				frame: "dup.business.frame",
				monitor: "dup.business.monitor",
				richMaterial: "dup.ui.painter.richMaterial",
				painter: "dup.ui.painter.mobile.inlayFix",
				hiddenFloatAd: "dup.ui.painter.hiddenFloatAd"
			},
			$inlayFix: function() {
				this.win = window
			},
			processSlotInfo: function(t) {
				var e = t.response.placement,
					i = e.container,
					n = e.fillstyle,
					o = parseFloat(n.opacity || .9),
					r = n.backgroundColor || "#000",
					s = this.painter.processSlotInfo(t);
				s.backgroundOpacity = o, s.backgroundColor = r;
				var a = i.location;
				return 2 !== a && 3 !== a && (a = 3), s.locationType = a, s.containerId = t.containerId, s.closeType = i.closeType, s
			},
			parseHtmlSnippet: function(t) {
				var e = ['<div style="width:{width}px;height:{height}px;position:relative;margin:0 auto;">', "{closeBtnHtml}", "{iframeHtml}", "</div>"].join("");
				return this.lang.template(e, t)
			},
			parseCloseBtnLayoutData: function(t) {
				var e = 40,
					i = 40,
					n = 0,
					o = "",
					r = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
				e = r * (1 / 8), i = .4 * e, n = 16 * (e / 50);
				var s = 0;
				2 === t.locationType ? (o = 4, s = t.height) : 3 === t.locationType && (o = 3, s = "-" + i);
				var a = {
					domId: t.containerId,
					right: n,
					top: s,
					closeBtnWidth: "" + e,
					closeBtnHeight: i,
					closeBtnImgUrl: "http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.0/xuantingClose" + o + ".png"
				};
				return a
			},
			parseCloseButtonHtml: function(t) {
				var e = ["<div", ' id="{domId}_closebtn"', ' style="', "box-sizing: content-box;", "position:absolute;", "right:0px;", "top:{top}px;", "width:{closeBtnWidth}px;", "height:{closeBtnHeight}px;", "overflow:hidden;", "display:block;", "background:url('{closeBtnImgUrl}') no-repeat 0 0;", "_filter:progid:DXImageTransform.", "Microsoft.AlphaImageLoader(", "enabled=true,", " sizingMethod=none,", " src='{closeBtnImgUrl}');", "_background:none;", "cursor:pointer;", "background-position:center;", "background-size:100% 100%;", 'z-index:2147483647;">&nbsp;</div>'].join(""),
					i = this.parseCloseBtnLayoutData(t);
				return this.lang.template(e, i)
			},
			decorateContainer: function(t, e) {
				if (t) {
					var i = "absolute";
					this.style.canFixed() && (i = "fixed");
					var n = "";
					2 === e.locationType ? n = "top" : 3 === e.locationType && (n = "bottom");
					var o = 0;
					"absolute" === i && (o = this.style.getScrollTop(window) + this.style.getClientHeight(window) - e.height);
					var r = t.style;
					r.cssText = ["box-sizing: content-box;", "position:" + i, "z-index:2147483647;", n + ":" + o, "background-color:" + e.backgroundColor, "opacity:" + e.backgroundOpacity, "text-align:center", "display:block", "font-size:0", "width:100%", "height:" + e.height + "px"].join(";")
				}
			},
			getCloseCookieKey: function(t) {
				return "bd_close_" + t.id
			},
			closeBtnOnClickHandler: function(t, e) {
				var i = this.dom.g(e.containerId);
				if (i && i.parentNode && i.parentNode.removeChild(i), 2 === e.closeType) {
					var n = "bd_close_" + this.id,
						o = {
							path: ""
						};
					this.cookie.set(n, !0, o)
				}
			},
			validate: function(t) {
				var e = "bd_close_" + this.id,
					i = this.cookie.get(e, window);
				return 2 === t.closeType && i ? !1 : !0
			},
			render: function(e) {
				if (!this.slot.adInfoIsAvailable(e)) return !1;
				this.slot.setStatus(e.id, this.config.STATUS_RENDERED), this.id = e.id, e.displayType = "inlay-mobile";
				var i = this.processSlotInfo(e);
				if (this.validate(i)) {
					this.monitor.sendLog(e);
					var n = this.richMaterial.render(e);
					if (!n) {
						var o = this.dom.g(e.containerId);
						if (o) {
							this.decorateContainer(o, i), e.width = i.width, e.height = i.height;
							var r = this.parseCloseButtonHtml(i);
							if (2 === i.sizeType) {
								var s = e.response.pdb_deliv.deliv_des;
								if (s && s._html) {
									s = s._html;
									var a = s.type;
									("text" === a || "image" === a || "flash" === a) && (s.width = e.width, s.height = e.height)
								}
							}
							var l = {
									id: e.id,
									width: i.width,
									height: i.height,
									closeBtnHtml: r,
									iframeHtml: this.frame.getFrameHTML(e)
								},
								d = this.parseHtmlSnippet(l);
							document.body.insertBefore(o, document.body.firstChild), o.innerHTML = d;
							var c = this.dom.g(e.containerId + "_closebtn");
							c && this.dom.bind(c, "click", t.proxy(this, this.closeBtnOnClickHandler, e)), this.hiddenFloatAd.activate(e), e.isPdbAd || this.slot.setStatus(e.id, this.config.STATUS_FINISH)
						}
					}
				}
			}
		}), t.define({
			name: "clbDelivery",
			namespace: "dup.business.delivery",
			deps: {
				slot: "dup.business.slot",
				frame: "dup.business.frame",
				"interface": "dup.business.interface",
				config: "dup.common.config",
				log: "dup.common.utility.log",
				origentation: "dup.business.origentation",
				data: "dup.common.utility.data"
			},
			clbSlotArr: {
				BAIDU_CLB_fillSlot: !0,
				BAIDU_CLB_singleFillSlot: !0,
				BAIDU_CLB_fillSlotWithSize: !0,
				BAIDU_CLB_fillSlotAsync: !0,
				BAIDU_CLB_preloadSlots: !0
			},
			launch: function() {
				var e;
				try {
					var i = window.BAIDU_CLB_SLOT_ID;
					window.BAIDU_CLB_SLOT_ID = null, i && (e = this.slot.createSlot({
						slotId: i,
						productLine: "clb",
						isAsync: !1
					}), this.slot.addSlot(e), this.slot.process());
					for (var n in this.clbSlotArr) "BAIDU_CLB_preloadSlots" === n ? this.data.defineOnce(n, t.proxy(this, this.reSet)) : this.data.defineOnce(n, t.proxy(this, this.getClbFillSlot));
					this.updateApi()
				} catch (o) {
					this.log.monitorLog({
						error: "loadjs",
						status: "loadFail"
					})
				}
			},
			reSet: function() {},
			getClbFillSlot: function(t, e) {
				var i;
				t && !e && (i = this.slot.createSlot({
					slotId: t,
					productLine: "clb",
					isAsync: !1
				})), t && e && (i = this.slot.createSlot({
					slotId: t,
					productLine: "clb",
					isAsync: !0
				}), i.containerId = e), this.slot.addSlot(i), this.slot.process()
			},
			updateApi: function() {
				try {
					this.data.defineOnce("BAIDU_CLB_prepareMoveSlot", t.proxy(this, this.prepareMove)), this.data.defineOnce("BAIDU_DUP_addSlotStatusCallback", t.proxy(this.origentation, this.origentation.addSlotStatusCallback)), this.data.defineOnce(this.config.DUP_PREFIX + "renderFrame", t.proxy(this.frame, this.frame.renderFrame)), this.data.defineOnce("BAIDU_CLB_setConfig", t.proxy(this.data, this.data.putConfig)), this.data.defineOnce("BAIDU_CLB_addOrientation", t.proxy(this.origentation, this.origentation.addOrientation)), this.data.defineOnce("BAIDU_CLB_addOrientationOnce", t.proxy(this.origentation, this.origentation.addOrientationOnce)), this.data.defineOnce("BAIDU_CLB_setOrientationOnce", t.proxy(this.origentation, this.origentation.setOrientationOnce)), this.data.defineOnce("BAIDU_CLB_addSlot", t.proxy(this, this.reSet)), this.data.defineOnce("BAIDU_CLB_enableAllSlots", t.proxy(this, this.reSet)), this.data.defineOnce("BAIDU_CLB_SETHTMLSLOT", t.proxy(this, this.reSet))
				} catch (e) {
					this.log.monitorLog({
						error: "updateApi",
						status: "loadFail"
					})
				}
			},
			prepareMove: function(t) {
				try {
					for (var e = 0, i = t + "_" + e; this.slot.getSlotInfo(i) && 0 !== this.slot.getSlotInfo(i)[0];) {
						var n = this.slot.getSlotInfo(i);
						this.slot.clearStatus(n, this.config.STATUS_FINISH), i = t + "_" + ++e
					}
				} catch (o) {
					this.log.monitorLog({
						id: t,
						error: "prepareLoad",
						status: "renderFail"
					})
				}
			}
		}), t.define({
			name: "inlayFix",
			namespace: "dup.ui.painter",
			deps: {
				config: "dup.common.config",
				dom: "dup.common.utility.dom",
				slot: "dup.business.slot",
				frame: "dup.business.frame",
				viewWatch: "dup.business.viewWatch",
				richMaterial: "dup.ui.painter.richMaterial",
				monitor: "dup.business.monitor",
				expand: "dup.ui.painter.expand",
				event: "dup.common.utility.event",
				lang: "dup.common.utility.lang",
				browser: "dup.common.utility.browser",
				deliveryLimit: "dup.business.deliveryLimit"
			},
			$inlayFix: function() {
				this.supportPostMessage = this.browser.ie && this.browser.ie < 8 ? !1 : !0
			},
			bindEvent4Expand: function(t) {
				var e = this.dom.g(t.containerId),
					i = this;
				this.event.bind(e, "mouseover", function(e) {
					var n = e.target || e.srcElement;
					("iframe" === n.tagName.toLowerCase() || "iframe" === n.nodeName.toLowerCase()) && i.expand.fire("mouseover", t.id)
				})
			},
			validate: function(t) {
				var e = this.deliveryLimit.getSlotType(t),
					i = this.deliveryLimit.validate(t);
				return i && this.deliveryLimit.setAdsCount(e, t.containerId), i
			},
			render: function(t) {
				this.slot.setStatus(t.id, this.config.STATUS_RENDERED);
				var e = this.dom.g(t.containerId);
				if (!this.slot.adInfoIsAvailable(t)) return this.slot.setStatus(t.id, this.config.STATUS_FINISH), !1;
				t.displayType = "inlay";
				var i = null == t.response ? null : t.response.placement.container.slide,
					n = i && !this.lang.isEmptyObj(i) && this.supportPostMessage ? !0 : !1;
				if (n && (this.expand.observer(t), this.bindEvent4Expand(t)), this.validate(t)) {
					this.monitor.sendLog(t);
					var o = this.richMaterial.render(t),
						r = this;
					if (o) return void(this.supportPostMessage && setTimeout(function() {
						r.expand.fire("adloaded", t.id)
					}, 800));
					if (!e) return void this.slot.addErrorInfo(t, "container dom not founded");
					var s = this.frame.getFrameHTML(t);
					e.innerHTML = s, this.viewWatch.regisetViewWatch(t), t.isPdbAd || this.slot.setStatus(t.id, this.config.STATUS_FINISH), n && setTimeout(function() {
						r.expand.fire("adloaded", t.id)
					}, 800)
				}
			}
		}), t.define({
			name: "float",
			namespace: "dup.ui.painter",
			deps: {
				config: "dup.common.config",
				dom: "dup.common.utility.dom",
				lang: "dup.common.utility.lang",
				frame: "dup.business.frame",
				slot: "dup.business.slot",
				richMaterial: "dup.ui.painter.richMaterial",
				monitor: "dup.business.monitor",
				floatBlock: "dup.ui.painter.floatBlock",
				viewWatch: "dup.business.viewWatch"
			},
			GAP: 5,
			NORMAL_CLOSE_BTN_HEIGHT: 17,
			COUPLET_CLOSE_BTN_HEIGHT: 20,
			validate: function(t) {
				var e = t.response.placement,
					i = e.container,
					n = i.floated;
				if (this.dom.isInIframe(window)) return !1;
				var o = parseInt(n.clientw || 0, 10);
				return o > 4095 && (o = 4095), o >= screen.width ? !1 : !0
			},
			processSlotInfo: function(t) {
				var e = t.response.placement,
					i = e.container,
					n = i.floated,
					o = n.dockType,
					r = i.closeType,
					s = i.closeTime || 0,
					a = n.vspace || 0,
					l = n.hspace || 0,
					d = t.response.rtb_deliv.deliv_id && t.response.order_deliv.deliv_id,
					c = t.width || i.width,
					h = t.height || i.height,
					u = +c,
					p = +h,
					m = ["default", "couplet", "button", "popup"],
					f = parseInt(n.blockType || 0, 10),
					g = m[f];
				"default" !== g && (u += 2 * this.GAP + 1, p += 2 * this.GAP + 1), p += "couplet" === g ? this.COUPLET_CLOSE_BTN_HEIGHT : "button" === g || "popup" === g ? this.COUPLET_CLOSE_BTN_HEIGHT + this.GAP : this.NORMAL_CLOSE_BTN_HEIGHT;
				var y = i.location,
					v = "",
					w = "";
				switch (y) {
					case 1:
						v = "center", w = "center";
						break;
					case 2:
						v = "top";
						break;
					case 3:
						v = "bottom";
						break;
					case 4:
						w = "left";
						break;
					case 5:
						w = "right";
						break;
					case 7:
						v = "top", w = "left";
						break;
					case 8:
						v = "top", w = "right";
						break;
					case 9:
						v = "bottom", w = "left";
						break;
					case 10:
						v = "bottom", w = "right"
				}
				0 === a && "button" === g ? (v = "bottom", a = 40) : 0 === a && "couplet" === g && (v = "top", a = 150);
				var b = t.response.queryid,
					I = {
						id: t.id,
						domId: t.containerId,
						width: c,
						height: h,
						containerWidth: u,
						containerHeight: p,
						verticalType: v,
						horizontalType: w,
						followType: n.follow || 1,
						blockType: g,
						dockType: o,
						closeType: r,
						closeTime: s,
						vSpace: a,
						hSpace: l,
						contentWidth: n.contw,
						isRTB: d,
						queryId: b,
						productLine: t.productLine
					};
				return I
			},
			render: function(e) {
				if (this.validate(e)) {
					if (this.slot.setStatus(e.id, this.config.STATUS_RENDERED), !this.slot.adInfoIsAvailable(e)) return !1;
					e.displayType = "float", this.monitor.sendLog(e);
					var i = this.richMaterial.render(e);
					if (!i) {
						var n = [];
						n.push(e);
						var o = e.response.placement,
							r = o.container,
							s = parseInt(r.location || 0, 10);
						if (6 === s) {
							var a = this.slot.cloneSlot(e);
							a.response.placement.container.location = 5, a.containerId = a.containerId + "_right", this.slot.addSlot(a), n.push(a), e.response.placement.container.location = 4, e.containerId = e.containerId + "_left"
						}
						for (var l = 0, d = n.length; d > l; l++) {
							var c = n[l],
								h = t.create(this.floatBlock);
							h.render(this.processSlotInfo(c), c)
						}
						this.viewWatch.regisetViewWatch(e)
					}
				}
			}
		}), t.define({
			name: "standardDelivery",
			namespace: "dup.business.delivery",
			deps: {
				config: "dup.common.config",
				slot: "dup.business.slot",
				"interface": "dup.business.interface",
				param: "dup.business.param",
				data: "dup.common.utility.data",
				additionalParam: "dup.business.parameter.additionalParam",
				inlayFixPainter: "dup.ui.painter.inlayFix"
			},
			launch: function() {
				this.delieveryObjArray = this.delieveryObjArray || [], window.slotbydup = window.slotbydup || [], window.slotbydup && window.slotbydup instanceof Array && (this.delieveryObjArray = this.delieveryObjArray.concat(window.slotbydup), window.slotbydup = []), this.updateApi(), this.process()
			},
			process: function() {
				for (var t, e = 0, i = this.delieveryObjArray.length; i > e; e++) {
					var n = this.delieveryObjArray[e];
					if (n.hasOwnProperty("id")) {
						var o = !1;
						if (n.hasOwnProperty("isAsync") && n.isAsync ? o = n.isAsync : n.hasOwnProperty("async") && n.async && (o = n.async), t = this.slot.createSlot({
								slotId: n.id,
								productLine: "adcodex",
								isAsync: o
							}), this.additionalParam.paramCheck(t, n), t.containerId = n.container || t.containerId, t.display = n.display, t.size = n.size || "", !t.styleOpenApi.cpro_w && !t.styleOpenApi.cpro_h) {
							var r, s = n.size;
							if (s && s.indexOf(":") > -1) {
								r = s.split(":");
								var a = this.param.translateScaleToPixelSize(parseInt(r[0] || 0, 10), parseInt(r[1] || 0, 10));
								t.width = a.width, t.height = a.height
							}
						}
						this.slot.addSlot(t);
						var l = "cpro_set_baiduRec_jsonpCb";
						if (n[l] && n.hasOwnProperty(l) && this.data.putInfo("baiduRecCallback", n.cpro_set_baiduRec_jsonpCb || ""), "union" === t.productLine && "inlay-fix" === t.display && t.status < this.config.STATUS_REQUEST) {
							if (!t.styleOpenApi.cpro_w && !t.styleOpenApi.cpro_h) {
								var r, s = n.size;
								s && s.indexOf(",") > -1 && (r = s.split(","), t.width = parseInt(r[0] || 0, 10), t.height = parseInt(r[1] || 0, 10))
							}
							this.slot.setStatus(t.id, this.config.STATUS_REQUEST), t.paramObj = this.param.getParamObj(t), this.inlayFixPainter.render(t)
						}
					} else this["interface"].executeTask(n)
				}
				this.delieveryObjArray = [], this.slot.process()
			},
			updateApi: function() {
				window.slotbydup = this, window.slotbydup.load = !0
			},
			push: function(t) {
				this.delieveryObjArray = this.delieveryObjArray && [], this.delieveryObjArray.push(t), this.process()
			}
		}), t.define({
			name: "main",
			namespace: "dup.ui.delivery",
			deps: {
				config: "dup.common.config",
				slot: "dup.business.slot",
				fingerPrint: "dup.business.fingerPrint",
				data: "dup.common.utility.data",
				loader: "dup.common.loader",
				painterSelector: "dup.business.painterSelector",
				origentation: "dup.business.origentation",
				param: "dup.business.param",
				detect: "dup.business.detect",
				"interface": "dup.business.interface",
				clbDelivery: "dup.business.delivery.clbDelivery",
				unionDelivery: "dup.business.delivery.unionDelivery",
				dupDelivery: "dup.business.delivery.dupDelivery",
				standardDelivery: "dup.business.delivery.standardDelivery",
				baiduRec: "dup.ui.painter.baiduRec",
				inlayFixPainter: "dup.ui.painter.inlayFix",
				dynamicFloatPainter: "dup.ui.painter.dynamicFloat",
				floatPainter: "dup.ui.painter.float",
				mobileInlayFixPainter: "dup.ui.painter.mobile.inlayFix",
				mobileFloatPainter: "dup.ui.painter.mobile.float"
			},
			process: function() {
				this.prepareApi(), r && this.unionDelivery.launch(), s && this.dupDelivery.launch(), o && this.clbDelivery.launch(), a && this.standardDelivery.launch(), this.fingerPrint.start()
			},
			prepareApi: function() {
				this["interface"].register("addOrientation", this.origentation, this.origentation.addOrientation), this["interface"].register("addOrientationOnce", this.origentation, this.origentation.addOrientationOnce), this["interface"].register("setOrientationOnce", this.origentation, this.origentation.setOrientationOnce), this.data.defineOnce(this.config.LOADER_DEFINE_NAME, t.proxy(this, this.callback))
			},
			callback: function(e) {
				var i = this.slot.getSlotInfo(e.tuid);
				i.response = e, this.slot.setStatus(i.id, this.config.STATUS_RESPONSE), this.slot.processSlot(i), i.timestampWatcher.t3 = +new Date, this.param.processExtendsParam(i);
				var n = this.painterSelector.getPainter(i),
					o = t.using(n);
				o ? o.render(i) : n && this.loader.load(i.id, n, t.proxy(this, this.painterLoadedCallback, n, i))
			},
			painterLoadedCallback: function(e, i) {
				var n = t.using(e);
				n && n.render(i)
			}
		});
		var l = t.using("dup.ui.delivery.main");
		l.process()
	}(_ssp_global.oojs);