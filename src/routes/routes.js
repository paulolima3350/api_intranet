const multer = require('multer'); // Importa o Multer, uma biblioteca para manipulação de uploads de arquivos.

const multerConfigImagensNoticias = require('../config/multerImagensNoticias'); // Configuração para upload de imagens relacionadas a notícias.
const multerConfigArquivosNoticias = require('../config/multerArquivosNoticias'); // Configuração para upload de arquivos relacionados a notícias.
const multerConfigImagensProcedimentos = require('../config/multerImagensProcedimentos'); // Configuração para upload de imagens relacionadas a procedimentos.
const multerConfigArquivosProcedimentos = require('../config/multerArquivosProcedimentos'); // Configuração para upload de arquivos relacionados a procedimentos.
const multerConfigArquivosEdicaoProcedimentos = require('../config/multerArquivosEdicaoProcedimentos'); // Configuração para upload de arquivos para edição de procedimentos.
const multerConfigImagensEdicaoProcedimentos = require('../config/multerImagensEdicaoProcedimentos'); // Configuração para upload de imagens para edição de procedimentos.
const multerConfigArquivosEdicaoNoticias = require('../config/multerArquivosEdicaoNoticias'); // Configuração para upload de arquivos para edição de notícias.
const multerConfigImagensEdicaoNoticias = require('../config/multerImagensEdicaoNoticias'); // Configuração para upload de imagens para edição de notícias.

const jwt = require('jsonwebtoken'); // Importa o JSON Web Token para gerenciar autenticação baseada em tokens.

function verificaToken(req, res, next) {
    const token = req.cookies.intranet_user_token; // Obtém o token do cookie 'intranet_user_token'.

    const tokenDecodificado = jwt.verify(token, process.env.CHAVE_JWT, function(err, decoded) {
        return decoded; // Decodifica e valida o token.
    });

    if (tokenDecodificado) {
        return next(); // Se o token for válido, passa para o próximo middleware.
    } else {
        return res.status(401).send("ID da sessão inválido!"); // Caso contrário, retorna um erro de autenticação.
    }
}

const procedimentosDAO = require('../DAO/IntranetDAO'); // Importa o DAO responsável por operações relacionadas a procedimentos.

const ProcedimentosController = require('../controllers/procedimentos/procedimentosController'); // Importa o controlador para gerenciar ações relacionadas a procedimentos.

const NoticiasController = require('../controllers/noticias/noticiasController'); // Importa o controlador para gerenciar ações relacionadas a notícias.
const UsuariosController = require('../controllers/usuarios/usuariosController'); // Importa o controlador para gerenciar ações relacionadas a usuários.

const router = require('express').Router(); // Cria uma instância de roteador do Express.

// Rotas GET

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Autenticar o usuário.
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso.
 */
router.get('/login', procedimentosDAO.autenticaUsuario);

/**
 * @swagger
 * /colaboradores:
 *   get:
 *     summary: Retornar dados de colaboradores.
 *     responses:
 *       200:
 *         description: Lista de colaboradores retornada com sucesso.
 */
router.get('/colaboradores', procedimentosDAO.retornaColaboradores);

/**
 * @swagger
 * /procedimentos:
 *   get:
 *     summary: Retornar dados de procedimentos.
 *     responses:
 *       200:
 *         description: Lista de procedimentos retornada com sucesso.
 */
router.get('/procedimentos', ProcedimentosController.retornaProcedimentos);

/**
 * @swagger
 * /schoolbudgets:
 *   get:
 *     summary: Retornar dados orçamentários escolares.
 *     responses:
 *       200:
 *         description: Dados retornados com sucesso.
 */
router.get('/schoolbudgets', procedimentosDAO.retornaSchoolBudgets);

/**
 * @swagger
 * /noticias:
 *   get:
 *     summary: Retornar notícias.
 *     responses:
 *       200:
 *         description: Notícias retornadas com sucesso.
 */
router.get('/noticias', NoticiasController.retornaNoticias);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Realizar logout.
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso.
 */
router.get('/logout', procedimentosDAO.logout);

// Rotas POST
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Validar um usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "usuario"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Usuário validado com sucesso.
 */
router.post('/users', procedimentosDAO.validaUsuario);

/**
 * @swagger
 * /retornaDepartamentoHibrido:
 *   post:
 *     summary: Retornar departamentos híbridos.
 *     responses:
 *       200:
 *         description: Departamentos retornados com sucesso.
 */
router.post('/retornaDepartamentoHibrido', UsuariosController.retornaDepartamentos);

/**
 * @swagger
 * /retornaAniversariante:
 *   post:
 *     summary: Retornar aniversariantes.
 *     responses:
 *       200:
 *         description: Aniversariantes retornados com sucesso.
 */
router.post('/retornaAniversariante', UsuariosController.retornaAniversariante);

/**
 * @swagger
 * /insereDataNascimento:
 *   post:
 *     summary: Inserir data de nascimento.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 123
 *               dataNascimento:
 *                 type: string
 *                 example: "2000-01-01"
 *     responses:
 *       200:
 *         description: Data de nascimento inserida com sucesso.
 */
router.post('/insereDataNascimento', UsuariosController.insereDataDeNascimento);

// Rotas PATCH
/**
 * @swagger
 * /editaProcedimentos:
 *   patch:
 *     summary: Editar procedimentos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 123
 *               nome:
 *                 type: string
 *                 example: "Novo nome do procedimento"
 *     responses:
 *       200:
 *         description: Procedimento editado com sucesso.
 */
router.patch('/editaProcedimentos', ProcedimentosController.editarProcedimentos);

/**
 * @swagger
 * /desabilitaProcedimentos:
 *   patch:
 *     summary: Desabilitar procedimentos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 123
 *     responses:
 *       200:
 *         description: Procedimento desabilitado com sucesso.
 */
router.patch('/desabilitaProcedimentos', ProcedimentosController.desabilitaProcedimentos);


module.exports = router; // Exporta o roteador para ser utilizado em outros lugares da aplicação.
