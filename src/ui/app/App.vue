<template>
  <header class="header">
    <div class="container">
      <div class="header__menu">
        <router-link to="/pages">pages</router-link>
        <router-link to="/domains">domains</router-link>
      </div>
    </div>
  </header>
  <main class="main">
    <router-view />
  </main>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  background-color: #ccc;
}

.main {
  padding: 20px;
  max-width: 600px;
  margin: auto;
}

.options {
  font-family: sans-serif;
  padding: 20px;
  max-width: 600px;
  margin: auto;

  ul {
    list-style: none;
    padding: 0;

    li {
      margin: 10px 0;
      line-height: 1.5;

      a {
        color: #1976d2;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }

      time {
        display: block;
        font-size: 0.9em;
        color: #888;
      }
    }
  }

  button {
    margin-top: 15px;
    padding: 8px 12px;
    border: none;
    background: #c62828;
    color: white;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background: #a91c1c;
    }
  }
}
</style>
