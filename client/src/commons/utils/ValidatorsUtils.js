import moment from "moment";
import _ from "lodash";
import FilterUtils from "./FilterUtils";
import Big from "big.js";

export default class ValidatorsUtils {
  constructor(i18n) {
    this.i18n = i18n;
  }

  getAllValidators() {
    const prototypeOf = Object.getPrototypeOf(this);
    const names = Object.getOwnPropertyNames(prototypeOf).filter(
      (name) => name !== "constructor" || "getAllValidators"
    );
    let allValidators = {};
    for (const key of names) {
      allValidators[key] = prototypeOf[key];
    }
    return allValidators;
  }

  cep(cep) {
    if (!cep) {
      return true;
    }

    const cleanNumber = cep.replace(/[^\d]/g, "");
    if (cleanNumber.length !== 8) {
      return "CEP inválido.";
    }

    return true;
  }

  cnpj(s) {
    if (!s) {
      return true;
    }

    s = s.replace(/\D/g, "");
    let i;
    const c = s.substr(0, 12);
    const dv = s.substr(12, 2);
    let d1 = 0;

    for (i = 0; i < 12; i++) {
      d1 += c.charAt(11 - i) * (2 + (i % 8));
    }

    if (d1 === 0) return "CNPJ inválido.";
    d1 = 11 - (d1 % 11);
    if (d1 > 9) d1 = 0;

    if (dv.charAt(0) !== d1.toString()) {
      return "CNPJ inválido.";
    }

    d1 *= 2;

    for (i = 0; i < 12; i++) {
      d1 += c.charAt(11 - i) * (2 + ((i + 1) % 8));
    }

    d1 = 11 - (d1 % 11);
    if (d1 > 9) d1 = 0;

    if (dv.charAt(1) !== d1.toString()) {
      return "CNPJ inválido.";
    }

    return true;
  }

  cpf(cpf) {
    if (!cpf) {
      return true;
    }

    let soma;
    let resto;
    let i;
    cpf = cpf.replace(/[^\d]/g, "");

    if (
      cpf.length !== 11 ||
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999"
    ) {
      return "CPF inválido.";
    }

    soma = 0;

    for (i = 1; i <= 9; i++) {
      soma += Math.floor(cpf.charAt(i - 1)) * (11 - i);
    }

    resto = 11 - (soma - Math.floor(soma / 11) * 11);

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== Math.floor(cpf.charAt(9))) {
      return "CPF inválido.";
    }

    soma = 0;

    for (i = 1; i <= 10; i++) {
      soma += cpf.charAt(i - 1) * (12 - i);
    }

    resto = 11 - (soma - Math.floor(soma / 11) * 11);

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== Math.floor(cpf.charAt(10))) {
      return "CPF inválido.";
    }

    return true;
  }

  cpfOrCnpj(s) {
    if (!s) {
      return true;
    }

    if (s.length <= 14) {
      return this.cpf(s);
    } else {
      return this.cnpj(s);
    }
  }

  date(format) {
    return function (val) {
      if (!val) {
        return true;
      }

      if (val.length < format.length) {
        return "Data inválida.";
      }

      const date = moment(val, format).format("YYYY-MM-DD[T]HH:mm:ss");

      if (date === "Invalid date") {
        return "Data inválida.";
      }

      return true;
    };
  }

  email(email) {
    if (!email) {
      return true;
    }

    const msgError = "E-mail inválido";
    const indexOf = email.indexOf("@");

    if (indexOf === -1) {
      return msgError;
    }

    const subEmail = email.substring(indexOf + 1);

    if (!subEmail.length) {
      return msgError;
    }

    return true;
  }

  maxLength(maxLength) {
    return function (val) {
      return (
        !val ||
        val.length <= maxLength ||
        "Tamanho máximo de ".concat(maxLength, " excedido.")
      );
    };
  }

  notBlankIf(condition) {
    return function (val) {
      return (
        !condition ||
        typeof val == "number" ||
        !_.isEmpty(val) ||
        "Preenchimento obrigatório."
      );
    };
  }

  notBlank(val) {
    return (
      typeof val == "number" || !_.isEmpty(val) || "Preenchimento obrigatório."
    );
  }

  rg(rg) {
    if (!rg) {
      return true;
    }

    const valoresRepetidos = /^\b(\d|\w)\1{5,}\b$/g;

    if (valoresRepetidos.test(rg)) {
      return "RG inválido.";
    }

    const valoresCrescentes = /^(01234|12345|23456|34567|45678|56789)$/g;

    if (valoresCrescentes.test(rg)) {
      return "RG inválido.";
    }

    const valoresDecrescente = /^(98765|87654|76543|65432|54321|43210)$/g;

    if (valoresDecrescente.test(rg)) {
      return "RG inválido.";
    }

    const value = rg.replace(/[^a-zA-Z0-9]/g, "");

    if (value.length < 5) {
      return "RG inválido.";
    }
  }

  telefone(telefone) {
    if (!telefone) {
      return true;
    }

    const cleanNumber = telefone.replace(/[^\d]/g, "");

    if (cleanNumber.length > 11 || cleanNumber.length < 10) {
      return "Telefone inválido.";
    }

    return true;
  }

  maxVal(maxValue) {
    return function (value) {
      maxValue = Big(maxValue);
      value = parseFloat(value);
      const toNumber = Big(value);
      const isValid = toNumber.lte(maxValue);

      if (!isValid) {
        return "O valor deve ser menor ou igual a ".concat(
          FilterUtils.money(maxValue),
          "."
        );
      }
    };
  }

  maxMoneyVal(maxValue) {
    return function (value) {
      maxValue = Big(maxValue);
      value = this.reverseFormatNumber(value, "pt-BR");
      const toNumber = Big(value);
      const isValid = toNumber.lte(maxValue);

      if (!isValid) {
        return "O valor deve ser menor ou igual a ".concat(
          FilterUtils.money(maxValue),
          "."
        );
      }
    };
  }

  dateBorn(value, minAge = 18) {
    return (
      moment(value, "YYYY/DD/MM").isBefore(
        moment().subtract(minAge, "years")
      ) || `Deve ser maior de ${minAge} anos.`
    );
  }

  minVal(minValue) {
    return function (value) {
      value = FilterUtils.formatDecimal(value);
      const toNumber = parseFloat(value);
      const isNaN = Number.isNaN(toNumber);
      const isValid = !isNaN && toNumber >= minValue;

      if (!isValid) {
        return "O valor deve ser maior ou igual a ".concat(minValue, ".");
      }
    };
  }

  equal(equalFor, msg = "As senhas informadas são diferentes") {
    return function (value) {
      if (equalFor !== value) {
        return msg;
      }
    };
  }

  reverseFormatNumber(val, locale) {
    const group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, "");
    const decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, "");
    let reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
    reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
    return Number.isNaN(reversedVal) ? 0 : reversedVal;
  }
}
