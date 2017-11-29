<template>
<div class="wrapper">
  <icons></icons>
  <header>
    <div class="container fluid">
      <h3><nuxt-link class="c-white" :to="{ name: 'index' }">Cheers`</nuxt-link></h3>
    </div>
  </header>
  <main>
    <div class="container">
      <div class="window">
        <div class="page-header">
          <h1 class="page-title">{{ $store.state.pageTitle }}</h1>
        </div>
        <div class="page-content">
          <nuxt/>
        </div>
      </div>
    </div>
  </main>
  <footer class="ms_t-center">
    <div class="container fluid">
      <h5><span class="t-nowrap">Made by GieMik</span> | <span class="t-nowrap">Powered by <span class="c-vue">Nuxt.js</span> &amp; <span class="c-vue">Vue.js</span></span></h5>
    </div>
  </footer>
</div>
</template>