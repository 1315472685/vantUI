<template>
    <span class="botton">{{text}}</span>
</template>
<script>
export default {
    name:'myButton',
    props:['text']
}
</script>
<style lang="scss" scoped>
span{
    color: #fff;
    background: cornflowerblue;
    padding: 8px;
    border-radius: 5px;
}
</style>