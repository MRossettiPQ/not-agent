<template>
  <q-page class="flex flex-center">
    <q-card class="cadastro-card" flat>
      <q-card-section>
        <q-form ref="mainForm" class="form-lines form-lines__gap-sm" greedy>
          <div class="row items-center">
            <h3 class="title col">{{$t('register.page_tile')}}</h3>
          </div>

          <q-input
            v-model="bean.name"
            :rules="[$validators.notBlank]"
            class="row"
            filled
            :label="$t('register.name')"
          />
          <q-input
            v-model="bean.username"
            :rules="[$validators.notBlank]"
            class="row"
            filled
            :label="$t('register.user_name')"
          />
          <q-input
            v-model="bean.email"
            :rules="[$validators.notBlank, $validators.email]"
            class="row"
            filled
            :label="$t('register.email')"
            type="email"
          />
          <q-input
            v-model="bean.password"
            :rules="[$validators.notBlank]"
            class="row"
            filled
            :label="$t('register.password')"
            type="password"
          />
          <q-input
            v-model="bean.passwordConfirm"
            :rules="[$validators.notBlank, $validators.equal(bean.password)]"
            class="row"
            filled
            :label="$t('register.repeat_password')"
            type="password"
          />
          <q-btn
            class="row cadastro-btn"
            color="primary"
            :label="$t('register.register')"
            size="lg"
            @click="onSubmit"
            :loading="loading"
          />
        </q-form>
        <p class="possui-conta">
          {{$t('register.already_have_an_account')}}
          <router-link to="login">{{$t('register.to_login')}}</router-link>
        </p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script src="./Register.js"/>

<style lang="scss" scoped>
@import "~src/css/mixins.scss";
.title {
  text-align: center;
  font-weight: bold;
  font-size: 32px;
  color: $dark;
}

.possui-conta {
  display: flex;
  justify-content: flex-end;
  gap: 3px;
  color: $faded width 100% text-align center;
  margin-top: 8px;
  margin-bottom: 0;

  a {
    font-weight: bold;
    color: $dark;
  }
}

.cadastro-btn {
  width: 100%;
  height: 64px;
}

.cadastro-card {
  width: 470px;
  padding: 30px 46px;
  @include mobile-portrait() {
    padding: 0;
  }
}
</style>
