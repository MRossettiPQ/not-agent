<template>
  <div class="col div-lottie h-100 w-100">
    <lottie-vue-player
      ref="lottie"
      class="lottie"
      :src="'/lottie/loading.json'"
      :autoplay="true"
      :loop="true"
      :speed="1"
    />
  </div>
</template>

<script src="./LoadingScreen.js" />

<style lang="stylus" scoped>
.div-lottie{
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.lottie {
  width: auto;
  height: 70%;
  background: transparent;
}
</style>
