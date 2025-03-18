const pool = require("../config/db");

const Produto = {
    async criarProduto({ nomeProduto, tipo, preco }) {
        const query = `
            INSERT INTO produtos (nomeProduto, tipo, preco)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const valores = [nomeProduto, tipo, preco];
        const { rows } = await pool.query(query, valores);
        return rows[0];
    },

    async listarProdutos() {
        const { rows } = await pool.query("SELECT * FROM produtos;");
        return rows;
    },

    async buscarProdutoPorId(id) {
        const { rows } = await pool.query("SELECT * FROM produtos WHERE id = $1;", [id]);
        return rows[0];
    },

    async atualizarProduto(id, dados) {
        const campos = Object.keys(dados).map((key, index) => `${key} = $${index + 1}`).join(", ");
        const valores = Object.values(dados);
        valores.push(id);

        const query = `UPDATE produtos SET ${campos} WHERE id = $${valores.length} RETURNING *;`;
        const { rows } = await pool.query(query, valores);
        return rows[0];
    },

    async deletarProduto(id) {
        await pool.query("DELETE FROM produtos WHERE id = $1;", [id]);
        return { message: "Produto deletado com sucesso" };
    },
};

module.exports = Produto;
