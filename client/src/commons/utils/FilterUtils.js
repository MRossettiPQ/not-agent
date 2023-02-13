import StringMask from "string-mask";
import moment from "moment";
import _ from "lodash";

export default new (class FilterUtils {
  getAllFilters() {
    const prototypeOf = Object.getPrototypeOf(this);
    const names = Object.getOwnPropertyNames(prototypeOf).filter(
      (name) => name !== "constructor" || "getAllFilters"
    );
    let allValidators = {};
    for (const key of names) {
      allValidators[key] = prototypeOf[key];
    }
    return allValidators;
  }

  date(dateIso) {
    const format =
      dateIso.length > 1 && dateIso[1] !== undefined
        ? dateIso[1]
        : "DD/MM/YYYY";

    if (!dateIso) {
      return "";
    }

    return this.formatDate(dateIso, format);
  }

  dateTime(dateIso) {
    const format =
      dateIso.length > 1 && dateIso[1] !== undefined
        ? dateIso[1]
        : "DD/MM/YYYY HH:mm";

    if (!dateIso) {
      return "";
    }

    return this.format(dateIso, format);
  }

  yearMonth(dateIso) {
    const format =
      dateIso.length > 1 && dateIso[1] !== undefined ? dateIso[1] : "MM/YYYY";

    if (!dateIso) {
      return "";
    }

    return this.formatDate(dateIso, format);
  }

  time(dateIso) {
    const format =
      dateIso.length > 1 && dateIso[1] !== undefined ? dateIso[1] : "HH:mm";

    if (!dateIso) {
      return "";
    }

    if (dateIso.length === 8) {
      dateIso = "1970-01-01T" + dateIso;
    }

    return this.formatDate(dateIso, format);
  }

  secondsToTime(seconds) {
    const concatHyphen =
      seconds.length > 1 && seconds[1] !== undefined ? seconds[1] : false;
    const toMilliseconds = seconds * 1000;
    let secondsString = toMilliseconds.toString();
    const isNegative = secondsString.includes("-");

    if (isNegative) {
      secondsString = secondsString.split("-")[1];
      const formatted = moment.utc(parseInt(secondsString)).format("HH:mm:ss");
      return "".concat(concatHyphen ? "-" : "").concat(formatted);
    }

    return moment.utc(parseInt(secondsString)).format("HH:mm:ss");
  }

  enum(value, enums) {
    if (!value) {
      return "";
    }

    const e = _.find(enums, {
      value: value,
    });

    if (e?.descricao) {
      return e.descricao;
    } else if (e?.description) {
      return e.description;
    } else if (e?.label) {
      return e.label;
    }

    return "<DESCRIPTION " + value + " NOT FOUND>";
  }

  money(value) {
    const decimalPlaces =
      value.length > 1 && value[1] !== undefined ? value[1] : 2;

    if (!value) {
      value = 0;
    }

    const isNegative = Number(value) < 0;
    const zeros = Array(decimalPlaces).fill("0").join("");
    const maskMoney = new StringMask("#.##0,".concat(zeros), {
      reverse: true,
    });

    if ((value + "").indexOf(".") !== -1) {
      value = (value + "").replace(".", ","); // completa as casas decimais

      const missingDecimalPlaces =
        decimalPlaces -
        value.substring(value.indexOf(",") + 1, value.length).length;

      if (missingDecimalPlaces > 0) {
        value = ""
          .concat(value)
          .concat(Array(missingDecimalPlaces).fill("0").join(""));
      }

      if (missingDecimalPlaces < 0) {
        value = value.substring(0, value.length + missingDecimalPlaces);
      }
    } else {
      value = "".concat(value, ",").concat(zeros);
    }

    return (
      (isNegative ? "-" : "") + maskMoney.apply(value.replace(/[^\d]/g, ""))
    );
  }

  truncate(value, wordwise, max, tail) {
    if (!value) return "";
    max = parseInt(max, 10);
    if (!max) return value;
    if (value.length <= max) return value;
    value = value.substr(0, max);

    if (wordwise) {
      const lastspace = value.lastIndexOf(" ");

      if (lastspace !== -1) {
        value = value.substr(0, lastspace);
      }
    }

    return value + (tail || " …");
  }

  formatDecimal(value) {
    return value + "".replace(/\./g, "").replace(",", ".");
  }

  formatDate(dateIso, format) {
    const date = moment(dateIso).format(format);
    return date !== "Invalid date" ? date : null;
  }
})();
