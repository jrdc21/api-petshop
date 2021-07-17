const TabelaFornecedor = require('./TabelaFornecedor');
const CampoInvalido = require('../../errors/CampoInvalido');
const DadosNaoFornecidos = require('../../errors/DadosNaoFornecidos');

class Fornecedor {
  constructor({id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao}) {
    this.id = id;
    this.empresa = empresa;
    this.email = email;
    this.categoria = categoria;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.versao = versao;
  }

  async criar() {
    this.validar();
    const results = await TabelaFornecedor.inserir({
      empresa: this.empresa,
      email: this.email,
      categoria: this.categoria
    });

    this.id = results.id;
    this.dataCriacao = results.dataCriacao;
    this.dataAtualizacao = results.dataAtualizacao;
    this.versao = results.versao;
  }

  async buscar() {
    const results = await TabelaFornecedor.buscarPorId(this.id);

    this.empresa = results.empresa;
    this.email = results.email;
    this.categoria = results.categoria;
    this.dataCriacao = results.dataCriacao;
    this.dataAtualizacao = results.dataAtualizacao;
    this.versao = results.versao;
  }

  async atualizar() {
    await TabelaFornecedor.buscarPorId(this.id);
    const campos = ['empresa', 'email', 'categoria'];
    const dados = {}

    campos.forEach((campo) => {
      const valor = this[campo];

      if(typeof valor === 'string' && valor.length > 0) {
        dados[campo] = valor;
      }
    });

    if(Object.keys(dados).length === 0) {
      throw new DadosNaoFornecidos();
    }

    await TabelaFornecedor.atualizar(this.id, dados);
  }

  remover() {
    return TabelaFornecedor.remover(this.id);
  }

  validar() {
    const campos = ['empresa', 'email', 'categoria'];

    campos.forEach((campo) => {
      const valor = this[campo];

      if(typeof valor !== 'string' || valor.length === 0){
        throw new CampoInvalido(campo);
      }
    });
  }
}

module.exports = Fornecedor;