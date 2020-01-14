// 导入自己需要的组件
import { Swipe, SwipeItem, ImagePreview, Field, Uploader, AddressEdit } from 'vant'
const vant = {
  install: function (Vue) {
    Vue.use(Swipe)
      .use(SwipeItem)
      .use(ImagePreview)
      .use(Field)
      .use(Uploader)
      .use(AddressEdit)
  }
}
export default vant
