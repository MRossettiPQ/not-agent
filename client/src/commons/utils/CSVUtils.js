import { exportFile } from "quasar";

class ExportCSV {
  constructor(tableColumns, fileName, errorNotification, successNotification) {
    this.tableColumns = tableColumns;
    this.errorNotification = errorNotification;
    this.successNotification = successNotification;

    this.loading = false;
  }

  async export(table = [], fileName = "csvFile") {
    function wrapCsvValue(val, formatFn) {
      let formatted = formatFn !== void 0 ? formatFn(val) : val;
      formatted =
        formatted === void 0 || formatted === null ? "" : String(formatted);
      formatted = formatted.split('"').join('""');
      /**
       * Excel accepts \n and \r in strings, but some other CSV parsers do not
       * Uncomment the next two lines to escape new lines
       */
      // .split('\n').join('\\n')
      // .split('\r').join('\\r')
      return `"${formatted}"`;
    }
    try {
      this.loading = true;
      // native encoding to csv format
      const content = [this.tableColumns.map((col) => wrapCsvValue(col.label))]
        .concat(
          table.map((row) =>
            this.tableColumns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.field : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      // Buscar alternativa para remover a dependência do exportFile
      const status = exportFile(`${fileName}.csv`, content, "text/csv");

      if (status !== true && this.errorNotification) {
        this.errorNotification();
      } else if (this.successNotification) {
        this.successNotification();
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }
}

export class CSVUtils {
  static create({
    tableColumns = [],
    errorNotification = null,
    successNotification = null,
  }) {
    return new ExportCSV(tableColumns, errorNotification, successNotification);
  }
}
