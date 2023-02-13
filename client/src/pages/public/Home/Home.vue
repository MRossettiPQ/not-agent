<template>
  <q-page class="home">
    <loading-screen v-if="fetchData.loading" />
    <error-screen v-else-if="fetchData.hasError"/>
  </q-page>
</template>

<script src="./Home.js" />

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 100%;
}

.ip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
</style>
