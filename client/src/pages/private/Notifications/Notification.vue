<template>
  <q-dialog ref="dialog" full-height full-width>
    <q-card class="column">
      <dialog-header
        :id="id"
        :label-right-button="!isMobile ? 'Close' : null"
        id-msg="Notificação nº"
        else-msg="Nova Notificação"
      />
      <loading-screen v-if="fetchData.loading"></loading-screen>
      <error-screen v-else-if="fetchData.hasError"></error-screen>
      <q-card-section
        v-else-if="fetchData.result"
        class="card-section"
      >
        <q-form ref="mainForm" class="col form-lines form-lines__gap-sm" greedy>
          <q-input
            v-model="bean.name"
            :rules="[$validators.notBlank]"
            filled
            label="Nome"
          />
          <q-input
            type="textarea"
            v-model="bean.description"
            :rules="[$validators.notBlank]"
            filled
            label="Descrição ocorrência"
          />
          <q-select
            v-model="bean.type"
            :options="fetchData.result.metadata?.notificationTypesOptions"
            filled
            label="Tipo ocorrência"
            :rules="[$validators.notBlank]"
          />
          <q-input
            v-model="bean.deadline"
            filled
            :rules="[$validators.notBlank]"
            fill-mask="DD-MM-YYYY"
          >
            <template #prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="bean.deadline" fill-mask="DD-MM-YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          :label="id !== null ? 'update' : 'save'"
          color="primary"
          unelevated
          dense
          size="md"
          @click="save"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script src="./Notification.js" />

<style lang="scss" scoped>
@import "~src/css/mixins.scss";
.card-section {
  display: flex;
  flex-direction: row !important;
  gap: 12px;

  @include mobile-portrait() {
    display: flex !important;
    flex-direction: column !important;
  }
}
</style>
