"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGtm = exports.GtmPlugin = exports.loadScript = exports.hasScript = exports.GtmSupport = exports.assertIsGtmId = void 0;
const core_1 = require("@gtm-support/core");
Object.defineProperty(exports, "GtmPlugin", { enumerable: true, get: function () { return core_1.GtmSupport; } });
let gtmPlugin;
/**
 * Installation procedure.
 *
 * @param Vue The Vue instance.
 * @param options Configuration options.
 */
function install(Vue, options = { id: '' }) {
    // Apply default configuration
    options = { trackOnNextTick: false, ...options };
    // Add to vue prototype and also from globals
    gtmPlugin = new core_1.GtmSupport(options);
    Vue.prototype.$gtm = Vue.gtm = gtmPlugin;
    // Check if plugin is running in a real browser or e.g. in SSG mode
    if (gtmPlugin.isInBrowserContext()) {
        // Handle vue-router if defined
        if (options.vueRouter) {
            initVueRouterGuard(Vue, options.vueRouter, options.ignoredViews, options.trackOnNextTick);
        }
        // Load GTM script when enabled
        if (gtmPlugin.options.enabled && gtmPlugin.options.loadScript) {
            if (Array.isArray(options.id)) {
                options.id.forEach((id) => {
                    if (typeof id === 'string') {
                        (0, core_1.loadScript)(id, options);
                    }
                    else {
                        const newConf = {
                            ...options,
                        };
                        if (id.queryParams != null) {
                            newConf.queryParams = {
                                ...newConf.queryParams,
                                ...id.queryParams,
                            };
                        }
                        (0, core_1.loadScript)(id.id, newConf);
                    }
                });
            }
            else {
                (0, core_1.loadScript)(options.id, options);
            }
        }
    }
}
/**
 * Initialize the router guard.
 *
 * @param Vue The Vue instance.
 * @param vueRouter The Vue router instance to attach the guard.
 * @param ignoredViews An array of route name that will be ignored.
 * @param trackOnNextTick Whether or not to call `trackView` in `Vue.nextTick`.
 * @param deriveAdditionalEventData Callback to derive additional event data.
 */
function initVueRouterGuard(Vue, vueRouter, ignoredViews = [], trackOnNextTick, deriveAdditionalEventData = () => ({})) {
    if (!vueRouter) {
        console.warn("[VueGtm]: You tried to register 'vueRouter' for vue-gtm, but 'vue-router' was not found.");
        return;
    }
    vueRouter.afterEach(async (to, from) => {
        var _a, _b;
        // Ignore some routes
        if (typeof to.name !== 'string' ||
            (Array.isArray(ignoredViews) && ignoredViews.includes(to.name)) ||
            (typeof ignoredViews === 'function' && ignoredViews(to, from))) {
            return;
        }
        // Dispatch vue event using meta gtm value if defined otherwise fallback to route name
        const name = to.meta && typeof to.meta.gtm === 'string' && !!to.meta.gtm
            ? to.meta.gtm
            : to.name;
        const additionalEventData = {
            ...(await deriveAdditionalEventData(to, from)),
            ...(_a = to.meta) === null || _a === void 0 ? void 0 : _a.gtmAdditionalEventData,
        };
        const baseUrl = (_b = vueRouter.options.base) !== null && _b !== void 0 ? _b : '';
        let fullUrl = baseUrl;
        if (!fullUrl.endsWith('/')) {
            fullUrl += '/';
        }
        fullUrl += to.fullPath.startsWith('/')
            ? to.fullPath.substring(1)
            : to.fullPath;
        if (trackOnNextTick) {
            Vue.nextTick(() => {
                gtmPlugin === null || gtmPlugin === void 0 ? void 0 : gtmPlugin.trackView(name, fullUrl, additionalEventData);
            });
        }
        else {
            gtmPlugin === null || gtmPlugin === void 0 ? void 0 : gtmPlugin.trackView(name, fullUrl, additionalEventData);
        }
    });
}
const _default = { install };
var core_2 = require("@gtm-support/core");
Object.defineProperty(exports, "assertIsGtmId", { enumerable: true, get: function () { return core_2.assertIsGtmId; } });
Object.defineProperty(exports, "GtmSupport", { enumerable: true, get: function () { return core_2.GtmSupport; } });
Object.defineProperty(exports, "hasScript", { enumerable: true, get: function () { return core_2.hasScript; } });
Object.defineProperty(exports, "loadScript", { enumerable: true, get: function () { return core_2.loadScript; } });
exports.default = _default;
/**
 * Returns GTM plugin instance to be used via Composition API inside setup method.
 *
 * @returns The Vue GTM instance if the it was installed, otherwise `undefined`.
 */
function useGtm() {
    return gtmPlugin;
}
exports.useGtm = useGtm;
