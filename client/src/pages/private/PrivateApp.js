import {Component, Vue} from "vue-property-decorator";
import {io} from "socket.io-client";
import {notifySuccess} from "src/commons/utils/NotifyUtils";

@Component({
  name: "private-app",
})
class PrivateApp extends Vue {

  socket = null

  mounted() {
    this.socket = io(process.env.SOCKET_URL.replace(/['"!@#$%^&*]/g, ""))
    this.socket.on('disconnect', () => {
      console.log('[SOCKETIO] User disconnected');
    });

    this.socket.on('deadline', (obj) => {
      console.log('[SOCKETIO] Event - Deadline: ', obj);
      notifySuccess(obj.message)
    });
  }

  beforeDestroy() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }
}

export default PrivateApp;
