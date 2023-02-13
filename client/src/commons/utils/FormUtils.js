import { Notify } from "quasar";

export default new (class FormUtils {
  //Validação
  validate(form, callback, callbackError) {
    return form.validate().then((data) => {
      if (data) {
        callback();
      } else {
        this.showFormError();
        callbackError && callbackError();
      }
    });
  }

  //Validação assincrona / para try catch
  validateAsync(form) {
    return new Promise((resolve, reject) => {
      form
        .validate()
        .then((data) => {
          if (data) {
            resolve();
          } else {
            this.showFormError();
            reject();
          }
        })
        .catch(reject);
    });
  }

  //Mensagem
  showMessage(message) {
    Notify.create({
      message,
      textColor: "white",
    });
  }

  //Mensagem de error
  showErrorMsg(message) {
    Notify.create({
      message,
      textColor: "white",
      color: "negative",
      icon: "priority_high",
    });
  }

  //Mensagem de sucesso
  showSuccessMsg(message) {
    Notify.create({
      message: message,
      textColor: "white",
      color: "positive",
      icon: "check",
    });
  }

  //Mensagem de error padrão de formulario
  showFormError(
    message = "Existem erros no formulário, revise-o salve novamente."
  ) {
    this.showErrorMsg(message);
  }
})();
