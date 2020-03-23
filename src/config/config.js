export const config = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  secret: process.env.JWT_SECRET,
  expiration: process.env.JWT_EXP
};
