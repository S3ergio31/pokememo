const buildState = (state, action) => ({
    ...state,
    ronda: getRonda(state),
    juego_ganado: juegoFueGanado(state, action),
    juego_terminado: juegoFueTerminado(state, action),
    seleccionados: getSeleccionados(state),
    encontrados: getEncontrados(state, action),
    incorrectos: getIncorrectos(state, action),
    parFueSeleccionado: parFueSeleccionado(state)
});

const parFueSeleccionado = state => state.seleccionados.length === 2;

const getRonda = state => parFueSeleccionado(state) ? state.ronda + 1 : state.ronda;

const juegoFueGanado = (state, action) => getEncontrados(state, action).length === state.pokemons.length / 2

const juegoFueTerminado = (state, action) => juegoFueGanado(state, action);

const getSeleccionados = state => parFueSeleccionado(state) ? [] : state.seleccionados;
    
const getEncontrados = (state, action) => {
    const coincideConLosSeleccionados = state.seleccionados.every(p => p.equals(action.payload));
    if(parFueSeleccionado(state) && coincideConLosSeleccionados){
        return [...state.encontrados, action.payload];
    }
    return [...state.encontrados];
}

const getIncorrectos = (state, action) => {
    const noCoincideConAlgunoSeleccionado = state.seleccionados.some(p => !p.equals(action.payload));
    if(!parFueSeleccionado(state)){
        return [];
    }
    if(parFueSeleccionado(state) && noCoincideConAlgunoSeleccionado){
        return [...state.seleccionados];
    }
    return [...state.incorrectos]
}

export default buildState;