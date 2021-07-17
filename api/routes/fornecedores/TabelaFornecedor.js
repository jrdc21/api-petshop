const Modelo = require('./ModeloTabelaFornecedor');
const NaoEncontrado = require('../../errors/NaoEncontrado'); 

module.exports = {
  listar() {
    return  Modelo.findAll({raw: true});
  },
  inserir(fornecedor) {
    return Modelo.create(fornecedor);
  },
  async buscarPorId(id) {
    const encontrado = await Modelo.findOne({
      where: {
        id: id
      }
    });

    if (!encontrado) {
      throw new NaoEncontrado();
    }

    return encontrado;
  },
  atualizar(id, dados) {
    return Modelo.update(
      dados,
      {
        where: { id: id }
      }
    );
  },
  remover(id) {
    return Modelo.destroy({
      where: { id: id}
    })
  }
}