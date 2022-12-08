<template>
  <Transition name="normal">
    <NormalPlayer
      v-show="playMode === 'normalPlayer'"
      :runtime="state.runtime"
    />
  </Transition>

  <Transition name="detail">
    <DetailPlayer
      v-show="playMode === 'detailPlayer'"
      :playIndex="state.playIndex"
    />
  </Transition>

  <audio
    :src="url"
    @timeupdate="timeupdate"
    @ended="ended"
    autoplay
    ref="audio"
  ></audio>
</template>

<script setup>
import NormalPlayer from './normal-player.vue'
import DetailPlayer from './detail-player.vue'
import music from '@/hooks/music'
import { throttle } from '@/utils'

const { playState, playMode, url, lyric, autoPlay } = music()

const audio = ref()
const state = reactive({
  runtime: '',
  playIndex: ''
})

const timeupdate = throttle(time => {
  let currentTime = Math.ceil(time.target.currentTime)
  state.runtime = currentTime / time.target.duration
  lyric.value.find((item, index) => {
    if (item.time === currentTime) {
      state.playIndex = index
    }
  })
}, 50)

const ended = () => {
  autoPlay()
  state.playIndex = 0
}

// 监听歌曲播放状态
watch(playState, state => {
  if (state === false) {
    audio.value.pause()
  } else {
    audio.value.play()
  }
})
</script>

<style lang="less" scoped>
.detail-enter-active {
  animation: enter 0.7s;
}

.detail-leave-to {
  animation: leave 0.7s;
}

.normal-enter-active {
  animation: normalEnter 0.5s linear;
}

@keyframes normalEnter {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes enter {
  from {
    transform: translateY(640px);
  }

  to {
    transform: translateY(0px);
  }
}

@keyframes leave {
  from {
    transform: translateY(0px);
  }

  to {
    transform: translateY(640px);
  }
}
</style>
