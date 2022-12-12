<template>
  <header style="-webkit-app-region: drag">
    <input
      class="input"
      v-model="keyword"
      placeholder="请输入歌名"
      @keyup.enter="search"
    />
    <svg-icon class="search-icon" name="sousuo" @click="search" />
  </header>
  <ul class="music-list" v-if="musicList?.length">
    <li
      class="item"
      v-for="(item, index) of musicList"
      :key="item.id"
      @dblclick="play(item, index)"
    >
      <span class="song-name txt-over">{{ item.name }}</span>
      <span
        class="singer txt-over"
        @click.stop="
          searchSinger(item?.artists?.[0].name || item?.ar?.[0]?.name)
        "
      >
        {{ item?.artists?.[0].name || item?.ar?.[0]?.name }}
      </span>
      <svg-icon
        class="play"
        :name="isPlay(item.id) ? '24gl-pauseCircle' : '24gl-playCircle'"
        @click="play(item, index)"
      />
    </li>
  </ul>
  <div class="reload" v-else @click="reload">重新加载</div>
</template>

<script setup>
import music from '@/hooks/music'
import { debounce } from '@/utils'
import { getNewSong, searchByKeyword } from '@/api'
import bus from '@/utils/bus'

const { playMusic, copyMusicList, isPlay, autoPlay } = music()

const musicList = ref()
const keyword = ref()

onMounted(() => {
  getMusicList()
})

const getMusicList = () => {
  getNewSong().then(res => {
    musicList.value = res.data
  })
}

const play = (item, index) => {
  copyMusicList(musicList.value)
  playMusic(item, index)
}

const searchSinger = name => {
  searchByKeyword(name).then(res => {
    musicList.value = res.result.songs
  })
}

const reload = () => {
  keyword.value = ''
  getMusicList()
}

bus.on('play', () => {
  copyMusicList(musicList.value)
  autoPlay()
})

const search = debounce(() => {
  searchByKeyword(keyword.value).then(res => {
    console.log(res)
    musicList.value = res.result.songs
  })
}, 150)
</script>

<style lang="less" scoped>
header {
  height: 70px;
  display: flex;
  align-items: center;
  margin-left: 42px;
  position: relative;
  padding-top: 20px;
  .input {
    width: 220px;
    height: 27px;
    border-radius: 20px;
    outline: none;
    border: 1px solid rgba(106, 105, 105, 0.246);
    background: rgba(206, 203, 203, 0.266);
    color: #fff;
    text-indent: 20px;
    &::placeholder {
      color: rgba(234, 232, 232, 0.7);
    }
  }
  .search-icon {
    position: absolute;
    left: 200px;
    font-size: 16px;
    color: rgba(239, 238, 238, 0.674);
  }
}

.music-list {
  height: calc(100% - 160px);
  overflow: scroll;
  .item {
    display: flex;
    align-items: center;
    padding: 15px 0;
    color: #fff;
    &:hover {
      background: rgba(163, 161, 161, 0.1);
    }
    .song-name {
      width: 340px;
      padding: 0 50px;
    }
    .singer {
      flex: 1;
      padding: 0 50px;
      cursor: pointer;
    }
    .play {
      font-size: 23px;
      width: 180px;
      cursor: pointer;
    }
  }
}
.reload {
  width: 120px;
  height: 50px;
  color: #fff;
  margin: 20% auto;
  text-align: center;
  line-height: 50px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid rgb(76, 72, 72);
}
</style>
