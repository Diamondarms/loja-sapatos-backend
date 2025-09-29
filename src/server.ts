import createApp from "./app";

async function startServer() {
    const app = await createApp();
    
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000");
    });
}

startServer();
