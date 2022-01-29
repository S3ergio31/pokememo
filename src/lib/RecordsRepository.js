const RECORDS = "records";

class Record {
    constructor(rounds){
        this.rounds = rounds;
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

    orderByRound = (scoreA, scoreB) => {
        if(scoreA.rounds > scoreB.rounds) {
            return 1;
        }
        if(scoreA.rounds < scoreB.rounds) {
            return -1;
        }
        return 0;
    }

    save = ({record, player}) => {
        this.checkRecordType(record);
        this.removeLastIfFull();
        this.saveInStorage(record, player);
        return true;
    }

    checkRecordType = record => {
        if(!record instanceof Record){
            throw new Error("record is not a Record instance");
        }
    }

    removeLastIfFull = () => this.full && this.records.pop();

    saveInStorage = (record, player) => {
        this.storage.setItem(
            RECORDS, 
            JSON.stringify([...this.records, {...record, player}])
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
        return this.records[this.count - 1] ?? { rounds:0 };
    }

    createRecord = rounds => {
        const isBetter = rounds < this.last.rounds;
        if(!this.full || isBetter){
            return new Record(rounds);
        }
        return null;
    }

    get storage(){
        return localStorage;
    }

}

export default new RecordsRepository();