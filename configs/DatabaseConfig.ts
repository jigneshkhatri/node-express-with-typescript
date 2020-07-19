import Pool from 'pg';


export default class DatabaseConfig {
    private static obj: DatabaseConfig;
    private static poolObj: Pool.Pool;
    private constructor() { }
    public static instance() {
        if (!this.obj) {
            this.obj = new DatabaseConfig();
        }
        return this.obj;
    }

    public static getConnectionPool() {
        if (!this.poolObj) {
            this.poolObj = new Pool.Pool({
                user: 'postgres',
                host: 'localhost',
                database: 'postgresNodeDemo',
                password: 'root',
                port: 5432,
            });
        }
        return this.poolObj;
    }

    public async dbTransactionHandler(callback: any) {
        const client = await DatabaseConfig.getConnectionPool().connect();
        try {
            await client.query('BEGIN');
            await callback(client);
            await client.query('COMMIT');
        } catch (err) {
            console.log('Rollbacking Transaction!!!');
            await client.query('ROLLBACK')
            throw err;
        } finally {
            if (client) {
                client.release();
            }
        }
    }
}
