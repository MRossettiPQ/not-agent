import {Component, Vue, Watch} from "vue-property-decorator";
import { LoadDataUtils } from "src/commons/utils/LoadDataUtils";

@Component({
  name: "home",
})
class Home extends Vue {
  fetchData = LoadDataUtils.loadList({
    loadList: {},
    auto: true,
  });

  @Watch('fetchData.loading')
  loading() {
    console.log('fetchData: ',this.fetchData.result)
  }
}

export default Home;
