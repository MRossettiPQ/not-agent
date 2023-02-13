import {Component, Vue, Watch} from "vue-property-decorator";
import { LoadDataUtils } from "src/commons/utils/LoadDataUtils";
import NotificationService from "src/commons/services/NotificationService";

@Component({
  name: "home",
})
class Home extends Vue {
  fetchData = LoadDataUtils.loadList({
    loadList: {
      listNotification: NotificationService.getNotificationList,
    },
    auto: true,
  });

  @Watch('fetchData.loading')
  loading() {
    console.log('fetchData: ',this.fetchData.result)
  }
}

export default Home;
