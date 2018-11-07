import api from '../../api'
import * as types from '../mutation-types'

// initial state
const state = {
    links: [],
    loaded: false,
}

// getters
const getters = {
    getLinks: state => state.links,
}

// actions
const actions = {
    getAllLinks ({ commit }) {
        api.getLinks(links => {
            commit(types.STORE_LINKS, { links })
            commit(types.LINKS_LOADED, true)
            commit(types.INCREMENT_LOADING_PROGRESS)
        })
    }
}

// mutations
const mutations = {
    [types.STORE_LINKS] (state, { links }) {
        state.links = links
    },

    [types.LINKS_LOADED] (state, val) {
        state.loaded = val
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}