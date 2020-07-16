import DatabaseConfig from '../configs/DatabaseConfig';
export default class UserService {

    private static obj: UserService;
    private databaseConfig: DatabaseConfig;
    private constructor() {
        this.databaseConfig = DatabaseConfig.instance();
    }
    public static instance() {
        if (!this.obj) {
            this.obj = new UserService();
        }
        return this.obj;
    }
    public saveUsers() {
        return this.databaseConfig.dbTransactionHandler(async (client: any) => {
            const res = client.query('INSERT INTO users VALUES (\'abcd\', \'ABCD\')');
            const res2 = client.query('INSERT INTO users VALUES (\'abcd2\', \'ABCD2\')');
            return Promise.all([res, res2]);
        });
    }
    public getUsers() {
        return DatabaseConfig.getConnectionPool().query('SELECT * FROM users');
    }
}
