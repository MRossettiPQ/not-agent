<template>
  <q-item
    v-if="renderLink"
    class="inactive"
    active-class="active"
    exact-active-class="active"
    clickable
    tag="a"
    v-bind="attrs"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script src="./EssentialLink.js" />
<style lang="stylus" scoped>
.inactive {
  color: $primary
}
.active {
  color: $secondary
}
</style>
