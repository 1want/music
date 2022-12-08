<template>
  <header>
    <input
      class="input"
      v-model="keyword"
      placeholder="请输入歌名"
      @keyup.enter="search"
    />
    <svg-icon class="search-icon" name="sousuo" @click="search" />
  </header>
  <ul class="music-list">
    <li
      class="list-item"
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
      <div class="operate">
        <svg-icon
          :name="isPlay(item.id) ? '24gl-pauseCircle' : '24gl-playCircle'"
          @click="play(item, index)"
        />
      </div>
    </li>
  </ul>
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

bus.on('play', () => {
  copyMusicList(musicList.value)
  autoPlay()
})

const search = debounce(() => {
  searchByKeyword(keyword.value).then(res => {
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
  .list-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    color: #fff;
    .song-name {
      width: 340px;
      padding: 0 50px;
    }
    .singer {
      flex: 1;
      padding: 0 50px;
      cursor: pointer;
    }
    .operate {
      font-size: 26px;
      width: 180px;
      cursor: pointer;
      .like {
        margin-left: 20px !important;
      }
    }
    &:hover {
      background: rgba(163, 161, 161, 0.1);
    }
  }
}
</style>
