import api from '../../api'
import * as types from '../mutation-types'

// initial state
const state = {
    navmenu: [],
    loaded: false,
}

// getters
const getters = {
    navmenu: state => state.navmenu,
}

// actions
const actions = {
    getAllNavMenu ({ commit }) {
        api.getNavMenu(navmenu => {
        commit(types.STORE_FETCHED_MENU, { navmenu })
        commit(types.MENU_LOADED, true)
        commit(types.INCREMENT_LOADING_PROGRESS)
        })
    }
}

// mutations
const mutations = {
    [types.STORE_FETCHED_MENU] (state, { navmenu }) {
        state.navmenu = navmenu
    },

    [types.MENU_LOADED] (state, val) {
        state.loaded = val
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}