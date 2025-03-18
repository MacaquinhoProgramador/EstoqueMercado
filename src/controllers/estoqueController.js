const estoque = require('../models/estoqueModel');

async function criarProduto(req, res) {
    const { nomeProduto, tipo, preco } = req.body;
    try {
        const novoProduto = new Produto({
            nomeProduto,
            tipo,
            preco
        })
        const produtoSalvo = await novoProduto.save();
        res.status(201).json({ mensagem: "Produto cadastrado com sucesso.", produto: produtoSalvo});
    } catch (error) {
        res.status(500).json({ mensagem: "Erro 500.", erro: erro.message });
    }
}

async function listarProdutos(req, res) {
    try {
        const listarprodutos = await produto.find();
        res.status(201).json(listarprodutos);
    } catch (error) {
        console.error("erro ao obter a lista de produtos!", error);
        throw error
        
    }
}

