import RecordsRepository from 'lib/RecordsRepository';

beforeEach(() => {
    localStorage.clear();
    RecordsRepository._cache = null;
});

const saveRecord = (rounds, player = 'Player') => {
    const record = RecordsRepository.createRecord(rounds);
    RecordsRepository.save({ record, player });
};

describe('RecordsRepository', () => {
    describe('records', () => {
        it('returns empty array when localStorage is empty', () => {
            expect(RecordsRepository.records).toEqual([]);
        });

        it('returns saved records', () => {
            saveRecord(5, 'Alice');
            expect(RecordsRepository.records).toHaveLength(1);
            expect(RecordsRepository.records[0].player).toBe('Alice');
            expect(RecordsRepository.records[0].rounds).toBe(5);
        });

        it('sorts records by rounds ascending (best first)', () => {
            saveRecord(10, 'Slow');
            saveRecord(3, 'Fast');
            saveRecord(7, 'Medium');

            const rounds = RecordsRepository.records.map(r => r.rounds);
            expect(rounds).toEqual([3, 7, 10]);
        });
    });

    describe('count and full', () => {
        it('count reflects the number of saved records', () => {
            expect(RecordsRepository.count).toBe(0);
            saveRecord(5);
            expect(RecordsRepository.count).toBe(1);
            saveRecord(6);
            expect(RecordsRepository.count).toBe(2);
        });

        it('full is false when fewer than 10 records', () => {
            for (let i = 1; i <= 9; i++) saveRecord(i);
            expect(RecordsRepository.full).toBe(false);
        });

        it('full is true when there are 10 records', () => {
            for (let i = 1; i <= 10; i++) saveRecord(i);
            expect(RecordsRepository.full).toBe(true);
        });
    });

    describe('createRecord', () => {
        it('returns a Record when the leaderboard is not full', () => {
            const record = RecordsRepository.createRecord(5);
            expect(record).not.toBeNull();
            expect(record.rounds).toBe(5);
        });

        it('returns a Record when full and the new score is better than the worst', () => {
            for (let i = 1; i <= 10; i++) saveRecord(i * 2); // rounds: 2,4,...,20
            const record = RecordsRepository.createRecord(1); // better than worst (20)
            expect(record).not.toBeNull();
            expect(record.rounds).toBe(1);
        });

        it('returns null when full and the new score is not better than the worst', () => {
            for (let i = 1; i <= 10; i++) saveRecord(i); // worst round is 10
            const record = RecordsRepository.createRecord(15);
            expect(record).toBeNull();
        });

        it('returns null when full and the new score equals the worst', () => {
            for (let i = 1; i <= 10; i++) saveRecord(i); // worst round is 10
            const record = RecordsRepository.createRecord(10);
            expect(record).toBeNull();
        });
    });

    describe('save', () => {
        it('persists a record in localStorage', () => {
            const record = RecordsRepository.createRecord(4);
            RecordsRepository.save({ record, player: 'Bob' });

            RecordsRepository._cache = null;
            expect(RecordsRepository.records[0]).toMatchObject({ rounds: 4, player: 'Bob' });
        });

        it('returns true on successful save', () => {
            const record = RecordsRepository.createRecord(5);
            expect(RecordsRepository.save({ record, player: 'Test' })).toBe(true);
        });

        it('removes the worst record when the leaderboard is full', () => {
            for (let i = 1; i <= 10; i++) saveRecord(i); // worst is rounds=10
            const record = RecordsRepository.createRecord(2);
            RecordsRepository.save({ record, player: 'Champion' });

            const rounds = RecordsRepository.records.map(r => r.rounds);
            expect(rounds).not.toContain(10);
            expect(RecordsRepository.records).toHaveLength(10);
        });
    });
});
