import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "EssentialLink",
})
class EssentialLink extends Vue {
  @Prop({ type: String, required: true })
  title;

  @Prop({ type: String, default: "" })
  caption;

  @Prop({ type: String, default: "" })
  icon;

  @Prop({ type: String, default: null })
  link;

  @Prop({ type: Function, default: null })
  action;

  @Prop({ type: Boolean, default: false })
  inLogged;

  @Prop({ type: Boolean, default: false })
  logged;

  get attrs() {
    if (this.link) {
      return { to: this.link };
    }
    return "";
  }

  get renderLink() {
    return this.inLogged !== null ? this.logged === !this.inLogged : true;
  }

  get active() {
    return true;
  }
}

export default EssentialLink;
