const winston = require('winston');

class Logger {
  constructor() {
    this.innerLogger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
      ],
      format: winston.format.combine(
        winston.format.json(),
        winston.format.splat(),
        winston.format.colorize(),
      ),
    });
  }

  info(message, ...additionalInfo) {
    this.innerLogger.info(message, additionalInfo);
  }

  verbose(message, ...additionalInfo) {
    this.innerLogger.verbose(message, additionalInfo);
  }

  warning(message, ...additionalInfo) {
    this.innerLogger.warning(message, additionalInfo);
  }

  error(message, ...additionalInfo) {
    this.innerLogger.error(message, additionalInfo);
  }
}

module.exports = Logger;
