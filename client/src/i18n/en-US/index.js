// This is just an example,
// so you can safely delete all default props below

export default {
  register: {
    page_tile: "Register",
    name: "Name",
    user_name: "Username",
    email: "E-mail",
    password: "Password",
    repeat_password: "Repeat password",
    register: "Register",
    already_have_an_account: "Already have an account?",
    to_login: "Login",
    send: "Register",
  },
  login: {
    page_tile: "Login",
    user_name: "Username",
    password: "Password",
    login: "Login",
    dont_have_an_account: "Don't have an account?",
    to_register: "Register",
  },
  failed: "Action failed",
  success: "Action was successful",
  form: {
    error: "There are errors in the form, please review and save again.",
  },
  axios: {
    404: "Endpoint not found",
  },
  socket: {
    success: "[WebSocket] Connection to the sensor made with websocket!",
    error: "[WebSocket] Error on websocket server!",
    close: "[WebSocket] Websocket disconnected from server!",
  },
  menu: {
    home: {
      title: "Home",
      caption: "Tela inicial",
    },
    login: {
      title: "Login",
      caption: "Para logar",
    },
    register: {
      title: "Register",
      caption: "Register user",
    },
    profile: {
      title: "Profile",
      caption: "View profile",
    },
  },
  main: {
    logout: "Realmente deseja sair?",
    yes: "Yes",
    no: "No",
  },
  validation: {
    cep: "CEP inválido",
    cnpj: "CNPJ inválido",
    cpf: "CPF inválido",
    rg: "RG inválido",
    date: "Data inválida",
    email: "E-mail inválido",
    max_i: "Tamanho máximo de ",
    max_f: "E-mail inválido",
    mandatory: "Preenchimento obrigatório",
    phone: "Telefone inválido",
    max_val: "O valor deve ser menor ou igual a ",
    min_val: "O valor deve ser maior ou igual a ",
    max_money_val: "O valor deve ser menor ou igual a ",
    equal: "As senhas informadas são diferentes",
    born_i: "Deve ser maior de ",
    born_f: "anos",
  },
};
