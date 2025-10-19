/**
 * Variables de entorno centralizadas para MFEs (CommonJS para webpack)
 * Configuración de URLs y puertos para desarrollo y producción
 */

const MFE_ENV = {
  development: {
    host: {
      url: 'http://localhost:4200',
      port: 4200
    },
    login: {
      url: 'http://localhost:4201',
      port: 4201
    }
  },
  production: {
    host: {
      url: 'https://host.production.com',
      port: 443
    },
    login: {
      url: 'https://login.production.com',
      port: 443
    }
  }
};

/**
 * Helper para obtener las variables de entorno según el ambiente
 */
function getMfeEnv(production = false) {
  return production ? MFE_ENV.production : MFE_ENV.development;
}

/**
 * Helper para construir remoteEntry URL
 */
function buildRemoteEntryUrl(mfeUrl) {
  return `${mfeUrl}/remoteEntry.js`;
}

module.exports = {
  MFE_ENV,
  getMfeEnv,
  buildRemoteEntryUrl
};
