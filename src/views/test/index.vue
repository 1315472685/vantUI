<template>
  <div class="test">
    <van-field v-model="digit" type="digit" label="整数" maxlength="10" placeholder="请输入整数" />
    <van-field v-model="value2" clearable label="文本" left-icon="music-o" placeholder="显示清除图标" />
    <!-- <p>文件上传完毕后会触发after-read回调函数，获取到对应的file对象</p>
    <van-uploader :after-read="afterRead" />
    <p>通过v-model可以绑定已经上传的图片列表，并展示图片列表的预览图</p>
    <van-uploader v-model="fileList" multiple />
    <p>通过max-count属性可以限制上传文件的数量，上传数量达到限制后，会自动隐藏上传区域</p>
    <van-uploader v-model="maxFileList" multiple :max-count="2" />
    <P>
      上传前校验
      通过传入beforeRead函数可以在上传前进行校验，返回true表示校验通过，返回false表示校验失败。支持返回Promise进行异步校验
    </P>
    <van-uploader :before-read="beforeRead" />-->
  </div>
</template>
<script>
export default {
  name: 'test',
  data () {
    return {
      digit: '',
      value2: '',
      maxFileList: [],
      fileList: [
        { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        { url: 'https://cloud-image', isImage: true }
      ]
    }
  },
  methods: {
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },
    // 返回布尔值
    beforeRead (file) {
      if (file.type !== 'image/jpeg') {
        Toast('请上传 jpg 格式图片')
        return false
      }

      return true
    },

    // 返回 Promise
    asyncBeforeRead (file) {
      return new Promise((resolve, reject) => {
        if (file.type !== 'image/jpeg') {
          Toast('请上传 jpg 格式图片')
          reject()
        } else {
          resolve()
        }
      })
    }
  }
}
</script>
