export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 8080,
  jwt: {
    secret: process.env.ACCESS_TOKEN_KEY,
    expiresIn: process.env.TIME_EXPIRE_TOKEN,
  },
});
