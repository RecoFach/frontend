<template>
  <div class="login">
    <h1>This is an login page</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      showNav: true
    };
  }
});
</script>

<style lang="scss">
a {
  text-decoration: none;
}
</style>
