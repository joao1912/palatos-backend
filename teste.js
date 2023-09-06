import Sequelize from "sequelize"

// Configurações de conexão com o banco de dados
const sequelize = new Sequelize('palatos', 'postgres', 'root1221@@', {
  host: 'localhost', // Endereço do banco de dados
  dialect: 'postgres', // Pode ser 'mysql', 'postgres', 'sqlite', 'mssql', etc.
});

// Teste de conexão
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  } finally {
    // Feche a conexão após o teste
    await sequelize.close();
  }
}

// Chame a função de teste de conexão
testConnection();
