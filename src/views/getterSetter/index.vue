<template>
  <div class="setter">
    <p></p>
  </div>
</template>
<script>
export default {
  name: 'getterSetter',
  data () {
    return {
      obj: null
    }
  },
  created () {
    this.obj = { age: 12 }
    this.$set(this.obj, 'sex', 'grils')
    let obj = { name: 'haha' }
    this.obj = { ...this.obj, ...obj }
    console.log(this.obj)
  }
}
</script>
