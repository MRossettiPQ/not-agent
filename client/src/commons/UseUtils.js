import ValidatorsUtils from "./utils/ValidatorsUtils";
import FilterUtils from "src/commons/utils/FilterUtils";
import { i18n } from "boot/i18n";

export const ValidatorPlugin = {
  install: function install(Vue) {
    Vue.prototype.$validators = new ValidatorsUtils(i18n).getAllValidators();
  },
};

export function installFilters(Vue) {
  const filters = Object.getPrototypeOf(FilterUtils);
  const names = Object.getOwnPropertyNames(filters).filter(
    (name) => name !== "constructor"
  );
  for (const key of names) {
    Vue.filter(key, filters[key]);
  }
}
