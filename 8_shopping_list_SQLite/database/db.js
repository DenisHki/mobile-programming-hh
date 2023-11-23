import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("shoppinglist.db");

export const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists shoppinglist (id integer primary key not null, product text, amount text);"
    );
  });
};

export default db;
