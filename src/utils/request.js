import qs from 'qs'

function request(options) {
  const baseURL = import.meta.env.VITE_API
  let url = baseURL + options.url,
    config = null

  if (options.method !== 'post') {
    url += '?' + qs.stringify(options.params)
  } else {
    config = {
      method: 'POST',
      body: JSON.stringify({
        ...options.params
      })
    }
  }

  return new Promise((resolve, reject) => {
    fetch(url, config)
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.code === 200) {
          resolve(res)
        } else {
          reject(res)
        }
      })
  })
}

export default request
