const router = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor;
const routerProdutos = require('./produtos');

router.options('/', (req, res) =>{
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.end();
});

router.get('/', async (req, res) => {
  const results = await TabelaFornecedor.listar();
  const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'), ['empresa']);
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
    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'), ['empresa']);
    res.send(
      serializador.serializar(fornecedor)
    );
  } catch(e) {
    prox(e);
  }
});

router.options('/:id', (req, res) =>{
  res.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.end();
});

router.get('/:id', async (req, res, prox) => {
  try {
    const id = req.params.id;
    const fornecedor = new Fornecedor({id: id});
  
    await fornecedor.buscar();
    const camposExtras = ['empresa', 'email', 'dataCriacao', 'dataAtualizacao', 'versao'];
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

const verificarFornecedor = async (req, res, prox) => {
  try {
    const id = req.params.idFornecedor;
    const fornecedor = new Fornecedor({id: id});
    await fornecedor.buscar();
    req.fornecedor = fornecedor;
    prox();
  } catch(e) {
    prox(e);
  }
};

router.use('/:idFornecedor/produtos', verificarFornecedor, routerProdutos);

module.exports = router;