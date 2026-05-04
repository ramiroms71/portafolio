const prisma = require('../config/prisma');

const getUsuarios = async (req, res, next) => { 
    try {
        const usuarios = await prisma.usuario.findMany({ 
            select: { id: true, nombre: true, email: true, createAt: true } 
        });
        res.json(usuarios); 
    } catch (error) {
        next(error);
    }
}

module.exports = { getUsuarios };