// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"kaMWP":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4f76b2f7f16ff2b3";
module.bundle.HMR_BUNDLE_ID = "47e204352d5519ee";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"12Gnz":[function(require,module,exports) {
/* eslint-disable */ var _esRegexpFlagsJs = require("core-js/modules/es.regexp.flags.js");
var _esTypedArraySetJs = require("core-js/modules/es.typed-array.set.js");
var _webImmediateJs = require("core-js/modules/web.immediate.js");
var _login = require("./login");
var _forgotPassword = require("./forgotPassword");
var _resetPassword = require("./resetPassword");
var _signUp = require("./signUp");
var _updateSettings = require("./updateSettings");
var _mapbox = require("./mapbox");
var _stripe = require("./stripe");
var _darkreader = require("darkreader");
// DOM elements
const mapBox = document.getElementById("map");
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector(".nav__el--logout");
const signupForm = document.querySelector(".form--signup");
const resetPasswordForm = document.querySelector(".form--resetPassword");
const forgotPasswordForm = document.querySelector(".form--forgotPassword");
const userDataForm = document.querySelector(".form-user-data");
const userPasswordForm = document.querySelector(".form-user-password");
const fileInput = document.querySelector(".form__upload");
const bookBtn = document.getElementById("book-tour");
const darkModeButton = document.getElementById("dark-mode-button");
// Retrieve user preference from localStorage
const userPreference = localStorage.getItem("darkMode");
if (userPreference === "enabled") {
    (0, _darkreader.enable)({
        brightness: 100,
        contrast: 90,
        sepia: 10
    });
    darkModeButton.classList.add("active");
}
darkModeButton.addEventListener("click", toggleDarkMode);
function toggleDarkMode() {
    console.log("Dark mode clicked");
    if ((0, _darkreader.isEnabled)()) {
        (0, _darkreader.disable)();
        darkModeButton.classList.remove("active");
        // Remove user preference from localStorage
        localStorage.removeItem("darkMode");
    } else {
        (0, _darkreader.enable)({
            brightness: 100,
            contrast: 90,
            sepia: 10
        });
        darkModeButton.classList.add("active");
        // Save user preference to localStorage
        localStorage.setItem("darkMode", "enabled");
    }
}
// Delegation
if (mapBox) {
    const locations = JSON.parse(document.getElementById("map").dataset.locations);
    (0, _mapbox.displayMap)(locations);
}
if (signupForm) signupForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    document.querySelector(".btn--green").textContent = "Loading...";
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password_confirm = document.getElementById("password-confirm").value;
    await (0, _signUp.signUp)(name, email, password, password_confirm);
    document.querySelector(".btn--green").textContent = "Signup";
});
if (forgotPasswordForm) forgotPasswordForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    await (0, _forgotPassword.forgotPassword)(email);
});
if (resetPasswordForm) resetPasswordForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const password = document.getElementById("password").value;
    const password_confirm = document.getElementById("password-confirm").value;
    const url = window.location.href;
    const regex = /\/resetPassword\/(.+)/;
    const match = url.match(regex);
    const token = match ? match[1] : null;
    console.log(token);
    await (0, _resetPassword.resetPassword)(password, password_confirm, token);
});
if (loginForm) loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    // Values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    (0, _login.login)(email, password);
});
if (logOutBtn) logOutBtn.addEventListener("click", (0, _login.logout));
// Adding Image Uploads to Form: So let's now allow users to upload their photos right on our website. And so this is what we want. When we click here, we basically want to open a new window for which we can select a new image to upload and then when we click this button and submit a form of course then we want to upload that image into our backend and update the user, right. And so the first step into doing that will be to add a new input element to our html. So basically to our pug template which will then allow that file selector. So right now we have that link here which says new photo. But of course, it's not a link that we're going to use. So this was really just a placeholder. And so let's get rid of it. So what we need is an input of type file. We can then specify which kind of file we actually accept. And we can do something like this. Image and then all of them. So basically all formats get their images so which have a mimetype starting with image are accepted here. And now also giving it an ID so that we can then select it in java script. Add that as photo and finally just like the other fields, we also give it a name. So name of photo as well. And of course it is photo because that's the name that we have in our user document and it's also the field name that multer is expecting. So this here is upload and then we also specify a label for it. And we set it to the ID of the input element, all right. So the way it happens is that when we click this label here, it will then actually activate the input element which has the ID that we specify here in form. And so in that case that is the photo, all right. And so when we then click the label it will then activate this input which in turn will open up the window from which we can select a file. And so that's all we need to do for the input here. Now, just like before, there are two possible ways of sending this data to the server. So first, without the API as we did in one previous lecture. We already find the action that we want to take and also the method. And with that the data is then directly sent to the server. Now if we wanted to send a file using this method, we then would need to specify another option here.
// And that is the enc type. So enc type would have to be multi-part form data. So multi-part slash form data, all right. And so here again, we have this name multi-part. And so as we said before, multi-part is always for sending files to the server. And again we actually need the multer middleware to handle this multi-part form data, all right. And actually the name multer comes from multi-part. Anyway again if we wanted to send the data without an API, we would always have to specify this enc type. Otherwise the form would simply ignore the file and not send it, okay. But as we already know, we are actually using it with the API, right. And so we do not need to specify this enc type but we will kind of have to do it programmatically.And so we need to now open in our public folder and from their js, we open up index.js. And so right here is where we actually send the data to be updated on the server. Well we're not really sending them here but we're selecting them from the form and then passing them into update settings. All right, but now remember how I said that we kind of needed to programmatically recreate a multi-part form data? And so we need to do it like this. Let's call it form and then new form data. All right, and now onto that form we need to keep appending new data. And basically one append for each of the data that we want to send. So form.append and the first one is the name. So we specify name here and then the value of the name. We then pass the form, okay. And our ajax call using axios will then actually recognize this form here as an object and will work just the same as it did before, okay. So here in update settings where we pass in the data, which is then passed in here into the axios request, we do not need to change anything. All right, so this is equivalent to what we had before with name and email but now of course let's also add the photo which is the entire reason why we now have to do it like this.
// So form.append again then the name we want to give it is of course again, photo and then document .getelementbyid which is also photo but now it is not .value but instead .files, all right. And these files are actually in array and so since there's only one, we need to select that first element in the array and so that's zero. But in a nutshell, as I said before, we basically recreate this multi-part form data. And so that's actually why it's called form data is because, well, that form data is also here in this multi-part enc type, okay.
if (userDataForm) userDataForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    //  const photo = document.getElementById('photo').files[0];
    //  Adding Image uploads to Form:
    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    //  form.append('photo', photo);
    await (0, _updateSettings.updateSettings)(form, "Data");
//  const userUploadedFile = form.get('photo');
//  if (userUploadedFile.type === 'image/jpeg') {
//    userPhotoCurrent.setAttribute(
//      'src',
//      `img/users/${userUploadedFile.name}`,
//    );
//    userPhotoIconCurrent.setAttribute(
//      'src',
//      `img/users/${userUploadedFile.name}`,
//    );
//    console.log('👛', userUploadedFile, 'You have changed your picture');
//  }
});
if (userPasswordForm) userPasswordForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let btnText = document.querySelector(".btn--save-password");
    btnText.textContent = "Updating...";
    let passwordCurrent = document.getElementById("password-current").value;
    let password = document.getElementById("password").value;
    let passwordConfirm = document.getElementById("password-confirm").value;
    (0, _updateSettings.updateSettings)({
        passwordCurrent,
        password,
        passwordConfirm
    }, "Password");
    btnText.textContent = "Save password";
    userPasswordForm.reset();
});
// In Jonas solution there is the problem we discuss here: The page does not show an image preview, after the user selected an image in the file explorer. The user could think "Oh man, this page is not working as expected" and leaves without clicking "Save settings". Because of this I think it would be right to use the approach of adding an extra event listener like @CatNug did, as this event listener only will be initialized, if an element with class .form__upload exists. Instead of requiring the user to press "Save Settings" after choosing a photo, we can immediatly update the user photo through an API Call and use the updated photo in our response, to show it (this way, the preview will look equal to the image uploaded to our server). Doing it this way, I have to mention that we should not send the whole user data in our request, as this could also lead to potential errors and seperate them instead (like we already do with updating password).
if (fileInput) fileInput.addEventListener("change", async (e)=>{
    const form = new FormData();
    form.append("photo", document.getElementById("photo").files[0]);
    // Take care of the type attribute being photo
    const newImage = await (0, _updateSettings.updateSettings)(form, "Photo");
    if (newImage) {
        document.querySelector(".nav__user-img").setAttribute("src", `/img/users/${newImage}`);
        document.querySelector(".form__user-photo").setAttribute("src", `/img/users/${newImage}`);
    }
});
// Preview for the selected photo
// const filetag = document.querySelector('#photo');
// const preview = document.querySelector('.form__user-photo');
// const readURL = (input) => {
//   if (input.files && input.files[0]) {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       preview.setAttribute('src', e.target.result);
//     };
//     reader.readAsDataURL(input.files[0]);
//   }
// };
// if (filetag && preview) {
//   filetag.addEventListener('change', function () {
//     readURL(this);
//   });
// }
if (bookBtn) bookBtn.addEventListener("click", (e)=>{
    e.target.textContent = "Processing...";
    const { tourId } = e.target.dataset;
    (0, _stripe.bookTour)(tourId);
});

},{"core-js/modules/es.regexp.flags.js":"6YREB","core-js/modules/es.typed-array.set.js":"3sYi1","core-js/modules/web.immediate.js":"hgmr1","./login":"77gdj","./forgotPassword":"dfCfX","./resetPassword":"9Jdvy","./signUp":"aDfie","./updateSettings":"3TrB0","./mapbox":"7GOmF","./stripe":"1YW63","darkreader":"crvWe"}],"6YREB":[function(require,module,exports) {
"use strict";
var global = require("c6bf5eee641c0bcc");
var DESCRIPTORS = require("32574bd865b8e6e5");
var defineBuiltInAccessor = require("ba3ead2b02aa5c9b");
var regExpFlags = require("67e6b6bed174b69b");
var fails = require("f4050f72fe5dda92");
// babel-minify and Closure Compiler transpiles RegExp('.', 'd') -> /./d and it causes SyntaxError
var RegExp = global.RegExp;
var RegExpPrototype = RegExp.prototype;
var FORCED = DESCRIPTORS && fails(function() {
    var INDICES_SUPPORT = true;
    try {
        RegExp(".", "d");
    } catch (error) {
        INDICES_SUPPORT = false;
    }
    var O = {};
    // modern V8 bug
    var calls = "";
    var expected = INDICES_SUPPORT ? "dgimsy" : "gimsy";
    var addGetter = function(key, chr) {
        // eslint-disable-next-line es/no-object-defineproperty -- safe
        Object.defineProperty(O, key, {
            get: function() {
                calls += chr;
                return true;
            }
        });
    };
    var pairs = {
        dotAll: "s",
        global: "g",
        ignoreCase: "i",
        multiline: "m",
        sticky: "y"
    };
    if (INDICES_SUPPORT) pairs.hasIndices = "d";
    for(var key in pairs)addGetter(key, pairs[key]);
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var result = Object.getOwnPropertyDescriptor(RegExpPrototype, "flags").get.call(O);
    return result !== expected || calls !== expected;
});
// `RegExp.prototype.flags` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
if (FORCED) defineBuiltInAccessor(RegExpPrototype, "flags", {
    configurable: true,
    get: regExpFlags
});

},{"c6bf5eee641c0bcc":"OQn0B","32574bd865b8e6e5":"b2lTm","ba3ead2b02aa5c9b":"jUJfx","67e6b6bed174b69b":"87Bck","f4050f72fe5dda92":"bqKbF"}],"OQn0B":[function(require,module,exports) {
var global = arguments[3];
"use strict";
var check = function(it) {
    return it && it.Math === Math && it;
};
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == "object" && self) || check(typeof global == "object" && global) || // eslint-disable-next-line no-new-func -- fallback
function() {
    return this;
}() || this || Function("return this")();

},{}],"b2lTm":[function(require,module,exports) {
"use strict";
var fails = require("735b783268fd06c0");
// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, {
        get: function() {
            return 7;
        }
    })[1] !== 7;
});

},{"735b783268fd06c0":"bqKbF"}],"bqKbF":[function(require,module,exports) {
"use strict";
module.exports = function(exec) {
    try {
        return !!exec();
    } catch (error) {
        return true;
    }
};

},{}],"jUJfx":[function(require,module,exports) {
"use strict";
var makeBuiltIn = require("5bd1cd8472955124");
var defineProperty = require("1413185c6323bbbc");
module.exports = function(target, name, descriptor) {
    if (descriptor.get) makeBuiltIn(descriptor.get, name, {
        getter: true
    });
    if (descriptor.set) makeBuiltIn(descriptor.set, name, {
        setter: true
    });
    return defineProperty.f(target, name, descriptor);
};

},{"5bd1cd8472955124":"iTZLl","1413185c6323bbbc":"aNgPS"}],"iTZLl":[function(require,module,exports) {
"use strict";
var uncurryThis = require("ca84677f1ebd1804");
var fails = require("13360f2842eba261");
var isCallable = require("103e488c0928755a");
var hasOwn = require("cbf9b0e0779cc368");
var DESCRIPTORS = require("3f2eb7efeae2f72b");
var CONFIGURABLE_FUNCTION_NAME = require("548b10f284264c72").CONFIGURABLE;
var inspectSource = require("358f00f3103bd55b");
var InternalStateModule = require("9b2ce14119fd2412");
var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis("".slice);
var replace = uncurryThis("".replace);
var join = uncurryThis([].join);
var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function() {
    return defineProperty(function() {}, "length", {
        value: 8
    }).length !== 8;
});
var TEMPLATE = String(String).split("String");
var makeBuiltIn = module.exports = function(value, name, options) {
    if (stringSlice($String(name), 0, 7) === "Symbol(") name = "[" + replace($String(name), /^Symbol\(([^)]*)\)/, "$1") + "]";
    if (options && options.getter) name = "get " + name;
    if (options && options.setter) name = "set " + name;
    if (!hasOwn(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
        if (DESCRIPTORS) defineProperty(value, "name", {
            value: name,
            configurable: true
        });
        else value.name = name;
    }
    if (CONFIGURABLE_LENGTH && options && hasOwn(options, "arity") && value.length !== options.arity) defineProperty(value, "length", {
        value: options.arity
    });
    try {
        if (options && hasOwn(options, "constructor") && options.constructor) {
            if (DESCRIPTORS) defineProperty(value, "prototype", {
                writable: false
            });
        } else if (value.prototype) value.prototype = undefined;
    } catch (error) {}
    var state = enforceInternalState(value);
    if (!hasOwn(state, "source")) state.source = join(TEMPLATE, typeof name == "string" ? name : "");
    return value;
};
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
    return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, "toString");

},{"ca84677f1ebd1804":"in40Y","13360f2842eba261":"bqKbF","103e488c0928755a":"2Y1pk","cbf9b0e0779cc368":"5CrDz","3f2eb7efeae2f72b":"b2lTm","548b10f284264c72":"hUfjJ","358f00f3103bd55b":"el6v3","9b2ce14119fd2412":"fODXn"}],"in40Y":[function(require,module,exports) {
"use strict";
var NATIVE_BIND = require("829dd7a4e960cf9e");
var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);
module.exports = NATIVE_BIND ? uncurryThisWithBind : function(fn) {
    return function() {
        return call.apply(fn, arguments);
    };
};

},{"829dd7a4e960cf9e":"id5kE"}],"id5kE":[function(require,module,exports) {
"use strict";
var fails = require("2642aa7619056f20");
module.exports = !fails(function() {
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var test = (function() {}).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != "function" || test.hasOwnProperty("prototype");
});

},{"2642aa7619056f20":"bqKbF"}],"2Y1pk":[function(require,module,exports) {
"use strict";
var $documentAll = require("ca3b3b4ae4b8328f");
var documentAll = $documentAll.all;
// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = $documentAll.IS_HTMLDDA ? function(argument) {
    return typeof argument == "function" || argument === documentAll;
} : function(argument) {
    return typeof argument == "function";
};

},{"ca3b3b4ae4b8328f":"8Kbiy"}],"8Kbiy":[function(require,module,exports) {
"use strict";
var documentAll = typeof document == "object" && document.all;
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll == "undefined" && documentAll !== undefined;
module.exports = {
    all: documentAll,
    IS_HTMLDDA: IS_HTMLDDA
};

},{}],"5CrDz":[function(require,module,exports) {
"use strict";
var uncurryThis = require("f5dcaa60a713971f");
var toObject = require("ab17c4f45fcf0841");
var hasOwnProperty = uncurryThis({}.hasOwnProperty);
// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject(it), key);
};

},{"f5dcaa60a713971f":"in40Y","ab17c4f45fcf0841":"cPubR"}],"cPubR":[function(require,module,exports) {
"use strict";
var requireObjectCoercible = require("f45a7b5dcdc4a410");
var $Object = Object;
// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function(argument) {
    return $Object(requireObjectCoercible(argument));
};

},{"f45a7b5dcdc4a410":"71AdT"}],"71AdT":[function(require,module,exports) {
"use strict";
var isNullOrUndefined = require("74607922ed30019f");
var $TypeError = TypeError;
// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function(it) {
    if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
    return it;
};

},{"74607922ed30019f":"cv6KL"}],"cv6KL":[function(require,module,exports) {
"use strict";
// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function(it) {
    return it === null || it === undefined;
};

},{}],"hUfjJ":[function(require,module,exports) {
"use strict";
var DESCRIPTORS = require("8ad2bacb0e20b95c");
var hasOwn = require("4eabfd8f83afc9d5");
var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn(FunctionPrototype, "name");
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() {}).name === "something";
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, "name").configurable);
module.exports = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
};

},{"8ad2bacb0e20b95c":"b2lTm","4eabfd8f83afc9d5":"5CrDz"}],"el6v3":[function(require,module,exports) {
"use strict";
var uncurryThis = require("26e26db98367212e");
var isCallable = require("40ed9a4f6ae66648");
var store = require("485d48d6f4c6739e");
var functionToString = uncurryThis(Function.toString);
// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) store.inspectSource = function(it) {
    return functionToString(it);
};
module.exports = store.inspectSource;

},{"26e26db98367212e":"in40Y","40ed9a4f6ae66648":"2Y1pk","485d48d6f4c6739e":"dXg9m"}],"dXg9m":[function(require,module,exports) {
"use strict";
var global = require("8756de416b94afec");
var defineGlobalProperty = require("dfb72a1d809f7b02");
var SHARED = "__core-js_shared__";
var store = global[SHARED] || defineGlobalProperty(SHARED, {});
module.exports = store;

},{"8756de416b94afec":"OQn0B","dfb72a1d809f7b02":"9s6sq"}],"9s6sq":[function(require,module,exports) {
"use strict";
var global = require("70259c1dd4aa0e14");
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
module.exports = function(key, value) {
    try {
        defineProperty(global, key, {
            value: value,
            configurable: true,
            writable: true
        });
    } catch (error) {
        global[key] = value;
    }
    return value;
};

},{"70259c1dd4aa0e14":"OQn0B"}],"fODXn":[function(require,module,exports) {
"use strict";
var NATIVE_WEAK_MAP = require("d3f0c9f3327b2fd6");
var global = require("ca46b44b6201ccd7");
var isObject = require("f82e6cc0ac249fa5");
var createNonEnumerableProperty = require("c0ae163eea4ef97");
var hasOwn = require("6dea7358344877bb");
var shared = require("3e035a1241da2f0");
var sharedKey = require("88d6ccc27e779e5a");
var hiddenKeys = require("d40b9b3abdbb956e");
var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;
var enforce = function(it) {
    return has(it) ? get(it) : set(it, {});
};
var getterFor = function(TYPE) {
    return function(it) {
        var state;
        if (!isObject(it) || (state = get(it)).type !== TYPE) throw new TypeError("Incompatible receiver, " + TYPE + " required");
        return state;
    };
};
if (NATIVE_WEAK_MAP || shared.state) {
    var store = shared.state || (shared.state = new WeakMap());
    /* eslint-disable no-self-assign -- prototype methods protection */ store.get = store.get;
    store.has = store.has;
    store.set = store.set;
    /* eslint-enable no-self-assign -- prototype methods protection */ set = function(it, metadata) {
        if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        store.set(it, metadata);
        return metadata;
    };
    get = function(it) {
        return store.get(it) || {};
    };
    has = function(it) {
        return store.has(it);
    };
} else {
    var STATE = sharedKey("state");
    hiddenKeys[STATE] = true;
    set = function(it, metadata) {
        if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        createNonEnumerableProperty(it, STATE, metadata);
        return metadata;
    };
    get = function(it) {
        return hasOwn(it, STATE) ? it[STATE] : {};
    };
    has = function(it) {
        return hasOwn(it, STATE);
    };
}
module.exports = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
};

},{"d3f0c9f3327b2fd6":"kxrVs","ca46b44b6201ccd7":"OQn0B","f82e6cc0ac249fa5":"abyRQ","c0ae163eea4ef97":"3chVA","6dea7358344877bb":"5CrDz","3e035a1241da2f0":"dXg9m","88d6ccc27e779e5a":"jVaWU","d40b9b3abdbb956e":"5QGFu"}],"kxrVs":[function(require,module,exports) {
"use strict";
var global = require("6bd2547a42528a9c");
var isCallable = require("aa77fff8d5ef0565");
var WeakMap = global.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));

},{"6bd2547a42528a9c":"OQn0B","aa77fff8d5ef0565":"2Y1pk"}],"abyRQ":[function(require,module,exports) {
"use strict";
var isCallable = require("f87cee1cb79cbcca");
var $documentAll = require("319a7447e596d6da");
var documentAll = $documentAll.all;
module.exports = $documentAll.IS_HTMLDDA ? function(it) {
    return typeof it == "object" ? it !== null : isCallable(it) || it === documentAll;
} : function(it) {
    return typeof it == "object" ? it !== null : isCallable(it);
};

},{"f87cee1cb79cbcca":"2Y1pk","319a7447e596d6da":"8Kbiy"}],"3chVA":[function(require,module,exports) {
"use strict";
var DESCRIPTORS = require("a8753383ef98ee18");
var definePropertyModule = require("189ab650b8f71085");
var createPropertyDescriptor = require("1168c8162aa30435");
module.exports = DESCRIPTORS ? function(object, key, value) {
    return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function(object, key, value) {
    object[key] = value;
    return object;
};

},{"a8753383ef98ee18":"b2lTm","189ab650b8f71085":"aNgPS","1168c8162aa30435":"sMpjU"}],"aNgPS":[function(require,module,exports) {
"use strict";
var DESCRIPTORS = require("ca50eb9163928400");
var IE8_DOM_DEFINE = require("d482f9e5478795e8");
var V8_PROTOTYPE_DEFINE_BUG = require("b6ad7537efb06f4b");
var anObject = require("16365a73399e7fe7");
var toPropertyKey = require("fab1d366c47796d9");
var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = "enumerable";
var CONFIGURABLE = "configurable";
var WRITABLE = "writable";
// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);
    if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
        var current = $getOwnPropertyDescriptor(O, P);
        if (current && current[WRITABLE]) {
            O[P] = Attributes.value;
            Attributes = {
                configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
                enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
                writable: false
            };
        }
    }
    return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);
    if (IE8_DOM_DEFINE) try {
        return $defineProperty(O, P, Attributes);
    } catch (error) {}
    if ("get" in Attributes || "set" in Attributes) throw new $TypeError("Accessors not supported");
    if ("value" in Attributes) O[P] = Attributes.value;
    return O;
};

},{"ca50eb9163928400":"b2lTm","d482f9e5478795e8":"lJGMp","b6ad7537efb06f4b":"bUF8X","16365a73399e7fe7":"8686X","fab1d366c47796d9":"bl3GZ"}],"lJGMp":[function(require,module,exports) {
"use strict";
var DESCRIPTORS = require("9b4278b13c076bf");
var fails = require("8aee5d88a5f9b6b5");
var createElement = require("1db4d60148afcf21");
// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement("div"), "a", {
        get: function() {
            return 7;
        }
    }).a !== 7;
});

},{"9b4278b13c076bf":"b2lTm","8aee5d88a5f9b6b5":"bqKbF","1db4d60148afcf21":"cAshg"}],"cAshg":[function(require,module,exports) {
"use strict";
var global = require("f5891d48afd7ec83");
var isObject = require("824df78b2e007250");
var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);
module.exports = function(it) {
    return EXISTS ? document.createElement(it) : {};
};

},{"f5891d48afd7ec83":"OQn0B","824df78b2e007250":"abyRQ"}],"bUF8X":[function(require,module,exports) {
"use strict";
var DESCRIPTORS = require("b22a5a2de93e3ad2");
var fails = require("249a5b857c2dfccd");
// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function() {}, "prototype", {
        value: 42,
        writable: false
    }).prototype !== 42;
});

},{"b22a5a2de93e3ad2":"b2lTm","249a5b857c2dfccd":"bqKbF"}],"8686X":[function(require,module,exports) {
"use strict";
var isObject = require("2b6c6258a0a6082f");
var $String = String;
var $TypeError = TypeError;
// `Assert: Type(argument) is Object`
module.exports = function(argument) {
    if (isObject(argument)) return argument;
    throw new $TypeError($String(argument) + " is not an object");
};

},{"2b6c6258a0a6082f":"abyRQ"}],"bl3GZ":[function(require,module,exports) {
"use strict";
var toPrimitive = require("53a3a67ac381c4e8");
var isSymbol = require("b992ca9cdcf7937b");
// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function(argument) {
    var key = toPrimitive(argument, "string");
    return isSymbol(key) ? key : key + "";
};

},{"53a3a67ac381c4e8":"1vNzP","b992ca9cdcf7937b":"1J3Zo"}],"1vNzP":[function(require,module,exports) {
"use strict";
var call = require("70235907dc93b4b0");
var isObject = require("46fb53dace408c8e");
var isSymbol = require("677bdc4d74d2f983");
var getMethod = require("80395bcde336a28b");
var ordinaryToPrimitive = require("49552a7324952190");
var wellKnownSymbol = require("aea01c71276624bf");
var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function(input, pref) {
    if (!isObject(input) || isSymbol(input)) return input;
    var exoticToPrim = getMethod(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
        if (pref === undefined) pref = "default";
        result = call(exoticToPrim, input, pref);
        if (!isObject(result) || isSymbol(result)) return result;
        throw new $TypeError("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = "number";
    return ordinaryToPrimitive(input, pref);
};

},{"70235907dc93b4b0":"etdE7","46fb53dace408c8e":"abyRQ","677bdc4d74d2f983":"1J3Zo","80395bcde336a28b":"iB2pX","49552a7324952190":"4y3La","aea01c71276624bf":"7qYPf"}],"etdE7":[function(require,module,exports) {
"use strict";
var NATIVE_BIND = require("44e025d030d66023");
var call = Function.prototype.call;
module.exports = NATIVE_BIND ? call.bind(call) : function() {
    return call.apply(call, arguments);
};

},{"44e025d030d66023":"id5kE"}],"1J3Zo":[function(require,module,exports) {
"use strict";
var getBuiltIn = require("6b6c481cdfb7df35");
var isCallable = require("2af44fcbdbf14c83");
var isPrototypeOf = require("76e903e830c40e7c");
var USE_SYMBOL_AS_UID = require("7e2fe930b3598e22");
var $Object = Object;
module.exports = USE_SYMBOL_AS_UID ? function(it) {
    return typeof it == "symbol";
} : function(it) {
    var $Symbol = getBuiltIn("Symbol");
    return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};

},{"6b6c481cdfb7df35":"6yteu","2af44fcbdbf14c83":"2Y1pk","76e903e830c40e7c":"8V4nS","7e2fe930b3598e22":"j8pxi"}],"6yteu":[function(require,module,exports) {
"use strict";
var global = require("dd9e9ae04e8684f7");
var isCallable = require("f1d62079325906cb");
var aFunction = function(argument) {
    return isCallable(argument) ? argument : undefined;
};
module.exports = function(namespace, method) {
    return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};

},{"dd9e9ae04e8684f7":"OQn0B","f1d62079325906cb":"2Y1pk"}],"8V4nS":[function(require,module,exports) {
"use strict";
var uncurryThis = require("83f14842ef67e16a");
module.exports = uncurryThis({}.isPrototypeOf);

},{"83f14842ef67e16a":"in40Y"}],"j8pxi":[function(require,module,exports) {
"use strict";
/* eslint-disable es/no-symbol -- required for testing */ var NATIVE_SYMBOL = require("da4a972af0214ea0");
module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";

},{"da4a972af0214ea0":"ggAvy"}],"ggAvy":[function(require,module,exports) {
"use strict";
/* eslint-disable es/no-symbol -- required for testing */ var V8_VERSION = require("ecc4d354cb42bea8");
var fails = require("b37df495bcdc1d99");
var global = require("d8adff9188ad5fee");
var $String = global.String;
// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function() {
    var symbol = Symbol("symbol detection");
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
    // of course, fail.
    return !$String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

},{"ecc4d354cb42bea8":"7kJPz","b37df495bcdc1d99":"bqKbF","d8adff9188ad5fee":"OQn0B"}],"7kJPz":[function(require,module,exports) {
"use strict";
var global = require("705d79ce07ed8cf");
var userAgent = require("5afb83a49cd74e4c");
var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;
if (v8) {
    match = v8.split(".");
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}
// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
        match = userAgent.match(/Chrome\/(\d+)/);
        if (match) version = +match[1];
    }
}
module.exports = version;

},{"705d79ce07ed8cf":"OQn0B","5afb83a49cd74e4c":"86RXC"}],"86RXC":[function(require,module,exports) {
"use strict";
module.exports = typeof navigator != "undefined" && String(navigator.userAgent) || "";

},{}],"iB2pX":[function(require,module,exports) {
"use strict";
var aCallable = require("bbfed17b24e215f4");
var isNullOrUndefined = require("492a86e2970f6a26");
// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function(V, P) {
    var func = V[P];
    return isNullOrUndefined(func) ? undefined : aCallable(func);
};

},{"bbfed17b24e215f4":"d0PkI","492a86e2970f6a26":"cv6KL"}],"d0PkI":[function(require,module,exports) {
"use strict";
var isCallable = require("4094667126ecac05");
var tryToString = require("fce2a7573db493fa");
var $TypeError = TypeError;
// `Assert: IsCallable(argument) is true`
module.exports = function(argument) {
    if (isCallable(argument)) return argument;
    throw new $TypeError(tryToString(argument) + " is not a function");
};

},{"4094667126ecac05":"2Y1pk","fce2a7573db493fa":"bTjpz"}],"bTjpz":[function(require,module,exports) {
"use strict";
var $String = String;
module.exports = function(argument) {
    try {
        return $String(argument);
    } catch (error) {
        return "Object";
    }
};

},{}],"4y3La":[function(require,module,exports) {
"use strict";
var call = require("abe9ca006f56626e");
var isCallable = require("c96b3a89fec6248a");
var isObject = require("551615fda0214f1b");
var $TypeError = TypeError;
// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function(input, pref) {
    var fn, val;
    if (pref === "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
    if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
    if (pref !== "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
    throw new $TypeError("Can't convert object to primitive value");
};

},{"abe9ca006f56626e":"etdE7","c96b3a89fec6248a":"2Y1pk","551615fda0214f1b":"abyRQ"}],"7qYPf":[function(require,module,exports) {
"use strict";
var global = require("dbe74e87464035e3");
var shared = require("6a2cda01df6b4c79");
var hasOwn = require("dccc28ffa5beeb54");
var uid = require("48d6af1225853d44");
var NATIVE_SYMBOL = require("9f762329148684");
var USE_SYMBOL_AS_UID = require("1ce268781e409df2");
var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared("wks");
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol["for"] || Symbol : Symbol && Symbol.withoutSetter || uid;
module.exports = function(name) {
    if (!hasOwn(WellKnownSymbolsStore, name)) WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name) ? Symbol[name] : createWellKnownSymbol("Symbol." + name);
    return WellKnownSymbolsStore[name];
};

},{"dbe74e87464035e3":"OQn0B","6a2cda01df6b4c79":"8Q05b","dccc28ffa5beeb54":"5CrDz","48d6af1225853d44":"2SbrU","9f762329148684":"ggAvy","1ce268781e409df2":"j8pxi"}],"8Q05b":[function(require,module,exports) {
"use strict";
var IS_PURE = require("fe5f96cb4b2826a2");
var store = require("84eeed9891aafe14");
(module.exports = function(key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
})("versions", []).push({
    version: "3.33.0",
    mode: IS_PURE ? "pure" : "global",
    copyright: "\xa9 2014-2023 Denis Pushkarev (zloirock.ru)",
    license: "https://github.com/zloirock/core-js/blob/v3.33.0/LICENSE",
    source: "https://github.com/zloirock/core-js"
});

},{"fe5f96cb4b2826a2":"85QYv","84eeed9891aafe14":"dXg9m"}],"85QYv":[function(require,module,exports) {
"use strict";
module.exports = false;

},{}],"2SbrU":[function(require,module,exports) {
"use strict";
var uncurryThis = require("5da0fe4507da20a3");
var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);
module.exports = function(key) {
    return "Symbol(" + (key === undefined ? "" : key) + ")_" + toString(++id + postfix, 36);
};

},{"5da0fe4507da20a3":"in40Y"}],"sMpjU":[function(require,module,exports) {
"use strict";
module.exports = function(bitmap, value) {
    return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
    };
};

},{}],"jVaWU":[function(require,module,exports) {
"use strict";
var shared = require("dbc8182adeb8c92f");
var uid = require("90b4ffb58508a6e5");
var keys = shared("keys");
module.exports = function(key) {
    return keys[key] || (keys[key] = uid(key));
};

},{"dbc8182adeb8c92f":"8Q05b","90b4ffb58508a6e5":"2SbrU"}],"5QGFu":[function(require,module,exports) {
"use strict";
module.exports = {};

},{}],"87Bck":[function(require,module,exports) {
"use strict";
var anObject = require("136abace0aec2b5c");
// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function() {
    var that = anObject(this);
    var result = "";
    if (that.hasIndices) result += "d";
    if (that.global) result += "g";
    if (that.ignoreCase) result += "i";
    if (that.multiline) result += "m";
    if (that.dotAll) result += "s";
    if (that.unicode) result += "u";
    if (that.unicodeSets) result += "v";
    if (that.sticky) result += "y";
    return result;
};

},{"136abace0aec2b5c":"8686X"}],"3sYi1":[function(require,module,exports) {
"use strict";
var global = require("b9fe5b9aa917cacb");
var call = require("8bf28e9cdb4b51e7");
var ArrayBufferViewCore = require("3cf762b146f90585");
var lengthOfArrayLike = require("16f38bcdf8d74421");
var toOffset = require("4a9c5a15d77842f8");
var toIndexedObject = require("e57503c492a0d3da");
var fails = require("52b307bfea7391a");
var RangeError = global.RangeError;
var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS = !fails(function() {
    // eslint-disable-next-line es/no-typed-arrays -- required for testing
    var array = new Uint8ClampedArray(2);
    call($set, array, {
        length: 1,
        0: 3
    }, 1);
    return array[1] !== 3;
});
// https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS && fails(function() {
    var array = new Int8Array(2);
    array.set(1);
    array.set("2", 1);
    return array[0] !== 0 || array[1] !== 2;
});
// `%TypedArray%.prototype.set` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod("set", function set(arrayLike /* , offset */ ) {
    aTypedArray(this);
    var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
    var src = toIndexedObject(arrayLike);
    if (WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS) return call($set, this, src, offset);
    var length = this.length;
    var len = lengthOfArrayLike(src);
    var index = 0;
    if (len + offset > length) throw new RangeError("Wrong length");
    while(index < len)this[offset + index] = src[index++];
}, !WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);

},{"b9fe5b9aa917cacb":"OQn0B","8bf28e9cdb4b51e7":"etdE7","3cf762b146f90585":"dvcLS","16f38bcdf8d74421":"4bKw6","4a9c5a15d77842f8":"j4NxT","e57503c492a0d3da":"cPubR","52b307bfea7391a":"bqKbF"}],"dvcLS":[function(require,module,exports) {
"use strict";
var NATIVE_ARRAY_BUFFER = require("4142cc1b1f950662");
var DESCRIPTORS = require("fa237bbf2050dd6d");
var global = require("c88b3cc3863fe00");
var isCallable = require("1b44b7e19e6f660d");
var isObject = require("af39713fe0cf7587");
var hasOwn = require("dd5eec94b1519471");
var classof = require("b9eebb2d4c13b0d6");
var tryToString = require("36a2290066710aa0");
var createNonEnumerableProperty = require("fdfbb82e20f81a19");
var defineBuiltIn = require("81ef6d90bc6acdce");
var defineBuiltInAccessor = require("96421c541af03be5");
var isPrototypeOf = require("ab8263bb2af6274");
var getPrototypeOf = require("ba5da2480b30b79");
var setPrototypeOf = require("b6e4d282cbe3e34a");
var wellKnownSymbol = require("3d5af0d43aa6e42b");
var uid = require("8007fa7370557b8e");
var InternalStateModule = require("82848943f937d383");
var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var TypeError = global.TypeError;
var TO_STRING_TAG = wellKnownSymbol("toStringTag");
var TYPED_ARRAY_TAG = uid("TYPED_ARRAY_TAG");
var TYPED_ARRAY_CONSTRUCTOR = "TypedArrayConstructor";
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== "Opera";
var TYPED_ARRAY_TAG_REQUIRED = false;
var NAME, Constructor, Prototype;
var TypedArrayConstructorsList = {
    Int8Array: 1,
    Uint8Array: 1,
    Uint8ClampedArray: 1,
    Int16Array: 2,
    Uint16Array: 2,
    Int32Array: 4,
    Uint32Array: 4,
    Float32Array: 4,
    Float64Array: 8
};
var BigIntArrayConstructorsList = {
    BigInt64Array: 8,
    BigUint64Array: 8
};
var isView = function isView(it) {
    if (!isObject(it)) return false;
    var klass = classof(it);
    return klass === "DataView" || hasOwn(TypedArrayConstructorsList, klass) || hasOwn(BigIntArrayConstructorsList, klass);
};
var getTypedArrayConstructor = function(it) {
    var proto = getPrototypeOf(it);
    if (!isObject(proto)) return;
    var state = getInternalState(proto);
    return state && hasOwn(state, TYPED_ARRAY_CONSTRUCTOR) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor(proto);
};
var isTypedArray = function(it) {
    if (!isObject(it)) return false;
    var klass = classof(it);
    return hasOwn(TypedArrayConstructorsList, klass) || hasOwn(BigIntArrayConstructorsList, klass);
};
var aTypedArray = function(it) {
    if (isTypedArray(it)) return it;
    throw new TypeError("Target is not a typed array");
};
var aTypedArrayConstructor = function(C) {
    if (isCallable(C) && (!setPrototypeOf || isPrototypeOf(TypedArray, C))) return C;
    throw new TypeError(tryToString(C) + " is not a typed array constructor");
};
var exportTypedArrayMethod = function(KEY, property, forced, options) {
    if (!DESCRIPTORS) return;
    if (forced) for(var ARRAY in TypedArrayConstructorsList){
        var TypedArrayConstructor = global[ARRAY];
        if (TypedArrayConstructor && hasOwn(TypedArrayConstructor.prototype, KEY)) try {
            delete TypedArrayConstructor.prototype[KEY];
        } catch (error) {
            // old WebKit bug - some methods are non-configurable
            try {
                TypedArrayConstructor.prototype[KEY] = property;
            } catch (error2) {}
        }
    }
    if (!TypedArrayPrototype[KEY] || forced) defineBuiltIn(TypedArrayPrototype, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property, options);
};
var exportTypedArrayStaticMethod = function(KEY, property, forced) {
    var ARRAY, TypedArrayConstructor;
    if (!DESCRIPTORS) return;
    if (setPrototypeOf) {
        if (forced) for(ARRAY in TypedArrayConstructorsList){
            TypedArrayConstructor = global[ARRAY];
            if (TypedArrayConstructor && hasOwn(TypedArrayConstructor, KEY)) try {
                delete TypedArrayConstructor[KEY];
            } catch (error) {}
        }
        if (!TypedArray[KEY] || forced) // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
        try {
            return defineBuiltIn(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
        } catch (error) {}
        else return;
    }
    for(ARRAY in TypedArrayConstructorsList){
        TypedArrayConstructor = global[ARRAY];
        if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) defineBuiltIn(TypedArrayConstructor, KEY, property);
    }
};
for(NAME in TypedArrayConstructorsList){
    Constructor = global[NAME];
    Prototype = Constructor && Constructor.prototype;
    if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
    else NATIVE_ARRAY_BUFFER_VIEWS = false;
}
for(NAME in BigIntArrayConstructorsList){
    Constructor = global[NAME];
    Prototype = Constructor && Constructor.prototype;
    if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
}
// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
    // eslint-disable-next-line no-shadow -- safe
    TypedArray = function TypedArray() {
        throw new TypeError("Incorrect invocation");
    };
    if (NATIVE_ARRAY_BUFFER_VIEWS) {
        for(NAME in TypedArrayConstructorsList)if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
    }
}
if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
    TypedArrayPrototype = TypedArray.prototype;
    if (NATIVE_ARRAY_BUFFER_VIEWS) {
        for(NAME in TypedArrayConstructorsList)if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
    }
}
// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
if (DESCRIPTORS && !hasOwn(TypedArrayPrototype, TO_STRING_TAG)) {
    TYPED_ARRAY_TAG_REQUIRED = true;
    defineBuiltInAccessor(TypedArrayPrototype, TO_STRING_TAG, {
        configurable: true,
        get: function() {
            return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
        }
    });
    for(NAME in TypedArrayConstructorsList)if (global[NAME]) createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
}
module.exports = {
    NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
    TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
    aTypedArray: aTypedArray,
    aTypedArrayConstructor: aTypedArrayConstructor,
    exportTypedArrayMethod: exportTypedArrayMethod,
    exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
    getTypedArrayConstructor: getTypedArrayConstructor,
    isView: isView,
    isTypedArray: isTypedArray,
    TypedArray: TypedArray,
    TypedArrayPrototype: TypedArrayPrototype
};

},{"4142cc1b1f950662":"8Q9Fg","fa237bbf2050dd6d":"b2lTm","c88b3cc3863fe00":"OQn0B","1b44b7e19e6f660d":"2Y1pk","af39713fe0cf7587":"abyRQ","dd5eec94b1519471":"5CrDz","b9eebb2d4c13b0d6":"2IJ9F","36a2290066710aa0":"bTjpz","fdfbb82e20f81a19":"3chVA","81ef6d90bc6acdce":"fbgJ4","96421c541af03be5":"jUJfx","ab8263bb2af6274":"8V4nS","ba5da2480b30b79":"4aELl","b6e4d282cbe3e34a":"czmd8","3d5af0d43aa6e42b":"7qYPf","8007fa7370557b8e":"2SbrU","82848943f937d383":"fODXn"}],"8Q9Fg":[function(require,module,exports) {
"use strict";
// eslint-disable-next-line es/no-typed-arrays -- safe
module.exports = typeof ArrayBuffer != "undefined" && typeof DataView != "undefined";

},{}],"2IJ9F":[function(require,module,exports) {
"use strict";
var TO_STRING_TAG_SUPPORT = require("397e535b3976d304");
var isCallable = require("eebd8012c2d2c3ae");
var classofRaw = require("8da113eeaf06c4ba");
var wellKnownSymbol = require("df252844008f634");
var TO_STRING_TAG = wellKnownSymbol("toStringTag");
var $Object = Object;
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function() {
    return arguments;
}()) === "Arguments";
// fallback for IE11 Script Access Denied error
var tryGet = function(it, key) {
    try {
        return it[key];
    } catch (error) {}
};
// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
    var O, tag, result;
    return it === undefined ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) === "Object" && isCallable(O.callee) ? "Arguments" : result;
};

},{"397e535b3976d304":"6af8c","eebd8012c2d2c3ae":"2Y1pk","8da113eeaf06c4ba":"8yLPy","df252844008f634":"7qYPf"}],"6af8c":[function(require,module,exports) {
"use strict";
var wellKnownSymbol = require("6306cd4835715127");
var TO_STRING_TAG = wellKnownSymbol("toStringTag");
var test = {};
test[TO_STRING_TAG] = "z";
module.exports = String(test) === "[object z]";

},{"6306cd4835715127":"7qYPf"}],"8yLPy":[function(require,module,exports) {
"use strict";
var uncurryThis = require("1c71c3f6daac476c");
var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis("".slice);
module.exports = function(it) {
    return stringSlice(toString(it), 8, -1);
};

},{"1c71c3f6daac476c":"in40Y"}],"fbgJ4":[function(require,module,exports) {
"use strict";
var isCallable = require("99ee13632b3fa68");
var definePropertyModule = require("9ebb3e3004fccc0a");
var makeBuiltIn = require("f10cc812a3094053");
var defineGlobalProperty = require("d354802d852d9c2b");
module.exports = function(O, key, value, options) {
    if (!options) options = {};
    var simple = options.enumerable;
    var name = options.name !== undefined ? options.name : key;
    if (isCallable(value)) makeBuiltIn(value, name, options);
    if (options.global) {
        if (simple) O[key] = value;
        else defineGlobalProperty(key, value);
    } else {
        try {
            if (!options.unsafe) delete O[key];
            else if (O[key]) simple = true;
        } catch (error) {}
        if (simple) O[key] = value;
        else definePropertyModule.f(O, key, {
            value: value,
            enumerable: false,
            configurable: !options.nonConfigurable,
            writable: !options.nonWritable
        });
    }
    return O;
};

},{"99ee13632b3fa68":"2Y1pk","9ebb3e3004fccc0a":"aNgPS","f10cc812a3094053":"iTZLl","d354802d852d9c2b":"9s6sq"}],"4aELl":[function(require,module,exports) {
"use strict";
var hasOwn = require("da54a59ea207dd");
var isCallable = require("71ab2a7bcc8c8fc8");
var toObject = require("7a3afd2bb40b0292");
var sharedKey = require("296d7a2db8e23969");
var CORRECT_PROTOTYPE_GETTER = require("58de29d5e883862f");
var IE_PROTO = sharedKey("IE_PROTO");
var $Object = Object;
var ObjectPrototype = $Object.prototype;
// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function(O) {
    var object = toObject(O);
    if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable(constructor) && object instanceof constructor) return constructor.prototype;
    return object instanceof $Object ? ObjectPrototype : null;
};

},{"da54a59ea207dd":"5CrDz","71ab2a7bcc8c8fc8":"2Y1pk","7a3afd2bb40b0292":"cPubR","296d7a2db8e23969":"jVaWU","58de29d5e883862f":"3FyZ7"}],"3FyZ7":[function(require,module,exports) {
"use strict";
var fails = require("85ffc28af2e8afc1");
module.exports = !fails(function() {
    function F() {}
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
});

},{"85ffc28af2e8afc1":"bqKbF"}],"czmd8":[function(require,module,exports) {
"use strict";
/* eslint-disable no-proto -- safe */ var uncurryThisAccessor = require("995a94425a563d6");
var anObject = require("4b49e5767d221547");
var aPossiblePrototype = require("6e2c833ee2a62cf6");
// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
        setter = uncurryThisAccessor(Object.prototype, "__proto__", "set");
        setter(test, []);
        CORRECT_SETTER = test instanceof Array;
    } catch (error) {}
    return function setPrototypeOf(O, proto) {
        anObject(O);
        aPossiblePrototype(proto);
        if (CORRECT_SETTER) setter(O, proto);
        else O.__proto__ = proto;
        return O;
    };
}() : undefined);

},{"995a94425a563d6":"7e9jL","4b49e5767d221547":"8686X","6e2c833ee2a62cf6":"5nMsa"}],"7e9jL":[function(require,module,exports) {
"use strict";
var uncurryThis = require("27a2d181325e1926");
var aCallable = require("36b26076b1e2fac1");
module.exports = function(object, key, method) {
    try {
        // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
        return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
    } catch (error) {}
};

},{"27a2d181325e1926":"in40Y","36b26076b1e2fac1":"d0PkI"}],"5nMsa":[function(require,module,exports) {
"use strict";
var isCallable = require("9a88d96c5b428ce5");
var $String = String;
var $TypeError = TypeError;
module.exports = function(argument) {
    if (typeof argument == "object" || isCallable(argument)) return argument;
    throw new $TypeError("Can't set " + $String(argument) + " as a prototype");
};

},{"9a88d96c5b428ce5":"2Y1pk"}],"4bKw6":[function(require,module,exports) {
"use strict";
var toLength = require("23d9716c54a2ab90");
// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function(obj) {
    return toLength(obj.length);
};

},{"23d9716c54a2ab90":"3g74O"}],"3g74O":[function(require,module,exports) {
"use strict";
var toIntegerOrInfinity = require("c48d3a8b8ac52b0b");
var min = Math.min;
// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function(argument) {
    return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"c48d3a8b8ac52b0b":"isUdy"}],"isUdy":[function(require,module,exports) {
"use strict";
var trunc = require("3403cba02b5f61d8");
// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function(argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number || number === 0 ? 0 : trunc(number);
};

},{"3403cba02b5f61d8":"cuq4n"}],"cuq4n":[function(require,module,exports) {
"use strict";
var ceil = Math.ceil;
var floor = Math.floor;
// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
    var n = +x;
    return (n > 0 ? floor : ceil)(n);
};

},{}],"j4NxT":[function(require,module,exports) {
"use strict";
var toPositiveInteger = require("3d42e5f9448f0334");
var $RangeError = RangeError;
module.exports = function(it, BYTES) {
    var offset = toPositiveInteger(it);
    if (offset % BYTES) throw new $RangeError("Wrong offset");
    return offset;
};

},{"3d42e5f9448f0334":"4iVe2"}],"4iVe2":[function(require,module,exports) {
"use strict";
var toIntegerOrInfinity = require("e509d82728a7abb4");
var $RangeError = RangeError;
module.exports = function(it) {
    var result = toIntegerOrInfinity(it);
    if (result < 0) throw new $RangeError("The argument can't be less than 0");
    return result;
};

},{"e509d82728a7abb4":"isUdy"}],"hgmr1":[function(require,module,exports) {
"use strict";
// TODO: Remove this module from `core-js@4` since it's split to modules listed below
require("52e9b3eefbbce1ed");
require("292fa64716f5b39e");

},{"52e9b3eefbbce1ed":"2bb1g","292fa64716f5b39e":"5QXaG"}],"2bb1g":[function(require,module,exports) {
"use strict";
var $ = require("79389288a80b279c");
var global = require("22a078687be7e1b6");
var clearImmediate = require("84ba5ca62b8b14c9").clear;
// `clearImmediate` method
// http://w3c.github.io/setImmediate/#si-clearImmediate
$({
    global: true,
    bind: true,
    enumerable: true,
    forced: global.clearImmediate !== clearImmediate
}, {
    clearImmediate: clearImmediate
});

},{"79389288a80b279c":"dr2wu","22a078687be7e1b6":"OQn0B","84ba5ca62b8b14c9":"a6EHU"}],"dr2wu":[function(require,module,exports) {
"use strict";
var global = require("6643b6592ad59b23");
var getOwnPropertyDescriptor = require("2ec751f39e500b85").f;
var createNonEnumerableProperty = require("b4567636b28a3b3a");
var defineBuiltIn = require("50460aa43dd4048a");
var defineGlobalProperty = require("581238c99f8c2c30");
var copyConstructorProperties = require("566a383894c688bc");
var isForced = require("f0e2e697f04e8ad9");
/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/ module.exports = function(options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) target = global;
    else if (STATIC) target = global[TARGET] || defineGlobalProperty(TARGET, {});
    else target = (global[TARGET] || {}).prototype;
    if (target) for(key in source){
        sourceProperty = source[key];
        if (options.dontCallGetSet) {
            descriptor = getOwnPropertyDescriptor(target, key);
            targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
        // contained in target
        if (!FORCED && targetProperty !== undefined) {
            if (typeof sourceProperty == typeof targetProperty) continue;
            copyConstructorProperties(sourceProperty, targetProperty);
        }
        // add a flag to not completely full polyfills
        if (options.sham || targetProperty && targetProperty.sham) createNonEnumerableProperty(sourceProperty, "sham", true);
        defineBuiltIn(target, key, sourceProperty, options);
    }
};

},{"6643b6592ad59b23":"OQn0B","2ec751f39e500b85":"6RJ9g","b4567636b28a3b3a":"3chVA","50460aa43dd4048a":"fbgJ4","581238c99f8c2c30":"9s6sq","566a383894c688bc":"40LWI","f0e2e697f04e8ad9":"87rEG"}],"6RJ9g":[function(require,module,exports) {
"use strict";
var DESCRIPTORS = require("c04e6fb248689dba");
var call = require("553ec943aa2a4554");
var propertyIsEnumerableModule = require("bbc5e69071aa2fbd");
var createPropertyDescriptor = require("1d2ffbfd99e01f41");
var toIndexedObject = require("c4ea69a78a643d87");
var toPropertyKey = require("8ab18ff766aa2ab9");
var hasOwn = require("3761c5d34b7aa48f");
var IE8_DOM_DEFINE = require("c4dfcc26308f1b4a");
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPropertyKey(P);
    if (IE8_DOM_DEFINE) try {
        return $getOwnPropertyDescriptor(O, P);
    } catch (error) {}
    if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

},{"c04e6fb248689dba":"b2lTm","553ec943aa2a4554":"etdE7","bbc5e69071aa2fbd":"g5YtV","1d2ffbfd99e01f41":"sMpjU","c4ea69a78a643d87":"jHEff","8ab18ff766aa2ab9":"bl3GZ","3761c5d34b7aa48f":"5CrDz","c4dfcc26308f1b4a":"lJGMp"}],"g5YtV":[function(require,module,exports) {
"use strict";
var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
    1: 2
}, 1);
// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

},{}],"jHEff":[function(require,module,exports) {
"use strict";
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require("9d8f8f50ac9468eb");
var requireObjectCoercible = require("f7224aed72953ac4");
module.exports = function(it) {
    return IndexedObject(requireObjectCoercible(it));
};

},{"9d8f8f50ac9468eb":"7cLJw","f7224aed72953ac4":"71AdT"}],"7cLJw":[function(require,module,exports) {
"use strict";
var uncurryThis = require("7ba7e65983d7b662");
var fails = require("df551e12a7c872dd");
var classof = require("1d34ea813cebff9c");
var $Object = Object;
var split = uncurryThis("".split);
// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function() {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object("z").propertyIsEnumerable(0);
}) ? function(it) {
    return classof(it) === "String" ? split(it, "") : $Object(it);
} : $Object;

},{"7ba7e65983d7b662":"in40Y","df551e12a7c872dd":"bqKbF","1d34ea813cebff9c":"8yLPy"}],"40LWI":[function(require,module,exports) {
"use strict";
var hasOwn = require("d91d786cc71453ce");
var ownKeys = require("88cb809f98beddc6");
var getOwnPropertyDescriptorModule = require("10ea642aad5f7c21");
var definePropertyModule = require("39ff598ce822187e");
module.exports = function(target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for(var i = 0; i < keys.length; i++){
        var key = keys[i];
        if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
};

},{"d91d786cc71453ce":"5CrDz","88cb809f98beddc6":"fuGGk","10ea642aad5f7c21":"6RJ9g","39ff598ce822187e":"aNgPS"}],"fuGGk":[function(require,module,exports) {
"use strict";
var getBuiltIn = require("3cc1e4329d869e34");
var uncurryThis = require("2b8e77cbdbe3db7a");
var getOwnPropertyNamesModule = require("d703bcb62fcda216");
var getOwnPropertySymbolsModule = require("157674bad2772c6d");
var anObject = require("a09e060b9cae3c6c");
var concat = uncurryThis([].concat);
// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn("Reflect", "ownKeys") || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

},{"3cc1e4329d869e34":"6yteu","2b8e77cbdbe3db7a":"in40Y","d703bcb62fcda216":"5csFi","157674bad2772c6d":"fUuq0","a09e060b9cae3c6c":"8686X"}],"5csFi":[function(require,module,exports) {
"use strict";
var internalObjectKeys = require("6d8591e17a49376c");
var enumBugKeys = require("2c933f93dd98f385");
var hiddenKeys = enumBugKeys.concat("length", "prototype");
// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys);
};

},{"6d8591e17a49376c":"khf2J","2c933f93dd98f385":"bd4zX"}],"khf2J":[function(require,module,exports) {
"use strict";
var uncurryThis = require("363ee0e6bb4f46a7");
var hasOwn = require("3183fe0b0bf6f6ac");
var toIndexedObject = require("28192ac12e934672");
var indexOf = require("a5f9c5d8e993ccd6").indexOf;
var hiddenKeys = require("57775908f1581bc6");
var push = uncurryThis([].push);
module.exports = function(object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for(key in O)!hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
    // Don't enum bug & hidden keys
    while(names.length > i)if (hasOwn(O, key = names[i++])) ~indexOf(result, key) || push(result, key);
    return result;
};

},{"363ee0e6bb4f46a7":"in40Y","3183fe0b0bf6f6ac":"5CrDz","28192ac12e934672":"jHEff","a5f9c5d8e993ccd6":"6S3xb","57775908f1581bc6":"5QGFu"}],"6S3xb":[function(require,module,exports) {
"use strict";
var toIndexedObject = require("d5dcbcd68ac5acd0");
var toAbsoluteIndex = require("212b13aecfa48226");
var lengthOfArrayLike = require("e5a8b3e1da4c5637");
// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function(IS_INCLUDES) {
    return function($this, el, fromIndex) {
        var O = toIndexedObject($this);
        var length = lengthOfArrayLike(O);
        var index = toAbsoluteIndex(fromIndex, length);
        var value;
        // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare -- NaN check
        if (IS_INCLUDES && el !== el) while(length > index){
            value = O[index++];
            // eslint-disable-next-line no-self-compare -- NaN check
            if (value !== value) return true;
        // Array#indexOf ignores holes, Array#includes - not
        }
        else for(; length > index; index++){
            if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
        }
        return !IS_INCLUDES && -1;
    };
};
module.exports = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
};

},{"d5dcbcd68ac5acd0":"jHEff","212b13aecfa48226":"9jujI","e5a8b3e1da4c5637":"4bKw6"}],"9jujI":[function(require,module,exports) {
"use strict";
var toIntegerOrInfinity = require("72fe0a53ad43912c");
var max = Math.max;
var min = Math.min;
// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function(index, length) {
    var integer = toIntegerOrInfinity(index);
    return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"72fe0a53ad43912c":"isUdy"}],"bd4zX":[function(require,module,exports) {
"use strict";
// IE8- don't enum bug keys
module.exports = [
    "constructor",
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "toLocaleString",
    "toString",
    "valueOf"
];

},{}],"fUuq0":[function(require,module,exports) {
"use strict";
// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

},{}],"87rEG":[function(require,module,exports) {
"use strict";
var fails = require("10299561ea0c7870");
var isCallable = require("8b1ecdaf59f07210");
var replacement = /#|\.prototype\./;
var isForced = function(feature, detection) {
    var value = data[normalize(feature)];
    return value === POLYFILL ? true : value === NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
};
var normalize = isForced.normalize = function(string) {
    return String(string).replace(replacement, ".").toLowerCase();
};
var data = isForced.data = {};
var NATIVE = isForced.NATIVE = "N";
var POLYFILL = isForced.POLYFILL = "P";
module.exports = isForced;

},{"10299561ea0c7870":"bqKbF","8b1ecdaf59f07210":"2Y1pk"}],"a6EHU":[function(require,module,exports) {
"use strict";
var global = require("1e8ed58235e9956a");
var apply = require("e574be68c288c7c8");
var bind = require("df212787338802d3");
var isCallable = require("afdf018c2d01bbc6");
var hasOwn = require("35a3e849940fd612");
var fails = require("b8bf5434d2248ca7");
var html = require("731f9370cc21fc3b");
var arraySlice = require("ec358060964e4bde");
var createElement = require("907adb6d219da7a3");
var validateArgumentsLength = require("f398561ebd49a798");
var IS_IOS = require("fdfdeccf85e81d4f");
var IS_NODE = require("fcf929779abbf29c");
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var Dispatch = global.Dispatch;
var Function = global.Function;
var MessageChannel = global.MessageChannel;
var String = global.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = "onreadystatechange";
var $location, defer, channel, port;
fails(function() {
    // Deno throws a ReferenceError on `location` access without `--location` flag
    $location = global.location;
});
var run = function(id) {
    if (hasOwn(queue, id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
    }
};
var runner = function(id) {
    return function() {
        run(id);
    };
};
var eventListener = function(event) {
    run(event.data);
};
var globalPostMessageDefer = function(id) {
    // old engines have not location.origin
    global.postMessage(String(id), $location.protocol + "//" + $location.host);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
    set = function setImmediate(handler) {
        validateArgumentsLength(arguments.length, 1);
        var fn = isCallable(handler) ? handler : Function(handler);
        var args = arraySlice(arguments, 1);
        queue[++counter] = function() {
            apply(fn, undefined, args);
        };
        defer(counter);
        return counter;
    };
    clear = function clearImmediate(id) {
        delete queue[id];
    };
    // Node.js 0.8-
    if (IS_NODE) defer = function(id) {
        process.nextTick(runner(id));
    };
    else if (Dispatch && Dispatch.now) defer = function(id) {
        Dispatch.now(runner(id));
    };
    else if (MessageChannel && !IS_IOS) {
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = eventListener;
        defer = bind(port.postMessage, port);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (global.addEventListener && isCallable(global.postMessage) && !global.importScripts && $location && $location.protocol !== "file:" && !fails(globalPostMessageDefer)) {
        defer = globalPostMessageDefer;
        global.addEventListener("message", eventListener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in createElement("script")) defer = function(id) {
        html.appendChild(createElement("script"))[ONREADYSTATECHANGE] = function() {
            html.removeChild(this);
            run(id);
        };
    };
    else defer = function(id) {
        setTimeout(runner(id), 0);
    };
}
module.exports = {
    set: set,
    clear: clear
};

},{"1e8ed58235e9956a":"OQn0B","e574be68c288c7c8":"dlg4a","df212787338802d3":"by0KD","afdf018c2d01bbc6":"2Y1pk","35a3e849940fd612":"5CrDz","b8bf5434d2248ca7":"bqKbF","731f9370cc21fc3b":"8vqSx","ec358060964e4bde":"34i2n","907adb6d219da7a3":"cAshg","f398561ebd49a798":"7ot7n","fdfdeccf85e81d4f":"7zOyj","fcf929779abbf29c":"iG2Rd"}],"dlg4a":[function(require,module,exports) {
"use strict";
var NATIVE_BIND = require("d07466971ded2aca");
var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;
// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == "object" && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function() {
    return call.apply(apply, arguments);
});

},{"d07466971ded2aca":"id5kE"}],"by0KD":[function(require,module,exports) {
"use strict";
var uncurryThis = require("92f6f475baa85665");
var aCallable = require("547ee4f9dab0cc76");
var NATIVE_BIND = require("5acd31cba656d393");
var bind = uncurryThis(uncurryThis.bind);
// optional / simple context binding
module.exports = function(fn, that) {
    aCallable(fn);
    return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function() {
        return fn.apply(that, arguments);
    };
};

},{"92f6f475baa85665":"bVZG6","547ee4f9dab0cc76":"d0PkI","5acd31cba656d393":"id5kE"}],"bVZG6":[function(require,module,exports) {
"use strict";
var classofRaw = require("8e77093015e1e67f");
var uncurryThis = require("9daa4dbbca634c9e");
module.exports = function(fn) {
    // Nashorn bug:
    //   https://github.com/zloirock/core-js/issues/1128
    //   https://github.com/zloirock/core-js/issues/1130
    if (classofRaw(fn) === "Function") return uncurryThis(fn);
};

},{"8e77093015e1e67f":"8yLPy","9daa4dbbca634c9e":"in40Y"}],"8vqSx":[function(require,module,exports) {
"use strict";
var getBuiltIn = require("14cb391fa4a0dda8");
module.exports = getBuiltIn("document", "documentElement");

},{"14cb391fa4a0dda8":"6yteu"}],"34i2n":[function(require,module,exports) {
"use strict";
var uncurryThis = require("5250b5c9324ccbe");
module.exports = uncurryThis([].slice);

},{"5250b5c9324ccbe":"in40Y"}],"7ot7n":[function(require,module,exports) {
"use strict";
var $TypeError = TypeError;
module.exports = function(passed, required) {
    if (passed < required) throw new $TypeError("Not enough arguments");
    return passed;
};

},{}],"7zOyj":[function(require,module,exports) {
"use strict";
var userAgent = require("d96985a79ddda108");
// eslint-disable-next-line redos/no-vulnerable -- safe
module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);

},{"d96985a79ddda108":"86RXC"}],"iG2Rd":[function(require,module,exports) {
"use strict";
var global = require("1b4555a3a97d5ef1");
var classof = require("779f783a397f138");
module.exports = classof(global.process) === "process";

},{"1b4555a3a97d5ef1":"OQn0B","779f783a397f138":"8yLPy"}],"5QXaG":[function(require,module,exports) {
"use strict";
var $ = require("33581c362196ed1f");
var global = require("9a84e40db4964af6");
var setTask = require("4219ce460223bd08").set;
var schedulersFix = require("738dc378e6a94c64");
// https://github.com/oven-sh/bun/issues/1633
var setImmediate = global.setImmediate ? schedulersFix(setTask, false) : setTask;
// `setImmediate` method
// http://w3c.github.io/setImmediate/#si-setImmediate
$({
    global: true,
    bind: true,
    enumerable: true,
    forced: global.setImmediate !== setImmediate
}, {
    setImmediate: setImmediate
});

},{"33581c362196ed1f":"dr2wu","9a84e40db4964af6":"OQn0B","4219ce460223bd08":"a6EHU","738dc378e6a94c64":"dRfCe"}],"dRfCe":[function(require,module,exports) {
"use strict";
var global = require("373dd417176da2c5");
var apply = require("a68ecfcbf29c46f6");
var isCallable = require("7087588d33667af2");
var ENGINE_IS_BUN = require("7679d27a979f2651");
var USER_AGENT = require("7493ba8d8bb8623d");
var arraySlice = require("cff2c830bdea4f24");
var validateArgumentsLength = require("58a74f00cee1ac64");
var Function = global.Function;
// dirty IE9- and Bun 0.3.0- checks
var WRAP = /MSIE .\./.test(USER_AGENT) || ENGINE_IS_BUN && function() {
    var version = global.Bun.version.split(".");
    return version.length < 3 || version[0] === "0" && (version[1] < 3 || version[1] === "3" && version[2] === "0");
}();
// IE9- / Bun 0.3.0- setTimeout / setInterval / setImmediate additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
// https://github.com/oven-sh/bun/issues/1633
module.exports = function(scheduler, hasTimeArg) {
    var firstParamIndex = hasTimeArg ? 2 : 1;
    return WRAP ? function(handler, timeout /* , ...arguments */ ) {
        var boundArgs = validateArgumentsLength(arguments.length, 1) > firstParamIndex;
        var fn = isCallable(handler) ? handler : Function(handler);
        var params = boundArgs ? arraySlice(arguments, firstParamIndex) : [];
        var callback = boundArgs ? function() {
            apply(fn, this, params);
        } : fn;
        return hasTimeArg ? scheduler(callback, timeout) : scheduler(callback);
    } : scheduler;
};

},{"373dd417176da2c5":"OQn0B","a68ecfcbf29c46f6":"dlg4a","7087588d33667af2":"2Y1pk","7679d27a979f2651":"hxUHT","7493ba8d8bb8623d":"86RXC","cff2c830bdea4f24":"34i2n","58a74f00cee1ac64":"7ot7n"}],"hxUHT":[function(require,module,exports) {
"use strict";
/* global Bun -- Deno case */ module.exports = typeof Bun == "function" && Bun && typeof Bun.version == "string";

},{}],"77gdj":[function(require,module,exports) {
/* eslint-disable */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "login", ()=>login);
parcelHelpers.export(exports, "logout", ()=>logout);
var _axios = require("axios");
var _axiosDefault = parcelHelpers.interopDefault(_axios);
var _alert = require("./alert");
const login = async (email, password)=>{
    try {
        const res = await (0, _axiosDefault.default)({
            method: "POST",
            url: "http://127.0.0.1:3000/api/v1/users/login",
            data: {
                email,
                password
            }
        });
        if (res.data.status === "success") {
            (0, _alert.showAlert)("success", "Logged in successfully");
            window.setTimeout(()=>{
                location.assign("/");
            }, 1500);
        }
    } catch (err) {
        (0, _alert.showAlert)("error", err.response.data.message);
    }
};
const logout = async ()=>{
    try {
        const res = await (0, _axiosDefault.default)({
            method: "GET",
            url: "http://127.0.0.1:3000/api/v1/users/logout"
        });
        if (res.data.status === "success") location.assign("/");
    } catch (err) {
        (0, _alert.showAlert)("error", "Error logging out! Try again.");
    }
};

},{"axios":"7SmSB","./alert":"fcWRG","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"7SmSB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>(0, _axiosJsDefault.default));
parcelHelpers.export(exports, "Axios", ()=>Axios);
parcelHelpers.export(exports, "AxiosError", ()=>AxiosError);
parcelHelpers.export(exports, "CanceledError", ()=>CanceledError);
parcelHelpers.export(exports, "isCancel", ()=>isCancel);
parcelHelpers.export(exports, "CancelToken", ()=>CancelToken);
parcelHelpers.export(exports, "VERSION", ()=>VERSION);
parcelHelpers.export(exports, "all", ()=>all);
parcelHelpers.export(exports, "Cancel", ()=>Cancel);
parcelHelpers.export(exports, "isAxiosError", ()=>isAxiosError);
parcelHelpers.export(exports, "spread", ()=>spread);
parcelHelpers.export(exports, "toFormData", ()=>toFormData);
parcelHelpers.export(exports, "AxiosHeaders", ()=>AxiosHeaders);
parcelHelpers.export(exports, "HttpStatusCode", ()=>HttpStatusCode);
parcelHelpers.export(exports, "formToJSON", ()=>formToJSON);
parcelHelpers.export(exports, "getAdapter", ()=>getAdapter);
parcelHelpers.export(exports, "mergeConfig", ()=>mergeConfig);
var _axiosJs = require("./lib/axios.js");
var _axiosJsDefault = parcelHelpers.interopDefault(_axiosJs);
// This module is intended to unwrap Axios default export as named.
// Keep top-level export same with static properties
// so that it can keep same with es module or cjs
const { Axios, AxiosError, CanceledError, isCancel, CancelToken, VERSION, all, Cancel, isAxiosError, spread, toFormData, AxiosHeaders, HttpStatusCode, formToJSON, getAdapter, mergeConfig } = (0, _axiosJsDefault.default);

},{"./lib/axios.js":"hqkH0","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"hqkH0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("./utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _bindJs = require("./helpers/bind.js");
var _bindJsDefault = parcelHelpers.interopDefault(_bindJs);
var _axiosJs = require("./core/Axios.js");
var _axiosJsDefault = parcelHelpers.interopDefault(_axiosJs);
var _mergeConfigJs = require("./core/mergeConfig.js");
var _mergeConfigJsDefault = parcelHelpers.interopDefault(_mergeConfigJs);
var _indexJs = require("./defaults/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _formDataToJSONJs = require("./helpers/formDataToJSON.js");
var _formDataToJSONJsDefault = parcelHelpers.interopDefault(_formDataToJSONJs);
var _canceledErrorJs = require("./cancel/CanceledError.js");
var _canceledErrorJsDefault = parcelHelpers.interopDefault(_canceledErrorJs);
var _cancelTokenJs = require("./cancel/CancelToken.js");
var _cancelTokenJsDefault = parcelHelpers.interopDefault(_cancelTokenJs);
var _isCancelJs = require("./cancel/isCancel.js");
var _isCancelJsDefault = parcelHelpers.interopDefault(_isCancelJs);
var _dataJs = require("./env/data.js");
var _toFormDataJs = require("./helpers/toFormData.js");
var _toFormDataJsDefault = parcelHelpers.interopDefault(_toFormDataJs);
var _axiosErrorJs = require("./core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _spreadJs = require("./helpers/spread.js");
var _spreadJsDefault = parcelHelpers.interopDefault(_spreadJs);
var _isAxiosErrorJs = require("./helpers/isAxiosError.js");
var _isAxiosErrorJsDefault = parcelHelpers.interopDefault(_isAxiosErrorJs);
var _axiosHeadersJs = require("./core/AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
var _adaptersJs = require("./adapters/adapters.js");
var _adaptersJsDefault = parcelHelpers.interopDefault(_adaptersJs);
var _httpStatusCodeJs = require("./helpers/HttpStatusCode.js");
var _httpStatusCodeJsDefault = parcelHelpers.interopDefault(_httpStatusCodeJs);
"use strict";
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */ function createInstance(defaultConfig) {
    const context = new (0, _axiosJsDefault.default)(defaultConfig);
    const instance = (0, _bindJsDefault.default)((0, _axiosJsDefault.default).prototype.request, context);
    // Copy axios.prototype to instance
    (0, _utilsJsDefault.default).extend(instance, (0, _axiosJsDefault.default).prototype, context, {
        allOwnKeys: true
    });
    // Copy context to instance
    (0, _utilsJsDefault.default).extend(instance, context, null, {
        allOwnKeys: true
    });
    // Factory for creating new instances
    instance.create = function create(instanceConfig) {
        return createInstance((0, _mergeConfigJsDefault.default)(defaultConfig, instanceConfig));
    };
    return instance;
}
// Create the default instance to be exported
const axios = createInstance((0, _indexJsDefault.default));
// Expose Axios class to allow class inheritance
axios.Axios = (0, _axiosJsDefault.default);
// Expose Cancel & CancelToken
axios.CanceledError = (0, _canceledErrorJsDefault.default);
axios.CancelToken = (0, _cancelTokenJsDefault.default);
axios.isCancel = (0, _isCancelJsDefault.default);
axios.VERSION = (0, _dataJs.VERSION);
axios.toFormData = (0, _toFormDataJsDefault.default);
// Expose AxiosError class
axios.AxiosError = (0, _axiosErrorJsDefault.default);
// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;
// Expose all/spread
axios.all = function all(promises) {
    return Promise.all(promises);
};
axios.spread = (0, _spreadJsDefault.default);
// Expose isAxiosError
axios.isAxiosError = (0, _isAxiosErrorJsDefault.default);
// Expose mergeConfig
axios.mergeConfig = (0, _mergeConfigJsDefault.default);
axios.AxiosHeaders = (0, _axiosHeadersJsDefault.default);
axios.formToJSON = (thing)=>(0, _formDataToJSONJsDefault.default)((0, _utilsJsDefault.default).isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = (0, _adaptersJsDefault.default).getAdapter;
axios.HttpStatusCode = (0, _httpStatusCodeJsDefault.default);
axios.default = axios;
// this module should only have a default export
exports.default = axios;

},{"./utils.js":"iXD88","./helpers/bind.js":"1a8zu","./core/Axios.js":"2u9gT","./core/mergeConfig.js":"fVymX","./defaults/index.js":"lhPYD","./helpers/formDataToJSON.js":"bEw8y","./cancel/CanceledError.js":"lEmzM","./cancel/CancelToken.js":"ipO9K","./cancel/isCancel.js":"1P1Rb","./env/data.js":"kzYEo","./helpers/toFormData.js":"9Yt3k","./core/AxiosError.js":"huY20","./helpers/spread.js":"k56CX","./helpers/isAxiosError.js":"gNfCK","./core/AxiosHeaders.js":"gghU6","./adapters/adapters.js":"jjINk","./helpers/HttpStatusCode.js":"kKPo7","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"iXD88":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _bindJs = require("./helpers/bind.js");
var _bindJsDefault = parcelHelpers.interopDefault(_bindJs);
var global = arguments[3];
"use strict";
// utils is a library of generic helper functions non-specific to axios
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const kindOf = ((cache)=>(thing)=>{
        const str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
    })(Object.create(null));
const kindOfTest = (type)=>{
    type = type.toLowerCase();
    return (thing)=>kindOf(thing) === type;
};
const typeOfTest = (type)=>(thing)=>typeof thing === type;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */ const { isArray } = Array;
/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */ const isUndefined = typeOfTest("undefined");
/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */ function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */ const isArrayBuffer = kindOfTest("ArrayBuffer");
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */ function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) result = ArrayBuffer.isView(val);
    else result = val && val.buffer && isArrayBuffer(val.buffer);
    return result;
}
/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */ const isString = typeOfTest("string");
/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */ const isFunction = typeOfTest("function");
/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */ const isNumber = typeOfTest("number");
/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */ const isObject = (thing)=>thing !== null && typeof thing === "object";
/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */ const isBoolean = (thing)=>thing === true || thing === false;
/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */ const isPlainObject = (val)=>{
    if (kindOf(val) !== "object") return false;
    const prototype = getPrototypeOf(val);
    return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};
/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */ const isDate = kindOfTest("Date");
/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */ const isFile = kindOfTest("File");
/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */ const isBlob = kindOfTest("Blob");
/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */ const isFileList = kindOfTest("FileList");
/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */ const isStream = (val)=>isObject(val) && isFunction(val.pipe);
/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */ const isFormData = (thing)=>{
    let kind;
    return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
    kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
};
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */ const isURLSearchParams = kindOfTest("URLSearchParams");
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */ const trim = (str)=>str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */ function forEach(obj, fn, { allOwnKeys = false } = {}) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === "undefined") return;
    let i;
    let l;
    // Force an array if not already something iterable
    if (typeof obj !== "object") /*eslint no-param-reassign:0*/ obj = [
        obj
    ];
    if (isArray(obj)) // Iterate over array values
    for(i = 0, l = obj.length; i < l; i++)fn.call(null, obj[i], i, obj);
    else {
        // Iterate over object keys
        const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
        const len = keys.length;
        let key;
        for(i = 0; i < len; i++){
            key = keys[i];
            fn.call(null, obj[key], key, obj);
        }
    }
}
function findKey(obj, key) {
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while(i-- > 0){
        _key = keys[i];
        if (key === _key.toLowerCase()) return _key;
    }
    return null;
}
const _global = (()=>{
    /*eslint no-undef:0*/ if (typeof globalThis !== "undefined") return globalThis;
    return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context)=>!isUndefined(context) && context !== _global;
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */ function merge() {
    const { caseless } = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key)=>{
        const targetKey = caseless && findKey(result, key) || key;
        if (isPlainObject(result[targetKey]) && isPlainObject(val)) result[targetKey] = merge(result[targetKey], val);
        else if (isPlainObject(val)) result[targetKey] = merge({}, val);
        else if (isArray(val)) result[targetKey] = val.slice();
        else result[targetKey] = val;
    };
    for(let i = 0, l = arguments.length; i < l; i++)arguments[i] && forEach(arguments[i], assignValue);
    return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */ const extend = (a, b, thisArg, { allOwnKeys } = {})=>{
    forEach(b, (val, key)=>{
        if (thisArg && isFunction(val)) a[key] = (0, _bindJsDefault.default)(val, thisArg);
        else a[key] = val;
    }, {
        allOwnKeys
    });
    return a;
};
/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */ const stripBOM = (content)=>{
    if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);
    return content;
};
/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */ const inherits = (constructor, superConstructor, props, descriptors)=>{
    constructor.prototype = Object.create(superConstructor.prototype, descriptors);
    constructor.prototype.constructor = constructor;
    Object.defineProperty(constructor, "super", {
        value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
};
/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */ const toFlatObject = (sourceObj, destObj, filter, propFilter)=>{
    let props;
    let i;
    let prop;
    const merged = {};
    destObj = destObj || {};
    // eslint-disable-next-line no-eq-null,eqeqeq
    if (sourceObj == null) return destObj;
    do {
        props = Object.getOwnPropertyNames(sourceObj);
        i = props.length;
        while(i-- > 0){
            prop = props[i];
            if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
                destObj[prop] = sourceObj[prop];
                merged[prop] = true;
            }
        }
        sourceObj = filter !== false && getPrototypeOf(sourceObj);
    }while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
};
/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */ const endsWith = (str, searchString, position)=>{
    str = String(str);
    if (position === undefined || position > str.length) position = str.length;
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
};
/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */ const toArray = (thing)=>{
    if (!thing) return null;
    if (isArray(thing)) return thing;
    let i = thing.length;
    if (!isNumber(i)) return null;
    const arr = new Array(i);
    while(i-- > 0)arr[i] = thing[i];
    return arr;
};
/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */ // eslint-disable-next-line func-names
const isTypedArray = ((TypedArray)=>{
    // eslint-disable-next-line func-names
    return (thing)=>{
        return TypedArray && thing instanceof TypedArray;
    };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */ const forEachEntry = (obj, fn)=>{
    const generator = obj && obj[Symbol.iterator];
    const iterator = generator.call(obj);
    let result;
    while((result = iterator.next()) && !result.done){
        const pair = result.value;
        fn.call(obj, pair[0], pair[1]);
    }
};
/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */ const matchAll = (regExp, str)=>{
    let matches;
    const arr = [];
    while((matches = regExp.exec(str)) !== null)arr.push(matches);
    return arr;
};
/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */ const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str)=>{
    return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
        return p1.toUpperCase() + p2;
    });
};
/* Creating a function that will check if an object has a property. */ const hasOwnProperty = (({ hasOwnProperty })=>(obj, prop)=>hasOwnProperty.call(obj, prop))(Object.prototype);
/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */ const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer)=>{
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};
    forEach(descriptors, (descriptor, name)=>{
        let ret;
        if ((ret = reducer(descriptor, name, obj)) !== false) reducedDescriptors[name] = ret || descriptor;
    });
    Object.defineProperties(obj, reducedDescriptors);
};
/**
 * Makes all methods read-only
 * @param {Object} obj
 */ const freezeMethods = (obj)=>{
    reduceDescriptors(obj, (descriptor, name)=>{
        // skip restricted props in strict mode
        if (isFunction(obj) && [
            "arguments",
            "caller",
            "callee"
        ].indexOf(name) !== -1) return false;
        const value = obj[name];
        if (!isFunction(value)) return;
        descriptor.enumerable = false;
        if ("writable" in descriptor) {
            descriptor.writable = false;
            return;
        }
        if (!descriptor.set) descriptor.set = ()=>{
            throw Error("Can not rewrite read-only method '" + name + "'");
        };
    });
};
const toObjectSet = (arrayOrString, delimiter)=>{
    const obj = {};
    const define = (arr)=>{
        arr.forEach((value)=>{
            obj[value] = true;
        });
    };
    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
    return obj;
};
const noop = ()=>{};
const toFiniteNumber = (value, defaultValue)=>{
    value = +value;
    return Number.isFinite(value) ? value : defaultValue;
};
const ALPHA = "abcdefghijklmnopqrstuvwxyz";
const DIGIT = "0123456789";
const ALPHABET = {
    DIGIT,
    ALPHA,
    ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT)=>{
    let str = "";
    const { length } = alphabet;
    while(size--)str += alphabet[Math.random() * length | 0];
    return str;
};
/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */ function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
}
const toJSONObject = (obj)=>{
    const stack = new Array(10);
    const visit = (source, i)=>{
        if (isObject(source)) {
            if (stack.indexOf(source) >= 0) return;
            if (!("toJSON" in source)) {
                stack[i] = source;
                const target = isArray(source) ? [] : {};
                forEach(source, (value, key)=>{
                    const reducedValue = visit(value, i + 1);
                    !isUndefined(reducedValue) && (target[key] = reducedValue);
                });
                stack[i] = undefined;
                return target;
            }
        }
        return source;
    };
    return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing)=>thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
exports.default = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    ALPHABET,
    generateString,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable
};

},{"./helpers/bind.js":"1a8zu","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"1a8zu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>bind);
"use strict";
function bind(fn, thisArg) {
    return function wrap() {
        return fn.apply(thisArg, arguments);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"JWYlW":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"2u9gT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("./../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _buildURLJs = require("../helpers/buildURL.js");
var _buildURLJsDefault = parcelHelpers.interopDefault(_buildURLJs);
var _interceptorManagerJs = require("./InterceptorManager.js");
var _interceptorManagerJsDefault = parcelHelpers.interopDefault(_interceptorManagerJs);
var _dispatchRequestJs = require("./dispatchRequest.js");
var _dispatchRequestJsDefault = parcelHelpers.interopDefault(_dispatchRequestJs);
var _mergeConfigJs = require("./mergeConfig.js");
var _mergeConfigJsDefault = parcelHelpers.interopDefault(_mergeConfigJs);
var _buildFullPathJs = require("./buildFullPath.js");
var _buildFullPathJsDefault = parcelHelpers.interopDefault(_buildFullPathJs);
var _validatorJs = require("../helpers/validator.js");
var _validatorJsDefault = parcelHelpers.interopDefault(_validatorJs);
var _axiosHeadersJs = require("./AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
"use strict";
const validators = (0, _validatorJsDefault.default).validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */ class Axios {
    constructor(instanceConfig){
        this.defaults = instanceConfig;
        this.interceptors = {
            request: new (0, _interceptorManagerJsDefault.default)(),
            response: new (0, _interceptorManagerJsDefault.default)()
        };
    }
    /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */ request(configOrUrl, config) {
        /*eslint no-param-reassign:0*/ // Allow for axios('example/url'[, config]) a la fetch API
        if (typeof configOrUrl === "string") {
            config = config || {};
            config.url = configOrUrl;
        } else config = configOrUrl || {};
        config = (0, _mergeConfigJsDefault.default)(this.defaults, config);
        const { transitional, paramsSerializer, headers } = config;
        if (transitional !== undefined) (0, _validatorJsDefault.default).assertOptions(transitional, {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
        if (paramsSerializer != null) {
            if ((0, _utilsJsDefault.default).isFunction(paramsSerializer)) config.paramsSerializer = {
                serialize: paramsSerializer
            };
            else (0, _validatorJsDefault.default).assertOptions(paramsSerializer, {
                encode: validators.function,
                serialize: validators.function
            }, true);
        }
        // Set config.method
        config.method = (config.method || this.defaults.method || "get").toLowerCase();
        // Flatten headers
        let contextHeaders = headers && (0, _utilsJsDefault.default).merge(headers.common, headers[config.method]);
        headers && (0, _utilsJsDefault.default).forEach([
            "delete",
            "get",
            "head",
            "post",
            "put",
            "patch",
            "common"
        ], (method)=>{
            delete headers[method];
        });
        config.headers = (0, _axiosHeadersJsDefault.default).concat(contextHeaders, headers);
        // filter out skipped interceptors
        const requestInterceptorChain = [];
        let synchronousRequestInterceptors = true;
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
            if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) return;
            synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
            requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
        });
        const responseInterceptorChain = [];
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
            responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
        });
        let promise;
        let i = 0;
        let len;
        if (!synchronousRequestInterceptors) {
            const chain = [
                (0, _dispatchRequestJsDefault.default).bind(this),
                undefined
            ];
            chain.unshift.apply(chain, requestInterceptorChain);
            chain.push.apply(chain, responseInterceptorChain);
            len = chain.length;
            promise = Promise.resolve(config);
            while(i < len)promise = promise.then(chain[i++], chain[i++]);
            return promise;
        }
        len = requestInterceptorChain.length;
        let newConfig = config;
        i = 0;
        while(i < len){
            const onFulfilled = requestInterceptorChain[i++];
            const onRejected = requestInterceptorChain[i++];
            try {
                newConfig = onFulfilled(newConfig);
            } catch (error) {
                onRejected.call(this, error);
                break;
            }
        }
        try {
            promise = (0, _dispatchRequestJsDefault.default).call(this, newConfig);
        } catch (error) {
            return Promise.reject(error);
        }
        i = 0;
        len = responseInterceptorChain.length;
        while(i < len)promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
        return promise;
    }
    getUri(config) {
        config = (0, _mergeConfigJsDefault.default)(this.defaults, config);
        const fullPath = (0, _buildFullPathJsDefault.default)(config.baseURL, config.url);
        return (0, _buildURLJsDefault.default)(fullPath, config.params, config.paramsSerializer);
    }
}
// Provide aliases for supported request methods
(0, _utilsJsDefault.default).forEach([
    "delete",
    "get",
    "head",
    "options"
], function forEachMethodNoData(method) {
    /*eslint func-names:0*/ Axios.prototype[method] = function(url, config) {
        return this.request((0, _mergeConfigJsDefault.default)(config || {}, {
            method,
            url,
            data: (config || {}).data
        }));
    };
});
(0, _utilsJsDefault.default).forEach([
    "post",
    "put",
    "patch"
], function forEachMethodWithData(method) {
    /*eslint func-names:0*/ function generateHTTPMethod(isForm) {
        return function httpMethod(url, data, config) {
            return this.request((0, _mergeConfigJsDefault.default)(config || {}, {
                method,
                headers: isForm ? {
                    "Content-Type": "multipart/form-data"
                } : {},
                url,
                data
            }));
        };
    }
    Axios.prototype[method] = generateHTTPMethod();
    Axios.prototype[method + "Form"] = generateHTTPMethod(true);
});
exports.default = Axios;

},{"./../utils.js":"iXD88","../helpers/buildURL.js":"M2nXF","./InterceptorManager.js":"cPl3K","./dispatchRequest.js":"aJAEF","./mergeConfig.js":"fVymX","./buildFullPath.js":"eCjuS","../helpers/validator.js":"6A9Tn","./AxiosHeaders.js":"gghU6","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"M2nXF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>buildURL);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosURLSearchParamsJs = require("../helpers/AxiosURLSearchParams.js");
var _axiosURLSearchParamsJsDefault = parcelHelpers.interopDefault(_axiosURLSearchParamsJs);
"use strict";
/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */ function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url, params, options) {
    /*eslint no-param-reassign:0*/ if (!params) return url;
    const _encode = options && options.encode || encode;
    const serializeFn = options && options.serialize;
    let serializedParams;
    if (serializeFn) serializedParams = serializeFn(params, options);
    else serializedParams = (0, _utilsJsDefault.default).isURLSearchParams(params) ? params.toString() : new (0, _axiosURLSearchParamsJsDefault.default)(params, options).toString(_encode);
    if (serializedParams) {
        const hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) url = url.slice(0, hashmarkIndex);
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
}

},{"../utils.js":"iXD88","../helpers/AxiosURLSearchParams.js":"gPV6w","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"gPV6w":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _toFormDataJs = require("./toFormData.js");
var _toFormDataJsDefault = parcelHelpers.interopDefault(_toFormDataJs);
"use strict";
/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */ function encode(str) {
    const charMap = {
        "!": "%21",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "~": "%7E",
        "%20": "+",
        "%00": "\x00"
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
        return charMap[match];
    });
}
/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */ function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && (0, _toFormDataJsDefault.default)(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
    this._pairs.push([
        name,
        value
    ]);
};
prototype.toString = function toString(encoder) {
    const _encode = encoder ? function(value) {
        return encoder.call(this, value, encode);
    } : encode;
    return this._pairs.map(function each(pair) {
        return _encode(pair[0]) + "=" + _encode(pair[1]);
    }, "").join("&");
};
exports.default = AxiosURLSearchParams;

},{"./toFormData.js":"9Yt3k","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"9Yt3k":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
// temporary hotfix to avoid circular references until AxiosURLSearchParams is refactored
var _formDataJs = require("../platform/node/classes/FormData.js");
var _formDataJsDefault = parcelHelpers.interopDefault(_formDataJs);
var Buffer = require("adfd9b103875c2dd").Buffer;
"use strict";
/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */ function isVisitable(thing) {
    return (0, _utilsJsDefault.default).isPlainObject(thing) || (0, _utilsJsDefault.default).isArray(thing);
}
/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */ function removeBrackets(key) {
    return (0, _utilsJsDefault.default).endsWith(key, "[]") ? key.slice(0, -2) : key;
}
/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */ function renderKey(path, key, dots) {
    if (!path) return key;
    return path.concat(key).map(function each(token, i) {
        // eslint-disable-next-line no-param-reassign
        token = removeBrackets(token);
        return !dots && i ? "[" + token + "]" : token;
    }).join(dots ? "." : "");
}
/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */ function isFlatArray(arr) {
    return (0, _utilsJsDefault.default).isArray(arr) && !arr.some(isVisitable);
}
const predicates = (0, _utilsJsDefault.default).toFlatObject((0, _utilsJsDefault.default), {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
});
/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/ /**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */ function toFormData(obj, formData, options) {
    if (!(0, _utilsJsDefault.default).isObject(obj)) throw new TypeError("target must be an object");
    // eslint-disable-next-line no-param-reassign
    formData = formData || new ((0, _formDataJsDefault.default) || FormData)();
    // eslint-disable-next-line no-param-reassign
    options = (0, _utilsJsDefault.default).toFlatObject(options, {
        metaTokens: true,
        dots: false,
        indexes: false
    }, false, function defined(option, source) {
        // eslint-disable-next-line no-eq-null,eqeqeq
        return !(0, _utilsJsDefault.default).isUndefined(source[option]);
    });
    const metaTokens = options.metaTokens;
    // eslint-disable-next-line no-use-before-define
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
    const useBlob = _Blob && (0, _utilsJsDefault.default).isSpecCompliantForm(formData);
    if (!(0, _utilsJsDefault.default).isFunction(visitor)) throw new TypeError("visitor must be a function");
    function convertValue(value) {
        if (value === null) return "";
        if ((0, _utilsJsDefault.default).isDate(value)) return value.toISOString();
        if (!useBlob && (0, _utilsJsDefault.default).isBlob(value)) throw new (0, _axiosErrorJsDefault.default)("Blob is not supported. Use a Buffer instead.");
        if ((0, _utilsJsDefault.default).isArrayBuffer(value) || (0, _utilsJsDefault.default).isTypedArray(value)) return useBlob && typeof Blob === "function" ? new Blob([
            value
        ]) : Buffer.from(value);
        return value;
    }
    /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */ function defaultVisitor(value, key, path) {
        let arr = value;
        if (value && !path && typeof value === "object") {
            if ((0, _utilsJsDefault.default).endsWith(key, "{}")) {
                // eslint-disable-next-line no-param-reassign
                key = metaTokens ? key : key.slice(0, -2);
                // eslint-disable-next-line no-param-reassign
                value = JSON.stringify(value);
            } else if ((0, _utilsJsDefault.default).isArray(value) && isFlatArray(value) || ((0, _utilsJsDefault.default).isFileList(value) || (0, _utilsJsDefault.default).endsWith(key, "[]")) && (arr = (0, _utilsJsDefault.default).toArray(value))) {
                // eslint-disable-next-line no-param-reassign
                key = removeBrackets(key);
                arr.forEach(function each(el, index) {
                    !((0, _utilsJsDefault.default).isUndefined(el) || el === null) && formData.append(// eslint-disable-next-line no-nested-ternary
                    indexes === true ? renderKey([
                        key
                    ], index, dots) : indexes === null ? key : key + "[]", convertValue(el));
                });
                return false;
            }
        }
        if (isVisitable(value)) return true;
        formData.append(renderKey(path, key, dots), convertValue(value));
        return false;
    }
    const stack = [];
    const exposedHelpers = Object.assign(predicates, {
        defaultVisitor,
        convertValue,
        isVisitable
    });
    function build(value, path) {
        if ((0, _utilsJsDefault.default).isUndefined(value)) return;
        if (stack.indexOf(value) !== -1) throw Error("Circular reference detected in " + path.join("."));
        stack.push(value);
        (0, _utilsJsDefault.default).forEach(value, function each(el, key) {
            const result = !((0, _utilsJsDefault.default).isUndefined(el) || el === null) && visitor.call(formData, el, (0, _utilsJsDefault.default).isString(key) ? key.trim() : key, path, exposedHelpers);
            if (result === true) build(el, path ? path.concat(key) : [
                key
            ]);
        });
        stack.pop();
    }
    if (!(0, _utilsJsDefault.default).isObject(obj)) throw new TypeError("data must be an object");
    build(obj);
    return formData;
}
exports.default = toFormData;

},{"adfd9b103875c2dd":"b7Vf9","../utils.js":"iXD88","../core/AxiosError.js":"huY20","../platform/node/classes/FormData.js":"8NZt7","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"b7Vf9":[function(require,module,exports) {
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ /* eslint-disable no-proto */ "use strict";
const base64 = require("9c62938f1dccc73c");
const ieee754 = require("aceacb6a4531a9d2");
const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" // eslint-disable-line dot-notation
 ? Symbol["for"]("nodejs.util.inspect.custom") // eslint-disable-line dot-notation
 : null;
exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;
const K_MAX_LENGTH = 0x7fffffff;
exports.kMaxLength = K_MAX_LENGTH;
/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */ Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
function typedArraySupport() {
    // Can typed array instances can be augmented?
    try {
        const arr = new Uint8Array(1);
        const proto = {
            foo: function() {
                return 42;
            }
        };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
    } catch (e) {
        return false;
    }
}
Object.defineProperty(Buffer.prototype, "parent", {
    enumerable: true,
    get: function() {
        if (!Buffer.isBuffer(this)) return undefined;
        return this.buffer;
    }
});
Object.defineProperty(Buffer.prototype, "offset", {
    enumerable: true,
    get: function() {
        if (!Buffer.isBuffer(this)) return undefined;
        return this.byteOffset;
    }
});
function createBuffer(length) {
    if (length > K_MAX_LENGTH) throw new RangeError('The value "' + length + '" is invalid for option "size"');
    // Return an augmented `Uint8Array` instance
    const buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
}
/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */ function Buffer(arg, encodingOrOffset, length) {
    // Common case.
    if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") throw new TypeError('The "string" argument must be of type string. Received type number');
        return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
}
Buffer.poolSize = 8192 // not used by this implementation
;
function from(value, encodingOrOffset, length) {
    if (typeof value === "string") return fromString(value, encodingOrOffset);
    if (ArrayBuffer.isView(value)) return fromArrayView(value);
    if (value == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) return fromArrayBuffer(value, encodingOrOffset, length);
    if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) return fromArrayBuffer(value, encodingOrOffset, length);
    if (typeof value === "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) return Buffer.from(valueOf, encodingOrOffset, length);
    const b = fromObject(value);
    if (b) return b;
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") return Buffer.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/ Buffer.from = function(value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
};
// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(Buffer, Uint8Array);
function assertSize(size) {
    if (typeof size !== "number") throw new TypeError('"size" argument must be of type number');
    else if (size < 0) throw new RangeError('The value "' + size + '" is invalid for option "size"');
}
function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) return createBuffer(size);
    if (fill !== undefined) // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
    return createBuffer(size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/ Buffer.alloc = function(size, fill, encoding) {
    return alloc(size, fill, encoding);
};
function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */ Buffer.allocUnsafe = function(size) {
    return allocUnsafe(size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */ Buffer.allocUnsafeSlow = function(size) {
    return allocUnsafe(size);
};
function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") encoding = "utf8";
    if (!Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
    const length = byteLength(string, encoding) | 0;
    let buf = createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual);
    return buf;
}
function fromArrayLike(array) {
    const length = array.length < 0 ? 0 : checked(array.length) | 0;
    const buf = createBuffer(length);
    for(let i = 0; i < length; i += 1)buf[i] = array[i] & 255;
    return buf;
}
function fromArrayView(arrayView) {
    if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return fromArrayLike(arrayView);
}
function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError('"offset" is outside of buffer bounds');
    if (array.byteLength < byteOffset + (length || 0)) throw new RangeError('"length" is outside of buffer bounds');
    let buf;
    if (byteOffset === undefined && length === undefined) buf = new Uint8Array(array);
    else if (length === undefined) buf = new Uint8Array(array, byteOffset);
    else buf = new Uint8Array(array, byteOffset, length);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
}
function fromObject(obj) {
    if (Buffer.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) return buf;
        obj.copy(buf, 0, 0, len);
        return buf;
    }
    if (obj.length !== undefined) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) return createBuffer(0);
        return fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) return fromArrayLike(obj.data);
}
function checked(length) {
    // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= K_MAX_LENGTH) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
    return length | 0;
}
function SlowBuffer(length) {
    if (+length != length) length = 0;
    return Buffer.alloc(+length);
}
Buffer.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true && b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
    ;
};
Buffer.compare = function compare(a, b) {
    if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
    if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (a === b) return 0;
    let x = a.length;
    let y = b.length;
    for(let i = 0, len = Math.min(x, y); i < len; ++i)if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
Buffer.isEncoding = function isEncoding(encoding) {
    switch(String(encoding).toLowerCase()){
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return true;
        default:
            return false;
    }
};
Buffer.concat = function concat(list, length) {
    if (!Array.isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (list.length === 0) return Buffer.alloc(0);
    let i;
    if (length === undefined) {
        length = 0;
        for(i = 0; i < list.length; ++i)length += list[i].length;
    }
    const buffer = Buffer.allocUnsafe(length);
    let pos = 0;
    for(i = 0; i < list.length; ++i){
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
                if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf);
                buf.copy(buffer, pos);
            } else Uint8Array.prototype.set.call(buffer, buf, pos);
        } else if (!Buffer.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
        else buf.copy(buffer, pos);
        pos += buf.length;
    }
    return buffer;
};
function byteLength(string, encoding) {
    if (Buffer.isBuffer(string)) return string.length;
    if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) return string.byteLength;
    if (typeof string !== "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
    const len = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0) return 0;
    // Use a for loop to avoid recursion
    let loweredCase = false;
    for(;;)switch(encoding){
        case "ascii":
        case "latin1":
        case "binary":
            return len;
        case "utf8":
        case "utf-8":
            return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return len * 2;
        case "hex":
            return len >>> 1;
        case "base64":
            return base64ToBytes(string).length;
        default:
            if (loweredCase) return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
            ;
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
    }
}
Buffer.byteLength = byteLength;
function slowToString(encoding, start, end) {
    let loweredCase = false;
    // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.
    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    if (start === undefined || start < 0) start = 0;
    // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.
    if (start > this.length) return "";
    if (end === undefined || end > this.length) end = this.length;
    if (end <= 0) return "";
    // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
    end >>>= 0;
    start >>>= 0;
    if (end <= start) return "";
    if (!encoding) encoding = "utf8";
    while(true)switch(encoding){
        case "hex":
            return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
            return utf8Slice(this, start, end);
        case "ascii":
            return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
            return latin1Slice(this, start, end);
        case "base64":
            return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return utf16leSlice(this, start, end);
        default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
    }
}
// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true;
function swap(b, n, m) {
    const i = b[n];
    b[n] = b[m];
    b[m] = i;
}
Buffer.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for(let i = 0; i < len; i += 2)swap(this, i, i + 1);
    return this;
};
Buffer.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for(let i = 0; i < len; i += 4){
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
    }
    return this;
};
Buffer.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for(let i = 0; i < len; i += 8){
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
    }
    return this;
};
Buffer.prototype.toString = function toString() {
    const length = this.length;
    if (length === 0) return "";
    if (arguments.length === 0) return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
};
Buffer.prototype.toLocaleString = Buffer.prototype.toString;
Buffer.prototype.equals = function equals(b) {
    if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
    if (this === b) return true;
    return Buffer.compare(this, b) === 0;
};
Buffer.prototype.inspect = function inspect() {
    let str = "";
    const max = exports.INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max) str += " ... ";
    return "<Buffer " + str + ">";
};
if (customInspectSymbol) Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, Uint8Array)) target = Buffer.from(target, target.offset, target.byteLength);
    if (!Buffer.isBuffer(target)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
    if (start === undefined) start = 0;
    if (end === undefined) end = target ? target.length : 0;
    if (thisStart === undefined) thisStart = 0;
    if (thisEnd === undefined) thisEnd = this.length;
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError("out of range index");
    if (thisStart >= thisEnd && start >= end) return 0;
    if (thisStart >= thisEnd) return -1;
    if (start >= end) return 1;
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) return 0;
    let x = thisEnd - thisStart;
    let y = end - start;
    const len = Math.min(x, y);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for(let i = 0; i < len; ++i)if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    // Empty buffer means no match
    if (buffer.length === 0) return -1;
    // Normalize byteOffset
    if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
    } else if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff;
    else if (byteOffset < -2147483648) byteOffset = -2147483648;
    byteOffset = +byteOffset // Coerce to Number.
    ;
    if (numberIsNaN(byteOffset)) // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
    // Normalize byteOffset: negative offsets start from the end of the buffer
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
    }
    // Normalize val
    if (typeof val === "string") val = Buffer.from(val, encoding);
    // Finally, search either indexOf (if dir is true) or lastIndexOf
    if (Buffer.isBuffer(val)) {
        // Special case: looking for empty string/buffer always fails
        if (val.length === 0) return -1;
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
        val = val & 0xFF // Search for a byte value [0-255]
        ;
        if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            else return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
        return arrayIndexOf(buffer, [
            val
        ], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val.length;
    if (encoding !== undefined) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) return -1;
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
        }
    }
    function read(buf, i) {
        if (indexSize === 1) return buf[i];
        else return buf.readUInt16BE(i * indexSize);
    }
    let i;
    if (dir) {
        let foundIndex = -1;
        for(i = byteOffset; i < arrLength; i++)if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
        } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
        }
    } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for(i = byteOffset; i >= 0; i--){
            let found = true;
            for(let j = 0; j < valLength; j++)if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
            }
            if (found) return i;
        }
    }
    return -1;
}
Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
};
Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    const remaining = buf.length - offset;
    if (!length) length = remaining;
    else {
        length = Number(length);
        if (length > remaining) length = remaining;
    }
    const strLen = string.length;
    if (length > strLen / 2) length = strLen / 2;
    let i;
    for(i = 0; i < length; ++i){
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
    }
    return i;
}
function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}
Buffer.prototype.write = function write(string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
    // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
    } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === undefined) encoding = "utf8";
        } else {
            encoding = length;
            length = undefined;
        }
    } else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    const remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    if (!encoding) encoding = "utf8";
    let loweredCase = false;
    for(;;)switch(encoding){
        case "hex":
            return hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
            return utf8Write(this, string, offset, length);
        case "ascii":
        case "latin1":
        case "binary":
            return asciiWrite(this, string, offset, length);
        case "base64":
            // Warning: maxLength not taken into account in base64Write
            return base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return ucs2Write(this, string, offset, length);
        default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
    }
};
Buffer.prototype.toJSON = function toJSON() {
    return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
    };
};
function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) return base64.fromByteArray(buf);
    else return base64.fromByteArray(buf.slice(start, end));
}
function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i = start;
    while(i < end){
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;
        if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch(bytesPerSequence){
                case 1:
                    if (firstByte < 0x80) codePoint = firstByte;
                    break;
                case 2:
                    secondByte = buf[i + 1];
                    if ((secondByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
                        if (tempCodePoint > 0x7F) codePoint = tempCodePoint;
                    }
                    break;
                case 3:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
                        if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) codePoint = tempCodePoint;
                    }
                    break;
                case 4:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    fourthByte = buf[i + 3];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
                        if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) codePoint = tempCodePoint;
                    }
            }
        }
        if (codePoint === null) {
            // we did not generate a valid codePoint so insert a
            // replacement char (U+FFFD) and advance only 1 byte
            codePoint = 0xFFFD;
            bytesPerSequence = 1;
        } else if (codePoint > 0xFFFF) {
            // encode to utf16 (surrogate pair dance)
            codePoint -= 0x10000;
            res.push(codePoint >>> 10 & 0x3FF | 0xD800);
            codePoint = 0xDC00 | codePoint & 0x3FF;
        }
        res.push(codePoint);
        i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
}
// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000;
function decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
    ;
    // Decode in chunks to avoid "call stack size exceeded".
    let res = "";
    let i = 0;
    while(i < len)res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
    return res;
}
function asciiSlice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for(let i = start; i < end; ++i)ret += String.fromCharCode(buf[i] & 0x7F);
    return ret;
}
function latin1Slice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for(let i = start; i < end; ++i)ret += String.fromCharCode(buf[i]);
    return ret;
}
function hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;
    let out = "";
    for(let i = start; i < end; ++i)out += hexSliceLookupTable[buf[i]];
    return out;
}
function utf16leSlice(buf, start, end) {
    const bytes = buf.slice(start, end);
    let res = "";
    // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
    for(let i = 0; i < bytes.length - 1; i += 2)res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    return res;
}
Buffer.prototype.slice = function slice(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;
    if (start < 0) {
        start += len;
        if (start < 0) start = 0;
    } else if (start > len) start = len;
    if (end < 0) {
        end += len;
        if (end < 0) end = 0;
    } else if (end > len) end = len;
    if (end < start) end = start;
    const newBuf = this.subarray(start, end);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(newBuf, Buffer.prototype);
    return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */ function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
    if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
}
Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while(++i < byteLength && (mul *= 0x100))val += this[offset + i] * mul;
    return val;
};
Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let val = this[offset + --byteLength];
    let mul = 1;
    while(byteLength > 0 && (mul *= 0x100))val += this[offset + --byteLength] * mul;
    return val;
};
Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset];
};
Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
};
Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
};
Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};
Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};
Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) boundsError(offset, this.length - 8);
    const lo = first + this[++offset] * 256 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
    const hi = this[++offset] + this[++offset] * 256 + this[++offset] * 2 ** 16 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi) << BigInt(32));
});
Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) boundsError(offset, this.length - 8);
    const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 256 + this[++offset];
    const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 256 + last;
    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
});
Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while(++i < byteLength && (mul *= 0x100))val += this[offset + i] * mul;
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
};
Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let i = byteLength;
    let mul = 1;
    let val = this[offset + --i];
    while(i > 0 && (mul *= 0x100))val += this[offset + --i] * mul;
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
};
Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80)) return this[offset];
    return (0xff - this[offset] + 1) * -1;
};
Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset] | this[offset + 1] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset + 1] | this[offset] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};
Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};
Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) boundsError(offset, this.length - 8);
    const val = this[offset + 4] + this[offset + 5] * 256 + this[offset + 6] * 2 ** 16 + (last << 24 // Overflow
    );
    return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 256 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
});
Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) boundsError(offset, this.length - 8);
    const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 + this[++offset] * 256 + this[++offset];
    return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 256 + last);
});
Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
};
Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
};
Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
};
Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
};
function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
}
Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    let mul = 1;
    let i = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength && (mul *= 0x100))this[offset + i] = value / mul & 0xFF;
    return offset + byteLength;
};
Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    let i = byteLength - 1;
    let mul = 1;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100))this[offset + i] = value / mul & 0xFF;
    return offset + byteLength;
};
Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
    this[offset] = value & 0xff;
    return offset + 1;
};
Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
    return offset + 4;
};
Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
function wrtBigUInt64LE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(0xffffffff));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    return offset;
}
function wrtBigUInt64BE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(0xffffffff));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    buf[offset + 3] = hi;
    hi = hi >> 8;
    buf[offset + 2] = hi;
    hi = hi >> 8;
    buf[offset + 1] = hi;
    hi = hi >> 8;
    buf[offset] = hi;
    return offset + 8;
}
Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
});
Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
});
Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    let i = 0;
    let mul = 1;
    let sub = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) sub = 1;
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    let i = byteLength - 1;
    let mul = 1;
    let sub = 0;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) sub = 1;
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -128);
    if (value < 0) value = 0xff + value + 1;
    this[offset] = value & 0xff;
    return offset + 1;
};
Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -32768);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
};
Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
    if (value < 0) value = 0xffffffff + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
});
Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
});
function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
    if (offset < 0) throw new RangeError("Index out of range");
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -340282346638528860000000000000000000000);
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
}
Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
};
Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
};
function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
}
Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
};
Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
};
// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer.isBuffer(target)) throw new TypeError("argument should be a Buffer");
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;
    // Copy 0 bytes; we're done
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;
    // Fatal error conditions
    if (targetStart < 0) throw new RangeError("targetStart out of bounds");
    if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
    if (end < 0) throw new RangeError("sourceEnd out of bounds");
    // Are we oob?
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) end = target.length - targetStart + start;
    const len = end - start;
    if (this === target && typeof Uint8Array.prototype.copyWithin === "function") // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end);
    else Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
    return len;
};
// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === "string") {
        if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
        } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
        }
        if (encoding !== undefined && typeof encoding !== "string") throw new TypeError("encoding must be a string");
        if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
        if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") // Fast path: If `val` fits into a single byte, use that numeric value.
            val = code;
        }
    } else if (typeof val === "number") val = val & 255;
    else if (typeof val === "boolean") val = Number(val);
    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
    if (end <= start) return this;
    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;
    if (!val) val = 0;
    let i;
    if (typeof val === "number") for(i = start; i < end; ++i)this[i] = val;
    else {
        const bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
        const len = bytes.length;
        if (len === 0) throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        for(i = 0; i < end - start; ++i)this[i + start] = bytes[i % len];
    }
    return this;
};
// CUSTOM ERRORS
// =============
// Simplified versions from Node, changed for Buffer-only usage
const errors = {};
function E(sym, getMessage, Base) {
    errors[sym] = class NodeError extends Base {
        constructor(){
            super();
            Object.defineProperty(this, "message", {
                value: getMessage.apply(this, arguments),
                writable: true,
                configurable: true
            });
            // Add the error code to the name to include it in the stack trace.
            this.name = `${this.name} [${sym}]`;
            // Access the stack to generate the error message including the error code
            // from the name.
            this.stack // eslint-disable-line no-unused-expressions
            ;
            // Reset the name to the actual name.
            delete this.name;
        }
        get code() {
            return sym;
        }
        set code(value) {
            Object.defineProperty(this, "code", {
                configurable: true,
                enumerable: true,
                value,
                writable: true
            });
        }
        toString() {
            return `${this.name} [${sym}]: ${this.message}`;
        }
    };
}
E("ERR_BUFFER_OUT_OF_BOUNDS", function(name) {
    if (name) return `${name} is outside of buffer bounds`;
    return "Attempt to access memory outside buffer bounds";
}, RangeError);
E("ERR_INVALID_ARG_TYPE", function(name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
}, TypeError);
E("ERR_OUT_OF_RANGE", function(str, range, input) {
    let msg = `The value of "${str}" is out of range.`;
    let received = input;
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) received = addNumericalSeparator(String(input));
    else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) received = addNumericalSeparator(received);
        received += "n";
    }
    msg += ` It must be ${range}. Received ${received}`;
    return msg;
}, RangeError);
function addNumericalSeparator(val) {
    let res = "";
    let i = val.length;
    const start = val[0] === "-" ? 1 : 0;
    for(; i >= start + 4; i -= 3)res = `_${val.slice(i - 3, i)}${res}`;
    return `${val.slice(0, i)}${res}`;
}
// CHECK FUNCTIONS
// ===============
function checkBounds(buf, offset, byteLength) {
    validateNumber(offset, "offset");
    if (buf[offset] === undefined || buf[offset + byteLength] === undefined) boundsError(offset, buf.length - (byteLength + 1));
}
function checkIntBI(value, min, max, buf, offset, byteLength) {
    if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength > 3) {
            if (min === 0 || min === BigInt(0)) range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`;
            else range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` + `${(byteLength + 1) * 8 - 1}${n}`;
        } else range = `>= ${min}${n} and <= ${max}${n}`;
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
    }
    checkBounds(buf, offset, byteLength);
}
function validateNumber(value, name) {
    if (typeof value !== "number") throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
}
function boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
    }
    if (length < 0) throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
    throw new errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
}
// HELPER FUNCTIONS
// ================
const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
function base64clean(str) {
    // Node takes equal signs as end of the Base64 encoding
    str = str.split("=")[0];
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = str.trim().replace(INVALID_BASE64_RE, "");
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return "";
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while(str.length % 4 !== 0)str = str + "=";
    return str;
}
function utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for(let i = 0; i < length; ++i){
        codePoint = string.charCodeAt(i);
        // is surrogate component
        if (codePoint > 0xD7FF && codePoint < 0xE000) {
            // last char was a lead
            if (!leadSurrogate) {
                // no lead yet
                if (codePoint > 0xDBFF) {
                    // unexpected trail
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                } else if (i + 1 === length) {
                    // unpaired lead
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                }
                // valid lead
                leadSurrogate = codePoint;
                continue;
            }
            // 2 leads in a row
            if (codePoint < 0xDC00) {
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                leadSurrogate = codePoint;
                continue;
            }
            // valid surrogate pair
            codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
        } else if (leadSurrogate) // valid bmp char, but last char was a lead
        {
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        }
        leadSurrogate = null;
        // encode utf8
        if (codePoint < 0x80) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
        } else if (codePoint < 0x800) {
            if ((units -= 2) < 0) break;
            bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x10000) {
            if ((units -= 3) < 0) break;
            bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x110000) {
            if ((units -= 4) < 0) break;
            bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else throw new Error("Invalid code point");
    }
    return bytes;
}
function asciiToBytes(str) {
    const byteArray = [];
    for(let i = 0; i < str.length; ++i)// Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
    return byteArray;
}
function utf16leToBytes(str, units) {
    let c, hi, lo;
    const byteArray = [];
    for(let i = 0; i < str.length; ++i){
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
    }
    return byteArray;
}
function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
    let i;
    for(i = 0; i < length; ++i){
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
    }
    return i;
}
// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
}
function numberIsNaN(obj) {
    // For IE11 support
    return obj !== obj // eslint-disable-line no-self-compare
    ;
}
// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = function() {
    const alphabet = "0123456789abcdef";
    const table = new Array(256);
    for(let i = 0; i < 16; ++i){
        const i16 = i * 16;
        for(let j = 0; j < 16; ++j)table[i16 + j] = alphabet[i] + alphabet[j];
    }
    return table;
}();
// Return not function with Error if BigInt not supported
function defineBigIntMethod(fn) {
    return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
}
function BufferBigIntNotDefined() {
    throw new Error("BigInt not supported");
}

},{"9c62938f1dccc73c":"ipqeb","aceacb6a4531a9d2":"WBkb5"}],"ipqeb":[function(require,module,exports) {
"use strict";
exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for(var i = 0, len = code.length; i < len; ++i){
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
}
// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
    var len = b64.length;
    if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len;
    var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [
        validLen,
        placeHoldersLen
    ];
}
// base64 is 4/3 + up to two characters of the original data
function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    // if there are placeholders, only get up to the last complete 4 chars
    var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i;
    for(i = 0; i < len; i += 4){
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 0xFF;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    return arr;
}
function tripletToBase64(num) {
    return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}
function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for(var i = start; i < end; i += 3){
        tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
        output.push(tripletToBase64(tmp));
    }
    return output.join("");
}
function fromByteArray(uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
    ;
    var parts = [];
    var maxChunkLength = 16383 // must be multiple of 3
    ;
    // go through the array every three bytes, we'll deal with trailing stuff later
    for(var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength)parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + "==");
    } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + "=");
    }
    return parts.join("");
}

},{}],"WBkb5":[function(require,module,exports) {
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ exports.read = function(buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];
    i += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for(; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for(; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);
    if (e === 0) e = 1 - eBias;
    else if (e === eMax) return m ? NaN : (s ? -1 : 1) * Infinity;
    else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};
exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
    } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
        }
        if (e + eBias >= 1) value += rt / c;
        else value += rt * Math.pow(2, 1 - eBias);
        if (value * c >= 2) {
            e++;
            c /= 2;
        }
        if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
        } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
        } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
        }
    }
    for(; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);
    e = e << mLen | m;
    eLen += mLen;
    for(; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);
    buffer[offset + i - d] |= s * 128;
};

},{}],"huY20":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
"use strict";
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */ function AxiosError(message, code, config, request, response) {
    Error.call(this);
    if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
    else this.stack = new Error().stack;
    this.message = message;
    this.name = "AxiosError";
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    response && (this.response = response);
}
(0, _utilsJsDefault.default).inherits(AxiosError, Error, {
    toJSON: function toJSON() {
        return {
            // Standard
            message: this.message,
            name: this.name,
            // Microsoft
            description: this.description,
            number: this.number,
            // Mozilla
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            // Axios
            config: (0, _utilsJsDefault.default).toJSONObject(this.config),
            code: this.code,
            status: this.response && this.response.status ? this.response.status : null
        };
    }
});
const prototype = AxiosError.prototype;
const descriptors = {};
[
    "ERR_BAD_OPTION_VALUE",
    "ERR_BAD_OPTION",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ERR_NETWORK",
    "ERR_FR_TOO_MANY_REDIRECTS",
    "ERR_DEPRECATED",
    "ERR_BAD_RESPONSE",
    "ERR_BAD_REQUEST",
    "ERR_CANCELED",
    "ERR_NOT_SUPPORT",
    "ERR_INVALID_URL"
].forEach((code)=>{
    descriptors[code] = {
        value: code
    };
});
Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, "isAxiosError", {
    value: true
});
// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps)=>{
    const axiosError = Object.create(prototype);
    (0, _utilsJsDefault.default).toFlatObject(error, axiosError, function filter(obj) {
        return obj !== Error.prototype;
    }, (prop)=>{
        return prop !== "isAxiosError";
    });
    AxiosError.call(axiosError, error.message, code, config, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
};
exports.default = AxiosError;

},{"../utils.js":"iXD88","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"8NZt7":[function(require,module,exports) {
// eslint-disable-next-line strict
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = null;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"cPl3K":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("./../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
"use strict";
class InterceptorManager {
    constructor(){
        this.handlers = [];
    }
    /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */ use(fulfilled, rejected, options) {
        this.handlers.push({
            fulfilled,
            rejected,
            synchronous: options ? options.synchronous : false,
            runWhen: options ? options.runWhen : null
        });
        return this.handlers.length - 1;
    }
    /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */ eject(id) {
        if (this.handlers[id]) this.handlers[id] = null;
    }
    /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */ clear() {
        if (this.handlers) this.handlers = [];
    }
    /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */ forEach(fn) {
        (0, _utilsJsDefault.default).forEach(this.handlers, function forEachHandler(h) {
            if (h !== null) fn(h);
        });
    }
}
exports.default = InterceptorManager;

},{"./../utils.js":"iXD88","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"aJAEF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>dispatchRequest);
var _transformDataJs = require("./transformData.js");
var _transformDataJsDefault = parcelHelpers.interopDefault(_transformDataJs);
var _isCancelJs = require("../cancel/isCancel.js");
var _isCancelJsDefault = parcelHelpers.interopDefault(_isCancelJs);
var _indexJs = require("../defaults/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _canceledErrorJs = require("../cancel/CanceledError.js");
var _canceledErrorJsDefault = parcelHelpers.interopDefault(_canceledErrorJs);
var _axiosHeadersJs = require("../core/AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
var _adaptersJs = require("../adapters/adapters.js");
var _adaptersJsDefault = parcelHelpers.interopDefault(_adaptersJs);
"use strict";
/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */ function throwIfCancellationRequested(config) {
    if (config.cancelToken) config.cancelToken.throwIfRequested();
    if (config.signal && config.signal.aborted) throw new (0, _canceledErrorJsDefault.default)(null, config);
}
function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = (0, _axiosHeadersJsDefault.default).from(config.headers);
    // Transform request data
    config.data = (0, _transformDataJsDefault.default).call(config, config.transformRequest);
    if ([
        "post",
        "put",
        "patch"
    ].indexOf(config.method) !== -1) config.headers.setContentType("application/x-www-form-urlencoded", false);
    const adapter = (0, _adaptersJsDefault.default).getAdapter(config.adapter || (0, _indexJsDefault.default).adapter);
    return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        // Transform response data
        response.data = (0, _transformDataJsDefault.default).call(config, config.transformResponse, response);
        response.headers = (0, _axiosHeadersJsDefault.default).from(response.headers);
        return response;
    }, function onAdapterRejection(reason) {
        if (!(0, _isCancelJsDefault.default)(reason)) {
            throwIfCancellationRequested(config);
            // Transform response data
            if (reason && reason.response) {
                reason.response.data = (0, _transformDataJsDefault.default).call(config, config.transformResponse, reason.response);
                reason.response.headers = (0, _axiosHeadersJsDefault.default).from(reason.response.headers);
            }
        }
        return Promise.reject(reason);
    });
}

},{"./transformData.js":"avVeT","../cancel/isCancel.js":"1P1Rb","../defaults/index.js":"lhPYD","../cancel/CanceledError.js":"lEmzM","../core/AxiosHeaders.js":"gghU6","../adapters/adapters.js":"jjINk","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"avVeT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>transformData);
var _utilsJs = require("./../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _indexJs = require("../defaults/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _axiosHeadersJs = require("../core/AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
"use strict";
function transformData(fns, response) {
    const config = this || (0, _indexJsDefault.default);
    const context = response || config;
    const headers = (0, _axiosHeadersJsDefault.default).from(context.headers);
    let data = context.data;
    (0, _utilsJsDefault.default).forEach(fns, function transform(fn) {
        data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
    });
    headers.normalize();
    return data;
}

},{"./../utils.js":"iXD88","../defaults/index.js":"lhPYD","../core/AxiosHeaders.js":"gghU6","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"lhPYD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _transitionalJs = require("./transitional.js");
var _transitionalJsDefault = parcelHelpers.interopDefault(_transitionalJs);
var _toFormDataJs = require("../helpers/toFormData.js");
var _toFormDataJsDefault = parcelHelpers.interopDefault(_toFormDataJs);
var _toURLEncodedFormJs = require("../helpers/toURLEncodedForm.js");
var _toURLEncodedFormJsDefault = parcelHelpers.interopDefault(_toURLEncodedFormJs);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _formDataToJSONJs = require("../helpers/formDataToJSON.js");
var _formDataToJSONJsDefault = parcelHelpers.interopDefault(_formDataToJSONJs);
"use strict";
/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */ function stringifySafely(rawValue, parser, encoder) {
    if ((0, _utilsJsDefault.default).isString(rawValue)) try {
        (parser || JSON.parse)(rawValue);
        return (0, _utilsJsDefault.default).trim(rawValue);
    } catch (e) {
        if (e.name !== "SyntaxError") throw e;
    }
    return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
    transitional: (0, _transitionalJsDefault.default),
    adapter: [
        "xhr",
        "http"
    ],
    transformRequest: [
        function transformRequest(data, headers) {
            const contentType = headers.getContentType() || "";
            const hasJSONContentType = contentType.indexOf("application/json") > -1;
            const isObjectPayload = (0, _utilsJsDefault.default).isObject(data);
            if (isObjectPayload && (0, _utilsJsDefault.default).isHTMLForm(data)) data = new FormData(data);
            const isFormData = (0, _utilsJsDefault.default).isFormData(data);
            if (isFormData) {
                if (!hasJSONContentType) return data;
                return hasJSONContentType ? JSON.stringify((0, _formDataToJSONJsDefault.default)(data)) : data;
            }
            if ((0, _utilsJsDefault.default).isArrayBuffer(data) || (0, _utilsJsDefault.default).isBuffer(data) || (0, _utilsJsDefault.default).isStream(data) || (0, _utilsJsDefault.default).isFile(data) || (0, _utilsJsDefault.default).isBlob(data)) return data;
            if ((0, _utilsJsDefault.default).isArrayBufferView(data)) return data.buffer;
            if ((0, _utilsJsDefault.default).isURLSearchParams(data)) {
                headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
                return data.toString();
            }
            let isFileList;
            if (isObjectPayload) {
                if (contentType.indexOf("application/x-www-form-urlencoded") > -1) return (0, _toURLEncodedFormJsDefault.default)(data, this.formSerializer).toString();
                if ((isFileList = (0, _utilsJsDefault.default).isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
                    const _FormData = this.env && this.env.FormData;
                    return (0, _toFormDataJsDefault.default)(isFileList ? {
                        "files[]": data
                    } : data, _FormData && new _FormData(), this.formSerializer);
                }
            }
            if (isObjectPayload || hasJSONContentType) {
                headers.setContentType("application/json", false);
                return stringifySafely(data);
            }
            return data;
        }
    ],
    transformResponse: [
        function transformResponse(data) {
            const transitional = this.transitional || defaults.transitional;
            const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
            const JSONRequested = this.responseType === "json";
            if (data && (0, _utilsJsDefault.default).isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
                const silentJSONParsing = transitional && transitional.silentJSONParsing;
                const strictJSONParsing = !silentJSONParsing && JSONRequested;
                try {
                    return JSON.parse(data);
                } catch (e) {
                    if (strictJSONParsing) {
                        if (e.name === "SyntaxError") throw (0, _axiosErrorJsDefault.default).from(e, (0, _axiosErrorJsDefault.default).ERR_BAD_RESPONSE, this, null, this.response);
                        throw e;
                    }
                }
            }
            return data;
        }
    ],
    /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */ timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
        FormData: (0, _indexJsDefault.default).classes.FormData,
        Blob: (0, _indexJsDefault.default).classes.Blob
    },
    validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
    },
    headers: {
        common: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": undefined
        }
    }
};
(0, _utilsJsDefault.default).forEach([
    "delete",
    "get",
    "head",
    "post",
    "put",
    "patch"
], (method)=>{
    defaults.headers[method] = {};
});
exports.default = defaults;

},{"../utils.js":"iXD88","../core/AxiosError.js":"huY20","./transitional.js":"e7cCK","../helpers/toFormData.js":"9Yt3k","../helpers/toURLEncodedForm.js":"kMmfp","../platform/index.js":"3nhcR","../helpers/formDataToJSON.js":"bEw8y","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"e7cCK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
"use strict";
exports.default = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"kMmfp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>toURLEncodedForm);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _toFormDataJs = require("./toFormData.js");
var _toFormDataJsDefault = parcelHelpers.interopDefault(_toFormDataJs);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
"use strict";
function toURLEncodedForm(data, options) {
    return (0, _toFormDataJsDefault.default)(data, new (0, _indexJsDefault.default).classes.URLSearchParams(), Object.assign({
        visitor: function(value, key, path, helpers) {
            if ((0, _indexJsDefault.default).isNode && (0, _utilsJsDefault.default).isBuffer(value)) {
                this.append(key, value.toString("base64"));
                return false;
            }
            return helpers.defaultVisitor.apply(this, arguments);
        }
    }, options));
}

},{"../utils.js":"iXD88","./toFormData.js":"9Yt3k","../platform/index.js":"3nhcR","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"3nhcR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>(0, _indexJsDefault.default));
var _indexJs = require("./node/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);

},{"./node/index.js":"4w6jH","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"4w6jH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _urlsearchParamsJs = require("./classes/URLSearchParams.js");
var _urlsearchParamsJsDefault = parcelHelpers.interopDefault(_urlsearchParamsJs);
var _formDataJs = require("./classes/FormData.js");
var _formDataJsDefault = parcelHelpers.interopDefault(_formDataJs);
var _blobJs = require("./classes/Blob.js");
var _blobJsDefault = parcelHelpers.interopDefault(_blobJs);
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */ const isStandardBrowserEnv = (()=>{
    let product;
    if (typeof navigator !== "undefined" && ((product = navigator.product) === "ReactNative" || product === "NativeScript" || product === "NS")) return false;
    return typeof window !== "undefined" && typeof document !== "undefined";
})();
/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */ const isStandardBrowserWebWorkerEnv = (()=>{
    return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
exports.default = {
    isBrowser: true,
    classes: {
        URLSearchParams: (0, _urlsearchParamsJsDefault.default),
        FormData: (0, _formDataJsDefault.default),
        Blob: (0, _blobJsDefault.default)
    },
    isStandardBrowserEnv,
    isStandardBrowserWebWorkerEnv,
    protocols: [
        "http",
        "https",
        "file",
        "blob",
        "url",
        "data"
    ]
};

},{"./classes/URLSearchParams.js":"H6hen","./classes/FormData.js":"k70Vk","./classes/Blob.js":"h62bi","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"H6hen":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _axiosURLSearchParamsJs = require("../../../helpers/AxiosURLSearchParams.js");
var _axiosURLSearchParamsJsDefault = parcelHelpers.interopDefault(_axiosURLSearchParamsJs);
"use strict";
exports.default = typeof URLSearchParams !== "undefined" ? URLSearchParams : (0, _axiosURLSearchParamsJsDefault.default);

},{"../../../helpers/AxiosURLSearchParams.js":"gPV6w","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"k70Vk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
"use strict";
exports.default = typeof FormData !== "undefined" ? FormData : null;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"h62bi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
"use strict";
exports.default = typeof Blob !== "undefined" ? Blob : null;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"bEw8y":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
"use strict";
/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */ function parsePropPath(name) {
    // foo[x][y][z]
    // foo.x.y.z
    // foo-x-y-z
    // foo x y z
    return (0, _utilsJsDefault.default).matchAll(/\w+|\[(\w*)]/g, name).map((match)=>{
        return match[0] === "[]" ? "" : match[1] || match[0];
    });
}
/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */ function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for(i = 0; i < len; i++){
        key = keys[i];
        obj[key] = arr[key];
    }
    return obj;
}
/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */ function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
        let name = path[index++];
        const isNumericKey = Number.isFinite(+name);
        const isLast = index >= path.length;
        name = !name && (0, _utilsJsDefault.default).isArray(target) ? target.length : name;
        if (isLast) {
            if ((0, _utilsJsDefault.default).hasOwnProp(target, name)) target[name] = [
                target[name],
                value
            ];
            else target[name] = value;
            return !isNumericKey;
        }
        if (!target[name] || !(0, _utilsJsDefault.default).isObject(target[name])) target[name] = [];
        const result = buildPath(path, value, target[name], index);
        if (result && (0, _utilsJsDefault.default).isArray(target[name])) target[name] = arrayToObject(target[name]);
        return !isNumericKey;
    }
    if ((0, _utilsJsDefault.default).isFormData(formData) && (0, _utilsJsDefault.default).isFunction(formData.entries)) {
        const obj = {};
        (0, _utilsJsDefault.default).forEachEntry(formData, (name, value)=>{
            buildPath(parsePropPath(name), value, obj, 0);
        });
        return obj;
    }
    return null;
}
exports.default = formDataToJSON;

},{"../utils.js":"iXD88","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"gghU6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _parseHeadersJs = require("../helpers/parseHeaders.js");
var _parseHeadersJsDefault = parcelHelpers.interopDefault(_parseHeadersJs);
"use strict";
const $internals = Symbol("internals");
function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
    if (value === false || value == null) return value;
    return (0, _utilsJsDefault.default).isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
    const tokens = Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while(match = tokensRE.exec(str))tokens[match[1]] = match[2];
    return tokens;
}
const isValidHeaderName = (str)=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
    if ((0, _utilsJsDefault.default).isFunction(filter)) return filter.call(this, value, header);
    if (isHeaderNameFilter) value = header;
    if (!(0, _utilsJsDefault.default).isString(value)) return;
    if ((0, _utilsJsDefault.default).isString(filter)) return value.indexOf(filter) !== -1;
    if ((0, _utilsJsDefault.default).isRegExp(filter)) return filter.test(value);
}
function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str)=>{
        return char.toUpperCase() + str;
    });
}
function buildAccessors(obj, header) {
    const accessorName = (0, _utilsJsDefault.default).toCamelCase(" " + header);
    [
        "get",
        "set",
        "has"
    ].forEach((methodName)=>{
        Object.defineProperty(obj, methodName + accessorName, {
            value: function(arg1, arg2, arg3) {
                return this[methodName].call(this, header, arg1, arg2, arg3);
            },
            configurable: true
        });
    });
}
class AxiosHeaders {
    constructor(headers){
        headers && this.set(headers);
    }
    set(header, valueOrRewrite, rewrite) {
        const self = this;
        function setHeader(_value, _header, _rewrite) {
            const lHeader = normalizeHeader(_header);
            if (!lHeader) throw new Error("header name must be a non-empty string");
            const key = (0, _utilsJsDefault.default).findKey(self, lHeader);
            if (!key || self[key] === undefined || _rewrite === true || _rewrite === undefined && self[key] !== false) self[key || _header] = normalizeValue(_value);
        }
        const setHeaders = (headers, _rewrite)=>(0, _utilsJsDefault.default).forEach(headers, (_value, _header)=>setHeader(_value, _header, _rewrite));
        if ((0, _utilsJsDefault.default).isPlainObject(header) || header instanceof this.constructor) setHeaders(header, valueOrRewrite);
        else if ((0, _utilsJsDefault.default).isString(header) && (header = header.trim()) && !isValidHeaderName(header)) setHeaders((0, _parseHeadersJsDefault.default)(header), valueOrRewrite);
        else header != null && setHeader(valueOrRewrite, header, rewrite);
        return this;
    }
    get(header, parser) {
        header = normalizeHeader(header);
        if (header) {
            const key = (0, _utilsJsDefault.default).findKey(this, header);
            if (key) {
                const value = this[key];
                if (!parser) return value;
                if (parser === true) return parseTokens(value);
                if ((0, _utilsJsDefault.default).isFunction(parser)) return parser.call(this, value, key);
                if ((0, _utilsJsDefault.default).isRegExp(parser)) return parser.exec(value);
                throw new TypeError("parser must be boolean|regexp|function");
            }
        }
    }
    has(header, matcher) {
        header = normalizeHeader(header);
        if (header) {
            const key = (0, _utilsJsDefault.default).findKey(this, header);
            return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
        }
        return false;
    }
    delete(header, matcher) {
        const self = this;
        let deleted = false;
        function deleteHeader(_header) {
            _header = normalizeHeader(_header);
            if (_header) {
                const key = (0, _utilsJsDefault.default).findKey(self, _header);
                if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
                    delete self[key];
                    deleted = true;
                }
            }
        }
        if ((0, _utilsJsDefault.default).isArray(header)) header.forEach(deleteHeader);
        else deleteHeader(header);
        return deleted;
    }
    clear(matcher) {
        const keys = Object.keys(this);
        let i = keys.length;
        let deleted = false;
        while(i--){
            const key = keys[i];
            if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
                delete this[key];
                deleted = true;
            }
        }
        return deleted;
    }
    normalize(format) {
        const self = this;
        const headers = {};
        (0, _utilsJsDefault.default).forEach(this, (value, header)=>{
            const key = (0, _utilsJsDefault.default).findKey(headers, header);
            if (key) {
                self[key] = normalizeValue(value);
                delete self[header];
                return;
            }
            const normalized = format ? formatHeader(header) : String(header).trim();
            if (normalized !== header) delete self[header];
            self[normalized] = normalizeValue(value);
            headers[normalized] = true;
        });
        return this;
    }
    concat(...targets) {
        return this.constructor.concat(this, ...targets);
    }
    toJSON(asStrings) {
        const obj = Object.create(null);
        (0, _utilsJsDefault.default).forEach(this, (value, header)=>{
            value != null && value !== false && (obj[header] = asStrings && (0, _utilsJsDefault.default).isArray(value) ? value.join(", ") : value);
        });
        return obj;
    }
    [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
        return Object.entries(this.toJSON()).map(([header, value])=>header + ": " + value).join("\n");
    }
    get [Symbol.toStringTag]() {
        return "AxiosHeaders";
    }
    static from(thing) {
        return thing instanceof this ? thing : new this(thing);
    }
    static concat(first, ...targets) {
        const computed = new this(first);
        targets.forEach((target)=>computed.set(target));
        return computed;
    }
    static accessor(header) {
        const internals = this[$internals] = this[$internals] = {
            accessors: {}
        };
        const accessors = internals.accessors;
        const prototype = this.prototype;
        function defineAccessor(_header) {
            const lHeader = normalizeHeader(_header);
            if (!accessors[lHeader]) {
                buildAccessors(prototype, _header);
                accessors[lHeader] = true;
            }
        }
        (0, _utilsJsDefault.default).isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
        return this;
    }
}
AxiosHeaders.accessor([
    "Content-Type",
    "Content-Length",
    "Accept",
    "Accept-Encoding",
    "User-Agent",
    "Authorization"
]);
// reserved names hotfix
(0, _utilsJsDefault.default).reduceDescriptors(AxiosHeaders.prototype, ({ value }, key)=>{
    let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
    return {
        get: ()=>value,
        set (headerValue) {
            this[mapped] = headerValue;
        }
    };
});
(0, _utilsJsDefault.default).freezeMethods(AxiosHeaders);
exports.default = AxiosHeaders;

},{"../utils.js":"iXD88","../helpers/parseHeaders.js":"47Hgy","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"47Hgy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("./../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
"use strict";
// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = (0, _utilsJsDefault.default).toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
]);
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */ exports.default = (rawHeaders)=>{
    const parsed = {};
    let key;
    let val;
    let i;
    rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
        i = line.indexOf(":");
        key = line.substring(0, i).trim().toLowerCase();
        val = line.substring(i + 1).trim();
        if (!key || parsed[key] && ignoreDuplicateOf[key]) return;
        if (key === "set-cookie") {
            if (parsed[key]) parsed[key].push(val);
            else parsed[key] = [
                val
            ];
        } else parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    });
    return parsed;
};

},{"./../utils.js":"iXD88","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"1P1Rb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>isCancel);
"use strict";
function isCancel(value) {
    return !!(value && value.__CANCEL__);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"lEmzM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
"use strict";
/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */ function CanceledError(message, config, request) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    (0, _axiosErrorJsDefault.default).call(this, message == null ? "canceled" : message, (0, _axiosErrorJsDefault.default).ERR_CANCELED, config, request);
    this.name = "CanceledError";
}
(0, _utilsJsDefault.default).inherits(CanceledError, (0, _axiosErrorJsDefault.default), {
    __CANCEL__: true
});
exports.default = CanceledError;

},{"../core/AxiosError.js":"huY20","../utils.js":"iXD88","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"jjINk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _httpJs = require("./http.js");
var _httpJsDefault = parcelHelpers.interopDefault(_httpJs);
var _xhrJs = require("./xhr.js");
var _xhrJsDefault = parcelHelpers.interopDefault(_xhrJs);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
const knownAdapters = {
    http: (0, _httpJsDefault.default),
    xhr: (0, _xhrJsDefault.default)
};
(0, _utilsJsDefault.default).forEach(knownAdapters, (fn, value)=>{
    if (fn) {
        try {
            Object.defineProperty(fn, "name", {
                value
            });
        } catch (e) {
        // eslint-disable-next-line no-empty
        }
        Object.defineProperty(fn, "adapterName", {
            value
        });
    }
});
const renderReason = (reason)=>`- ${reason}`;
const isResolvedHandle = (adapter)=>(0, _utilsJsDefault.default).isFunction(adapter) || adapter === null || adapter === false;
exports.default = {
    getAdapter: (adapters)=>{
        adapters = (0, _utilsJsDefault.default).isArray(adapters) ? adapters : [
            adapters
        ];
        const { length } = adapters;
        let nameOrAdapter;
        let adapter;
        const rejectedReasons = {};
        for(let i = 0; i < length; i++){
            nameOrAdapter = adapters[i];
            let id;
            adapter = nameOrAdapter;
            if (!isResolvedHandle(nameOrAdapter)) {
                adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
                if (adapter === undefined) throw new (0, _axiosErrorJsDefault.default)(`Unknown adapter '${id}'`);
            }
            if (adapter) break;
            rejectedReasons[id || "#" + i] = adapter;
        }
        if (!adapter) {
            const reasons = Object.entries(rejectedReasons).map(([id, state])=>`adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build"));
            let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
            throw new (0, _axiosErrorJsDefault.default)(`There is no suitable adapter to dispatch the request ` + s, "ERR_NOT_SUPPORT");
        }
        return adapter;
    },
    adapters: knownAdapters
};

},{"../utils.js":"iXD88","./http.js":"8NZt7","./xhr.js":"gBRua","../core/AxiosError.js":"huY20","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"gBRua":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("./../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _settleJs = require("./../core/settle.js");
var _settleJsDefault = parcelHelpers.interopDefault(_settleJs);
var _cookiesJs = require("./../helpers/cookies.js");
var _cookiesJsDefault = parcelHelpers.interopDefault(_cookiesJs);
var _buildURLJs = require("./../helpers/buildURL.js");
var _buildURLJsDefault = parcelHelpers.interopDefault(_buildURLJs);
var _buildFullPathJs = require("../core/buildFullPath.js");
var _buildFullPathJsDefault = parcelHelpers.interopDefault(_buildFullPathJs);
var _isURLSameOriginJs = require("./../helpers/isURLSameOrigin.js");
var _isURLSameOriginJsDefault = parcelHelpers.interopDefault(_isURLSameOriginJs);
var _transitionalJs = require("../defaults/transitional.js");
var _transitionalJsDefault = parcelHelpers.interopDefault(_transitionalJs);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _canceledErrorJs = require("../cancel/CanceledError.js");
var _canceledErrorJsDefault = parcelHelpers.interopDefault(_canceledErrorJs);
var _parseProtocolJs = require("../helpers/parseProtocol.js");
var _parseProtocolJsDefault = parcelHelpers.interopDefault(_parseProtocolJs);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _axiosHeadersJs = require("../core/AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
var _speedometerJs = require("../helpers/speedometer.js");
var _speedometerJsDefault = parcelHelpers.interopDefault(_speedometerJs);
"use strict";
function progressEventReducer(listener, isDownloadStream) {
    let bytesNotified = 0;
    const _speedometer = (0, _speedometerJsDefault.default)(50, 250);
    return (e)=>{
        const loaded = e.loaded;
        const total = e.lengthComputable ? e.total : undefined;
        const progressBytes = loaded - bytesNotified;
        const rate = _speedometer(progressBytes);
        const inRange = loaded <= total;
        bytesNotified = loaded;
        const data = {
            loaded,
            total,
            progress: total ? loaded / total : undefined,
            bytes: progressBytes,
            rate: rate ? rate : undefined,
            estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
            event: e
        };
        data[isDownloadStream ? "download" : "upload"] = true;
        listener(data);
    };
}
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
exports.default = isXHRAdapterSupported && function(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
        let requestData = config.data;
        const requestHeaders = (0, _axiosHeadersJsDefault.default).from(config.headers).normalize();
        const responseType = config.responseType;
        let onCanceled;
        function done() {
            if (config.cancelToken) config.cancelToken.unsubscribe(onCanceled);
            if (config.signal) config.signal.removeEventListener("abort", onCanceled);
        }
        let contentType;
        if ((0, _utilsJsDefault.default).isFormData(requestData)) {
            if ((0, _indexJsDefault.default).isStandardBrowserEnv || (0, _indexJsDefault.default).isStandardBrowserWebWorkerEnv) requestHeaders.setContentType(false); // Let the browser set it
            else if (!requestHeaders.getContentType(/^\s*multipart\/form-data/)) requestHeaders.setContentType("multipart/form-data"); // mobile/desktop app frameworks
            else if ((0, _utilsJsDefault.default).isString(contentType = requestHeaders.getContentType())) // fix semicolon duplication issue for ReactNative FormData implementation
            requestHeaders.setContentType(contentType.replace(/^\s*(multipart\/form-data);+/, "$1"));
        }
        let request = new XMLHttpRequest();
        // HTTP basic authentication
        if (config.auth) {
            const username = config.auth.username || "";
            const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
            requestHeaders.set("Authorization", "Basic " + btoa(username + ":" + password));
        }
        const fullPath = (0, _buildFullPathJsDefault.default)(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), (0, _buildURLJsDefault.default)(fullPath, config.params, config.paramsSerializer), true);
        // Set the request timeout in MS
        request.timeout = config.timeout;
        function onloadend() {
            if (!request) return;
            // Prepare the response
            const responseHeaders = (0, _axiosHeadersJsDefault.default).from("getAllResponseHeaders" in request && request.getAllResponseHeaders());
            const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
            const response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            };
            (0, _settleJsDefault.default)(function _resolve(value) {
                resolve(value);
                done();
            }, function _reject(err) {
                reject(err);
                done();
            }, response);
            // Clean up request
            request = null;
        }
        if ("onloadend" in request) // Use onloadend if available
        request.onloadend = onloadend;
        else // Listen for ready state to emulate onloadend
        request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) return;
            // The request errored out and we didn't get a response, this will be
            // handled by onerror instead
            // With one exception: request that using file: protocol, most browsers
            // will return status as 0 even though it's a successful request
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) return;
            // readystate handler is calling before onerror or ontimeout handlers,
            // so we should call onloadend on the next 'tick'
            setTimeout(onloadend);
        };
        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
            if (!request) return;
            reject(new (0, _axiosErrorJsDefault.default)("Request aborted", (0, _axiosErrorJsDefault.default).ECONNABORTED, config, request));
            // Clean up request
            request = null;
        };
        // Handle low level network errors
        request.onerror = function handleError() {
            // Real errors are hidden from us by the browser
            // onerror should only fire if it's a network error
            reject(new (0, _axiosErrorJsDefault.default)("Network Error", (0, _axiosErrorJsDefault.default).ERR_NETWORK, config, request));
            // Clean up request
            request = null;
        };
        // Handle timeout
        request.ontimeout = function handleTimeout() {
            let timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
            const transitional = config.transitional || (0, _transitionalJsDefault.default);
            if (config.timeoutErrorMessage) timeoutErrorMessage = config.timeoutErrorMessage;
            reject(new (0, _axiosErrorJsDefault.default)(timeoutErrorMessage, transitional.clarifyTimeoutError ? (0, _axiosErrorJsDefault.default).ETIMEDOUT : (0, _axiosErrorJsDefault.default).ECONNABORTED, config, request));
            // Clean up request
            request = null;
        };
        // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.
        if ((0, _indexJsDefault.default).isStandardBrowserEnv) {
            // Add xsrf header
            const xsrfValue = (config.withCredentials || (0, _isURLSameOriginJsDefault.default)(fullPath)) && config.xsrfCookieName && (0, _cookiesJsDefault.default).read(config.xsrfCookieName);
            if (xsrfValue) requestHeaders.set(config.xsrfHeaderName, xsrfValue);
        }
        // Remove Content-Type if data is undefined
        requestData === undefined && requestHeaders.setContentType(null);
        // Add headers to the request
        if ("setRequestHeader" in request) (0, _utilsJsDefault.default).forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
            request.setRequestHeader(key, val);
        });
        // Add withCredentials to request if needed
        if (!(0, _utilsJsDefault.default).isUndefined(config.withCredentials)) request.withCredentials = !!config.withCredentials;
        // Add responseType to request if needed
        if (responseType && responseType !== "json") request.responseType = config.responseType;
        // Handle progress if needed
        if (typeof config.onDownloadProgress === "function") request.addEventListener("progress", progressEventReducer(config.onDownloadProgress, true));
        // Not all browsers support upload events
        if (typeof config.onUploadProgress === "function" && request.upload) request.upload.addEventListener("progress", progressEventReducer(config.onUploadProgress));
        if (config.cancelToken || config.signal) {
            // Handle cancellation
            // eslint-disable-next-line func-names
            onCanceled = (cancel)=>{
                if (!request) return;
                reject(!cancel || cancel.type ? new (0, _canceledErrorJsDefault.default)(null, config, request) : cancel);
                request.abort();
                request = null;
            };
            config.cancelToken && config.cancelToken.subscribe(onCanceled);
            if (config.signal) config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
        }
        const protocol = (0, _parseProtocolJsDefault.default)(fullPath);
        if (protocol && (0, _indexJsDefault.default).protocols.indexOf(protocol) === -1) {
            reject(new (0, _axiosErrorJsDefault.default)("Unsupported protocol " + protocol + ":", (0, _axiosErrorJsDefault.default).ERR_BAD_REQUEST, config));
            return;
        }
        // Send the request
        request.send(requestData || null);
    });
};

},{"./../utils.js":"iXD88","./../core/settle.js":"7pC9n","./../helpers/cookies.js":"kbMUm","./../helpers/buildURL.js":"M2nXF","../core/buildFullPath.js":"eCjuS","./../helpers/isURLSameOrigin.js":"avQaF","../defaults/transitional.js":"e7cCK","../core/AxiosError.js":"huY20","../cancel/CanceledError.js":"lEmzM","../helpers/parseProtocol.js":"ay9zF","../platform/index.js":"3nhcR","../core/AxiosHeaders.js":"gghU6","../helpers/speedometer.js":"2Nchw","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"7pC9n":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>settle);
var _axiosErrorJs = require("./AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
"use strict";
function settle(resolve, reject, response) {
    const validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) resolve(response);
    else reject(new (0, _axiosErrorJsDefault.default)("Request failed with status code " + response.status, [
        (0, _axiosErrorJsDefault.default).ERR_BAD_REQUEST,
        (0, _axiosErrorJsDefault.default).ERR_BAD_RESPONSE
    ][Math.floor(response.status / 100) - 4], response.config, response.request, response));
}

},{"./AxiosError.js":"huY20","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"kbMUm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("./../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
"use strict";
exports.default = (0, _indexJsDefault.default).isStandardBrowserEnv ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
    return {
        write: function write(name, value, expires, path, domain, secure) {
            const cookie = [];
            cookie.push(name + "=" + encodeURIComponent(value));
            if ((0, _utilsJsDefault.default).isNumber(expires)) cookie.push("expires=" + new Date(expires).toGMTString());
            if ((0, _utilsJsDefault.default).isString(path)) cookie.push("path=" + path);
            if ((0, _utilsJsDefault.default).isString(domain)) cookie.push("domain=" + domain);
            if (secure === true) cookie.push("secure");
            document.cookie = cookie.join("; ");
        },
        read: function read(name) {
            const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
            return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
            this.write(name, "", Date.now() - 86400000);
        }
    };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
    return {
        write: function write() {},
        read: function read() {
            return null;
        },
        remove: function remove() {}
    };
}();

},{"./../utils.js":"iXD88","../platform/index.js":"3nhcR","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"eCjuS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>buildFullPath);
var _isAbsoluteURLJs = require("../helpers/isAbsoluteURL.js");
var _isAbsoluteURLJsDefault = parcelHelpers.interopDefault(_isAbsoluteURLJs);
var _combineURLsJs = require("../helpers/combineURLs.js");
var _combineURLsJsDefault = parcelHelpers.interopDefault(_combineURLsJs);
"use strict";
function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !(0, _isAbsoluteURLJsDefault.default)(requestedURL)) return (0, _combineURLsJsDefault.default)(baseURL, requestedURL);
    return requestedURL;
}

},{"../helpers/isAbsoluteURL.js":"4rdYh","../helpers/combineURLs.js":"2IBUM","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"4rdYh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>isAbsoluteURL);
"use strict";
function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"2IBUM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>combineURLs);
"use strict";
function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"avQaF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("./../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
"use strict";
exports.default = (0, _indexJsDefault.default).isStandardBrowserEnv ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement("a");
    let originURL;
    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */ function resolveURL(url) {
        let href = url;
        if (msie) {
            // IE needs attribute set twice to normalize properties
            urlParsingNode.setAttribute("href", href);
            href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
    }
    originURL = resolveURL(window.location.href);
    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */ return function isURLSameOrigin(requestURL) {
        const parsed = (0, _utilsJsDefault.default).isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
        return true;
    };
}();

},{"./../utils.js":"iXD88","../platform/index.js":"3nhcR","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"ay9zF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>parseProtocol);
"use strict";
function parseProtocol(url) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || "";
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"2Nchw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
"use strict";
/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */ function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== undefined ? min : 1000;
    return function push(chunkLength) {
        const now = Date.now();
        const startedAt = timestamps[tail];
        if (!firstSampleTS) firstSampleTS = now;
        bytes[head] = chunkLength;
        timestamps[head] = now;
        let i = tail;
        let bytesCount = 0;
        while(i !== head){
            bytesCount += bytes[i++];
            i = i % samplesCount;
        }
        head = (head + 1) % samplesCount;
        if (head === tail) tail = (tail + 1) % samplesCount;
        if (now - firstSampleTS < min) return;
        const passed = startedAt && now - startedAt;
        return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
    };
}
exports.default = speedometer;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"fVymX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>mergeConfig);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosHeadersJs = require("./AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
"use strict";
const headersToObject = (thing)=>thing instanceof (0, _axiosHeadersJsDefault.default) ? thing.toJSON() : thing;
function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    const config = {};
    function getMergedValue(target, source, caseless) {
        if ((0, _utilsJsDefault.default).isPlainObject(target) && (0, _utilsJsDefault.default).isPlainObject(source)) return (0, _utilsJsDefault.default).merge.call({
            caseless
        }, target, source);
        else if ((0, _utilsJsDefault.default).isPlainObject(source)) return (0, _utilsJsDefault.default).merge({}, source);
        else if ((0, _utilsJsDefault.default).isArray(source)) return source.slice();
        return source;
    }
    // eslint-disable-next-line consistent-return
    function mergeDeepProperties(a, b, caseless) {
        if (!(0, _utilsJsDefault.default).isUndefined(b)) return getMergedValue(a, b, caseless);
        else if (!(0, _utilsJsDefault.default).isUndefined(a)) return getMergedValue(undefined, a, caseless);
    }
    // eslint-disable-next-line consistent-return
    function valueFromConfig2(a, b) {
        if (!(0, _utilsJsDefault.default).isUndefined(b)) return getMergedValue(undefined, b);
    }
    // eslint-disable-next-line consistent-return
    function defaultToConfig2(a, b) {
        if (!(0, _utilsJsDefault.default).isUndefined(b)) return getMergedValue(undefined, b);
        else if (!(0, _utilsJsDefault.default).isUndefined(a)) return getMergedValue(undefined, a);
    }
    // eslint-disable-next-line consistent-return
    function mergeDirectKeys(a, b, prop) {
        if (prop in config2) return getMergedValue(a, b);
        else if (prop in config1) return getMergedValue(undefined, a);
    }
    const mergeMap = {
        url: valueFromConfig2,
        method: valueFromConfig2,
        data: valueFromConfig2,
        baseURL: defaultToConfig2,
        transformRequest: defaultToConfig2,
        transformResponse: defaultToConfig2,
        paramsSerializer: defaultToConfig2,
        timeout: defaultToConfig2,
        timeoutMessage: defaultToConfig2,
        withCredentials: defaultToConfig2,
        adapter: defaultToConfig2,
        responseType: defaultToConfig2,
        xsrfCookieName: defaultToConfig2,
        xsrfHeaderName: defaultToConfig2,
        onUploadProgress: defaultToConfig2,
        onDownloadProgress: defaultToConfig2,
        decompress: defaultToConfig2,
        maxContentLength: defaultToConfig2,
        maxBodyLength: defaultToConfig2,
        beforeRedirect: defaultToConfig2,
        transport: defaultToConfig2,
        httpAgent: defaultToConfig2,
        httpsAgent: defaultToConfig2,
        cancelToken: defaultToConfig2,
        socketPath: defaultToConfig2,
        responseEncoding: defaultToConfig2,
        validateStatus: mergeDirectKeys,
        headers: (a, b)=>mergeDeepProperties(headersToObject(a), headersToObject(b), true)
    };
    (0, _utilsJsDefault.default).forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
        const merge = mergeMap[prop] || mergeDeepProperties;
        const configValue = merge(config1[prop], config2[prop], prop);
        (0, _utilsJsDefault.default).isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
    });
    return config;
}

},{"../utils.js":"iXD88","./AxiosHeaders.js":"gghU6","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"6A9Tn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _dataJs = require("../env/data.js");
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
"use strict";
const validators = {};
// eslint-disable-next-line func-names
[
    "object",
    "boolean",
    "number",
    "function",
    "string",
    "symbol"
].forEach((type, i)=>{
    validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
    };
});
const deprecatedWarnings = {};
/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */ validators.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
        return "[Axios v" + (0, _dataJs.VERSION) + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
    }
    // eslint-disable-next-line func-names
    return (value, opt, opts)=>{
        if (validator === false) throw new (0, _axiosErrorJsDefault.default)(formatMessage(opt, " has been removed" + (version ? " in " + version : "")), (0, _axiosErrorJsDefault.default).ERR_DEPRECATED);
        if (version && !deprecatedWarnings[opt]) {
            deprecatedWarnings[opt] = true;
            // eslint-disable-next-line no-console
            console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
        }
        return validator ? validator(value, opt, opts) : true;
    };
};
/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */ function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object") throw new (0, _axiosErrorJsDefault.default)("options must be an object", (0, _axiosErrorJsDefault.default).ERR_BAD_OPTION_VALUE);
    const keys = Object.keys(options);
    let i = keys.length;
    while(i-- > 0){
        const opt = keys[i];
        const validator = schema[opt];
        if (validator) {
            const value = options[opt];
            const result = value === undefined || validator(value, opt, options);
            if (result !== true) throw new (0, _axiosErrorJsDefault.default)("option " + opt + " must be " + result, (0, _axiosErrorJsDefault.default).ERR_BAD_OPTION_VALUE);
            continue;
        }
        if (allowUnknown !== true) throw new (0, _axiosErrorJsDefault.default)("Unknown option " + opt, (0, _axiosErrorJsDefault.default).ERR_BAD_OPTION);
    }
}
exports.default = {
    assertOptions,
    validators
};

},{"../env/data.js":"kzYEo","../core/AxiosError.js":"huY20","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"kzYEo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "VERSION", ()=>VERSION);
const VERSION = "1.5.1";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"ipO9K":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _canceledErrorJs = require("./CanceledError.js");
var _canceledErrorJsDefault = parcelHelpers.interopDefault(_canceledErrorJs);
"use strict";
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */ class CancelToken {
    constructor(executor){
        if (typeof executor !== "function") throw new TypeError("executor must be a function.");
        let resolvePromise;
        this.promise = new Promise(function promiseExecutor(resolve) {
            resolvePromise = resolve;
        });
        const token = this;
        // eslint-disable-next-line func-names
        this.promise.then((cancel)=>{
            if (!token._listeners) return;
            let i = token._listeners.length;
            while(i-- > 0)token._listeners[i](cancel);
            token._listeners = null;
        });
        // eslint-disable-next-line func-names
        this.promise.then = (onfulfilled)=>{
            let _resolve;
            // eslint-disable-next-line func-names
            const promise = new Promise((resolve)=>{
                token.subscribe(resolve);
                _resolve = resolve;
            }).then(onfulfilled);
            promise.cancel = function reject() {
                token.unsubscribe(_resolve);
            };
            return promise;
        };
        executor(function cancel(message, config, request) {
            if (token.reason) // Cancellation has already been requested
            return;
            token.reason = new (0, _canceledErrorJsDefault.default)(message, config, request);
            resolvePromise(token.reason);
        });
    }
    /**
   * Throws a `CanceledError` if cancellation has been requested.
   */ throwIfRequested() {
        if (this.reason) throw this.reason;
    }
    /**
   * Subscribe to the cancel signal
   */ subscribe(listener) {
        if (this.reason) {
            listener(this.reason);
            return;
        }
        if (this._listeners) this._listeners.push(listener);
        else this._listeners = [
            listener
        ];
    }
    /**
   * Unsubscribe from the cancel signal
   */ unsubscribe(listener) {
        if (!this._listeners) return;
        const index = this._listeners.indexOf(listener);
        if (index !== -1) this._listeners.splice(index, 1);
    }
    /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */ static source() {
        let cancel;
        const token = new CancelToken(function executor(c) {
            cancel = c;
        });
        return {
            token,
            cancel
        };
    }
}
exports.default = CancelToken;

},{"./CanceledError.js":"lEmzM","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"k56CX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>spread);
"use strict";
function spread(callback) {
    return function wrap(arr) {
        return callback.apply(null, arr);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"gNfCK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>isAxiosError);
var _utilsJs = require("./../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
"use strict";
function isAxiosError(payload) {
    return (0, _utilsJsDefault.default).isObject(payload) && payload.isAxiosError === true;
}

},{"./../utils.js":"iXD88","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"kKPo7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const HttpStatusCode = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode).forEach(([key, value])=>{
    HttpStatusCode[value] = key;
});
exports.default = HttpStatusCode;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"fcWRG":[function(require,module,exports) {
//type is 'succes' or 'error'
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "showAlert", ()=>showAlert);
parcelHelpers.export(exports, "hideAlert", ()=>hideAlert);
const showAlert = (type, msg)=>{
    hideAlert();
    const markup = `<div class='alert alert--${type}'>${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout(hideAlert, 5000);
};
const hideAlert = ()=>{
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"dfCfX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "forgotPassword", ()=>forgotPassword);
var _axios = require("axios");
var _axiosDefault = parcelHelpers.interopDefault(_axios);
var _alert = require("./alert");
const forgotPassword = async (email)=>{
    try {
        const res = await (0, _axiosDefault.default)({
            method: "POST",
            url: "/api/v1/users/forgotPassword",
            data: {
                email
            }
        });
        if (res.data.status === "success") {
            (0, _alert.showAlert)("success", "Email sent successfully");
            window.setTimeout(()=>{
                location.assign("/");
            }, 1000);
        }
    } catch (err) {
        (0, _alert.showAlert)("error", err.response.data.message);
    }
};

},{"axios":"7SmSB","./alert":"fcWRG","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"9Jdvy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "resetPassword", ()=>resetPassword);
var _axios = require("axios");
var _axiosDefault = parcelHelpers.interopDefault(_axios);
var _alert = require("./alert");
const resetPassword = async (password, passwordConfirm, token)=>{
    try {
        const res = await (0, _axiosDefault.default)({
            method: "PATCH",
            url: `/api/v1/users/resetPassword/${token}`,
            data: {
                password,
                passwordConfirm
            }
        });
        if (res.data.status === "success") {
            (0, _alert.showAlert)("success", "Password reset successful");
            window.setTimeout(()=>{
                location.assign("/");
            }, 500);
        }
    } catch (err) {
        (0, _alert.showAlert)("error", err.response.data.message);
    }
};

},{"axios":"7SmSB","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW","./alert":"fcWRG"}],"aDfie":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "signUp", ()=>signUp);
var _axios = require("axios");
var _axiosDefault = parcelHelpers.interopDefault(_axios);
var _alert = require("./alert");
const signUp = async (name, email, password, passwordConfirm)=>{
    try {
        const res = await (0, _axiosDefault.default)({
            method: "POST",
            url: "/api/v1/users/signup",
            data: {
                name,
                email,
                password,
                passwordConfirm
            }
        });
        if (res.data.status === "success") {
            (0, _alert.showAlert)("success", "Sign up successfully");
            window.setTimeout(()=>{
                location.assign("/");
            }, 500);
        }
    } catch (err) {
        (0, _alert.showAlert)("error", err.response.data.message);
    }
};

},{"axios":"7SmSB","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW","./alert":"fcWRG"}],"3TrB0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "updateSettings", ()=>updateSettings);
var _axios = require("axios");
var _axiosDefault = parcelHelpers.interopDefault(_axios);
var _alert = require("./alert");
const updateSettings = async (data, type)=>{
    try {
        const url = type === "Password" ? "http://127.0.0.1:3000/api/v1/users/updateMyPassword" : "http://127.0.0.1:3000/api/v1/users/updateMe";
        const res = await (0, _axiosDefault.default)({
            method: "PATCH",
            url,
            data
        });
        if (res.data.status === "success") {
            (0, _alert.showAlert)("success", `${type} updated successfully!`);
            if (type === "Photo") return res.data.data.user.photo;
        }
    } catch (err) {
        (0, _alert.showAlert)("error", err.response.data.message);
    }
};

},{"axios":"7SmSB","./alert":"fcWRG","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"7GOmF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "displayMap", ()=>displayMap);
const displayMap = (locations)=>{
    mapboxgl.accessToken = "pk.eyJ1IjoicHJhdmluLTY5IiwiYSI6ImNsbmZtNm1rYzB3cnIyam1uZ2xrdjkxdm0ifQ.66L07bmabiBTlSZHOvysCQ";
    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/pravin-69/clnfn0310007001pih6gb8o42",
        //  style: 'mapbox://styles/pravin-69/clnhlgn2m00ab01pi8bnhfwrs',
        scrollZoom: false
    });
    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach((loc)=>{
        // Create marker
        const el = document.createElement("div");
        el.className = "marker";
        //   Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: "bottom"
        }).setLngLat(loc.coordinates).addTo(map);
        //  Add popup
        new mapboxgl.Popup({
            offset: 30,
            focusAfterOpen: false
        }).setLngLat(loc.coordinates).setHTML(`<p style="font-weight: 700">Day ${loc.day}: ${loc.description}</p>`).addTo(map);
        //  Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
}; // map.on('style.load', () => {
 //   map.setConfigProperty('basemap', 'lightPreset', 'night');
 // });
 ///////////////    Leaflet //////////////////
 // var map = L.map('map', { zoomControl: false });
 // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 //   attribution:
 //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
 // }).addTo(map);
 // const points = [];
 // locations.forEach((loc) => {
 //   points.push([loc.coordinates[1], loc.coordinates[0]]);
 //   L.marker([loc.coordinates[1], loc.coordinates[0]])
 //     .addTo(map)
 //     .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
 //       autoClose: false,
 //     })
 //     .openPopup();
 // });
 // const bounds = L.latLngBounds(points).pad(0.5);
 // map.fitBounds(bounds);
 // map.scrollWheelZoom.disable();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"1YW63":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bookTour", ()=>bookTour);
var _axios = require("axios");
var _axiosDefault = parcelHelpers.interopDefault(_axios);
var _alert = require("./alert");
const bookTour = async (tourId)=>{
    const stripe = Stripe("pk_test_51O1jvqSAmJeXxlF6DOqOel1k8Lxn6Q9GJTNCfwMavG1lwQkvix2Mw2p1X1jGbBn7fOuY2WJxegM2So9iKu1ntP0200AXKUm27p");
    try {
        // 1) Get checkout session from endpoint of API
        const session = await (0, _axiosDefault.default)(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`);
        console.log(session);
        // 2) Create checkout form + charge credit card}
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        console.log(err);
        (0, _alert.showAlert)("error", err);
    }
};

},{"axios":"7SmSB","./alert":"fcWRG","@parcel/transformer-js/src/esmodule-helpers.js":"JWYlW"}],"crvWe":[function(require,module,exports) {
/**
 * Dark Reader v4.9.67
 * https://darkreader.org/
 */ (function(global, factory) {
    factory(exports);
})(this, function(exports1) {
    "use strict";
    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol */ var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for(var s, i = 1, n = arguments.length; i < n; i++){
                s = arguments[i];
                for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
                resolve(value);
            });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = {
            label: 0,
            sent: function() {
                if (t[0] & 1) throw t[1];
                return t[1];
            },
            trys: [],
            ops: []
        }, f, y, t, g;
        return g = {
            next: verb(0),
            throw: verb(1),
            return: verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
        }), g;
        function verb(n) {
            return function(v) {
                return step([
                    n,
                    v
                ]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while(g && (g = 0, op[0] && (_ = 0)), _)try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [
                    op[0] & 2,
                    t.value
                ];
                switch(op[0]){
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return {
                            value: op[1],
                            done: false
                        };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [
                            0
                        ];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [
                    6,
                    e
                ];
                y = 0;
            } finally{
                f = t = 0;
            }
            if (op[0] & 5) throw op[1];
            return {
                value: op[0] ? op[1] : void 0,
                done: true
            };
        }
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function() {
                if (o && i >= o.length) o = void 0;
                return {
                    value: o && o[i++],
                    done: !o
                };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
        } catch (error) {
            e = {
                error: error
            };
        } finally{
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            } finally{
                if (e) throw e.error;
            }
        }
        return ar;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) {
            for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    typeof SuppressedError === "function" && SuppressedError;
    var MessageTypeUItoBG;
    (function(MessageTypeUItoBG) {
        MessageTypeUItoBG["GET_DATA"] = "ui-bg-get-data";
        MessageTypeUItoBG["GET_DEVTOOLS_DATA"] = "ui-bg-get-devtools-data";
        MessageTypeUItoBG["SUBSCRIBE_TO_CHANGES"] = "ui-bg-subscribe-to-changes";
        MessageTypeUItoBG["UNSUBSCRIBE_FROM_CHANGES"] = "ui-bg-unsubscribe-from-changes";
        MessageTypeUItoBG["CHANGE_SETTINGS"] = "ui-bg-change-settings";
        MessageTypeUItoBG["SET_THEME"] = "ui-bg-set-theme";
        MessageTypeUItoBG["TOGGLE_ACTIVE_TAB"] = "ui-bg-toggle-active-tab";
        MessageTypeUItoBG["MARK_NEWS_AS_READ"] = "ui-bg-mark-news-as-read";
        MessageTypeUItoBG["MARK_NEWS_AS_DISPLAYED"] = "ui-bg-mark-news-as-displayed";
        MessageTypeUItoBG["LOAD_CONFIG"] = "ui-bg-load-config";
        MessageTypeUItoBG["APPLY_DEV_DYNAMIC_THEME_FIXES"] = "ui-bg-apply-dev-dynamic-theme-fixes";
        MessageTypeUItoBG["RESET_DEV_DYNAMIC_THEME_FIXES"] = "ui-bg-reset-dev-dynamic-theme-fixes";
        MessageTypeUItoBG["APPLY_DEV_INVERSION_FIXES"] = "ui-bg-apply-dev-inversion-fixes";
        MessageTypeUItoBG["RESET_DEV_INVERSION_FIXES"] = "ui-bg-reset-dev-inversion-fixes";
        MessageTypeUItoBG["APPLY_DEV_STATIC_THEMES"] = "ui-bg-apply-dev-static-themes";
        MessageTypeUItoBG["RESET_DEV_STATIC_THEMES"] = "ui-bg-reset-dev-static-themes";
        MessageTypeUItoBG["COLOR_SCHEME_CHANGE"] = "ui-bg-color-scheme-change";
        MessageTypeUItoBG["HIDE_HIGHLIGHTS"] = "ui-bg-hide-highlights";
    })(MessageTypeUItoBG || (MessageTypeUItoBG = {}));
    var MessageTypeBGtoUI;
    (function(MessageTypeBGtoUI) {
        MessageTypeBGtoUI["CHANGES"] = "bg-ui-changes";
    })(MessageTypeBGtoUI || (MessageTypeBGtoUI = {}));
    var DebugMessageTypeBGtoUI;
    (function(DebugMessageTypeBGtoUI) {
        DebugMessageTypeBGtoUI["CSS_UPDATE"] = "debug-bg-ui-css-update";
        DebugMessageTypeBGtoUI["UPDATE"] = "debug-bg-ui-update";
    })(DebugMessageTypeBGtoUI || (DebugMessageTypeBGtoUI = {}));
    var MessageTypeBGtoCS;
    (function(MessageTypeBGtoCS) {
        MessageTypeBGtoCS["ADD_CSS_FILTER"] = "bg-cs-add-css-filter";
        MessageTypeBGtoCS["ADD_DYNAMIC_THEME"] = "bg-cs-add-dynamic-theme";
        MessageTypeBGtoCS["ADD_STATIC_THEME"] = "bg-cs-add-static-theme";
        MessageTypeBGtoCS["ADD_SVG_FILTER"] = "bg-cs-add-svg-filter";
        MessageTypeBGtoCS["CLEAN_UP"] = "bg-cs-clean-up";
        MessageTypeBGtoCS["FETCH_RESPONSE"] = "bg-cs-fetch-response";
        MessageTypeBGtoCS["UNSUPPORTED_SENDER"] = "bg-cs-unsupported-sender";
    })(MessageTypeBGtoCS || (MessageTypeBGtoCS = {}));
    var DebugMessageTypeBGtoCS;
    (function(DebugMessageTypeBGtoCS) {
        DebugMessageTypeBGtoCS["RELOAD"] = "debug-bg-cs-reload";
    })(DebugMessageTypeBGtoCS || (DebugMessageTypeBGtoCS = {}));
    var MessageTypeCStoBG;
    (function(MessageTypeCStoBG) {
        MessageTypeCStoBG["COLOR_SCHEME_CHANGE"] = "cs-bg-color-scheme-change";
        MessageTypeCStoBG["DARK_THEME_DETECTED"] = "cs-bg-dark-theme-detected";
        MessageTypeCStoBG["DARK_THEME_NOT_DETECTED"] = "cs-bg-dark-theme-not-detected";
        MessageTypeCStoBG["FETCH"] = "cs-bg-fetch";
        MessageTypeCStoBG["DOCUMENT_CONNECT"] = "cs-bg-document-connect";
        MessageTypeCStoBG["DOCUMENT_FORGET"] = "cs-bg-document-forget";
        MessageTypeCStoBG["DOCUMENT_FREEZE"] = "cs-bg-document-freeze";
        MessageTypeCStoBG["DOCUMENT_RESUME"] = "cs-bg-document-resume";
    })(MessageTypeCStoBG || (MessageTypeCStoBG = {}));
    var DebugMessageTypeCStoBG;
    (function(DebugMessageTypeCStoBG) {
        DebugMessageTypeCStoBG["LOG"] = "debug-cs-bg-log";
    })(DebugMessageTypeCStoBG || (DebugMessageTypeCStoBG = {}));
    var MessageTypeCStoUI;
    (function(MessageTypeCStoUI) {
        MessageTypeCStoUI["EXPORT_CSS_RESPONSE"] = "cs-ui-export-css-response";
    })(MessageTypeCStoUI || (MessageTypeCStoUI = {}));
    var MessageTypeUItoCS;
    (function(MessageTypeUItoCS) {
        MessageTypeUItoCS["EXPORT_CSS"] = "ui-cs-export-css";
    })(MessageTypeUItoCS || (MessageTypeUItoCS = {}));
    var isNavigatorDefined = typeof navigator !== "undefined";
    var userAgent = isNavigatorDefined ? navigator.userAgentData && Array.isArray(navigator.userAgentData.brands) ? navigator.userAgentData.brands.map(function(brand) {
        return "".concat(brand.brand.toLowerCase(), " ").concat(brand.version);
    }).join(" ") : navigator.userAgent.toLowerCase() : "some useragent";
    var platform = isNavigatorDefined ? navigator.userAgentData && typeof navigator.userAgentData.platform === "string" ? navigator.userAgentData.platform.toLowerCase() : navigator.platform.toLowerCase() : "some platform";
    var isChromium = userAgent.includes("chrome") || userAgent.includes("chromium");
    var isFirefox = userAgent.includes("firefox") || userAgent.includes("thunderbird") || userAgent.includes("librewolf");
    var isSafari = userAgent.includes("safari") && !isChromium;
    var isWindows = platform.startsWith("win");
    var isMacOS = platform.startsWith("mac");
    isNavigatorDefined && navigator.userAgentData ? navigator.userAgentData.mobile : userAgent.includes("mobile");
    var isShadowDomSupported = typeof ShadowRoot === "function";
    var isMatchMediaChangeEventListenerSupported = typeof MediaQueryList === "function" && typeof MediaQueryList.prototype.addEventListener === "function";
    (function() {
        var m = userAgent.match(/chrom(?:e|ium)(?:\/| )([^ ]+)/);
        if (m && m[1]) return m[1];
        return "";
    })();
    (function() {
        var m = userAgent.match(/(?:firefox|librewolf)(?:\/| )([^ ]+)/);
        if (m && m[1]) return m[1];
        return "";
    })();
    var isDefinedSelectorSupported = function() {
        try {
            document.querySelector(":defined");
            return true;
        } catch (err) {
            return false;
        }
    }();
    var isCSSColorSchemePropSupported = function() {
        try {
            if (typeof document === "undefined") return false;
            var el = document.createElement("div");
            if (!el || typeof el.style !== "object") return false;
            if (typeof el.style.colorScheme === "string") return true;
            el.setAttribute("style", "color-scheme: dark");
            return el.style.colorScheme === "dark";
        } catch (e) {
            return false;
        }
    }();
    function getOKResponse(url, mimeType, origin) {
        return __awaiter(this, void 0, void 0, function() {
            var response;
            return __generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        return [
                            4,
                            fetch(url, {
                                cache: "force-cache",
                                credentials: "omit",
                                referrer: origin
                            })
                        ];
                    case 1:
                        response = _a.sent();
                        if (isFirefox && mimeType === "text/css" && url.startsWith("moz-extension://") && url.endsWith(".css")) return [
                            2,
                            response
                        ];
                        if (mimeType && !response.headers.get("Content-Type").startsWith(mimeType)) throw new Error("Mime type mismatch when loading ".concat(url));
                        if (!response.ok) throw new Error("Unable to load ".concat(url, " ").concat(response.status, " ").concat(response.statusText));
                        return [
                            2,
                            response
                        ];
                }
            });
        });
    }
    function loadAsDataURL(url, mimeType) {
        return __awaiter(this, void 0, void 0, function() {
            var response;
            return __generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        return [
                            4,
                            getOKResponse(url, mimeType)
                        ];
                    case 1:
                        response = _a.sent();
                        return [
                            4,
                            readResponseAsDataURL(response)
                        ];
                    case 2:
                        return [
                            2,
                            _a.sent()
                        ];
                }
            });
        });
    }
    function readResponseAsDataURL(response) {
        return __awaiter(this, void 0, void 0, function() {
            var blob, dataURL;
            return __generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        return [
                            4,
                            response.blob()
                        ];
                    case 1:
                        blob = _a.sent();
                        return [
                            4,
                            new Promise(function(resolve) {
                                var reader = new FileReader();
                                reader.onloadend = function() {
                                    return resolve(reader.result);
                                };
                                reader.readAsDataURL(blob);
                            })
                        ];
                    case 2:
                        dataURL = _a.sent();
                        return [
                            2,
                            dataURL
                        ];
                }
            });
        });
    }
    var throwCORSError = function(url) {
        return __awaiter(void 0, void 0, void 0, function() {
            return __generator(this, function(_a) {
                return [
                    2,
                    Promise.reject(new Error([
                        "Embedded Dark Reader cannot access a cross-origin resource",
                        url,
                        "Overview your URLs and CORS policies or use",
                        "`DarkReader.setFetchMethod(fetch: (url) => Promise<Response>))`.",
                        "See if using `DarkReader.setFetchMethod(window.fetch)`",
                        "before `DarkReader.enable()` works."
                    ].join(" ")))
                ];
            });
        });
    };
    var fetcher = throwCORSError;
    function setFetchMethod$1(fetch1) {
        if (fetch1) fetcher = fetch1;
        else fetcher = throwCORSError;
    }
    function callFetchMethod(url) {
        return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        return [
                            4,
                            fetcher(url)
                        ];
                    case 1:
                        return [
                            2,
                            _a.sent()
                        ];
                }
            });
        });
    }
    if (!window.chrome) window.chrome = {};
    if (!chrome.runtime) chrome.runtime = {};
    var messageListeners = new Set();
    function sendMessage() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        return __awaiter(this, void 0, void 0, function() {
            var id_1, _a, url, responseType, response, text_1, error_1;
            return __generator(this, function(_b) {
                switch(_b.label){
                    case 0:
                        if (!(args[0] && args[0].type === MessageTypeCStoBG.FETCH)) return [
                            3,
                            8
                        ];
                        id_1 = args[0].id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([
                            1,
                            7,
                            ,
                            8
                        ]);
                        _a = args[0].data, url = _a.url, responseType = _a.responseType;
                        return [
                            4,
                            callFetchMethod(url)
                        ];
                    case 2:
                        response = _b.sent();
                        if (!(responseType === "data-url")) return [
                            3,
                            4
                        ];
                        return [
                            4,
                            readResponseAsDataURL(response)
                        ];
                    case 3:
                        text_1 = _b.sent();
                        return [
                            3,
                            6
                        ];
                    case 4:
                        return [
                            4,
                            response.text()
                        ];
                    case 5:
                        text_1 = _b.sent();
                        _b.label = 6;
                    case 6:
                        messageListeners.forEach(function(cb) {
                            return cb({
                                type: MessageTypeBGtoCS.FETCH_RESPONSE,
                                data: text_1,
                                error: null,
                                id: id_1
                            });
                        });
                        return [
                            3,
                            8
                        ];
                    case 7:
                        error_1 = _b.sent();
                        console.error(error_1);
                        messageListeners.forEach(function(cb) {
                            return cb({
                                type: MessageTypeBGtoCS.FETCH_RESPONSE,
                                data: null,
                                error: error_1,
                                id: id_1
                            });
                        });
                        return [
                            3,
                            8
                        ];
                    case 8:
                        return [
                            2
                        ];
                }
            });
        });
    }
    function addMessageListener(callback) {
        messageListeners.add(callback);
    }
    if (typeof chrome.runtime.sendMessage === "function") {
        var nativeSendMessage_1 = chrome.runtime.sendMessage;
        chrome.runtime.sendMessage = function() {
            var args = [];
            for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
            sendMessage.apply(void 0, __spreadArray([], __read(args), false));
            nativeSendMessage_1.apply(chrome.runtime, args);
        };
    } else chrome.runtime.sendMessage = sendMessage;
    if (!chrome.runtime.onMessage) chrome.runtime.onMessage = {};
    if (typeof chrome.runtime.onMessage.addListener === "function") {
        var nativeAddListener_1 = chrome.runtime.onMessage.addListener;
        chrome.runtime.onMessage.addListener = function() {
            var args = [];
            for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
            addMessageListener(args[0]);
            nativeAddListener_1.apply(chrome.runtime.onMessage, args);
        };
    } else chrome.runtime.onMessage.addListener = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        return addMessageListener(args[0]);
    };
    var ThemeEngine;
    (function(ThemeEngine) {
        ThemeEngine["cssFilter"] = "cssFilter";
        ThemeEngine["svgFilter"] = "svgFilter";
        ThemeEngine["staticTheme"] = "staticTheme";
        ThemeEngine["dynamicTheme"] = "dynamicTheme";
    })(ThemeEngine || (ThemeEngine = {}));
    var AutomationMode;
    (function(AutomationMode) {
        AutomationMode["NONE"] = "";
        AutomationMode["TIME"] = "time";
        AutomationMode["SYSTEM"] = "system";
        AutomationMode["LOCATION"] = "location";
    })(AutomationMode || (AutomationMode = {}));
    var DEFAULT_COLORS = {
        darkScheme: {
            background: "#181a1b",
            text: "#e8e6e3"
        },
        lightScheme: {
            background: "#dcdad7",
            text: "#181a1b"
        }
    };
    var DEFAULT_THEME = {
        mode: 1,
        brightness: 100,
        contrast: 100,
        grayscale: 0,
        sepia: 0,
        useFont: false,
        fontFamily: isMacOS ? "Helvetica Neue" : isWindows ? "Segoe UI" : "Open Sans",
        textStroke: 0,
        engine: ThemeEngine.dynamicTheme,
        stylesheet: "",
        darkSchemeBackgroundColor: DEFAULT_COLORS.darkScheme.background,
        darkSchemeTextColor: DEFAULT_COLORS.darkScheme.text,
        lightSchemeBackgroundColor: DEFAULT_COLORS.lightScheme.background,
        lightSchemeTextColor: DEFAULT_COLORS.lightScheme.text,
        scrollbarColor: isMacOS ? "" : "auto",
        selectionColor: "auto",
        styleSystemControls: !isCSSColorSchemePropSupported,
        lightColorScheme: "Default",
        darkColorScheme: "Default",
        immediateModify: false
    };
    AutomationMode.NONE;
    function isArrayLike(items) {
        return items.length != null;
    }
    function forEach(items, iterator) {
        var e_1, _a;
        if (isArrayLike(items)) for(var i = 0, len = items.length; i < len; i++)iterator(items[i]);
        else try {
            for(var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()){
                var item = items_1_1.value;
                iterator(item);
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
    }
    function push(array, addition) {
        forEach(addition, function(a) {
            return array.push(a);
        });
    }
    function toArray(items) {
        var results = [];
        for(var i = 0, len = items.length; i < len; i++)results.push(items[i]);
        return results;
    }
    function logInfo() {}
    function logWarn() {}
    function throttle(callback) {
        var pending = false;
        var frameId = null;
        var lastArgs;
        var throttled = function() {
            var args = [];
            for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
            lastArgs = args;
            if (frameId) pending = true;
            else {
                callback.apply(void 0, __spreadArray([], __read(lastArgs), false));
                frameId = requestAnimationFrame(function() {
                    frameId = null;
                    if (pending) {
                        callback.apply(void 0, __spreadArray([], __read(lastArgs), false));
                        pending = false;
                    }
                });
            }
        };
        var cancel = function() {
            cancelAnimationFrame(frameId);
            pending = false;
            frameId = null;
        };
        return Object.assign(throttled, {
            cancel: cancel
        });
    }
    function createAsyncTasksQueue() {
        var tasks = [];
        var frameId = null;
        function runTasks() {
            var task;
            while(task = tasks.shift())task();
            frameId = null;
        }
        function add(task) {
            tasks.push(task);
            if (!frameId) frameId = requestAnimationFrame(runTasks);
        }
        function cancel() {
            tasks.splice(0);
            cancelAnimationFrame(frameId);
            frameId = null;
        }
        return {
            add: add,
            cancel: cancel
        };
    }
    function getDuration(time) {
        var duration = 0;
        if (time.seconds) duration += time.seconds * 1000;
        if (time.minutes) duration += time.minutes * 60000;
        if (time.hours) duration += time.hours * 3600000;
        if (time.days) duration += time.days * 86400000;
        return duration;
    }
    function removeNode(node) {
        node && node.parentNode && node.parentNode.removeChild(node);
    }
    function watchForNodePosition(node, mode, onRestore) {
        if (onRestore === void 0) onRestore = Function.prototype;
        var MAX_ATTEMPTS_COUNT = 10;
        var RETRY_TIMEOUT = getDuration({
            seconds: 2
        });
        var ATTEMPTS_INTERVAL = getDuration({
            seconds: 10
        });
        var prevSibling = node.previousSibling;
        var parent = node.parentNode;
        if (!parent) throw new Error("Unable to watch for node position: parent element not found");
        if (mode === "prev-sibling" && !prevSibling) throw new Error("Unable to watch for node position: there is no previous sibling");
        var attempts = 0;
        var start = null;
        var timeoutId = null;
        var restore = throttle(function() {
            if (timeoutId) return;
            attempts++;
            var now = Date.now();
            if (start == null) start = now;
            else if (attempts >= MAX_ATTEMPTS_COUNT) {
                if (now - start < ATTEMPTS_INTERVAL) {
                    timeoutId = setTimeout(function() {
                        start = null;
                        attempts = 0;
                        timeoutId = null;
                        restore();
                    }, RETRY_TIMEOUT);
                    return;
                }
                start = now;
                attempts = 1;
            }
            if (mode === "head") {
                if (prevSibling && prevSibling.parentNode !== parent) {
                    stop();
                    return;
                }
            }
            if (mode === "prev-sibling") {
                if (prevSibling.parentNode == null) {
                    stop();
                    return;
                }
                if (prevSibling.parentNode !== parent) updateParent(prevSibling.parentNode);
            }
            if (mode === "head" && !parent.isConnected) parent = document.head;
            parent.insertBefore(node, prevSibling && prevSibling.isConnected ? prevSibling.nextSibling : parent.firstChild);
            observer.takeRecords();
            onRestore && onRestore();
        });
        var observer = new MutationObserver(function() {
            if (mode === "head" && (node.parentNode !== parent || !node.parentNode.isConnected) || mode === "prev-sibling" && node.previousSibling !== prevSibling) restore();
        });
        var run = function() {
            observer.observe(parent, {
                childList: true
            });
        };
        var stop = function() {
            clearTimeout(timeoutId);
            observer.disconnect();
            restore.cancel();
        };
        var skip = function() {
            observer.takeRecords();
        };
        var updateParent = function(parentNode) {
            parent = parentNode;
            stop();
            run();
        };
        run();
        return {
            run: run,
            stop: stop,
            skip: skip
        };
    }
    function iterateShadowHosts(root, iterator) {
        if (root == null) return;
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
            acceptNode: function(node) {
                return node.shadowRoot == null ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
            }
        });
        for(var node = root.shadowRoot ? walker.currentNode : walker.nextNode(); node != null; node = walker.nextNode()){
            if (node.classList.contains("surfingkeys_hints_host")) continue;
            iterator(node);
            iterateShadowHosts(node.shadowRoot, iterator);
        }
    }
    var isDOMReady = function() {
        return document.readyState === "complete" || document.readyState === "interactive";
    };
    function setIsDOMReady(newFunc) {
        isDOMReady = newFunc;
    }
    var readyStateListeners = new Set();
    function addDOMReadyListener(listener) {
        isDOMReady() ? listener() : readyStateListeners.add(listener);
    }
    function removeDOMReadyListener(listener) {
        readyStateListeners.delete(listener);
    }
    function isReadyStateComplete() {
        return document.readyState === "complete";
    }
    var readyStateCompleteListeners = new Set();
    function addReadyStateCompleteListener(listener) {
        isReadyStateComplete() ? listener() : readyStateCompleteListeners.add(listener);
    }
    function cleanReadyStateCompleteListeners() {
        readyStateCompleteListeners.clear();
    }
    if (!isDOMReady()) {
        var onReadyStateChange_1 = function() {
            if (isDOMReady()) {
                readyStateListeners.forEach(function(listener) {
                    return listener();
                });
                readyStateListeners.clear();
                if (isReadyStateComplete()) {
                    document.removeEventListener("readystatechange", onReadyStateChange_1);
                    readyStateCompleteListeners.forEach(function(listener) {
                        return listener();
                    });
                    readyStateCompleteListeners.clear();
                }
            }
        };
        document.addEventListener("readystatechange", onReadyStateChange_1);
    }
    var HUGE_MUTATIONS_COUNT = 1000;
    function isHugeMutation(mutations) {
        if (mutations.length > HUGE_MUTATIONS_COUNT) return true;
        var addedNodesCount = 0;
        for(var i = 0; i < mutations.length; i++){
            addedNodesCount += mutations[i].addedNodes.length;
            if (addedNodesCount > HUGE_MUTATIONS_COUNT) return true;
        }
        return false;
    }
    function getElementsTreeOperations(mutations) {
        var additions = new Set();
        var deletions = new Set();
        var moves = new Set();
        mutations.forEach(function(m) {
            forEach(m.addedNodes, function(n) {
                if (n instanceof Element && n.isConnected) additions.add(n);
            });
            forEach(m.removedNodes, function(n) {
                if (n instanceof Element) {
                    if (n.isConnected) {
                        moves.add(n);
                        additions.delete(n);
                    } else deletions.add(n);
                }
            });
        });
        var duplicateAdditions = [];
        var duplicateDeletions = [];
        additions.forEach(function(node) {
            if (additions.has(node.parentElement)) duplicateAdditions.push(node);
        });
        deletions.forEach(function(node) {
            if (deletions.has(node.parentElement)) duplicateDeletions.push(node);
        });
        duplicateAdditions.forEach(function(node) {
            return additions.delete(node);
        });
        duplicateDeletions.forEach(function(node) {
            return deletions.delete(node);
        });
        return {
            additions: additions,
            moves: moves,
            deletions: deletions
        };
    }
    var optimizedTreeObservers = new Map();
    var optimizedTreeCallbacks = new WeakMap();
    function createOptimizedTreeObserver(root, callbacks) {
        var observer;
        var observerCallbacks;
        var domReadyListener;
        if (optimizedTreeObservers.has(root)) {
            observer = optimizedTreeObservers.get(root);
            observerCallbacks = optimizedTreeCallbacks.get(observer);
        } else {
            var hadHugeMutationsBefore_1 = false;
            var subscribedForReadyState_1 = false;
            observer = new MutationObserver(function(mutations) {
                if (isHugeMutation(mutations)) {
                    if (!hadHugeMutationsBefore_1 || isDOMReady()) observerCallbacks.forEach(function(_a) {
                        var onHugeMutations = _a.onHugeMutations;
                        return onHugeMutations(root);
                    });
                    else if (!subscribedForReadyState_1) {
                        domReadyListener = function() {
                            return observerCallbacks.forEach(function(_a) {
                                var onHugeMutations = _a.onHugeMutations;
                                return onHugeMutations(root);
                            });
                        };
                        addDOMReadyListener(domReadyListener);
                        subscribedForReadyState_1 = true;
                    }
                    hadHugeMutationsBefore_1 = true;
                } else {
                    var elementsOperations_1 = getElementsTreeOperations(mutations);
                    observerCallbacks.forEach(function(_a) {
                        var onMinorMutations = _a.onMinorMutations;
                        return onMinorMutations(elementsOperations_1);
                    });
                }
            });
            observer.observe(root, {
                childList: true,
                subtree: true
            });
            optimizedTreeObservers.set(root, observer);
            observerCallbacks = new Set();
            optimizedTreeCallbacks.set(observer, observerCallbacks);
        }
        observerCallbacks.add(callbacks);
        return {
            disconnect: function() {
                observerCallbacks.delete(callbacks);
                if (domReadyListener) removeDOMReadyListener(domReadyListener);
                if (observerCallbacks.size === 0) {
                    observer.disconnect();
                    optimizedTreeCallbacks.delete(observer);
                    optimizedTreeObservers.delete(root);
                }
            }
        };
    }
    var anchor;
    var parsedURLCache = new Map();
    function fixBaseURL($url) {
        if (!anchor) anchor = document.createElement("a");
        anchor.href = $url;
        return anchor.href;
    }
    function parseURL($url, $base) {
        if ($base === void 0) $base = null;
        var key = "".concat($url).concat($base ? ";".concat($base) : "");
        if (parsedURLCache.has(key)) return parsedURLCache.get(key);
        if ($base) {
            var parsedURL_1 = new URL($url, fixBaseURL($base));
            parsedURLCache.set(key, parsedURL_1);
            return parsedURL_1;
        }
        var parsedURL = new URL(fixBaseURL($url));
        parsedURLCache.set($url, parsedURL);
        return parsedURL;
    }
    function getAbsoluteURL($base, $relative) {
        if ($relative.match(/^data\\?\:/)) return $relative;
        if (/^\/\//.test($relative)) return "".concat(location.protocol).concat($relative);
        var b = parseURL($base);
        var a = parseURL($relative, b.href);
        return a.href;
    }
    function isRelativeHrefOnAbsolutePath(href) {
        if (href.startsWith("data:")) return true;
        var url = parseURL(href);
        if (url.protocol !== location.protocol) return false;
        if (url.hostname !== location.hostname) return false;
        if (url.port !== location.port) return false;
        return url.pathname === location.pathname;
    }
    function iterateCSSRules(rules, iterate, onMediaRuleError) {
        forEach(rules, function(rule) {
            if (rule.selectorText) iterate(rule);
            else if (rule.href) try {
                iterateCSSRules(rule.styleSheet.cssRules, iterate, onMediaRuleError);
            } catch (err) {
                logInfo("Found a non-loaded link.");
                onMediaRuleError && onMediaRuleError();
            }
            else if (rule.media) {
                var media = Array.from(rule.media);
                var isScreenOrAllOrQuery = media.some(function(m) {
                    return m.startsWith("screen") || m.startsWith("all") || m.startsWith("(");
                });
                var isPrintOrSpeech = media.some(function(m) {
                    return m.startsWith("print") || m.startsWith("speech");
                });
                if (isScreenOrAllOrQuery || !isPrintOrSpeech) iterateCSSRules(rule.cssRules, iterate, onMediaRuleError);
            } else if (rule.conditionText) {
                if (CSS.supports(rule.conditionText)) iterateCSSRules(rule.cssRules, iterate, onMediaRuleError);
            } else logWarn("CSSRule type not supported", rule);
        });
    }
    var shorthandVarDependantProperties = [
        "background",
        "border",
        "border-color",
        "border-bottom",
        "border-left",
        "border-right",
        "border-top",
        "outline",
        "outline-color"
    ];
    var shorthandVarDepPropRegexps = isSafari ? shorthandVarDependantProperties.map(function(prop) {
        var regexp = new RegExp("".concat(prop, ":\\s*(.*?)\\s*;"));
        return [
            prop,
            regexp
        ];
    }) : null;
    function iterateCSSDeclarations(style, iterate) {
        forEach(style, function(property) {
            var value = style.getPropertyValue(property).trim();
            if (!value) return;
            iterate(property, value);
        });
        var cssText = style.cssText;
        if (cssText.includes("var(")) {
            if (isSafari) shorthandVarDepPropRegexps.forEach(function(_a) {
                var _b = __read(_a, 2), prop = _b[0], regexp = _b[1];
                var match = cssText.match(regexp);
                if (match && match[1]) {
                    var val = match[1].trim();
                    iterate(prop, val);
                }
            });
            else shorthandVarDependantProperties.forEach(function(prop) {
                var val = style.getPropertyValue(prop);
                if (val && val.includes("var(")) iterate(prop, val);
            });
        }
    }
    var cssURLRegex = /url\((('.*?')|(".*?")|([^\)]*?))\)/g;
    var cssImportRegex = /@import\s*(url\()?(('.+?')|(".+?")|([^\)]*?))\)? ?(screen)?;?/gi;
    function getCSSURLValue(cssURL) {
        return cssURL.trim().replace(/[\n\r\\]+/g, "").replace(/^url\((.*)\)$/, "$1").trim().replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1").replace(/(?:\\(.))/g, "$1");
    }
    function getCSSBaseBath(url) {
        var cssURL = parseURL(url);
        return "".concat(cssURL.origin).concat(cssURL.pathname.replace(/\?.*$/, "").replace(/(\/)([^\/]+)$/i, "$1"));
    }
    function replaceCSSRelativeURLsWithAbsolute($css, cssBasePath) {
        return $css.replace(cssURLRegex, function(match) {
            var pathValue = getCSSURLValue(match);
            try {
                return "url('".concat(getAbsoluteURL(cssBasePath, pathValue), "')");
            } catch (err) {
                return match;
            }
        });
    }
    var cssCommentsRegex = /\/\*[\s\S]*?\*\//g;
    function removeCSSComments($css) {
        return $css.replace(cssCommentsRegex, "");
    }
    var fontFaceRegex = /@font-face\s*{[^}]*}/g;
    function replaceCSSFontFace($css) {
        return $css.replace(fontFaceRegex, "");
    }
    function evalMath(expression) {
        var rpnStack = [];
        var workingStack = [];
        var lastToken;
        for(var i = 0, len = expression.length; i < len; i++){
            var token = expression[i];
            if (!token || token === " ") continue;
            if (operators.has(token)) {
                var op = operators.get(token);
                while(workingStack.length){
                    var currentOp = operators.get(workingStack[0]);
                    if (!currentOp) break;
                    if (op.lessOrEqualThan(currentOp)) rpnStack.push(workingStack.shift());
                    else break;
                }
                workingStack.unshift(token);
            } else if (!lastToken || operators.has(lastToken)) rpnStack.push(token);
            else rpnStack[rpnStack.length - 1] += token;
            lastToken = token;
        }
        rpnStack.push.apply(rpnStack, __spreadArray([], __read(workingStack), false));
        var stack = [];
        for(var i = 0, len = rpnStack.length; i < len; i++){
            var op = operators.get(rpnStack[i]);
            if (op) {
                var args = stack.splice(0, 2);
                stack.push(op.exec(args[1], args[0]));
            } else stack.unshift(parseFloat(rpnStack[i]));
        }
        return stack[0];
    }
    var Operator = function() {
        function Operator(precedence, method) {
            this.precendce = precedence;
            this.execMethod = method;
        }
        Operator.prototype.exec = function(left, right) {
            return this.execMethod(left, right);
        };
        Operator.prototype.lessOrEqualThan = function(op) {
            return this.precendce <= op.precendce;
        };
        return Operator;
    }();
    var operators = new Map([
        [
            "+",
            new Operator(1, function(left, right) {
                return left + right;
            })
        ],
        [
            "-",
            new Operator(1, function(left, right) {
                return left - right;
            })
        ],
        [
            "*",
            new Operator(2, function(left, right) {
                return left * right;
            })
        ],
        [
            "/",
            new Operator(2, function(left, right) {
                return left / right;
            })
        ]
    ]);
    function getMatches(regex, input, group) {
        if (group === void 0) group = 0;
        var matches = [];
        var m;
        while(m = regex.exec(input))matches.push(m[group]);
        return matches;
    }
    function formatCSS(text) {
        function trimLeft(text) {
            return text.replace(/^\s+/, "");
        }
        function getIndent(depth) {
            if (depth === 0) return "";
            return " ".repeat(4 * depth);
        }
        if (text.length < 50000) {
            var emptyRuleRegexp = /[^{}]+{\s*}/;
            while(emptyRuleRegexp.test(text))text = text.replace(emptyRuleRegexp, "");
        }
        var css = text.replace(/\s{2,}/g, " ").replace(/\{/g, "{\n").replace(/\}/g, "\n}\n").replace(/\;(?![^\(|\"]*(\)|\"))/g, ";\n").replace(/\,(?![^\(|\"]*(\)|\"))/g, ",\n").replace(/\n\s*\n/g, "\n").split("\n");
        var depth = 0;
        var formatted = [];
        for(var x = 0, len = css.length; x < len; x++){
            var line = "".concat(css[x], "\n");
            if (line.includes("{")) formatted.push(getIndent(depth++) + trimLeft(line));
            else if (line.includes("}")) formatted.push(getIndent(--depth) + trimLeft(line));
            else formatted.push(getIndent(depth) + trimLeft(line));
        }
        return formatted.join("").trim();
    }
    function getParenthesesRange(input, searchStartIndex) {
        if (searchStartIndex === void 0) searchStartIndex = 0;
        var length = input.length;
        var depth = 0;
        var firstOpenIndex = -1;
        for(var i = searchStartIndex; i < length; i++)if (depth === 0) {
            var openIndex = input.indexOf("(", i);
            if (openIndex < 0) break;
            firstOpenIndex = openIndex;
            depth++;
            i = openIndex;
        } else {
            var closingIndex = input.indexOf(")", i);
            if (closingIndex < 0) break;
            var openIndex = input.indexOf("(", i);
            if (openIndex < 0 || closingIndex < openIndex) {
                depth--;
                if (depth === 0) return {
                    start: firstOpenIndex,
                    end: closingIndex + 1
                };
                i = closingIndex;
            } else {
                depth++;
                i = openIndex;
            }
        }
        return null;
    }
    var hslaParseCache = new Map();
    var rgbaParseCache = new Map();
    function parseColorWithCache($color) {
        $color = $color.trim();
        if (rgbaParseCache.has($color)) return rgbaParseCache.get($color);
        if ($color.includes("calc(")) $color = lowerCalcExpression($color);
        var color = parse($color);
        color && rgbaParseCache.set($color, color);
        return color;
    }
    function parseToHSLWithCache(color) {
        if (hslaParseCache.has(color)) return hslaParseCache.get(color);
        var rgb = parseColorWithCache(color);
        if (!rgb) return null;
        var hsl = rgbToHSL(rgb);
        hslaParseCache.set(color, hsl);
        return hsl;
    }
    function clearColorCache() {
        hslaParseCache.clear();
        rgbaParseCache.clear();
    }
    function hslToRGB(_a) {
        var h = _a.h, s = _a.s, l = _a.l, _b = _a.a, a = _b === void 0 ? 1 : _b;
        if (s === 0) {
            var _c = __read([
                l,
                l,
                l
            ].map(function(x) {
                return Math.round(x * 255);
            }), 3), r_1 = _c[0], b_1 = _c[1], g_1 = _c[2];
            return {
                r: r_1,
                g: g_1,
                b: b_1,
                a: a
            };
        }
        var c = (1 - Math.abs(2 * l - 1)) * s;
        var x = c * (1 - Math.abs(h / 60 % 2 - 1));
        var m = l - c / 2;
        var _d = __read((h < 60 ? [
            c,
            x,
            0
        ] : h < 120 ? [
            x,
            c,
            0
        ] : h < 180 ? [
            0,
            c,
            x
        ] : h < 240 ? [
            0,
            x,
            c
        ] : h < 300 ? [
            x,
            0,
            c
        ] : [
            c,
            0,
            x
        ]).map(function(n) {
            return Math.round((n + m) * 255);
        }), 3), r = _d[0], g = _d[1], b = _d[2];
        return {
            r: r,
            g: g,
            b: b,
            a: a
        };
    }
    function rgbToHSL(_a) {
        var r255 = _a.r, g255 = _a.g, b255 = _a.b, _b = _a.a, a = _b === void 0 ? 1 : _b;
        var r = r255 / 255;
        var g = g255 / 255;
        var b = b255 / 255;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var c = max - min;
        var l = (max + min) / 2;
        if (c === 0) return {
            h: 0,
            s: 0,
            l: l,
            a: a
        };
        var h = (max === r ? (g - b) / c % 6 : max === g ? (b - r) / c + 2 : (r - g) / c + 4) * 60;
        if (h < 0) h += 360;
        var s = c / (1 - Math.abs(2 * l - 1));
        return {
            h: h,
            s: s,
            l: l,
            a: a
        };
    }
    function toFixed(n, digits) {
        if (digits === void 0) digits = 0;
        var fixed = n.toFixed(digits);
        if (digits === 0) return fixed;
        var dot = fixed.indexOf(".");
        if (dot >= 0) {
            var zerosMatch = fixed.match(/0+$/);
            if (zerosMatch) {
                if (zerosMatch.index === dot + 1) return fixed.substring(0, dot);
                return fixed.substring(0, zerosMatch.index);
            }
        }
        return fixed;
    }
    function rgbToString(rgb) {
        var r = rgb.r, g = rgb.g, b = rgb.b, a = rgb.a;
        if (a != null && a < 1) return "rgba(".concat(toFixed(r), ", ").concat(toFixed(g), ", ").concat(toFixed(b), ", ").concat(toFixed(a, 2), ")");
        return "rgb(".concat(toFixed(r), ", ").concat(toFixed(g), ", ").concat(toFixed(b), ")");
    }
    function rgbToHexString(_a) {
        var r = _a.r, g = _a.g, b = _a.b, a = _a.a;
        return "#".concat((a != null && a < 1 ? [
            r,
            g,
            b,
            Math.round(a * 255)
        ] : [
            r,
            g,
            b
        ]).map(function(x) {
            return "".concat(x < 16 ? "0" : "").concat(x.toString(16));
        }).join(""));
    }
    function hslToString(hsl) {
        var h = hsl.h, s = hsl.s, l = hsl.l, a = hsl.a;
        if (a != null && a < 1) return "hsla(".concat(toFixed(h), ", ").concat(toFixed(s * 100), "%, ").concat(toFixed(l * 100), "%, ").concat(toFixed(a, 2), ")");
        return "hsl(".concat(toFixed(h), ", ").concat(toFixed(s * 100), "%, ").concat(toFixed(l * 100), "%)");
    }
    var rgbMatch = /^rgba?\([^\(\)]+\)$/;
    var hslMatch = /^hsla?\([^\(\)]+\)$/;
    var hexMatch = /^#[0-9a-f]+$/i;
    function parse($color) {
        var c = $color.trim().toLowerCase();
        if (c.match(rgbMatch)) return parseRGB(c);
        if (c.match(hslMatch)) return parseHSL(c);
        if (c.match(hexMatch)) return parseHex(c);
        if (knownColors.has(c)) return getColorByName(c);
        if (systemColors.has(c)) return getSystemColor(c);
        if ($color === "transparent") return {
            r: 0,
            g: 0,
            b: 0,
            a: 0
        };
        return null;
    }
    function getNumbers($color) {
        var numbers = [];
        var prevPos = 0;
        var isMining = false;
        var startIndex = $color.indexOf("(");
        $color = $color.substring(startIndex + 1, $color.length - 1);
        for(var i = 0; i < $color.length; i++){
            var c = $color[i];
            if (c >= "0" && c <= "9" || c === "." || c === "+" || c === "-") isMining = true;
            else if (isMining && (c === " " || c === "," || c === "/")) {
                numbers.push($color.substring(prevPos, i));
                isMining = false;
                prevPos = i + 1;
            } else if (!isMining) prevPos = i + 1;
        }
        if (isMining) numbers.push($color.substring(prevPos, $color.length));
        return numbers;
    }
    function getNumbersFromString(str, range, units) {
        var raw = getNumbers(str);
        var unitsList = Object.entries(units);
        var numbers = raw.map(function(r) {
            return r.trim();
        }).map(function(r, i) {
            var n;
            var unit = unitsList.find(function(_a) {
                var _b = __read(_a, 1), u = _b[0];
                return r.endsWith(u);
            });
            if (unit) n = parseFloat(r.substring(0, r.length - unit[0].length)) / unit[1] * range[i];
            else n = parseFloat(r);
            if (range[i] > 1) return Math.round(n);
            return n;
        });
        return numbers;
    }
    var rgbRange = [
        255,
        255,
        255,
        1
    ];
    var rgbUnits = {
        "%": 100
    };
    function parseRGB($rgb) {
        var _a = __read(getNumbersFromString($rgb, rgbRange, rgbUnits), 4), r = _a[0], g = _a[1], b = _a[2], _b = _a[3], a = _b === void 0 ? 1 : _b;
        return {
            r: r,
            g: g,
            b: b,
            a: a
        };
    }
    var hslRange = [
        360,
        1,
        1,
        1
    ];
    var hslUnits = {
        "%": 100,
        "deg": 360,
        "rad": 2 * Math.PI,
        "turn": 1
    };
    function parseHSL($hsl) {
        var _a = __read(getNumbersFromString($hsl, hslRange, hslUnits), 4), h = _a[0], s = _a[1], l = _a[2], _b = _a[3], a = _b === void 0 ? 1 : _b;
        return hslToRGB({
            h: h,
            s: s,
            l: l,
            a: a
        });
    }
    function parseHex($hex) {
        var h = $hex.substring(1);
        switch(h.length){
            case 3:
            case 4:
                var _a = __read([
                    0,
                    1,
                    2
                ].map(function(i) {
                    return parseInt("".concat(h[i]).concat(h[i]), 16);
                }), 3), r = _a[0], g = _a[1], b = _a[2];
                var a = h.length === 3 ? 1 : parseInt("".concat(h[3]).concat(h[3]), 16) / 255;
                return {
                    r: r,
                    g: g,
                    b: b,
                    a: a
                };
            case 6:
            case 8:
                var _b = __read([
                    0,
                    2,
                    4
                ].map(function(i) {
                    return parseInt(h.substring(i, i + 2), 16);
                }), 3), r = _b[0], g = _b[1], b = _b[2];
                var a = h.length === 6 ? 1 : parseInt(h.substring(6, 8), 16) / 255;
                return {
                    r: r,
                    g: g,
                    b: b,
                    a: a
                };
        }
        return null;
    }
    function getColorByName($color) {
        var n = knownColors.get($color);
        return {
            r: n >> 16 & 255,
            g: n >> 8 & 255,
            b: n >> 0 & 255,
            a: 1
        };
    }
    function getSystemColor($color) {
        var n = systemColors.get($color);
        return {
            r: n >> 16 & 255,
            g: n >> 8 & 255,
            b: n >> 0 & 255,
            a: 1
        };
    }
    function lowerCalcExpression(color) {
        var searchIndex = 0;
        var replaceBetweenIndices = function(start, end, replacement) {
            color = color.substring(0, start) + replacement + color.substring(end);
        };
        while((searchIndex = color.indexOf("calc(")) !== -1){
            var range = getParenthesesRange(color, searchIndex);
            if (!range) break;
            var slice = color.slice(range.start + 1, range.end - 1);
            var includesPercentage = slice.includes("%");
            slice = slice.split("%").join("");
            var output = Math.round(evalMath(slice));
            replaceBetweenIndices(range.start - 4, range.end, output + (includesPercentage ? "%" : ""));
        }
        return color;
    }
    var knownColors = new Map(Object.entries({
        aliceblue: 0xf0f8ff,
        antiquewhite: 0xfaebd7,
        aqua: 0x00ffff,
        aquamarine: 0x7fffd4,
        azure: 0xf0ffff,
        beige: 0xf5f5dc,
        bisque: 0xffe4c4,
        black: 0x000000,
        blanchedalmond: 0xffebcd,
        blue: 0x0000ff,
        blueviolet: 0x8a2be2,
        brown: 0xa52a2a,
        burlywood: 0xdeb887,
        cadetblue: 0x5f9ea0,
        chartreuse: 0x7fff00,
        chocolate: 0xd2691e,
        coral: 0xff7f50,
        cornflowerblue: 0x6495ed,
        cornsilk: 0xfff8dc,
        crimson: 0xdc143c,
        cyan: 0x00ffff,
        darkblue: 0x00008b,
        darkcyan: 0x008b8b,
        darkgoldenrod: 0xb8860b,
        darkgray: 0xa9a9a9,
        darkgrey: 0xa9a9a9,
        darkgreen: 0x006400,
        darkkhaki: 0xbdb76b,
        darkmagenta: 0x8b008b,
        darkolivegreen: 0x556b2f,
        darkorange: 0xff8c00,
        darkorchid: 0x9932cc,
        darkred: 0x8b0000,
        darksalmon: 0xe9967a,
        darkseagreen: 0x8fbc8f,
        darkslateblue: 0x483d8b,
        darkslategray: 0x2f4f4f,
        darkslategrey: 0x2f4f4f,
        darkturquoise: 0x00ced1,
        darkviolet: 0x9400d3,
        deeppink: 0xff1493,
        deepskyblue: 0x00bfff,
        dimgray: 0x696969,
        dimgrey: 0x696969,
        dodgerblue: 0x1e90ff,
        firebrick: 0xb22222,
        floralwhite: 0xfffaf0,
        forestgreen: 0x228b22,
        fuchsia: 0xff00ff,
        gainsboro: 0xdcdcdc,
        ghostwhite: 0xf8f8ff,
        gold: 0xffd700,
        goldenrod: 0xdaa520,
        gray: 0x808080,
        grey: 0x808080,
        green: 0x008000,
        greenyellow: 0xadff2f,
        honeydew: 0xf0fff0,
        hotpink: 0xff69b4,
        indianred: 0xcd5c5c,
        indigo: 0x4b0082,
        ivory: 0xfffff0,
        khaki: 0xf0e68c,
        lavender: 0xe6e6fa,
        lavenderblush: 0xfff0f5,
        lawngreen: 0x7cfc00,
        lemonchiffon: 0xfffacd,
        lightblue: 0xadd8e6,
        lightcoral: 0xf08080,
        lightcyan: 0xe0ffff,
        lightgoldenrodyellow: 0xfafad2,
        lightgray: 0xd3d3d3,
        lightgrey: 0xd3d3d3,
        lightgreen: 0x90ee90,
        lightpink: 0xffb6c1,
        lightsalmon: 0xffa07a,
        lightseagreen: 0x20b2aa,
        lightskyblue: 0x87cefa,
        lightslategray: 0x778899,
        lightslategrey: 0x778899,
        lightsteelblue: 0xb0c4de,
        lightyellow: 0xffffe0,
        lime: 0x00ff00,
        limegreen: 0x32cd32,
        linen: 0xfaf0e6,
        magenta: 0xff00ff,
        maroon: 0x800000,
        mediumaquamarine: 0x66cdaa,
        mediumblue: 0x0000cd,
        mediumorchid: 0xba55d3,
        mediumpurple: 0x9370db,
        mediumseagreen: 0x3cb371,
        mediumslateblue: 0x7b68ee,
        mediumspringgreen: 0x00fa9a,
        mediumturquoise: 0x48d1cc,
        mediumvioletred: 0xc71585,
        midnightblue: 0x191970,
        mintcream: 0xf5fffa,
        mistyrose: 0xffe4e1,
        moccasin: 0xffe4b5,
        navajowhite: 0xffdead,
        navy: 0x000080,
        oldlace: 0xfdf5e6,
        olive: 0x808000,
        olivedrab: 0x6b8e23,
        orange: 0xffa500,
        orangered: 0xff4500,
        orchid: 0xda70d6,
        palegoldenrod: 0xeee8aa,
        palegreen: 0x98fb98,
        paleturquoise: 0xafeeee,
        palevioletred: 0xdb7093,
        papayawhip: 0xffefd5,
        peachpuff: 0xffdab9,
        peru: 0xcd853f,
        pink: 0xffc0cb,
        plum: 0xdda0dd,
        powderblue: 0xb0e0e6,
        purple: 0x800080,
        rebeccapurple: 0x663399,
        red: 0xff0000,
        rosybrown: 0xbc8f8f,
        royalblue: 0x4169e1,
        saddlebrown: 0x8b4513,
        salmon: 0xfa8072,
        sandybrown: 0xf4a460,
        seagreen: 0x2e8b57,
        seashell: 0xfff5ee,
        sienna: 0xa0522d,
        silver: 0xc0c0c0,
        skyblue: 0x87ceeb,
        slateblue: 0x6a5acd,
        slategray: 0x708090,
        slategrey: 0x708090,
        snow: 0xfffafa,
        springgreen: 0x00ff7f,
        steelblue: 0x4682b4,
        tan: 0xd2b48c,
        teal: 0x008080,
        thistle: 0xd8bfd8,
        tomato: 0xff6347,
        turquoise: 0x40e0d0,
        violet: 0xee82ee,
        wheat: 0xf5deb3,
        white: 0xffffff,
        whitesmoke: 0xf5f5f5,
        yellow: 0xffff00,
        yellowgreen: 0x9acd32
    }));
    var systemColors = new Map(Object.entries({
        "ActiveBorder": 0x3b99fc,
        "ActiveCaption": 0x000000,
        "AppWorkspace": 0xaaaaaa,
        "Background": 0x6363ce,
        "ButtonFace": 0xffffff,
        "ButtonHighlight": 0xe9e9e9,
        "ButtonShadow": 0x9fa09f,
        "ButtonText": 0x000000,
        "CaptionText": 0x000000,
        "GrayText": 0x7f7f7f,
        "Highlight": 0xb2d7ff,
        "HighlightText": 0x000000,
        "InactiveBorder": 0xffffff,
        "InactiveCaption": 0xffffff,
        "InactiveCaptionText": 0x000000,
        "InfoBackground": 0xfbfcc5,
        "InfoText": 0x000000,
        "Menu": 0xf6f6f6,
        "MenuText": 0xffffff,
        "Scrollbar": 0xaaaaaa,
        "ThreeDDarkShadow": 0x000000,
        "ThreeDFace": 0xc0c0c0,
        "ThreeDHighlight": 0xffffff,
        "ThreeDLightShadow": 0xffffff,
        "ThreeDShadow": 0x000000,
        "Window": 0xececec,
        "WindowFrame": 0xaaaaaa,
        "WindowText": 0x000000,
        "-webkit-focus-ring-color": 0xe59700
    }).map(function(_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        return [
            key.toLowerCase(),
            value
        ];
    }));
    function getSRGBLightness(r, g, b) {
        return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    }
    function scale(x, inLow, inHigh, outLow, outHigh) {
        return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
    }
    function clamp(x, min, max) {
        return Math.min(max, Math.max(min, x));
    }
    function multiplyMatrices(m1, m2) {
        var result = [];
        for(var i = 0, len = m1.length; i < len; i++){
            result[i] = [];
            for(var j = 0, len2 = m2[0].length; j < len2; j++){
                var sum = 0;
                for(var k = 0, len3 = m1[0].length; k < len3; k++)sum += m1[i][k] * m2[k][j];
                result[i][j] = sum;
            }
        }
        return result;
    }
    function createFilterMatrix(config) {
        var m = Matrix.identity();
        if (config.sepia !== 0) m = multiplyMatrices(m, Matrix.sepia(config.sepia / 100));
        if (config.grayscale !== 0) m = multiplyMatrices(m, Matrix.grayscale(config.grayscale / 100));
        if (config.contrast !== 100) m = multiplyMatrices(m, Matrix.contrast(config.contrast / 100));
        if (config.brightness !== 100) m = multiplyMatrices(m, Matrix.brightness(config.brightness / 100));
        if (config.mode === 1) m = multiplyMatrices(m, Matrix.invertNHue());
        return m;
    }
    function applyColorMatrix(_a, matrix) {
        var _b = __read(_a, 3), r = _b[0], g = _b[1], b = _b[2];
        var rgb = [
            [
                r / 255
            ],
            [
                g / 255
            ],
            [
                b / 255
            ],
            [
                1
            ],
            [
                1
            ]
        ];
        var result = multiplyMatrices(matrix, rgb);
        return [
            0,
            1,
            2
        ].map(function(i) {
            return clamp(Math.round(result[i][0] * 255), 0, 255);
        });
    }
    var Matrix = {
        identity: function() {
            return [
                [
                    1,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    1,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    1,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    1,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    1
                ]
            ];
        },
        invertNHue: function() {
            return [
                [
                    0.333,
                    -0.667,
                    -0.667,
                    0,
                    1
                ],
                [
                    -0.667,
                    0.333,
                    -0.667,
                    0,
                    1
                ],
                [
                    -0.667,
                    -0.667,
                    0.333,
                    0,
                    1
                ],
                [
                    0,
                    0,
                    0,
                    1,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    1
                ]
            ];
        },
        brightness: function(v) {
            return [
                [
                    v,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    v,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    v,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    1,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    1
                ]
            ];
        },
        contrast: function(v) {
            var t = (1 - v) / 2;
            return [
                [
                    v,
                    0,
                    0,
                    0,
                    t
                ],
                [
                    0,
                    v,
                    0,
                    0,
                    t
                ],
                [
                    0,
                    0,
                    v,
                    0,
                    t
                ],
                [
                    0,
                    0,
                    0,
                    1,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    1
                ]
            ];
        },
        sepia: function(v) {
            return [
                [
                    0.393 + 0.607 * (1 - v),
                    0.769 - 0.769 * (1 - v),
                    0.189 - 0.189 * (1 - v),
                    0,
                    0
                ],
                [
                    0.349 - 0.349 * (1 - v),
                    0.686 + 0.314 * (1 - v),
                    0.168 - 0.168 * (1 - v),
                    0,
                    0
                ],
                [
                    0.272 - 0.272 * (1 - v),
                    0.534 - 0.534 * (1 - v),
                    0.131 + 0.869 * (1 - v),
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    1,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    1
                ]
            ];
        },
        grayscale: function(v) {
            return [
                [
                    0.2126 + 0.7874 * (1 - v),
                    0.7152 - 0.7152 * (1 - v),
                    0.0722 - 0.0722 * (1 - v),
                    0,
                    0
                ],
                [
                    0.2126 - 0.2126 * (1 - v),
                    0.7152 + 0.2848 * (1 - v),
                    0.0722 - 0.0722 * (1 - v),
                    0,
                    0
                ],
                [
                    0.2126 - 0.2126 * (1 - v),
                    0.7152 - 0.7152 * (1 - v),
                    0.0722 + 0.9278 * (1 - v),
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    1,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    1
                ]
            ];
        }
    };
    function getBgPole(theme) {
        var isDarkScheme = theme.mode === 1;
        var prop = isDarkScheme ? "darkSchemeBackgroundColor" : "lightSchemeBackgroundColor";
        return theme[prop];
    }
    function getFgPole(theme) {
        var isDarkScheme = theme.mode === 1;
        var prop = isDarkScheme ? "darkSchemeTextColor" : "lightSchemeTextColor";
        return theme[prop];
    }
    var colorModificationCache = new Map();
    function clearColorModificationCache() {
        colorModificationCache.clear();
    }
    var rgbCacheKeys = [
        "r",
        "g",
        "b",
        "a"
    ];
    var themeCacheKeys$1 = [
        "mode",
        "brightness",
        "contrast",
        "grayscale",
        "sepia",
        "darkSchemeBackgroundColor",
        "darkSchemeTextColor",
        "lightSchemeBackgroundColor",
        "lightSchemeTextColor"
    ];
    function getCacheId(rgb, theme) {
        var resultId = "";
        rgbCacheKeys.forEach(function(key) {
            resultId += "".concat(rgb[key], ";");
        });
        themeCacheKeys$1.forEach(function(key) {
            resultId += "".concat(theme[key], ";");
        });
        return resultId;
    }
    function modifyColorWithCache(rgb, theme, modifyHSL, poleColor, anotherPoleColor) {
        var fnCache;
        if (colorModificationCache.has(modifyHSL)) fnCache = colorModificationCache.get(modifyHSL);
        else {
            fnCache = new Map();
            colorModificationCache.set(modifyHSL, fnCache);
        }
        var id = getCacheId(rgb, theme);
        if (fnCache.has(id)) return fnCache.get(id);
        var hsl = rgbToHSL(rgb);
        var pole = poleColor == null ? null : parseToHSLWithCache(poleColor);
        var anotherPole = anotherPoleColor == null ? null : parseToHSLWithCache(anotherPoleColor);
        var modified = modifyHSL(hsl, pole, anotherPole);
        var _a = hslToRGB(modified), r = _a.r, g = _a.g, b = _a.b, a = _a.a;
        var matrix = createFilterMatrix(theme);
        var _b = __read(applyColorMatrix([
            r,
            g,
            b
        ], matrix), 3), rf = _b[0], gf = _b[1], bf = _b[2];
        var color = a === 1 ? rgbToHexString({
            r: rf,
            g: gf,
            b: bf
        }) : rgbToString({
            r: rf,
            g: gf,
            b: bf,
            a: a
        });
        fnCache.set(id, color);
        return color;
    }
    function noopHSL(hsl) {
        return hsl;
    }
    function modifyColor(rgb, theme) {
        return modifyColorWithCache(rgb, theme, noopHSL);
    }
    function modifyLightSchemeColor(rgb, theme) {
        var poleBg = getBgPole(theme);
        var poleFg = getFgPole(theme);
        return modifyColorWithCache(rgb, theme, modifyLightModeHSL, poleFg, poleBg);
    }
    function modifyLightModeHSL(_a, poleFg, poleBg) {
        var h = _a.h, s = _a.s, l = _a.l, a = _a.a;
        var isDark = l < 0.5;
        var isNeutral;
        if (isDark) isNeutral = l < 0.2 || s < 0.12;
        else {
            var isBlue = h > 200 && h < 280;
            isNeutral = s < 0.24 || l > 0.8 && isBlue;
        }
        var hx = h;
        var sx = l;
        if (isNeutral) {
            if (isDark) {
                hx = poleFg.h;
                sx = poleFg.s;
            } else {
                hx = poleBg.h;
                sx = poleBg.s;
            }
        }
        var lx = scale(l, 0, 1, poleFg.l, poleBg.l);
        return {
            h: hx,
            s: sx,
            l: lx,
            a: a
        };
    }
    var MAX_BG_LIGHTNESS = 0.4;
    function modifyBgHSL(_a, pole) {
        var h = _a.h, s = _a.s, l = _a.l, a = _a.a;
        var isDark = l < 0.5;
        var isBlue = h > 200 && h < 280;
        var isNeutral = s < 0.12 || l > 0.8 && isBlue;
        if (isDark) {
            var lx_1 = scale(l, 0, 0.5, 0, MAX_BG_LIGHTNESS);
            if (isNeutral) {
                var hx_1 = pole.h;
                var sx = pole.s;
                return {
                    h: hx_1,
                    s: sx,
                    l: lx_1,
                    a: a
                };
            }
            return {
                h: h,
                s: s,
                l: lx_1,
                a: a
            };
        }
        var lx = scale(l, 0.5, 1, MAX_BG_LIGHTNESS, pole.l);
        if (isNeutral) {
            var hx_2 = pole.h;
            var sx = pole.s;
            return {
                h: hx_2,
                s: sx,
                l: lx,
                a: a
            };
        }
        var hx = h;
        var isYellow = h > 60 && h < 180;
        if (isYellow) {
            var isCloserToGreen = h > 120;
            if (isCloserToGreen) hx = scale(h, 120, 180, 135, 180);
            else hx = scale(h, 60, 120, 60, 105);
        }
        if (hx > 40 && hx < 80) lx *= 0.75;
        return {
            h: hx,
            s: s,
            l: lx,
            a: a
        };
    }
    function modifyBackgroundColor(rgb, theme) {
        if (theme.mode === 0) return modifyLightSchemeColor(rgb, theme);
        var pole = getBgPole(theme);
        return modifyColorWithCache(rgb, __assign(__assign({}, theme), {
            mode: 0
        }), modifyBgHSL, pole);
    }
    var MIN_FG_LIGHTNESS = 0.55;
    function modifyBlueFgHue(hue) {
        return scale(hue, 205, 245, 205, 220);
    }
    function modifyFgHSL(_a, pole) {
        var h = _a.h, s = _a.s, l = _a.l, a = _a.a;
        var isLight = l > 0.5;
        var isNeutral = l < 0.2 || s < 0.24;
        var isBlue = !isNeutral && h > 205 && h < 245;
        if (isLight) {
            var lx_2 = scale(l, 0.5, 1, MIN_FG_LIGHTNESS, pole.l);
            if (isNeutral) {
                var hx_3 = pole.h;
                var sx = pole.s;
                return {
                    h: hx_3,
                    s: sx,
                    l: lx_2,
                    a: a
                };
            }
            var hx_4 = h;
            if (isBlue) hx_4 = modifyBlueFgHue(h);
            return {
                h: hx_4,
                s: s,
                l: lx_2,
                a: a
            };
        }
        if (isNeutral) {
            var hx_5 = pole.h;
            var sx = pole.s;
            var lx_3 = scale(l, 0, 0.5, pole.l, MIN_FG_LIGHTNESS);
            return {
                h: hx_5,
                s: sx,
                l: lx_3,
                a: a
            };
        }
        var hx = h;
        var lx;
        if (isBlue) {
            hx = modifyBlueFgHue(h);
            lx = scale(l, 0, 0.5, pole.l, Math.min(1, MIN_FG_LIGHTNESS + 0.05));
        } else lx = scale(l, 0, 0.5, pole.l, MIN_FG_LIGHTNESS);
        return {
            h: hx,
            s: s,
            l: lx,
            a: a
        };
    }
    function modifyForegroundColor(rgb, theme) {
        if (theme.mode === 0) return modifyLightSchemeColor(rgb, theme);
        var pole = getFgPole(theme);
        return modifyColorWithCache(rgb, __assign(__assign({}, theme), {
            mode: 0
        }), modifyFgHSL, pole);
    }
    function modifyBorderHSL(_a, poleFg, poleBg) {
        var h = _a.h, s = _a.s, l = _a.l, a = _a.a;
        var isDark = l < 0.5;
        var isNeutral = l < 0.2 || s < 0.24;
        var hx = h;
        var sx = s;
        if (isNeutral) {
            if (isDark) {
                hx = poleFg.h;
                sx = poleFg.s;
            } else {
                hx = poleBg.h;
                sx = poleBg.s;
            }
        }
        var lx = scale(l, 0, 1, 0.5, 0.2);
        return {
            h: hx,
            s: sx,
            l: lx,
            a: a
        };
    }
    function modifyBorderColor(rgb, theme) {
        if (theme.mode === 0) return modifyLightSchemeColor(rgb, theme);
        var poleFg = getFgPole(theme);
        var poleBg = getBgPole(theme);
        return modifyColorWithCache(rgb, __assign(__assign({}, theme), {
            mode: 0
        }), modifyBorderHSL, poleFg, poleBg);
    }
    function modifyShadowColor(rgb, filter) {
        return modifyBackgroundColor(rgb, filter);
    }
    function modifyGradientColor(rgb, filter) {
        return modifyBackgroundColor(rgb, filter);
    }
    function createTextStyle(config) {
        var lines = [];
        lines.push('*:not(pre, pre *, code, .far, .fa, .glyphicon, [class*="vjs-"], .fab, .fa-github, .fas, .material-icons, .icofont, .typcn, mu, [class*="mu-"], .glyphicon, .icon) {');
        if (config.useFont && config.fontFamily) lines.push("  font-family: ".concat(config.fontFamily, " !important;"));
        if (config.textStroke > 0) {
            lines.push("  -webkit-text-stroke: ".concat(config.textStroke, "px !important;"));
            lines.push("  text-stroke: ".concat(config.textStroke, "px !important;"));
        }
        lines.push("}");
        return lines.join("\n");
    }
    var FilterMode;
    (function(FilterMode) {
        FilterMode[FilterMode["light"] = 0] = "light";
        FilterMode[FilterMode["dark"] = 1] = "dark";
    })(FilterMode || (FilterMode = {}));
    function getCSSFilterValue(config) {
        var filters = [];
        if (config.mode === FilterMode.dark) filters.push("invert(100%) hue-rotate(180deg)");
        if (config.brightness !== 100) filters.push("brightness(".concat(config.brightness, "%)"));
        if (config.contrast !== 100) filters.push("contrast(".concat(config.contrast, "%)"));
        if (config.grayscale !== 0) filters.push("grayscale(".concat(config.grayscale, "%)"));
        if (config.sepia !== 0) filters.push("sepia(".concat(config.sepia, "%)"));
        if (filters.length === 0) return null;
        return filters.join(" ");
    }
    function toSVGMatrix(matrix) {
        return matrix.slice(0, 4).map(function(m) {
            return m.map(function(m) {
                return m.toFixed(3);
            }).join(" ");
        }).join(" ");
    }
    function getSVGFilterMatrixValue(config) {
        return toSVGMatrix(createFilterMatrix(config));
    }
    function hexify(number) {
        return (number < 16 ? "0" : "") + number.toString(16);
    }
    function generateUID() {
        if ("randomUUID" in crypto) {
            var uuid = crypto.randomUUID();
            return uuid.substring(0, 8) + uuid.substring(9, 13) + uuid.substring(14, 18) + uuid.substring(19, 23) + uuid.substring(24);
        }
        if ("getRandomValues" in crypto) return Array.from(crypto.getRandomValues(new Uint8Array(16))).map(function(x) {
            return hexify(x);
        }).join("");
        return Math.floor(Math.random() * Math.pow(2, 55)).toString(36);
    }
    var resolvers$1 = new Map();
    var rejectors = new Map();
    function bgFetch(request) {
        return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                return [
                    2,
                    new Promise(function(resolve, reject) {
                        var id = generateUID();
                        resolvers$1.set(id, resolve);
                        rejectors.set(id, reject);
                        chrome.runtime.sendMessage({
                            type: MessageTypeCStoBG.FETCH,
                            data: request,
                            id: id
                        });
                    })
                ];
            });
        });
    }
    chrome.runtime.onMessage.addListener(function(_a) {
        var type = _a.type, data = _a.data, error = _a.error, id = _a.id;
        if (type === MessageTypeBGtoCS.FETCH_RESPONSE) {
            var resolve = resolvers$1.get(id);
            var reject = rejectors.get(id);
            resolvers$1.delete(id);
            rejectors.delete(id);
            if (error) reject && reject(error);
            else resolve && resolve(data);
        }
    });
    var AsyncQueue = function() {
        function AsyncQueue() {
            this.queue = [];
            this.timerId = null;
            this.frameDuration = 1000 / 60;
        }
        AsyncQueue.prototype.addToQueue = function(entry) {
            this.queue.push(entry);
            this.startQueue();
        };
        AsyncQueue.prototype.stopQueue = function() {
            if (this.timerId !== null) {
                cancelAnimationFrame(this.timerId);
                this.timerId = null;
            }
            this.queue = [];
        };
        AsyncQueue.prototype.startQueue = function() {
            var _this = this;
            if (this.timerId) return;
            this.timerId = requestAnimationFrame(function() {
                _this.timerId = null;
                var start = Date.now();
                var cb;
                while(cb = _this.queue.shift()){
                    cb();
                    if (Date.now() - start >= _this.frameDuration) {
                        _this.startQueue();
                        break;
                    }
                }
            });
        };
        return AsyncQueue;
    }();
    var imageManager = new AsyncQueue();
    function getImageDetails(url) {
        return __awaiter(this, void 0, void 0, function() {
            var _this = this;
            return __generator(this, function(_a) {
                return [
                    2,
                    new Promise(function(resolve, reject) {
                        return __awaiter(_this, void 0, void 0, function() {
                            var dataURL, error_1, image_1, error_2;
                            return __generator(this, function(_a) {
                                switch(_a.label){
                                    case 0:
                                        if (!url.startsWith("data:")) return [
                                            3,
                                            1
                                        ];
                                        dataURL = url;
                                        return [
                                            3,
                                            4
                                        ];
                                    case 1:
                                        _a.trys.push([
                                            1,
                                            3,
                                            ,
                                            4
                                        ]);
                                        return [
                                            4,
                                            getImageDataURL(url)
                                        ];
                                    case 2:
                                        dataURL = _a.sent();
                                        return [
                                            3,
                                            4
                                        ];
                                    case 3:
                                        error_1 = _a.sent();
                                        reject(error_1);
                                        return [
                                            2
                                        ];
                                    case 4:
                                        _a.trys.push([
                                            4,
                                            6,
                                            ,
                                            7
                                        ]);
                                        return [
                                            4,
                                            urlToImage(dataURL)
                                        ];
                                    case 5:
                                        image_1 = _a.sent();
                                        imageManager.addToQueue(function() {
                                            resolve(__assign({
                                                src: url,
                                                dataURL: dataURL,
                                                width: image_1.naturalWidth,
                                                height: image_1.naturalHeight
                                            }, analyzeImage(image_1)));
                                        });
                                        return [
                                            3,
                                            7
                                        ];
                                    case 6:
                                        error_2 = _a.sent();
                                        reject(error_2);
                                        return [
                                            3,
                                            7
                                        ];
                                    case 7:
                                        return [
                                            2
                                        ];
                                }
                            });
                        });
                    })
                ];
            });
        });
    }
    function getImageDataURL(url) {
        return __awaiter(this, void 0, void 0, function() {
            var parsedURL;
            return __generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        parsedURL = new URL(url);
                        if (!(parsedURL.origin === location.origin)) return [
                            3,
                            2
                        ];
                        return [
                            4,
                            loadAsDataURL(url)
                        ];
                    case 1:
                        return [
                            2,
                            _a.sent()
                        ];
                    case 2:
                        return [
                            4,
                            bgFetch({
                                url: url,
                                responseType: "data-url"
                            })
                        ];
                    case 3:
                        return [
                            2,
                            _a.sent()
                        ];
                }
            });
        });
    }
    function urlToImage(url) {
        return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                return [
                    2,
                    new Promise(function(resolve, reject) {
                        var image = new Image();
                        image.onload = function() {
                            return resolve(image);
                        };
                        image.onerror = function() {
                            return reject("Unable to load image ".concat(url));
                        };
                        image.src = url;
                    })
                ];
            });
        });
    }
    var MAX_ANALIZE_PIXELS_COUNT = 1024;
    var canvas;
    var context;
    function createCanvas() {
        var maxWidth = MAX_ANALIZE_PIXELS_COUNT;
        var maxHeight = MAX_ANALIZE_PIXELS_COUNT;
        canvas = document.createElement("canvas");
        canvas.width = maxWidth;
        canvas.height = maxHeight;
        context = canvas.getContext("2d", {
            willReadFrequently: true
        });
        context.imageSmoothingEnabled = false;
    }
    function removeCanvas() {
        canvas = null;
        context = null;
    }
    var MAX_IMAGE_SIZE = 5242880;
    function analyzeImage(image) {
        if (!canvas) createCanvas();
        var naturalWidth = image.naturalWidth, naturalHeight = image.naturalHeight;
        if (naturalHeight === 0 || naturalWidth === 0) {
            logWarn("logWarn(Image is empty ".concat(image.currentSrc, ")"));
            return {
                isDark: false,
                isLight: false,
                isTransparent: false,
                isLarge: false,
                isTooLarge: false
            };
        }
        var size = naturalWidth * naturalHeight * 4;
        if (size > MAX_IMAGE_SIZE) return {
            isDark: false,
            isLight: false,
            isTransparent: false,
            isLarge: false,
            isTooLarge: true
        };
        var naturalPixelsCount = naturalWidth * naturalHeight;
        var k = Math.min(1, Math.sqrt(MAX_ANALIZE_PIXELS_COUNT / naturalPixelsCount));
        var width = Math.ceil(naturalWidth * k);
        var height = Math.ceil(naturalHeight * k);
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, naturalWidth, naturalHeight, 0, 0, width, height);
        var imageData = context.getImageData(0, 0, width, height);
        var d = imageData.data;
        var TRANSPARENT_ALPHA_THRESHOLD = 0.05;
        var DARK_LIGHTNESS_THRESHOLD = 0.4;
        var LIGHT_LIGHTNESS_THRESHOLD = 0.7;
        var transparentPixelsCount = 0;
        var darkPixelsCount = 0;
        var lightPixelsCount = 0;
        var i, x, y;
        var r, g, b, a;
        var l;
        for(y = 0; y < height; y++)for(x = 0; x < width; x++){
            i = 4 * (y * width + x);
            r = d[i + 0];
            g = d[i + 1];
            b = d[i + 2];
            a = d[i + 3];
            if (a / 255 < TRANSPARENT_ALPHA_THRESHOLD) transparentPixelsCount++;
            else {
                l = getSRGBLightness(r, g, b);
                if (l < DARK_LIGHTNESS_THRESHOLD) darkPixelsCount++;
                if (l > LIGHT_LIGHTNESS_THRESHOLD) lightPixelsCount++;
            }
        }
        var totalPixelsCount = width * height;
        var opaquePixelsCount = totalPixelsCount - transparentPixelsCount;
        var DARK_IMAGE_THRESHOLD = 0.7;
        var LIGHT_IMAGE_THRESHOLD = 0.7;
        var TRANSPARENT_IMAGE_THRESHOLD = 0.1;
        var LARGE_IMAGE_PIXELS_COUNT = 480000;
        return {
            isDark: darkPixelsCount / opaquePixelsCount >= DARK_IMAGE_THRESHOLD,
            isLight: lightPixelsCount / opaquePixelsCount >= LIGHT_IMAGE_THRESHOLD,
            isTransparent: transparentPixelsCount / totalPixelsCount >= TRANSPARENT_IMAGE_THRESHOLD,
            isLarge: naturalPixelsCount >= LARGE_IMAGE_PIXELS_COUNT,
            isTooLarge: false
        };
    }
    function getFilteredImageDataURL(_a, theme) {
        var dataURL = _a.dataURL, width = _a.width, height = _a.height;
        var matrix = getSVGFilterMatrixValue(theme);
        var svg = [
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'.concat(width, '" height="').concat(height, '">'),
            "<defs>",
            '<filter id="darkreader-image-filter">',
            '<feColorMatrix type="matrix" values="'.concat(matrix, '" />'),
            "</filter>",
            "</defs>",
            '<image width="'.concat(width, '" height="').concat(height, '" filter="url(#darkreader-image-filter)" xlink:href="').concat(dataURL, '" />'),
            "</svg>"
        ].join("");
        return "data:image/svg+xml;base64,".concat(btoa(svg));
    }
    function cleanImageProcessingCache() {
        imageManager && imageManager.stopQueue();
        removeCanvas();
    }
    var gradientLength = 8;
    var conicGradient = "conic-";
    var conicGradientLength = conicGradient.length;
    var radialGradient = "radial-";
    var linearGradient = "linear-";
    function parseGradient(value) {
        var result = [];
        var index = 0;
        var startIndex = conicGradient.length;
        var _loop_1 = function() {
            var typeGradient;
            [
                linearGradient,
                radialGradient,
                conicGradient
            ].find(function(possibleType) {
                if (index - possibleType.length >= 0) {
                    var possibleGradient = value.substring(index - possibleType.length, index);
                    if (possibleGradient === possibleType) {
                        if (value.slice(index - possibleType.length - 10, index - possibleType.length - 1) === "repeating") {
                            typeGradient = "repeating-".concat(possibleType, "gradient");
                            return true;
                        }
                        if (value.slice(index - possibleType.length - 8, index - possibleType.length - 1) === "-webkit") {
                            typeGradient = "-webkit-".concat(possibleType, "gradient");
                            return true;
                        }
                        typeGradient = "".concat(possibleType, "gradient");
                        return true;
                    }
                }
            });
            if (!typeGradient) return "break";
            var _a = getParenthesesRange(value, index + gradientLength), start = _a.start, end = _a.end;
            var match = value.substring(start + 1, end - 1);
            startIndex = end + 1 + conicGradientLength;
            result.push({
                typeGradient: typeGradient,
                match: match,
                offset: typeGradient.length + 2,
                index: index - typeGradient.length + gradientLength,
                hasComma: true
            });
        };
        while((index = value.indexOf("gradient", startIndex)) !== -1){
            var state_1 = _loop_1();
            if (state_1 === "break") break;
        }
        if (result.length) result[result.length - 1].hasComma = false;
        return result;
    }
    function getPriority(ruleStyle, property) {
        return Boolean(ruleStyle && ruleStyle.getPropertyPriority(property));
    }
    function getModifiableCSSDeclaration(property, value, rule, variablesStore, ignoreImageSelectors, isCancelled) {
        if (property.startsWith("--")) {
            var modifier = getVariableModifier(variablesStore, property, value, rule, ignoreImageSelectors, isCancelled);
            if (modifier) return {
                property: property,
                value: modifier,
                important: getPriority(rule.style, property),
                sourceValue: value
            };
        } else if (value.includes("var(")) {
            var modifier = getVariableDependantModifier(variablesStore, property, value);
            if (modifier) return {
                property: property,
                value: modifier,
                important: getPriority(rule.style, property),
                sourceValue: value
            };
        } else if (property === "color-scheme") return null;
        else if (property.includes("color") && property !== "-webkit-print-color-adjust" || property === "fill" || property === "stroke" || property === "stop-color") {
            var modifier = getColorModifier(property, value, rule);
            if (modifier) return {
                property: property,
                value: modifier,
                important: getPriority(rule.style, property),
                sourceValue: value
            };
        } else if (property === "background-image" || property === "list-style-image") {
            var modifier = getBgImageModifier(value, rule, ignoreImageSelectors, isCancelled);
            if (modifier) return {
                property: property,
                value: modifier,
                important: getPriority(rule.style, property),
                sourceValue: value
            };
        } else if (property.includes("shadow")) {
            var modifier = getShadowModifier(value);
            if (modifier) return {
                property: property,
                value: modifier,
                important: getPriority(rule.style, property),
                sourceValue: value
            };
        }
        return null;
    }
    function joinSelectors() {
        var selectors = [];
        for(var _i = 0; _i < arguments.length; _i++)selectors[_i] = arguments[_i];
        return selectors.filter(Boolean).join(", ");
    }
    function getModifiedUserAgentStyle(theme, isIFrame, styleSystemControls) {
        var lines = [];
        if (!isIFrame) {
            lines.push("html {");
            lines.push("    background-color: ".concat(modifyBackgroundColor({
                r: 255,
                g: 255,
                b: 255
            }, theme), " !important;"));
            lines.push("}");
        }
        if (isCSSColorSchemePropSupported) {
            lines.push("html {");
            lines.push("    color-scheme: ".concat(theme.mode === 1 ? "dark" : "dark light", " !important;"));
            lines.push("}");
        }
        var bgSelectors = joinSelectors(isIFrame ? "" : "html, body", styleSystemControls ? "input, textarea, select, button, dialog" : "");
        if (bgSelectors) {
            lines.push("".concat(bgSelectors, " {"));
            lines.push("    background-color: ".concat(modifyBackgroundColor({
                r: 255,
                g: 255,
                b: 255
            }, theme), ";"));
            lines.push("}");
        }
        lines.push("".concat(joinSelectors("html, body", styleSystemControls ? "input, textarea, select, button" : ""), " {"));
        lines.push("    border-color: ".concat(modifyBorderColor({
            r: 76,
            g: 76,
            b: 76
        }, theme), ";"));
        lines.push("    color: ".concat(modifyForegroundColor({
            r: 0,
            g: 0,
            b: 0
        }, theme), ";"));
        lines.push("}");
        lines.push("a {");
        lines.push("    color: ".concat(modifyForegroundColor({
            r: 0,
            g: 64,
            b: 255
        }, theme), ";"));
        lines.push("}");
        lines.push("table {");
        lines.push("    border-color: ".concat(modifyBorderColor({
            r: 128,
            g: 128,
            b: 128
        }, theme), ";"));
        lines.push("}");
        lines.push("::placeholder {");
        lines.push("    color: ".concat(modifyForegroundColor({
            r: 169,
            g: 169,
            b: 169
        }, theme), ";"));
        lines.push("}");
        lines.push("input:-webkit-autofill,");
        lines.push("textarea:-webkit-autofill,");
        lines.push("select:-webkit-autofill {");
        lines.push("    background-color: ".concat(modifyBackgroundColor({
            r: 250,
            g: 255,
            b: 189
        }, theme), " !important;"));
        lines.push("    color: ".concat(modifyForegroundColor({
            r: 0,
            g: 0,
            b: 0
        }, theme), " !important;"));
        lines.push("}");
        if (theme.scrollbarColor) lines.push(getModifiedScrollbarStyle(theme));
        if (theme.selectionColor) lines.push(getModifiedSelectionStyle(theme));
        return lines.join("\n");
    }
    function getSelectionColor(theme) {
        var backgroundColorSelection;
        var foregroundColorSelection;
        if (theme.selectionColor === "auto") {
            backgroundColorSelection = modifyBackgroundColor({
                r: 0,
                g: 96,
                b: 212
            }, __assign(__assign({}, theme), {
                grayscale: 0
            }));
            foregroundColorSelection = modifyForegroundColor({
                r: 255,
                g: 255,
                b: 255
            }, __assign(__assign({}, theme), {
                grayscale: 0
            }));
        } else {
            var rgb = parseColorWithCache(theme.selectionColor);
            var hsl = rgbToHSL(rgb);
            backgroundColorSelection = theme.selectionColor;
            if (hsl.l < 0.5) foregroundColorSelection = "#FFF";
            else foregroundColorSelection = "#000";
        }
        return {
            backgroundColorSelection: backgroundColorSelection,
            foregroundColorSelection: foregroundColorSelection
        };
    }
    function getModifiedSelectionStyle(theme) {
        var lines = [];
        var modifiedSelectionColor = getSelectionColor(theme);
        var backgroundColorSelection = modifiedSelectionColor.backgroundColorSelection;
        var foregroundColorSelection = modifiedSelectionColor.foregroundColorSelection;
        [
            "::selection",
            "::-moz-selection"
        ].forEach(function(selection) {
            lines.push("".concat(selection, " {"));
            lines.push("    background-color: ".concat(backgroundColorSelection, " !important;"));
            lines.push("    color: ".concat(foregroundColorSelection, " !important;"));
            lines.push("}");
        });
        return lines.join("\n");
    }
    function getModifiedScrollbarStyle(theme) {
        var lines = [];
        var colorTrack;
        var colorIcons;
        var colorThumb;
        var colorThumbHover;
        var colorThumbActive;
        var colorCorner;
        if (theme.scrollbarColor === "auto") {
            colorTrack = modifyBackgroundColor({
                r: 241,
                g: 241,
                b: 241
            }, theme);
            colorIcons = modifyForegroundColor({
                r: 96,
                g: 96,
                b: 96
            }, theme);
            colorThumb = modifyBackgroundColor({
                r: 176,
                g: 176,
                b: 176
            }, theme);
            colorThumbHover = modifyBackgroundColor({
                r: 144,
                g: 144,
                b: 144
            }, theme);
            colorThumbActive = modifyBackgroundColor({
                r: 96,
                g: 96,
                b: 96
            }, theme);
            colorCorner = modifyBackgroundColor({
                r: 255,
                g: 255,
                b: 255
            }, theme);
        } else {
            var rgb = parseColorWithCache(theme.scrollbarColor);
            var hsl_1 = rgbToHSL(rgb);
            var isLight = hsl_1.l > 0.5;
            var lighten = function(lighter) {
                return __assign(__assign({}, hsl_1), {
                    l: clamp(hsl_1.l + lighter, 0, 1)
                });
            };
            var darken = function(darker) {
                return __assign(__assign({}, hsl_1), {
                    l: clamp(hsl_1.l - darker, 0, 1)
                });
            };
            colorTrack = hslToString(darken(0.4));
            colorIcons = hslToString(isLight ? darken(0.4) : lighten(0.4));
            colorThumb = hslToString(hsl_1);
            colorThumbHover = hslToString(lighten(0.1));
            colorThumbActive = hslToString(lighten(0.2));
            colorCorner = hslToString(darken(0.5));
        }
        lines.push("::-webkit-scrollbar {");
        lines.push("    background-color: ".concat(colorTrack, ";"));
        lines.push("    color: ".concat(colorIcons, ";"));
        lines.push("}");
        lines.push("::-webkit-scrollbar-thumb {");
        lines.push("    background-color: ".concat(colorThumb, ";"));
        lines.push("}");
        lines.push("::-webkit-scrollbar-thumb:hover {");
        lines.push("    background-color: ".concat(colorThumbHover, ";"));
        lines.push("}");
        lines.push("::-webkit-scrollbar-thumb:active {");
        lines.push("    background-color: ".concat(colorThumbActive, ";"));
        lines.push("}");
        lines.push("::-webkit-scrollbar-corner {");
        lines.push("    background-color: ".concat(colorCorner, ";"));
        lines.push("}");
        if (isFirefox) {
            lines.push("* {");
            lines.push("    scrollbar-color: ".concat(colorThumb, " ").concat(colorTrack, ";"));
            lines.push("}");
        }
        return lines.join("\n");
    }
    function getModifiedFallbackStyle(filter, _a) {
        var strict = _a.strict;
        var lines = [];
        var isMicrosoft = [
            "microsoft.com",
            "docs.microsoft.com"
        ].includes(location.hostname);
        lines.push("html, body, ".concat(strict ? "body :not(iframe)".concat(isMicrosoft ? ':not(div[style^="position:absolute;top:0;left:-"]' : "") : "body > :not(iframe)", " {"));
        lines.push("    background-color: ".concat(modifyBackgroundColor({
            r: 255,
            g: 255,
            b: 255
        }, filter), " !important;"));
        lines.push("    border-color: ".concat(modifyBorderColor({
            r: 64,
            g: 64,
            b: 64
        }, filter), " !important;"));
        lines.push("    color: ".concat(modifyForegroundColor({
            r: 0,
            g: 0,
            b: 0
        }, filter), " !important;"));
        lines.push("}");
        return lines.join("\n");
    }
    var unparsableColors = new Set([
        "inherit",
        "transparent",
        "initial",
        "currentcolor",
        "none",
        "unset"
    ]);
    function getColorModifier(prop, value, rule) {
        if (unparsableColors.has(value.toLowerCase())) return value;
        var rgb = parseColorWithCache(value);
        if (!rgb) return null;
        if (prop.includes("background")) {
            if (rule.style.webkitMaskImage && rule.style.webkitMaskImage !== "none" || rule.style.webkitMask && !rule.style.webkitMask.startsWith("none") || rule.style.mask && rule.style.mask !== "none" || rule.style.getPropertyValue("mask-image") && rule.style.getPropertyValue("mask-image") !== "none") return function(filter) {
                return modifyForegroundColor(rgb, filter);
            };
            return function(filter) {
                return modifyBackgroundColor(rgb, filter);
            };
        }
        if (prop.includes("border") || prop.includes("outline")) return function(filter) {
            return modifyBorderColor(rgb, filter);
        };
        return function(filter) {
            return modifyForegroundColor(rgb, filter);
        };
    }
    var imageDetailsCache = new Map();
    var awaitingForImageLoading = new Map();
    function shouldIgnoreImage(selectorText, selectors) {
        if (!selectorText || selectors.length === 0) return false;
        if (selectors.some(function(s) {
            return s === "*";
        })) return true;
        var ruleSelectors = selectorText.split(/,\s*/g);
        var _loop_1 = function(i) {
            var ignoredSelector = selectors[i];
            if (ruleSelectors.some(function(s) {
                return s === ignoredSelector;
            })) return {
                value: true
            };
        };
        for(var i = 0; i < selectors.length; i++){
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object") return state_1.value;
        }
        return false;
    }
    function getBgImageModifier(value, rule, ignoreImageSelectors, isCancelled) {
        var _this = this;
        try {
            var gradients = parseGradient(value);
            var urls = getMatches(cssURLRegex, value);
            if (urls.length === 0 && gradients.length === 0) return value;
            var getIndices = function(matches) {
                var index = 0;
                return matches.map(function(match) {
                    var valueIndex = value.indexOf(match, index);
                    index = valueIndex + match.length;
                    return {
                        match: match,
                        index: valueIndex
                    };
                });
            };
            var matches_1 = gradients.map(function(i) {
                return __assign({
                    type: "gradient"
                }, i);
            }).concat(getIndices(urls).map(function(i) {
                return __assign({
                    type: "url",
                    offset: 0
                }, i);
            })).sort(function(a, b) {
                return a.index > b.index ? 1 : -1;
            });
            var getGradientModifier_1 = function(gradient) {
                var typeGradient = gradient.typeGradient, match = gradient.match, hasComma = gradient.hasComma;
                var partsRegex = /([^\(\),]+(\([^\(\)]*(\([^\(\)]*\)*[^\(\)]*)?\))?([^\(\), ]|( (?!calc)))*),?/g;
                var colorStopRegex = /^(from|color-stop|to)\(([^\(\)]*?,\s*)?(.*?)\)$/;
                var parts = getMatches(partsRegex, match, 1).map(function(part) {
                    part = part.trim();
                    var rgb = parseColorWithCache(part);
                    if (rgb) return function(filter) {
                        return modifyGradientColor(rgb, filter);
                    };
                    var space = part.lastIndexOf(" ");
                    rgb = parseColorWithCache(part.substring(0, space));
                    if (rgb) return function(filter) {
                        return "".concat(modifyGradientColor(rgb, filter), " ").concat(part.substring(space + 1));
                    };
                    var colorStopMatch = part.match(colorStopRegex);
                    if (colorStopMatch) {
                        rgb = parseColorWithCache(colorStopMatch[3]);
                        if (rgb) return function(filter) {
                            return "".concat(colorStopMatch[1], "(").concat(colorStopMatch[2] ? "".concat(colorStopMatch[2], ", ") : "").concat(modifyGradientColor(rgb, filter), ")");
                        };
                    }
                    return function() {
                        return part;
                    };
                });
                return function(filter) {
                    return "".concat(typeGradient, "(").concat(parts.map(function(modify) {
                        return modify(filter);
                    }).join(", "), ")").concat(hasComma ? ", " : "");
                };
            };
            var getURLModifier_1 = function(urlValue) {
                var _a;
                if (shouldIgnoreImage(rule.selectorText, ignoreImageSelectors)) return null;
                var url = getCSSURLValue(urlValue);
                var isURLEmpty = url.length === 0;
                var parentStyleSheet = rule.parentStyleSheet;
                var baseURL = parentStyleSheet && parentStyleSheet.href ? getCSSBaseBath(parentStyleSheet.href) : ((_a = parentStyleSheet.ownerNode) === null || _a === void 0 ? void 0 : _a.baseURI) || location.origin;
                url = getAbsoluteURL(baseURL, url);
                var absoluteValue = 'url("'.concat(url, '")');
                return function(filter) {
                    return __awaiter(_this, void 0, void 0, function() {
                        var imageDetails, awaiters_1, err_1, bgImageValue;
                        return __generator(this, function(_a) {
                            switch(_a.label){
                                case 0:
                                    if (isURLEmpty) return [
                                        2,
                                        "url('')"
                                    ];
                                    if (!imageDetailsCache.has(url)) return [
                                        3,
                                        1
                                    ];
                                    imageDetails = imageDetailsCache.get(url);
                                    return [
                                        3,
                                        7
                                    ];
                                case 1:
                                    _a.trys.push([
                                        1,
                                        6,
                                        ,
                                        7
                                    ]);
                                    if (!awaitingForImageLoading.has(url)) return [
                                        3,
                                        3
                                    ];
                                    awaiters_1 = awaitingForImageLoading.get(url);
                                    return [
                                        4,
                                        new Promise(function(resolve) {
                                            return awaiters_1.push(resolve);
                                        })
                                    ];
                                case 2:
                                    imageDetails = _a.sent();
                                    if (!imageDetails) return [
                                        2,
                                        null
                                    ];
                                    return [
                                        3,
                                        5
                                    ];
                                case 3:
                                    awaitingForImageLoading.set(url, []);
                                    return [
                                        4,
                                        getImageDetails(url)
                                    ];
                                case 4:
                                    imageDetails = _a.sent();
                                    imageDetailsCache.set(url, imageDetails);
                                    awaitingForImageLoading.get(url).forEach(function(resolve) {
                                        return resolve(imageDetails);
                                    });
                                    awaitingForImageLoading.delete(url);
                                    _a.label = 5;
                                case 5:
                                    if (isCancelled()) return [
                                        2,
                                        null
                                    ];
                                    return [
                                        3,
                                        7
                                    ];
                                case 6:
                                    err_1 = _a.sent();
                                    logWarn(err_1);
                                    if (awaitingForImageLoading.has(url)) {
                                        awaitingForImageLoading.get(url).forEach(function(resolve) {
                                            return resolve(null);
                                        });
                                        awaitingForImageLoading.delete(url);
                                    }
                                    return [
                                        2,
                                        absoluteValue
                                    ];
                                case 7:
                                    bgImageValue = getBgImageValue_1(imageDetails, filter) || absoluteValue;
                                    return [
                                        2,
                                        bgImageValue
                                    ];
                            }
                        });
                    });
                };
            };
            var getBgImageValue_1 = function(imageDetails, filter) {
                var isDark = imageDetails.isDark, isLight = imageDetails.isLight, isTransparent = imageDetails.isTransparent, isLarge = imageDetails.isLarge, isTooLarge = imageDetails.isTooLarge, width = imageDetails.width;
                var result;
                if (isTooLarge) {
                    logInfo("Not modifying too large image ".concat(imageDetails.src));
                    result = 'url("'.concat(imageDetails.src, '")');
                } else if (isDark && isTransparent && filter.mode === 1 && !isLarge && width > 2) {
                    logInfo("Inverting dark image ".concat(imageDetails.src));
                    var inverted = getFilteredImageDataURL(imageDetails, __assign(__assign({}, filter), {
                        sepia: clamp(filter.sepia + 10, 0, 100)
                    }));
                    result = 'url("'.concat(inverted, '")');
                } else if (isLight && !isTransparent && filter.mode === 1) {
                    if (isLarge) {
                        logInfo("Not modifying light non-transparent large image ".concat(imageDetails.src));
                        result = "none";
                    } else {
                        logInfo("Dimming light image ".concat(imageDetails.src));
                        var dimmed = getFilteredImageDataURL(imageDetails, filter);
                        result = 'url("'.concat(dimmed, '")');
                    }
                } else if (filter.mode === 0 && isLight && !isLarge) {
                    logInfo("Applying filter to image ".concat(imageDetails.src));
                    var filtered = getFilteredImageDataURL(imageDetails, __assign(__assign({}, filter), {
                        brightness: clamp(filter.brightness - 10, 5, 200),
                        sepia: clamp(filter.sepia + 10, 0, 100)
                    }));
                    result = 'url("'.concat(filtered, '")');
                } else {
                    logInfo("Not modifying too large image ".concat(imageDetails.src));
                    result = null;
                }
                return result;
            };
            var modifiers_1 = [];
            var matchIndex_1 = 0;
            var prevHasComma_1 = false;
            matches_1.forEach(function(_a, i) {
                var type = _a.type, match = _a.match, index = _a.index, typeGradient = _a.typeGradient, hasComma = _a.hasComma, offset = _a.offset;
                var matchStart = index;
                var prefixStart = matchIndex_1;
                var matchEnd = matchStart + match.length + offset;
                matchIndex_1 = matchEnd;
                if (prefixStart !== matchStart) {
                    if (prevHasComma_1) modifiers_1.push(function() {
                        var betweenValue = value.substring(prefixStart, matchStart);
                        if (betweenValue[0] === ",") betweenValue = betweenValue.substring(1);
                        return betweenValue;
                    });
                    else modifiers_1.push(function() {
                        return value.substring(prefixStart, matchStart);
                    });
                }
                prevHasComma_1 = hasComma || false;
                if (type === "url") modifiers_1.push(getURLModifier_1(match));
                else if (type === "gradient") modifiers_1.push(getGradientModifier_1({
                    match: match,
                    index: index,
                    typeGradient: typeGradient,
                    hasComma: hasComma || false,
                    offset: offset
                }));
                if (i === matches_1.length - 1) modifiers_1.push(function() {
                    return value.substring(matchEnd);
                });
            });
            return function(filter) {
                var results = modifiers_1.filter(Boolean).map(function(modify) {
                    return modify(filter);
                });
                if (results.some(function(r) {
                    return r instanceof Promise;
                })) return Promise.all(results).then(function(asyncResults) {
                    return asyncResults.filter(Boolean).join("");
                });
                var combinedResult = results.join("");
                if (combinedResult.endsWith(", initial")) return combinedResult.slice(0, -9);
                return combinedResult;
            };
        } catch (err) {
            return null;
        }
    }
    function getShadowModifierWithInfo(value) {
        try {
            var index_1 = 0;
            var colorMatches_1 = getMatches(/(^|\s)(?!calc)([a-z]+\(.+?\)|#[0-9a-f]+|[a-z]+)(.*?(inset|outset)?($|,))/gi, value, 2);
            var notParsed_1 = 0;
            var modifiers_2 = colorMatches_1.map(function(match, i) {
                var prefixIndex = index_1;
                var matchIndex = value.indexOf(match, index_1);
                var matchEnd = matchIndex + match.length;
                index_1 = matchEnd;
                var rgb = parseColorWithCache(match);
                if (!rgb) {
                    notParsed_1++;
                    return function() {
                        return value.substring(prefixIndex, matchEnd);
                    };
                }
                return function(filter) {
                    return "".concat(value.substring(prefixIndex, matchIndex)).concat(modifyShadowColor(rgb, filter)).concat(i === colorMatches_1.length - 1 ? value.substring(matchEnd) : "");
                };
            });
            return function(filter) {
                var modified = modifiers_2.map(function(modify) {
                    return modify(filter);
                }).join("");
                return {
                    matchesLength: colorMatches_1.length,
                    unparseableMatchesLength: notParsed_1,
                    result: modified
                };
            };
        } catch (err) {
            return null;
        }
    }
    function getShadowModifier(value) {
        var shadowModifier = getShadowModifierWithInfo(value);
        if (!shadowModifier) return null;
        return function(theme) {
            return shadowModifier(theme).result;
        };
    }
    function getVariableModifier(variablesStore, prop, value, rule, ignoredImgSelectors, isCancelled) {
        return variablesStore.getModifierForVariable({
            varName: prop,
            sourceValue: value,
            rule: rule,
            ignoredImgSelectors: ignoredImgSelectors,
            isCancelled: isCancelled
        });
    }
    function getVariableDependantModifier(variablesStore, prop, value) {
        return variablesStore.getModifierForVarDependant(prop, value);
    }
    function cleanModificationCache() {
        clearColorModificationCache();
        imageDetailsCache.clear();
        cleanImageProcessingCache();
        awaitingForImageLoading.clear();
    }
    var VAR_TYPE_BGCOLOR = 1;
    var VAR_TYPE_TEXTCOLOR = 2;
    var VAR_TYPE_BORDERCOLOR = 4;
    var VAR_TYPE_BGIMG = 8;
    var VariablesStore = function() {
        function VariablesStore() {
            this.varTypes = new Map();
            this.rulesQueue = [];
            this.definedVars = new Set();
            this.varRefs = new Map();
            this.unknownColorVars = new Set();
            this.unknownBgVars = new Set();
            this.undefinedVars = new Set();
            this.initialVarTypes = new Map();
            this.changedTypeVars = new Set();
            this.typeChangeSubscriptions = new Map();
            this.unstableVarValues = new Map();
        }
        VariablesStore.prototype.clear = function() {
            this.varTypes.clear();
            this.rulesQueue.splice(0);
            this.definedVars.clear();
            this.varRefs.clear();
            this.unknownColorVars.clear();
            this.unknownBgVars.clear();
            this.undefinedVars.clear();
            this.initialVarTypes.clear();
            this.changedTypeVars.clear();
            this.typeChangeSubscriptions.clear();
            this.unstableVarValues.clear();
        };
        VariablesStore.prototype.isVarType = function(varName, typeNum) {
            return this.varTypes.has(varName) && (this.varTypes.get(varName) & typeNum) > 0;
        };
        VariablesStore.prototype.addRulesForMatching = function(rules) {
            this.rulesQueue.push(rules);
        };
        VariablesStore.prototype.matchVariablesAndDependants = function() {
            var _this = this;
            this.changedTypeVars.clear();
            this.initialVarTypes = new Map(this.varTypes);
            this.collectRootVariables();
            this.collectVariablesAndVarDep(this.rulesQueue);
            this.rulesQueue.splice(0);
            this.collectRootVarDependants();
            this.varRefs.forEach(function(refs, v) {
                refs.forEach(function(r) {
                    if (_this.varTypes.has(v)) _this.resolveVariableType(r, _this.varTypes.get(v));
                });
            });
            this.unknownColorVars.forEach(function(v) {
                if (_this.unknownBgVars.has(v)) {
                    _this.unknownColorVars.delete(v);
                    _this.unknownBgVars.delete(v);
                    _this.resolveVariableType(v, VAR_TYPE_BGCOLOR);
                } else if (_this.isVarType(v, VAR_TYPE_BGCOLOR | VAR_TYPE_TEXTCOLOR | VAR_TYPE_BORDERCOLOR)) _this.unknownColorVars.delete(v);
                else _this.undefinedVars.add(v);
            });
            this.unknownBgVars.forEach(function(v) {
                var hasColor = _this.findVarRef(v, function(ref) {
                    return _this.unknownColorVars.has(ref) || _this.isVarType(ref, VAR_TYPE_TEXTCOLOR | VAR_TYPE_BORDERCOLOR);
                }) != null;
                if (hasColor) _this.itarateVarRefs(v, function(ref) {
                    _this.resolveVariableType(ref, VAR_TYPE_BGCOLOR);
                });
                else if (_this.isVarType(v, VAR_TYPE_BGCOLOR | VAR_TYPE_BGIMG)) _this.unknownBgVars.delete(v);
                else _this.undefinedVars.add(v);
            });
            this.changedTypeVars.forEach(function(varName) {
                if (_this.typeChangeSubscriptions.has(varName)) _this.typeChangeSubscriptions.get(varName).forEach(function(callback) {
                    callback();
                });
            });
            this.changedTypeVars.clear();
        };
        VariablesStore.prototype.getModifierForVariable = function(options) {
            var _this = this;
            return function(theme) {
                var varName = options.varName, sourceValue = options.sourceValue, rule = options.rule, ignoredImgSelectors = options.ignoredImgSelectors, isCancelled = options.isCancelled;
                var getDeclarations = function() {
                    var declarations = [];
                    var addModifiedValue = function(typeNum, varNameWrapper, colorModifier) {
                        if (!_this.isVarType(varName, typeNum)) return;
                        var property = varNameWrapper(varName);
                        var modifiedValue;
                        if (isVarDependant(sourceValue)) {
                            if (isConstructedColorVar(sourceValue)) {
                                var value = insertVarValues(sourceValue, _this.unstableVarValues);
                                if (!value) value = typeNum === VAR_TYPE_BGCOLOR ? "#ffffff" : "#000000";
                                modifiedValue = colorModifier(value, theme);
                            } else modifiedValue = replaceCSSVariablesNames(sourceValue, function(v) {
                                return varNameWrapper(v);
                            }, function(fallback) {
                                return colorModifier(fallback, theme);
                            });
                        } else modifiedValue = colorModifier(sourceValue, theme);
                        declarations.push({
                            property: property,
                            value: modifiedValue
                        });
                    };
                    addModifiedValue(VAR_TYPE_BGCOLOR, wrapBgColorVariableName, tryModifyBgColor);
                    addModifiedValue(VAR_TYPE_TEXTCOLOR, wrapTextColorVariableName, tryModifyTextColor);
                    addModifiedValue(VAR_TYPE_BORDERCOLOR, wrapBorderColorVariableName, tryModifyBorderColor);
                    if (_this.isVarType(varName, VAR_TYPE_BGIMG)) {
                        var property = wrapBgImgVariableName(varName);
                        var modifiedValue = sourceValue;
                        if (isVarDependant(sourceValue)) modifiedValue = replaceCSSVariablesNames(sourceValue, function(v) {
                            return wrapBgColorVariableName(v);
                        }, function(fallback) {
                            return tryModifyBgColor(fallback, theme);
                        });
                        var bgModifier = getBgImageModifier(modifiedValue, rule, ignoredImgSelectors, isCancelled);
                        modifiedValue = typeof bgModifier === "function" ? bgModifier(theme) : bgModifier;
                        declarations.push({
                            property: property,
                            value: modifiedValue
                        });
                    }
                    return declarations;
                };
                var callbacks = new Set();
                var addListener = function(onTypeChange) {
                    var callback = function() {
                        var decs = getDeclarations();
                        onTypeChange(decs);
                    };
                    callbacks.add(callback);
                    _this.subscribeForVarTypeChange(varName, callback);
                };
                var removeListeners = function() {
                    callbacks.forEach(function(callback) {
                        _this.unsubscribeFromVariableTypeChanges(varName, callback);
                    });
                };
                return {
                    declarations: getDeclarations(),
                    onTypeChange: {
                        addListener: addListener,
                        removeListeners: removeListeners
                    }
                };
            };
        };
        VariablesStore.prototype.getModifierForVarDependant = function(property, sourceValue) {
            var _this = this;
            if (sourceValue.match(/^\s*(rgb|hsl)a?\(/)) {
                var isBg_1 = property.startsWith("background");
                var isText_1 = isTextColorProperty(property);
                return function(theme) {
                    var value = insertVarValues(sourceValue, _this.unstableVarValues);
                    if (!value) value = isBg_1 ? "#ffffff" : "#000000";
                    var modifier = isBg_1 ? tryModifyBgColor : isText_1 ? tryModifyTextColor : tryModifyBorderColor;
                    return modifier(value, theme);
                };
            }
            if (property === "background-color") return function(theme) {
                return replaceCSSVariablesNames(sourceValue, function(v) {
                    return wrapBgColorVariableName(v);
                }, function(fallback) {
                    return tryModifyBgColor(fallback, theme);
                });
            };
            if (isTextColorProperty(property)) return function(theme) {
                return replaceCSSVariablesNames(sourceValue, function(v) {
                    return wrapTextColorVariableName(v);
                }, function(fallback) {
                    return tryModifyTextColor(fallback, theme);
                });
            };
            if (property === "background" || property === "background-image" || property === "box-shadow") return function(theme) {
                var unknownVars = new Set();
                var modify = function() {
                    var variableReplaced = replaceCSSVariablesNames(sourceValue, function(v) {
                        if (_this.isVarType(v, VAR_TYPE_BGCOLOR)) return wrapBgColorVariableName(v);
                        if (_this.isVarType(v, VAR_TYPE_BGIMG)) return wrapBgImgVariableName(v);
                        unknownVars.add(v);
                        return v;
                    }, function(fallback) {
                        return tryModifyBgColor(fallback, theme);
                    });
                    if (property === "box-shadow") {
                        var shadowModifier = getShadowModifierWithInfo(variableReplaced);
                        var modifiedShadow = shadowModifier(theme);
                        if (modifiedShadow.unparseableMatchesLength !== modifiedShadow.matchesLength) return modifiedShadow.result;
                    }
                    return variableReplaced;
                };
                var modified = modify();
                if (unknownVars.size > 0) return new Promise(function(resolve) {
                    var firstUnknownVar = unknownVars.values().next().value;
                    var callback = function() {
                        _this.unsubscribeFromVariableTypeChanges(firstUnknownVar, callback);
                        var newValue = modify();
                        resolve(newValue);
                    };
                    _this.subscribeForVarTypeChange(firstUnknownVar, callback);
                });
                return modified;
            };
            if (property.startsWith("border") || property.startsWith("outline")) return function(theme) {
                return replaceCSSVariablesNames(sourceValue, function(v) {
                    return wrapBorderColorVariableName(v);
                }, function(fallback) {
                    return tryModifyBorderColor(fallback, theme);
                });
            };
            return null;
        };
        VariablesStore.prototype.subscribeForVarTypeChange = function(varName, callback) {
            if (!this.typeChangeSubscriptions.has(varName)) this.typeChangeSubscriptions.set(varName, new Set());
            var rootStore = this.typeChangeSubscriptions.get(varName);
            if (!rootStore.has(callback)) rootStore.add(callback);
        };
        VariablesStore.prototype.unsubscribeFromVariableTypeChanges = function(varName, callback) {
            if (this.typeChangeSubscriptions.has(varName)) this.typeChangeSubscriptions.get(varName).delete(callback);
        };
        VariablesStore.prototype.collectVariablesAndVarDep = function(ruleList) {
            var _this = this;
            ruleList.forEach(function(rules) {
                iterateCSSRules(rules, function(rule) {
                    rule.style && iterateCSSDeclarations(rule.style, function(property, value) {
                        if (isVariable(property)) _this.inspectVariable(property, value);
                        if (isVarDependant(value)) _this.inspectVarDependant(property, value);
                    });
                });
            });
        };
        VariablesStore.prototype.collectRootVariables = function() {
            var _this = this;
            iterateCSSDeclarations(document.documentElement.style, function(property, value) {
                if (isVariable(property)) _this.inspectVariable(property, value);
            });
        };
        VariablesStore.prototype.inspectVariable = function(varName, value) {
            this.unstableVarValues.set(varName, value);
            if (isVarDependant(value) && isConstructedColorVar(value)) {
                this.unknownColorVars.add(varName);
                this.definedVars.add(varName);
            }
            if (this.definedVars.has(varName)) return;
            this.definedVars.add(varName);
            var isColor = rawValueRegex.test(value) || parseColorWithCache(value);
            if (isColor) this.unknownColorVars.add(varName);
            else if (value.includes("url(") || value.includes("linear-gradient(") || value.includes("radial-gradient(")) this.resolveVariableType(varName, VAR_TYPE_BGIMG);
        };
        VariablesStore.prototype.resolveVariableType = function(varName, typeNum) {
            var initialType = this.initialVarTypes.get(varName) || 0;
            var currentType = this.varTypes.get(varName) || 0;
            var newType = currentType | typeNum;
            this.varTypes.set(varName, newType);
            if (newType !== initialType || this.undefinedVars.has(varName)) {
                this.changedTypeVars.add(varName);
                this.undefinedVars.delete(varName);
            }
            this.unknownColorVars.delete(varName);
            this.unknownBgVars.delete(varName);
        };
        VariablesStore.prototype.collectRootVarDependants = function() {
            var _this = this;
            iterateCSSDeclarations(document.documentElement.style, function(property, value) {
                if (isVarDependant(value)) _this.inspectVarDependant(property, value);
            });
        };
        VariablesStore.prototype.inspectVarDependant = function(property, value) {
            var _this = this;
            if (isVariable(property)) this.iterateVarDeps(value, function(ref) {
                if (!_this.varRefs.has(property)) _this.varRefs.set(property, new Set());
                _this.varRefs.get(property).add(ref);
            });
            else if (property === "background-color" || property === "box-shadow") this.iterateVarDeps(value, function(v) {
                return _this.resolveVariableType(v, VAR_TYPE_BGCOLOR);
            });
            else if (isTextColorProperty(property)) this.iterateVarDeps(value, function(v) {
                return _this.resolveVariableType(v, VAR_TYPE_TEXTCOLOR);
            });
            else if (property.startsWith("border") || property.startsWith("outline")) this.iterateVarDeps(value, function(v) {
                return _this.resolveVariableType(v, VAR_TYPE_BORDERCOLOR);
            });
            else if (property === "background" || property === "background-image") this.iterateVarDeps(value, function(v) {
                if (_this.isVarType(v, VAR_TYPE_BGCOLOR | VAR_TYPE_BGIMG)) return;
                var isBgColor = _this.findVarRef(v, function(ref) {
                    return _this.unknownColorVars.has(ref) || _this.isVarType(ref, VAR_TYPE_TEXTCOLOR | VAR_TYPE_BORDERCOLOR);
                }) != null;
                _this.itarateVarRefs(v, function(ref) {
                    if (isBgColor) _this.resolveVariableType(ref, VAR_TYPE_BGCOLOR);
                    else _this.unknownBgVars.add(ref);
                });
            });
        };
        VariablesStore.prototype.iterateVarDeps = function(value, iterator) {
            var varDeps = new Set();
            iterateVarDependencies(value, function(v) {
                return varDeps.add(v);
            });
            varDeps.forEach(function(v) {
                return iterator(v);
            });
        };
        VariablesStore.prototype.findVarRef = function(varName, iterator, stack) {
            var e_1, _a;
            if (stack === void 0) stack = new Set();
            if (stack.has(varName)) return null;
            stack.add(varName);
            var result = iterator(varName);
            if (result) return varName;
            var refs = this.varRefs.get(varName);
            if (!refs || refs.size === 0) return null;
            try {
                for(var refs_1 = __values(refs), refs_1_1 = refs_1.next(); !refs_1_1.done; refs_1_1 = refs_1.next()){
                    var ref = refs_1_1.value;
                    var found = this.findVarRef(ref, iterator, stack);
                    if (found) return found;
                }
            } catch (e_1_1) {
                e_1 = {
                    error: e_1_1
                };
            } finally{
                try {
                    if (refs_1_1 && !refs_1_1.done && (_a = refs_1.return)) _a.call(refs_1);
                } finally{
                    if (e_1) throw e_1.error;
                }
            }
            return null;
        };
        VariablesStore.prototype.itarateVarRefs = function(varName, iterator) {
            this.findVarRef(varName, function(ref) {
                iterator(ref);
                return false;
            });
        };
        VariablesStore.prototype.setOnRootVariableChange = function(callback) {
            this.onRootVariableDefined = callback;
        };
        VariablesStore.prototype.putRootVars = function(styleElement, theme) {
            var e_2, _a;
            var _this = this;
            var sheet = styleElement.sheet;
            if (sheet.cssRules.length > 0) sheet.deleteRule(0);
            var declarations = new Map();
            iterateCSSDeclarations(document.documentElement.style, function(property, value) {
                if (isVariable(property)) {
                    if (_this.isVarType(property, VAR_TYPE_BGCOLOR)) declarations.set(wrapBgColorVariableName(property), tryModifyBgColor(value, theme));
                    if (_this.isVarType(property, VAR_TYPE_TEXTCOLOR)) declarations.set(wrapTextColorVariableName(property), tryModifyTextColor(value, theme));
                    if (_this.isVarType(property, VAR_TYPE_BORDERCOLOR)) declarations.set(wrapBorderColorVariableName(property), tryModifyBorderColor(value, theme));
                    _this.subscribeForVarTypeChange(property, _this.onRootVariableDefined);
                }
            });
            var cssLines = [];
            cssLines.push(":root {");
            try {
                for(var declarations_1 = __values(declarations), declarations_1_1 = declarations_1.next(); !declarations_1_1.done; declarations_1_1 = declarations_1.next()){
                    var _b = __read(declarations_1_1.value, 2), property = _b[0], value = _b[1];
                    cssLines.push("    ".concat(property, ": ").concat(value, ";"));
                }
            } catch (e_2_1) {
                e_2 = {
                    error: e_2_1
                };
            } finally{
                try {
                    if (declarations_1_1 && !declarations_1_1.done && (_a = declarations_1.return)) _a.call(declarations_1);
                } finally{
                    if (e_2) throw e_2.error;
                }
            }
            cssLines.push("}");
            var cssText = cssLines.join("\n");
            sheet.insertRule(cssText);
        };
        return VariablesStore;
    }();
    var variablesStore = new VariablesStore();
    function getVariableRange(input, searchStart) {
        if (searchStart === void 0) searchStart = 0;
        var start = input.indexOf("var(", searchStart);
        if (start >= 0) {
            var range = getParenthesesRange(input, start + 3);
            if (range) return {
                start: start,
                end: range.end
            };
        }
        return null;
    }
    function getVariablesMatches(input) {
        var ranges = [];
        var i = 0;
        var range;
        while(range = getVariableRange(input, i)){
            var start = range.start, end = range.end;
            ranges.push({
                start: start,
                end: end,
                value: input.substring(start, end)
            });
            i = range.end + 1;
        }
        return ranges;
    }
    function replaceVariablesMatches(input, replacer) {
        var matches = getVariablesMatches(input);
        var matchesCount = matches.length;
        if (matchesCount === 0) return input;
        var inputLength = input.length;
        var replacements = matches.map(function(m) {
            return replacer(m.value);
        });
        var parts = [];
        parts.push(input.substring(0, matches[0].start));
        for(var i = 0; i < matchesCount; i++){
            parts.push(replacements[i]);
            var start = matches[i].end;
            var end = i < matchesCount - 1 ? matches[i + 1].start : inputLength;
            parts.push(input.substring(start, end));
        }
        return parts.join("");
    }
    function getVariableNameAndFallback(match) {
        var commaIndex = match.indexOf(",");
        var name;
        var fallback;
        if (commaIndex >= 0) {
            name = match.substring(4, commaIndex).trim();
            fallback = match.substring(commaIndex + 1, match.length - 1).trim();
        } else {
            name = match.substring(4, match.length - 1).trim();
            fallback = "";
        }
        return {
            name: name,
            fallback: fallback
        };
    }
    function replaceCSSVariablesNames(value, nameReplacer, fallbackReplacer) {
        var matchReplacer = function(match) {
            var _a = getVariableNameAndFallback(match), name = _a.name, fallback = _a.fallback;
            var newName = nameReplacer(name);
            if (!fallback) return "var(".concat(newName, ")");
            var newFallback;
            if (isVarDependant(fallback)) newFallback = replaceCSSVariablesNames(fallback, nameReplacer, fallbackReplacer);
            else if (fallbackReplacer) newFallback = fallbackReplacer(fallback);
            else newFallback = fallback;
            return "var(".concat(newName, ", ").concat(newFallback, ")");
        };
        return replaceVariablesMatches(value, matchReplacer);
    }
    function iterateVarDependencies(value, iterator) {
        replaceCSSVariablesNames(value, function(varName) {
            iterator(varName);
            return varName;
        });
    }
    function wrapBgColorVariableName(name) {
        return "--darkreader-bg".concat(name);
    }
    function wrapTextColorVariableName(name) {
        return "--darkreader-text".concat(name);
    }
    function wrapBorderColorVariableName(name) {
        return "--darkreader-border".concat(name);
    }
    function wrapBgImgVariableName(name) {
        return "--darkreader-bgimg".concat(name);
    }
    function isVariable(property) {
        return property.startsWith("--");
    }
    function isVarDependant(value) {
        return value.includes("var(");
    }
    function isConstructedColorVar(value) {
        return value.match(/^\s*(rgb|hsl)a?\(/);
    }
    function isTextColorProperty(property) {
        return property === "color" || property === "caret-color" || property === "-webkit-text-fill-color";
    }
    var rawValueRegex = /^\d{1,3}, ?\d{1,3}, ?\d{1,3}$/;
    function parseRawValue(color) {
        if (rawValueRegex.test(color)) {
            var splitted = color.split(",");
            var resultInRGB_1 = "rgb(";
            splitted.forEach(function(number) {
                resultInRGB_1 += "".concat(number.trim(), ", ");
            });
            resultInRGB_1 = resultInRGB_1.substring(0, resultInRGB_1.length - 2);
            resultInRGB_1 += ")";
            return {
                isRaw: true,
                color: resultInRGB_1
            };
        }
        return {
            isRaw: false,
            color: color
        };
    }
    function handleRawValue(color, theme, modifyFunction) {
        var _a = parseRawValue(color), isRaw = _a.isRaw, newColor = _a.color;
        var rgb = parseColorWithCache(newColor);
        if (rgb) {
            var outputColor = modifyFunction(rgb, theme);
            if (isRaw) {
                var outputInRGB = parseColorWithCache(outputColor);
                return outputInRGB ? "".concat(outputInRGB.r, ", ").concat(outputInRGB.g, ", ").concat(outputInRGB.b) : outputColor;
            }
            return outputColor;
        }
        return newColor;
    }
    function tryModifyBgColor(color, theme) {
        return handleRawValue(color, theme, modifyBackgroundColor);
    }
    function tryModifyTextColor(color, theme) {
        return handleRawValue(color, theme, modifyForegroundColor);
    }
    function tryModifyBorderColor(color, theme) {
        return handleRawValue(color, theme, modifyBorderColor);
    }
    function insertVarValues(source, varValues, stack) {
        if (stack === void 0) stack = new Set();
        var containsUnresolvedVar = false;
        var matchReplacer = function(match) {
            var _a = getVariableNameAndFallback(match), name = _a.name, fallback = _a.fallback;
            if (stack.has(name)) {
                containsUnresolvedVar = true;
                return null;
            }
            stack.add(name);
            var varValue = varValues.get(name) || fallback;
            var inserted = null;
            if (varValue) {
                if (isVarDependant(varValue)) inserted = insertVarValues(varValue, varValues, stack);
                else inserted = varValue;
            }
            if (!inserted) {
                containsUnresolvedVar = true;
                return null;
            }
            return inserted;
        };
        var replaced = replaceVariablesMatches(source, matchReplacer);
        if (containsUnresolvedVar) return null;
        return replaced;
    }
    var overrides = {
        "background-color": {
            customProp: "--darkreader-inline-bgcolor",
            cssProp: "background-color",
            dataAttr: "data-darkreader-inline-bgcolor"
        },
        "background-image": {
            customProp: "--darkreader-inline-bgimage",
            cssProp: "background-image",
            dataAttr: "data-darkreader-inline-bgimage"
        },
        "border-color": {
            customProp: "--darkreader-inline-border",
            cssProp: "border-color",
            dataAttr: "data-darkreader-inline-border"
        },
        "border-bottom-color": {
            customProp: "--darkreader-inline-border-bottom",
            cssProp: "border-bottom-color",
            dataAttr: "data-darkreader-inline-border-bottom"
        },
        "border-left-color": {
            customProp: "--darkreader-inline-border-left",
            cssProp: "border-left-color",
            dataAttr: "data-darkreader-inline-border-left"
        },
        "border-right-color": {
            customProp: "--darkreader-inline-border-right",
            cssProp: "border-right-color",
            dataAttr: "data-darkreader-inline-border-right"
        },
        "border-top-color": {
            customProp: "--darkreader-inline-border-top",
            cssProp: "border-top-color",
            dataAttr: "data-darkreader-inline-border-top"
        },
        "box-shadow": {
            customProp: "--darkreader-inline-boxshadow",
            cssProp: "box-shadow",
            dataAttr: "data-darkreader-inline-boxshadow"
        },
        "color": {
            customProp: "--darkreader-inline-color",
            cssProp: "color",
            dataAttr: "data-darkreader-inline-color"
        },
        "fill": {
            customProp: "--darkreader-inline-fill",
            cssProp: "fill",
            dataAttr: "data-darkreader-inline-fill"
        },
        "stroke": {
            customProp: "--darkreader-inline-stroke",
            cssProp: "stroke",
            dataAttr: "data-darkreader-inline-stroke"
        },
        "outline-color": {
            customProp: "--darkreader-inline-outline",
            cssProp: "outline-color",
            dataAttr: "data-darkreader-inline-outline"
        },
        "stop-color": {
            customProp: "--darkreader-inline-stopcolor",
            cssProp: "stop-color",
            dataAttr: "data-darkreader-inline-stopcolor"
        }
    };
    var overridesList = Object.values(overrides);
    var normalizedPropList = {};
    overridesList.forEach(function(_a) {
        var cssProp = _a.cssProp, customProp = _a.customProp;
        return normalizedPropList[customProp] = cssProp;
    });
    var INLINE_STYLE_ATTRS = [
        "style",
        "fill",
        "stop-color",
        "stroke",
        "bgcolor",
        "color"
    ];
    var INLINE_STYLE_SELECTOR = INLINE_STYLE_ATTRS.map(function(attr) {
        return "[".concat(attr, "]");
    }).join(", ");
    function getInlineOverrideStyle() {
        return overridesList.map(function(_a) {
            var dataAttr = _a.dataAttr, customProp = _a.customProp, cssProp = _a.cssProp;
            return [
                "[".concat(dataAttr, "] {"),
                "  ".concat(cssProp, ": var(").concat(customProp, ") !important;"),
                "}"
            ].join("\n");
        }).join("\n");
    }
    function getInlineStyleElements(root) {
        var results = [];
        if (root instanceof Element && root.matches(INLINE_STYLE_SELECTOR)) results.push(root);
        if (root instanceof Element || isShadowDomSupported && root instanceof ShadowRoot || root instanceof Document) push(results, root.querySelectorAll(INLINE_STYLE_SELECTOR));
        return results;
    }
    var treeObservers = new Map();
    var attrObservers = new Map();
    function watchForInlineStyles(elementStyleDidChange, shadowRootDiscovered) {
        deepWatchForInlineStyles(document, elementStyleDidChange, shadowRootDiscovered);
        iterateShadowHosts(document.documentElement, function(host) {
            deepWatchForInlineStyles(host.shadowRoot, elementStyleDidChange, shadowRootDiscovered);
        });
    }
    function deepWatchForInlineStyles(root, elementStyleDidChange, shadowRootDiscovered) {
        if (treeObservers.has(root)) {
            treeObservers.get(root).disconnect();
            attrObservers.get(root).disconnect();
        }
        var discoveredNodes = new WeakSet();
        function discoverNodes(node) {
            getInlineStyleElements(node).forEach(function(el) {
                if (discoveredNodes.has(el)) return;
                discoveredNodes.add(el);
                elementStyleDidChange(el);
            });
            iterateShadowHosts(node, function(n) {
                if (discoveredNodes.has(node)) return;
                discoveredNodes.add(node);
                shadowRootDiscovered(n.shadowRoot);
                deepWatchForInlineStyles(n.shadowRoot, elementStyleDidChange, shadowRootDiscovered);
            });
        }
        var treeObserver = createOptimizedTreeObserver(root, {
            onMinorMutations: function(_a) {
                var additions = _a.additions;
                additions.forEach(function(added) {
                    return discoverNodes(added);
                });
            },
            onHugeMutations: function() {
                discoverNodes(root);
            }
        });
        treeObservers.set(root, treeObserver);
        var attemptCount = 0;
        var start = null;
        var ATTEMPTS_INTERVAL = getDuration({
            seconds: 10
        });
        var RETRY_TIMEOUT = getDuration({
            seconds: 2
        });
        var MAX_ATTEMPTS_COUNT = 50;
        var cache = [];
        var timeoutId = null;
        var handleAttributeMutations = throttle(function(mutations) {
            var handledTargets = new Set();
            mutations.forEach(function(m) {
                var target = m.target;
                if (handledTargets.has(target)) return;
                if (INLINE_STYLE_ATTRS.includes(m.attributeName)) {
                    handledTargets.add(target);
                    elementStyleDidChange(target);
                }
            });
        });
        var attrObserver = new MutationObserver(function(mutations) {
            if (timeoutId) {
                cache.push.apply(cache, __spreadArray([], __read(mutations), false));
                return;
            }
            attemptCount++;
            var now = Date.now();
            if (start == null) start = now;
            else if (attemptCount >= MAX_ATTEMPTS_COUNT) {
                if (now - start < ATTEMPTS_INTERVAL) {
                    timeoutId = setTimeout(function() {
                        start = null;
                        attemptCount = 0;
                        timeoutId = null;
                        var attributeCache = cache;
                        cache = [];
                        handleAttributeMutations(attributeCache);
                    }, RETRY_TIMEOUT);
                    cache.push.apply(cache, __spreadArray([], __read(mutations), false));
                    return;
                }
                start = now;
                attemptCount = 1;
            }
            handleAttributeMutations(mutations);
        });
        attrObserver.observe(root, {
            attributes: true,
            attributeFilter: INLINE_STYLE_ATTRS.concat(overridesList.map(function(_a) {
                var dataAttr = _a.dataAttr;
                return dataAttr;
            })),
            subtree: true
        });
        attrObservers.set(root, attrObserver);
    }
    function stopWatchingForInlineStyles() {
        treeObservers.forEach(function(o) {
            return o.disconnect();
        });
        attrObservers.forEach(function(o) {
            return o.disconnect();
        });
        treeObservers.clear();
        attrObservers.clear();
    }
    var inlineStyleCache = new WeakMap();
    var filterProps = [
        "brightness",
        "contrast",
        "grayscale",
        "sepia",
        "mode"
    ];
    function getInlineStyleCacheKey(el, theme) {
        return INLINE_STYLE_ATTRS.map(function(attr) {
            return "".concat(attr, '="').concat(el.getAttribute(attr), '"');
        }).concat(filterProps.map(function(prop) {
            return "".concat(prop, '="').concat(theme[prop], '"');
        })).join(" ");
    }
    function shouldIgnoreInlineStyle(element, selectors) {
        for(var i = 0, len = selectors.length; i < len; i++){
            var ingnoredSelector = selectors[i];
            if (element.matches(ingnoredSelector)) return true;
        }
        return false;
    }
    function overrideInlineStyle(element, theme, ignoreInlineSelectors, ignoreImageSelectors) {
        var cacheKey = getInlineStyleCacheKey(element, theme);
        if (cacheKey === inlineStyleCache.get(element)) return;
        var unsetProps = new Set(Object.keys(overrides));
        function setCustomProp(targetCSSProp, modifierCSSProp, cssVal) {
            var isPropertyVariable = targetCSSProp.startsWith("--");
            var _a = isPropertyVariable ? {} : overrides[targetCSSProp], customProp = _a.customProp, dataAttr = _a.dataAttr;
            var mod = getModifiableCSSDeclaration(modifierCSSProp, cssVal, {
                style: element.style
            }, variablesStore, ignoreImageSelectors, null);
            if (!mod) return;
            var value = mod.value;
            if (typeof value === "function") value = value(theme);
            if (isPropertyVariable && typeof value === "object") {
                var typedValue = value;
                typedValue.declarations.forEach(function(_a) {
                    var property = _a.property, value = _a.value;
                    !(value instanceof Promise) && element.style.setProperty(property, value);
                });
            } else {
                element.style.setProperty(customProp, value);
                if (!element.hasAttribute(dataAttr)) element.setAttribute(dataAttr, "");
                unsetProps.delete(targetCSSProp);
            }
        }
        if (ignoreInlineSelectors.length > 0) {
            if (shouldIgnoreInlineStyle(element, ignoreInlineSelectors)) {
                unsetProps.forEach(function(cssProp) {
                    element.removeAttribute(overrides[cssProp].dataAttr);
                });
                return;
            }
        }
        if (element.hasAttribute("bgcolor")) {
            var value = element.getAttribute("bgcolor");
            if (value.match(/^[0-9a-f]{3}$/i) || value.match(/^[0-9a-f]{6}$/i)) value = "#".concat(value);
            setCustomProp("background-color", "background-color", value);
        }
        if (element.hasAttribute("color") && element.rel !== "mask-icon") {
            var value = element.getAttribute("color");
            if (value.match(/^[0-9a-f]{3}$/i) || value.match(/^[0-9a-f]{6}$/i)) value = "#".concat(value);
            setCustomProp("color", "color", value);
        }
        if (element instanceof SVGElement) {
            if (element.hasAttribute("fill")) {
                var SMALL_SVG_LIMIT_1 = 32;
                var value_1 = element.getAttribute("fill");
                if (value_1 !== "none") {
                    if (!(element instanceof SVGTextElement)) {
                        var handleSVGElement = function() {
                            var _a = element.getBoundingClientRect(), width = _a.width, height = _a.height;
                            var isBg = width > SMALL_SVG_LIMIT_1 || height > SMALL_SVG_LIMIT_1;
                            setCustomProp("fill", isBg ? "background-color" : "color", value_1);
                        };
                        if (isReadyStateComplete()) handleSVGElement();
                        else addReadyStateCompleteListener(handleSVGElement);
                    } else setCustomProp("fill", "color", value_1);
                }
            }
            if (element.hasAttribute("stop-color")) setCustomProp("stop-color", "background-color", element.getAttribute("stop-color"));
        }
        if (element.hasAttribute("stroke")) {
            var value = element.getAttribute("stroke");
            setCustomProp("stroke", element instanceof SVGLineElement || element instanceof SVGTextElement ? "border-color" : "color", value);
        }
        element.style && iterateCSSDeclarations(element.style, function(property, value) {
            if (property === "background-image" && value.includes("url")) return;
            if (overrides.hasOwnProperty(property) || property.startsWith("--") && !normalizedPropList[property]) setCustomProp(property, property, value);
            else {
                var overridenProp = normalizedPropList[property];
                if (overridenProp && !element.style.getPropertyValue(overridenProp) && !element.hasAttribute(overridenProp)) {
                    if (overridenProp === "background-color" && element.hasAttribute("bgcolor")) return;
                    element.style.setProperty(property, "");
                }
            }
        });
        if (element.style && element instanceof SVGTextElement && element.style.fill) setCustomProp("fill", "color", element.style.getPropertyValue("fill"));
        forEach(unsetProps, function(cssProp) {
            element.removeAttribute(overrides[cssProp].dataAttr);
        });
        inlineStyleCache.set(element, getInlineStyleCacheKey(element, theme));
    }
    var metaThemeColorName = "theme-color";
    var metaThemeColorSelector = 'meta[name="'.concat(metaThemeColorName, '"]');
    var srcMetaThemeColor = null;
    var observer = null;
    function changeMetaThemeColor(meta, theme) {
        srcMetaThemeColor = srcMetaThemeColor || meta.content;
        var color = parseColorWithCache(srcMetaThemeColor);
        if (!color) return;
        meta.content = modifyBackgroundColor(color, theme);
    }
    function changeMetaThemeColorWhenAvailable(theme) {
        var meta = document.querySelector(metaThemeColorSelector);
        if (meta) changeMetaThemeColor(meta, theme);
        else {
            if (observer) observer.disconnect();
            observer = new MutationObserver(function(mutations) {
                loop: for(var i = 0; i < mutations.length; i++){
                    var addedNodes = mutations[i].addedNodes;
                    for(var j = 0; j < addedNodes.length; j++){
                        var node = addedNodes[j];
                        if (node instanceof HTMLMetaElement && node.name === metaThemeColorName) {
                            observer.disconnect();
                            observer = null;
                            changeMetaThemeColor(node, theme);
                            break loop;
                        }
                    }
                }
            });
            observer.observe(document.head, {
                childList: true
            });
        }
    }
    function restoreMetaThemeColor() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        var meta = document.querySelector(metaThemeColorSelector);
        if (meta && srcMetaThemeColor) meta.content = srcMetaThemeColor;
    }
    var themeCacheKeys = [
        "mode",
        "brightness",
        "contrast",
        "grayscale",
        "sepia",
        "darkSchemeBackgroundColor",
        "darkSchemeTextColor",
        "lightSchemeBackgroundColor",
        "lightSchemeTextColor"
    ];
    function getThemeKey(theme) {
        var resultKey = "";
        themeCacheKeys.forEach(function(key) {
            resultKey += "".concat(key, ":").concat(theme[key], ";");
        });
        return resultKey;
    }
    var asyncQueue = createAsyncTasksQueue();
    function createStyleSheetModifier() {
        var renderId = 0;
        var rulesTextCache = new Set();
        var rulesModCache = new Map();
        var varTypeChangeCleaners = new Set();
        var prevFilterKey = null;
        var hasNonLoadedLink = false;
        var wasRebuilt = false;
        function shouldRebuildStyle() {
            return hasNonLoadedLink && !wasRebuilt;
        }
        function modifySheet(options) {
            var rules = options.sourceCSSRules;
            var theme = options.theme, ignoreImageAnalysis = options.ignoreImageAnalysis, force = options.force, prepareSheet = options.prepareSheet, isAsyncCancelled = options.isAsyncCancelled;
            var rulesChanged = rulesModCache.size === 0;
            var notFoundCacheKeys = new Set(rulesModCache.keys());
            var themeKey = getThemeKey(theme);
            var themeChanged = themeKey !== prevFilterKey;
            if (hasNonLoadedLink) wasRebuilt = true;
            var modRules = [];
            iterateCSSRules(rules, function(rule) {
                var cssText = rule.cssText;
                var textDiffersFromPrev = false;
                notFoundCacheKeys.delete(cssText);
                if (rule.parentRule instanceof CSSMediaRule) cssText += ";".concat(rule.parentRule.media.mediaText);
                if (!rulesTextCache.has(cssText)) {
                    rulesTextCache.add(cssText);
                    textDiffersFromPrev = true;
                }
                if (textDiffersFromPrev) rulesChanged = true;
                else {
                    modRules.push(rulesModCache.get(cssText));
                    return;
                }
                if (rule.style.all === "revert") return;
                var modDecs = [];
                rule.style && iterateCSSDeclarations(rule.style, function(property, value) {
                    var mod = getModifiableCSSDeclaration(property, value, rule, variablesStore, ignoreImageAnalysis, isAsyncCancelled);
                    if (mod) modDecs.push(mod);
                });
                var modRule = null;
                if (modDecs.length > 0) {
                    var parentRule = rule.parentRule;
                    modRule = {
                        selector: rule.selectorText,
                        declarations: modDecs,
                        parentRule: parentRule
                    };
                    modRules.push(modRule);
                }
                rulesModCache.set(cssText, modRule);
            }, function() {
                hasNonLoadedLink = true;
            });
            notFoundCacheKeys.forEach(function(key) {
                rulesTextCache.delete(key);
                rulesModCache.delete(key);
            });
            prevFilterKey = themeKey;
            if (!force && !rulesChanged && !themeChanged) return;
            renderId++;
            function setRule(target, index, rule) {
                var selector = rule.selector, declarations = rule.declarations;
                var getDeclarationText = function(dec) {
                    var property = dec.property, value = dec.value, important = dec.important, sourceValue = dec.sourceValue;
                    return "".concat(property, ": ").concat(value == null ? sourceValue : value).concat(important ? " !important" : "", ";");
                };
                var cssRulesText = "";
                declarations.forEach(function(declarations) {
                    cssRulesText += "".concat(getDeclarationText(declarations), " ");
                });
                var ruleText = "".concat(selector, " { ").concat(cssRulesText, " }");
                target.insertRule(ruleText, index);
            }
            var asyncDeclarations = new Map();
            var varDeclarations = new Map();
            var asyncDeclarationCounter = 0;
            var varDeclarationCounter = 0;
            var rootReadyGroup = {
                rule: null,
                rules: [],
                isGroup: true
            };
            var groupRefs = new WeakMap();
            function getGroup(rule) {
                if (rule == null) return rootReadyGroup;
                if (groupRefs.has(rule)) return groupRefs.get(rule);
                var group = {
                    rule: rule,
                    rules: [],
                    isGroup: true
                };
                groupRefs.set(rule, group);
                var parentGroup = getGroup(rule.parentRule);
                parentGroup.rules.push(group);
                return group;
            }
            varTypeChangeCleaners.forEach(function(clear) {
                return clear();
            });
            varTypeChangeCleaners.clear();
            modRules.filter(function(r) {
                return r;
            }).forEach(function(_a) {
                var selector = _a.selector, declarations = _a.declarations, parentRule = _a.parentRule;
                var group = getGroup(parentRule);
                var readyStyleRule = {
                    selector: selector,
                    declarations: [],
                    isGroup: false
                };
                var readyDeclarations = readyStyleRule.declarations;
                group.rules.push(readyStyleRule);
                function handleAsyncDeclaration(property, modified, important, sourceValue) {
                    var asyncKey = ++asyncDeclarationCounter;
                    var asyncDeclaration = {
                        property: property,
                        value: null,
                        important: important,
                        asyncKey: asyncKey,
                        sourceValue: sourceValue
                    };
                    readyDeclarations.push(asyncDeclaration);
                    var currentRenderId = renderId;
                    modified.then(function(asyncValue) {
                        if (!asyncValue || isAsyncCancelled() || currentRenderId !== renderId) return;
                        asyncDeclaration.value = asyncValue;
                        asyncQueue.add(function() {
                            if (isAsyncCancelled() || currentRenderId !== renderId) return;
                            rebuildAsyncRule(asyncKey);
                        });
                    });
                }
                function handleVarDeclarations(property, modified, important, sourceValue) {
                    var varDecs = modified.declarations, onTypeChange = modified.onTypeChange;
                    var varKey = ++varDeclarationCounter;
                    var currentRenderId = renderId;
                    var initialIndex = readyDeclarations.length;
                    var oldDecs = [];
                    if (varDecs.length === 0) {
                        var tempDec = {
                            property: property,
                            value: sourceValue,
                            important: important,
                            sourceValue: sourceValue,
                            varKey: varKey
                        };
                        readyDeclarations.push(tempDec);
                        oldDecs = [
                            tempDec
                        ];
                    }
                    varDecs.forEach(function(mod) {
                        if (mod.value instanceof Promise) handleAsyncDeclaration(mod.property, mod.value, important, sourceValue);
                        else {
                            var readyDec = {
                                property: mod.property,
                                value: mod.value,
                                important: important,
                                sourceValue: sourceValue,
                                varKey: varKey
                            };
                            readyDeclarations.push(readyDec);
                            oldDecs.push(readyDec);
                        }
                    });
                    onTypeChange.addListener(function(newDecs) {
                        if (isAsyncCancelled() || currentRenderId !== renderId) return;
                        var readyVarDecs = newDecs.map(function(mod) {
                            return {
                                property: mod.property,
                                value: mod.value,
                                important: important,
                                sourceValue: sourceValue,
                                varKey: varKey
                            };
                        });
                        var index = readyDeclarations.indexOf(oldDecs[0], initialIndex);
                        readyDeclarations.splice.apply(readyDeclarations, __spreadArray([
                            index,
                            oldDecs.length
                        ], __read(readyVarDecs), false));
                        oldDecs = readyVarDecs;
                        rebuildVarRule(varKey);
                    });
                    varTypeChangeCleaners.add(function() {
                        return onTypeChange.removeListeners();
                    });
                }
                declarations.forEach(function(_a) {
                    var property = _a.property, value = _a.value, important = _a.important, sourceValue = _a.sourceValue;
                    if (typeof value === "function") {
                        var modified = value(theme);
                        if (modified instanceof Promise) handleAsyncDeclaration(property, modified, important, sourceValue);
                        else if (property.startsWith("--")) handleVarDeclarations(property, modified, important, sourceValue);
                        else readyDeclarations.push({
                            property: property,
                            value: modified,
                            important: important,
                            sourceValue: sourceValue
                        });
                    } else readyDeclarations.push({
                        property: property,
                        value: value,
                        important: important,
                        sourceValue: sourceValue
                    });
                });
            });
            var sheet = prepareSheet();
            function buildStyleSheet() {
                function createTarget(group, parent) {
                    var rule = group.rule;
                    if (rule instanceof CSSMediaRule) {
                        var media = rule.media;
                        var index = parent.cssRules.length;
                        parent.insertRule("@media ".concat(media.mediaText, " {}"), index);
                        return parent.cssRules[index];
                    }
                    return parent;
                }
                function iterateReadyRules(group, target, styleIterator) {
                    group.rules.forEach(function(r) {
                        if (r.isGroup) {
                            var t = createTarget(r, target);
                            iterateReadyRules(r, t, styleIterator);
                        } else styleIterator(r, target);
                    });
                }
                iterateReadyRules(rootReadyGroup, sheet, function(rule, target) {
                    var index = target.cssRules.length;
                    rule.declarations.forEach(function(_a) {
                        var asyncKey = _a.asyncKey, varKey = _a.varKey;
                        if (asyncKey != null) asyncDeclarations.set(asyncKey, {
                            rule: rule,
                            target: target,
                            index: index
                        });
                        if (varKey != null) varDeclarations.set(varKey, {
                            rule: rule,
                            target: target,
                            index: index
                        });
                    });
                    setRule(target, index, rule);
                });
            }
            function rebuildAsyncRule(key) {
                var _a = asyncDeclarations.get(key), rule = _a.rule, target = _a.target, index = _a.index;
                target.deleteRule(index);
                setRule(target, index, rule);
                asyncDeclarations.delete(key);
            }
            function rebuildVarRule(key) {
                var _a = varDeclarations.get(key), rule = _a.rule, target = _a.target, index = _a.index;
                target.deleteRule(index);
                setRule(target, index, rule);
            }
            buildStyleSheet();
        }
        return {
            modifySheet: modifySheet,
            shouldRebuildStyle: shouldRebuildStyle
        };
    }
    var STYLE_SELECTOR = 'style, link[rel*="stylesheet" i]:not([disabled])';
    function isFontsGoogleApiStyle(element) {
        if (!element.href) return false;
        try {
            var elementURL = new URL(element.href);
            return elementURL.hostname === "fonts.googleapis.com";
        } catch (err) {
            logInfo("Couldn't construct ".concat(element.href, " as URL"));
            return false;
        }
    }
    function shouldManageStyle(element) {
        return (element instanceof HTMLStyleElement || element instanceof SVGStyleElement || element instanceof HTMLLinkElement && Boolean(element.rel) && element.rel.toLowerCase().includes("stylesheet") && Boolean(element.href) && !element.disabled && (isFirefox ? !element.href.startsWith("moz-extension://") : true) && !isFontsGoogleApiStyle(element)) && !element.classList.contains("darkreader") && element.media.toLowerCase() !== "print" && !element.classList.contains("stylus");
    }
    function getManageableStyles(node, results, deep) {
        if (results === void 0) results = [];
        if (deep === void 0) deep = true;
        if (shouldManageStyle(node)) results.push(node);
        else if (node instanceof Element || isShadowDomSupported && node instanceof ShadowRoot || node === document) {
            forEach(node.querySelectorAll(STYLE_SELECTOR), function(style) {
                return getManageableStyles(style, results, false);
            });
            if (deep) iterateShadowHosts(node, function(host) {
                return getManageableStyles(host.shadowRoot, results, false);
            });
        }
        return results;
    }
    var syncStyleSet = new WeakSet();
    var corsStyleSet = new WeakSet();
    var canOptimizeUsingProxy$1 = false;
    document.addEventListener("__darkreader__inlineScriptsAllowed", function() {
        canOptimizeUsingProxy$1 = true;
    }, {
        once: true,
        passive: true
    });
    var loadingLinkCounter = 0;
    var rejectorsForLoadingLinks = new Map();
    function cleanLoadingLinks() {
        rejectorsForLoadingLinks.clear();
    }
    function manageStyle(element, _a) {
        var update = _a.update, loadingStart = _a.loadingStart, loadingEnd = _a.loadingEnd;
        var prevStyles = [];
        var next = element;
        while((next = next.nextElementSibling) && next.matches(".darkreader"))prevStyles.push(next);
        var corsCopy = prevStyles.find(function(el) {
            return el.matches(".darkreader--cors") && !corsStyleSet.has(el);
        }) || null;
        var syncStyle = prevStyles.find(function(el) {
            return el.matches(".darkreader--sync") && !syncStyleSet.has(el);
        }) || null;
        var corsCopyPositionWatcher = null;
        var syncStylePositionWatcher = null;
        var cancelAsyncOperations = false;
        var isOverrideEmpty = true;
        var sheetModifier = createStyleSheetModifier();
        var observer = new MutationObserver(function() {
            update();
        });
        var observerOptions = {
            attributes: true,
            childList: true,
            subtree: true,
            characterData: true
        };
        function containsCSSImport() {
            return element instanceof HTMLStyleElement && element.textContent.trim().match(cssImportRegex);
        }
        function hasImports(cssRules, checkCrossOrigin) {
            var result = false;
            if (cssRules) {
                var rule = void 0;
                cssRulesLoop: for(var i = 0, len = cssRules.length; i < len; i++){
                    rule = cssRules[i];
                    if (rule.href) {
                        if (checkCrossOrigin) {
                            if (!rule.href.startsWith("https://fonts.googleapis.com/") && rule.href.startsWith("http") && !rule.href.startsWith(location.origin)) {
                                result = true;
                                break cssRulesLoop;
                            }
                        } else {
                            result = true;
                            break cssRulesLoop;
                        }
                    }
                }
            }
            return result;
        }
        function getRulesSync() {
            if (corsCopy) return corsCopy.sheet.cssRules;
            if (containsCSSImport()) return null;
            var cssRules = safeGetSheetRules();
            if (element instanceof HTMLLinkElement && !isRelativeHrefOnAbsolutePath(element.href) && hasImports(cssRules, false)) return null;
            if (hasImports(cssRules, true)) return null;
            return cssRules;
        }
        function insertStyle() {
            if (corsCopy) {
                if (element.nextSibling !== corsCopy) element.parentNode.insertBefore(corsCopy, element.nextSibling);
                if (corsCopy.nextSibling !== syncStyle) element.parentNode.insertBefore(syncStyle, corsCopy.nextSibling);
            } else if (element.nextSibling !== syncStyle) element.parentNode.insertBefore(syncStyle, element.nextSibling);
        }
        function createSyncStyle() {
            syncStyle = element instanceof SVGStyleElement ? document.createElementNS("http://www.w3.org/2000/svg", "style") : document.createElement("style");
            syncStyle.classList.add("darkreader");
            syncStyle.classList.add("darkreader--sync");
            syncStyle.media = "screen";
            if (element.title) syncStyle.title = element.title;
            syncStyleSet.add(syncStyle);
        }
        var isLoadingRules = false;
        var wasLoadingError = false;
        var loadingLinkId = ++loadingLinkCounter;
        function getRulesAsync() {
            return __awaiter(this, void 0, void 0, function() {
                var cssText, cssBasePath, _a, cssRules, accessError, fullCSSText;
                var _b;
                return __generator(this, function(_c) {
                    switch(_c.label){
                        case 0:
                            if (!(element instanceof HTMLLinkElement)) return [
                                3,
                                7
                            ];
                            _a = __read(getRulesOrError(), 2), cssRules = _a[0], accessError = _a[1];
                            if (!(isSafari && !element.sheet || !isSafari && !cssRules && !accessError || isStillLoadingError(accessError))) return [
                                3,
                                5
                            ];
                            _c.label = 1;
                        case 1:
                            _c.trys.push([
                                1,
                                3,
                                ,
                                4
                            ]);
                            return [
                                4,
                                linkLoading(element, loadingLinkId)
                            ];
                        case 2:
                            _c.sent();
                            return [
                                3,
                                4
                            ];
                        case 3:
                            _c.sent();
                            wasLoadingError = true;
                            return [
                                3,
                                4
                            ];
                        case 4:
                            if (cancelAsyncOperations) return [
                                2,
                                null
                            ];
                            _b = __read(getRulesOrError(), 2), cssRules = _b[0], accessError = _b[1];
                            _c.label = 5;
                        case 5:
                            if (cssRules) {
                                if (!hasImports(cssRules, false)) return [
                                    2,
                                    cssRules
                                ];
                            }
                            return [
                                4,
                                loadText(element.href)
                            ];
                        case 6:
                            cssText = _c.sent();
                            cssBasePath = getCSSBaseBath(element.href);
                            if (cancelAsyncOperations) return [
                                2,
                                null
                            ];
                            return [
                                3,
                                8
                            ];
                        case 7:
                            if (containsCSSImport()) {
                                cssText = element.textContent.trim();
                                cssBasePath = getCSSBaseBath(location.href);
                            } else return [
                                2,
                                null
                            ];
                            _c.label = 8;
                        case 8:
                            if (!cssText) return [
                                3,
                                13
                            ];
                            _c.label = 9;
                        case 9:
                            _c.trys.push([
                                9,
                                11,
                                ,
                                12
                            ]);
                            return [
                                4,
                                replaceCSSImports(cssText, cssBasePath)
                            ];
                        case 10:
                            fullCSSText = _c.sent();
                            corsCopy = createCORSCopy(element, fullCSSText);
                            return [
                                3,
                                12
                            ];
                        case 11:
                            _c.sent();
                            return [
                                3,
                                12
                            ];
                        case 12:
                            if (corsCopy) {
                                corsCopyPositionWatcher = watchForNodePosition(corsCopy, "prev-sibling");
                                return [
                                    2,
                                    corsCopy.sheet.cssRules
                                ];
                            }
                            _c.label = 13;
                        case 13:
                            return [
                                2,
                                null
                            ];
                    }
                });
            });
        }
        function details(options) {
            var rules = getRulesSync();
            if (!rules) {
                if (options.secondRound) return null;
                if (isLoadingRules || wasLoadingError) return null;
                isLoadingRules = true;
                loadingStart();
                getRulesAsync().then(function(results) {
                    isLoadingRules = false;
                    loadingEnd();
                    if (results) update();
                }).catch(function(err) {
                    isLoadingRules = false;
                    loadingEnd();
                });
                return null;
            }
            return {
                rules: rules
            };
        }
        var forceRenderStyle = false;
        function render(theme, ignoreImageAnalysis) {
            var rules = getRulesSync();
            if (!rules) return;
            cancelAsyncOperations = false;
            function removeCSSRulesFromSheet(sheet) {
                if (!sheet) return;
                for(var i = sheet.cssRules.length - 1; i >= 0; i--)sheet.deleteRule(i);
            }
            function prepareOverridesSheet() {
                if (!syncStyle) createSyncStyle();
                syncStylePositionWatcher && syncStylePositionWatcher.stop();
                insertStyle();
                if (syncStyle.sheet == null) syncStyle.textContent = "";
                var sheet = syncStyle.sheet;
                removeCSSRulesFromSheet(sheet);
                if (syncStylePositionWatcher) syncStylePositionWatcher.run();
                else syncStylePositionWatcher = watchForNodePosition(syncStyle, "prev-sibling", function() {
                    forceRenderStyle = true;
                    buildOverrides();
                });
                return syncStyle.sheet;
            }
            function buildOverrides() {
                var force = forceRenderStyle;
                forceRenderStyle = false;
                sheetModifier.modifySheet({
                    prepareSheet: prepareOverridesSheet,
                    sourceCSSRules: rules,
                    theme: theme,
                    ignoreImageAnalysis: ignoreImageAnalysis,
                    force: force,
                    isAsyncCancelled: function() {
                        return cancelAsyncOperations;
                    }
                });
                isOverrideEmpty = syncStyle.sheet.cssRules.length === 0;
                if (sheetModifier.shouldRebuildStyle()) addReadyStateCompleteListener(function() {
                    return update();
                });
            }
            buildOverrides();
        }
        function getRulesOrError() {
            try {
                if (element.sheet == null) return [
                    null,
                    null
                ];
                return [
                    element.sheet.cssRules,
                    null
                ];
            } catch (err) {
                return [
                    null,
                    err
                ];
            }
        }
        function isStillLoadingError(error) {
            return error && error.message && error.message.includes("loading");
        }
        function safeGetSheetRules() {
            var _a = __read(getRulesOrError(), 2), cssRules = _a[0], err = _a[1];
            if (err) return null;
            return cssRules;
        }
        function watchForSheetChanges() {
            watchForSheetChangesUsingProxy();
            if (!(canOptimizeUsingProxy$1 && element.sheet)) watchForSheetChangesUsingRAF();
        }
        var rulesChangeKey = null;
        var rulesCheckFrameId = null;
        function getRulesChangeKey() {
            var rules = safeGetSheetRules();
            return rules ? rules.length : null;
        }
        function didRulesKeyChange() {
            return getRulesChangeKey() !== rulesChangeKey;
        }
        function watchForSheetChangesUsingRAF() {
            rulesChangeKey = getRulesChangeKey();
            stopWatchingForSheetChangesUsingRAF();
            var checkForUpdate = function() {
                if (didRulesKeyChange()) {
                    rulesChangeKey = getRulesChangeKey();
                    update();
                }
                if (canOptimizeUsingProxy$1 && element.sheet) {
                    stopWatchingForSheetChangesUsingRAF();
                    return;
                }
                rulesCheckFrameId = requestAnimationFrame(checkForUpdate);
            };
            checkForUpdate();
        }
        function stopWatchingForSheetChangesUsingRAF() {
            cancelAnimationFrame(rulesCheckFrameId);
        }
        var areSheetChangesPending = false;
        function onSheetChange() {
            canOptimizeUsingProxy$1 = true;
            stopWatchingForSheetChangesUsingRAF();
            if (areSheetChangesPending) return;
            function handleSheetChanges() {
                areSheetChangesPending = false;
                if (cancelAsyncOperations) return;
                update();
            }
            areSheetChangesPending = true;
            if (typeof queueMicrotask === "function") queueMicrotask(handleSheetChanges);
            else requestAnimationFrame(handleSheetChanges);
        }
        function watchForSheetChangesUsingProxy() {
            element.addEventListener("__darkreader__updateSheet", onSheetChange, {
                passive: true
            });
        }
        function stopWatchingForSheetChangesUsingProxy() {
            element.removeEventListener("__darkreader__updateSheet", onSheetChange);
        }
        function stopWatchingForSheetChanges() {
            stopWatchingForSheetChangesUsingProxy();
            stopWatchingForSheetChangesUsingRAF();
        }
        function pause() {
            observer.disconnect();
            cancelAsyncOperations = true;
            corsCopyPositionWatcher && corsCopyPositionWatcher.stop();
            syncStylePositionWatcher && syncStylePositionWatcher.stop();
            stopWatchingForSheetChanges();
        }
        function destroy() {
            pause();
            removeNode(corsCopy);
            removeNode(syncStyle);
            loadingEnd();
            if (rejectorsForLoadingLinks.has(loadingLinkId)) {
                var reject = rejectorsForLoadingLinks.get(loadingLinkId);
                rejectorsForLoadingLinks.delete(loadingLinkId);
                reject && reject();
            }
        }
        function watch() {
            observer.observe(element, observerOptions);
            if (element instanceof HTMLStyleElement) watchForSheetChanges();
        }
        var maxMoveCount = 10;
        var moveCount = 0;
        function restore() {
            if (!syncStyle) return;
            moveCount++;
            if (moveCount > maxMoveCount) return;
            insertStyle();
            corsCopyPositionWatcher && corsCopyPositionWatcher.skip();
            syncStylePositionWatcher && syncStylePositionWatcher.skip();
            if (!isOverrideEmpty) {
                forceRenderStyle = true;
                update();
            }
        }
        return {
            details: details,
            render: render,
            pause: pause,
            destroy: destroy,
            watch: watch,
            restore: restore
        };
    }
    function linkLoading(link, loadingId) {
        return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                return [
                    2,
                    new Promise(function(resolve, reject) {
                        var cleanUp = function() {
                            link.removeEventListener("load", onLoad);
                            link.removeEventListener("error", onError);
                            rejectorsForLoadingLinks.delete(loadingId);
                        };
                        var onLoad = function() {
                            cleanUp();
                            resolve();
                        };
                        var onError = function() {
                            cleanUp();
                            reject("Linkelement ".concat(loadingId, " couldn't be loaded. ").concat(link.href));
                        };
                        rejectorsForLoadingLinks.set(loadingId, function() {
                            cleanUp();
                            reject();
                        });
                        link.addEventListener("load", onLoad, {
                            passive: true
                        });
                        link.addEventListener("error", onError, {
                            passive: true
                        });
                        if (!link.href) onError();
                    })
                ];
            });
        });
    }
    function getCSSImportURL(importDeclaration) {
        return getCSSURLValue(importDeclaration.substring(7).trim().replace(/;$/, "").replace(/screen$/, ""));
    }
    function loadText(url) {
        return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        if (!url.startsWith("data:")) return [
                            3,
                            3
                        ];
                        return [
                            4,
                            fetch(url)
                        ];
                    case 1:
                        return [
                            4,
                            _a.sent().text()
                        ];
                    case 2:
                        return [
                            2,
                            _a.sent()
                        ];
                    case 3:
                        return [
                            4,
                            bgFetch({
                                url: url,
                                responseType: "text",
                                mimeType: "text/css",
                                origin: window.location.origin
                            })
                        ];
                    case 4:
                        return [
                            2,
                            _a.sent()
                        ];
                }
            });
        });
    }
    function replaceCSSImports(cssText, basePath, cache) {
        if (cache === void 0) cache = new Map();
        return __awaiter(this, void 0, void 0, function() {
            var importMatches, importMatches_1, importMatches_1_1, match, importURL, absoluteURL, importedCSS, e_1_1;
            var e_1, _a;
            return __generator(this, function(_b) {
                switch(_b.label){
                    case 0:
                        cssText = removeCSSComments(cssText);
                        cssText = replaceCSSFontFace(cssText);
                        cssText = replaceCSSRelativeURLsWithAbsolute(cssText, basePath);
                        importMatches = getMatches(cssImportRegex, cssText);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([
                            1,
                            10,
                            11,
                            12
                        ]);
                        importMatches_1 = __values(importMatches), importMatches_1_1 = importMatches_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!importMatches_1_1.done) return [
                            3,
                            9
                        ];
                        match = importMatches_1_1.value;
                        importURL = getCSSImportURL(match);
                        absoluteURL = getAbsoluteURL(basePath, importURL);
                        importedCSS = void 0;
                        if (!cache.has(absoluteURL)) return [
                            3,
                            3
                        ];
                        importedCSS = cache.get(absoluteURL);
                        return [
                            3,
                            7
                        ];
                    case 3:
                        _b.trys.push([
                            3,
                            6,
                            ,
                            7
                        ]);
                        return [
                            4,
                            loadText(absoluteURL)
                        ];
                    case 4:
                        importedCSS = _b.sent();
                        cache.set(absoluteURL, importedCSS);
                        return [
                            4,
                            replaceCSSImports(importedCSS, getCSSBaseBath(absoluteURL), cache)
                        ];
                    case 5:
                        importedCSS = _b.sent();
                        return [
                            3,
                            7
                        ];
                    case 6:
                        _b.sent();
                        importedCSS = "";
                        return [
                            3,
                            7
                        ];
                    case 7:
                        cssText = cssText.split(match).join(importedCSS);
                        _b.label = 8;
                    case 8:
                        importMatches_1_1 = importMatches_1.next();
                        return [
                            3,
                            2
                        ];
                    case 9:
                        return [
                            3,
                            12
                        ];
                    case 10:
                        e_1_1 = _b.sent();
                        e_1 = {
                            error: e_1_1
                        };
                        return [
                            3,
                            12
                        ];
                    case 11:
                        try {
                            if (importMatches_1_1 && !importMatches_1_1.done && (_a = importMatches_1.return)) _a.call(importMatches_1);
                        } finally{
                            if (e_1) throw e_1.error;
                        }
                        return [
                            7
                        ];
                    case 12:
                        cssText = cssText.trim();
                        return [
                            2,
                            cssText
                        ];
                }
            });
        });
    }
    function createCORSCopy(srcElement, cssText) {
        if (!cssText) return null;
        var cors = document.createElement("style");
        cors.classList.add("darkreader");
        cors.classList.add("darkreader--cors");
        cors.media = "screen";
        cors.textContent = cssText;
        srcElement.parentNode.insertBefore(cors, srcElement.nextSibling);
        cors.sheet.disabled = true;
        corsStyleSet.add(cors);
        return cors;
    }
    var observers = [];
    var observedRoots;
    var definedCustomElements = new Set();
    var undefinedGroups = new Map();
    var elementsDefinitionCallback;
    function isCustomElement(element) {
        if (element.tagName.includes("-") || element.getAttribute("is")) return true;
        return false;
    }
    function recordUndefinedElement(element) {
        var tag = element.tagName.toLowerCase();
        if (!tag.includes("-")) {
            var extendedTag = element.getAttribute("is");
            if (extendedTag) tag = extendedTag;
            else return;
        }
        if (!undefinedGroups.has(tag)) {
            undefinedGroups.set(tag, new Set());
            customElementsWhenDefined(tag).then(function() {
                if (elementsDefinitionCallback) {
                    var elements = undefinedGroups.get(tag);
                    undefinedGroups.delete(tag);
                    elementsDefinitionCallback(Array.from(elements));
                }
            });
        }
        undefinedGroups.get(tag).add(element);
    }
    function collectUndefinedElements(root) {
        if (!isDefinedSelectorSupported) return;
        forEach(root.querySelectorAll(":not(:defined)"), recordUndefinedElement);
    }
    var canOptimizeUsingProxy = false;
    document.addEventListener("__darkreader__inlineScriptsAllowed", function() {
        canOptimizeUsingProxy = true;
    }, {
        once: true,
        passive: true
    });
    var resolvers = new Map();
    function handleIsDefined(e) {
        canOptimizeUsingProxy = true;
        var tag = e.detail.tag;
        definedCustomElements.add(tag);
        if (resolvers.has(tag)) {
            var r = resolvers.get(tag);
            resolvers.delete(tag);
            r.forEach(function(r) {
                return r();
            });
        }
    }
    function customElementsWhenDefined(tag) {
        return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                if (definedCustomElements.has(tag)) return [
                    2
                ];
                return [
                    2,
                    new Promise(function(resolve) {
                        if (window.customElements && typeof customElements.whenDefined === "function") customElements.whenDefined(tag).then(function() {
                            return resolve();
                        });
                        else if (canOptimizeUsingProxy) {
                            if (resolvers.has(tag)) resolvers.get(tag).push(resolve);
                            else resolvers.set(tag, [
                                resolve
                            ]);
                            document.dispatchEvent(new CustomEvent("__darkreader__addUndefinedResolver", {
                                detail: {
                                    tag: tag
                                }
                            }));
                        } else {
                            var checkIfDefined_1 = function() {
                                var elements = undefinedGroups.get(tag);
                                if (elements && elements.size > 0) {
                                    if (elements.values().next().value.matches(":defined")) resolve();
                                    else requestAnimationFrame(checkIfDefined_1);
                                }
                            };
                            requestAnimationFrame(checkIfDefined_1);
                        }
                    })
                ];
            });
        });
    }
    function watchWhenCustomElementsDefined(callback) {
        elementsDefinitionCallback = callback;
    }
    function unsubscribeFromDefineCustomElements() {
        elementsDefinitionCallback = null;
        undefinedGroups.clear();
        document.removeEventListener("__darkreader__isDefined", handleIsDefined);
    }
    function watchForStyleChanges(currentStyles, update, shadowRootDiscovered) {
        stopWatchingForStyleChanges();
        var prevStyles = new Set(currentStyles);
        var prevStyleSiblings = new WeakMap();
        var nextStyleSiblings = new WeakMap();
        function saveStylePosition(style) {
            prevStyleSiblings.set(style, style.previousElementSibling);
            nextStyleSiblings.set(style, style.nextElementSibling);
        }
        function forgetStylePosition(style) {
            prevStyleSiblings.delete(style);
            nextStyleSiblings.delete(style);
        }
        function didStylePositionChange(style) {
            return style.previousElementSibling !== prevStyleSiblings.get(style) || style.nextElementSibling !== nextStyleSiblings.get(style);
        }
        currentStyles.forEach(saveStylePosition);
        function handleStyleOperations(operations) {
            var createdStyles = operations.createdStyles, removedStyles = operations.removedStyles, movedStyles = operations.movedStyles;
            createdStyles.forEach(function(s) {
                return saveStylePosition(s);
            });
            movedStyles.forEach(function(s) {
                return saveStylePosition(s);
            });
            removedStyles.forEach(function(s) {
                return forgetStylePosition(s);
            });
            createdStyles.forEach(function(s) {
                return prevStyles.add(s);
            });
            removedStyles.forEach(function(s) {
                return prevStyles.delete(s);
            });
            if (createdStyles.size + removedStyles.size + movedStyles.size > 0) update({
                created: Array.from(createdStyles),
                removed: Array.from(removedStyles),
                moved: Array.from(movedStyles),
                updated: []
            });
        }
        function handleMinorTreeMutations(_a) {
            var additions = _a.additions, moves = _a.moves, deletions = _a.deletions;
            var createdStyles = new Set();
            var removedStyles = new Set();
            var movedStyles = new Set();
            additions.forEach(function(node) {
                return getManageableStyles(node).forEach(function(style) {
                    return createdStyles.add(style);
                });
            });
            deletions.forEach(function(node) {
                return getManageableStyles(node).forEach(function(style) {
                    return removedStyles.add(style);
                });
            });
            moves.forEach(function(node) {
                return getManageableStyles(node).forEach(function(style) {
                    return movedStyles.add(style);
                });
            });
            handleStyleOperations({
                createdStyles: createdStyles,
                removedStyles: removedStyles,
                movedStyles: movedStyles
            });
            additions.forEach(function(n) {
                extendedIterateShadowHosts(n);
                collectUndefinedElements(n);
            });
            additions.forEach(function(node) {
                return isCustomElement(node) && recordUndefinedElement(node);
            });
        }
        function handleHugeTreeMutations(root) {
            var styles = new Set(getManageableStyles(root));
            var createdStyles = new Set();
            var removedStyles = new Set();
            var movedStyles = new Set();
            styles.forEach(function(s) {
                if (!prevStyles.has(s)) createdStyles.add(s);
            });
            prevStyles.forEach(function(s) {
                if (!styles.has(s)) removedStyles.add(s);
            });
            styles.forEach(function(s) {
                if (!createdStyles.has(s) && !removedStyles.has(s) && didStylePositionChange(s)) movedStyles.add(s);
            });
            handleStyleOperations({
                createdStyles: createdStyles,
                removedStyles: removedStyles,
                movedStyles: movedStyles
            });
            extendedIterateShadowHosts(root);
            collectUndefinedElements(root);
        }
        function handleAttributeMutations(mutations) {
            var updatedStyles = new Set();
            var removedStyles = new Set();
            mutations.forEach(function(m) {
                var target = m.target;
                if (target.isConnected) {
                    if (shouldManageStyle(target)) updatedStyles.add(target);
                    else if (target instanceof HTMLLinkElement && target.disabled) removedStyles.add(target);
                }
            });
            if (updatedStyles.size + removedStyles.size > 0) update({
                updated: Array.from(updatedStyles),
                created: [],
                removed: Array.from(removedStyles),
                moved: []
            });
        }
        function observe(root) {
            if (observedRoots.has(root)) return;
            var treeObserver = createOptimizedTreeObserver(root, {
                onMinorMutations: handleMinorTreeMutations,
                onHugeMutations: handleHugeTreeMutations
            });
            var attrObserver = new MutationObserver(handleAttributeMutations);
            attrObserver.observe(root, {
                attributeFilter: [
                    "rel",
                    "disabled",
                    "media",
                    "href"
                ],
                subtree: true
            });
            observers.push(treeObserver, attrObserver);
            observedRoots.add(root);
        }
        function subscribeForShadowRootChanges(node) {
            var shadowRoot = node.shadowRoot;
            if (shadowRoot == null || observedRoots.has(shadowRoot)) return;
            observe(shadowRoot);
            shadowRootDiscovered(shadowRoot);
        }
        function extendedIterateShadowHosts(node) {
            iterateShadowHosts(node, subscribeForShadowRootChanges);
        }
        observe(document);
        extendedIterateShadowHosts(document.documentElement);
        watchWhenCustomElementsDefined(function(hosts) {
            var newStyles = [];
            hosts.forEach(function(host) {
                return push(newStyles, getManageableStyles(host.shadowRoot));
            });
            update({
                created: newStyles,
                updated: [],
                removed: [],
                moved: []
            });
            hosts.forEach(function(host) {
                var shadowRoot = host.shadowRoot;
                if (shadowRoot == null) return;
                subscribeForShadowRootChanges(host);
                extendedIterateShadowHosts(shadowRoot);
                collectUndefinedElements(shadowRoot);
            });
        });
        document.addEventListener("__darkreader__isDefined", handleIsDefined, {
            passive: true
        });
        collectUndefinedElements(document);
    }
    function resetObservers() {
        observers.forEach(function(o) {
            return o.disconnect();
        });
        observers.splice(0, observers.length);
        observedRoots = new WeakSet();
    }
    function stopWatchingForStyleChanges() {
        resetObservers();
        unsubscribeFromDefineCustomElements();
    }
    var adoptedStyleOverrides = new WeakMap();
    var overrideList = new WeakSet();
    function createAdoptedStyleSheetOverride(node) {
        var cancelAsyncOperations = false;
        function injectSheet(sheet, override) {
            var newSheets = __spreadArray([], __read(node.adoptedStyleSheets), false);
            var sheetIndex = newSheets.indexOf(sheet);
            var existingIndex = newSheets.indexOf(override);
            if (sheetIndex === existingIndex - 1) return;
            if (existingIndex >= 0) newSheets.splice(existingIndex, 1);
            newSheets.splice(sheetIndex + 1, 0, override);
            node.adoptedStyleSheets = newSheets;
        }
        function destroy() {
            cancelAsyncOperations = true;
            var newSheets = __spreadArray([], __read(node.adoptedStyleSheets), false);
            node.adoptedStyleSheets.forEach(function(adoptedStyleSheet) {
                if (overrideList.has(adoptedStyleSheet)) {
                    var existingIndex = newSheets.indexOf(adoptedStyleSheet);
                    if (existingIndex >= 0) newSheets.splice(existingIndex, 1);
                    adoptedStyleOverrides.delete(adoptedStyleSheet);
                    overrideList.delete(adoptedStyleSheet);
                }
            });
            node.adoptedStyleSheets = newSheets;
        }
        function render(theme, ignoreImageAnalysis) {
            node.adoptedStyleSheets.forEach(function(sheet) {
                if (overrideList.has(sheet)) return;
                var rules = sheet.rules;
                var override = new CSSStyleSheet();
                function prepareOverridesSheet() {
                    for(var i = override.cssRules.length - 1; i >= 0; i--)override.deleteRule(i);
                    injectSheet(sheet, override);
                    adoptedStyleOverrides.set(sheet, override);
                    overrideList.add(override);
                    return override;
                }
                var sheetModifier = createStyleSheetModifier();
                sheetModifier.modifySheet({
                    prepareSheet: prepareOverridesSheet,
                    sourceCSSRules: rules,
                    theme: theme,
                    ignoreImageAnalysis: ignoreImageAnalysis,
                    force: false,
                    isAsyncCancelled: function() {
                        return cancelAsyncOperations;
                    }
                });
            });
        }
        return {
            render: render,
            destroy: destroy
        };
    }
    function injectProxy(enableStyleSheetsProxy, enableCustomElementRegistryProxy) {
        document.dispatchEvent(new CustomEvent("__darkreader__inlineScriptsAllowed"));
        var addRuleDescriptor = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, "addRule");
        var insertRuleDescriptor = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, "insertRule");
        var deleteRuleDescriptor = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, "deleteRule");
        var removeRuleDescriptor = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, "removeRule");
        var documentStyleSheetsDescriptor = enableStyleSheetsProxy ? Object.getOwnPropertyDescriptor(Document.prototype, "styleSheets") : null;
        var customElementRegistryDefineDescriptor = enableCustomElementRegistryProxy ? Object.getOwnPropertyDescriptor(CustomElementRegistry.prototype, "define") : null;
        var shouldWrapHTMLElement = [
            "baidu.com",
            "baike.baidu.com",
            "ditu.baidu.com",
            "map.baidu.com",
            "maps.baidu.com",
            "haokan.baidu.com",
            "pan.baidu.com",
            "passport.baidu.com",
            "tieba.baidu.com",
            "www.baidu.com"
        ].includes(location.hostname);
        var getElementsByTagNameDescriptor = shouldWrapHTMLElement ? Object.getOwnPropertyDescriptor(Element.prototype, "getElementsByTagName") : null;
        var shouldProxyChildNodes = location.hostname === "www.vy.no";
        var childNodesDescriptor = shouldProxyChildNodes ? Object.getOwnPropertyDescriptor(Node.prototype, "childNodes") : null;
        var cleanUp = function() {
            Object.defineProperty(CSSStyleSheet.prototype, "addRule", addRuleDescriptor);
            Object.defineProperty(CSSStyleSheet.prototype, "insertRule", insertRuleDescriptor);
            Object.defineProperty(CSSStyleSheet.prototype, "deleteRule", deleteRuleDescriptor);
            Object.defineProperty(CSSStyleSheet.prototype, "removeRule", removeRuleDescriptor);
            document.removeEventListener("__darkreader__cleanUp", cleanUp);
            document.removeEventListener("__darkreader__addUndefinedResolver", addUndefinedResolver);
            if (enableStyleSheetsProxy) Object.defineProperty(Document.prototype, "styleSheets", documentStyleSheetsDescriptor);
            if (enableCustomElementRegistryProxy) Object.defineProperty(CustomElementRegistry.prototype, "define", customElementRegistryDefineDescriptor);
            if (shouldWrapHTMLElement) Object.defineProperty(Element.prototype, "getElementsByTagName", getElementsByTagNameDescriptor);
            if (shouldProxyChildNodes) Object.defineProperty(Node.prototype, "childNodes", childNodesDescriptor);
        };
        var addUndefinedResolverInner = function(tag) {
            customElements.whenDefined(tag).then(function() {
                document.dispatchEvent(new CustomEvent("__darkreader__isDefined", {
                    detail: {
                        tag: tag
                    }
                }));
            });
        };
        var addUndefinedResolver = function(e) {
            return addUndefinedResolverInner(e.detail.tag);
        };
        document.addEventListener("__darkreader__cleanUp", cleanUp, {
            passive: true
        });
        document.addEventListener("__darkreader__addUndefinedResolver", addUndefinedResolver, {
            passive: true
        });
        var updateSheetEvent = new Event("__darkreader__updateSheet");
        function proxyAddRule(selector, style, index) {
            addRuleDescriptor.value.call(this, selector, style, index);
            if (this.ownerNode && !(this.ownerNode.classList && this.ownerNode.classList.contains("darkreader"))) this.ownerNode.dispatchEvent(updateSheetEvent);
            return -1;
        }
        function proxyInsertRule(rule, index) {
            var returnValue = insertRuleDescriptor.value.call(this, rule, index);
            if (this.ownerNode && !(this.ownerNode.classList && this.ownerNode.classList.contains("darkreader"))) this.ownerNode.dispatchEvent(updateSheetEvent);
            return returnValue;
        }
        function proxyDeleteRule(index) {
            deleteRuleDescriptor.value.call(this, index);
            if (this.ownerNode && !(this.ownerNode.classList && this.ownerNode.classList.contains("darkreader"))) this.ownerNode.dispatchEvent(updateSheetEvent);
        }
        function proxyRemoveRule(index) {
            removeRuleDescriptor.value.call(this, index);
            if (this.ownerNode && !(this.ownerNode.classList && this.ownerNode.classList.contains("darkreader"))) this.ownerNode.dispatchEvent(updateSheetEvent);
        }
        function proxyDocumentStyleSheets() {
            var _this = this;
            var getCurrentValue = function() {
                var docSheets = documentStyleSheetsDescriptor.get.call(_this);
                var filteredSheets = __spreadArray([], __read(docSheets), false).filter(function(styleSheet) {
                    return styleSheet.ownerNode && !(styleSheet.ownerNode.classList && styleSheet.ownerNode.classList.contains("darkreader"));
                });
                filteredSheets.item = function(item) {
                    return filteredSheets[item];
                };
                return Object.setPrototypeOf(filteredSheets, StyleSheetList.prototype);
            };
            var elements = getCurrentValue();
            var styleSheetListBehavior = {
                get: function(_, property) {
                    return getCurrentValue()[property];
                }
            };
            elements = new Proxy(elements, styleSheetListBehavior);
            return elements;
        }
        function proxyCustomElementRegistryDefine(name, constructor, options) {
            addUndefinedResolverInner(name);
            customElementRegistryDefineDescriptor.value.call(this, name, constructor, options);
        }
        function proxyGetElementsByTagName(tagName) {
            var _this = this;
            if (tagName !== "style") return getElementsByTagNameDescriptor.value.call(this, tagName);
            var getCurrentElementValue = function() {
                var elements = getElementsByTagNameDescriptor.value.call(_this, tagName);
                return Object.setPrototypeOf(__spreadArray([], __read(elements), false).filter(function(element) {
                    return element && !(element.classList && element.classList.contains("darkreader"));
                }), NodeList.prototype);
            };
            var elements = getCurrentElementValue();
            var nodeListBehavior = {
                get: function(_, property) {
                    return getCurrentElementValue()[Number(property) || property];
                }
            };
            elements = new Proxy(elements, nodeListBehavior);
            return elements;
        }
        function proxyChildNodes() {
            var childNodes = childNodesDescriptor.get.call(this);
            return Object.setPrototypeOf(__spreadArray([], __read(childNodes), false).filter(function(element) {
                return !element.classList || !element.classList.contains("darkreader");
            }), NodeList.prototype);
        }
        Object.defineProperty(CSSStyleSheet.prototype, "addRule", Object.assign({}, addRuleDescriptor, {
            value: proxyAddRule
        }));
        Object.defineProperty(CSSStyleSheet.prototype, "insertRule", Object.assign({}, insertRuleDescriptor, {
            value: proxyInsertRule
        }));
        Object.defineProperty(CSSStyleSheet.prototype, "deleteRule", Object.assign({}, deleteRuleDescriptor, {
            value: proxyDeleteRule
        }));
        Object.defineProperty(CSSStyleSheet.prototype, "removeRule", Object.assign({}, removeRuleDescriptor, {
            value: proxyRemoveRule
        }));
        if (enableStyleSheetsProxy) Object.defineProperty(Document.prototype, "styleSheets", Object.assign({}, documentStyleSheetsDescriptor, {
            get: proxyDocumentStyleSheets
        }));
        if (enableCustomElementRegistryProxy) Object.defineProperty(CustomElementRegistry.prototype, "define", Object.assign({}, customElementRegistryDefineDescriptor, {
            value: proxyCustomElementRegistryDefine
        }));
        if (shouldWrapHTMLElement) Object.defineProperty(Element.prototype, "getElementsByTagName", Object.assign({}, getElementsByTagNameDescriptor, {
            value: proxyGetElementsByTagName
        }));
        if (shouldProxyChildNodes) Object.defineProperty(Node.prototype, "childNodes", Object.assign({}, childNodesDescriptor, {
            get: proxyChildNodes
        }));
    }
    var documentVisibilityListener = null;
    var documentIsVisible_ = !document.hidden;
    var listenerOptions = {
        capture: true,
        passive: true
    };
    function watchForDocumentVisibility() {
        document.addEventListener("visibilitychange", documentVisibilityListener, listenerOptions);
        window.addEventListener("pageshow", documentVisibilityListener, listenerOptions);
        window.addEventListener("focus", documentVisibilityListener, listenerOptions);
    }
    function stopWatchingForDocumentVisibility() {
        document.removeEventListener("visibilitychange", documentVisibilityListener, listenerOptions);
        window.removeEventListener("pageshow", documentVisibilityListener, listenerOptions);
        window.removeEventListener("focus", documentVisibilityListener, listenerOptions);
    }
    function setDocumentVisibilityListener(callback) {
        var alreadyWatching = Boolean(documentVisibilityListener);
        documentVisibilityListener = function() {
            if (!document.hidden) {
                removeDocumentVisibilityListener();
                callback();
                documentIsVisible_ = true;
            }
        };
        if (!alreadyWatching) watchForDocumentVisibility();
    }
    function removeDocumentVisibilityListener() {
        stopWatchingForDocumentVisibility();
        documentVisibilityListener = null;
    }
    function documentIsVisible() {
        return documentIsVisible_;
    }
    var INSTANCE_ID = generateUID();
    var styleManagers = new Map();
    var adoptedStyleManagers = [];
    var filter = null;
    var fixes = null;
    var isIFrame$1 = null;
    var ignoredImageAnalysisSelectors = [];
    var ignoredInlineSelectors = [];
    function createOrUpdateStyle(className, root) {
        if (root === void 0) root = document.head || document;
        var element = root.querySelector(".".concat(className));
        if (!element) {
            element = document.createElement("style");
            element.classList.add("darkreader");
            element.classList.add(className);
            element.media = "screen";
            element.textContent = "";
        }
        return element;
    }
    function createOrUpdateScript(className, root) {
        if (root === void 0) root = document.head || document;
        var element = root.querySelector(".".concat(className));
        if (!element) {
            element = document.createElement("script");
            element.classList.add("darkreader");
            element.classList.add(className);
        }
        return element;
    }
    var nodePositionWatchers = new Map();
    function setupNodePositionWatcher(node, alias) {
        nodePositionWatchers.has(alias) && nodePositionWatchers.get(alias).stop();
        nodePositionWatchers.set(alias, watchForNodePosition(node, "head"));
    }
    function stopStylePositionWatchers() {
        forEach(nodePositionWatchers.values(), function(watcher) {
            return watcher.stop();
        });
        nodePositionWatchers.clear();
    }
    function createStaticStyleOverrides() {
        var fallbackStyle = createOrUpdateStyle("darkreader--fallback", document);
        fallbackStyle.textContent = getModifiedFallbackStyle(filter, {
            strict: true
        });
        document.head.insertBefore(fallbackStyle, document.head.firstChild);
        setupNodePositionWatcher(fallbackStyle, "fallback");
        var userAgentStyle = createOrUpdateStyle("darkreader--user-agent");
        userAgentStyle.textContent = getModifiedUserAgentStyle(filter, isIFrame$1, filter.styleSystemControls);
        document.head.insertBefore(userAgentStyle, fallbackStyle.nextSibling);
        setupNodePositionWatcher(userAgentStyle, "user-agent");
        var textStyle = createOrUpdateStyle("darkreader--text");
        if (filter.useFont || filter.textStroke > 0) textStyle.textContent = createTextStyle(filter);
        else textStyle.textContent = "";
        document.head.insertBefore(textStyle, fallbackStyle.nextSibling);
        setupNodePositionWatcher(textStyle, "text");
        var invertStyle = createOrUpdateStyle("darkreader--invert");
        if (fixes && Array.isArray(fixes.invert) && fixes.invert.length > 0) invertStyle.textContent = [
            "".concat(fixes.invert.join(", "), " {"),
            "    filter: ".concat(getCSSFilterValue(__assign(__assign({}, filter), {
                contrast: filter.mode === 0 ? filter.contrast : clamp(filter.contrast - 10, 0, 100)
            })), " !important;"),
            "}"
        ].join("\n");
        else invertStyle.textContent = "";
        document.head.insertBefore(invertStyle, textStyle.nextSibling);
        setupNodePositionWatcher(invertStyle, "invert");
        var inlineStyle = createOrUpdateStyle("darkreader--inline");
        inlineStyle.textContent = getInlineOverrideStyle();
        document.head.insertBefore(inlineStyle, invertStyle.nextSibling);
        setupNodePositionWatcher(inlineStyle, "inline");
        var overrideStyle = createOrUpdateStyle("darkreader--override");
        overrideStyle.textContent = fixes && fixes.css ? replaceCSSTemplates(fixes.css) : "";
        document.head.appendChild(overrideStyle);
        setupNodePositionWatcher(overrideStyle, "override");
        var variableStyle = createOrUpdateStyle("darkreader--variables");
        var selectionColors = getSelectionColor(filter);
        var _a = filter, darkSchemeBackgroundColor = _a.darkSchemeBackgroundColor, darkSchemeTextColor = _a.darkSchemeTextColor, lightSchemeBackgroundColor = _a.lightSchemeBackgroundColor, lightSchemeTextColor = _a.lightSchemeTextColor, mode = _a.mode;
        var schemeBackgroundColor = mode === 0 ? lightSchemeBackgroundColor : darkSchemeBackgroundColor;
        var schemeTextColor = mode === 0 ? lightSchemeTextColor : darkSchemeTextColor;
        schemeBackgroundColor = modifyBackgroundColor(parseColorWithCache(schemeBackgroundColor), filter);
        schemeTextColor = modifyForegroundColor(parseColorWithCache(schemeTextColor), filter);
        variableStyle.textContent = [
            ":root {",
            "   --darkreader-neutral-background: ".concat(schemeBackgroundColor, ";"),
            "   --darkreader-neutral-text: ".concat(schemeTextColor, ";"),
            "   --darkreader-selection-background: ".concat(selectionColors.backgroundColorSelection, ";"),
            "   --darkreader-selection-text: ".concat(selectionColors.foregroundColorSelection, ";"),
            "}"
        ].join("\n");
        document.head.insertBefore(variableStyle, inlineStyle.nextSibling);
        setupNodePositionWatcher(variableStyle, "variables");
        var rootVarsStyle = createOrUpdateStyle("darkreader--root-vars");
        document.head.insertBefore(rootVarsStyle, variableStyle.nextSibling);
        var enableStyleSheetsProxy = !(fixes && fixes.disableStyleSheetsProxy);
        var enableCustomElementRegistryProxy = !(fixes && fixes.disableCustomElementRegistryProxy);
        var proxyScript = createOrUpdateScript("darkreader--proxy");
        proxyScript.append("(".concat(injectProxy, ")(").concat(enableStyleSheetsProxy, ", ").concat(enableCustomElementRegistryProxy, ")"));
        document.head.insertBefore(proxyScript, rootVarsStyle.nextSibling);
        proxyScript.remove();
    }
    var shadowRootsWithOverrides = new Set();
    function createShadowStaticStyleOverridesInner(root) {
        var inlineStyle = createOrUpdateStyle("darkreader--inline", root);
        inlineStyle.textContent = getInlineOverrideStyle();
        root.insertBefore(inlineStyle, root.firstChild);
        var overrideStyle = createOrUpdateStyle("darkreader--override", root);
        overrideStyle.textContent = fixes && fixes.css ? replaceCSSTemplates(fixes.css) : "";
        root.insertBefore(overrideStyle, inlineStyle.nextSibling);
        var invertStyle = createOrUpdateStyle("darkreader--invert", root);
        if (fixes && Array.isArray(fixes.invert) && fixes.invert.length > 0) invertStyle.textContent = [
            "".concat(fixes.invert.join(", "), " {"),
            "    filter: ".concat(getCSSFilterValue(__assign(__assign({}, filter), {
                contrast: filter.mode === 0 ? filter.contrast : clamp(filter.contrast - 10, 0, 100)
            })), " !important;"),
            "}"
        ].join("\n");
        else invertStyle.textContent = "";
        root.insertBefore(invertStyle, overrideStyle.nextSibling);
        shadowRootsWithOverrides.add(root);
    }
    function delayedCreateShadowStaticStyleOverrides(root) {
        var observer = new MutationObserver(function(mutations, observer) {
            var e_1, _a, e_2, _b;
            observer.disconnect();
            try {
                for(var mutations_1 = __values(mutations), mutations_1_1 = mutations_1.next(); !mutations_1_1.done; mutations_1_1 = mutations_1.next()){
                    var _c = mutations_1_1.value, type = _c.type, removedNodes = _c.removedNodes;
                    if (type === "childList") try {
                        for(var _d = (e_2 = void 0, __values(removedNodes)), _e = _d.next(); !_e.done; _e = _d.next()){
                            var _f = _e.value, nodeName = _f.nodeName, className = _f.className;
                            if (nodeName === "STYLE" && [
                                "darkreader darkreader--inline",
                                "darkreader darkreader--override",
                                "darkreader darkreader--invert"
                            ].includes(className)) {
                                createShadowStaticStyleOverridesInner(root);
                                return;
                            }
                        }
                    } catch (e_2_1) {
                        e_2 = {
                            error: e_2_1
                        };
                    } finally{
                        try {
                            if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                        } finally{
                            if (e_2) throw e_2.error;
                        }
                    }
                }
            } catch (e_1_1) {
                e_1 = {
                    error: e_1_1
                };
            } finally{
                try {
                    if (mutations_1_1 && !mutations_1_1.done && (_a = mutations_1.return)) _a.call(mutations_1);
                } finally{
                    if (e_1) throw e_1.error;
                }
            }
        });
        observer.observe(root, {
            childList: true
        });
    }
    function createShadowStaticStyleOverrides(root) {
        var uninit = root.firstChild === null;
        createShadowStaticStyleOverridesInner(root);
        if (uninit) delayedCreateShadowStaticStyleOverrides(root);
    }
    function replaceCSSTemplates($cssText) {
        return $cssText.replace(/\${(.+?)}/g, function(_, $color) {
            var color = parseColorWithCache($color);
            if (color) return modifyColor(color, filter);
            return $color;
        });
    }
    function cleanFallbackStyle() {
        var fallback = document.querySelector(".darkreader--fallback");
        if (fallback) fallback.textContent = "";
    }
    function createDynamicStyleOverrides() {
        cancelRendering();
        var allStyles = getManageableStyles(document);
        var newManagers = allStyles.filter(function(style) {
            return !styleManagers.has(style);
        }).map(function(style) {
            return createManager(style);
        });
        newManagers.map(function(manager) {
            return manager.details({
                secondRound: false
            });
        }).filter(function(detail) {
            return detail && detail.rules.length > 0;
        }).forEach(function(detail) {
            variablesStore.addRulesForMatching(detail.rules);
        });
        variablesStore.matchVariablesAndDependants();
        variablesStore.setOnRootVariableChange(function() {
            var rootVarsStyle = createOrUpdateStyle("darkreader--root-vars");
            variablesStore.putRootVars(rootVarsStyle, filter);
        });
        var rootVarsStyle = createOrUpdateStyle("darkreader--root-vars");
        variablesStore.putRootVars(rootVarsStyle, filter);
        styleManagers.forEach(function(manager) {
            return manager.render(filter, ignoredImageAnalysisSelectors);
        });
        if (loadingStyles.size === 0) cleanFallbackStyle();
        newManagers.forEach(function(manager) {
            return manager.watch();
        });
        var inlineStyleElements = toArray(document.querySelectorAll(INLINE_STYLE_SELECTOR));
        iterateShadowHosts(document.documentElement, function(host) {
            createShadowStaticStyleOverrides(host.shadowRoot);
            var elements = host.shadowRoot.querySelectorAll(INLINE_STYLE_SELECTOR);
            if (elements.length > 0) push(inlineStyleElements, elements);
        });
        inlineStyleElements.forEach(function(el) {
            return overrideInlineStyle(el, filter, ignoredInlineSelectors, ignoredImageAnalysisSelectors);
        });
        handleAdoptedStyleSheets(document);
    }
    var loadingStylesCounter = 0;
    var loadingStyles = new Set();
    function createManager(element) {
        var loadingStyleId = ++loadingStylesCounter;
        function loadingStart() {
            if (!isDOMReady() || !documentIsVisible()) {
                loadingStyles.add(loadingStyleId);
                logInfo("Current amount of styles loading: ".concat(loadingStyles.size));
                var fallbackStyle = document.querySelector(".darkreader--fallback");
                if (!fallbackStyle.textContent) fallbackStyle.textContent = getModifiedFallbackStyle(filter, {
                    strict: false
                });
            }
        }
        function loadingEnd() {
            loadingStyles.delete(loadingStyleId);
            logInfo("Removed loadingStyle ".concat(loadingStyleId, ", now awaiting: ").concat(loadingStyles.size));
            if (loadingStyles.size === 0 && isDOMReady()) cleanFallbackStyle();
        }
        function update() {
            var details = manager.details({
                secondRound: true
            });
            if (!details) return;
            variablesStore.addRulesForMatching(details.rules);
            variablesStore.matchVariablesAndDependants();
            manager.render(filter, ignoredImageAnalysisSelectors);
        }
        var manager = manageStyle(element, {
            update: update,
            loadingStart: loadingStart,
            loadingEnd: loadingEnd
        });
        styleManagers.set(element, manager);
        return manager;
    }
    function removeManager(element) {
        var manager = styleManagers.get(element);
        if (manager) {
            manager.destroy();
            styleManagers.delete(element);
        }
    }
    var throttledRenderAllStyles = throttle(function(callback) {
        styleManagers.forEach(function(manager) {
            return manager.render(filter, ignoredImageAnalysisSelectors);
        });
        adoptedStyleManagers.forEach(function(manager) {
            return manager.render(filter, ignoredImageAnalysisSelectors);
        });
        callback && callback();
    });
    var cancelRendering = function() {
        throttledRenderAllStyles.cancel();
    };
    function onDOMReady() {
        if (loadingStyles.size === 0) {
            cleanFallbackStyle();
            return;
        }
    }
    function runDynamicStyle() {
        createDynamicStyleOverrides();
        watchForUpdates();
    }
    function createThemeAndWatchForUpdates() {
        createStaticStyleOverrides();
        if (!documentIsVisible() && !filter.immediateModify) setDocumentVisibilityListener(runDynamicStyle);
        else runDynamicStyle();
        changeMetaThemeColorWhenAvailable(filter);
    }
    function handleAdoptedStyleSheets(node) {
        try {
            if (Array.isArray(node.adoptedStyleSheets)) {
                if (node.adoptedStyleSheets.length > 0) {
                    var newManger = createAdoptedStyleSheetOverride(node);
                    adoptedStyleManagers.push(newManger);
                    newManger.render(filter, ignoredImageAnalysisSelectors);
                }
            }
        } catch (err) {}
    }
    function watchForUpdates() {
        var managedStyles = Array.from(styleManagers.keys());
        watchForStyleChanges(managedStyles, function(_a) {
            var created = _a.created, updated = _a.updated, removed = _a.removed, moved = _a.moved;
            var stylesToRemove = removed;
            var stylesToManage = created.concat(updated).concat(moved).filter(function(style) {
                return !styleManagers.has(style);
            });
            var stylesToRestore = moved.filter(function(style) {
                return styleManagers.has(style);
            });
            stylesToRemove.forEach(function(style) {
                return removeManager(style);
            });
            var newManagers = stylesToManage.map(function(style) {
                return createManager(style);
            });
            newManagers.map(function(manager) {
                return manager.details({
                    secondRound: false
                });
            }).filter(function(detail) {
                return detail && detail.rules.length > 0;
            }).forEach(function(detail) {
                variablesStore.addRulesForMatching(detail.rules);
            });
            variablesStore.matchVariablesAndDependants();
            newManagers.forEach(function(manager) {
                return manager.render(filter, ignoredImageAnalysisSelectors);
            });
            newManagers.forEach(function(manager) {
                return manager.watch();
            });
            stylesToRestore.forEach(function(style) {
                return styleManagers.get(style).restore();
            });
        }, function(shadowRoot) {
            createShadowStaticStyleOverrides(shadowRoot);
            handleAdoptedStyleSheets(shadowRoot);
        });
        watchForInlineStyles(function(element) {
            overrideInlineStyle(element, filter, ignoredInlineSelectors, ignoredImageAnalysisSelectors);
            if (element === document.documentElement) {
                var styleAttr = element.getAttribute("style") || "";
                if (styleAttr.includes("--")) {
                    variablesStore.matchVariablesAndDependants();
                    var rootVarsStyle = createOrUpdateStyle("darkreader--root-vars");
                    variablesStore.putRootVars(rootVarsStyle, filter);
                }
            }
        }, function(root) {
            createShadowStaticStyleOverrides(root);
            var inlineStyleElements = root.querySelectorAll(INLINE_STYLE_SELECTOR);
            if (inlineStyleElements.length > 0) forEach(inlineStyleElements, function(el) {
                return overrideInlineStyle(el, filter, ignoredInlineSelectors, ignoredImageAnalysisSelectors);
            });
        });
        addDOMReadyListener(onDOMReady);
    }
    function stopWatchingForUpdates() {
        styleManagers.forEach(function(manager) {
            return manager.pause();
        });
        stopStylePositionWatchers();
        stopWatchingForStyleChanges();
        stopWatchingForInlineStyles();
        removeDOMReadyListener(onDOMReady);
        cleanReadyStateCompleteListeners();
    }
    var metaObserver;
    function addMetaListener() {
        metaObserver = new MutationObserver(function() {
            if (document.querySelector('meta[name="darkreader-lock"]')) {
                metaObserver.disconnect();
                removeDynamicTheme();
            }
        });
        metaObserver.observe(document.head, {
            childList: true,
            subtree: true
        });
    }
    function createDarkReaderInstanceMarker() {
        var metaElement = document.createElement("meta");
        metaElement.name = "darkreader";
        metaElement.content = INSTANCE_ID;
        document.head.appendChild(metaElement);
    }
    function isAnotherDarkReaderInstanceActive() {
        if (document.querySelector('meta[name="darkreader-lock"]')) return true;
        var meta = document.querySelector('meta[name="darkreader"]');
        if (meta) {
            if (meta.content !== INSTANCE_ID) return true;
            return false;
        }
        createDarkReaderInstanceMarker();
        addMetaListener();
        return false;
    }
    function createOrUpdateDynamicThemeInternal(filterConfig, dynamicThemeFixes, iframe) {
        filter = filterConfig;
        fixes = dynamicThemeFixes;
        if (fixes) {
            ignoredImageAnalysisSelectors = Array.isArray(fixes.ignoreImageAnalysis) ? fixes.ignoreImageAnalysis : [];
            ignoredInlineSelectors = Array.isArray(fixes.ignoreInlineStyle) ? fixes.ignoreInlineStyle : [];
        } else {
            ignoredImageAnalysisSelectors = [];
            ignoredInlineSelectors = [];
        }
        if (filter.immediateModify) setIsDOMReady(function() {
            return true;
        });
        isIFrame$1 = iframe;
        if (document.head) {
            if (isAnotherDarkReaderInstanceActive()) {
                removeDynamicTheme();
                return;
            }
            document.documentElement.setAttribute("data-darkreader-mode", "dynamic");
            document.documentElement.setAttribute("data-darkreader-scheme", filter.mode ? "dark" : "dimmed");
            createThemeAndWatchForUpdates();
        } else {
            if (!isFirefox) {
                var fallbackStyle = createOrUpdateStyle("darkreader--fallback");
                document.documentElement.appendChild(fallbackStyle);
                fallbackStyle.textContent = getModifiedFallbackStyle(filter, {
                    strict: true
                });
            }
            var headObserver_1 = new MutationObserver(function() {
                if (document.head) {
                    headObserver_1.disconnect();
                    if (isAnotherDarkReaderInstanceActive()) {
                        removeDynamicTheme();
                        return;
                    }
                    createThemeAndWatchForUpdates();
                }
            });
            headObserver_1.observe(document, {
                childList: true,
                subtree: true
            });
        }
    }
    function removeProxy() {
        document.dispatchEvent(new CustomEvent("__darkreader__cleanUp"));
        removeNode(document.head.querySelector(".darkreader--proxy"));
    }
    function removeDynamicTheme() {
        document.documentElement.removeAttribute("data-darkreader-mode");
        document.documentElement.removeAttribute("data-darkreader-scheme");
        cleanDynamicThemeCache();
        removeNode(document.querySelector(".darkreader--fallback"));
        if (document.head) {
            restoreMetaThemeColor();
            removeNode(document.head.querySelector(".darkreader--user-agent"));
            removeNode(document.head.querySelector(".darkreader--text"));
            removeNode(document.head.querySelector(".darkreader--invert"));
            removeNode(document.head.querySelector(".darkreader--inline"));
            removeNode(document.head.querySelector(".darkreader--override"));
            removeNode(document.head.querySelector(".darkreader--variables"));
            removeNode(document.head.querySelector(".darkreader--root-vars"));
            removeNode(document.head.querySelector('meta[name="darkreader"]'));
            removeProxy();
        }
        shadowRootsWithOverrides.forEach(function(root) {
            removeNode(root.querySelector(".darkreader--inline"));
            removeNode(root.querySelector(".darkreader--override"));
        });
        shadowRootsWithOverrides.clear();
        forEach(styleManagers.keys(), function(el) {
            return removeManager(el);
        });
        loadingStyles.clear();
        cleanLoadingLinks();
        forEach(document.querySelectorAll(".darkreader"), removeNode);
        adoptedStyleManagers.forEach(function(manager) {
            manager.destroy();
        });
        adoptedStyleManagers.splice(0);
        metaObserver && metaObserver.disconnect();
    }
    function cleanDynamicThemeCache() {
        variablesStore.clear();
        parsedURLCache.clear();
        removeDocumentVisibilityListener();
        cancelRendering();
        stopWatchingForUpdates();
        cleanModificationCache();
        clearColorCache();
    }
    var blobRegex = /url\(\"(blob\:.*?)\"\)/g;
    function replaceBlobs(text) {
        return __awaiter(this, void 0, void 0, function() {
            var promises, data;
            return __generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        promises = [];
                        getMatches(blobRegex, text, 1).forEach(function(url) {
                            var promise = loadAsDataURL(url);
                            promises.push(promise);
                        });
                        return [
                            4,
                            Promise.all(promises)
                        ];
                    case 1:
                        data = _a.sent();
                        return [
                            2,
                            text.replace(blobRegex, function() {
                                return 'url("'.concat(data.shift(), '")');
                            })
                        ];
                }
            });
        });
    }
    var banner = '/*\n                        _______\n                       /       \\\n                      .==.    .==.\n                     ((  ))==((  ))\n                    / "=="    "=="\\\n                   /____|| || ||___\\\n       ________     ____    ________  ___    ___\n       |  ___  \\   /    \\   |  ___  \\ |  |  /  /\n       |  |  \\  \\ /  /\\  \\  |  |  \\  \\|  |_/  /\n       |  |   )  /  /__\\  \\ |  |__/  /|  ___  \\\n       |  |__/  /  ______  \\|  ____  \\|  |  \\  \\\n_______|_______/__/ ____ \\__\\__|___\\__\\__|___\\__\\____\n|  ___  \\ |  ____/ /    \\   |  ___  \\ |  ____|  ___  \\\n|  |  \\  \\|  |___ /  /\\  \\  |  |  \\  \\|  |___|  |  \\  \\\n|  |__/  /|  ____/  /__\\  \\ |  |   )  |  ____|  |__/  /\n|  ____  \\|  |__/  ______  \\|  |__/  /|  |___|  ____  \\\n|__|   \\__\\____/__/      \\__\\_______/ |______|__|   \\__\\\n                https://darkreader.org\n*/\n\n/*! Dark reader generated CSS | Licensed under MIT https://github.com/darkreader/darkreader/blob/main/LICENSE */\n';
    function collectCSS() {
        return __awaiter(this, void 0, void 0, function() {
            function addStaticCSS(selector, comment) {
                var staticStyle = document.querySelector(selector);
                if (staticStyle && staticStyle.textContent) {
                    css.push("/* ".concat(comment, " */"));
                    css.push(staticStyle.textContent);
                    css.push("");
                }
            }
            var css, modifiedCSS, formattedCSS, _a, _b;
            return __generator(this, function(_c) {
                switch(_c.label){
                    case 0:
                        css = [
                            banner
                        ];
                        addStaticCSS(".darkreader--fallback", "Fallback Style");
                        addStaticCSS(".darkreader--user-agent", "User-Agent Style");
                        addStaticCSS(".darkreader--text", "Text Style");
                        addStaticCSS(".darkreader--invert", "Invert Style");
                        addStaticCSS(".darkreader--variables", "Variables Style");
                        modifiedCSS = [];
                        document.querySelectorAll(".darkreader--sync").forEach(function(element) {
                            forEach(element.sheet.cssRules, function(rule) {
                                rule && rule.cssText && modifiedCSS.push(rule.cssText);
                            });
                        });
                        if (!modifiedCSS.length) return [
                            3,
                            2
                        ];
                        formattedCSS = formatCSS(modifiedCSS.join("\n"));
                        css.push("/* Modified CSS */");
                        _b = (_a = css).push;
                        return [
                            4,
                            replaceBlobs(formattedCSS)
                        ];
                    case 1:
                        _b.apply(_a, [
                            _c.sent()
                        ]);
                        css.push("");
                        _c.label = 2;
                    case 2:
                        addStaticCSS(".darkreader--override", "Override Style");
                        return [
                            2,
                            css.join("\n")
                        ];
                }
            });
        });
    }
    var isDarkReaderEnabled = false;
    var isIFrame = function() {
        try {
            return window.self !== window.top;
        } catch (err) {
            console.warn(err);
            return true;
        }
    }();
    function enable(themeOptions, fixes) {
        if (themeOptions === void 0) themeOptions = {};
        if (fixes === void 0) fixes = null;
        var theme = __assign(__assign({}, DEFAULT_THEME), themeOptions);
        if (theme.engine !== ThemeEngine.dynamicTheme) throw new Error("Theme engine is not supported.");
        createOrUpdateDynamicThemeInternal(theme, fixes, isIFrame);
        isDarkReaderEnabled = true;
    }
    function isEnabled() {
        return isDarkReaderEnabled;
    }
    function disable() {
        removeDynamicTheme();
        isDarkReaderEnabled = false;
    }
    var darkScheme = matchMedia("(prefers-color-scheme: dark)");
    var store = {
        themeOptions: null,
        fixes: null
    };
    function handleColorScheme() {
        if (darkScheme.matches) enable(store.themeOptions, store.fixes);
        else disable();
    }
    function auto(themeOptions, fixes) {
        if (themeOptions === void 0) themeOptions = {};
        if (fixes === void 0) fixes = null;
        if (themeOptions) {
            store = {
                themeOptions: themeOptions,
                fixes: fixes
            };
            handleColorScheme();
            if (isMatchMediaChangeEventListenerSupported) darkScheme.addEventListener("change", handleColorScheme);
            else darkScheme.addListener(handleColorScheme);
        } else {
            if (isMatchMediaChangeEventListenerSupported) darkScheme.removeEventListener("change", handleColorScheme);
            else darkScheme.removeListener(handleColorScheme);
            disable();
        }
    }
    function exportGeneratedCSS() {
        return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        return [
                            4,
                            collectCSS()
                        ];
                    case 1:
                        return [
                            2,
                            _a.sent()
                        ];
                }
            });
        });
    }
    var setFetchMethod = setFetchMethod$1;
    exports1.auto = auto;
    exports1.disable = disable;
    exports1.enable = enable;
    exports1.exportGeneratedCSS = exportGeneratedCSS;
    exports1.isEnabled = isEnabled;
    exports1.setFetchMethod = setFetchMethod;
    Object.defineProperty(exports1, "__esModule", {
        value: true
    });
});

},{}]},["kaMWP","12Gnz"], "12Gnz", "parcelRequire11c7")

//# sourceMappingURL=index.js.map
