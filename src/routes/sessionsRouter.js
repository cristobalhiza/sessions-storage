import { Router } from 'express';
import { UsuariosManagerMongo as UsuariosManager } from '../dao/usuariosManagerMONGO.js';
import crypto from 'crypto'
import { config } from '../config/config.js';
export const router=Router()

router.post('/registro',async(req,res)=>{
    let {nombre, email, password} =req.body
    if(!nombre||!email||!password){
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({error:'Complete los datos'})
    }
    //validaciones
    try {
        let existe=await UsuariosManager.getBy({email})
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Ya existe un usuario con email ${email}`})
        }
        
        password=crypto.createHmac('sha256', config.SECRET).update(password).digest('hex')

        let nuevoUsuario=await UsuariosManager.create({nombre, email, password})

        res.setHeader('Content-Type','application/json')
        res.status(201).json({mensaje: 'Registro exitoso', nuevoUsuario})

    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }
})