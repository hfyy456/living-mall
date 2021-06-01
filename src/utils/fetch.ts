
class Xfetch {
  public baseUrl: string
  public configs: any

  constructor(baseUrl: string, configs?: any) {
    this.baseUrl = baseUrl
    this.configs = configs
  }
  async post(api: any, params: any) {
    let url = this.baseUrl + api
    let data = JSON.stringify(params)
    console.log(typeof data)
    const token = localStorage.getItem('token')
    var headers
    if (token) {
      headers = {
        'content-type': 'application/json',
        'Authorization': token,
      }
    }
    else {
      headers = {
        'content-type': 'application/json',
      }
    }
    return fetch(url, {
      body: data,
      method: "POST",
      headers: headers
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

const baseUrl = 'http://192.168.240.7:10086/api/'
const service: any = new Xfetch(baseUrl)
export default service