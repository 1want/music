/**
 * musicList 正在播放的歌曲列表
 * playCurrent 当前播放歌曲的索引
 * favoriteList 收藏列表
 */

import { reactive, toRefs } from 'vue'
import { getUrl, getLyric } from '@/api'
import analyzeLyrics from '@/utils/lyrics'

const state = reactive({
  playState: false,
  lyric: [],
  url: '',
  playMode: 'normalPlayer',
  musicInfo: {},
  musicList: [],
  favoriteList: JSON.parse(localStorage.getItem('favoriteList')) || [],
  playCurrent: -1
})

function music() {
  const togglePlayState = () => {
    state.playState = !state.playState
  }

  const isPlay = id => state.playState && state.musicInfo.id === id

  const copyMusicList = musicList => {
    state.musicList = [...musicList]
  }

  const changePlayMode = mode => {
    state.playMode = mode
  }

  const addFavorite = item => {
    const index = state.favoriteList.findIndex(music => music.id === item.id)
    index && state.favoriteList.splice(index, 1)
    state.favoriteList.push(item)
    localStorage.setItem('favoriteList', JSON.stringify(state.favoriteList))
  }

  const removeFavorite = item => {
    const index = state.favoriteList.findIndex(music => music.id === item.id)
    state.favoriteList.splice(index, 1)
    localStorage.setItem('favoriteList', JSON.stringify(state.favoriteList))
  }

  const autoPlay = index => {
    // 如果播放到了最后一首，那么就从头开始播放
    if (state.playCurrent + 1 === state.musicList.length) {
      state.playCurrent = -1
    }
    let newIndex
    // 如果index<0，说明播放到了队列头部，那么就从队列尾部开始播放
    if (index < 0) {
      state.playCurrent = state.musicList.length - 1
      newIndex = state.playCurrent
    } else {
      newIndex = index ?? state.playCurrent + 1
    }
    const nextMusic = state.musicList[newIndex]
    playMusic(nextMusic, newIndex)
  }

  const playMusic = (music, index) => {
    const { id } = music
    // 当对同一首歌曲进行点击时只需改变它的播放状态，传递一个反相值即可
    if (state.musicInfo.id === id) {
      togglePlayState()
      return
    }
    document.title = music.name
    state.playCurrent = index
    state.playState = true
    state.musicInfo = music
    getUrl(id).then(res => {
      state.url = res.data[0].url
    })
    getLyric(id).then(res => {
      state.lyric = analyzeLyrics(res.lrc.lyric)
    })
  }

  return {
    ...toRefs(state),
    togglePlayState,
    isPlay,
    copyMusicList,
    changePlayMode,
    addFavorite,
    removeFavorite,
    autoPlay,
    playMusic
  }
}

export default music
