class EstoqueNegativo extends Error {
  constructor() {
    const mensagem = 'O estoque não pode ser um valor negativo!';
    super(mensagem);
    this.name = 'EstoqueNegativo';
    this.idErro = 4;
  }
}

module.exports = EstoqueNegativo;