<!-- 
针对/SellerPage这条路径而显示出来的
在这个组件,通过子组件注册的方式,要显示出Seller.vue这个组件 
-->
<script setup>
import { ref, reactive } from "vue";
import Seller from "@/components/Seller.vue";
</script>

<template>
  <div class="com-page"><Seller></Seller></div>
</template>

<style scoped lang="sass">
</style>