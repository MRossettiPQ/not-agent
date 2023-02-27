import {Component, Vue} from "vue-property-decorator";
import Notification from "./Notification.vue";
import {PaginationUtils} from "src/commons/utils/PaginationUtils";
import DialogUtils from "src/commons/utils/DialogUtils";

@Component({
  name: "notifications",
  components: { Notification  },
})
class Notifications extends Vue {
  loading = false;
  filter = "";

  pagination = PaginationUtils.create({
    url: "/api/notification/",
    infinite: true,
  });

  columns = [
    {
      name: "id",
      align: "left",
      label: "ID",
      field: "id",
    },
    {
      name: "name",
      align: "left",
      label: "Nome",
      field: "name",
    },
  ];

  async search(term) {
    await this.pagination.search({ term });
  }

  async mounted() {
    try {
      await this.search();
    } catch (e) {
      console.log(e);
    }
  }

  async openDialog(evt, row) {
    try {
      const data = await DialogUtils.asyncDialog(Notification, {
        id: row?.id || null,
      });

      if (data?.save) {
        await this.pagination.search();
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default Notifications;
