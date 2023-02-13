import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import {
  QAjaxBar,
  QBadge,
  QBtn,
  QBtnGroup,
  QCard,
  QCardActions,
  QCardSection,
  QCheckbox,
  QColor,
  QDate,
  QDialog,
  QField,
  QFile,
  QIcon,
  QImg,
  QInput,
  QItem,
  QItemLabel,
  QItemSection,
  QLinearProgress,
  QMarkupTable,
  QMenu,
  QPopupProxy,
  QSelect,
  QTime,
  QToolbar,
  QTab,
  QTable,
  QTabPanel,
  QTabs,
  QTabPanels,
  QSplitter,
  QToolbarTitle,
  QTooltip,
} from "quasar";
import { installFilters, ValidatorPlugin } from "../commons/UseUtils";

export default async ({ Vue }) => {
  console.log("[INIT] - Loading components");

  // https://webpack.js.org/guides/dependency-management/#require-context
  let requireComponent = require.context(
    // Look for files in the current directory
    "../components",
    // Look in subdirectories
    true,
    // Match .vue files
    /[\w-]+\.vue$/
  );

  // For each matching file name...
  requireComponent.keys().forEach((fileName) => {
    // Get the component config
    const componentConfig = requireComponent(fileName);
    // Get PascalCase name of component
    const componentName = upperFirst(
      camelCase(
        // Gets the file name regardless of folder depth
        fileName
          .split("/")
          .pop()
          .replace(/\.\w+$/, "") // remove file extension
      )
    );

    // Globally register the component
    Vue.component(
      `${componentName}`,
      componentConfig.default || componentConfig
    );
  });

  installFilters(Vue);

  Vue.component("QMarkupTable", QMarkupTable);
  Vue.component("QLinearProgress", QLinearProgress);
  Vue.component("QFile", QFile);
  Vue.component("QTooltip", QTooltip);
  Vue.component("QBtn", QBtn);
  Vue.component("QBtnGroup", QBtnGroup);
  Vue.component("QInput", QInput);
  Vue.component("QIcon", QIcon);
  Vue.component("QDate", QDate);
  Vue.component("QPopupProxy", QPopupProxy);
  Vue.component("QCheckbox", QCheckbox);
  Vue.component("QMenu", QMenu);
  Vue.component("QBadge", QBadge);
  Vue.component("QSelect", QSelect);
  Vue.component("QItemSection", QItemSection);
  Vue.component("QItem", QItem);
  Vue.component("QItemLabel", QItemLabel);
  Vue.component("QImg", QImg);
  Vue.component("QTime", QTime);
  Vue.component("QColor", QColor);
  Vue.component("QCard", QCard);
  Vue.component("QCardSection", QCardSection);
  Vue.component("QCardActions", QCardActions);
  Vue.component("QToolbar", QToolbar);
  Vue.component("QToolbarTitle", QToolbarTitle);
  Vue.component("QDialog", QDialog);
  Vue.component("QField", QField);
  Vue.component("QAjaxBar", QAjaxBar);
  Vue.component("QTab", QTab);
  Vue.component("QTable", QTable);
  Vue.component("QTabPanel", QTabPanel);
  Vue.component("QTabs", QTabs);
  Vue.component("QTabPanels", QTabPanels);
  Vue.component("QSplitter", QSplitter);
  Vue.use(ValidatorPlugin);
};
