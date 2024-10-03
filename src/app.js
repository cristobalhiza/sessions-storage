import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import session from 'express-session';

import {router as vistasRouter} from './routes/viewsRouter.js'
import { connDB } from './connDB.js';
import { config } from './config/config.js';

const PORT=config.PORT;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//estos dos middlewares sirven para procesar información compleja que llegue desde la request, desde el cliente
app.use(session({
    secret:config.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
}))

app.engine('handlebars', engine({
runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
},
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));

app.use(express.static(path.join(__dirname,'/public')));

app.use('/', vistasRouter)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).render('home');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

connDB()

