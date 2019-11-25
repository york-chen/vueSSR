import Vue from 'vue';
import App from '@/App.vue';
import {
    createRouter
} from '@/routes'
import {
    createStore
} from '@/store'
import preLoadData from '@/mixins/preLoadData'

Vue.mixin(preLoadData);
export function createApp() {
    const router = createRouter();
    const store = createStore();
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });
    return {
        app,
        router,
        store
    };
}