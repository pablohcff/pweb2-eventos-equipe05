import { EventosDatabase } from "../database/eventosDataBase.js";

const db = new EventosDatabase();

function verificaListaVazia(array) {
    return array.length == 0;
}

class EventosController {

    static async getAllEvents(req, res, next) {
        try {
            const eventos = db.listarTodos();
            res.json(eventos);
        } catch (err) {
            next(err);
        }
    }

}

export { EventosController };