// server/testConnection.js
const mongoose = require("mongoose");

async function testConnection() {
  try {
    // Conexão com o MongoDB local
    await mongoose.connect("mongodb://localhost:27017/GerenciamentoNotas", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Conexão bem-sucedida!");

    // Verificar status da conexão
    console.log("Status da conexão:");
    console.log("- Host:", mongoose.connection.host);
    console.log("- Banco de dados:", mongoose.connection.name);
    console.log(
      "- Estado:",
      mongoose.connection.readyState === 1 ? "Conectado" : "Desconectado"
    );

    // Fechar conexão após teste
    await mongoose.connection.close();
    console.log("\nConexão encerrada com sucesso!");
  } catch (error) {
    console.error("❌ Erro na conexão:");
    console.error("- Mensagem:", error.message);
    console.error("- Código:", error.code);
    console.error("- Nome:", error.name);

    // Sugestões de solução com base no erro
    if (error.code === "ECONNREFUSED") {
      console.log(
        "\n💡 Solução: Verifique se o MongoDB está rodando! Execute no terminal:"
      );
      console.log("   net start MongoDB (Windows)");
      console.log("   ou reinicie o serviço");
    }
  }
}

testConnection();
