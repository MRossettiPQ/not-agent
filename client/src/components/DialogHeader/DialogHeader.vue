<template>
  <q-card class="dialog-header">
    <div v-if="id" class="text-h6">{{ idMsg }} {{ id }}</div>
    <div v-else class="text-h6">{{ elseMsg }}</div>
    <q-btn
      v-close-popup
      :icon="icon || 'close'"
      :label="labelRightButton"
      dense
      flat
      size="md"
    />
  </q-card>
</template>

<script src="./DialogHeader.js" />

<style lang="stylus" scoped>
.dialog-header
  width 100%
  display flex
  justify-content space-between
  padding 14px
</style>
