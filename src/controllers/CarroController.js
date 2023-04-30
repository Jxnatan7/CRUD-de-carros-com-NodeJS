const CarroService = require("../services/CarroService")

module.exports = {
    buscarTodos: async (req, res) => {
        let json = {
            error: "",
            result: []
        }

        let carros = await CarroService.buscarTodos() //Buscando todos os carros no banco de dados

        for(let i in carros){ //Percorre todo o array de carros e coloca dentro do json
            json.result.push({
                codigo: carros[i].codigo,
                descricao: carros[i].modelo
            })
        }
        res.json(json)
    },
    
    buscarUm: async (req, res) => {
        let json = {error: "", result:{}}

        let codigo =  req.params.codigo
        let carro = await CarroService.buscarUm(codigo)

        if(carro) {
            json.result = carro
        }

        res.json(json)
    },

    cadastrar: async (req, res) => {
        let json = {error: "", result:{}}

        let modelo =  req.body.modelo
        let placa =  req.body.placa

        if(modelo && placa) {
            let CarroCodigo = await CarroService.cadastrar(modelo, placa)
            json.result = {
                codigo: CarroCodigo,
                modelo,
                placa
            }
        }
        else {
            json.error = "Campos não enviados"
        }

        res.json(json)
    },

    alterar: async(req, res) => {
        let json = {error:"", result:{}}

        let codigo = req.params.codigo
        let modelo = req.body.modelo
        let placa = req.body.placa

        if (codigo && modelo && placa){
            await CarroService.alterar(codigo, modelo, placa)
            json.result = {
                codigo,
                modelo,
                placa
            }
        }else{
            json.error = "Campos não enviados"
        }
        res.json(json)
    },

    deletar: async(req, res) => {
        let json = {error:"", result:{}}

        let codigo = req.params.codigo
        await CarroService.deletar(codigo)

        res.json(json)
    }
}