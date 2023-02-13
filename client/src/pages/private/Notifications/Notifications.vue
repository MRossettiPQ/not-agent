<template>
  <section ref="patientScreen" class="responsive-height">
    <div class="row responsive-content form-column form-column__padding">
      <q-table
        :columns="columns"
        :data="pagination.list"
        :filter="filter"
        :loading="pagination.loading"
        bordered
        class="col"
        flat
        row-key="id"
        @row-click="openDialog"
        :rows-per-page-options="[0]"
        virtual-scroll
      >
        <template #top>
          <div class="menu-top-table">
            <q-btn
              :disable="loading"
              :label="!$q.platform.is.mobile ? 'Notificação' : null"
              color="primary"
              dense
              icon="add"
              unelevated
              @click="openDialog"
            />
            <q-input
              v-model="filter"
              borderless
              class="col-5"
              color="primary"
              debounce="300"
              dense
              outlined
            >
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>
      </q-table>
    </div>
  </section>
</template>

<script src="./Notifications.js" />

<style lang="scss" scoped></style>
