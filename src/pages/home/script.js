// script.js

export const removerTransacao = (lista, id) => {
    return lista.filter(item => item.id !== id);
};

export const calcularSaldo = (lista) => {
    // .reduce percorre a lista e acumula o valor total
    const total = lista.reduce((acumulador, item) => {
        // Converte a string do valor para número decimal
        const valorNumerico = parseFloat(item.valor.replace(',', '.')) || 0;

        if (item.tipo === 'entrada') {
            return acumulador + valorNumerico;
        } else {
            return acumulador - valorNumerico;
        }
    }, 0);

    // Retorna formatado como moeda brasileira (R$ 0,00)
    return total.toLocaleString('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    });
};