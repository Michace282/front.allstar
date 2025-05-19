import VuexORM, {Model} from '@vuex-orm/core'
import { Database } from '@vuex-orm/core'

const database = new Database()

const requireComponent = require.context(
    '@/models',
    true,
    /\.(js)$/
)

requireComponent.keys().forEach((fileName) => {
    const model = requireComponent(fileName)

    if (model.default && model.default.prototype instanceof Model) {
        if (model.VuexModule) {
            database.register(model.default, model.VuexModule)
        } else {
            database.register(model.default)
        }
    }
})

export const state = () => ({
    domain: '',
});

export const mutations = {
    setDomain(state, domain) {
        state.domain = domain;
    },
};

export const actions = {
    nuxtServerInit(store, context) {
        store.commit('setDomain', context.req.headers.host);
    },
};

export const getters = {
    domain: (state) => state.domain,
};

export const plugins = [
    VuexORM.install(database)
]
