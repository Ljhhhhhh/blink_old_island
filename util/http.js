import config from '../config.js'
const tips = {
  1: '抱歉，出现一个错误',
  1005: 'appkey无效'
}
class HTTP{
  request(params) {
    if (!params.method) {
      params.method = 'GET'
    }
    wx.request({
      url: config.baseUrl + params.url,
      data: params.data,
      method: params.method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        'appkey': config.APPKEY
      }, // 设置请求的 header
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          params.success && params.success(res.data)
        } else {
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        this._show_error(1)
      },
      complete: function() {
        // complete
      }
    })
  }

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1;
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}

export {HTTP}