import { Vue } from "vue-property-decorator";

class DialogUtils extends Vue {
  static async Show({ options }) {
    return new Promise((resolve, reject) => {
      this.prototype.$q
        .dialog(options)
        .onOk(() => resolve())
        .onCancel(() => reject());
    });
  }

  static async asyncDialog(component, props) {
    return new Promise((resolve) => {
      this.prototype.$q
        .dialog({
          component: component,
          ...props,
        })
        .onOk((e) => resolve(e))
        .onCancel((e) => resolve(e))
        .onDismiss((e) => resolve(e));
    });
  }
}

export default DialogUtils;
