<template>
  <div class="container">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
#nav {
  border: solid 2px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.35s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
</style>
