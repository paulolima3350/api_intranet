require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env para a aplicação. Isso permite usar valores como process.env.port e process.env.CHAVE_JWT diretamente no código.
const express = require('express'); // Importa o framework Express.
const router = require('./routes/routes.js'); // Importa o roteador configurado em routes.js, que define as rotas da aplicação.
const conn = require('./BD/config'); // Importa a configuração do banco principal.
const conn02 = require('./BD/config02'); // Importa a segunda configuração do banco.
const bodyParser = require('body-parser'); // Importa o body-parser, uma biblioteca para analisar o corpo das requisições HTTP. Ele facilita o processamento de dados enviados via POST.
var cookieParser = require('cookie-parser'); // Importa o cookie-parser, que permite que o servidor manipule cookies.
var expressSession = require('express-session'); // Importa o express-session, que gerencia sessões do lado do servidor.
const swaggerUi = require('swagger-ui-express');

const expressOasGenerator = require('express-oas-generator');
const openApiDocumentation = require('./config/swagger.js');



const app = express(); // Inicializa a aplicação Express, que será usada para configurar e gerenciar rotas, middlewares e outros recursos.

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

expressOasGenerator.init(app, {});

const port = process.env.port; // Define a porta que o servidor irá operar, baseada na variável de ambiente "port" do arquivo .env.

conn02.init(); // Inicializa a segunda conexão com o banco de dados, configurada no arquivo config02.

process.env.NODE_ENV === 'production' ? conn.init() : ''; // Condicionalmente inicializa a conexão principal do banco de dados (conn) apenas se o ambiente (NODE_ENV) for "production".

const expirationTime = 1000 * 300; // Define o tempo de expiração (300 segundos ou 5 minutos) como uma constante. Pode ser usado para sessões ou cookies.

app.use(cookieParser()); // Habilita o uso de cookies na aplicação.
app.use(expressSession({ // Configura sessões no Express.
  secret: process.env.CHAVE_JWT, // Define uma chave secreta para assinar sessões.
  saveUninitialized: false, // Define que novas sessões não serão salvas automaticamente.
  resave: false, // Define que sessões não serão salvas novamente se não tiverem mudanças.
  name: 'intranet' // Define o nome do cookie de sessão.
}));

app.use(express.json()); // Middleware para analisar requisições JSON. Necessário para trabalhar com APIs modernas.
app.use(bodyParser.urlencoded({ extended: true })); // Configura o body-parser para analisar dados enviados via formulário (application/x-www-form-urlencoded).

// Configura o CORS (Cross-Origin Resource Sharing) para permitir que clientes de outras origens acessem a API.
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN); // Permite requisições de um domínio específico configurado na variável de ambiente.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // Define quais métodos HTTP são permitidos.
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization'); // Especifica os cabeçalhos permitidos, incluindo 'Authorization' para autenticação.
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Permite o uso de cookies e sessões em requisições de origens diferentes.
  next(); // Passa a execução para o próximo middleware.
});

app.use('/', router); // Configura o roteador importado para que todas as rotas definidas em routes.js sejam acessadas com o prefixo "/app".

app.listen(port, () => console.log(`Servidor operando na porta ${port}`)); // Inicia o servidor na porta configurada e exibe uma mensagem no console indicando que o servidor está operando corretamente.
