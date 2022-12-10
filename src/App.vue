<template>
  <div id="app">
    <div class="play-box">
      <Home />
      <Player />
      <FavoriteList />
    </div>
  </div>
</template>

<script setup>
import Home from '@/views/home/index.vue'
import FavoriteList from '@/views/favorite-list/index.vue'
import Player from '@/components/play/index.vue'
</script>

<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  color: #fff;
  fill: currentColor;
  overflow: hidden;
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 0;
}

#app {
  font-size: 14px;
  width: 100vw;
  height: 100vh;
  /* background: #bbb9b645; */
  /* background: rgba(139, 129, 136, 0.2); */
  /* background: url('https://pic.dmjnb.com/pic/c71c80420ad39ad956a8871b15636d0b?imageMogr2/thumbnail/x380/quality/90!')
    center/cover no-repeat; */
}
.play-box {
  /* background: rgba(21, 21, 21, 0.5); */
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
