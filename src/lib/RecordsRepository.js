const RECORDS = "records";

class Record {
    constructor(rondas, puntos){
        this.rondas = rondas;
        this.puntos = puntos;
    }
}

class RecordsRepository {

    constructor(){
        this._cache = null;
    }
    
    get records(){
        if(!this._cache){
            this._cache = this.getFromStorage().sort(this.orderByPonderation);
        }
        return this._cache;
    }
    
    getFromStorage = () => JSON.parse(this.storage.getItem(RECORDS)) || [];

    orderByPonderation = (puntajeA, puntajeB) => {
        if(this.calculatePonderation(puntajeA) > this.calculatePonderation(puntajeB)) {
            return 1;
        }
        if(this.calculatePonderation(puntajeA) < this.calculatePonderation(puntajeB)) {
            return -1;
        }
        return 0;
    }

    calculatePonderation = puntaje => puntaje.rondas / puntaje.puntos;

    save = ({record, jugador}) => {
        this.checkRecordType(record);
        this.removeLastIfFull();
        this.saveInStorage(record, jugador);
        return true;
    }

    checkRecordType = record => {
        if(!record instanceof Record){
            throw new Error("record is not a Record instance");
        }
    }

    removeLastIfFull = () => this.full && this.records.pop();

    saveInStorage = (record, jugador) => {
        this.storage.setItem(
            RECORDS, 
            JSON.stringify([...this.records, {...record, jugador}])
        );
        this._cache = null;
    }

    get full(){
        return this.count === 10;
    }

    get count(){
        return this.records.length;
    }

    get last(){
        return this.records[this.count - 1] ?? { rondas:0, puntos: 0 };
    }

    createRecord = ({rondas, puntos}) => {
        const isBetter = rondas < this.last.rondas && puntos >= this.last.puntos;
        if(!this.full || isBetter){
            return new Record(rondas, puntos);
        }
        throw new Error("Cannot create Record");
    }

    get storage(){
        return localStorage;
    }

}

export default new RecordsRepository();