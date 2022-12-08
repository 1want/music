<template>
  <div class="custom-play">
    <div class="progress-bar" @click="changeTime">
      <div
        class="bar"
        :style="{
          width: `${runtime * 100}%`,
          height: '4px',
          background: '#bfbfbf'
        }"
      ></div>
    </div>
    <div class="music-info">
      <div class="music-info-content" v-if="playCurrent !== -1">
        <img
          class="img"
          :src="musicInfo?.al?.picUrl || musicInfo?.album?.picUrl"
          @click="changePlayMode('detailPlayer')"
        />
        <notice-bar ref="notice">
          <span class="songs">{{ musicInfo.name }}</span>
          <span class="singer">
            {{ musicInfo?.artists?.[0].name || musicInfo?.ar?.[0]?.name }}
          </span>
        </notice-bar>
      </div>
      <div class="control">
        <svg-icon name="tianjia" @click="collect(musicInfo)" />
        <svg-icon
          name="diyiyeshouyeshangyishou"
          @click="autoPlay(playCurrent - 1)"
        />
        <svg-icon
          class="play"
          :name="playState ? '24gl-pauseCircle' : '24gl-playCircle'"
          @click="play"
        />
        <svg-icon
          name="zuihouyiyemoyexiayishou"
          @click="autoPlay(playCurrent + 1)"
        />
        <svg-icon
          class="favorite"
          name="24gl-playlistHeart3"
          @click="toggleShowFavorite"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import NoticeBar from '@/components/notice-bar/index.vue'
import music from '@/hooks/music'
import status from '@/hooks/status'
import bus from '@/utils/bus'
import { message } from '@/plugin/message'

const props = defineProps(['runtime'])
const {
  playState,
  togglePlayState,
  musicInfo,
  changePlayMode,
  addFavorite,
  playCurrent,
  autoPlay
} = music()
const { toggleShowFavorite } = status()

const notice = ref()

const play = () => {
  // 当前索引不等于-1说明已经有歌曲在播放，点击时只需切换播放状态
  if (playCurrent.value !== -1) {
    togglePlayState()
  } else {
    bus.emit('play')
  }
}

const collect = item => {
  addFavorite(item)
  message({ msg: '收藏成功' })
}

// watch(
//   () => musicInfo.value,
//   (newV, oldV) => {
//     if (newV != oldV) {
//       notice.value.refresh()
//     }
//   }
// )
</script>

<style lang="less" scoped>
.custom-play {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90px;
  bottom: 0;
  .progress-bar {
    height: 4px;
    width: 100%;
    background: rgba(211, 209, 209, 0.301);
    .bar {
      width: 1px;
    }
  }
  .music-info {
    margin-top: 25px;
    display: flex;
    width: 100%;
  }
  .music-info-content {
    display: flex;
    align-items: center;
    position: absolute;
    width: 260px;
    color: rgba(224, 220, 220, 0.856);
    .img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      cursor: pointer;
      margin: 0 20px;
    }
    .no-img {
      background: red;
    }
    .singer {
      margin-left: 20px;
    }
  }
  .control {
    margin: 0 auto;
    display: flex;
    align-items: center;
    .icon {
      cursor: pointer;
      font-size: 32px;
      color: rgba(224, 220, 220, 0.9);
      margin: 0 12px;
    }
    .add {
      font-size: 25px;
    }
    .play {
      font-size: 42px;
    }
    .favorite {
      font-size: 20px;
    }
  }
}
</style>
