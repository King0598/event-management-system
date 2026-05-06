const dotenv = require('dotenv');
const joi = require('joi');

dotenv.config();

const envVarsSchema = joi.object({
  PORT: joi.number().default(5000),
  NODE_ENV: joi.string().valid('development', 'production', 'test').required(),
  MONGO_URI: joi.string().required().description('MongoDB connection string'),
  JWT_SECRET: joi.string().required().description('JWT secret key'),
  JWT_EXPIRES_IN: joi.string().default('1d'),
}).unknown().required();

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  port: envVars.PORT,
  env: envVars.NODE_ENV,
  mongoUri: envVars.MONGO_URI,
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
  },
};
