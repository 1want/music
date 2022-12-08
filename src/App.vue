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
  /* margin-top: 20px; */
  /* background: #cdcbca23; */
  /* background: rgba(112, 106, 104, 0.137); */
  /* background: #93919021; */
}
.play-box {
  /* border: 1px solid rgba(53, 51, 51, 0.3); */
  /* overflow: hidden; */
  padding-top: 20px;
  width: 880px;
  height: 620px;
  position: absolute;
}
</style>
