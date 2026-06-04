// script.js

export const removerTransacao = (lista, id) => {
    return lista.filter(item => item.id !== id);
};

export const calcularSaldo = (lista) => {

    const total = lista.reduce((acumulador, item) => {

        const valorNumerico = parseFloat(item.valor.replace(',', '.')) || 0;

        if (item.tipo === 'entrada') {
            return acumulador + valorNumerico;
        } else {
            return acumulador - valorNumerico;
        }
    }, 0);
    return total.toLocaleString('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    });
};