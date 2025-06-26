(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) i(a);
  new MutationObserver((a) => {
    for (const l of a)
      if (l.type === "childList")
        for (const s of l.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && i(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(a) {
    const l = {};
    return (
      a.integrity && (l.integrity = a.integrity),
      a.referrerpolicy && (l.referrerPolicy = a.referrerpolicy),
      a.crossorigin === "use-credentials"
        ? (l.credentials = "include")
        : a.crossorigin === "anonymous"
          ? (l.credentials = "omit")
          : (l.credentials = "same-origin"),
      l
    );
  }
  function i(a) {
    if (a.ep) return;
    a.ep = !0;
    const l = n(a);
    fetch(a.href, l);
  }
})();
function bv(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var w = { exports: {} },
  H = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Vc = Symbol.for("react.transitional.element"),
  Sv = Symbol.for("react.portal"),
  xv = Symbol.for("react.fragment"),
  Tv = Symbol.for("react.strict_mode"),
  Av = Symbol.for("react.profiler"),
  Ev = Symbol.for("react.consumer"),
  Mv = Symbol.for("react.context"),
  Dv = Symbol.for("react.forward_ref"),
  wv = Symbol.for("react.suspense"),
  Cv = Symbol.for("react.memo"),
  wp = Symbol.for("react.lazy"),
  pd = Symbol.iterator;
function Rv(t) {
  return t === null || typeof t != "object"
    ? null
    : ((t = (pd && t[pd]) || t["@@iterator"]), typeof t == "function" ? t : null);
}
var Cp = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Rp = Object.assign,
  Op = {};
function da(t, e, n) {
  ((this.props = t), (this.context = e), (this.refs = Op), (this.updater = n || Cp));
}
da.prototype.isReactComponent = {};
da.prototype.setState = function (t, e) {
  if (typeof t != "object" && typeof t != "function" && t != null)
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, t, e, "setState");
};
da.prototype.forceUpdate = function (t) {
  this.updater.enqueueForceUpdate(this, t, "forceUpdate");
};
function zp() {}
zp.prototype = da.prototype;
function _c(t, e, n) {
  ((this.props = t), (this.context = e), (this.refs = Op), (this.updater = n || Cp));
}
var Bc = (_c.prototype = new zp());
Bc.constructor = _c;
Rp(Bc, da.prototype);
Bc.isPureReactComponent = !0;
var gd = Array.isArray,
  st = { H: null, A: null, T: null, S: null },
  Vp = Object.prototype.hasOwnProperty;
function Uc(t, e, n, i, a, l) {
  return ((n = l.ref), { $$typeof: Vc, type: t, key: e, ref: n !== void 0 ? n : null, props: l });
}
function Ov(t, e) {
  return Uc(t.type, e, void 0, void 0, void 0, t.props);
}
function Nc(t) {
  return typeof t == "object" && t !== null && t.$$typeof === Vc;
}
function zv(t) {
  var e = { "=": "=0", ":": "=2" };
  return (
    "$" +
    t.replace(/[=:]/g, function (n) {
      return e[n];
    })
  );
}
var yd = /\/+/g;
function ao(t, e) {
  return typeof t == "object" && t !== null && t.key != null ? zv("" + t.key) : e.toString(36);
}
function vd() {}
function Vv(t) {
  switch (t.status) {
    case "fulfilled":
      return t.value;
    case "rejected":
      throw t.reason;
    default:
      switch (
        (typeof t.status == "string"
          ? t.then(vd, vd)
          : ((t.status = "pending"),
            t.then(
              function (e) {
                t.status === "pending" && ((t.status = "fulfilled"), (t.value = e));
              },
              function (e) {
                t.status === "pending" && ((t.status = "rejected"), (t.reason = e));
              },
            )),
        t.status)
      ) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw t.reason;
      }
  }
  throw t;
}
function Si(t, e, n, i, a) {
  var l = typeof t;
  (l === "undefined" || l === "boolean") && (t = null);
  var s = !1;
  if (t === null) s = !0;
  else
    switch (l) {
      case "bigint":
      case "string":
      case "number":
        s = !0;
        break;
      case "object":
        switch (t.$$typeof) {
          case Vc:
          case Sv:
            s = !0;
            break;
          case wp:
            return ((s = t._init), Si(s(t._payload), e, n, i, a));
        }
    }
  if (s)
    return (
      (a = a(t)),
      (s = i === "" ? "." + ao(t, 0) : i),
      gd(a)
        ? ((n = ""),
          s != null && (n = s.replace(yd, "$&/") + "/"),
          Si(a, e, n, "", function (u) {
            return u;
          }))
        : a != null &&
          (Nc(a) &&
            (a = Ov(
              a,
              n +
                (a.key == null || (t && t.key === a.key)
                  ? ""
                  : ("" + a.key).replace(yd, "$&/") + "/") +
                s,
            )),
          e.push(a)),
      1
    );
  s = 0;
  var r = i === "" ? "." : i + ":";
  if (gd(t))
    for (var o = 0; o < t.length; o++) ((i = t[o]), (l = r + ao(i, o)), (s += Si(i, e, n, l, a)));
  else if (((o = Rv(t)), typeof o == "function"))
    for (t = o.call(t), o = 0; !(i = t.next()).done; )
      ((i = i.value), (l = r + ao(i, o++)), (s += Si(i, e, n, l, a)));
  else if (l === "object") {
    if (typeof t.then == "function") return Si(Vv(t), e, n, i, a);
    throw (
      (e = String(t)),
      Error(
        "Objects are not valid as a React child (found: " +
          (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) +
          "). If you meant to render a collection of children, use an array instead.",
      )
    );
  }
  return s;
}
function Il(t, e, n) {
  if (t == null) return t;
  var i = [],
    a = 0;
  return (
    Si(t, i, "", "", function (l) {
      return e.call(n, l, a++);
    }),
    i
  );
}
function _v(t) {
  if (t._status === -1) {
    var e = t._result;
    ((e = e()),
      e.then(
        function (n) {
          (t._status === 0 || t._status === -1) && ((t._status = 1), (t._result = n));
        },
        function (n) {
          (t._status === 0 || t._status === -1) && ((t._status = 2), (t._result = n));
        },
      ),
      t._status === -1 && ((t._status = 0), (t._result = e)));
  }
  if (t._status === 1) return t._result.default;
  throw t._result;
}
var bd =
  typeof reportError == "function"
    ? reportError
    : function (t) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var e = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message:
              typeof t == "object" && t !== null && typeof t.message == "string"
                ? String(t.message)
                : String(t),
            error: t,
          });
          if (!window.dispatchEvent(e)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", t);
          return;
        }
        console.error(t);
      };
function Bv() {}
H.Children = {
  map: Il,
  forEach: function (t, e, n) {
    Il(
      t,
      function () {
        e.apply(this, arguments);
      },
      n,
    );
  },
  count: function (t) {
    var e = 0;
    return (
      Il(t, function () {
        e++;
      }),
      e
    );
  },
  toArray: function (t) {
    return (
      Il(t, function (e) {
        return e;
      }) || []
    );
  },
  only: function (t) {
    if (!Nc(t))
      throw Error("React.Children.only expected to receive a single React element child.");
    return t;
  },
};
H.Component = da;
H.Fragment = xv;
H.Profiler = Av;
H.PureComponent = _c;
H.StrictMode = Tv;
H.Suspense = wv;
H.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = st;
H.act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};
H.cache = function (t) {
  return function () {
    return t.apply(null, arguments);
  };
};
H.cloneElement = function (t, e, n) {
  if (t == null) throw Error("The argument must be a React element, but you passed " + t + ".");
  var i = Rp({}, t.props),
    a = t.key,
    l = void 0;
  if (e != null)
    for (s in (e.ref !== void 0 && (l = void 0), e.key !== void 0 && (a = "" + e.key), e))
      !Vp.call(e, s) ||
        s === "key" ||
        s === "__self" ||
        s === "__source" ||
        (s === "ref" && e.ref === void 0) ||
        (i[s] = e[s]);
  var s = arguments.length - 2;
  if (s === 1) i.children = n;
  else if (1 < s) {
    for (var r = Array(s), o = 0; o < s; o++) r[o] = arguments[o + 2];
    i.children = r;
  }
  return Uc(t.type, a, void 0, void 0, l, i);
};
H.createContext = function (t) {
  return (
    (t = {
      $$typeof: Mv,
      _currentValue: t,
      _currentValue2: t,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
    }),
    (t.Provider = t),
    (t.Consumer = { $$typeof: Ev, _context: t }),
    t
  );
};
H.createElement = function (t, e, n) {
  var i,
    a = {},
    l = null;
  if (e != null)
    for (i in (e.key !== void 0 && (l = "" + e.key), e))
      Vp.call(e, i) && i !== "key" && i !== "__self" && i !== "__source" && (a[i] = e[i]);
  var s = arguments.length - 2;
  if (s === 1) a.children = n;
  else if (1 < s) {
    for (var r = Array(s), o = 0; o < s; o++) r[o] = arguments[o + 2];
    a.children = r;
  }
  if (t && t.defaultProps) for (i in ((s = t.defaultProps), s)) a[i] === void 0 && (a[i] = s[i]);
  return Uc(t, l, void 0, void 0, null, a);
};
H.createRef = function () {
  return { current: null };
};
H.forwardRef = function (t) {
  return { $$typeof: Dv, render: t };
};
H.isValidElement = Nc;
H.lazy = function (t) {
  return { $$typeof: wp, _payload: { _status: -1, _result: t }, _init: _v };
};
H.memo = function (t, e) {
  return { $$typeof: Cv, type: t, compare: e === void 0 ? null : e };
};
H.startTransition = function (t) {
  var e = st.T,
    n = {};
  st.T = n;
  try {
    var i = t(),
      a = st.S;
    (a !== null && a(n, i),
      typeof i == "object" && i !== null && typeof i.then == "function" && i.then(Bv, bd));
  } catch (l) {
    bd(l);
  } finally {
    st.T = e;
  }
};
H.unstable_useCacheRefresh = function () {
  return st.H.useCacheRefresh();
};
H.use = function (t) {
  return st.H.use(t);
};
H.useActionState = function (t, e, n) {
  return st.H.useActionState(t, e, n);
};
H.useCallback = function (t, e) {
  return st.H.useCallback(t, e);
};
H.useContext = function (t) {
  return st.H.useContext(t);
};
H.useDebugValue = function () {};
H.useDeferredValue = function (t, e) {
  return st.H.useDeferredValue(t, e);
};
H.useEffect = function (t, e) {
  return st.H.useEffect(t, e);
};
H.useId = function () {
  return st.H.useId();
};
H.useImperativeHandle = function (t, e, n) {
  return st.H.useImperativeHandle(t, e, n);
};
H.useInsertionEffect = function (t, e) {
  return st.H.useInsertionEffect(t, e);
};
H.useLayoutEffect = function (t, e) {
  return st.H.useLayoutEffect(t, e);
};
H.useMemo = function (t, e) {
  return st.H.useMemo(t, e);
};
H.useOptimistic = function (t, e) {
  return st.H.useOptimistic(t, e);
};
H.useReducer = function (t, e, n) {
  return st.H.useReducer(t, e, n);
};
H.useRef = function (t) {
  return st.H.useRef(t);
};
H.useState = function (t) {
  return st.H.useState(t);
};
H.useSyncExternalStore = function (t, e, n) {
  return st.H.useSyncExternalStore(t, e, n);
};
H.useTransition = function () {
  return st.H.useTransition();
};
H.version = "19.0.0";
(function (t) {
  t.exports = H;
})(w);
const Dn = bv(w.exports);
var _p = { exports: {} },
  Cr = {},
  Bp = { exports: {} },
  Up = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (t) {
  function e(C, R) {
    var V = C.length;
    C.push(R);
    t: for (; 0 < V; ) {
      var G = (V - 1) >>> 1,
        P = C[G];
      if (0 < a(P, R)) ((C[G] = R), (C[V] = P), (V = G));
      else break t;
    }
  }
  function n(C) {
    return C.length === 0 ? null : C[0];
  }
  function i(C) {
    if (C.length === 0) return null;
    var R = C[0],
      V = C.pop();
    if (V !== R) {
      C[0] = V;
      t: for (var G = 0, P = C.length, Se = P >>> 1; G < Se; ) {
        var kt = 2 * (G + 1) - 1,
          gi = C[kt],
          he = kt + 1,
          _e = C[he];
        if (0 > a(gi, V))
          he < P && 0 > a(_e, gi)
            ? ((C[G] = _e), (C[he] = V), (G = he))
            : ((C[G] = gi), (C[kt] = V), (G = kt));
        else if (he < P && 0 > a(_e, V)) ((C[G] = _e), (C[he] = V), (G = he));
        else break t;
      }
    }
    return R;
  }
  function a(C, R) {
    var V = C.sortIndex - R.sortIndex;
    return V !== 0 ? V : C.id - R.id;
  }
  if (
    ((t.unstable_now = void 0),
    typeof performance == "object" && typeof performance.now == "function")
  ) {
    var l = performance;
    t.unstable_now = function () {
      return l.now();
    };
  } else {
    var s = Date,
      r = s.now();
    t.unstable_now = function () {
      return s.now() - r;
    };
  }
  var o = [],
    u = [],
    c = 1,
    d = null,
    f = 3,
    h = !1,
    y = !1,
    b = !1,
    E = typeof setTimeout == "function" ? setTimeout : null,
    m = typeof clearTimeout == "function" ? clearTimeout : null,
    p = typeof setImmediate < "u" ? setImmediate : null;
  function g(C) {
    for (var R = n(u); R !== null; ) {
      if (R.callback === null) i(u);
      else if (R.startTime <= C) (i(u), (R.sortIndex = R.expirationTime), e(o, R));
      else break;
      R = n(u);
    }
  }
  function v(C) {
    if (((b = !1), g(C), !y))
      if (n(o) !== null) ((y = !0), nn());
      else {
        var R = n(u);
        R !== null && pi(v, R.startTime - C);
      }
  }
  var S = !1,
    T = -1,
    x = 5,
    M = -1;
  function B() {
    return !(t.unstable_now() - M < x);
  }
  function z() {
    if (S) {
      var C = t.unstable_now();
      M = C;
      var R = !0;
      try {
        t: {
          ((y = !1), b && ((b = !1), m(T), (T = -1)), (h = !0));
          var V = f;
          try {
            e: {
              for (g(C), d = n(o); d !== null && !(d.expirationTime > C && B()); ) {
                var G = d.callback;
                if (typeof G == "function") {
                  ((d.callback = null), (f = d.priorityLevel));
                  var P = G(d.expirationTime <= C);
                  if (((C = t.unstable_now()), typeof P == "function")) {
                    ((d.callback = P), g(C), (R = !0));
                    break e;
                  }
                  (d === n(o) && i(o), g(C));
                } else i(o);
                d = n(o);
              }
              if (d !== null) R = !0;
              else {
                var Se = n(u);
                (Se !== null && pi(v, Se.startTime - C), (R = !1));
              }
            }
            break t;
          } finally {
            ((d = null), (f = V), (h = !1));
          }
          R = void 0;
        }
      } finally {
        R ? it() : (S = !1);
      }
    }
  }
  var it;
  if (typeof p == "function")
    it = function () {
      p(z);
    };
  else if (typeof MessageChannel < "u") {
    var Ve = new MessageChannel(),
      Aa = Ve.port2;
    ((Ve.port1.onmessage = z),
      (it = function () {
        Aa.postMessage(null);
      }));
  } else
    it = function () {
      E(z, 0);
    };
  function nn() {
    S || ((S = !0), it());
  }
  function pi(C, R) {
    T = E(function () {
      C(t.unstable_now());
    }, R);
  }
  ((t.unstable_IdlePriority = 5),
    (t.unstable_ImmediatePriority = 1),
    (t.unstable_LowPriority = 4),
    (t.unstable_NormalPriority = 3),
    (t.unstable_Profiling = null),
    (t.unstable_UserBlockingPriority = 2),
    (t.unstable_cancelCallback = function (C) {
      C.callback = null;
    }),
    (t.unstable_continueExecution = function () {
      y || h || ((y = !0), nn());
    }),
    (t.unstable_forceFrameRate = function (C) {
      0 > C || 125 < C
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (x = 0 < C ? Math.floor(1e3 / C) : 5);
    }),
    (t.unstable_getCurrentPriorityLevel = function () {
      return f;
    }),
    (t.unstable_getFirstCallbackNode = function () {
      return n(o);
    }),
    (t.unstable_next = function (C) {
      switch (f) {
        case 1:
        case 2:
        case 3:
          var R = 3;
          break;
        default:
          R = f;
      }
      var V = f;
      f = R;
      try {
        return C();
      } finally {
        f = V;
      }
    }),
    (t.unstable_pauseExecution = function () {}),
    (t.unstable_requestPaint = function () {}),
    (t.unstable_runWithPriority = function (C, R) {
      switch (C) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          C = 3;
      }
      var V = f;
      f = C;
      try {
        return R();
      } finally {
        f = V;
      }
    }),
    (t.unstable_scheduleCallback = function (C, R, V) {
      var G = t.unstable_now();
      switch (
        (typeof V == "object" && V !== null
          ? ((V = V.delay), (V = typeof V == "number" && 0 < V ? G + V : G))
          : (V = G),
        C)
      ) {
        case 1:
          var P = -1;
          break;
        case 2:
          P = 250;
          break;
        case 5:
          P = 1073741823;
          break;
        case 4:
          P = 1e4;
          break;
        default:
          P = 5e3;
      }
      return (
        (P = V + P),
        (C = {
          id: c++,
          callback: R,
          priorityLevel: C,
          startTime: V,
          expirationTime: P,
          sortIndex: -1,
        }),
        V > G
          ? ((C.sortIndex = V),
            e(u, C),
            n(o) === null && C === n(u) && (b ? (m(T), (T = -1)) : (b = !0), pi(v, V - G)))
          : ((C.sortIndex = P), e(o, C), y || h || ((y = !0), nn())),
        C
      );
    }),
    (t.unstable_shouldYield = B),
    (t.unstable_wrapCallback = function (C) {
      var R = f;
      return function () {
        var V = f;
        f = R;
        try {
          return C.apply(this, arguments);
        } finally {
          f = V;
        }
      };
    }));
})(Up);
(function (t) {
  t.exports = Up;
})(Bp);
var Np = { exports: {} },
  Ht = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Uv = w.exports;
function jp(t) {
  var e = "https://react.dev/errors/" + t;
  if (1 < arguments.length) {
    e += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var n = 2; n < arguments.length; n++) e += "&args[]=" + encodeURIComponent(arguments[n]);
  }
  return (
    "Minified React error #" +
    t +
    "; visit " +
    e +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function ln() {}
var Ut = {
    d: {
      f: ln,
      r: function () {
        throw Error(jp(522));
      },
      D: ln,
      C: ln,
      L: ln,
      m: ln,
      X: ln,
      S: ln,
      M: ln,
    },
    p: 0,
    findDOMNode: null,
  },
  Nv = Symbol.for("react.portal");
function jv(t, e, n) {
  var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Nv,
    key: i == null ? null : "" + i,
    children: t,
    containerInfo: e,
    implementation: n,
  };
}
var Xa = Uv.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function Rr(t, e) {
  if (t === "font") return "";
  if (typeof e == "string") return e === "use-credentials" ? e : "";
}
Ht.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Ut;
Ht.createPortal = function (t, e) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)) throw Error(jp(299));
  return jv(t, e, null, n);
};
Ht.flushSync = function (t) {
  var e = Xa.T,
    n = Ut.p;
  try {
    if (((Xa.T = null), (Ut.p = 2), t)) return t();
  } finally {
    ((Xa.T = e), (Ut.p = n), Ut.d.f());
  }
};
Ht.preconnect = function (t, e) {
  typeof t == "string" &&
    (e
      ? ((e = e.crossOrigin),
        (e = typeof e == "string" ? (e === "use-credentials" ? e : "") : void 0))
      : (e = null),
    Ut.d.C(t, e));
};
Ht.prefetchDNS = function (t) {
  typeof t == "string" && Ut.d.D(t);
};
Ht.preinit = function (t, e) {
  if (typeof t == "string" && e && typeof e.as == "string") {
    var n = e.as,
      i = Rr(n, e.crossOrigin),
      a = typeof e.integrity == "string" ? e.integrity : void 0,
      l = typeof e.fetchPriority == "string" ? e.fetchPriority : void 0;
    n === "style"
      ? Ut.d.S(t, typeof e.precedence == "string" ? e.precedence : void 0, {
          crossOrigin: i,
          integrity: a,
          fetchPriority: l,
        })
      : n === "script" &&
        Ut.d.X(t, {
          crossOrigin: i,
          integrity: a,
          fetchPriority: l,
          nonce: typeof e.nonce == "string" ? e.nonce : void 0,
        });
  }
};
Ht.preinitModule = function (t, e) {
  if (typeof t == "string")
    if (typeof e == "object" && e !== null) {
      if (e.as == null || e.as === "script") {
        var n = Rr(e.as, e.crossOrigin);
        Ut.d.M(t, {
          crossOrigin: n,
          integrity: typeof e.integrity == "string" ? e.integrity : void 0,
          nonce: typeof e.nonce == "string" ? e.nonce : void 0,
        });
      }
    } else e == null && Ut.d.M(t);
};
Ht.preload = function (t, e) {
  if (typeof t == "string" && typeof e == "object" && e !== null && typeof e.as == "string") {
    var n = e.as,
      i = Rr(n, e.crossOrigin);
    Ut.d.L(t, n, {
      crossOrigin: i,
      integrity: typeof e.integrity == "string" ? e.integrity : void 0,
      nonce: typeof e.nonce == "string" ? e.nonce : void 0,
      type: typeof e.type == "string" ? e.type : void 0,
      fetchPriority: typeof e.fetchPriority == "string" ? e.fetchPriority : void 0,
      referrerPolicy: typeof e.referrerPolicy == "string" ? e.referrerPolicy : void 0,
      imageSrcSet: typeof e.imageSrcSet == "string" ? e.imageSrcSet : void 0,
      imageSizes: typeof e.imageSizes == "string" ? e.imageSizes : void 0,
      media: typeof e.media == "string" ? e.media : void 0,
    });
  }
};
Ht.preloadModule = function (t, e) {
  if (typeof t == "string")
    if (e) {
      var n = Rr(e.as, e.crossOrigin);
      Ut.d.m(t, {
        as: typeof e.as == "string" && e.as !== "script" ? e.as : void 0,
        crossOrigin: n,
        integrity: typeof e.integrity == "string" ? e.integrity : void 0,
      });
    } else Ut.d.m(t);
};
Ht.requestFormReset = function (t) {
  Ut.d.r(t);
};
Ht.unstable_batchedUpdates = function (t, e) {
  return t(e);
};
Ht.useFormState = function (t, e, n) {
  return Xa.H.useFormState(t, e, n);
};
Ht.useFormStatus = function () {
  return Xa.H.useHostTransitionStatus();
};
Ht.version = "19.0.0";
(function (t) {
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (n) {
        console.error(n);
      }
  }
  (e(), (t.exports = Ht));
})(Np);
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var bt = Bp.exports,
  Hp = w.exports,
  Hv = Np.exports;
function A(t) {
  var e = "https://react.dev/errors/" + t;
  if (1 < arguments.length) {
    e += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var n = 2; n < arguments.length; n++) e += "&args[]=" + encodeURIComponent(arguments[n]);
  }
  return (
    "Minified React error #" +
    t +
    "; visit " +
    e +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function Lp(t) {
  return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
}
var Lv = Symbol.for("react.element"),
  ts = Symbol.for("react.transitional.element"),
  Na = Symbol.for("react.portal"),
  Ei = Symbol.for("react.fragment"),
  Yp = Symbol.for("react.strict_mode"),
  du = Symbol.for("react.profiler"),
  Yv = Symbol.for("react.provider"),
  Gp = Symbol.for("react.consumer"),
  qe = Symbol.for("react.context"),
  jc = Symbol.for("react.forward_ref"),
  hu = Symbol.for("react.suspense"),
  mu = Symbol.for("react.suspense_list"),
  Hc = Symbol.for("react.memo"),
  cn = Symbol.for("react.lazy"),
  qp = Symbol.for("react.offscreen"),
  Gv = Symbol.for("react.memo_cache_sentinel"),
  Sd = Symbol.iterator;
function Da(t) {
  return t === null || typeof t != "object"
    ? null
    : ((t = (Sd && t[Sd]) || t["@@iterator"]), typeof t == "function" ? t : null);
}
var qv = Symbol.for("react.client.reference");
function pu(t) {
  if (t == null) return null;
  if (typeof t == "function") return t.$$typeof === qv ? null : t.displayName || t.name || null;
  if (typeof t == "string") return t;
  switch (t) {
    case Ei:
      return "Fragment";
    case Na:
      return "Portal";
    case du:
      return "Profiler";
    case Yp:
      return "StrictMode";
    case hu:
      return "Suspense";
    case mu:
      return "SuspenseList";
  }
  if (typeof t == "object")
    switch (t.$$typeof) {
      case qe:
        return (t.displayName || "Context") + ".Provider";
      case Gp:
        return (t._context.displayName || "Context") + ".Consumer";
      case jc:
        var e = t.render;
        return (
          (t = t.displayName),
          t ||
            ((t = e.displayName || e.name || ""),
            (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
          t
        );
      case Hc:
        return ((e = t.displayName || null), e !== null ? e : pu(t.type) || "Memo");
      case cn:
        ((e = t._payload), (t = t._init));
        try {
          return pu(t(e));
        } catch {}
    }
  return null;
}
var N = Hp.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  et = Object.assign,
  lo,
  xd;
function ja(t) {
  if (lo === void 0)
    try {
      throw Error();
    } catch (n) {
      var e = n.stack.trim().match(/\n( *(at )?)/);
      ((lo = (e && e[1]) || ""),
        (xd =
          -1 <
          n.stack.indexOf(`
    at`)
            ? " (<anonymous>)"
            : -1 < n.stack.indexOf("@")
              ? "@unknown:0:0"
              : ""));
    }
  return (
    `
` +
    lo +
    t +
    xd
  );
}
var so = !1;
function ro(t, e) {
  if (!t || so) return "";
  so = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var i = {
      DetermineComponentFrameRoot: function () {
        try {
          if (e) {
            var d = function () {
              throw Error();
            };
            if (
              (Object.defineProperty(d.prototype, "props", {
                set: function () {
                  throw Error();
                },
              }),
              typeof Reflect == "object" && Reflect.construct)
            ) {
              try {
                Reflect.construct(d, []);
              } catch (h) {
                var f = h;
              }
              Reflect.construct(t, [], d);
            } else {
              try {
                d.call();
              } catch (h) {
                f = h;
              }
              t.call(d.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (h) {
              f = h;
            }
            (d = t()) && typeof d.catch == "function" && d.catch(function () {});
          }
        } catch (h) {
          if (h && f && typeof h.stack == "string") return [h.stack, f.stack];
        }
        return [null, null];
      },
    };
    i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var a = Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot, "name");
    a &&
      a.configurable &&
      Object.defineProperty(i.DetermineComponentFrameRoot, "name", {
        value: "DetermineComponentFrameRoot",
      });
    var l = i.DetermineComponentFrameRoot(),
      s = l[0],
      r = l[1];
    if (s && r) {
      var o = s.split(`
`),
        u = r.split(`
`);
      for (a = i = 0; i < o.length && !o[i].includes("DetermineComponentFrameRoot"); ) i++;
      for (; a < u.length && !u[a].includes("DetermineComponentFrameRoot"); ) a++;
      if (i === o.length || a === u.length)
        for (i = o.length - 1, a = u.length - 1; 1 <= i && 0 <= a && o[i] !== u[a]; ) a--;
      for (; 1 <= i && 0 <= a; i--, a--)
        if (o[i] !== u[a]) {
          if (i !== 1 || a !== 1)
            do
              if ((i--, a--, 0 > a || o[i] !== u[a])) {
                var c =
                  `
` + o[i].replace(" at new ", " at ");
                return (
                  t.displayName &&
                    c.includes("<anonymous>") &&
                    (c = c.replace("<anonymous>", t.displayName)),
                  c
                );
              }
            while (1 <= i && 0 <= a);
          break;
        }
    }
  } finally {
    ((so = !1), (Error.prepareStackTrace = n));
  }
  return (n = t ? t.displayName || t.name : "") ? ja(n) : "";
}
function kv(t) {
  switch (t.tag) {
    case 26:
    case 27:
    case 5:
      return ja(t.type);
    case 16:
      return ja("Lazy");
    case 13:
      return ja("Suspense");
    case 19:
      return ja("SuspenseList");
    case 0:
    case 15:
      return ((t = ro(t.type, !1)), t);
    case 11:
      return ((t = ro(t.type.render, !1)), t);
    case 1:
      return ((t = ro(t.type, !0)), t);
    default:
      return "";
  }
}
function Td(t) {
  try {
    var e = "";
    do ((e += kv(t)), (t = t.return));
    while (t);
    return e;
  } catch (n) {
    return (
      `
Error generating stack: ` +
      n.message +
      `
` +
      n.stack
    );
  }
}
function ha(t) {
  var e = t,
    n = t;
  if (t.alternate) for (; e.return; ) e = e.return;
  else {
    t = e;
    do ((e = t), (e.flags & 4098) !== 0 && (n = e.return), (t = e.return));
    while (t);
  }
  return e.tag === 3 ? n : null;
}
function kp(t) {
  if (t.tag === 13) {
    var e = t.memoizedState;
    if ((e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)), e !== null))
      return e.dehydrated;
  }
  return null;
}
function Ad(t) {
  if (ha(t) !== t) throw Error(A(188));
}
function Xv(t) {
  var e = t.alternate;
  if (!e) {
    if (((e = ha(t)), e === null)) throw Error(A(188));
    return e !== t ? null : t;
  }
  for (var n = t, i = e; ; ) {
    var a = n.return;
    if (a === null) break;
    var l = a.alternate;
    if (l === null) {
      if (((i = a.return), i !== null)) {
        n = i;
        continue;
      }
      break;
    }
    if (a.child === l.child) {
      for (l = a.child; l; ) {
        if (l === n) return (Ad(a), t);
        if (l === i) return (Ad(a), e);
        l = l.sibling;
      }
      throw Error(A(188));
    }
    if (n.return !== i.return) ((n = a), (i = l));
    else {
      for (var s = !1, r = a.child; r; ) {
        if (r === n) {
          ((s = !0), (n = a), (i = l));
          break;
        }
        if (r === i) {
          ((s = !0), (i = a), (n = l));
          break;
        }
        r = r.sibling;
      }
      if (!s) {
        for (r = l.child; r; ) {
          if (r === n) {
            ((s = !0), (n = l), (i = a));
            break;
          }
          if (r === i) {
            ((s = !0), (i = l), (n = a));
            break;
          }
          r = r.sibling;
        }
        if (!s) throw Error(A(189));
      }
    }
    if (n.alternate !== i) throw Error(A(190));
  }
  if (n.tag !== 3) throw Error(A(188));
  return n.stateNode.current === n ? t : e;
}
function Xp(t) {
  var e = t.tag;
  if (e === 5 || e === 26 || e === 27 || e === 6) return t;
  for (t = t.child; t !== null; ) {
    if (((e = Xp(t)), e !== null)) return e;
    t = t.sibling;
  }
  return null;
}
var Ha = Array.isArray,
  tt = Hv.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  Pn = { pending: !1, data: null, method: null, action: null },
  gu = [],
  Mi = -1;
function Oe(t) {
  return { current: t };
}
function Et(t) {
  0 > Mi || ((t.current = gu[Mi]), (gu[Mi] = null), Mi--);
}
function nt(t, e) {
  (Mi++, (gu[Mi] = t.current), (t.current = e));
}
var Ee = Oe(null),
  fl = Oe(null),
  vn = Oe(null),
  ks = Oe(null);
function Xs(t, e) {
  switch ((nt(vn, e), nt(fl, t), nt(Ee, null), (t = e.nodeType), t)) {
    case 9:
    case 11:
      e = (e = e.documentElement) && (e = e.namespaceURI) ? Eh(e) : 0;
      break;
    default:
      if (((t = t === 8 ? e.parentNode : e), (e = t.tagName), (t = t.namespaceURI)))
        ((t = Eh(t)), (e = ny(t, e)));
      else
        switch (e) {
          case "svg":
            e = 1;
            break;
          case "math":
            e = 2;
            break;
          default:
            e = 0;
        }
  }
  (Et(Ee), nt(Ee, e));
}
function Fi() {
  (Et(Ee), Et(fl), Et(vn));
}
function yu(t) {
  t.memoizedState !== null && nt(ks, t);
  var e = Ee.current,
    n = ny(e, t.type);
  e !== n && (nt(fl, t), nt(Ee, n));
}
function Ks(t) {
  (fl.current === t && (Et(Ee), Et(fl)), ks.current === t && (Et(ks), (Tl._currentValue = Pn)));
}
var vu = Object.prototype.hasOwnProperty,
  Lc = bt.unstable_scheduleCallback,
  oo = bt.unstable_cancelCallback,
  Kv = bt.unstable_shouldYield,
  Zv = bt.unstable_requestPaint,
  Me = bt.unstable_now,
  Qv = bt.unstable_getCurrentPriorityLevel,
  Kp = bt.unstable_ImmediatePriority,
  Zp = bt.unstable_UserBlockingPriority,
  Zs = bt.unstable_NormalPriority,
  Pv = bt.unstable_LowPriority,
  Qp = bt.unstable_IdlePriority,
  Fv = bt.log,
  $v = bt.unstable_setDisableYieldValue,
  Bl = null,
  Qt = null;
function Jv(t) {
  if (Qt && typeof Qt.onCommitFiberRoot == "function")
    try {
      Qt.onCommitFiberRoot(Bl, t, void 0, (t.current.flags & 128) === 128);
    } catch {}
}
function gn(t) {
  if ((typeof Fv == "function" && $v(t), Qt && typeof Qt.setStrictMode == "function"))
    try {
      Qt.setStrictMode(Bl, t);
    } catch {}
}
var Pt = Math.clz32 ? Math.clz32 : tb,
  Wv = Math.log,
  Iv = Math.LN2;
function tb(t) {
  return ((t >>>= 0), t === 0 ? 32 : (31 - ((Wv(t) / Iv) | 0)) | 0);
}
var es = 128,
  ns = 4194304;
function Ln(t) {
  var e = t & 42;
  if (e !== 0) return e;
  switch (t & -t) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
      return 64;
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t & 4194176;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return t & 62914560;
    case 67108864:
      return 67108864;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 0;
    default:
      return t;
  }
}
function Or(t, e) {
  var n = t.pendingLanes;
  if (n === 0) return 0;
  var i = 0,
    a = t.suspendedLanes,
    l = t.pingedLanes,
    s = t.warmLanes;
  t = t.finishedLanes !== 0;
  var r = n & 134217727;
  return (
    r !== 0
      ? ((n = r & ~a),
        n !== 0
          ? (i = Ln(n))
          : ((l &= r), l !== 0 ? (i = Ln(l)) : t || ((s = r & ~s), s !== 0 && (i = Ln(s)))))
      : ((r = n & ~a),
        r !== 0
          ? (i = Ln(r))
          : l !== 0
            ? (i = Ln(l))
            : t || ((s = n & ~s), s !== 0 && (i = Ln(s)))),
    i === 0
      ? 0
      : e !== 0 &&
          e !== i &&
          (e & a) === 0 &&
          ((a = i & -i), (s = e & -e), a >= s || (a === 32 && (s & 4194176) !== 0))
        ? e
        : i
  );
}
function Ul(t, e) {
  return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
}
function eb(t, e) {
  switch (t) {
    case 1:
    case 2:
    case 4:
    case 8:
      return e + 250;
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return -1;
    case 67108864:
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Pp() {
  var t = es;
  return ((es <<= 1), (es & 4194176) === 0 && (es = 128), t);
}
function Fp() {
  var t = ns;
  return ((ns <<= 1), (ns & 62914560) === 0 && (ns = 4194304), t);
}
function uo(t) {
  for (var e = [], n = 0; 31 > n; n++) e.push(t);
  return e;
}
function Nl(t, e) {
  ((t.pendingLanes |= e),
    e !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
}
function nb(t, e, n, i, a, l) {
  var s = t.pendingLanes;
  ((t.pendingLanes = n),
    (t.suspendedLanes = 0),
    (t.pingedLanes = 0),
    (t.warmLanes = 0),
    (t.expiredLanes &= n),
    (t.entangledLanes &= n),
    (t.errorRecoveryDisabledLanes &= n),
    (t.shellSuspendCounter = 0));
  var r = t.entanglements,
    o = t.expirationTimes,
    u = t.hiddenUpdates;
  for (n = s & ~n; 0 < n; ) {
    var c = 31 - Pt(n),
      d = 1 << c;
    ((r[c] = 0), (o[c] = -1));
    var f = u[c];
    if (f !== null)
      for (u[c] = null, c = 0; c < f.length; c++) {
        var h = f[c];
        h !== null && (h.lane &= -536870913);
      }
    n &= ~d;
  }
  (i !== 0 && $p(t, i, 0),
    l !== 0 && a === 0 && t.tag !== 0 && (t.suspendedLanes |= l & ~(s & ~e)));
}
function $p(t, e, n) {
  ((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
  var i = 31 - Pt(e);
  ((t.entangledLanes |= e), (t.entanglements[i] = t.entanglements[i] | 1073741824 | (n & 4194218)));
}
function Jp(t, e) {
  var n = (t.entangledLanes |= e);
  for (t = t.entanglements; n; ) {
    var i = 31 - Pt(n),
      a = 1 << i;
    ((a & e) | (t[i] & e) && (t[i] |= e), (n &= ~a));
  }
}
function Wp(t) {
  return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
}
function Ip() {
  var t = tt.p;
  return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : dy(t.type));
}
function ib(t, e) {
  var n = tt.p;
  try {
    return ((tt.p = t), e());
  } finally {
    tt.p = n;
  }
}
var _n = Math.random().toString(36).slice(2),
  Ot = "__reactFiber$" + _n,
  Gt = "__reactProps$" + _n,
  ma = "__reactContainer$" + _n,
  bu = "__reactEvents$" + _n,
  ab = "__reactListeners$" + _n,
  lb = "__reactHandles$" + _n,
  Ed = "__reactResources$" + _n,
  dl = "__reactMarker$" + _n;
function Yc(t) {
  (delete t[Ot], delete t[Gt], delete t[bu], delete t[ab], delete t[lb]);
}
function kn(t) {
  var e = t[Ot];
  if (e) return e;
  for (var n = t.parentNode; n; ) {
    if ((e = n[ma] || n[Ot])) {
      if (((n = e.alternate), e.child !== null || (n !== null && n.child !== null)))
        for (t = Dh(t); t !== null; ) {
          if ((n = t[Ot])) return n;
          t = Dh(t);
        }
      return e;
    }
    ((t = n), (n = t.parentNode));
  }
  return null;
}
function pa(t) {
  if ((t = t[Ot] || t[ma])) {
    var e = t.tag;
    if (e === 5 || e === 6 || e === 13 || e === 26 || e === 27 || e === 3) return t;
  }
  return null;
}
function La(t) {
  var e = t.tag;
  if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
  throw Error(A(33));
}
function Gi(t) {
  var e = t[Ed];
  return (e || (e = t[Ed] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), e);
}
function Tt(t) {
  t[dl] = !0;
}
var t0 = new Set(),
  e0 = {};
function oi(t, e) {
  ($i(t, e), $i(t + "Capture", e));
}
function $i(t, e) {
  for (e0[t] = e, t = 0; t < e.length; t++) t0.add(e[t]);
}
var $e = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  sb = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
  ),
  Md = {},
  Dd = {};
function rb(t) {
  return vu.call(Dd, t) ? !0 : vu.call(Md, t) ? !1 : sb.test(t) ? (Dd[t] = !0) : ((Md[t] = !0), !1);
}
function As(t, e, n) {
  if (rb(e))
    if (n === null) t.removeAttribute(e);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
          t.removeAttribute(e);
          return;
        case "boolean":
          var i = e.toLowerCase().slice(0, 5);
          if (i !== "data-" && i !== "aria-") {
            t.removeAttribute(e);
            return;
          }
      }
      t.setAttribute(e, "" + n);
    }
}
function is(t, e, n) {
  if (n === null) t.removeAttribute(e);
  else {
    switch (typeof n) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        t.removeAttribute(e);
        return;
    }
    t.setAttribute(e, "" + n);
  }
}
function Be(t, e, n, i) {
  if (i === null) t.removeAttribute(n);
  else {
    switch (typeof i) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        t.removeAttribute(n);
        return;
    }
    t.setAttributeNS(e, n, "" + i);
  }
}
function ie(t) {
  switch (typeof t) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return t;
    case "object":
      return t;
    default:
      return "";
  }
}
function n0(t) {
  var e = t.type;
  return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
}
function ob(t) {
  var e = n0(t) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e),
    i = "" + t[e];
  if (
    !t.hasOwnProperty(e) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var a = n.get,
      l = n.set;
    return (
      Object.defineProperty(t, e, {
        configurable: !0,
        get: function () {
          return a.call(this);
        },
        set: function (s) {
          ((i = "" + s), l.call(this, s));
        },
      }),
      Object.defineProperty(t, e, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return i;
        },
        setValue: function (s) {
          i = "" + s;
        },
        stopTracking: function () {
          ((t._valueTracker = null), delete t[e]);
        },
      }
    );
  }
}
function Qs(t) {
  t._valueTracker || (t._valueTracker = ob(t));
}
function i0(t) {
  if (!t) return !1;
  var e = t._valueTracker;
  if (!e) return !0;
  var n = e.getValue(),
    i = "";
  return (
    t && (i = n0(t) ? (t.checked ? "true" : "false") : t.value),
    (t = i),
    t !== n ? (e.setValue(t), !0) : !1
  );
}
function Ps(t) {
  if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")) return null;
  try {
    return t.activeElement || t.body;
  } catch {
    return t.body;
  }
}
var ub = /[\n"\\]/g;
function se(t) {
  return t.replace(ub, function (e) {
    return "\\" + e.charCodeAt(0).toString(16) + " ";
  });
}
function Su(t, e, n, i, a, l, s, r) {
  ((t.name = ""),
    s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean"
      ? (t.type = s)
      : t.removeAttribute("type"),
    e != null
      ? s === "number"
        ? ((e === 0 && t.value === "") || t.value != e) && (t.value = "" + ie(e))
        : t.value !== "" + ie(e) && (t.value = "" + ie(e))
      : (s !== "submit" && s !== "reset") || t.removeAttribute("value"),
    e != null
      ? xu(t, s, ie(e))
      : n != null
        ? xu(t, s, ie(n))
        : i != null && t.removeAttribute("value"),
    a == null && l != null && (t.defaultChecked = !!l),
    a != null && (t.checked = a && typeof a != "function" && typeof a != "symbol"),
    r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean"
      ? (t.name = "" + ie(r))
      : t.removeAttribute("name"));
}
function a0(t, e, n, i, a, l, s, r) {
  if (
    (l != null &&
      typeof l != "function" &&
      typeof l != "symbol" &&
      typeof l != "boolean" &&
      (t.type = l),
    e != null || n != null)
  ) {
    if (!((l !== "submit" && l !== "reset") || e != null)) return;
    ((n = n != null ? "" + ie(n) : ""),
      (e = e != null ? "" + ie(e) : n),
      r || e === t.value || (t.value = e),
      (t.defaultValue = e));
  }
  ((i = i != null ? i : a),
    (i = typeof i != "function" && typeof i != "symbol" && !!i),
    (t.checked = r ? t.checked : !!i),
    (t.defaultChecked = !!i),
    s != null &&
      typeof s != "function" &&
      typeof s != "symbol" &&
      typeof s != "boolean" &&
      (t.name = s));
}
function xu(t, e, n) {
  (e === "number" && Ps(t.ownerDocument) === t) ||
    t.defaultValue === "" + n ||
    (t.defaultValue = "" + n);
}
function qi(t, e, n, i) {
  if (((t = t.options), e)) {
    e = {};
    for (var a = 0; a < n.length; a++) e["$" + n[a]] = !0;
    for (n = 0; n < t.length; n++)
      ((a = e.hasOwnProperty("$" + t[n].value)),
        t[n].selected !== a && (t[n].selected = a),
        a && i && (t[n].defaultSelected = !0));
  } else {
    for (n = "" + ie(n), e = null, a = 0; a < t.length; a++) {
      if (t[a].value === n) {
        ((t[a].selected = !0), i && (t[a].defaultSelected = !0));
        return;
      }
      e !== null || t[a].disabled || (e = t[a]);
    }
    e !== null && (e.selected = !0);
  }
}
function l0(t, e, n) {
  if (e != null && ((e = "" + ie(e)), e !== t.value && (t.value = e), n == null)) {
    t.defaultValue !== e && (t.defaultValue = e);
    return;
  }
  t.defaultValue = n != null ? "" + ie(n) : "";
}
function s0(t, e, n, i) {
  if (e == null) {
    if (i != null) {
      if (n != null) throw Error(A(92));
      if (Ha(i)) {
        if (1 < i.length) throw Error(A(93));
        i = i[0];
      }
      n = i;
    }
    (n == null && (n = ""), (e = n));
  }
  ((n = ie(e)),
    (t.defaultValue = n),
    (i = t.textContent),
    i === n && i !== "" && i !== null && (t.value = i));
}
function Ji(t, e) {
  if (e) {
    var n = t.firstChild;
    if (n && n === t.lastChild && n.nodeType === 3) {
      n.nodeValue = e;
      return;
    }
  }
  t.textContent = e;
}
var cb = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " ",
  ),
);
function wd(t, e, n) {
  var i = e.indexOf("--") === 0;
  n == null || typeof n == "boolean" || n === ""
    ? i
      ? t.setProperty(e, "")
      : e === "float"
        ? (t.cssFloat = "")
        : (t[e] = "")
    : i
      ? t.setProperty(e, n)
      : typeof n != "number" || n === 0 || cb.has(e)
        ? e === "float"
          ? (t.cssFloat = n)
          : (t[e] = ("" + n).trim())
        : (t[e] = n + "px");
}
function r0(t, e, n) {
  if (e != null && typeof e != "object") throw Error(A(62));
  if (((t = t.style), n != null)) {
    for (var i in n)
      !n.hasOwnProperty(i) ||
        (e != null && e.hasOwnProperty(i)) ||
        (i.indexOf("--") === 0
          ? t.setProperty(i, "")
          : i === "float"
            ? (t.cssFloat = "")
            : (t[i] = ""));
    for (var a in e) ((i = e[a]), e.hasOwnProperty(a) && n[a] !== i && wd(t, a, i));
  } else for (var l in e) e.hasOwnProperty(l) && wd(t, l, e[l]);
}
function Gc(t) {
  if (t.indexOf("-") === -1) return !1;
  switch (t) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var fb = new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"],
  ]),
  db =
    /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function Es(t) {
  return db.test("" + t)
    ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
    : t;
}
var Tu = null;
function qc(t) {
  return (
    (t = t.target || t.srcElement || window),
    t.correspondingUseElement && (t = t.correspondingUseElement),
    t.nodeType === 3 ? t.parentNode : t
  );
}
var Di = null,
  ki = null;
function Cd(t) {
  var e = pa(t);
  if (e && (t = e.stateNode)) {
    var n = t[Gt] || null;
    t: switch (((t = e.stateNode), e.type)) {
      case "input":
        if (
          (Su(
            t,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name,
          ),
          (e = n.name),
          n.type === "radio" && e != null)
        ) {
          for (n = t; n.parentNode; ) n = n.parentNode;
          for (
            n = n.querySelectorAll('input[name="' + se("" + e) + '"][type="radio"]'), e = 0;
            e < n.length;
            e++
          ) {
            var i = n[e];
            if (i !== t && i.form === t.form) {
              var a = i[Gt] || null;
              if (!a) throw Error(A(90));
              Su(
                i,
                a.value,
                a.defaultValue,
                a.defaultValue,
                a.checked,
                a.defaultChecked,
                a.type,
                a.name,
              );
            }
          }
          for (e = 0; e < n.length; e++) ((i = n[e]), i.form === t.form && i0(i));
        }
        break t;
      case "textarea":
        l0(t, n.value, n.defaultValue);
        break t;
      case "select":
        ((e = n.value), e != null && qi(t, !!n.multiple, e, !1));
    }
  }
}
var co = !1;
function o0(t, e, n) {
  if (co) return t(e, n);
  co = !0;
  try {
    var i = t(e);
    return i;
  } finally {
    if (
      ((co = !1),
      (Di !== null || ki !== null) &&
        (Yr(), Di && ((e = Di), (t = ki), (ki = Di = null), Cd(e), t)))
    )
      for (e = 0; e < t.length; e++) Cd(t[e]);
  }
}
function hl(t, e) {
  var n = t.stateNode;
  if (n === null) return null;
  var i = n[Gt] || null;
  if (i === null) return null;
  n = i[e];
  t: switch (e) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((i = !i.disabled) ||
        ((t = t.type),
        (i = !(t === "button" || t === "input" || t === "select" || t === "textarea"))),
        (t = !i));
      break t;
    default:
      t = !1;
  }
  if (t) return null;
  if (n && typeof n != "function") throw Error(A(231, e, typeof n));
  return n;
}
var Au = !1;
if ($e)
  try {
    var wa = {};
    (Object.defineProperty(wa, "passive", {
      get: function () {
        Au = !0;
      },
    }),
      window.addEventListener("test", wa, wa),
      window.removeEventListener("test", wa, wa));
  } catch {
    Au = !1;
  }
var yn = null,
  kc = null,
  Ms = null;
function u0() {
  if (Ms) return Ms;
  var t,
    e = kc,
    n = e.length,
    i,
    a = "value" in yn ? yn.value : yn.textContent,
    l = a.length;
  for (t = 0; t < n && e[t] === a[t]; t++);
  var s = n - t;
  for (i = 1; i <= s && e[n - i] === a[l - i]; i++);
  return (Ms = a.slice(t, 1 < i ? 1 - i : void 0));
}
function Ds(t) {
  var e = t.keyCode;
  return (
    "charCode" in t ? ((t = t.charCode), t === 0 && e === 13 && (t = 13)) : (t = e),
    t === 10 && (t = 13),
    32 <= t || t === 13 ? t : 0
  );
}
function as() {
  return !0;
}
function Rd() {
  return !1;
}
function qt(t) {
  function e(n, i, a, l, s) {
    ((this._reactName = n),
      (this._targetInst = a),
      (this.type = i),
      (this.nativeEvent = l),
      (this.target = s),
      (this.currentTarget = null));
    for (var r in t) t.hasOwnProperty(r) && ((n = t[r]), (this[r] = n ? n(l) : l[r]));
    return (
      (this.isDefaultPrevented = (
        l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1
      )
        ? as
        : Rd),
      (this.isPropagationStopped = Rd),
      this
    );
  }
  return (
    et(e.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = as));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = as));
      },
      persist: function () {},
      isPersistent: as,
    }),
    e
  );
}
var ui = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  zr = qt(ui),
  jl = et({}, ui, { view: 0, detail: 0 }),
  hb = qt(jl),
  fo,
  ho,
  Ca,
  Vr = et({}, jl, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Xc,
    button: 0,
    buttons: 0,
    relatedTarget: function (t) {
      return t.relatedTarget === void 0
        ? t.fromElement === t.srcElement
          ? t.toElement
          : t.fromElement
        : t.relatedTarget;
    },
    movementX: function (t) {
      return "movementX" in t
        ? t.movementX
        : (t !== Ca &&
            (Ca && t.type === "mousemove"
              ? ((fo = t.screenX - Ca.screenX), (ho = t.screenY - Ca.screenY))
              : (ho = fo = 0),
            (Ca = t)),
          fo);
    },
    movementY: function (t) {
      return "movementY" in t ? t.movementY : ho;
    },
  }),
  Od = qt(Vr),
  mb = et({}, Vr, { dataTransfer: 0 }),
  pb = qt(mb),
  gb = et({}, jl, { relatedTarget: 0 }),
  mo = qt(gb),
  yb = et({}, ui, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  vb = qt(yb),
  bb = et({}, ui, {
    clipboardData: function (t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    },
  }),
  Sb = qt(bb),
  xb = et({}, ui, { data: 0 }),
  zd = qt(xb),
  Tb = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Ab = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Eb = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Mb(t) {
  var e = this.nativeEvent;
  return e.getModifierState ? e.getModifierState(t) : (t = Eb[t]) ? !!e[t] : !1;
}
function Xc() {
  return Mb;
}
var Db = et({}, jl, {
    key: function (t) {
      if (t.key) {
        var e = Tb[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress"
        ? ((t = Ds(t)), t === 13 ? "Enter" : String.fromCharCode(t))
        : t.type === "keydown" || t.type === "keyup"
          ? Ab[t.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Xc,
    charCode: function (t) {
      return t.type === "keypress" ? Ds(t) : 0;
    },
    keyCode: function (t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function (t) {
      return t.type === "keypress"
        ? Ds(t)
        : t.type === "keydown" || t.type === "keyup"
          ? t.keyCode
          : 0;
    },
  }),
  wb = qt(Db),
  Cb = et({}, Vr, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Vd = qt(Cb),
  Rb = et({}, jl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Xc,
  }),
  Ob = qt(Rb),
  zb = et({}, ui, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Vb = qt(zb),
  _b = et({}, Vr, {
    deltaX: function (t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function (t) {
      return "deltaY" in t
        ? t.deltaY
        : "wheelDeltaY" in t
          ? -t.wheelDeltaY
          : "wheelDelta" in t
            ? -t.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Bb = qt(_b),
  Ub = et({}, ui, { newState: 0, oldState: 0 }),
  Nb = qt(Ub),
  jb = [9, 13, 27, 32],
  Kc = $e && "CompositionEvent" in window,
  Ka = null;
$e && "documentMode" in document && (Ka = document.documentMode);
var Hb = $e && "TextEvent" in window && !Ka,
  c0 = $e && (!Kc || (Ka && 8 < Ka && 11 >= Ka)),
  _d = String.fromCharCode(32),
  Bd = !1;
function f0(t, e) {
  switch (t) {
    case "keyup":
      return jb.indexOf(e.keyCode) !== -1;
    case "keydown":
      return e.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function d0(t) {
  return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
}
var wi = !1;
function Lb(t, e) {
  switch (t) {
    case "compositionend":
      return d0(e);
    case "keypress":
      return e.which !== 32 ? null : ((Bd = !0), _d);
    case "textInput":
      return ((t = e.data), t === _d && Bd ? null : t);
    default:
      return null;
  }
}
function Yb(t, e) {
  if (wi)
    return t === "compositionend" || (!Kc && f0(t, e))
      ? ((t = u0()), (Ms = kc = yn = null), (wi = !1), t)
      : null;
  switch (t) {
    case "paste":
      return null;
    case "keypress":
      if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
        if (e.char && 1 < e.char.length) return e.char;
        if (e.which) return String.fromCharCode(e.which);
      }
      return null;
    case "compositionend":
      return c0 && e.locale !== "ko" ? null : e.data;
    default:
      return null;
  }
}
var Gb = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Ud(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e === "input" ? !!Gb[t.type] : e === "textarea";
}
function h0(t, e, n, i) {
  (Di ? (ki ? ki.push(i) : (ki = [i])) : (Di = i),
    (e = cr(e, "onChange")),
    0 < e.length &&
      ((n = new zr("onChange", "change", null, n, i)), t.push({ event: n, listeners: e })));
}
var Za = null,
  ml = null;
function qb(t) {
  Ig(t, 0);
}
function _r(t) {
  var e = La(t);
  if (i0(e)) return t;
}
function Nd(t, e) {
  if (t === "change") return e;
}
var m0 = !1;
if ($e) {
  var po;
  if ($e) {
    var go = "oninput" in document;
    if (!go) {
      var jd = document.createElement("div");
      (jd.setAttribute("oninput", "return;"), (go = typeof jd.oninput == "function"));
    }
    po = go;
  } else po = !1;
  m0 = po && (!document.documentMode || 9 < document.documentMode);
}
function Hd() {
  Za && (Za.detachEvent("onpropertychange", p0), (ml = Za = null));
}
function p0(t) {
  if (t.propertyName === "value" && _r(ml)) {
    var e = [];
    (h0(e, ml, t, qc(t)), o0(qb, e));
  }
}
function kb(t, e, n) {
  t === "focusin"
    ? (Hd(), (Za = e), (ml = n), Za.attachEvent("onpropertychange", p0))
    : t === "focusout" && Hd();
}
function Xb(t) {
  if (t === "selectionchange" || t === "keyup" || t === "keydown") return _r(ml);
}
function Kb(t, e) {
  if (t === "click") return _r(e);
}
function Zb(t, e) {
  if (t === "input" || t === "change") return _r(e);
}
function Qb(t, e) {
  return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
}
var Jt = typeof Object.is == "function" ? Object.is : Qb;
function pl(t, e) {
  if (Jt(t, e)) return !0;
  if (typeof t != "object" || t === null || typeof e != "object" || e === null) return !1;
  var n = Object.keys(t),
    i = Object.keys(e);
  if (n.length !== i.length) return !1;
  for (i = 0; i < n.length; i++) {
    var a = n[i];
    if (!vu.call(e, a) || !Jt(t[a], e[a])) return !1;
  }
  return !0;
}
function Ld(t) {
  for (; t && t.firstChild; ) t = t.firstChild;
  return t;
}
function Yd(t, e) {
  var n = Ld(t);
  t = 0;
  for (var i; n; ) {
    if (n.nodeType === 3) {
      if (((i = t + n.textContent.length), t <= e && i >= e)) return { node: n, offset: e - t };
      t = i;
    }
    t: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break t;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Ld(n);
  }
}
function g0(t, e) {
  return t && e
    ? t === e
      ? !0
      : t && t.nodeType === 3
        ? !1
        : e && e.nodeType === 3
          ? g0(t, e.parentNode)
          : "contains" in t
            ? t.contains(e)
            : t.compareDocumentPosition
              ? !!(t.compareDocumentPosition(e) & 16)
              : !1
    : !1;
}
function y0(t) {
  t =
    t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
      ? t.ownerDocument.defaultView
      : window;
  for (var e = Ps(t.document); e instanceof t.HTMLIFrameElement; ) {
    try {
      var n = typeof e.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) t = e.contentWindow;
    else break;
    e = Ps(t.document);
  }
  return e;
}
function Zc(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return (
    e &&
    ((e === "input" &&
      (t.type === "text" ||
        t.type === "search" ||
        t.type === "tel" ||
        t.type === "url" ||
        t.type === "password")) ||
      e === "textarea" ||
      t.contentEditable === "true")
  );
}
function Pb(t, e) {
  var n = y0(e);
  e = t.focusedElem;
  var i = t.selectionRange;
  if (n !== e && e && e.ownerDocument && g0(e.ownerDocument.documentElement, e)) {
    if (i !== null && Zc(e)) {
      if (((t = i.start), (n = i.end), n === void 0 && (n = t), "selectionStart" in e))
        ((e.selectionStart = t), (e.selectionEnd = Math.min(n, e.value.length)));
      else if (
        ((n = ((t = e.ownerDocument || document) && t.defaultView) || window), n.getSelection)
      ) {
        n = n.getSelection();
        var a = e.textContent.length,
          l = Math.min(i.start, a);
        ((i = i.end === void 0 ? l : Math.min(i.end, a)),
          !n.extend && l > i && ((a = i), (i = l), (l = a)),
          (a = Yd(e, l)));
        var s = Yd(e, i);
        a &&
          s &&
          (n.rangeCount !== 1 ||
            n.anchorNode !== a.node ||
            n.anchorOffset !== a.offset ||
            n.focusNode !== s.node ||
            n.focusOffset !== s.offset) &&
          ((t = t.createRange()),
          t.setStart(a.node, a.offset),
          n.removeAllRanges(),
          l > i
            ? (n.addRange(t), n.extend(s.node, s.offset))
            : (t.setEnd(s.node, s.offset), n.addRange(t)));
      }
    }
    for (t = [], n = e; (n = n.parentNode); )
      n.nodeType === 1 && t.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
    for (typeof e.focus == "function" && e.focus(), e = 0; e < t.length; e++)
      ((n = t[e]), (n.element.scrollLeft = n.left), (n.element.scrollTop = n.top));
  }
}
var Fb = $e && "documentMode" in document && 11 >= document.documentMode,
  Ci = null,
  Eu = null,
  Qa = null,
  Mu = !1;
function Gd(t, e, n) {
  var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Mu ||
    Ci == null ||
    Ci !== Ps(i) ||
    ((i = Ci),
    "selectionStart" in i && Zc(i)
      ? (i = { start: i.selectionStart, end: i.selectionEnd })
      : ((i = ((i.ownerDocument && i.ownerDocument.defaultView) || window).getSelection()),
        (i = {
          anchorNode: i.anchorNode,
          anchorOffset: i.anchorOffset,
          focusNode: i.focusNode,
          focusOffset: i.focusOffset,
        })),
    (Qa && pl(Qa, i)) ||
      ((Qa = i),
      (i = cr(Eu, "onSelect")),
      0 < i.length &&
        ((e = new zr("onSelect", "select", null, e, n)),
        t.push({ event: e, listeners: i }),
        (e.target = Ci))));
}
function jn(t, e) {
  var n = {};
  return (
    (n[t.toLowerCase()] = e.toLowerCase()),
    (n["Webkit" + t] = "webkit" + e),
    (n["Moz" + t] = "moz" + e),
    n
  );
}
var Ri = {
    animationend: jn("Animation", "AnimationEnd"),
    animationiteration: jn("Animation", "AnimationIteration"),
    animationstart: jn("Animation", "AnimationStart"),
    transitionrun: jn("Transition", "TransitionRun"),
    transitionstart: jn("Transition", "TransitionStart"),
    transitioncancel: jn("Transition", "TransitionCancel"),
    transitionend: jn("Transition", "TransitionEnd"),
  },
  yo = {},
  v0 = {};
$e &&
  ((v0 = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Ri.animationend.animation,
    delete Ri.animationiteration.animation,
    delete Ri.animationstart.animation),
  "TransitionEvent" in window || delete Ri.transitionend.transition);
function ci(t) {
  if (yo[t]) return yo[t];
  if (!Ri[t]) return t;
  var e = Ri[t],
    n;
  for (n in e) if (e.hasOwnProperty(n) && n in v0) return (yo[t] = e[n]);
  return t;
}
var b0 = ci("animationend"),
  S0 = ci("animationiteration"),
  x0 = ci("animationstart"),
  $b = ci("transitionrun"),
  Jb = ci("transitionstart"),
  Wb = ci("transitioncancel"),
  T0 = ci("transitionend"),
  A0 = new Map(),
  qd =
    "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(
      " ",
    );
function be(t, e) {
  (A0.set(t, e), oi(e, [t]));
}
var ne = [],
  Oi = 0,
  Qc = 0;
function Br() {
  for (var t = Oi, e = (Qc = Oi = 0); e < t; ) {
    var n = ne[e];
    ne[e++] = null;
    var i = ne[e];
    ne[e++] = null;
    var a = ne[e];
    ne[e++] = null;
    var l = ne[e];
    if (((ne[e++] = null), i !== null && a !== null)) {
      var s = i.pending;
      (s === null ? (a.next = a) : ((a.next = s.next), (s.next = a)), (i.pending = a));
    }
    l !== 0 && E0(n, a, l);
  }
}
function Ur(t, e, n, i) {
  ((ne[Oi++] = t),
    (ne[Oi++] = e),
    (ne[Oi++] = n),
    (ne[Oi++] = i),
    (Qc |= i),
    (t.lanes |= i),
    (t = t.alternate),
    t !== null && (t.lanes |= i));
}
function Pc(t, e, n, i) {
  return (Ur(t, e, n, i), Fs(t));
}
function wn(t, e) {
  return (Ur(t, null, null, e), Fs(t));
}
function E0(t, e, n) {
  t.lanes |= n;
  var i = t.alternate;
  i !== null && (i.lanes |= n);
  for (var a = !1, l = t.return; l !== null; )
    ((l.childLanes |= n),
      (i = l.alternate),
      i !== null && (i.childLanes |= n),
      l.tag === 22 && ((t = l.stateNode), t === null || t._visibility & 1 || (a = !0)),
      (t = l),
      (l = l.return));
  a &&
    e !== null &&
    t.tag === 3 &&
    ((l = t.stateNode),
    (a = 31 - Pt(n)),
    (l = l.hiddenUpdates),
    (t = l[a]),
    t === null ? (l[a] = [e]) : t.push(e),
    (e.lane = n | 536870912));
}
function Fs(t) {
  if (50 < ll) throw ((ll = 0), (Qu = null), Error(A(185)));
  for (var e = t.return; e !== null; ) ((t = e), (e = t.return));
  return t.tag === 3 ? t.stateNode : null;
}
var zi = {},
  kd = new WeakMap();
function re(t, e) {
  if (typeof t == "object" && t !== null) {
    var n = kd.get(t);
    return n !== void 0 ? n : ((e = { value: t, source: e, stack: Td(e) }), kd.set(t, e), e);
  }
  return { value: t, source: e, stack: Td(e) };
}
var Vi = [],
  _i = 0,
  $s = null,
  Js = 0,
  ae = [],
  le = 0,
  Fn = null,
  ke = 1,
  Xe = "";
function Yn(t, e) {
  ((Vi[_i++] = Js), (Vi[_i++] = $s), ($s = t), (Js = e));
}
function M0(t, e, n) {
  ((ae[le++] = ke), (ae[le++] = Xe), (ae[le++] = Fn), (Fn = t));
  var i = ke;
  t = Xe;
  var a = 32 - Pt(i) - 1;
  ((i &= ~(1 << a)), (n += 1));
  var l = 32 - Pt(e) + a;
  if (30 < l) {
    var s = a - (a % 5);
    ((l = (i & ((1 << s) - 1)).toString(32)),
      (i >>= s),
      (a -= s),
      (ke = (1 << (32 - Pt(e) + a)) | (n << a) | i),
      (Xe = l + t));
  } else ((ke = (1 << l) | (n << a) | i), (Xe = t));
}
function Fc(t) {
  t.return !== null && (Yn(t, 1), M0(t, 1, 0));
}
function $c(t) {
  for (; t === $s; ) (($s = Vi[--_i]), (Vi[_i] = null), (Js = Vi[--_i]), (Vi[_i] = null));
  for (; t === Fn; )
    ((Fn = ae[--le]),
      (ae[le] = null),
      (Xe = ae[--le]),
      (ae[le] = null),
      (ke = ae[--le]),
      (ae[le] = null));
}
var Bt = null,
  wt = null,
  X = !1,
  ge = null,
  Te = !1,
  Du = Error(A(519));
function ii(t) {
  var e = Error(A(418, ""));
  throw (gl(re(e, t)), Du);
}
function Xd(t) {
  var e = t.stateNode,
    n = t.type,
    i = t.memoizedProps;
  switch (((e[Ot] = t), (e[Gt] = i), n)) {
    case "dialog":
      (q("cancel", e), q("close", e));
      break;
    case "iframe":
    case "object":
    case "embed":
      q("load", e);
      break;
    case "video":
    case "audio":
      for (n = 0; n < bl.length; n++) q(bl[n], e);
      break;
    case "source":
      q("error", e);
      break;
    case "img":
    case "image":
    case "link":
      (q("error", e), q("load", e));
      break;
    case "details":
      q("toggle", e);
      break;
    case "input":
      (q("invalid", e),
        a0(e, i.value, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name, !0),
        Qs(e));
      break;
    case "select":
      q("invalid", e);
      break;
    case "textarea":
      (q("invalid", e), s0(e, i.value, i.defaultValue, i.children), Qs(e));
  }
  ((n = i.children),
    (typeof n != "string" && typeof n != "number" && typeof n != "bigint") ||
    e.textContent === "" + n ||
    i.suppressHydrationWarning === !0 ||
    ey(e.textContent, n)
      ? (i.popover != null && (q("beforetoggle", e), q("toggle", e)),
        i.onScroll != null && q("scroll", e),
        i.onScrollEnd != null && q("scrollend", e),
        i.onClick != null && (e.onclick = qr),
        (e = !0))
      : (e = !1),
    e || ii(t));
}
function Kd(t) {
  for (Bt = t.return; Bt; )
    switch (Bt.tag) {
      case 3:
      case 27:
        Te = !0;
        return;
      case 5:
      case 13:
        Te = !1;
        return;
      default:
        Bt = Bt.return;
    }
}
function Ra(t) {
  if (t !== Bt) return !1;
  if (!X) return (Kd(t), (X = !0), !1);
  var e = !1,
    n;
  if (
    ((n = t.tag !== 3 && t.tag !== 27) &&
      ((n = t.tag === 5) &&
        ((n = t.type), (n = !(n !== "form" && n !== "button") || tc(t.type, t.memoizedProps))),
      (n = !n)),
    n && (e = !0),
    e && wt && ii(t),
    Kd(t),
    t.tag === 13)
  ) {
    if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(A(317));
    t: {
      for (t = t.nextSibling, e = 0; t; ) {
        if (t.nodeType === 8)
          if (((n = t.data), n === "/$")) {
            if (e === 0) {
              wt = ye(t.nextSibling);
              break t;
            }
            e--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || e++;
        t = t.nextSibling;
      }
      wt = null;
    }
  } else wt = Bt ? ye(t.stateNode.nextSibling) : null;
  return !0;
}
function Hl() {
  ((wt = Bt = null), (X = !1));
}
function gl(t) {
  ge === null ? (ge = [t]) : ge.push(t);
}
var Pa = Error(A(460)),
  D0 = Error(A(474)),
  wu = { then: function () {} };
function Zd(t) {
  return ((t = t.status), t === "fulfilled" || t === "rejected");
}
function ls() {}
function w0(t, e, n) {
  switch (((n = t[n]), n === void 0 ? t.push(e) : n !== e && (e.then(ls, ls), (e = n)), e.status)) {
    case "fulfilled":
      return e.value;
    case "rejected":
      throw ((t = e.reason), t === Pa ? Error(A(483)) : t);
    default:
      if (typeof e.status == "string") e.then(ls, ls);
      else {
        if (((t = J), t !== null && 100 < t.shellSuspendCounter)) throw Error(A(482));
        ((t = e),
          (t.status = "pending"),
          t.then(
            function (i) {
              if (e.status === "pending") {
                var a = e;
                ((a.status = "fulfilled"), (a.value = i));
              }
            },
            function (i) {
              if (e.status === "pending") {
                var a = e;
                ((a.status = "rejected"), (a.reason = i));
              }
            },
          ));
      }
      switch (e.status) {
        case "fulfilled":
          return e.value;
        case "rejected":
          throw ((t = e.reason), t === Pa ? Error(A(483)) : t);
      }
      throw ((Fa = e), Pa);
  }
}
var Fa = null;
function Qd() {
  if (Fa === null) throw Error(A(459));
  var t = Fa;
  return ((Fa = null), t);
}
var Xi = null,
  yl = 0;
function ss(t) {
  var e = yl;
  return ((yl += 1), Xi === null && (Xi = []), w0(Xi, t, e));
}
function Oa(t, e) {
  ((e = e.props.ref), (t.ref = e !== void 0 ? e : null));
}
function rs(t, e) {
  throw e.$$typeof === Lv
    ? Error(A(525))
    : ((t = Object.prototype.toString.call(e)),
      Error(
        A(31, t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t),
      ));
}
function Pd(t) {
  var e = t._init;
  return e(t._payload);
}
function C0(t) {
  function e(m, p) {
    if (t) {
      var g = m.deletions;
      g === null ? ((m.deletions = [p]), (m.flags |= 16)) : g.push(p);
    }
  }
  function n(m, p) {
    if (!t) return null;
    for (; p !== null; ) (e(m, p), (p = p.sibling));
    return null;
  }
  function i(m) {
    for (var p = new Map(); m !== null; )
      (m.key !== null ? p.set(m.key, m) : p.set(m.index, m), (m = m.sibling));
    return p;
  }
  function a(m, p) {
    return ((m = xn(m, p)), (m.index = 0), (m.sibling = null), m);
  }
  function l(m, p, g) {
    return (
      (m.index = g),
      t
        ? ((g = m.alternate),
          g !== null
            ? ((g = g.index), g < p ? ((m.flags |= 33554434), p) : g)
            : ((m.flags |= 33554434), p))
        : ((m.flags |= 1048576), p)
    );
  }
  function s(m) {
    return (t && m.alternate === null && (m.flags |= 33554434), m);
  }
  function r(m, p, g, v) {
    return p === null || p.tag !== 6
      ? ((p = Ro(g, m.mode, v)), (p.return = m), p)
      : ((p = a(p, g)), (p.return = m), p);
  }
  function o(m, p, g, v) {
    var S = g.type;
    return S === Ei
      ? c(m, p, g.props.children, v, g.key)
      : p !== null &&
          (p.elementType === S ||
            (typeof S == "object" && S !== null && S.$$typeof === cn && Pd(S) === p.type))
        ? ((p = a(p, g.props)), Oa(p, g), (p.return = m), p)
        : ((p = zs(g.type, g.key, g.props, null, m.mode, v)), Oa(p, g), (p.return = m), p);
  }
  function u(m, p, g, v) {
    return p === null ||
      p.tag !== 4 ||
      p.stateNode.containerInfo !== g.containerInfo ||
      p.stateNode.implementation !== g.implementation
      ? ((p = Oo(g, m.mode, v)), (p.return = m), p)
      : ((p = a(p, g.children || [])), (p.return = m), p);
  }
  function c(m, p, g, v, S) {
    return p === null || p.tag !== 7
      ? ((p = Jn(g, m.mode, v, S)), (p.return = m), p)
      : ((p = a(p, g)), (p.return = m), p);
  }
  function d(m, p, g) {
    if ((typeof p == "string" && p !== "") || typeof p == "number" || typeof p == "bigint")
      return ((p = Ro("" + p, m.mode, g)), (p.return = m), p);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case ts:
          return ((g = zs(p.type, p.key, p.props, null, m.mode, g)), Oa(g, p), (g.return = m), g);
        case Na:
          return ((p = Oo(p, m.mode, g)), (p.return = m), p);
        case cn:
          var v = p._init;
          return ((p = v(p._payload)), d(m, p, g));
      }
      if (Ha(p) || Da(p)) return ((p = Jn(p, m.mode, g, null)), (p.return = m), p);
      if (typeof p.then == "function") return d(m, ss(p), g);
      if (p.$$typeof === qe) return d(m, os(m, p), g);
      rs(m, p);
    }
    return null;
  }
  function f(m, p, g, v) {
    var S = p !== null ? p.key : null;
    if ((typeof g == "string" && g !== "") || typeof g == "number" || typeof g == "bigint")
      return S !== null ? null : r(m, p, "" + g, v);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case ts:
          return g.key === S ? o(m, p, g, v) : null;
        case Na:
          return g.key === S ? u(m, p, g, v) : null;
        case cn:
          return ((S = g._init), (g = S(g._payload)), f(m, p, g, v));
      }
      if (Ha(g) || Da(g)) return S !== null ? null : c(m, p, g, v, null);
      if (typeof g.then == "function") return f(m, p, ss(g), v);
      if (g.$$typeof === qe) return f(m, p, os(m, g), v);
      rs(m, g);
    }
    return null;
  }
  function h(m, p, g, v, S) {
    if ((typeof v == "string" && v !== "") || typeof v == "number" || typeof v == "bigint")
      return ((m = m.get(g) || null), r(p, m, "" + v, S));
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case ts:
          return ((m = m.get(v.key === null ? g : v.key) || null), o(p, m, v, S));
        case Na:
          return ((m = m.get(v.key === null ? g : v.key) || null), u(p, m, v, S));
        case cn:
          var T = v._init;
          return ((v = T(v._payload)), h(m, p, g, v, S));
      }
      if (Ha(v) || Da(v)) return ((m = m.get(g) || null), c(p, m, v, S, null));
      if (typeof v.then == "function") return h(m, p, g, ss(v), S);
      if (v.$$typeof === qe) return h(m, p, g, os(p, v), S);
      rs(p, v);
    }
    return null;
  }
  function y(m, p, g, v) {
    for (var S = null, T = null, x = p, M = (p = 0), B = null; x !== null && M < g.length; M++) {
      x.index > M ? ((B = x), (x = null)) : (B = x.sibling);
      var z = f(m, x, g[M], v);
      if (z === null) {
        x === null && (x = B);
        break;
      }
      (t && x && z.alternate === null && e(m, x),
        (p = l(z, p, M)),
        T === null ? (S = z) : (T.sibling = z),
        (T = z),
        (x = B));
    }
    if (M === g.length) return (n(m, x), X && Yn(m, M), S);
    if (x === null) {
      for (; M < g.length; M++)
        ((x = d(m, g[M], v)),
          x !== null && ((p = l(x, p, M)), T === null ? (S = x) : (T.sibling = x), (T = x)));
      return (X && Yn(m, M), S);
    }
    for (x = i(x); M < g.length; M++)
      ((B = h(x, m, M, g[M], v)),
        B !== null &&
          (t && B.alternate !== null && x.delete(B.key === null ? M : B.key),
          (p = l(B, p, M)),
          T === null ? (S = B) : (T.sibling = B),
          (T = B)));
    return (
      t &&
        x.forEach(function (it) {
          return e(m, it);
        }),
      X && Yn(m, M),
      S
    );
  }
  function b(m, p, g, v) {
    if (g == null) throw Error(A(151));
    for (
      var S = null, T = null, x = p, M = (p = 0), B = null, z = g.next();
      x !== null && !z.done;
      M++, z = g.next()
    ) {
      x.index > M ? ((B = x), (x = null)) : (B = x.sibling);
      var it = f(m, x, z.value, v);
      if (it === null) {
        x === null && (x = B);
        break;
      }
      (t && x && it.alternate === null && e(m, x),
        (p = l(it, p, M)),
        T === null ? (S = it) : (T.sibling = it),
        (T = it),
        (x = B));
    }
    if (z.done) return (n(m, x), X && Yn(m, M), S);
    if (x === null) {
      for (; !z.done; M++, z = g.next())
        ((z = d(m, z.value, v)),
          z !== null && ((p = l(z, p, M)), T === null ? (S = z) : (T.sibling = z), (T = z)));
      return (X && Yn(m, M), S);
    }
    for (x = i(x); !z.done; M++, z = g.next())
      ((z = h(x, m, M, z.value, v)),
        z !== null &&
          (t && z.alternate !== null && x.delete(z.key === null ? M : z.key),
          (p = l(z, p, M)),
          T === null ? (S = z) : (T.sibling = z),
          (T = z)));
    return (
      t &&
        x.forEach(function (Ve) {
          return e(m, Ve);
        }),
      X && Yn(m, M),
      S
    );
  }
  function E(m, p, g, v) {
    if (
      (typeof g == "object" &&
        g !== null &&
        g.type === Ei &&
        g.key === null &&
        (g = g.props.children),
      typeof g == "object" && g !== null)
    ) {
      switch (g.$$typeof) {
        case ts:
          t: {
            for (var S = g.key; p !== null; ) {
              if (p.key === S) {
                if (((S = g.type), S === Ei)) {
                  if (p.tag === 7) {
                    (n(m, p.sibling), (v = a(p, g.props.children)), (v.return = m), (m = v));
                    break t;
                  }
                } else if (
                  p.elementType === S ||
                  (typeof S == "object" && S !== null && S.$$typeof === cn && Pd(S) === p.type)
                ) {
                  (n(m, p.sibling), (v = a(p, g.props)), Oa(v, g), (v.return = m), (m = v));
                  break t;
                }
                n(m, p);
                break;
              } else e(m, p);
              p = p.sibling;
            }
            g.type === Ei
              ? ((v = Jn(g.props.children, m.mode, v, g.key)), (v.return = m), (m = v))
              : ((v = zs(g.type, g.key, g.props, null, m.mode, v)),
                Oa(v, g),
                (v.return = m),
                (m = v));
          }
          return s(m);
        case Na:
          t: {
            for (S = g.key; p !== null; ) {
              if (p.key === S)
                if (
                  p.tag === 4 &&
                  p.stateNode.containerInfo === g.containerInfo &&
                  p.stateNode.implementation === g.implementation
                ) {
                  (n(m, p.sibling), (v = a(p, g.children || [])), (v.return = m), (m = v));
                  break t;
                } else {
                  n(m, p);
                  break;
                }
              else e(m, p);
              p = p.sibling;
            }
            ((v = Oo(g, m.mode, v)), (v.return = m), (m = v));
          }
          return s(m);
        case cn:
          return ((S = g._init), (g = S(g._payload)), E(m, p, g, v));
      }
      if (Ha(g)) return y(m, p, g, v);
      if (Da(g)) {
        if (((S = Da(g)), typeof S != "function")) throw Error(A(150));
        return ((g = S.call(g)), b(m, p, g, v));
      }
      if (typeof g.then == "function") return E(m, p, ss(g), v);
      if (g.$$typeof === qe) return E(m, p, os(m, g), v);
      rs(m, g);
    }
    return (typeof g == "string" && g !== "") || typeof g == "number" || typeof g == "bigint"
      ? ((g = "" + g),
        p !== null && p.tag === 6
          ? (n(m, p.sibling), (v = a(p, g)), (v.return = m), (m = v))
          : (n(m, p), (v = Ro(g, m.mode, v)), (v.return = m), (m = v)),
        s(m))
      : n(m, p);
  }
  return function (m, p, g, v) {
    try {
      yl = 0;
      var S = E(m, p, g, v);
      return ((Xi = null), S);
    } catch (x) {
      if (x === Pa) throw x;
      var T = oe(29, x, null, m.mode);
      return ((T.lanes = v), (T.return = m), T);
    } finally {
    }
  };
}
var ai = C0(!0),
  R0 = C0(!1),
  Wi = Oe(null),
  Ws = Oe(0);
function Fd(t, e) {
  ((t = Ie), nt(Ws, t), nt(Wi, e), (Ie = t | e.baseLanes));
}
function Cu() {
  (nt(Ws, Ie), nt(Wi, Wi.current));
}
function Jc() {
  ((Ie = Ws.current), Et(Wi), Et(Ws));
}
var ce = Oe(null),
  De = null;
function dn(t) {
  var e = t.alternate;
  (nt(vt, vt.current & 1),
    nt(ce, t),
    De === null && (e === null || Wi.current !== null || e.memoizedState !== null) && (De = t));
}
function O0(t) {
  if (t.tag === 22) {
    if ((nt(vt, vt.current), nt(ce, t), De === null)) {
      var e = t.alternate;
      e !== null && e.memoizedState !== null && (De = t);
    }
  } else hn();
}
function hn() {
  (nt(vt, vt.current), nt(ce, ce.current));
}
function Ke(t) {
  (Et(ce), De === t && (De = null), Et(vt));
}
var vt = Oe(0);
function Is(t) {
  for (var e = t; e !== null; ) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (n !== null && ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!"))
        return e;
    } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
      if ((e.flags & 128) !== 0) return e;
    } else if (e.child !== null) {
      ((e.child.return = e), (e = e.child));
      continue;
    }
    if (e === t) break;
    for (; e.sibling === null; ) {
      if (e.return === null || e.return === t) return null;
      e = e.return;
    }
    ((e.sibling.return = e.return), (e = e.sibling));
  }
  return null;
}
var Ib =
    typeof AbortController < "u"
      ? AbortController
      : function () {
          var t = [],
            e = (this.signal = {
              aborted: !1,
              addEventListener: function (n, i) {
                t.push(i);
              },
            });
          this.abort = function () {
            ((e.aborted = !0),
              t.forEach(function (n) {
                return n();
              }));
          };
        },
  t2 = bt.unstable_scheduleCallback,
  e2 = bt.unstable_NormalPriority,
  yt = {
    $$typeof: qe,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0,
  };
function Wc() {
  return { controller: new Ib(), data: new Map(), refCount: 0 };
}
function Ll(t) {
  (t.refCount--,
    t.refCount === 0 &&
      t2(e2, function () {
        t.controller.abort();
      }));
}
var $a = null,
  Ru = 0,
  Ii = 0,
  Ki = null;
function n2(t, e) {
  if ($a === null) {
    var n = ($a = []);
    ((Ru = 0),
      (Ii = Tf()),
      (Ki = {
        status: "pending",
        value: void 0,
        then: function (i) {
          n.push(i);
        },
      }));
  }
  return (Ru++, e.then($d, $d), e);
}
function $d() {
  if (--Ru === 0 && $a !== null) {
    Ki !== null && (Ki.status = "fulfilled");
    var t = $a;
    (($a = null), (Ii = 0), (Ki = null));
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
}
function i2(t, e) {
  var n = [],
    i = {
      status: "pending",
      value: null,
      reason: null,
      then: function (a) {
        n.push(a);
      },
    };
  return (
    t.then(
      function () {
        ((i.status = "fulfilled"), (i.value = e));
        for (var a = 0; a < n.length; a++) (0, n[a])(e);
      },
      function (a) {
        for (i.status = "rejected", i.reason = a, a = 0; a < n.length; a++) (0, n[a])(void 0);
      },
    ),
    i
  );
}
var Jd = N.S;
N.S = function (t, e) {
  (typeof e == "object" && e !== null && typeof e.then == "function" && n2(t, e),
    Jd !== null && Jd(t, e));
};
var $n = Oe(null);
function Ic() {
  var t = $n.current;
  return t !== null ? t : J.pooledCache;
}
function ws(t, e) {
  e === null ? nt($n, $n.current) : nt($n, e.pool);
}
function z0() {
  var t = Ic();
  return t === null ? null : { parent: yt._currentValue, pool: t };
}
var Cn = 0,
  L = null,
  Q = null,
  mt = null,
  tr = !1,
  Zi = !1,
  li = !1,
  er = 0,
  vl = 0,
  Qi = null,
  a2 = 0;
function dt() {
  throw Error(A(321));
}
function tf(t, e) {
  if (e === null) return !1;
  for (var n = 0; n < e.length && n < t.length; n++) if (!Jt(t[n], e[n])) return !1;
  return !0;
}
function ef(t, e, n, i, a, l) {
  return (
    (Cn = l),
    (L = e),
    (e.memoizedState = null),
    (e.updateQueue = null),
    (e.lanes = 0),
    (N.H = t === null || t.memoizedState === null ? fi : Bn),
    (li = !1),
    (l = n(i, a)),
    (li = !1),
    Zi && (l = _0(e, n, i, a)),
    V0(t),
    l
  );
}
function V0(t) {
  N.H = Re;
  var e = Q !== null && Q.next !== null;
  if (((Cn = 0), (mt = Q = L = null), (tr = !1), (vl = 0), (Qi = null), e)) throw Error(A(300));
  t === null || At || ((t = t.dependencies), t !== null && ar(t) && (At = !0));
}
function _0(t, e, n, i) {
  L = t;
  var a = 0;
  do {
    if ((Zi && (Qi = null), (vl = 0), (Zi = !1), 25 <= a)) throw Error(A(301));
    if (((a += 1), (mt = Q = null), t.updateQueue != null)) {
      var l = t.updateQueue;
      ((l.lastEffect = null),
        (l.events = null),
        (l.stores = null),
        l.memoCache != null && (l.memoCache.index = 0));
    }
    ((N.H = di), (l = e(n, i)));
  } while (Zi);
  return l;
}
function l2() {
  var t = N.H,
    e = t.useState()[0];
  return (
    (e = typeof e.then == "function" ? Yl(e) : e),
    (t = t.useState()[0]),
    (Q !== null ? Q.memoizedState : null) !== t && (L.flags |= 1024),
    e
  );
}
function nf() {
  var t = er !== 0;
  return ((er = 0), t);
}
function af(t, e, n) {
  ((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~n));
}
function lf(t) {
  if (tr) {
    for (t = t.memoizedState; t !== null; ) {
      var e = t.queue;
      (e !== null && (e.pending = null), (t = t.next));
    }
    tr = !1;
  }
  ((Cn = 0), (mt = Q = L = null), (Zi = !1), (vl = er = 0), (Qi = null));
}
function Lt() {
  var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return (mt === null ? (L.memoizedState = mt = t) : (mt = mt.next = t), mt);
}
function gt() {
  if (Q === null) {
    var t = L.alternate;
    t = t !== null ? t.memoizedState : null;
  } else t = Q.next;
  var e = mt === null ? L.memoizedState : mt.next;
  if (e !== null) ((mt = e), (Q = t));
  else {
    if (t === null) throw L.alternate === null ? Error(A(467)) : Error(A(310));
    ((Q = t),
      (t = {
        memoizedState: Q.memoizedState,
        baseState: Q.baseState,
        baseQueue: Q.baseQueue,
        queue: Q.queue,
        next: null,
      }),
      mt === null ? (L.memoizedState = mt = t) : (mt = mt.next = t));
  }
  return mt;
}
var Nr;
Nr = function () {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
};
function Yl(t) {
  var e = vl;
  return (
    (vl += 1),
    Qi === null && (Qi = []),
    (t = w0(Qi, t, e)),
    (e = L),
    (mt === null ? e.memoizedState : mt.next) === null &&
      ((e = e.alternate), (N.H = e === null || e.memoizedState === null ? fi : Bn)),
    t
  );
}
function jr(t) {
  if (t !== null && typeof t == "object") {
    if (typeof t.then == "function") return Yl(t);
    if (t.$$typeof === qe) return zt(t);
  }
  throw Error(A(438, String(t)));
}
function sf(t) {
  var e = null,
    n = L.updateQueue;
  if ((n !== null && (e = n.memoCache), e == null)) {
    var i = L.alternate;
    i !== null &&
      ((i = i.updateQueue),
      i !== null &&
        ((i = i.memoCache),
        i != null &&
          (e = {
            data: i.data.map(function (a) {
              return a.slice();
            }),
            index: 0,
          })));
  }
  if (
    (e == null && (e = { data: [], index: 0 }),
    n === null && ((n = Nr()), (L.updateQueue = n)),
    (n.memoCache = e),
    (n = e.data[e.index]),
    n === void 0)
  )
    for (n = e.data[e.index] = Array(t), i = 0; i < t; i++) n[i] = Gv;
  return (e.index++, n);
}
function Je(t, e) {
  return typeof e == "function" ? e(t) : e;
}
function Cs(t) {
  var e = gt();
  return rf(e, Q, t);
}
function rf(t, e, n) {
  var i = t.queue;
  if (i === null) throw Error(A(311));
  i.lastRenderedReducer = n;
  var a = t.baseQueue,
    l = i.pending;
  if (l !== null) {
    if (a !== null) {
      var s = a.next;
      ((a.next = l.next), (l.next = s));
    }
    ((e.baseQueue = a = l), (i.pending = null));
  }
  if (((l = t.baseState), a === null)) t.memoizedState = l;
  else {
    e = a.next;
    var r = (s = null),
      o = null,
      u = e,
      c = !1;
    do {
      var d = u.lane & -536870913;
      if (d !== u.lane ? (k & d) === d : (Cn & d) === d) {
        var f = u.revertLane;
        if (f === 0)
          (o !== null &&
            (o = o.next =
              {
                lane: 0,
                revertLane: 0,
                action: u.action,
                hasEagerState: u.hasEagerState,
                eagerState: u.eagerState,
                next: null,
              }),
            d === Ii && (c = !0));
        else if ((Cn & f) === f) {
          ((u = u.next), f === Ii && (c = !0));
          continue;
        } else
          ((d = {
            lane: 0,
            revertLane: u.revertLane,
            action: u.action,
            hasEagerState: u.hasEagerState,
            eagerState: u.eagerState,
            next: null,
          }),
            o === null ? ((r = o = d), (s = l)) : (o = o.next = d),
            (L.lanes |= f),
            (On |= f));
        ((d = u.action), li && n(l, d), (l = u.hasEagerState ? u.eagerState : n(l, d)));
      } else
        ((f = {
          lane: d,
          revertLane: u.revertLane,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        }),
          o === null ? ((r = o = f), (s = l)) : (o = o.next = f),
          (L.lanes |= d),
          (On |= d));
      u = u.next;
    } while (u !== null && u !== e);
    if (
      (o === null ? (s = l) : (o.next = r),
      !Jt(l, t.memoizedState) && ((At = !0), c && ((n = Ki), n !== null)))
    )
      throw n;
    ((t.memoizedState = l), (t.baseState = s), (t.baseQueue = o), (i.lastRenderedState = l));
  }
  return (a === null && (i.lanes = 0), [t.memoizedState, i.dispatch]);
}
function vo(t) {
  var e = gt(),
    n = e.queue;
  if (n === null) throw Error(A(311));
  n.lastRenderedReducer = t;
  var i = n.dispatch,
    a = n.pending,
    l = e.memoizedState;
  if (a !== null) {
    n.pending = null;
    var s = (a = a.next);
    do ((l = t(l, s.action)), (s = s.next));
    while (s !== a);
    (Jt(l, e.memoizedState) || (At = !0),
      (e.memoizedState = l),
      e.baseQueue === null && (e.baseState = l),
      (n.lastRenderedState = l));
  }
  return [l, i];
}
function B0(t, e, n) {
  var i = L,
    a = gt(),
    l = X;
  if (l) {
    if (n === void 0) throw Error(A(407));
    n = n();
  } else n = e();
  var s = !Jt((Q || a).memoizedState, n);
  if (
    (s && ((a.memoizedState = n), (At = !0)),
    (a = a.queue),
    of(j0.bind(null, i, a, t), [t]),
    a.getSnapshot !== e || s || (mt !== null && mt.memoizedState.tag & 1))
  ) {
    if (
      ((i.flags |= 2048), ta(9, N0.bind(null, i, a, n, e), { destroy: void 0 }, null), J === null)
    )
      throw Error(A(349));
    l || (Cn & 60) !== 0 || U0(i, e, n);
  }
  return n;
}
function U0(t, e, n) {
  ((t.flags |= 16384),
    (t = { getSnapshot: e, value: n }),
    (e = L.updateQueue),
    e === null
      ? ((e = Nr()), (L.updateQueue = e), (e.stores = [t]))
      : ((n = e.stores), n === null ? (e.stores = [t]) : n.push(t)));
}
function N0(t, e, n, i) {
  ((e.value = n), (e.getSnapshot = i), H0(e) && L0(t));
}
function j0(t, e, n) {
  return n(function () {
    H0(e) && L0(t);
  });
}
function H0(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !Jt(t, n);
  } catch {
    return !0;
  }
}
function L0(t) {
  var e = wn(t, 2);
  e !== null && jt(e, t, 2);
}
function Ou(t) {
  var e = Lt();
  if (typeof t == "function") {
    var n = t;
    if (((t = n()), li)) {
      gn(!0);
      try {
        n();
      } finally {
        gn(!1);
      }
    }
  }
  return (
    (e.memoizedState = e.baseState = t),
    (e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Je,
      lastRenderedState: t,
    }),
    e
  );
}
function Y0(t, e, n, i) {
  return ((t.baseState = n), rf(t, Q, typeof i == "function" ? i : Je));
}
function s2(t, e, n, i, a) {
  if (Lr(t)) throw Error(A(485));
  if (((t = e.action), t !== null)) {
    var l = {
      payload: a,
      action: t,
      next: null,
      isTransition: !0,
      status: "pending",
      value: null,
      reason: null,
      listeners: [],
      then: function (s) {
        l.listeners.push(s);
      },
    };
    (N.T !== null ? n(!0) : (l.isTransition = !1),
      i(l),
      (n = e.pending),
      n === null
        ? ((l.next = e.pending = l), G0(e, l))
        : ((l.next = n.next), (e.pending = n.next = l)));
  }
}
function G0(t, e) {
  var n = e.action,
    i = e.payload,
    a = t.state;
  if (e.isTransition) {
    var l = N.T,
      s = {};
    N.T = s;
    try {
      var r = n(a, i),
        o = N.S;
      (o !== null && o(s, r), Wd(t, e, r));
    } catch (u) {
      zu(t, e, u);
    } finally {
      N.T = l;
    }
  } else
    try {
      ((l = n(a, i)), Wd(t, e, l));
    } catch (u) {
      zu(t, e, u);
    }
}
function Wd(t, e, n) {
  n !== null && typeof n == "object" && typeof n.then == "function"
    ? n.then(
        function (i) {
          Id(t, e, i);
        },
        function (i) {
          return zu(t, e, i);
        },
      )
    : Id(t, e, n);
}
function Id(t, e, n) {
  ((e.status = "fulfilled"),
    (e.value = n),
    q0(e),
    (t.state = n),
    (e = t.pending),
    e !== null &&
      ((n = e.next), n === e ? (t.pending = null) : ((n = n.next), (e.next = n), G0(t, n))));
}
function zu(t, e, n) {
  var i = t.pending;
  if (((t.pending = null), i !== null)) {
    i = i.next;
    do ((e.status = "rejected"), (e.reason = n), q0(e), (e = e.next));
    while (e !== i);
  }
  t.action = null;
}
function q0(t) {
  t = t.listeners;
  for (var e = 0; e < t.length; e++) (0, t[e])();
}
function k0(t, e) {
  return e;
}
function X0(t, e) {
  if (X) {
    var n = J.formState;
    if (n !== null) {
      t: {
        var i = L;
        if (X) {
          if (wt) {
            e: {
              for (var a = wt, l = Te; a.nodeType !== 8; ) {
                if (!l) {
                  a = null;
                  break e;
                }
                if (((a = ye(a.nextSibling)), a === null)) {
                  a = null;
                  break e;
                }
              }
              ((l = a.data), (a = l === "F!" || l === "F" ? a : null));
            }
            if (a) {
              ((wt = ye(a.nextSibling)), (i = a.data === "F!"));
              break t;
            }
          }
          ii(i);
        }
        i = !1;
      }
      i && (e = n[0]);
    }
  }
  return (
    (n = Lt()),
    (n.memoizedState = n.baseState = e),
    (i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: k0,
      lastRenderedState: e,
    }),
    (n.queue = i),
    (n = rg.bind(null, L, i)),
    (i.dispatch = n),
    (i = Ou(!1)),
    (l = df.bind(null, L, !1, i.queue)),
    (i = Lt()),
    (a = { state: e, dispatch: null, action: t, pending: null }),
    (i.queue = a),
    (n = s2.bind(null, L, a, l, n)),
    (a.dispatch = n),
    (i.memoizedState = t),
    [e, n, !1]
  );
}
function K0(t) {
  var e = gt();
  return Z0(e, Q, t);
}
function Z0(t, e, n) {
  ((e = rf(t, e, k0)[0]),
    (t = Cs(Je)[0]),
    (e = typeof e == "object" && e !== null && typeof e.then == "function" ? Yl(e) : e));
  var i = gt(),
    a = i.queue,
    l = a.dispatch;
  return (
    n !== i.memoizedState &&
      ((L.flags |= 2048), ta(9, r2.bind(null, a, n), { destroy: void 0 }, null)),
    [e, l, t]
  );
}
function r2(t, e) {
  t.action = e;
}
function Q0(t) {
  var e = gt(),
    n = Q;
  if (n !== null) return Z0(e, n, t);
  (gt(), (e = e.memoizedState), (n = gt()));
  var i = n.queue.dispatch;
  return ((n.memoizedState = t), [e, i, !1]);
}
function ta(t, e, n, i) {
  return (
    (t = { tag: t, create: e, inst: n, deps: i, next: null }),
    (e = L.updateQueue),
    e === null && ((e = Nr()), (L.updateQueue = e)),
    (n = e.lastEffect),
    n === null
      ? (e.lastEffect = t.next = t)
      : ((i = n.next), (n.next = t), (t.next = i), (e.lastEffect = t)),
    t
  );
}
function P0() {
  return gt().memoizedState;
}
function Rs(t, e, n, i) {
  var a = Lt();
  ((L.flags |= t), (a.memoizedState = ta(1 | e, n, { destroy: void 0 }, i === void 0 ? null : i)));
}
function Hr(t, e, n, i) {
  var a = gt();
  i = i === void 0 ? null : i;
  var l = a.memoizedState.inst;
  Q !== null && i !== null && tf(i, Q.memoizedState.deps)
    ? (a.memoizedState = ta(e, n, l, i))
    : ((L.flags |= t), (a.memoizedState = ta(1 | e, n, l, i)));
}
function th(t, e) {
  Rs(8390656, 8, t, e);
}
function of(t, e) {
  Hr(2048, 8, t, e);
}
function F0(t, e) {
  return Hr(4, 2, t, e);
}
function $0(t, e) {
  return Hr(4, 4, t, e);
}
function J0(t, e) {
  if (typeof e == "function") {
    t = t();
    var n = e(t);
    return function () {
      typeof n == "function" ? n() : e(null);
    };
  }
  if (e != null)
    return (
      (t = t()),
      (e.current = t),
      function () {
        e.current = null;
      }
    );
}
function W0(t, e, n) {
  ((n = n != null ? n.concat([t]) : null), Hr(4, 4, J0.bind(null, e, t), n));
}
function uf() {}
function I0(t, e) {
  var n = gt();
  e = e === void 0 ? null : e;
  var i = n.memoizedState;
  return e !== null && tf(e, i[1]) ? i[0] : ((n.memoizedState = [t, e]), t);
}
function tg(t, e) {
  var n = gt();
  e = e === void 0 ? null : e;
  var i = n.memoizedState;
  if (e !== null && tf(e, i[1])) return i[0];
  if (((i = t()), li)) {
    gn(!0);
    try {
      t();
    } finally {
      gn(!1);
    }
  }
  return ((n.memoizedState = [i, e]), i);
}
function cf(t, e, n) {
  return n === void 0 || (Cn & 1073741824) !== 0
    ? (t.memoizedState = e)
    : ((t.memoizedState = n), (t = qg()), (L.lanes |= t), (On |= t), n);
}
function eg(t, e, n, i) {
  return Jt(n, e)
    ? n
    : Wi.current !== null
      ? ((t = cf(t, n, i)), Jt(t, e) || (At = !0), t)
      : (Cn & 42) === 0
        ? ((At = !0), (t.memoizedState = n))
        : ((t = qg()), (L.lanes |= t), (On |= t), e);
}
function ng(t, e, n, i, a) {
  var l = tt.p;
  tt.p = l !== 0 && 8 > l ? l : 8;
  var s = N.T,
    r = {};
  ((N.T = r), df(t, !1, e, n));
  try {
    var o = a(),
      u = N.S;
    if (
      (u !== null && u(r, o), o !== null && typeof o == "object" && typeof o.then == "function")
    ) {
      var c = i2(o, i);
      Ja(t, e, c, Ft(t));
    } else Ja(t, e, i, Ft(t));
  } catch (d) {
    Ja(t, e, { then: function () {}, status: "rejected", reason: d }, Ft());
  } finally {
    ((tt.p = l), (N.T = s));
  }
}
function o2() {}
function Vu(t, e, n, i) {
  if (t.tag !== 5) throw Error(A(476));
  var a = ig(t).queue;
  ng(
    t,
    a,
    e,
    Pn,
    n === null
      ? o2
      : function () {
          return (ag(t), n(i));
        },
  );
}
function ig(t) {
  var e = t.memoizedState;
  if (e !== null) return e;
  e = {
    memoizedState: Pn,
    baseState: Pn,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Je,
      lastRenderedState: Pn,
    },
    next: null,
  };
  var n = {};
  return (
    (e.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Je,
        lastRenderedState: n,
      },
      next: null,
    }),
    (t.memoizedState = e),
    (t = t.alternate),
    t !== null && (t.memoizedState = e),
    e
  );
}
function ag(t) {
  var e = ig(t).next.queue;
  Ja(t, e, {}, Ft());
}
function ff() {
  return zt(Tl);
}
function lg() {
  return gt().memoizedState;
}
function sg() {
  return gt().memoizedState;
}
function u2(t) {
  for (var e = t.return; e !== null; ) {
    switch (e.tag) {
      case 24:
      case 3:
        var n = Ft();
        t = bn(n);
        var i = Sn(e, t, n);
        (i !== null && (jt(i, e, n), Ia(i, e, n)), (e = { cache: Wc() }), (t.payload = e));
        return;
    }
    e = e.return;
  }
}
function c2(t, e, n) {
  var i = Ft();
  ((n = { lane: i, revertLane: 0, action: n, hasEagerState: !1, eagerState: null, next: null }),
    Lr(t) ? og(e, n) : ((n = Pc(t, e, n, i)), n !== null && (jt(n, t, i), ug(n, e, i))));
}
function rg(t, e, n) {
  var i = Ft();
  Ja(t, e, n, i);
}
function Ja(t, e, n, i) {
  var a = { lane: i, revertLane: 0, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Lr(t)) og(e, a);
  else {
    var l = t.alternate;
    if (t.lanes === 0 && (l === null || l.lanes === 0) && ((l = e.lastRenderedReducer), l !== null))
      try {
        var s = e.lastRenderedState,
          r = l(s, n);
        if (((a.hasEagerState = !0), (a.eagerState = r), Jt(r, s)))
          return (Ur(t, e, a, 0), J === null && Br(), !1);
      } catch {
      } finally {
      }
    if (((n = Pc(t, e, a, i)), n !== null)) return (jt(n, t, i), ug(n, e, i), !0);
  }
  return !1;
}
function df(t, e, n, i) {
  if (
    ((i = {
      lane: 2,
      revertLane: Tf(),
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Lr(t))
  ) {
    if (e) throw Error(A(479));
  } else ((e = Pc(t, n, i, 2)), e !== null && jt(e, t, 2));
}
function Lr(t) {
  var e = t.alternate;
  return t === L || (e !== null && e === L);
}
function og(t, e) {
  Zi = tr = !0;
  var n = t.pending;
  (n === null ? (e.next = e) : ((e.next = n.next), (n.next = e)), (t.pending = e));
}
function ug(t, e, n) {
  if ((n & 4194176) !== 0) {
    var i = e.lanes;
    ((i &= t.pendingLanes), (n |= i), (e.lanes = n), Jp(t, n));
  }
}
var Re = {
  readContext: zt,
  use: jr,
  useCallback: dt,
  useContext: dt,
  useEffect: dt,
  useImperativeHandle: dt,
  useLayoutEffect: dt,
  useInsertionEffect: dt,
  useMemo: dt,
  useReducer: dt,
  useRef: dt,
  useState: dt,
  useDebugValue: dt,
  useDeferredValue: dt,
  useTransition: dt,
  useSyncExternalStore: dt,
  useId: dt,
};
Re.useCacheRefresh = dt;
Re.useMemoCache = dt;
Re.useHostTransitionStatus = dt;
Re.useFormState = dt;
Re.useActionState = dt;
Re.useOptimistic = dt;
var fi = {
  readContext: zt,
  use: jr,
  useCallback: function (t, e) {
    return ((Lt().memoizedState = [t, e === void 0 ? null : e]), t);
  },
  useContext: zt,
  useEffect: th,
  useImperativeHandle: function (t, e, n) {
    ((n = n != null ? n.concat([t]) : null), Rs(4194308, 4, J0.bind(null, e, t), n));
  },
  useLayoutEffect: function (t, e) {
    return Rs(4194308, 4, t, e);
  },
  useInsertionEffect: function (t, e) {
    Rs(4, 2, t, e);
  },
  useMemo: function (t, e) {
    var n = Lt();
    e = e === void 0 ? null : e;
    var i = t();
    if (li) {
      gn(!0);
      try {
        t();
      } finally {
        gn(!1);
      }
    }
    return ((n.memoizedState = [i, e]), i);
  },
  useReducer: function (t, e, n) {
    var i = Lt();
    if (n !== void 0) {
      var a = n(e);
      if (li) {
        gn(!0);
        try {
          n(e);
        } finally {
          gn(!1);
        }
      }
    } else a = e;
    return (
      (i.memoizedState = i.baseState = a),
      (t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: a,
      }),
      (i.queue = t),
      (t = t.dispatch = c2.bind(null, L, t)),
      [i.memoizedState, t]
    );
  },
  useRef: function (t) {
    var e = Lt();
    return ((t = { current: t }), (e.memoizedState = t));
  },
  useState: function (t) {
    t = Ou(t);
    var e = t.queue,
      n = rg.bind(null, L, e);
    return ((e.dispatch = n), [t.memoizedState, n]);
  },
  useDebugValue: uf,
  useDeferredValue: function (t, e) {
    var n = Lt();
    return cf(n, t, e);
  },
  useTransition: function () {
    var t = Ou(!1);
    return ((t = ng.bind(null, L, t.queue, !0, !1)), (Lt().memoizedState = t), [!1, t]);
  },
  useSyncExternalStore: function (t, e, n) {
    var i = L,
      a = Lt();
    if (X) {
      if (n === void 0) throw Error(A(407));
      n = n();
    } else {
      if (((n = e()), J === null)) throw Error(A(349));
      (k & 60) !== 0 || U0(i, e, n);
    }
    a.memoizedState = n;
    var l = { value: n, getSnapshot: e };
    return (
      (a.queue = l),
      th(j0.bind(null, i, l, t), [t]),
      (i.flags |= 2048),
      ta(9, N0.bind(null, i, l, n, e), { destroy: void 0 }, null),
      n
    );
  },
  useId: function () {
    var t = Lt(),
      e = J.identifierPrefix;
    if (X) {
      var n = Xe,
        i = ke;
      ((n = (i & ~(1 << (32 - Pt(i) - 1))).toString(32) + n),
        (e = ":" + e + "R" + n),
        (n = er++),
        0 < n && (e += "H" + n.toString(32)),
        (e += ":"));
    } else ((n = a2++), (e = ":" + e + "r" + n.toString(32) + ":"));
    return (t.memoizedState = e);
  },
  useCacheRefresh: function () {
    return (Lt().memoizedState = u2.bind(null, L));
  },
};
fi.useMemoCache = sf;
fi.useHostTransitionStatus = ff;
fi.useFormState = X0;
fi.useActionState = X0;
fi.useOptimistic = function (t) {
  var e = Lt();
  e.memoizedState = e.baseState = t;
  var n = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: null,
    lastRenderedState: null,
  };
  return ((e.queue = n), (e = df.bind(null, L, !0, n)), (n.dispatch = e), [t, e]);
};
var Bn = {
  readContext: zt,
  use: jr,
  useCallback: I0,
  useContext: zt,
  useEffect: of,
  useImperativeHandle: W0,
  useInsertionEffect: F0,
  useLayoutEffect: $0,
  useMemo: tg,
  useReducer: Cs,
  useRef: P0,
  useState: function () {
    return Cs(Je);
  },
  useDebugValue: uf,
  useDeferredValue: function (t, e) {
    var n = gt();
    return eg(n, Q.memoizedState, t, e);
  },
  useTransition: function () {
    var t = Cs(Je)[0],
      e = gt().memoizedState;
    return [typeof t == "boolean" ? t : Yl(t), e];
  },
  useSyncExternalStore: B0,
  useId: lg,
};
Bn.useCacheRefresh = sg;
Bn.useMemoCache = sf;
Bn.useHostTransitionStatus = ff;
Bn.useFormState = K0;
Bn.useActionState = K0;
Bn.useOptimistic = function (t, e) {
  var n = gt();
  return Y0(n, Q, t, e);
};
var di = {
  readContext: zt,
  use: jr,
  useCallback: I0,
  useContext: zt,
  useEffect: of,
  useImperativeHandle: W0,
  useInsertionEffect: F0,
  useLayoutEffect: $0,
  useMemo: tg,
  useReducer: vo,
  useRef: P0,
  useState: function () {
    return vo(Je);
  },
  useDebugValue: uf,
  useDeferredValue: function (t, e) {
    var n = gt();
    return Q === null ? cf(n, t, e) : eg(n, Q.memoizedState, t, e);
  },
  useTransition: function () {
    var t = vo(Je)[0],
      e = gt().memoizedState;
    return [typeof t == "boolean" ? t : Yl(t), e];
  },
  useSyncExternalStore: B0,
  useId: lg,
};
di.useCacheRefresh = sg;
di.useMemoCache = sf;
di.useHostTransitionStatus = ff;
di.useFormState = Q0;
di.useActionState = Q0;
di.useOptimistic = function (t, e) {
  var n = gt();
  return Q !== null ? Y0(n, Q, t, e) : ((n.baseState = t), [t, n.queue.dispatch]);
};
function bo(t, e, n, i) {
  ((e = t.memoizedState),
    (n = n(i, e)),
    (n = n == null ? e : et({}, e, n)),
    (t.memoizedState = n),
    t.lanes === 0 && (t.updateQueue.baseState = n));
}
var _u = {
  isMounted: function (t) {
    return (t = t._reactInternals) ? ha(t) === t : !1;
  },
  enqueueSetState: function (t, e, n) {
    t = t._reactInternals;
    var i = Ft(),
      a = bn(i);
    ((a.payload = e),
      n != null && (a.callback = n),
      (e = Sn(t, a, i)),
      e !== null && (jt(e, t, i), Ia(e, t, i)));
  },
  enqueueReplaceState: function (t, e, n) {
    t = t._reactInternals;
    var i = Ft(),
      a = bn(i);
    ((a.tag = 1),
      (a.payload = e),
      n != null && (a.callback = n),
      (e = Sn(t, a, i)),
      e !== null && (jt(e, t, i), Ia(e, t, i)));
  },
  enqueueForceUpdate: function (t, e) {
    t = t._reactInternals;
    var n = Ft(),
      i = bn(n);
    ((i.tag = 2),
      e != null && (i.callback = e),
      (e = Sn(t, i, n)),
      e !== null && (jt(e, t, n), Ia(e, t, n)));
  },
};
function eh(t, e, n, i, a, l, s) {
  return (
    (t = t.stateNode),
    typeof t.shouldComponentUpdate == "function"
      ? t.shouldComponentUpdate(i, l, s)
      : e.prototype && e.prototype.isPureReactComponent
        ? !pl(n, i) || !pl(a, l)
        : !0
  );
}
function nh(t, e, n, i) {
  ((t = e.state),
    typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, i),
    typeof e.UNSAFE_componentWillReceiveProps == "function" &&
      e.UNSAFE_componentWillReceiveProps(n, i),
    e.state !== t && _u.enqueueReplaceState(e, e.state, null));
}
function si(t, e) {
  var n = e;
  if ("ref" in e) {
    n = {};
    for (var i in e) i !== "ref" && (n[i] = e[i]);
  }
  if ((t = t.defaultProps)) {
    n === e && (n = et({}, n));
    for (var a in t) n[a] === void 0 && (n[a] = t[a]);
  }
  return n;
}
var nr =
  typeof reportError == "function"
    ? reportError
    : function (t) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var e = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message:
              typeof t == "object" && t !== null && typeof t.message == "string"
                ? String(t.message)
                : String(t),
            error: t,
          });
          if (!window.dispatchEvent(e)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", t);
          return;
        }
        console.error(t);
      };
function cg(t) {
  nr(t);
}
function fg(t) {
  console.error(t);
}
function dg(t) {
  nr(t);
}
function ir(t, e) {
  try {
    var n = t.onUncaughtError;
    n(e.value, { componentStack: e.stack });
  } catch (i) {
    setTimeout(function () {
      throw i;
    });
  }
}
function ih(t, e, n) {
  try {
    var i = t.onCaughtError;
    i(n.value, { componentStack: n.stack, errorBoundary: e.tag === 1 ? e.stateNode : null });
  } catch (a) {
    setTimeout(function () {
      throw a;
    });
  }
}
function Bu(t, e, n) {
  return (
    (n = bn(n)),
    (n.tag = 3),
    (n.payload = { element: null }),
    (n.callback = function () {
      ir(t, e);
    }),
    n
  );
}
function hg(t) {
  return ((t = bn(t)), (t.tag = 3), t);
}
function mg(t, e, n, i) {
  var a = n.type.getDerivedStateFromError;
  if (typeof a == "function") {
    var l = i.value;
    ((t.payload = function () {
      return a(l);
    }),
      (t.callback = function () {
        ih(e, n, i);
      }));
  }
  var s = n.stateNode;
  s !== null &&
    typeof s.componentDidCatch == "function" &&
    (t.callback = function () {
      (ih(e, n, i),
        typeof a != "function" && (Tn === null ? (Tn = new Set([this])) : Tn.add(this)));
      var r = i.stack;
      this.componentDidCatch(i.value, { componentStack: r !== null ? r : "" });
    });
}
function f2(t, e, n, i, a) {
  if (((n.flags |= 32768), i !== null && typeof i == "object" && typeof i.then == "function")) {
    if (((e = n.alternate), e !== null && Gl(e, n, a, !0), (n = ce.current), n !== null)) {
      switch (n.tag) {
        case 13:
          return (
            De === null ? Fu() : n.alternate === null && ct === 0 && (ct = 3),
            (n.flags &= -257),
            (n.flags |= 65536),
            (n.lanes = a),
            i === wu
              ? (n.flags |= 16384)
              : ((e = n.updateQueue),
                e === null ? (n.updateQueue = new Set([i])) : e.add(i),
                Vo(t, i, a)),
            !1
          );
        case 22:
          return (
            (n.flags |= 65536),
            i === wu
              ? (n.flags |= 16384)
              : ((e = n.updateQueue),
                e === null
                  ? ((e = { transitions: null, markerInstances: null, retryQueue: new Set([i]) }),
                    (n.updateQueue = e))
                  : ((n = e.retryQueue), n === null ? (e.retryQueue = new Set([i])) : n.add(i)),
                Vo(t, i, a)),
            !1
          );
      }
      throw Error(A(435, n.tag));
    }
    return (Vo(t, i, a), Fu(), !1);
  }
  if (X)
    return (
      (e = ce.current),
      e !== null
        ? ((e.flags & 65536) === 0 && (e.flags |= 256),
          (e.flags |= 65536),
          (e.lanes = a),
          i !== Du && ((t = Error(A(422), { cause: i })), gl(re(t, n))))
        : (i !== Du && ((e = Error(A(423), { cause: i })), gl(re(e, n))),
          (t = t.current.alternate),
          (t.flags |= 65536),
          (a &= -a),
          (t.lanes |= a),
          (i = re(i, n)),
          (a = Bu(t.stateNode, i, a)),
          Mo(t, a),
          ct !== 4 && (ct = 2)),
      !1
    );
  var l = Error(A(520), { cause: i });
  if (((l = re(l, n)), il === null ? (il = [l]) : il.push(l), ct !== 4 && (ct = 2), e === null))
    return !0;
  ((i = re(i, n)), (n = e));
  do {
    switch (n.tag) {
      case 3:
        return (
          (n.flags |= 65536),
          (t = a & -a),
          (n.lanes |= t),
          (t = Bu(n.stateNode, i, t)),
          Mo(n, t),
          !1
        );
      case 1:
        if (
          ((e = n.type),
          (l = n.stateNode),
          (n.flags & 128) === 0 &&
            (typeof e.getDerivedStateFromError == "function" ||
              (l !== null &&
                typeof l.componentDidCatch == "function" &&
                (Tn === null || !Tn.has(l)))))
        )
          return (
            (n.flags |= 65536),
            (a &= -a),
            (n.lanes |= a),
            (a = hg(a)),
            mg(a, t, n, i),
            Mo(n, a),
            !1
          );
    }
    n = n.return;
  } while (n !== null);
  return !1;
}
var pg = Error(A(461)),
  At = !1;
function Dt(t, e, n, i) {
  e.child = t === null ? R0(e, null, n, i) : ai(e, t.child, n, i);
}
function ah(t, e, n, i, a) {
  n = n.render;
  var l = e.ref;
  if ("ref" in i) {
    var s = {};
    for (var r in i) r !== "ref" && (s[r] = i[r]);
  } else s = i;
  return (
    ri(e),
    (i = ef(t, e, n, s, l, a)),
    (r = nf()),
    t !== null && !At
      ? (af(t, e, a), We(t, e, a))
      : (X && r && Fc(e), (e.flags |= 1), Dt(t, e, i, a), e.child)
  );
}
function lh(t, e, n, i, a) {
  if (t === null) {
    var l = n.type;
    return typeof l == "function" && !yf(l) && l.defaultProps === void 0 && n.compare === null
      ? ((e.tag = 15), (e.type = l), gg(t, e, l, i, a))
      : ((t = zs(n.type, null, i, e, e.mode, a)), (t.ref = e.ref), (t.return = e), (e.child = t));
  }
  if (((l = t.child), !hf(t, a))) {
    var s = l.memoizedProps;
    if (((n = n.compare), (n = n !== null ? n : pl), n(s, i) && t.ref === e.ref))
      return We(t, e, a);
  }
  return ((e.flags |= 1), (t = xn(l, i)), (t.ref = e.ref), (t.return = e), (e.child = t));
}
function gg(t, e, n, i, a) {
  if (t !== null) {
    var l = t.memoizedProps;
    if (pl(l, i) && t.ref === e.ref)
      if (((At = !1), (e.pendingProps = i = l), hf(t, a))) (t.flags & 131072) !== 0 && (At = !0);
      else return ((e.lanes = t.lanes), We(t, e, a));
  }
  return Uu(t, e, n, i, a);
}
function yg(t, e, n) {
  var i = e.pendingProps,
    a = i.children,
    l = (e.stateNode._pendingVisibility & 2) !== 0,
    s = t !== null ? t.memoizedState : null;
  if ((Wa(t, e), i.mode === "hidden" || l)) {
    if ((e.flags & 128) !== 0) {
      if (((i = s !== null ? s.baseLanes | n : n), t !== null)) {
        for (a = e.child = t.child, l = 0; a !== null; )
          ((l = l | a.lanes | a.childLanes), (a = a.sibling));
        e.childLanes = l & ~i;
      } else ((e.childLanes = 0), (e.child = null));
      return sh(t, e, i, n);
    }
    if ((n & 536870912) !== 0)
      ((e.memoizedState = { baseLanes: 0, cachePool: null }),
        t !== null && ws(e, s !== null ? s.cachePool : null),
        s !== null ? Fd(e, s) : Cu(),
        O0(e));
    else
      return ((e.lanes = e.childLanes = 536870912), sh(t, e, s !== null ? s.baseLanes | n : n, n));
  } else
    s !== null
      ? (ws(e, s.cachePool), Fd(e, s), hn(), (e.memoizedState = null))
      : (t !== null && ws(e, null), Cu(), hn());
  return (Dt(t, e, a, n), e.child);
}
function sh(t, e, n, i) {
  var a = Ic();
  return (
    (a = a === null ? null : { parent: yt._currentValue, pool: a }),
    (e.memoizedState = { baseLanes: n, cachePool: a }),
    t !== null && ws(e, null),
    Cu(),
    O0(e),
    t !== null && Gl(t, e, i, !0),
    null
  );
}
function Wa(t, e) {
  var n = e.ref;
  if (n === null) t !== null && t.ref !== null && (e.flags |= 2097664);
  else {
    if (typeof n != "function" && typeof n != "object") throw Error(A(284));
    (t === null || t.ref !== n) && (e.flags |= 2097664);
  }
}
function Uu(t, e, n, i, a) {
  return (
    ri(e),
    (n = ef(t, e, n, i, void 0, a)),
    (i = nf()),
    t !== null && !At
      ? (af(t, e, a), We(t, e, a))
      : (X && i && Fc(e), (e.flags |= 1), Dt(t, e, n, a), e.child)
  );
}
function rh(t, e, n, i, a, l) {
  return (
    ri(e),
    (e.updateQueue = null),
    (n = _0(e, i, n, a)),
    V0(t),
    (i = nf()),
    t !== null && !At
      ? (af(t, e, l), We(t, e, l))
      : (X && i && Fc(e), (e.flags |= 1), Dt(t, e, n, l), e.child)
  );
}
function oh(t, e, n, i, a) {
  if ((ri(e), e.stateNode === null)) {
    var l = zi,
      s = n.contextType;
    (typeof s == "object" && s !== null && (l = zt(s)),
      (l = new n(i, l)),
      (e.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null),
      (l.updater = _u),
      (e.stateNode = l),
      (l._reactInternals = e),
      (l = e.stateNode),
      (l.props = i),
      (l.state = e.memoizedState),
      (l.refs = {}),
      mf(e),
      (s = n.contextType),
      (l.context = typeof s == "object" && s !== null ? zt(s) : zi),
      (l.state = e.memoizedState),
      (s = n.getDerivedStateFromProps),
      typeof s == "function" && (bo(e, n, s, i), (l.state = e.memoizedState)),
      typeof n.getDerivedStateFromProps == "function" ||
        typeof l.getSnapshotBeforeUpdate == "function" ||
        (typeof l.UNSAFE_componentWillMount != "function" &&
          typeof l.componentWillMount != "function") ||
        ((s = l.state),
        typeof l.componentWillMount == "function" && l.componentWillMount(),
        typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(),
        s !== l.state && _u.enqueueReplaceState(l, l.state, null),
        el(e, i, l, a),
        tl(),
        (l.state = e.memoizedState)),
      typeof l.componentDidMount == "function" && (e.flags |= 4194308),
      (i = !0));
  } else if (t === null) {
    l = e.stateNode;
    var r = e.memoizedProps,
      o = si(n, r);
    l.props = o;
    var u = l.context,
      c = n.contextType;
    ((s = zi), typeof c == "object" && c !== null && (s = zt(c)));
    var d = n.getDerivedStateFromProps;
    ((c = typeof d == "function" || typeof l.getSnapshotBeforeUpdate == "function"),
      (r = e.pendingProps !== r),
      c ||
        (typeof l.UNSAFE_componentWillReceiveProps != "function" &&
          typeof l.componentWillReceiveProps != "function") ||
        ((r || u !== s) && nh(e, l, i, s)),
      (fn = !1));
    var f = e.memoizedState;
    ((l.state = f),
      el(e, i, l, a),
      tl(),
      (u = e.memoizedState),
      r || f !== u || fn
        ? (typeof d == "function" && (bo(e, n, d, i), (u = e.memoizedState)),
          (o = fn || eh(e, n, o, i, f, u, s))
            ? (c ||
                (typeof l.UNSAFE_componentWillMount != "function" &&
                  typeof l.componentWillMount != "function") ||
                (typeof l.componentWillMount == "function" && l.componentWillMount(),
                typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount()),
              typeof l.componentDidMount == "function" && (e.flags |= 4194308))
            : (typeof l.componentDidMount == "function" && (e.flags |= 4194308),
              (e.memoizedProps = i),
              (e.memoizedState = u)),
          (l.props = i),
          (l.state = u),
          (l.context = s),
          (i = o))
        : (typeof l.componentDidMount == "function" && (e.flags |= 4194308), (i = !1)));
  } else {
    ((l = e.stateNode),
      Gu(t, e),
      (s = e.memoizedProps),
      (c = si(n, s)),
      (l.props = c),
      (d = e.pendingProps),
      (f = l.context),
      (u = n.contextType),
      (o = zi),
      typeof u == "object" && u !== null && (o = zt(u)),
      (r = n.getDerivedStateFromProps),
      (u = typeof r == "function" || typeof l.getSnapshotBeforeUpdate == "function") ||
        (typeof l.UNSAFE_componentWillReceiveProps != "function" &&
          typeof l.componentWillReceiveProps != "function") ||
        ((s !== d || f !== o) && nh(e, l, i, o)),
      (fn = !1),
      (f = e.memoizedState),
      (l.state = f),
      el(e, i, l, a),
      tl());
    var h = e.memoizedState;
    s !== d || f !== h || fn || (t !== null && t.dependencies !== null && ar(t.dependencies))
      ? (typeof r == "function" && (bo(e, n, r, i), (h = e.memoizedState)),
        (c =
          fn ||
          eh(e, n, c, i, f, h, o) ||
          (t !== null && t.dependencies !== null && ar(t.dependencies)))
          ? (u ||
              (typeof l.UNSAFE_componentWillUpdate != "function" &&
                typeof l.componentWillUpdate != "function") ||
              (typeof l.componentWillUpdate == "function" && l.componentWillUpdate(i, h, o),
              typeof l.UNSAFE_componentWillUpdate == "function" &&
                l.UNSAFE_componentWillUpdate(i, h, o)),
            typeof l.componentDidUpdate == "function" && (e.flags |= 4),
            typeof l.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024))
          : (typeof l.componentDidUpdate != "function" ||
              (s === t.memoizedProps && f === t.memoizedState) ||
              (e.flags |= 4),
            typeof l.getSnapshotBeforeUpdate != "function" ||
              (s === t.memoizedProps && f === t.memoizedState) ||
              (e.flags |= 1024),
            (e.memoizedProps = i),
            (e.memoizedState = h)),
        (l.props = i),
        (l.state = h),
        (l.context = o),
        (i = c))
      : (typeof l.componentDidUpdate != "function" ||
          (s === t.memoizedProps && f === t.memoizedState) ||
          (e.flags |= 4),
        typeof l.getSnapshotBeforeUpdate != "function" ||
          (s === t.memoizedProps && f === t.memoizedState) ||
          (e.flags |= 1024),
        (i = !1));
  }
  return (
    (l = i),
    Wa(t, e),
    (i = (e.flags & 128) !== 0),
    l || i
      ? ((l = e.stateNode),
        (n = i && typeof n.getDerivedStateFromError != "function" ? null : l.render()),
        (e.flags |= 1),
        t !== null && i
          ? ((e.child = ai(e, t.child, null, a)), (e.child = ai(e, null, n, a)))
          : Dt(t, e, n, a),
        (e.memoizedState = l.state),
        (t = e.child))
      : (t = We(t, e, a)),
    t
  );
}
function uh(t, e, n, i) {
  return (Hl(), (e.flags |= 256), Dt(t, e, n, i), e.child);
}
var So = { dehydrated: null, treeContext: null, retryLane: 0 };
function xo(t) {
  return { baseLanes: t, cachePool: z0() };
}
function To(t, e, n) {
  return ((t = t !== null ? t.childLanes & ~n : 0), e && (t |= ue), t);
}
function vg(t, e, n) {
  var i = e.pendingProps,
    a = !1,
    l = (e.flags & 128) !== 0,
    s;
  if (
    ((s = l) || (s = t !== null && t.memoizedState === null ? !1 : (vt.current & 2) !== 0),
    s && ((a = !0), (e.flags &= -129)),
    (s = (e.flags & 32) !== 0),
    (e.flags &= -33),
    t === null)
  ) {
    if (X) {
      if ((a ? dn(e) : hn(), X)) {
        var r = wt,
          o;
        if ((o = r)) {
          t: {
            for (o = r, r = Te; o.nodeType !== 8; ) {
              if (!r) {
                r = null;
                break t;
              }
              if (((o = ye(o.nextSibling)), o === null)) {
                r = null;
                break t;
              }
            }
            r = o;
          }
          r !== null
            ? ((e.memoizedState = {
                dehydrated: r,
                treeContext: Fn !== null ? { id: ke, overflow: Xe } : null,
                retryLane: 536870912,
              }),
              (o = oe(18, null, null, 0)),
              (o.stateNode = r),
              (o.return = e),
              (e.child = o),
              (Bt = e),
              (wt = null),
              (o = !0))
            : (o = !1);
        }
        o || ii(e);
      }
      if (((r = e.memoizedState), r !== null && ((r = r.dehydrated), r !== null)))
        return (r.data === "$!" ? (e.lanes = 16) : (e.lanes = 536870912), null);
      Ke(e);
    }
    return (
      (r = i.children),
      (i = i.fallback),
      a
        ? (hn(),
          (a = e.mode),
          (r = ju({ mode: "hidden", children: r }, a)),
          (i = Jn(i, a, n, null)),
          (r.return = e),
          (i.return = e),
          (r.sibling = i),
          (e.child = r),
          (a = e.child),
          (a.memoizedState = xo(n)),
          (a.childLanes = To(t, s, n)),
          (e.memoizedState = So),
          i)
        : (dn(e), Nu(e, r))
    );
  }
  if (((o = t.memoizedState), o !== null && ((r = o.dehydrated), r !== null))) {
    if (l)
      e.flags & 256
        ? (dn(e), (e.flags &= -257), (e = Ao(t, e, n)))
        : e.memoizedState !== null
          ? (hn(), (e.child = t.child), (e.flags |= 128), (e = null))
          : (hn(),
            (a = i.fallback),
            (r = e.mode),
            (i = ju({ mode: "visible", children: i.children }, r)),
            (a = Jn(a, r, n, null)),
            (a.flags |= 2),
            (i.return = e),
            (a.return = e),
            (i.sibling = a),
            (e.child = i),
            ai(e, t.child, null, n),
            (i = e.child),
            (i.memoizedState = xo(n)),
            (i.childLanes = To(t, s, n)),
            (e.memoizedState = So),
            (e = a));
    else if ((dn(e), r.data === "$!")) {
      if (((s = r.nextSibling && r.nextSibling.dataset), s)) var u = s.dgst;
      ((s = u),
        (i = Error(A(419))),
        (i.stack = ""),
        (i.digest = s),
        gl({ value: i, source: null, stack: null }),
        (e = Ao(t, e, n)));
    } else if ((At || Gl(t, e, n, !1), (s = (n & t.childLanes) !== 0), At || s)) {
      if (((s = J), s !== null)) {
        if (((i = n & -n), (i & 42) !== 0)) i = 1;
        else
          switch (i) {
            case 2:
              i = 1;
              break;
            case 8:
              i = 4;
              break;
            case 32:
              i = 16;
              break;
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
              i = 64;
              break;
            case 268435456:
              i = 134217728;
              break;
            default:
              i = 0;
          }
        if (((i = (i & (s.suspendedLanes | n)) !== 0 ? 0 : i), i !== 0 && i !== o.retryLane))
          throw ((o.retryLane = i), wn(t, i), jt(s, t, i), pg);
      }
      (r.data === "$?" || Fu(), (e = Ao(t, e, n)));
    } else
      r.data === "$?"
        ? ((e.flags |= 128),
          (e.child = t.child),
          (e = D2.bind(null, t)),
          (r._reactRetry = e),
          (e = null))
        : ((t = o.treeContext),
          (wt = ye(r.nextSibling)),
          (Bt = e),
          (X = !0),
          (ge = null),
          (Te = !1),
          t !== null &&
            ((ae[le++] = ke),
            (ae[le++] = Xe),
            (ae[le++] = Fn),
            (ke = t.id),
            (Xe = t.overflow),
            (Fn = e)),
          (e = Nu(e, i.children)),
          (e.flags |= 4096));
    return e;
  }
  return a
    ? (hn(),
      (a = i.fallback),
      (r = e.mode),
      (o = t.child),
      (u = o.sibling),
      (i = xn(o, { mode: "hidden", children: i.children })),
      (i.subtreeFlags = o.subtreeFlags & 31457280),
      u !== null ? (a = xn(u, a)) : ((a = Jn(a, r, n, null)), (a.flags |= 2)),
      (a.return = e),
      (i.return = e),
      (i.sibling = a),
      (e.child = i),
      (i = a),
      (a = e.child),
      (r = t.child.memoizedState),
      r === null
        ? (r = xo(n))
        : ((o = r.cachePool),
          o !== null
            ? ((u = yt._currentValue), (o = o.parent !== u ? { parent: u, pool: u } : o))
            : (o = z0()),
          (r = { baseLanes: r.baseLanes | n, cachePool: o })),
      (a.memoizedState = r),
      (a.childLanes = To(t, s, n)),
      (e.memoizedState = So),
      i)
    : (dn(e),
      (n = t.child),
      (t = n.sibling),
      (n = xn(n, { mode: "visible", children: i.children })),
      (n.return = e),
      (n.sibling = null),
      t !== null &&
        ((s = e.deletions), s === null ? ((e.deletions = [t]), (e.flags |= 16)) : s.push(t)),
      (e.child = n),
      (e.memoizedState = null),
      n);
}
function Nu(t, e) {
  return ((e = ju({ mode: "visible", children: e }, t.mode)), (e.return = t), (t.child = e));
}
function ju(t, e) {
  return Yg(t, e, 0, null);
}
function Ao(t, e, n) {
  return (
    ai(e, t.child, null, n),
    (t = Nu(e, e.pendingProps.children)),
    (t.flags |= 2),
    (e.memoizedState = null),
    t
  );
}
function ch(t, e, n) {
  t.lanes |= e;
  var i = t.alternate;
  (i !== null && (i.lanes |= e), Lu(t.return, e, n));
}
function Eo(t, e, n, i, a) {
  var l = t.memoizedState;
  l === null
    ? (t.memoizedState = {
        isBackwards: e,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: n,
        tailMode: a,
      })
    : ((l.isBackwards = e),
      (l.rendering = null),
      (l.renderingStartTime = 0),
      (l.last = i),
      (l.tail = n),
      (l.tailMode = a));
}
function bg(t, e, n) {
  var i = e.pendingProps,
    a = i.revealOrder,
    l = i.tail;
  if ((Dt(t, e, i.children, n), (i = vt.current), (i & 2) !== 0))
    ((i = (i & 1) | 2), (e.flags |= 128));
  else {
    if (t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && ch(t, n, e);
        else if (t.tag === 19) ch(t, n, e);
        else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) break t;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    i &= 1;
  }
  switch ((nt(vt, i), a)) {
    case "forwards":
      for (n = e.child, a = null; n !== null; )
        ((t = n.alternate), t !== null && Is(t) === null && (a = n), (n = n.sibling));
      ((n = a),
        n === null ? ((a = e.child), (e.child = null)) : ((a = n.sibling), (n.sibling = null)),
        Eo(e, !1, a, n, l));
      break;
    case "backwards":
      for (n = null, a = e.child, e.child = null; a !== null; ) {
        if (((t = a.alternate), t !== null && Is(t) === null)) {
          e.child = a;
          break;
        }
        ((t = a.sibling), (a.sibling = n), (n = a), (a = t));
      }
      Eo(e, !0, n, null, l);
      break;
    case "together":
      Eo(e, !1, null, null, void 0);
      break;
    default:
      e.memoizedState = null;
  }
  return e.child;
}
function We(t, e, n) {
  if ((t !== null && (e.dependencies = t.dependencies), (On |= e.lanes), (n & e.childLanes) === 0))
    if (t !== null) {
      if ((Gl(t, e, n, !1), (n & e.childLanes) === 0)) return null;
    } else return null;
  if (t !== null && e.child !== t.child) throw Error(A(153));
  if (e.child !== null) {
    for (t = e.child, n = xn(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; )
      ((t = t.sibling), (n = n.sibling = xn(t, t.pendingProps)), (n.return = e));
    n.sibling = null;
  }
  return e.child;
}
function hf(t, e) {
  return (t.lanes & e) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && ar(t)));
}
function d2(t, e, n) {
  switch (e.tag) {
    case 3:
      (Xs(e, e.stateNode.containerInfo), mn(e, yt, t.memoizedState.cache), Hl());
      break;
    case 27:
    case 5:
      yu(e);
      break;
    case 4:
      Xs(e, e.stateNode.containerInfo);
      break;
    case 10:
      mn(e, e.type, e.memoizedProps.value);
      break;
    case 13:
      var i = e.memoizedState;
      if (i !== null)
        return i.dehydrated !== null
          ? (dn(e), (e.flags |= 128), null)
          : (n & e.child.childLanes) !== 0
            ? vg(t, e, n)
            : (dn(e), (t = We(t, e, n)), t !== null ? t.sibling : null);
      dn(e);
      break;
    case 19:
      var a = (t.flags & 128) !== 0;
      if (
        ((i = (n & e.childLanes) !== 0), i || (Gl(t, e, n, !1), (i = (n & e.childLanes) !== 0)), a)
      ) {
        if (i) return bg(t, e, n);
        e.flags |= 128;
      }
      if (
        ((a = e.memoizedState),
        a !== null && ((a.rendering = null), (a.tail = null), (a.lastEffect = null)),
        nt(vt, vt.current),
        i)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((e.lanes = 0), yg(t, e, n));
    case 24:
      mn(e, yt, t.memoizedState.cache);
  }
  return We(t, e, n);
}
function Sg(t, e, n) {
  if (t !== null)
    if (t.memoizedProps !== e.pendingProps) At = !0;
    else {
      if (!hf(t, n) && (e.flags & 128) === 0) return ((At = !1), d2(t, e, n));
      At = (t.flags & 131072) !== 0;
    }
  else ((At = !1), X && (e.flags & 1048576) !== 0 && M0(e, Js, e.index));
  switch (((e.lanes = 0), e.tag)) {
    case 16:
      t: {
        t = e.pendingProps;
        var i = e.elementType,
          a = i._init;
        if (((i = a(i._payload)), (e.type = i), typeof i == "function"))
          yf(i)
            ? ((t = si(i, t)), (e.tag = 1), (e = oh(null, e, i, t, n)))
            : ((e.tag = 0), (e = Uu(null, e, i, t, n)));
        else {
          if (i != null) {
            if (((a = i.$$typeof), a === jc)) {
              ((e.tag = 11), (e = ah(null, e, i, t, n)));
              break t;
            } else if (a === Hc) {
              ((e.tag = 14), (e = lh(null, e, i, t, n)));
              break t;
            }
          }
          throw ((e = pu(i) || i), Error(A(306, e, "")));
        }
      }
      return e;
    case 0:
      return Uu(t, e, e.type, e.pendingProps, n);
    case 1:
      return ((i = e.type), (a = si(i, e.pendingProps)), oh(t, e, i, a, n));
    case 3:
      t: {
        if ((Xs(e, e.stateNode.containerInfo), t === null)) throw Error(A(387));
        var l = e.pendingProps;
        ((a = e.memoizedState), (i = a.element), Gu(t, e), el(e, l, null, n));
        var s = e.memoizedState;
        if (
          ((l = s.cache),
          mn(e, yt, l),
          l !== a.cache && Yu(e, [yt], n, !0),
          tl(),
          (l = s.element),
          a.isDehydrated)
        )
          if (
            ((a = { element: l, isDehydrated: !1, cache: s.cache }),
            (e.updateQueue.baseState = a),
            (e.memoizedState = a),
            e.flags & 256)
          ) {
            e = uh(t, e, l, n);
            break t;
          } else if (l !== i) {
            ((i = re(Error(A(424)), e)), gl(i), (e = uh(t, e, l, n)));
            break t;
          } else
            for (
              wt = ye(e.stateNode.containerInfo.firstChild),
                Bt = e,
                X = !0,
                ge = null,
                Te = !0,
                n = R0(e, null, l, n),
                e.child = n;
              n;

            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((Hl(), l === i)) {
            e = We(t, e, n);
            break t;
          }
          Dt(t, e, l, n);
        }
        e = e.child;
      }
      return e;
    case 26:
      return (
        Wa(t, e),
        t === null
          ? (n = Ch(e.type, null, e.pendingProps, null))
            ? (e.memoizedState = n)
            : X ||
              ((n = e.type),
              (t = e.pendingProps),
              (i = fr(vn.current).createElement(n)),
              (i[Ot] = e),
              (i[Gt] = t),
              Ct(i, n, t),
              Tt(i),
              (e.stateNode = i))
          : (e.memoizedState = Ch(e.type, t.memoizedProps, e.pendingProps, t.memoizedState)),
        null
      );
    case 27:
      return (
        yu(e),
        t === null &&
          X &&
          ((i = e.stateNode = ay(e.type, e.pendingProps, vn.current)),
          (Bt = e),
          (Te = !0),
          (wt = ye(i.firstChild))),
        (i = e.pendingProps.children),
        t !== null || X ? Dt(t, e, i, n) : (e.child = ai(e, null, i, n)),
        Wa(t, e),
        e.child
      );
    case 5:
      return (
        t === null &&
          X &&
          ((a = i = wt) &&
            ((i = q2(i, e.type, e.pendingProps, Te)),
            i !== null
              ? ((e.stateNode = i), (Bt = e), (wt = ye(i.firstChild)), (Te = !1), (a = !0))
              : (a = !1)),
          a || ii(e)),
        yu(e),
        (a = e.type),
        (l = e.pendingProps),
        (s = t !== null ? t.memoizedProps : null),
        (i = l.children),
        tc(a, l) ? (i = null) : s !== null && tc(a, s) && (e.flags |= 32),
        e.memoizedState !== null && ((a = ef(t, e, l2, null, null, n)), (Tl._currentValue = a)),
        Wa(t, e),
        Dt(t, e, i, n),
        e.child
      );
    case 6:
      return (
        t === null &&
          X &&
          ((t = n = wt) &&
            ((n = k2(n, e.pendingProps, Te)),
            n !== null ? ((e.stateNode = n), (Bt = e), (wt = null), (t = !0)) : (t = !1)),
          t || ii(e)),
        null
      );
    case 13:
      return vg(t, e, n);
    case 4:
      return (
        Xs(e, e.stateNode.containerInfo),
        (i = e.pendingProps),
        t === null ? (e.child = ai(e, null, i, n)) : Dt(t, e, i, n),
        e.child
      );
    case 11:
      return ah(t, e, e.type, e.pendingProps, n);
    case 7:
      return (Dt(t, e, e.pendingProps, n), e.child);
    case 8:
      return (Dt(t, e, e.pendingProps.children, n), e.child);
    case 12:
      return (Dt(t, e, e.pendingProps.children, n), e.child);
    case 10:
      return ((i = e.pendingProps), mn(e, e.type, i.value), Dt(t, e, i.children, n), e.child);
    case 9:
      return (
        (a = e.type._context),
        (i = e.pendingProps.children),
        ri(e),
        (a = zt(a)),
        (i = i(a)),
        (e.flags |= 1),
        Dt(t, e, i, n),
        e.child
      );
    case 14:
      return lh(t, e, e.type, e.pendingProps, n);
    case 15:
      return gg(t, e, e.type, e.pendingProps, n);
    case 19:
      return bg(t, e, n);
    case 22:
      return yg(t, e, n);
    case 24:
      return (
        ri(e),
        (i = zt(yt)),
        t === null
          ? ((a = Ic()),
            a === null &&
              ((a = J),
              (l = Wc()),
              (a.pooledCache = l),
              l.refCount++,
              l !== null && (a.pooledCacheLanes |= n),
              (a = l)),
            (e.memoizedState = { parent: i, cache: a }),
            mf(e),
            mn(e, yt, a))
          : ((t.lanes & n) !== 0 && (Gu(t, e), el(e, null, null, n), tl()),
            (a = t.memoizedState),
            (l = e.memoizedState),
            a.parent !== i
              ? ((a = { parent: i, cache: i }),
                (e.memoizedState = a),
                e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = a),
                mn(e, yt, i))
              : ((i = l.cache), mn(e, yt, i), i !== a.cache && Yu(e, [yt], n, !0))),
        Dt(t, e, e.pendingProps.children, n),
        e.child
      );
    case 29:
      throw e.pendingProps;
  }
  throw Error(A(156, e.tag));
}
var Hu = Oe(null),
  hi = null,
  Ze = null;
function mn(t, e, n) {
  (nt(Hu, e._currentValue), (e._currentValue = n));
}
function Qe(t) {
  ((t._currentValue = Hu.current), Et(Hu));
}
function Lu(t, e, n) {
  for (; t !== null; ) {
    var i = t.alternate;
    if (
      ((t.childLanes & e) !== e
        ? ((t.childLanes |= e), i !== null && (i.childLanes |= e))
        : i !== null && (i.childLanes & e) !== e && (i.childLanes |= e),
      t === n)
    )
      break;
    t = t.return;
  }
}
function Yu(t, e, n, i) {
  var a = t.child;
  for (a !== null && (a.return = t); a !== null; ) {
    var l = a.dependencies;
    if (l !== null) {
      var s = a.child;
      l = l.firstContext;
      t: for (; l !== null; ) {
        var r = l;
        l = a;
        for (var o = 0; o < e.length; o++)
          if (r.context === e[o]) {
            ((l.lanes |= n),
              (r = l.alternate),
              r !== null && (r.lanes |= n),
              Lu(l.return, n, t),
              i || (s = null));
            break t;
          }
        l = r.next;
      }
    } else if (a.tag === 18) {
      if (((s = a.return), s === null)) throw Error(A(341));
      ((s.lanes |= n), (l = s.alternate), l !== null && (l.lanes |= n), Lu(s, n, t), (s = null));
    } else s = a.child;
    if (s !== null) s.return = a;
    else
      for (s = a; s !== null; ) {
        if (s === t) {
          s = null;
          break;
        }
        if (((a = s.sibling), a !== null)) {
          ((a.return = s.return), (s = a));
          break;
        }
        s = s.return;
      }
    a = s;
  }
}
function Gl(t, e, n, i) {
  t = null;
  for (var a = e, l = !1; a !== null; ) {
    if (!l) {
      if ((a.flags & 524288) !== 0) l = !0;
      else if ((a.flags & 262144) !== 0) break;
    }
    if (a.tag === 10) {
      var s = a.alternate;
      if (s === null) throw Error(A(387));
      if (((s = s.memoizedProps), s !== null)) {
        var r = a.type;
        Jt(a.pendingProps.value, s.value) || (t !== null ? t.push(r) : (t = [r]));
      }
    } else if (a === ks.current) {
      if (((s = a.alternate), s === null)) throw Error(A(387));
      s.memoizedState.memoizedState !== a.memoizedState.memoizedState &&
        (t !== null ? t.push(Tl) : (t = [Tl]));
    }
    a = a.return;
  }
  (t !== null && Yu(e, t, n, i), (e.flags |= 262144));
}
function ar(t) {
  for (t = t.firstContext; t !== null; ) {
    if (!Jt(t.context._currentValue, t.memoizedValue)) return !0;
    t = t.next;
  }
  return !1;
}
function ri(t) {
  ((hi = t), (Ze = null), (t = t.dependencies), t !== null && (t.firstContext = null));
}
function zt(t) {
  return xg(hi, t);
}
function os(t, e) {
  return (hi === null && ri(t), xg(t, e));
}
function xg(t, e) {
  var n = e._currentValue;
  if (((e = { context: e, memoizedValue: n, next: null }), Ze === null)) {
    if (t === null) throw Error(A(308));
    ((Ze = e), (t.dependencies = { lanes: 0, firstContext: e }), (t.flags |= 524288));
  } else Ze = Ze.next = e;
  return n;
}
var fn = !1;
function mf(t) {
  t.updateQueue = {
    baseState: t.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null,
  };
}
function Gu(t, e) {
  ((t = t.updateQueue),
    e.updateQueue === t &&
      (e.updateQueue = {
        baseState: t.baseState,
        firstBaseUpdate: t.firstBaseUpdate,
        lastBaseUpdate: t.lastBaseUpdate,
        shared: t.shared,
        callbacks: null,
      }));
}
function bn(t) {
  return { lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Sn(t, e, n) {
  var i = t.updateQueue;
  if (i === null) return null;
  if (((i = i.shared), (rt & 2) !== 0)) {
    var a = i.pending;
    return (
      a === null ? (e.next = e) : ((e.next = a.next), (a.next = e)),
      (i.pending = e),
      (e = Fs(t)),
      E0(t, null, n),
      e
    );
  }
  return (Ur(t, i, e, n), Fs(t));
}
function Ia(t, e, n) {
  if (((e = e.updateQueue), e !== null && ((e = e.shared), (n & 4194176) !== 0))) {
    var i = e.lanes;
    ((i &= t.pendingLanes), (n |= i), (e.lanes = n), Jp(t, n));
  }
}
function Mo(t, e) {
  var n = t.updateQueue,
    i = t.alternate;
  if (i !== null && ((i = i.updateQueue), n === i)) {
    var a = null,
      l = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var s = { lane: n.lane, tag: n.tag, payload: n.payload, callback: null, next: null };
        (l === null ? (a = l = s) : (l = l.next = s), (n = n.next));
      } while (n !== null);
      l === null ? (a = l = e) : (l = l.next = e);
    } else a = l = e;
    ((n = {
      baseState: i.baseState,
      firstBaseUpdate: a,
      lastBaseUpdate: l,
      shared: i.shared,
      callbacks: i.callbacks,
    }),
      (t.updateQueue = n));
    return;
  }
  ((t = n.lastBaseUpdate),
    t === null ? (n.firstBaseUpdate = e) : (t.next = e),
    (n.lastBaseUpdate = e));
}
var qu = !1;
function tl() {
  if (qu) {
    var t = Ki;
    if (t !== null) throw t;
  }
}
function el(t, e, n, i) {
  qu = !1;
  var a = t.updateQueue;
  fn = !1;
  var l = a.firstBaseUpdate,
    s = a.lastBaseUpdate,
    r = a.shared.pending;
  if (r !== null) {
    a.shared.pending = null;
    var o = r,
      u = o.next;
    ((o.next = null), s === null ? (l = u) : (s.next = u), (s = o));
    var c = t.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (r = c.lastBaseUpdate),
      r !== s && (r === null ? (c.firstBaseUpdate = u) : (r.next = u), (c.lastBaseUpdate = o)));
  }
  if (l !== null) {
    var d = a.baseState;
    ((s = 0), (c = u = o = null), (r = l));
    do {
      var f = r.lane & -536870913,
        h = f !== r.lane;
      if (h ? (k & f) === f : (i & f) === f) {
        (f !== 0 && f === Ii && (qu = !0),
          c !== null &&
            (c = c.next = { lane: 0, tag: r.tag, payload: r.payload, callback: null, next: null }));
        t: {
          var y = t,
            b = r;
          f = e;
          var E = n;
          switch (b.tag) {
            case 1:
              if (((y = b.payload), typeof y == "function")) {
                d = y.call(E, d, f);
                break t;
              }
              d = y;
              break t;
            case 3:
              y.flags = (y.flags & -65537) | 128;
            case 0:
              if (((y = b.payload), (f = typeof y == "function" ? y.call(E, d, f) : y), f == null))
                break t;
              d = et({}, d, f);
              break t;
            case 2:
              fn = !0;
          }
        }
        ((f = r.callback),
          f !== null &&
            ((t.flags |= 64),
            h && (t.flags |= 8192),
            (h = a.callbacks),
            h === null ? (a.callbacks = [f]) : h.push(f)));
      } else
        ((h = { lane: f, tag: r.tag, payload: r.payload, callback: r.callback, next: null }),
          c === null ? ((u = c = h), (o = d)) : (c = c.next = h),
          (s |= f));
      if (((r = r.next), r === null)) {
        if (((r = a.shared.pending), r === null)) break;
        ((h = r), (r = h.next), (h.next = null), (a.lastBaseUpdate = h), (a.shared.pending = null));
      }
    } while (1);
    (c === null && (o = d),
      (a.baseState = o),
      (a.firstBaseUpdate = u),
      (a.lastBaseUpdate = c),
      l === null && (a.shared.lanes = 0),
      (On |= s),
      (t.lanes = s),
      (t.memoizedState = d));
  }
}
function Tg(t, e) {
  if (typeof t != "function") throw Error(A(191, t));
  t.call(e);
}
function Ag(t, e) {
  var n = t.callbacks;
  if (n !== null) for (t.callbacks = null, t = 0; t < n.length; t++) Tg(n[t], e);
}
function ql(t, e) {
  try {
    var n = e.updateQueue,
      i = n !== null ? n.lastEffect : null;
    if (i !== null) {
      var a = i.next;
      n = a;
      do {
        if ((n.tag & t) === t) {
          i = void 0;
          var l = n.create,
            s = n.inst;
          ((i = l()), (s.destroy = i));
        }
        n = n.next;
      } while (n !== a);
    }
  } catch (r) {
    F(e, e.return, r);
  }
}
function Rn(t, e, n) {
  try {
    var i = e.updateQueue,
      a = i !== null ? i.lastEffect : null;
    if (a !== null) {
      var l = a.next;
      i = l;
      do {
        if ((i.tag & t) === t) {
          var s = i.inst,
            r = s.destroy;
          if (r !== void 0) {
            ((s.destroy = void 0), (a = e));
            var o = n;
            try {
              r();
            } catch (u) {
              F(a, o, u);
            }
          }
        }
        i = i.next;
      } while (i !== l);
    }
  } catch (u) {
    F(e, e.return, u);
  }
}
function Eg(t) {
  var e = t.updateQueue;
  if (e !== null) {
    var n = t.stateNode;
    try {
      Ag(e, n);
    } catch (i) {
      F(t, t.return, i);
    }
  }
}
function Mg(t, e, n) {
  ((n.props = si(t.type, t.memoizedProps)), (n.state = t.memoizedState));
  try {
    n.componentWillUnmount();
  } catch (i) {
    F(t, e, i);
  }
}
function Xn(t, e) {
  try {
    var n = t.ref;
    if (n !== null) {
      var i = t.stateNode;
      switch (t.tag) {
        case 26:
        case 27:
        case 5:
          var a = i;
          break;
        default:
          a = i;
      }
      typeof n == "function" ? (t.refCleanup = n(a)) : (n.current = a);
    }
  } catch (l) {
    F(t, e, l);
  }
}
function Zt(t, e) {
  var n = t.ref,
    i = t.refCleanup;
  if (n !== null)
    if (typeof i == "function")
      try {
        i();
      } catch (a) {
        F(t, e, a);
      } finally {
        ((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
      }
    else if (typeof n == "function")
      try {
        n(null);
      } catch (a) {
        F(t, e, a);
      }
    else n.current = null;
}
function Dg(t) {
  var e = t.type,
    n = t.memoizedProps,
    i = t.stateNode;
  try {
    t: switch (e) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        n.autoFocus && i.focus();
        break t;
      case "img":
        n.src ? (i.src = n.src) : n.srcSet && (i.srcset = n.srcSet);
    }
  } catch (a) {
    F(t, t.return, a);
  }
}
function fh(t, e, n) {
  try {
    var i = t.stateNode;
    (j2(i, t.type, n, e), (i[Gt] = e));
  } catch (a) {
    F(t, t.return, a);
  }
}
function wg(t) {
  return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 || t.tag === 4;
}
function Do(t) {
  t: for (;;) {
    for (; t.sibling === null; ) {
      if (t.return === null || wg(t.return)) return null;
      t = t.return;
    }
    for (
      t.sibling.return = t.return, t = t.sibling;
      t.tag !== 5 && t.tag !== 6 && t.tag !== 27 && t.tag !== 18;

    ) {
      if (t.flags & 2 || t.child === null || t.tag === 4) continue t;
      ((t.child.return = t), (t = t.child));
    }
    if (!(t.flags & 2)) return t.stateNode;
  }
}
function ku(t, e, n) {
  var i = t.tag;
  if (i === 5 || i === 6)
    ((t = t.stateNode),
      e
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(t, e)
          : n.insertBefore(t, e)
        : (n.nodeType === 8
            ? ((e = n.parentNode), e.insertBefore(t, n))
            : ((e = n), e.appendChild(t)),
          (n = n._reactRootContainer),
          n != null || e.onclick !== null || (e.onclick = qr)));
  else if (i !== 4 && i !== 27 && ((t = t.child), t !== null))
    for (ku(t, e, n), t = t.sibling; t !== null; ) (ku(t, e, n), (t = t.sibling));
}
function lr(t, e, n) {
  var i = t.tag;
  if (i === 5 || i === 6) ((t = t.stateNode), e ? n.insertBefore(t, e) : n.appendChild(t));
  else if (i !== 4 && i !== 27 && ((t = t.child), t !== null))
    for (lr(t, e, n), t = t.sibling; t !== null; ) (lr(t, e, n), (t = t.sibling));
}
var Le = !1,
  ot = !1,
  wo = !1,
  dh = typeof WeakSet == "function" ? WeakSet : Set,
  St = null,
  hh = !1;
function h2(t, e) {
  if (((t = t.containerInfo), (Wu = pr), (t = y0(t)), Zc(t))) {
    if ("selectionStart" in t) var n = { start: t.selectionStart, end: t.selectionEnd };
    else
      t: {
        n = ((n = t.ownerDocument) && n.defaultView) || window;
        var i = n.getSelection && n.getSelection();
        if (i && i.rangeCount !== 0) {
          n = i.anchorNode;
          var a = i.anchorOffset,
            l = i.focusNode;
          i = i.focusOffset;
          try {
            (n.nodeType, l.nodeType);
          } catch {
            n = null;
            break t;
          }
          var s = 0,
            r = -1,
            o = -1,
            u = 0,
            c = 0,
            d = t,
            f = null;
          e: for (;;) {
            for (
              var h;
              d !== n || (a !== 0 && d.nodeType !== 3) || (r = s + a),
                d !== l || (i !== 0 && d.nodeType !== 3) || (o = s + i),
                d.nodeType === 3 && (s += d.nodeValue.length),
                (h = d.firstChild) !== null;

            )
              ((f = d), (d = h));
            for (;;) {
              if (d === t) break e;
              if (
                (f === n && ++u === a && (r = s),
                f === l && ++c === i && (o = s),
                (h = d.nextSibling) !== null)
              )
                break;
              ((d = f), (f = d.parentNode));
            }
            d = h;
          }
          n = r === -1 || o === -1 ? null : { start: r, end: o };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Iu = { focusedElem: t, selectionRange: n }, pr = !1, St = e; St !== null; )
    if (((e = St), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null))
      ((t.return = e), (St = t));
    else
      for (; St !== null; ) {
        switch (((e = St), (l = e.alternate), (t = e.flags), e.tag)) {
          case 0:
            break;
          case 11:
          case 15:
            break;
          case 1:
            if ((t & 1024) !== 0 && l !== null) {
              ((t = void 0),
                (n = e),
                (a = l.memoizedProps),
                (l = l.memoizedState),
                (i = n.stateNode));
              try {
                var y = si(n.type, a, n.elementType === n.type);
                ((t = i.getSnapshotBeforeUpdate(y, l)),
                  (i.__reactInternalSnapshotBeforeUpdate = t));
              } catch (b) {
                F(n, n.return, b);
              }
            }
            break;
          case 3:
            if ((t & 1024) !== 0) {
              if (((t = e.stateNode.containerInfo), (n = t.nodeType), n === 9)) ec(t);
              else if (n === 1)
                switch (t.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    ec(t);
                    break;
                  default:
                    t.textContent = "";
                }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          default:
            if ((t & 1024) !== 0) throw Error(A(163));
        }
        if (((t = e.sibling), t !== null)) {
          ((t.return = e.return), (St = t));
          break;
        }
        St = e.return;
      }
  return ((y = hh), (hh = !1), y);
}
function Cg(t, e, n) {
  var i = n.flags;
  switch (n.tag) {
    case 0:
    case 11:
    case 15:
      (Ne(t, n), i & 4 && ql(5, n));
      break;
    case 1:
      if ((Ne(t, n), i & 4))
        if (((t = n.stateNode), e === null))
          try {
            t.componentDidMount();
          } catch (r) {
            F(n, n.return, r);
          }
        else {
          var a = si(n.type, e.memoizedProps);
          e = e.memoizedState;
          try {
            t.componentDidUpdate(a, e, t.__reactInternalSnapshotBeforeUpdate);
          } catch (r) {
            F(n, n.return, r);
          }
        }
      (i & 64 && Eg(n), i & 512 && Xn(n, n.return));
      break;
    case 3:
      if ((Ne(t, n), i & 64 && ((i = n.updateQueue), i !== null))) {
        if (((t = null), n.child !== null))
          switch (n.child.tag) {
            case 27:
            case 5:
              t = n.child.stateNode;
              break;
            case 1:
              t = n.child.stateNode;
          }
        try {
          Ag(i, t);
        } catch (r) {
          F(n, n.return, r);
        }
      }
      break;
    case 26:
      (Ne(t, n), i & 512 && Xn(n, n.return));
      break;
    case 27:
    case 5:
      (Ne(t, n), e === null && i & 4 && Dg(n), i & 512 && Xn(n, n.return));
      break;
    case 12:
      Ne(t, n);
      break;
    case 13:
      (Ne(t, n), i & 4 && zg(t, n));
      break;
    case 22:
      if (((a = n.memoizedState !== null || Le), !a)) {
        e = (e !== null && e.memoizedState !== null) || ot;
        var l = Le,
          s = ot;
        ((Le = a),
          (ot = e) && !s ? rn(t, n, (n.subtreeFlags & 8772) !== 0) : Ne(t, n),
          (Le = l),
          (ot = s));
      }
      i & 512 && (n.memoizedProps.mode === "manual" ? Xn(n, n.return) : Zt(n, n.return));
      break;
    default:
      Ne(t, n);
  }
}
function Rg(t) {
  var e = t.alternate;
  (e !== null && ((t.alternate = null), Rg(e)),
    (t.child = null),
    (t.deletions = null),
    (t.sibling = null),
    t.tag === 5 && ((e = t.stateNode), e !== null && Yc(e)),
    (t.stateNode = null),
    (t.return = null),
    (t.dependencies = null),
    (t.memoizedProps = null),
    (t.memoizedState = null),
    (t.pendingProps = null),
    (t.stateNode = null),
    (t.updateQueue = null));
}
var ht = null,
  Xt = !1;
function Ue(t, e, n) {
  for (n = n.child; n !== null; ) (Og(t, e, n), (n = n.sibling));
}
function Og(t, e, n) {
  if (Qt && typeof Qt.onCommitFiberUnmount == "function")
    try {
      Qt.onCommitFiberUnmount(Bl, n);
    } catch {}
  switch (n.tag) {
    case 26:
      (ot || Zt(n, e),
        Ue(t, e, n),
        n.memoizedState
          ? n.memoizedState.count--
          : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n)));
      break;
    case 27:
      ot || Zt(n, e);
      var i = ht,
        a = Xt;
      for (ht = n.stateNode, Ue(t, e, n), n = n.stateNode, e = n.attributes; e.length; )
        n.removeAttributeNode(e[0]);
      (Yc(n), (ht = i), (Xt = a));
      break;
    case 5:
      ot || Zt(n, e);
    case 6:
      a = ht;
      var l = Xt;
      if (((ht = null), Ue(t, e, n), (ht = a), (Xt = l), ht !== null))
        if (Xt)
          try {
            ((t = ht),
              (i = n.stateNode),
              t.nodeType === 8 ? t.parentNode.removeChild(i) : t.removeChild(i));
          } catch (s) {
            F(n, e, s);
          }
        else
          try {
            ht.removeChild(n.stateNode);
          } catch (s) {
            F(n, e, s);
          }
      break;
    case 18:
      ht !== null &&
        (Xt
          ? ((e = ht),
            (n = n.stateNode),
            e.nodeType === 8 ? Lo(e.parentNode, n) : e.nodeType === 1 && Lo(e, n),
            Ml(e))
          : Lo(ht, n.stateNode));
      break;
    case 4:
      ((i = ht),
        (a = Xt),
        (ht = n.stateNode.containerInfo),
        (Xt = !0),
        Ue(t, e, n),
        (ht = i),
        (Xt = a));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      (ot || Rn(2, n, e), ot || Rn(4, n, e), Ue(t, e, n));
      break;
    case 1:
      (ot ||
        (Zt(n, e), (i = n.stateNode), typeof i.componentWillUnmount == "function" && Mg(n, e, i)),
        Ue(t, e, n));
      break;
    case 21:
      Ue(t, e, n);
      break;
    case 22:
      (ot || Zt(n, e), (ot = (i = ot) || n.memoizedState !== null), Ue(t, e, n), (ot = i));
      break;
    default:
      Ue(t, e, n);
  }
}
function zg(t, e) {
  if (
    e.memoizedState === null &&
    ((t = e.alternate),
    t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
  )
    try {
      Ml(t);
    } catch (n) {
      F(e, e.return, n);
    }
}
function m2(t) {
  switch (t.tag) {
    case 13:
    case 19:
      var e = t.stateNode;
      return (e === null && (e = t.stateNode = new dh()), e);
    case 22:
      return (
        (t = t.stateNode),
        (e = t._retryCache),
        e === null && (e = t._retryCache = new dh()),
        e
      );
    default:
      throw Error(A(435, t.tag));
  }
}
function Co(t, e) {
  var n = m2(t);
  e.forEach(function (i) {
    var a = w2.bind(null, t, i);
    n.has(i) || (n.add(i), i.then(a, a));
  });
}
function Wt(t, e) {
  var n = e.deletions;
  if (n !== null)
    for (var i = 0; i < n.length; i++) {
      var a = n[i],
        l = t,
        s = e,
        r = s;
      t: for (; r !== null; ) {
        switch (r.tag) {
          case 27:
          case 5:
            ((ht = r.stateNode), (Xt = !1));
            break t;
          case 3:
            ((ht = r.stateNode.containerInfo), (Xt = !0));
            break t;
          case 4:
            ((ht = r.stateNode.containerInfo), (Xt = !0));
            break t;
        }
        r = r.return;
      }
      if (ht === null) throw Error(A(160));
      (Og(l, s, a),
        (ht = null),
        (Xt = !1),
        (l = a.alternate),
        l !== null && (l.return = null),
        (a.return = null));
    }
  if (e.subtreeFlags & 13878) for (e = e.child; e !== null; ) (Vg(e, t), (e = e.sibling));
}
var pe = null;
function Vg(t, e) {
  var n = t.alternate,
    i = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      (Wt(e, t), It(t), i & 4 && (Rn(3, t, t.return), ql(3, t), Rn(5, t, t.return)));
      break;
    case 1:
      (Wt(e, t),
        It(t),
        i & 512 && (ot || n === null || Zt(n, n.return)),
        i & 64 &&
          Le &&
          ((t = t.updateQueue),
          t !== null &&
            ((i = t.callbacks),
            i !== null &&
              ((n = t.shared.hiddenCallbacks),
              (t.shared.hiddenCallbacks = n === null ? i : n.concat(i))))));
      break;
    case 26:
      var a = pe;
      if ((Wt(e, t), It(t), i & 512 && (ot || n === null || Zt(n, n.return)), i & 4)) {
        var l = n !== null ? n.memoizedState : null;
        if (((i = t.memoizedState), n === null))
          if (i === null)
            if (t.stateNode === null) {
              t: {
                ((i = t.type), (n = t.memoizedProps), (a = a.ownerDocument || a));
                e: switch (i) {
                  case "title":
                    ((l = a.getElementsByTagName("title")[0]),
                      (!l ||
                        l[dl] ||
                        l[Ot] ||
                        l.namespaceURI === "http://www.w3.org/2000/svg" ||
                        l.hasAttribute("itemprop")) &&
                        ((l = a.createElement(i)),
                        a.head.insertBefore(l, a.querySelector("head > title"))),
                      Ct(l, i, n),
                      (l[Ot] = t),
                      Tt(l),
                      (i = l));
                    break t;
                  case "link":
                    var s = Oh("link", "href", a).get(i + (n.href || ""));
                    if (s) {
                      for (var r = 0; r < s.length; r++)
                        if (
                          ((l = s[r]),
                          l.getAttribute("href") === (n.href == null ? null : n.href) &&
                            l.getAttribute("rel") === (n.rel == null ? null : n.rel) &&
                            l.getAttribute("title") === (n.title == null ? null : n.title) &&
                            l.getAttribute("crossorigin") ===
                              (n.crossOrigin == null ? null : n.crossOrigin))
                        ) {
                          s.splice(r, 1);
                          break e;
                        }
                    }
                    ((l = a.createElement(i)), Ct(l, i, n), a.head.appendChild(l));
                    break;
                  case "meta":
                    if ((s = Oh("meta", "content", a).get(i + (n.content || "")))) {
                      for (r = 0; r < s.length; r++)
                        if (
                          ((l = s[r]),
                          l.getAttribute("content") ===
                            (n.content == null ? null : "" + n.content) &&
                            l.getAttribute("name") === (n.name == null ? null : n.name) &&
                            l.getAttribute("property") ===
                              (n.property == null ? null : n.property) &&
                            l.getAttribute("http-equiv") ===
                              (n.httpEquiv == null ? null : n.httpEquiv) &&
                            l.getAttribute("charset") === (n.charSet == null ? null : n.charSet))
                        ) {
                          s.splice(r, 1);
                          break e;
                        }
                    }
                    ((l = a.createElement(i)), Ct(l, i, n), a.head.appendChild(l));
                    break;
                  default:
                    throw Error(A(468, i));
                }
                ((l[Ot] = t), Tt(l), (i = l));
              }
              t.stateNode = i;
            } else zh(a, t.type, t.stateNode);
          else t.stateNode = Rh(a, i, t.memoizedProps);
        else
          l !== i
            ? (l === null
                ? n.stateNode !== null && ((n = n.stateNode), n.parentNode.removeChild(n))
                : l.count--,
              i === null ? zh(a, t.type, t.stateNode) : Rh(a, i, t.memoizedProps))
            : i === null && t.stateNode !== null && fh(t, t.memoizedProps, n.memoizedProps);
      }
      break;
    case 27:
      if (i & 4 && t.alternate === null) {
        ((a = t.stateNode), (l = t.memoizedProps));
        try {
          for (var o = a.firstChild; o; ) {
            var u = o.nextSibling,
              c = o.nodeName;
            (o[dl] ||
              c === "HEAD" ||
              c === "BODY" ||
              c === "SCRIPT" ||
              c === "STYLE" ||
              (c === "LINK" && o.rel.toLowerCase() === "stylesheet") ||
              a.removeChild(o),
              (o = u));
          }
          for (var d = t.type, f = a.attributes; f.length; ) a.removeAttributeNode(f[0]);
          (Ct(a, d, l), (a[Ot] = t), (a[Gt] = l));
        } catch (y) {
          F(t, t.return, y);
        }
      }
    case 5:
      if ((Wt(e, t), It(t), i & 512 && (ot || n === null || Zt(n, n.return)), t.flags & 32)) {
        a = t.stateNode;
        try {
          Ji(a, "");
        } catch (y) {
          F(t, t.return, y);
        }
      }
      (i & 4 &&
        t.stateNode != null &&
        ((a = t.memoizedProps), fh(t, a, n !== null ? n.memoizedProps : a)),
        i & 1024 && (wo = !0));
      break;
    case 6:
      if ((Wt(e, t), It(t), i & 4)) {
        if (t.stateNode === null) throw Error(A(162));
        ((i = t.memoizedProps), (n = t.stateNode));
        try {
          n.nodeValue = i;
        } catch (y) {
          F(t, t.return, y);
        }
      }
      break;
    case 3:
      if (
        ((_s = null),
        (a = pe),
        (pe = dr(e.containerInfo)),
        Wt(e, t),
        (pe = a),
        It(t),
        i & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Ml(e.containerInfo);
        } catch (y) {
          F(t, t.return, y);
        }
      wo && ((wo = !1), _g(t));
      break;
    case 4:
      ((i = pe), (pe = dr(t.stateNode.containerInfo)), Wt(e, t), It(t), (pe = i));
      break;
    case 12:
      (Wt(e, t), It(t));
      break;
    case 13:
      (Wt(e, t),
        It(t),
        t.child.flags & 8192 &&
          (t.memoizedState !== null) != (n !== null && n.memoizedState !== null) &&
          (Sf = Me()),
        i & 4 && ((i = t.updateQueue), i !== null && ((t.updateQueue = null), Co(t, i))));
      break;
    case 22:
      if (
        (i & 512 && (ot || n === null || Zt(n, n.return)),
        (o = t.memoizedState !== null),
        (u = n !== null && n.memoizedState !== null),
        (c = Le),
        (d = ot),
        (Le = c || o),
        (ot = d || u),
        Wt(e, t),
        (ot = d),
        (Le = c),
        It(t),
        (e = t.stateNode),
        (e._current = t),
        (e._visibility &= -3),
        (e._visibility |= e._pendingVisibility & 2),
        i & 8192 &&
          ((e._visibility = o ? e._visibility & -2 : e._visibility | 1),
          o && ((e = Le || ot), n === null || u || e || xi(t)),
          t.memoizedProps === null || t.memoizedProps.mode !== "manual"))
      )
        t: for (n = null, e = t; ; ) {
          if (e.tag === 5 || e.tag === 26 || e.tag === 27) {
            if (n === null) {
              u = n = e;
              try {
                if (((a = u.stateNode), o))
                  ((l = a.style),
                    typeof l.setProperty == "function"
                      ? l.setProperty("display", "none", "important")
                      : (l.display = "none"));
                else {
                  ((s = u.stateNode), (r = u.memoizedProps.style));
                  var h = r != null && r.hasOwnProperty("display") ? r.display : null;
                  s.style.display = h == null || typeof h == "boolean" ? "" : ("" + h).trim();
                }
              } catch (y) {
                F(u, u.return, y);
              }
            }
          } else if (e.tag === 6) {
            if (n === null) {
              u = e;
              try {
                u.stateNode.nodeValue = o ? "" : u.memoizedProps;
              } catch (y) {
                F(u, u.return, y);
              }
            }
          } else if (
            ((e.tag !== 22 && e.tag !== 23) || e.memoizedState === null || e === t) &&
            e.child !== null
          ) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === t) break t;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break t;
            (n === e && (n = null), (e = e.return));
          }
          (n === e && (n = null), (e.sibling.return = e.return), (e = e.sibling));
        }
      i & 4 &&
        ((i = t.updateQueue),
        i !== null && ((n = i.retryQueue), n !== null && ((i.retryQueue = null), Co(t, n))));
      break;
    case 19:
      (Wt(e, t),
        It(t),
        i & 4 && ((i = t.updateQueue), i !== null && ((t.updateQueue = null), Co(t, i))));
      break;
    case 21:
      break;
    default:
      (Wt(e, t), It(t));
  }
}
function It(t) {
  var e = t.flags;
  if (e & 2) {
    try {
      if (t.tag !== 27) {
        t: {
          for (var n = t.return; n !== null; ) {
            if (wg(n)) {
              var i = n;
              break t;
            }
            n = n.return;
          }
          throw Error(A(160));
        }
        switch (i.tag) {
          case 27:
            var a = i.stateNode,
              l = Do(t);
            lr(t, l, a);
            break;
          case 5:
            var s = i.stateNode;
            i.flags & 32 && (Ji(s, ""), (i.flags &= -33));
            var r = Do(t);
            lr(t, r, s);
            break;
          case 3:
          case 4:
            var o = i.stateNode.containerInfo,
              u = Do(t);
            ku(t, u, o);
            break;
          default:
            throw Error(A(161));
        }
      }
    } catch (c) {
      F(t, t.return, c);
    }
    t.flags &= -3;
  }
  e & 4096 && (t.flags &= -4097);
}
function _g(t) {
  if (t.subtreeFlags & 1024)
    for (t = t.child; t !== null; ) {
      var e = t;
      (_g(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), (t = t.sibling));
    }
}
function Ne(t, e) {
  if (e.subtreeFlags & 8772)
    for (e = e.child; e !== null; ) (Cg(t, e.alternate, e), (e = e.sibling));
}
function xi(t) {
  for (t = t.child; t !== null; ) {
    var e = t;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Rn(4, e, e.return), xi(e));
        break;
      case 1:
        Zt(e, e.return);
        var n = e.stateNode;
        (typeof n.componentWillUnmount == "function" && Mg(e, e.return, n), xi(e));
        break;
      case 26:
      case 27:
      case 5:
        (Zt(e, e.return), xi(e));
        break;
      case 22:
        (Zt(e, e.return), e.memoizedState === null && xi(e));
        break;
      default:
        xi(e);
    }
    t = t.sibling;
  }
}
function rn(t, e, n) {
  for (n = n && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
    var i = e.alternate,
      a = t,
      l = e,
      s = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (rn(a, l, n), ql(4, l));
        break;
      case 1:
        if ((rn(a, l, n), (i = l), (a = i.stateNode), typeof a.componentDidMount == "function"))
          try {
            a.componentDidMount();
          } catch (u) {
            F(i, i.return, u);
          }
        if (((i = l), (a = i.updateQueue), a !== null)) {
          var r = i.stateNode;
          try {
            var o = a.shared.hiddenCallbacks;
            if (o !== null)
              for (a.shared.hiddenCallbacks = null, a = 0; a < o.length; a++) Tg(o[a], r);
          } catch (u) {
            F(i, i.return, u);
          }
        }
        (n && s & 64 && Eg(l), Xn(l, l.return));
        break;
      case 26:
      case 27:
      case 5:
        (rn(a, l, n), n && i === null && s & 4 && Dg(l), Xn(l, l.return));
        break;
      case 12:
        rn(a, l, n);
        break;
      case 13:
        (rn(a, l, n), n && s & 4 && zg(a, l));
        break;
      case 22:
        (l.memoizedState === null && rn(a, l, n), Xn(l, l.return));
        break;
      default:
        rn(a, l, n);
    }
    e = e.sibling;
  }
}
function pf(t, e) {
  var n = null;
  (t !== null &&
    t.memoizedState !== null &&
    t.memoizedState.cachePool !== null &&
    (n = t.memoizedState.cachePool.pool),
    (t = null),
    e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (t = e.memoizedState.cachePool.pool),
    t !== n && (t != null && t.refCount++, n != null && Ll(n)));
}
function gf(t, e) {
  ((t = null),
    e.alternate !== null && (t = e.alternate.memoizedState.cache),
    (e = e.memoizedState.cache),
    e !== t && (e.refCount++, t != null && Ll(t)));
}
function sn(t, e, n, i) {
  if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (Bg(t, e, n, i), (e = e.sibling));
}
function Bg(t, e, n, i) {
  var a = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 15:
      (sn(t, e, n, i), a & 2048 && ql(9, e));
      break;
    case 3:
      (sn(t, e, n, i),
        a & 2048 &&
          ((t = null),
          e.alternate !== null && (t = e.alternate.memoizedState.cache),
          (e = e.memoizedState.cache),
          e !== t && (e.refCount++, t != null && Ll(t))));
      break;
    case 12:
      if (a & 2048) {
        (sn(t, e, n, i), (t = e.stateNode));
        try {
          var l = e.memoizedProps,
            s = l.id,
            r = l.onPostCommit;
          typeof r == "function" &&
            r(s, e.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
        } catch (o) {
          F(e, e.return, o);
        }
      } else sn(t, e, n, i);
      break;
    case 23:
      break;
    case 22:
      ((l = e.stateNode),
        e.memoizedState !== null
          ? l._visibility & 4
            ? sn(t, e, n, i)
            : nl(t, e)
          : l._visibility & 4
            ? sn(t, e, n, i)
            : ((l._visibility |= 4), Ti(t, e, n, i, (e.subtreeFlags & 10256) !== 0)),
        a & 2048 && pf(e.alternate, e));
      break;
    case 24:
      (sn(t, e, n, i), a & 2048 && gf(e.alternate, e));
      break;
    default:
      sn(t, e, n, i);
  }
}
function Ti(t, e, n, i, a) {
  for (a = a && (e.subtreeFlags & 10256) !== 0, e = e.child; e !== null; ) {
    var l = t,
      s = e,
      r = n,
      o = i,
      u = s.flags;
    switch (s.tag) {
      case 0:
      case 11:
      case 15:
        (Ti(l, s, r, o, a), ql(8, s));
        break;
      case 23:
        break;
      case 22:
        var c = s.stateNode;
        (s.memoizedState !== null
          ? c._visibility & 4
            ? Ti(l, s, r, o, a)
            : nl(l, s)
          : ((c._visibility |= 4), Ti(l, s, r, o, a)),
          a && u & 2048 && pf(s.alternate, s));
        break;
      case 24:
        (Ti(l, s, r, o, a), a && u & 2048 && gf(s.alternate, s));
        break;
      default:
        Ti(l, s, r, o, a);
    }
    e = e.sibling;
  }
}
function nl(t, e) {
  if (e.subtreeFlags & 10256)
    for (e = e.child; e !== null; ) {
      var n = t,
        i = e,
        a = i.flags;
      switch (i.tag) {
        case 22:
          (nl(n, i), a & 2048 && pf(i.alternate, i));
          break;
        case 24:
          (nl(n, i), a & 2048 && gf(i.alternate, i));
          break;
        default:
          nl(n, i);
      }
      e = e.sibling;
    }
}
var Ya = 8192;
function yi(t) {
  if (t.subtreeFlags & Ya) for (t = t.child; t !== null; ) (Ug(t), (t = t.sibling));
}
function Ug(t) {
  switch (t.tag) {
    case 26:
      (yi(t), t.flags & Ya && t.memoizedState !== null && nS(pe, t.memoizedState, t.memoizedProps));
      break;
    case 5:
      yi(t);
      break;
    case 3:
    case 4:
      var e = pe;
      ((pe = dr(t.stateNode.containerInfo)), yi(t), (pe = e));
      break;
    case 22:
      t.memoizedState === null &&
        ((e = t.alternate),
        e !== null && e.memoizedState !== null
          ? ((e = Ya), (Ya = 16777216), yi(t), (Ya = e))
          : yi(t));
      break;
    default:
      yi(t);
  }
}
function Ng(t) {
  var e = t.alternate;
  if (e !== null && ((t = e.child), t !== null)) {
    e.child = null;
    do ((e = t.sibling), (t.sibling = null), (t = e));
    while (t !== null);
  }
}
function za(t) {
  var e = t.deletions;
  if ((t.flags & 16) !== 0) {
    if (e !== null)
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        ((St = i), Hg(i, t));
      }
    Ng(t);
  }
  if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (jg(t), (t = t.sibling));
}
function jg(t) {
  switch (t.tag) {
    case 0:
    case 11:
    case 15:
      (za(t), t.flags & 2048 && Rn(9, t, t.return));
      break;
    case 3:
      za(t);
      break;
    case 12:
      za(t);
      break;
    case 22:
      var e = t.stateNode;
      t.memoizedState !== null && e._visibility & 4 && (t.return === null || t.return.tag !== 13)
        ? ((e._visibility &= -5), Os(t))
        : za(t);
      break;
    default:
      za(t);
  }
}
function Os(t) {
  var e = t.deletions;
  if ((t.flags & 16) !== 0) {
    if (e !== null)
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        ((St = i), Hg(i, t));
      }
    Ng(t);
  }
  for (t = t.child; t !== null; ) {
    switch (((e = t), e.tag)) {
      case 0:
      case 11:
      case 15:
        (Rn(8, e, e.return), Os(e));
        break;
      case 22:
        ((n = e.stateNode), n._visibility & 4 && ((n._visibility &= -5), Os(e)));
        break;
      default:
        Os(e);
    }
    t = t.sibling;
  }
}
function Hg(t, e) {
  for (; St !== null; ) {
    var n = St;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Rn(8, n, e);
        break;
      case 23:
      case 22:
        if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
          var i = n.memoizedState.cachePool.pool;
          i != null && i.refCount++;
        }
        break;
      case 24:
        Ll(n.memoizedState.cache);
    }
    if (((i = n.child), i !== null)) ((i.return = n), (St = i));
    else
      t: for (n = t; St !== null; ) {
        i = St;
        var a = i.sibling,
          l = i.return;
        if ((Rg(i), i === n)) {
          St = null;
          break t;
        }
        if (a !== null) {
          ((a.return = l), (St = a));
          break t;
        }
        St = l;
      }
  }
}
function p2(t, e, n, i) {
  ((this.tag = t),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.refCleanup = this.ref = null),
    (this.pendingProps = e),
    (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
    (this.mode = i),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function oe(t, e, n, i) {
  return new p2(t, e, n, i);
}
function yf(t) {
  return ((t = t.prototype), !(!t || !t.isReactComponent));
}
function xn(t, e) {
  var n = t.alternate;
  return (
    n === null
      ? ((n = oe(t.tag, e, t.key, t.mode)),
        (n.elementType = t.elementType),
        (n.type = t.type),
        (n.stateNode = t.stateNode),
        (n.alternate = t),
        (t.alternate = n))
      : ((n.pendingProps = e),
        (n.type = t.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = t.flags & 31457280),
    (n.childLanes = t.childLanes),
    (n.lanes = t.lanes),
    (n.child = t.child),
    (n.memoizedProps = t.memoizedProps),
    (n.memoizedState = t.memoizedState),
    (n.updateQueue = t.updateQueue),
    (e = t.dependencies),
    (n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
    (n.sibling = t.sibling),
    (n.index = t.index),
    (n.ref = t.ref),
    (n.refCleanup = t.refCleanup),
    n
  );
}
function Lg(t, e) {
  t.flags &= 31457282;
  var n = t.alternate;
  return (
    n === null
      ? ((t.childLanes = 0),
        (t.lanes = e),
        (t.child = null),
        (t.subtreeFlags = 0),
        (t.memoizedProps = null),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.dependencies = null),
        (t.stateNode = null))
      : ((t.childLanes = n.childLanes),
        (t.lanes = n.lanes),
        (t.child = n.child),
        (t.subtreeFlags = 0),
        (t.deletions = null),
        (t.memoizedProps = n.memoizedProps),
        (t.memoizedState = n.memoizedState),
        (t.updateQueue = n.updateQueue),
        (t.type = n.type),
        (e = n.dependencies),
        (t.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
    t
  );
}
function zs(t, e, n, i, a, l) {
  var s = 0;
  if (((i = t), typeof t == "function")) yf(t) && (s = 1);
  else if (typeof t == "string")
    s = tS(t, n, Ee.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
  else
    t: switch (t) {
      case Ei:
        return Jn(n.children, a, l, e);
      case Yp:
        ((s = 8), (a |= 24));
        break;
      case du:
        return ((t = oe(12, n, e, a | 2)), (t.elementType = du), (t.lanes = l), t);
      case hu:
        return ((t = oe(13, n, e, a)), (t.elementType = hu), (t.lanes = l), t);
      case mu:
        return ((t = oe(19, n, e, a)), (t.elementType = mu), (t.lanes = l), t);
      case qp:
        return Yg(n, a, l, e);
      default:
        if (typeof t == "object" && t !== null)
          switch (t.$$typeof) {
            case Yv:
            case qe:
              s = 10;
              break t;
            case Gp:
              s = 9;
              break t;
            case jc:
              s = 11;
              break t;
            case Hc:
              s = 14;
              break t;
            case cn:
              ((s = 16), (i = null));
              break t;
          }
        ((s = 29), (n = Error(A(130, t === null ? "null" : typeof t, ""))), (i = null));
    }
  return ((e = oe(s, n, e, a)), (e.elementType = t), (e.type = i), (e.lanes = l), e);
}
function Jn(t, e, n, i) {
  return ((t = oe(7, t, i, e)), (t.lanes = n), t);
}
function Yg(t, e, n, i) {
  ((t = oe(22, t, i, e)), (t.elementType = qp), (t.lanes = n));
  var a = {
    _visibility: 1,
    _pendingVisibility: 1,
    _pendingMarkers: null,
    _retryCache: null,
    _transitions: null,
    _current: null,
    detach: function () {
      var l = a._current;
      if (l === null) throw Error(A(456));
      if ((a._pendingVisibility & 2) === 0) {
        var s = wn(l, 2);
        s !== null && ((a._pendingVisibility |= 2), jt(s, l, 2));
      }
    },
    attach: function () {
      var l = a._current;
      if (l === null) throw Error(A(456));
      if ((a._pendingVisibility & 2) !== 0) {
        var s = wn(l, 2);
        s !== null && ((a._pendingVisibility &= -3), jt(s, l, 2));
      }
    },
  };
  return ((t.stateNode = a), t);
}
function Ro(t, e, n) {
  return ((t = oe(6, t, null, e)), (t.lanes = n), t);
}
function Oo(t, e, n) {
  return (
    (e = oe(4, t.children !== null ? t.children : [], t.key, e)),
    (e.lanes = n),
    (e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation,
    }),
    e
  );
}
function je(t) {
  t.flags |= 4;
}
function mh(t, e) {
  if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0) t.flags &= -16777217;
  else if (((t.flags |= 16777216), !ry(e))) {
    if (
      ((e = ce.current),
      e !== null &&
        ((k & 4194176) === k
          ? De !== null
          : ((k & 62914560) !== k && (k & 536870912) === 0) || e !== De))
    )
      throw ((Fa = wu), D0);
    t.flags |= 8192;
  }
}
function us(t, e) {
  (e !== null && (t.flags |= 4),
    t.flags & 16384 && ((e = t.tag !== 22 ? Fp() : 536870912), (t.lanes |= e), (ea |= e)));
}
function Va(t, e) {
  if (!X)
    switch (t.tailMode) {
      case "hidden":
        e = t.tail;
        for (var n = null; e !== null; ) (e.alternate !== null && (n = e), (e = e.sibling));
        n === null ? (t.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = t.tail;
        for (var i = null; n !== null; ) (n.alternate !== null && (i = n), (n = n.sibling));
        i === null
          ? e || t.tail === null
            ? (t.tail = null)
            : (t.tail.sibling = null)
          : (i.sibling = null);
    }
}
function at(t) {
  var e = t.alternate !== null && t.alternate.child === t.child,
    n = 0,
    i = 0;
  if (e)
    for (var a = t.child; a !== null; )
      ((n |= a.lanes | a.childLanes),
        (i |= a.subtreeFlags & 31457280),
        (i |= a.flags & 31457280),
        (a.return = t),
        (a = a.sibling));
  else
    for (a = t.child; a !== null; )
      ((n |= a.lanes | a.childLanes),
        (i |= a.subtreeFlags),
        (i |= a.flags),
        (a.return = t),
        (a = a.sibling));
  return ((t.subtreeFlags |= i), (t.childLanes = n), e);
}
function g2(t, e, n) {
  var i = e.pendingProps;
  switch (($c(e), e.tag)) {
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (at(e), null);
    case 1:
      return (at(e), null);
    case 3:
      return (
        (n = e.stateNode),
        (i = null),
        t !== null && (i = t.memoizedState.cache),
        e.memoizedState.cache !== i && (e.flags |= 2048),
        Qe(yt),
        Fi(),
        n.pendingContext && ((n.context = n.pendingContext), (n.pendingContext = null)),
        (t === null || t.child === null) &&
          (Ra(e)
            ? je(e)
            : t === null ||
              (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
              ((e.flags |= 1024), ge !== null && (Pu(ge), (ge = null)))),
        at(e),
        null
      );
    case 26:
      return (
        (n = e.memoizedState),
        t === null
          ? (je(e), n !== null ? (at(e), mh(e, n)) : (at(e), (e.flags &= -16777217)))
          : n
            ? n !== t.memoizedState
              ? (je(e), at(e), mh(e, n))
              : (at(e), (e.flags &= -16777217))
            : (t.memoizedProps !== i && je(e), at(e), (e.flags &= -16777217)),
        null
      );
    case 27:
      (Ks(e), (n = vn.current));
      var a = e.type;
      if (t !== null && e.stateNode != null) t.memoizedProps !== i && je(e);
      else {
        if (!i) {
          if (e.stateNode === null) throw Error(A(166));
          return (at(e), null);
        }
        ((t = Ee.current), Ra(e) ? Xd(e) : ((t = ay(a, i, n)), (e.stateNode = t), je(e)));
      }
      return (at(e), null);
    case 5:
      if ((Ks(e), (n = e.type), t !== null && e.stateNode != null)) t.memoizedProps !== i && je(e);
      else {
        if (!i) {
          if (e.stateNode === null) throw Error(A(166));
          return (at(e), null);
        }
        if (((t = Ee.current), Ra(e))) Xd(e);
        else {
          switch (((a = fr(vn.current)), t)) {
            case 1:
              t = a.createElementNS("http://www.w3.org/2000/svg", n);
              break;
            case 2:
              t = a.createElementNS("http://www.w3.org/1998/Math/MathML", n);
              break;
            default:
              switch (n) {
                case "svg":
                  t = a.createElementNS("http://www.w3.org/2000/svg", n);
                  break;
                case "math":
                  t = a.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                  break;
                case "script":
                  ((t = a.createElement("div")),
                    (t.innerHTML = "<script><\/script>"),
                    (t = t.removeChild(t.firstChild)));
                  break;
                case "select":
                  ((t =
                    typeof i.is == "string"
                      ? a.createElement("select", { is: i.is })
                      : a.createElement("select")),
                    i.multiple ? (t.multiple = !0) : i.size && (t.size = i.size));
                  break;
                default:
                  t =
                    typeof i.is == "string" ? a.createElement(n, { is: i.is }) : a.createElement(n);
              }
          }
          ((t[Ot] = e), (t[Gt] = i));
          t: for (a = e.child; a !== null; ) {
            if (a.tag === 5 || a.tag === 6) t.appendChild(a.stateNode);
            else if (a.tag !== 4 && a.tag !== 27 && a.child !== null) {
              ((a.child.return = a), (a = a.child));
              continue;
            }
            if (a === e) break t;
            for (; a.sibling === null; ) {
              if (a.return === null || a.return === e) break t;
              a = a.return;
            }
            ((a.sibling.return = a.return), (a = a.sibling));
          }
          e.stateNode = t;
          t: switch ((Ct(t, n, i), n)) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              t = !!i.autoFocus;
              break t;
            case "img":
              t = !0;
              break t;
            default:
              t = !1;
          }
          t && je(e);
        }
      }
      return (at(e), (e.flags &= -16777217), null);
    case 6:
      if (t && e.stateNode != null) t.memoizedProps !== i && je(e);
      else {
        if (typeof i != "string" && e.stateNode === null) throw Error(A(166));
        if (((t = vn.current), Ra(e))) {
          if (((t = e.stateNode), (n = e.memoizedProps), (i = null), (a = Bt), a !== null))
            switch (a.tag) {
              case 27:
              case 5:
                i = a.memoizedProps;
            }
          ((t[Ot] = e),
            (t = !!(
              t.nodeValue === n ||
              (i !== null && i.suppressHydrationWarning === !0) ||
              ey(t.nodeValue, n)
            )),
            t || ii(e));
        } else ((t = fr(t).createTextNode(i)), (t[Ot] = e), (e.stateNode = t));
      }
      return (at(e), null);
    case 13:
      if (
        ((i = e.memoizedState),
        t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
      ) {
        if (((a = Ra(e)), i !== null && i.dehydrated !== null)) {
          if (t === null) {
            if (!a) throw Error(A(318));
            if (((a = e.memoizedState), (a = a !== null ? a.dehydrated : null), !a))
              throw Error(A(317));
            a[Ot] = e;
          } else (Hl(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
          (at(e), (a = !1));
        } else (ge !== null && (Pu(ge), (ge = null)), (a = !0));
        if (!a) return e.flags & 256 ? (Ke(e), e) : (Ke(e), null);
      }
      if ((Ke(e), (e.flags & 128) !== 0)) return ((e.lanes = n), e);
      if (((n = i !== null), (t = t !== null && t.memoizedState !== null), n)) {
        ((i = e.child),
          (a = null),
          i.alternate !== null &&
            i.alternate.memoizedState !== null &&
            i.alternate.memoizedState.cachePool !== null &&
            (a = i.alternate.memoizedState.cachePool.pool));
        var l = null;
        (i.memoizedState !== null &&
          i.memoizedState.cachePool !== null &&
          (l = i.memoizedState.cachePool.pool),
          l !== a && (i.flags |= 2048));
      }
      return (n !== t && n && (e.child.flags |= 8192), us(e, e.updateQueue), at(e), null);
    case 4:
      return (Fi(), t === null && Af(e.stateNode.containerInfo), at(e), null);
    case 10:
      return (Qe(e.type), at(e), null);
    case 19:
      if ((Et(vt), (a = e.memoizedState), a === null)) return (at(e), null);
      if (((i = (e.flags & 128) !== 0), (l = a.rendering), l === null))
        if (i) Va(a, !1);
        else {
          if (ct !== 0 || (t !== null && (t.flags & 128) !== 0))
            for (t = e.child; t !== null; ) {
              if (((l = Is(t)), l !== null)) {
                for (
                  e.flags |= 128,
                    Va(a, !1),
                    t = l.updateQueue,
                    e.updateQueue = t,
                    us(e, t),
                    e.subtreeFlags = 0,
                    t = n,
                    n = e.child;
                  n !== null;

                )
                  (Lg(n, t), (n = n.sibling));
                return (nt(vt, (vt.current & 1) | 2), e.child);
              }
              t = t.sibling;
            }
          a.tail !== null &&
            Me() > sr &&
            ((e.flags |= 128), (i = !0), Va(a, !1), (e.lanes = 4194304));
        }
      else {
        if (!i)
          if (((t = Is(l)), t !== null)) {
            if (
              ((e.flags |= 128),
              (i = !0),
              (t = t.updateQueue),
              (e.updateQueue = t),
              us(e, t),
              Va(a, !0),
              a.tail === null && a.tailMode === "hidden" && !l.alternate && !X)
            )
              return (at(e), null);
          } else
            2 * Me() - a.renderingStartTime > sr &&
              n !== 536870912 &&
              ((e.flags |= 128), (i = !0), Va(a, !1), (e.lanes = 4194304));
        a.isBackwards
          ? ((l.sibling = e.child), (e.child = l))
          : ((t = a.last), t !== null ? (t.sibling = l) : (e.child = l), (a.last = l));
      }
      return a.tail !== null
        ? ((e = a.tail),
          (a.rendering = e),
          (a.tail = e.sibling),
          (a.renderingStartTime = Me()),
          (e.sibling = null),
          (t = vt.current),
          nt(vt, i ? (t & 1) | 2 : t & 1),
          e)
        : (at(e), null);
    case 22:
    case 23:
      return (
        Ke(e),
        Jc(),
        (i = e.memoizedState !== null),
        t !== null ? (t.memoizedState !== null) !== i && (e.flags |= 8192) : i && (e.flags |= 8192),
        i
          ? (n & 536870912) !== 0 &&
            (e.flags & 128) === 0 &&
            (at(e), e.subtreeFlags & 6 && (e.flags |= 8192))
          : at(e),
        (n = e.updateQueue),
        n !== null && us(e, n.retryQueue),
        (n = null),
        t !== null &&
          t.memoizedState !== null &&
          t.memoizedState.cachePool !== null &&
          (n = t.memoizedState.cachePool.pool),
        (i = null),
        e.memoizedState !== null &&
          e.memoizedState.cachePool !== null &&
          (i = e.memoizedState.cachePool.pool),
        i !== n && (e.flags |= 2048),
        t !== null && Et($n),
        null
      );
    case 24:
      return (
        (n = null),
        t !== null && (n = t.memoizedState.cache),
        e.memoizedState.cache !== n && (e.flags |= 2048),
        Qe(yt),
        at(e),
        null
      );
    case 25:
      return null;
  }
  throw Error(A(156, e.tag));
}
function y2(t, e) {
  switch (($c(e), e.tag)) {
    case 1:
      return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
    case 3:
      return (
        Qe(yt),
        Fi(),
        (t = e.flags),
        (t & 65536) !== 0 && (t & 128) === 0 ? ((e.flags = (t & -65537) | 128), e) : null
      );
    case 26:
    case 27:
    case 5:
      return (Ks(e), null);
    case 13:
      if ((Ke(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)) {
        if (e.alternate === null) throw Error(A(340));
        Hl();
      }
      return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
    case 19:
      return (Et(vt), null);
    case 4:
      return (Fi(), null);
    case 10:
      return (Qe(e.type), null);
    case 22:
    case 23:
      return (
        Ke(e),
        Jc(),
        t !== null && Et($n),
        (t = e.flags),
        t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
      );
    case 24:
      return (Qe(yt), null);
    case 25:
      return null;
    default:
      return null;
  }
}
function Gg(t, e) {
  switch (($c(e), e.tag)) {
    case 3:
      (Qe(yt), Fi());
      break;
    case 26:
    case 27:
    case 5:
      Ks(e);
      break;
    case 4:
      Fi();
      break;
    case 13:
      Ke(e);
      break;
    case 19:
      Et(vt);
      break;
    case 10:
      Qe(e.type);
      break;
    case 22:
    case 23:
      (Ke(e), Jc(), t !== null && Et($n));
      break;
    case 24:
      Qe(yt);
  }
}
var v2 = {
    getCacheForType: function (t) {
      var e = zt(yt),
        n = e.data.get(t);
      return (n === void 0 && ((n = t()), e.data.set(t, n)), n);
    },
  },
  b2 = typeof WeakMap == "function" ? WeakMap : Map,
  rt = 0,
  J = null,
  Y = null,
  k = 0,
  $ = 0,
  Kt = null,
  Ye = !1,
  ga = !1,
  vf = !1,
  Ie = 0,
  ct = 0,
  On = 0,
  Wn = 0,
  bf = 0,
  ue = 0,
  ea = 0,
  il = null,
  Ae = null,
  Xu = !1,
  Sf = 0,
  sr = 1 / 0,
  rr = null,
  Tn = null,
  cs = !1,
  qn = null,
  al = 0,
  Ku = 0,
  Zu = null,
  ll = 0,
  Qu = null;
function Ft() {
  if ((rt & 2) !== 0 && k !== 0) return k & -k;
  if (N.T !== null) {
    var t = Ii;
    return t !== 0 ? t : Tf();
  }
  return Ip();
}
function qg() {
  ue === 0 && (ue = (k & 536870912) === 0 || X ? Pp() : 536870912);
  var t = ce.current;
  return (t !== null && (t.flags |= 32), ue);
}
function jt(t, e, n) {
  (((t === J && $ === 2) || t.cancelPendingCommit !== null) && (na(t, 0), Ge(t, k, ue, !1)),
    Nl(t, n),
    ((rt & 2) === 0 || t !== J) &&
      (t === J && ((rt & 2) === 0 && (Wn |= n), ct === 4 && Ge(t, k, ue, !1)), ze(t)));
}
function kg(t, e, n) {
  if ((rt & 6) !== 0) throw Error(A(327));
  var i = (!n && (e & 60) === 0 && (e & t.expiredLanes) === 0) || Ul(t, e),
    a = i ? T2(t, e) : zo(t, e, !0),
    l = i;
  do {
    if (a === 0) {
      ga && !i && Ge(t, e, 0, !1);
      break;
    } else if (a === 6) Ge(t, e, 0, !Ye);
    else {
      if (((n = t.current.alternate), l && !S2(n))) {
        ((a = zo(t, e, !1)), (l = !1));
        continue;
      }
      if (a === 2) {
        if (((l = e), t.errorRecoveryDisabledLanes & l)) var s = 0;
        else ((s = t.pendingLanes & -536870913), (s = s !== 0 ? s : s & 536870912 ? 536870912 : 0));
        if (s !== 0) {
          e = s;
          t: {
            var r = t;
            a = il;
            var o = r.current.memoizedState.isDehydrated;
            if ((o && (na(r, s).flags |= 256), (s = zo(r, s, !1)), s !== 2)) {
              if (vf && !o) {
                ((r.errorRecoveryDisabledLanes |= l), (Wn |= l), (a = 4));
                break t;
              }
              ((l = Ae), (Ae = a), l !== null && Pu(l));
            }
            a = s;
          }
          if (((l = !1), a !== 2)) continue;
        }
      }
      if (a === 1) {
        (na(t, 0), Ge(t, e, 0, !0));
        break;
      }
      t: {
        switch (((i = t), a)) {
          case 0:
          case 1:
            throw Error(A(345));
          case 4:
            if ((e & 4194176) === e) {
              Ge(i, e, ue, !Ye);
              break t;
            }
            break;
          case 2:
            Ae = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(A(329));
        }
        if (
          ((i.finishedWork = n),
          (i.finishedLanes = e),
          (e & 62914560) === e && ((l = Sf + 300 - Me()), 10 < l))
        ) {
          if ((Ge(i, e, ue, !Ye), Or(i, 0) !== 0)) break t;
          i.timeoutHandle = iy(ph.bind(null, i, n, Ae, rr, Xu, e, ue, Wn, ea, Ye, 2, -0, 0), l);
          break t;
        }
        ph(i, n, Ae, rr, Xu, e, ue, Wn, ea, Ye, 0, -0, 0);
      }
    }
    break;
  } while (1);
  ze(t);
}
function Pu(t) {
  Ae === null ? (Ae = t) : Ae.push.apply(Ae, t);
}
function ph(t, e, n, i, a, l, s, r, o, u, c, d, f) {
  var h = e.subtreeFlags;
  if (
    (h & 8192 || (h & 16785408) === 16785408) &&
    ((xl = { stylesheets: null, count: 0, unsuspend: eS }), Ug(e), (e = iS()), e !== null)
  ) {
    ((t.cancelPendingCommit = e(yh.bind(null, t, n, i, a, s, r, o, 1, d, f))), Ge(t, l, s, !u));
    return;
  }
  yh(t, n, i, a, s, r, o, c, d, f);
}
function S2(t) {
  for (var e = t; ; ) {
    var n = e.tag;
    if (
      (n === 0 || n === 11 || n === 15) &&
      e.flags & 16384 &&
      ((n = e.updateQueue), n !== null && ((n = n.stores), n !== null))
    )
      for (var i = 0; i < n.length; i++) {
        var a = n[i],
          l = a.getSnapshot;
        a = a.value;
        try {
          if (!Jt(l(), a)) return !1;
        } catch {
          return !1;
        }
      }
    if (((n = e.child), e.subtreeFlags & 16384 && n !== null)) ((n.return = e), (e = n));
    else {
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return !0;
        e = e.return;
      }
      ((e.sibling.return = e.return), (e = e.sibling));
    }
  }
  return !0;
}
function Ge(t, e, n, i) {
  ((e &= ~bf),
    (e &= ~Wn),
    (t.suspendedLanes |= e),
    (t.pingedLanes &= ~e),
    i && (t.warmLanes |= e),
    (i = t.expirationTimes));
  for (var a = e; 0 < a; ) {
    var l = 31 - Pt(a),
      s = 1 << l;
    ((i[l] = -1), (a &= ~s));
  }
  n !== 0 && $p(t, n, e);
}
function Yr() {
  return (rt & 6) === 0 ? (kl(0, !1), !1) : !0;
}
function xf() {
  if (Y !== null) {
    if ($ === 0) var t = Y.return;
    else ((t = Y), (Ze = hi = null), lf(t), (Xi = null), (yl = 0), (t = Y));
    for (; t !== null; ) (Gg(t.alternate, t), (t = t.return));
    Y = null;
  }
}
function na(t, e) {
  ((t.finishedWork = null), (t.finishedLanes = 0));
  var n = t.timeoutHandle;
  (n !== -1 && ((t.timeoutHandle = -1), L2(n)),
    (n = t.cancelPendingCommit),
    n !== null && ((t.cancelPendingCommit = null), n()),
    xf(),
    (J = t),
    (Y = n = xn(t.current, null)),
    (k = e),
    ($ = 0),
    (Kt = null),
    (Ye = !1),
    (ga = Ul(t, e)),
    (vf = !1),
    (ea = ue = bf = Wn = On = ct = 0),
    (Ae = il = null),
    (Xu = !1),
    (e & 8) !== 0 && (e |= e & 32));
  var i = t.entangledLanes;
  if (i !== 0)
    for (t = t.entanglements, i &= e; 0 < i; ) {
      var a = 31 - Pt(i),
        l = 1 << a;
      ((e |= t[a]), (i &= ~l));
    }
  return ((Ie = e), Br(), n);
}
function Xg(t, e) {
  ((L = null),
    (N.H = Re),
    e === Pa
      ? ((e = Qd()), ($ = 3))
      : e === D0
        ? ((e = Qd()), ($ = 4))
        : ($ =
            e === pg
              ? 8
              : e !== null && typeof e == "object" && typeof e.then == "function"
                ? 6
                : 1),
    (Kt = e),
    Y === null && ((ct = 1), ir(t, re(e, t.current))));
}
function Kg() {
  var t = N.H;
  return ((N.H = Re), t === null ? Re : t);
}
function Zg() {
  var t = N.A;
  return ((N.A = v2), t);
}
function Fu() {
  ((ct = 4),
    Ye || ((k & 4194176) !== k && ce.current !== null) || (ga = !0),
    ((On & 134217727) === 0 && (Wn & 134217727) === 0) || J === null || Ge(J, k, ue, !1));
}
function zo(t, e, n) {
  var i = rt;
  rt |= 2;
  var a = Kg(),
    l = Zg();
  ((J !== t || k !== e) && ((rr = null), na(t, e)), (e = !1));
  var s = ct;
  t: do
    try {
      if ($ !== 0 && Y !== null) {
        var r = Y,
          o = Kt;
        switch ($) {
          case 8:
            (xf(), (s = 6));
            break t;
          case 3:
          case 2:
          case 6:
            ce.current === null && (e = !0);
            var u = $;
            if ((($ = 0), (Kt = null), Bi(t, r, o, u), n && ga)) {
              s = 0;
              break t;
            }
            break;
          default:
            ((u = $), ($ = 0), (Kt = null), Bi(t, r, o, u));
        }
      }
      (x2(), (s = ct));
      break;
    } catch (c) {
      Xg(t, c);
    }
  while (1);
  return (
    e && t.shellSuspendCounter++,
    (Ze = hi = null),
    (rt = i),
    (N.H = a),
    (N.A = l),
    Y === null && ((J = null), (k = 0), Br()),
    s
  );
}
function x2() {
  for (; Y !== null; ) Qg(Y);
}
function T2(t, e) {
  var n = rt;
  rt |= 2;
  var i = Kg(),
    a = Zg();
  J !== t || k !== e ? ((rr = null), (sr = Me() + 500), na(t, e)) : (ga = Ul(t, e));
  t: do
    try {
      if ($ !== 0 && Y !== null) {
        e = Y;
        var l = Kt;
        e: switch ($) {
          case 1:
            (($ = 0), (Kt = null), Bi(t, e, l, 1));
            break;
          case 2:
            if (Zd(l)) {
              (($ = 0), (Kt = null), gh(e));
              break;
            }
            ((e = function () {
              ($ === 2 && J === t && ($ = 7), ze(t));
            }),
              l.then(e, e));
            break t;
          case 3:
            $ = 7;
            break t;
          case 4:
            $ = 5;
            break t;
          case 7:
            Zd(l) ? (($ = 0), (Kt = null), gh(e)) : (($ = 0), (Kt = null), Bi(t, e, l, 7));
            break;
          case 5:
            var s = null;
            switch (Y.tag) {
              case 26:
                s = Y.memoizedState;
              case 5:
              case 27:
                var r = Y;
                if (!s || ry(s)) {
                  (($ = 0), (Kt = null));
                  var o = r.sibling;
                  if (o !== null) Y = o;
                  else {
                    var u = r.return;
                    u !== null ? ((Y = u), Gr(u)) : (Y = null);
                  }
                  break e;
                }
            }
            (($ = 0), (Kt = null), Bi(t, e, l, 5));
            break;
          case 6:
            (($ = 0), (Kt = null), Bi(t, e, l, 6));
            break;
          case 8:
            (xf(), (ct = 6));
            break t;
          default:
            throw Error(A(462));
        }
      }
      A2();
      break;
    } catch (c) {
      Xg(t, c);
    }
  while (1);
  return (
    (Ze = hi = null),
    (N.H = i),
    (N.A = a),
    (rt = n),
    Y !== null ? 0 : ((J = null), (k = 0), Br(), ct)
  );
}
function A2() {
  for (; Y !== null && !Kv(); ) Qg(Y);
}
function Qg(t) {
  var e = Sg(t.alternate, t, Ie);
  ((t.memoizedProps = t.pendingProps), e === null ? Gr(t) : (Y = e));
}
function gh(t) {
  var e = t,
    n = e.alternate;
  switch (e.tag) {
    case 15:
    case 0:
      e = rh(n, e, e.pendingProps, e.type, void 0, k);
      break;
    case 11:
      e = rh(n, e, e.pendingProps, e.type.render, e.ref, k);
      break;
    case 5:
      lf(e);
    default:
      (Gg(n, e), (e = Y = Lg(e, Ie)), (e = Sg(n, e, Ie)));
  }
  ((t.memoizedProps = t.pendingProps), e === null ? Gr(t) : (Y = e));
}
function Bi(t, e, n, i) {
  ((Ze = hi = null), lf(e), (Xi = null), (yl = 0));
  var a = e.return;
  try {
    if (f2(t, a, e, n, k)) {
      ((ct = 1), ir(t, re(n, t.current)), (Y = null));
      return;
    }
  } catch (l) {
    if (a !== null) throw ((Y = a), l);
    ((ct = 1), ir(t, re(n, t.current)), (Y = null));
    return;
  }
  e.flags & 32768
    ? (X || i === 1
        ? (t = !0)
        : ga || (k & 536870912) !== 0
          ? (t = !1)
          : ((Ye = t = !0),
            (i === 2 || i === 3 || i === 6) &&
              ((i = ce.current), i !== null && i.tag === 13 && (i.flags |= 16384))),
      Pg(e, t))
    : Gr(e);
}
function Gr(t) {
  var e = t;
  do {
    if ((e.flags & 32768) !== 0) {
      Pg(e, Ye);
      return;
    }
    t = e.return;
    var n = g2(e.alternate, e, Ie);
    if (n !== null) {
      Y = n;
      return;
    }
    if (((e = e.sibling), e !== null)) {
      Y = e;
      return;
    }
    Y = e = t;
  } while (e !== null);
  ct === 0 && (ct = 5);
}
function Pg(t, e) {
  do {
    var n = y2(t.alternate, t);
    if (n !== null) {
      ((n.flags &= 32767), (Y = n));
      return;
    }
    if (
      ((n = t.return),
      n !== null && ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
      !e && ((t = t.sibling), t !== null))
    ) {
      Y = t;
      return;
    }
    Y = t = n;
  } while (t !== null);
  ((ct = 6), (Y = null));
}
function yh(t, e, n, i, a, l, s, r, o, u) {
  var c = N.T,
    d = tt.p;
  try {
    ((tt.p = 2), (N.T = null), E2(t, e, n, i, d, a, l, s, r, o, u));
  } finally {
    ((N.T = c), (tt.p = d));
  }
}
function E2(t, e, n, i, a, l, s, r) {
  do Pi();
  while (qn !== null);
  if ((rt & 6) !== 0) throw Error(A(327));
  var o = t.finishedWork;
  if (((i = t.finishedLanes), o === null)) return null;
  if (((t.finishedWork = null), (t.finishedLanes = 0), o === t.current)) throw Error(A(177));
  ((t.callbackNode = null), (t.callbackPriority = 0), (t.cancelPendingCommit = null));
  var u = o.lanes | o.childLanes;
  if (
    ((u |= Qc),
    nb(t, i, u, l, s, r),
    t === J && ((Y = J = null), (k = 0)),
    ((o.subtreeFlags & 10256) === 0 && (o.flags & 10256) === 0) ||
      cs ||
      ((cs = !0),
      (Ku = u),
      (Zu = n),
      C2(Zs, function () {
        return (Pi(), null);
      })),
    (n = (o.flags & 15990) !== 0),
    (o.subtreeFlags & 15990) !== 0 || n
      ? ((n = N.T),
        (N.T = null),
        (l = tt.p),
        (tt.p = 2),
        (s = rt),
        (rt |= 4),
        h2(t, o),
        Vg(o, t),
        Pb(Iu, t.containerInfo),
        (pr = !!Wu),
        (Iu = Wu = null),
        (t.current = o),
        Cg(t, o.alternate, o),
        Zv(),
        (rt = s),
        (tt.p = l),
        (N.T = n))
      : (t.current = o),
    cs ? ((cs = !1), (qn = t), (al = i)) : Fg(t, u),
    (u = t.pendingLanes),
    u === 0 && (Tn = null),
    Jv(o.stateNode),
    ze(t),
    e !== null)
  )
    for (a = t.onRecoverableError, o = 0; o < e.length; o++)
      ((u = e[o]), a(u.value, { componentStack: u.stack }));
  return (
    (al & 3) !== 0 && Pi(),
    (u = t.pendingLanes),
    (i & 4194218) !== 0 && (u & 42) !== 0 ? (t === Qu ? ll++ : ((ll = 0), (Qu = t))) : (ll = 0),
    kl(0, !1),
    null
  );
}
function Fg(t, e) {
  (t.pooledCacheLanes &= e) === 0 &&
    ((e = t.pooledCache), e != null && ((t.pooledCache = null), Ll(e)));
}
function Pi() {
  if (qn !== null) {
    var t = qn,
      e = Ku;
    Ku = 0;
    var n = Wp(al),
      i = N.T,
      a = tt.p;
    try {
      if (((tt.p = 32 > n ? 32 : n), (N.T = null), qn === null)) var l = !1;
      else {
        ((n = Zu), (Zu = null));
        var s = qn,
          r = al;
        if (((qn = null), (al = 0), (rt & 6) !== 0)) throw Error(A(331));
        var o = rt;
        if (
          ((rt |= 4),
          jg(s.current),
          Bg(s, s.current, r, n),
          (rt = o),
          kl(0, !1),
          Qt && typeof Qt.onPostCommitFiberRoot == "function")
        )
          try {
            Qt.onPostCommitFiberRoot(Bl, s);
          } catch {}
        l = !0;
      }
      return l;
    } finally {
      ((tt.p = a), (N.T = i), Fg(t, e));
    }
  }
  return !1;
}
function vh(t, e, n) {
  ((e = re(n, e)), (e = Bu(t.stateNode, e, 2)), (t = Sn(t, e, 2)), t !== null && (Nl(t, 2), ze(t)));
}
function F(t, e, n) {
  if (t.tag === 3) vh(t, t, n);
  else
    for (; e !== null; ) {
      if (e.tag === 3) {
        vh(e, t, n);
        break;
      } else if (e.tag === 1) {
        var i = e.stateNode;
        if (
          typeof e.type.getDerivedStateFromError == "function" ||
          (typeof i.componentDidCatch == "function" && (Tn === null || !Tn.has(i)))
        ) {
          ((t = re(n, t)),
            (n = hg(2)),
            (i = Sn(e, n, 2)),
            i !== null && (mg(n, i, e, t), Nl(i, 2), ze(i)));
          break;
        }
      }
      e = e.return;
    }
}
function Vo(t, e, n) {
  var i = t.pingCache;
  if (i === null) {
    i = t.pingCache = new b2();
    var a = new Set();
    i.set(e, a);
  } else ((a = i.get(e)), a === void 0 && ((a = new Set()), i.set(e, a)));
  a.has(n) || ((vf = !0), a.add(n), (t = M2.bind(null, t, e, n)), e.then(t, t));
}
function M2(t, e, n) {
  var i = t.pingCache;
  (i !== null && i.delete(e),
    (t.pingedLanes |= t.suspendedLanes & n),
    (t.warmLanes &= ~n),
    J === t &&
      (k & n) === n &&
      (ct === 4 || (ct === 3 && (k & 62914560) === k && 300 > Me() - Sf)
        ? (rt & 2) === 0 && na(t, 0)
        : (bf |= n),
      ea === k && (ea = 0)),
    ze(t));
}
function $g(t, e) {
  (e === 0 && (e = Fp()), (t = wn(t, e)), t !== null && (Nl(t, e), ze(t)));
}
function D2(t) {
  var e = t.memoizedState,
    n = 0;
  (e !== null && (n = e.retryLane), $g(t, n));
}
function w2(t, e) {
  var n = 0;
  switch (t.tag) {
    case 13:
      var i = t.stateNode,
        a = t.memoizedState;
      a !== null && (n = a.retryLane);
      break;
    case 19:
      i = t.stateNode;
      break;
    case 22:
      i = t.stateNode._retryCache;
      break;
    default:
      throw Error(A(314));
  }
  (i !== null && i.delete(e), $g(t, n));
}
function C2(t, e) {
  return Lc(t, e);
}
var or = null,
  Ai = null,
  $u = !1,
  ur = !1,
  _o = !1,
  In = 0;
function ze(t) {
  (t !== Ai && t.next === null && (Ai === null ? (or = Ai = t) : (Ai = Ai.next = t)),
    (ur = !0),
    $u || (($u = !0), O2(R2)));
}
function kl(t, e) {
  if (!_o && ur) {
    _o = !0;
    do
      for (var n = !1, i = or; i !== null; ) {
        if (!e)
          if (t !== 0) {
            var a = i.pendingLanes;
            if (a === 0) var l = 0;
            else {
              var s = i.suspendedLanes,
                r = i.pingedLanes;
              ((l = (1 << (31 - Pt(42 | t) + 1)) - 1),
                (l &= a & ~(s & ~r)),
                (l = l & 201326677 ? (l & 201326677) | 1 : l ? l | 2 : 0));
            }
            l !== 0 && ((n = !0), bh(i, l));
          } else
            ((l = k),
              (l = Or(i, i === J ? l : 0)),
              (l & 3) === 0 || Ul(i, l) || ((n = !0), bh(i, l)));
        i = i.next;
      }
    while (n);
    _o = !1;
  }
}
function R2() {
  ur = $u = !1;
  var t = 0;
  In !== 0 && (H2() && (t = In), (In = 0));
  for (var e = Me(), n = null, i = or; i !== null; ) {
    var a = i.next,
      l = Jg(i, e);
    (l === 0
      ? ((i.next = null), n === null ? (or = a) : (n.next = a), a === null && (Ai = n))
      : ((n = i), (t !== 0 || (l & 3) !== 0) && (ur = !0)),
      (i = a));
  }
  kl(t, !1);
}
function Jg(t, e) {
  for (
    var n = t.suspendedLanes,
      i = t.pingedLanes,
      a = t.expirationTimes,
      l = t.pendingLanes & -62914561;
    0 < l;

  ) {
    var s = 31 - Pt(l),
      r = 1 << s,
      o = a[s];
    (o === -1
      ? ((r & n) === 0 || (r & i) !== 0) && (a[s] = eb(r, e))
      : o <= e && (t.expiredLanes |= r),
      (l &= ~r));
  }
  if (
    ((e = J),
    (n = k),
    (n = Or(t, t === e ? n : 0)),
    (i = t.callbackNode),
    n === 0 || (t === e && $ === 2) || t.cancelPendingCommit !== null)
  )
    return (i !== null && i !== null && oo(i), (t.callbackNode = null), (t.callbackPriority = 0));
  if ((n & 3) === 0 || Ul(t, n)) {
    if (((e = n & -n), e === t.callbackPriority)) return e;
    switch ((i !== null && oo(i), Wp(n))) {
      case 2:
      case 8:
        n = Zp;
        break;
      case 32:
        n = Zs;
        break;
      case 268435456:
        n = Qp;
        break;
      default:
        n = Zs;
    }
    return (
      (i = Wg.bind(null, t)),
      (n = Lc(n, i)),
      (t.callbackPriority = e),
      (t.callbackNode = n),
      e
    );
  }
  return (i !== null && i !== null && oo(i), (t.callbackPriority = 2), (t.callbackNode = null), 2);
}
function Wg(t, e) {
  var n = t.callbackNode;
  if (Pi() && t.callbackNode !== n) return null;
  var i = k;
  return (
    (i = Or(t, t === J ? i : 0)),
    i === 0
      ? null
      : (kg(t, i, e),
        Jg(t, Me()),
        t.callbackNode != null && t.callbackNode === n ? Wg.bind(null, t) : null)
  );
}
function bh(t, e) {
  if (Pi()) return null;
  kg(t, e, !0);
}
function O2(t) {
  Y2(function () {
    (rt & 6) !== 0 ? Lc(Kp, t) : t();
  });
}
function Tf() {
  return (In === 0 && (In = Pp()), In);
}
function Sh(t) {
  return t == null || typeof t == "symbol" || typeof t == "boolean"
    ? null
    : typeof t == "function"
      ? t
      : Es("" + t);
}
function xh(t, e) {
  var n = e.ownerDocument.createElement("input");
  return (
    (n.name = e.name),
    (n.value = e.value),
    t.id && n.setAttribute("form", t.id),
    e.parentNode.insertBefore(n, e),
    (t = new FormData(t)),
    n.parentNode.removeChild(n),
    t
  );
}
function z2(t, e, n, i, a) {
  if (e === "submit" && n && n.stateNode === a) {
    var l = Sh((a[Gt] || null).action),
      s = i.submitter;
    s &&
      ((e = (e = s[Gt] || null) ? Sh(e.formAction) : s.getAttribute("formAction")),
      e !== null && ((l = e), (s = null)));
    var r = new zr("action", "action", null, i, a);
    t.push({
      event: r,
      listeners: [
        {
          instance: null,
          listener: function () {
            if (i.defaultPrevented) {
              if (In !== 0) {
                var o = s ? xh(a, s) : new FormData(a);
                Vu(n, { pending: !0, data: o, method: a.method, action: l }, null, o);
              }
            } else
              typeof l == "function" &&
                (r.preventDefault(),
                (o = s ? xh(a, s) : new FormData(a)),
                Vu(n, { pending: !0, data: o, method: a.method, action: l }, l, o));
          },
          currentTarget: a,
        },
      ],
    });
  }
}
for (var Bo = 0; Bo < qd.length; Bo++) {
  var Uo = qd[Bo],
    V2 = Uo.toLowerCase(),
    _2 = Uo[0].toUpperCase() + Uo.slice(1);
  be(V2, "on" + _2);
}
be(b0, "onAnimationEnd");
be(S0, "onAnimationIteration");
be(x0, "onAnimationStart");
be("dblclick", "onDoubleClick");
be("focusin", "onFocus");
be("focusout", "onBlur");
be($b, "onTransitionRun");
be(Jb, "onTransitionStart");
be(Wb, "onTransitionCancel");
be(T0, "onTransitionEnd");
$i("onMouseEnter", ["mouseout", "mouseover"]);
$i("onMouseLeave", ["mouseout", "mouseover"]);
$i("onPointerEnter", ["pointerout", "pointerover"]);
$i("onPointerLeave", ["pointerout", "pointerover"]);
oi("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
oi(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "),
);
oi("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
oi("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
oi("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
oi("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var bl =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  B2 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(bl),
  );
function Ig(t, e) {
  e = (e & 4) !== 0;
  for (var n = 0; n < t.length; n++) {
    var i = t[n],
      a = i.event;
    i = i.listeners;
    t: {
      var l = void 0;
      if (e)
        for (var s = i.length - 1; 0 <= s; s--) {
          var r = i[s],
            o = r.instance,
            u = r.currentTarget;
          if (((r = r.listener), o !== l && a.isPropagationStopped())) break t;
          ((l = r), (a.currentTarget = u));
          try {
            l(a);
          } catch (c) {
            nr(c);
          }
          ((a.currentTarget = null), (l = o));
        }
      else
        for (s = 0; s < i.length; s++) {
          if (
            ((r = i[s]),
            (o = r.instance),
            (u = r.currentTarget),
            (r = r.listener),
            o !== l && a.isPropagationStopped())
          )
            break t;
          ((l = r), (a.currentTarget = u));
          try {
            l(a);
          } catch (c) {
            nr(c);
          }
          ((a.currentTarget = null), (l = o));
        }
    }
  }
}
function q(t, e) {
  var n = e[bu];
  n === void 0 && (n = e[bu] = new Set());
  var i = t + "__bubble";
  n.has(i) || (ty(e, t, 2, !1), n.add(i));
}
function No(t, e, n) {
  var i = 0;
  (e && (i |= 4), ty(n, t, i, e));
}
var fs = "_reactListening" + Math.random().toString(36).slice(2);
function Af(t) {
  if (!t[fs]) {
    ((t[fs] = !0),
      t0.forEach(function (n) {
        n !== "selectionchange" && (B2.has(n) || No(n, !1, t), No(n, !0, t));
      }));
    var e = t.nodeType === 9 ? t : t.ownerDocument;
    e === null || e[fs] || ((e[fs] = !0), No("selectionchange", !1, e));
  }
}
function ty(t, e, n, i) {
  switch (dy(e)) {
    case 2:
      var a = sS;
      break;
    case 8:
      a = rS;
      break;
    default:
      a = wf;
  }
  ((n = a.bind(null, e, n, t)),
    (a = void 0),
    !Au || (e !== "touchstart" && e !== "touchmove" && e !== "wheel") || (a = !0),
    i
      ? a !== void 0
        ? t.addEventListener(e, n, { capture: !0, passive: a })
        : t.addEventListener(e, n, !0)
      : a !== void 0
        ? t.addEventListener(e, n, { passive: a })
        : t.addEventListener(e, n, !1));
}
function jo(t, e, n, i, a) {
  var l = i;
  if ((e & 1) === 0 && (e & 2) === 0 && i !== null)
    t: for (;;) {
      if (i === null) return;
      var s = i.tag;
      if (s === 3 || s === 4) {
        var r = i.stateNode.containerInfo;
        if (r === a || (r.nodeType === 8 && r.parentNode === a)) break;
        if (s === 4)
          for (s = i.return; s !== null; ) {
            var o = s.tag;
            if (
              (o === 3 || o === 4) &&
              ((o = s.stateNode.containerInfo), o === a || (o.nodeType === 8 && o.parentNode === a))
            )
              return;
            s = s.return;
          }
        for (; r !== null; ) {
          if (((s = kn(r)), s === null)) return;
          if (((o = s.tag), o === 5 || o === 6 || o === 26 || o === 27)) {
            i = l = s;
            continue t;
          }
          r = r.parentNode;
        }
      }
      i = i.return;
    }
  o0(function () {
    var u = l,
      c = qc(n),
      d = [];
    t: {
      var f = A0.get(t);
      if (f !== void 0) {
        var h = zr,
          y = t;
        switch (t) {
          case "keypress":
            if (Ds(n) === 0) break t;
          case "keydown":
          case "keyup":
            h = wb;
            break;
          case "focusin":
            ((y = "focus"), (h = mo));
            break;
          case "focusout":
            ((y = "blur"), (h = mo));
            break;
          case "beforeblur":
          case "afterblur":
            h = mo;
            break;
          case "click":
            if (n.button === 2) break t;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            h = Od;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            h = pb;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            h = Ob;
            break;
          case b0:
          case S0:
          case x0:
            h = vb;
            break;
          case T0:
            h = Vb;
            break;
          case "scroll":
          case "scrollend":
            h = hb;
            break;
          case "wheel":
            h = Bb;
            break;
          case "copy":
          case "cut":
          case "paste":
            h = Sb;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            h = Vd;
            break;
          case "toggle":
          case "beforetoggle":
            h = Nb;
        }
        var b = (e & 4) !== 0,
          E = !b && (t === "scroll" || t === "scrollend"),
          m = b ? (f !== null ? f + "Capture" : null) : f;
        b = [];
        for (var p = u, g; p !== null; ) {
          var v = p;
          if (
            ((g = v.stateNode),
            (v = v.tag),
            (v !== 5 && v !== 26 && v !== 27) ||
              g === null ||
              m === null ||
              ((v = hl(p, m)), v != null && b.push(Sl(p, v, g))),
            E)
          )
            break;
          p = p.return;
        }
        0 < b.length && ((f = new h(f, y, null, n, c)), d.push({ event: f, listeners: b }));
      }
    }
    if ((e & 7) === 0) {
      t: {
        if (
          ((f = t === "mouseover" || t === "pointerover"),
          (h = t === "mouseout" || t === "pointerout"),
          f && n !== Tu && (y = n.relatedTarget || n.fromElement) && (kn(y) || y[ma]))
        )
          break t;
        if (
          (h || f) &&
          ((f =
            c.window === c ? c : (f = c.ownerDocument) ? f.defaultView || f.parentWindow : window),
          h
            ? ((y = n.relatedTarget || n.toElement),
              (h = u),
              (y = y ? kn(y) : null),
              y !== null &&
                ((E = ha(y)), (b = y.tag), y !== E || (b !== 5 && b !== 27 && b !== 6)) &&
                (y = null))
            : ((h = null), (y = u)),
          h !== y)
        ) {
          if (
            ((b = Od),
            (v = "onMouseLeave"),
            (m = "onMouseEnter"),
            (p = "mouse"),
            (t === "pointerout" || t === "pointerover") &&
              ((b = Vd), (v = "onPointerLeave"), (m = "onPointerEnter"), (p = "pointer")),
            (E = h == null ? f : La(h)),
            (g = y == null ? f : La(y)),
            (f = new b(v, p + "leave", h, n, c)),
            (f.target = E),
            (f.relatedTarget = g),
            (v = null),
            kn(c) === u &&
              ((b = new b(m, p + "enter", y, n, c)),
              (b.target = g),
              (b.relatedTarget = E),
              (v = b)),
            (E = v),
            h && y)
          )
            e: {
              for (b = h, m = y, p = 0, g = b; g; g = vi(g)) p++;
              for (g = 0, v = m; v; v = vi(v)) g++;
              for (; 0 < p - g; ) ((b = vi(b)), p--);
              for (; 0 < g - p; ) ((m = vi(m)), g--);
              for (; p--; ) {
                if (b === m || (m !== null && b === m.alternate)) break e;
                ((b = vi(b)), (m = vi(m)));
              }
              b = null;
            }
          else b = null;
          (h !== null && Th(d, f, h, b, !1), y !== null && E !== null && Th(d, E, y, b, !0));
        }
      }
      t: {
        if (
          ((f = u ? La(u) : window),
          (h = f.nodeName && f.nodeName.toLowerCase()),
          h === "select" || (h === "input" && f.type === "file"))
        )
          var S = Nd;
        else if (Ud(f))
          if (m0) S = Zb;
          else {
            S = Xb;
            var T = kb;
          }
        else
          ((h = f.nodeName),
            !h || h.toLowerCase() !== "input" || (f.type !== "checkbox" && f.type !== "radio")
              ? u && Gc(u.elementType) && (S = Nd)
              : (S = Kb));
        if (S && (S = S(t, u))) {
          h0(d, S, n, c);
          break t;
        }
        (T && T(t, f, u),
          t === "focusout" &&
            u &&
            f.type === "number" &&
            u.memoizedProps.value != null &&
            xu(f, "number", f.value));
      }
      switch (((T = u ? La(u) : window), t)) {
        case "focusin":
          (Ud(T) || T.contentEditable === "true") && ((Ci = T), (Eu = u), (Qa = null));
          break;
        case "focusout":
          Qa = Eu = Ci = null;
          break;
        case "mousedown":
          Mu = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((Mu = !1), Gd(d, n, c));
          break;
        case "selectionchange":
          if (Fb) break;
        case "keydown":
        case "keyup":
          Gd(d, n, c);
      }
      var x;
      if (Kc)
        t: {
          switch (t) {
            case "compositionstart":
              var M = "onCompositionStart";
              break t;
            case "compositionend":
              M = "onCompositionEnd";
              break t;
            case "compositionupdate":
              M = "onCompositionUpdate";
              break t;
          }
          M = void 0;
        }
      else
        wi
          ? f0(t, n) && (M = "onCompositionEnd")
          : t === "keydown" && n.keyCode === 229 && (M = "onCompositionStart");
      (M &&
        (c0 &&
          n.locale !== "ko" &&
          (wi || M !== "onCompositionStart"
            ? M === "onCompositionEnd" && wi && (x = u0())
            : ((yn = c), (kc = "value" in yn ? yn.value : yn.textContent), (wi = !0))),
        (T = cr(u, M)),
        0 < T.length &&
          ((M = new zd(M, t, null, n, c)),
          d.push({ event: M, listeners: T }),
          x ? (M.data = x) : ((x = d0(n)), x !== null && (M.data = x)))),
        (x = Hb ? Lb(t, n) : Yb(t, n)) &&
          ((M = cr(u, "onBeforeInput")),
          0 < M.length &&
            ((T = new zd("onBeforeInput", "beforeinput", null, n, c)),
            d.push({ event: T, listeners: M }),
            (T.data = x))),
        z2(d, t, u, n, c));
    }
    Ig(d, e);
  });
}
function Sl(t, e, n) {
  return { instance: t, listener: e, currentTarget: n };
}
function cr(t, e) {
  for (var n = e + "Capture", i = []; t !== null; ) {
    var a = t,
      l = a.stateNode;
    ((a = a.tag),
      (a !== 5 && a !== 26 && a !== 27) ||
        l === null ||
        ((a = hl(t, n)),
        a != null && i.unshift(Sl(t, a, l)),
        (a = hl(t, e)),
        a != null && i.push(Sl(t, a, l))),
      (t = t.return));
  }
  return i;
}
function vi(t) {
  if (t === null) return null;
  do t = t.return;
  while (t && t.tag !== 5 && t.tag !== 27);
  return t || null;
}
function Th(t, e, n, i, a) {
  for (var l = e._reactName, s = []; n !== null && n !== i; ) {
    var r = n,
      o = r.alternate,
      u = r.stateNode;
    if (((r = r.tag), o !== null && o === i)) break;
    ((r !== 5 && r !== 26 && r !== 27) ||
      u === null ||
      ((o = u),
      a
        ? ((u = hl(n, l)), u != null && s.unshift(Sl(n, u, o)))
        : a || ((u = hl(n, l)), u != null && s.push(Sl(n, u, o)))),
      (n = n.return));
  }
  s.length !== 0 && t.push({ event: e, listeners: s });
}
var U2 = /\r\n?/g,
  N2 = /\u0000|\uFFFD/g;
function Ah(t) {
  return (typeof t == "string" ? t : "" + t)
    .replace(
      U2,
      `
`,
    )
    .replace(N2, "");
}
function ey(t, e) {
  return ((e = Ah(e)), Ah(t) === e);
}
function qr() {}
function Z(t, e, n, i, a, l) {
  switch (n) {
    case "children":
      typeof i == "string"
        ? e === "body" || (e === "textarea" && i === "") || Ji(t, i)
        : (typeof i == "number" || typeof i == "bigint") && e !== "body" && Ji(t, "" + i);
      break;
    case "className":
      is(t, "class", i);
      break;
    case "tabIndex":
      is(t, "tabindex", i);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      is(t, n, i);
      break;
    case "style":
      r0(t, i, l);
      break;
    case "data":
      if (e !== "object") {
        is(t, "data", i);
        break;
      }
    case "src":
    case "href":
      if (i === "" && (e !== "a" || n !== "href")) {
        t.removeAttribute(n);
        break;
      }
      if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
        t.removeAttribute(n);
        break;
      }
      ((i = Es("" + i)), t.setAttribute(n, i));
      break;
    case "action":
    case "formAction":
      if (typeof i == "function") {
        t.setAttribute(
          n,
          "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
        );
        break;
      } else
        typeof l == "function" &&
          (n === "formAction"
            ? (e !== "input" && Z(t, e, "name", a.name, a, null),
              Z(t, e, "formEncType", a.formEncType, a, null),
              Z(t, e, "formMethod", a.formMethod, a, null),
              Z(t, e, "formTarget", a.formTarget, a, null))
            : (Z(t, e, "encType", a.encType, a, null),
              Z(t, e, "method", a.method, a, null),
              Z(t, e, "target", a.target, a, null)));
      if (i == null || typeof i == "symbol" || typeof i == "boolean") {
        t.removeAttribute(n);
        break;
      }
      ((i = Es("" + i)), t.setAttribute(n, i));
      break;
    case "onClick":
      i != null && (t.onclick = qr);
      break;
    case "onScroll":
      i != null && q("scroll", t);
      break;
    case "onScrollEnd":
      i != null && q("scrollend", t);
      break;
    case "dangerouslySetInnerHTML":
      if (i != null) {
        if (typeof i != "object" || !("__html" in i)) throw Error(A(61));
        if (((n = i.__html), n != null)) {
          if (a.children != null) throw Error(A(60));
          t.innerHTML = n;
        }
      }
      break;
    case "multiple":
      t.multiple = i && typeof i != "function" && typeof i != "symbol";
      break;
    case "muted":
      t.muted = i && typeof i != "function" && typeof i != "symbol";
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "ref":
      break;
    case "autoFocus":
      break;
    case "xlinkHref":
      if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
        t.removeAttribute("xlink:href");
        break;
      }
      ((n = Es("" + i)), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n));
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      i != null && typeof i != "function" && typeof i != "symbol"
        ? t.setAttribute(n, "" + i)
        : t.removeAttribute(n);
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      i && typeof i != "function" && typeof i != "symbol"
        ? t.setAttribute(n, "")
        : t.removeAttribute(n);
      break;
    case "capture":
    case "download":
      i === !0
        ? t.setAttribute(n, "")
        : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol"
          ? t.setAttribute(n, i)
          : t.removeAttribute(n);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i
        ? t.setAttribute(n, i)
        : t.removeAttribute(n);
      break;
    case "rowSpan":
    case "start":
      i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i)
        ? t.removeAttribute(n)
        : t.setAttribute(n, i);
      break;
    case "popover":
      (q("beforetoggle", t), q("toggle", t), As(t, "popover", i));
      break;
    case "xlinkActuate":
      Be(t, "http://www.w3.org/1999/xlink", "xlink:actuate", i);
      break;
    case "xlinkArcrole":
      Be(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", i);
      break;
    case "xlinkRole":
      Be(t, "http://www.w3.org/1999/xlink", "xlink:role", i);
      break;
    case "xlinkShow":
      Be(t, "http://www.w3.org/1999/xlink", "xlink:show", i);
      break;
    case "xlinkTitle":
      Be(t, "http://www.w3.org/1999/xlink", "xlink:title", i);
      break;
    case "xlinkType":
      Be(t, "http://www.w3.org/1999/xlink", "xlink:type", i);
      break;
    case "xmlBase":
      Be(t, "http://www.w3.org/XML/1998/namespace", "xml:base", i);
      break;
    case "xmlLang":
      Be(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", i);
      break;
    case "xmlSpace":
      Be(t, "http://www.w3.org/XML/1998/namespace", "xml:space", i);
      break;
    case "is":
      As(t, "is", i);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < n.length) || (n[0] !== "o" && n[0] !== "O") || (n[1] !== "n" && n[1] !== "N")) &&
        ((n = fb.get(n) || n), As(t, n, i));
  }
}
function Ju(t, e, n, i, a, l) {
  switch (n) {
    case "style":
      r0(t, i, l);
      break;
    case "dangerouslySetInnerHTML":
      if (i != null) {
        if (typeof i != "object" || !("__html" in i)) throw Error(A(61));
        if (((n = i.__html), n != null)) {
          if (a.children != null) throw Error(A(60));
          t.innerHTML = n;
        }
      }
      break;
    case "children":
      typeof i == "string"
        ? Ji(t, i)
        : (typeof i == "number" || typeof i == "bigint") && Ji(t, "" + i);
      break;
    case "onScroll":
      i != null && q("scroll", t);
      break;
    case "onScrollEnd":
      i != null && q("scrollend", t);
      break;
    case "onClick":
      i != null && (t.onclick = qr);
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "innerHTML":
    case "ref":
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      if (!e0.hasOwnProperty(n))
        t: {
          if (
            n[0] === "o" &&
            n[1] === "n" &&
            ((a = n.endsWith("Capture")),
            (e = n.slice(2, a ? n.length - 7 : void 0)),
            (l = t[Gt] || null),
            (l = l != null ? l[n] : null),
            typeof l == "function" && t.removeEventListener(e, l, a),
            typeof i == "function")
          ) {
            (typeof l != "function" &&
              l !== null &&
              (n in t ? (t[n] = null) : t.hasAttribute(n) && t.removeAttribute(n)),
              t.addEventListener(e, i, a));
            break t;
          }
          n in t ? (t[n] = i) : i === !0 ? t.setAttribute(n, "") : As(t, n, i);
        }
  }
}
function Ct(t, e, n) {
  switch (e) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "img":
      (q("error", t), q("load", t));
      var i = !1,
        a = !1,
        l;
      for (l in n)
        if (n.hasOwnProperty(l)) {
          var s = n[l];
          if (s != null)
            switch (l) {
              case "src":
                i = !0;
                break;
              case "srcSet":
                a = !0;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(A(137, e));
              default:
                Z(t, e, l, s, n, null);
            }
        }
      (a && Z(t, e, "srcSet", n.srcSet, n, null), i && Z(t, e, "src", n.src, n, null));
      return;
    case "input":
      q("invalid", t);
      var r = (l = s = a = null),
        o = null,
        u = null;
      for (i in n)
        if (n.hasOwnProperty(i)) {
          var c = n[i];
          if (c != null)
            switch (i) {
              case "name":
                a = c;
                break;
              case "type":
                s = c;
                break;
              case "checked":
                o = c;
                break;
              case "defaultChecked":
                u = c;
                break;
              case "value":
                l = c;
                break;
              case "defaultValue":
                r = c;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(A(137, e));
                break;
              default:
                Z(t, e, i, c, n, null);
            }
        }
      (a0(t, l, r, o, u, s, a, !1), Qs(t));
      return;
    case "select":
      (q("invalid", t), (i = s = l = null));
      for (a in n)
        if (n.hasOwnProperty(a) && ((r = n[a]), r != null))
          switch (a) {
            case "value":
              l = r;
              break;
            case "defaultValue":
              s = r;
              break;
            case "multiple":
              i = r;
            default:
              Z(t, e, a, r, n, null);
          }
      ((e = l),
        (n = s),
        (t.multiple = !!i),
        e != null ? qi(t, !!i, e, !1) : n != null && qi(t, !!i, n, !0));
      return;
    case "textarea":
      (q("invalid", t), (l = a = i = null));
      for (s in n)
        if (n.hasOwnProperty(s) && ((r = n[s]), r != null))
          switch (s) {
            case "value":
              i = r;
              break;
            case "defaultValue":
              a = r;
              break;
            case "children":
              l = r;
              break;
            case "dangerouslySetInnerHTML":
              if (r != null) throw Error(A(91));
              break;
            default:
              Z(t, e, s, r, n, null);
          }
      (s0(t, i, a, l), Qs(t));
      return;
    case "option":
      for (o in n)
        if (n.hasOwnProperty(o) && ((i = n[o]), i != null))
          switch (o) {
            case "selected":
              t.selected = i && typeof i != "function" && typeof i != "symbol";
              break;
            default:
              Z(t, e, o, i, n, null);
          }
      return;
    case "dialog":
      (q("cancel", t), q("close", t));
      break;
    case "iframe":
    case "object":
      q("load", t);
      break;
    case "video":
    case "audio":
      for (i = 0; i < bl.length; i++) q(bl[i], t);
      break;
    case "image":
      (q("error", t), q("load", t));
      break;
    case "details":
      q("toggle", t);
      break;
    case "embed":
    case "source":
    case "link":
      (q("error", t), q("load", t));
    case "area":
    case "base":
    case "br":
    case "col":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "track":
    case "wbr":
    case "menuitem":
      for (u in n)
        if (n.hasOwnProperty(u) && ((i = n[u]), i != null))
          switch (u) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(A(137, e));
            default:
              Z(t, e, u, i, n, null);
          }
      return;
    default:
      if (Gc(e)) {
        for (c in n) n.hasOwnProperty(c) && ((i = n[c]), i !== void 0 && Ju(t, e, c, i, n, void 0));
        return;
      }
  }
  for (r in n) n.hasOwnProperty(r) && ((i = n[r]), i != null && Z(t, e, r, i, n, null));
}
function j2(t, e, n, i) {
  switch (e) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "input":
      var a = null,
        l = null,
        s = null,
        r = null,
        o = null,
        u = null,
        c = null;
      for (h in n) {
        var d = n[h];
        if (n.hasOwnProperty(h) && d != null)
          switch (h) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              o = d;
            default:
              i.hasOwnProperty(h) || Z(t, e, h, null, i, d);
          }
      }
      for (var f in i) {
        var h = i[f];
        if (((d = n[f]), i.hasOwnProperty(f) && (h != null || d != null)))
          switch (f) {
            case "type":
              l = h;
              break;
            case "name":
              a = h;
              break;
            case "checked":
              u = h;
              break;
            case "defaultChecked":
              c = h;
              break;
            case "value":
              s = h;
              break;
            case "defaultValue":
              r = h;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (h != null) throw Error(A(137, e));
              break;
            default:
              h !== d && Z(t, e, f, h, i, d);
          }
      }
      Su(t, s, r, o, u, c, l, a);
      return;
    case "select":
      h = s = r = f = null;
      for (l in n)
        if (((o = n[l]), n.hasOwnProperty(l) && o != null))
          switch (l) {
            case "value":
              break;
            case "multiple":
              h = o;
            default:
              i.hasOwnProperty(l) || Z(t, e, l, null, i, o);
          }
      for (a in i)
        if (((l = i[a]), (o = n[a]), i.hasOwnProperty(a) && (l != null || o != null)))
          switch (a) {
            case "value":
              f = l;
              break;
            case "defaultValue":
              r = l;
              break;
            case "multiple":
              s = l;
            default:
              l !== o && Z(t, e, a, l, i, o);
          }
      ((e = r),
        (n = s),
        (i = h),
        f != null
          ? qi(t, !!n, f, !1)
          : !!i != !!n && (e != null ? qi(t, !!n, e, !0) : qi(t, !!n, n ? [] : "", !1)));
      return;
    case "textarea":
      h = f = null;
      for (r in n)
        if (((a = n[r]), n.hasOwnProperty(r) && a != null && !i.hasOwnProperty(r)))
          switch (r) {
            case "value":
              break;
            case "children":
              break;
            default:
              Z(t, e, r, null, i, a);
          }
      for (s in i)
        if (((a = i[s]), (l = n[s]), i.hasOwnProperty(s) && (a != null || l != null)))
          switch (s) {
            case "value":
              f = a;
              break;
            case "defaultValue":
              h = a;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (a != null) throw Error(A(91));
              break;
            default:
              a !== l && Z(t, e, s, a, i, l);
          }
      l0(t, f, h);
      return;
    case "option":
      for (var y in n)
        if (((f = n[y]), n.hasOwnProperty(y) && f != null && !i.hasOwnProperty(y)))
          switch (y) {
            case "selected":
              t.selected = !1;
              break;
            default:
              Z(t, e, y, null, i, f);
          }
      for (o in i)
        if (((f = i[o]), (h = n[o]), i.hasOwnProperty(o) && f !== h && (f != null || h != null)))
          switch (o) {
            case "selected":
              t.selected = f && typeof f != "function" && typeof f != "symbol";
              break;
            default:
              Z(t, e, o, f, i, h);
          }
      return;
    case "img":
    case "link":
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
    case "menuitem":
      for (var b in n)
        ((f = n[b]),
          n.hasOwnProperty(b) && f != null && !i.hasOwnProperty(b) && Z(t, e, b, null, i, f));
      for (u in i)
        if (((f = i[u]), (h = n[u]), i.hasOwnProperty(u) && f !== h && (f != null || h != null)))
          switch (u) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (f != null) throw Error(A(137, e));
              break;
            default:
              Z(t, e, u, f, i, h);
          }
      return;
    default:
      if (Gc(e)) {
        for (var E in n)
          ((f = n[E]),
            n.hasOwnProperty(E) &&
              f !== void 0 &&
              !i.hasOwnProperty(E) &&
              Ju(t, e, E, void 0, i, f));
        for (c in i)
          ((f = i[c]),
            (h = n[c]),
            !i.hasOwnProperty(c) ||
              f === h ||
              (f === void 0 && h === void 0) ||
              Ju(t, e, c, f, i, h));
        return;
      }
  }
  for (var m in n)
    ((f = n[m]),
      n.hasOwnProperty(m) && f != null && !i.hasOwnProperty(m) && Z(t, e, m, null, i, f));
  for (d in i)
    ((f = i[d]),
      (h = n[d]),
      !i.hasOwnProperty(d) || f === h || (f == null && h == null) || Z(t, e, d, f, i, h));
}
var Wu = null,
  Iu = null;
function fr(t) {
  return t.nodeType === 9 ? t : t.ownerDocument;
}
function Eh(t) {
  switch (t) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function ny(t, e) {
  if (t === 0)
    switch (e) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
  return t === 1 && e === "foreignObject" ? 0 : t;
}
function tc(t, e) {
  return (
    t === "textarea" ||
    t === "noscript" ||
    typeof e.children == "string" ||
    typeof e.children == "number" ||
    typeof e.children == "bigint" ||
    (typeof e.dangerouslySetInnerHTML == "object" &&
      e.dangerouslySetInnerHTML !== null &&
      e.dangerouslySetInnerHTML.__html != null)
  );
}
var Ho = null;
function H2() {
  var t = window.event;
  return t && t.type === "popstate" ? (t === Ho ? !1 : ((Ho = t), !0)) : ((Ho = null), !1);
}
var iy = typeof setTimeout == "function" ? setTimeout : void 0,
  L2 = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Mh = typeof Promise == "function" ? Promise : void 0,
  Y2 =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Mh < "u"
        ? function (t) {
            return Mh.resolve(null).then(t).catch(G2);
          }
        : iy;
function G2(t) {
  setTimeout(function () {
    throw t;
  });
}
function Lo(t, e) {
  var n = e,
    i = 0;
  do {
    var a = n.nextSibling;
    if ((t.removeChild(n), a && a.nodeType === 8))
      if (((n = a.data), n === "/$")) {
        if (i === 0) {
          (t.removeChild(a), Ml(e));
          return;
        }
        i--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || i++;
    n = a;
  } while (n);
  Ml(e);
}
function ec(t) {
  var e = t.firstChild;
  for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
    var n = e;
    switch (((e = e.nextSibling), n.nodeName)) {
      case "HTML":
      case "HEAD":
      case "BODY":
        (ec(n), Yc(n));
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if (n.rel.toLowerCase() === "stylesheet") continue;
    }
    t.removeChild(n);
  }
}
function q2(t, e, n, i) {
  for (; t.nodeType === 1; ) {
    var a = n;
    if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
      if (!i && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
    } else if (i) {
      if (!t[dl])
        switch (e) {
          case "meta":
            if (!t.hasAttribute("itemprop")) break;
            return t;
          case "link":
            if (
              ((l = t.getAttribute("rel")), l === "stylesheet" && t.hasAttribute("data-precedence"))
            )
              break;
            if (
              l !== a.rel ||
              t.getAttribute("href") !== (a.href == null ? null : a.href) ||
              t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) ||
              t.getAttribute("title") !== (a.title == null ? null : a.title)
            )
              break;
            return t;
          case "style":
            if (t.hasAttribute("data-precedence")) break;
            return t;
          case "script":
            if (
              ((l = t.getAttribute("src")),
              (l !== (a.src == null ? null : a.src) ||
                t.getAttribute("type") !== (a.type == null ? null : a.type) ||
                t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) &&
                l &&
                t.hasAttribute("async") &&
                !t.hasAttribute("itemprop"))
            )
              break;
            return t;
          default:
            return t;
        }
    } else if (e === "input" && t.type === "hidden") {
      var l = a.name == null ? null : "" + a.name;
      if (a.type === "hidden" && t.getAttribute("name") === l) return t;
    } else return t;
    if (((t = ye(t.nextSibling)), t === null)) break;
  }
  return null;
}
function k2(t, e, n) {
  if (e === "") return null;
  for (; t.nodeType !== 3; )
    if (
      ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n) ||
      ((t = ye(t.nextSibling)), t === null)
    )
      return null;
  return t;
}
function ye(t) {
  for (; t != null; t = t.nextSibling) {
    var e = t.nodeType;
    if (e === 1 || e === 3) break;
    if (e === 8) {
      if (((e = t.data), e === "$" || e === "$!" || e === "$?" || e === "F!" || e === "F")) break;
      if (e === "/$") return null;
    }
  }
  return t;
}
function Dh(t) {
  t = t.previousSibling;
  for (var e = 0; t; ) {
    if (t.nodeType === 8) {
      var n = t.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (e === 0) return t;
        e--;
      } else n === "/$" && e++;
    }
    t = t.previousSibling;
  }
  return null;
}
function ay(t, e, n) {
  switch (((e = fr(n)), t)) {
    case "html":
      if (((t = e.documentElement), !t)) throw Error(A(452));
      return t;
    case "head":
      if (((t = e.head), !t)) throw Error(A(453));
      return t;
    case "body":
      if (((t = e.body), !t)) throw Error(A(454));
      return t;
    default:
      throw Error(A(451));
  }
}
var fe = new Map(),
  wh = new Set();
function dr(t) {
  return typeof t.getRootNode == "function" ? t.getRootNode() : t.ownerDocument;
}
var en = tt.d;
tt.d = { f: X2, r: K2, D: Z2, C: Q2, L: P2, m: F2, X: J2, S: $2, M: W2 };
function X2() {
  var t = en.f(),
    e = Yr();
  return t || e;
}
function K2(t) {
  var e = pa(t);
  e !== null && e.tag === 5 && e.type === "form" ? ag(e) : en.r(t);
}
var ya = typeof document > "u" ? null : document;
function ly(t, e, n) {
  var i = ya;
  if (i && typeof e == "string" && e) {
    var a = se(e);
    ((a = 'link[rel="' + t + '"][href="' + a + '"]'),
      typeof n == "string" && (a += '[crossorigin="' + n + '"]'),
      wh.has(a) ||
        (wh.add(a),
        (t = { rel: t, crossOrigin: n, href: e }),
        i.querySelector(a) === null &&
          ((e = i.createElement("link")), Ct(e, "link", t), Tt(e), i.head.appendChild(e))));
  }
}
function Z2(t) {
  (en.D(t), ly("dns-prefetch", t, null));
}
function Q2(t, e) {
  (en.C(t, e), ly("preconnect", t, e));
}
function P2(t, e, n) {
  en.L(t, e, n);
  var i = ya;
  if (i && t && e) {
    var a = 'link[rel="preload"][as="' + se(e) + '"]';
    e === "image" && n && n.imageSrcSet
      ? ((a += '[imagesrcset="' + se(n.imageSrcSet) + '"]'),
        typeof n.imageSizes == "string" && (a += '[imagesizes="' + se(n.imageSizes) + '"]'))
      : (a += '[href="' + se(t) + '"]');
    var l = a;
    switch (e) {
      case "style":
        l = ia(t);
        break;
      case "script":
        l = va(t);
    }
    fe.has(l) ||
      ((t = et(
        { rel: "preload", href: e === "image" && n && n.imageSrcSet ? void 0 : t, as: e },
        n,
      )),
      fe.set(l, t),
      i.querySelector(a) !== null ||
        (e === "style" && i.querySelector(Xl(l))) ||
        (e === "script" && i.querySelector(Kl(l))) ||
        ((e = i.createElement("link")), Ct(e, "link", t), Tt(e), i.head.appendChild(e)));
  }
}
function F2(t, e) {
  en.m(t, e);
  var n = ya;
  if (n && t) {
    var i = e && typeof e.as == "string" ? e.as : "script",
      a = 'link[rel="modulepreload"][as="' + se(i) + '"][href="' + se(t) + '"]',
      l = a;
    switch (i) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        l = va(t);
    }
    if (
      !fe.has(l) &&
      ((t = et({ rel: "modulepreload", href: t }, e)), fe.set(l, t), n.querySelector(a) === null)
    ) {
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (n.querySelector(Kl(l))) return;
      }
      ((i = n.createElement("link")), Ct(i, "link", t), Tt(i), n.head.appendChild(i));
    }
  }
}
function $2(t, e, n) {
  en.S(t, e, n);
  var i = ya;
  if (i && t) {
    var a = Gi(i).hoistableStyles,
      l = ia(t);
    e = e || "default";
    var s = a.get(l);
    if (!s) {
      var r = { loading: 0, preload: null };
      if ((s = i.querySelector(Xl(l)))) r.loading = 5;
      else {
        ((t = et({ rel: "stylesheet", href: t, "data-precedence": e }, n)),
          (n = fe.get(l)) && Ef(t, n));
        var o = (s = i.createElement("link"));
        (Tt(o),
          Ct(o, "link", t),
          (o._p = new Promise(function (u, c) {
            ((o.onload = u), (o.onerror = c));
          })),
          o.addEventListener("load", function () {
            r.loading |= 1;
          }),
          o.addEventListener("error", function () {
            r.loading |= 2;
          }),
          (r.loading |= 4),
          Vs(s, e, i));
      }
      ((s = { type: "stylesheet", instance: s, count: 1, state: r }), a.set(l, s));
    }
  }
}
function J2(t, e) {
  en.X(t, e);
  var n = ya;
  if (n && t) {
    var i = Gi(n).hoistableScripts,
      a = va(t),
      l = i.get(a);
    l ||
      ((l = n.querySelector(Kl(a))),
      l ||
        ((t = et({ src: t, async: !0 }, e)),
        (e = fe.get(a)) && Mf(t, e),
        (l = n.createElement("script")),
        Tt(l),
        Ct(l, "link", t),
        n.head.appendChild(l)),
      (l = { type: "script", instance: l, count: 1, state: null }),
      i.set(a, l));
  }
}
function W2(t, e) {
  en.M(t, e);
  var n = ya;
  if (n && t) {
    var i = Gi(n).hoistableScripts,
      a = va(t),
      l = i.get(a);
    l ||
      ((l = n.querySelector(Kl(a))),
      l ||
        ((t = et({ src: t, async: !0, type: "module" }, e)),
        (e = fe.get(a)) && Mf(t, e),
        (l = n.createElement("script")),
        Tt(l),
        Ct(l, "link", t),
        n.head.appendChild(l)),
      (l = { type: "script", instance: l, count: 1, state: null }),
      i.set(a, l));
  }
}
function Ch(t, e, n, i) {
  var a = (a = vn.current) ? dr(a) : null;
  if (!a) throw Error(A(446));
  switch (t) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof n.precedence == "string" && typeof n.href == "string"
        ? ((e = ia(n.href)),
          (n = Gi(a).hoistableStyles),
          (i = n.get(e)),
          i || ((i = { type: "style", instance: null, count: 0, state: null }), n.set(e, i)),
          i)
        : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
        t = ia(n.href);
        var l = Gi(a).hoistableStyles,
          s = l.get(t);
        if (
          (s ||
            ((a = a.ownerDocument || a),
            (s = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: 0, preload: null },
            }),
            l.set(t, s),
            (l = a.querySelector(Xl(t))) && !l._p && ((s.instance = l), (s.state.loading = 5)),
            fe.has(t) ||
              ((n = {
                rel: "preload",
                as: "style",
                href: n.href,
                crossOrigin: n.crossOrigin,
                integrity: n.integrity,
                media: n.media,
                hrefLang: n.hrefLang,
                referrerPolicy: n.referrerPolicy,
              }),
              fe.set(t, n),
              l || I2(a, t, n, s.state))),
          e && i === null)
        )
          throw Error(A(528, ""));
        return s;
      }
      if (e && i !== null) throw Error(A(529, ""));
      return null;
    case "script":
      return (
        (e = n.async),
        (n = n.src),
        typeof n == "string" && e && typeof e != "function" && typeof e != "symbol"
          ? ((e = va(n)),
            (n = Gi(a).hoistableScripts),
            (i = n.get(e)),
            i || ((i = { type: "script", instance: null, count: 0, state: null }), n.set(e, i)),
            i)
          : { type: "void", instance: null, count: 0, state: null }
      );
    default:
      throw Error(A(444, t));
  }
}
function ia(t) {
  return 'href="' + se(t) + '"';
}
function Xl(t) {
  return 'link[rel="stylesheet"][' + t + "]";
}
function sy(t) {
  return et({}, t, { "data-precedence": t.precedence, precedence: null });
}
function I2(t, e, n, i) {
  t.querySelector('link[rel="preload"][as="style"][' + e + "]")
    ? (i.loading = 1)
    : ((e = t.createElement("link")),
      (i.preload = e),
      e.addEventListener("load", function () {
        return (i.loading |= 1);
      }),
      e.addEventListener("error", function () {
        return (i.loading |= 2);
      }),
      Ct(e, "link", n),
      Tt(e),
      t.head.appendChild(e));
}
function va(t) {
  return '[src="' + se(t) + '"]';
}
function Kl(t) {
  return "script[async]" + t;
}
function Rh(t, e, n) {
  if ((e.count++, e.instance === null))
    switch (e.type) {
      case "style":
        var i = t.querySelector('style[data-href~="' + se(n.href) + '"]');
        if (i) return ((e.instance = i), Tt(i), i);
        var a = et({}, n, {
          "data-href": n.href,
          "data-precedence": n.precedence,
          href: null,
          precedence: null,
        });
        return (
          (i = (t.ownerDocument || t).createElement("style")),
          Tt(i),
          Ct(i, "style", a),
          Vs(i, n.precedence, t),
          (e.instance = i)
        );
      case "stylesheet":
        a = ia(n.href);
        var l = t.querySelector(Xl(a));
        if (l) return ((e.state.loading |= 4), (e.instance = l), Tt(l), l);
        ((i = sy(n)),
          (a = fe.get(a)) && Ef(i, a),
          (l = (t.ownerDocument || t).createElement("link")),
          Tt(l));
        var s = l;
        return (
          (s._p = new Promise(function (r, o) {
            ((s.onload = r), (s.onerror = o));
          })),
          Ct(l, "link", i),
          (e.state.loading |= 4),
          Vs(l, n.precedence, t),
          (e.instance = l)
        );
      case "script":
        return (
          (l = va(n.src)),
          (a = t.querySelector(Kl(l)))
            ? ((e.instance = a), Tt(a), a)
            : ((i = n),
              (a = fe.get(l)) && ((i = et({}, n)), Mf(i, a)),
              (t = t.ownerDocument || t),
              (a = t.createElement("script")),
              Tt(a),
              Ct(a, "link", i),
              t.head.appendChild(a),
              (e.instance = a))
        );
      case "void":
        return null;
      default:
        throw Error(A(443, e.type));
    }
  else
    e.type === "stylesheet" &&
      (e.state.loading & 4) === 0 &&
      ((i = e.instance), (e.state.loading |= 4), Vs(i, n.precedence, t));
  return e.instance;
}
function Vs(t, e, n) {
  for (
    var i = n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
      a = i.length ? i[i.length - 1] : null,
      l = a,
      s = 0;
    s < i.length;
    s++
  ) {
    var r = i[s];
    if (r.dataset.precedence === e) l = r;
    else if (l !== a) break;
  }
  l
    ? l.parentNode.insertBefore(t, l.nextSibling)
    : ((e = n.nodeType === 9 ? n.head : n), e.insertBefore(t, e.firstChild));
}
function Ef(t, e) {
  (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
    t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
    t.title == null && (t.title = e.title));
}
function Mf(t, e) {
  (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
    t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
    t.integrity == null && (t.integrity = e.integrity));
}
var _s = null;
function Oh(t, e, n) {
  if (_s === null) {
    var i = new Map(),
      a = (_s = new Map());
    a.set(n, i);
  } else ((a = _s), (i = a.get(n)), i || ((i = new Map()), a.set(n, i)));
  if (i.has(t)) return i;
  for (i.set(t, null), n = n.getElementsByTagName(t), a = 0; a < n.length; a++) {
    var l = n[a];
    if (
      !(l[dl] || l[Ot] || (t === "link" && l.getAttribute("rel") === "stylesheet")) &&
      l.namespaceURI !== "http://www.w3.org/2000/svg"
    ) {
      var s = l.getAttribute(e) || "";
      s = t + s;
      var r = i.get(s);
      r ? r.push(l) : i.set(s, [l]);
    }
  }
  return i;
}
function zh(t, e, n) {
  ((t = t.ownerDocument || t),
    t.head.insertBefore(n, e === "title" ? t.querySelector("head > title") : null));
}
function tS(t, e, n) {
  if (n === 1 || e.itemProp != null) return !1;
  switch (t) {
    case "meta":
    case "title":
      return !0;
    case "style":
      if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "") break;
      return !0;
    case "link":
      if (
        typeof e.rel != "string" ||
        typeof e.href != "string" ||
        e.href === "" ||
        e.onLoad ||
        e.onError
      )
        break;
      switch (e.rel) {
        case "stylesheet":
          return ((t = e.disabled), typeof e.precedence == "string" && t == null);
        default:
          return !0;
      }
    case "script":
      if (
        e.async &&
        typeof e.async != "function" &&
        typeof e.async != "symbol" &&
        !e.onLoad &&
        !e.onError &&
        e.src &&
        typeof e.src == "string"
      )
        return !0;
  }
  return !1;
}
function ry(t) {
  return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
}
var xl = null;
function eS() {}
function nS(t, e, n) {
  if (xl === null) throw Error(A(475));
  var i = xl;
  if (
    e.type === "stylesheet" &&
    (typeof n.media != "string" || matchMedia(n.media).matches !== !1) &&
    (e.state.loading & 4) === 0
  ) {
    if (e.instance === null) {
      var a = ia(n.href),
        l = t.querySelector(Xl(a));
      if (l) {
        ((t = l._p),
          t !== null &&
            typeof t == "object" &&
            typeof t.then == "function" &&
            (i.count++, (i = hr.bind(i)), t.then(i, i)),
          (e.state.loading |= 4),
          (e.instance = l),
          Tt(l));
        return;
      }
      ((l = t.ownerDocument || t),
        (n = sy(n)),
        (a = fe.get(a)) && Ef(n, a),
        (l = l.createElement("link")),
        Tt(l));
      var s = l;
      ((s._p = new Promise(function (r, o) {
        ((s.onload = r), (s.onerror = o));
      })),
        Ct(l, "link", n),
        (e.instance = l));
    }
    (i.stylesheets === null && (i.stylesheets = new Map()),
      i.stylesheets.set(e, t),
      (t = e.state.preload) &&
        (e.state.loading & 3) === 0 &&
        (i.count++,
        (e = hr.bind(i)),
        t.addEventListener("load", e),
        t.addEventListener("error", e)));
  }
}
function iS() {
  if (xl === null) throw Error(A(475));
  var t = xl;
  return (
    t.stylesheets && t.count === 0 && nc(t, t.stylesheets),
    0 < t.count
      ? function (e) {
          var n = setTimeout(function () {
            if ((t.stylesheets && nc(t, t.stylesheets), t.unsuspend)) {
              var i = t.unsuspend;
              ((t.unsuspend = null), i());
            }
          }, 6e4);
          return (
            (t.unsuspend = e),
            function () {
              ((t.unsuspend = null), clearTimeout(n));
            }
          );
        }
      : null
  );
}
function hr() {
  if ((this.count--, this.count === 0)) {
    if (this.stylesheets) nc(this, this.stylesheets);
    else if (this.unsuspend) {
      var t = this.unsuspend;
      ((this.unsuspend = null), t());
    }
  }
}
var mr = null;
function nc(t, e) {
  ((t.stylesheets = null),
    t.unsuspend !== null &&
      (t.count++, (mr = new Map()), e.forEach(aS, t), (mr = null), hr.call(t)));
}
function aS(t, e) {
  if (!(e.state.loading & 4)) {
    var n = mr.get(t);
    if (n) var i = n.get(null);
    else {
      ((n = new Map()), mr.set(t, n));
      for (
        var a = t.querySelectorAll("link[data-precedence],style[data-precedence]"), l = 0;
        l < a.length;
        l++
      ) {
        var s = a[l];
        (s.nodeName === "LINK" || s.getAttribute("media") !== "not all") &&
          (n.set(s.dataset.precedence, s), (i = s));
      }
      i && n.set(null, i);
    }
    ((a = e.instance),
      (s = a.getAttribute("data-precedence")),
      (l = n.get(s) || i),
      l === i && n.set(null, a),
      n.set(s, a),
      this.count++,
      (i = hr.bind(this)),
      a.addEventListener("load", i),
      a.addEventListener("error", i),
      l
        ? l.parentNode.insertBefore(a, l.nextSibling)
        : ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(a, t.firstChild)),
      (e.state.loading |= 4));
  }
}
var Tl = {
  $$typeof: qe,
  Provider: null,
  Consumer: null,
  _currentValue: Pn,
  _currentValue2: Pn,
  _threadCount: 0,
};
function lS(t, e, n, i, a, l, s, r) {
  ((this.tag = 1),
    (this.containerInfo = t),
    (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode =
      this.next =
      this.pendingContext =
      this.context =
      this.cancelPendingCommit =
        null),
    (this.callbackPriority = 0),
    (this.expirationTimes = uo(-1)),
    (this.entangledLanes =
      this.shellSuspendCounter =
      this.errorRecoveryDisabledLanes =
      this.finishedLanes =
      this.expiredLanes =
      this.warmLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = uo(0)),
    (this.hiddenUpdates = uo(null)),
    (this.identifierPrefix = i),
    (this.onUncaughtError = a),
    (this.onCaughtError = l),
    (this.onRecoverableError = s),
    (this.pooledCache = null),
    (this.pooledCacheLanes = 0),
    (this.formState = r),
    (this.incompleteTransitions = new Map()));
}
function oy(t, e, n, i, a, l, s, r, o, u, c, d) {
  return (
    (t = new lS(t, e, n, s, r, o, u, d)),
    (e = 1),
    l === !0 && (e |= 24),
    (l = oe(3, null, null, e)),
    (t.current = l),
    (l.stateNode = t),
    (e = Wc()),
    e.refCount++,
    (t.pooledCache = e),
    e.refCount++,
    (l.memoizedState = { element: i, isDehydrated: n, cache: e }),
    mf(l),
    t
  );
}
function uy(t) {
  return t ? ((t = zi), t) : zi;
}
function cy(t, e, n, i, a, l) {
  ((a = uy(a)),
    i.context === null ? (i.context = a) : (i.pendingContext = a),
    (i = bn(e)),
    (i.payload = { element: n }),
    (l = l === void 0 ? null : l),
    l !== null && (i.callback = l),
    (n = Sn(t, i, e)),
    n !== null && (jt(n, t, e), Ia(n, t, e)));
}
function Vh(t, e) {
  if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
    var n = t.retryLane;
    t.retryLane = n !== 0 && n < e ? n : e;
  }
}
function Df(t, e) {
  (Vh(t, e), (t = t.alternate) && Vh(t, e));
}
function fy(t) {
  if (t.tag === 13) {
    var e = wn(t, 67108864);
    (e !== null && jt(e, t, 67108864), Df(t, 67108864));
  }
}
var pr = !0;
function sS(t, e, n, i) {
  var a = N.T;
  N.T = null;
  var l = tt.p;
  try {
    ((tt.p = 2), wf(t, e, n, i));
  } finally {
    ((tt.p = l), (N.T = a));
  }
}
function rS(t, e, n, i) {
  var a = N.T;
  N.T = null;
  var l = tt.p;
  try {
    ((tt.p = 8), wf(t, e, n, i));
  } finally {
    ((tt.p = l), (N.T = a));
  }
}
function wf(t, e, n, i) {
  if (pr) {
    var a = ic(i);
    if (a === null) (jo(t, e, i, gr, n), _h(t, i));
    else if (uS(a, t, e, n, i)) i.stopPropagation();
    else if ((_h(t, i), e & 4 && -1 < oS.indexOf(t))) {
      for (; a !== null; ) {
        var l = pa(a);
        if (l !== null)
          switch (l.tag) {
            case 3:
              if (((l = l.stateNode), l.current.memoizedState.isDehydrated)) {
                var s = Ln(l.pendingLanes);
                if (s !== 0) {
                  var r = l;
                  for (r.pendingLanes |= 2, r.entangledLanes |= 2; s; ) {
                    var o = 1 << (31 - Pt(s));
                    ((r.entanglements[1] |= o), (s &= ~o));
                  }
                  (ze(l), (rt & 6) === 0 && ((sr = Me() + 500), kl(0, !1)));
                }
              }
              break;
            case 13:
              ((r = wn(l, 2)), r !== null && jt(r, l, 2), Yr(), Df(l, 2));
          }
        if (((l = ic(i)), l === null && jo(t, e, i, gr, n), l === a)) break;
        a = l;
      }
      a !== null && i.stopPropagation();
    } else jo(t, e, i, null, n);
  }
}
function ic(t) {
  return ((t = qc(t)), Cf(t));
}
var gr = null;
function Cf(t) {
  if (((gr = null), (t = kn(t)), t !== null)) {
    var e = ha(t);
    if (e === null) t = null;
    else {
      var n = e.tag;
      if (n === 13) {
        if (((t = kp(e)), t !== null)) return t;
        t = null;
      } else if (n === 3) {
        if (e.stateNode.current.memoizedState.isDehydrated)
          return e.tag === 3 ? e.stateNode.containerInfo : null;
        t = null;
      } else e !== t && (t = null);
    }
  }
  return ((gr = t), null);
}
function dy(t) {
  switch (t) {
    case "beforetoggle":
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "toggle":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 2;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 8;
    case "message":
      switch (Qv()) {
        case Kp:
          return 2;
        case Zp:
          return 8;
        case Zs:
        case Pv:
          return 32;
        case Qp:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var ac = !1,
  An = null,
  En = null,
  Mn = null,
  Al = new Map(),
  El = new Map(),
  pn = [],
  oS =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " ",
    );
function _h(t, e) {
  switch (t) {
    case "focusin":
    case "focusout":
      An = null;
      break;
    case "dragenter":
    case "dragleave":
      En = null;
      break;
    case "mouseover":
    case "mouseout":
      Mn = null;
      break;
    case "pointerover":
    case "pointerout":
      Al.delete(e.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      El.delete(e.pointerId);
  }
}
function _a(t, e, n, i, a, l) {
  return t === null || t.nativeEvent !== l
    ? ((t = {
        blockedOn: e,
        domEventName: n,
        eventSystemFlags: i,
        nativeEvent: l,
        targetContainers: [a],
      }),
      e !== null && ((e = pa(e)), e !== null && fy(e)),
      t)
    : ((t.eventSystemFlags |= i),
      (e = t.targetContainers),
      a !== null && e.indexOf(a) === -1 && e.push(a),
      t);
}
function uS(t, e, n, i, a) {
  switch (e) {
    case "focusin":
      return ((An = _a(An, t, e, n, i, a)), !0);
    case "dragenter":
      return ((En = _a(En, t, e, n, i, a)), !0);
    case "mouseover":
      return ((Mn = _a(Mn, t, e, n, i, a)), !0);
    case "pointerover":
      var l = a.pointerId;
      return (Al.set(l, _a(Al.get(l) || null, t, e, n, i, a)), !0);
    case "gotpointercapture":
      return ((l = a.pointerId), El.set(l, _a(El.get(l) || null, t, e, n, i, a)), !0);
  }
  return !1;
}
function hy(t) {
  var e = kn(t.target);
  if (e !== null) {
    var n = ha(e);
    if (n !== null) {
      if (((e = n.tag), e === 13)) {
        if (((e = kp(n)), e !== null)) {
          ((t.blockedOn = e),
            ib(t.priority, function () {
              if (n.tag === 13) {
                var i = Ft(),
                  a = wn(n, i);
                (a !== null && jt(a, n, i), Df(n, i));
              }
            }));
          return;
        }
      } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  t.blockedOn = null;
}
function Bs(t) {
  if (t.blockedOn !== null) return !1;
  for (var e = t.targetContainers; 0 < e.length; ) {
    var n = ic(t.nativeEvent);
    if (n === null) {
      n = t.nativeEvent;
      var i = new n.constructor(n.type, n);
      ((Tu = i), n.target.dispatchEvent(i), (Tu = null));
    } else return ((e = pa(n)), e !== null && fy(e), (t.blockedOn = n), !1);
    e.shift();
  }
  return !0;
}
function Bh(t, e, n) {
  Bs(t) && n.delete(e);
}
function cS() {
  ((ac = !1),
    An !== null && Bs(An) && (An = null),
    En !== null && Bs(En) && (En = null),
    Mn !== null && Bs(Mn) && (Mn = null),
    Al.forEach(Bh),
    El.forEach(Bh));
}
function ds(t, e) {
  t.blockedOn === e &&
    ((t.blockedOn = null),
    ac || ((ac = !0), bt.unstable_scheduleCallback(bt.unstable_NormalPriority, cS)));
}
var hs = null;
function Uh(t) {
  hs !== t &&
    ((hs = t),
    bt.unstable_scheduleCallback(bt.unstable_NormalPriority, function () {
      hs === t && (hs = null);
      for (var e = 0; e < t.length; e += 3) {
        var n = t[e],
          i = t[e + 1],
          a = t[e + 2];
        if (typeof i != "function") {
          if (Cf(i || n) === null) continue;
          break;
        }
        var l = pa(n);
        l !== null &&
          (t.splice(e, 3),
          (e -= 3),
          Vu(l, { pending: !0, data: a, method: n.method, action: i }, i, a));
      }
    }));
}
function Ml(t) {
  function e(o) {
    return ds(o, t);
  }
  (An !== null && ds(An, t),
    En !== null && ds(En, t),
    Mn !== null && ds(Mn, t),
    Al.forEach(e),
    El.forEach(e));
  for (var n = 0; n < pn.length; n++) {
    var i = pn[n];
    i.blockedOn === t && (i.blockedOn = null);
  }
  for (; 0 < pn.length && ((n = pn[0]), n.blockedOn === null); )
    (hy(n), n.blockedOn === null && pn.shift());
  if (((n = (t.ownerDocument || t).$$reactFormReplay), n != null))
    for (i = 0; i < n.length; i += 3) {
      var a = n[i],
        l = n[i + 1],
        s = a[Gt] || null;
      if (typeof l == "function") s || Uh(n);
      else if (s) {
        var r = null;
        if (l && l.hasAttribute("formAction")) {
          if (((a = l), (s = l[Gt] || null))) r = s.formAction;
          else if (Cf(a) !== null) continue;
        } else r = s.action;
        (typeof r == "function" ? (n[i + 1] = r) : (n.splice(i, 3), (i -= 3)), Uh(n));
      }
    }
}
function Rf(t) {
  this._internalRoot = t;
}
kr.prototype.render = Rf.prototype.render = function (t) {
  var e = this._internalRoot;
  if (e === null) throw Error(A(409));
  var n = e.current,
    i = Ft();
  cy(n, i, t, e, null, null);
};
kr.prototype.unmount = Rf.prototype.unmount = function () {
  var t = this._internalRoot;
  if (t !== null) {
    this._internalRoot = null;
    var e = t.containerInfo;
    (t.tag === 0 && Pi(), cy(t.current, 2, null, t, null, null), Yr(), (e[ma] = null));
  }
};
function kr(t) {
  this._internalRoot = t;
}
kr.prototype.unstable_scheduleHydration = function (t) {
  if (t) {
    var e = Ip();
    t = { blockedOn: null, target: t, priority: e };
    for (var n = 0; n < pn.length && e !== 0 && e < pn[n].priority; n++);
    (pn.splice(n, 0, t), n === 0 && hy(t));
  }
};
var Nh = Hp.version;
if (Nh !== "19.0.0") throw Error(A(527, Nh, "19.0.0"));
tt.findDOMNode = function (t) {
  var e = t._reactInternals;
  if (e === void 0)
    throw typeof t.render == "function"
      ? Error(A(188))
      : ((t = Object.keys(t).join(",")), Error(A(268, t)));
  return ((t = Xv(e)), (t = t !== null ? Xp(t) : null), (t = t === null ? null : t.stateNode), t);
};
var fS = {
  bundleType: 0,
  version: "19.0.0",
  rendererPackageName: "react-dom",
  currentDispatcherRef: N,
  findFiberByHostInstance: kn,
  reconcilerVersion: "19.0.0",
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var ms = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ms.isDisabled && ms.supportsFiber)
    try {
      ((Bl = ms.inject(fS)), (Qt = ms));
    } catch {}
}
Cr.createRoot = function (t, e) {
  if (!Lp(t)) throw Error(A(299));
  var n = !1,
    i = "",
    a = cg,
    l = fg,
    s = dg,
    r = null;
  return (
    e != null &&
      (e.unstable_strictMode === !0 && (n = !0),
      e.identifierPrefix !== void 0 && (i = e.identifierPrefix),
      e.onUncaughtError !== void 0 && (a = e.onUncaughtError),
      e.onCaughtError !== void 0 && (l = e.onCaughtError),
      e.onRecoverableError !== void 0 && (s = e.onRecoverableError),
      e.unstable_transitionCallbacks !== void 0 && (r = e.unstable_transitionCallbacks)),
    (e = oy(t, 1, !1, null, null, n, i, a, l, s, r, null)),
    (t[ma] = e.current),
    Af(t.nodeType === 8 ? t.parentNode : t),
    new Rf(e)
  );
};
Cr.hydrateRoot = function (t, e, n) {
  if (!Lp(t)) throw Error(A(299));
  var i = !1,
    a = "",
    l = cg,
    s = fg,
    r = dg,
    o = null,
    u = null;
  return (
    n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (a = n.identifierPrefix),
      n.onUncaughtError !== void 0 && (l = n.onUncaughtError),
      n.onCaughtError !== void 0 && (s = n.onCaughtError),
      n.onRecoverableError !== void 0 && (r = n.onRecoverableError),
      n.unstable_transitionCallbacks !== void 0 && (o = n.unstable_transitionCallbacks),
      n.formState !== void 0 && (u = n.formState)),
    (e = oy(t, 1, !0, e, n != null ? n : null, i, a, l, s, r, o, u)),
    (e.context = uy(null)),
    (n = e.current),
    (i = Ft()),
    (a = bn(i)),
    (a.callback = null),
    Sn(n, a, i),
    (e.current.lanes = i),
    Nl(e, i),
    ze(e),
    (t[ma] = e.current),
    Af(t),
    new kr(e)
  );
};
Cr.version = "19.0.0";
(function (t) {
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (n) {
        console.error(n);
      }
  }
  (e(), (t.exports = Cr));
})(_p);
var Yt = function () {
  return (
    (Yt =
      Object.assign ||
      function (e) {
        for (var n, i = 1, a = arguments.length; i < a; i++) {
          n = arguments[i];
          for (var l in n) Object.prototype.hasOwnProperty.call(n, l) && (e[l] = n[l]);
        }
        return e;
      }),
    Yt.apply(this, arguments)
  );
};
function yr(t, e, n) {
  if (n || arguments.length === 2)
    for (var i = 0, a = e.length, l; i < a; i++)
      (l || !(i in e)) && (l || (l = Array.prototype.slice.call(e, 0, i)), (l[i] = e[i]));
  return t.concat(l || Array.prototype.slice.call(e));
}
var I = "-ms-",
  sl = "-moz-",
  K = "-webkit-",
  my = "comm",
  Xr = "rule",
  Of = "decl",
  dS = "@import",
  py = "@keyframes",
  hS = "@layer",
  gy = Math.abs,
  zf = String.fromCharCode,
  lc = Object.assign;
function mS(t, e) {
  return xt(t, 0) ^ 45
    ? (((((((e << 2) ^ xt(t, 0)) << 2) ^ xt(t, 1)) << 2) ^ xt(t, 2)) << 2) ^ xt(t, 3)
    : 0;
}
function yy(t) {
  return t.trim();
}
function He(t, e) {
  return (t = e.exec(t)) ? t[0] : t;
}
function j(t, e, n) {
  return t.replace(e, n);
}
function Us(t, e, n) {
  return t.indexOf(e, n);
}
function xt(t, e) {
  return t.charCodeAt(e) | 0;
}
function aa(t, e, n) {
  return t.slice(e, n);
}
function xe(t) {
  return t.length;
}
function vy(t) {
  return t.length;
}
function Ga(t, e) {
  return (e.push(t), t);
}
function pS(t, e) {
  return t.map(e).join("");
}
function jh(t, e) {
  return t.filter(function (n) {
    return !He(n, e);
  });
}
var Kr = 1,
  la = 1,
  by = 0,
  de = 0,
  pt = 0,
  ba = "";
function Zr(t, e, n, i, a, l, s, r) {
  return {
    value: t,
    root: e,
    parent: n,
    type: i,
    props: a,
    children: l,
    line: Kr,
    column: la,
    length: s,
    return: "",
    siblings: r,
  };
}
function on(t, e) {
  return lc(Zr("", null, null, "", null, null, 0, t.siblings), t, { length: -t.length }, e);
}
function bi(t) {
  for (; t.root; ) t = on(t.root, { children: [t] });
  Ga(t, t.siblings);
}
function gS() {
  return pt;
}
function yS() {
  return ((pt = de > 0 ? xt(ba, --de) : 0), la--, pt === 10 && ((la = 1), Kr--), pt);
}
function ve() {
  return ((pt = de < by ? xt(ba, de++) : 0), la++, pt === 10 && ((la = 1), Kr++), pt);
}
function ti() {
  return xt(ba, de);
}
function Ns() {
  return de;
}
function Qr(t, e) {
  return aa(ba, t, e);
}
function sc(t) {
  switch (t) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function vS(t) {
  return ((Kr = la = 1), (by = xe((ba = t))), (de = 0), []);
}
function bS(t) {
  return ((ba = ""), t);
}
function Yo(t) {
  return yy(Qr(de - 1, rc(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function SS(t) {
  for (; (pt = ti()) && pt < 33; ) ve();
  return sc(t) > 2 || sc(pt) > 3 ? "" : " ";
}
function xS(t, e) {
  for (; --e && ve() && !(pt < 48 || pt > 102 || (pt > 57 && pt < 65) || (pt > 70 && pt < 97)); );
  return Qr(t, Ns() + (e < 6 && ti() == 32 && ve() == 32));
}
function rc(t) {
  for (; ve(); )
    switch (pt) {
      case t:
        return de;
      case 34:
      case 39:
        t !== 34 && t !== 39 && rc(pt);
        break;
      case 40:
        t === 41 && rc(t);
        break;
      case 92:
        ve();
        break;
    }
  return de;
}
function TS(t, e) {
  for (; ve() && t + pt !== 47 + 10; ) if (t + pt === 42 + 42 && ti() === 47) break;
  return "/*" + Qr(e, de - 1) + "*" + zf(t === 47 ? t : ve());
}
function AS(t) {
  for (; !sc(ti()); ) ve();
  return Qr(t, de);
}
function ES(t) {
  return bS(js("", null, null, null, [""], (t = vS(t)), 0, [0], t));
}
function js(t, e, n, i, a, l, s, r, o) {
  for (
    var u = 0,
      c = 0,
      d = s,
      f = 0,
      h = 0,
      y = 0,
      b = 1,
      E = 1,
      m = 1,
      p = 0,
      g = "",
      v = a,
      S = l,
      T = i,
      x = g;
    E;

  )
    switch (((y = p), (p = ve()))) {
      case 40:
        if (y != 108 && xt(x, d - 1) == 58) {
          Us((x += j(Yo(p), "&", "&\f")), "&\f", gy(u ? r[u - 1] : 0)) != -1 && (m = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        x += Yo(p);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        x += SS(y);
        break;
      case 92:
        x += xS(Ns() - 1, 7);
        continue;
      case 47:
        switch (ti()) {
          case 42:
          case 47:
            Ga(MS(TS(ve(), Ns()), e, n, o), o);
            break;
          default:
            x += "/";
        }
        break;
      case 123 * b:
        r[u++] = xe(x) * m;
      case 125 * b:
      case 59:
      case 0:
        switch (p) {
          case 0:
          case 125:
            E = 0;
          case 59 + c:
            (m == -1 && (x = j(x, /\f/g, "")),
              h > 0 &&
                xe(x) - d &&
                Ga(
                  h > 32 ? Lh(x + ";", i, n, d - 1, o) : Lh(j(x, " ", "") + ";", i, n, d - 2, o),
                  o,
                ));
            break;
          case 59:
            x += ";";
          default:
            if ((Ga((T = Hh(x, e, n, u, c, a, r, g, (v = []), (S = []), d, l)), l), p === 123))
              if (c === 0) js(x, e, T, T, v, l, d, r, S);
              else
                switch (f === 99 && xt(x, 3) === 110 ? 100 : f) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    js(
                      t,
                      T,
                      T,
                      i && Ga(Hh(t, T, T, 0, 0, a, r, g, a, (v = []), d, S), S),
                      a,
                      S,
                      d,
                      r,
                      i ? v : S,
                    );
                    break;
                  default:
                    js(x, T, T, T, [""], S, 0, r, S);
                }
        }
        ((u = c = h = 0), (b = m = 1), (g = x = ""), (d = s));
        break;
      case 58:
        ((d = 1 + xe(x)), (h = y));
      default:
        if (b < 1) {
          if (p == 123) --b;
          else if (p == 125 && b++ == 0 && yS() == 125) continue;
        }
        switch (((x += zf(p)), p * b)) {
          case 38:
            m = c > 0 ? 1 : ((x += "\f"), -1);
            break;
          case 44:
            ((r[u++] = (xe(x) - 1) * m), (m = 1));
            break;
          case 64:
            (ti() === 45 && (x += Yo(ve())), (f = ti()), (c = d = xe((g = x += AS(Ns())))), p++);
            break;
          case 45:
            y === 45 && xe(x) == 2 && (b = 0);
        }
    }
  return l;
}
function Hh(t, e, n, i, a, l, s, r, o, u, c, d) {
  for (var f = a - 1, h = a === 0 ? l : [""], y = vy(h), b = 0, E = 0, m = 0; b < i; ++b)
    for (var p = 0, g = aa(t, f + 1, (f = gy((E = s[b])))), v = t; p < y; ++p)
      (v = yy(E > 0 ? h[p] + " " + g : j(g, /&\f/g, h[p]))) && (o[m++] = v);
  return Zr(t, e, n, a === 0 ? Xr : r, o, u, c, d);
}
function MS(t, e, n, i) {
  return Zr(t, e, n, my, zf(gS()), aa(t, 2, -2), 0, i);
}
function Lh(t, e, n, i, a) {
  return Zr(t, e, n, Of, aa(t, 0, i), aa(t, i + 1, -1), i, a);
}
function Sy(t, e, n) {
  switch (mS(t, e)) {
    case 5103:
      return K + "print-" + t + t;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return K + t + t;
    case 4789:
      return sl + t + t;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return K + t + sl + t + I + t + t;
    case 5936:
      switch (xt(t, e + 11)) {
        case 114:
          return K + t + I + j(t, /[svh]\w+-[tblr]{2}/, "tb") + t;
        case 108:
          return K + t + I + j(t, /[svh]\w+-[tblr]{2}/, "tb-rl") + t;
        case 45:
          return K + t + I + j(t, /[svh]\w+-[tblr]{2}/, "lr") + t;
      }
    case 6828:
    case 4268:
    case 2903:
      return K + t + I + t + t;
    case 6165:
      return K + t + I + "flex-" + t + t;
    case 5187:
      return K + t + j(t, /(\w+).+(:[^]+)/, K + "box-$1$2" + I + "flex-$1$2") + t;
    case 5443:
      return (
        K +
        t +
        I +
        "flex-item-" +
        j(t, /flex-|-self/g, "") +
        (He(t, /flex-|baseline/) ? "" : I + "grid-row-" + j(t, /flex-|-self/g, "")) +
        t
      );
    case 4675:
      return K + t + I + "flex-line-pack" + j(t, /align-content|flex-|-self/g, "") + t;
    case 5548:
      return K + t + I + j(t, "shrink", "negative") + t;
    case 5292:
      return K + t + I + j(t, "basis", "preferred-size") + t;
    case 6060:
      return K + "box-" + j(t, "-grow", "") + K + t + I + j(t, "grow", "positive") + t;
    case 4554:
      return K + j(t, /([^-])(transform)/g, "$1" + K + "$2") + t;
    case 6187:
      return j(j(j(t, /(zoom-|grab)/, K + "$1"), /(image-set)/, K + "$1"), t, "") + t;
    case 5495:
    case 3959:
      return j(t, /(image-set\([^]*)/, K + "$1$`$1");
    case 4968:
      return (
        j(
          j(t, /(.+:)(flex-)?(.*)/, K + "box-pack:$3" + I + "flex-pack:$3"),
          /s.+-b[^;]+/,
          "justify",
        ) +
        K +
        t +
        t
      );
    case 4200:
      if (!He(t, /flex-|baseline/)) return I + "grid-column-align" + aa(t, e) + t;
      break;
    case 2592:
    case 3360:
      return I + j(t, "template-", "") + t;
    case 4384:
    case 3616:
      return n &&
        n.some(function (i, a) {
          return ((e = a), He(i.props, /grid-\w+-end/));
        })
        ? ~Us(t + (n = n[e].value), "span", 0)
          ? t
          : I +
            j(t, "-start", "") +
            t +
            I +
            "grid-row-span:" +
            (~Us(n, "span", 0) ? He(n, /\d+/) : +He(n, /\d+/) - +He(t, /\d+/)) +
            ";"
        : I + j(t, "-start", "") + t;
    case 4896:
    case 4128:
      return n &&
        n.some(function (i) {
          return He(i.props, /grid-\w+-start/);
        })
        ? t
        : I + j(j(t, "-end", "-span"), "span ", "") + t;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return j(t, /(.+)-inline(.+)/, K + "$1$2") + t;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (xe(t) - 1 - e > 6)
        switch (xt(t, e + 1)) {
          case 109:
            if (xt(t, e + 4) !== 45) break;
          case 102:
            return (
              j(
                t,
                /(.+:)(.+)-([^]+)/,
                "$1" + K + "$2-$3$1" + sl + (xt(t, e + 3) == 108 ? "$3" : "$2-$3"),
              ) + t
            );
          case 115:
            return ~Us(t, "stretch", 0) ? Sy(j(t, "stretch", "fill-available"), e, n) + t : t;
        }
      break;
    case 5152:
    case 5920:
      return j(t, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function (i, a, l, s, r, o, u) {
        return I + a + ":" + l + u + (s ? I + a + "-span:" + (r ? o : +o - +l) + u : "") + t;
      });
    case 4949:
      if (xt(t, e + 6) === 121) return j(t, ":", ":" + K) + t;
      break;
    case 6444:
      switch (xt(t, xt(t, 14) === 45 ? 18 : 11)) {
        case 120:
          return (
            j(
              t,
              /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,
              "$1" +
                K +
                (xt(t, 14) === 45 ? "inline-" : "") +
                "box$3$1" +
                K +
                "$2$3$1" +
                I +
                "$2box$3",
            ) + t
          );
        case 100:
          return j(t, ":", ":" + I) + t;
      }
      break;
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return j(t, "scroll-", "scroll-snap-") + t;
  }
  return t;
}
function vr(t, e) {
  for (var n = "", i = 0; i < t.length; i++) n += e(t[i], i, t, e) || "";
  return n;
}
function DS(t, e, n, i) {
  switch (t.type) {
    case hS:
      if (t.children.length) break;
    case dS:
    case Of:
      return (t.return = t.return || t.value);
    case my:
      return "";
    case py:
      return (t.return = t.value + "{" + vr(t.children, i) + "}");
    case Xr:
      if (!xe((t.value = t.props.join(",")))) return "";
  }
  return xe((n = vr(t.children, i))) ? (t.return = t.value + "{" + n + "}") : "";
}
function wS(t) {
  var e = vy(t);
  return function (n, i, a, l) {
    for (var s = "", r = 0; r < e; r++) s += t[r](n, i, a, l) || "";
    return s;
  };
}
function CS(t) {
  return function (e) {
    e.root || ((e = e.return) && t(e));
  };
}
function RS(t, e, n, i) {
  if (t.length > -1 && !t.return)
    switch (t.type) {
      case Of:
        t.return = Sy(t.value, t.length, n);
        return;
      case py:
        return vr([on(t, { value: j(t.value, "@", "@" + K) })], i);
      case Xr:
        if (t.length)
          return pS((n = t.props), function (a) {
            switch (He(a, (i = /(::plac\w+|:read-\w+)/))) {
              case ":read-only":
              case ":read-write":
                (bi(on(t, { props: [j(a, /:(read-\w+)/, ":" + sl + "$1")] })),
                  bi(on(t, { props: [a] })),
                  lc(t, { props: jh(n, i) }));
                break;
              case "::placeholder":
                (bi(on(t, { props: [j(a, /:(plac\w+)/, ":" + K + "input-$1")] })),
                  bi(on(t, { props: [j(a, /:(plac\w+)/, ":" + sl + "$1")] })),
                  bi(on(t, { props: [j(a, /:(plac\w+)/, I + "input-$1")] })),
                  bi(on(t, { props: [a] })),
                  lc(t, { props: jh(n, i) }));
                break;
            }
            return "";
          });
    }
}
var OS = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
  },
  sa =
    (typeof process < "u" && process.env !== void 0 && ({}.REACT_APP_SC_ATTR || {}.SC_ATTR)) ||
    "data-styled",
  xy = "active",
  Ty = "data-styled-version",
  Pr = "6.1.16",
  Vf = `/*!sc*/
`,
  br = typeof window < "u" && "HTMLElement" in window,
  zS = Boolean(
    typeof SC_DISABLE_SPEEDY == "boolean"
      ? SC_DISABLE_SPEEDY
      : typeof process < "u" &&
          process.env !== void 0 &&
          {}.REACT_APP_SC_DISABLE_SPEEDY !== void 0 &&
          {}.REACT_APP_SC_DISABLE_SPEEDY !== ""
        ? {}.REACT_APP_SC_DISABLE_SPEEDY !== "false" && {}.REACT_APP_SC_DISABLE_SPEEDY
        : typeof process < "u" &&
            process.env !== void 0 &&
            {}.SC_DISABLE_SPEEDY !== void 0 &&
            {}.SC_DISABLE_SPEEDY !== ""
          ? {}.SC_DISABLE_SPEEDY !== "false" && {}.SC_DISABLE_SPEEDY
          : !1,
  ),
  Fr = Object.freeze([]),
  ra = Object.freeze({});
function VS(t, e, n) {
  return (n === void 0 && (n = ra), (t.theme !== n.theme && t.theme) || e || n.theme);
}
var Ay = new Set([
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "big",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "keygen",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "menu",
    "menuitem",
    "meta",
    "meter",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "tr",
    "track",
    "u",
    "ul",
    "use",
    "var",
    "video",
    "wbr",
    "circle",
    "clipPath",
    "defs",
    "ellipse",
    "foreignObject",
    "g",
    "image",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "stop",
    "svg",
    "text",
    "tspan",
  ]),
  _S = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,
  BS = /(^-|-$)/g;
function Yh(t) {
  return t.replace(_S, "-").replace(BS, "");
}
var US = /(a)(d)/gi,
  ps = 52,
  Gh = function (t) {
    return String.fromCharCode(t + (t > 25 ? 39 : 97));
  };
function oc(t) {
  var e,
    n = "";
  for (e = Math.abs(t); e > ps; e = (e / ps) | 0) n = Gh(e % ps) + n;
  return (Gh(e % ps) + n).replace(US, "$1-$2");
}
var Go,
  Ey = 5381,
  Ui = function (t, e) {
    for (var n = e.length; n; ) t = (33 * t) ^ e.charCodeAt(--n);
    return t;
  },
  My = function (t) {
    return Ui(Ey, t);
  };
function NS(t) {
  return oc(My(t) >>> 0);
}
function jS(t) {
  return t.displayName || t.name || "Component";
}
function qo(t) {
  return typeof t == "string" && !0;
}
var Dy = typeof Symbol == "function" && Symbol.for,
  wy = Dy ? Symbol.for("react.memo") : 60115,
  HS = Dy ? Symbol.for("react.forward_ref") : 60112,
  LS = {
    childContextTypes: !0,
    contextType: !0,
    contextTypes: !0,
    defaultProps: !0,
    displayName: !0,
    getDefaultProps: !0,
    getDerivedStateFromError: !0,
    getDerivedStateFromProps: !0,
    mixins: !0,
    propTypes: !0,
    type: !0,
  },
  YS = { name: !0, length: !0, prototype: !0, caller: !0, callee: !0, arguments: !0, arity: !0 },
  Cy = { $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0 },
  GS =
    (((Go = {})[HS] = {
      $$typeof: !0,
      render: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0,
    }),
    (Go[wy] = Cy),
    Go);
function qh(t) {
  return ("type" in (e = t) && e.type.$$typeof) === wy ? Cy : "$$typeof" in t ? GS[t.$$typeof] : LS;
  var e;
}
var qS = Object.defineProperty,
  kS = Object.getOwnPropertyNames,
  kh = Object.getOwnPropertySymbols,
  XS = Object.getOwnPropertyDescriptor,
  KS = Object.getPrototypeOf,
  Xh = Object.prototype;
function Ry(t, e, n) {
  if (typeof e != "string") {
    if (Xh) {
      var i = KS(e);
      i && i !== Xh && Ry(t, i, n);
    }
    var a = kS(e);
    kh && (a = a.concat(kh(e)));
    for (var l = qh(t), s = qh(e), r = 0; r < a.length; ++r) {
      var o = a[r];
      if (!(o in YS || (n && n[o]) || (s && o in s) || (l && o in l))) {
        var u = XS(e, o);
        try {
          qS(t, o, u);
        } catch {}
      }
    }
  }
  return t;
}
function oa(t) {
  return typeof t == "function";
}
function _f(t) {
  return typeof t == "object" && "styledComponentId" in t;
}
function Kn(t, e) {
  return t && e ? "".concat(t, " ").concat(e) : t || e || "";
}
function Kh(t, e) {
  if (t.length === 0) return "";
  for (var n = t[0], i = 1; i < t.length; i++) n += e ? e + t[i] : t[i];
  return n;
}
function Dl(t) {
  return (
    t !== null &&
    typeof t == "object" &&
    t.constructor.name === Object.name &&
    !("props" in t && t.$$typeof)
  );
}
function uc(t, e, n) {
  if ((n === void 0 && (n = !1), !n && !Dl(t) && !Array.isArray(t))) return e;
  if (Array.isArray(e)) for (var i = 0; i < e.length; i++) t[i] = uc(t[i], e[i]);
  else if (Dl(e)) for (var i in e) t[i] = uc(t[i], e[i]);
  return t;
}
function Bf(t, e) {
  Object.defineProperty(t, "toString", { value: e });
}
function Zl(t) {
  for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
  return new Error(
    "An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#"
      .concat(t, " for more information.")
      .concat(e.length > 0 ? " Args: ".concat(e.join(", ")) : ""),
  );
}
var ZS = (function () {
    function t(e) {
      ((this.groupSizes = new Uint32Array(512)), (this.length = 512), (this.tag = e));
    }
    return (
      (t.prototype.indexOfGroup = function (e) {
        for (var n = 0, i = 0; i < e; i++) n += this.groupSizes[i];
        return n;
      }),
      (t.prototype.insertRules = function (e, n) {
        if (e >= this.groupSizes.length) {
          for (var i = this.groupSizes, a = i.length, l = a; e >= l; )
            if ((l <<= 1) < 0) throw Zl(16, "".concat(e));
          ((this.groupSizes = new Uint32Array(l)), this.groupSizes.set(i), (this.length = l));
          for (var s = a; s < l; s++) this.groupSizes[s] = 0;
        }
        for (var r = this.indexOfGroup(e + 1), o = ((s = 0), n.length); s < o; s++)
          this.tag.insertRule(r, n[s]) && (this.groupSizes[e]++, r++);
      }),
      (t.prototype.clearGroup = function (e) {
        if (e < this.length) {
          var n = this.groupSizes[e],
            i = this.indexOfGroup(e),
            a = i + n;
          this.groupSizes[e] = 0;
          for (var l = i; l < a; l++) this.tag.deleteRule(i);
        }
      }),
      (t.prototype.getGroup = function (e) {
        var n = "";
        if (e >= this.length || this.groupSizes[e] === 0) return n;
        for (var i = this.groupSizes[e], a = this.indexOfGroup(e), l = a + i, s = a; s < l; s++)
          n += "".concat(this.tag.getRule(s)).concat(Vf);
        return n;
      }),
      t
    );
  })(),
  Hs = new Map(),
  Sr = new Map(),
  Ls = 1,
  gs = function (t) {
    if (Hs.has(t)) return Hs.get(t);
    for (; Sr.has(Ls); ) Ls++;
    var e = Ls++;
    return (Hs.set(t, e), Sr.set(e, t), e);
  },
  QS = function (t, e) {
    ((Ls = e + 1), Hs.set(t, e), Sr.set(e, t));
  },
  PS = "style[".concat(sa, "][").concat(Ty, '="').concat(Pr, '"]'),
  FS = new RegExp("^".concat(sa, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),
  $S = function (t, e, n) {
    for (var i, a = n.split(","), l = 0, s = a.length; l < s; l++)
      (i = a[l]) && t.registerName(e, i);
  },
  JS = function (t, e) {
    for (
      var n,
        i = ((n = e.textContent) !== null && n !== void 0 ? n : "").split(Vf),
        a = [],
        l = 0,
        s = i.length;
      l < s;
      l++
    ) {
      var r = i[l].trim();
      if (r) {
        var o = r.match(FS);
        if (o) {
          var u = 0 | parseInt(o[1], 10),
            c = o[2];
          (u !== 0 && (QS(c, u), $S(t, c, o[3]), t.getTag().insertRules(u, a)), (a.length = 0));
        } else a.push(r);
      }
    }
  },
  Zh = function (t) {
    for (var e = document.querySelectorAll(PS), n = 0, i = e.length; n < i; n++) {
      var a = e[n];
      a && a.getAttribute(sa) !== xy && (JS(t, a), a.parentNode && a.parentNode.removeChild(a));
    }
  };
function WS() {
  return typeof __webpack_nonce__ < "u" ? __webpack_nonce__ : null;
}
var Oy = function (t) {
    var e = document.head,
      n = t || e,
      i = document.createElement("style"),
      a = (function (r) {
        var o = Array.from(r.querySelectorAll("style[".concat(sa, "]")));
        return o[o.length - 1];
      })(n),
      l = a !== void 0 ? a.nextSibling : null;
    (i.setAttribute(sa, xy), i.setAttribute(Ty, Pr));
    var s = WS();
    return (s && i.setAttribute("nonce", s), n.insertBefore(i, l), i);
  },
  IS = (function () {
    function t(e) {
      ((this.element = Oy(e)),
        this.element.appendChild(document.createTextNode("")),
        (this.sheet = (function (n) {
          if (n.sheet) return n.sheet;
          for (var i = document.styleSheets, a = 0, l = i.length; a < l; a++) {
            var s = i[a];
            if (s.ownerNode === n) return s;
          }
          throw Zl(17);
        })(this.element)),
        (this.length = 0));
    }
    return (
      (t.prototype.insertRule = function (e, n) {
        try {
          return (this.sheet.insertRule(n, e), this.length++, !0);
        } catch {
          return !1;
        }
      }),
      (t.prototype.deleteRule = function (e) {
        (this.sheet.deleteRule(e), this.length--);
      }),
      (t.prototype.getRule = function (e) {
        var n = this.sheet.cssRules[e];
        return n && n.cssText ? n.cssText : "";
      }),
      t
    );
  })(),
  tx = (function () {
    function t(e) {
      ((this.element = Oy(e)), (this.nodes = this.element.childNodes), (this.length = 0));
    }
    return (
      (t.prototype.insertRule = function (e, n) {
        if (e <= this.length && e >= 0) {
          var i = document.createTextNode(n);
          return (this.element.insertBefore(i, this.nodes[e] || null), this.length++, !0);
        }
        return !1;
      }),
      (t.prototype.deleteRule = function (e) {
        (this.element.removeChild(this.nodes[e]), this.length--);
      }),
      (t.prototype.getRule = function (e) {
        return e < this.length ? this.nodes[e].textContent : "";
      }),
      t
    );
  })(),
  ex = (function () {
    function t(e) {
      ((this.rules = []), (this.length = 0));
    }
    return (
      (t.prototype.insertRule = function (e, n) {
        return e <= this.length && (this.rules.splice(e, 0, n), this.length++, !0);
      }),
      (t.prototype.deleteRule = function (e) {
        (this.rules.splice(e, 1), this.length--);
      }),
      (t.prototype.getRule = function (e) {
        return e < this.length ? this.rules[e] : "";
      }),
      t
    );
  })(),
  Qh = br,
  nx = { isServer: !br, useCSSOMInjection: !zS },
  zy = (function () {
    function t(e, n, i) {
      (e === void 0 && (e = ra), n === void 0 && (n = {}));
      var a = this;
      ((this.options = Yt(Yt({}, nx), e)),
        (this.gs = n),
        (this.names = new Map(i)),
        (this.server = !!e.isServer),
        !this.server && br && Qh && ((Qh = !1), Zh(this)),
        Bf(this, function () {
          return (function (l) {
            for (
              var s = l.getTag(),
                r = s.length,
                o = "",
                u = function (d) {
                  var f = (function (m) {
                    return Sr.get(m);
                  })(d);
                  if (f === void 0) return "continue";
                  var h = l.names.get(f),
                    y = s.getGroup(d);
                  if (h === void 0 || !h.size || y.length === 0) return "continue";
                  var b = "".concat(sa, ".g").concat(d, '[id="').concat(f, '"]'),
                    E = "";
                  (h !== void 0 &&
                    h.forEach(function (m) {
                      m.length > 0 && (E += "".concat(m, ","));
                    }),
                    (o += "".concat(y).concat(b, '{content:"').concat(E, '"}').concat(Vf)));
                },
                c = 0;
              c < r;
              c++
            )
              u(c);
            return o;
          })(a);
        }));
    }
    return (
      (t.registerId = function (e) {
        return gs(e);
      }),
      (t.prototype.rehydrate = function () {
        !this.server && br && Zh(this);
      }),
      (t.prototype.reconstructWithOptions = function (e, n) {
        return (
          n === void 0 && (n = !0),
          new t(Yt(Yt({}, this.options), e), this.gs, (n && this.names) || void 0)
        );
      }),
      (t.prototype.allocateGSInstance = function (e) {
        return (this.gs[e] = (this.gs[e] || 0) + 1);
      }),
      (t.prototype.getTag = function () {
        return (
          this.tag ||
          (this.tag =
            ((e = (function (n) {
              var i = n.useCSSOMInjection,
                a = n.target;
              return n.isServer ? new ex(a) : i ? new IS(a) : new tx(a);
            })(this.options)),
            new ZS(e)))
        );
        var e;
      }),
      (t.prototype.hasNameForId = function (e, n) {
        return this.names.has(e) && this.names.get(e).has(n);
      }),
      (t.prototype.registerName = function (e, n) {
        if ((gs(e), this.names.has(e))) this.names.get(e).add(n);
        else {
          var i = new Set();
          (i.add(n), this.names.set(e, i));
        }
      }),
      (t.prototype.insertRules = function (e, n, i) {
        (this.registerName(e, n), this.getTag().insertRules(gs(e), i));
      }),
      (t.prototype.clearNames = function (e) {
        this.names.has(e) && this.names.get(e).clear();
      }),
      (t.prototype.clearRules = function (e) {
        (this.getTag().clearGroup(gs(e)), this.clearNames(e));
      }),
      (t.prototype.clearTag = function () {
        this.tag = void 0;
      }),
      t
    );
  })(),
  ix = /&/g,
  ax = /^\s*\/\/.*$/gm;
function Vy(t, e) {
  return t.map(function (n) {
    return (
      n.type === "rule" &&
        ((n.value = "".concat(e, " ").concat(n.value)),
        (n.value = n.value.replaceAll(",", ",".concat(e, " "))),
        (n.props = n.props.map(function (i) {
          return "".concat(e, " ").concat(i);
        }))),
      Array.isArray(n.children) && n.type !== "@keyframes" && (n.children = Vy(n.children, e)),
      n
    );
  });
}
function lx(t) {
  var e,
    n,
    i,
    a = t === void 0 ? ra : t,
    l = a.options,
    s = l === void 0 ? ra : l,
    r = a.plugins,
    o = r === void 0 ? Fr : r,
    u = function (f, h, y) {
      return y.startsWith(n) && y.endsWith(n) && y.replaceAll(n, "").length > 0 ? ".".concat(e) : f;
    },
    c = o.slice();
  (c.push(function (f) {
    f.type === Xr &&
      f.value.includes("&") &&
      (f.props[0] = f.props[0].replace(ix, n).replace(i, u));
  }),
    s.prefix && c.push(RS),
    c.push(DS));
  var d = function (f, h, y, b) {
    (h === void 0 && (h = ""),
      y === void 0 && (y = ""),
      b === void 0 && (b = "&"),
      (e = b),
      (n = h),
      (i = new RegExp("\\".concat(n, "\\b"), "g")));
    var E = f.replace(ax, ""),
      m = ES(y || h ? "".concat(y, " ").concat(h, " { ").concat(E, " }") : E);
    s.namespace && (m = Vy(m, s.namespace));
    var p = [];
    return (
      vr(
        m,
        wS(
          c.concat(
            CS(function (g) {
              return p.push(g);
            }),
          ),
        ),
      ),
      p
    );
  };
  return (
    (d.hash = o.length
      ? o
          .reduce(function (f, h) {
            return (h.name || Zl(15), Ui(f, h.name));
          }, Ey)
          .toString()
      : ""),
    d
  );
}
var sx = new zy(),
  cc = lx(),
  _y = Dn.createContext({ shouldForwardProp: void 0, styleSheet: sx, stylis: cc });
_y.Consumer;
Dn.createContext(void 0);
function Ph() {
  return w.exports.useContext(_y);
}
var rx = (function () {
    function t(e, n) {
      var i = this;
      ((this.inject = function (a, l) {
        l === void 0 && (l = cc);
        var s = i.name + l.hash;
        a.hasNameForId(i.id, s) || a.insertRules(i.id, s, l(i.rules, s, "@keyframes"));
      }),
        (this.name = e),
        (this.id = "sc-keyframes-".concat(e)),
        (this.rules = n),
        Bf(this, function () {
          throw Zl(12, String(i.name));
        }));
    }
    return (
      (t.prototype.getName = function (e) {
        return (e === void 0 && (e = cc), this.name + e.hash);
      }),
      t
    );
  })(),
  ox = function (t) {
    return t >= "A" && t <= "Z";
  };
function Fh(t) {
  for (var e = "", n = 0; n < t.length; n++) {
    var i = t[n];
    if (n === 1 && i === "-" && t[0] === "-") return t;
    ox(i) ? (e += "-" + i.toLowerCase()) : (e += i);
  }
  return e.startsWith("ms-") ? "-" + e : e;
}
var By = function (t) {
    return t == null || t === !1 || t === "";
  },
  Uy = function (t) {
    var e,
      n,
      i = [];
    for (var a in t) {
      var l = t[a];
      t.hasOwnProperty(a) &&
        !By(l) &&
        ((Array.isArray(l) && l.isCss) || oa(l)
          ? i.push("".concat(Fh(a), ":"), l, ";")
          : Dl(l)
            ? i.push.apply(i, yr(yr(["".concat(a, " {")], Uy(l), !1), ["}"], !1))
            : i.push(
                ""
                  .concat(Fh(a), ": ")
                  .concat(
                    ((e = a),
                    (n = l) == null || typeof n == "boolean" || n === ""
                      ? ""
                      : typeof n != "number" || n === 0 || e in OS || e.startsWith("--")
                        ? String(n).trim()
                        : "".concat(n, "px")),
                    ";",
                  ),
              ));
    }
    return i;
  };
function ei(t, e, n, i) {
  if (By(t)) return [];
  if (_f(t)) return [".".concat(t.styledComponentId)];
  if (oa(t)) {
    if (!oa((l = t)) || (l.prototype && l.prototype.isReactComponent) || !e) return [t];
    var a = t(e);
    return ei(a, e, n, i);
  }
  var l;
  return t instanceof rx
    ? n
      ? (t.inject(n, i), [t.getName(i)])
      : [t]
    : Dl(t)
      ? Uy(t)
      : Array.isArray(t)
        ? Array.prototype.concat.apply(
            Fr,
            t.map(function (s) {
              return ei(s, e, n, i);
            }),
          )
        : [t.toString()];
}
function ux(t) {
  for (var e = 0; e < t.length; e += 1) {
    var n = t[e];
    if (oa(n) && !_f(n)) return !1;
  }
  return !0;
}
var cx = My(Pr),
  fx = (function () {
    function t(e, n, i) {
      ((this.rules = e),
        (this.staticRulesId = ""),
        (this.isStatic = (i === void 0 || i.isStatic) && ux(e)),
        (this.componentId = n),
        (this.baseHash = Ui(cx, n)),
        (this.baseStyle = i),
        zy.registerId(n));
    }
    return (
      (t.prototype.generateAndInjectStyles = function (e, n, i) {
        var a = this.baseStyle ? this.baseStyle.generateAndInjectStyles(e, n, i) : "";
        if (this.isStatic && !i.hash)
          if (this.staticRulesId && n.hasNameForId(this.componentId, this.staticRulesId))
            a = Kn(a, this.staticRulesId);
          else {
            var l = Kh(ei(this.rules, e, n, i)),
              s = oc(Ui(this.baseHash, l) >>> 0);
            if (!n.hasNameForId(this.componentId, s)) {
              var r = i(l, ".".concat(s), void 0, this.componentId);
              n.insertRules(this.componentId, s, r);
            }
            ((a = Kn(a, s)), (this.staticRulesId = s));
          }
        else {
          for (var o = Ui(this.baseHash, i.hash), u = "", c = 0; c < this.rules.length; c++) {
            var d = this.rules[c];
            if (typeof d == "string") u += d;
            else if (d) {
              var f = Kh(ei(d, e, n, i));
              ((o = Ui(o, f + c)), (u += f));
            }
          }
          if (u) {
            var h = oc(o >>> 0);
            (n.hasNameForId(this.componentId, h) ||
              n.insertRules(this.componentId, h, i(u, ".".concat(h), void 0, this.componentId)),
              (a = Kn(a, h)));
          }
        }
        return a;
      }),
      t
    );
  })(),
  Ny = Dn.createContext(void 0);
Ny.Consumer;
var ko = {};
function dx(t, e, n) {
  var i = _f(t),
    a = t,
    l = !qo(t),
    s = e.attrs,
    r = s === void 0 ? Fr : s,
    o = e.componentId,
    u =
      o === void 0
        ? (function (v, S) {
            var T = typeof v != "string" ? "sc" : Yh(v);
            ko[T] = (ko[T] || 0) + 1;
            var x = "".concat(T, "-").concat(NS(Pr + T + ko[T]));
            return S ? "".concat(S, "-").concat(x) : x;
          })(e.displayName, e.parentComponentId)
        : o,
    c = e.displayName,
    d =
      c === void 0
        ? (function (v) {
            return qo(v) ? "styled.".concat(v) : "Styled(".concat(jS(v), ")");
          })(t)
        : c,
    f =
      e.displayName && e.componentId
        ? "".concat(Yh(e.displayName), "-").concat(e.componentId)
        : e.componentId || u,
    h = i && a.attrs ? a.attrs.concat(r).filter(Boolean) : r,
    y = e.shouldForwardProp;
  if (i && a.shouldForwardProp) {
    var b = a.shouldForwardProp;
    if (e.shouldForwardProp) {
      var E = e.shouldForwardProp;
      y = function (v, S) {
        return b(v, S) && E(v, S);
      };
    } else y = b;
  }
  var m = new fx(n, f, i ? a.componentStyle : void 0);
  function p(v, S) {
    return (function (T, x, M) {
      var B = T.attrs,
        z = T.componentStyle,
        it = T.defaultProps,
        Ve = T.foldedComponentIds,
        Aa = T.styledComponentId,
        nn = T.target,
        pi = Dn.useContext(Ny),
        C = Ph(),
        R = T.shouldForwardProp || C.shouldForwardProp,
        V = VS(x, pi, it) || ra,
        G = (function (_e, Ea, Jl) {
          for (
            var Ma, Nn = Yt(Yt({}, Ea), { className: void 0, theme: Jl }), io = 0;
            io < _e.length;
            io += 1
          ) {
            var Wl = oa((Ma = _e[io])) ? Ma(Nn) : Ma;
            for (var an in Wl)
              Nn[an] =
                an === "className"
                  ? Kn(Nn[an], Wl[an])
                  : an === "style"
                    ? Yt(Yt({}, Nn[an]), Wl[an])
                    : Wl[an];
          }
          return (Ea.className && (Nn.className = Kn(Nn.className, Ea.className)), Nn);
        })(B, x, V),
        P = G.as || nn,
        Se = {};
      for (var kt in G)
        G[kt] === void 0 ||
          kt[0] === "$" ||
          kt === "as" ||
          (kt === "theme" && G.theme === V) ||
          (kt === "forwardedAs" ? (Se.as = G.forwardedAs) : (R && !R(kt, P)) || (Se[kt] = G[kt]));
      var gi = (function (_e, Ea) {
          var Jl = Ph(),
            Ma = _e.generateAndInjectStyles(Ea, Jl.styleSheet, Jl.stylis);
          return Ma;
        })(z, G),
        he = Kn(Ve, Aa);
      return (
        gi && (he += " " + gi),
        G.className && (he += " " + G.className),
        (Se[qo(P) && !Ay.has(P) ? "class" : "className"] = he),
        M && (Se.ref = M),
        w.exports.createElement(P, Se)
      );
    })(g, v, S);
  }
  p.displayName = d;
  var g = Dn.forwardRef(p);
  return (
    (g.attrs = h),
    (g.componentStyle = m),
    (g.displayName = d),
    (g.shouldForwardProp = y),
    (g.foldedComponentIds = i ? Kn(a.foldedComponentIds, a.styledComponentId) : ""),
    (g.styledComponentId = f),
    (g.target = i ? a.target : t),
    Object.defineProperty(g, "defaultProps", {
      get: function () {
        return this._foldedDefaultProps;
      },
      set: function (v) {
        this._foldedDefaultProps = i
          ? (function (S) {
              for (var T = [], x = 1; x < arguments.length; x++) T[x - 1] = arguments[x];
              for (var M = 0, B = T; M < B.length; M++) uc(S, B[M], !0);
              return S;
            })({}, a.defaultProps, v)
          : v;
      },
    }),
    Bf(g, function () {
      return ".".concat(g.styledComponentId);
    }),
    l &&
      Ry(g, t, {
        attrs: !0,
        componentStyle: !0,
        displayName: !0,
        foldedComponentIds: !0,
        shouldForwardProp: !0,
        styledComponentId: !0,
        target: !0,
      }),
    g
  );
}
function $h(t, e) {
  for (var n = [t[0]], i = 0, a = e.length; i < a; i += 1) n.push(e[i], t[i + 1]);
  return n;
}
var Jh = function (t) {
  return Object.assign(t, { isCss: !0 });
};
function hx(t) {
  for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
  if (oa(t) || Dl(t)) return Jh(ei($h(Fr, yr([t], e, !0))));
  var i = t;
  return e.length === 0 && i.length === 1 && typeof i[0] == "string" ? ei(i) : Jh(ei($h(i, e)));
}
function fc(t, e, n) {
  if ((n === void 0 && (n = ra), !e)) throw Zl(1, e);
  var i = function (a) {
    for (var l = [], s = 1; s < arguments.length; s++) l[s - 1] = arguments[s];
    return t(e, n, hx.apply(void 0, yr([a], l, !1)));
  };
  return (
    (i.attrs = function (a) {
      return fc(t, e, Yt(Yt({}, n), { attrs: Array.prototype.concat(n.attrs, a).filter(Boolean) }));
    }),
    (i.withConfig = function (a) {
      return fc(t, e, Yt(Yt({}, n), a));
    }),
    i
  );
}
var jy = function (t) {
    return fc(dx, t);
  },
  O = jy;
Ay.forEach(function (t) {
  O[t] = jy(t);
});
var $r = { exports: {} },
  Jr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var mx = Symbol.for("react.transitional.element"),
  px = Symbol.for("react.fragment");
function Hy(t, e, n) {
  var i = null;
  if ((n !== void 0 && (i = "" + n), e.key !== void 0 && (i = "" + e.key), "key" in e)) {
    n = {};
    for (var a in e) a !== "key" && (n[a] = e[a]);
  } else n = e;
  return ((e = n.ref), { $$typeof: mx, type: t, key: i, ref: e !== void 0 ? e : null, props: n });
}
Jr.Fragment = px;
Jr.jsx = Hy;
Jr.jsxs = Hy;
(function (t) {
  t.exports = Jr;
})($r);
const gx = $r.exports.Fragment,
  D = $r.exports.jsx,
  U = $r.exports.jsxs,
  Uf = w.exports.createContext({});
function Nf(t) {
  const e = w.exports.useRef(null);
  return (e.current === null && (e.current = t()), e.current);
}
const jf = typeof window < "u",
  Ly = jf ? w.exports.useLayoutEffect : w.exports.useEffect,
  Wr = w.exports.createContext(null),
  Hf = w.exports.createContext({
    transformPagePoint: (t) => t,
    isStatic: !1,
    reducedMotion: "never",
  });
class yx extends w.exports.Component {
  getSnapshotBeforeUpdate(e) {
    const n = this.props.childRef.current;
    if (n && e.isPresent && !this.props.isPresent) {
      const i = n.offsetParent,
        a = (i instanceof HTMLElement && i.offsetWidth) || 0,
        l = this.props.sizeRef.current;
      ((l.height = n.offsetHeight || 0),
        (l.width = n.offsetWidth || 0),
        (l.top = n.offsetTop),
        (l.left = n.offsetLeft),
        (l.right = a - l.width - l.left));
    }
    return null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
}
function vx({ children: t, isPresent: e, anchorX: n }) {
  const i = w.exports.useId(),
    a = w.exports.useRef(null),
    l = w.exports.useRef({ width: 0, height: 0, top: 0, left: 0, right: 0 }),
    { nonce: s } = w.exports.useContext(Hf);
  return (
    w.exports.useInsertionEffect(() => {
      const { width: r, height: o, top: u, left: c, right: d } = l.current;
      if (e || !a.current || !r || !o) return;
      const f = n === "left" ? `left: ${c}` : `right: ${d}`;
      a.current.dataset.motionPopId = i;
      const h = document.createElement("style");
      return (
        s && (h.nonce = s),
        document.head.appendChild(h),
        h.sheet &&
          h.sheet.insertRule(`
          [data-motion-pop-id="${i}"] {
            position: absolute !important;
            width: ${r}px !important;
            height: ${o}px !important;
            ${f}px !important;
            top: ${u}px !important;
          }
        `),
        () => {
          document.head.removeChild(h);
        }
      );
    }, [e]),
    D(yx, {
      isPresent: e,
      childRef: a,
      sizeRef: l,
      children: w.exports.cloneElement(t, { ref: a }),
    })
  );
}
const bx = ({
  children: t,
  initial: e,
  isPresent: n,
  onExitComplete: i,
  custom: a,
  presenceAffectsLayout: l,
  mode: s,
  anchorX: r,
}) => {
  const o = Nf(Sx),
    u = w.exports.useId(),
    c = w.exports.useCallback(
      (f) => {
        o.set(f, !0);
        for (const h of o.values()) if (!h) return;
        i && i();
      },
      [o, i],
    ),
    d = w.exports.useMemo(
      () => ({
        id: u,
        initial: e,
        isPresent: n,
        custom: a,
        onExitComplete: c,
        register: (f) => (o.set(f, !1), () => o.delete(f)),
      }),
      l ? [Math.random(), c] : [n, c],
    );
  return (
    w.exports.useMemo(() => {
      o.forEach((f, h) => o.set(h, !1));
    }, [n]),
    w.exports.useEffect(() => {
      !n && !o.size && i && i();
    }, [n]),
    s === "popLayout" && (t = D(vx, { isPresent: n, anchorX: r, children: t })),
    D(Wr.Provider, { value: d, children: t })
  );
};
function Sx() {
  return new Map();
}
function Yy(t = !0) {
  const e = w.exports.useContext(Wr);
  if (e === null) return [!0, null];
  const { isPresent: n, onExitComplete: i, register: a } = e,
    l = w.exports.useId();
  w.exports.useEffect(() => {
    if (t) return a(l);
  }, [t]);
  const s = w.exports.useCallback(() => t && i && i(l), [l, i, t]);
  return !n && i ? [!1, s] : [!0];
}
const ys = (t) => t.key || "";
function Wh(t) {
  const e = [];
  return (
    w.exports.Children.forEach(t, (n) => {
      w.exports.isValidElement(n) && e.push(n);
    }),
    e
  );
}
const xx = ({
  children: t,
  custom: e,
  initial: n = !0,
  onExitComplete: i,
  presenceAffectsLayout: a = !0,
  mode: l = "sync",
  propagate: s = !1,
  anchorX: r = "left",
}) => {
  const [o, u] = Yy(s),
    c = w.exports.useMemo(() => Wh(t), [t]),
    d = s && !o ? [] : c.map(ys),
    f = w.exports.useRef(!0),
    h = w.exports.useRef(c),
    y = Nf(() => new Map()),
    [b, E] = w.exports.useState(c),
    [m, p] = w.exports.useState(c);
  Ly(() => {
    ((f.current = !1), (h.current = c));
    for (let S = 0; S < m.length; S++) {
      const T = ys(m[S]);
      d.includes(T) ? y.delete(T) : y.get(T) !== !0 && y.set(T, !1);
    }
  }, [m, d.length, d.join("-")]);
  const g = [];
  if (c !== b) {
    let S = [...c];
    for (let T = 0; T < m.length; T++) {
      const x = m[T],
        M = ys(x);
      d.includes(M) || (S.splice(T, 0, x), g.push(x));
    }
    return (l === "wait" && g.length && (S = g), p(Wh(S)), E(c), null);
  }
  const { forceRender: v } = w.exports.useContext(Uf);
  return D(gx, {
    children: m.map((S) => {
      const T = ys(S),
        x = s && !o ? !1 : c === m || d.includes(T),
        M = () => {
          if (y.has(T)) y.set(T, !0);
          else return;
          let B = !0;
          (y.forEach((z) => {
            z || (B = !1);
          }),
            B && (v == null || v(), p(h.current), s && (u == null || u()), i && i()));
        };
      return D(
        bx,
        {
          isPresent: x,
          initial: !f.current || n ? void 0 : !1,
          custom: e,
          presenceAffectsLayout: a,
          mode: l,
          onExitComplete: x ? void 0 : M,
          anchorX: r,
          children: S,
        },
        T,
      );
    }),
  });
};
function Lf(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function Yf(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
const $t = (t) => t;
let Gy = $t;
const qy = { skipAnimations: !1, useManualTiming: !1 };
function Gf(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const ua = (t, e, n) => {
  const i = e - t;
  return i === 0 ? 1 : (n - t) / i;
};
class qf {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return (Lf(this.subscriptions, e), () => Yf(this.subscriptions, e));
  }
  notify(e, n, i) {
    const a = this.subscriptions.length;
    if (!!a)
      if (a === 1) this.subscriptions[0](e, n, i);
      else
        for (let l = 0; l < a; l++) {
          const s = this.subscriptions[l];
          s && s(e, n, i);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Pe = (t) => t * 1e3,
  Fe = (t) => t / 1e3;
function ky(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const Tx = Gf(() => window.ScrollTimeline !== void 0);
class Ax {
  constructor(e) {
    ((this.stop = () => this.runAll("stop")), (this.animations = e.filter(Boolean)));
  }
  get finished() {
    return Promise.all(this.animations.map((e) => ("finished" in e ? e.finished : e)));
  }
  getAll(e) {
    return this.animations[0][e];
  }
  setAll(e, n) {
    for (let i = 0; i < this.animations.length; i++) this.animations[i][e] = n;
  }
  attachTimeline(e, n) {
    const i = this.animations.map((a) => {
      if (Tx() && a.attachTimeline) return a.attachTimeline(e);
      if (typeof n == "function") return n(a);
    });
    return () => {
      i.forEach((a, l) => {
        (a && a(), this.animations[l].stop());
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(e) {
    this.setAll("time", e);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(e) {
    this.setAll("speed", e);
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    let e = 0;
    for (let n = 0; n < this.animations.length; n++) e = Math.max(e, this.animations[n].duration);
    return e;
  }
  runAll(e) {
    this.animations.forEach((n) => n[e]());
  }
  flatten() {
    this.runAll("flatten");
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
class Ex extends Ax {
  then(e, n) {
    return Promise.all(this.animations).then(e).catch(n);
  }
}
function kf(t, e) {
  return t ? t[e] || t.default || t : void 0;
}
const dc = 2e4;
function Xy(t) {
  let e = 0;
  const n = 50;
  let i = t.next(e);
  for (; !i.done && e < dc; ) ((e += n), (i = t.next(e)));
  return e >= dc ? 1 / 0 : e;
}
function Xf(t) {
  return typeof t == "function";
}
function Ih(t, e) {
  ((t.timeline = e), (t.onfinish = null));
}
const Kf = (t) => Array.isArray(t) && typeof t[0] == "number",
  Mx = { linearEasing: void 0 };
function Dx(t, e) {
  const n = Gf(t);
  return () => {
    var i;
    return (i = Mx[e]) !== null && i !== void 0 ? i : n();
  };
}
const xr = Dx(() => {
    try {
      document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return !1;
    }
    return !0;
  }, "linearEasing"),
  Ky = (t, e, n = 10) => {
    let i = "";
    const a = Math.max(Math.round(e / n), 2);
    for (let l = 0; l < a; l++) i += t(ua(0, a - 1, l)) + ", ";
    return `linear(${i.substring(0, i.length - 2)})`;
  };
function Zy(t) {
  return Boolean(
    (typeof t == "function" && xr()) ||
      !t ||
      (typeof t == "string" && (t in hc || xr())) ||
      Kf(t) ||
      (Array.isArray(t) && t.every(Zy)),
  );
}
const qa = ([t, e, n, i]) => `cubic-bezier(${t}, ${e}, ${n}, ${i})`,
  hc = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: qa([0, 0.65, 0.55, 1]),
    circOut: qa([0.55, 0, 1, 0.45]),
    backIn: qa([0.31, 0.01, 0.66, -0.59]),
    backOut: qa([0.33, 1.53, 0.69, 0.99]),
  };
function Qy(t, e) {
  if (t)
    return typeof t == "function" && xr()
      ? Ky(t, e)
      : Kf(t)
        ? qa(t)
        : Array.isArray(t)
          ? t.map((n) => Qy(n, e) || hc.easeOut)
          : hc[t];
}
const vs = ["read", "resolveKeyframes", "update", "preRender", "render", "postRender"],
  tm = { value: null, addProjectionMetrics: null };
function wx(t, e) {
  let n = new Set(),
    i = new Set(),
    a = !1,
    l = !1;
  const s = new WeakSet();
  let r = { delta: 0, timestamp: 0, isProcessing: !1 },
    o = 0;
  function u(d) {
    (s.has(d) && (c.schedule(d), t()), o++, d(r));
  }
  const c = {
    schedule: (d, f = !1, h = !1) => {
      const b = h && a ? n : i;
      return (f && s.add(d), b.has(d) || b.add(d), d);
    },
    cancel: (d) => {
      (i.delete(d), s.delete(d));
    },
    process: (d) => {
      if (((r = d), a)) {
        l = !0;
        return;
      }
      ((a = !0),
        ([n, i] = [i, n]),
        n.forEach(u),
        e && tm.value && tm.value.frameloop[e].push(o),
        (o = 0),
        n.clear(),
        (a = !1),
        l && ((l = !1), c.process(d)));
    },
  };
  return c;
}
const Cx = 40;
function Py(t, e) {
  let n = !1,
    i = !0;
  const a = { delta: 0, timestamp: 0, isProcessing: !1 },
    l = () => (n = !0),
    s = vs.reduce((m, p) => ((m[p] = wx(l, e ? p : void 0)), m), {}),
    { read: r, resolveKeyframes: o, update: u, preRender: c, render: d, postRender: f } = s,
    h = () => {
      const m = performance.now();
      ((n = !1),
        (a.delta = i ? 1e3 / 60 : Math.max(Math.min(m - a.timestamp, Cx), 1)),
        (a.timestamp = m),
        (a.isProcessing = !0),
        r.process(a),
        o.process(a),
        u.process(a),
        c.process(a),
        d.process(a),
        f.process(a),
        (a.isProcessing = !1),
        n && e && ((i = !1), t(h)));
    },
    y = () => {
      ((n = !0), (i = !0), a.isProcessing || t(h));
    };
  return {
    schedule: vs.reduce((m, p) => {
      const g = s[p];
      return ((m[p] = (v, S = !1, T = !1) => (n || y(), g.schedule(v, S, T))), m);
    }, {}),
    cancel: (m) => {
      for (let p = 0; p < vs.length; p++) s[vs[p]].cancel(m);
    },
    state: a,
    steps: s,
  };
}
const {
    schedule: W,
    cancel: zn,
    state: Mt,
    steps: Xo,
  } = Py(typeof requestAnimationFrame < "u" ? requestAnimationFrame : $t, !0),
  { schedule: Zf, cancel: oE } = Py(queueMicrotask, !1);
let Ys;
function Rx() {
  Ys = void 0;
}
const we = {
    now: () => (
      Ys === void 0 &&
        we.set(Mt.isProcessing || qy.useManualTiming ? Mt.timestamp : performance.now()),
      Ys
    ),
    set: (t) => {
      ((Ys = t), queueMicrotask(Rx));
    },
  },
  me = { x: !1, y: !1 };
function Fy() {
  return me.x || me.y;
}
function Ox(t) {
  return t === "x" || t === "y"
    ? me[t]
      ? null
      : ((me[t] = !0),
        () => {
          me[t] = !1;
        })
    : me.x || me.y
      ? null
      : ((me.x = me.y = !0),
        () => {
          me.x = me.y = !1;
        });
}
function zx(t, e, n) {
  var i;
  if (t instanceof EventTarget) return [t];
  if (typeof t == "string") {
    let a = document;
    e && (a = e.current);
    const l = (i = n == null ? void 0 : n[t]) !== null && i !== void 0 ? i : a.querySelectorAll(t);
    return l ? Array.from(l) : [];
  }
  return Array.from(t);
}
function $y(t, e) {
  const n = zx(t),
    i = new AbortController(),
    a = { passive: !0, ...e, signal: i.signal };
  return [n, a, () => i.abort()];
}
function em(t) {
  return !(t.pointerType === "touch" || Fy());
}
function Vx(t, e, n = {}) {
  const [i, a, l] = $y(t, n),
    s = (r) => {
      if (!em(r)) return;
      const { target: o } = r,
        u = e(o, r);
      if (typeof u != "function" || !o) return;
      const c = (d) => {
        !em(d) || (u(d), o.removeEventListener("pointerleave", c));
      };
      o.addEventListener("pointerleave", c, a);
    };
  return (
    i.forEach((r) => {
      r.addEventListener("pointerenter", s, a);
    }),
    l
  );
}
function nm(t, e) {
  const n = `${e}PointerCapture`;
  if (t.target instanceof Element && n in t.target && t.pointerId !== void 0)
    try {
      t.target[n](t.pointerId);
    } catch {}
}
const Jy = (t, e) => (e ? (t === e ? !0 : Jy(t, e.parentElement)) : !1),
  Qf = (t) =>
    t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1,
  _x = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function Bx(t) {
  return _x.has(t.tagName) || t.tabIndex !== -1;
}
const ka = new WeakSet();
function im(t) {
  return (e) => {
    e.key === "Enter" && t(e);
  };
}
function Ko(t, e) {
  t.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }));
}
const Ux = (t, e) => {
  const n = t.currentTarget;
  if (!n) return;
  const i = im(() => {
    if (ka.has(n)) return;
    Ko(n, "down");
    const a = im(() => {
        Ko(n, "up");
      }),
      l = () => Ko(n, "cancel");
    (n.addEventListener("keyup", a, e), n.addEventListener("blur", l, e));
  });
  (n.addEventListener("keydown", i, e),
    n.addEventListener("blur", () => n.removeEventListener("keydown", i), e));
};
function am(t) {
  return Qf(t) && !Fy();
}
function Nx(t, e, n = {}) {
  const [i, a, l] = $y(t, n),
    s = (r) => {
      const o = r.currentTarget;
      if (!o || !am(r) || ka.has(o)) return;
      (ka.add(o), nm(r, "set"));
      const u = e(o, r),
        c = (h, y) => {
          (o.removeEventListener("pointerup", d),
            o.removeEventListener("pointercancel", f),
            nm(h, "release"),
            !(!am(h) || !ka.has(o)) &&
              (ka.delete(o), typeof u == "function" && u(h, { success: y })));
        },
        d = (h) => {
          (
            h.isTrusted
              ? jx(
                  h,
                  o instanceof Element
                    ? o.getBoundingClientRect()
                    : { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight },
                )
              : !1
          )
            ? c(h, !1)
            : c(h, !(o instanceof Element) || Jy(o, h.target));
        },
        f = (h) => {
          c(h, !1);
        };
      (o.addEventListener("pointerup", d, a),
        o.addEventListener("pointercancel", f, a),
        o.addEventListener("lostpointercapture", f, a));
    };
  return (
    i.forEach((r) => {
      r = n.useGlobalTarget ? window : r;
      let o = !1;
      (r instanceof HTMLElement &&
        ((o = !0), !Bx(r) && r.getAttribute("tabindex") === null && (r.tabIndex = 0)),
        r.addEventListener("pointerdown", s, a),
        o && r.addEventListener("focus", (u) => Ux(u, a), a));
    }),
    l
  );
}
function jx(t, e) {
  return t.clientX < e.left || t.clientX > e.right || t.clientY < e.top || t.clientY > e.bottom;
}
const lm = 30,
  Hx = (t) => !isNaN(parseFloat(t));
class Lx {
  constructor(e, n = {}) {
    ((this.version = "12.6.0"),
      (this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (i, a = !0) => {
        const l = we.now();
        (this.updatedAt !== l && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(i),
          this.current !== this.prev &&
            this.events.change &&
            this.events.change.notify(this.current),
          a && this.events.renderRequest && this.events.renderRequest.notify(this.current));
      }),
      (this.hasAnimated = !1),
      this.setCurrent(e),
      (this.owner = n.owner));
  }
  setCurrent(e) {
    ((this.current = e),
      (this.updatedAt = we.now()),
      this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = Hx(this.current)));
  }
  setPrevFrameValue(e = this.current) {
    ((this.prevFrameValue = e), (this.prevUpdatedAt = this.updatedAt));
  }
  onChange(e) {
    return this.on("change", e);
  }
  on(e, n) {
    this.events[e] || (this.events[e] = new qf());
    const i = this.events[e].add(n);
    return e === "change"
      ? () => {
          (i(),
            W.read(() => {
              this.events.change.getSize() || this.stop();
            }));
        }
      : i;
  }
  clearListeners() {
    for (const e in this.events) this.events[e].clear();
  }
  attach(e, n) {
    ((this.passiveEffect = e), (this.stopPassiveEffect = n));
  }
  set(e, n = !0) {
    !n || !this.passiveEffect
      ? this.updateAndNotify(e, n)
      : this.passiveEffect(e, this.updateAndNotify);
  }
  setWithVelocity(e, n, i) {
    (this.set(n),
      (this.prev = void 0),
      (this.prevFrameValue = e),
      (this.prevUpdatedAt = this.updatedAt - i));
  }
  jump(e, n = !0) {
    (this.updateAndNotify(e),
      (this.prev = e),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      n && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const e = we.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > lm)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, lm);
    return ky(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  start(e) {
    return (
      this.stop(),
      new Promise((n) => {
        ((this.hasAnimated = !0),
          (this.animation = e(n)),
          this.events.animationStart && this.events.animationStart.notify());
      }).then(() => {
        (this.events.animationComplete && this.events.animationComplete.notify(),
          this.clearAnimation());
      })
    );
  }
  stop() {
    (this.animation &&
      (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation());
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    (this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect());
  }
}
function wl(t, e) {
  return new Lx(t, e);
}
const Wy = w.exports.createContext({ strict: !1 }),
  sm = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  },
  ca = {};
for (const t in sm) ca[t] = { isEnabled: (e) => sm[t].some((n) => !!e[n]) };
function Yx(t) {
  for (const e in t) ca[e] = { ...ca[e], ...t[e] };
}
const Gx = new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport",
]);
function Tr(t) {
  return (
    t.startsWith("while") ||
    (t.startsWith("drag") && t !== "draggable") ||
    t.startsWith("layout") ||
    t.startsWith("onTap") ||
    t.startsWith("onPan") ||
    t.startsWith("onLayout") ||
    Gx.has(t)
  );
}
let Iy = (t) => !Tr(t);
function qx(t) {
  !t || (Iy = (e) => (e.startsWith("on") ? !Tr(e) : t(e)));
}
try {
  qx(require("@emotion/is-prop-valid").default);
} catch {}
function kx(t, e, n) {
  const i = {};
  for (const a in t)
    (a === "values" && typeof t.values == "object") ||
      ((Iy(a) ||
        (n === !0 && Tr(a)) ||
        (!e && !Tr(a)) ||
        (t.draggable && a.startsWith("onDrag"))) &&
        (i[a] = t[a]));
  return i;
}
function Xx(t) {
  if (typeof Proxy > "u") return t;
  const e = new Map(),
    n = (...i) => t(...i);
  return new Proxy(n, {
    get: (i, a) => (a === "create" ? t : (e.has(a) || e.set(a, t(a)), e.get(a))),
  });
}
const Ir = w.exports.createContext({});
function to(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function Cl(t) {
  return typeof t == "string" || Array.isArray(t);
}
const Pf = ["animate", "whileInView", "whileFocus", "whileHover", "whileTap", "whileDrag", "exit"],
  Ff = ["initial", ...Pf];
function eo(t) {
  return to(t.animate) || Ff.some((e) => Cl(t[e]));
}
function t1(t) {
  return Boolean(eo(t) || t.variants);
}
function Kx(t, e) {
  if (eo(t)) {
    const { initial: n, animate: i } = t;
    return { initial: n === !1 || Cl(n) ? n : void 0, animate: Cl(i) ? i : void 0 };
  }
  return t.inherit !== !1 ? e : {};
}
function Zx(t) {
  const { initial: e, animate: n } = Kx(t, w.exports.useContext(Ir));
  return w.exports.useMemo(() => ({ initial: e, animate: n }), [rm(e), rm(n)]);
}
function rm(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const Qx = Symbol.for("motionComponentSymbol");
function Ni(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function Px(t, e, n) {
  return w.exports.useCallback(
    (i) => {
      (i && t.onMount && t.onMount(i),
        e && (i ? e.mount(i) : e.unmount()),
        n && (typeof n == "function" ? n(i) : Ni(n) && (n.current = i)));
    },
    [e],
  );
}
const $f = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  Fx = "framerAppearId",
  e1 = "data-" + $f(Fx),
  n1 = w.exports.createContext({});
function $x(t, e, n, i, a) {
  var l, s;
  const { visualElement: r } = w.exports.useContext(Ir),
    o = w.exports.useContext(Wy),
    u = w.exports.useContext(Wr),
    c = w.exports.useContext(Hf).reducedMotion,
    d = w.exports.useRef(null);
  ((i = i || o.renderer),
    !d.current &&
      i &&
      (d.current = i(t, {
        visualState: e,
        parent: r,
        props: n,
        presenceContext: u,
        blockInitialAnimation: u ? u.initial === !1 : !1,
        reducedMotionConfig: c,
      })));
  const f = d.current,
    h = w.exports.useContext(n1);
  f && !f.projection && a && (f.type === "html" || f.type === "svg") && Jx(d.current, n, a, h);
  const y = w.exports.useRef(!1);
  w.exports.useInsertionEffect(() => {
    f && y.current && f.update(n, u);
  });
  const b = n[e1],
    E = w.exports.useRef(
      Boolean(b) &&
        !(!((l = window.MotionHandoffIsComplete) === null || l === void 0) && l.call(window, b)) &&
        ((s = window.MotionHasOptimisedAnimation) === null || s === void 0
          ? void 0
          : s.call(window, b)),
    );
  return (
    Ly(() => {
      !f ||
        ((y.current = !0),
        (window.MotionIsMounted = !0),
        f.updateFeatures(),
        Zf.render(f.render),
        E.current && f.animationState && f.animationState.animateChanges());
    }),
    w.exports.useEffect(() => {
      !f ||
        (!E.current && f.animationState && f.animationState.animateChanges(),
        E.current &&
          (queueMicrotask(() => {
            var m;
            (m = window.MotionHandoffMarkAsComplete) === null || m === void 0 || m.call(window, b);
          }),
          (E.current = !1)));
    }),
    f
  );
}
function Jx(t, e, n, i) {
  const { layoutId: a, layout: l, drag: s, dragConstraints: r, layoutScroll: o, layoutRoot: u } = e;
  ((t.projection = new n(t.latestValues, e["data-framer-portal-id"] ? void 0 : i1(t.parent))),
    t.projection.setOptions({
      layoutId: a,
      layout: l,
      alwaysMeasureLayout: Boolean(s) || (r && Ni(r)),
      visualElement: t,
      animationType: typeof l == "string" ? l : "both",
      initialPromotionConfig: i,
      layoutScroll: o,
      layoutRoot: u,
    }));
}
function i1(t) {
  if (!!t) return t.options.allowProjection !== !1 ? t.projection : i1(t.parent);
}
function Wx({
  preloadedFeatures: t,
  createVisualElement: e,
  useRender: n,
  useVisualState: i,
  Component: a,
}) {
  var l, s;
  t && Yx(t);
  function r(u, c) {
    let d;
    const f = { ...w.exports.useContext(Hf), ...u, layoutId: Ix(u) },
      { isStatic: h } = f,
      y = Zx(u),
      b = i(u, h);
    if (!h && jf) {
      tT();
      const E = eT(f);
      ((d = E.MeasureLayout), (y.visualElement = $x(a, b, f, e, E.ProjectionNode)));
    }
    return U(Ir.Provider, {
      value: y,
      children: [
        d && y.visualElement ? D(d, { visualElement: y.visualElement, ...f }) : null,
        n(a, u, Px(b, y.visualElement, c), b, h, y.visualElement),
      ],
    });
  }
  r.displayName = `motion.${typeof a == "string" ? a : `create(${(s = (l = a.displayName) !== null && l !== void 0 ? l : a.name) !== null && s !== void 0 ? s : ""})`}`;
  const o = w.exports.forwardRef(r);
  return ((o[Qx] = a), o);
}
function Ix({ layoutId: t }) {
  const e = w.exports.useContext(Uf).id;
  return e && t !== void 0 ? e + "-" + t : t;
}
function tT(t, e) {
  w.exports.useContext(Wy).strict;
}
function eT(t) {
  const { drag: e, layout: n } = ca;
  if (!e && !n) return {};
  const i = { ...e, ...n };
  return {
    MeasureLayout:
      (e == null ? void 0 : e.isEnabled(t)) || (n == null ? void 0 : n.isEnabled(t))
        ? i.MeasureLayout
        : void 0,
    ProjectionNode: i.ProjectionNode,
  };
}
const a1 = (t) => (e) => typeof e == "string" && e.startsWith(t),
  Jf = a1("--"),
  nT = a1("var(--"),
  Wf = (t) => (nT(t) ? iT.test(t.split("/*")[0].trim()) : !1),
  iT = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  Rl = {};
function aT(t) {
  for (const e in t) ((Rl[e] = t[e]), Jf(e) && (Rl[e].isCSSVariable = !0));
}
const Sa = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  mi = new Set(Sa);
function l1(t, { layout: e, layoutId: n }) {
  return (
    mi.has(t) || t.startsWith("origin") || ((e || n !== void 0) && (!!Rl[t] || t === "opacity"))
  );
}
const Vt = (t) => Boolean(t && t.getVelocity),
  s1 = (t, e) => (e && typeof t == "number" ? e.transform(t) : t),
  tn = (t, e, n) => (n > e ? e : n < t ? t : n),
  xa = { test: (t) => typeof t == "number", parse: parseFloat, transform: (t) => t },
  Ol = { ...xa, transform: (t) => tn(0, 1, t) },
  bs = { ...xa, default: 1 },
  Ql = (t) => ({
    test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
    parse: parseFloat,
    transform: (e) => `${e}${t}`,
  }),
  un = Ql("deg"),
  Ce = Ql("%"),
  _ = Ql("px"),
  lT = Ql("vh"),
  sT = Ql("vw"),
  om = { ...Ce, parse: (t) => Ce.parse(t) / 100, transform: (t) => Ce.transform(t * 100) },
  rT = {
    borderWidth: _,
    borderTopWidth: _,
    borderRightWidth: _,
    borderBottomWidth: _,
    borderLeftWidth: _,
    borderRadius: _,
    radius: _,
    borderTopLeftRadius: _,
    borderTopRightRadius: _,
    borderBottomRightRadius: _,
    borderBottomLeftRadius: _,
    width: _,
    maxWidth: _,
    height: _,
    maxHeight: _,
    top: _,
    right: _,
    bottom: _,
    left: _,
    padding: _,
    paddingTop: _,
    paddingRight: _,
    paddingBottom: _,
    paddingLeft: _,
    margin: _,
    marginTop: _,
    marginRight: _,
    marginBottom: _,
    marginLeft: _,
    backgroundPositionX: _,
    backgroundPositionY: _,
  },
  oT = {
    rotate: un,
    rotateX: un,
    rotateY: un,
    rotateZ: un,
    scale: bs,
    scaleX: bs,
    scaleY: bs,
    scaleZ: bs,
    skew: un,
    skewX: un,
    skewY: un,
    distance: _,
    translateX: _,
    translateY: _,
    translateZ: _,
    x: _,
    y: _,
    z: _,
    perspective: _,
    transformPerspective: _,
    opacity: Ol,
    originX: om,
    originY: om,
    originZ: _,
  },
  um = { ...xa, transform: Math.round },
  If = { ...rT, ...oT, zIndex: um, size: _, fillOpacity: Ol, strokeOpacity: Ol, numOctaves: um },
  uT = { x: "translateX", y: "translateY", z: "translateZ", transformPerspective: "perspective" },
  cT = Sa.length;
function fT(t, e, n) {
  let i = "",
    a = !0;
  for (let l = 0; l < cT; l++) {
    const s = Sa[l],
      r = t[s];
    if (r === void 0) continue;
    let o = !0;
    if (
      (typeof r == "number"
        ? (o = r === (s.startsWith("scale") ? 1 : 0))
        : (o = parseFloat(r) === 0),
      !o || n)
    ) {
      const u = s1(r, If[s]);
      if (!o) {
        a = !1;
        const c = uT[s] || s;
        i += `${c}(${u}) `;
      }
      n && (e[s] = u);
    }
  }
  return ((i = i.trim()), n ? (i = n(e, a ? "" : i)) : a && (i = "none"), i);
}
function td(t, e, n) {
  const { style: i, vars: a, transformOrigin: l } = t;
  let s = !1,
    r = !1;
  for (const o in e) {
    const u = e[o];
    if (mi.has(o)) {
      s = !0;
      continue;
    } else if (Jf(o)) {
      a[o] = u;
      continue;
    } else {
      const c = s1(u, If[o]);
      o.startsWith("origin") ? ((r = !0), (l[o] = c)) : (i[o] = c);
    }
  }
  if (
    (e.transform ||
      (s || n ? (i.transform = fT(e, t.transform, n)) : i.transform && (i.transform = "none")),
    r)
  ) {
    const { originX: o = "50%", originY: u = "50%", originZ: c = 0 } = l;
    i.transformOrigin = `${o} ${u} ${c}`;
  }
}
const ed = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function r1(t, e, n) {
  for (const i in e) !Vt(e[i]) && !l1(i, n) && (t[i] = e[i]);
}
function dT({ transformTemplate: t }, e) {
  return w.exports.useMemo(() => {
    const n = ed();
    return (td(n, e, t), Object.assign({}, n.vars, n.style));
  }, [e]);
}
function hT(t, e) {
  const n = t.style || {},
    i = {};
  return (r1(i, n, t), Object.assign(i, dT(t, e)), i);
}
function mT(t, e) {
  const n = {},
    i = hT(t, e);
  return (
    t.drag &&
      t.dragListener !== !1 &&
      ((n.draggable = !1),
      (i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none"),
      (i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`)),
    t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (n.tabIndex = 0),
    (n.style = i),
    n
  );
}
const pT = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function nd(t) {
  return typeof t != "string" || t.includes("-") ? !1 : !!(pT.indexOf(t) > -1 || /[A-Z]/u.test(t));
}
const gT = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  yT = { offset: "strokeDashoffset", array: "strokeDasharray" };
function vT(t, e, n = 1, i = 0, a = !0) {
  t.pathLength = 1;
  const l = a ? gT : yT;
  t[l.offset] = _.transform(-i);
  const s = _.transform(e),
    r = _.transform(n);
  t[l.array] = `${s} ${r}`;
}
function cm(t, e, n) {
  return typeof t == "string" ? t : _.transform(e + n * t);
}
function bT(t, e, n) {
  const i = cm(e, t.x, t.width),
    a = cm(n, t.y, t.height);
  return `${i} ${a}`;
}
function id(
  t,
  {
    attrX: e,
    attrY: n,
    attrScale: i,
    originX: a,
    originY: l,
    pathLength: s,
    pathSpacing: r = 1,
    pathOffset: o = 0,
    ...u
  },
  c,
  d,
) {
  if ((td(t, u, d), c)) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  ((t.attrs = t.style), (t.style = {}));
  const { attrs: f, style: h, dimensions: y } = t;
  (f.transform && (y && (h.transform = f.transform), delete f.transform),
    y &&
      (a !== void 0 || l !== void 0 || h.transform) &&
      (h.transformOrigin = bT(y, a !== void 0 ? a : 0.5, l !== void 0 ? l : 0.5)),
    e !== void 0 && (f.x = e),
    n !== void 0 && (f.y = n),
    i !== void 0 && (f.scale = i),
    s !== void 0 && vT(f, s, r, o, !1));
}
const o1 = () => ({ ...ed(), attrs: {} }),
  ad = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function ST(t, e, n, i) {
  const a = w.exports.useMemo(() => {
    const l = o1();
    return (id(l, e, ad(i), t.transformTemplate), { ...l.attrs, style: { ...l.style } });
  }, [e]);
  if (t.style) {
    const l = {};
    (r1(l, t.style, t), (a.style = { ...l, ...a.style }));
  }
  return a;
}
function xT(t = !1) {
  return (n, i, a, { latestValues: l }, s) => {
    const o = (nd(n) ? ST : mT)(i, l, s, n),
      u = kx(i, typeof n == "string", t),
      c = n !== w.exports.Fragment ? { ...u, ...o, ref: a } : {},
      { children: d } = i,
      f = w.exports.useMemo(() => (Vt(d) ? d.get() : d), [d]);
    return w.exports.createElement(n, { ...c, children: f });
  };
}
function fm(t) {
  const e = [{}, {}];
  return (
    t == null ||
      t.values.forEach((n, i) => {
        ((e[0][i] = n.get()), (e[1][i] = n.getVelocity()));
      }),
    e
  );
}
function ld(t, e, n, i) {
  if (typeof e == "function") {
    const [a, l] = fm(i);
    e = e(n !== void 0 ? n : t.custom, a, l);
  }
  if ((typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function")) {
    const [a, l] = fm(i);
    e = e(n !== void 0 ? n : t.custom, a, l);
  }
  return e;
}
const mc = (t) => Array.isArray(t),
  TT = (t) => Boolean(t && typeof t == "object" && t.mix && t.toValue),
  AT = (t) => (mc(t) ? t[t.length - 1] || 0 : t);
function Gs(t) {
  const e = Vt(t) ? t.get() : t;
  return TT(e) ? e.toValue() : e;
}
function ET({ scrapeMotionValuesFromProps: t, createRenderState: e, onUpdate: n }, i, a, l) {
  const s = { latestValues: MT(i, a, l, t), renderState: e() };
  return (
    n && ((s.onMount = (r) => n({ props: i, current: r, ...s })), (s.onUpdate = (r) => n(r))),
    s
  );
}
const u1 = (t) => (e, n) => {
  const i = w.exports.useContext(Ir),
    a = w.exports.useContext(Wr),
    l = () => ET(t, e, i, a);
  return n ? l() : Nf(l);
};
function MT(t, e, n, i) {
  const a = {},
    l = i(t, {});
  for (const f in l) a[f] = Gs(l[f]);
  let { initial: s, animate: r } = t;
  const o = eo(t),
    u = t1(t);
  e &&
    u &&
    !o &&
    t.inherit !== !1 &&
    (s === void 0 && (s = e.initial), r === void 0 && (r = e.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || s === !1;
  const d = c ? r : s;
  if (d && typeof d != "boolean" && !to(d)) {
    const f = Array.isArray(d) ? d : [d];
    for (let h = 0; h < f.length; h++) {
      const y = ld(t, f[h]);
      if (y) {
        const { transitionEnd: b, transition: E, ...m } = y;
        for (const p in m) {
          let g = m[p];
          if (Array.isArray(g)) {
            const v = c ? g.length - 1 : 0;
            g = g[v];
          }
          g !== null && (a[p] = g);
        }
        for (const p in b) a[p] = b[p];
      }
    }
  }
  return a;
}
function sd(t, e, n) {
  var i;
  const { style: a } = t,
    l = {};
  for (const s in a)
    (Vt(a[s]) ||
      (e.style && Vt(e.style[s])) ||
      l1(s, t) ||
      ((i = n == null ? void 0 : n.getValue(s)) === null || i === void 0 ? void 0 : i.liveStyle) !==
        void 0) &&
      (l[s] = a[s]);
  return l;
}
const DT = { useVisualState: u1({ scrapeMotionValuesFromProps: sd, createRenderState: ed }) };
function c1(t, e) {
  try {
    e.dimensions = typeof t.getBBox == "function" ? t.getBBox() : t.getBoundingClientRect();
  } catch {
    e.dimensions = { x: 0, y: 0, width: 0, height: 0 };
  }
}
function f1(t, { style: e, vars: n }, i, a) {
  Object.assign(t.style, e, a && a.getProjectionStyles(i));
  for (const l in n) t.style.setProperty(l, n[l]);
}
const d1 = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust",
]);
function h1(t, e, n, i) {
  f1(t, e, void 0, i);
  for (const a in e.attrs) t.setAttribute(d1.has(a) ? a : $f(a), e.attrs[a]);
}
function m1(t, e, n) {
  const i = sd(t, e, n);
  for (const a in t)
    if (Vt(t[a]) || Vt(e[a])) {
      const l = Sa.indexOf(a) !== -1 ? "attr" + a.charAt(0).toUpperCase() + a.substring(1) : a;
      i[l] = t[a];
    }
  return i;
}
const dm = ["x", "y", "width", "height", "cx", "cy", "r"],
  wT = {
    useVisualState: u1({
      scrapeMotionValuesFromProps: m1,
      createRenderState: o1,
      onUpdate: ({ props: t, prevProps: e, current: n, renderState: i, latestValues: a }) => {
        if (!n) return;
        let l = !!t.drag;
        if (!l) {
          for (const r in a)
            if (mi.has(r)) {
              l = !0;
              break;
            }
        }
        if (!l) return;
        let s = !e;
        if (e)
          for (let r = 0; r < dm.length; r++) {
            const o = dm[r];
            t[o] !== e[o] && (s = !0);
          }
        !s ||
          W.read(() => {
            (c1(n, i),
              W.render(() => {
                (id(i, a, ad(n.tagName), t.transformTemplate), h1(n, i));
              }));
          });
      },
    }),
  };
function CT(t, e) {
  return function (i, { forwardMotionProps: a } = { forwardMotionProps: !1 }) {
    const s = {
      ...(nd(i) ? wT : DT),
      preloadedFeatures: t,
      useRender: xT(a),
      createVisualElement: e,
      Component: i,
    };
    return Wx(s);
  };
}
function zl(t, e, n) {
  const i = t.getProps();
  return ld(i, e, n !== void 0 ? n : i.custom, t);
}
const p1 = new Set(["width", "height", "top", "left", "right", "bottom", ...Sa]);
function RT(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, wl(n));
}
function OT(t, e) {
  const n = zl(t, e);
  let { transitionEnd: i = {}, transition: a = {}, ...l } = n || {};
  l = { ...l, ...i };
  for (const s in l) {
    const r = AT(l[s]);
    RT(t, s, r);
  }
}
function zT(t) {
  return Boolean(Vt(t) && t.add);
}
function pc(t, e) {
  const n = t.getValue("willChange");
  if (zT(n)) return n.add(e);
}
function g1(t) {
  return t.props[e1];
}
const VT = { current: !1 },
  y1 = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t,
  _T = 1e-7,
  BT = 12;
function UT(t, e, n, i, a) {
  let l,
    s,
    r = 0;
  do ((s = e + (n - e) / 2), (l = y1(s, i, a) - t), l > 0 ? (n = s) : (e = s));
  while (Math.abs(l) > _T && ++r < BT);
  return s;
}
function Pl(t, e, n, i) {
  if (t === e && n === i) return $t;
  const a = (l) => UT(l, 0, 1, t, n);
  return (l) => (l === 0 || l === 1 ? l : y1(a(l), e, i));
}
const v1 = (t) => (e) => (e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2),
  b1 = (t) => (e) => 1 - t(1 - e),
  S1 = Pl(0.33, 1.53, 0.69, 0.99),
  rd = b1(S1),
  x1 = v1(rd),
  T1 = (t) => ((t *= 2) < 1 ? 0.5 * rd(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1)))),
  od = (t) => 1 - Math.sin(Math.acos(t)),
  A1 = b1(od),
  E1 = v1(od),
  M1 = (t) => /^0[^.\s]+$/u.test(t);
function NT(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || M1(t) : !0;
}
const rl = (t) => Math.round(t * 1e5) / 1e5,
  ud = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function jT(t) {
  return t == null;
}
const HT =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  cd = (t, e) => (n) =>
    Boolean(
      (typeof n == "string" && HT.test(n) && n.startsWith(t)) ||
        (e && !jT(n) && Object.prototype.hasOwnProperty.call(n, e)),
    ),
  D1 = (t, e, n) => (i) => {
    if (typeof i != "string") return i;
    const [a, l, s, r] = i.match(ud);
    return {
      [t]: parseFloat(a),
      [e]: parseFloat(l),
      [n]: parseFloat(s),
      alpha: r !== void 0 ? parseFloat(r) : 1,
    };
  },
  LT = (t) => tn(0, 255, t),
  Zo = { ...xa, transform: (t) => Math.round(LT(t)) },
  Zn = {
    test: cd("rgb", "red"),
    parse: D1("red", "green", "blue"),
    transform: ({ red: t, green: e, blue: n, alpha: i = 1 }) =>
      "rgba(" +
      Zo.transform(t) +
      ", " +
      Zo.transform(e) +
      ", " +
      Zo.transform(n) +
      ", " +
      rl(Ol.transform(i)) +
      ")",
  };
function YT(t) {
  let e = "",
    n = "",
    i = "",
    a = "";
  return (
    t.length > 5
      ? ((e = t.substring(1, 3)),
        (n = t.substring(3, 5)),
        (i = t.substring(5, 7)),
        (a = t.substring(7, 9)))
      : ((e = t.substring(1, 2)),
        (n = t.substring(2, 3)),
        (i = t.substring(3, 4)),
        (a = t.substring(4, 5)),
        (e += e),
        (n += n),
        (i += i),
        (a += a)),
    {
      red: parseInt(e, 16),
      green: parseInt(n, 16),
      blue: parseInt(i, 16),
      alpha: a ? parseInt(a, 16) / 255 : 1,
    }
  );
}
const gc = { test: cd("#"), parse: YT, transform: Zn.transform },
  ji = {
    test: cd("hsl", "hue"),
    parse: D1("hue", "saturation", "lightness"),
    transform: ({ hue: t, saturation: e, lightness: n, alpha: i = 1 }) =>
      "hsla(" +
      Math.round(t) +
      ", " +
      Ce.transform(rl(e)) +
      ", " +
      Ce.transform(rl(n)) +
      ", " +
      rl(Ol.transform(i)) +
      ")",
  },
  Rt = {
    test: (t) => Zn.test(t) || gc.test(t) || ji.test(t),
    parse: (t) => (Zn.test(t) ? Zn.parse(t) : ji.test(t) ? ji.parse(t) : gc.parse(t)),
    transform: (t) =>
      typeof t == "string" ? t : t.hasOwnProperty("red") ? Zn.transform(t) : ji.transform(t),
  },
  GT =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function qT(t) {
  var e, n;
  return (
    isNaN(t) &&
    typeof t == "string" &&
    (((e = t.match(ud)) === null || e === void 0 ? void 0 : e.length) || 0) +
      (((n = t.match(GT)) === null || n === void 0 ? void 0 : n.length) || 0) >
      0
  );
}
const w1 = "number",
  C1 = "color",
  kT = "var",
  XT = "var(",
  hm = "${}",
  KT =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Vl(t) {
  const e = t.toString(),
    n = [],
    i = { color: [], number: [], var: [] },
    a = [];
  let l = 0;
  const r = e
    .replace(
      KT,
      (o) => (
        Rt.test(o)
          ? (i.color.push(l), a.push(C1), n.push(Rt.parse(o)))
          : o.startsWith(XT)
            ? (i.var.push(l), a.push(kT), n.push(o))
            : (i.number.push(l), a.push(w1), n.push(parseFloat(o))),
        ++l,
        hm
      ),
    )
    .split(hm);
  return { values: n, split: r, indexes: i, types: a };
}
function R1(t) {
  return Vl(t).values;
}
function O1(t) {
  const { split: e, types: n } = Vl(t),
    i = e.length;
  return (a) => {
    let l = "";
    for (let s = 0; s < i; s++)
      if (((l += e[s]), a[s] !== void 0)) {
        const r = n[s];
        r === w1 ? (l += rl(a[s])) : r === C1 ? (l += Rt.transform(a[s])) : (l += a[s]);
      }
    return l;
  };
}
const ZT = (t) => (typeof t == "number" ? 0 : t);
function QT(t) {
  const e = R1(t);
  return O1(t)(e.map(ZT));
}
const Vn = { test: qT, parse: R1, createTransformer: O1, getAnimatableNone: QT },
  PT = new Set(["brightness", "contrast", "saturate", "opacity"]);
function FT(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow") return t;
  const [i] = n.match(ud) || [];
  if (!i) return t;
  const a = n.replace(i, "");
  let l = PT.has(e) ? 1 : 0;
  return (i !== n && (l *= 100), e + "(" + l + a + ")");
}
const $T = /\b([a-z-]*)\(.*?\)/gu,
  yc = {
    ...Vn,
    getAnimatableNone: (t) => {
      const e = t.match($T);
      return e ? e.map(FT).join(" ") : t;
    },
  },
  JT = {
    ...If,
    color: Rt,
    backgroundColor: Rt,
    outlineColor: Rt,
    fill: Rt,
    stroke: Rt,
    borderColor: Rt,
    borderTopColor: Rt,
    borderRightColor: Rt,
    borderBottomColor: Rt,
    borderLeftColor: Rt,
    filter: yc,
    WebkitFilter: yc,
  },
  z1 = (t) => JT[t];
function V1(t, e) {
  let n = z1(t);
  return (n !== yc && (n = Vn), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0);
}
const WT = new Set(["auto", "none", "0"]);
function IT(t, e, n) {
  let i = 0,
    a;
  for (; i < t.length && !a; ) {
    const l = t[i];
    (typeof l == "string" && !WT.has(l) && Vl(l).values.length && (a = t[i]), i++);
  }
  if (a && n) for (const l of e) t[l] = V1(n, a);
}
const Qn = (t) => (t * 180) / Math.PI,
  vc = (t) => {
    const e = Qn(Math.atan2(t[1], t[0]));
    return bc(e);
  },
  t5 = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
    rotate: vc,
    rotateZ: vc,
    skewX: (t) => Qn(Math.atan(t[1])),
    skewY: (t) => Qn(Math.atan(t[2])),
    skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2,
  },
  bc = (t) => ((t = t % 360), t < 0 && (t += 360), t),
  mm = vc,
  pm = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]),
  gm = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]),
  e5 = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX: pm,
    scaleY: gm,
    scale: (t) => (pm(t) + gm(t)) / 2,
    rotateX: (t) => bc(Qn(Math.atan2(t[6], t[5]))),
    rotateY: (t) => bc(Qn(Math.atan2(-t[2], t[0]))),
    rotateZ: mm,
    rotate: mm,
    skewX: (t) => Qn(Math.atan(t[4])),
    skewY: (t) => Qn(Math.atan(t[1])),
    skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2,
  };
function ym(t) {
  return t.includes("scale") ? 1 : 0;
}
function Sc(t, e) {
  if (!t || t === "none") return ym(e);
  const n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, a;
  if (n) ((i = e5), (a = n));
  else {
    const r = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    ((i = t5), (a = r));
  }
  if (!a) return ym(e);
  const l = i[e],
    s = a[1].split(",").map(i5);
  return typeof l == "function" ? l(s) : s[l];
}
const n5 = (t, e) => {
  const { transform: n = "none" } = getComputedStyle(t);
  return Sc(n, e);
};
function i5(t) {
  return parseFloat(t.trim());
}
const vm = (t) => t === xa || t === _,
  a5 = new Set(["x", "y", "z"]),
  l5 = Sa.filter((t) => !a5.has(t));
function s5(t) {
  const e = [];
  return (
    l5.forEach((n) => {
      const i = t.getValue(n);
      i !== void 0 && (e.push([n, i.get()]), i.set(n.startsWith("scale") ? 1 : 0));
    }),
    e
  );
}
const fa = {
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) =>
    t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) =>
    t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  x: (t, { transform: e }) => Sc(e, "x"),
  y: (t, { transform: e }) => Sc(e, "y"),
};
fa.translateX = fa.x;
fa.translateY = fa.y;
const ni = new Set();
let xc = !1,
  Tc = !1;
function _1() {
  if (Tc) {
    const t = Array.from(ni).filter((i) => i.needsMeasurement),
      e = new Set(t.map((i) => i.element)),
      n = new Map();
    (e.forEach((i) => {
      const a = s5(i);
      !a.length || (n.set(i, a), i.render());
    }),
      t.forEach((i) => i.measureInitialState()),
      e.forEach((i) => {
        i.render();
        const a = n.get(i);
        a &&
          a.forEach(([l, s]) => {
            var r;
            (r = i.getValue(l)) === null || r === void 0 || r.set(s);
          });
      }),
      t.forEach((i) => i.measureEndState()),
      t.forEach((i) => {
        i.suspendedScrollY !== void 0 && window.scrollTo(0, i.suspendedScrollY);
      }));
  }
  ((Tc = !1), (xc = !1), ni.forEach((t) => t.complete()), ni.clear());
}
function B1() {
  ni.forEach((t) => {
    (t.readKeyframes(), t.needsMeasurement && (Tc = !0));
  });
}
function r5() {
  (B1(), _1());
}
class fd {
  constructor(e, n, i, a, l, s = !1) {
    ((this.isComplete = !1),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.isScheduled = !1),
      (this.unresolvedKeyframes = [...e]),
      (this.onComplete = n),
      (this.name = i),
      (this.motionValue = a),
      (this.element = l),
      (this.isAsync = s));
  }
  scheduleResolve() {
    ((this.isScheduled = !0),
      this.isAsync
        ? (ni.add(this), xc || ((xc = !0), W.read(B1), W.resolveKeyframes(_1)))
        : (this.readKeyframes(), this.complete()));
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: n, element: i, motionValue: a } = this;
    for (let l = 0; l < e.length; l++)
      if (e[l] === null)
        if (l === 0) {
          const s = a == null ? void 0 : a.get(),
            r = e[e.length - 1];
          if (s !== void 0) e[0] = s;
          else if (i && n) {
            const o = i.readValue(n, r);
            o != null && (e[0] = o);
          }
          (e[0] === void 0 && (e[0] = r), a && s === void 0 && a.set(e[0]));
        } else e[l] = e[l - 1];
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete() {
    ((this.isComplete = !0),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
      ni.delete(this));
  }
  cancel() {
    this.isComplete || ((this.isScheduled = !1), ni.delete(this));
  }
  resume() {
    this.isComplete || this.scheduleResolve();
  }
}
const U1 = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t),
  o5 = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function u5(t) {
  const e = o5.exec(t);
  if (!e) return [,];
  const [, n, i, a] = e;
  return [`--${n != null ? n : i}`, a];
}
function N1(t, e, n = 1) {
  const [i, a] = u5(t);
  if (!i) return;
  const l = window.getComputedStyle(e).getPropertyValue(i);
  if (l) {
    const s = l.trim();
    return U1(s) ? parseFloat(s) : s;
  }
  return Wf(a) ? N1(a, e, n + 1) : a;
}
const j1 = (t) => (e) => e.test(t),
  c5 = { test: (t) => t === "auto", parse: (t) => t },
  H1 = [xa, _, Ce, un, sT, lT, c5],
  bm = (t) => H1.find(j1(t));
class L1 extends fd {
  constructor(e, n, i, a, l) {
    super(e, n, i, a, l, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: i } = this;
    if (!n || !n.current) return;
    super.readKeyframes();
    for (let o = 0; o < e.length; o++) {
      let u = e[o];
      if (typeof u == "string" && ((u = u.trim()), Wf(u))) {
        const c = N1(u, n.current);
        (c !== void 0 && (e[o] = c), o === e.length - 1 && (this.finalKeyframe = u));
      }
    }
    if ((this.resolveNoneKeyframes(), !p1.has(i) || e.length !== 2)) return;
    const [a, l] = e,
      s = bm(a),
      r = bm(l);
    if (s !== r)
      if (vm(s) && vm(r))
        for (let o = 0; o < e.length; o++) {
          const u = e[o];
          typeof u == "string" && (e[o] = parseFloat(u));
        }
      else this.needsMeasurement = !0;
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this,
      i = [];
    for (let a = 0; a < e.length; a++) NT(e[a]) && i.push(a);
    i.length && IT(e, i, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: i } = this;
    if (!e || !e.current) return;
    (i === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = fa[i](e.measureViewportBox(), window.getComputedStyle(e.current))),
      (n[0] = this.measuredOrigin));
    const a = n[n.length - 1];
    a !== void 0 && e.getValue(i, a).jump(a, !1);
  }
  measureEndState() {
    var e;
    const { element: n, name: i, unresolvedKeyframes: a } = this;
    if (!n || !n.current) return;
    const l = n.getValue(i);
    l && l.jump(this.measuredOrigin, !1);
    const s = a.length - 1,
      r = a[s];
    ((a[s] = fa[i](n.measureViewportBox(), window.getComputedStyle(n.current))),
      r !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = r),
      !((e = this.removedTransforms) === null || e === void 0) &&
        e.length &&
        this.removedTransforms.forEach(([o, u]) => {
          n.getValue(o).set(u);
        }),
      this.resolveNoneKeyframes());
  }
}
const Sm = (t, e) =>
  e === "zIndex"
    ? !1
    : !!(
        typeof t == "number" ||
        Array.isArray(t) ||
        (typeof t == "string" && (Vn.test(t) || t === "0") && !t.startsWith("url("))
      );
function f5(t) {
  const e = t[0];
  if (t.length === 1) return !0;
  for (let n = 0; n < t.length; n++) if (t[n] !== e) return !0;
}
function d5(t, e, n, i) {
  const a = t[0];
  if (a === null) return !1;
  if (e === "display" || e === "visibility") return !0;
  const l = t[t.length - 1],
    s = Sm(a, e),
    r = Sm(l, e);
  return !s || !r ? !1 : f5(t) || ((n === "spring" || Xf(n)) && i);
}
const h5 = (t) => t !== null;
function no(t, { repeat: e, repeatType: n = "loop" }, i) {
  const a = t.filter(h5),
    l = e && n !== "loop" && e % 2 === 1 ? 0 : a.length - 1;
  return !l || i === void 0 ? a[l] : i;
}
const m5 = 40;
class Y1 {
  constructor({
    autoplay: e = !0,
    delay: n = 0,
    type: i = "keyframes",
    repeat: a = 0,
    repeatDelay: l = 0,
    repeatType: s = "loop",
    ...r
  }) {
    ((this.isStopped = !1),
      (this.hasAttemptedResolve = !1),
      (this.createdAt = we.now()),
      (this.options = {
        autoplay: e,
        delay: n,
        type: i,
        repeat: a,
        repeatDelay: l,
        repeatType: s,
        ...r,
      }),
      this.updateFinishedPromise());
  }
  calcStartTime() {
    return this.resolvedAt
      ? this.resolvedAt - this.createdAt > m5
        ? this.resolvedAt
        : this.createdAt
      : this.createdAt;
  }
  get resolved() {
    return (!this._resolved && !this.hasAttemptedResolve && r5(), this._resolved);
  }
  onKeyframesResolved(e, n) {
    ((this.resolvedAt = we.now()), (this.hasAttemptedResolve = !0));
    const {
      name: i,
      type: a,
      velocity: l,
      delay: s,
      onComplete: r,
      onUpdate: o,
      isGenerator: u,
    } = this.options;
    if (!u && !d5(e, i, a, l))
      if (s) this.options.duration = 0;
      else {
        (o && o(no(e, this.options, n)), r && r(), this.resolveFinishedPromise());
        return;
      }
    const c = this.initPlayback(e, n);
    c !== !1 &&
      ((this._resolved = { keyframes: e, finalKeyframe: n, ...c }), this.onPostResolved());
  }
  onPostResolved() {}
  then(e, n) {
    return this.currentFinishedPromise.then(e, n);
  }
  flatten() {
    !this.options.allowFlatten ||
      ((this.options.type = "keyframes"), (this.options.ease = "linear"));
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((e) => {
      this.resolveFinishedPromise = e;
    });
  }
}
const lt = (t, e, n) => t + (e - t) * n;
function Qo(t, e, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t
  );
}
function p5({ hue: t, saturation: e, lightness: n, alpha: i }) {
  ((t /= 360), (e /= 100), (n /= 100));
  let a = 0,
    l = 0,
    s = 0;
  if (!e) a = l = s = n;
  else {
    const r = n < 0.5 ? n * (1 + e) : n + e - n * e,
      o = 2 * n - r;
    ((a = Qo(o, r, t + 1 / 3)), (l = Qo(o, r, t)), (s = Qo(o, r, t - 1 / 3)));
  }
  return {
    red: Math.round(a * 255),
    green: Math.round(l * 255),
    blue: Math.round(s * 255),
    alpha: i,
  };
}
function Ar(t, e) {
  return (n) => (n > 0 ? e : t);
}
const Po = (t, e, n) => {
    const i = t * t,
      a = n * (e * e - i) + i;
    return a < 0 ? 0 : Math.sqrt(a);
  },
  g5 = [gc, Zn, ji],
  y5 = (t) => g5.find((e) => e.test(t));
function xm(t) {
  const e = y5(t);
  if (!Boolean(e)) return !1;
  let n = e.parse(t);
  return (e === ji && (n = p5(n)), n);
}
const Tm = (t, e) => {
    const n = xm(t),
      i = xm(e);
    if (!n || !i) return Ar(t, e);
    const a = { ...n };
    return (l) => (
      (a.red = Po(n.red, i.red, l)),
      (a.green = Po(n.green, i.green, l)),
      (a.blue = Po(n.blue, i.blue, l)),
      (a.alpha = lt(n.alpha, i.alpha, l)),
      Zn.transform(a)
    );
  },
  v5 = (t, e) => (n) => e(t(n)),
  Fl = (...t) => t.reduce(v5),
  Ac = new Set(["none", "hidden"]);
function b5(t, e) {
  return Ac.has(t) ? (n) => (n <= 0 ? t : e) : (n) => (n >= 1 ? e : t);
}
function S5(t, e) {
  return (n) => lt(t, e, n);
}
function dd(t) {
  return typeof t == "number"
    ? S5
    : typeof t == "string"
      ? Wf(t)
        ? Ar
        : Rt.test(t)
          ? Tm
          : A5
      : Array.isArray(t)
        ? G1
        : typeof t == "object"
          ? Rt.test(t)
            ? Tm
            : x5
          : Ar;
}
function G1(t, e) {
  const n = [...t],
    i = n.length,
    a = t.map((l, s) => dd(l)(l, e[s]));
  return (l) => {
    for (let s = 0; s < i; s++) n[s] = a[s](l);
    return n;
  };
}
function x5(t, e) {
  const n = { ...t, ...e },
    i = {};
  for (const a in n) t[a] !== void 0 && e[a] !== void 0 && (i[a] = dd(t[a])(t[a], e[a]));
  return (a) => {
    for (const l in i) n[l] = i[l](a);
    return n;
  };
}
function T5(t, e) {
  var n;
  const i = [],
    a = { color: 0, var: 0, number: 0 };
  for (let l = 0; l < e.values.length; l++) {
    const s = e.types[l],
      r = t.indexes[s][a[s]],
      o = (n = t.values[r]) !== null && n !== void 0 ? n : 0;
    ((i[l] = o), a[s]++);
  }
  return i;
}
const A5 = (t, e) => {
  const n = Vn.createTransformer(e),
    i = Vl(t),
    a = Vl(e);
  return i.indexes.var.length === a.indexes.var.length &&
    i.indexes.color.length === a.indexes.color.length &&
    i.indexes.number.length >= a.indexes.number.length
    ? (Ac.has(t) && !a.values.length) || (Ac.has(e) && !i.values.length)
      ? b5(t, e)
      : Fl(G1(T5(i, a), a.values), n)
    : Ar(t, e);
};
function q1(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number"
    ? lt(t, e, n)
    : dd(t)(t, e);
}
const E5 = 5;
function k1(t, e, n) {
  const i = Math.max(e - E5, 0);
  return ky(n - t(i), e - i);
}
const ut = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: { granular: 0.01, default: 2 },
    restDelta: { granular: 0.005, default: 0.5 },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1,
  },
  Fo = 0.001;
function M5({
  duration: t = ut.duration,
  bounce: e = ut.bounce,
  velocity: n = ut.velocity,
  mass: i = ut.mass,
}) {
  let a,
    l,
    s = 1 - e;
  ((s = tn(ut.minDamping, ut.maxDamping, s)),
    (t = tn(ut.minDuration, ut.maxDuration, Fe(t))),
    s < 1
      ? ((a = (u) => {
          const c = u * s,
            d = c * t,
            f = c - n,
            h = Ec(u, s),
            y = Math.exp(-d);
          return Fo - (f / h) * y;
        }),
        (l = (u) => {
          const d = u * s * t,
            f = d * n + n,
            h = Math.pow(s, 2) * Math.pow(u, 2) * t,
            y = Math.exp(-d),
            b = Ec(Math.pow(u, 2), s);
          return ((-a(u) + Fo > 0 ? -1 : 1) * ((f - h) * y)) / b;
        }))
      : ((a = (u) => {
          const c = Math.exp(-u * t),
            d = (u - n) * t + 1;
          return -Fo + c * d;
        }),
        (l = (u) => {
          const c = Math.exp(-u * t),
            d = (n - u) * (t * t);
          return c * d;
        })));
  const r = 5 / t,
    o = w5(a, l, r);
  if (((t = Pe(t)), isNaN(o))) return { stiffness: ut.stiffness, damping: ut.damping, duration: t };
  {
    const u = Math.pow(o, 2) * i;
    return { stiffness: u, damping: s * 2 * Math.sqrt(i * u), duration: t };
  }
}
const D5 = 12;
function w5(t, e, n) {
  let i = n;
  for (let a = 1; a < D5; a++) i = i - t(i) / e(i);
  return i;
}
function Ec(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const C5 = ["duration", "bounce"],
  R5 = ["stiffness", "damping", "mass"];
function Am(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function O5(t) {
  let e = {
    velocity: ut.velocity,
    stiffness: ut.stiffness,
    damping: ut.damping,
    mass: ut.mass,
    isResolvedFromDuration: !1,
    ...t,
  };
  if (!Am(t, R5) && Am(t, C5))
    if (t.visualDuration) {
      const n = t.visualDuration,
        i = (2 * Math.PI) / (n * 1.2),
        a = i * i,
        l = 2 * tn(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(a);
      e = { ...e, mass: ut.mass, stiffness: a, damping: l };
    } else {
      const n = M5(t);
      ((e = { ...e, ...n, mass: ut.mass }), (e.isResolvedFromDuration = !0));
    }
  return e;
}
function X1(t = ut.visualDuration, e = ut.bounce) {
  const n = typeof t != "object" ? { visualDuration: t, keyframes: [0, 1], bounce: e } : t;
  let { restSpeed: i, restDelta: a } = n;
  const l = n.keyframes[0],
    s = n.keyframes[n.keyframes.length - 1],
    r = { done: !1, value: l },
    {
      stiffness: o,
      damping: u,
      mass: c,
      duration: d,
      velocity: f,
      isResolvedFromDuration: h,
    } = O5({ ...n, velocity: -Fe(n.velocity || 0) }),
    y = f || 0,
    b = u / (2 * Math.sqrt(o * c)),
    E = s - l,
    m = Fe(Math.sqrt(o / c)),
    p = Math.abs(E) < 5;
  (i || (i = p ? ut.restSpeed.granular : ut.restSpeed.default),
    a || (a = p ? ut.restDelta.granular : ut.restDelta.default));
  let g;
  if (b < 1) {
    const S = Ec(m, b);
    g = (T) => {
      const x = Math.exp(-b * m * T);
      return s - x * (((y + b * m * E) / S) * Math.sin(S * T) + E * Math.cos(S * T));
    };
  } else if (b === 1) g = (S) => s - Math.exp(-m * S) * (E + (y + m * E) * S);
  else {
    const S = m * Math.sqrt(b * b - 1);
    g = (T) => {
      const x = Math.exp(-b * m * T),
        M = Math.min(S * T, 300);
      return s - (x * ((y + b * m * E) * Math.sinh(M) + S * E * Math.cosh(M))) / S;
    };
  }
  const v = {
    calculatedDuration: (h && d) || null,
    next: (S) => {
      const T = g(S);
      if (h) r.done = S >= d;
      else {
        let x = 0;
        b < 1 && (x = S === 0 ? Pe(y) : k1(g, S, T));
        const M = Math.abs(x) <= i,
          B = Math.abs(s - T) <= a;
        r.done = M && B;
      }
      return ((r.value = r.done ? s : T), r);
    },
    toString: () => {
      const S = Math.min(Xy(v), dc),
        T = Ky((x) => v.next(S * x).value, S, 30);
      return S + "ms " + T;
    },
  };
  return v;
}
function Em({
  keyframes: t,
  velocity: e = 0,
  power: n = 0.8,
  timeConstant: i = 325,
  bounceDamping: a = 10,
  bounceStiffness: l = 500,
  modifyTarget: s,
  min: r,
  max: o,
  restDelta: u = 0.5,
  restSpeed: c,
}) {
  const d = t[0],
    f = { done: !1, value: d },
    h = (M) => (r !== void 0 && M < r) || (o !== void 0 && M > o),
    y = (M) => (r === void 0 ? o : o === void 0 || Math.abs(r - M) < Math.abs(o - M) ? r : o);
  let b = n * e;
  const E = d + b,
    m = s === void 0 ? E : s(E);
  m !== E && (b = m - d);
  const p = (M) => -b * Math.exp(-M / i),
    g = (M) => m + p(M),
    v = (M) => {
      const B = p(M),
        z = g(M);
      ((f.done = Math.abs(B) <= u), (f.value = f.done ? m : z));
    };
  let S, T;
  const x = (M) => {
    !h(f.value) ||
      ((S = M),
      (T = X1({
        keyframes: [f.value, y(f.value)],
        velocity: k1(g, M, f.value),
        damping: a,
        stiffness: l,
        restDelta: u,
        restSpeed: c,
      })));
  };
  return (
    x(0),
    {
      calculatedDuration: null,
      next: (M) => {
        let B = !1;
        return (
          !T && S === void 0 && ((B = !0), v(M), x(M)),
          S !== void 0 && M >= S ? T.next(M - S) : (!B && v(M), f)
        );
      },
    }
  );
}
const z5 = Pl(0.42, 0, 1, 1),
  V5 = Pl(0, 0, 0.58, 1),
  K1 = Pl(0.42, 0, 0.58, 1),
  _5 = (t) => Array.isArray(t) && typeof t[0] != "number",
  B5 = {
    linear: $t,
    easeIn: z5,
    easeInOut: K1,
    easeOut: V5,
    circIn: od,
    circInOut: E1,
    circOut: A1,
    backIn: rd,
    backInOut: x1,
    backOut: S1,
    anticipate: T1,
  },
  Mm = (t) => {
    if (Kf(t)) {
      Gy(t.length === 4);
      const [e, n, i, a] = t;
      return Pl(e, n, i, a);
    } else if (typeof t == "string") return B5[t];
    return t;
  };
function U5(t, e, n) {
  const i = [],
    a = n || q1,
    l = t.length - 1;
  for (let s = 0; s < l; s++) {
    let r = a(t[s], t[s + 1]);
    if (e) {
      const o = Array.isArray(e) ? e[s] || $t : e;
      r = Fl(o, r);
    }
    i.push(r);
  }
  return i;
}
function N5(t, e, { clamp: n = !0, ease: i, mixer: a } = {}) {
  const l = t.length;
  if ((Gy(l === e.length), l === 1)) return () => e[0];
  if (l === 2 && e[0] === e[1]) return () => e[1];
  const s = t[0] === t[1];
  t[0] > t[l - 1] && ((t = [...t].reverse()), (e = [...e].reverse()));
  const r = U5(e, i, a),
    o = r.length,
    u = (c) => {
      if (s && c < t[0]) return e[0];
      let d = 0;
      if (o > 1) for (; d < t.length - 2 && !(c < t[d + 1]); d++);
      const f = ua(t[d], t[d + 1], c);
      return r[d](f);
    };
  return n ? (c) => u(tn(t[0], t[l - 1], c)) : u;
}
function j5(t, e) {
  const n = t[t.length - 1];
  for (let i = 1; i <= e; i++) {
    const a = ua(0, e, i);
    t.push(lt(n, 1, a));
  }
}
function H5(t) {
  const e = [0];
  return (j5(e, t.length - 1), e);
}
function L5(t, e) {
  return t.map((n) => n * e);
}
function Y5(t, e) {
  return t.map(() => e || K1).splice(0, t.length - 1);
}
function Er({ duration: t = 300, keyframes: e, times: n, ease: i = "easeInOut" }) {
  const a = _5(i) ? i.map(Mm) : Mm(i),
    l = { done: !1, value: e[0] },
    s = L5(n && n.length === e.length ? n : H5(e), t),
    r = N5(s, e, { ease: Array.isArray(a) ? a : Y5(e, a) });
  return { calculatedDuration: t, next: (o) => ((l.value = r(o)), (l.done = o >= t), l) };
}
const G5 = (t) => {
    const e = ({ timestamp: n }) => t(n);
    return {
      start: () => W.update(e, !0),
      stop: () => zn(e),
      now: () => (Mt.isProcessing ? Mt.timestamp : we.now()),
    };
  },
  q5 = { decay: Em, inertia: Em, tween: Er, keyframes: Er, spring: X1 },
  k5 = (t) => t / 100;
class hd extends Y1 {
  constructor(e) {
    (super(e),
      (this.holdTime = null),
      (this.cancelTime = null),
      (this.currentTime = 0),
      (this.playbackSpeed = 1),
      (this.pendingPlayState = "running"),
      (this.startTime = null),
      (this.state = "idle"),
      (this.stop = () => {
        if ((this.resolver.cancel(), (this.isStopped = !0), this.state === "idle")) return;
        this.teardown();
        const { onStop: o } = this.options;
        o && o();
      }));
    const { name: n, motionValue: i, element: a, keyframes: l } = this.options,
      s = (a == null ? void 0 : a.KeyframeResolver) || fd,
      r = (o, u) => this.onKeyframesResolved(o, u);
    ((this.resolver = new s(l, r, n, i, a)), this.resolver.scheduleResolve());
  }
  flatten() {
    (super.flatten(),
      this._resolved && Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes)));
  }
  initPlayback(e) {
    const {
        type: n = "keyframes",
        repeat: i = 0,
        repeatDelay: a = 0,
        repeatType: l,
        velocity: s = 0,
      } = this.options,
      r = Xf(n) ? n : q5[n] || Er;
    let o, u;
    r !== Er && typeof e[0] != "number" && ((o = Fl(k5, q1(e[0], e[1]))), (e = [0, 100]));
    const c = r({ ...this.options, keyframes: e });
    (l === "mirror" && (u = r({ ...this.options, keyframes: [...e].reverse(), velocity: -s })),
      c.calculatedDuration === null && (c.calculatedDuration = Xy(c)));
    const { calculatedDuration: d } = c,
      f = d + a,
      h = f * (i + 1) - a;
    return {
      generator: c,
      mirroredGenerator: u,
      mapPercentToKeyframes: o,
      calculatedDuration: d,
      resolvedDuration: f,
      totalDuration: h,
    };
  }
  onPostResolved() {
    const { autoplay: e = !0 } = this.options;
    (this.play(),
      this.pendingPlayState === "paused" || !e
        ? this.pause()
        : (this.state = this.pendingPlayState));
  }
  tick(e, n = !1) {
    const { resolved: i } = this;
    if (!i) {
      const { keyframes: M } = this.options;
      return { done: !0, value: M[M.length - 1] };
    }
    const {
      finalKeyframe: a,
      generator: l,
      mirroredGenerator: s,
      mapPercentToKeyframes: r,
      keyframes: o,
      calculatedDuration: u,
      totalDuration: c,
      resolvedDuration: d,
    } = i;
    if (this.startTime === null) return l.next(0);
    const { delay: f, repeat: h, repeatType: y, repeatDelay: b, onUpdate: E } = this.options;
    (this.speed > 0
      ? (this.startTime = Math.min(this.startTime, e))
      : this.speed < 0 && (this.startTime = Math.min(e - c / this.speed, this.startTime)),
      n
        ? (this.currentTime = e)
        : this.holdTime !== null
          ? (this.currentTime = this.holdTime)
          : (this.currentTime = Math.round(e - this.startTime) * this.speed));
    const m = this.currentTime - f * (this.speed >= 0 ? 1 : -1),
      p = this.speed >= 0 ? m < 0 : m > c;
    ((this.currentTime = Math.max(m, 0)),
      this.state === "finished" && this.holdTime === null && (this.currentTime = c));
    let g = this.currentTime,
      v = l;
    if (h) {
      const M = Math.min(this.currentTime, c) / d;
      let B = Math.floor(M),
        z = M % 1;
      (!z && M >= 1 && (z = 1),
        z === 1 && B--,
        (B = Math.min(B, h + 1)),
        Boolean(B % 2) &&
          (y === "reverse" ? ((z = 1 - z), b && (z -= b / d)) : y === "mirror" && (v = s)),
        (g = tn(0, 1, z) * d));
    }
    const S = p ? { done: !1, value: o[0] } : v.next(g);
    r && (S.value = r(S.value));
    let { done: T } = S;
    !p && u !== null && (T = this.speed >= 0 ? this.currentTime >= c : this.currentTime <= 0);
    const x =
      this.holdTime === null && (this.state === "finished" || (this.state === "running" && T));
    return (
      x && a !== void 0 && (S.value = no(o, this.options, a)),
      E && E(S.value),
      x && this.finish(),
      S
    );
  }
  get duration() {
    const { resolved: e } = this;
    return e ? Fe(e.calculatedDuration) : 0;
  }
  get time() {
    return Fe(this.currentTime);
  }
  set time(e) {
    ((e = Pe(e)),
      (this.currentTime = e),
      this.holdTime !== null || this.speed === 0
        ? (this.holdTime = e)
        : this.driver && (this.startTime = this.driver.now() - e / this.speed));
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    const n = this.playbackSpeed !== e;
    ((this.playbackSpeed = e), n && (this.time = Fe(this.currentTime)));
  }
  play() {
    if ((this.resolver.isScheduled || this.resolver.resume(), !this._resolved)) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped) return;
    const { driver: e = G5, onPlay: n, startTime: i } = this.options;
    (this.driver || (this.driver = e((l) => this.tick(l))), n && n());
    const a = this.driver.now();
    (this.holdTime !== null
      ? (this.startTime = a - this.holdTime)
      : this.startTime
        ? this.state === "finished" && (this.startTime = a)
        : (this.startTime = i != null ? i : this.calcStartTime()),
      this.state === "finished" && this.updateFinishedPromise(),
      (this.cancelTime = this.startTime),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start());
  }
  pause() {
    var e;
    if (!this._resolved) {
      this.pendingPlayState = "paused";
      return;
    }
    ((this.state = "paused"),
      (this.holdTime = (e = this.currentTime) !== null && e !== void 0 ? e : 0));
  }
  complete() {
    (this.state !== "running" && this.play(),
      (this.pendingPlayState = this.state = "finished"),
      (this.holdTime = null));
  }
  finish() {
    (this.teardown(), (this.state = "finished"));
    const { onComplete: e } = this.options;
    e && e();
  }
  cancel() {
    (this.cancelTime !== null && this.tick(this.cancelTime),
      this.teardown(),
      this.updateFinishedPromise());
  }
  teardown() {
    ((this.state = "idle"),
      this.stopDriver(),
      this.resolveFinishedPromise(),
      this.updateFinishedPromise(),
      (this.startTime = this.cancelTime = null),
      this.resolver.cancel());
  }
  stopDriver() {
    !this.driver || (this.driver.stop(), (this.driver = void 0));
  }
  sample(e) {
    return ((this.startTime = 0), this.tick(e, !0));
  }
}
const X5 = new Set(["opacity", "clipPath", "filter", "transform"]);
function K5(
  t,
  e,
  n,
  {
    delay: i = 0,
    duration: a = 300,
    repeat: l = 0,
    repeatType: s = "loop",
    ease: r = "easeInOut",
    times: o,
  } = {},
) {
  const u = { [e]: n };
  o && (u.offset = o);
  const c = Qy(r, a);
  return (
    Array.isArray(c) && (u.easing = c),
    t.animate(u, {
      delay: i,
      duration: a,
      easing: Array.isArray(c) ? "linear" : c,
      fill: "both",
      iterations: l + 1,
      direction: s === "reverse" ? "alternate" : "normal",
    })
  );
}
const Z5 = Gf(() => Object.hasOwnProperty.call(Element.prototype, "animate")),
  Mr = 10,
  Q5 = 2e4;
function P5(t) {
  return Xf(t.type) || t.type === "spring" || !Zy(t.ease);
}
function F5(t, e) {
  const n = new hd({ ...e, keyframes: t, repeat: 0, delay: 0, isGenerator: !0 });
  let i = { done: !1, value: t[0] };
  const a = [];
  let l = 0;
  for (; !i.done && l < Q5; ) ((i = n.sample(l)), a.push(i.value), (l += Mr));
  return { times: void 0, keyframes: a, duration: l - Mr, ease: "linear" };
}
const Z1 = { anticipate: T1, backInOut: x1, circInOut: E1 };
function $5(t) {
  return t in Z1;
}
class Dm extends Y1 {
  constructor(e) {
    super(e);
    const { name: n, motionValue: i, element: a, keyframes: l } = this.options;
    ((this.resolver = new L1(l, (s, r) => this.onKeyframesResolved(s, r), n, i, a)),
      this.resolver.scheduleResolve());
  }
  initPlayback(e, n) {
    let {
      duration: i = 300,
      times: a,
      ease: l,
      type: s,
      motionValue: r,
      name: o,
      startTime: u,
    } = this.options;
    if (!r.owner || !r.owner.current) return !1;
    if ((typeof l == "string" && xr() && $5(l) && (l = Z1[l]), P5(this.options))) {
      const { onComplete: d, onUpdate: f, motionValue: h, element: y, ...b } = this.options,
        E = F5(e, b);
      ((e = E.keyframes),
        e.length === 1 && (e[1] = e[0]),
        (i = E.duration),
        (a = E.times),
        (l = E.ease),
        (s = "keyframes"));
    }
    const c = K5(r.owner.current, o, e, { ...this.options, duration: i, times: a, ease: l });
    return (
      (c.startTime = u != null ? u : this.calcStartTime()),
      this.pendingTimeline
        ? (Ih(c, this.pendingTimeline), (this.pendingTimeline = void 0))
        : (c.onfinish = () => {
            const { onComplete: d } = this.options;
            (r.set(no(e, this.options, n)), d && d(), this.cancel(), this.resolveFinishedPromise());
          }),
      { animation: c, duration: i, times: a, type: s, ease: l, keyframes: e }
    );
  }
  get duration() {
    const { resolved: e } = this;
    if (!e) return 0;
    const { duration: n } = e;
    return Fe(n);
  }
  get time() {
    const { resolved: e } = this;
    if (!e) return 0;
    const { animation: n } = e;
    return Fe(n.currentTime || 0);
  }
  set time(e) {
    const { resolved: n } = this;
    if (!n) return;
    const { animation: i } = n;
    i.currentTime = Pe(e);
  }
  get speed() {
    const { resolved: e } = this;
    if (!e) return 1;
    const { animation: n } = e;
    return n.playbackRate;
  }
  set speed(e) {
    const { resolved: n } = this;
    if (!n) return;
    const { animation: i } = n;
    i.playbackRate = e;
  }
  get state() {
    const { resolved: e } = this;
    if (!e) return "idle";
    const { animation: n } = e;
    return n.playState;
  }
  get startTime() {
    const { resolved: e } = this;
    if (!e) return null;
    const { animation: n } = e;
    return n.startTime;
  }
  attachTimeline(e) {
    if (!this._resolved) this.pendingTimeline = e;
    else {
      const { resolved: n } = this;
      if (!n) return $t;
      const { animation: i } = n;
      Ih(i, e);
    }
    return $t;
  }
  play() {
    if (this.isStopped) return;
    const { resolved: e } = this;
    if (!e) return;
    const { animation: n } = e;
    (n.playState === "finished" && this.updateFinishedPromise(), n.play());
  }
  pause() {
    const { resolved: e } = this;
    if (!e) return;
    const { animation: n } = e;
    n.pause();
  }
  stop() {
    if ((this.resolver.cancel(), (this.isStopped = !0), this.state === "idle")) return;
    (this.resolveFinishedPromise(), this.updateFinishedPromise());
    const { resolved: e } = this;
    if (!e) return;
    const { animation: n, keyframes: i, duration: a, type: l, ease: s, times: r } = e;
    if (n.playState === "idle" || n.playState === "finished") return;
    if (this.time) {
      const { motionValue: u, onUpdate: c, onComplete: d, element: f, ...h } = this.options,
        y = new hd({
          ...h,
          keyframes: i,
          duration: a,
          type: l,
          ease: s,
          times: r,
          isGenerator: !0,
        }),
        b = Pe(this.time);
      u.setWithVelocity(y.sample(b - Mr).value, y.sample(b).value, Mr);
    }
    const { onStop: o } = this.options;
    (o && o(), this.cancel());
  }
  complete() {
    const { resolved: e } = this;
    !e || e.animation.finish();
  }
  cancel() {
    const { resolved: e } = this;
    !e || e.animation.cancel();
  }
  static supports(e) {
    const { motionValue: n, name: i, repeatDelay: a, repeatType: l, damping: s, type: r } = e;
    if (!n || !n.owner || !(n.owner.current instanceof HTMLElement)) return !1;
    const { onUpdate: o, transformTemplate: u } = n.owner.getProps();
    return Z5() && i && X5.has(i) && !o && !u && !a && l !== "mirror" && s !== 0 && r !== "inertia";
  }
}
const J5 = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
  W5 = (t) => ({
    type: "spring",
    stiffness: 550,
    damping: t === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  I5 = { type: "keyframes", duration: 0.8 },
  tA = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  eA = (t, { keyframes: e }) =>
    e.length > 2 ? I5 : mi.has(t) ? (t.startsWith("scale") ? W5(e[1]) : J5) : tA;
function nA({
  when: t,
  delay: e,
  delayChildren: n,
  staggerChildren: i,
  staggerDirection: a,
  repeat: l,
  repeatType: s,
  repeatDelay: r,
  from: o,
  elapsed: u,
  ...c
}) {
  return !!Object.keys(c).length;
}
const md =
  (t, e, n, i = {}, a, l) =>
  (s) => {
    const r = kf(i, t) || {},
      o = r.delay || i.delay || 0;
    let { elapsed: u = 0 } = i;
    u = u - Pe(o);
    let c = {
      keyframes: Array.isArray(n) ? n : [null, n],
      ease: "easeOut",
      velocity: e.getVelocity(),
      ...r,
      delay: -u,
      onUpdate: (f) => {
        (e.set(f), r.onUpdate && r.onUpdate(f));
      },
      onComplete: () => {
        (s(), r.onComplete && r.onComplete());
      },
      name: t,
      motionValue: e,
      element: l ? void 0 : a,
    };
    (nA(r) || (c = { ...c, ...eA(t, c) }),
      c.duration && (c.duration = Pe(c.duration)),
      c.repeatDelay && (c.repeatDelay = Pe(c.repeatDelay)),
      c.from !== void 0 && (c.keyframes[0] = c.from));
    let d = !1;
    if (
      ((c.type === !1 || (c.duration === 0 && !c.repeatDelay)) &&
        ((c.duration = 0), c.delay === 0 && (d = !0)),
      (VT.current || qy.skipAnimations) && ((d = !0), (c.duration = 0), (c.delay = 0)),
      (c.allowFlatten = !r.type && !r.ease),
      d && !l && e.get() !== void 0)
    ) {
      const f = no(c.keyframes, r);
      if (f !== void 0)
        return (
          W.update(() => {
            (c.onUpdate(f), c.onComplete());
          }),
          new Ex([])
        );
    }
    return !l && Dm.supports(c) ? new Dm(c) : new hd(c);
  };
function iA({ protectedKeys: t, needsAnimating: e }, n) {
  const i = t.hasOwnProperty(n) && e[n] !== !0;
  return ((e[n] = !1), i);
}
function Q1(t, e, { delay: n = 0, transitionOverride: i, type: a } = {}) {
  var l;
  let { transition: s = t.getDefaultTransition(), transitionEnd: r, ...o } = e;
  i && (s = i);
  const u = [],
    c = a && t.animationState && t.animationState.getState()[a];
  for (const d in o) {
    const f = t.getValue(d, (l = t.latestValues[d]) !== null && l !== void 0 ? l : null),
      h = o[d];
    if (h === void 0 || (c && iA(c, d))) continue;
    const y = { delay: n, ...kf(s || {}, d) };
    let b = !1;
    if (window.MotionHandoffAnimation) {
      const m = g1(t);
      if (m) {
        const p = window.MotionHandoffAnimation(m, d, W);
        p !== null && ((y.startTime = p), (b = !0));
      }
    }
    (pc(t, d), f.start(md(d, f, h, t.shouldReduceMotion && p1.has(d) ? { type: !1 } : y, t, b)));
    const E = f.animation;
    E && u.push(E);
  }
  return (
    r &&
      Promise.all(u).then(() => {
        W.update(() => {
          r && OT(t, r);
        });
      }),
    u
  );
}
function Mc(t, e, n = {}) {
  var i;
  const a = zl(
    t,
    e,
    n.type === "exit"
      ? (i = t.presenceContext) === null || i === void 0
        ? void 0
        : i.custom
      : void 0,
  );
  let { transition: l = t.getDefaultTransition() || {} } = a || {};
  n.transitionOverride && (l = n.transitionOverride);
  const s = a ? () => Promise.all(Q1(t, a, n)) : () => Promise.resolve(),
    r =
      t.variantChildren && t.variantChildren.size
        ? (u = 0) => {
            const { delayChildren: c = 0, staggerChildren: d, staggerDirection: f } = l;
            return aA(t, e, c + u, d, f, n);
          }
        : () => Promise.resolve(),
    { when: o } = l;
  if (o) {
    const [u, c] = o === "beforeChildren" ? [s, r] : [r, s];
    return u().then(() => c());
  } else return Promise.all([s(), r(n.delay)]);
}
function aA(t, e, n = 0, i = 0, a = 1, l) {
  const s = [],
    r = (t.variantChildren.size - 1) * i,
    o = a === 1 ? (u = 0) => u * i : (u = 0) => r - u * i;
  return (
    Array.from(t.variantChildren)
      .sort(lA)
      .forEach((u, c) => {
        (u.notify("AnimationStart", e),
          s.push(Mc(u, e, { ...l, delay: n + o(c) }).then(() => u.notify("AnimationComplete", e))));
      }),
    Promise.all(s)
  );
}
function lA(t, e) {
  return t.sortNodePosition(e);
}
function sA(t, e, n = {}) {
  t.notify("AnimationStart", e);
  let i;
  if (Array.isArray(e)) {
    const a = e.map((l) => Mc(t, l, n));
    i = Promise.all(a);
  } else if (typeof e == "string") i = Mc(t, e, n);
  else {
    const a = typeof e == "function" ? zl(t, e, n.custom) : e;
    i = Promise.all(Q1(t, a, n));
  }
  return i.then(() => {
    t.notify("AnimationComplete", e);
  });
}
function P1(t, e) {
  if (!Array.isArray(e)) return !1;
  const n = e.length;
  if (n !== t.length) return !1;
  for (let i = 0; i < n; i++) if (e[i] !== t[i]) return !1;
  return !0;
}
const rA = Ff.length;
function F1(t) {
  if (!t) return;
  if (!t.isControllingVariants) {
    const n = t.parent ? F1(t.parent) || {} : {};
    return (t.props.initial !== void 0 && (n.initial = t.props.initial), n);
  }
  const e = {};
  for (let n = 0; n < rA; n++) {
    const i = Ff[n],
      a = t.props[i];
    (Cl(a) || a === !1) && (e[i] = a);
  }
  return e;
}
const oA = [...Pf].reverse(),
  uA = Pf.length;
function cA(t) {
  return (e) => Promise.all(e.map(({ animation: n, options: i }) => sA(t, n, i)));
}
function fA(t) {
  let e = cA(t),
    n = wm(),
    i = !0;
  const a = (o) => (u, c) => {
    var d;
    const f = zl(
      t,
      c,
      o === "exit"
        ? (d = t.presenceContext) === null || d === void 0
          ? void 0
          : d.custom
        : void 0,
    );
    if (f) {
      const { transition: h, transitionEnd: y, ...b } = f;
      u = { ...u, ...b, ...y };
    }
    return u;
  };
  function l(o) {
    e = o(t);
  }
  function s(o) {
    const { props: u } = t,
      c = F1(t.parent) || {},
      d = [],
      f = new Set();
    let h = {},
      y = 1 / 0;
    for (let E = 0; E < uA; E++) {
      const m = oA[E],
        p = n[m],
        g = u[m] !== void 0 ? u[m] : c[m],
        v = Cl(g),
        S = m === o ? p.isActive : null;
      S === !1 && (y = E);
      let T = g === c[m] && g !== u[m] && v;
      if (
        (T && i && t.manuallyAnimateOnMount && (T = !1),
        (p.protectedKeys = { ...h }),
        (!p.isActive && S === null) || (!g && !p.prevProp) || to(g) || typeof g == "boolean")
      )
        continue;
      const x = dA(p.prevProp, g);
      let M = x || (m === o && p.isActive && !T && v) || (E > y && v),
        B = !1;
      const z = Array.isArray(g) ? g : [g];
      let it = z.reduce(a(m), {});
      S === !1 && (it = {});
      const { prevResolvedValues: Ve = {} } = p,
        Aa = { ...Ve, ...it },
        nn = (R) => {
          ((M = !0), f.has(R) && ((B = !0), f.delete(R)), (p.needsAnimating[R] = !0));
          const V = t.getValue(R);
          V && (V.liveStyle = !1);
        };
      for (const R in Aa) {
        const V = it[R],
          G = Ve[R];
        if (h.hasOwnProperty(R)) continue;
        let P = !1;
        (mc(V) && mc(G) ? (P = !P1(V, G)) : (P = V !== G),
          P
            ? V != null
              ? nn(R)
              : f.add(R)
            : V !== void 0 && f.has(R)
              ? nn(R)
              : (p.protectedKeys[R] = !0));
      }
      ((p.prevProp = g),
        (p.prevResolvedValues = it),
        p.isActive && (h = { ...h, ...it }),
        i && t.blockInitialAnimation && (M = !1),
        M && (!(T && x) || B) && d.push(...z.map((R) => ({ animation: R, options: { type: m } }))));
    }
    if (f.size) {
      const E = {};
      if (typeof u.initial != "boolean") {
        const m = zl(t, Array.isArray(u.initial) ? u.initial[0] : u.initial);
        m && m.transition && (E.transition = m.transition);
      }
      (f.forEach((m) => {
        const p = t.getBaseTarget(m),
          g = t.getValue(m);
        (g && (g.liveStyle = !0), (E[m] = p != null ? p : null));
      }),
        d.push({ animation: E }));
    }
    let b = Boolean(d.length);
    return (
      i && (u.initial === !1 || u.initial === u.animate) && !t.manuallyAnimateOnMount && (b = !1),
      (i = !1),
      b ? e(d) : Promise.resolve()
    );
  }
  function r(o, u) {
    var c;
    if (n[o].isActive === u) return Promise.resolve();
    ((c = t.variantChildren) === null ||
      c === void 0 ||
      c.forEach((f) => {
        var h;
        return (h = f.animationState) === null || h === void 0 ? void 0 : h.setActive(o, u);
      }),
      (n[o].isActive = u));
    const d = s(o);
    for (const f in n) n[f].protectedKeys = {};
    return d;
  }
  return {
    animateChanges: s,
    setActive: r,
    setAnimateFunction: l,
    getState: () => n,
    reset: () => {
      ((n = wm()), (i = !0));
    },
  };
}
function dA(t, e) {
  return typeof e == "string" ? e !== t : Array.isArray(e) ? !P1(e, t) : !1;
}
function Hn(t = !1) {
  return { isActive: t, protectedKeys: {}, needsAnimating: {}, prevResolvedValues: {} };
}
function wm() {
  return {
    animate: Hn(!0),
    whileInView: Hn(),
    whileHover: Hn(),
    whileTap: Hn(),
    whileDrag: Hn(),
    whileFocus: Hn(),
    exit: Hn(),
  };
}
class Un {
  constructor(e) {
    ((this.isMounted = !1), (this.node = e));
  }
  update() {}
}
class hA extends Un {
  constructor(e) {
    (super(e), e.animationState || (e.animationState = fA(e)));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    to(e) && (this.unmountControls = e.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: e } = this.node.getProps(),
      { animate: n } = this.node.prevProps || {};
    e !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var e;
    (this.node.animationState.reset(),
      (e = this.unmountControls) === null || e === void 0 || e.call(this));
  }
}
let mA = 0;
class pA extends Un {
  constructor() {
    (super(...arguments), (this.id = mA++));
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: e, onExitComplete: n } = this.node.presenceContext,
      { isPresent: i } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || e === i) return;
    const a = this.node.animationState.setActive("exit", !e);
    n &&
      !e &&
      a.then(() => {
        n(this.id);
      });
  }
  mount() {
    const { register: e, onExitComplete: n } = this.node.presenceContext || {};
    (n && n(this.id), e && (this.unmount = e(this.id)));
  }
  unmount() {}
}
const gA = { animation: { Feature: hA }, exit: { Feature: pA } };
function _l(t, e, n, i = { passive: !0 }) {
  return (t.addEventListener(e, n, i), () => t.removeEventListener(e, n));
}
function $l(t) {
  return { point: { x: t.pageX, y: t.pageY } };
}
const yA = (t) => (e) => Qf(e) && t(e, $l(e));
function ol(t, e, n, i) {
  return _l(t, e, yA(n), i);
}
function $1({ top: t, left: e, right: n, bottom: i }) {
  return { x: { min: e, max: n }, y: { min: t, max: i } };
}
function vA({ x: t, y: e }) {
  return { top: e.min, right: t.max, bottom: e.max, left: t.min };
}
function bA(t, e) {
  if (!e) return t;
  const n = e({ x: t.left, y: t.top }),
    i = e({ x: t.right, y: t.bottom });
  return { top: n.y, left: n.x, bottom: i.y, right: i.x };
}
const J1 = 1e-4,
  SA = 1 - J1,
  xA = 1 + J1,
  W1 = 0.01,
  TA = 0 - W1,
  AA = 0 + W1;
function Nt(t) {
  return t.max - t.min;
}
function EA(t, e, n) {
  return Math.abs(t - e) <= n;
}
function Cm(t, e, n, i = 0.5) {
  ((t.origin = i),
    (t.originPoint = lt(e.min, e.max, t.origin)),
    (t.scale = Nt(n) / Nt(e)),
    (t.translate = lt(n.min, n.max, t.origin) - t.originPoint),
    ((t.scale >= SA && t.scale <= xA) || isNaN(t.scale)) && (t.scale = 1),
    ((t.translate >= TA && t.translate <= AA) || isNaN(t.translate)) && (t.translate = 0));
}
function ul(t, e, n, i) {
  (Cm(t.x, e.x, n.x, i ? i.originX : void 0), Cm(t.y, e.y, n.y, i ? i.originY : void 0));
}
function Rm(t, e, n) {
  ((t.min = n.min + e.min), (t.max = t.min + Nt(e)));
}
function MA(t, e, n) {
  (Rm(t.x, e.x, n.x), Rm(t.y, e.y, n.y));
}
function Om(t, e, n) {
  ((t.min = e.min - n.min), (t.max = t.min + Nt(e)));
}
function cl(t, e, n) {
  (Om(t.x, e.x, n.x), Om(t.y, e.y, n.y));
}
const zm = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  Hi = () => ({ x: zm(), y: zm() }),
  Vm = () => ({ min: 0, max: 0 }),
  ft = () => ({ x: Vm(), y: Vm() });
function ee(t) {
  return [t("x"), t("y")];
}
function $o(t) {
  return t === void 0 || t === 1;
}
function Dc({ scale: t, scaleX: e, scaleY: n }) {
  return !$o(t) || !$o(e) || !$o(n);
}
function Gn(t) {
  return Dc(t) || I1(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
}
function I1(t) {
  return _m(t.x) || _m(t.y);
}
function _m(t) {
  return t && t !== "0%";
}
function Dr(t, e, n) {
  const i = t - n,
    a = e * i;
  return n + a;
}
function Bm(t, e, n, i, a) {
  return (a !== void 0 && (t = Dr(t, a, i)), Dr(t, n, i) + e);
}
function wc(t, e = 0, n = 1, i, a) {
  ((t.min = Bm(t.min, e, n, i, a)), (t.max = Bm(t.max, e, n, i, a)));
}
function tv(t, { x: e, y: n }) {
  (wc(t.x, e.translate, e.scale, e.originPoint), wc(t.y, n.translate, n.scale, n.originPoint));
}
const Um = 0.999999999999,
  Nm = 1.0000000000001;
function DA(t, e, n, i = !1) {
  const a = n.length;
  if (!a) return;
  e.x = e.y = 1;
  let l, s;
  for (let r = 0; r < a; r++) {
    ((l = n[r]), (s = l.projectionDelta));
    const { visualElement: o } = l.options;
    (o && o.props.style && o.props.style.display === "contents") ||
      (i &&
        l.options.layoutScroll &&
        l.scroll &&
        l !== l.root &&
        Yi(t, { x: -l.scroll.offset.x, y: -l.scroll.offset.y }),
      s && ((e.x *= s.x.scale), (e.y *= s.y.scale), tv(t, s)),
      i && Gn(l.latestValues) && Yi(t, l.latestValues));
  }
  (e.x < Nm && e.x > Um && (e.x = 1), e.y < Nm && e.y > Um && (e.y = 1));
}
function Li(t, e) {
  ((t.min = t.min + e), (t.max = t.max + e));
}
function jm(t, e, n, i, a = 0.5) {
  const l = lt(t.min, t.max, a);
  wc(t, e, n, l, i);
}
function Yi(t, e) {
  (jm(t.x, e.x, e.scaleX, e.scale, e.originX), jm(t.y, e.y, e.scaleY, e.scale, e.originY));
}
function ev(t, e) {
  return $1(bA(t.getBoundingClientRect(), e));
}
function wA(t, e, n) {
  const i = ev(t, n),
    { scroll: a } = e;
  return (a && (Li(i.x, a.offset.x), Li(i.y, a.offset.y)), i);
}
const nv = ({ current: t }) => (t ? t.ownerDocument.defaultView : null),
  Hm = (t, e) => Math.abs(t - e);
function CA(t, e) {
  const n = Hm(t.x, e.x),
    i = Hm(t.y, e.y);
  return Math.sqrt(n ** 2 + i ** 2);
}
class iv {
  constructor(e, n, { transformPagePoint: i, contextWindow: a, dragSnapToOrigin: l = !1 } = {}) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const d = Wo(this.lastMoveEventInfo, this.history),
          f = this.startEvent !== null,
          h = CA(d.offset, { x: 0, y: 0 }) >= 3;
        if (!f && !h) return;
        const { point: y } = d,
          { timestamp: b } = Mt;
        this.history.push({ ...y, timestamp: b });
        const { onStart: E, onMove: m } = this.handlers;
        (f || (E && E(this.lastMoveEvent, d), (this.startEvent = this.lastMoveEvent)),
          m && m(this.lastMoveEvent, d));
      }),
      (this.handlePointerMove = (d, f) => {
        ((this.lastMoveEvent = d),
          (this.lastMoveEventInfo = Jo(f, this.transformPagePoint)),
          W.update(this.updatePoint, !0));
      }),
      (this.handlePointerUp = (d, f) => {
        this.end();
        const { onEnd: h, onSessionEnd: y, resumeAnimation: b } = this.handlers;
        if ((this.dragSnapToOrigin && b && b(), !(this.lastMoveEvent && this.lastMoveEventInfo)))
          return;
        const E = Wo(
          d.type === "pointercancel" ? this.lastMoveEventInfo : Jo(f, this.transformPagePoint),
          this.history,
        );
        (this.startEvent && h && h(d, E), y && y(d, E));
      }),
      !Qf(e))
    )
      return;
    ((this.dragSnapToOrigin = l),
      (this.handlers = n),
      (this.transformPagePoint = i),
      (this.contextWindow = a || window));
    const s = $l(e),
      r = Jo(s, this.transformPagePoint),
      { point: o } = r,
      { timestamp: u } = Mt;
    this.history = [{ ...o, timestamp: u }];
    const { onSessionStart: c } = n;
    (c && c(e, Wo(r, this.history)),
      (this.removeListeners = Fl(
        ol(this.contextWindow, "pointermove", this.handlePointerMove),
        ol(this.contextWindow, "pointerup", this.handlePointerUp),
        ol(this.contextWindow, "pointercancel", this.handlePointerUp),
      )));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    (this.removeListeners && this.removeListeners(), zn(this.updatePoint));
  }
}
function Jo(t, e) {
  return e ? { point: e(t.point) } : t;
}
function Lm(t, e) {
  return { x: t.x - e.x, y: t.y - e.y };
}
function Wo({ point: t }, e) {
  return { point: t, delta: Lm(t, av(e)), offset: Lm(t, RA(e)), velocity: OA(e, 0.1) };
}
function RA(t) {
  return t[0];
}
function av(t) {
  return t[t.length - 1];
}
function OA(t, e) {
  if (t.length < 2) return { x: 0, y: 0 };
  let n = t.length - 1,
    i = null;
  const a = av(t);
  for (; n >= 0 && ((i = t[n]), !(a.timestamp - i.timestamp > Pe(e))); ) n--;
  if (!i) return { x: 0, y: 0 };
  const l = Fe(a.timestamp - i.timestamp);
  if (l === 0) return { x: 0, y: 0 };
  const s = { x: (a.x - i.x) / l, y: (a.y - i.y) / l };
  return (s.x === 1 / 0 && (s.x = 0), s.y === 1 / 0 && (s.y = 0), s);
}
function zA(t, { min: e, max: n }, i) {
  return (
    e !== void 0 && t < e
      ? (t = i ? lt(e, t, i.min) : Math.max(t, e))
      : n !== void 0 && t > n && (t = i ? lt(n, t, i.max) : Math.min(t, n)),
    t
  );
}
function Ym(t, e, n) {
  return {
    min: e !== void 0 ? t.min + e : void 0,
    max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0,
  };
}
function VA(t, { top: e, left: n, bottom: i, right: a }) {
  return { x: Ym(t.x, n, a), y: Ym(t.y, e, i) };
}
function Gm(t, e) {
  let n = e.min - t.min,
    i = e.max - t.max;
  return (e.max - e.min < t.max - t.min && ([n, i] = [i, n]), { min: n, max: i });
}
function _A(t, e) {
  return { x: Gm(t.x, e.x), y: Gm(t.y, e.y) };
}
function BA(t, e) {
  let n = 0.5;
  const i = Nt(t),
    a = Nt(e);
  return (
    a > i ? (n = ua(e.min, e.max - i, t.min)) : i > a && (n = ua(t.min, t.max - a, e.min)),
    tn(0, 1, n)
  );
}
function UA(t, e) {
  const n = {};
  return (
    e.min !== void 0 && (n.min = e.min - t.min),
    e.max !== void 0 && (n.max = e.max - t.min),
    n
  );
}
const Cc = 0.35;
function NA(t = Cc) {
  return (
    t === !1 ? (t = 0) : t === !0 && (t = Cc),
    { x: qm(t, "left", "right"), y: qm(t, "top", "bottom") }
  );
}
function qm(t, e, n) {
  return { min: km(t, e), max: km(t, n) };
}
function km(t, e) {
  return typeof t == "number" ? t : t[e] || 0;
}
const jA = new WeakMap();
class HA {
  constructor(e) {
    ((this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = ft()),
      (this.visualElement = e));
  }
  start(e, { snapToCursor: n = !1 } = {}) {
    const { presenceContext: i } = this.visualElement;
    if (i && i.isPresent === !1) return;
    const a = (c) => {
        const { dragSnapToOrigin: d } = this.getProps();
        (d ? this.pauseAnimation() : this.stopAnimation(), n && this.snapToCursor($l(c).point));
      },
      l = (c, d) => {
        const { drag: f, dragPropagation: h, onDragStart: y } = this.getProps();
        if (
          f &&
          !h &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = Ox(f)),
          !this.openDragLock)
        )
          return;
        ((this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          ee((E) => {
            let m = this.getAxisMotionValue(E).get() || 0;
            if (Ce.test(m)) {
              const { projection: p } = this.visualElement;
              if (p && p.layout) {
                const g = p.layout.layoutBox[E];
                g && (m = Nt(g) * (parseFloat(m) / 100));
              }
            }
            this.originPoint[E] = m;
          }),
          y && W.postRender(() => y(c, d)),
          pc(this.visualElement, "transform"));
        const { animationState: b } = this.visualElement;
        b && b.setActive("whileDrag", !0);
      },
      s = (c, d) => {
        const {
          dragPropagation: f,
          dragDirectionLock: h,
          onDirectionLock: y,
          onDrag: b,
        } = this.getProps();
        if (!f && !this.openDragLock) return;
        const { offset: E } = d;
        if (h && this.currentDirection === null) {
          ((this.currentDirection = LA(E)),
            this.currentDirection !== null && y && y(this.currentDirection));
          return;
        }
        (this.updateAxis("x", d.point, E),
          this.updateAxis("y", d.point, E),
          this.visualElement.render(),
          b && b(c, d));
      },
      r = (c, d) => this.stop(c, d),
      o = () =>
        ee((c) => {
          var d;
          return (
            this.getAnimationState(c) === "paused" &&
            ((d = this.getAxisMotionValue(c).animation) === null || d === void 0
              ? void 0
              : d.play())
          );
        }),
      { dragSnapToOrigin: u } = this.getProps();
    this.panSession = new iv(
      e,
      { onSessionStart: a, onStart: l, onMove: s, onSessionEnd: r, resumeAnimation: o },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: u,
        contextWindow: nv(this.visualElement),
      },
    );
  }
  stop(e, n) {
    const i = this.isDragging;
    if ((this.cancel(), !i)) return;
    const { velocity: a } = n;
    this.startAnimation(a);
    const { onDragEnd: l } = this.getProps();
    l && W.postRender(() => l(e, n));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: e, animationState: n } = this.visualElement;
    (e && (e.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0));
    const { dragPropagation: i } = this.getProps();
    (!i && this.openDragLock && (this.openDragLock(), (this.openDragLock = null)),
      n && n.setActive("whileDrag", !1));
  }
  updateAxis(e, n, i) {
    const { drag: a } = this.getProps();
    if (!i || !Ss(e, a, this.currentDirection)) return;
    const l = this.getAxisMotionValue(e);
    let s = this.originPoint[e] + i[e];
    (this.constraints && this.constraints[e] && (s = zA(s, this.constraints[e], this.elastic[e])),
      l.set(s));
  }
  resolveConstraints() {
    var e;
    const { dragConstraints: n, dragElastic: i } = this.getProps(),
      a =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (e = this.visualElement.projection) === null || e === void 0
            ? void 0
            : e.layout,
      l = this.constraints;
    (n && Ni(n)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : n && a
        ? (this.constraints = VA(a.layoutBox, n))
        : (this.constraints = !1),
      (this.elastic = NA(i)),
      l !== this.constraints &&
        a &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        ee((s) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(s) &&
            (this.constraints[s] = UA(a.layoutBox[s], this.constraints[s]));
        }));
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: n } = this.getProps();
    if (!e || !Ni(e)) return !1;
    const i = e.current,
      { projection: a } = this.visualElement;
    if (!a || !a.layout) return !1;
    const l = wA(i, a.root, this.visualElement.getTransformPagePoint());
    let s = _A(a.layout.layoutBox, l);
    if (n) {
      const r = n(vA(s));
      ((this.hasMutatedConstraints = !!r), r && (s = $1(r)));
    }
    return s;
  }
  startAnimation(e) {
    const {
        drag: n,
        dragMomentum: i,
        dragElastic: a,
        dragTransition: l,
        dragSnapToOrigin: s,
        onDragTransitionEnd: r,
      } = this.getProps(),
      o = this.constraints || {},
      u = ee((c) => {
        if (!Ss(c, n, this.currentDirection)) return;
        let d = (o && o[c]) || {};
        s && (d = { min: 0, max: 0 });
        const f = a ? 200 : 1e6,
          h = a ? 40 : 1e7,
          y = {
            type: "inertia",
            velocity: i ? e[c] : 0,
            bounceStiffness: f,
            bounceDamping: h,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...l,
            ...d,
          };
        return this.startAxisValueAnimation(c, y);
      });
    return Promise.all(u).then(r);
  }
  startAxisValueAnimation(e, n) {
    const i = this.getAxisMotionValue(e);
    return (pc(this.visualElement, e), i.start(md(e, i, 0, n, this.visualElement, !1)));
  }
  stopAnimation() {
    ee((e) => this.getAxisMotionValue(e).stop());
  }
  pauseAnimation() {
    ee((e) => {
      var n;
      return (n = this.getAxisMotionValue(e).animation) === null || n === void 0
        ? void 0
        : n.pause();
    });
  }
  getAnimationState(e) {
    var n;
    return (n = this.getAxisMotionValue(e).animation) === null || n === void 0 ? void 0 : n.state;
  }
  getAxisMotionValue(e) {
    const n = `_drag${e.toUpperCase()}`,
      i = this.visualElement.getProps(),
      a = i[n];
    return a || this.visualElement.getValue(e, (i.initial ? i.initial[e] : void 0) || 0);
  }
  snapToCursor(e) {
    ee((n) => {
      const { drag: i } = this.getProps();
      if (!Ss(n, i, this.currentDirection)) return;
      const { projection: a } = this.visualElement,
        l = this.getAxisMotionValue(n);
      if (a && a.layout) {
        const { min: s, max: r } = a.layout.layoutBox[n];
        l.set(e[n] - lt(s, r, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: e, dragConstraints: n } = this.getProps(),
      { projection: i } = this.visualElement;
    if (!Ni(n) || !i || !this.constraints) return;
    this.stopAnimation();
    const a = { x: 0, y: 0 };
    ee((s) => {
      const r = this.getAxisMotionValue(s);
      if (r && this.constraints !== !1) {
        const o = r.get();
        a[s] = BA({ min: o, max: o }, this.constraints[s]);
      }
    });
    const { transformTemplate: l } = this.visualElement.getProps();
    ((this.visualElement.current.style.transform = l ? l({}, "") : "none"),
      i.root && i.root.updateScroll(),
      i.updateLayout(),
      this.resolveConstraints(),
      ee((s) => {
        if (!Ss(s, e, null)) return;
        const r = this.getAxisMotionValue(s),
          { min: o, max: u } = this.constraints[s];
        r.set(lt(o, u, a[s]));
      }));
  }
  addListeners() {
    if (!this.visualElement.current) return;
    jA.set(this.visualElement, this);
    const e = this.visualElement.current,
      n = ol(e, "pointerdown", (o) => {
        const { drag: u, dragListener: c = !0 } = this.getProps();
        u && c && this.start(o);
      }),
      i = () => {
        const { dragConstraints: o } = this.getProps();
        Ni(o) && o.current && (this.constraints = this.resolveRefConstraints());
      },
      { projection: a } = this.visualElement,
      l = a.addEventListener("measure", i);
    (a && !a.layout && (a.root && a.root.updateScroll(), a.updateLayout()), W.read(i));
    const s = _l(window, "resize", () => this.scalePositionWithinConstraints()),
      r = a.addEventListener("didUpdate", ({ delta: o, hasLayoutChanged: u }) => {
        this.isDragging &&
          u &&
          (ee((c) => {
            const d = this.getAxisMotionValue(c);
            !d || ((this.originPoint[c] += o[c].translate), d.set(d.get() + o[c].translate));
          }),
          this.visualElement.render());
      });
    return () => {
      (s(), n(), l(), r && r());
    };
  }
  getProps() {
    const e = this.visualElement.getProps(),
      {
        drag: n = !1,
        dragDirectionLock: i = !1,
        dragPropagation: a = !1,
        dragConstraints: l = !1,
        dragElastic: s = Cc,
        dragMomentum: r = !0,
      } = e;
    return {
      ...e,
      drag: n,
      dragDirectionLock: i,
      dragPropagation: a,
      dragConstraints: l,
      dragElastic: s,
      dragMomentum: r,
    };
  }
}
function Ss(t, e, n) {
  return (e === !0 || e === t) && (n === null || n === t);
}
function LA(t, e = 10) {
  let n = null;
  return (Math.abs(t.y) > e ? (n = "y") : Math.abs(t.x) > e && (n = "x"), n);
}
class YA extends Un {
  constructor(e) {
    (super(e),
      (this.removeGroupControls = $t),
      (this.removeListeners = $t),
      (this.controls = new HA(e)));
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    (e && (this.removeGroupControls = e.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || $t));
  }
  unmount() {
    (this.removeGroupControls(), this.removeListeners());
  }
}
const Xm = (t) => (e, n) => {
  t && W.postRender(() => t(e, n));
};
class GA extends Un {
  constructor() {
    (super(...arguments), (this.removePointerDownListener = $t));
  }
  onPointerDown(e) {
    this.session = new iv(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: nv(this.node),
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: n, onPan: i, onPanEnd: a } = this.node.getProps();
    return {
      onSessionStart: Xm(e),
      onStart: Xm(n),
      onMove: i,
      onEnd: (l, s) => {
        (delete this.session, a && W.postRender(() => a(l, s)));
      },
    };
  }
  mount() {
    this.removePointerDownListener = ol(this.node.current, "pointerdown", (e) =>
      this.onPointerDown(e),
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    (this.removePointerDownListener(), this.session && this.session.end());
  }
}
const qs = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function Km(t, e) {
  return e.max === e.min ? 0 : (t / (e.max - e.min)) * 100;
}
const Ba = {
    correct: (t, e) => {
      if (!e.target) return t;
      if (typeof t == "string")
        if (_.test(t)) t = parseFloat(t);
        else return t;
      const n = Km(t, e.target.x),
        i = Km(t, e.target.y);
      return `${n}% ${i}%`;
    },
  },
  qA = {
    correct: (t, { treeScale: e, projectionDelta: n }) => {
      const i = t,
        a = Vn.parse(t);
      if (a.length > 5) return i;
      const l = Vn.createTransformer(t),
        s = typeof a[0] != "number" ? 1 : 0,
        r = n.x.scale * e.x,
        o = n.y.scale * e.y;
      ((a[0 + s] /= r), (a[1 + s] /= o));
      const u = lt(r, o, 0.5);
      return (
        typeof a[2 + s] == "number" && (a[2 + s] /= u),
        typeof a[3 + s] == "number" && (a[3 + s] /= u),
        l(a)
      );
    },
  };
class kA extends w.exports.Component {
  componentDidMount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: i, layoutId: a } = this.props,
      { projection: l } = e;
    (aT(XA),
      l &&
        (n.group && n.group.add(l),
        i && i.register && a && i.register(l),
        l.root.didUpdate(),
        l.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        l.setOptions({ ...l.options, onExitComplete: () => this.safeToRemove() })),
      (qs.hasEverUpdated = !0));
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: n, visualElement: i, drag: a, isPresent: l } = this.props,
      s = i.projection;
    return (
      s &&
        ((s.isPresent = l),
        a || e.layoutDependency !== n || n === void 0 || e.isPresent !== l
          ? s.willUpdate()
          : this.safeToRemove(),
        e.isPresent !== l &&
          (l
            ? s.promote()
            : s.relegate() ||
              W.postRender(() => {
                const r = s.getStack();
                (!r || !r.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: e } = this.props.visualElement;
    e &&
      (e.root.didUpdate(),
      Zf.postRender(() => {
        !e.currentAnimation && e.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: i } = this.props,
      { projection: a } = e;
    a &&
      (a.scheduleCheckAfterUnmount(),
      n && n.group && n.group.remove(a),
      i && i.deregister && i.deregister(a));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function lv(t) {
  const [e, n] = Yy(),
    i = w.exports.useContext(Uf);
  return D(kA, {
    ...t,
    layoutGroup: i,
    switchLayoutGroup: w.exports.useContext(n1),
    isPresent: e,
    safeToRemove: n,
  });
}
const XA = {
  borderRadius: {
    ...Ba,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius",
    ],
  },
  borderTopLeftRadius: Ba,
  borderTopRightRadius: Ba,
  borderBottomLeftRadius: Ba,
  borderBottomRightRadius: Ba,
  boxShadow: qA,
};
function KA(t, e, n) {
  const i = Vt(t) ? t : wl(t);
  return (i.start(md("", i, e, n)), i.animation);
}
function ZA(t) {
  return t instanceof SVGElement && t.tagName !== "svg";
}
const QA = (t, e) => t.depth - e.depth;
class PA {
  constructor() {
    ((this.children = []), (this.isDirty = !1));
  }
  add(e) {
    (Lf(this.children, e), (this.isDirty = !0));
  }
  remove(e) {
    (Yf(this.children, e), (this.isDirty = !0));
  }
  forEach(e) {
    (this.isDirty && this.children.sort(QA), (this.isDirty = !1), this.children.forEach(e));
  }
}
function FA(t, e) {
  const n = we.now(),
    i = ({ timestamp: a }) => {
      const l = a - n;
      l >= e && (zn(i), t(l - e));
    };
  return (W.read(i, !0), () => zn(i));
}
const sv = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  $A = sv.length,
  Zm = (t) => (typeof t == "string" ? parseFloat(t) : t),
  Qm = (t) => typeof t == "number" || _.test(t);
function JA(t, e, n, i, a, l) {
  a
    ? ((t.opacity = lt(0, n.opacity !== void 0 ? n.opacity : 1, WA(i))),
      (t.opacityExit = lt(e.opacity !== void 0 ? e.opacity : 1, 0, IA(i))))
    : l &&
      (t.opacity = lt(
        e.opacity !== void 0 ? e.opacity : 1,
        n.opacity !== void 0 ? n.opacity : 1,
        i,
      ));
  for (let s = 0; s < $A; s++) {
    const r = `border${sv[s]}Radius`;
    let o = Pm(e, r),
      u = Pm(n, r);
    if (o === void 0 && u === void 0) continue;
    (o || (o = 0),
      u || (u = 0),
      o === 0 || u === 0 || Qm(o) === Qm(u)
        ? ((t[r] = Math.max(lt(Zm(o), Zm(u), i), 0)), (Ce.test(u) || Ce.test(o)) && (t[r] += "%"))
        : (t[r] = u));
  }
  (e.rotate || n.rotate) && (t.rotate = lt(e.rotate || 0, n.rotate || 0, i));
}
function Pm(t, e) {
  return t[e] !== void 0 ? t[e] : t.borderRadius;
}
const WA = rv(0, 0.5, A1),
  IA = rv(0.5, 0.95, $t);
function rv(t, e, n) {
  return (i) => (i < t ? 0 : i > e ? 1 : n(ua(t, e, i)));
}
function Fm(t, e) {
  ((t.min = e.min), (t.max = e.max));
}
function te(t, e) {
  (Fm(t.x, e.x), Fm(t.y, e.y));
}
function $m(t, e) {
  ((t.translate = e.translate),
    (t.scale = e.scale),
    (t.originPoint = e.originPoint),
    (t.origin = e.origin));
}
function Jm(t, e, n, i, a) {
  return ((t -= e), (t = Dr(t, 1 / n, i)), a !== void 0 && (t = Dr(t, 1 / a, i)), t);
}
function t4(t, e = 0, n = 1, i = 0.5, a, l = t, s = t) {
  if (
    (Ce.test(e) && ((e = parseFloat(e)), (e = lt(s.min, s.max, e / 100) - s.min)),
    typeof e != "number")
  )
    return;
  let r = lt(l.min, l.max, i);
  (t === l && (r -= e), (t.min = Jm(t.min, e, n, r, a)), (t.max = Jm(t.max, e, n, r, a)));
}
function Wm(t, e, [n, i, a], l, s) {
  t4(t, e[n], e[i], e[a], e.scale, l, s);
}
const e4 = ["x", "scaleX", "originX"],
  n4 = ["y", "scaleY", "originY"];
function Im(t, e, n, i) {
  (Wm(t.x, e, e4, n ? n.x : void 0, i ? i.x : void 0),
    Wm(t.y, e, n4, n ? n.y : void 0, i ? i.y : void 0));
}
function tp(t) {
  return t.translate === 0 && t.scale === 1;
}
function ov(t) {
  return tp(t.x) && tp(t.y);
}
function ep(t, e) {
  return t.min === e.min && t.max === e.max;
}
function i4(t, e) {
  return ep(t.x, e.x) && ep(t.y, e.y);
}
function np(t, e) {
  return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max);
}
function uv(t, e) {
  return np(t.x, e.x) && np(t.y, e.y);
}
function ip(t) {
  return Nt(t.x) / Nt(t.y);
}
function ap(t, e) {
  return t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint;
}
class a4 {
  constructor() {
    this.members = [];
  }
  add(e) {
    (Lf(this.members, e), e.scheduleRender());
  }
  remove(e) {
    if ((Yf(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead)) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(e) {
    const n = this.members.findIndex((a) => e === a);
    if (n === 0) return !1;
    let i;
    for (let a = n; a >= 0; a--) {
      const l = this.members[a];
      if (l.isPresent !== !1) {
        i = l;
        break;
      }
    }
    return i ? (this.promote(i), !0) : !1;
  }
  promote(e, n) {
    const i = this.lead;
    if (e !== i && ((this.prevLead = i), (this.lead = e), e.show(), i)) {
      (i.instance && i.scheduleRender(),
        e.scheduleRender(),
        (e.resumeFrom = i),
        n && (e.resumeFrom.preserveOpacity = !0),
        i.snapshot &&
          ((e.snapshot = i.snapshot),
          (e.snapshot.latestValues = i.animationValues || i.latestValues)),
        e.root && e.root.isUpdating && (e.isLayoutDirty = !0));
      const { crossfade: a } = e.options;
      a === !1 && i.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      const { options: n, resumingFrom: i } = e;
      (n.onExitComplete && n.onExitComplete(),
        i && i.options.onExitComplete && i.options.onExitComplete());
    });
  }
  scheduleRender() {
    this.members.forEach((e) => {
      e.instance && e.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function l4(t, e, n) {
  let i = "";
  const a = t.x.translate / e.x,
    l = t.y.translate / e.y,
    s = (n == null ? void 0 : n.z) || 0;
  if (
    ((a || l || s) && (i = `translate3d(${a}px, ${l}px, ${s}px) `),
    (e.x !== 1 || e.y !== 1) && (i += `scale(${1 / e.x}, ${1 / e.y}) `),
    n)
  ) {
    const { transformPerspective: u, rotate: c, rotateX: d, rotateY: f, skewX: h, skewY: y } = n;
    (u && (i = `perspective(${u}px) ${i}`),
      c && (i += `rotate(${c}deg) `),
      d && (i += `rotateX(${d}deg) `),
      f && (i += `rotateY(${f}deg) `),
      h && (i += `skewX(${h}deg) `),
      y && (i += `skewY(${y}deg) `));
  }
  const r = t.x.scale * e.x,
    o = t.y.scale * e.y;
  return ((r !== 1 || o !== 1) && (i += `scale(${r}, ${o})`), i || "none");
}
const Io = ["", "X", "Y", "Z"],
  s4 = { visibility: "hidden" },
  lp = 1e3;
let r4 = 0;
function tu(t, e, n, i) {
  const { latestValues: a } = e;
  a[t] && ((n[t] = a[t]), e.setStaticValue(t, 0), i && (i[t] = 0));
}
function cv(t) {
  if (((t.hasCheckedOptimisedAppear = !0), t.root === t)) return;
  const { visualElement: e } = t.options;
  if (!e) return;
  const n = g1(e);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: a, layoutId: l } = t.options;
    window.MotionCancelOptimisedAnimation(n, "transform", W, !(a || l));
  }
  const { parent: i } = t;
  i && !i.hasCheckedOptimisedAppear && cv(i);
}
function fv({
  attachResizeListener: t,
  defaultParent: e,
  measureScroll: n,
  checkIsScrollRoot: i,
  resetTransform: a,
}) {
  return class {
    constructor(s = {}, r = e == null ? void 0 : e()) {
      ((this.id = r4++),
        (this.animationId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          ((this.projectionUpdateScheduled = !1),
            this.nodes.forEach(c4),
            this.nodes.forEach(p4),
            this.nodes.forEach(g4),
            this.nodes.forEach(f4));
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = s),
        (this.root = r ? r.root || r : this),
        (this.path = r ? [...r.path, r] : []),
        (this.parent = r),
        (this.depth = r ? r.depth + 1 : 0));
      for (let o = 0; o < this.path.length; o++) this.path[o].shouldResetTransform = !0;
      this.root === this && (this.nodes = new PA());
    }
    addEventListener(s, r) {
      return (
        this.eventHandlers.has(s) || this.eventHandlers.set(s, new qf()),
        this.eventHandlers.get(s).add(r)
      );
    }
    notifyListeners(s, ...r) {
      const o = this.eventHandlers.get(s);
      o && o.notify(...r);
    }
    hasListeners(s) {
      return this.eventHandlers.has(s);
    }
    mount(s, r = this.root.hasTreeAnimated) {
      if (this.instance) return;
      ((this.isSVG = ZA(s)), (this.instance = s));
      const { layoutId: o, layout: u, visualElement: c } = this.options;
      if (
        (c && !c.current && c.mount(s),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        r && (u || o) && (this.isLayoutDirty = !0),
        t)
      ) {
        let d;
        const f = () => (this.root.updateBlockedByResize = !1);
        t(s, () => {
          ((this.root.updateBlockedByResize = !0),
            d && d(),
            (d = FA(f, 250)),
            qs.hasAnimatedSinceResize &&
              ((qs.hasAnimatedSinceResize = !1), this.nodes.forEach(rp)));
        });
      }
      (o && this.root.registerSharedNode(o, this),
        this.options.animate !== !1 &&
          c &&
          (o || u) &&
          this.addEventListener(
            "didUpdate",
            ({ delta: d, hasLayoutChanged: f, hasRelativeLayoutChanged: h, layout: y }) => {
              if (this.isTreeAnimationBlocked()) {
                ((this.target = void 0), (this.relativeTarget = void 0));
                return;
              }
              const b = this.options.transition || c.getDefaultTransition() || x4,
                { onLayoutAnimationStart: E, onLayoutAnimationComplete: m } = c.getProps(),
                p = !this.targetLayout || !uv(this.targetLayout, y),
                g = !f && h;
              if (
                this.options.layoutRoot ||
                this.resumeFrom ||
                g ||
                (f && (p || !this.currentAnimation))
              ) {
                (this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(d, g));
                const v = { ...kf(b, "layout"), onPlay: E, onComplete: m };
                ((c.shouldReduceMotion || this.options.layoutRoot) &&
                  ((v.delay = 0), (v.type = !1)),
                  this.startAnimation(v));
              } else
                (f || rp(this),
                  this.isLead() && this.options.onExitComplete && this.options.onExitComplete());
              this.targetLayout = y;
            },
          ));
    }
    unmount() {
      (this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this));
      const s = this.getStack();
      (s && s.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        zn(this.updateProjection));
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || (this.parent && this.parent.isTreeAnimationBlocked()) || !1;
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0), this.nodes && this.nodes.forEach(y4), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: s } = this.options;
      return s && s.getProps().transformTemplate;
    }
    willUpdate(s = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && cv(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let c = 0; c < this.path.length; c++) {
        const d = this.path[c];
        ((d.shouldResetTransform = !0),
          d.updateScroll("snapshot"),
          d.options.layoutRoot && d.willUpdate(!1));
      }
      const { layoutId: r, layout: o } = this.options;
      if (r === void 0 && !o) return;
      const u = this.getTransformTemplate();
      ((this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0),
        this.updateSnapshot(),
        s && this.notifyListeners("willUpdate"));
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        (this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(sp));
        return;
      }
      (this.isUpdating || this.nodes.forEach(h4),
        (this.isUpdating = !1),
        this.nodes.forEach(m4),
        this.nodes.forEach(o4),
        this.nodes.forEach(u4),
        this.clearAllSnapshots());
      const r = we.now();
      ((Mt.delta = tn(0, 1e3 / 60, r - Mt.timestamp)),
        (Mt.timestamp = r),
        (Mt.isProcessing = !0),
        Xo.update.process(Mt),
        Xo.preRender.process(Mt),
        Xo.render.process(Mt),
        (Mt.isProcessing = !1));
    }
    didUpdate() {
      this.updateScheduled || ((this.updateScheduled = !0), Zf.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      (this.nodes.forEach(d4), this.sharedNodes.forEach(v4));
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0), W.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      W.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot ||
        !this.instance ||
        ((this.snapshot = this.measure()),
        this.snapshot &&
          !Nt(this.snapshot.measuredBox.x) &&
          !Nt(this.snapshot.measuredBox.y) &&
          (this.snapshot = void 0));
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let o = 0; o < this.path.length; o++) this.path[o].updateScroll();
      const s = this.layout;
      ((this.layout = this.measure(!1)),
        (this.layoutCorrected = ft()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox));
      const { visualElement: r } = this.options;
      r && r.notify("LayoutMeasure", this.layout.layoutBox, s ? s.layoutBox : void 0);
    }
    updateScroll(s = "measure") {
      let r = Boolean(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === s &&
          (r = !1),
        r)
      ) {
        const o = i(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: s,
          isRoot: o,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : o,
        };
      }
    }
    resetTransform() {
      if (!a) return;
      const s = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
        r = this.projectionDelta && !ov(this.projectionDelta),
        o = this.getTransformTemplate(),
        u = o ? o(this.latestValues, "") : void 0,
        c = u !== this.prevTransformTemplateValue;
      s &&
        (r || Gn(this.latestValues) || c) &&
        (a(this.instance, u), (this.shouldResetTransform = !1), this.scheduleRender());
    }
    measure(s = !0) {
      const r = this.measurePageBox();
      let o = this.removeElementScroll(r);
      return (
        s && (o = this.removeTransform(o)),
        T4(o),
        {
          animationId: this.root.animationId,
          measuredBox: r,
          layoutBox: o,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      var s;
      const { visualElement: r } = this.options;
      if (!r) return ft();
      const o = r.measureViewportBox();
      if (
        !(((s = this.scroll) === null || s === void 0 ? void 0 : s.wasRoot) || this.path.some(A4))
      ) {
        const { scroll: c } = this.root;
        c && (Li(o.x, c.offset.x), Li(o.y, c.offset.y));
      }
      return o;
    }
    removeElementScroll(s) {
      var r;
      const o = ft();
      if ((te(o, s), !((r = this.scroll) === null || r === void 0) && r.wasRoot)) return o;
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u],
          { scroll: d, options: f } = c;
        c !== this.root &&
          d &&
          f.layoutScroll &&
          (d.wasRoot && te(o, s), Li(o.x, d.offset.x), Li(o.y, d.offset.y));
      }
      return o;
    }
    applyTransform(s, r = !1) {
      const o = ft();
      te(o, s);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        (!r &&
          c.options.layoutScroll &&
          c.scroll &&
          c !== c.root &&
          Yi(o, { x: -c.scroll.offset.x, y: -c.scroll.offset.y }),
          Gn(c.latestValues) && Yi(o, c.latestValues));
      }
      return (Gn(this.latestValues) && Yi(o, this.latestValues), o);
    }
    removeTransform(s) {
      const r = ft();
      te(r, s);
      for (let o = 0; o < this.path.length; o++) {
        const u = this.path[o];
        if (!u.instance || !Gn(u.latestValues)) continue;
        Dc(u.latestValues) && u.updateSnapshot();
        const c = ft(),
          d = u.measurePageBox();
        (te(c, d), Im(r, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c));
      }
      return (Gn(this.latestValues) && Im(r, this.latestValues), r);
    }
    setTargetDelta(s) {
      ((this.targetDelta = s), this.root.scheduleUpdateProjection(), (this.isProjectionDirty = !0));
    }
    setOptions(s) {
      this.options = {
        ...this.options,
        ...s,
        crossfade: s.crossfade !== void 0 ? s.crossfade : !0,
      };
    }
    clearMeasurements() {
      ((this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1));
    }
    forceRelativeParentToResolveTarget() {
      !this.relativeParent ||
        (this.relativeParent.resolvedRelativeTargetAt !== Mt.timestamp &&
          this.relativeParent.resolveTargetDelta(!0));
    }
    resolveTargetDelta(s = !1) {
      var r;
      const o = this.getLead();
      (this.isProjectionDirty || (this.isProjectionDirty = o.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = o.isTransformDirty),
        this.isSharedProjectionDirty || (this.isSharedProjectionDirty = o.isSharedProjectionDirty));
      const u = Boolean(this.resumingFrom) || this !== o;
      if (
        !(
          s ||
          (u && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          ((r = this.parent) === null || r === void 0 ? void 0 : r.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      const { layout: d, layoutId: f } = this.options;
      if (!(!this.layout || !(d || f))) {
        if (
          ((this.resolvedRelativeTargetAt = Mt.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const h = this.getClosestProjectingParent();
          h && h.layout && this.animationProgress !== 1
            ? ((this.relativeParent = h),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = ft()),
              (this.relativeTargetOrigin = ft()),
              cl(this.relativeTargetOrigin, this.layout.layoutBox, h.layout.layoutBox),
              te(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (
          !(!this.relativeTarget && !this.targetDelta) &&
          (this.target || ((this.target = ft()), (this.targetWithTransforms = ft())),
          this.relativeTarget &&
          this.relativeTargetOrigin &&
          this.relativeParent &&
          this.relativeParent.target
            ? (this.forceRelativeParentToResolveTarget(),
              MA(this.target, this.relativeTarget, this.relativeParent.target))
            : this.targetDelta
              ? (Boolean(this.resumingFrom)
                  ? (this.target = this.applyTransform(this.layout.layoutBox))
                  : te(this.target, this.layout.layoutBox),
                tv(this.target, this.targetDelta))
              : te(this.target, this.layout.layoutBox),
          this.attemptToResolveRelativeTarget)
        ) {
          this.attemptToResolveRelativeTarget = !1;
          const h = this.getClosestProjectingParent();
          h &&
          Boolean(h.resumingFrom) === Boolean(this.resumingFrom) &&
          !h.options.layoutScroll &&
          h.target &&
          this.animationProgress !== 1
            ? ((this.relativeParent = h),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = ft()),
              (this.relativeTargetOrigin = ft()),
              cl(this.relativeTargetOrigin, this.target, h.target),
              te(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Dc(this.parent.latestValues) || I1(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return Boolean(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout,
      );
    }
    calcProjection() {
      var s;
      const r = this.getLead(),
        o = Boolean(this.resumingFrom) || this !== r;
      let u = !0;
      if (
        ((this.isProjectionDirty ||
          ((s = this.parent) === null || s === void 0 ? void 0 : s.isProjectionDirty)) &&
          (u = !1),
        o && (this.isSharedProjectionDirty || this.isTransformDirty) && (u = !1),
        this.resolvedRelativeTargetAt === Mt.timestamp && (u = !1),
        u)
      )
        return;
      const { layout: c, layoutId: d } = this.options;
      if (
        ((this.isTreeAnimating = Boolean(
          (this.parent && this.parent.isTreeAnimating) ||
            this.currentAnimation ||
            this.pendingAnimation,
        )),
        this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(c || d))
      )
        return;
      te(this.layoutCorrected, this.layout.layoutBox);
      const f = this.treeScale.x,
        h = this.treeScale.y;
      (DA(this.layoutCorrected, this.treeScale, this.path, o),
        r.layout &&
          !r.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((r.target = r.layout.layoutBox), (r.targetWithTransforms = ft())));
      const { target: y } = r;
      if (!y) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      (!this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : ($m(this.prevProjectionDelta.x, this.projectionDelta.x),
          $m(this.prevProjectionDelta.y, this.projectionDelta.y)),
        ul(this.projectionDelta, this.layoutCorrected, y, this.latestValues),
        (this.treeScale.x !== f ||
          this.treeScale.y !== h ||
          !ap(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !ap(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", y)));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(s = !0) {
      var r;
      if (((r = this.options.visualElement) === null || r === void 0 || r.scheduleRender(), s)) {
        const o = this.getStack();
        o && o.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      ((this.prevProjectionDelta = Hi()),
        (this.projectionDelta = Hi()),
        (this.projectionDeltaWithTransform = Hi()));
    }
    setAnimationOrigin(s, r = !1) {
      const o = this.snapshot,
        u = o ? o.latestValues : {},
        c = { ...this.latestValues },
        d = Hi();
      ((!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !r));
      const f = ft(),
        h = o ? o.source : void 0,
        y = this.layout ? this.layout.source : void 0,
        b = h !== y,
        E = this.getStack(),
        m = !E || E.members.length <= 1,
        p = Boolean(b && !m && this.options.crossfade === !0 && !this.path.some(S4));
      this.animationProgress = 0;
      let g;
      ((this.mixTargetDelta = (v) => {
        const S = v / 1e3;
        (op(d.x, s.x, S),
          op(d.y, s.y, S),
          this.setTargetDelta(d),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (cl(f, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            b4(this.relativeTarget, this.relativeTargetOrigin, f, S),
            g && i4(this.relativeTarget, g) && (this.isProjectionDirty = !1),
            g || (g = ft()),
            te(g, this.relativeTarget)),
          b && ((this.animationValues = c), JA(c, u, this.latestValues, S, p, m)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = S));
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0));
    }
    startAnimation(s) {
      (this.notifyListeners("animationStart"),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom &&
          this.resumingFrom.currentAnimation &&
          this.resumingFrom.currentAnimation.stop(),
        this.pendingAnimation && (zn(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = W.update(() => {
          ((qs.hasAnimatedSinceResize = !0),
            (this.currentAnimation = KA(0, lp, {
              ...s,
              onUpdate: (r) => {
                (this.mixTargetDelta(r), s.onUpdate && s.onUpdate(r));
              },
              onStop: () => {},
              onComplete: () => {
                (s.onComplete && s.onComplete(), this.completeAnimation());
              },
            })),
            this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0));
        })));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const s = this.getStack();
      (s && s.exitAnimationComplete(),
        (this.resumingFrom = this.currentAnimation = this.animationValues = void 0),
        this.notifyListeners("animationComplete"));
    }
    finishAnimation() {
      (this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(lp), this.currentAnimation.stop()),
        this.completeAnimation());
    }
    applyTransformsToTarget() {
      const s = this.getLead();
      let { targetWithTransforms: r, target: o, layout: u, latestValues: c } = s;
      if (!(!r || !o || !u)) {
        if (
          this !== s &&
          this.layout &&
          u &&
          dv(this.options.animationType, this.layout.layoutBox, u.layoutBox)
        ) {
          o = this.target || ft();
          const d = Nt(this.layout.layoutBox.x);
          ((o.x.min = s.target.x.min), (o.x.max = o.x.min + d));
          const f = Nt(this.layout.layoutBox.y);
          ((o.y.min = s.target.y.min), (o.y.max = o.y.min + f));
        }
        (te(r, o), Yi(r, c), ul(this.projectionDeltaWithTransform, this.layoutCorrected, r, c));
      }
    }
    registerSharedNode(s, r) {
      (this.sharedNodes.has(s) || this.sharedNodes.set(s, new a4()),
        this.sharedNodes.get(s).add(r));
      const u = r.options.initialPromotionConfig;
      r.promote({
        transition: u ? u.transition : void 0,
        preserveFollowOpacity:
          u && u.shouldPreserveFollowOpacity ? u.shouldPreserveFollowOpacity(r) : void 0,
      });
    }
    isLead() {
      const s = this.getStack();
      return s ? s.lead === this : !0;
    }
    getLead() {
      var s;
      const { layoutId: r } = this.options;
      return r ? ((s = this.getStack()) === null || s === void 0 ? void 0 : s.lead) || this : this;
    }
    getPrevLead() {
      var s;
      const { layoutId: r } = this.options;
      return r ? ((s = this.getStack()) === null || s === void 0 ? void 0 : s.prevLead) : void 0;
    }
    getStack() {
      const { layoutId: s } = this.options;
      if (s) return this.root.sharedNodes.get(s);
    }
    promote({ needsReset: s, transition: r, preserveFollowOpacity: o } = {}) {
      const u = this.getStack();
      (u && u.promote(this, o),
        s && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        r && this.setOptions({ transition: r }));
    }
    relegate() {
      const s = this.getStack();
      return s ? s.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: s } = this.options;
      if (!s) return;
      let r = !1;
      const { latestValues: o } = s;
      if (
        ((o.z || o.rotate || o.rotateX || o.rotateY || o.rotateZ || o.skewX || o.skewY) && (r = !0),
        !r)
      )
        return;
      const u = {};
      o.z && tu("z", s, u, this.animationValues);
      for (let c = 0; c < Io.length; c++)
        (tu(`rotate${Io[c]}`, s, u, this.animationValues),
          tu(`skew${Io[c]}`, s, u, this.animationValues));
      s.render();
      for (const c in u)
        (s.setStaticValue(c, u[c]), this.animationValues && (this.animationValues[c] = u[c]));
      s.scheduleRender();
    }
    getProjectionStyles(s) {
      var r, o;
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) return s4;
      const u = { visibility: "" },
        c = this.getTransformTemplate();
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (u.opacity = ""),
          (u.pointerEvents = Gs(s == null ? void 0 : s.pointerEvents) || ""),
          (u.transform = c ? c(this.latestValues, "") : "none"),
          u
        );
      const d = this.getLead();
      if (!this.projectionDelta || !this.layout || !d.target) {
        const b = {};
        return (
          this.options.layoutId &&
            ((b.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1),
            (b.pointerEvents = Gs(s == null ? void 0 : s.pointerEvents) || "")),
          this.hasProjected &&
            !Gn(this.latestValues) &&
            ((b.transform = c ? c({}, "") : "none"), (this.hasProjected = !1)),
          b
        );
      }
      const f = d.animationValues || d.latestValues;
      (this.applyTransformsToTarget(),
        (u.transform = l4(this.projectionDeltaWithTransform, this.treeScale, f)),
        c && (u.transform = c(f, u.transform)));
      const { x: h, y } = this.projectionDelta;
      ((u.transformOrigin = `${h.origin * 100}% ${y.origin * 100}% 0`),
        d.animationValues
          ? (u.opacity =
              d === this
                ? (o = (r = f.opacity) !== null && r !== void 0 ? r : this.latestValues.opacity) !==
                    null && o !== void 0
                  ? o
                  : 1
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : f.opacityExit)
          : (u.opacity =
              d === this
                ? f.opacity !== void 0
                  ? f.opacity
                  : ""
                : f.opacityExit !== void 0
                  ? f.opacityExit
                  : 0));
      for (const b in Rl) {
        if (f[b] === void 0) continue;
        const { correct: E, applyTo: m, isCSSVariable: p } = Rl[b],
          g = u.transform === "none" ? f[b] : E(f[b], d);
        if (m) {
          const v = m.length;
          for (let S = 0; S < v; S++) u[m[S]] = g;
        } else p ? (this.options.visualElement.renderState.vars[b] = g) : (u[b] = g);
      }
      return (
        this.options.layoutId &&
          (u.pointerEvents = d === this ? Gs(s == null ? void 0 : s.pointerEvents) || "" : "none"),
        u
      );
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      (this.root.nodes.forEach((s) => {
        var r;
        return (r = s.currentAnimation) === null || r === void 0 ? void 0 : r.stop();
      }),
        this.root.nodes.forEach(sp),
        this.root.sharedNodes.clear());
    }
  };
}
function o4(t) {
  t.updateLayout();
}
function u4(t) {
  var e;
  const n = ((e = t.resumeFrom) === null || e === void 0 ? void 0 : e.snapshot) || t.snapshot;
  if (t.isLead() && t.layout && n && t.hasListeners("didUpdate")) {
    const { layoutBox: i, measuredBox: a } = t.layout,
      { animationType: l } = t.options,
      s = n.source !== t.layout.source;
    l === "size"
      ? ee((d) => {
          const f = s ? n.measuredBox[d] : n.layoutBox[d],
            h = Nt(f);
          ((f.min = i[d].min), (f.max = f.min + h));
        })
      : dv(l, n.layoutBox, i) &&
        ee((d) => {
          const f = s ? n.measuredBox[d] : n.layoutBox[d],
            h = Nt(i[d]);
          ((f.max = f.min + h),
            t.relativeTarget &&
              !t.currentAnimation &&
              ((t.isProjectionDirty = !0),
              (t.relativeTarget[d].max = t.relativeTarget[d].min + h)));
        });
    const r = Hi();
    ul(r, i, n.layoutBox);
    const o = Hi();
    s ? ul(o, t.applyTransform(a, !0), n.measuredBox) : ul(o, i, n.layoutBox);
    const u = !ov(r);
    let c = !1;
    if (!t.resumeFrom) {
      const d = t.getClosestProjectingParent();
      if (d && !d.resumeFrom) {
        const { snapshot: f, layout: h } = d;
        if (f && h) {
          const y = ft();
          cl(y, n.layoutBox, f.layoutBox);
          const b = ft();
          (cl(b, i, h.layoutBox),
            uv(y, b) || (c = !0),
            d.options.layoutRoot &&
              ((t.relativeTarget = b), (t.relativeTargetOrigin = y), (t.relativeParent = d)));
        }
      }
    }
    t.notifyListeners("didUpdate", {
      layout: i,
      snapshot: n,
      delta: o,
      layoutDelta: r,
      hasLayoutChanged: u,
      hasRelativeLayoutChanged: c,
    });
  } else if (t.isLead()) {
    const { onExitComplete: i } = t.options;
    i && i();
  }
  t.options.transition = void 0;
}
function c4(t) {
  !t.parent ||
    (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty),
    t.isSharedProjectionDirty ||
      (t.isSharedProjectionDirty = Boolean(
        t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty,
      )),
    t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function f4(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function d4(t) {
  t.clearSnapshot();
}
function sp(t) {
  t.clearMeasurements();
}
function h4(t) {
  t.isLayoutDirty = !1;
}
function m4(t) {
  const { visualElement: e } = t.options;
  (e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), t.resetTransform());
}
function rp(t) {
  (t.finishAnimation(),
    (t.targetDelta = t.relativeTarget = t.target = void 0),
    (t.isProjectionDirty = !0));
}
function p4(t) {
  t.resolveTargetDelta();
}
function g4(t) {
  t.calcProjection();
}
function y4(t) {
  t.resetSkewAndRotation();
}
function v4(t) {
  t.removeLeadSnapshot();
}
function op(t, e, n) {
  ((t.translate = lt(e.translate, 0, n)),
    (t.scale = lt(e.scale, 1, n)),
    (t.origin = e.origin),
    (t.originPoint = e.originPoint));
}
function up(t, e, n, i) {
  ((t.min = lt(e.min, n.min, i)), (t.max = lt(e.max, n.max, i)));
}
function b4(t, e, n, i) {
  (up(t.x, e.x, n.x, i), up(t.y, e.y, n.y, i));
}
function S4(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const x4 = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  cp = (t) =>
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t),
  fp = cp("applewebkit/") && !cp("chrome/") ? Math.round : $t;
function dp(t) {
  ((t.min = fp(t.min)), (t.max = fp(t.max)));
}
function T4(t) {
  (dp(t.x), dp(t.y));
}
function dv(t, e, n) {
  return t === "position" || (t === "preserve-aspect" && !EA(ip(e), ip(n), 0.2));
}
function A4(t) {
  var e;
  return t !== t.root && ((e = t.scroll) === null || e === void 0 ? void 0 : e.wasRoot);
}
const E4 = fv({
    attachResizeListener: (t, e) => _l(t, "resize", e),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  eu = { current: void 0 },
  hv = fv({
    measureScroll: (t) => ({ x: t.scrollLeft, y: t.scrollTop }),
    defaultParent: () => {
      if (!eu.current) {
        const t = new E4({});
        (t.mount(window), t.setOptions({ layoutScroll: !0 }), (eu.current = t));
      }
      return eu.current;
    },
    resetTransform: (t, e) => {
      t.style.transform = e !== void 0 ? e : "none";
    },
    checkIsScrollRoot: (t) => Boolean(window.getComputedStyle(t).position === "fixed"),
  }),
  M4 = { pan: { Feature: GA }, drag: { Feature: YA, ProjectionNode: hv, MeasureLayout: lv } };
function hp(t, e, n) {
  const { props: i } = t;
  t.animationState && i.whileHover && t.animationState.setActive("whileHover", n === "Start");
  const a = "onHover" + n,
    l = i[a];
  l && W.postRender(() => l(e, $l(e)));
}
class D4 extends Un {
  mount() {
    const { current: e } = this.node;
    !e ||
      (this.unmount = Vx(e, (n, i) => (hp(this.node, i, "Start"), (a) => hp(this.node, a, "End"))));
  }
  unmount() {}
}
class w4 extends Un {
  constructor() {
    (super(...arguments), (this.isActive = !1));
  }
  onFocus() {
    let e = !1;
    try {
      e = this.node.current.matches(":focus-visible");
    } catch {
      e = !0;
    }
    !e ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !0), (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1), (this.isActive = !1));
  }
  mount() {
    this.unmount = Fl(
      _l(this.node.current, "focus", () => this.onFocus()),
      _l(this.node.current, "blur", () => this.onBlur()),
    );
  }
  unmount() {}
}
function mp(t, e, n) {
  const { props: i } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled) return;
  t.animationState && i.whileTap && t.animationState.setActive("whileTap", n === "Start");
  const a = "onTap" + (n === "End" ? "" : n),
    l = i[a];
  l && W.postRender(() => l(e, $l(e)));
}
class C4 extends Un {
  mount() {
    const { current: e } = this.node;
    !e ||
      (this.unmount = Nx(
        e,
        (n, i) => (
          mp(this.node, i, "Start"),
          (a, { success: l }) => mp(this.node, a, l ? "End" : "Cancel")
        ),
        { useGlobalTarget: this.node.props.globalTapTarget },
      ));
  }
  unmount() {}
}
const Rc = new WeakMap(),
  nu = new WeakMap(),
  R4 = (t) => {
    const e = Rc.get(t.target);
    e && e(t);
  },
  O4 = (t) => {
    t.forEach(R4);
  };
function z4({ root: t, ...e }) {
  const n = t || document;
  nu.has(n) || nu.set(n, {});
  const i = nu.get(n),
    a = JSON.stringify(e);
  return (i[a] || (i[a] = new IntersectionObserver(O4, { root: t, ...e })), i[a]);
}
function V4(t, e, n) {
  const i = z4(e);
  return (
    Rc.set(t, n),
    i.observe(t),
    () => {
      (Rc.delete(t), i.unobserve(t));
    }
  );
}
const _4 = { some: 0, all: 1 };
class B4 extends Un {
  constructor() {
    (super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1));
  }
  startObserver() {
    this.unmount();
    const { viewport: e = {} } = this.node.getProps(),
      { root: n, margin: i, amount: a = "some", once: l } = e,
      s = {
        root: n ? n.current : void 0,
        rootMargin: i,
        threshold: typeof a == "number" ? a : _4[a],
      },
      r = (o) => {
        const { isIntersecting: u } = o;
        if (this.isInView === u || ((this.isInView = u), l && !u && this.hasEnteredView)) return;
        (u && (this.hasEnteredView = !0),
          this.node.animationState && this.node.animationState.setActive("whileInView", u));
        const { onViewportEnter: c, onViewportLeave: d } = this.node.getProps(),
          f = u ? c : d;
        f && f(o);
      };
    return V4(this.node.current, s, r);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: e, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(U4(e, n)) && this.startObserver();
  }
  unmount() {}
}
function U4({ viewport: t = {} }, { viewport: e = {} } = {}) {
  return (n) => t[n] !== e[n];
}
const N4 = {
    inView: { Feature: B4 },
    tap: { Feature: C4 },
    focus: { Feature: w4 },
    hover: { Feature: D4 },
  },
  j4 = { layout: { ProjectionNode: hv, MeasureLayout: lv } },
  Oc = { current: null },
  mv = { current: !1 };
function H4() {
  if (((mv.current = !0), !!jf))
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"),
        e = () => (Oc.current = t.matches);
      (t.addListener(e), e());
    } else Oc.current = !1;
}
const L4 = [...H1, Rt, Vn],
  Y4 = (t) => L4.find(j1(t)),
  G4 = new WeakMap();
function q4(t, e, n) {
  for (const i in e) {
    const a = e[i],
      l = n[i];
    if (Vt(a)) t.addValue(i, a);
    else if (Vt(l)) t.addValue(i, wl(a, { owner: t }));
    else if (l !== a)
      if (t.hasValue(i)) {
        const s = t.getValue(i);
        s.liveStyle === !0 ? s.jump(a) : s.hasAnimated || s.set(a);
      } else {
        const s = t.getStaticValue(i);
        t.addValue(i, wl(s !== void 0 ? s : a, { owner: t }));
      }
  }
  for (const i in n) e[i] === void 0 && t.removeValue(i);
  return e;
}
const pp = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete",
];
class k4 {
  scrapeMotionValuesFromProps(e, n, i) {
    return {};
  }
  constructor(
    {
      parent: e,
      props: n,
      presenceContext: i,
      reducedMotionConfig: a,
      blockInitialAnimation: l,
      visualState: s,
    },
    r = {},
  ) {
    ((this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = fd),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        !this.current ||
          (this.triggerBuild(),
          this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const h = we.now();
        this.renderScheduledAt < h && ((this.renderScheduledAt = h), W.render(this.render, !1, !0));
      }));
    const { latestValues: o, renderState: u, onUpdate: c } = s;
    ((this.onUpdate = c),
      (this.latestValues = o),
      (this.baseTarget = { ...o }),
      (this.initialValues = n.initial ? { ...o } : {}),
      (this.renderState = u),
      (this.parent = e),
      (this.props = n),
      (this.presenceContext = i),
      (this.depth = e ? e.depth + 1 : 0),
      (this.reducedMotionConfig = a),
      (this.options = r),
      (this.blockInitialAnimation = Boolean(l)),
      (this.isControllingVariants = eo(n)),
      (this.isVariantNode = t1(n)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = Boolean(e && e.current)));
    const { willChange: d, ...f } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const h in f) {
      const y = f[h];
      o[h] !== void 0 && Vt(y) && y.set(o[h], !1);
    }
  }
  mount(e) {
    ((this.current = e),
      G4.set(e, this),
      this.projection && !this.projection.instance && this.projection.mount(e),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((n, i) => this.bindToMotionValue(i, n)),
      mv.current || H4(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never"
          ? !1
          : this.reducedMotionConfig === "always"
            ? !0
            : Oc.current),
      this.parent && this.parent.children.add(this),
      this.update(this.props, this.presenceContext));
  }
  unmount() {
    (this.projection && this.projection.unmount(),
      zn(this.notifyUpdate),
      zn(this.render),
      this.valueSubscriptions.forEach((e) => e()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent && this.parent.children.delete(this));
    for (const e in this.events) this.events[e].clear();
    for (const e in this.features) {
      const n = this.features[e];
      n && (n.unmount(), (n.isMounted = !1));
    }
    this.current = null;
  }
  bindToMotionValue(e, n) {
    this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)();
    const i = mi.has(e);
    i && this.onBindTransform && this.onBindTransform();
    const a = n.on("change", (r) => {
        ((this.latestValues[e] = r),
          this.props.onUpdate && W.preRender(this.notifyUpdate),
          i && this.projection && (this.projection.isTransformDirty = !0));
      }),
      l = n.on("renderRequest", this.scheduleRender);
    let s;
    (window.MotionCheckAppearSync && (s = window.MotionCheckAppearSync(this, e, n)),
      this.valueSubscriptions.set(e, () => {
        (a(), l(), s && s(), n.owner && n.stop());
      }));
  }
  sortNodePosition(e) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== e.type
      ? 0
      : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in ca) {
      const n = ca[e];
      if (!n) continue;
      const { isEnabled: i, Feature: a } = n;
      if (
        (!this.features[e] && a && i(this.props) && (this.features[e] = new a(this)),
        this.features[e])
      ) {
        const l = this.features[e];
        l.isMounted ? l.update() : (l.mount(), (l.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : ft();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, n) {
    this.latestValues[e] = n;
  }
  update(e, n) {
    ((e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = e),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = n));
    for (let i = 0; i < pp.length; i++) {
      const a = pp[i];
      this.propEventSubscriptions[a] &&
        (this.propEventSubscriptions[a](), delete this.propEventSubscriptions[a]);
      const l = "on" + a,
        s = e[l];
      s && (this.propEventSubscriptions[a] = this.on(a, s));
    }
    ((this.prevMotionValues = q4(
      this,
      this.scrapeMotionValuesFromProps(e, this.prevProps, this),
      this.prevMotionValues,
    )),
      this.handleChildMotionValue && this.handleChildMotionValue(),
      this.onUpdate && this.onUpdate(this));
  }
  getProps() {
    return this.props;
  }
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  addVariantChild(e) {
    const n = this.getClosestVariantNode();
    if (n)
      return (n.variantChildren && n.variantChildren.add(e), () => n.variantChildren.delete(e));
  }
  addValue(e, n) {
    const i = this.values.get(e);
    n !== i &&
      (i && this.removeValue(e),
      this.bindToMotionValue(e, n),
      this.values.set(e, n),
      (this.latestValues[e] = n.get()));
  }
  removeValue(e) {
    this.values.delete(e);
    const n = this.valueSubscriptions.get(e);
    (n && (n(), this.valueSubscriptions.delete(e)),
      delete this.latestValues[e],
      this.removeValueFromRenderState(e, this.renderState));
  }
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, n) {
    if (this.props.values && this.props.values[e]) return this.props.values[e];
    let i = this.values.get(e);
    return (
      i === void 0 &&
        n !== void 0 &&
        ((i = wl(n === null ? void 0 : n, { owner: this })), this.addValue(e, i)),
      i
    );
  }
  readValue(e, n) {
    var i;
    let a =
      this.latestValues[e] !== void 0 || !this.current
        ? this.latestValues[e]
        : (i = this.getBaseTargetFromProps(this.props, e)) !== null && i !== void 0
          ? i
          : this.readValueFromInstance(this.current, e, this.options);
    return (
      a != null &&
        (typeof a == "string" && (U1(a) || M1(a))
          ? (a = parseFloat(a))
          : !Y4(a) && Vn.test(n) && (a = V1(e, n)),
        this.setBaseTarget(e, Vt(a) ? a.get() : a)),
      Vt(a) ? a.get() : a
    );
  }
  setBaseTarget(e, n) {
    this.baseTarget[e] = n;
  }
  getBaseTarget(e) {
    var n;
    const { initial: i } = this.props;
    let a;
    if (typeof i == "string" || typeof i == "object") {
      const s = ld(
        this.props,
        i,
        (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom,
      );
      s && (a = s[e]);
    }
    if (i && a !== void 0) return a;
    const l = this.getBaseTargetFromProps(this.props, e);
    return l !== void 0 && !Vt(l)
      ? l
      : this.initialValues[e] !== void 0 && a === void 0
        ? void 0
        : this.baseTarget[e];
  }
  on(e, n) {
    return (this.events[e] || (this.events[e] = new qf()), this.events[e].add(n));
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
}
class pv extends k4 {
  constructor() {
    (super(...arguments), (this.KeyframeResolver = L1));
  }
  sortInstanceNodePosition(e, n) {
    return e.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, n) {
    return e.style ? e.style[n] : void 0;
  }
  removeValueFromRenderState(e, { vars: n, style: i }) {
    (delete n[e], delete i[e]);
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    Vt(e) &&
      (this.childSubscription = e.on("change", (n) => {
        this.current && (this.current.textContent = `${n}`);
      }));
  }
}
function X4(t) {
  return window.getComputedStyle(t);
}
class K4 extends pv {
  constructor() {
    (super(...arguments), (this.type = "html"), (this.renderInstance = f1));
  }
  readValueFromInstance(e, n) {
    if (mi.has(n)) return n5(e, n);
    {
      const i = X4(e),
        a = (Jf(n) ? i.getPropertyValue(n) : i[n]) || 0;
      return typeof a == "string" ? a.trim() : a;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return ev(e, n);
  }
  build(e, n, i) {
    td(e, n, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, i) {
    return sd(e, n, i);
  }
}
class Z4 extends pv {
  constructor() {
    (super(...arguments),
      (this.type = "svg"),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = ft),
      (this.updateDimensions = () => {
        this.current && !this.renderState.dimensions && c1(this.current, this.renderState);
      }));
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (mi.has(n)) {
      const i = z1(n);
      return (i && i.default) || 0;
    }
    return ((n = d1.has(n) ? n : $f(n)), e.getAttribute(n));
  }
  scrapeMotionValuesFromProps(e, n, i) {
    return m1(e, n, i);
  }
  onBindTransform() {
    this.current && !this.renderState.dimensions && W.postRender(this.updateDimensions);
  }
  build(e, n, i) {
    id(e, n, this.isSVGTag, i.transformTemplate);
  }
  renderInstance(e, n, i, a) {
    h1(e, n, i, a);
  }
  mount(e) {
    ((this.isSVGTag = ad(e.tagName)), super.mount(e));
  }
}
const Q4 = (t, e) => (nd(t) ? new Z4(e) : new K4(e, { allowProjection: t !== w.exports.Fragment })),
  P4 = CT({ ...gA, ...N4, ...M4, ...j4 }, Q4),
  _t = Xx(P4),
  gv = w.exports.createContext(void 0),
  F4 = ({ children: t }) => {
    const [e, n] = w.exports.useState(1),
      [i, a] = w.exports.useState(!1);
    return D(gv.Provider, {
      value: { currentSlide: e, setCurrentSlide: n, showHeader: i, setShowHeader: a },
      children: t,
    });
  },
  $4 = () => {
    const t = w.exports.useContext(gv);
    if (t === void 0) throw new Error("useSlideContext must be used within a SlideProvider");
    return t;
  },
  gp = new URL("/static/assets/All_artist.jpg", self.location).href,
  yp = new URL("/static/assets/schedule.jpg", self.location).href,
  vp = new URL("/static/assets/fees1.jpg", self.location).href;
function J4() {
  const [t, e] = w.exports.useState({ width: window.innerWidth, height: window.innerHeight });
  return (
    w.exports.useEffect(() => {
      function n() {
        e({ width: window.innerWidth, height: window.innerHeight });
      }
      return (
        window.addEventListener("resize", n),
        n(),
        () => window.removeEventListener("resize", n)
      );
    }, []),
    t
  );
}
const W4 = O.section`
  height: 95vh; /* Maintain the height */
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    height: auto;
    min-height: 60vh;
    align-items: flex-start;
    padding-bottom: 70px;
    overflow: visible;
  }

  @media (max-width: 480px) {
    height: auto;
    min-height: 50vh;
    align-items: flex-start;
    padding-bottom: 60px;
    overflow: visible;
  }
`,
  I4 = O.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`,
  t3 = O(_t.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`,
  e3 = O(_t.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200%; /* Extra width to fit all slides */
  height: 100%;
`,
  iu = O(_t.div)`
  position: absolute;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  
  ${({ position: t }) =>
    t === "center"
      ? `
        left: 50%;
        transform: translateX(-50%) scale(1);
        z-index: 3;
        opacity: 1;
        width: 60%;
      `
      : t === "left"
        ? `
        left: 10%;
        transform: translateX(-50%) scale(0.7);
        z-index: 1;
        opacity: 0.7;
        width: 45%;
        filter: brightness(0.7);
      `
        : `
        left: 90%;
        transform: translateX(-50%) scale(0.7);
        z-index: 1;
        opacity: 0.7;
        width: 45%;
        filter: brightness(0.7);
      `}
`,
  au = O.div`
  width: 100%;
  height: 100%;
  background-image: url(${(t) => t.imageUrl});
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease;
`,
  n3 = O(_t.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(t) => t.imageUrl});
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: #000;
  z-index: 1;
`,
  i3 = O.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.3)
  );
  z-index: 2;
  opacity: 0.3;
`,
  a3 = O.div`
  position: relative;
  z-index: 3;
  text-align: center;
  max-width: 800px;
  padding: 20px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  /* Hidden by default since content moved to EventAnnouncement */
  display: none;

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 20px 15px;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.7);
  }

  @media (max-width: 480px) {
    max-width: 85%;
    padding: 15px 10px;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
  }
`,
  l3 = O.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 12px 16px;
  border-radius: 20px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 10px 14px;
    bottom: 15px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    bottom: 10px;
  }
`,
  s3 = O(_t.button)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(t) => (t.isActive ? "var(--primary-purple)" : "rgba(255, 255, 255, 0.6)")};
  border: 2px solid
    ${(t) => (t.isActive ? "var(--primary-purple)" : "rgba(255, 255, 255, 0.8)")};
  margin: 0 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  box-shadow: ${(t) => (t.isActive ? "0 0 8px rgba(106, 13, 173, 0.6)" : "0 2px 4px rgba(0, 0, 0, 0.2)")};
  opacity: ${(t) => (t.isActive ? 1 : 0.8)};

  &:hover {
    opacity: 1;
    transform: scale(1.3);
    box-shadow: 0 0 10px rgba(106, 13, 173, 0.8);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(106, 13, 173, 0.5);
  }

  @media (max-width: 480px) {
    width: 10px;
    height: 10px;
    margin: 0 3px;
    border-width: 1px;
  }
`,
  r3 = () => {
    const { setShowHeader: t } = $4(),
      [e, n] = w.exports.useState(1),
      i = 3,
      { width: a } = J4(),
      l = a <= 768,
      s = [
        { id: 1, imageUrl: gp },
        { id: 2, imageUrl: yp },
        { id: 3, imageUrl: vp },
      ],
      r = () => (e - 2 + i) % i,
      o = () => e - 1,
      u = () => e % i;
    (w.exports.useEffect(() => {
      t(!1);
      const f = setInterval(() => {
        c();
      }, 5e3);
      return () => clearInterval(f);
    }, [t]),
      w.exports.useEffect(() => {
        const f = () => {
          window.scrollY < 20 ? t(!1) : t(!0);
        };
        return (
          window.addEventListener("scroll", f),
          () => {
            window.removeEventListener("scroll", f);
          }
        );
      }, [t]));
    const c = () => {
      n((f) => (f === i ? 1 : f + 1));
    };
    return U(W4, {
      id: "home",
      children: [
        D(i3, {}),
        l
          ? D(xx, {
              mode: "wait",
              children: D(
                n3,
                {
                  imageUrl: e === 1 ? gp : e === 2 ? yp : vp,
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  transition: { duration: 0.5 },
                },
                `slide-${e}`,
              ),
            })
          : D(I4, {
              children: D(
                t3,
                {
                  initial: { opacity: 0.8 },
                  animate: { opacity: 1 },
                  transition: { duration: 0.5 },
                  children: U(e3, {
                    children: [
                      D(
                        iu,
                        {
                          isActive: !1,
                          position: "left",
                          onClick: () => {
                            n((f) => (f === 1 ? i : f - 1));
                          },
                          whileHover: { scale: 0.75, cursor: "pointer" },
                          children: D(au, { imageUrl: s[r()].imageUrl }),
                        },
                        `left-${s[r()].id}`,
                      ),
                      D(
                        iu,
                        {
                          isActive: !0,
                          position: "center",
                          children: D(au, { imageUrl: s[o()].imageUrl }),
                        },
                        `center-${s[o()].id}`,
                      ),
                      D(
                        iu,
                        {
                          isActive: !1,
                          position: "right",
                          onClick: c,
                          whileHover: { scale: 0.75, cursor: "pointer" },
                          children: D(au, { imageUrl: s[u()].imageUrl }),
                        },
                        `right-${s[u()].id}`,
                      ),
                    ],
                  }),
                },
                `carousel-${e}`,
              ),
            }),
        D(a3, {}),
        D(l3, {
          children: D("div", {
            style: { display: "flex", gap: "8px", alignItems: "center" },
            children: [...Array(i)].map((f, h) =>
              D(
                s3,
                {
                  isActive: e === h + 1,
                  onClick: () => n(h + 1),
                  whileHover: { scale: 1.2 },
                  whileTap: { scale: 0.9 },
                  "aria-label": `Go to slide ${h + 1}`,
                },
                h,
              ),
            ),
          }),
        }),
      ],
    });
  };
var yv = { color: void 0, size: void 0, className: void 0, style: void 0, attr: void 0 },
  bp = Dn.createContext && Dn.createContext(yv),
  o3 = ["attr", "size", "title"];
function u3(t, e) {
  if (t == null) return {};
  var n = c3(t, e),
    i,
    a;
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    for (a = 0; a < l.length; a++)
      ((i = l[a]),
        !(e.indexOf(i) >= 0) &&
          (!Object.prototype.propertyIsEnumerable.call(t, i) || (n[i] = t[i])));
  }
  return n;
}
function c3(t, e) {
  if (t == null) return {};
  var n = {};
  for (var i in t)
    if (Object.prototype.hasOwnProperty.call(t, i)) {
      if (e.indexOf(i) >= 0) continue;
      n[i] = t[i];
    }
  return n;
}
function Sp(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    (e &&
      (i = i.filter(function (a) {
        return Object.getOwnPropertyDescriptor(t, a).enumerable;
      })),
      n.push.apply(n, i));
  }
  return n;
}
function wr(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? Sp(Object(n), !0).forEach(function (i) {
          f3(t, i, n[i]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
        : Sp(Object(n)).forEach(function (i) {
            Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i));
          });
  }
  return t;
}
function f3(t, e, n) {
  return (
    (e = d3(e)),
    e in t
      ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (t[e] = n),
    t
  );
}
function d3(t) {
  var e = h3(t, "string");
  return typeof e == "symbol" ? e : e + "";
}
function h3(t, e) {
  if (typeof t != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function vv(t) {
  return t && t.map((e, n) => Dn.createElement(e.tag, wr({ key: n }, e.attr), vv(e.child)));
}
function Ta(t) {
  return (e) => D(m3, { attr: wr({}, t.attr), ...e, children: vv(t.child) });
}
function m3(t) {
  var e = (n) => {
    var { attr: i, size: a, title: l } = t,
      s = u3(t, o3),
      r = a || n.size || "1em",
      o;
    return (
      n.className && (o = n.className),
      t.className && (o = (o ? o + " " : "") + t.className),
      U("svg", {
        stroke: "currentColor",
        fill: "currentColor",
        strokeWidth: "0",
        ...n.attr,
        ...i,
        ...s,
        className: o,
        style: wr(wr({ color: t.color || n.color }, n.style), t.style),
        height: r,
        width: r,
        xmlns: "http://www.w3.org/2000/svg",
        children: [l && D("title", { children: l }), t.children],
      })
    );
  };
  return bp !== void 0 ? D(bp.Consumer, { children: (n) => e(n) }) : e(yv);
}
function xp(t) {
  return Ta({
    tag: "svg",
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z",
        },
        child: [],
      },
    ],
  })(t);
}
function p3(t) {
  return Ta({
    tag: "svg",
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z",
        },
        child: [],
      },
    ],
  })(t);
}
function g3(t) {
  return Ta({
    tag: "svg",
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z",
        },
        child: [],
      },
    ],
  })(t);
}
function Tp(t) {
  return Ta({
    tag: "svg",
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z",
        },
        child: [],
      },
    ],
  })(t);
}
function lu(t) {
  return Ta({
    tag: "svg",
    attr: { viewBox: "0 0 384 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z",
        },
        child: [],
      },
    ],
  })(t);
}
function Ap(t) {
  return Ta({
    tag: "svg",
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z",
        },
        child: [],
      },
    ],
  })(t);
}
const E3 = O.section`
  padding: 5rem 0;
  background-color: var(--secondary-white);
  position: relative;

  @media (max-width: 768px) {
    padding: 4rem 0;
  }

  @media (max-width: 480px) {
    padding: 3rem 0;
  }
`,
  M3 = O.h2`
  text-align: center;
  margin-bottom: 4rem;
  color: var(--primary-purple);
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: var(--primary-purple);
  }
`,
  D3 = O.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 3rem;
  margin-bottom: 4rem; /* Add space between sections */

  @media (max-width: 768px) {
    padding: 0 2rem;
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
    overflow-x: hidden;
  }
`,
  w3 = O.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: minmax(260px, 1fr);
    max-width: 400px;
    margin: 0 auto;
    gap: 1.5rem;
  }
`,
  zc = O.div`
  background-color: var(--primary-white);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(106, 13, 173, 0.08);
  display: flex;
  flex-direction: column;
  height: 420px; /* Better size for desktop */
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(106, 13, 173, 0.15);
  }

  @media (max-width: 768px) {
    height: 580px; /* Keep original height for mobile */
    &:hover {
      transform: none; /* No hover effect on mobile */
    }
  }
`,
  C3 = O.div`
  flex: 0 0 70%; /* Takes up 70% of the card height on desktop - better proportion */
  overflow: hidden;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  padding: 0;

  @media (max-width: 768px) {
    flex: 0 0 85%; /* Keep original height ratio for mobile */
  }
`,
  R3 = O.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Fills the entire container */
  transition: transform 0.5s ease;

  ${zc}:hover & {
    transform: scale(1.05); /* Subtle zoom effect on hover for desktop */
  }

  @media (max-width: 768px) {
    ${zc}:hover & {
      transform: none; /* No zoom effect on mobile */
    }
  }
`,
  O3 = O.div`
  padding: 1rem 1.25rem;
  flex: 1; /* Takes remaining space */
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem; /* Keep original padding for mobile */
  }
`,
  z3 = O.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`,
  V3 = O.h3`
  color: var(--primary-purple);
  font-size: 1.2rem;
  margin: 0;
`,
  _3 = O.span`
  color: var(--text-dark);
  font-size: 0.9rem;
  font-weight: 500;
`,
  B3 = O.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
`,
  U3 = O.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`,
  Dp = O.div`
  display: flex;
  align-items: center;
  color: var(--text-dark);
  font-size: 0.8rem;

  svg {
    color: var(--primary-purple);
    margin-right: 0.3rem;
    font-size: 0.9rem;
  }
`,
  N3 = O.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--primary-purple);
  text-align: center;
  margin-bottom: 0.1rem;
`,
  j3 = O.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
  margin-top: -0.5rem; /* Better vertical alignment */
  padding-top: 0.2rem;

  @media (max-width: 768px) {
    margin-top: -1rem; /* Keep original alignment for mobile */
  }
`,
  H3 = O.button`
  background-color: var(--primary-purple);
  color: var(--primary-white);
  border: none;
  padding: 0.5rem 1.2rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;

  &:hover {
    background-color: #5a0b96;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(90, 11, 150, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`,
  L3 = () => {
    const [sections, setSections] = w.exports.useState([]);
    w.exports.useEffect(() => {
      fetch("/api/sections")
        .then((response) => response.json())
        .then((data) => setSections(data))
        .catch((error) => {
          console.error("Error loading sections:", error);
          setSections([]);
        });
    }, []);
    const t = (e) => {
      const n = `Hi, I'm interested for ${e.style} by ${e.artist} on ${e.date.replace(", 2025", "")} ${e.time}.`,
        i = `https://wa.me/917338003939?text=${encodeURIComponent(n)}`;
      window.open(i, "_blank");
    };
    return U(E3, {
      id: "workshops",
      style: { backgroundColor: "black" },
      children: [].concat(...sections.map(section => [
        D(M3, { children: section.title }),
        D(D3, {
          children: D(w3, {
            children: section.items.map((e) =>
              U(
                zc,
                {
                  children: [
                    D(C3, { children: D(R3, { src: e.image, alt: e.style }) }),
                    " ",
                    U(O3, {
                      children: [
                        U(z3, {
                          children: [
                            D(V3, { children: e.style }),
                            U(_3, { children: ["by ", e.artist] }),
                          ],
                        }),
                        " ",
                        U(B3, {
                          children: [
                            U(U3, {
                              children: [
                                U(Dp, { children: [D(p3, {}), D("span", { children: e.date })] }),
                                U(Dp, { children: [D(g3, {}), D("span", { children: e.time })] }),
                              ],
                            }),
                            U(j3, {
                              children: [
                                D(N3, { children: e.price }),
                                D(H3, { onClick: () => t(e), children: "Register Now" }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                },
                e.id,
              ),
            ),
          }),
        }),
      ]))
    });
  },
  Y3 = O.section`
  padding: 4rem 0;
  background: #000000;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      rgba(106, 13, 173, 0.2),
      transparent 70%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 3rem 0;
  }

  @media (max-width: 480px) {
    padding: 2.5rem 0;
  }
`,
  G3 = O.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`,
  q3 = O(_t.h2)`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
`,
  k3 = O(_t.p)`
  font-size: 1.4rem;
  color: white;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1.2rem;
  }
`,
  X3 = O(_t.div)`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: rgba(106, 13, 173, 0.9);
  color: white;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    padding: 0.7rem 1.2rem;
    font-size: 1rem;
  }
`,
  K3 = () =>
    D(Y3, {
      children: U(G3, {
        children: [
          D(q3, {
            variants: {
              hidden: { opacity: 0, y: -30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
              },
            },
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: !0, amount: 0.3 },
            children: "Namma Dance Week is here, Bengaluru!",
          }),
          D(k3, {
            variants: {
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.5 } },
            },
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: !0, amount: 0.3 },
            children: "\u{1F483} 11 Artists, 1 Celebrity Guest. Infinite Vibe.",
          }),
          D(X3, {
            variants: {
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut", delay: 0.8 },
              },
            },
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: !0, amount: 0.3 },
            children: "Showcase: June 15th",
          }),
        ],
      }),
    }),
  Z3 = O.section`
  background: linear-gradient(135deg, #000000, #1a0033, #2d004d, #000000);
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;
  padding: 2.5rem 1rem;
  position: relative;
  overflow: hidden;
  
  @keyframes gradientAnimation {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at top right, rgba(106, 13, 173, 0.4), transparent 60%),
      radial-gradient(circle at bottom left, rgba(153, 50, 204, 0.3), transparent 60%),
      radial-gradient(circle at center, rgba(75, 0, 130, 0.2), transparent 70%);
    pointer-events: none;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.5) 100%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 2rem 0.8rem;
  }
`,
  Q3 = O(_t.h2)`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #ffffff;
  font-size: 2rem;
  text-shadow: 0 0 15px rgba(153, 50, 204, 0.7);
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 2px;
    background: linear-gradient(to right, transparent, #9932CC, #6A0DAD, #9932CC, transparent);
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`,
  su = O(_t.p)`
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.3rem;
  color: #f0f0f0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.02em;
  
  strong {
    color: #d8b5ff;
    font-weight: 600;
  }
`,
  P3 = O(_t.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin: 1rem 0;
  color: #ffffff;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 2;
  
  > div {
    flex: 1 1 calc(33% - 1rem);
    min-width: 240px;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    font-size: 0.9rem;
    background: linear-gradient(135deg, rgba(106, 13, 173, 0.3), rgba(75, 0, 130, 0.2));
    padding: 0.7rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    border: 1px solid rgba(153, 50, 204, 0.4);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 0 3px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(3px);
    
    &:hover {
      background: linear-gradient(135deg, rgba(153, 50, 204, 0.4), rgba(106, 13, 173, 0.3));
      transform: translateY(-2px);
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.4), inset 0 0 5px rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(153, 50, 204, 0.6);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    
    > div {
      min-width: unset;
      font-size: 0.85rem;
      padding: 0.6rem 1rem;
    }
  }
`,
  F3 = () =>
    U(Z3, {
      children: [
        D(Q3, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          children: "Namma Dance Week Showcase",
        }),
        D(su, {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          transition: { duration: 0.6, delay: 0.2 },
          children:
            "On June 15th, we wrap up Namma Dance Week with a night you won't forget \u2014 a grand stage showcase featuring:",
        }),
        U(P3, {
          children: [
            D(_t.div, {
              initial: { opacity: 0, scale: 0.95 },
              whileInView: { opacity: 1, scale: 1 },
              transition: { duration: 0.5, delay: 0.3 },
              children: "\u2728 Incredible performances by individual artists",
            }),
            D(_t.div, {
              initial: { opacity: 0, scale: 0.95 },
              whileInView: { opacity: 1, scale: 1 },
              transition: { duration: 0.5, delay: 0.4 },
              children: "\u{1F525} Select students chosen during the week-long workshops",
            }),
            D(_t.div, {
              initial: { opacity: 0, scale: 0.95 },
              whileInView: { opacity: 1, scale: 1 },
              transition: { duration: 0.5, delay: 0.5 },
              children: "\u{1F3B6} A vibrant mix of styles, stories, and raw talent",
            }),
          ],
        }),
        D(su, {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          transition: { duration: 0.6, delay: 0.6 },
          children:
            "This is not just a performance \u2014 it's a celebration of movement, identity, and the spirit of Bengaluru. From high-energy street styles to soulful contemporary, each act reflects a journey, a vibe, and a bold expression of dance.",
        }),
        "      ",
        U(su, {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          transition: { duration: 0.6, delay: 0.7 },
          style: { fontStyle: "italic", marginTop: "0.7rem", fontSize: "0.9rem", opacity: 0.95 },
          children: [
            "Whether you're a ",
            D("strong", { children: "fellow dancer" }),
            ", a proud friend, or someone who just loves watching ",
            D("strong", { children: "passion come alive" }),
            " on stage \u2014 this evening is for you.",
          ],
        }),
      ],
    }),
  $3 = O.footer`
  background-color: black;
  color: #fff;
  padding: 5rem 0 2rem;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      var(--primary-purple),
      transparent
    );
  }

  @media (max-width: 768px) {
    padding: 3rem 0 1.5rem;
  }
  @media (max-width: 480px) {
    padding: 0.5rem 0 1rem;
    max-height: 20vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`,
  J3 = O.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
    grid-template-columns: 1fr;
    gap: 0.5rem;
    display: none; /* Hide the detailed content on mobile */
  }
`,
  ru = O.div`
  display: flex;
  flex-direction: column;
`,
  W3 = O.div`
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.8rem;
    color: var(--primary-purple);
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    opacity: 0.8;
    color: white;
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 1.6rem;
    }
  }
`,
  ou = O.h3`
  color: #fff;
  background: #000;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 0.5rem;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: var(--primary-purple);
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 1.2rem;
  }
`,
  uu = O.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;

  svg {
    color: var(--primary-purple);
    margin-right: 0.8rem;
    margin-top: 0.2rem;
    font-size: 1.1rem;
  }
`,
  Ua = O.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: white;
`,
  I3 = O.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`,
  cu = O.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  color: white;

  span:first-child {
    font-weight: 500;
    color: white;
  }

  span:last-child {
    color: var(--primary-purple);
  }
`,
  tE = O.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`,
  eE = O(_t.a)`
  display: flex;
  align-items: center;
  padding: 0 15px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(106, 13, 173, 0.1);
  color: var(--primary-purple);
  border: 1px solid rgba(106, 13, 173, 0.3);
  transition: all 0.3s ease;
  text-decoration: none;

  svg {
    margin-right: 8px;
  }

  span {
    font-size: 0.9rem;
    font-weight: 500;
  }

  &:hover {
    background-color: var(--primary-purple);
    color: var(--primary-white);
  }
`,
  nE = O.form`
  margin-top: 1rem;
`,
  iE = O(_t.button)`
  width: 100%;
  padding: 0.8rem;
  background-color: var(--primary-purple);
  color: var(--primary-white);
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: var(--dark-purple);
  }
`,
  aE = O.div`
  max-width: 1200px;
  margin: 3rem auto 0;
  padding: 1.5rem 2rem 0;
  border-top: 1px solid rgba(106, 13, 173, 0.3);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);

  @media (max-width: 480px) {
    margin: 0 auto;
    padding: 0.5rem 1rem;
    border-top: none;
    font-size: 0.7rem;
  }
`,
  fu = O.div`
  display: none;
  @media (max-width: 480px) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    margin: 0.8rem 0 0.5rem;
  }
`,
  Ts = O.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.9);

  svg {
    color: var(--primary-purple);
    margin-right: 0.4rem;
    font-size: 0.8rem;
  }
`,
  lE = () => {
    const t = new Date().getFullYear();
    return U($3, {
      id: "contact",
      children: [
        U(J3, {
          children: [
            U(ru, {
              children: [
                U(W3, {
                  children: [
                    D("h2", { children: "RTRIBE Dance Studio" }),
                    D("p", { children: "Namma Dance Week 2025" }),
                  ],
                }),
                U(uu, {
                  children: [
                    D(lu, {}),
                    U(Ua, {
                      children: [
                        "RTRIBE Dance and Wellness Space",
                        D("br", {}),
                        "Cauvery Colony, Next to DMART",
                        D("br", {}),
                        "Koramangala, Bengaluru",
                      ],
                    }),
                  ],
                }),
                U(uu, { children: [D(Ap, {}), D(Ua, { children: "7338003939 / 7892547215" })] }),
                U(uu, { children: [D(Tp, {}), D(Ua, { children: "beinrtribe@gmail.com" })] }),
                " ",
                D(tE, {
                  children: U(eE, {
                    href: "https://www.instagram.com/beinrtribe/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.98 },
                    children: [D(xp, {}), D("span", { children: "Follow us on Instagram" })],
                  }),
                }),
              ],
            }),
            " ",
            U(ru, {
              children: [
                D(ou, { children: "Workshop Hours" }),
                U(I3, {
                  children: [
                    U(cu, {
                      children: [
                        D("span", { children: "Morning Sessions" }),
                        D("span", { children: "11:00 AM - 1:00 PM" }),
                      ],
                    }),
                    U(cu, {
                      children: [
                        D("span", { children: "Afternoon Sessions" }),
                        D("span", { children: "2:00 PM - 5:00 PM" }),
                      ],
                    }),
                    U(cu, {
                      children: [
                        D("span", { children: "Evening Sessions" }),
                        D("span", { children: "7:00 PM - 9:00 PM" }),
                      ],
                    }),
                  ],
                }),
                D(ou, { style: { marginTop: "2rem" }, children: "Special Event" }),
                U(Ua, {
                  children: [
                    "NAMMA Dance Week",
                    D("br", {}),
                    "June 8th - 15th, 2025",
                    D("br", {}),
                    "Students get a chance to perform with teachers on 15th June",
                  ],
                }),
              ],
            }),
            " ",
            U(ru, {
              children: [
                D(ou, { children: "Register for Workshops" }),
                D(Ua, {
                  children:
                    "Stay updated with our upcoming workshops, performances, and special events. Join us for an incredible dance experience with top artists.",
                }),
                D(nE, {
                  onSubmit: (n) => {
                    n.preventDefault();
                    const a = `https://wa.me/917338003939?text=${encodeURIComponent("RTRIBE Workshop Inquiry. Please share workshop details.")}`;
                    window.open(a, "_blank");
                  },
                  children: D(iE, {
                    type: "submit",
                    whileHover: { scale: 1.02 },
                    whileTap: { scale: 0.98 },
                    children: "Register Now",
                  }),
                }),
              ],
            }),
          ],
        }),
        " ",
        D(fu, {
          style: { paddingTop: "1rem" },
          children: U(Ts, {
            children: [D(lu, {}), D("span", { children: "RTRIBE Dance Studio, Koramangala" })],
          }),
        }),
        " ",
        D(aE, {
          children: U("div", {
            children: ["\xA9 ", t, " RTRIBE Dance Studio. All rights reserved."],
          }),
        }),
        " ",
        U(fu, {
          children: [
            U(Ts, {
              children: [D(lu, {}), "Cauvery Colony, Next to DMART Koramangala, Bengaluru"],
            }),
            U(Ts, { children: [D(Ap, {}), "7338003939"] }),
            " ",
            U(Ts, { children: [D(Tp, {}), "beinrtribe@gmail.com"] }),
          ],
        }),
        D(fu, {
          children: U("a", {
            href: "https://www.instagram.com/beinrtribe/",
            target: "_blank",
            rel: "noopener noreferrer",
            style: {
              color: "var(--primary-purple)",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              gap: "0.5rem",
              textDecoration: "none",
              fontWeight: 500,
              marginBottom: "1rem",
            },
            children: [D(xp, {}), D("span", { children: "Follow us on Instagram" })],
          }),
        }),
      ],
    });
  },
  sE = "/static/assets/log.gif";
function rE() {
  const [t, e] = w.exports.useState(!0);
  return (
    w.exports.useEffect(() => {
      const n = setTimeout(() => {
        e(!1);
      }, 1500);
      return () => clearTimeout(n);
    }, []),
    t
      ? D("div", {
          className: "loading-screen",
          children: U("div", {
            className: "loading-content",
            children: [
              D("h1", { children: "NAMMA Dance Week" }),
              "          ",
              D("p", {
                style: { color: "var(--primary-purple)", marginBottom: "1.5rem" },
                children: "Rtribe Dance Studio",
              }),
              D("div", {
                className: "loading-spinner",
                children: D("img", { src: sE, alt: "Loading...", className: "loading-gif" }),
              }),
            ],
          }),
        })
      : D(F4, {
          children: U("div", {
            className: "app",
            children: [
              U("main", { children: [D(r3, {}), D(K3, {}), D(L3, {}), D(F3, {})] }),
              D(lE, {}),
            ],
          }),
        })
  );
}
_p.exports
  .createRoot(document.getElementById("root"))
  .render(D(w.exports.StrictMode, { children: D(rE, {}) }));
//# sourceMappingURL=index.699c97c3.js.map
