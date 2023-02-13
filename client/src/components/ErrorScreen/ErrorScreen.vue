<template>
  <div class="col div-lottie h-100 w-100">
    <lottie-vue-player
      class="lottie"
      :src="'/lottie/error.json'"
      :autoplay="true"
      :loop="true"
      :speed="1"
    />
  </div>
</template>

<script src="./ErrorScreen.js" />

<style lang="stylus" scoped>
.div-lottie{
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.lottie {
  width: auto;
  height: 70%;
  background: transparent;
}
</style>
