// const options = require("../config/dbConfig");
import { dbOptions } from "../config/dbConfig.js";
// const knex = require("knex");
import knex from "knex";

//instancia de la base de datos.
// const dbmysql = knex(dbOptions.mariaDB);
const dbSqlite = knex(dbOptions.sqliteDB);

const createTables = async()=>{
    try {
        // //verificamos si la tabla ya existe en la base de datos
        // const tableProductsExists = await dbmysql.schema.hasTable("products");
        // if(tableProductsExists){
        //     await dbmysql.schema.dropTable("products")
        // }
        // //creamos la tabla de productos
        // await dbmysql.schema.createTable("products",table=>{
        //     //definimos los campos de la tabla products
        //     table.increments("id");
        //     table.string("title",40).nullable(false);
        //     table.integer("price");
        //     table.string("thumbnail",100);
        // });
        // console.log("table products created successfully");
        // dbmysql.destroy();

        //sqlite3
        //verificamos si la tabla ya existe en la base de datos
        const tableProductsExists = await dbSqlite.schema.hasTable("products");
        if(tableProductsExists){
            await dbSqlite.schema.dropTable("products")
        }
        //creamos la tabla de productos
        await dbSqlite.schema.createTable("products",table=>{
            //definimos los campos de la tabla products
            table.increments("id");
            table.string("title",40).nullable(false);
            table.integer("price");
            table.string("thumbnail",100);
        });
        console.log("table products created successfully");

        const tableChatExists = await dbSqlite.schema.hasTable("chat");
        if(tableChatExists){
            await dbSqlite.schema.dropTable("chat")
        }
        await dbSqlite.schema.createTable("chat", table=>{
            //campos de la tabla chat
            table.increments("id");
            table.string("user",30);
            table.string("timestamp", 10);
            table.string("message",200);
        });
        console.log("chat table created successfully");
        dbSqlite.destroy();
    } catch (error) {
        console.log(error)
    }
}

createTables();