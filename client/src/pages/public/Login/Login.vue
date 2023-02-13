<template>
  <q-page class="flex flex-center">
    <q-card class="login-card" flat>
      <q-form ref="mainForm" class="col" greedy>
        <q-card-section class="form-lines form-lines__gap form-lines__gap-sm">
          <div class="row items-center m-b-32">
            <h3 class="title col">{{ $t("login.page_tile") }}</h3>
          </div>

          <q-input
            v-model="bean.username"
            :rules="[$validators.notBlank]"
            class="row"
            filled
            :label="$t('login.name')"
            type="text"
          />

          <q-input
            v-model="bean.password"
            :rules="[$validators.notBlank]"
            class="row"
            filled
            :label="$t('login.password')"
            type="password"
          />

          <q-btn
            color="primary"
            :label="$t('login.login')"
            size="lg"
            unelevated
            @click="onSubmit"
            :loading="loading"
          />

          <p class="register">
            {{ $t("login.dont_have_an_account") }}
            <router-link to="register">
              {{ $t("login.to_register") }}
            </router-link>
          </p>
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script src="./Login.js" />

<style lang="scss" scoped>
@import "~src/css/mixins.scss";
.title {
  text-align: center;
  font-weight: bold;
  font-size: 32px;
  color: $dark;
}

.register {
  color: $faded;
  width: 100%;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 0;

  a {
    font-weight: bold;
    color: $dark;
  }
}

.login-card {
  width: 470px;
  padding: 46px 46px;
  @include mobile-portrait() {
    padding: 0;
  }
}
</style>
