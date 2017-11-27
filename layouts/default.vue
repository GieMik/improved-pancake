<template>
<div class="wrapper">
  <icons></icons>
  <header>
    <div class="container">
      <div class="page-header">
        <h3><nuxt-link :to="{ name: 'index' }">Cheers`</nuxt-link></h3>
        <h1 class="page-title">{{ $store.state.pageTitle }}</h1>
      </div>
    </div>
  </header>
  <main>
    <div class="container">
      <div class="page-content">
        <nuxt/>
      </div>
    </div>
  </main>
  <footer class="ms_t-center"><h5>Made by GieMik | Powered by Nuxt.js & Vue.js</h5></footer>
</div>
</template>