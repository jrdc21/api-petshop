const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const router = require('./routes/fornecedores');
const routerV2 = require('./routes/fornecedores/rotas.v2');
const NaoEncontrado = require('./errors/NaoEncontrado');
const CampoInvalido = require('./errors/CampoInvalido');
const DadosNaoFornecidos = require('./errors/DadosNaoFornecidos');
const ValorNaoSuportado = require('./errors/ValorNaoSuportado');
const EstoqueNegativo = require('./errors/EstoqueNegativo');
const formatosAceitos = require('./Serializador').formatosAceitos;
const SerializadorError = require('./Serializador').SerializadorError;

const app = express();
app.use(bodyParser.json());
app.use((req, res, prox) => {
  let formatoRequisitado = req.header('Accept');

  if(formatoRequisitado === '*/*') {
    formatoRequisitado = 'application/json';
  }
  
  if(formatosAceitos.indexOf(formatoRequisitado) === -1){
    res.status(406);
    res.end();
    return ;
  }

  res.setHeader('Content-Type', formatoRequisitado);
  prox();
});

app.use((req,res,prox) => {
  res.set('Access-Control-Allow-Origin', '*');
  prox();
});

app.use('/api/fornecedores/', router);
app.use('/api/v2/fornecedores/', routerV2);
app.use((e, req, res, prox) => {
  let status = 500;
  if(e instanceof NaoEncontrado) {
    status = 404;
  } 
  if(e instanceof CampoInvalido || e instanceof DadosNaoFornecidos || e instanceof EstoqueNegativo) {
    status = 400;
  }
  if(e instanceof ValorNaoSuportado) {
    status = 406;
  }
  const serializador = new SerializadorError(res.getHeader('Content-Type'));
  res.status(status);
  res.send(
    serializador.serializar({
      mensagem: e.message,
      id: e.idErro
    })
  )
})

app.listen(config.get('api.port'), () => console.log("API Running!"));