import api from '../../api'
import * as types from '../mutation-types'

// initial state
const state = {
    info: [],
    loaded: false,
}
  
// getters
const getters = {
    info: state => state.info,
    infoLoaded: state => state.loaded
}

// actions
const actions = {
    getAllInfo ({ commit }) {
      api.getInfo(info => {
        commit(types.STORE_FETCHED_INFO, { info })
        commit(types.INFO_LOADED, true)
        commit(types.INCREMENT_LOADING_PROGRESS)
      })
    }
}
  
// mutations
const mutations = {
    [types.STORE_FETCHED_INFO] (state, { info }) {
        state.info = info
    },
  
    [types.INFO_LOADED] (state, bool) {
      state.loaded = bool
    }
  }
  

export default {
    state,
    getters,
    actions,
    mutations
}
  