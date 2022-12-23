<template>
  <div class="detail-play">
    <svg-icon
      class="back"
      name="shanglajiantou"
      @click="changePlayMode('normalPlayer')"
    />
    <img class="hover-img" :src="musicInfo?.img" />

    <div class="lyric">
      <div class="info">
        <p class="songs">{{ musicInfo.name }}</p>
        <p class="singer">{{ musicInfo.singer }}</p>
      </div>

      <div class="box">
        <ul :style="{ transform: `translateY(${line}px)` }">
          <li
            v-for="(item, index) of lyric"
            :class="playIndex === index && 'current-lyr'"
          >
            {{ item.txt }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import music from '@/hooks/music'

const props = defineProps(['playIndex'])
const line = ref(0)

const { lyric, musicInfo, changePlayMode } = music()

watch(
  () => props.playIndex,
  newV => {
    let l = newV - 3
    if (l > 0 && l < lyric.value.length - 6) {
      line.value = -l * 55
    }
  }
)
</script>

<style lang="less" scoped>
.detail-play {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(20, 20, 20);
  z-index: 100;

  .back {
    position: absolute;
    top: 3px;
    left: 80px;
    cursor: pointer;
    font-size: 24px;
  }
  .hover-img {
    position: absolute;
    z-index: -1;
    opacity: 0.5;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .lyric {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .box {
    height: 420px;
    overflow: hidden;
  }
  .info {
    text-align: center;
    .songs {
      font-family: cursive;
      font-size: 26px;
      color: #fff;
    }
    .singer {
      font-family: cursive;
      margin: 10px 0;
      color: rgb(221, 219, 219);
    }
  }
  ul {
    transition: all 1.2s;
    color: rgba(245, 244, 244, 0.794);
    text-align: center;
    margin-top: 15px;
    width: 480px;
    display: flex;
    flex-direction: column;
    li {
      font-size: 15px;
      margin: 0 auto;
      line-height: 55px;
      cursor: pointer;
    }
  }
  .current-lyr {
    color: #79d979;
  }
}
</style>
