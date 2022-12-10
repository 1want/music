<template>
  <transition name="showFavorite">
    <ul class="favorite" v-show="isShowFavorite">
      <li class="item" v-for="(item, index) of favoriteList" :key="item.id">
        <span class="song-name txt-over">{{ item.name }}</span>
        <span class="singer txt-over">
          {{ item?.artists?.[0].name || item?.ar?.[0]?.name }}
        </span>
        <div class="operate">
          <svg-icon
            :name="isPlay(item.id) ? '24gl-pauseCircle' : '24gl-playCircle'"
            @click="playFavorite(item, index)"
          />
          <svg-icon
            class="delete"
            name="shanchu"
            @click="removeFavorite(item)"
          />
        </div>
      </li>
    </ul>
  </transition>
</template>

<script setup>
import music from '@/hooks/music'
import status from '@/hooks/status'

const { favoriteList, playMusic, removeFavorite, copyMusicList, isPlay } =
  music()
const { isShowFavorite } = status()

const playFavorite = (item, index) => {
  copyMusicList(favoriteList.value)
  playMusic(item, index)
}
</script>

<style lang="less" scoped>
.showFavorite-enter-active {
  animation: enter 0.6s;
}

.showFavorite-leave-to {
  animation: enter 0.6s reverse ease-in;
}

@keyframes enter {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.bg {
  position: absolute;
  z-index: -1;
  bottom: 0;
  left: 0;
  top: 0;
  width: 280px;
  height: 640px;
}

.favorite {
  position: absolute;
  z-index: 99;
  bottom: 0;
  right: 0;
  top: 0;
  width: 280px;
  height: 640px;
  overflow-y: scroll;
  background: rgb(60, 56, 59);
  .item {
    color: #fff;
    padding: 10px;
    display: flex;
    align-items: center;
    .song-name {
      width: 100px;
    }
    .singer {
      flex: 1;
      margin: 0 20px;
    }
    .operate {
      width: 60px;
      font-size: 20px;
      .delete {
        margin-left: 10px;
      }
    }
  }
}
</style>
