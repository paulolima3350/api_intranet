const UsuariosService = require("../../services/usuarios/usuariosService");


class UsuariosController {

    static async retornaAniversariante(req, res) {

        const usuario = parseInt(req.body.matricula);

        const sql = `SELECT usuarios.nomeusuario, usuarios.matricula, usuarios.id_departamento, usuarios_intranet.idperfilusuario, usuarios_intranet.tagSetor, usuarios_intranet.dataNascimento FROM (usuarios
            INNER JOIN usuarios_intranet ON usuarios.matricula = usuarios_intranet.matricula) WHERE usuarios.matricula = ${usuario} AND usuarios.ativo = 1`;

        await UsuariosService.serviceAniversarianteMes(res, sql);

    }

    static async insereDataDeNascimento(req, res) {

        const matricula = req.body.matricula;
        const dataNascimento = req.body.dataNascimento;

        const sql = `UPDATE usuarios_intranet SET dataNascimento = '${dataNascimento}' WHERE matricula = ${matricula}`;

        await UsuariosService.serviceInsereDataDeNascimento(res, sql)
    }

    static async retornaDepartamentos(req, res) {

        let departamentosUsuario = req.body.departamentos;

        let user_departments = departamentosUsuario.split(';');

        const sql = `SELECT * FROM departamentos WHERE iddepartamento IN ('${user_departments[0]}', '${user_departments[1]}')`;

        await UsuariosService.serviceDepartamentoHibrido(res, sql);

    }

}
module.exports = UsuariosController;