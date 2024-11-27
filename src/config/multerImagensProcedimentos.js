const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const diretorioImagens = `${process.env.PATH_IMAGEM_PROCEDIMENTOS_PRODUCAO}`;

module.exports = {
    dest: path.resolve(__dirname, diretorioImagens),
    storage: multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, path.resolve(__dirname, diretorioImagens));
        },
        filename: (req, file, cb) => {

            console.log(file);

            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err)

                const extensaoArquivo = file.mimetype.split('/');

                const nomeDoArquivo = `${hash.toString('hex')}.${extensaoArquivo[1]}`;

                cb(null, nomeDoArquivo);
            });
        }
    }),
    limits: {
        fileSize: 50 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpg',
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/svg+xml',
        ];

        if(allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'));
        }
    }
}