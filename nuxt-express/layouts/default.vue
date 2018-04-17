<template>
  <div>
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

export default {
  components: {
    MyFooter
  }
}
</script>

<style>
.container
{
  margin: 0;
  width: 100%;
  padding: 100px 0;
  text-align: center;
}

.button, .button:visited
{
  display: inline-block;
  color: black;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #000;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover, .button:focus
{
  color: #fff;
  background-color: #000;
}

.title
{
  color: #000;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}
</style>
