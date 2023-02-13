import {Component, Ref, Vue} from "vue-property-decorator";

@Component({
  name: "loading-screen",
})
class LoadingScreen extends Vue {
  @Ref("lottie")
  lottie;
}

export default LoadingScreen;
