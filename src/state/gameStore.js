import RecordsRepository from "lib/RecordsRepository";

const buildState = (state, action) => ({
    ...state,
    ronda: getRonda(state),
    win: isWin(state, action),
    game_over: isGameOver(state, action),
    seleccionados: getSeleccionados(state),
    encontrados: getEncontrados(state, action),
    incorrectos: getIncorrectos(state, action),
    parFueSeleccionado: parFueSeleccionado(state),
    new_record: calcularNuevoRecord(state),
    records: RecordsRepository.records
});

const parFueSeleccionado = state => state.seleccionados.length === 2;

const getRonda = state => parFueSeleccionado(state) ? state.ronda + 1 : state.ronda;

const isWin = (state, action) => getEncontrados(state, action).length === state.pokemons.length / 2

const isGameOver = state => state.win || state.fail;

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

const calcularNuevoRecord = state => {
    if(!state.ronda || !state.encontrados.length || state.new_record_saved) {
        return null;
    };

    try {
        return RecordsRepository.createRecord({
            rondas: state.ronda, 
            puntos: state.encontrados.length
        });
    }
    catch(error){
        return null;
    }
}

export default buildState;