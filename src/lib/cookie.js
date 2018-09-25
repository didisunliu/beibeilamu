let $cookie = {
  set: function (name, value, options) {
    options = options || {}
    if (value === null) {
      value = ''
      options.expires = -1
    }
    let expires = ''
    if (options.expires && (typeof options.expires === 'number' || options.expires.toUTCString())) {
      let date
      if (typeof options.expires === 'number') {
        date = new Date()
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000))
      } else {
        date = options.expires
      }
      expires = '; expires=' + date.toUTCString()
    }
    let path = options.path ? '; path=' + options.path : ''
    let domain = options.domain ? '; domain=' + options.domain : ''
    let secure = options.secure ? '; secure' : ''
    window.document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('')
  },

  get: function (name) {
    let search, end
    search = name + '='
    let offset = document.cookie.indexOf(search)
    if (offset !== -1) {
      offset += search.length
      end = document.cookie.indexOf(';', offset)
      if (end === -1)
        end = document.cookie.length
      return decodeURIComponent(document.cookie.substring(offset, end))
    }
    return ''
  },

  remove: function (name, options) {
    options && (options.expires = -1)
    this.set(name, null, options)
  }
}

const cookieInstall = function (Vue) {
  Vue.prototype.$cookie = $cookie
}

export {
  cookieInstall,
  $cookie
}

