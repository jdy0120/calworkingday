interface Config {
  user: string;
  password: string;
  port: number;
  database: string;
  multipleStatements: boolean;
  host?: string;
  socketPath?: string;
}

const env = process.env.NODE_ENV || 'development';
// const inDocker = process.env.DOCKER || 'no';

console.log('env = ', env);

// const mysqlPath = 'sagolinkapp:asia-northeast1:sagolink-mysql';
const mysqlHost = '34.85.61.156';

const myConfig: Config = {
  user: 'sagolink',
  password: 'Tkrhfld12#',
  port: 3306,
  database: env === 'production' ? 'sagolinkDB' : 'sagolinkDEV',
  multipleStatements: true,
  host: env === 'production' ? 'cloudsql-proxy-3306' : mysqlHost,
  // charset: 'utf8mb4',
};

// if (env === 'production')
//   if (inDocker === 'yes') myConfig.host = 'cloudsql-proxy';
//   else myConfig.socketPath = mysqlPath;
// else myConfig.host = mysqlHost;

// console.log(JSON.stringify(myConfig));

export {myConfig};
