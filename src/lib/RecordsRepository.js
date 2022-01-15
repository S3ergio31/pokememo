const RECORDS = "records";

class Record {
    constructor(rondas){
        this.rondas = rondas;
    }
}

class RecordsRepository {

    constructor(){
        this._cache = null;
    }
    
    get records(){
        if(!this._cache){
            this._cache = this.getFromStorage().sort(this.orderByRound);
        }
        return this._cache;
    }
    
    getFromStorage = () => JSON.parse(this.storage.getItem(RECORDS)) || [];

    orderByRound = (puntajeA, puntajeB) => {
        if(puntajeA.rondas > puntajeB.rondas) {
            return 1;
        }
        if(puntajeA.rondas < puntajeB.rondas) {
            return -1;
        }
        return 0;
    }

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
        return this.records[this.count - 1] ?? { rondas:0 };
    }

    createRecord = rondas => {
        const isBetter = rondas < this.last.rondas;
        if(!this.full || isBetter){
            return new Record(rondas);
        }
        throw new Error("Cannot create Record");
    }

    get storage(){
        return localStorage;
    }

}

export default new RecordsRepository();