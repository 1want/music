import { reactive, toRefs } from 'vue'

const state = reactive({
  isShowFavorite: false
})

function status() {
  const toggleShowFavorite = () => {
    state.isShowFavorite = !state.isShowFavorite
  }

  return {
    ...toRefs(state),
    toggleShowFavorite
  }
}

export default status
