import { Component, Vue } from "vue-property-decorator";
import FormUtils from "src/commons/utils/FormUtils";
import AuthenticationService from "src/commons/services/AuthenticationService";

@Component({
  name: "login",
})
class Login extends Vue {
  loading = false;
  bean = {
    username: "",
    password: "",
  };

  async onSubmit() {
    try {
      this.loading = true;
      await FormUtils.validateAsync(this.$refs.mainForm);
      const result = await AuthenticationService.login({ bean: this.bean });
      await this.$store.dispatch("Authentication/login", result);
      await this.$router.push("/profile");
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }
}

export default Login;
