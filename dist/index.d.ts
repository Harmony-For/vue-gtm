import type { GtmSupportOptions } from '@gtm-support/core';
import { GtmSupport as GtmPlugin } from '@gtm-support/core';
import type { PluginObject } from 'vue';
import type Router from 'vue-router';
import type { Route } from 'vue-router';
/**
 * Options passed to the plugin.
 */
export interface VueGtmUseOptions extends GtmSupportOptions {
    /**
     * Pass the router instance to automatically sync with router.
     */
    vueRouter?: Router;
    /**
     * Derive additional event data after navigation.
     */
    vueRouterAdditionalEventData?: (to: Route, from: Route) => Record<string, any> | Promise<Record<string, any>>;
    /**
     * Don't trigger events for specified router names.
     */
    ignoredViews?: string[] | ((to: Route, from: Route) => boolean);
    /**
     * Whether or not call `trackView` in `Vue.nextTick`.
     */
    trackOnNextTick?: boolean;
}
declare module 'vue/types/vue' {
    interface Vue {
        /**
         * The Vue GTM Plugin instance.
         */
        $gtm: GtmPlugin;
    }
    interface VueConstructor<V extends Vue = Vue> {
        /**
         * The Vue GTM Plugin instance.
         */
        gtm: GtmPlugin;
    }
}
/**
 * Vue GTM Plugin.
 */
export type VueGtmPlugin = PluginObject<VueGtmUseOptions>;
declare const _default: VueGtmPlugin;
export { assertIsGtmId, GtmSupport, hasScript, loadScript, } from '@gtm-support/core';
export type { DataLayerObject, GtmIdContainer, GtmQueryParams, GtmSupportOptions, LoadScriptOptions, TrackEventOptions, } from '@gtm-support/core';
export { GtmPlugin };
export default _default;
/**
 * Returns GTM plugin instance to be used via Composition API inside setup method.
 *
 * @returns The Vue GTM instance if the it was installed, otherwise `undefined`.
 */
export declare function useGtm(): GtmPlugin | undefined;
