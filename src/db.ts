import { Client } from 'pg';

export const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'LojaSapatos',
    password: '3633736410',
    port: 5432,
});

async function dbConnect() {
    try {
        await client.connect();
    } catch (err) {
        console.error("Erro na conexão ou na consulta:", err);
    }
}

export default dbConnect;