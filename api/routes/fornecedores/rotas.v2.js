const router = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor;
const routerProdutos = require('./produtos');

router.options('/', (req, res) =>{
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.end();
});

router.get('/', async (req, res) => {
  const results = await TabelaFornecedor.listar();
  const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));
  res.send(
    serializador.serializar(results)
  );
});


module.exports = router;