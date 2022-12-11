import request from '@/utils/request'

export function getNewSong(type = 96, limit = 16) {
  return request({
    url: 'top/song',
    params: {
      type,
      limit
    }
  })
}

// 获取url
export function getUrl(id) {
  return request({
    url: 'song/url',
    params: {
      id
    }
  })
}

// 获取歌词
export function getLyric(id) {
  return request({
    url: 'lyric',
    params: {
      id
    }
  })
}

// 根据关键字搜索音乐
export function searchByKeyword(keywords, offset = 0, type = 1, limit = 15) {
  return request({
    url: 'cloudsearch',
    params: {
      keywords,
      offset,
      type,
      limit
    }
  })
}
