import { EventosDatabase } from "../database/eventosDataBase.js";

const db = new EventosDatabase();

class EventosController {

    static async listarEventos(req,res,next){
        try{
            let eventos = db.listarTodos()
            if(eventos.length === 0){
                return res.status(404).json({message: "Nenhum evento cadastrado"})
            }
            res.json(eventos)
        }catch(err){
            next(err)
        }
    }

    static async listarEventosPorId(req,res,next){
        try{
            const id = parseInt(req.params.id)
            const eventos = db.listarTodos() || []

            const evento = eventos.find(e=>e.id === id);

            if(!evento){
                res.status(404).json({message: `Evento de id: ${id} não encontrado`})
            }
            res.json(evento)
        }catch(err){
            next(err)
        }
    }

    static async criarEvento(req, res, next) {
        try {
            const novoEvento = db.inserir(req.body);
            res.status(201).json(novoEvento);
        } catch (error) {
            next(error);
        }
    }
    static async atualizarEvento(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const evento = db.buscarPorId(id);

        if (!evento) {
            return res.status(404).json({ error: `Evento de id: ${id} não encontrado` });
        }

        const eventoAtualizado = db.atualizar(id, req.body);
        res.json(eventoAtualizado);
    } catch (err) {
        next(err);
    }
}

    static async getAllEvents(req, res, next) {
        try {
            let eventos = db.listarTodos();
            const vagasMin = parseInt(req.query.vagasMin);
            if (!isNaN(vagasMin)) {
                eventos = eventos.filter(e => e.vagasDisponiveis >= vagasMin);
            }
            res.json(eventos);
        } catch (err) {
            next(err);
        }
    }

    static async cancelarEvento(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const evento = db.buscarPorId(id);
            if (!evento) {
                return res.status(404).json({ error: "Evento não encontrado" });
            }
            db.atualizar(id, { ativo: false });
            res.json({ message: "Evento cancelado com sucesso" });
        } catch (err) {
            next(err);
        }
    }

    static async inscricaoEvento(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const evento = db.buscarPorId(id);
            if (!evento) {
                return res.status(404).json({ error: "Evento não encontrado" });
            }
            if (!evento.ativo) {
                return res.status(400).json({ error: "Evento está cancelado" });
            }
            if (evento.vagasDisponiveis <= 0) {
                return res.status(400).json({ error: "Não há vagas disponíveis" });
            }
            db.reduzirVaga(id);
            res.json({ message: "Inscrição realizada com sucesso" });
        } catch (err) {
            next(err);
        }
    }
}

export { EventosController };