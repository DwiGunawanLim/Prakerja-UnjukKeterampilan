import mysql from "mysql2/promise";

const dbPool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Dse221io14.",
    database:"prakerja_UnjukKemampuan",
    port:3306
})

export default dbPool;