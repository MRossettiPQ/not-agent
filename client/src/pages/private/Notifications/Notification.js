import {Component, Prop, Ref, Vue} from "vue-property-decorator";
import NotificationService from "src/commons/services/NotificationService";
import FormUtils from "src/commons/utils/FormUtils";
import DateUtils from "src/commons/utils/DateUtils";
import {LoadDataUtils} from "src/commons/utils/LoadDataUtils";

@Component({
  name: "notification",
})
class Notification extends Vue {
  fetchData = LoadDataUtils.loadList({
    loadList: {
      metadata: NotificationService.getMetadata,
      bean: NotificationService.getNotification,
    },
    auto: false
  });

  @Ref("dialog")
  dialog;

  @Prop()
  id;

  bean = {};
  loading = false;

  show() {
    this.dialog.show();
  }

  hide(payload) {
    this.$emit("ok", payload ? payload : true);
    this.dialog.hide();
  }

  async mounted() {
    if (this.id !== null) {
      await this.fetchData.loadAll({
        bean: {
          options: {
            id: this.id
          }
        }
      });
      this.bean = this.fetchData.result.bean
    } else {
      await this.fetchData.loadByServiceKey(null, 'metadata')
      this.bean = {};
    }
    console.log(this.fetchData.result)
  }

  async save() {
    try {
      this.loading = true;
      await FormUtils.validateAsync(this.$refs.mainForm);
      this.bean = await NotificationService.postNotification(this.bean);
      this.hide({save: true});
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  filterDate(date) {
    return DateUtils.getDateFormated(date);
  }

  get isMobile() {
    return this.$q.platform.is.mobile;
  }
}

export default Notification;
