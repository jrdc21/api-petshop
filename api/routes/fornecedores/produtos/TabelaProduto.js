const Modelo = require('./ModeloTabelaProduto');
const instancia = require('../../../database');
const NaoEncontrado = require('../../../errors/NaoEncontrado');

module.exports = {
  listar(idFornecedor) {
    return Modelo.findAll({
      where: {
        fornecedor: idFornecedor
      },
      raw: true
    }); 
  },
  inserir(dados) {
    return Modelo.create(dados);
  },
  remover(id, idFornecedor) {
    return Modelo.destroy({
      where: {
        id: id,
        fornecedor: idFornecedor
      }
    });
  },
  async buscarPorId(id, idFornecedor) {
    const encontrado = await Modelo.findOne({
      where: {
        id: id,
        fornecedor: idFornecedor
      },
      raw: true
    });
    
    if(!encontrado) {
      throw new NaoEncontrado('Produto');
    }

    return encontrado;
  },
  atualizar(dadosDoProduto, dadosParaAtualizar) {
    return Modelo.update(
      dadosParaAtualizar,
      {
        where: dadosDoProduto
      }
    )
  },
  subtrair(id, idFornecedor, campo, quantidade){
    return instancia.transaction(async transacao => {
      const produto = await Modelo.findOne({
        where: {
          id: id,
          fornecedor: idFornecedor
        }
      });
      produto[campo] = quantidade;

      await produto.save();

      return produto;
    })
  }
};