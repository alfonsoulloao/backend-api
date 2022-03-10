export const environments = {
    az:{
        ConnectionAzure: process.env.ConnectionAzure,
    },
    kv:{
        
            AZURE_CLIENT_ID: "3217ab1b-81e5-4749-b12d-8dce8b337909",
            AZURE_CLIENT_SECRET: "j~4CB6~6WYbP0~O1BpRD6ZHMSD2VZa6eW1",
            AZURE_TENANT_ID: "0d96bad1-7bba-407b-9ff7-48a37eb98d8c"        
    },
    jwt:{
        jwtTkn:'secretKey'
    },
    db:{
        connectionString: process.env.ConnectionString || '{ "host": "saitama-servidor.database.windows.net", "username": "Administrador", "password": "s4it4m4-sensei", "database": "TYG", "port":1433 }',
    },
    

};




