import {HTTP} from '../util/http'
class ClassicModel extends HTTP{
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (data) => {
        // 如果不用箭头函数，this将指代不正确
        sCallback(data)
        this._setLatestIndex(data.index)
        let key = this._getKey(data.index)
        wx.setStorageSync(key, data)
      }
    })
  }

  getClassic(index, type, sCallback) {
    let key = type === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: `classic/${index}/${type}`,
        success: res => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    } else {
      sCallback(classic)
    }
  }

  isFirst(index) {
    return index === 1
  }

  ifLatest(index) {
    let latest = this._getLatestIndex()
    return index === latest
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index) {
    let key = 'classic-' + index
    return key
  }

} 

export {ClassicModel}