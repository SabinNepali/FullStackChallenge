import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || "8000",
    apiPaths: {
        results: '/'
    },
    dbConfig: {
        db: process.env.DB || 'SecurityScanResult',
        user: process.env.DB_USER || 'sa',
        password: process.env.DB_PASSWORD || 'Cyber@1234',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 56918
    },
    options: {
        trustedconnection:  true,
        enableArithAbort:  true,
        instancename:  'SQLEXPRESS'  // SQL Server instance name
      },
}