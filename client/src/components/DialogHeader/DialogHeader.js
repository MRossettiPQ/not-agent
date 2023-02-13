import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "dialog-header",
})
class DialogHeader extends Vue {
  @Prop()
  labelRightButton;

  @Prop()
  id;

  @Prop()
  icon;

  @Prop({ default: "" })
  idMsg;

  @Prop({ default: "" })
  elseMsg;
}

export default DialogHeader;
