import CustomRouter  from "./router.js";

export default class UsersRouter extends CustomRouter{
    init(){
        // Nota que dentro de init realizamos la inicializacion de nuestras rutas, esto seria el quivalente de decir "router.get"
        this.get("/", (req, res) => {
            res.send("Hola, coders!");
        });
    };
};