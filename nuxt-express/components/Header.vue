<template>
	<header>
		<!-- <router-link>와 동일, 사용자 네비게이션 컴포넌트-->
		<nav>
			<nuxt-link to="/">Home</nuxt-link>
			<nuxt-link to="/post">post</nuxt-link>
		</nav>
	</header>
</template>

<style>
 nav{
 	padding: 20px 20px 20px 0;
 }
 nav a{
 	padding: 10px;
    text-decoration: none;
    background: #fff;
    border-radius: 3px;
    color: rgb(0, 110, 255);
    font-weight: bold;
    margin-right: 15px;
 }
</style>