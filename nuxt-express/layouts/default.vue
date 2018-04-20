<template>
  <div id="app">
    <my-header/>
    <nuxt/>
    <my-footer/>
  </div>
</template>
<!--
  메인 레이아웃을 확장하려면 layouts/default.vue 파일을 추가해야한다.
  페이지 컴포넌트를 레이아웃에 렌더링하기 위해서 꼭 <nuxt/> 태그를 작성해야한다.
-->
<script>
import MyFooter from '~/components/Footer.vue'
import MyHeader from '~/components/Header.vue'

export default {
  components: {
    MyFooter,
    MyHeader
  }
}
</script>

<style>

  body{
    background-color: #EEEEEE;
    display: grid;
    grid-template-rows: auto;
    justify-items: center;
    padding-top: 50px;
  }
  body, html {
    margin: 0;
    height: 100%;
  }
  
</style>
