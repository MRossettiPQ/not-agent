import {Component, Vue} from "vue-property-decorator";
import {io} from "socket.io-client";
import {notifySuccess} from "src/commons/utils/NotifyUtils";

@Component({
  name: "home-private",
})
class HomePrivate extends Vue {

}

export default HomePrivate;
