// 导入自己需要的组件
import { Icon, Tab, Tabs, Field, cellGroup, Button, Checkbox, CheckboxGroup } from 'vant'
const vant = {
  install: function (Vue) {
    Vue.use(Icon)
      .use(Tabs)
      .use(Tab)
      .use(Field)
      .use(cellGroup)
      .use(Button)
      .use(Checkbox)
      .use(CheckboxGroup)
  }
}
export default vant
