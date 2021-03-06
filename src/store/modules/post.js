import api from '../../api'
import * as types from '../mutation-types'

// initial state
const state = {
  recent: [],
  totalPage: null,
  loaded: false
}

// getters
const getters = {
  recentPosts: state => {
    return state.recent
  },
  totalPostPage: state => {
    return state.totalPage
  },
  recentPostsLoaded: state => state.loaded
}

// actions
const actions = {
  getPosts ({ commit }, { page }) {
    commit(types.POSTS_LOADED, false)
    api.getPosts(page, posts => {
      commit(types.STORE_FETCHED_POSTS, { posts })
      commit(types.POSTS_LOADED, true)
      commit(types.INCREMENT_LOADING_PROGRESS)
    })
  }
}

// mutations
const mutations = {
  [types.STORE_FETCHED_POSTS] (state, { posts }) {
    state.recent = posts.data
    state.totalPage = posts.headers["x-wp-totalpages"]
  },

  [types.POSTS_LOADED] (state, val) {
    state.loaded = val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
