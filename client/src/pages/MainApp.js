import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "main-app",
})
class MainApp extends Vue {
  leftDrawerOpen = false;

  get essentialLinks() {
    const essentialLinks = [
      {
        title: this.$t("menu.home.title"),
        caption: this.$t("menu.home.caption"),
        icon: "home",
        link: "/home",
      },
      {
        title: this.$t("menu.login.title"),
        caption: this.$t("menu.login.caption"),
        icon: "login",
        link: "/logar",
        inLogged: true,
      },
      {
        title: this.$t("menu.register.title"),
        caption: this.$t("menu.register.caption"),
        icon: "app_registration",
        link: "/register",
        inLogged: true,
      },
      {
        title: this.$t("menu.profile.title"),
        caption: this.$t("menu.profile.caption"),
        icon: "account_circle",
        link: "/profile",
        inLogged: false,
      },
    ];
    return {
      ...essentialLinks,
      ...() => [],
    };
  }

  mounted() {
    console.log(this.$store.state.Authentication?.user);
  }

  get logged() {
    return !!this.$store.state.Authentication?.user;
  }

  get bean() {
    return this.$store.state.Authentication?.user;
  }

  logOut() {
    this.$q
      .dialog({
        message: this.$t("main.logout"),
        ok: {
          label: this.$t("main.yes"),
          push: true,
          flat: true,
        },
        cancel: {
          label: this.$t("main.no"),
          push: true,
          color: "negative",
          rounded: false,
          flat: true,
        },
        persistent: true,
      })
      .onOk(async () => {
        try {
          await this.$store.dispatch("Authentication/logout");
        } catch (e) {
          console.log(e);
        }
      });
  }

  async goProfile() {
    try {
      await this.$router.push("/profile");
    } catch (e) {
      console.log(e);
    }
  }
}

export default MainApp;
