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
    public async save(user: any) {
        if (!user) { throw 'Request body is missing'; }
        // return this.databaseConfig.dbTransactionHandler(async (client: any) => {
        //     const res = client.query('INSERT INTO users VALUES (\'abcd\', \'ABCD\')');
        //     const res2 = client.query('INSERT INTO users VALUES (\'abcd2\', \'ABCD2\')');
        //     return Promise.all([res, res2]);
        // });
        const values = [user.name, user.email, user.password];
        return DatabaseConfig.getConnectionPool().query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', values);
    }
    public async getAll() {
        return DatabaseConfig.getConnectionPool().query('SELECT * FROM users');
    }
    public async getById(id: number) {
        if (!id) { throw 'Invalid id'; }
        const values = [id];
        return DatabaseConfig.getConnectionPool().query('SELECT * FROM users WHERE id=$1', values);
    }
    public async login(username: string, password: string) {
        if (!username || !password) { throw 'Username/Password are/is missing'; }
        const values = [username, password];
        return DatabaseConfig.getConnectionPool().query('SELECT * FROM users WHERE email=$1 AND password=$2', values);
    }
}
