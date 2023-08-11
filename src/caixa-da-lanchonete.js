class Item {
  constructor(nome, quantidade) {
    this.nome = nome;
    this.quantidade = quantidade;
  }
}

class Carrinho {
  constructor() {
    this.itens = [];
  }

  adicionarItem(item) {
    this.itens.push(item);
  }

  possuiItem(nome) {
    return this.itens.some((item) => item.nome === nome);
  }

  calcularTotal(cardapio) {
    let total = 0;
    for (const item of this.itens) {
      const product = cardapio[item.nome];
      const productTotalValue = product.valor * item.quantidade;
      total += productTotalValue;
    }
    return total;
  }
}

class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: { descricao: "Café", valor: 3.0 },
      chantily: { descricao: "Chantily", valor: 1.5 },
      suco: { descricao: "Suco Natural", valor: 6.2 },
      sanduiche: { descricao: "Sanduíche", valor: 6.5 },
      queijo: { descricao: "Queijo", valor: 2.0 },
      salgado: { descricao: "Salgado", valor: 7.25 },
      combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
      combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
    };

    this.formasDePagamento = ["dinheiro", "debito", "credito"];
  }

  produtoValido(nome) {
    return this.cardapio.hasOwnProperty(nome);
  }
  calcularValorDaCompra(formaDePagamento, itens) {
    if (!this.formasDePagamento.includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    const carrinho = new Carrinho();

    for (const item of itens) {
      const [nome, quantidade] = item.split(",");

      if (!this.produtoValido(nome)) {
        return "Item inválido!";
      }

      carrinho.adicionarItem(new Item(nome, parseInt(quantidade)));
    }

    let total = carrinho.calcularTotal(this.cardapio);

    if (
      (carrinho.possuiItem("chantily") && !carrinho.possuiItem("cafe")) ||
      (carrinho.possuiItem("queijo") && !carrinho.possuiItem("sanduiche"))
    ) {
      return "Item extra não pode ser pedido sem o principal";
    }

    if (total === 0) {
      return "Quantidade inválida!";
    }

    if (formaDePagamento === "dinheiro") {
      total *= 0.95; // Aplica desconto de 5% para pagamento em dinheiro
    } else if (formaDePagamento === "credito") {
      total *= 1.03; // Aplica acréscimo de 3% para pagamento a crédito
    }

    return `R$ ${total.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
