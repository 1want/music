<template>
  <div class="notice-wrapper">
    <div class="content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const content = ref()

onMounted(() => {
  const style = document.styleSheets[2]
  let width = content.value.scrollWidth
  // if (style.rules.length > 1) {
  //   style.deleteRule(2)
  // }

  // style.insertRule(
  //   `@keyframes run {0%{ transform: translateX(0)} 100%{transform: translateX(-${
  //     width + 16
  //   }px)}}`
  // )
})

const refresh = async () => {}

defineExpose({
  refresh
})
</script>

<style lang="less">
.notice-wrapper {
  overflow: hidden;
  width: 150px;
  .content {
    white-space: nowrap;
    animation: run 8s linear infinite both;
    text-align: right;
    padding-left: 100%;
  }
}

@keyframes run {
  0 {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-150px);
  }
}
</style>
