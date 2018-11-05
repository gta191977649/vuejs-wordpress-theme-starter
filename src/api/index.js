export default {
  getWidgets(cb) {
    console.log( window.SETTINGS.WIDGET_MENU_NAME)
    axios.get('wp-json/wp-rest-api-sidebars/v1/sidebars/main')
    .then(response => {
      cb(response.data.widgets)
    })
    .catch(err => {
      cb(err)
    })
    
  },
  getNavMenu(cb) {
    axios.get('/wp-json/menus/v1/menus/'+window.SETTINGS.NAV_MENU_NAME)
    .then(response => {
      cb(response.data.items)
    })
    .catch(e => {
      cb(e)
    })
  },
  getInfo(cb) {
    axios.get("/wp-json")
      .then(response => {
        cb(response.data)
      })
      .catch(e => {
        cb(e)
      })
  },
  getCategories (cb) {
    
    axios.get(window.SETTINGS.API_BASE_PATH + 'categories?sort=name&hide_empty=true&per_page=50')
      .then(response => {
        cb(response.data.filter(c => c.name !== "Uncategorized"))
      })
      .catch(e => {
        cb(e)
      })
  },

  getPages (cb) {
    axios.get(window.SETTINGS.API_BASE_PATH + 'pages?per_page=10')
      .then(response => {
        cb(response.data)
      })
      .catch(e => {
        cb(e)
      })
  },

  getPage (id, cb) {
    if (_.isNull(id) || !_.isNumber(id)) return false
    axios.get(window.SETTINGS.API_BASE_PATH + 'pages/'+id)
      .then(response => {
        cb(response.data)
      })
      .catch(e => {
        cb(e)
      })
  },

  getPosts (limit, cb) {
    if (_.isEmpty(limit)) { let limit = 5 }
    
    axios.get(window.SETTINGS.API_BASE_PATH + 'posts?_embed&per_page='+limit)
      .then(response => {
        cb(response.data)
      })
      .catch(e => {
        cb(e)
      })
  },
}
