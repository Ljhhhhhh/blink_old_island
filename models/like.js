import {HTTP} from '../util/http.js'

class LikeModel extends HTTP {
  like(behavior, artId, category) {
    let url = behavior === 'like' ? 'like' : 'like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artId,
        type: category
      }
    })
  }
 
  getClassicLikeStatus(artId, category, sCallback) {
    this.request({
      url: 'classic/' + category + '/' + artId + '/favor',
      success: sCallback
    })
  }
}

export {LikeModel}