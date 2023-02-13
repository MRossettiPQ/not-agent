import {Component, Vue} from "vue-property-decorator";
import {io} from "socket.io-client";
import {notifySuccess} from "src/commons/utils/NotifyUtils";
import notifier from "node-notifier"

@Component({
  name: "private-app",
})
class PrivateApp extends Vue {

  socket = {}

  mounted() {
    notifier.notify({
      title: 'Mounted',
      message: 'Hello, there!'
    });

    // this.socket = io(process.env.SOCKET_URL.replace(/['"!@#$%^&*]/g, ""))
    //
    // this.socket.on('disconnect', () => {
    //   console.log('user disconnected');
    // });
    //
    // this.socket.on('deadline', (obj) => {
    //   console.log('deadline: ', obj);
    //   notifySuccess(obj.message)
    // });
  }

  beforeDestroy() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }
}

export default PrivateApp;
