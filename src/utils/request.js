import axios from 'axios'

function request(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API,
      timeout: 10000
    })

    instance(options)
      .then(
        res => {
          if (res.data.code === 200) {
            resolve(res.data)
          }
        },
        err => {
          reject(err)
        }
      )
      .catch(err => {
        console.log(err)
      })
  })
}

export default request
