import { ConnectionPool } from "mssql";

// Connection DB
let config = {
    server: 'mymovie.database.windows.net',
    user: 'soa41d',
    password: 'soad1234@',
    database: 'mymovie',
    options:{
        enableArithAbort: true
    }
    
};

export default new ConnectionPool(config).connect();