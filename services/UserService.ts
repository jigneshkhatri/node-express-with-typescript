import postgres from '../configs/database.config';
export default class UserService {

    private static obj: UserService;
    private constructor() { }
    public static instance() {
        if (!this.obj) {
            this.obj = new UserService();
        }
        return this.obj;
    }
    public saveUsers() {
        return postgres.dbHandler(async (client: any) => {
            const res = client.query('INSERT INTO users VALUES (\'abcd\', \'ABCD\')');
            const res2 = client.query('INSERT INTO users VALUES (\'abcd2\', \'ABCD2\')');
            return Promise.all([res, res2]);
        });
    }
}
