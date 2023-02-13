// This is just an example,
// so you can safely delete all default props below

export default {
  register: {
    page_tile: "Cadastrar",
    name: "Nome",
    user_name: "Username",
    email: "E-mail",
    password: "Senha",
    repeat_password: "Repetir senha",
    register: "Cadastrar-se",
    already_have_an_account: "Já possui uma conta?",
    to_login: "Entrar",
    send: "Cadastrar",
  },
  login: {
    page_tile: "Login",
    name: "Nome",
    password: "Senha",
    login: "Login",
    dont_have_an_account: "Não possui conta?",
    to_register: "Registrar",
  },
  failed: "Ação falhada",
  success: "Ação realizada com sucesso",
  form: {
    error: "Existem erros no formulário, revise-o salve novamente.",
  },
  axios: {
    404: "Endpoint não encontrado",
  },
  socket: {
    success: "[WebSocket] Conexão com o sensor feita com websocket!",
    error: "[WebSocket] Erro no servidor websocket!",
    close: "[WebSocket] Websocket desconectado do servidor!",
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
      title: "Registrar",
      caption: "Para registro",
    },
    profile: {
      title: "Perfil",
      caption: "Visualizar perfil",
    },
  },
  main: {
    logout: "Realmente deseja sair?",
    yes: "Sim",
    no: "Não",
  },
  validators: {
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
