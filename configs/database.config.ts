import Pool from 'pg';

const postgresPool = new Pool.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgresNodeDemo',
    password: 'root',
    port: 5432,
});

const dbHandler = async (callback: any): Promise<any> => {
    const client = await postgresPool.connect();
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
};
export default { postgresPool, dbHandler };