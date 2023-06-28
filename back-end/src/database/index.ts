import { Sequelize } from "sequelize-typescript";
import File from "./models/File";
const databaseConfig =
  require("./config")[process.env.NODE_ENV || "development"];

const models = [File];

class Database {
  public connection!: Sequelize;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = new Sequelize(databaseConfig);
    this.connection.addModels(models);
  }
}

const database: Database = new Database();

export default database;
