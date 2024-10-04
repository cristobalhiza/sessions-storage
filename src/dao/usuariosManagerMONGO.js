import { usuariosModelo } from "./models/usuarios.model.js";
import { config } from '../config/config.js'
import crypto from 'crypto'


export class UsuariosManagerMongo{

    static async create(usuario){
        let nuevoUsuario=await usuariosModelo.create(usuario);
        return nuevoUsuario.toJSON();
    }
    static async getBy(filtro){
        return await usuariosModelo.findOne(filtro).lean()
    }
    static cifrarPassword(password) {
        return crypto.createHmac('sha256', config.SECRET).update(password).digest('hex');
    }
    static async crearAdminInicial() {
        try {
            const adminExistente = await usuariosModelo.findOne({ email: 'adminCoder@coder.com' }).lean();
            if (!adminExistente) {
                const admin = {
                    nombre: 'admin',
                    email: 'adminCoder@coder.com',
                    password: this.cifrarPassword('adminCod3r123'),
                    rol: 'admin'
                };
                await usuariosModelo.create(admin);
                console.log('Usuario administrador creado con éxito.');
            } else {
                console.log('El usuario administrador ya existe.');
            }
        } catch (error) {
            console.error('Error al crear el usuario administrador:', error);
        }
    }
}