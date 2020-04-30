const winston = require('winston');

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: './logs/login_times.json' })
    ]
  });


exports.loginLogger = (req ,res, next) => {
  if(res.locals.user){
        logger.log({
            level: 'info',
            message: res.locals.user  + " Loged in at " + new Date() 
          });
        }
  next();
}
