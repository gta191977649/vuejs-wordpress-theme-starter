import api from '../../api'
import * as types from '../mutation-types'

// initial state
const state = {
    widgets: [],
    loaded: false,
}

// getters
const getters = {
    allWidgets: state => state.widgets,
    widgetsLoaded: state => state.loaded,
}

// actions
const actions = {
    getAllWidgets ({ commit }) {
            api.getWidgets(widgets => {
            commit(types.STORE_WIDGET_MENU, { widgets })
            commit(types.WIDGET_LOADED, true)
            commit(types.INCREMENT_LOADING_PROGRESS)
        })
    }
}

// mutations
const mutations = {
    [types.STORE_WIDGET_MENU] (state, { widgets }) {
        state.widgets = widgets
    },

    [types.WIDGET_LOADED] (state, val) {
        state.loaded = val
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}