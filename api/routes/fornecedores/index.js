const router = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor;

router.get('/', async (req, res) => {
  const results = await TabelaFornecedor.listar();
  const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));
  res.send(
    serializador.serializar(results)
  );
});

router.post('/', async (req, res, prox) => {
  try {
    const dadosRecebidos = req.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
  
    await fornecedor.criar();
    res.status(201);
    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));
    res.send(
      serializador.serializar(fornecedor)
    );
  } catch(e) {
    prox(e);
  }
});

router.get('/:id', async (req, res, prox) => {
  try {
    const id = req.params.id;
    const fornecedor = new Fornecedor({id: id});
  
    await fornecedor.buscar();
    const camposExtras = ['email', 'dataCriacao', 'dataAtualizacao', 'versao'];
    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'), camposExtras);
    res.send(
      serializador.serializar(fornecedor)
    )
  } catch (e) {
    prox(e);
  }
});

router.put('/:id', async (req, res, prox) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const dados = Object.assign({}, body, {id: id});
    const fornecedor = new Fornecedor(dados);
  
    await fornecedor.atualizar();
    res.status(204);
    res.end();
  } catch(e) {
    prox(e);
  }
});

router.delete('/:id', async (req, res, prox) => {
  try {
    const id = req.params.id;
    const fornecedor = new Fornecedor({id: id});
    await fornecedor.buscar();
    await fornecedor.remover();
    res.status(204);
    res.end();
  } catch(e) {
    prox(e);
  }
});

module.exports = router;