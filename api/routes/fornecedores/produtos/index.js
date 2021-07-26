const router = require('express').Router({mergeParams: true});
const Tabela = require('./TabelaProduto');
const Produto = require('./Produto');
const Serializador = require('../../../Serializador').SerializadorProduto;

router.options('/', (req, res) =>{
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.end();
});

router.get('/', async (req, res) => {
  const produtos = await Tabela.listar(req.fornecedor.id);
  const serializador = new Serializador(res.getHeader('Content-Type'));
  res.send(
    serializador.serializar(produtos)
  );
});

router.post('/', async (req, res, prox) => {
  try {
    const idFornecedor = req.fornecedor.id;
    const body = req.body;
    const dados = Object.assign({}, body, {fornecedor: idFornecedor});
    const produto = new Produto(dados);
    await produto.criar();
    const serializador = new Serializador(res.getHeader('Content-Type'));
    res.set('ETag', produto.versao);
    const timestamp = (new Date(produto.dataAtualizacao)).getTime();
    res.set('Last-Modified', timestamp);
    res.set('Location', `/api/fornecedores/${produto.fornecedor}/produtos/${produto.id}`);
    res.send(
      serializador.serializar(produto)
    );
  } catch(e) {
    prox(e);
  }
});

router.options('/:id', (req, res) =>{
  res.set('Access-Control-Allow-Methods', 'DELETE, GET, HEAD, PUT');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.end();
});

router.delete('/:id', async (req,res) => {
  const dados = {
    id: req.params.id,
    fornecedor: req.fornecedor.id
  }

  const produto = new Produto(dados);
  await produto.apagar();
  res.end();
});

router.get('/:id', async (req, res, prox) => {
  try {
    const dados = {
      id: req.params.id,
      fornecedor: req.fornecedor.id
    }
  
    const produto = new Produto(dados);
    await produto.buscar();
    const camposExtras = ['preco', 'estoque', 'fornecedor', 'dataCriacao', 'dataAtualizacao', 'versao'];
    const serializador = new Serializador(res.getHeader('Content-Type'), camposExtras);
    res.set('ETag', produto.versao);
    const timestamp = (new Date(produto.dataAtualizacao)).getTime();
    res.set('Last-Modified', timestamp);
    res.send(
      serializador.serializar(produto)
    );
  } catch(e) {
    prox(e);
  }
});

router.head('/:id', async (req,res) => {
  try {
    const dados = {
      id: req.params.id,
      fornecedor: req.fornecedor.id
    }
  
    const produto = new Produto(dados);
    await produto.buscar();
    res.set('ETag', produto.versao);
    const timestamp = (new Date(produto.dataAtualizacao)).getTime();
    res.set('Last-Modified', timestamp);
    res.end();
  } catch(e) {
    prox(e);
  }
});

router.put('/:id', async (req, res, prox) => {
  try {
    const dados = Object.assign(
      {},
      req.body, 
      {id: req.params.id, fornecedor: req.fornecedor.id}
    );
     
    const produto = new Produto(dados);
    await produto.atualizar();
    await produto.buscar();
    res.set('ETag', produto.versao);
    const timestamp = (new Date(produto.dataAtualizacao)).getTime();
    res.set('Last-Modified', timestamp);
    res.end();
  } catch(e) {
    prox(e);
  }
});

router.options('/:id/reduzir-estoque', (req, res) =>{
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.end();
});

router.post('/:id/reduzir-estoque', async (req, res, prox) => {
  try {
    const produto = new Produto({
      id: req.params.id,
      fornecedor: req.fornecedor.id
    });
    await produto.buscar();
    produto.estoque = produto.estoque - req.body.quantidade;
    await produto.reduzirEstoque();
    await produto.buscar();
    res.set('ETag', produto.versao);
    const timestamp = (new Date(produto.dataAtualizacao)).getTime();
    res.set('Last-Modified', timestamp);
    res.end();
  } catch(e) {
    prox(e);
  }
});

module.exports = router;