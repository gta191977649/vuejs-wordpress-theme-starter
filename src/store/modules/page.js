import api from '../../api'
import * as types from '../mutation-types'
import { isNumber } from 'util';

// initial state
const state = {
  all: [],
  friendlyLinkPage: null,
  loaded: false,
  page: null
}

// getters
const getters = {
  allPages: state => state.all,
  allPagesLoaded: state => state.loaded,
  page: state => (id) => {
    let field = typeof id === 'number' ? 'id' : 'slug';
    let page = state.all.filter(page => page[field] === id)
    return !_.isNull(_.first(page)) ? _.first(page) : false
  },
  pageContent: state => (id) => {
    let field = typeof id === 'number' ? 'id' : 'slug';
    let page = state.all.filter(page => page[field] === id)
    return !_.isNull(_.first(page).content.rendered) ? _.first(page).content.rendered : false
  },
  somePages: state => (limit) => {
    if (state.all.length < 1) { return false }
    let all = [...state.all]
    return all.splice(0, Math.min(limit, state.all.length))
  },
  friendlyLinkPage: state => state.friendlyLinkPage
}

// actions
const actions = {
  getAllPages ({ commit }) {
    commit(types.PAGES_LOADED, false)
    api.getPages(pages => {
      commit(types.STORE_FETCHED_PAGES, { pages })
      commit(types.PAGES_LOADED, true)
      commit(types.INCREMENT_LOADING_PROGRESS)
    })
  }
}

// mutations
const mutations = {
  [types.STORE_FETCHED_PAGES] (state, { pages }) {
    state.all = pages
    //查找友情链接
    let targetId = null
    for(let i = 0; i < pages.length; i++) {
        if(pages[i]["template"] == window.SETTINGS.FRIENDLY_PAGE) {
            targetId = i
            break;
        }
    }
    if(targetId !== null) {
      state.friendlyLinkPage = pages[targetId]
    }
  },

  [types.PAGES_LOADED] (state, val) {
    state.loaded = val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
