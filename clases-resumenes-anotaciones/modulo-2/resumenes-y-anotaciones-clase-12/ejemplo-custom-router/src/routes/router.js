// Primero, definir en nuestra carpeta routes una clase router.js. Ésta contendrá la clase principal de todo nuestro router.

// Éste tendrá como propiedad interna el router de express inicializado.

import { Router } from "express";

export default class CustomRouter{
    constructor(){
        this.router = Router();
        this.init();
    };
    
    getRouter(){
        return this.router;
    };

    init(){} // Esta inicializacion sera para sus clases heredadas

    // generateCustomResponses es una función que agregará al objeto res, métodos adicionales de envío de información, donde seteamos status específicos, cuerpos específicos e intenciones específicas. 
    generateCustomResponses = (req, res, next) => {
        // sendSuccess permitira que el desarrollador solo tenga que enviar el payload, el formato se gestionara de manera interna
        res.sendSuccess = (payload) => res.send({ status: "success", payload });

        res.sendServerError = (error) => res.status(500).send({ status: "error", error });

        res.sendUserError = (error) => res.status(400).send({ status: "error", error });

        next();
    };

    // Al final, nuestros métodos principales de router quedarán homologados con las respuestas correspondientes y podremos utilizar en nuestro router la respuesta directamente.
    get(path, ...callbacks){
        this.router.get(path, this.generateCustomResponses, this.applyCallbacks(callbacks));
    };

    post(path, ...callbacks){
        this.router.post(path, this.generateCustomResponses, this.applyCallbacks(callbacks));
    };

    put(path, ...callbacks){
        this.router.put(path, this.generateCustomResponses, this.applyCallbacks(callbacks));
    };

    delete(path, ...callbacks){
        this.router.delete(path, this.generateCustomResponses, this.applyCallbacks(callbacks));
    };
    
    // Ahora, necesitamos una función que procese todas las funciones internas del router (middlewares y el callback principal). Lo llamaremos “applyCallbacks”

    applyCallbacks(callbacks){
        // Mapearemos los callbacks uno a uno, obteniendo sus parametros a partir de ...
        return callbacks.map((callback) => async (...params) => {
            try{
                // apply ejecutara la funcion callback apuntando directamente a una instancia de la clase, por ello, colocamos this para que se utilice solo en el contexto de este router,los parametros son internos de cada callback, sabemos que los params de un callback corresponden a req, res, next
                await callback.apply(this, params);
            }catch(err){
                console.error(err);
                // params[1] hace referencia a res, por ello, puedo mandar un send desde este.
                params[1].status(500).send(err);
            };
        });
    };

};