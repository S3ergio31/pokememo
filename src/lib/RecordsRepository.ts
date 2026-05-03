const RECORDS = 'records';

export class GameRecord {
  constructor(public readonly rounds: number) {}
}

export interface StoredRecord {
  rounds: number;
  player: string;
}

class RecordsRepository {
  _cache: StoredRecord[] | null = null;

  get records(): StoredRecord[] {
    if (!this._cache) {
      this._cache = this.getFromStorage().sort(this.orderByRound);
    }
    return this._cache;
  }

  getFromStorage = (): StoredRecord[] => {
    const item = this.storage.getItem(RECORDS);
    return item ? (JSON.parse(item) as StoredRecord[]) : [];
  };

  orderByRound = (a: StoredRecord, b: StoredRecord): number => {
    if (a.rounds > b.rounds) return 1;
    if (a.rounds < b.rounds) return -1;
    return 0;
  };

  save = ({ record, player }: { record: GameRecord; player: string }): boolean => {
    this.removeLastIfFull();
    this.saveInStorage(record, player);
    return true;
  };

  private removeLastIfFull = (): void => {
    if (this.full) this.records.pop();
  };

  private saveInStorage = (record: GameRecord, player: string): void => {
    this.storage.setItem(
      RECORDS,
      JSON.stringify([...this.records, { ...record, player }]),
    );
    this._cache = null;
  };

  get full(): boolean {
    return this.count === 10;
  }

  get count(): number {
    return this.records.length;
  }

  get last(): { rounds: number } {
    return this.records[this.count - 1] ?? { rounds: 0 };
  }

  createRecord = (rounds: number): GameRecord | null => {
    if (!this.full || rounds < this.last.rounds) {
      return new GameRecord(rounds);
    }
    return null;
  };

  get storage(): Storage {
    return localStorage;
  }
}

export default new RecordsRepository();
