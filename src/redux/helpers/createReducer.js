export default function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        // o que é esse handler? ele pode/deve ser a função
        // que vai manipular o estado antigo
        // aqui embaixo ele pergunta se dentra do handler
        // 'existe' aquele tipo de ação(action.type) que é
        // uma string e define o tipo de ação.
        if (handlers.hasOwnProperty(action.type)) {
            // isso aqui faz algo parecido com o switch - case
            // ou seja, dentro das propriedades do handler
            // deve ter um metodo para a ação action.type
            // (a string definida no action.type)
            // Dai ele seleciona aquele caso e passa o estado
            // e ação, e o handler calcula.
            return handlers[action.type](state, action);
        }
        return state;
    }
}