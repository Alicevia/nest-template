

export  const APP_CONF= () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST, // 这部分会和从env中进行合并
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PWD,
    database: process.env.DATABASE_LIB,
  },
  redis:{
    host: process.env.REDIS_HOST, // 这部分会和从env中进行合并
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PWD,
    db:process.env.REDIS_DB
  }
});

