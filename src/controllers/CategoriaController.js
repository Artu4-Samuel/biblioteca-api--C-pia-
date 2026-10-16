
const categoriaService = require("../services/CategoriaService");

class CategoriaController {
    async create(req, res) {
        try {
            const categoria = await categoriaService.create(req.body);

            return res.status(201).json(categoria);
        } catch (erro) {
            if (
                erro.name === "SequelizeValidationError" ||
                erro.name === "SequelizeUniqueConstraintError"
            ) {
                return res.status(400).json({
                    erro: erro.errors?.[0]?.message || erro.message
                });
            }

            return res.status(400).json({
                erro: erro.message
            });
        }
    }

    async findAll(req, res) {
        try {
            const categorias = await categoriaService.findAll();

            return res.status(200).json(categorias);
        } catch (erro) {
            return res.status(500).json({
                erro: erro.message
            });
        }
    }

    async findById(req, res) {
        try {
            const categoria = await categoriaService.findById(req.params.id);

            return res.status(200).json(categoria);
        } catch (erro) {
            return res.status(404).json({
                erro: erro.message
            });
        }
    }

    async upDate(req, res) {
        try {
            const categoria = await categoriaService.upDate(
                req.params.id,
                req.body
            );

            return res.status(200).json(categoria);
        } catch (erro) {
            if (
                erro.name === "SequelizeValidationError" ||
                erro.name === "SequelizeUniqueConstraintError"
            ) {
                return res.status(400).json({
                    erro: erro.errors?.[0]?.message || erro.message
                });
            }

            return res.status(404).json({
                erro: erro.message
            });
        }
    }

    async delete(req, res) {
        try {
            await categoriaService.delete(req.params.id);

            return res.status(204).send();
        } catch (erro) {
            return res.status(404).json({
                erro: erro.message
            });
        }
    }
}

module.exports = new CategoriaController();
