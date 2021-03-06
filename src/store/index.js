import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'
import * as actions from './actions'
import * as getters from './getters'
import hub from './modules/hub'
import user from './modules/user'
import post from './modules/post'
import page from './modules/page'
import info from './modules/info'
import categories from './modules/categories'
import navmenu from './modules/navmenu'
import widgets from './modules/widgets'
import link from './modules/links'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

let localStorage = createPersist({
    namespace: 'YOUR_APP_NAMESPACE',
    initialState: {},
    expires: 1.21e+9 // Two Weeks
})

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    hub,
    user,
    post,
    page,
    categories,
    info,
    navmenu,
    widgets,
    link,
  },
  strict: debug,
  plugins: [localStorage]
})
