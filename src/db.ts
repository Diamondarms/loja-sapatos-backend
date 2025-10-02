import { Client } from 'pg';

const connectionString = process.env.DATABASE_URL;
const isProduction = process.env.NODE_ENV === 'production';

if (!connectionString) {
    throw new Error('A variável de ambiente DATABASE_URL não está configurada.');
}

export const client = new Client({
    connectionString: connectionString,
    ssl: isProduction ? {
        rejectUnauthorized: false
    } : false
});

async function dbConnect() {
    try {
        await client.connect();
        console.log("Conexão com o Supabase estabelecida com sucesso!");
    } catch (err) {
        console.error("Erro na conexão com o Supabase:", err);
    }
}

export default dbConnect;