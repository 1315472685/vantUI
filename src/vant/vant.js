// 导入自己需要的组件
import { Swipe, SwipeItem, ImagePreview } from 'vant'
const vant = {
  install: function (Vue) {
    Vue.use(Swipe)
      .use(SwipeItem)
      .use(ImagePreview)
  }
}
export default vant
