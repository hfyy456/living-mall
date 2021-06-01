
class Zfetch {
  public baseUrl: string
  public configs: any

  constructor(baseUrl: string, configs?: any) {
    this.baseUrl = baseUrl
    this.configs = configs
  }
  async post(api: any, params: any) {
    let url = this.baseUrl + api
    let data = JSON.stringify(params)
    console.log(data)
    return fetch(url, {
      body: data,
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
    }).then(respose => respose.json())
  }
  async get(api: any, params: any) {
    let url = this.baseUrl + api
    if (params) {
      let paramsArray: Array<any> = [];
      //拼接参数  
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }
    return fetch(url, {
      method: "GET"
    })
  }
}
//const baseUrl = 'https://www.hfsblog.com/api/'

const baseUrl = 'http://192.168.240.7:5000/api/'
const service_ad: any = new Zfetch(baseUrl)
export default service_ad