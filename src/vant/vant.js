// 导入自己需要的组件
import { Swipe, SwipeItem, ImagePreview, Field, Uploader, AddressEdit, Card, List, Circle, Toast, Collapse, CollapseItem } from 'vant'
const vant = {
  install: function (Vue) {
    Vue.use(Swipe)
      .use(SwipeItem)
      .use(ImagePreview)
      .use(Field)
      .use(Uploader)
      .use(AddressEdit)
      .use(Card)
      .use(List)
      .use(Circle)
      .use(Collapse)
      .use(CollapseItem)
      .use(Toast)
  }
}
export default vant
