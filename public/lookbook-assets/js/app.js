(() => {
  function e(e) {
    return e && e.__esModule ? e.default : e;
  }
  class t {
    constructor(e) {
      (this.children = []), (this.parent = e);
    }
    delete(e) {
      const t = this.children.indexOf(e);
      return (
        -1 !== t &&
        ((this.children = this.children
          .slice(0, t)
          .concat(this.children.slice(t + 1))),
        0 === this.children.length && this.parent.delete(this),
        !0)
      );
    }
    add(e) {
      return this.children.push(e), this;
    }
  }
  class n {
    constructor(e) {
      (this.parent = null), (this.children = {}), (this.parent = e || null);
    }
    get(e) {
      return this.children[e];
    }
    insert(e) {
      let i = this;
      for (let r = 0; r < e.length; r += 1) {
        const o = e[r];
        let s = i.get(o);
        if (r === e.length - 1)
          return (
            s instanceof n && (i.delete(s), (s = null)),
            s || ((s = new t(i)), (i.children[o] = s)),
            s
          );
        s instanceof t && (s = null),
          s || ((s = new n(i)), (i.children[o] = s)),
          (i = s);
      }
      return i;
    }
    delete(e) {
      for (const t in this.children) {
        if (this.children[t] === e) {
          const e = delete this.children[t];
          return (
            0 === Object.keys(this.children).length &&
              this.parent &&
              this.parent.delete(this),
            e
          );
        }
      }
      return !1;
    }
  }
  function i(e) {
    if (!(e instanceof HTMLElement)) return !1;
    const t = e.nodeName.toLowerCase(),
      n = (e.getAttribute("type") || "").toLowerCase();
    return (
      "select" === t ||
      "textarea" === t ||
      ("input" === t &&
        "submit" !== n &&
        "reset" !== n &&
        "checkbox" !== n &&
        "radio" !== n) ||
      e.isContentEditable
    );
  }
  function r(e) {
    const t =
      e.code.startsWith("Key") && e.shiftKey && e.key.toUpperCase() === e.key;
    return `${e.ctrlKey ? "Control+" : ""}${e.altKey ? "Alt+" : ""}${
      e.metaKey ? "Meta+" : ""
    }${e.shiftKey && !t ? "Shift+" : ""}${e.key}`;
  }
  const o = new n(),
    s = new WeakMap();
  let a = o,
    c = null,
    u = [];
  function l() {
    (u = []), (c = null), (a = o);
  }
  function f(e) {
    if (e.defaultPrevented) return;
    if (!(e.target instanceof Node)) return;
    if (i(e.target)) {
      const t = e.target;
      if (!t.id) return;
      if (!t.ownerDocument.querySelector(`[data-hotkey-scope="${t.id}"]`))
        return;
    }
    null != c && window.clearTimeout(c), (c = window.setTimeout(l, 1500));
    const n = a.get(r(e));
    if (n) {
      if ((u.push(r(e)), (a = n), n instanceof t)) {
        const t = e.target;
        let r,
          o = !1;
        const s = i(t);
        for (let e = n.children.length - 1; e >= 0; e -= 1) {
          r = n.children[e];
          const i = r.getAttribute("data-hotkey-scope");
          if ((!s && !i) || (s && t.id === i)) {
            o = !0;
            break;
          }
        }
        r &&
          o &&
          (!(function (e, t) {
            const n = new CustomEvent("hotkey-fire", {
              cancelable: !0,
              detail: { path: t },
            });
            !e.dispatchEvent(n) || (i(e) ? e.focus() : e.click());
          })(r, u),
          e.preventDefault()),
          l();
      }
    } else l();
  }
  function d(e, t) {
    0 === Object.keys(o.children).length &&
      document.addEventListener("keydown", f);
    const n = (t || e.getAttribute("data-hotkey") || "")
      .split(",")
      .map((e) => e.split(" "))
      .map((t) => o.insert(t).add(e));
    s.set(e, n);
  }
  var p,
    h,
    m,
    g,
    v = !1,
    y = !1,
    b = [];
  function w(e) {
    !(function (e) {
      b.includes(e) || b.push(e);
      y || v || ((v = !0), queueMicrotask(_));
    })(e);
  }
  function x(e) {
    let t = b.indexOf(e);
    -1 !== t && b.splice(t, 1);
  }
  function _() {
    (v = !1), (y = !0);
    for (let e = 0; e < b.length; e++) b[e]();
    (b.length = 0), (y = !1);
  }
  var O = !0;
  function E(e) {
    h = e;
  }
  var k = [],
    S = [],
    A = [];
  function T(e, t) {
    "function" == typeof t
      ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t))
      : ((t = e), S.push(t));
  }
  function C(e, t) {
    e._x_attributeCleanups &&
      Object.entries(e._x_attributeCleanups).forEach(([n, i]) => {
        (void 0 === t || t.includes(n)) &&
          (i.forEach((e) => e()), delete e._x_attributeCleanups[n]);
      });
  }
  var M = new MutationObserver(I),
    j = !1;
  function L() {
    M.observe(document, {
      subtree: !0,
      childList: !0,
      attributes: !0,
      attributeOldValue: !0,
    }),
      (j = !0);
  }
  function P() {
    (D = D.concat(M.takeRecords())).length &&
      !R &&
      ((R = !0),
      queueMicrotask(() => {
        I(D), (D.length = 0), (R = !1);
      })),
      M.disconnect(),
      (j = !1);
  }
  var D = [],
    R = !1;
  function W(e) {
    if (!j) return e();
    P();
    let t = e();
    return L(), t;
  }
  var z = !1,
    $ = [];
  function I(e) {
    if (z) return void ($ = $.concat(e));
    let t = [],
      n = [],
      i = new Map(),
      r = new Map();
    for (let o = 0; o < e.length; o++)
      if (
        !e[o].target._x_ignoreMutationObserver &&
        ("childList" === e[o].type &&
          (e[o].addedNodes.forEach((e) => 1 === e.nodeType && t.push(e)),
          e[o].removedNodes.forEach((e) => 1 === e.nodeType && n.push(e))),
        "attributes" === e[o].type)
      ) {
        let t = e[o].target,
          n = e[o].attributeName,
          s = e[o].oldValue,
          a = () => {
            i.has(t) || i.set(t, []),
              i.get(t).push({ name: n, value: t.getAttribute(n) });
          },
          c = () => {
            r.has(t) || r.set(t, []), r.get(t).push(n);
          };
        t.hasAttribute(n) && null === s
          ? a()
          : t.hasAttribute(n)
          ? (c(), a())
          : c();
      }
    r.forEach((e, t) => {
      C(t, e);
    }),
      i.forEach((e, t) => {
        k.forEach((n) => n(t, e));
      });
    for (let e of n)
      if (!t.includes(e) && (S.forEach((t) => t(e)), e._x_cleanups))
        for (; e._x_cleanups.length; ) e._x_cleanups.pop()();
    t.forEach((e) => {
      (e._x_ignoreSelf = !0), (e._x_ignore = !0);
    });
    for (let e of t)
      n.includes(e) ||
        (e.isConnected &&
          (delete e._x_ignoreSelf,
          delete e._x_ignore,
          A.forEach((t) => t(e)),
          (e._x_ignore = !0),
          (e._x_ignoreSelf = !0)));
    t.forEach((e) => {
      delete e._x_ignoreSelf, delete e._x_ignore;
    }),
      (t = null),
      (n = null),
      (i = null),
      (r = null);
  }
  function N(e) {
    return B(V(e));
  }
  function H(e, t, n) {
    return (
      (e._x_dataStack = [t, ...V(n || e)]),
      () => {
        e._x_dataStack = e._x_dataStack.filter((e) => e !== t);
      }
    );
  }
  function F(e, t) {
    let n = e._x_dataStack[0];
    Object.entries(t).forEach(([e, t]) => {
      n[e] = t;
    });
  }
  function V(e) {
    return e._x_dataStack
      ? e._x_dataStack
      : "function" == typeof ShadowRoot && e instanceof ShadowRoot
      ? V(e.host)
      : e.parentNode
      ? V(e.parentNode)
      : [];
  }
  function B(e) {
    let t = new Proxy(
      {},
      {
        ownKeys: () => Array.from(new Set(e.flatMap((e) => Object.keys(e)))),
        has: (t, n) => e.some((e) => e.hasOwnProperty(n)),
        get: (n, i) =>
          (e.find((e) => {
            if (e.hasOwnProperty(i)) {
              let n = Object.getOwnPropertyDescriptor(e, i);
              if (
                (n.get && n.get._x_alreadyBound) ||
                (n.set && n.set._x_alreadyBound)
              )
                return !0;
              if ((n.get || n.set) && n.enumerable) {
                let r = n.get,
                  o = n.set,
                  s = n;
                (r = r && r.bind(t)),
                  (o = o && o.bind(t)),
                  r && (r._x_alreadyBound = !0),
                  o && (o._x_alreadyBound = !0),
                  Object.defineProperty(e, i, { ...s, get: r, set: o });
              }
              return !0;
            }
            return !1;
          }) || {})[i],
        set: (t, n, i) => {
          let r = e.find((e) => e.hasOwnProperty(n));
          return r ? (r[n] = i) : (e[e.length - 1][n] = i), !0;
        },
      }
    );
    return t;
  }
  function q(e) {
    let t = (n, i = "") => {
      Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(
        ([r, { value: o, enumerable: s }]) => {
          if (!1 === s || void 0 === o) return;
          let a = "" === i ? r : `${i}.${r}`;
          var c;
          "object" == typeof o && null !== o && o._x_interceptor
            ? (n[r] = o.initialize(e, a, r))
            : "object" != typeof (c = o) ||
              Array.isArray(c) ||
              null === c ||
              o === n ||
              o instanceof Element ||
              t(o, a);
        }
      );
    };
    return t(e);
  }
  function G(e, t = () => {}) {
    let n = {
      initialValue: void 0,
      _x_interceptor: !0,
      initialize(t, n, i) {
        return e(
          this.initialValue,
          () =>
            (function (e, t) {
              return t.split(".").reduce((e, t) => e[t], e);
            })(t, n),
          (e) => U(t, n, e),
          n,
          i
        );
      },
    };
    return (
      t(n),
      (e) => {
        if ("object" == typeof e && null !== e && e._x_interceptor) {
          let t = n.initialize.bind(n);
          n.initialize = (i, r, o) => {
            let s = e.initialize(i, r, o);
            return (n.initialValue = s), t(i, r, o);
          };
        } else n.initialValue = e;
        return n;
      }
    );
  }
  function U(e, t, n) {
    if (("string" == typeof t && (t = t.split(".")), 1 !== t.length)) {
      if (0 === t.length) throw error;
      return e[t[0]] || (e[t[0]] = {}), U(e[t[0]], t.slice(1), n);
    }
    e[t[0]] = n;
  }
  var X = {};
  function Y(e, t) {
    X[e] = t;
  }
  function K(e, t) {
    return (
      Object.entries(X).forEach(([n, i]) => {
        Object.defineProperty(e, `$${n}`, {
          get() {
            let [e, n] = he(t);
            return (e = { interceptor: G, ...e }), T(t, n), i(t, e);
          },
          enumerable: !1,
        });
      }),
      e
    );
  }
  function J(e, t, n, ...i) {
    try {
      return n(...i);
    } catch (n) {
      Z(n, e, t);
    }
  }
  function Z(e, t, n) {
    Object.assign(e, { el: t, expression: n }),
      console.warn(
        `Alpine Expression Error: ${e.message}\n\n${
          n ? 'Expression: "' + n + '"\n\n' : ""
        }`,
        t
      ),
      setTimeout(() => {
        throw e;
      }, 0);
  }
  var Q = !0;
  function ee(e, t, n = {}) {
    let i;
    return te(e, t)((e) => (i = e), n), i;
  }
  function te(...e) {
    return ne(...e);
  }
  var ne = ie;
  function ie(e, t) {
    let n = {};
    K(n, e);
    let i = [n, ...V(e)];
    if ("function" == typeof t)
      return (function (e, t) {
        return (n = () => {}, { scope: i = {}, params: r = [] } = {}) => {
          oe(n, t.apply(B([i, ...e]), r));
        };
      })(i, t);
    let r = (function (e, t, n) {
      let i = (function (e, t) {
        if (re[e]) return re[e];
        let n = Object.getPrototypeOf(async function () {}).constructor,
          i =
            /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e)
              ? `(() => { ${e} })()`
              : e;
        let r = (() => {
          try {
            return new n(
              ["__self", "scope"],
              `with (scope) { __self.result = ${i} }; __self.finished = true; return __self.result;`
            );
          } catch (n) {
            return Z(n, t, e), Promise.resolve();
          }
        })();
        return (re[e] = r), r;
      })(t, n);
      return (r = () => {}, { scope: o = {}, params: s = [] } = {}) => {
        (i.result = void 0), (i.finished = !1);
        let a = B([o, ...e]);
        if ("function" == typeof i) {
          let e = i(i, a).catch((e) => Z(e, n, t));
          i.finished
            ? (oe(r, i.result, a, s, n), (i.result = void 0))
            : e
                .then((e) => {
                  oe(r, e, a, s, n);
                })
                .catch((e) => Z(e, n, t))
                .finally(() => (i.result = void 0));
        }
      };
    })(i, t, e);
    return J.bind(null, e, t, r);
  }
  var re = {};
  function oe(e, t, n, i, r) {
    if (Q && "function" == typeof t) {
      let o = t.apply(n, i);
      o instanceof Promise
        ? o.then((t) => oe(e, t, n, i)).catch((e) => Z(e, r, t))
        : e(o);
    } else e(t);
  }
  var se = "x-";
  function ae(e = "") {
    return se + e;
  }
  var ce = {};
  function ue(e, t) {
    ce[e] = t;
  }
  function le(e, t, n) {
    let i = {},
      r = Array.from(t)
        .map(ge((e, t) => (i[e] = t)))
        .filter(be)
        .map(
          (function (e, t) {
            return ({ name: n, value: i }) => {
              let r = n.match(we()),
                o = n.match(/:([a-zA-Z0-9\-:]+)/),
                s = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
                a = t || e[n] || n;
              return {
                type: r ? r[1] : null,
                value: o ? o[1] : null,
                modifiers: s.map((e) => e.replace(".", "")),
                expression: i,
                original: a,
              };
            };
          })(i, n)
        )
        .sort(Oe);
    return r.map((t) =>
      (function (e, t) {
        let n = () => {},
          i = ce[t.type] || n,
          [r, o] = he(e);
        !(function (e, t, n) {
          e._x_attributeCleanups || (e._x_attributeCleanups = {}),
            e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
            e._x_attributeCleanups[t].push(n);
        })(e, t.original, o);
        let s = () => {
          e._x_ignore ||
            e._x_ignoreSelf ||
            (i.inline && i.inline(e, t, r),
            (i = i.bind(i, e, t, r)),
            fe ? de.get(pe).push(i) : i());
        };
        return (s.runCleanups = o), s;
      })(e, t)
    );
  }
  var fe = !1,
    de = new Map(),
    pe = Symbol();
  function he(e) {
    let t = [],
      [n, i] = (function (e) {
        let t = () => {};
        return [
          (n) => {
            let i = h(n);
            return (
              e._x_effects ||
                ((e._x_effects = new Set()),
                (e._x_runEffects = () => {
                  e._x_effects.forEach((e) => e());
                })),
              e._x_effects.add(i),
              (t = () => {
                void 0 !== i && (e._x_effects.delete(i), m(i));
              }),
              i
            );
          },
          () => {
            t();
          },
        ];
      })(e);
    t.push(i);
    return [
      {
        Alpine: ot,
        effect: n,
        cleanup: (e) => t.push(e),
        evaluateLater: te.bind(te, e),
        evaluate: ee.bind(ee, e),
      },
      () => t.forEach((e) => e()),
    ];
  }
  var me = (e, t) => ({ name: n, value: i }) => (
    n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: i }
  );
  function ge(e = () => {}) {
    return ({ name: t, value: n }) => {
      let { name: i, value: r } = ve.reduce((e, t) => t(e), {
        name: t,
        value: n,
      });
      return i !== t && e(i, t), { name: i, value: r };
    };
  }
  var ve = [];
  function ye(e) {
    ve.push(e);
  }
  function be({ name: e }) {
    return we().test(e);
  }
  var we = () => new RegExp(`^${se}([^:^.]+)\\b`);
  var xe = "DEFAULT",
    _e = [
      "ignore",
      "ref",
      "data",
      "id",
      "bind",
      "init",
      "for",
      "mask",
      "model",
      "modelable",
      "transition",
      "show",
      "if",
      xe,
      "teleport",
      "element",
    ];
  function Oe(e, t) {
    let n = -1 === _e.indexOf(e.type) ? xe : e.type,
      i = -1 === _e.indexOf(t.type) ? xe : t.type;
    return _e.indexOf(n) - _e.indexOf(i);
  }
  function Ee(e, t, n = {}) {
    e.dispatchEvent(
      new CustomEvent(t, {
        detail: n,
        bubbles: !0,
        composed: !0,
        cancelable: !0,
      })
    );
  }
  var ke = [],
    Se = !1;
  function Ae(e = () => {}) {
    return (
      queueMicrotask(() => {
        Se ||
          setTimeout(() => {
            Te();
          });
      }),
      new Promise((t) => {
        ke.push(() => {
          e(), t();
        });
      })
    );
  }
  function Te() {
    for (Se = !1; ke.length; ) ke.shift()();
  }
  function Ce(e, t) {
    if ("function" == typeof ShadowRoot && e instanceof ShadowRoot)
      return void Array.from(e.children).forEach((e) => Ce(e, t));
    let n = !1;
    if ((t(e, () => (n = !0)), n)) return;
    let i = e.firstElementChild;
    for (; i; ) Ce(i, t), (i = i.nextElementSibling);
  }
  function Me(e, ...t) {
    console.warn(`Alpine Warning: ${e}`, ...t);
  }
  var je = [],
    Le = [];
  function Pe() {
    return je.map((e) => e());
  }
  function De() {
    return je.concat(Le).map((e) => e());
  }
  function Re(e) {
    je.push(e);
  }
  function We(e) {
    Le.push(e);
  }
  function ze(e, t = !1) {
    return $e(e, (e) => {
      if ((t ? De() : Pe()).some((t) => e.matches(t))) return !0;
    });
  }
  function $e(e, t) {
    if (e) {
      if (t(e)) return e;
      if ((e._x_teleportBack && (e = e._x_teleportBack), e.parentElement))
        return $e(e.parentElement, t);
    }
  }
  function Ie(e, t = Ce) {
    !(function (e) {
      fe = !0;
      let t = Symbol();
      (pe = t), de.set(t, []);
      let n = () => {
        for (; de.get(t).length; ) de.get(t).shift()();
        de.delete(t);
      };
      e(n), (fe = !1), n();
    })(() => {
      t(e, (e, t) => {
        le(e, e.attributes).forEach((e) => e()), e._x_ignore && t();
      });
    });
  }
  function Ne(e, t) {
    return Array.isArray(t)
      ? He(e, t.join(" "))
      : "object" == typeof t && null !== t
      ? (function (e, t) {
          let n = (e) => e.split(" ").filter(Boolean),
            i = Object.entries(t)
              .flatMap(([e, t]) => !!t && n(e))
              .filter(Boolean),
            r = Object.entries(t)
              .flatMap(([e, t]) => !t && n(e))
              .filter(Boolean),
            o = [],
            s = [];
          return (
            r.forEach((t) => {
              e.classList.contains(t) && (e.classList.remove(t), s.push(t));
            }),
            i.forEach((t) => {
              e.classList.contains(t) || (e.classList.add(t), o.push(t));
            }),
            () => {
              s.forEach((t) => e.classList.add(t)),
                o.forEach((t) => e.classList.remove(t));
            }
          );
        })(e, t)
      : "function" == typeof t
      ? Ne(e, t())
      : He(e, t);
  }
  function He(e, t) {
    return (
      (t = !0 === t ? (t = "") : t || ""),
      (n = t
        .split(" ")
        .filter((t) => !e.classList.contains(t))
        .filter(Boolean)),
      e.classList.add(...n),
      () => {
        e.classList.remove(...n);
      }
    );
    var n;
  }
  function Fe(e, t) {
    return "object" == typeof t && null !== t
      ? (function (e, t) {
          let n = {};
          return (
            Object.entries(t).forEach(([t, i]) => {
              (n[t] = e.style[t]),
                t.startsWith("--") ||
                  (t = t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()),
                e.style.setProperty(t, i);
            }),
            setTimeout(() => {
              0 === e.style.length && e.removeAttribute("style");
            }),
            () => {
              Fe(e, n);
            }
          );
        })(e, t)
      : (function (e, t) {
          let n = e.getAttribute("style", t);
          return (
            e.setAttribute("style", t),
            () => {
              e.setAttribute("style", n || "");
            }
          );
        })(e, t);
  }
  function Ve(e, t = () => {}) {
    let n = !1;
    return function () {
      n ? t.apply(this, arguments) : ((n = !0), e.apply(this, arguments));
    };
  }
  function Be(e, t, n = {}) {
    e._x_transition ||
      (e._x_transition = {
        enter: { during: n, start: n, end: n },
        leave: { during: n, start: n, end: n },
        in(n = () => {}, i = () => {}) {
          Ge(
            e,
            t,
            {
              during: this.enter.during,
              start: this.enter.start,
              end: this.enter.end,
            },
            n,
            i
          );
        },
        out(n = () => {}, i = () => {}) {
          Ge(
            e,
            t,
            {
              during: this.leave.during,
              start: this.leave.start,
              end: this.leave.end,
            },
            n,
            i
          );
        },
      });
  }
  function qe(e) {
    let t = e.parentNode;
    if (t) return t._x_hidePromise ? t : qe(t);
  }
  function Ge(
    e,
    t,
    { during: n, start: i, end: r } = {},
    o = () => {},
    s = () => {}
  ) {
    if (
      (e._x_transitioning && e._x_transitioning.cancel(),
      0 === Object.keys(n).length &&
        0 === Object.keys(i).length &&
        0 === Object.keys(r).length)
    )
      return o(), void s();
    let a, c, u;
    !(function (e, t) {
      let n,
        i,
        r,
        o = Ve(() => {
          W(() => {
            (n = !0),
              i || t.before(),
              r || (t.end(), Te()),
              t.after(),
              e.isConnected && t.cleanup(),
              delete e._x_transitioning;
          });
        });
      (e._x_transitioning = {
        beforeCancels: [],
        beforeCancel(e) {
          this.beforeCancels.push(e);
        },
        cancel: Ve(function () {
          for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
          o();
        }),
        finish: o,
      }),
        W(() => {
          t.start(), t.during();
        }),
        (Se = !0),
        requestAnimationFrame(() => {
          if (n) return;
          let o =
              1e3 *
              Number(
                getComputedStyle(e)
                  .transitionDuration.replace(/,.*/, "")
                  .replace("s", "")
              ),
            s =
              1e3 *
              Number(
                getComputedStyle(e)
                  .transitionDelay.replace(/,.*/, "")
                  .replace("s", "")
              );
          0 === o &&
            (o =
              1e3 *
              Number(getComputedStyle(e).animationDuration.replace("s", ""))),
            W(() => {
              t.before();
            }),
            (i = !0),
            requestAnimationFrame(() => {
              n ||
                (W(() => {
                  t.end();
                }),
                Te(),
                setTimeout(e._x_transitioning.finish, o + s),
                (r = !0));
            });
        });
    })(e, {
      start() {
        a = t(e, i);
      },
      during() {
        c = t(e, n);
      },
      before: o,
      end() {
        a(), (u = t(e, r));
      },
      after: s,
      cleanup() {
        c(), u();
      },
    });
  }
  function Ue(e, t, n) {
    if (-1 === e.indexOf(t)) return n;
    const i = e[e.indexOf(t) + 1];
    if (!i) return n;
    if ("scale" === t && isNaN(i)) return n;
    if ("duration" === t) {
      let e = i.match(/([0-9]+)ms/);
      if (e) return e[1];
    }
    return "origin" === t &&
      ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2])
      ? [i, e[e.indexOf(t) + 2]].join(" ")
      : i;
  }
  ue(
    "transition",
    (e, { value: t, modifiers: n, expression: i }, { evaluate: r }) => {
      "function" == typeof i && (i = r(i)),
        i
          ? (function (e, t, n) {
              Be(e, Ne, ""),
                {
                  enter: (t) => {
                    e._x_transition.enter.during = t;
                  },
                  "enter-start": (t) => {
                    e._x_transition.enter.start = t;
                  },
                  "enter-end": (t) => {
                    e._x_transition.enter.end = t;
                  },
                  leave: (t) => {
                    e._x_transition.leave.during = t;
                  },
                  "leave-start": (t) => {
                    e._x_transition.leave.start = t;
                  },
                  "leave-end": (t) => {
                    e._x_transition.leave.end = t;
                  },
                }[n](t);
            })(e, i, t)
          : (function (e, t, n) {
              Be(e, Fe);
              let i = !t.includes("in") && !t.includes("out") && !n,
                r = i || t.includes("in") || ["enter"].includes(n),
                o = i || t.includes("out") || ["leave"].includes(n);
              t.includes("in") &&
                !i &&
                (t = t.filter((e, n) => n < t.indexOf("out")));
              t.includes("out") &&
                !i &&
                (t = t.filter((e, n) => n > t.indexOf("out")));
              let s = !t.includes("opacity") && !t.includes("scale"),
                a = s || t.includes("opacity"),
                c = s || t.includes("scale"),
                u = a ? 0 : 1,
                l = c ? Ue(t, "scale", 95) / 100 : 1,
                f = Ue(t, "delay", 0),
                d = Ue(t, "origin", "center"),
                p = "opacity, transform",
                h = Ue(t, "duration", 150) / 1e3,
                m = Ue(t, "duration", 75) / 1e3,
                g = "cubic-bezier(0.4, 0.0, 0.2, 1)";
              r &&
                ((e._x_transition.enter.during = {
                  transformOrigin: d,
                  transitionDelay: f,
                  transitionProperty: p,
                  transitionDuration: `${h}s`,
                  transitionTimingFunction: g,
                }),
                (e._x_transition.enter.start = {
                  opacity: u,
                  transform: `scale(${l})`,
                }),
                (e._x_transition.enter.end = {
                  opacity: 1,
                  transform: "scale(1)",
                }));
              o &&
                ((e._x_transition.leave.during = {
                  transformOrigin: d,
                  transitionDelay: f,
                  transitionProperty: p,
                  transitionDuration: `${m}s`,
                  transitionTimingFunction: g,
                }),
                (e._x_transition.leave.start = {
                  opacity: 1,
                  transform: "scale(1)",
                }),
                (e._x_transition.leave.end = {
                  opacity: u,
                  transform: `scale(${l})`,
                }));
            })(e, n, t);
    }
  ),
    (window.Element.prototype._x_toggleAndCascadeWithTransitions = function (
      e,
      t,
      n,
      i
    ) {
      let r = () => {
        "visible" === document.visibilityState
          ? requestAnimationFrame(n)
          : setTimeout(n);
      };
      t
        ? e._x_transition && (e._x_transition.enter || e._x_transition.leave)
          ? e._x_transition.enter &&
            (Object.entries(e._x_transition.enter.during).length ||
              Object.entries(e._x_transition.enter.start).length ||
              Object.entries(e._x_transition.enter.end).length)
            ? e._x_transition.in(n)
            : r()
          : e._x_transition
          ? e._x_transition.in(n)
          : r()
        : ((e._x_hidePromise = e._x_transition
            ? new Promise((t, n) => {
                e._x_transition.out(
                  () => {},
                  () => t(i)
                ),
                  e._x_transitioning.beforeCancel(() =>
                    n({ isFromCancelledTransition: !0 })
                  );
              })
            : Promise.resolve(i)),
          queueMicrotask(() => {
            let t = qe(e);
            t
              ? (t._x_hideChildren || (t._x_hideChildren = []),
                t._x_hideChildren.push(e))
              : queueMicrotask(() => {
                  let t = (e) => {
                    let n = Promise.all([
                      e._x_hidePromise,
                      ...(e._x_hideChildren || []).map(t),
                    ]).then(([e]) => e());
                    return delete e._x_hidePromise, delete e._x_hideChildren, n;
                  };
                  t(e).catch((e) => {
                    if (!e.isFromCancelledTransition) throw e;
                  });
                });
          }));
    });
  var Xe = !1;
  function Ye(e, t = () => {}) {
    return (...n) => (Xe ? t(...n) : e(...n));
  }
  function Ke(e, t, n, i = []) {
    switch (
      (e._x_bindings || (e._x_bindings = p({})),
      (e._x_bindings[t] = n),
      (t = i.includes("camel")
        ? t.toLowerCase().replace(/-(\w)/g, (e, t) => t.toUpperCase())
        : t))
    ) {
      case "value":
        !(function (e, t) {
          if ("radio" === e.type)
            void 0 === e.attributes.value && (e.value = t),
              window.fromModel && (e.checked = Je(e.value, t));
          else if ("checkbox" === e.type)
            Number.isInteger(t)
              ? (e.value = t)
              : Number.isInteger(t) ||
                Array.isArray(t) ||
                "boolean" == typeof t ||
                [null, void 0].includes(t)
              ? Array.isArray(t)
                ? (e.checked = t.some((t) => Je(t, e.value)))
                : (e.checked = !!t)
              : (e.value = String(t));
          else if ("SELECT" === e.tagName)
            !(function (e, t) {
              const n = [].concat(t).map((e) => e + "");
              Array.from(e.options).forEach((e) => {
                e.selected = n.includes(e.value);
              });
            })(e, t);
          else {
            if (e.value === t) return;
            e.value = t;
          }
        })(e, n);
        break;
      case "style":
        !(function (e, t) {
          e._x_undoAddedStyles && e._x_undoAddedStyles();
          e._x_undoAddedStyles = Fe(e, t);
        })(e, n);
        break;
      case "class":
        !(function (e, t) {
          e._x_undoAddedClasses && e._x_undoAddedClasses();
          e._x_undoAddedClasses = Ne(e, t);
        })(e, n);
        break;
      default:
        !(function (e, t, n) {
          [null, void 0, !1].includes(n) &&
          (function (e) {
            return ![
              "aria-pressed",
              "aria-checked",
              "aria-expanded",
              "aria-selected",
            ].includes(e);
          })(t)
            ? e.removeAttribute(t)
            : (Ze(t) && (n = t),
              (function (e, t, n) {
                e.getAttribute(t) != n && e.setAttribute(t, n);
              })(e, t, n));
        })(e, t, n);
    }
  }
  function Je(e, t) {
    return e == t;
  }
  function Ze(e) {
    return [
      "disabled",
      "checked",
      "required",
      "readonly",
      "hidden",
      "open",
      "selected",
      "autofocus",
      "itemscope",
      "multiple",
      "novalidate",
      "allowfullscreen",
      "allowpaymentrequest",
      "formnovalidate",
      "autoplay",
      "controls",
      "loop",
      "muted",
      "playsinline",
      "default",
      "ismap",
      "reversed",
      "async",
      "defer",
      "nomodule",
    ].includes(e);
  }
  function Qe(e, t) {
    var n;
    return function () {
      var i = this,
        r = arguments,
        o = function () {
          (n = null), e.apply(i, r);
        };
      clearTimeout(n), (n = setTimeout(o, t));
    };
  }
  function et(e, t) {
    let n;
    return function () {
      let i = this,
        r = arguments;
      n || (e.apply(i, r), (n = !0), setTimeout(() => (n = !1), t));
    };
  }
  var tt = {},
    nt = !1;
  var it = {};
  var rt = {};
  var ot = {
    get reactive() {
      return p;
    },
    get release() {
      return m;
    },
    get effect() {
      return h;
    },
    get raw() {
      return g;
    },
    version: "3.10.0",
    flushAndStopDeferringMutations: function () {
      (z = !1), I($), ($ = []);
    },
    dontAutoEvaluateFunctions: function (e) {
      let t = Q;
      (Q = !1), e(), (Q = t);
    },
    disableEffectScheduling: function (e) {
      (O = !1), e(), (O = !0);
    },
    setReactivityEngine: function (e) {
      (p = e.reactive),
        (m = e.release),
        (h = (t) =>
          e.effect(t, {
            scheduler: (e) => {
              O ? w(e) : e();
            },
          })),
        (g = e.raw);
    },
    closestDataStack: V,
    skipDuringClone: Ye,
    addRootSelector: Re,
    addInitSelector: We,
    addScopeToNode: H,
    deferMutations: function () {
      z = !0;
    },
    mapAttributes: ye,
    evaluateLater: te,
    setEvaluator: function (e) {
      ne = e;
    },
    mergeProxies: B,
    findClosest: $e,
    closestRoot: ze,
    interceptor: G,
    transition: Ge,
    setStyles: Fe,
    mutateDom: W,
    directive: ue,
    throttle: et,
    debounce: Qe,
    evaluate: ee,
    initTree: Ie,
    nextTick: Ae,
    prefixed: ae,
    prefix: function (e) {
      se = e;
    },
    plugin: function (e) {
      e(ot);
    },
    magic: Y,
    store: function (e, t) {
      if ((nt || ((tt = p(tt)), (nt = !0)), void 0 === t)) return tt[e];
      (tt[e] = t),
        "object" == typeof t &&
          null !== t &&
          t.hasOwnProperty("init") &&
          "function" == typeof t.init &&
          tt[e].init(),
        q(tt[e]);
    },
    start: function () {
      var e;
      document.body ||
        Me(
          "Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"
        ),
        Ee(document, "alpine:init"),
        Ee(document, "alpine:initializing"),
        L(),
        (e = (e) => Ie(e, Ce)),
        A.push(e),
        T((e) => {
          Ce(e, (e) => C(e));
        }),
        (function (e) {
          k.push(e);
        })((e, t) => {
          le(e, t).forEach((e) => e());
        }),
        Array.from(document.querySelectorAll(De()))
          .filter((e) => !ze(e.parentElement, !0))
          .forEach((e) => {
            Ie(e);
          }),
        Ee(document, "alpine:initialized");
    },
    clone: function (e, t) {
      t._x_dataStack || (t._x_dataStack = e._x_dataStack),
        (Xe = !0),
        (function (e) {
          let t = h;
          E((e, n) => {
            let i = t(e);
            return m(i), () => {};
          }),
            e(),
            E(t);
        })(() => {
          !(function (e) {
            let t = !1;
            Ie(e, (e, n) => {
              Ce(e, (e, i) => {
                if (
                  t &&
                  (function (e) {
                    return Pe().some((t) => e.matches(t));
                  })(e)
                )
                  return i();
                (t = !0), n(e, i);
              });
            });
          })(t);
        }),
        (Xe = !1);
    },
    bound: function (e, t, n) {
      if (e._x_bindings && void 0 !== e._x_bindings[t]) return e._x_bindings[t];
      let i = e.getAttribute(t);
      return null === i
        ? "function" == typeof n
          ? n()
          : n
        : Ze(t)
        ? !![t, "true"].includes(i)
        : "" === i || i;
    },
    $data: N,
    data: function (e, t) {
      rt[e] = t;
    },
    bind: function (e, t) {
      it[e] = "function" != typeof t ? () => t : t;
    },
  };
  function st(e, t) {
    const n = Object.create(null),
      i = e.split(",");
    for (let e = 0; e < i.length; e++) n[i[e]] = !0;
    return t ? (e) => !!n[e.toLowerCase()] : (e) => !!n[e];
  }
  var at,
    ct = {},
    ut = Object.assign,
    lt = Object.prototype.hasOwnProperty,
    ft = (e, t) => lt.call(e, t),
    dt = Array.isArray,
    pt = (e) => "[object Map]" === vt(e),
    ht = (e) => "symbol" == typeof e,
    mt = (e) => null !== e && "object" == typeof e,
    gt = Object.prototype.toString,
    vt = (e) => gt.call(e),
    yt = (e) =>
      "string" == typeof e &&
      "NaN" !== e &&
      "-" !== e[0] &&
      "" + parseInt(e, 10) === e,
    bt = (e) => {
      const t = Object.create(null);
      return (n) => t[n] || (t[n] = e(n));
    },
    wt = /-(\w)/g,
    xt =
      (bt((e) => e.replace(wt, (e, t) => (t ? t.toUpperCase() : ""))),
      /\B([A-Z])/g),
    _t =
      (bt((e) => e.replace(xt, "-$1").toLowerCase()),
      bt((e) => e.charAt(0).toUpperCase() + e.slice(1))),
    Ot =
      (bt((e) => (e ? `on${_t(e)}` : "")),
      (e, t) => e !== t && (e == e || t == t)),
    Et = new WeakMap(),
    kt = [],
    St = Symbol(""),
    At = Symbol("");
  var Tt = 0;
  function Ct(e) {
    const { deps: t } = e;
    if (t.length) {
      for (let n = 0; n < t.length; n++) t[n].delete(e);
      t.length = 0;
    }
  }
  var Mt = !0,
    jt = [];
  function Lt() {
    const e = jt.pop();
    Mt = void 0 === e || e;
  }
  function Pt(e, t, n) {
    if (!Mt || void 0 === at) return;
    let i = Et.get(e);
    i || Et.set(e, (i = new Map()));
    let r = i.get(n);
    r || i.set(n, (r = new Set())), r.has(at) || (r.add(at), at.deps.push(r));
  }
  function Dt(e, t, n, i, r, o) {
    const s = Et.get(e);
    if (!s) return;
    const a = new Set(),
      c = (e) => {
        e &&
          e.forEach((e) => {
            (e !== at || e.allowRecurse) && a.add(e);
          });
      };
    if ("clear" === t) s.forEach(c);
    else if ("length" === n && dt(e))
      s.forEach((e, t) => {
        ("length" === t || t >= i) && c(e);
      });
    else
      switch ((void 0 !== n && c(s.get(n)), t)) {
        case "add":
          dt(e)
            ? yt(n) && c(s.get("length"))
            : (c(s.get(St)), pt(e) && c(s.get(At)));
          break;
        case "delete":
          dt(e) || (c(s.get(St)), pt(e) && c(s.get(At)));
          break;
        case "set":
          pt(e) && c(s.get(St));
      }
    a.forEach((e) => {
      e.options.scheduler ? e.options.scheduler(e) : e();
    });
  }
  var Rt = st("__proto__,__v_isRef,__isVue"),
    Wt = new Set(
      Object.getOwnPropertyNames(Symbol)
        .map((e) => Symbol[e])
        .filter(ht)
    ),
    zt = Ft(),
    $t = Ft(!1, !0),
    It = Ft(!0),
    Nt = Ft(!0, !0),
    Ht = {};
  function Ft(e = !1, t = !1) {
    return function (n, i, r) {
      if ("__v_isReactive" === i) return !e;
      if ("__v_isReadonly" === i) return e;
      if ("__v_raw" === i && r === (e ? (t ? vn : gn) : t ? mn : hn).get(n))
        return n;
      const o = dt(n);
      if (!e && o && ft(Ht, i)) return Reflect.get(Ht, i, r);
      const s = Reflect.get(n, i, r);
      if (ht(i) ? Wt.has(i) : Rt(i)) return s;
      if ((e || Pt(n, 0, i), t)) return s;
      if (On(s)) {
        return !o || !yt(i) ? s.value : s;
      }
      return mt(s) ? (e ? wn(s) : bn(s)) : s;
    };
  }
  function Vt(e = !1) {
    return function (t, n, i, r) {
      let o = t[n];
      if (!e && ((i = _n(i)), (o = _n(o)), !dt(t) && On(o) && !On(i)))
        return (o.value = i), !0;
      const s = dt(t) && yt(n) ? Number(n) < t.length : ft(t, n),
        a = Reflect.set(t, n, i, r);
      return (
        t === _n(r) &&
          (s ? Ot(i, o) && Dt(t, "set", n, i) : Dt(t, "add", n, i)),
        a
      );
    };
  }
  ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    const t = Array.prototype[e];
    Ht[e] = function (...e) {
      const n = _n(this);
      for (let e = 0, t = this.length; e < t; e++) Pt(n, 0, e + "");
      const i = t.apply(n, e);
      return -1 === i || !1 === i ? t.apply(n, e.map(_n)) : i;
    };
  }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
      const t = Array.prototype[e];
      Ht[e] = function (...e) {
        jt.push(Mt), (Mt = !1);
        const n = t.apply(this, e);
        return Lt(), n;
      };
    });
  var Bt = {
      get: zt,
      set: Vt(),
      deleteProperty: function (e, t) {
        const n = ft(e, t),
          i = (e[t], Reflect.deleteProperty(e, t));
        return i && n && Dt(e, "delete", t, void 0), i;
      },
      has: function (e, t) {
        const n = Reflect.has(e, t);
        return (ht(t) && Wt.has(t)) || Pt(e, 0, t), n;
      },
      ownKeys: function (e) {
        return Pt(e, 0, dt(e) ? "length" : St), Reflect.ownKeys(e);
      },
    },
    qt = { get: It, set: (e, t) => !0, deleteProperty: (e, t) => !0 },
    Gt =
      (ut({}, Bt, { get: $t, set: Vt(!0) }),
      ut({}, qt, { get: Nt }),
      (e) => (mt(e) ? bn(e) : e)),
    Ut = (e) => (mt(e) ? wn(e) : e),
    Xt = (e) => e,
    Yt = (e) => Reflect.getPrototypeOf(e);
  function Kt(e, t, n = !1, i = !1) {
    const r = _n((e = e.__v_raw)),
      o = _n(t);
    t !== o && !n && Pt(r, 0, t), !n && Pt(r, 0, o);
    const { has: s } = Yt(r),
      a = i ? Xt : n ? Ut : Gt;
    return s.call(r, t)
      ? a(e.get(t))
      : s.call(r, o)
      ? a(e.get(o))
      : void (e !== r && e.get(t));
  }
  function Jt(e, t = !1) {
    const n = this.__v_raw,
      i = _n(n),
      r = _n(e);
    return (
      e !== r && !t && Pt(i, 0, e),
      !t && Pt(i, 0, r),
      e === r ? n.has(e) : n.has(e) || n.has(r)
    );
  }
  function Zt(e, t = !1) {
    return (e = e.__v_raw), !t && Pt(_n(e), 0, St), Reflect.get(e, "size", e);
  }
  function Qt(e) {
    e = _n(e);
    const t = _n(this);
    return Yt(t).has.call(t, e) || (t.add(e), Dt(t, "add", e, e)), this;
  }
  function en(e, t) {
    t = _n(t);
    const n = _n(this),
      { has: i, get: r } = Yt(n);
    let o = i.call(n, e);
    o || ((e = _n(e)), (o = i.call(n, e)));
    const s = r.call(n, e);
    return (
      n.set(e, t), o ? Ot(t, s) && Dt(n, "set", e, t) : Dt(n, "add", e, t), this
    );
  }
  function tn(e) {
    const t = _n(this),
      { has: n, get: i } = Yt(t);
    let r = n.call(t, e);
    r || ((e = _n(e)), (r = n.call(t, e)));
    i && i.call(t, e);
    const o = t.delete(e);
    return r && Dt(t, "delete", e, void 0), o;
  }
  function nn() {
    const e = _n(this),
      t = 0 !== e.size,
      n = e.clear();
    return t && Dt(e, "clear", void 0, void 0), n;
  }
  function rn(e, t) {
    return function (n, i) {
      const r = this,
        o = r.__v_raw,
        s = _n(o),
        a = t ? Xt : e ? Ut : Gt;
      return !e && Pt(s, 0, St), o.forEach((e, t) => n.call(i, a(e), a(t), r));
    };
  }
  function on(e, t, n) {
    return function (...i) {
      const r = this.__v_raw,
        o = _n(r),
        s = pt(o),
        a = "entries" === e || (e === Symbol.iterator && s),
        c = "keys" === e && s,
        u = r[e](...i),
        l = n ? Xt : t ? Ut : Gt;
      return (
        !t && Pt(o, 0, c ? At : St),
        {
          next() {
            const { value: e, done: t } = u.next();
            return t
              ? { value: e, done: t }
              : { value: a ? [l(e[0]), l(e[1])] : l(e), done: t };
          },
          [Symbol.iterator]() {
            return this;
          },
        }
      );
    };
  }
  function sn(e) {
    return function (...t) {
      return "delete" !== e && this;
    };
  }
  var an = {
      get(e) {
        return Kt(this, e);
      },
      get size() {
        return Zt(this);
      },
      has: Jt,
      add: Qt,
      set: en,
      delete: tn,
      clear: nn,
      forEach: rn(!1, !1),
    },
    cn = {
      get(e) {
        return Kt(this, e, !1, !0);
      },
      get size() {
        return Zt(this);
      },
      has: Jt,
      add: Qt,
      set: en,
      delete: tn,
      clear: nn,
      forEach: rn(!1, !0),
    },
    un = {
      get(e) {
        return Kt(this, e, !0);
      },
      get size() {
        return Zt(this, !0);
      },
      has(e) {
        return Jt.call(this, e, !0);
      },
      add: sn("add"),
      set: sn("set"),
      delete: sn("delete"),
      clear: sn("clear"),
      forEach: rn(!0, !1),
    },
    ln = {
      get(e) {
        return Kt(this, e, !0, !0);
      },
      get size() {
        return Zt(this, !0);
      },
      has(e) {
        return Jt.call(this, e, !0);
      },
      add: sn("add"),
      set: sn("set"),
      delete: sn("delete"),
      clear: sn("clear"),
      forEach: rn(!0, !0),
    };
  function fn(e, t) {
    const n = t ? (e ? ln : cn) : e ? un : an;
    return (t, i, r) =>
      "__v_isReactive" === i
        ? !e
        : "__v_isReadonly" === i
        ? e
        : "__v_raw" === i
        ? t
        : Reflect.get(ft(n, i) && i in t ? n : t, i, r);
  }
  ["keys", "values", "entries", Symbol.iterator].forEach((e) => {
    (an[e] = on(e, !1, !1)),
      (un[e] = on(e, !0, !1)),
      (cn[e] = on(e, !1, !0)),
      (ln[e] = on(e, !0, !0));
  });
  var dn = { get: fn(!1, !1) },
    pn = (fn(!1, !0), { get: fn(!0, !1) }),
    hn = (fn(!0, !0), new WeakMap()),
    mn = new WeakMap(),
    gn = new WeakMap(),
    vn = new WeakMap();
  function yn(e) {
    return e.__v_skip || !Object.isExtensible(e)
      ? 0
      : (function (e) {
          switch (e) {
            case "Object":
            case "Array":
              return 1;
            case "Map":
            case "Set":
            case "WeakMap":
            case "WeakSet":
              return 2;
            default:
              return 0;
          }
        })(((e) => vt(e).slice(8, -1))(e));
  }
  function bn(e) {
    return e && e.__v_isReadonly ? e : xn(e, !1, Bt, dn, hn);
  }
  function wn(e) {
    return xn(e, !0, qt, pn, gn);
  }
  function xn(e, t, n, i, r) {
    if (!mt(e)) return e;
    if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
    const o = r.get(e);
    if (o) return o;
    const s = yn(e);
    if (0 === s) return e;
    const a = new Proxy(e, 2 === s ? i : n);
    return r.set(e, a), a;
  }
  function _n(e) {
    return (e && _n(e.__v_raw)) || e;
  }
  function On(e) {
    return Boolean(e && !0 === e.__v_isRef);
  }
  Y("nextTick", () => Ae),
    Y("dispatch", (e) => Ee.bind(Ee, e)),
    Y("watch", (e, { evaluateLater: t, effect: n }) => (i, r) => {
      let o,
        s = t(i),
        a = !0,
        c = n(() =>
          s((e) => {
            JSON.stringify(e),
              a
                ? (o = e)
                : queueMicrotask(() => {
                    r(e, o), (o = e);
                  }),
              (a = !1);
          })
        );
      e._x_effects.delete(c);
    }),
    Y("store", function () {
      return tt;
    }),
    Y("data", (e) => N(e)),
    Y("root", (e) => ze(e)),
    Y(
      "refs",
      (e) => (
        e._x_refs_proxy ||
          (e._x_refs_proxy = B(
            (function (e) {
              let t = [],
                n = e;
              for (; n; ) n._x_refs && t.push(n._x_refs), (n = n.parentNode);
              return t;
            })(e)
          )),
        e._x_refs_proxy
      )
    );
  var En = {};
  function kn(e) {
    return En[e] || (En[e] = 0), ++En[e];
  }
  function Sn(e, t, n) {
    Y(t, (t) =>
      Me(
        `You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,
        t
      )
    );
  }
  Y("id", (e) => (t, n = null) => {
    let i = (function (e, t) {
        return $e(e, (e) => {
          if (e._x_ids && e._x_ids[t]) return !0;
        });
      })(e, t),
      r = i ? i._x_ids[t] : kn(t);
    return n ? `${t}-${r}-${n}` : `${t}-${r}`;
  }),
    Y("el", (e) => e),
    Sn("Focus", "focus", "focus"),
    Sn("Persist", "persist", "persist"),
    ue("modelable", (e, { expression: t }, { effect: n, evaluateLater: i }) => {
      let r = i(t),
        o = () => {
          let e;
          return r((t) => (e = t)), e;
        },
        s = i(`${t} = __placeholder`),
        a = (e) => s(() => {}, { scope: { __placeholder: e } }),
        c = o();
      a(c),
        queueMicrotask(() => {
          if (!e._x_model) return;
          e._x_removeModelListeners.default();
          let t = e._x_model.get,
            i = e._x_model.set;
          n(() => a(t())), n(() => i(o()));
        });
    }),
    ue("teleport", (e, { expression: t }, { cleanup: n }) => {
      "template" !== e.tagName.toLowerCase() &&
        Me("x-teleport can only be used on a <template> tag", e);
      let i = document.querySelector(t);
      i || Me(`Cannot find x-teleport element for selector: "${t}"`);
      let r = e.content.cloneNode(!0).firstElementChild;
      (e._x_teleport = r),
        (r._x_teleportBack = e),
        e._x_forwardEvents &&
          e._x_forwardEvents.forEach((t) => {
            r.addEventListener(t, (t) => {
              t.stopPropagation(),
                e.dispatchEvent(new t.constructor(t.type, t));
            });
          }),
        H(r, {}, e),
        W(() => {
          i.appendChild(r), Ie(r), (r._x_ignore = !0);
        }),
        n(() => r.remove());
    });
  var An = () => {};
  function Tn(e, t, n, i) {
    let r = e,
      o = (e) => i(e),
      s = {},
      a = (e, t) => (n) => t(e, n);
    if (
      (n.includes("dot") && (t = t.replace(/-/g, ".")),
      n.includes("camel") &&
        (t = (function (e) {
          return e.toLowerCase().replace(/-(\w)/g, (e, t) => t.toUpperCase());
        })(t)),
      n.includes("passive") && (s.passive = !0),
      n.includes("capture") && (s.capture = !0),
      n.includes("window") && (r = window),
      n.includes("document") && (r = document),
      n.includes("prevent") &&
        (o = a(o, (e, t) => {
          t.preventDefault(), e(t);
        })),
      n.includes("stop") &&
        (o = a(o, (e, t) => {
          t.stopPropagation(), e(t);
        })),
      n.includes("self") &&
        (o = a(o, (t, n) => {
          n.target === e && t(n);
        })),
      (n.includes("away") || n.includes("outside")) &&
        ((r = document),
        (o = a(o, (t, n) => {
          e.contains(n.target) ||
            (!1 !== n.target.isConnected &&
              ((e.offsetWidth < 1 && e.offsetHeight < 1) ||
                (!1 !== e._x_isShown && t(n))));
        }))),
      n.includes("once") &&
        (o = a(o, (e, n) => {
          e(n), r.removeEventListener(t, o, s);
        })),
      (o = a(o, (e, i) => {
        ((function (e) {
          return ["keydown", "keyup"].includes(e);
        })(t) &&
          (function (e, t) {
            let n = t.filter(
              (e) =>
                !["window", "document", "prevent", "stop", "once"].includes(e)
            );
            if (n.includes("debounce")) {
              let e = n.indexOf("debounce");
              n.splice(
                e,
                Cn((n[e + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1
              );
            }
            if (0 === n.length) return !1;
            if (1 === n.length && Mn(e.key).includes(n[0])) return !1;
            const i = [
              "ctrl",
              "shift",
              "alt",
              "meta",
              "cmd",
              "super",
            ].filter((e) => n.includes(e));
            if (((n = n.filter((e) => !i.includes(e))), i.length > 0)) {
              if (
                i.filter(
                  (t) => (
                    ("cmd" !== t && "super" !== t) || (t = "meta"), e[`${t}Key`]
                  )
                ).length === i.length &&
                Mn(e.key).includes(n[0])
              )
                return !1;
            }
            return !0;
          })(i, n)) ||
          e(i);
      })),
      n.includes("debounce"))
    ) {
      let e = n[n.indexOf("debounce") + 1] || "invalid-wait",
        t = Cn(e.split("ms")[0]) ? Number(e.split("ms")[0]) : 250;
      o = Qe(o, t);
    }
    if (n.includes("throttle")) {
      let e = n[n.indexOf("throttle") + 1] || "invalid-wait",
        t = Cn(e.split("ms")[0]) ? Number(e.split("ms")[0]) : 250;
      o = et(o, t);
    }
    return (
      r.addEventListener(t, o, s),
      () => {
        r.removeEventListener(t, o, s);
      }
    );
  }
  function Cn(e) {
    return !Array.isArray(e) && !isNaN(e);
  }
  function Mn(e) {
    if (!e) return [];
    e = e
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[_\s]/, "-")
      .toLowerCase();
    let t = {
      ctrl: "control",
      slash: "/",
      space: "-",
      spacebar: "-",
      cmd: "meta",
      esc: "escape",
      up: "arrow-up",
      down: "arrow-down",
      left: "arrow-left",
      right: "arrow-right",
      period: ".",
      equal: "=",
    };
    return (
      (t[e] = e),
      Object.keys(t)
        .map((n) => {
          if (t[n] === e) return n;
        })
        .filter((e) => e)
    );
  }
  function jn(e) {
    let t = e ? parseFloat(e) : null;
    return (n = t), Array.isArray(n) || isNaN(n) ? e : t;
    var n;
  }
  function Ln(e, t, n, i) {
    let r = {};
    if (/^\[.*\]$/.test(e.item) && Array.isArray(t)) {
      e.item
        .replace("[", "")
        .replace("]", "")
        .split(",")
        .map((e) => e.trim())
        .forEach((e, n) => {
          r[e] = t[n];
        });
    } else if (
      /^\{.*\}$/.test(e.item) &&
      !Array.isArray(t) &&
      "object" == typeof t
    ) {
      e.item
        .replace("{", "")
        .replace("}", "")
        .split(",")
        .map((e) => e.trim())
        .forEach((e) => {
          r[e] = t[e];
        });
    } else r[e.item] = t;
    return (
      e.index && (r[e.index] = n), e.collection && (r[e.collection] = i), r
    );
  }
  function Pn() {}
  function Dn(e, t, n) {
    ue(t, (i) =>
      Me(
        `You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,
        i
      )
    );
  }
  (An.inline = (e, { modifiers: t }, { cleanup: n }) => {
    t.includes("self") ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
      n(() => {
        t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
      });
  }),
    ue("ignore", An),
    ue("effect", (e, { expression: t }, { effect: n }) => n(te(e, t))),
    ue(
      "model",
      (e, { modifiers: t, expression: n }, { effect: i, cleanup: r }) => {
        let o = te(e, n),
          s = te(e, `${n} = rightSideOfExpression($event, ${n})`);
        var a =
          "select" === e.tagName.toLowerCase() ||
          ["checkbox", "radio"].includes(e.type) ||
          t.includes("lazy")
            ? "change"
            : "input";
        let c = (function (e, t, n) {
            "radio" === e.type &&
              W(() => {
                e.hasAttribute("name") || e.setAttribute("name", n);
              });
            return (n, i) =>
              W(() => {
                if (n instanceof CustomEvent && void 0 !== n.detail)
                  return n.detail || n.target.value;
                if ("checkbox" === e.type) {
                  if (Array.isArray(i)) {
                    let e = t.includes("number")
                      ? jn(n.target.value)
                      : n.target.value;
                    return n.target.checked
                      ? i.concat([e])
                      : i.filter((t) => !(t == e));
                  }
                  return n.target.checked;
                }
                if ("select" === e.tagName.toLowerCase() && e.multiple)
                  return t.includes("number")
                    ? Array.from(n.target.selectedOptions).map((e) =>
                        jn(e.value || e.text)
                      )
                    : Array.from(n.target.selectedOptions).map(
                        (e) => e.value || e.text
                      );
                {
                  let e = n.target.value;
                  return t.includes("number")
                    ? jn(e)
                    : t.includes("trim")
                    ? e.trim()
                    : e;
                }
              });
          })(e, t, n),
          u = Tn(e, a, t, (e) => {
            s(() => {}, { scope: { $event: e, rightSideOfExpression: c } });
          });
        e._x_removeModelListeners || (e._x_removeModelListeners = {}),
          (e._x_removeModelListeners.default = u),
          r(() => e._x_removeModelListeners.default());
        let l = te(e, `${n} = __placeholder`);
        (e._x_model = {
          get() {
            let e;
            return o((t) => (e = t)), e;
          },
          set(e) {
            l(() => {}, { scope: { __placeholder: e } });
          },
        }),
          (e._x_forceModelUpdate = () => {
            o((t) => {
              void 0 === t && n.match(/\./) && (t = ""),
                (window.fromModel = !0),
                W(() => Ke(e, "value", t)),
                delete window.fromModel;
            });
          }),
          i(() => {
            (t.includes("unintrusive") &&
              document.activeElement.isSameNode(e)) ||
              e._x_forceModelUpdate();
          });
      }
    ),
    ue("cloak", (e) =>
      queueMicrotask(() => W(() => e.removeAttribute(ae("cloak"))))
    ),
    We(() => `[${ae("init")}]`),
    ue(
      "init",
      Ye((e, { expression: t }, { evaluate: n }) =>
        "string" == typeof t ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1)
      )
    ),
    ue("text", (e, { expression: t }, { effect: n, evaluateLater: i }) => {
      let r = i(t);
      n(() => {
        r((t) => {
          W(() => {
            e.textContent = t;
          });
        });
      });
    }),
    ue("html", (e, { expression: t }, { effect: n, evaluateLater: i }) => {
      let r = i(t);
      n(() => {
        r((t) => {
          W(() => {
            (e.innerHTML = t),
              (e._x_ignoreSelf = !0),
              Ie(e),
              delete e._x_ignoreSelf;
          });
        });
      });
    }),
    ye(me(":", ae("bind:"))),
    ue(
      "bind",
      (
        e,
        { value: t, modifiers: n, expression: i, original: r },
        { effect: o }
      ) => {
        if (!t)
          return (function (e, t, n, i) {
            let r = {};
            (o = r),
              Object.entries(it).forEach(([e, t]) => {
                Object.defineProperty(o, e, { get: () => (...e) => t(...e) });
              });
            var o;
            let s = te(e, t),
              a = [];
            for (; a.length; ) a.pop()();
            s(
              (t) => {
                let i = Object.entries(t).map(([e, t]) => ({
                    name: e,
                    value: t,
                  })),
                  r = (function (e) {
                    return Array.from(e)
                      .map(ge())
                      .filter((e) => !be(e));
                  })(i);
                (i = i.map((e) =>
                  r.find((t) => t.name === e.name)
                    ? { name: `x-bind:${e.name}`, value: `"${e.value}"` }
                    : e
                )),
                  le(e, i, n).map((e) => {
                    a.push(e.runCleanups), e();
                  });
              },
              { scope: r }
            );
          })(e, i, r);
        if ("key" === t)
          return (function (e, t) {
            e._x_keyExpression = t;
          })(e, i);
        let s = te(e, i);
        o(() =>
          s((r) => {
            void 0 === r && i.match(/\./) && (r = ""), W(() => Ke(e, t, r, n));
          })
        );
      }
    ),
    Re(() => `[${ae("data")}]`),
    ue(
      "data",
      Ye((e, { expression: t }, { cleanup: n }) => {
        t = "" === t ? "{}" : t;
        let i = {};
        K(i, e);
        let r = {};
        var o, s;
        (o = r),
          (s = i),
          Object.entries(rt).forEach(([e, t]) => {
            Object.defineProperty(o, e, {
              get: () => (...e) => t.bind(s)(...e),
              enumerable: !1,
            });
          });
        let a = ee(e, t, { scope: r });
        void 0 === a && (a = {}), K(a, e);
        let c = p(a);
        q(c);
        let u = H(e, c);
        c.init && ee(e, c.init),
          n(() => {
            c.destroy && ee(e, c.destroy), u();
          });
      })
    ),
    ue("show", (e, { modifiers: t, expression: n }, { effect: i }) => {
      let r = te(e, n);
      e._x_doHide ||
        (e._x_doHide = () => {
          W(() => (e.style.display = "none"));
        }),
        e._x_doShow ||
          (e._x_doShow = () => {
            W(() => {
              1 === e.style.length && "none" === e.style.display
                ? e.removeAttribute("style")
                : e.style.removeProperty("display");
            });
          });
      let o,
        s = () => {
          e._x_doHide(), (e._x_isShown = !1);
        },
        a = () => {
          e._x_doShow(), (e._x_isShown = !0);
        },
        c = () => setTimeout(a),
        u = Ve(
          (e) => (e ? a() : s()),
          (t) => {
            "function" == typeof e._x_toggleAndCascadeWithTransitions
              ? e._x_toggleAndCascadeWithTransitions(e, t, a, s)
              : t
              ? c()
              : s();
          }
        ),
        l = !0;
      i(() =>
        r((e) => {
          (l || e !== o) &&
            (t.includes("immediate") && (e ? c() : s()),
            u(e),
            (o = e),
            (l = !1));
        })
      );
    }),
    ue("for", (e, { expression: t }, { effect: n, cleanup: i }) => {
      let r = (function (e) {
          let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
            n = /^\s*\(|\)\s*$/g,
            i = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
            r = e.match(i);
          if (!r) return;
          let o = {};
          o.items = r[2].trim();
          let s = r[1].replace(n, "").trim(),
            a = s.match(t);
          a
            ? ((o.item = s.replace(t, "").trim()),
              (o.index = a[1].trim()),
              a[2] && (o.collection = a[2].trim()))
            : (o.item = s);
          return o;
        })(t),
        o = te(e, r.items),
        s = te(e, e._x_keyExpression || "index");
      (e._x_prevKeys = []),
        (e._x_lookup = {}),
        n(() =>
          (function (e, t, n, i) {
            let r = (e) => "object" == typeof e && !Array.isArray(e),
              o = e;
            n((n) => {
              var s;
              (s = n),
                !Array.isArray(s) &&
                  !isNaN(s) &&
                  n >= 0 &&
                  (n = Array.from(Array(n).keys(), (e) => e + 1)),
                void 0 === n && (n = []);
              let a = e._x_lookup,
                c = e._x_prevKeys,
                u = [],
                l = [];
              if (r(n))
                n = Object.entries(n).map(([e, r]) => {
                  let o = Ln(t, r, e, n);
                  i((e) => l.push(e), { scope: { index: e, ...o } }), u.push(o);
                });
              else
                for (let e = 0; e < n.length; e++) {
                  let r = Ln(t, n[e], e, n);
                  i((e) => l.push(e), { scope: { index: e, ...r } }), u.push(r);
                }
              let f = [],
                d = [],
                h = [],
                m = [];
              for (let e = 0; e < c.length; e++) {
                let t = c[e];
                -1 === l.indexOf(t) && h.push(t);
              }
              c = c.filter((e) => !h.includes(e));
              let g = "template";
              for (let e = 0; e < l.length; e++) {
                let t = l[e],
                  n = c.indexOf(t);
                if (-1 === n) c.splice(e, 0, t), f.push([g, e]);
                else if (n !== e) {
                  let t = c.splice(e, 1)[0],
                    i = c.splice(n - 1, 1)[0];
                  c.splice(e, 0, i), c.splice(n, 0, t), d.push([t, i]);
                } else m.push(t);
                g = t;
              }
              for (let e = 0; e < h.length; e++) {
                let t = h[e];
                a[t]._x_effects && a[t]._x_effects.forEach(x),
                  a[t].remove(),
                  (a[t] = null),
                  delete a[t];
              }
              for (let e = 0; e < d.length; e++) {
                let [t, n] = d[e],
                  i = a[t],
                  r = a[n],
                  o = document.createElement("div");
                W(() => {
                  r.after(o),
                    i.after(r),
                    r._x_currentIfEl && r.after(r._x_currentIfEl),
                    o.before(i),
                    i._x_currentIfEl && i.after(i._x_currentIfEl),
                    o.remove();
                }),
                  F(r, u[l.indexOf(n)]);
              }
              for (let e = 0; e < f.length; e++) {
                let [t, n] = f[e],
                  i = "template" === t ? o : a[t];
                i._x_currentIfEl && (i = i._x_currentIfEl);
                let r = u[n],
                  s = l[n],
                  c = document.importNode(o.content, !0).firstElementChild;
                H(c, p(r), o),
                  W(() => {
                    i.after(c), Ie(c);
                  }),
                  "object" == typeof s &&
                    Me(
                      "x-for key cannot be an object, it must be a string or an integer",
                      o
                    ),
                  (a[s] = c);
              }
              for (let e = 0; e < m.length; e++) F(a[m[e]], u[l.indexOf(m[e])]);
              o._x_prevKeys = l;
            });
          })(e, r, o, s)
        ),
        i(() => {
          Object.values(e._x_lookup).forEach((e) => e.remove()),
            delete e._x_prevKeys,
            delete e._x_lookup;
        });
    }),
    (Pn.inline = (e, { expression: t }, { cleanup: n }) => {
      let i = ze(e);
      i._x_refs || (i._x_refs = {}),
        (i._x_refs[t] = e),
        n(() => delete i._x_refs[t]);
    }),
    ue("ref", Pn),
    ue("if", (e, { expression: t }, { effect: n, cleanup: i }) => {
      let r = te(e, t);
      n(() =>
        r((t) => {
          t
            ? (() => {
                if (e._x_currentIfEl) return e._x_currentIfEl;
                let t = e.content.cloneNode(!0).firstElementChild;
                H(t, {}, e),
                  W(() => {
                    e.after(t), Ie(t);
                  }),
                  (e._x_currentIfEl = t),
                  (e._x_undoIf = () => {
                    Ce(t, (e) => {
                      e._x_effects && e._x_effects.forEach(x);
                    }),
                      t.remove(),
                      delete e._x_currentIfEl;
                  });
              })()
            : e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
        })
      ),
        i(() => e._x_undoIf && e._x_undoIf());
    }),
    ue("id", (e, { expression: t }, { evaluate: n }) => {
      n(t).forEach((t) =>
        (function (e, t) {
          e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = kn(t));
        })(e, t)
      );
    }),
    ye(me("@", ae("on:"))),
    ue(
      "on",
      Ye((e, { value: t, modifiers: n, expression: i }, { cleanup: r }) => {
        let o = i ? te(e, i) : () => {};
        "template" === e.tagName.toLowerCase() &&
          (e._x_forwardEvents || (e._x_forwardEvents = []),
          e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
        let s = Tn(e, t, n, (e) => {
          o(() => {}, { scope: { $event: e }, params: [e] });
        });
        r(() => s());
      })
    ),
    Dn("Collapse", "collapse", "collapse"),
    Dn("Intersect", "intersect", "intersect"),
    Dn("Focus", "trap", "focus"),
    Dn("Mask", "mask", "mask"),
    ot.setEvaluator(ie),
    ot.setReactivityEngine({
      reactive: bn,
      effect: function (e, t = ct) {
        (function (e) {
          return e && !0 === e._isEffect;
        })(e) && (e = e.raw);
        const n = (function (e, t) {
          const n = function () {
            if (!n.active) return e();
            if (!kt.includes(n)) {
              Ct(n);
              try {
                return jt.push(Mt), (Mt = !0), kt.push(n), (at = n), e();
              } finally {
                kt.pop(), Lt(), (at = kt[kt.length - 1]);
              }
            }
          };
          return (
            (n.id = Tt++),
            (n.allowRecurse = !!t.allowRecurse),
            (n._isEffect = !0),
            (n.active = !0),
            (n.raw = e),
            (n.deps = []),
            (n.options = t),
            n
          );
        })(e, t);
        return t.lazy || n(), n;
      },
      release: function (e) {
        e.active &&
          (Ct(e), e.options.onStop && e.options.onStop(), (e.active = !1));
      },
      raw: _n,
    });
  var Rn = ot;
  var Wn = function (e) {
    let t = () => {
      let t,
        n = localStorage;
      return e.interceptor(
        (i, r, o, s, a) => {
          let c = t || `_x_${s}`,
            u = (function (e, t) {
              return null !== t.getItem(e);
            })(c, n)
              ? (function (e, t) {
                  return JSON.parse(t.getItem(e, t));
                })(c, n)
              : i;
          return (
            o(u),
            e.effect(() => {
              let e = r();
              !(function (e, t, n) {
                n.setItem(e, JSON.stringify(t));
              })(c, e, n),
                o(e);
            }),
            u
          );
        },
        (e) => {
          (e.as = (n) => ((t = n), e)), (e.using = (t) => ((n = t), e));
        }
      );
    };
    Object.defineProperty(e, "$persist", { get: () => t() }),
      e.magic("persist", t);
  };
  function zn(e) {
    return new (class {
      el = void 0;
      constructor(e) {
        this.el = e;
      }
      traversals = {
        first: "firstElementChild",
        next: "nextElementSibling",
        parent: "parentElement",
      };
      nodes() {
        return (
          (this.traversals = {
            first: "firstChild",
            next: "nextSibling",
            parent: "parentNode",
          }),
          this
        );
      }
      first() {
        return this.teleportTo(this.el[this.traversals.first]);
      }
      next() {
        return this.teleportTo(
          this.teleportBack(this.el[this.traversals.next])
        );
      }
      before(e) {
        return this.el[this.traversals.parent].insertBefore(e, this.el), e;
      }
      replace(e) {
        return this.el[this.traversals.parent].replaceChild(e, this.el), e;
      }
      append(e) {
        return this.el.appendChild(e), e;
      }
      teleportTo(e) {
        return e && e._x_teleport ? e._x_teleport : e;
      }
      teleportBack(e) {
        return e && e._x_teleportBack ? e._x_teleportBack : e;
      }
    })(e);
  }
  var $n = () => {},
    In = () => {};
  async function Nn(e, t, n) {
    let i, r, o, s, a, c, u, l, f, d, p;
    function h(e) {
      if (p)
        return (
          In((e || "").replace("\n", "\\n"), i, r),
          new Promise((e) => ($n = () => e()))
        );
    }
    async function m(e, t) {
      if (
        (function (e, t) {
          return (
            e.nodeType != t.nodeType || e.nodeName != t.nodeName || g(e) != g(t)
          );
        })(e, t)
      ) {
        let n = (function (e, t) {
          if (Hn(u, e)) return;
          let n = t.cloneNode(!0);
          if (Hn(f, n)) return;
          zn(e).replace(n), l(e), d(n);
        })(e, t);
        return await h("Swap elements"), n;
      }
      let n = !1;
      if (!Hn(a, e, t, () => (n = !0))) {
        if (
          (window.Alpine &&
            (function (e, t, n) {
              if (1 !== e.nodeType) return;
              e._x_dataStack && window.Alpine.clone(e, t);
            })(e, t),
          3 === (i = t).nodeType || 8 === i.nodeType)
        )
          return (
            await (async function (e, t) {
              let n = t.nodeValue;
              e.nodeValue !== n &&
                ((e.nodeValue = n), await h("Change text node to: " + n));
            })(e, t),
            void c(e, t)
          );
        var i;
        n ||
          (await (async function (e, t) {
            if (e._x_isShown && !t._x_isShown) return;
            if (!e._x_isShown && t._x_isShown) return;
            let n = Array.from(e.attributes),
              i = Array.from(t.attributes);
            for (let i = n.length - 1; i >= 0; i--) {
              let r = n[i].name;
              t.hasAttribute(r) ||
                (e.removeAttribute(r), await h("Remove attribute"));
            }
            for (let t = i.length - 1; t >= 0; t--) {
              let n = i[t].name,
                r = i[t].value;
              e.getAttribute(n) !== r &&
                (e.setAttribute(n, r),
                await h(`Set [${n}] attribute to: "${r}"`));
            }
          })(e, t)),
          c(e, t),
          await (async function (e, t) {
            let n = e.childNodes,
              i = (v(t.childNodes), v(n)),
              r = zn(t).nodes().first(),
              o = zn(e).nodes().first(),
              a = {};
            for (; r; ) {
              let t = g(r),
                n = g(o);
              if (!o) {
                if (!t || !a[t]) {
                  let t = y(r, e) || {};
                  await h("Add element: " + (t.outerHTML || t.nodeValue)),
                    (r = zn(r).nodes().next());
                  continue;
                }
                {
                  let n = a[t];
                  zn(e).append(n), (o = n), await h("Add element (from key)");
                }
              }
              if (s) {
                let e = zn(r).next(),
                  t = !1;
                for (; !t && e; )
                  o.isEqualNode(e) &&
                    ((t = !0),
                    (o = b(r, o)),
                    (n = g(o)),
                    await h("Move element (lookahead)")),
                    (e = zn(e).next());
              }
              if (t !== n) {
                if (!t && n) {
                  (a[n] = o),
                    (o = b(r, o)),
                    a[n].remove(),
                    (o = zn(o).nodes().next()),
                    (r = zn(r).nodes().next()),
                    await h('No "to" key');
                  continue;
                }
                if (
                  (t &&
                    !n &&
                    i[t] &&
                    ((o = zn(o).replace(i[t])), await h('No "from" key')),
                  t && n)
                ) {
                  a[n] = o;
                  let e = i[t];
                  if (!e) {
                    (a[n] = o),
                      (o = b(r, o)),
                      a[n].remove(),
                      (o = zn(o).next()),
                      (r = zn(r).next()),
                      await h("Swap elements with keys");
                    continue;
                  }
                  (o = zn(o).replace(e)), await h('Move "from" key');
                }
              }
              let c = o && zn(o).nodes().next();
              await m(o, r), (r = r && zn(r).nodes().next()), (o = c);
            }
            let c = [];
            for (; o; ) Hn(u, o) || c.push(o), (o = zn(o).nodes().next());
            for (; c.length; ) {
              let e = c.shift();
              e.remove(), await h("remove el"), l(e);
            }
          })(e, t);
      }
    }
    function g(e) {
      return e && 1 === e.nodeType && o(e);
    }
    function v(e) {
      let t = {};
      return (
        e.forEach((e) => {
          let n = g(e);
          n && (t[n] = e);
        }),
        t
      );
    }
    function y(e, t) {
      if (!Hn(f, e)) {
        let n = e.cloneNode(!0);
        return zn(t).append(n), d(n), n;
      }
      return null;
    }
    function b(e, t) {
      if (!Hn(f, e)) {
        let n = e.cloneNode(!0);
        return zn(t).before(n), d(n), n;
      }
      return t;
    }
    var w;
    return (
      (function (e = {}) {
        let t = () => {};
        (a = e.updating || t),
          (c = e.updated || t),
          (u = e.removing || t),
          (l = e.removed || t),
          (f = e.adding || t),
          (d = e.added || t),
          (o = e.key || ((e) => e.getAttribute("key"))),
          (s = e.lookahead || !1),
          (p = e.debug || !1);
      })(n),
      (i = e),
      (w = t),
      (r = document.createRange().createContextualFragment(w)
        .firstElementChild),
      window.Alpine &&
        window.Alpine.closestDataStack &&
        !e._x_dataStack &&
        ((r._x_dataStack = window.Alpine.closestDataStack(e)),
        r._x_dataStack && window.Alpine.clone(e, r)),
      await h(),
      await m(e, r),
      (i = void 0),
      (r = void 0),
      e
    );
  }
  function Hn(e, ...t) {
    let n = !1;
    return e(...t, () => (n = !0)), n;
  }
  (Nn.step = () => $n()),
    (Nn.log = (e) => {
      In = e;
    });
  var Fn,
    Vn,
    Bn = function (e) {
      e.morph = Nn;
    },
    qn = Object.create,
    Gn = Object.defineProperty,
    Un = Object.getPrototypeOf,
    Xn = Object.prototype.hasOwnProperty,
    Yn = Object.getOwnPropertyNames,
    Kn = Object.getOwnPropertyDescriptor,
    Jn = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    Zn = Jn((e) => {
      "use strict";
      function t(e) {
        var t = e.getBoundingClientRect();
        return {
          width: t.width,
          height: t.height,
          top: t.top,
          right: t.right,
          bottom: t.bottom,
          left: t.left,
          x: t.left,
          y: t.top,
        };
      }
      function n(e) {
        if (null == e) return window;
        if ("[object Window]" !== e.toString()) {
          var t = e.ownerDocument;
          return (t && t.defaultView) || window;
        }
        return e;
      }
      function i(e) {
        var t = n(e);
        return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
      }
      function r(e) {
        return e instanceof n(e).Element || e instanceof Element;
      }
      function o(e) {
        return e instanceof n(e).HTMLElement || e instanceof HTMLElement;
      }
      function s(e) {
        return (
          "undefined" != typeof ShadowRoot &&
          (e instanceof n(e).ShadowRoot || e instanceof ShadowRoot)
        );
      }
      function a(e) {
        return e ? (e.nodeName || "").toLowerCase() : null;
      }
      function c(e) {
        return ((r(e) ? e.ownerDocument : e.document) || window.document)
          .documentElement;
      }
      function u(e) {
        return t(c(e)).left + i(e).scrollLeft;
      }
      function l(e) {
        return n(e).getComputedStyle(e);
      }
      function f(e) {
        var t = l(e),
          n = t.overflow,
          i = t.overflowX,
          r = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + r + i);
      }
      function d(e, r, s) {
        void 0 === s && (s = !1);
        var l,
          d,
          p = c(r),
          h = t(e),
          m = o(r),
          g = { scrollLeft: 0, scrollTop: 0 },
          v = { x: 0, y: 0 };
        return (
          (m || (!m && !s)) &&
            (("body" !== a(r) || f(p)) &&
              (g =
                (l = r) !== n(l) && o(l)
                  ? { scrollLeft: (d = l).scrollLeft, scrollTop: d.scrollTop }
                  : i(l)),
            o(r)
              ? (((v = t(r)).x += r.clientLeft), (v.y += r.clientTop))
              : p && (v.x = u(p))),
          {
            x: h.left + g.scrollLeft - v.x,
            y: h.top + g.scrollTop - v.y,
            width: h.width,
            height: h.height,
          }
        );
      }
      function p(e) {
        var n = t(e),
          i = e.offsetWidth,
          r = e.offsetHeight;
        return (
          Math.abs(n.width - i) <= 1 && (i = n.width),
          Math.abs(n.height - r) <= 1 && (r = n.height),
          { x: e.offsetLeft, y: e.offsetTop, width: i, height: r }
        );
      }
      function h(e) {
        return "html" === a(e)
          ? e
          : e.assignedSlot || e.parentNode || (s(e) ? e.host : null) || c(e);
      }
      function m(e) {
        return ["html", "body", "#document"].indexOf(a(e)) >= 0
          ? e.ownerDocument.body
          : o(e) && f(e)
          ? e
          : m(h(e));
      }
      function g(e, t) {
        var i;
        void 0 === t && (t = []);
        var r = m(e),
          o = r === (null == (i = e.ownerDocument) ? void 0 : i.body),
          s = n(r),
          a = o ? [s].concat(s.visualViewport || [], f(r) ? r : []) : r,
          c = t.concat(a);
        return o ? c : c.concat(g(h(a)));
      }
      function v(e) {
        return ["table", "td", "th"].indexOf(a(e)) >= 0;
      }
      function y(e) {
        return o(e) && "fixed" !== l(e).position ? e.offsetParent : null;
      }
      function b(e) {
        for (var t = n(e), i = y(e); i && v(i) && "static" === l(i).position; )
          i = y(i);
        return i &&
          ("html" === a(i) || ("body" === a(i) && "static" === l(i).position))
          ? t
          : i ||
              (function (e) {
                var t =
                  -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
                if (
                  -1 !== navigator.userAgent.indexOf("Trident") &&
                  o(e) &&
                  "fixed" === l(e).position
                )
                  return null;
                for (
                  var n = h(e);
                  o(n) && ["html", "body"].indexOf(a(n)) < 0;

                ) {
                  var i = l(n);
                  if (
                    "none" !== i.transform ||
                    "none" !== i.perspective ||
                    "paint" === i.contain ||
                    -1 !== ["transform", "perspective"].indexOf(i.willChange) ||
                    (t && "filter" === i.willChange) ||
                    (t && i.filter && "none" !== i.filter)
                  )
                    return n;
                  n = n.parentNode;
                }
                return null;
              })(e) ||
              t;
      }
      Object.defineProperty(e, "__esModule", { value: !0 });
      var w = "top",
        x = "bottom",
        _ = "right",
        O = "left",
        E = "auto",
        k = [w, x, _, O],
        S = "start",
        A = "end",
        T = "viewport",
        C = "popper",
        M = k.reduce(function (e, t) {
          return e.concat([t + "-" + S, t + "-" + A]);
        }, []),
        j = [].concat(k, [E]).reduce(function (e, t) {
          return e.concat([t, t + "-" + S, t + "-" + A]);
        }, []),
        L = [
          "beforeRead",
          "read",
          "afterRead",
          "beforeMain",
          "main",
          "afterMain",
          "beforeWrite",
          "write",
          "afterWrite",
        ];
      function P(e) {
        var t = new Map(),
          n = new Set(),
          i = [];
        function r(e) {
          n.add(e.name),
            []
              .concat(e.requires || [], e.requiresIfExists || [])
              .forEach(function (e) {
                if (!n.has(e)) {
                  var i = t.get(e);
                  i && r(i);
                }
              }),
            i.push(e);
        }
        return (
          e.forEach(function (e) {
            t.set(e.name, e);
          }),
          e.forEach(function (e) {
            n.has(e.name) || r(e);
          }),
          i
        );
      }
      function D(e) {
        for (
          var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1;
          i < t;
          i++
        )
          n[i - 1] = arguments[i];
        return [].concat(n).reduce(function (e, t) {
          return e.replace(/%s/, t);
        }, e);
      }
      var R =
          'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',
        W = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
      function z(e) {
        return e.split("-")[0];
      }
      var $ = Math.max,
        I = Math.min,
        N = Math.round;
      function H(e, t) {
        var n = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (n && s(n)) {
          var i = t;
          do {
            if (i && e.isSameNode(i)) return !0;
            i = i.parentNode || i.host;
          } while (i);
        }
        return !1;
      }
      function F(e) {
        return Object.assign({}, e, {
          left: e.x,
          top: e.y,
          right: e.x + e.width,
          bottom: e.y + e.height,
        });
      }
      function V(e, r) {
        return r === T
          ? F(
              (function (e) {
                var t = n(e),
                  i = c(e),
                  r = t.visualViewport,
                  o = i.clientWidth,
                  s = i.clientHeight,
                  a = 0,
                  l = 0;
                return (
                  r &&
                    ((o = r.width),
                    (s = r.height),
                    /^((?!chrome|android).)*safari/i.test(
                      navigator.userAgent
                    ) || ((a = r.offsetLeft), (l = r.offsetTop))),
                  { width: o, height: s, x: a + u(e), y: l }
                );
              })(e)
            )
          : o(r)
          ? (function (e) {
              var n = t(e);
              return (
                (n.top = n.top + e.clientTop),
                (n.left = n.left + e.clientLeft),
                (n.bottom = n.top + e.clientHeight),
                (n.right = n.left + e.clientWidth),
                (n.width = e.clientWidth),
                (n.height = e.clientHeight),
                (n.x = n.left),
                (n.y = n.top),
                n
              );
            })(r)
          : F(
              (function (e) {
                var t,
                  n = c(e),
                  r = i(e),
                  o = null == (t = e.ownerDocument) ? void 0 : t.body,
                  s = $(
                    n.scrollWidth,
                    n.clientWidth,
                    o ? o.scrollWidth : 0,
                    o ? o.clientWidth : 0
                  ),
                  a = $(
                    n.scrollHeight,
                    n.clientHeight,
                    o ? o.scrollHeight : 0,
                    o ? o.clientHeight : 0
                  ),
                  f = -r.scrollLeft + u(e),
                  d = -r.scrollTop;
                return (
                  "rtl" === l(o || n).direction &&
                    (f += $(n.clientWidth, o ? o.clientWidth : 0) - s),
                  { width: s, height: a, x: f, y: d }
                );
              })(c(e))
            );
      }
      function B(e, t, n) {
        var i =
            "clippingParents" === t
              ? (function (e) {
                  var t = g(h(e)),
                    n =
                      ["absolute", "fixed"].indexOf(l(e).position) >= 0 && o(e)
                        ? b(e)
                        : e;
                  return r(n)
                    ? t.filter(function (e) {
                        return r(e) && H(e, n) && "body" !== a(e);
                      })
                    : [];
                })(e)
              : [].concat(t),
          s = [].concat(i, [n]),
          c = s[0],
          u = s.reduce(function (t, n) {
            var i = V(e, n);
            return (
              (t.top = $(i.top, t.top)),
              (t.right = I(i.right, t.right)),
              (t.bottom = I(i.bottom, t.bottom)),
              (t.left = $(i.left, t.left)),
              t
            );
          }, V(e, c));
        return (
          (u.width = u.right - u.left),
          (u.height = u.bottom - u.top),
          (u.x = u.left),
          (u.y = u.top),
          u
        );
      }
      function q(e) {
        return e.split("-")[1];
      }
      function G(e) {
        return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
      }
      function U(e) {
        var t,
          n = e.reference,
          i = e.element,
          r = e.placement,
          o = r ? z(r) : null,
          s = r ? q(r) : null,
          a = n.x + n.width / 2 - i.width / 2,
          c = n.y + n.height / 2 - i.height / 2;
        switch (o) {
          case w:
            t = { x: a, y: n.y - i.height };
            break;
          case x:
            t = { x: a, y: n.y + n.height };
            break;
          case _:
            t = { x: n.x + n.width, y: c };
            break;
          case O:
            t = { x: n.x - i.width, y: c };
            break;
          default:
            t = { x: n.x, y: n.y };
        }
        var u = o ? G(o) : null;
        if (null != u) {
          var l = "y" === u ? "height" : "width";
          switch (s) {
            case S:
              t[u] = t[u] - (n[l] / 2 - i[l] / 2);
              break;
            case A:
              t[u] = t[u] + (n[l] / 2 - i[l] / 2);
          }
        }
        return t;
      }
      function X(e) {
        return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
      }
      function Y(e, t) {
        return t.reduce(function (t, n) {
          return (t[n] = e), t;
        }, {});
      }
      function K(e, n) {
        void 0 === n && (n = {});
        var i = n,
          o = i.placement,
          s = void 0 === o ? e.placement : o,
          a = i.boundary,
          u = void 0 === a ? "clippingParents" : a,
          l = i.rootBoundary,
          f = void 0 === l ? T : l,
          d = i.elementContext,
          p = void 0 === d ? C : d,
          h = i.altBoundary,
          m = void 0 !== h && h,
          g = i.padding,
          v = void 0 === g ? 0 : g,
          y = X("number" != typeof v ? v : Y(v, k)),
          b = p === C ? "reference" : C,
          O = e.elements.reference,
          E = e.rects.popper,
          S = e.elements[m ? b : p],
          A = B(r(S) ? S : S.contextElement || c(e.elements.popper), u, f),
          M = t(O),
          j = U({
            reference: M,
            element: E,
            strategy: "absolute",
            placement: s,
          }),
          L = F(Object.assign({}, E, j)),
          P = p === C ? L : M,
          D = {
            top: A.top - P.top + y.top,
            bottom: P.bottom - A.bottom + y.bottom,
            left: A.left - P.left + y.left,
            right: P.right - A.right + y.right,
          },
          R = e.modifiersData.offset;
        if (p === C && R) {
          var W = R[s];
          Object.keys(D).forEach(function (e) {
            var t = [_, x].indexOf(e) >= 0 ? 1 : -1,
              n = [w, x].indexOf(e) >= 0 ? "y" : "x";
            D[e] += W[n] * t;
          });
        }
        return D;
      }
      var J =
          "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.",
        Z = { placement: "bottom", modifiers: [], strategy: "absolute" };
      function Q() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
          t[n] = arguments[n];
        return !t.some(function (e) {
          return !(e && "function" == typeof e.getBoundingClientRect);
        });
      }
      function ee(e) {
        void 0 === e && (e = {});
        var t = e,
          n = t.defaultModifiers,
          i = void 0 === n ? [] : n,
          o = t.defaultOptions,
          s = void 0 === o ? Z : o;
        return function (e, t, n) {
          void 0 === n && (n = s);
          var o,
            a,
            c = {
              placement: "bottom",
              orderedModifiers: [],
              options: Object.assign({}, Z, s),
              modifiersData: {},
              elements: { reference: e, popper: t },
              attributes: {},
              styles: {},
            },
            u = [],
            f = !1,
            h = {
              state: c,
              setOptions: function (n) {
                m(),
                  (c.options = Object.assign({}, s, c.options, n)),
                  (c.scrollParents = {
                    reference: r(e)
                      ? g(e)
                      : e.contextElement
                      ? g(e.contextElement)
                      : [],
                    popper: g(t),
                  });
                var o,
                  a,
                  f,
                  d = (function (e) {
                    var t = P(e);
                    return L.reduce(function (e, n) {
                      return e.concat(
                        t.filter(function (e) {
                          return e.phase === n;
                        })
                      );
                    }, []);
                  })(
                    (function (e) {
                      var t = e.reduce(function (e, t) {
                        var n = e[t.name];
                        return (
                          (e[t.name] = n
                            ? Object.assign({}, n, t, {
                                options: Object.assign(
                                  {},
                                  n.options,
                                  t.options
                                ),
                                data: Object.assign({}, n.data, t.data),
                              })
                            : t),
                          e
                        );
                      }, {});
                      return Object.keys(t).map(function (e) {
                        return t[e];
                      });
                    })([].concat(i, c.options.modifiers))
                  );
                ((c.orderedModifiers = d.filter(function (e) {
                  return e.enabled;
                })),
                (function (e) {
                  e.forEach(function (t) {
                    Object.keys(t).forEach(function (n) {
                      switch (n) {
                        case "name":
                          "string" != typeof t.name &&
                            console.error(
                              D(
                                R,
                                String(t.name),
                                '"name"',
                                '"string"',
                                '"' + String(t.name) + '"'
                              )
                            );
                          break;
                        case "enabled":
                          "boolean" != typeof t.enabled &&
                            console.error(
                              D(
                                R,
                                t.name,
                                '"enabled"',
                                '"boolean"',
                                '"' + String(t.enabled) + '"'
                              )
                            );
                        case "phase":
                          L.indexOf(t.phase) < 0 &&
                            console.error(
                              D(
                                R,
                                t.name,
                                '"phase"',
                                "either " + L.join(", "),
                                '"' + String(t.phase) + '"'
                              )
                            );
                          break;
                        case "fn":
                          "function" != typeof t.fn &&
                            console.error(
                              D(
                                R,
                                t.name,
                                '"fn"',
                                '"function"',
                                '"' + String(t.fn) + '"'
                              )
                            );
                          break;
                        case "effect":
                          "function" != typeof t.effect &&
                            console.error(
                              D(
                                R,
                                t.name,
                                '"effect"',
                                '"function"',
                                '"' + String(t.fn) + '"'
                              )
                            );
                          break;
                        case "requires":
                          Array.isArray(t.requires) ||
                            console.error(
                              D(
                                R,
                                t.name,
                                '"requires"',
                                '"array"',
                                '"' + String(t.requires) + '"'
                              )
                            );
                          break;
                        case "requiresIfExists":
                          Array.isArray(t.requiresIfExists) ||
                            console.error(
                              D(
                                R,
                                t.name,
                                '"requiresIfExists"',
                                '"array"',
                                '"' + String(t.requiresIfExists) + '"'
                              )
                            );
                          break;
                        case "options":
                        case "data":
                          break;
                        default:
                          console.error(
                            'PopperJS: an invalid property has been provided to the "' +
                              t.name +
                              '" modifier, valid properties are ' +
                              W.map(function (e) {
                                return '"' + e + '"';
                              }).join(", ") +
                              '; but "' +
                              n +
                              '" was provided.'
                          );
                      }
                      t.requires &&
                        t.requires.forEach(function (n) {
                          null ==
                            e.find(function (e) {
                              return e.name === n;
                            }) &&
                            console.error(
                              D(
                                'Popper: modifier "%s" requires "%s", but "%s" modifier is not available',
                                String(t.name),
                                n,
                                n
                              )
                            );
                        });
                    });
                  });
                })(
                  ((o = [].concat(d, c.options.modifiers)),
                  (a = function (e) {
                    return e.name;
                  }),
                  (f = new Set()),
                  o.filter(function (e) {
                    var t = a(e);
                    if (!f.has(t)) return f.add(t), !0;
                  }))
                ),
                z(c.options.placement) === E) &&
                  (c.orderedModifiers.find(function (e) {
                    return "flip" === e.name;
                  }) ||
                    console.error(
                      [
                        'Popper: "auto" placements require the "flip" modifier be',
                        "present and enabled to work.",
                      ].join(" ")
                    ));
                var p = l(t);
                return (
                  [
                    p.marginTop,
                    p.marginRight,
                    p.marginBottom,
                    p.marginLeft,
                  ].some(function (e) {
                    return parseFloat(e);
                  }) &&
                    console.warn(
                      [
                        'Popper: CSS "margin" styles cannot be used to apply padding',
                        "between the popper and its reference element or boundary.",
                        "To replicate margin, use the `offset` modifier, as well as",
                        "the `padding` option in the `preventOverflow` and `flip`",
                        "modifiers.",
                      ].join(" ")
                    ),
                  c.orderedModifiers.forEach(function (e) {
                    var t = e.name,
                      n = e.options,
                      i = void 0 === n ? {} : n,
                      r = e.effect;
                    if ("function" == typeof r) {
                      var o = r({ state: c, name: t, instance: h, options: i }),
                        s = function () {};
                      u.push(o || s);
                    }
                  }),
                  h.update()
                );
              },
              forceUpdate: function () {
                if (!f) {
                  var e = c.elements,
                    t = e.reference,
                    n = e.popper;
                  if (Q(t, n)) {
                    (c.rects = {
                      reference: d(t, b(n), "fixed" === c.options.strategy),
                      popper: p(n),
                    }),
                      (c.reset = !1),
                      (c.placement = c.options.placement),
                      c.orderedModifiers.forEach(function (e) {
                        return (c.modifiersData[e.name] = Object.assign(
                          {},
                          e.data
                        ));
                      });
                    for (var i = 0, r = 0; r < c.orderedModifiers.length; r++) {
                      if ((i += 1) > 100) {
                        console.error(
                          "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash."
                        );
                        break;
                      }
                      if (!0 !== c.reset) {
                        var o = c.orderedModifiers[r],
                          s = o.fn,
                          a = o.options,
                          u = void 0 === a ? {} : a,
                          l = o.name;
                        "function" == typeof s &&
                          (c =
                            s({ state: c, options: u, name: l, instance: h }) ||
                            c);
                      } else (c.reset = !1), (r = -1);
                    }
                  } else console.error(J);
                }
              },
              update:
                ((o = function () {
                  return new Promise(function (e) {
                    h.forceUpdate(), e(c);
                  });
                }),
                function () {
                  return (
                    a ||
                      (a = new Promise(function (e) {
                        Promise.resolve().then(function () {
                          (a = void 0), e(o());
                        });
                      })),
                    a
                  );
                }),
              destroy: function () {
                m(), (f = !0);
              },
            };
          if (!Q(e, t)) return console.error(J), h;
          function m() {
            u.forEach(function (e) {
              return e();
            }),
              (u = []);
          }
          return (
            h.setOptions(n).then(function (e) {
              !f && n.onFirstUpdate && n.onFirstUpdate(e);
            }),
            h
          );
        };
      }
      var te = { passive: !0 };
      var ne = {
        name: "eventListeners",
        enabled: !0,
        phase: "write",
        fn: function () {},
        effect: function (e) {
          var t = e.state,
            i = e.instance,
            r = e.options,
            o = r.scroll,
            s = void 0 === o || o,
            a = r.resize,
            c = void 0 === a || a,
            u = n(t.elements.popper),
            l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
          return (
            s &&
              l.forEach(function (e) {
                e.addEventListener("scroll", i.update, te);
              }),
            c && u.addEventListener("resize", i.update, te),
            function () {
              s &&
                l.forEach(function (e) {
                  e.removeEventListener("scroll", i.update, te);
                }),
                c && u.removeEventListener("resize", i.update, te);
            }
          );
        },
        data: {},
      };
      var ie = {
          name: "popperOffsets",
          enabled: !0,
          phase: "read",
          fn: function (e) {
            var t = e.state,
              n = e.name;
            t.modifiersData[n] = U({
              reference: t.rects.reference,
              element: t.rects.popper,
              strategy: "absolute",
              placement: t.placement,
            });
          },
          data: {},
        },
        re = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
      function oe(e) {
        var t,
          i = e.popper,
          r = e.popperRect,
          o = e.placement,
          s = e.offsets,
          a = e.position,
          u = e.gpuAcceleration,
          f = e.adaptive,
          d = e.roundOffsets,
          p =
            !0 === d
              ? (function (e) {
                  var t = e.x,
                    n = e.y,
                    i = window.devicePixelRatio || 1;
                  return { x: N(N(t * i) / i) || 0, y: N(N(n * i) / i) || 0 };
                })(s)
              : "function" == typeof d
              ? d(s)
              : s,
          h = p.x,
          m = void 0 === h ? 0 : h,
          g = p.y,
          v = void 0 === g ? 0 : g,
          y = s.hasOwnProperty("x"),
          E = s.hasOwnProperty("y"),
          k = O,
          S = w,
          A = window;
        if (f) {
          var T = b(i),
            C = "clientHeight",
            M = "clientWidth";
          T === n(i) &&
            "static" !== l((T = c(i))).position &&
            ((C = "scrollHeight"), (M = "scrollWidth")),
            o === w && ((S = x), (v -= T[C] - r.height), (v *= u ? 1 : -1)),
            o === O && ((k = _), (m -= T[M] - r.width), (m *= u ? 1 : -1));
        }
        var j,
          L = Object.assign({ position: a }, f && re);
        return u
          ? Object.assign(
              {},
              L,
              (((j = {})[S] = E ? "0" : ""),
              (j[k] = y ? "0" : ""),
              (j.transform =
                (A.devicePixelRatio || 1) < 2
                  ? "translate(" + m + "px, " + v + "px)"
                  : "translate3d(" + m + "px, " + v + "px, 0)"),
              j)
            )
          : Object.assign(
              {},
              L,
              (((t = {})[S] = E ? v + "px" : ""),
              (t[k] = y ? m + "px" : ""),
              (t.transform = ""),
              t)
            );
      }
      var se = {
        name: "computeStyles",
        enabled: !0,
        phase: "beforeWrite",
        fn: function (e) {
          var t = e.state,
            n = e.options,
            i = n.gpuAcceleration,
            r = void 0 === i || i,
            o = n.adaptive,
            s = void 0 === o || o,
            a = n.roundOffsets,
            c = void 0 === a || a,
            u = l(t.elements.popper).transitionProperty || "";
          s &&
            ["transform", "top", "right", "bottom", "left"].some(function (e) {
              return u.indexOf(e) >= 0;
            }) &&
            console.warn(
              [
                "Popper: Detected CSS transitions on at least one of the following",
                'CSS properties: "transform", "top", "right", "bottom", "left".',
                "\n\n",
                'Disable the "computeStyles" modifier\'s `adaptive` option to allow',
                "for smooth transitions, or remove these properties from the CSS",
                "transition declaration on the popper element if only transitioning",
                "opacity or background-color for example.",
                "\n\n",
                "We recommend using the popper element as a wrapper around an inner",
                "element that can have any CSS property transitioned for animations.",
              ].join(" ")
            );
          var f = {
            placement: z(t.placement),
            popper: t.elements.popper,
            popperRect: t.rects.popper,
            gpuAcceleration: r,
          };
          null != t.modifiersData.popperOffsets &&
            (t.styles.popper = Object.assign(
              {},
              t.styles.popper,
              oe(
                Object.assign({}, f, {
                  offsets: t.modifiersData.popperOffsets,
                  position: t.options.strategy,
                  adaptive: s,
                  roundOffsets: c,
                })
              )
            )),
            null != t.modifiersData.arrow &&
              (t.styles.arrow = Object.assign(
                {},
                t.styles.arrow,
                oe(
                  Object.assign({}, f, {
                    offsets: t.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: c,
                  })
                )
              )),
            (t.attributes.popper = Object.assign({}, t.attributes.popper, {
              "data-popper-placement": t.placement,
            }));
        },
        data: {},
      };
      var ae = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function (e) {
          var t = e.state;
          Object.keys(t.elements).forEach(function (e) {
            var n = t.styles[e] || {},
              i = t.attributes[e] || {},
              r = t.elements[e];
            o(r) &&
              a(r) &&
              (Object.assign(r.style, n),
              Object.keys(i).forEach(function (e) {
                var t = i[e];
                !1 === t
                  ? r.removeAttribute(e)
                  : r.setAttribute(e, !0 === t ? "" : t);
              }));
          });
        },
        effect: function (e) {
          var t = e.state,
            n = {
              popper: {
                position: t.options.strategy,
                left: "0",
                top: "0",
                margin: "0",
              },
              arrow: { position: "absolute" },
              reference: {},
            };
          return (
            Object.assign(t.elements.popper.style, n.popper),
            (t.styles = n),
            t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
            function () {
              Object.keys(t.elements).forEach(function (e) {
                var i = t.elements[e],
                  r = t.attributes[e] || {},
                  s = Object.keys(
                    t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]
                  ).reduce(function (e, t) {
                    return (e[t] = ""), e;
                  }, {});
                o(i) &&
                  a(i) &&
                  (Object.assign(i.style, s),
                  Object.keys(r).forEach(function (e) {
                    i.removeAttribute(e);
                  }));
              });
            }
          );
        },
        requires: ["computeStyles"],
      };
      var ce = {
          name: "offset",
          enabled: !0,
          phase: "main",
          requires: ["popperOffsets"],
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = e.name,
              r = n.offset,
              o = void 0 === r ? [0, 0] : r,
              s = j.reduce(function (e, n) {
                return (
                  (e[n] = (function (e, t, n) {
                    var i = z(e),
                      r = [O, w].indexOf(i) >= 0 ? -1 : 1,
                      o =
                        "function" == typeof n
                          ? n(Object.assign({}, t, { placement: e }))
                          : n,
                      s = o[0],
                      a = o[1];
                    return (
                      (s = s || 0),
                      (a = (a || 0) * r),
                      [O, _].indexOf(i) >= 0 ? { x: a, y: s } : { x: s, y: a }
                    );
                  })(n, t.rects, o)),
                  e
                );
              }, {}),
              a = s[t.placement],
              c = a.x,
              u = a.y;
            null != t.modifiersData.popperOffsets &&
              ((t.modifiersData.popperOffsets.x += c),
              (t.modifiersData.popperOffsets.y += u)),
              (t.modifiersData[i] = s);
          },
        },
        ue = { left: "right", right: "left", bottom: "top", top: "bottom" };
      function le(e) {
        return e.replace(/left|right|bottom|top/g, function (e) {
          return ue[e];
        });
      }
      var fe = { start: "end", end: "start" };
      function de(e) {
        return e.replace(/start|end/g, function (e) {
          return fe[e];
        });
      }
      var pe = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function (e) {
          var t = e.state,
            n = e.options,
            i = e.name;
          if (!t.modifiersData[i]._skip) {
            for (
              var r = n.mainAxis,
                o = void 0 === r || r,
                s = n.altAxis,
                a = void 0 === s || s,
                c = n.fallbackPlacements,
                u = n.padding,
                l = n.boundary,
                f = n.rootBoundary,
                d = n.altBoundary,
                p = n.flipVariations,
                h = void 0 === p || p,
                m = n.allowedAutoPlacements,
                g = t.options.placement,
                v = z(g),
                y =
                  c ||
                  (v === g || !h
                    ? [le(g)]
                    : (function (e) {
                        if (z(e) === E) return [];
                        var t = le(e);
                        return [de(e), t, de(t)];
                      })(g)),
                b = [g].concat(y).reduce(function (e, n) {
                  return e.concat(
                    z(n) === E
                      ? (function (e, t) {
                          void 0 === t && (t = {});
                          var n = t,
                            i = n.placement,
                            r = n.boundary,
                            o = n.rootBoundary,
                            s = n.padding,
                            a = n.flipVariations,
                            c = n.allowedAutoPlacements,
                            u = void 0 === c ? j : c,
                            l = q(i),
                            f = l
                              ? a
                                ? M
                                : M.filter(function (e) {
                                    return q(e) === l;
                                  })
                              : k,
                            d = f.filter(function (e) {
                              return u.indexOf(e) >= 0;
                            });
                          0 === d.length &&
                            ((d = f),
                            console.error(
                              [
                                "Popper: The `allowedAutoPlacements` option did not allow any",
                                "placements. Ensure the `placement` option matches the variation",
                                "of the allowed placements.",
                                'For example, "auto" cannot be used to allow "bottom-start".',
                                'Use "auto-start" instead.',
                              ].join(" ")
                            ));
                          var p = d.reduce(function (t, n) {
                            return (
                              (t[n] = K(e, {
                                placement: n,
                                boundary: r,
                                rootBoundary: o,
                                padding: s,
                              })[z(n)]),
                              t
                            );
                          }, {});
                          return Object.keys(p).sort(function (e, t) {
                            return p[e] - p[t];
                          });
                        })(t, {
                          placement: n,
                          boundary: l,
                          rootBoundary: f,
                          padding: u,
                          flipVariations: h,
                          allowedAutoPlacements: m,
                        })
                      : n
                  );
                }, []),
                A = t.rects.reference,
                T = t.rects.popper,
                C = new Map(),
                L = !0,
                P = b[0],
                D = 0;
              D < b.length;
              D++
            ) {
              var R = b[D],
                W = z(R),
                $ = q(R) === S,
                I = [w, x].indexOf(W) >= 0,
                N = I ? "width" : "height",
                H = K(t, {
                  placement: R,
                  boundary: l,
                  rootBoundary: f,
                  altBoundary: d,
                  padding: u,
                }),
                F = I ? ($ ? _ : O) : $ ? x : w;
              A[N] > T[N] && (F = le(F));
              var V = le(F),
                B = [];
              if (
                (o && B.push(H[W] <= 0),
                a && B.push(H[F] <= 0, H[V] <= 0),
                B.every(function (e) {
                  return e;
                }))
              ) {
                (P = R), (L = !1);
                break;
              }
              C.set(R, B);
            }
            if (L)
              for (
                var G = function (e) {
                    var t = b.find(function (t) {
                      var n = C.get(t);
                      if (n)
                        return n.slice(0, e).every(function (e) {
                          return e;
                        });
                    });
                    if (t) return (P = t), "break";
                  },
                  U = h ? 3 : 1;
                U > 0;
                U--
              ) {
                if ("break" === G(U)) break;
              }
            t.placement !== P &&
              ((t.modifiersData[i]._skip = !0),
              (t.placement = P),
              (t.reset = !0));
          }
        },
        requiresIfExists: ["offset"],
        data: { _skip: !1 },
      };
      function he(e, t, n) {
        return $(e, I(t, n));
      }
      var me = {
        name: "preventOverflow",
        enabled: !0,
        phase: "main",
        fn: function (e) {
          var t = e.state,
            n = e.options,
            i = e.name,
            r = n.mainAxis,
            o = void 0 === r || r,
            s = n.altAxis,
            a = void 0 !== s && s,
            c = n.boundary,
            u = n.rootBoundary,
            l = n.altBoundary,
            f = n.padding,
            d = n.tether,
            h = void 0 === d || d,
            m = n.tetherOffset,
            g = void 0 === m ? 0 : m,
            v = K(t, {
              boundary: c,
              rootBoundary: u,
              padding: f,
              altBoundary: l,
            }),
            y = z(t.placement),
            E = q(t.placement),
            k = !E,
            A = G(y),
            T = "x" === A ? "y" : "x",
            C = t.modifiersData.popperOffsets,
            M = t.rects.reference,
            j = t.rects.popper,
            L =
              "function" == typeof g
                ? g(Object.assign({}, t.rects, { placement: t.placement }))
                : g,
            P = { x: 0, y: 0 };
          if (C) {
            if (o || a) {
              var D = "y" === A ? w : O,
                R = "y" === A ? x : _,
                W = "y" === A ? "height" : "width",
                N = C[A],
                H = C[A] + v[D],
                F = C[A] - v[R],
                V = h ? -j[W] / 2 : 0,
                B = E === S ? M[W] : j[W],
                U = E === S ? -j[W] : -M[W],
                X = t.elements.arrow,
                Y = h && X ? p(X) : { width: 0, height: 0 },
                J = t.modifiersData["arrow#persistent"]
                  ? t.modifiersData["arrow#persistent"].padding
                  : { top: 0, right: 0, bottom: 0, left: 0 },
                Z = J[D],
                Q = J[R],
                ee = he(0, M[W], Y[W]),
                te = k ? M[W] / 2 - V - ee - Z - L : B - ee - Z - L,
                ne = k ? -M[W] / 2 + V + ee + Q + L : U + ee + Q + L,
                ie = t.elements.arrow && b(t.elements.arrow),
                re = ie
                  ? "y" === A
                    ? ie.clientTop || 0
                    : ie.clientLeft || 0
                  : 0,
                oe = t.modifiersData.offset
                  ? t.modifiersData.offset[t.placement][A]
                  : 0,
                se = C[A] + te - oe - re,
                ae = C[A] + ne - oe;
              if (o) {
                var ce = he(h ? I(H, se) : H, N, h ? $(F, ae) : F);
                (C[A] = ce), (P[A] = ce - N);
              }
              if (a) {
                var ue = "x" === A ? w : O,
                  le = "x" === A ? x : _,
                  fe = C[T],
                  de = fe + v[ue],
                  pe = fe - v[le],
                  me = he(h ? I(de, se) : de, fe, h ? $(pe, ae) : pe);
                (C[T] = me), (P[T] = me - fe);
              }
            }
            t.modifiersData[i] = P;
          }
        },
        requiresIfExists: ["offset"],
      };
      var ge = {
        name: "arrow",
        enabled: !0,
        phase: "main",
        fn: function (e) {
          var t,
            n = e.state,
            i = e.name,
            r = e.options,
            o = n.elements.arrow,
            s = n.modifiersData.popperOffsets,
            a = z(n.placement),
            c = G(a),
            u = [O, _].indexOf(a) >= 0 ? "height" : "width";
          if (o && s) {
            var l = (function (e, t) {
                return X(
                  "number" !=
                    typeof (e =
                      "function" == typeof e
                        ? e(
                            Object.assign({}, t.rects, {
                              placement: t.placement,
                            })
                          )
                        : e)
                    ? e
                    : Y(e, k)
                );
              })(r.padding, n),
              f = p(o),
              d = "y" === c ? w : O,
              h = "y" === c ? x : _,
              m =
                n.rects.reference[u] +
                n.rects.reference[c] -
                s[c] -
                n.rects.popper[u],
              g = s[c] - n.rects.reference[c],
              v = b(o),
              y = v
                ? "y" === c
                  ? v.clientHeight || 0
                  : v.clientWidth || 0
                : 0,
              E = m / 2 - g / 2,
              S = l[d],
              A = y - f[u] - l[h],
              T = y / 2 - f[u] / 2 + E,
              C = he(S, T, A),
              M = c;
            n.modifiersData[i] =
              (((t = {})[M] = C), (t.centerOffset = C - T), t);
          }
        },
        effect: function (e) {
          var t = e.state,
            n = e.options.element,
            i = void 0 === n ? "[data-popper-arrow]" : n;
          null != i &&
            ("string" != typeof i ||
              (i = t.elements.popper.querySelector(i))) &&
            (o(i) ||
              console.error(
                [
                  'Popper: "arrow" element must be an HTMLElement (not an SVGElement).',
                  "To use an SVG arrow, wrap it in an HTMLElement that will be used as",
                  "the arrow.",
                ].join(" ")
              ),
            H(t.elements.popper, i)
              ? (t.elements.arrow = i)
              : console.error(
                  [
                    'Popper: "arrow" modifier\'s `element` must be a child of the popper',
                    "element.",
                  ].join(" ")
                ));
        },
        requires: ["popperOffsets"],
        requiresIfExists: ["preventOverflow"],
      };
      function ve(e, t, n) {
        return (
          void 0 === n && (n = { x: 0, y: 0 }),
          {
            top: e.top - t.height - n.y,
            right: e.right - t.width + n.x,
            bottom: e.bottom - t.height + n.y,
            left: e.left - t.width - n.x,
          }
        );
      }
      function ye(e) {
        return [w, _, x, O].some(function (t) {
          return e[t] >= 0;
        });
      }
      var be = {
          name: "hide",
          enabled: !0,
          phase: "main",
          requiresIfExists: ["preventOverflow"],
          fn: function (e) {
            var t = e.state,
              n = e.name,
              i = t.rects.reference,
              r = t.rects.popper,
              o = t.modifiersData.preventOverflow,
              s = K(t, { elementContext: "reference" }),
              a = K(t, { altBoundary: !0 }),
              c = ve(s, i),
              u = ve(a, r, o),
              l = ye(c),
              f = ye(u);
            (t.modifiersData[n] = {
              referenceClippingOffsets: c,
              popperEscapeOffsets: u,
              isReferenceHidden: l,
              hasPopperEscaped: f,
            }),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-reference-hidden": l,
                "data-popper-escaped": f,
              }));
          },
        },
        we = ee({ defaultModifiers: [ne, ie, se, ae] }),
        xe = [ne, ie, se, ae, ce, pe, me, ge, be],
        _e = ee({ defaultModifiers: xe });
      (e.applyStyles = ae),
        (e.arrow = ge),
        (e.computeStyles = se),
        (e.createPopper = _e),
        (e.createPopperLite = we),
        (e.defaultModifiers = xe),
        (e.detectOverflow = K),
        (e.eventListeners = ne),
        (e.flip = pe),
        (e.hide = be),
        (e.offset = ce),
        (e.popperGenerator = ee),
        (e.popperOffsets = ie),
        (e.preventOverflow = me);
    }),
    Qn = Jn((e) => {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var t = Zn(),
        n = "tippy-content",
        i = "tippy-backdrop",
        r = "tippy-arrow",
        o = "tippy-svg-arrow",
        s = { passive: !0, capture: !0 };
      function a(e, t, n) {
        if (Array.isArray(e)) {
          var i = e[t];
          return null == i ? (Array.isArray(n) ? n[t] : n) : i;
        }
        return e;
      }
      function c(e, t) {
        var n = {}.toString.call(e);
        return 0 === n.indexOf("[object") && n.indexOf(t + "]") > -1;
      }
      function u(e, t) {
        return "function" == typeof e ? e.apply(void 0, t) : e;
      }
      function l(e, t) {
        return 0 === t
          ? e
          : function (i) {
              clearTimeout(n),
                (n = setTimeout(function () {
                  e(i);
                }, t));
            };
        var n;
      }
      function f(e, t) {
        var n = Object.assign({}, e);
        return (
          t.forEach(function (e) {
            delete n[e];
          }),
          n
        );
      }
      function d(e) {
        return [].concat(e);
      }
      function p(e, t) {
        -1 === e.indexOf(t) && e.push(t);
      }
      function h(e) {
        return e.split("-")[0];
      }
      function m(e) {
        return [].slice.call(e);
      }
      function g() {
        return document.createElement("div");
      }
      function v(e) {
        return ["Element", "Fragment"].some(function (t) {
          return c(e, t);
        });
      }
      function y(e) {
        return c(e, "MouseEvent");
      }
      function b(e) {
        return !(!e || !e._tippy || e._tippy.reference !== e);
      }
      function w(e) {
        return v(e)
          ? [e]
          : (function (e) {
              return c(e, "NodeList");
            })(e)
          ? m(e)
          : Array.isArray(e)
          ? e
          : m(document.querySelectorAll(e));
      }
      function x(e, t) {
        e.forEach(function (e) {
          e && (e.style.transitionDuration = t + "ms");
        });
      }
      function _(e, t) {
        e.forEach(function (e) {
          e && e.setAttribute("data-state", t);
        });
      }
      function O(e) {
        var t,
          n = d(e)[0];
        return (null == n || null == (t = n.ownerDocument) ? void 0 : t.body)
          ? n.ownerDocument
          : document;
      }
      function E(e, t, n) {
        var i = t + "EventListener";
        ["transitionend", "webkitTransitionEnd"].forEach(function (t) {
          e[i](t, n);
        });
      }
      var k = { isTouch: !1 },
        S = 0;
      function A() {
        k.isTouch ||
          ((k.isTouch = !0),
          window.performance && document.addEventListener("mousemove", T));
      }
      function T() {
        var e = performance.now();
        e - S < 20 &&
          ((k.isTouch = !1), document.removeEventListener("mousemove", T)),
          (S = e);
      }
      function C() {
        var e = document.activeElement;
        if (b(e)) {
          var t = e._tippy;
          e.blur && !t.state.isVisible && e.blur();
        }
      }
      var M,
        j =
          "undefined" != typeof window && "undefined" != typeof document
            ? navigator.userAgent
            : "",
        L = /MSIE |Trident\//.test(j);
      function P(e) {
        return [
          e +
            "() was called on a" +
            ("destroy" === e ? "n already-" : " ") +
            "destroyed instance. This is a no-op but",
          "indicates a potential memory leak.",
        ].join(" ");
      }
      function D(e) {
        return e
          .replace(/[ \t]{2,}/g, " ")
          .replace(/^[ \t]*/gm, "")
          .trim();
      }
      function R(e) {
        return D(
          "\n  %ctippy.js\n\n  %c" +
            D(e) +
            "\n\n  %c👷‍ This is a development-only message. It will be removed in production.\n  "
        );
      }
      function W(e) {
        return [
          R(e),
          "color: #00C584; font-size: 1.3em; font-weight: bold;",
          "line-height: 1.5",
          "color: #a6a095;",
        ];
      }
      function z(e, t) {
        var n;
        e && !M.has(t) && (M.add(t), (n = console).warn.apply(n, W(t)));
      }
      function $(e, t) {
        var n;
        e && !M.has(t) && (M.add(t), (n = console).error.apply(n, W(t)));
      }
      M = new Set();
      var I = {
          animateFill: !1,
          followCursor: !1,
          inlinePositioning: !1,
          sticky: !1,
        },
        N = Object.assign(
          {
            appendTo: function () {
              return document.body;
            },
            aria: { content: "auto", expanded: "auto" },
            delay: 0,
            duration: [300, 250],
            getReferenceClientRect: null,
            hideOnClick: !0,
            ignoreAttributes: !1,
            interactive: !1,
            interactiveBorder: 2,
            interactiveDebounce: 0,
            moveTransition: "",
            offset: [0, 10],
            onAfterUpdate: function () {},
            onBeforeUpdate: function () {},
            onCreate: function () {},
            onDestroy: function () {},
            onHidden: function () {},
            onHide: function () {},
            onMount: function () {},
            onShow: function () {},
            onShown: function () {},
            onTrigger: function () {},
            onUntrigger: function () {},
            onClickOutside: function () {},
            placement: "top",
            plugins: [],
            popperOptions: {},
            render: null,
            showOnCreate: !1,
            touch: !0,
            trigger: "mouseenter focus",
            triggerTarget: null,
          },
          I,
          {},
          {
            allowHTML: !1,
            animation: "fade",
            arrow: !0,
            content: "",
            inertia: !1,
            maxWidth: 350,
            role: "tooltip",
            theme: "",
            zIndex: 9999,
          }
        ),
        H = Object.keys(N);
      function F(e) {
        var t = (e.plugins || []).reduce(function (t, n) {
          var i = n.name,
            r = n.defaultValue;
          return i && (t[i] = void 0 !== e[i] ? e[i] : r), t;
        }, {});
        return Object.assign({}, e, {}, t);
      }
      function V(e, t) {
        var n = Object.assign(
          {},
          t,
          { content: u(t.content, [e]) },
          t.ignoreAttributes
            ? {}
            : (function (e, t) {
                return (t
                  ? Object.keys(F(Object.assign({}, N, { plugins: t })))
                  : H
                ).reduce(function (t, n) {
                  var i = (e.getAttribute("data-tippy-" + n) || "").trim();
                  if (!i) return t;
                  if ("content" === n) t[n] = i;
                  else
                    try {
                      t[n] = JSON.parse(i);
                    } catch (e) {
                      t[n] = i;
                    }
                  return t;
                }, {});
              })(e, t.plugins)
        );
        return (
          (n.aria = Object.assign({}, N.aria, {}, n.aria)),
          (n.aria = {
            expanded:
              "auto" === n.aria.expanded ? t.interactive : n.aria.expanded,
            content:
              "auto" === n.aria.content
                ? t.interactive
                  ? null
                  : "describedby"
                : n.aria.content,
          }),
          n
        );
      }
      function B(e, t) {
        void 0 === e && (e = {}),
          void 0 === t && (t = []),
          Object.keys(e).forEach(function (e) {
            var n,
              i,
              r = f(N, Object.keys(I)),
              o = ((n = r), (i = e), !{}.hasOwnProperty.call(n, i));
            o &&
              (o =
                0 ===
                t.filter(function (t) {
                  return t.name === e;
                }).length),
              z(
                o,
                [
                  "`" + e + "`",
                  "is not a valid prop. You may have spelled it incorrectly, or if it's",
                  "a plugin, forgot to pass it in an array as props.plugins.",
                  "\n\n",
                  "All props: https://atomiks.github.io/tippyjs/v6/all-props/\n",
                  "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/",
                ].join(" ")
              );
          });
      }
      function q(e, t) {
        e.innerHTML = t;
      }
      function G(e) {
        var t = g();
        return (
          !0 === e
            ? (t.className = r)
            : ((t.className = o), v(e) ? t.appendChild(e) : q(t, e)),
          t
        );
      }
      function U(e, t) {
        v(t.content)
          ? (q(e, ""), e.appendChild(t.content))
          : "function" != typeof t.content &&
            (t.allowHTML ? q(e, t.content) : (e.textContent = t.content));
      }
      function X(e) {
        var t = e.firstElementChild,
          s = m(t.children);
        return {
          box: t,
          content: s.find(function (e) {
            return e.classList.contains(n);
          }),
          arrow: s.find(function (e) {
            return e.classList.contains(r) || e.classList.contains(o);
          }),
          backdrop: s.find(function (e) {
            return e.classList.contains(i);
          }),
        };
      }
      function Y(e) {
        var t = g(),
          i = g();
        (i.className = "tippy-box"),
          i.setAttribute("data-state", "hidden"),
          i.setAttribute("tabindex", "-1");
        var r = g();
        function o(n, i) {
          var r = X(t),
            o = r.box,
            s = r.content,
            a = r.arrow;
          i.theme
            ? o.setAttribute("data-theme", i.theme)
            : o.removeAttribute("data-theme"),
            "string" == typeof i.animation
              ? o.setAttribute("data-animation", i.animation)
              : o.removeAttribute("data-animation"),
            i.inertia
              ? o.setAttribute("data-inertia", "")
              : o.removeAttribute("data-inertia"),
            (o.style.maxWidth =
              "number" == typeof i.maxWidth ? i.maxWidth + "px" : i.maxWidth),
            i.role ? o.setAttribute("role", i.role) : o.removeAttribute("role"),
            (n.content === i.content && n.allowHTML === i.allowHTML) ||
              U(s, e.props),
            i.arrow
              ? a
                ? n.arrow !== i.arrow &&
                  (o.removeChild(a), o.appendChild(G(i.arrow)))
                : o.appendChild(G(i.arrow))
              : a && o.removeChild(a);
        }
        return (
          (r.className = n),
          r.setAttribute("data-state", "hidden"),
          U(r, e.props),
          t.appendChild(i),
          i.appendChild(r),
          o(e.props, e.props),
          { popper: t, onUpdate: o }
        );
      }
      Y.$$tippy = !0;
      var K = 1,
        J = [],
        Z = [];
      function Q(e, n) {
        var i,
          r,
          o,
          c,
          f,
          v,
          b,
          w,
          S,
          A = V(
            e,
            Object.assign(
              {},
              N,
              {},
              F(
                ((i = n),
                Object.keys(i).reduce(function (e, t) {
                  return void 0 !== i[t] && (e[t] = i[t]), e;
                }, {}))
              )
            )
          ),
          T = !1,
          C = !1,
          M = !1,
          j = !1,
          D = [],
          R = l(xe, A.interactiveDebounce),
          W = K++,
          I = (S = A.plugins).filter(function (e, t) {
            return S.indexOf(e) === t;
          }),
          H = {
            id: W,
            reference: e,
            popper: g(),
            popperInstance: null,
            props: A,
            state: {
              isEnabled: !0,
              isVisible: !1,
              isDestroyed: !1,
              isMounted: !1,
              isShown: !1,
            },
            plugins: I,
            clearDelayTimeouts: function () {
              clearTimeout(r), clearTimeout(o), cancelAnimationFrame(c);
            },
            setProps: function (t) {
              z(H.state.isDestroyed, P("setProps"));
              if (H.state.isDestroyed) return;
              ae("onBeforeUpdate", [H, t]), be();
              var n = H.props,
                i = V(
                  e,
                  Object.assign({}, H.props, {}, t, { ignoreAttributes: !0 })
                );
              (H.props = i),
                ye(),
                n.interactiveDebounce !== i.interactiveDebounce &&
                  (le(), (R = l(xe, i.interactiveDebounce)));
              n.triggerTarget && !i.triggerTarget
                ? d(n.triggerTarget).forEach(function (e) {
                    e.removeAttribute("aria-expanded");
                  })
                : i.triggerTarget && e.removeAttribute("aria-expanded");
              ue(), se(), G && G(n, i);
              H.popperInstance &&
                (ke(),
                Ae().forEach(function (e) {
                  requestAnimationFrame(e._tippy.popperInstance.forceUpdate);
                }));
              ae("onAfterUpdate", [H, t]);
            },
            setContent: function (e) {
              H.setProps({ content: e });
            },
            show: function () {
              z(H.state.isDestroyed, P("show"));
              var e = H.state.isVisible,
                t = H.state.isDestroyed,
                n = !H.state.isEnabled,
                i = k.isTouch && !H.props.touch,
                r = a(H.props.duration, 0, N.duration);
              if (e || t || n || i) return;
              if (ne().hasAttribute("disabled")) return;
              if ((ae("onShow", [H], !1), !1 === H.props.onShow(H))) return;
              (H.state.isVisible = !0),
                te() && (q.style.visibility = "visible");
              se(), he(), H.state.isMounted || (q.style.transition = "none");
              if (te()) {
                var o = re(),
                  s = o.box,
                  c = o.content;
                x([s, c], 0);
              }
              (b = function () {
                var e;
                if (H.state.isVisible && !j) {
                  if (
                    ((j = !0),
                    q.offsetHeight,
                    (q.style.transition = H.props.moveTransition),
                    te() && H.props.animation)
                  ) {
                    var t = re(),
                      n = t.box,
                      i = t.content;
                    x([n, i], r), _([n, i], "visible");
                  }
                  ce(),
                    ue(),
                    p(Z, H),
                    null == (e = H.popperInstance) || e.forceUpdate(),
                    (H.state.isMounted = !0),
                    ae("onMount", [H]),
                    H.props.animation &&
                      te() &&
                      (function (e, t) {
                        ge(e, t);
                      })(r, function () {
                        (H.state.isShown = !0), ae("onShown", [H]);
                      });
                }
              }),
                (function () {
                  var e,
                    t = H.props.appendTo,
                    n = ne();
                  e =
                    (H.props.interactive && t === N.appendTo) || "parent" === t
                      ? n.parentNode
                      : u(t, [n]);
                  e.contains(q) || e.appendChild(q);
                  ke(),
                    z(
                      H.props.interactive &&
                        t === N.appendTo &&
                        n.nextElementSibling !== q,
                      [
                        "Interactive tippy element may not be accessible via keyboard",
                        "navigation because it is not directly after the reference element",
                        "in the DOM source order.",
                        "\n\n",
                        "Using a wrapper <div> or <span> tag around the reference element",
                        "solves this by creating a new parentNode context.",
                        "\n\n",
                        "Specifying `appendTo: document.body` silences this warning, but it",
                        "assumes you are using a focus management solution to handle",
                        "keyboard navigation.",
                        "\n\n",
                        "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity",
                      ].join(" ")
                    );
                })();
            },
            hide: function () {
              z(H.state.isDestroyed, P("hide"));
              var e = !H.state.isVisible,
                t = H.state.isDestroyed,
                n = !H.state.isEnabled,
                i = a(H.props.duration, 1, N.duration);
              if (e || t || n) return;
              if ((ae("onHide", [H], !1), !1 === H.props.onHide(H))) return;
              (H.state.isVisible = !1),
                (H.state.isShown = !1),
                (j = !1),
                (T = !1),
                te() && (q.style.visibility = "hidden");
              if ((le(), me(), se(), te())) {
                var r = re(),
                  o = r.box,
                  s = r.content;
                H.props.animation && (x([o, s], i), _([o, s], "hidden"));
              }
              ce(),
                ue(),
                H.props.animation
                  ? te() &&
                    (function (e, t) {
                      ge(e, function () {
                        !H.state.isVisible &&
                          q.parentNode &&
                          q.parentNode.contains(q) &&
                          t();
                      });
                    })(i, H.unmount)
                  : H.unmount();
            },
            hideWithInteractivity: function (e) {
              z(H.state.isDestroyed, P("hideWithInteractivity"));
              ie().addEventListener("mousemove", R), p(J, R), R(e);
            },
            enable: function () {
              H.state.isEnabled = !0;
            },
            disable: function () {
              H.hide(), (H.state.isEnabled = !1);
            },
            unmount: function () {
              z(H.state.isDestroyed, P("unmount"));
              H.state.isVisible && H.hide();
              if (!H.state.isMounted) return;
              Se(),
                Ae().forEach(function (e) {
                  e._tippy.unmount();
                }),
                q.parentNode && q.parentNode.removeChild(q);
              (Z = Z.filter(function (e) {
                return e !== H;
              })),
                (H.state.isMounted = !1),
                ae("onHidden", [H]);
            },
            destroy: function () {
              z(H.state.isDestroyed, P("destroy"));
              if (H.state.isDestroyed) return;
              H.clearDelayTimeouts(),
                H.unmount(),
                be(),
                delete e._tippy,
                (H.state.isDestroyed = !0),
                ae("onDestroy", [H]);
            },
          };
        if (!A.render)
          return $(!0, "render() function has not been supplied."), H;
        var B = A.render(H),
          q = B.popper,
          G = B.onUpdate;
        q.setAttribute("data-tippy-root", ""),
          (q.id = "tippy-" + H.id),
          (H.popper = q),
          (e._tippy = H),
          (q._tippy = H);
        var U = I.map(function (e) {
            return e.fn(H);
          }),
          Y = e.hasAttribute("aria-expanded");
        return (
          ye(),
          ue(),
          se(),
          ae("onCreate", [H]),
          A.showOnCreate && Te(),
          q.addEventListener("mouseenter", function () {
            H.props.interactive && H.state.isVisible && H.clearDelayTimeouts();
          }),
          q.addEventListener("mouseleave", function (e) {
            H.props.interactive &&
              H.props.trigger.indexOf("mouseenter") >= 0 &&
              (ie().addEventListener("mousemove", R), R(e));
          }),
          H
        );
        function Q() {
          var e = H.props.touch;
          return Array.isArray(e) ? e : [e, 0];
        }
        function ee() {
          return "hold" === Q()[0];
        }
        function te() {
          var e;
          return !!(null == (e = H.props.render) ? void 0 : e.$$tippy);
        }
        function ne() {
          return w || e;
        }
        function ie() {
          var e = ne().parentNode;
          return e ? O(e) : document;
        }
        function re() {
          return X(q);
        }
        function oe(e) {
          return (H.state.isMounted && !H.state.isVisible) ||
            k.isTouch ||
            (f && "focus" === f.type)
            ? 0
            : a(H.props.delay, e ? 0 : 1, N.delay);
        }
        function se() {
          (q.style.pointerEvents =
            H.props.interactive && H.state.isVisible ? "" : "none"),
            (q.style.zIndex = "" + H.props.zIndex);
        }
        function ae(e, t, n) {
          var i;
          (void 0 === n && (n = !0),
          U.forEach(function (n) {
            n[e] && n[e].apply(void 0, t);
          }),
          n) && (i = H.props)[e].apply(i, t);
        }
        function ce() {
          var t = H.props.aria;
          if (t.content) {
            var n = "aria-" + t.content,
              i = q.id;
            d(H.props.triggerTarget || e).forEach(function (e) {
              var t = e.getAttribute(n);
              if (H.state.isVisible) e.setAttribute(n, t ? t + " " + i : i);
              else {
                var r = t && t.replace(i, "").trim();
                r ? e.setAttribute(n, r) : e.removeAttribute(n);
              }
            });
          }
        }
        function ue() {
          !Y &&
            H.props.aria.expanded &&
            d(H.props.triggerTarget || e).forEach(function (e) {
              H.props.interactive
                ? e.setAttribute(
                    "aria-expanded",
                    H.state.isVisible && e === ne() ? "true" : "false"
                  )
                : e.removeAttribute("aria-expanded");
            });
        }
        function le() {
          ie().removeEventListener("mousemove", R),
            (J = J.filter(function (e) {
              return e !== R;
            }));
        }
        function fe(e) {
          if (
            !(
              (k.isTouch && (M || "mousedown" === e.type)) ||
              (H.props.interactive && q.contains(e.target))
            )
          ) {
            if (ne().contains(e.target)) {
              if (k.isTouch) return;
              if (H.state.isVisible && H.props.trigger.indexOf("click") >= 0)
                return;
            } else ae("onClickOutside", [H, e]);
            !0 === H.props.hideOnClick &&
              (H.clearDelayTimeouts(),
              H.hide(),
              (C = !0),
              setTimeout(function () {
                C = !1;
              }),
              H.state.isMounted || me());
          }
        }
        function de() {
          M = !0;
        }
        function pe() {
          M = !1;
        }
        function he() {
          var e = ie();
          e.addEventListener("mousedown", fe, !0),
            e.addEventListener("touchend", fe, s),
            e.addEventListener("touchstart", pe, s),
            e.addEventListener("touchmove", de, s);
        }
        function me() {
          var e = ie();
          e.removeEventListener("mousedown", fe, !0),
            e.removeEventListener("touchend", fe, s),
            e.removeEventListener("touchstart", pe, s),
            e.removeEventListener("touchmove", de, s);
        }
        function ge(e, t) {
          var n = re().box;
          function i(e) {
            e.target === n && (E(n, "remove", i), t());
          }
          if (0 === e) return t();
          E(n, "remove", v), E(n, "add", i), (v = i);
        }
        function ve(t, n, i) {
          void 0 === i && (i = !1),
            d(H.props.triggerTarget || e).forEach(function (e) {
              e.addEventListener(t, n, i),
                D.push({ node: e, eventType: t, handler: n, options: i });
            });
        }
        function ye() {
          var e;
          ee() &&
            (ve("touchstart", we, { passive: !0 }),
            ve("touchend", _e, { passive: !0 })),
            ((e = H.props.trigger), e.split(/\s+/).filter(Boolean)).forEach(
              function (e) {
                if ("manual" !== e)
                  switch ((ve(e, we), e)) {
                    case "mouseenter":
                      ve("mouseleave", _e);
                      break;
                    case "focus":
                      ve(L ? "focusout" : "blur", Oe);
                      break;
                    case "focusin":
                      ve("focusout", Oe);
                  }
              }
            );
        }
        function be() {
          D.forEach(function (e) {
            var t = e.node,
              n = e.eventType,
              i = e.handler,
              r = e.options;
            t.removeEventListener(n, i, r);
          }),
            (D = []);
        }
        function we(e) {
          var t,
            n = !1;
          if (H.state.isEnabled && !Ee(e) && !C) {
            var i = "focus" === (null == (t = f) ? void 0 : t.type);
            (f = e),
              (w = e.currentTarget),
              ue(),
              !H.state.isVisible &&
                y(e) &&
                J.forEach(function (t) {
                  return t(e);
                }),
              "click" === e.type &&
              (H.props.trigger.indexOf("mouseenter") < 0 || T) &&
              !1 !== H.props.hideOnClick &&
              H.state.isVisible
                ? (n = !0)
                : Te(e),
              "click" === e.type && (T = !n),
              n && !i && Ce(e);
          }
        }
        function xe(e) {
          var t = e.target,
            n = ne().contains(t) || q.contains(t);
          ("mousemove" === e.type && n) ||
            ((function (e, t) {
              var n = t.clientX,
                i = t.clientY;
              return e.every(function (e) {
                var t = e.popperRect,
                  r = e.popperState,
                  o = e.props.interactiveBorder,
                  s = h(r.placement),
                  a = r.modifiersData.offset;
                if (!a) return !0;
                var c = "bottom" === s ? a.top.y : 0,
                  u = "top" === s ? a.bottom.y : 0,
                  l = "right" === s ? a.left.x : 0,
                  f = "left" === s ? a.right.x : 0,
                  d = t.top - i + c > o,
                  p = i - t.bottom - u > o,
                  m = t.left - n + l > o,
                  g = n - t.right - f > o;
                return d || p || m || g;
              });
            })(
              Ae()
                .concat(q)
                .map(function (e) {
                  var t,
                    n =
                      null == (t = e._tippy.popperInstance) ? void 0 : t.state;
                  return n
                    ? {
                        popperRect: e.getBoundingClientRect(),
                        popperState: n,
                        props: A,
                      }
                    : null;
                })
                .filter(Boolean),
              e
            ) &&
              (le(), Ce(e)));
        }
        function _e(e) {
          Ee(e) ||
            (H.props.trigger.indexOf("click") >= 0 && T) ||
            (H.props.interactive ? H.hideWithInteractivity(e) : Ce(e));
        }
        function Oe(e) {
          (H.props.trigger.indexOf("focusin") < 0 && e.target !== ne()) ||
            (H.props.interactive &&
              e.relatedTarget &&
              q.contains(e.relatedTarget)) ||
            Ce(e);
        }
        function Ee(e) {
          return !!k.isTouch && ee() !== e.type.indexOf("touch") >= 0;
        }
        function ke() {
          Se();
          var n = H.props,
            i = n.popperOptions,
            r = n.placement,
            o = n.offset,
            s = n.getReferenceClientRect,
            a = n.moveTransition,
            c = te() ? X(q).arrow : null,
            u = s
              ? {
                  getBoundingClientRect: s,
                  contextElement: s.contextElement || ne(),
                }
              : e,
            l = [
              { name: "offset", options: { offset: o } },
              {
                name: "preventOverflow",
                options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
              },
              { name: "flip", options: { padding: 5 } },
              { name: "computeStyles", options: { adaptive: !a } },
              {
                name: "$$tippy",
                enabled: !0,
                phase: "beforeWrite",
                requires: ["computeStyles"],
                fn: function (e) {
                  var t = e.state;
                  if (te()) {
                    var n = re().box;
                    ["placement", "reference-hidden", "escaped"].forEach(
                      function (e) {
                        "placement" === e
                          ? n.setAttribute("data-placement", t.placement)
                          : t.attributes.popper["data-popper-" + e]
                          ? n.setAttribute("data-" + e, "")
                          : n.removeAttribute("data-" + e);
                      }
                    ),
                      (t.attributes.popper = {});
                  }
                },
              },
            ];
          te() &&
            c &&
            l.push({ name: "arrow", options: { element: c, padding: 3 } }),
            l.push.apply(l, (null == i ? void 0 : i.modifiers) || []),
            (H.popperInstance = t.createPopper(
              u,
              q,
              Object.assign({}, i, {
                placement: r,
                onFirstUpdate: b,
                modifiers: l,
              })
            ));
        }
        function Se() {
          H.popperInstance &&
            (H.popperInstance.destroy(), (H.popperInstance = null));
        }
        function Ae() {
          return m(q.querySelectorAll("[data-tippy-root]"));
        }
        function Te(e) {
          H.clearDelayTimeouts(), e && ae("onTrigger", [H, e]), he();
          var t = oe(!0),
            n = Q(),
            i = n[0],
            o = n[1];
          k.isTouch && "hold" === i && o && (t = o),
            t
              ? (r = setTimeout(function () {
                  H.show();
                }, t))
              : H.show();
        }
        function Ce(e) {
          if (
            (H.clearDelayTimeouts(),
            ae("onUntrigger", [H, e]),
            H.state.isVisible)
          ) {
            if (
              !(
                H.props.trigger.indexOf("mouseenter") >= 0 &&
                H.props.trigger.indexOf("click") >= 0 &&
                ["mouseleave", "mousemove"].indexOf(e.type) >= 0 &&
                T
              )
            ) {
              var t = oe(!1);
              t
                ? (o = setTimeout(function () {
                    H.state.isVisible && H.hide();
                  }, t))
                : (c = requestAnimationFrame(function () {
                    H.hide();
                  }));
            }
          } else me();
        }
      }
      function ee(e, t) {
        void 0 === t && (t = {});
        var n = N.plugins.concat(t.plugins || []);
        !(function (e) {
          var t = !e,
            n =
              "[object Object]" === Object.prototype.toString.call(e) &&
              !e.addEventListener;
          $(
            t,
            [
              "tippy() was passed",
              "`" + String(e) + "`",
              "as its targets (first) argument. Valid types are: String, Element,",
              "Element[], or NodeList.",
            ].join(" ")
          ),
            $(
              n,
              [
                "tippy() was passed a plain object which is not supported as an argument",
                "for virtual positioning. Use props.getReferenceClientRect instead.",
              ].join(" ")
            );
        })(e),
          B(t, n),
          document.addEventListener("touchstart", A, s),
          window.addEventListener("blur", C);
        var i = Object.assign({}, t, { plugins: n }),
          r = w(e),
          o = v(i.content),
          a = r.length > 1;
        z(
          o && a,
          [
            "tippy() was passed an Element as the `content` prop, but more than",
            "one tippy instance was created by this invocation. This means the",
            "content element will only be appended to the last tippy instance.",
            "\n\n",
            "Instead, pass the .innerHTML of the element, or use a function that",
            "returns a cloned version of the element instead.",
            "\n\n",
            "1) content: element.innerHTML\n",
            "2) content: () => element.cloneNode(true)",
          ].join(" ")
        );
        var c = r.reduce(function (e, t) {
          var n = t && Q(t, i);
          return n && e.push(n), e;
        }, []);
        return v(e) ? c[0] : c;
      }
      (ee.defaultProps = N),
        (ee.setDefaultProps = function (e) {
          B(e, []),
            Object.keys(e).forEach(function (t) {
              N[t] = e[t];
            });
        }),
        (ee.currentInput = k);
      var te = Object.assign({}, t.applyStyles, {
          effect: function (e) {
            var t = e.state,
              n = {
                popper: {
                  position: t.options.strategy,
                  left: "0",
                  top: "0",
                  margin: "0",
                },
                arrow: { position: "absolute" },
                reference: {},
              };
            Object.assign(t.elements.popper.style, n.popper),
              (t.styles = n),
              t.elements.arrow &&
                Object.assign(t.elements.arrow.style, n.arrow);
          },
        }),
        ne = { mouseover: "mouseenter", focusin: "focus", click: "click" };
      var ie = {
        name: "animateFill",
        defaultValue: !1,
        fn: function (e) {
          var t;
          if (!(null == (t = e.props.render) ? void 0 : t.$$tippy))
            return (
              $(
                e.props.animateFill,
                "The `animateFill` plugin requires the default render function."
              ),
              {}
            );
          var n = X(e.popper),
            r = n.box,
            o = n.content,
            s = e.props.animateFill
              ? (function () {
                  var e = g();
                  return (e.className = i), _([e], "hidden"), e;
                })()
              : null;
          return {
            onCreate: function () {
              s &&
                (r.insertBefore(s, r.firstElementChild),
                r.setAttribute("data-animatefill", ""),
                (r.style.overflow = "hidden"),
                e.setProps({ arrow: !1, animation: "shift-away" }));
            },
            onMount: function () {
              if (s) {
                var e = r.style.transitionDuration,
                  t = Number(e.replace("ms", ""));
                (o.style.transitionDelay = Math.round(t / 10) + "ms"),
                  (s.style.transitionDuration = e),
                  _([s], "visible");
              }
            },
            onShow: function () {
              s && (s.style.transitionDuration = "0ms");
            },
            onHide: function () {
              s && _([s], "hidden");
            },
          };
        },
      };
      var re = { clientX: 0, clientY: 0 },
        oe = [];
      function se(e) {
        var t = e.clientX,
          n = e.clientY;
        re = { clientX: t, clientY: n };
      }
      var ae = {
        name: "followCursor",
        defaultValue: !1,
        fn: function (e) {
          var t = e.reference,
            n = O(e.props.triggerTarget || t),
            i = !1,
            r = !1,
            o = !0,
            s = e.props;
          function a() {
            return "initial" === e.props.followCursor && e.state.isVisible;
          }
          function c() {
            n.addEventListener("mousemove", f);
          }
          function u() {
            n.removeEventListener("mousemove", f);
          }
          function l() {
            (i = !0), e.setProps({ getReferenceClientRect: null }), (i = !1);
          }
          function f(n) {
            var i = !n.target || t.contains(n.target),
              r = e.props.followCursor,
              o = n.clientX,
              s = n.clientY,
              a = t.getBoundingClientRect(),
              c = o - a.left,
              u = s - a.top;
            (!i && e.props.interactive) ||
              e.setProps({
                getReferenceClientRect: function () {
                  var e = t.getBoundingClientRect(),
                    n = o,
                    i = s;
                  "initial" === r && ((n = e.left + c), (i = e.top + u));
                  var a = "horizontal" === r ? e.top : i,
                    l = "vertical" === r ? e.right : n,
                    f = "horizontal" === r ? e.bottom : i,
                    d = "vertical" === r ? e.left : n;
                  return {
                    width: l - d,
                    height: f - a,
                    top: a,
                    right: l,
                    bottom: f,
                    left: d,
                  };
                },
              });
          }
          function d() {
            e.props.followCursor &&
              (oe.push({ instance: e, doc: n }),
              (function (e) {
                e.addEventListener("mousemove", se);
              })(n));
          }
          function p() {
            0 ===
              (oe = oe.filter(function (t) {
                return t.instance !== e;
              })).filter(function (e) {
                return e.doc === n;
              }).length &&
              (function (e) {
                e.removeEventListener("mousemove", se);
              })(n);
          }
          return {
            onCreate: d,
            onDestroy: p,
            onBeforeUpdate: function () {
              s = e.props;
            },
            onAfterUpdate: function (t, n) {
              var o = n.followCursor;
              i ||
                (void 0 !== o &&
                  s.followCursor !== o &&
                  (p(),
                  o
                    ? (d(), !e.state.isMounted || r || a() || c())
                    : (u(), l())));
            },
            onMount: function () {
              e.props.followCursor &&
                !r &&
                (o && (f(re), (o = !1)), a() || c());
            },
            onTrigger: function (e, t) {
              y(t) && (re = { clientX: t.clientX, clientY: t.clientY }),
                (r = "focus" === t.type);
            },
            onHidden: function () {
              e.props.followCursor && (l(), u(), (o = !0));
            },
          };
        },
      };
      var ce = {
        name: "inlinePositioning",
        defaultValue: !1,
        fn: function (e) {
          var t,
            n = e.reference;
          var i = -1,
            r = !1,
            o = {
              name: "tippyInlinePositioning",
              enabled: !0,
              phase: "afterWrite",
              fn: function (r) {
                var o = r.state;
                e.props.inlinePositioning &&
                  (t !== o.placement &&
                    e.setProps({
                      getReferenceClientRect: function () {
                        return (function (e, t, n, i) {
                          if (n.length < 2 || null === e) return t;
                          if (
                            2 === n.length &&
                            i >= 0 &&
                            n[0].left > n[1].right
                          )
                            return n[i] || t;
                          switch (e) {
                            case "top":
                            case "bottom":
                              var r = n[0],
                                o = n[n.length - 1],
                                s = "top" === e,
                                a = r.top,
                                c = o.bottom,
                                u = s ? r.left : o.left,
                                l = s ? r.right : o.right;
                              return {
                                top: a,
                                bottom: c,
                                left: u,
                                right: l,
                                width: l - u,
                                height: c - a,
                              };
                            case "left":
                            case "right":
                              var f = Math.min.apply(
                                  Math,
                                  n.map(function (e) {
                                    return e.left;
                                  })
                                ),
                                d = Math.max.apply(
                                  Math,
                                  n.map(function (e) {
                                    return e.right;
                                  })
                                ),
                                p = n.filter(function (t) {
                                  return "left" === e
                                    ? t.left === f
                                    : t.right === d;
                                }),
                                h = p[0].top,
                                m = p[p.length - 1].bottom;
                              return {
                                top: h,
                                bottom: m,
                                left: f,
                                right: d,
                                width: d - f,
                                height: m - h,
                              };
                            default:
                              return t;
                          }
                        })(
                          h(o.placement),
                          n.getBoundingClientRect(),
                          m(n.getClientRects()),
                          i
                        );
                      },
                    }),
                  (t = o.placement));
              },
            };
          function s() {
            var t;
            r ||
              ((t = (function (e, t) {
                var n;
                return {
                  popperOptions: Object.assign({}, e.popperOptions, {
                    modifiers: [].concat(
                      (
                        (null == (n = e.popperOptions)
                          ? void 0
                          : n.modifiers) || []
                      ).filter(function (e) {
                        return e.name !== t.name;
                      }),
                      [t]
                    ),
                  }),
                };
              })(e.props, o)),
              (r = !0),
              e.setProps(t),
              (r = !1));
          }
          return {
            onCreate: s,
            onAfterUpdate: s,
            onTrigger: function (t, n) {
              if (y(n)) {
                var r = m(e.reference.getClientRects()),
                  o = r.find(function (e) {
                    return (
                      e.left - 2 <= n.clientX &&
                      e.right + 2 >= n.clientX &&
                      e.top - 2 <= n.clientY &&
                      e.bottom + 2 >= n.clientY
                    );
                  });
                i = r.indexOf(o);
              }
            },
            onUntrigger: function () {
              i = -1;
            },
          };
        },
      };
      var ue = {
        name: "sticky",
        defaultValue: !1,
        fn: function (e) {
          var t = e.reference,
            n = e.popper;
          function i(t) {
            return !0 === e.props.sticky || e.props.sticky === t;
          }
          var r = null,
            o = null;
          function s() {
            var a = i("reference")
                ? (e.popperInstance
                    ? e.popperInstance.state.elements.reference
                    : t
                  ).getBoundingClientRect()
                : null,
              c = i("popper") ? n.getBoundingClientRect() : null;
            ((a && le(r, a)) || (c && le(o, c))) &&
              e.popperInstance &&
              e.popperInstance.update(),
              (r = a),
              (o = c),
              e.state.isMounted && requestAnimationFrame(s);
          }
          return {
            onMount: function () {
              e.props.sticky && s();
            },
          };
        },
      };
      function le(e, t) {
        return (
          !e ||
          !t ||
          e.top !== t.top ||
          e.right !== t.right ||
          e.bottom !== t.bottom ||
          e.left !== t.left
        );
      }
      ee.setDefaultProps({ render: Y }),
        (e.animateFill = ie),
        (e.createSingleton = function (e, t) {
          var n;
          void 0 === t && (t = {}),
            $(
              !Array.isArray(e),
              [
                "The first argument passed to createSingleton() must be an array of",
                "tippy instances. The passed value was",
                String(e),
              ].join(" ")
            );
          var i,
            r = e,
            o = [],
            s = t.overrides,
            a = [],
            c = !1;
          function u() {
            o = r.map(function (e) {
              return e.reference;
            });
          }
          function l(e) {
            r.forEach(function (t) {
              e ? t.enable() : t.disable();
            });
          }
          function d(e) {
            return r.map(function (t) {
              var n = t.setProps;
              return (
                (t.setProps = function (r) {
                  n(r), t.reference === i && e.setProps(r);
                }),
                function () {
                  t.setProps = n;
                }
              );
            });
          }
          function p(e, t) {
            var n = o.indexOf(t);
            if (t !== i) {
              i = t;
              var a = (s || []).concat("content").reduce(function (e, t) {
                return (e[t] = r[n].props[t]), e;
              }, {});
              e.setProps(
                Object.assign({}, a, {
                  getReferenceClientRect:
                    "function" == typeof a.getReferenceClientRect
                      ? a.getReferenceClientRect
                      : function () {
                          return t.getBoundingClientRect();
                        },
                })
              );
            }
          }
          l(!1), u();
          var h = {
              fn: function () {
                return {
                  onDestroy: function () {
                    l(!0);
                  },
                  onHidden: function () {
                    i = null;
                  },
                  onClickOutside: function (e) {
                    e.props.showOnCreate && !c && ((c = !0), (i = null));
                  },
                  onShow: function (e) {
                    e.props.showOnCreate && !c && ((c = !0), p(e, o[0]));
                  },
                  onTrigger: function (e, t) {
                    p(e, t.currentTarget);
                  },
                };
              },
            },
            m = ee(
              g(),
              Object.assign({}, f(t, ["overrides"]), {
                plugins: [h].concat(t.plugins || []),
                triggerTarget: o,
                popperOptions: Object.assign({}, t.popperOptions, {
                  modifiers: [].concat(
                    (null == (n = t.popperOptions) ? void 0 : n.modifiers) ||
                      [],
                    [te]
                  ),
                }),
              })
            ),
            v = m.show;
          (m.show = function (e) {
            if ((v(), !i && null == e)) return p(m, o[0]);
            if (!i || null != e) {
              if ("number" == typeof e) return o[e] && p(m, o[e]);
              if (r.includes(e)) {
                var t = e.reference;
                return p(m, t);
              }
              return o.includes(e) ? p(m, e) : void 0;
            }
          }),
            (m.showNext = function () {
              var e = o[0];
              if (!i) return m.show(0);
              var t = o.indexOf(i);
              m.show(o[t + 1] || e);
            }),
            (m.showPrevious = function () {
              var e = o[o.length - 1];
              if (!i) return m.show(e);
              var t = o.indexOf(i),
                n = o[t - 1] || e;
              m.show(n);
            });
          var y = m.setProps;
          return (
            (m.setProps = function (e) {
              (s = e.overrides || s), y(e);
            }),
            (m.setInstances = function (e) {
              l(!0),
                a.forEach(function (e) {
                  return e();
                }),
                (r = e),
                l(!1),
                u(),
                d(m),
                m.setProps({ triggerTarget: o });
            }),
            (a = d(m)),
            m
          );
        }),
        (e.default = ee),
        (e.delegate = function (e, t) {
          $(
            !(t && t.target),
            [
              "You must specity a `target` prop indicating a CSS selector string matching",
              "the target elements that should receive a tippy.",
            ].join(" ")
          );
          var n = [],
            i = [],
            r = !1,
            o = t.target,
            a = f(t, ["target"]),
            c = Object.assign({}, a, { trigger: "manual", touch: !1 }),
            u = Object.assign({}, a, { showOnCreate: !0 }),
            l = ee(e, c);
          function p(e) {
            if (e.target && !r) {
              var n = e.target.closest(o);
              if (n) {
                var s =
                  n.getAttribute("data-tippy-trigger") ||
                  t.trigger ||
                  N.trigger;
                if (
                  !n._tippy &&
                  !(
                    ("touchstart" === e.type && "boolean" == typeof u.touch) ||
                    ("touchstart" !== e.type && s.indexOf(ne[e.type]) < 0)
                  )
                ) {
                  var a = ee(n, u);
                  a && (i = i.concat(a));
                }
              }
            }
          }
          function h(e, t, i, r) {
            void 0 === r && (r = !1),
              e.addEventListener(t, i, r),
              n.push({ node: e, eventType: t, handler: i, options: r });
          }
          return (
            d(l).forEach(function (e) {
              var t = e.destroy,
                o = e.enable,
                a = e.disable;
              (e.destroy = function (e) {
                void 0 === e && (e = !0),
                  e &&
                    i.forEach(function (e) {
                      e.destroy();
                    }),
                  (i = []),
                  n.forEach(function (e) {
                    var t = e.node,
                      n = e.eventType,
                      i = e.handler,
                      r = e.options;
                    t.removeEventListener(n, i, r);
                  }),
                  (n = []),
                  t();
              }),
                (e.enable = function () {
                  o(),
                    i.forEach(function (e) {
                      return e.enable();
                    }),
                    (r = !1);
                }),
                (e.disable = function () {
                  a(),
                    i.forEach(function (e) {
                      return e.disable();
                    }),
                    (r = !0);
                }),
                (function (e) {
                  var t = e.reference;
                  h(t, "touchstart", p, s),
                    h(t, "mouseover", p),
                    h(t, "focusin", p),
                    h(t, "click", p);
                })(e);
            }),
            l
          );
        }),
        (e.followCursor = ae),
        (e.hideAll = function (e) {
          var t = void 0 === e ? {} : e,
            n = t.exclude,
            i = t.duration;
          Z.forEach(function (e) {
            var t = !1;
            if (
              (n && (t = b(n) ? e.reference === n : e.popper === n.popper), !t)
            ) {
              var r = e.props.duration;
              e.setProps({ duration: i }),
                e.hide(),
                e.state.isDestroyed || e.setProps({ duration: r });
            }
          });
        }),
        (e.inlinePositioning = ce),
        (e.roundArrow =
          '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>'),
        (e.sticky = ue);
    }),
    ei =
      ((Fn = Qn()),
      ((e, t, n) => {
        if ((t && "object" == typeof t) || "function" == typeof t)
          for (let i of Yn(t))
            Xn.call(e, i) ||
              "default" === i ||
              Gn(e, i, {
                get: () => t[i],
                enumerable: !(n = Kn(t, i)) || n.enumerable,
              });
        return e;
      })(
        ((Vn = Gn(
          null != Fn ? qn(Un(Fn)) : {},
          "default",
          Fn && Fn.__esModule && "default" in Fn
            ? { get: () => Fn.default, enumerable: !0 }
            : { value: Fn, enumerable: !0 }
        )),
        Gn(Vn, "__esModule", { value: !0 })),
        Fn
      ));
  var ti = (e) => {
      const t = { plugins: [] };
      if (
        (e.includes("duration") &&
          (t.duration = parseInt(e[e.indexOf("duration") + 1])),
        e.includes("delay") && (t.delay = parseInt(e[e.indexOf("delay") + 1])),
        e.includes("cursor"))
      ) {
        t.plugins.push(ei.followCursor);
        const n = e[e.indexOf("cursor") + 1] ?? null;
        ["x", "initial"].includes(n)
          ? (t.followCursor = "x" === n ? "horizontal" : "initial")
          : (t.followCursor = !0);
      }
      return (
        e.includes("on") && (t.trigger = e[e.indexOf("on") + 1]),
        e.includes("arrowless") && (t.arrow = !1),
        e.includes("html") && (t.allowHTML = !0),
        e.includes("interactive") && (t.interactive = !0),
        e.includes("border") &&
          t.interactive &&
          (t.interactiveBorder = parseInt(e[e.indexOf("border") + 1])),
        e.includes("debounce") &&
          t.interactive &&
          (t.interactiveDebounce = parseInt(e[e.indexOf("debounce") + 1])),
        e.includes("max-width") &&
          (t.maxWidth = parseInt(e[e.indexOf("max-width") + 1])),
        e.includes("theme") && (t.theme = e[e.indexOf("theme") + 1]),
        t
      );
    },
    ni = function (e) {
      e.directive(
        "tooltip",
        (
          e,
          { modifiers: t, expression: n },
          { evaluateLater: i, effect: r }
        ) => {
          const o = i(n),
            s = t.length > 0 ? ti(t) : {};
          r(() => {
            o((t) => {
              e.__x_tippy || (e.__x_tippy = (0, ei.default)(e, s)),
                e.__x_tippy.setContent(t);
            });
          });
        }
      );
    },
    ii = {};
  !(function (e) {
    "use strict";
    var t = { logger: self.console, WebSocket: self.WebSocket },
      n = {
        log: function () {
          if (this.enabled) {
            for (var e, n = arguments.length, i = Array(n), r = 0; r < n; r++)
              i[r] = arguments[r];
            i.push(Date.now()),
              (e = t.logger).log.apply(e, ["[ActionCable]"].concat(i));
          }
        },
      },
      i =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            },
      r = function (e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      },
      o = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              "value" in i && (i.writable = !0),
              Object.defineProperty(e, i.key, i);
          }
        }
        return function (t, n, i) {
          return n && e(t.prototype, n), i && e(t, i), t;
        };
      })(),
      s = function () {
        return new Date().getTime();
      },
      a = function (e) {
        return (s() - e) / 1e3;
      },
      c = function (e, t, n) {
        return Math.max(t, Math.min(n, e));
      },
      u = (function () {
        function e(t) {
          r(this, e),
            (this.visibilityDidChange = this.visibilityDidChange.bind(this)),
            (this.connection = t),
            (this.reconnectAttempts = 0);
        }
        return (
          (e.prototype.start = function () {
            this.isRunning() ||
              ((this.startedAt = s()),
              delete this.stoppedAt,
              this.startPolling(),
              addEventListener("visibilitychange", this.visibilityDidChange),
              n.log(
                "ConnectionMonitor started. pollInterval = " +
                  this.getPollInterval() +
                  " ms"
              ));
          }),
          (e.prototype.stop = function () {
            this.isRunning() &&
              ((this.stoppedAt = s()),
              this.stopPolling(),
              removeEventListener("visibilitychange", this.visibilityDidChange),
              n.log("ConnectionMonitor stopped"));
          }),
          (e.prototype.isRunning = function () {
            return this.startedAt && !this.stoppedAt;
          }),
          (e.prototype.recordPing = function () {
            this.pingedAt = s();
          }),
          (e.prototype.recordConnect = function () {
            (this.reconnectAttempts = 0),
              this.recordPing(),
              delete this.disconnectedAt,
              n.log("ConnectionMonitor recorded connect");
          }),
          (e.prototype.recordDisconnect = function () {
            (this.disconnectedAt = s()),
              n.log("ConnectionMonitor recorded disconnect");
          }),
          (e.prototype.startPolling = function () {
            this.stopPolling(), this.poll();
          }),
          (e.prototype.stopPolling = function () {
            clearTimeout(this.pollTimeout);
          }),
          (e.prototype.poll = function () {
            var e = this;
            this.pollTimeout = setTimeout(function () {
              e.reconnectIfStale(), e.poll();
            }, this.getPollInterval());
          }),
          (e.prototype.getPollInterval = function () {
            var e = this.constructor.pollInterval,
              t = e.min,
              n = e.max,
              i = e.multiplier * Math.log(this.reconnectAttempts + 1);
            return Math.round(1e3 * c(i, t, n));
          }),
          (e.prototype.reconnectIfStale = function () {
            this.connectionIsStale() &&
              (n.log(
                "ConnectionMonitor detected stale connection. reconnectAttempts = " +
                  this.reconnectAttempts +
                  ", pollInterval = " +
                  this.getPollInterval() +
                  " ms, time disconnected = " +
                  a(this.disconnectedAt) +
                  " s, stale threshold = " +
                  this.constructor.staleThreshold +
                  " s"
              ),
              this.reconnectAttempts++,
              this.disconnectedRecently()
                ? n.log(
                    "ConnectionMonitor skipping reopening recent disconnect"
                  )
                : (n.log("ConnectionMonitor reopening"),
                  this.connection.reopen()));
          }),
          (e.prototype.connectionIsStale = function () {
            return (
              a(this.pingedAt ? this.pingedAt : this.startedAt) >
              this.constructor.staleThreshold
            );
          }),
          (e.prototype.disconnectedRecently = function () {
            return (
              this.disconnectedAt &&
              a(this.disconnectedAt) < this.constructor.staleThreshold
            );
          }),
          (e.prototype.visibilityDidChange = function () {
            var e = this;
            "visible" === document.visibilityState &&
              setTimeout(function () {
                (!e.connectionIsStale() && e.connection.isOpen()) ||
                  (n.log(
                    "ConnectionMonitor reopening stale connection on visibilitychange. visibilityState = " +
                      document.visibilityState
                  ),
                  e.connection.reopen());
              }, 200);
          }),
          e
        );
      })();
    (u.pollInterval = { min: 3, max: 30, multiplier: 5 }),
      (u.staleThreshold = 6);
    var l = {
        message_types: {
          welcome: "welcome",
          disconnect: "disconnect",
          ping: "ping",
          confirmation: "confirm_subscription",
          rejection: "reject_subscription",
        },
        disconnect_reasons: {
          unauthorized: "unauthorized",
          invalid_request: "invalid_request",
          server_restart: "server_restart",
        },
        default_mount_path: "/cable",
        protocols: ["actioncable-v1-json", "actioncable-unsupported"],
      },
      f = l.message_types,
      d = l.protocols,
      p = d.slice(0, d.length - 1),
      h = [].indexOf,
      m = (function () {
        function e(t) {
          r(this, e),
            (this.open = this.open.bind(this)),
            (this.consumer = t),
            (this.subscriptions = this.consumer.subscriptions),
            (this.monitor = new u(this)),
            (this.disconnected = !0);
        }
        return (
          (e.prototype.send = function (e) {
            return (
              !!this.isOpen() && (this.webSocket.send(JSON.stringify(e)), !0)
            );
          }),
          (e.prototype.open = function () {
            return this.isActive()
              ? (n.log(
                  "Attempted to open WebSocket, but existing socket is " +
                    this.getState()
                ),
                !1)
              : (n.log(
                  "Opening WebSocket, current state is " +
                    this.getState() +
                    ", subprotocols: " +
                    d
                ),
                this.webSocket && this.uninstallEventHandlers(),
                (this.webSocket = new t.WebSocket(this.consumer.url, d)),
                this.installEventHandlers(),
                this.monitor.start(),
                !0);
          }),
          (e.prototype.close = function () {
            if (
              ((arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : { allowReconnect: !0 }
              ).allowReconnect || this.monitor.stop(),
              this.isActive())
            )
              return this.webSocket.close();
          }),
          (e.prototype.reopen = function () {
            if (
              (n.log(
                "Reopening WebSocket, current state is " + this.getState()
              ),
              !this.isActive())
            )
              return this.open();
            try {
              return this.close();
            } catch (e) {
              n.log("Failed to reopen WebSocket", e);
            } finally {
              n.log(
                "Reopening WebSocket in " + this.constructor.reopenDelay + "ms"
              ),
                setTimeout(this.open, this.constructor.reopenDelay);
            }
          }),
          (e.prototype.getProtocol = function () {
            if (this.webSocket) return this.webSocket.protocol;
          }),
          (e.prototype.isOpen = function () {
            return this.isState("open");
          }),
          (e.prototype.isActive = function () {
            return this.isState("open", "connecting");
          }),
          (e.prototype.isProtocolSupported = function () {
            return h.call(p, this.getProtocol()) >= 0;
          }),
          (e.prototype.isState = function () {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
              t[n] = arguments[n];
            return h.call(t, this.getState()) >= 0;
          }),
          (e.prototype.getState = function () {
            if (this.webSocket)
              for (var e in t.WebSocket)
                if (t.WebSocket[e] === this.webSocket.readyState)
                  return e.toLowerCase();
            return null;
          }),
          (e.prototype.installEventHandlers = function () {
            for (var e in this.events) {
              var t = this.events[e].bind(this);
              this.webSocket["on" + e] = t;
            }
          }),
          (e.prototype.uninstallEventHandlers = function () {
            for (var e in this.events)
              this.webSocket["on" + e] = function () {};
          }),
          e
        );
      })();
    (m.reopenDelay = 500),
      (m.prototype.events = {
        message: function (e) {
          if (this.isProtocolSupported()) {
            var t = JSON.parse(e.data),
              i = t.identifier,
              r = t.message,
              o = t.reason,
              s = t.reconnect;
            switch (t.type) {
              case f.welcome:
                return (
                  this.monitor.recordConnect(), this.subscriptions.reload()
                );
              case f.disconnect:
                return (
                  n.log("Disconnecting. Reason: " + o),
                  this.close({ allowReconnect: s })
                );
              case f.ping:
                return this.monitor.recordPing();
              case f.confirmation:
                return (
                  this.subscriptions.confirmSubscription(i),
                  this.subscriptions.notify(i, "connected")
                );
              case f.rejection:
                return this.subscriptions.reject(i);
              default:
                return this.subscriptions.notify(i, "received", r);
            }
          }
        },
        open: function () {
          if (
            (n.log(
              "WebSocket onopen event, using '" +
                this.getProtocol() +
                "' subprotocol"
            ),
            (this.disconnected = !1),
            !this.isProtocolSupported())
          )
            return (
              n.log(
                "Protocol is unsupported. Stopping monitor and disconnecting."
              ),
              this.close({ allowReconnect: !1 })
            );
        },
        close: function (e) {
          if ((n.log("WebSocket onclose event"), !this.disconnected))
            return (
              (this.disconnected = !0),
              this.monitor.recordDisconnect(),
              this.subscriptions.notifyAll("disconnected", {
                willAttemptReconnect: this.monitor.isRunning(),
              })
            );
        },
        error: function () {
          n.log("WebSocket onerror event");
        },
      });
    var g = function (e, t) {
        if (null != t)
          for (var n in t) {
            var i = t[n];
            e[n] = i;
          }
        return e;
      },
      v = (function () {
        function e(t) {
          var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            i = arguments[2];
          r(this, e),
            (this.consumer = t),
            (this.identifier = JSON.stringify(n)),
            g(this, i);
        }
        return (
          (e.prototype.perform = function (e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            return (t.action = e), this.send(t);
          }),
          (e.prototype.send = function (e) {
            return this.consumer.send({
              command: "message",
              identifier: this.identifier,
              data: JSON.stringify(e),
            });
          }),
          (e.prototype.unsubscribe = function () {
            return this.consumer.subscriptions.remove(this);
          }),
          e
        );
      })(),
      y = (function () {
        function e(t) {
          r(this, e),
            (this.subscriptions = t),
            (this.pendingSubscriptions = []);
        }
        return (
          (e.prototype.guarantee = function (e) {
            -1 == this.pendingSubscriptions.indexOf(e)
              ? (n.log("SubscriptionGuarantor guaranteeing " + e.identifier),
                this.pendingSubscriptions.push(e))
              : n.log(
                  "SubscriptionGuarantor already guaranteeing " + e.identifier
                ),
              this.startGuaranteeing();
          }),
          (e.prototype.forget = function (e) {
            n.log("SubscriptionGuarantor forgetting " + e.identifier),
              (this.pendingSubscriptions = this.pendingSubscriptions.filter(
                function (t) {
                  return t !== e;
                }
              ));
          }),
          (e.prototype.startGuaranteeing = function () {
            this.stopGuaranteeing(), this.retrySubscribing();
          }),
          (e.prototype.stopGuaranteeing = function () {
            clearTimeout(this.retryTimeout);
          }),
          (e.prototype.retrySubscribing = function () {
            var e = this;
            this.retryTimeout = setTimeout(function () {
              e.subscriptions &&
                "function" == typeof e.subscriptions.subscribe &&
                e.pendingSubscriptions.map(function (t) {
                  n.log("SubscriptionGuarantor resubscribing " + t.identifier),
                    e.subscriptions.subscribe(t);
                });
            }, 500);
          }),
          e
        );
      })(),
      b = (function () {
        function e(t) {
          r(this, e),
            (this.consumer = t),
            (this.guarantor = new y(this)),
            (this.subscriptions = []);
        }
        return (
          (e.prototype.create = function (e, t) {
            var n = e,
              r =
                "object" === (void 0 === n ? "undefined" : i(n))
                  ? n
                  : { channel: n },
              o = new v(this.consumer, r, t);
            return this.add(o);
          }),
          (e.prototype.add = function (e) {
            return (
              this.subscriptions.push(e),
              this.consumer.ensureActiveConnection(),
              this.notify(e, "initialized"),
              this.subscribe(e),
              e
            );
          }),
          (e.prototype.remove = function (e) {
            return (
              this.forget(e),
              this.findAll(e.identifier).length ||
                this.sendCommand(e, "unsubscribe"),
              e
            );
          }),
          (e.prototype.reject = function (e) {
            var t = this;
            return this.findAll(e).map(function (e) {
              return t.forget(e), t.notify(e, "rejected"), e;
            });
          }),
          (e.prototype.forget = function (e) {
            return (
              this.guarantor.forget(e),
              (this.subscriptions = this.subscriptions.filter(function (t) {
                return t !== e;
              })),
              e
            );
          }),
          (e.prototype.findAll = function (e) {
            return this.subscriptions.filter(function (t) {
              return t.identifier === e;
            });
          }),
          (e.prototype.reload = function () {
            var e = this;
            return this.subscriptions.map(function (t) {
              return e.subscribe(t);
            });
          }),
          (e.prototype.notifyAll = function (e) {
            for (
              var t = this,
                n = arguments.length,
                i = Array(n > 1 ? n - 1 : 0),
                r = 1;
              r < n;
              r++
            )
              i[r - 1] = arguments[r];
            return this.subscriptions.map(function (n) {
              return t.notify.apply(t, [n, e].concat(i));
            });
          }),
          (e.prototype.notify = function (e, t) {
            for (
              var n = arguments.length, i = Array(n > 2 ? n - 2 : 0), r = 2;
              r < n;
              r++
            )
              i[r - 2] = arguments[r];
            return ("string" == typeof e ? this.findAll(e) : [e]).map(function (
              e
            ) {
              return "function" == typeof e[t] ? e[t].apply(e, i) : void 0;
            });
          }),
          (e.prototype.subscribe = function (e) {
            this.sendCommand(e, "subscribe") && this.guarantor.guarantee(e);
          }),
          (e.prototype.confirmSubscription = function (e) {
            var t = this;
            n.log("Subscription confirmed " + e),
              this.findAll(e).map(function (e) {
                return t.guarantor.forget(e);
              });
          }),
          (e.prototype.sendCommand = function (e, t) {
            var n = e.identifier;
            return this.consumer.send({ command: t, identifier: n });
          }),
          e
        );
      })(),
      w = (function () {
        function e(t) {
          r(this, e),
            (this._url = t),
            (this.subscriptions = new b(this)),
            (this.connection = new m(this));
        }
        return (
          (e.prototype.send = function (e) {
            return this.connection.send(e);
          }),
          (e.prototype.connect = function () {
            return this.connection.open();
          }),
          (e.prototype.disconnect = function () {
            return this.connection.close({ allowReconnect: !1 });
          }),
          (e.prototype.ensureActiveConnection = function () {
            if (!this.connection.isActive()) return this.connection.open();
          }),
          o(e, [
            {
              key: "url",
              get: function () {
                return x(this._url);
              },
            },
          ]),
          e
        );
      })();
    function x(e) {
      if (("function" == typeof e && (e = e()), e && !/^wss?:/i.test(e))) {
        var t = document.createElement("a");
        return (
          (t.href = e),
          (t.href = t.href),
          (t.protocol = t.protocol.replace("http", "ws")),
          t.href
        );
      }
      return e;
    }
    function _() {
      var e =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : O("url") || l.default_mount_path;
      return new w(e);
    }
    function O(e) {
      var t = document.head.querySelector(
        "meta[name='action-cable-" + e + "']"
      );
      if (t) return t.getAttribute("content");
    }
    (e.Connection = m),
      (e.ConnectionMonitor = u),
      (e.Consumer = w),
      (e.INTERNAL = l),
      (e.Subscription = v),
      (e.Subscriptions = b),
      (e.SubscriptionGuarantor = y),
      (e.adapters = t),
      (e.createWebSocketURL = x),
      (e.logger = n),
      (e.createConsumer = _),
      (e.getConfig = O),
      Object.defineProperty(e, "__esModule", { value: !0 });
  })(ii);
  var ri;
  function oi(e, t, n) {
    var i, r, o, s, a;
    function c() {
      var u = Date.now() - s;
      u < t && u >= 0
        ? (i = setTimeout(c, t - u))
        : ((i = null), n || ((a = e.apply(o, r)), (o = r = null)));
    }
    null == t && (t = 100);
    var u = function () {
      (o = this), (r = arguments), (s = Date.now());
      var u = n && !i;
      return (
        i || (i = setTimeout(c, t)),
        u && ((a = e.apply(o, r)), (o = r = null)),
        a
      );
    };
    return (
      (u.clear = function () {
        i && (clearTimeout(i), (i = null));
      }),
      (u.flush = function () {
        i && ((a = e.apply(o, r)), (o = r = null), clearTimeout(i), (i = null));
      }),
      u
    );
  }
  function si(t) {
    const n = (Date.now() + ((100 * Math.random()) | 0)).toString(),
      i = (0, ii.createConsumer)(`${t}?uid=${n}`);
    return {
      addListener(t, n) {
        i.subscriptions.create(t, {
          received: e(ri)((e) => {
            console.log("Lookbook files changed"), n(e);
          }, 200),
          connected() {
            console.log("Lookbook websocket connected");
          },
          disconnected() {
            console.log("Lookbook websocket disconnected");
          },
        });
      },
    };
  }
  (oi.debounce = oi), (ri = oi);
  const ai = {
    key: (e) => (e.getAttribute("key") ? e.getAttribute("key") : e.id),
    lookahead: !1,
    updating(e, t, n, i) {
      if (e.getAttribute && "replace" === e.getAttribute("data-morph-strategy"))
        return (e.innerHTML = t.innerHTML), i();
    },
  };
  var ci = function (e, t) {
      return Number(e.slice(0, -1 * t.length));
    },
    ui = function (e) {
      return e.endsWith("px")
        ? { value: e, type: "px", numeric: ci(e, "px") }
        : e.endsWith("fr")
        ? { value: e, type: "fr", numeric: ci(e, "fr") }
        : e.endsWith("%")
        ? { value: e, type: "%", numeric: ci(e, "%") }
        : "auto" === e
        ? { value: e, type: "auto" }
        : null;
    },
    li = function (e) {
      return e.split(" ").map(ui);
    },
    fi = function (e, t, n) {
      return t
        .concat(n)
        .map(function (t) {
          return t.style[e];
        })
        .filter(function (e) {
          return void 0 !== e && "" !== e;
        });
    },
    di = function (e) {
      for (var t = 0; t < e.length; t++) if (e[t].numeric > 0) return t;
      return null;
    },
    pi = function () {
      return !1;
    },
    hi = function (e, t, n) {
      e.style[t] = n;
    },
    mi = function (e, t, n) {
      var i = e[t];
      return void 0 !== i ? i : n;
    };
  function gi(e) {
    var t;
    return (t = []).concat
      .apply(
        t,
        Array.from(e.ownerDocument.styleSheets).map(function (e) {
          var t = [];
          try {
            t = Array.from(e.cssRules || []);
          } catch (e) {}
          return t;
        })
      )
      .filter(function (t) {
        var n = !1;
        try {
          n = e.matches(t.selectorText);
        } catch (e) {}
        return n;
      });
  }
  var vi = function (e, t, n) {
    (this.direction = e),
      (this.element = t.element),
      (this.track = t.track),
      "column" === e
        ? ((this.gridTemplateProp = "grid-template-columns"),
          (this.gridGapProp = "grid-column-gap"),
          (this.cursor = mi(n, "columnCursor", mi(n, "cursor", "col-resize"))),
          (this.snapOffset = mi(
            n,
            "columnSnapOffset",
            mi(n, "snapOffset", 30)
          )),
          (this.dragInterval = mi(
            n,
            "columnDragInterval",
            mi(n, "dragInterval", 1)
          )),
          (this.clientAxis = "clientX"),
          (this.optionStyle = mi(n, "gridTemplateColumns")))
        : "row" === e &&
          ((this.gridTemplateProp = "grid-template-rows"),
          (this.gridGapProp = "grid-row-gap"),
          (this.cursor = mi(n, "rowCursor", mi(n, "cursor", "row-resize"))),
          (this.snapOffset = mi(n, "rowSnapOffset", mi(n, "snapOffset", 30))),
          (this.dragInterval = mi(
            n,
            "rowDragInterval",
            mi(n, "dragInterval", 1)
          )),
          (this.clientAxis = "clientY"),
          (this.optionStyle = mi(n, "gridTemplateRows"))),
      (this.onDragStart = mi(n, "onDragStart", pi)),
      (this.onDragEnd = mi(n, "onDragEnd", pi)),
      (this.onDrag = mi(n, "onDrag", pi)),
      (this.writeStyle = mi(n, "writeStyle", hi)),
      (this.startDragging = this.startDragging.bind(this)),
      (this.stopDragging = this.stopDragging.bind(this)),
      (this.drag = this.drag.bind(this)),
      (this.minSizeStart = t.minSizeStart),
      (this.minSizeEnd = t.minSizeEnd),
      t.element &&
        (this.element.addEventListener("mousedown", this.startDragging),
        this.element.addEventListener("touchstart", this.startDragging));
  };
  (vi.prototype.getDimensions = function () {
    var e = this.grid.getBoundingClientRect(),
      t = e.width,
      n = e.height,
      i = e.top,
      r = e.bottom,
      o = e.left,
      s = e.right;
    "column" === this.direction
      ? ((this.start = i), (this.end = r), (this.size = n))
      : "row" === this.direction &&
        ((this.start = o), (this.end = s), (this.size = t));
  }),
    (vi.prototype.getSizeAtTrack = function (e, t) {
      return (function (e, t, n, i) {
        void 0 === n && (n = 0), void 0 === i && (i = !1);
        var r = i ? e + 1 : e;
        return (
          t.slice(0, r).reduce(function (e, t) {
            return e + t.numeric;
          }, 0) + (n ? e * n : 0)
        );
      })(e, this.computedPixels, this.computedGapPixels, t);
    }),
    (vi.prototype.getSizeOfTrack = function (e) {
      return this.computedPixels[e].numeric;
    }),
    (vi.prototype.getRawTracks = function () {
      var e = fi(this.gridTemplateProp, [this.grid], gi(this.grid));
      if (!e.length) {
        if (this.optionStyle) return this.optionStyle;
        throw Error("Unable to determine grid template tracks from styles.");
      }
      return e[0];
    }),
    (vi.prototype.getGap = function () {
      var e = fi(this.gridGapProp, [this.grid], gi(this.grid));
      return e.length ? e[0] : null;
    }),
    (vi.prototype.getRawComputedTracks = function () {
      return window.getComputedStyle(this.grid)[this.gridTemplateProp];
    }),
    (vi.prototype.getRawComputedGap = function () {
      return window.getComputedStyle(this.grid)[this.gridGapProp];
    }),
    (vi.prototype.setTracks = function (e) {
      (this.tracks = e.split(" ")), (this.trackValues = li(e));
    }),
    (vi.prototype.setComputedTracks = function (e) {
      (this.computedTracks = e.split(" ")), (this.computedPixels = li(e));
    }),
    (vi.prototype.setGap = function (e) {
      this.gap = e;
    }),
    (vi.prototype.setComputedGap = function (e) {
      var t, n;
      (this.computedGap = e),
        (this.computedGapPixels =
          ((t = "px"),
          ((n = this.computedGap).endsWith(t)
            ? Number(n.slice(0, -1 * t.length))
            : null) || 0));
    }),
    (vi.prototype.getMousePosition = function (e) {
      return "touches" in e
        ? e.touches[0][this.clientAxis]
        : e[this.clientAxis];
    }),
    (vi.prototype.startDragging = function (e) {
      if (!("button" in e) || 0 === e.button) {
        e.preventDefault(),
          this.element
            ? (this.grid = this.element.parentNode)
            : (this.grid = e.target.parentNode),
          this.getDimensions(),
          this.setTracks(this.getRawTracks()),
          this.setComputedTracks(this.getRawComputedTracks()),
          this.setGap(this.getGap()),
          this.setComputedGap(this.getRawComputedGap());
        var t = this.trackValues.filter(function (e) {
            return "%" === e.type;
          }),
          n = this.trackValues.filter(function (e) {
            return "fr" === e.type;
          });
        if (((this.totalFrs = n.length), this.totalFrs)) {
          var i = di(n);
          null !== i &&
            (this.frToPixels = this.computedPixels[i].numeric / n[i].numeric);
        }
        if (t.length) {
          var r = di(t);
          null !== r &&
            (this.percentageToPixels =
              this.computedPixels[r].numeric / t[r].numeric);
        }
        var o = this.getSizeAtTrack(this.track, !1) + this.start;
        if (
          ((this.dragStartOffset = this.getMousePosition(e) - o),
          (this.aTrack = this.track - 1),
          !(this.track < this.tracks.length - 1))
        )
          throw Error(
            "Invalid track index: " +
              this.track +
              ". Track must be between two other tracks and only " +
              this.tracks.length +
              " tracks were found."
          );
        (this.bTrack = this.track + 1),
          (this.aTrackStart =
            this.getSizeAtTrack(this.aTrack, !1) + this.start),
          (this.bTrackEnd = this.getSizeAtTrack(this.bTrack, !0) + this.start),
          (this.dragging = !0),
          window.addEventListener("mouseup", this.stopDragging),
          window.addEventListener("touchend", this.stopDragging),
          window.addEventListener("touchcancel", this.stopDragging),
          window.addEventListener("mousemove", this.drag),
          window.addEventListener("touchmove", this.drag),
          this.grid.addEventListener("selectstart", pi),
          this.grid.addEventListener("dragstart", pi),
          (this.grid.style.userSelect = "none"),
          (this.grid.style.webkitUserSelect = "none"),
          (this.grid.style.MozUserSelect = "none"),
          (this.grid.style.pointerEvents = "none"),
          (this.grid.style.cursor = this.cursor),
          (window.document.body.style.cursor = this.cursor),
          this.onDragStart(this.direction, this.track);
      }
    }),
    (vi.prototype.stopDragging = function () {
      (this.dragging = !1),
        this.cleanup(),
        this.onDragEnd(this.direction, this.track),
        this.needsDestroy &&
          (this.element &&
            (this.element.removeEventListener("mousedown", this.startDragging),
            this.element.removeEventListener("touchstart", this.startDragging)),
          this.destroyCb(),
          (this.needsDestroy = !1),
          (this.destroyCb = null));
    }),
    (vi.prototype.drag = function (e) {
      var t = this.getMousePosition(e),
        n = this.getSizeOfTrack(this.track),
        i =
          this.aTrackStart +
          this.minSizeStart +
          this.dragStartOffset +
          this.computedGapPixels,
        r =
          this.bTrackEnd -
          this.minSizeEnd -
          this.computedGapPixels -
          (n - this.dragStartOffset);
      t < i + this.snapOffset && (t = i),
        t > r - this.snapOffset && (t = r),
        t < i ? (t = i) : t > r && (t = r);
      var o =
          t - this.aTrackStart - this.dragStartOffset - this.computedGapPixels,
        s =
          this.bTrackEnd -
          t +
          this.dragStartOffset -
          n -
          this.computedGapPixels;
      if (this.dragInterval > 1) {
        var a = Math.round(o / this.dragInterval) * this.dragInterval;
        (s -= a - o), (o = a);
      }
      if (
        (o < this.minSizeStart && (o = this.minSizeStart),
        s < this.minSizeEnd && (s = this.minSizeEnd),
        "px" === this.trackValues[this.aTrack].type)
      )
        this.tracks[this.aTrack] = o + "px";
      else if ("fr" === this.trackValues[this.aTrack].type)
        if (1 === this.totalFrs) this.tracks[this.aTrack] = "1fr";
        else {
          var c = o / this.frToPixels;
          this.tracks[this.aTrack] = c + "fr";
        }
      else if ("%" === this.trackValues[this.aTrack].type) {
        var u = o / this.percentageToPixels;
        this.tracks[this.aTrack] = u + "%";
      }
      if ("px" === this.trackValues[this.bTrack].type)
        this.tracks[this.bTrack] = s + "px";
      else if ("fr" === this.trackValues[this.bTrack].type)
        if (1 === this.totalFrs) this.tracks[this.bTrack] = "1fr";
        else {
          var l = s / this.frToPixels;
          this.tracks[this.bTrack] = l + "fr";
        }
      else if ("%" === this.trackValues[this.bTrack].type) {
        var f = s / this.percentageToPixels;
        this.tracks[this.bTrack] = f + "%";
      }
      var d = this.tracks.join(" ");
      this.writeStyle(this.grid, this.gridTemplateProp, d),
        this.onDrag(this.direction, this.track, d);
    }),
    (vi.prototype.cleanup = function () {
      window.removeEventListener("mouseup", this.stopDragging),
        window.removeEventListener("touchend", this.stopDragging),
        window.removeEventListener("touchcancel", this.stopDragging),
        window.removeEventListener("mousemove", this.drag),
        window.removeEventListener("touchmove", this.drag),
        this.grid &&
          (this.grid.removeEventListener("selectstart", pi),
          this.grid.removeEventListener("dragstart", pi),
          (this.grid.style.userSelect = ""),
          (this.grid.style.webkitUserSelect = ""),
          (this.grid.style.MozUserSelect = ""),
          (this.grid.style.pointerEvents = ""),
          (this.grid.style.cursor = "")),
        (window.document.body.style.cursor = "");
    }),
    (vi.prototype.destroy = function (e, t) {
      void 0 === e && (e = !0),
        e || !1 === this.dragging
          ? (this.cleanup(),
            this.element &&
              (this.element.removeEventListener(
                "mousedown",
                this.startDragging
              ),
              this.element.removeEventListener(
                "touchstart",
                this.startDragging
              )),
            t && t())
          : ((this.needsDestroy = !0), t && (this.destroyCb = t));
    });
  var yi = function (e, t, n) {
      return t in e ? e[t] : n;
    },
    bi = function (e, t) {
      return function (n) {
        if (n.track < 1)
          throw Error(
            "Invalid track index: " +
              n.track +
              ". Track must be between two other tracks."
          );
        var i = "column" === e ? t.columnMinSizes || {} : t.rowMinSizes || {},
          r = "column" === e ? "columnMinSize" : "rowMinSize";
        return new vi(
          e,
          Object.assign(
            {},
            {
              minSizeStart: yi(i, n.track - 1, mi(t, r, mi(t, "minSize", 0))),
              minSizeEnd: yi(i, n.track + 1, mi(t, r, mi(t, "minSize", 0))),
            },
            n
          ),
          t
        );
      };
    },
    wi = function (e) {
      var t = this;
      (this.columnGutters = {}),
        (this.rowGutters = {}),
        (this.options = Object.assign(
          {},
          {
            columnGutters: e.columnGutters || [],
            rowGutters: e.rowGutters || [],
            columnMinSizes: e.columnMinSizes || {},
            rowMinSizes: e.rowMinSizes || {},
          },
          e
        )),
        this.options.columnGutters.forEach(function (e) {
          t.columnGutters[e.track] = bi("column", t.options)(e);
        }),
        this.options.rowGutters.forEach(function (e) {
          t.rowGutters[e.track] = bi("row", t.options)(e);
        });
    };
  (wi.prototype.addColumnGutter = function (e, t) {
    this.columnGutters[t] && this.columnGutters[t].destroy(),
      (this.columnGutters[t] = bi(
        "column",
        this.options
      )({ element: e, track: t }));
  }),
    (wi.prototype.addRowGutter = function (e, t) {
      this.rowGutters[t] && this.rowGutters[t].destroy(),
        (this.rowGutters[t] = bi(
          "row",
          this.options
        )({ element: e, track: t }));
    }),
    (wi.prototype.removeColumnGutter = function (e, t) {
      var n = this;
      void 0 === t && (t = !0),
        this.columnGutters[e] &&
          this.columnGutters[e].destroy(t, function () {
            delete n.columnGutters[e];
          });
    }),
    (wi.prototype.removeRowGutter = function (e, t) {
      var n = this;
      void 0 === t && (t = !0),
        this.rowGutters[e] &&
          this.rowGutters[e].destroy(t, function () {
            delete n.rowGutters[e];
          });
    }),
    (wi.prototype.handleDragStart = function (e, t, n) {
      "column" === t
        ? (this.columnGutters[n] && this.columnGutters[n].destroy(),
          (this.columnGutters[n] = bi("column", this.options)({ track: n })),
          this.columnGutters[n].startDragging(e))
        : "row" === t &&
          (this.rowGutters[n] && this.rowGutters[n].destroy(),
          (this.rowGutters[n] = bi("row", this.options)({ track: n })),
          this.rowGutters[n].startDragging(e));
    }),
    (wi.prototype.destroy = function (e) {
      var t = this;
      void 0 === e && (e = !0),
        Object.keys(this.columnGutters).forEach(function (n) {
          return t.columnGutters[n].destroy(e, function () {
            delete t.columnGutters[n];
          });
        }),
        Object.keys(this.rowGutters).forEach(function (n) {
          return t.rowGutters[n].destroy(e, function () {
            delete t.rowGutters[n];
          });
        });
    });
  function xi(e) {
    return e ? (e.nodeName || "").toLowerCase() : null;
  }
  function _i(e) {
    if (null == e) return window;
    if ("[object Window]" !== e.toString()) {
      var t = e.ownerDocument;
      return (t && t.defaultView) || window;
    }
    return e;
  }
  function Oi(e) {
    return e instanceof _i(e).Element || e instanceof Element;
  }
  function Ei(e) {
    return e instanceof _i(e).HTMLElement || e instanceof HTMLElement;
  }
  function ki(e) {
    return (
      "undefined" != typeof ShadowRoot &&
      (e instanceof _i(e).ShadowRoot || e instanceof ShadowRoot)
    );
  }
  var Si = {
      name: "applyStyles",
      enabled: !0,
      phase: "write",
      fn: function (e) {
        var t = e.state;
        Object.keys(t.elements).forEach(function (e) {
          var n = t.styles[e] || {},
            i = t.attributes[e] || {},
            r = t.elements[e];
          Ei(r) &&
            xi(r) &&
            (Object.assign(r.style, n),
            Object.keys(i).forEach(function (e) {
              var t = i[e];
              !1 === t
                ? r.removeAttribute(e)
                : r.setAttribute(e, !0 === t ? "" : t);
            }));
        });
      },
      effect: function (e) {
        var t = e.state,
          n = {
            popper: {
              position: t.options.strategy,
              left: "0",
              top: "0",
              margin: "0",
            },
            arrow: { position: "absolute" },
            reference: {},
          };
        return (
          Object.assign(t.elements.popper.style, n.popper),
          (t.styles = n),
          t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
          function () {
            Object.keys(t.elements).forEach(function (e) {
              var i = t.elements[e],
                r = t.attributes[e] || {},
                o = Object.keys(
                  t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]
                ).reduce(function (e, t) {
                  return (e[t] = ""), e;
                }, {});
              Ei(i) &&
                xi(i) &&
                (Object.assign(i.style, o),
                Object.keys(r).forEach(function (e) {
                  i.removeAttribute(e);
                }));
            });
          }
        );
      },
      requires: ["computeStyles"],
    },
    Ai = Math.max,
    Ti = Math.min,
    Ci = Math.round;
  function Mi(e, t) {
    void 0 === t && (t = !1);
    var n = e.getBoundingClientRect(),
      i = 1,
      r = 1;
    if (Ei(e) && t) {
      var o = e.offsetHeight,
        s = e.offsetWidth;
      s > 0 && (i = Ci(n.width) / s || 1), o > 0 && (r = Ci(n.height) / o || 1);
    }
    return {
      width: n.width / i,
      height: n.height / r,
      top: n.top / r,
      right: n.right / i,
      bottom: n.bottom / r,
      left: n.left / i,
      x: n.left / i,
      y: n.top / r,
    };
  }
  function ji(e) {
    var t = _i(e);
    return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
  }
  function Li(e) {
    return ((Oi(e) ? e.ownerDocument : e.document) || window.document)
      .documentElement;
  }
  function Pi(e) {
    return Mi(Li(e)).left + ji(e).scrollLeft;
  }
  function Di(e) {
    return _i(e).getComputedStyle(e);
  }
  function Ri(e) {
    var t = Di(e),
      n = t.overflow,
      i = t.overflowX,
      r = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + r + i);
  }
  function Wi(e, t, n) {
    void 0 === n && (n = !1);
    var i,
      r,
      o = Ei(t),
      s =
        Ei(t) &&
        (function (e) {
          var t = e.getBoundingClientRect(),
            n = Ci(t.width) / e.offsetWidth || 1,
            i = Ci(t.height) / e.offsetHeight || 1;
          return 1 !== n || 1 !== i;
        })(t),
      a = Li(t),
      c = Mi(e, s),
      u = { scrollLeft: 0, scrollTop: 0 },
      l = { x: 0, y: 0 };
    return (
      (o || (!o && !n)) &&
        (("body" !== xi(t) || Ri(a)) &&
          (u =
            (i = t) !== _i(i) && Ei(i)
              ? { scrollLeft: (r = i).scrollLeft, scrollTop: r.scrollTop }
              : ji(i)),
        Ei(t)
          ? (((l = Mi(t, !0)).x += t.clientLeft), (l.y += t.clientTop))
          : a && (l.x = Pi(a))),
      {
        x: c.left + u.scrollLeft - l.x,
        y: c.top + u.scrollTop - l.y,
        width: c.width,
        height: c.height,
      }
    );
  }
  function zi(e) {
    var t = Mi(e),
      n = e.offsetWidth,
      i = e.offsetHeight;
    return (
      Math.abs(t.width - n) <= 1 && (n = t.width),
      Math.abs(t.height - i) <= 1 && (i = t.height),
      { x: e.offsetLeft, y: e.offsetTop, width: n, height: i }
    );
  }
  function $i(e) {
    return "html" === xi(e)
      ? e
      : e.assignedSlot || e.parentNode || (ki(e) ? e.host : null) || Li(e);
  }
  function Ii(e) {
    return ["html", "body", "#document"].indexOf(xi(e)) >= 0
      ? e.ownerDocument.body
      : Ei(e) && Ri(e)
      ? e
      : Ii($i(e));
  }
  function Ni(e, t) {
    var n;
    void 0 === t && (t = []);
    var i = Ii(e),
      r = i === (null == (n = e.ownerDocument) ? void 0 : n.body),
      o = _i(i),
      s = r ? [o].concat(o.visualViewport || [], Ri(i) ? i : []) : i,
      a = t.concat(s);
    return r ? a : a.concat(Ni($i(s)));
  }
  function Hi(e) {
    return ["table", "td", "th"].indexOf(xi(e)) >= 0;
  }
  function Fi(e) {
    return Ei(e) && "fixed" !== Di(e).position ? e.offsetParent : null;
  }
  function Vi(e) {
    for (var t = _i(e), n = Fi(e); n && Hi(n) && "static" === Di(n).position; )
      n = Fi(n);
    return n &&
      ("html" === xi(n) || ("body" === xi(n) && "static" === Di(n).position))
      ? t
      : n ||
          (function (e) {
            var t = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (
              -1 !== navigator.userAgent.indexOf("Trident") &&
              Ei(e) &&
              "fixed" === Di(e).position
            )
              return null;
            var n = $i(e);
            for (
              ki(n) && (n = n.host);
              Ei(n) && ["html", "body"].indexOf(xi(n)) < 0;

            ) {
              var i = Di(n);
              if (
                "none" !== i.transform ||
                "none" !== i.perspective ||
                "paint" === i.contain ||
                -1 !== ["transform", "perspective"].indexOf(i.willChange) ||
                (t && "filter" === i.willChange) ||
                (t && i.filter && "none" !== i.filter)
              )
                return n;
              n = n.parentNode;
            }
            return null;
          })(e) ||
          t;
  }
  var Bi = "top",
    qi = "bottom",
    Gi = "right",
    Ui = "left",
    Xi = "auto",
    Yi = [Bi, qi, Gi, Ui],
    Ki = "start",
    Ji = "end",
    Zi = "viewport",
    Qi = "popper",
    er = Yi.reduce(function (e, t) {
      return e.concat([t + "-" + Ki, t + "-" + Ji]);
    }, []),
    tr = [].concat(Yi, [Xi]).reduce(function (e, t) {
      return e.concat([t, t + "-" + Ki, t + "-" + Ji]);
    }, []),
    nr = [
      "beforeRead",
      "read",
      "afterRead",
      "beforeMain",
      "main",
      "afterMain",
      "beforeWrite",
      "write",
      "afterWrite",
    ];
  function ir(e) {
    var t = new Map(),
      n = new Set(),
      i = [];
    function r(e) {
      n.add(e.name),
        []
          .concat(e.requires || [], e.requiresIfExists || [])
          .forEach(function (e) {
            if (!n.has(e)) {
              var i = t.get(e);
              i && r(i);
            }
          }),
        i.push(e);
    }
    return (
      e.forEach(function (e) {
        t.set(e.name, e);
      }),
      e.forEach(function (e) {
        n.has(e.name) || r(e);
      }),
      i
    );
  }
  function rr(e) {
    var t = ir(e);
    return nr.reduce(function (e, n) {
      return e.concat(
        t.filter(function (e) {
          return e.phase === n;
        })
      );
    }, []);
  }
  function or(e) {
    var t = e.reduce(function (e, t) {
      var n = e[t.name];
      return (
        (e[t.name] = n
          ? Object.assign({}, n, t, {
              options: Object.assign({}, n.options, t.options),
              data: Object.assign({}, n.data, t.data),
            })
          : t),
        e
      );
    }, {});
    return Object.keys(t).map(function (e) {
      return t[e];
    });
  }
  var sr = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function ar() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return !t.some(function (e) {
      return !(e && "function" == typeof e.getBoundingClientRect);
    });
  }
  function cr(e) {
    void 0 === e && (e = {});
    var t = e,
      n = t.defaultModifiers,
      i = void 0 === n ? [] : n,
      r = t.defaultOptions,
      o = void 0 === r ? sr : r;
    return function (e, t, n) {
      void 0 === n && (n = o);
      var r,
        s,
        a = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, sr, o),
          modifiersData: {},
          elements: { reference: e, popper: t },
          attributes: {},
          styles: {},
        },
        c = [],
        u = !1,
        l = {
          state: a,
          setOptions: function (n) {
            var r = "function" == typeof n ? n(a.options) : n;
            f(),
              (a.options = Object.assign({}, o, a.options, r)),
              (a.scrollParents = {
                reference: Oi(e)
                  ? Ni(e)
                  : e.contextElement
                  ? Ni(e.contextElement)
                  : [],
                popper: Ni(t),
              });
            var s = rr(or([].concat(i, a.options.modifiers)));
            return (
              (a.orderedModifiers = s.filter(function (e) {
                return e.enabled;
              })),
              a.orderedModifiers.forEach(function (e) {
                var t = e.name,
                  n = e.options,
                  i = void 0 === n ? {} : n,
                  r = e.effect;
                if ("function" == typeof r) {
                  var o = r({ state: a, name: t, instance: l, options: i }),
                    s = function () {};
                  c.push(o || s);
                }
              }),
              l.update()
            );
          },
          forceUpdate: function () {
            if (!u) {
              var e = a.elements,
                t = e.reference,
                n = e.popper;
              if (ar(t, n)) {
                (a.rects = {
                  reference: Wi(t, Vi(n), "fixed" === a.options.strategy),
                  popper: zi(n),
                }),
                  (a.reset = !1),
                  (a.placement = a.options.placement),
                  a.orderedModifiers.forEach(function (e) {
                    return (a.modifiersData[e.name] = Object.assign(
                      {},
                      e.data
                    ));
                  });
                for (var i = 0; i < a.orderedModifiers.length; i++)
                  if (!0 !== a.reset) {
                    var r = a.orderedModifiers[i],
                      o = r.fn,
                      s = r.options,
                      c = void 0 === s ? {} : s,
                      f = r.name;
                    "function" == typeof o &&
                      (a =
                        o({ state: a, options: c, name: f, instance: l }) || a);
                  } else (a.reset = !1), (i = -1);
              }
            }
          },
          update:
            ((r = function () {
              return new Promise(function (e) {
                l.forceUpdate(), e(a);
              });
            }),
            function () {
              return (
                s ||
                  (s = new Promise(function (e) {
                    Promise.resolve().then(function () {
                      (s = void 0), e(r());
                    });
                  })),
                s
              );
            }),
          destroy: function () {
            f(), (u = !0);
          },
        };
      if (!ar(e, t)) return l;
      function f() {
        c.forEach(function (e) {
          return e();
        }),
          (c = []);
      }
      return (
        l.setOptions(n).then(function (e) {
          !u && n.onFirstUpdate && n.onFirstUpdate(e);
        }),
        l
      );
    };
  }
  var ur = { passive: !0 };
  function lr(e) {
    return e.split("-")[0];
  }
  function fr(e) {
    return e.split("-")[1];
  }
  function dr(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
  }
  function pr(e) {
    var t,
      n = e.reference,
      i = e.element,
      r = e.placement,
      o = r ? lr(r) : null,
      s = r ? fr(r) : null,
      a = n.x + n.width / 2 - i.width / 2,
      c = n.y + n.height / 2 - i.height / 2;
    switch (o) {
      case Bi:
        t = { x: a, y: n.y - i.height };
        break;
      case qi:
        t = { x: a, y: n.y + n.height };
        break;
      case Gi:
        t = { x: n.x + n.width, y: c };
        break;
      case Ui:
        t = { x: n.x - i.width, y: c };
        break;
      default:
        t = { x: n.x, y: n.y };
    }
    var u = o ? dr(o) : null;
    if (null != u) {
      var l = "y" === u ? "height" : "width";
      switch (s) {
        case Ki:
          t[u] = t[u] - (n[l] / 2 - i[l] / 2);
          break;
        case Ji:
          t[u] = t[u] + (n[l] / 2 - i[l] / 2);
      }
    }
    return t;
  }
  var hr = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function mr(e) {
    var t,
      n = e.popper,
      i = e.popperRect,
      r = e.placement,
      o = e.variation,
      s = e.offsets,
      a = e.position,
      c = e.gpuAcceleration,
      u = e.adaptive,
      l = e.roundOffsets,
      f = e.isFixed,
      d = s.x,
      p = void 0 === d ? 0 : d,
      h = s.y,
      m = void 0 === h ? 0 : h,
      g = "function" == typeof l ? l({ x: p, y: m }) : { x: p, y: m };
    (p = g.x), (m = g.y);
    var v = s.hasOwnProperty("x"),
      y = s.hasOwnProperty("y"),
      b = Ui,
      w = Bi,
      x = window;
    if (u) {
      var _ = Vi(n),
        O = "clientHeight",
        E = "clientWidth";
      if (
        (_ === _i(n) &&
          "static" !== Di((_ = Li(n))).position &&
          "absolute" === a &&
          ((O = "scrollHeight"), (E = "scrollWidth")),
        r === Bi || ((r === Ui || r === Gi) && o === Ji))
      )
        (w = qi),
          (m -=
            (f && _ === x && x.visualViewport
              ? x.visualViewport.height
              : _[O]) - i.height),
          (m *= c ? 1 : -1);
      if (r === Ui || ((r === Bi || r === qi) && o === Ji))
        (b = Gi),
          (p -=
            (f && _ === x && x.visualViewport ? x.visualViewport.width : _[E]) -
            i.width),
          (p *= c ? 1 : -1);
    }
    var k,
      S = Object.assign({ position: a }, u && hr),
      A =
        !0 === l
          ? (function (e) {
              var t = e.x,
                n = e.y,
                i = window.devicePixelRatio || 1;
              return { x: Ci(t * i) / i || 0, y: Ci(n * i) / i || 0 };
            })({ x: p, y: m })
          : { x: p, y: m };
    return (
      (p = A.x),
      (m = A.y),
      c
        ? Object.assign(
            {},
            S,
            (((k = {})[w] = y ? "0" : ""),
            (k[b] = v ? "0" : ""),
            (k.transform =
              (x.devicePixelRatio || 1) <= 1
                ? "translate(" + p + "px, " + m + "px)"
                : "translate3d(" + p + "px, " + m + "px, 0)"),
            k)
          )
        : Object.assign(
            {},
            S,
            (((t = {})[w] = y ? m + "px" : ""),
            (t[b] = v ? p + "px" : ""),
            (t.transform = ""),
            t)
          )
    );
  }
  var gr = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function vr(e) {
    return e.replace(/left|right|bottom|top/g, function (e) {
      return gr[e];
    });
  }
  var yr = { start: "end", end: "start" };
  function br(e) {
    return e.replace(/start|end/g, function (e) {
      return yr[e];
    });
  }
  function wr(e) {
    var t = _i(e),
      n = Li(e),
      i = t.visualViewport,
      r = n.clientWidth,
      o = n.clientHeight,
      s = 0,
      a = 0;
    return (
      i &&
        ((r = i.width),
        (o = i.height),
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
          ((s = i.offsetLeft), (a = i.offsetTop))),
      { width: r, height: o, x: s + Pi(e), y: a }
    );
  }
  function xr(e) {
    var t,
      n = Li(e),
      i = ji(e),
      r = null == (t = e.ownerDocument) ? void 0 : t.body,
      o = Ai(
        n.scrollWidth,
        n.clientWidth,
        r ? r.scrollWidth : 0,
        r ? r.clientWidth : 0
      ),
      s = Ai(
        n.scrollHeight,
        n.clientHeight,
        r ? r.scrollHeight : 0,
        r ? r.clientHeight : 0
      ),
      a = -i.scrollLeft + Pi(e),
      c = -i.scrollTop;
    return (
      "rtl" === Di(r || n).direction &&
        (a += Ai(n.clientWidth, r ? r.clientWidth : 0) - o),
      { width: o, height: s, x: a, y: c }
    );
  }
  function _r(e, t) {
    var n = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (n && ki(n)) {
      var i = t;
      do {
        if (i && e.isSameNode(i)) return !0;
        i = i.parentNode || i.host;
      } while (i);
    }
    return !1;
  }
  function Or(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height,
    });
  }
  function Er(e, t) {
    return t === Zi
      ? Or(wr(e))
      : Oi(t)
      ? (function (e) {
          var t = Mi(e);
          return (
            (t.top = t.top + e.clientTop),
            (t.left = t.left + e.clientLeft),
            (t.bottom = t.top + e.clientHeight),
            (t.right = t.left + e.clientWidth),
            (t.width = e.clientWidth),
            (t.height = e.clientHeight),
            (t.x = t.left),
            (t.y = t.top),
            t
          );
        })(t)
      : Or(xr(Li(e)));
  }
  function kr(e, t, n) {
    var i =
        "clippingParents" === t
          ? (function (e) {
              var t = Ni($i(e)),
                n =
                  ["absolute", "fixed"].indexOf(Di(e).position) >= 0 && Ei(e)
                    ? Vi(e)
                    : e;
              return Oi(n)
                ? t.filter(function (e) {
                    return Oi(e) && _r(e, n) && "body" !== xi(e);
                  })
                : [];
            })(e)
          : [].concat(t),
      r = [].concat(i, [n]),
      o = r[0],
      s = r.reduce(function (t, n) {
        var i = Er(e, n);
        return (
          (t.top = Ai(i.top, t.top)),
          (t.right = Ti(i.right, t.right)),
          (t.bottom = Ti(i.bottom, t.bottom)),
          (t.left = Ai(i.left, t.left)),
          t
        );
      }, Er(e, o));
    return (
      (s.width = s.right - s.left),
      (s.height = s.bottom - s.top),
      (s.x = s.left),
      (s.y = s.top),
      s
    );
  }
  function Sr(e) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
  }
  function Ar(e, t) {
    return t.reduce(function (t, n) {
      return (t[n] = e), t;
    }, {});
  }
  function Tr(e, t) {
    void 0 === t && (t = {});
    var n = t,
      i = n.placement,
      r = void 0 === i ? e.placement : i,
      o = n.boundary,
      s = void 0 === o ? "clippingParents" : o,
      a = n.rootBoundary,
      c = void 0 === a ? Zi : a,
      u = n.elementContext,
      l = void 0 === u ? Qi : u,
      f = n.altBoundary,
      d = void 0 !== f && f,
      p = n.padding,
      h = void 0 === p ? 0 : p,
      m = Sr("number" != typeof h ? h : Ar(h, Yi)),
      g = l === Qi ? "reference" : Qi,
      v = e.rects.popper,
      y = e.elements[d ? g : l],
      b = kr(Oi(y) ? y : y.contextElement || Li(e.elements.popper), s, c),
      w = Mi(e.elements.reference),
      x = pr({ reference: w, element: v, strategy: "absolute", placement: r }),
      _ = Or(Object.assign({}, v, x)),
      O = l === Qi ? _ : w,
      E = {
        top: b.top - O.top + m.top,
        bottom: O.bottom - b.bottom + m.bottom,
        left: b.left - O.left + m.left,
        right: O.right - b.right + m.right,
      },
      k = e.modifiersData.offset;
    if (l === Qi && k) {
      var S = k[r];
      Object.keys(E).forEach(function (e) {
        var t = [Gi, qi].indexOf(e) >= 0 ? 1 : -1,
          n = [Bi, qi].indexOf(e) >= 0 ? "y" : "x";
        E[e] += S[n] * t;
      });
    }
    return E;
  }
  function Cr(e, t) {
    void 0 === t && (t = {});
    var n = t,
      i = n.placement,
      r = n.boundary,
      o = n.rootBoundary,
      s = n.padding,
      a = n.flipVariations,
      c = n.allowedAutoPlacements,
      u = void 0 === c ? tr : c,
      l = fr(i),
      f = l
        ? a
          ? er
          : er.filter(function (e) {
              return fr(e) === l;
            })
        : Yi,
      d = f.filter(function (e) {
        return u.indexOf(e) >= 0;
      });
    0 === d.length && (d = f);
    var p = d.reduce(function (t, n) {
      return (
        (t[n] = Tr(e, {
          placement: n,
          boundary: r,
          rootBoundary: o,
          padding: s,
        })[lr(n)]),
        t
      );
    }, {});
    return Object.keys(p).sort(function (e, t) {
      return p[e] - p[t];
    });
  }
  function Mr(e, t, n) {
    return Ai(e, Ti(t, n));
  }
  function jr(e, t, n) {
    var i = Mr(e, t, n);
    return i > n ? n : i;
  }
  function Lr(e, t, n) {
    return (
      void 0 === n && (n = { x: 0, y: 0 }),
      {
        top: e.top - t.height - n.y,
        right: e.right - t.width + n.x,
        bottom: e.bottom - t.height + n.y,
        left: e.left - t.width - n.x,
      }
    );
  }
  function Pr(e) {
    return [Bi, Gi, qi, Ui].some(function (t) {
      return e[t] >= 0;
    });
  }
  var Dr = cr({
      defaultModifiers: [
        {
          name: "eventListeners",
          enabled: !0,
          phase: "write",
          fn: function () {},
          effect: function (e) {
            var t = e.state,
              n = e.instance,
              i = e.options,
              r = i.scroll,
              o = void 0 === r || r,
              s = i.resize,
              a = void 0 === s || s,
              c = _i(t.elements.popper),
              u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
            return (
              o &&
                u.forEach(function (e) {
                  e.addEventListener("scroll", n.update, ur);
                }),
              a && c.addEventListener("resize", n.update, ur),
              function () {
                o &&
                  u.forEach(function (e) {
                    e.removeEventListener("scroll", n.update, ur);
                  }),
                  a && c.removeEventListener("resize", n.update, ur);
              }
            );
          },
          data: {},
        },
        {
          name: "popperOffsets",
          enabled: !0,
          phase: "read",
          fn: function (e) {
            var t = e.state,
              n = e.name;
            t.modifiersData[n] = pr({
              reference: t.rects.reference,
              element: t.rects.popper,
              strategy: "absolute",
              placement: t.placement,
            });
          },
          data: {},
        },
        {
          name: "computeStyles",
          enabled: !0,
          phase: "beforeWrite",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = n.gpuAcceleration,
              r = void 0 === i || i,
              o = n.adaptive,
              s = void 0 === o || o,
              a = n.roundOffsets,
              c = void 0 === a || a,
              u = {
                placement: lr(t.placement),
                variation: fr(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: r,
                isFixed: "fixed" === t.options.strategy,
              };
            null != t.modifiersData.popperOffsets &&
              (t.styles.popper = Object.assign(
                {},
                t.styles.popper,
                mr(
                  Object.assign({}, u, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: s,
                    roundOffsets: c,
                  })
                )
              )),
              null != t.modifiersData.arrow &&
                (t.styles.arrow = Object.assign(
                  {},
                  t.styles.arrow,
                  mr(
                    Object.assign({}, u, {
                      offsets: t.modifiersData.arrow,
                      position: "absolute",
                      adaptive: !1,
                      roundOffsets: c,
                    })
                  )
                )),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-placement": t.placement,
              }));
          },
          data: {},
        },
        Si,
        {
          name: "offset",
          enabled: !0,
          phase: "main",
          requires: ["popperOffsets"],
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = e.name,
              r = n.offset,
              o = void 0 === r ? [0, 0] : r,
              s = tr.reduce(function (e, n) {
                return (
                  (e[n] = (function (e, t, n) {
                    var i = lr(e),
                      r = [Ui, Bi].indexOf(i) >= 0 ? -1 : 1,
                      o =
                        "function" == typeof n
                          ? n(Object.assign({}, t, { placement: e }))
                          : n,
                      s = o[0],
                      a = o[1];
                    return (
                      (s = s || 0),
                      (a = (a || 0) * r),
                      [Ui, Gi].indexOf(i) >= 0 ? { x: a, y: s } : { x: s, y: a }
                    );
                  })(n, t.rects, o)),
                  e
                );
              }, {}),
              a = s[t.placement],
              c = a.x,
              u = a.y;
            null != t.modifiersData.popperOffsets &&
              ((t.modifiersData.popperOffsets.x += c),
              (t.modifiersData.popperOffsets.y += u)),
              (t.modifiersData[i] = s);
          },
        },
        {
          name: "flip",
          enabled: !0,
          phase: "main",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = e.name;
            if (!t.modifiersData[i]._skip) {
              for (
                var r = n.mainAxis,
                  o = void 0 === r || r,
                  s = n.altAxis,
                  a = void 0 === s || s,
                  c = n.fallbackPlacements,
                  u = n.padding,
                  l = n.boundary,
                  f = n.rootBoundary,
                  d = n.altBoundary,
                  p = n.flipVariations,
                  h = void 0 === p || p,
                  m = n.allowedAutoPlacements,
                  g = t.options.placement,
                  v = lr(g),
                  y =
                    c ||
                    (v === g || !h
                      ? [vr(g)]
                      : (function (e) {
                          if (lr(e) === Xi) return [];
                          var t = vr(e);
                          return [br(e), t, br(t)];
                        })(g)),
                  b = [g].concat(y).reduce(function (e, n) {
                    return e.concat(
                      lr(n) === Xi
                        ? Cr(t, {
                            placement: n,
                            boundary: l,
                            rootBoundary: f,
                            padding: u,
                            flipVariations: h,
                            allowedAutoPlacements: m,
                          })
                        : n
                    );
                  }, []),
                  w = t.rects.reference,
                  x = t.rects.popper,
                  _ = new Map(),
                  O = !0,
                  E = b[0],
                  k = 0;
                k < b.length;
                k++
              ) {
                var S = b[k],
                  A = lr(S),
                  T = fr(S) === Ki,
                  C = [Bi, qi].indexOf(A) >= 0,
                  M = C ? "width" : "height",
                  j = Tr(t, {
                    placement: S,
                    boundary: l,
                    rootBoundary: f,
                    altBoundary: d,
                    padding: u,
                  }),
                  L = C ? (T ? Gi : Ui) : T ? qi : Bi;
                w[M] > x[M] && (L = vr(L));
                var P = vr(L),
                  D = [];
                if (
                  (o && D.push(j[A] <= 0),
                  a && D.push(j[L] <= 0, j[P] <= 0),
                  D.every(function (e) {
                    return e;
                  }))
                ) {
                  (E = S), (O = !1);
                  break;
                }
                _.set(S, D);
              }
              if (O)
                for (
                  var R = function (e) {
                      var t = b.find(function (t) {
                        var n = _.get(t);
                        if (n)
                          return n.slice(0, e).every(function (e) {
                            return e;
                          });
                      });
                      if (t) return (E = t), "break";
                    },
                    W = h ? 3 : 1;
                  W > 0;
                  W--
                ) {
                  if ("break" === R(W)) break;
                }
              t.placement !== E &&
                ((t.modifiersData[i]._skip = !0),
                (t.placement = E),
                (t.reset = !0));
            }
          },
          requiresIfExists: ["offset"],
          data: { _skip: !1 },
        },
        {
          name: "preventOverflow",
          enabled: !0,
          phase: "main",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = e.name,
              r = n.mainAxis,
              o = void 0 === r || r,
              s = n.altAxis,
              a = void 0 !== s && s,
              c = n.boundary,
              u = n.rootBoundary,
              l = n.altBoundary,
              f = n.padding,
              d = n.tether,
              p = void 0 === d || d,
              h = n.tetherOffset,
              m = void 0 === h ? 0 : h,
              g = Tr(t, {
                boundary: c,
                rootBoundary: u,
                padding: f,
                altBoundary: l,
              }),
              v = lr(t.placement),
              y = fr(t.placement),
              b = !y,
              w = dr(v),
              x = "x" === w ? "y" : "x",
              _ = t.modifiersData.popperOffsets,
              O = t.rects.reference,
              E = t.rects.popper,
              k =
                "function" == typeof m
                  ? m(Object.assign({}, t.rects, { placement: t.placement }))
                  : m,
              S =
                "number" == typeof k
                  ? { mainAxis: k, altAxis: k }
                  : Object.assign({ mainAxis: 0, altAxis: 0 }, k),
              A = t.modifiersData.offset
                ? t.modifiersData.offset[t.placement]
                : null,
              T = { x: 0, y: 0 };
            if (_) {
              if (o) {
                var C,
                  M = "y" === w ? Bi : Ui,
                  j = "y" === w ? qi : Gi,
                  L = "y" === w ? "height" : "width",
                  P = _[w],
                  D = P + g[M],
                  R = P - g[j],
                  W = p ? -E[L] / 2 : 0,
                  z = y === Ki ? O[L] : E[L],
                  $ = y === Ki ? -E[L] : -O[L],
                  I = t.elements.arrow,
                  N = p && I ? zi(I) : { width: 0, height: 0 },
                  H = t.modifiersData["arrow#persistent"]
                    ? t.modifiersData["arrow#persistent"].padding
                    : { top: 0, right: 0, bottom: 0, left: 0 },
                  F = H[M],
                  V = H[j],
                  B = Mr(0, O[L], N[L]),
                  q = b
                    ? O[L] / 2 - W - B - F - S.mainAxis
                    : z - B - F - S.mainAxis,
                  G = b
                    ? -O[L] / 2 + W + B + V + S.mainAxis
                    : $ + B + V + S.mainAxis,
                  U = t.elements.arrow && Vi(t.elements.arrow),
                  X = U
                    ? "y" === w
                      ? U.clientTop || 0
                      : U.clientLeft || 0
                    : 0,
                  Y = null != (C = null == A ? void 0 : A[w]) ? C : 0,
                  K = P + G - Y,
                  J = Mr(p ? Ti(D, P + q - Y - X) : D, P, p ? Ai(R, K) : R);
                (_[w] = J), (T[w] = J - P);
              }
              if (a) {
                var Z,
                  Q = "x" === w ? Bi : Ui,
                  ee = "x" === w ? qi : Gi,
                  te = _[x],
                  ne = "y" === x ? "height" : "width",
                  ie = te + g[Q],
                  re = te - g[ee],
                  oe = -1 !== [Bi, Ui].indexOf(v),
                  se = null != (Z = null == A ? void 0 : A[x]) ? Z : 0,
                  ae = oe ? ie : te - O[ne] - E[ne] - se + S.altAxis,
                  ce = oe ? te + O[ne] + E[ne] - se - S.altAxis : re,
                  ue =
                    p && oe ? jr(ae, te, ce) : Mr(p ? ae : ie, te, p ? ce : re);
                (_[x] = ue), (T[x] = ue - te);
              }
              t.modifiersData[i] = T;
            }
          },
          requiresIfExists: ["offset"],
        },
        {
          name: "arrow",
          enabled: !0,
          phase: "main",
          fn: function (e) {
            var t,
              n = e.state,
              i = e.name,
              r = e.options,
              o = n.elements.arrow,
              s = n.modifiersData.popperOffsets,
              a = lr(n.placement),
              c = dr(a),
              u = [Ui, Gi].indexOf(a) >= 0 ? "height" : "width";
            if (o && s) {
              var l = (function (e, t) {
                  return Sr(
                    "number" !=
                      typeof (e =
                        "function" == typeof e
                          ? e(
                              Object.assign({}, t.rects, {
                                placement: t.placement,
                              })
                            )
                          : e)
                      ? e
                      : Ar(e, Yi)
                  );
                })(r.padding, n),
                f = zi(o),
                d = "y" === c ? Bi : Ui,
                p = "y" === c ? qi : Gi,
                h =
                  n.rects.reference[u] +
                  n.rects.reference[c] -
                  s[c] -
                  n.rects.popper[u],
                m = s[c] - n.rects.reference[c],
                g = Vi(o),
                v = g
                  ? "y" === c
                    ? g.clientHeight || 0
                    : g.clientWidth || 0
                  : 0,
                y = h / 2 - m / 2,
                b = l[d],
                w = v - f[u] - l[p],
                x = v / 2 - f[u] / 2 + y,
                _ = Mr(b, x, w),
                O = c;
              n.modifiersData[i] =
                (((t = {})[O] = _), (t.centerOffset = _ - x), t);
            }
          },
          effect: function (e) {
            var t = e.state,
              n = e.options.element,
              i = void 0 === n ? "[data-popper-arrow]" : n;
            null != i &&
              ("string" != typeof i ||
                (i = t.elements.popper.querySelector(i))) &&
              _r(t.elements.popper, i) &&
              (t.elements.arrow = i);
          },
          requires: ["popperOffsets"],
          requiresIfExists: ["preventOverflow"],
        },
        {
          name: "hide",
          enabled: !0,
          phase: "main",
          requiresIfExists: ["preventOverflow"],
          fn: function (e) {
            var t = e.state,
              n = e.name,
              i = t.rects.reference,
              r = t.rects.popper,
              o = t.modifiersData.preventOverflow,
              s = Tr(t, { elementContext: "reference" }),
              a = Tr(t, { altBoundary: !0 }),
              c = Lr(s, i),
              u = Lr(a, r, o),
              l = Pr(c),
              f = Pr(u);
            (t.modifiersData[n] = {
              referenceClippingOffsets: c,
              popperEscapeOffsets: u,
              isReferenceHidden: l,
              hasPopperEscaped: f,
            }),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-reference-hidden": l,
                "data-popper-escaped": f,
              }));
          },
        },
      ],
    }),
    Rr = "tippy-content",
    Wr = "tippy-backdrop",
    zr = "tippy-arrow",
    $r = "tippy-svg-arrow",
    Ir = { passive: !0, capture: !0 },
    Nr = function () {
      return document.body;
    };
  function Hr(e, t, n) {
    if (Array.isArray(e)) {
      var i = e[t];
      return null == i ? (Array.isArray(n) ? n[t] : n) : i;
    }
    return e;
  }
  function Fr(e, t) {
    var n = {}.toString.call(e);
    return 0 === n.indexOf("[object") && n.indexOf(t + "]") > -1;
  }
  function Vr(e, t) {
    return "function" == typeof e ? e.apply(void 0, t) : e;
  }
  function Br(e, t) {
    return 0 === t
      ? e
      : function (i) {
          clearTimeout(n),
            (n = setTimeout(function () {
              e(i);
            }, t));
        };
    var n;
  }
  function qr(e) {
    return [].concat(e);
  }
  function Gr(e, t) {
    -1 === e.indexOf(t) && e.push(t);
  }
  function Ur(e) {
    return e.split("-")[0];
  }
  function Xr(e) {
    return [].slice.call(e);
  }
  function Yr(e) {
    return Object.keys(e).reduce(function (t, n) {
      return void 0 !== e[n] && (t[n] = e[n]), t;
    }, {});
  }
  function Kr() {
    return document.createElement("div");
  }
  function Jr(e) {
    return ["Element", "Fragment"].some(function (t) {
      return Fr(e, t);
    });
  }
  function Zr(e) {
    return Fr(e, "MouseEvent");
  }
  function Qr(e) {
    return !(!e || !e._tippy || e._tippy.reference !== e);
  }
  function eo(e) {
    return Jr(e)
      ? [e]
      : (function (e) {
          return Fr(e, "NodeList");
        })(e)
      ? Xr(e)
      : Array.isArray(e)
      ? e
      : Xr(document.querySelectorAll(e));
  }
  function to(e, t) {
    e.forEach(function (e) {
      e && (e.style.transitionDuration = t + "ms");
    });
  }
  function no(e, t) {
    e.forEach(function (e) {
      e && e.setAttribute("data-state", t);
    });
  }
  function io(e) {
    var t,
      n = qr(e)[0];
    return null != n && null != (t = n.ownerDocument) && t.body
      ? n.ownerDocument
      : document;
  }
  function ro(e, t, n) {
    var i = t + "EventListener";
    ["transitionend", "webkitTransitionEnd"].forEach(function (t) {
      e[i](t, n);
    });
  }
  function oo(e, t) {
    for (var n = t; n; ) {
      var i;
      if (e.contains(n)) return !0;
      n =
        null == n.getRootNode || null == (i = n.getRootNode())
          ? void 0
          : i.host;
    }
    return !1;
  }
  var so = { isTouch: !1 },
    ao = 0;
  function co() {
    so.isTouch ||
      ((so.isTouch = !0),
      window.performance && document.addEventListener("mousemove", uo));
  }
  function uo() {
    var e = performance.now();
    e - ao < 20 &&
      ((so.isTouch = !1), document.removeEventListener("mousemove", uo)),
      (ao = e);
  }
  function lo() {
    var e = document.activeElement;
    if (Qr(e)) {
      var t = e._tippy;
      e.blur && !t.state.isVisible && e.blur();
    }
  }
  var fo =
    !!("undefined" != typeof window && "undefined" != typeof document) &&
    !!window.msCrypto;
  var po = {
      animateFill: !1,
      followCursor: !1,
      inlinePositioning: !1,
      sticky: !1,
    },
    ho = Object.assign(
      {
        appendTo: Nr,
        aria: { content: "auto", expanded: "auto" },
        delay: 0,
        duration: [300, 250],
        getReferenceClientRect: null,
        hideOnClick: !0,
        ignoreAttributes: !1,
        interactive: !1,
        interactiveBorder: 2,
        interactiveDebounce: 0,
        moveTransition: "",
        offset: [0, 10],
        onAfterUpdate: function () {},
        onBeforeUpdate: function () {},
        onCreate: function () {},
        onDestroy: function () {},
        onHidden: function () {},
        onHide: function () {},
        onMount: function () {},
        onShow: function () {},
        onShown: function () {},
        onTrigger: function () {},
        onUntrigger: function () {},
        onClickOutside: function () {},
        placement: "top",
        plugins: [],
        popperOptions: {},
        render: null,
        showOnCreate: !1,
        touch: !0,
        trigger: "mouseenter focus",
        triggerTarget: null,
      },
      po,
      {
        allowHTML: !1,
        animation: "fade",
        arrow: !0,
        content: "",
        inertia: !1,
        maxWidth: 350,
        role: "tooltip",
        theme: "",
        zIndex: 9999,
      }
    ),
    mo = Object.keys(ho);
  function go(e) {
    var t = (e.plugins || []).reduce(function (t, n) {
      var i,
        r = n.name,
        o = n.defaultValue;
      r && (t[r] = void 0 !== e[r] ? e[r] : null != (i = ho[r]) ? i : o);
      return t;
    }, {});
    return Object.assign({}, e, t);
  }
  function vo(e, t) {
    var n = Object.assign(
      {},
      t,
      { content: Vr(t.content, [e]) },
      t.ignoreAttributes
        ? {}
        : (function (e, t) {
            return (t
              ? Object.keys(go(Object.assign({}, ho, { plugins: t })))
              : mo
            ).reduce(function (t, n) {
              var i = (e.getAttribute("data-tippy-" + n) || "").trim();
              if (!i) return t;
              if ("content" === n) t[n] = i;
              else
                try {
                  t[n] = JSON.parse(i);
                } catch (e) {
                  t[n] = i;
                }
              return t;
            }, {});
          })(e, t.plugins)
    );
    return (
      (n.aria = Object.assign({}, ho.aria, n.aria)),
      (n.aria = {
        expanded: "auto" === n.aria.expanded ? t.interactive : n.aria.expanded,
        content:
          "auto" === n.aria.content
            ? t.interactive
              ? null
              : "describedby"
            : n.aria.content,
      }),
      n
    );
  }
  function yo(e, t) {
    e.innerHTML = t;
  }
  function bo(e) {
    var t = Kr();
    return (
      !0 === e
        ? (t.className = zr)
        : ((t.className = $r), Jr(e) ? t.appendChild(e) : yo(t, e)),
      t
    );
  }
  function wo(e, t) {
    Jr(t.content)
      ? (yo(e, ""), e.appendChild(t.content))
      : "function" != typeof t.content &&
        (t.allowHTML ? yo(e, t.content) : (e.textContent = t.content));
  }
  function xo(e) {
    var t = e.firstElementChild,
      n = Xr(t.children);
    return {
      box: t,
      content: n.find(function (e) {
        return e.classList.contains(Rr);
      }),
      arrow: n.find(function (e) {
        return e.classList.contains(zr) || e.classList.contains($r);
      }),
      backdrop: n.find(function (e) {
        return e.classList.contains(Wr);
      }),
    };
  }
  function _o(e) {
    var t = Kr(),
      n = Kr();
    (n.className = "tippy-box"),
      n.setAttribute("data-state", "hidden"),
      n.setAttribute("tabindex", "-1");
    var i = Kr();
    function r(n, i) {
      var r = xo(t),
        o = r.box,
        s = r.content,
        a = r.arrow;
      i.theme
        ? o.setAttribute("data-theme", i.theme)
        : o.removeAttribute("data-theme"),
        "string" == typeof i.animation
          ? o.setAttribute("data-animation", i.animation)
          : o.removeAttribute("data-animation"),
        i.inertia
          ? o.setAttribute("data-inertia", "")
          : o.removeAttribute("data-inertia"),
        (o.style.maxWidth =
          "number" == typeof i.maxWidth ? i.maxWidth + "px" : i.maxWidth),
        i.role ? o.setAttribute("role", i.role) : o.removeAttribute("role"),
        (n.content === i.content && n.allowHTML === i.allowHTML) ||
          wo(s, e.props),
        i.arrow
          ? a
            ? n.arrow !== i.arrow &&
              (o.removeChild(a), o.appendChild(bo(i.arrow)))
            : o.appendChild(bo(i.arrow))
          : a && o.removeChild(a);
    }
    return (
      (i.className = Rr),
      i.setAttribute("data-state", "hidden"),
      wo(i, e.props),
      t.appendChild(n),
      n.appendChild(i),
      r(e.props, e.props),
      { popper: t, onUpdate: r }
    );
  }
  _o.$$tippy = !0;
  var Oo = 1,
    Eo = [],
    ko = [];
  function So(e, t) {
    var n,
      i,
      r,
      o,
      s,
      a,
      c,
      u,
      l = vo(e, Object.assign({}, ho, go(Yr(t)))),
      f = !1,
      d = !1,
      p = !1,
      h = !1,
      m = [],
      g = Br(U, l.interactiveDebounce),
      v = Oo++,
      y = (u = l.plugins).filter(function (e, t) {
        return u.indexOf(e) === t;
      }),
      b = {
        id: v,
        reference: e,
        popper: Kr(),
        popperInstance: null,
        props: l,
        state: {
          isEnabled: !0,
          isVisible: !1,
          isDestroyed: !1,
          isMounted: !1,
          isShown: !1,
        },
        plugins: y,
        clearDelayTimeouts: function () {
          clearTimeout(n), clearTimeout(i), cancelAnimationFrame(r);
        },
        setProps: function (t) {
          0;
          if (b.state.isDestroyed) return;
          P("onBeforeUpdate", [b, t]), q();
          var n = b.props,
            i = vo(e, Object.assign({}, n, Yr(t), { ignoreAttributes: !0 }));
          (b.props = i),
            B(),
            n.interactiveDebounce !== i.interactiveDebounce &&
              (W(), (g = Br(U, i.interactiveDebounce)));
          n.triggerTarget && !i.triggerTarget
            ? qr(n.triggerTarget).forEach(function (e) {
                e.removeAttribute("aria-expanded");
              })
            : i.triggerTarget && e.removeAttribute("aria-expanded");
          R(), L(), _ && _(n, i);
          b.popperInstance &&
            (J(),
            Q().forEach(function (e) {
              requestAnimationFrame(e._tippy.popperInstance.forceUpdate);
            }));
          P("onAfterUpdate", [b, t]);
        },
        setContent: function (e) {
          b.setProps({ content: e });
        },
        show: function () {
          0;
          var e = b.state.isVisible,
            t = b.state.isDestroyed,
            n = !b.state.isEnabled,
            i = so.isTouch && !b.props.touch,
            r = Hr(b.props.duration, 0, ho.duration);
          if (e || t || n || i) return;
          if (T().hasAttribute("disabled")) return;
          if ((P("onShow", [b], !1), !1 === b.props.onShow(b))) return;
          (b.state.isVisible = !0), A() && (x.style.visibility = "visible");
          L(), N(), b.state.isMounted || (x.style.transition = "none");
          if (A()) {
            var o = M(),
              s = o.box,
              c = o.content;
            to([s, c], 0);
          }
          (a = function () {
            var e;
            if (b.state.isVisible && !h) {
              if (
                ((h = !0),
                x.offsetHeight,
                (x.style.transition = b.props.moveTransition),
                A() && b.props.animation)
              ) {
                var t = M(),
                  n = t.box,
                  i = t.content;
                to([n, i], r), no([n, i], "visible");
              }
              D(),
                R(),
                Gr(ko, b),
                null == (e = b.popperInstance) || e.forceUpdate(),
                P("onMount", [b]),
                b.props.animation &&
                  A() &&
                  (function (e, t) {
                    F(e, t);
                  })(r, function () {
                    (b.state.isShown = !0), P("onShown", [b]);
                  });
            }
          }),
            (function () {
              var e,
                t = b.props.appendTo,
                n = T();
              e =
                (b.props.interactive && t === Nr) || "parent" === t
                  ? n.parentNode
                  : Vr(t, [n]);
              e.contains(x) || e.appendChild(x);
              (b.state.isMounted = !0), J(), !1;
            })();
        },
        hide: function () {
          0;
          var e = !b.state.isVisible,
            t = b.state.isDestroyed,
            n = !b.state.isEnabled,
            i = Hr(b.props.duration, 1, ho.duration);
          if (e || t || n) return;
          if ((P("onHide", [b], !1), !1 === b.props.onHide(b))) return;
          (b.state.isVisible = !1),
            (b.state.isShown = !1),
            (h = !1),
            (f = !1),
            A() && (x.style.visibility = "hidden");
          if ((W(), H(), L(!0), A())) {
            var r = M(),
              o = r.box,
              s = r.content;
            b.props.animation && (to([o, s], i), no([o, s], "hidden"));
          }
          D(),
            R(),
            b.props.animation
              ? A() &&
                (function (e, t) {
                  F(e, function () {
                    !b.state.isVisible &&
                      x.parentNode &&
                      x.parentNode.contains(x) &&
                      t();
                  });
                })(i, b.unmount)
              : b.unmount();
        },
        hideWithInteractivity: function (e) {
          0;
          C().addEventListener("mousemove", g), Gr(Eo, g), g(e);
        },
        enable: function () {
          b.state.isEnabled = !0;
        },
        disable: function () {
          b.hide(), (b.state.isEnabled = !1);
        },
        unmount: function () {
          0;
          b.state.isVisible && b.hide();
          if (!b.state.isMounted) return;
          Z(),
            Q().forEach(function (e) {
              e._tippy.unmount();
            }),
            x.parentNode && x.parentNode.removeChild(x);
          (ko = ko.filter(function (e) {
            return e !== b;
          })),
            (b.state.isMounted = !1),
            P("onHidden", [b]);
        },
        destroy: function () {
          0;
          if (b.state.isDestroyed) return;
          b.clearDelayTimeouts(),
            b.unmount(),
            q(),
            delete e._tippy,
            (b.state.isDestroyed = !0),
            P("onDestroy", [b]);
        },
      };
    if (!l.render) return b;
    var w = l.render(b),
      x = w.popper,
      _ = w.onUpdate;
    x.setAttribute("data-tippy-root", ""),
      (x.id = "tippy-" + b.id),
      (b.popper = x),
      (e._tippy = b),
      (x._tippy = b);
    var O = y.map(function (e) {
        return e.fn(b);
      }),
      E = e.hasAttribute("aria-expanded");
    return (
      B(),
      R(),
      L(),
      P("onCreate", [b]),
      l.showOnCreate && ee(),
      x.addEventListener("mouseenter", function () {
        b.props.interactive && b.state.isVisible && b.clearDelayTimeouts();
      }),
      x.addEventListener("mouseleave", function () {
        b.props.interactive &&
          b.props.trigger.indexOf("mouseenter") >= 0 &&
          C().addEventListener("mousemove", g);
      }),
      b
    );
    function k() {
      var e = b.props.touch;
      return Array.isArray(e) ? e : [e, 0];
    }
    function S() {
      return "hold" === k()[0];
    }
    function A() {
      var e;
      return !(null == (e = b.props.render) || !e.$$tippy);
    }
    function T() {
      return c || e;
    }
    function C() {
      var e = T().parentNode;
      return e ? io(e) : document;
    }
    function M() {
      return xo(x);
    }
    function j(e) {
      return (b.state.isMounted && !b.state.isVisible) ||
        so.isTouch ||
        (o && "focus" === o.type)
        ? 0
        : Hr(b.props.delay, e ? 0 : 1, ho.delay);
    }
    function L(e) {
      void 0 === e && (e = !1),
        (x.style.pointerEvents = b.props.interactive && !e ? "" : "none"),
        (x.style.zIndex = "" + b.props.zIndex);
    }
    function P(e, t, n) {
      var i;
      (void 0 === n && (n = !0),
      O.forEach(function (n) {
        n[e] && n[e].apply(n, t);
      }),
      n) && (i = b.props)[e].apply(i, t);
    }
    function D() {
      var t = b.props.aria;
      if (t.content) {
        var n = "aria-" + t.content,
          i = x.id;
        qr(b.props.triggerTarget || e).forEach(function (e) {
          var t = e.getAttribute(n);
          if (b.state.isVisible) e.setAttribute(n, t ? t + " " + i : i);
          else {
            var r = t && t.replace(i, "").trim();
            r ? e.setAttribute(n, r) : e.removeAttribute(n);
          }
        });
      }
    }
    function R() {
      !E &&
        b.props.aria.expanded &&
        qr(b.props.triggerTarget || e).forEach(function (e) {
          b.props.interactive
            ? e.setAttribute(
                "aria-expanded",
                b.state.isVisible && e === T() ? "true" : "false"
              )
            : e.removeAttribute("aria-expanded");
        });
    }
    function W() {
      C().removeEventListener("mousemove", g),
        (Eo = Eo.filter(function (e) {
          return e !== g;
        }));
    }
    function z(t) {
      if (!so.isTouch || (!p && "mousedown" !== t.type)) {
        var n = (t.composedPath && t.composedPath()[0]) || t.target;
        if (!b.props.interactive || !oo(x, n)) {
          if (
            qr(b.props.triggerTarget || e).some(function (e) {
              return oo(e, n);
            })
          ) {
            if (so.isTouch) return;
            if (b.state.isVisible && b.props.trigger.indexOf("click") >= 0)
              return;
          } else P("onClickOutside", [b, t]);
          !0 === b.props.hideOnClick &&
            (b.clearDelayTimeouts(),
            b.hide(),
            (d = !0),
            setTimeout(function () {
              d = !1;
            }),
            b.state.isMounted || H());
        }
      }
    }
    function $() {
      p = !0;
    }
    function I() {
      p = !1;
    }
    function N() {
      var e = C();
      e.addEventListener("mousedown", z, !0),
        e.addEventListener("touchend", z, Ir),
        e.addEventListener("touchstart", I, Ir),
        e.addEventListener("touchmove", $, Ir);
    }
    function H() {
      var e = C();
      e.removeEventListener("mousedown", z, !0),
        e.removeEventListener("touchend", z, Ir),
        e.removeEventListener("touchstart", I, Ir),
        e.removeEventListener("touchmove", $, Ir);
    }
    function F(e, t) {
      var n = M().box;
      function i(e) {
        e.target === n && (ro(n, "remove", i), t());
      }
      if (0 === e) return t();
      ro(n, "remove", s), ro(n, "add", i), (s = i);
    }
    function V(t, n, i) {
      void 0 === i && (i = !1),
        qr(b.props.triggerTarget || e).forEach(function (e) {
          e.addEventListener(t, n, i),
            m.push({ node: e, eventType: t, handler: n, options: i });
        });
    }
    function B() {
      var e;
      S() &&
        (V("touchstart", G, { passive: !0 }),
        V("touchend", X, { passive: !0 })),
        ((e = b.props.trigger), e.split(/\s+/).filter(Boolean)).forEach(
          function (e) {
            if ("manual" !== e)
              switch ((V(e, G), e)) {
                case "mouseenter":
                  V("mouseleave", X);
                  break;
                case "focus":
                  V(fo ? "focusout" : "blur", Y);
                  break;
                case "focusin":
                  V("focusout", Y);
              }
          }
        );
    }
    function q() {
      m.forEach(function (e) {
        var t = e.node,
          n = e.eventType,
          i = e.handler,
          r = e.options;
        t.removeEventListener(n, i, r);
      }),
        (m = []);
    }
    function G(e) {
      var t,
        n = !1;
      if (b.state.isEnabled && !K(e) && !d) {
        var i = "focus" === (null == (t = o) ? void 0 : t.type);
        (o = e),
          (c = e.currentTarget),
          R(),
          !b.state.isVisible &&
            Zr(e) &&
            Eo.forEach(function (t) {
              return t(e);
            }),
          "click" === e.type &&
          (b.props.trigger.indexOf("mouseenter") < 0 || f) &&
          !1 !== b.props.hideOnClick &&
          b.state.isVisible
            ? (n = !0)
            : ee(e),
          "click" === e.type && (f = !n),
          n && !i && te(e);
      }
    }
    function U(e) {
      var t = e.target,
        n = T().contains(t) || x.contains(t);
      ("mousemove" === e.type && n) ||
        ((function (e, t) {
          var n = t.clientX,
            i = t.clientY;
          return e.every(function (e) {
            var t = e.popperRect,
              r = e.popperState,
              o = e.props.interactiveBorder,
              s = Ur(r.placement),
              a = r.modifiersData.offset;
            if (!a) return !0;
            var c = "bottom" === s ? a.top.y : 0,
              u = "top" === s ? a.bottom.y : 0,
              l = "right" === s ? a.left.x : 0,
              f = "left" === s ? a.right.x : 0,
              d = t.top - i + c > o,
              p = i - t.bottom - u > o,
              h = t.left - n + l > o,
              m = n - t.right - f > o;
            return d || p || h || m;
          });
        })(
          Q()
            .concat(x)
            .map(function (e) {
              var t,
                n = null == (t = e._tippy.popperInstance) ? void 0 : t.state;
              return n
                ? {
                    popperRect: e.getBoundingClientRect(),
                    popperState: n,
                    props: l,
                  }
                : null;
            })
            .filter(Boolean),
          e
        ) &&
          (W(), te(e)));
    }
    function X(e) {
      K(e) ||
        (b.props.trigger.indexOf("click") >= 0 && f) ||
        (b.props.interactive ? b.hideWithInteractivity(e) : te(e));
    }
    function Y(e) {
      (b.props.trigger.indexOf("focusin") < 0 && e.target !== T()) ||
        (b.props.interactive &&
          e.relatedTarget &&
          x.contains(e.relatedTarget)) ||
        te(e);
    }
    function K(e) {
      return !!so.isTouch && S() !== e.type.indexOf("touch") >= 0;
    }
    function J() {
      Z();
      var t = b.props,
        n = t.popperOptions,
        i = t.placement,
        r = t.offset,
        o = t.getReferenceClientRect,
        s = t.moveTransition,
        c = A() ? xo(x).arrow : null,
        u = o
          ? {
              getBoundingClientRect: o,
              contextElement: o.contextElement || T(),
            }
          : e,
        l = [
          { name: "offset", options: { offset: r } },
          {
            name: "preventOverflow",
            options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
          },
          { name: "flip", options: { padding: 5 } },
          { name: "computeStyles", options: { adaptive: !s } },
          {
            name: "$$tippy",
            enabled: !0,
            phase: "beforeWrite",
            requires: ["computeStyles"],
            fn: function (e) {
              var t = e.state;
              if (A()) {
                var n = M().box;
                ["placement", "reference-hidden", "escaped"].forEach(function (
                  e
                ) {
                  "placement" === e
                    ? n.setAttribute("data-placement", t.placement)
                    : t.attributes.popper["data-popper-" + e]
                    ? n.setAttribute("data-" + e, "")
                    : n.removeAttribute("data-" + e);
                }),
                  (t.attributes.popper = {});
              }
            },
          },
        ];
      A() &&
        c &&
        l.push({ name: "arrow", options: { element: c, padding: 3 } }),
        l.push.apply(l, (null == n ? void 0 : n.modifiers) || []),
        (b.popperInstance = Dr(
          u,
          x,
          Object.assign({}, n, { placement: i, onFirstUpdate: a, modifiers: l })
        ));
    }
    function Z() {
      b.popperInstance &&
        (b.popperInstance.destroy(), (b.popperInstance = null));
    }
    function Q() {
      return Xr(x.querySelectorAll("[data-tippy-root]"));
    }
    function ee(e) {
      b.clearDelayTimeouts(), e && P("onTrigger", [b, e]), N();
      var t = j(!0),
        i = k(),
        r = i[0],
        o = i[1];
      so.isTouch && "hold" === r && o && (t = o),
        t
          ? (n = setTimeout(function () {
              b.show();
            }, t))
          : b.show();
    }
    function te(e) {
      if (
        (b.clearDelayTimeouts(), P("onUntrigger", [b, e]), b.state.isVisible)
      ) {
        if (
          !(
            b.props.trigger.indexOf("mouseenter") >= 0 &&
            b.props.trigger.indexOf("click") >= 0 &&
            ["mouseleave", "mousemove"].indexOf(e.type) >= 0 &&
            f
          )
        ) {
          var t = j(!1);
          t
            ? (i = setTimeout(function () {
                b.state.isVisible && b.hide();
              }, t))
            : (r = requestAnimationFrame(function () {
                b.hide();
              }));
        }
      } else H();
    }
  }
  function Ao(e, t) {
    void 0 === t && (t = {});
    var n = ho.plugins.concat(t.plugins || []);
    document.addEventListener("touchstart", co, Ir),
      window.addEventListener("blur", lo);
    var i = Object.assign({}, t, { plugins: n }),
      r = eo(e).reduce(function (e, t) {
        var n = t && So(t, i);
        return n && e.push(n), e;
      }, []);
    return Jr(e) ? r[0] : r;
  }
  (Ao.defaultProps = ho),
    (Ao.setDefaultProps = function (e) {
      Object.keys(e).forEach(function (t) {
        ho[t] = e[t];
      });
    }),
    (Ao.currentInput = so);
  Object.assign({}, Si, {
    effect: function (e) {
      var t = e.state,
        n = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      Object.assign(t.elements.popper.style, n.popper),
        (t.styles = n),
        t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow);
    },
  });
  Ao.setDefaultProps({ render: _o });
  var To = Ao;
  var Co = {};
  !(function (e) {
    if ("undefined" != typeof window) {
      var t,
        n = 0,
        i = !1,
        r = !1,
        o = "message".length,
        s = "[iFrameSizer]",
        a = s.length,
        c = null,
        u = window.requestAnimationFrame,
        l = { max: 1, scroll: 1, bodyScroll: 1, documentElementScroll: 1 },
        f = {},
        d = null,
        p = {
          autoResize: !0,
          bodyBackground: null,
          bodyMargin: null,
          bodyMarginV1: 8,
          bodyPadding: null,
          checkOrigin: !0,
          inPageLinks: !1,
          enablePublicMethods: !0,
          heightCalculationMethod: "bodyOffset",
          id: "iFrameResizer",
          interval: 32,
          log: !1,
          maxHeight: 1 / 0,
          maxWidth: 1 / 0,
          minHeight: 0,
          minWidth: 0,
          mouseEvents: !0,
          resizeFrom: "parent",
          scrolling: !1,
          sizeHeight: !0,
          sizeWidth: !1,
          warningTimeout: 5e3,
          tolerance: 0,
          widthCalculationMethod: "scroll",
          onClose: function () {
            return !0;
          },
          onClosed: function () {},
          onInit: function () {},
          onMessage: function () {
            _("onMessage function not defined");
          },
          onMouseEnter: function () {},
          onMouseLeave: function () {},
          onResized: function () {},
          onScroll: function () {
            return !0;
          },
        },
        h = {};
      window.jQuery &&
        ((t = window.jQuery).fn
          ? t.fn.iFrameResize ||
            (t.fn.iFrameResize = function (e) {
              return this.filter("iframe")
                .each(function (t, n) {
                  W(n, e);
                })
                .end();
            })
          : x("", "Unable to bind to jQuery, it is not fully loaded.")),
        "function" == typeof define && define.amd
          ? define([], H)
          : "object" == typeof Co && (Co = H()),
        (window.iFrameResize = window.iFrameResize || H());
    }
    function m() {
      return (
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver
      );
    }
    function g(e, t, n) {
      e.addEventListener(t, n, !1);
    }
    function v(e, t, n) {
      e.removeEventListener(t, n, !1);
    }
    function y(e) {
      return (
        s +
        "[" +
        (function (e) {
          var t = "Host page: " + e;
          return (
            window.top !== window.self &&
              (t =
                window.parentIFrame && window.parentIFrame.getId
                  ? window.parentIFrame.getId() + ": " + e
                  : "Nested host page: " + e),
            t
          );
        })(e) +
        "]"
      );
    }
    function b(e) {
      return f[e] ? f[e].log : i;
    }
    function w(e, t) {
      O("log", e, t, b(e));
    }
    function x(e, t) {
      O("info", e, t, b(e));
    }
    function _(e, t) {
      O("warn", e, t, !0);
    }
    function O(e, t, n, i) {
      !0 === i && "object" == typeof window.console && console[e](y(t), n);
    }
    function E(e) {
      function t() {
        r("Height"),
          r("Width"),
          P(
            function () {
              L(H), C(F), b("onResized", H);
            },
            H,
            "init"
          );
      }
      function n(e) {
        return "border-box" !== e.boxSizing
          ? 0
          : (e.paddingTop ? parseInt(e.paddingTop, 10) : 0) +
              (e.paddingBottom ? parseInt(e.paddingBottom, 10) : 0);
      }
      function i(e) {
        return "border-box" !== e.boxSizing
          ? 0
          : (e.borderTopWidth ? parseInt(e.borderTopWidth, 10) : 0) +
              (e.borderBottomWidth ? parseInt(e.borderBottomWidth, 10) : 0);
      }
      function r(e) {
        var t = Number(f[F]["max" + e]),
          n = Number(f[F]["min" + e]),
          i = e.toLowerCase(),
          r = Number(H[i]);
        w(F, "Checking " + i + " is in range " + n + "-" + t),
          r < n && ((r = n), w(F, "Set " + i + " to min value")),
          r > t && ((r = t), w(F, "Set " + i + " to max value")),
          (H[i] = "" + r);
      }
      function u(e) {
        return N.substr(N.indexOf(":") + o + e);
      }
      function l(e, t) {
        var n, i, r;
        (n = function () {
          var n, i;
          D(
            "Send Page Info",
            "pageInfo:" +
              ((n = document.body.getBoundingClientRect()),
              (i = H.iframe.getBoundingClientRect()),
              JSON.stringify({
                iframeHeight: i.height,
                iframeWidth: i.width,
                clientHeight: Math.max(
                  document.documentElement.clientHeight,
                  window.innerHeight || 0
                ),
                clientWidth: Math.max(
                  document.documentElement.clientWidth,
                  window.innerWidth || 0
                ),
                offsetTop: parseInt(i.top - n.top, 10),
                offsetLeft: parseInt(i.left - n.left, 10),
                scrollTop: window.pageYOffset,
                scrollLeft: window.pageXOffset,
                documentHeight: document.documentElement.clientHeight,
                documentWidth: document.documentElement.clientWidth,
                windowHeight: window.innerHeight,
                windowWidth: window.innerWidth,
              })),
            e,
            t
          );
        }),
          (i = 32),
          h[(r = t)] ||
            (h[r] = setTimeout(function () {
              (h[r] = null), n();
            }, i));
      }
      function d(e) {
        var t = e.getBoundingClientRect();
        return (
          T(F),
          {
            x: Math.floor(Number(t.left) + Number(c.x)),
            y: Math.floor(Number(t.top) + Number(c.y)),
          }
        );
      }
      function p(e) {
        var t = e ? d(H.iframe) : { x: 0, y: 0 },
          n = { x: Number(H.width) + t.x, y: Number(H.height) + t.y };
        w(
          F,
          "Reposition requested from iFrame (offset x:" +
            t.x +
            " y:" +
            t.y +
            ")"
        ),
          window.top !== window.self
            ? window.parentIFrame
              ? window.parentIFrame["scrollTo" + (e ? "Offset" : "")](n.x, n.y)
              : _(
                  F,
                  "Unable to scroll to requested position, window.parentIFrame not found"
                )
            : ((c = n), m(), w(F, "--"));
      }
      function m() {
        !1 !== b("onScroll", c) ? C(F) : M();
      }
      function y(e) {
        var t = {};
        if (0 === Number(H.width) && 0 === Number(H.height)) {
          var n = u(9).split(":");
          t = { x: n[1], y: n[0] };
        } else t = { x: H.width, y: H.height };
        b(e, {
          iframe: H.iframe,
          screenX: Number(t.x),
          screenY: Number(t.y),
          type: H.type,
        });
      }
      function b(e, t) {
        return k(F, e, t);
      }
      var O,
        E,
        S,
        W,
        z,
        $,
        I,
        N = e.data,
        H = {},
        F = null;
      "[iFrameResizerChild]Ready" === N
        ? (function () {
            for (var e in f) D("iFrame requested init", R(e), f[e].iframe, e);
          })()
        : s === ("" + N).substr(0, a) && N.substr(a).split(":")[0] in f
        ? ((W = N.substr(a).split(":")),
          (z = W[1] ? parseInt(W[1], 10) : 0),
          ($ = f[W[0]] && f[W[0]].iframe),
          (I = getComputedStyle($)),
          (H = {
            iframe: $,
            id: W[0],
            height: z + n(I) + i(I),
            width: W[2],
            type: W[3],
          }),
          (F = H.id),
          f[F] && (f[F].loaded = !0),
          (S = H.type in { true: 1, false: 1, undefined: 1 }) &&
            w(F, "Ignoring init message from meta parent page"),
          !S &&
            ((E = !0),
            f[(O = F)] ||
              ((E = !1),
              _(H.type + " No settings for " + O + ". Message was: " + N)),
            E) &&
            (w(F, "Received: " + N),
            (function () {
              var e = !0;
              return (
                null === H.iframe &&
                  (_(F, "IFrame (" + H.id + ") not found"), (e = !1)),
                e
              );
            })() &&
              (function () {
                var t,
                  n = e.origin,
                  i = f[F] && f[F].checkOrigin;
                if (
                  i &&
                  "" + n != "null" &&
                  !(i.constructor === Array
                    ? (function () {
                        var e = 0,
                          t = !1;
                        for (
                          w(
                            F,
                            "Checking connection is from allowed list of origins: " +
                              i
                          );
                          e < i.length;
                          e++
                        )
                          if (i[e] === n) {
                            t = !0;
                            break;
                          }
                        return t;
                      })()
                    : ((t = f[F] && f[F].remoteHost),
                      w(F, "Checking connection is from: " + t),
                      n === t))
                )
                  throw new Error(
                    "Unexpected message received from: " +
                      n +
                      " for " +
                      H.iframe.id +
                      ". Message was: " +
                      e.data +
                      ". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains."
                  );
                return !0;
              })() &&
              (function () {
                switch (
                  (f[F] && f[F].firstRun && f[F] && (f[F].firstRun = !1),
                  H.type)
                ) {
                  case "close":
                    A(H.iframe);
                    break;
                  case "message":
                    (e = u(6)),
                      w(
                        F,
                        "onMessage passed: {iframe: " +
                          H.iframe.id +
                          ", message: " +
                          e +
                          "}"
                      ),
                      b("onMessage", {
                        iframe: H.iframe,
                        message: JSON.parse(e),
                      }),
                      w(F, "--");
                    break;
                  case "mouseenter":
                    y("onMouseEnter");
                    break;
                  case "mouseleave":
                    y("onMouseLeave");
                    break;
                  case "autoResize":
                    f[F].autoResize = JSON.parse(u(9));
                    break;
                  case "scrollTo":
                    p(!1);
                    break;
                  case "scrollToOffset":
                    p(!0);
                    break;
                  case "pageInfo":
                    l(f[F] && f[F].iframe, F),
                      (function () {
                        function e(e, i) {
                          function r() {
                            f[n] ? l(f[n].iframe, n) : t();
                          }
                          ["scroll", "resize"].forEach(function (t) {
                            w(n, e + t + " listener for sendPageInfo"),
                              i(window, t, r);
                          });
                        }
                        function t() {
                          e("Remove ", v);
                        }
                        var n = F;
                        e("Add ", g), f[n] && (f[n].stopPageInfo = t);
                      })();
                    break;
                  case "pageInfoStop":
                    f[F] &&
                      f[F].stopPageInfo &&
                      (f[F].stopPageInfo(), delete f[F].stopPageInfo);
                    break;
                  case "inPageLink":
                    !(function (e) {
                      var t,
                        n = e.split("#")[1] || "",
                        i = decodeURIComponent(n),
                        r =
                          document.getElementById(i) ||
                          document.getElementsByName(i)[0];
                      r
                        ? ((t = d(r)),
                          w(
                            F,
                            "Moving to in page link (#" +
                              n +
                              ") at x: " +
                              t.x +
                              " y: " +
                              t.y
                          ),
                          (c = { x: t.x, y: t.y }),
                          m(),
                          w(F, "--"))
                        : window.top !== window.self
                        ? window.parentIFrame
                          ? window.parentIFrame.moveToAnchor(n)
                          : w(
                              F,
                              "In page link #" +
                                n +
                                " not found and window.parentIFrame not found"
                            )
                        : w(F, "In page link #" + n + " not found");
                    })(u(9));
                    break;
                  case "reset":
                    j(H);
                    break;
                  case "init":
                    t(), b("onInit", H.iframe);
                    break;
                  default:
                    0 === Number(H.width) && 0 === Number(H.height)
                      ? _(
                          "Unsupported message received (" +
                            H.type +
                            "), this is likely due to the iframe containing a later version of iframe-resizer than the parent page"
                        )
                      : t();
                }
                var e;
              })()))
        : x(F, "Ignored: " + N);
    }
    function k(e, t, n) {
      var i = null,
        r = null;
      if (f[e]) {
        if ("function" != typeof (i = f[e][t]))
          throw new TypeError(t + " on iFrame[" + e + "] is not a function");
        r = i(n);
      }
      return r;
    }
    function S(e) {
      var t = e.id;
      delete f[t];
    }
    function A(e) {
      var t = e.id;
      if (!1 !== k(t, "onClose", t)) {
        w(t, "Removing iFrame: " + t);
        try {
          e.parentNode && e.parentNode.removeChild(e);
        } catch (e) {
          _(e);
        }
        k(t, "onClosed", t), w(t, "--"), S(e);
      } else w(t, "Close iframe cancelled by onClose event");
    }
    function T(t) {
      null === c &&
        w(
          t,
          "Get page position: " +
            (c = {
              x:
                window.pageXOffset !== e
                  ? window.pageXOffset
                  : document.documentElement.scrollLeft,
              y:
                window.pageYOffset !== e
                  ? window.pageYOffset
                  : document.documentElement.scrollTop,
            }).x +
            "," +
            c.y
        );
    }
    function C(e) {
      null !== c &&
        (window.scrollTo(c.x, c.y),
        w(e, "Set page position: " + c.x + "," + c.y),
        M());
    }
    function M() {
      c = null;
    }
    function j(e) {
      w(
        e.id,
        "Size reset requested by " +
          ("init" === e.type ? "host page" : "iFrame")
      ),
        T(e.id),
        P(
          function () {
            L(e), D("reset", "reset", e.iframe, e.id);
          },
          e,
          "reset"
        );
    }
    function L(e) {
      function t(t) {
        r ||
          "0" !== e[t] ||
          ((r = !0),
          w(i, "Hidden iFrame detected, creating visibility listener"),
          (function () {
            function e() {
              function e(e) {
                function t(t) {
                  return "0px" === (f[e] && f[e].iframe.style[t]);
                }
                function n(e) {
                  return null !== e.offsetParent;
                }
                f[e] &&
                  n(f[e].iframe) &&
                  (t("height") || t("width")) &&
                  D("Visibility change", "resize", f[e].iframe, e);
              }
              Object.keys(f).forEach(function (t) {
                e(t);
              });
            }
            function t(t) {
              w(
                "window",
                "Mutation observed: " + t[0].target + " " + t[0].type
              ),
                z(e, 16);
            }
            function n() {
              var e = document.querySelector("body"),
                n = {
                  attributes: !0,
                  attributeOldValue: !1,
                  characterData: !0,
                  characterDataOldValue: !1,
                  childList: !0,
                  subtree: !0,
                };
              new i(t).observe(e, n);
            }
            var i = m();
            i && n();
          })());
      }
      function n(n) {
        !(function (t) {
          e.id
            ? ((e.iframe.style[t] = e[t] + "px"),
              w(e.id, "IFrame (" + i + ") " + t + " set to " + e[t] + "px"))
            : w("undefined", "messageData id not set");
        })(n),
          t(n);
      }
      var i = e.iframe.id;
      f[i] && (f[i].sizeHeight && n("height"), f[i].sizeWidth && n("width"));
    }
    function P(e, t, n) {
      n !== t.type && u && !window.jasmine
        ? (w(t.id, "Requesting animation frame"), u(e))
        : e();
    }
    function D(e, t, n, i, r) {
      var o = !1;
      (i = i || n.id),
        f[i] &&
          (n && "contentWindow" in n && null !== n.contentWindow
            ? (function () {
                var r = f[i] && f[i].targetOrigin;
                w(
                  i,
                  "[" +
                    e +
                    "] Sending msg to iframe[" +
                    i +
                    "] (" +
                    t +
                    ") targetOrigin: " +
                    r
                ),
                  n.contentWindow.postMessage(s + t, r);
              })()
            : _(i, "[" + e + "] IFrame(" + i + ") not found"),
          r &&
            f[i] &&
            f[i].warningTimeout &&
            (f[i].msgTimeout = setTimeout(function () {
              !f[i] ||
                f[i].loaded ||
                o ||
                ((o = !0),
                _(
                  i,
                  "IFrame has not responded within " +
                    f[i].warningTimeout / 1e3 +
                    " seconds. Check iFrameResizer.contentWindow.js has been loaded in iFrame. This message can be ignored if everything is working, or you can set the warningTimeout option to a higher value or zero to suppress this warning."
                ));
            }, f[i].warningTimeout)));
    }
    function R(e) {
      return (
        e +
        ":" +
        f[e].bodyMarginV1 +
        ":" +
        f[e].sizeWidth +
        ":" +
        f[e].log +
        ":" +
        f[e].interval +
        ":" +
        f[e].enablePublicMethods +
        ":" +
        f[e].autoResize +
        ":" +
        f[e].bodyMargin +
        ":" +
        f[e].heightCalculationMethod +
        ":" +
        f[e].bodyBackground +
        ":" +
        f[e].bodyPadding +
        ":" +
        f[e].tolerance +
        ":" +
        f[e].inPageLinks +
        ":" +
        f[e].resizeFrom +
        ":" +
        f[e].widthCalculationMethod +
        ":" +
        f[e].mouseEvents
      );
    }
    function W(t, r) {
      function o(e) {
        var t = e.split("Callback");
        if (2 === t.length) {
          var n = "on" + t[0].charAt(0).toUpperCase() + t[0].slice(1);
          (this[n] = this[e]),
            delete this[e],
            _(
              v,
              "Deprecated: '" +
                e +
                "' has been renamed '" +
                n +
                "'. The old method will be removed in the next major version."
            );
        }
      }
      var s,
        a,
        c,
        u,
        d,
        h,
        v =
          ("" === (s = t.id) &&
            ((t.id =
              ((a = (r && r.id) || p.id + n++),
              null !== document.getElementById(a) && (a += n++),
              (s = a))),
            (i = (r || {}).log),
            w(s, "Added missing iframe ID: " + s + " (" + t.src + ")")),
          s);
      v in f && "iFrameResizer" in t
        ? _(v, "Ignored iFrame, already setup.")
        : ((d = (d = r) || {}),
          (f[v] = {
            firstRun: !0,
            iframe: t,
            remoteHost: t.src && t.src.split("/").slice(0, 3).join("/"),
          }),
          (function (e) {
            if ("object" != typeof e)
              throw new TypeError("Options is not an object");
          })(d),
          Object.keys(d).forEach(o, d),
          (function (e) {
            for (var t in p)
              Object.prototype.hasOwnProperty.call(p, t) &&
                (f[v][t] = Object.prototype.hasOwnProperty.call(e, t)
                  ? e[t]
                  : p[t]);
          })(d),
          f[v] &&
            (f[v].targetOrigin =
              !0 === f[v].checkOrigin
                ? "" === (h = f[v].remoteHost) ||
                  null !== h.match(/^(about:blank|javascript:|file:\/\/)/)
                  ? "*"
                  : h
                : "*"),
          (function () {
            switch (
              (w(
                v,
                "IFrame scrolling " +
                  (f[v] && f[v].scrolling ? "enabled" : "disabled") +
                  " for " +
                  v
              ),
              (t.style.overflow =
                !1 === (f[v] && f[v].scrolling) ? "hidden" : "auto"),
              f[v] && f[v].scrolling)
            ) {
              case "omit":
                break;
              case !0:
                t.scrolling = "yes";
                break;
              case !1:
                t.scrolling = "no";
                break;
              default:
                t.scrolling = f[v] ? f[v].scrolling : "no";
            }
          })(),
          (function () {
            function e(e) {
              var n = f[v][e];
              1 / 0 !== n &&
                0 !== n &&
                ((t.style[e] = "number" == typeof n ? n + "px" : n),
                w(v, "Set " + e + " = " + t.style[e]));
            }
            function n(e) {
              if (f[v]["min" + e] > f[v]["max" + e])
                throw new Error(
                  "Value for min" + e + " can not be greater than max" + e
                );
            }
            n("Height"),
              n("Width"),
              e("maxHeight"),
              e("minHeight"),
              e("maxWidth"),
              e("minWidth");
          })(),
          ("number" != typeof (f[v] && f[v].bodyMargin) &&
            "0" !== (f[v] && f[v].bodyMargin)) ||
            ((f[v].bodyMarginV1 = f[v].bodyMargin),
            (f[v].bodyMargin = f[v].bodyMargin + "px")),
          (c = R(v)),
          (u = m()) &&
            (function (e) {
              t.parentNode &&
                new e(function (e) {
                  e.forEach(function (e) {
                    Array.prototype.slice
                      .call(e.removedNodes)
                      .forEach(function (e) {
                        e === t && A(t);
                      });
                  });
                }).observe(t.parentNode, { childList: !0 });
            })(u),
          g(t, "load", function () {
            var n, i;
            D("iFrame.onload", c, t, e, !0),
              (n = f[v] && f[v].firstRun),
              (i = f[v] && f[v].heightCalculationMethod in l),
              !n && i && j({ iframe: t, height: 0, width: 0, type: "init" });
          }),
          D("init", c, t, e, !0),
          f[v] &&
            (f[v].iframe.iFrameResizer = {
              close: A.bind(null, f[v].iframe),
              removeListeners: S.bind(null, f[v].iframe),
              resize: D.bind(null, "Window resize", "resize", f[v].iframe),
              moveToAnchor: function (e) {
                D("Move to anchor", "moveToAnchor:" + e, f[v].iframe, v);
              },
              sendMessage: function (e) {
                D(
                  "Send Message",
                  "message:" + (e = JSON.stringify(e)),
                  f[v].iframe,
                  v
                );
              },
            }));
    }
    function z(e, t) {
      null === d &&
        (d = setTimeout(function () {
          (d = null), e();
        }, t));
    }
    function $() {
      "hidden" !== document.visibilityState &&
        (w("document", "Trigger event: Visiblity change"),
        z(function () {
          I("Tab Visable", "resize");
        }, 16));
    }
    function I(e, t) {
      Object.keys(f).forEach(function (n) {
        (function (e) {
          return (
            f[e] &&
            "parent" === f[e].resizeFrom &&
            f[e].autoResize &&
            !f[e].firstRun
          );
        })(n) && D(e, t, f[n].iframe, n);
      });
    }
    function N() {
      g(window, "message", E),
        g(window, "resize", function () {
          var e;
          w("window", "Trigger event: " + (e = "resize")),
            z(function () {
              I("Window " + e, "resize");
            }, 16);
        }),
        g(document, "visibilitychange", $),
        g(document, "-webkit-visibilitychange", $);
    }
    function H() {
      function t(e, t) {
        t &&
          (!(function () {
            if (!t.tagName)
              throw new TypeError("Object is not a valid DOM element");
            if ("IFRAME" !== t.tagName.toUpperCase())
              throw new TypeError(
                "Expected <IFRAME> tag, found <" + t.tagName + ">"
              );
          })(),
          W(t, e),
          n.push(t));
      }
      var n;
      return (
        (function () {
          var e,
            t = ["moz", "webkit", "o", "ms"];
          for (e = 0; e < t.length && !u; e += 1)
            u = window[t[e] + "RequestAnimationFrame"];
          u
            ? (u = u.bind(window))
            : w("setup", "RequestAnimationFrame not supported");
        })(),
        N(),
        function (i, r) {
          switch (
            ((n = []),
            (function (e) {
              e &&
                e.enablePublicMethods &&
                _(
                  "enablePublicMethods option has been removed, public methods are now always available in the iFrame"
                );
            })(i),
            typeof r)
          ) {
            case "undefined":
            case "string":
              Array.prototype.forEach.call(
                document.querySelectorAll(r || "iframe"),
                t.bind(e, i)
              );
              break;
            case "object":
              t(i, r);
              break;
            default:
              throw new TypeError("Unexpected data type (" + typeof r + ")");
          }
          return n;
        }
      );
    }
  })();
  var Mo = {
    desktopWidth: 768,
    sidebar: { defaultWidth: 280, minWidth: 200, maxWidth: 350 },
    inspector: {
      drawer: {
        orientation: "horizontal",
        defaultPanel: "source",
        defaultHeight: 300,
        defaultWidth: 500,
        minWidth: 350,
        minHeight: 200,
      },
      preview: { defaultPanel: "preview" },
    },
  };
  Rn.plugin(Wn),
    Rn.plugin(Bn),
    Rn.plugin(ni),
    Rn.store(
      "filter",
      (function (e) {
        return {
          raw: e.$persist("").as("filter-text"),
          get text() {
            return this.raw.replace(/\s/g, "").toLowerCase();
          },
          get active() {
            return this.text.length > 0;
          },
        };
      })(Rn)
    ),
    Rn.store("layout", {
      init() {
        this.desktop = window.innerWidth >= Mo.desktopWidth;
      },
      reflowing: !1,
      desktop: !0,
      desktopWidth: Mo.desktopWidth,
      get mobile() {
        return !this.desktop;
      },
    }),
    Rn.store(
      "nav",
      (function (e) {
        return {
          open: e.$persist([]).as("nav-open"),
          active: e.$persist(null).as("nav-active"),
          isOpen(e) {
            return this.open.includes(e);
          },
          setOpen(e) {
            this.open.push(e);
          },
          setClosed(e) {
            const t = this.open.indexOf(e);
            t > -1 && this.open.splice(t, 1);
          },
          toggle(e) {
            this.isOpen(e) ? this.setClosed(e) : this.setOpen(e);
          },
        };
      })(Rn)
    ),
    Rn.store(
      "sidebar",
      (function (e) {
        const { defaultWidth: t, minWidth: n, maxWidth: i } = Mo.sidebar;
        return {
          openDesktop: e.$persist(!0).as("sidebar-open-desktop"),
          openMobile: e.$persist(!1).as("sidebar-open-mobile"),
          width: e.$persist(t).as("sidebar-width"),
          panelSplits: e.$persist([1, 1]).as("sidebar-panel-splits"),
          minWidth: n,
          maxWidth: i,
          get open() {
            return e.store("sidebar")[
              e.store("layout").desktop ? "openDesktop" : "openMobile"
            ];
          },
          toggle() {
            const t = e.store("sidebar");
            e.store("layout").desktop
              ? (t.openDesktop = !t.openDesktop)
              : (t.openMobile = !t.openMobile);
          },
        };
      })(Rn)
    ),
    Rn.store(
      "inspector",
      (function (e) {
        const { drawer: t, preview: n } = Mo.inspector;
        return {
          drawer: {
            hidden: e.$persist(!1).as("drawer-hidden"),
            orientation: e.$persist(t.orientation).as("drawer-orientation"),
            panel: e.$persist(t.defaultPanel).as("drawer-panel"),
            height: e.$persist(t.defaultHeight).as("drawer-height"),
            width: e.$persist(t.defaultWidth).as("drawer-width"),
            minWidth: t.minWidth,
            minHeight: t.minHeight,
            visibleTabCount: 1 / 0,
          },
          preview: {
            width: e.$persist("100%").as("preview-width"),
            height: e.$persist("100%").as("preview-height"),
            panel: e.$persist(n.defaultPanel).as("preview-panel"),
            lastWidth: null,
            lastHeight: null,
            resizing: !1,
          },
        };
      })(Rn)
    ),
    Rn.store("pages", { embeds: {} }),
    Rn.data("app", function () {
      return {
        init() {
          if (window.SOCKET_PATH) {
            si(window.SOCKET_PATH).addListener("Lookbook::ReloadChannel", () =>
              this.refresh()
            );
          }
        },
        async update() {
          const e = await fetch(window.document.location);
          if (!e.ok) return window.location.reload();
          const t = await e.text(),
            n = new DOMParser().parseFromString(t, "text/html");
          this.morph(n), (document.title = n.title);
        },
        setLocation(e) {
          let t;
          e instanceof Event
            ? ((t = e.currentTarget.href), e.preventDefault())
            : (t = e),
            history.pushState({}, null, t),
            this.$dispatch("popstate");
        },
        refresh() {
          this.$dispatch("refresh");
        },
        morph(e) {
          const t = e.getElementById(this.$root.id).outerHTML;
          Alpine.morph(this.$root, t, ai), this.$dispatch("page:morphed");
        },
      };
    }),
    Rn.data("page", function () {
      return {
        init() {},
        scrollToTop() {
          this.$refs.scroller.scrollTop = 0;
        },
        checkForNavigation(e) {
          const t = e.target.closest("a[href]");
          t &&
            !(function (e) {
              const t = document.createElement("a");
              return (t.href = e), t.host !== window.location.host;
            })(t.href) &&
            "_blank" !== t.getAttribute("target") &&
            (e.preventDefault(), this.setLocation(t.href));
        },
      };
    }),
    Rn.data("sidebar", function () {
      return {
        init() {
          this.$nextTick(() => this.setActiveNavItem());
        },
        setActiveNavItem() {
          const e = this.$el.querySelector(
            `[data-path="${window.location.pathname}"]`
          );
          this.$store.nav.active = e ? e.id : "";
        },
        setSplits(e) {
          e.length &&
            (this.$store.sidebar.panelSplits = [e[0] || 1, e[2] || 1]);
        },
      };
    }),
    Rn.data("splitter", function (e, t = {}) {
      return {
        splits: [],
        init() {
          const n = ("vertical" === e ? "column" : "row") + "Gutters",
            i = this.$el;
          var r;
          (r = {
            [n]: [{ track: 1, element: i }],
            minSize: t.minSize || 0,
            writeStyle() {},
            onDrag: (e, t, n) => {
              this.splits = n.split(" ").map((e) => parseFloat(e, 10));
            },
            onDragStart: () => {
              this.$store.layout.reflowing = !0;
            },
            onDragEnd: () => {
              this.$store.layout.reflowing = !1;
            },
          }),
            new wi(r);
        },
      };
    }),
    Rn.data("previewWindow", function () {
      return {
        get store() {
          return this.$store.inspector.preview;
        },
        get maxWidth() {
          return "100%" === this.store.width ? "100%" : `${this.store.width}px`;
        },
        get maxHeight() {
          return "100%" === this.store.height
            ? "100%"
            : `${this.store.height}px`;
        },
        get parentWidth() {
          return Math.round(this.$root.parentElement.clientWidth);
        },
        get parentHeight() {
          return Math.round(this.$root.parentElement.clientHeight);
        },
        start() {
          (this.$store.layout.reflowing = !0), (this.store.resizing = !0);
        },
        end() {
          (this.$store.layout.reflowing = !1), (this.store.resizing = !1);
        },
        onResizeStart(e) {
          this.onResizeWidthStart(e), this.onResizeHeightStart(e);
        },
        toggleFullSize() {
          const { height: e, width: t } = this.store;
          "100%" === e && "100%" === t
            ? (this.toggleFullHeight(), this.toggleFullWidth())
            : ("100%" !== e && this.toggleFullHeight(),
              "100%" !== t && this.toggleFullWidth());
        },
        onResizeWidth(e) {
          const t =
              this.resizeStartWidth - 2 * (this.resizeStartPositionX - e.pageX),
            n = Math.min(Math.max(Math.round(t), 200), this.parentWidth);
          this.store.width = n === this.parentWidth ? "100%" : n;
        },
        onResizeWidthStart(e) {
          this.start(),
            (this.onResizeWidth = this.onResizeWidth.bind(this)),
            (this.onResizeWidthEnd = this.onResizeWidthEnd.bind(this)),
            (this.resizeStartPositionX = e.pageX),
            (this.resizeStartWidth = this.$root.clientWidth),
            window.addEventListener("pointermove", this.onResizeWidth),
            window.addEventListener("pointerup", this.onResizeWidthEnd);
        },
        onResizeWidthEnd() {
          window.removeEventListener("pointermove", this.onResizeWidth),
            window.removeEventListener("pointerup", this.onResizeWidthEnd),
            this.end();
        },
        toggleFullWidth() {
          const { width: e, lastWidth: t } = this.store;
          "100%" === e && t
            ? (this.store.width = t)
            : ((this.store.lastWidth = e), (this.store.width = "100%"));
        },
        onResizeHeight(e) {
          const t =
              this.resizeStartHeight - (this.resizeStartPositionY - e.pageY),
            n = Math.min(Math.max(Math.round(t), 200), this.parentHeight);
          this.$store.inspector.preview.height =
            n === this.parentHeight ? "100%" : n;
        },
        onResizeHeightStart(e) {
          this.start(),
            (this.onResizeHeight = this.onResizeHeight.bind(this)),
            (this.onResizeHeightEnd = this.onResizeHeightEnd.bind(this)),
            (this.resizeStartPositionY = e.pageY),
            (this.resizeStartHeight = this.$root.clientHeight),
            window.addEventListener("pointermove", this.onResizeHeight),
            window.addEventListener("pointerup", this.onResizeHeightEnd);
        },
        onResizeHeightEnd() {
          window.removeEventListener("pointermove", this.onResizeHeight),
            window.removeEventListener("pointerup", this.onResizeHeightEnd),
            this.end();
        },
        toggleFullHeight() {
          const { height: e, lastHeight: t } = this.store;
          "100%" === e && t
            ? (this.store.height = t)
            : ((this.store.lastHeight = e), (this.store.height = "100%"));
        },
      };
    }),
    Rn.data("copy", function () {
      return {
        get content() {
          const e = document.getElementById(
              this.$root.getAttribute("data-target")
            ),
            t = document.createElement("textarea");
          return (t.innerHTML = e ? e.innerHTML : ""), t.value.trim();
        },
        done: !1,
        async save() {
          await window.navigator.clipboard.writeText(this.content),
            (this.done = !0),
            setTimeout(() => {
              this.done = !1;
            }, 1e3);
        },
      };
    }),
    Rn.data("code", function () {
      return { wrap: !1 };
    }),
    Rn.data("inspector", function () {
      return {
        width: 0,
        height: 0,
        init() {
          new ResizeObserver((e) => {
            const t = e[0].contentRect;
            (this.width = Math.round(t.width)),
              (this.height = Math.round(t.height));
          }).observe(this.$el),
            (this.width = Math.round(this.$el.clientWidth)),
            (this.height = Math.round(this.$el.clientHeight));
        },
        get orientation() {
          return this.$store.inspector.drawer.orientation;
        },
        get view() {
          return this.$store.inspector.preview.view;
        },
        get horizontal() {
          return !this.canBeVertical || "horizontal" === this.orientation;
        },
        get vertical() {
          return !this.horizontal;
        },
        get canBeVertical() {
          return this.width > 800;
        },
        get drawerHidden() {
          return this.$store.inspector.drawer.hidden;
        },
        get maxDrawerHeight() {
          return Math.round(0.7 * this.height);
        },
        get maxDrawerWidth() {
          return Math.round(0.7 * this.width);
        },
        isActiveDrawerPanel(e) {
          return this.$store.inspector.drawer.panel === e;
        },
        switchDrawerPanel(e) {
          this.$store.inspector.drawer.panel = e;
        },
        isActivePreviewPanel(e) {
          return this.$store.inspector.preview.panel === e;
        },
        switchPreviewPanel(e) {
          this.$store.inspector.preview.panel = e;
        },
        toggleOrientation() {
          this.$store.inspector.drawer.orientation =
            "horizontal" === this.orientation ? "vertical" : "horizontal";
        },
        toggleDrawer() {
          this.$store.inspector.drawer.hidden = !this.$store.inspector.drawer
            .hidden;
        },
        preview: { width: null, height: null },
      };
    }),
    Rn.data("filter", function () {
      return {
        get active() {
          return this.$store.filter.active;
        },
        focussed: !1,
        checkEsc(e) {
          "Escape" === e.key && (this.active ? this.clear() : this.blur());
        },
        clear() {
          this.$store.filter.raw = "";
        },
        focus(e) {
          (e && "INPUT" === e.target.tagName) ||
            setTimeout(() => {
              this.$dispatch("filter:focus"),
                this.$nextTick(() => {
                  (this.focussed = !0), this.$refs.input.focus();
                });
            }, 0);
        },
        blur() {
          setTimeout(() => {
            (this.focussed = !1),
              this.$refs.input.blur(),
              this.$dispatch("filter:blur");
          }, 0);
        },
      };
    }),
    Rn.data("param", function (t, n, i = {}) {
      return {
        name: t,
        value: n,
        updating: !1,
        init() {
          i.debounce
            ? this.$watch(
                "value",
                e(ri)(() => this.updateIfValid(), i.debounce)
              )
            : this.$watch("value", () => this.updateIfValid());
        },
        setFocus() {
          setTimeout(() => this.$root.focus(), 0);
        },
        updateIfValid() {
          this.validate() && this.update();
        },
        update() {
          const e = new URLSearchParams(window.location.search);
          e.set(this.name, this.value);
          const t = location.href.replace(location.search, "");
          this.setLocation(`${t}?${e.toString()}`);
        },
        validate() {
          return !this.$root.reportValidity || this.$root.reportValidity();
        },
      };
    }),
    Rn.data("sizes", function () {
      return {
        width: 0,
        height: 0,
        init() {
          new ResizeObserver((e) => {
            const t = e[0].contentRect;
            (this.width = Math.round(t.width)),
              (this.height = Math.round(t.height));
          }).observe(this.$el),
            (this.width = Math.round(this.$el.clientWidth)),
            (this.height = Math.round(this.$el.clientHeight));
        },
      };
    }),
    Rn.data("nav", function (e = !0) {
      return {
        empty: !1,
        init() {
          e &&
            (this.$watch("$store.filter.text", () => this.filter()),
            this.$nextTick(() => {
              this.filter();
            }));
        },
        filter() {
          (this.empty = !0),
            this.getChildren().forEach((e) => {
              const t = Alpine.$data(e);
              t.filter(this.$store.filter.text), t.hidden || (this.empty = !1);
            });
        },
        getChildren() {
          return this.$refs.items
            ? Array.from(this.$refs.items.querySelectorAll(":scope > li > div"))
            : [];
        },
      };
    }),
    Rn.data("tabs", function () {
      return {
        width: 0,
        tabsWidth: 0,
        init() {
          new ResizeObserver((e) => {
            this.width = Math.round(e[0].contentRect.width);
          }).observe(this.$refs.tabs),
            (this.dropdown = To(this.$refs.toggle, {
              allowHTML: !0,
              interactive: !0,
              trigger: "click",
              placement: "bottom-end",
              theme: "menu",
              content: this.$refs.dropdown,
            }));
        },
        get tabs() {
          return Array.from(
            this.$refs.tabs
              ? this.$refs.tabs.querySelectorAll(":scope > a")
              : []
          );
        },
        get visibleTabCount() {
          let e = 0;
          for (let t = 0; t < this.tabs.length; t++) {
            const n = this.tabs[t],
              i = parseInt(
                window
                  .getComputedStyle(n)
                  .getPropertyValue("margin-left")
                  .replace("px", ""),
                10
              );
            if (((e += n.clientWidth + i), e > this.width))
              return (this.tabsWidth = e - n.clientWidth), t;
          }
          return this.tabs.length;
        },
        get hiddenTabs() {
          return this.tabs.slice(this.visibleTabCount, -1);
        },
        hideDropdown() {
          this.dropdown.hide();
        },
      };
    }),
    Rn.data("navItem", function (e) {
      return {
        hidden: !1,
        get id() {
          return this.$root.id;
        },
        get path() {
          return this.$root.getAttribute("data-path");
        },
        get active() {
          return this.$store.nav.active === this.id;
        },
        navigate() {
          this.setLocation(this.path),
            this.$store.layout.mobile && (this.$store.sidebar.open = !1);
        },
        filter(t) {
          if (((this.hidden = !1), t.length)) {
            const n = e.map((e) => e.includes(t));
            this.hidden = !n.filter((e) => e).length;
          } else this.hidden = !1;
        },
      };
    }),
    Rn.data("navGroup", function () {
      return {
        hidden: !1,
        children: [],
        get id() {
          return this.$root.id;
        },
        get open() {
          return this.$store.nav.isOpen(this.id);
        },
        toggle() {
          this.$store.nav.toggle(this.id);
        },
        getChildren() {
          return this.$refs.items
            ? Array.from(this.$refs.items.querySelectorAll(":scope > li > div"))
            : [];
        },
        navigateToFirstChild() {
          if (this.open) {
            const e = this.firstVisibleChild();
            if (e) {
              const t = e.querySelector(":scope > a.nav-link");
              t && this.setLocation(t.getAttribute("href"));
            }
          }
        },
        filter(e) {
          (this.hidden = !0),
            this.getChildren().forEach((t) => {
              const n = Alpine.$data(t);
              n.filter(e), n.hidden || (this.hidden = !1);
            });
        },
        firstVisibleChild() {
          return this.getChildren().find((e) => !1 === Alpine.$data(e).hidden);
        },
      };
    }),
    Rn.data("embed", function () {
      return {
        init() {
          this.$store.pages.embeds[this.$root.id] ||
            (this.$store.pages.embeds[this.$root.id] = { width: "100%" });
        },
        lastWidth: null,
        reflowing: !1,
        get resizer() {
          return this.$refs.iframe
            ? (this.$refs.iframe.iFrameResizer ||
                window.iFrameResize(
                  {
                    heightCalculationMethod: "lowestElement",
                    onResized: this.onIframeResized.bind(this),
                  },
                  this.$refs.iframe
                ),
              this.$refs.iframe.iFrameResizer)
            : null;
        },
        set width(e) {
          this.store.width = e;
        },
        get width() {
          return this.store.width || "100%";
        },
        get height() {
          return this.store.height;
        },
        get parentWidth() {
          return Math.round(this.$root.parentElement.clientWidth);
        },
        get maxWidth() {
          return "100%" === this.width ? "100%" : `${this.width}px`;
        },
        get store() {
          return this.$store.pages.embeds[this.$root.id];
        },
        recaclulateIframeHeight() {
          this.resizer && this.resizer.resize();
        },
        onIframeResized({ iframe: e, height: t }) {
          e.isSameNode(this.$refs.iframe) && (this.store.height = t);
        },
        onResizeWidth(e) {
          const t =
              this.resizeStartWidth - (this.resizeStartPositionX - e.pageX),
            n = Math.min(Math.max(Math.round(t), 200), this.parentWidth);
          (this.width = n === this.parentWidth ? "100%" : n),
            this.recaclulateIframeHeight();
        },
        onResizeWidthStart(e) {
          (this.reflowing = !0),
            (this.onResizeWidth = this.onResizeWidth.bind(this)),
            (this.onResizeWidthEnd = this.onResizeWidthEnd.bind(this)),
            (this.resizeStartPositionX = e.pageX),
            (this.resizeStartWidth = this.$refs.resizer.clientWidth),
            window.addEventListener("pointermove", this.onResizeWidth),
            window.addEventListener("pointerup", this.onResizeWidthEnd);
        },
        onResizeWidthEnd() {
          window.removeEventListener("pointermove", this.onResizeWidth),
            window.removeEventListener("pointerup", this.onResizeWidthEnd),
            (this.reflowing = !1);
        },
        toggleFullWidth() {
          "100%" === this.width && this.lastWidth
            ? (this.width = this.lastWidth)
            : ((this.lastWidth = this.width), (this.width = "100%")),
            this.$nextTick(() => this.recaclulateIframeHeight());
        },
      };
    });
  for (const e of document.querySelectorAll("[data-hotkey]")) d(e);
  (window.Alpine = Rn), Rn.start();
})();
//# sourceMappingURL=app.js.map
