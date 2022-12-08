<template>
  <transition name="showFavorite">
    <div class="favorite" v-show="isShowFavorite">
      <div class="bg"></div>
      <ul>
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
    </div>
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

/* transform会与backdrop-filter导致未知问题，所以这里用margin  */
@keyframes enter {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateY(0);
  }
}

.bg {
  position: absolute;
  z-index: -1;
  bottom: 0;
  right: 0;
  top: 0;
  width: 280px;
  height: 640px;
  background: url('@/assets/images/bg.jpg') center/cover no-repeat;
}

.favorite {
  position: absolute;
  z-index: 99;
  bottom: 0;
  right: 0;
  top: 0;
  ul {
    width: 280px;
    height: 640px;
    background: rgba(114, 111, 104, 0.3);
    backdrop-filter: blur(20px);
    overflow-y: scroll;
  }
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
