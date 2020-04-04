// 导入自己需要的组件
import { Circle, Field, Toast } from "vant";
const vant = {
  install: function (Vue) {
    Vue.use(Circle).use(Field).use(Toast);
  },
};
export default vant;
