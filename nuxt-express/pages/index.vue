<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      USERS
    </h1>
    <ul class="users">
      <li v-for="(user, index) in users" :key="index" class="user">
        <nuxt-link :to="{ name: 'id', params: { id: index }}">
          {{ user.name }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
/*
  비동기 데이터
  - 서버에서 데이터를 가져와서 렌더링하고 싶을 때, 컴포넌트의 데이터를 셋팅하기 전에 비동기 작업을 처리할 수 있게 asyncData를 지원함.

  페이지 속성들.
  asyncData 
  - pages 컴포넌트를 로딩하기 전에 매번 호출됨
  - pages 컴포넌트만 지원
  - asyncData(context..)
    -context 객체에는 error(params) 메소드 존재, 이를 통해 에러페이지 보여줄수있음.
  - asyncData 반환값은 data와 합쳐짐.
  - 사용법)promise객체, async/await 사용, callback 사용

  fetch
  - 페이지가 렌더링되기 전에 스토어를 채우기위해 사용
  layout
  - layouts 폴더에 정의된 레이아웃을 지정
  head
  - 현재 페이지에 대한 특정 메타태그 설정

*/
import axios from '~/plugins/axios'

export default {
  async asyncData () {
    let { data } = await axios.get('/api/users')
    return { users: data }
  },
  head () {
    return {
      title: 'Users'
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
