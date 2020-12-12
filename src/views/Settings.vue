<template>
  <div class="Settings">
    <h1>User Settings</h1>
    <el-button type="primary" @click="onSubmit">Delete User</el-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  name: 'Settings',
  methods: {
    onSubmit() {
      const user: any = localStorage.getItem('user');
      const userEmail: string = JSON.parse(user).email;

      axios
        .delete(`http://localhost:8080/users/`, {
          data: {
            email: userEmail,
          },
        })
        .then(() => {
          alert('User deleted sucessfully!');
          window.location.href = '/login';
        });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
