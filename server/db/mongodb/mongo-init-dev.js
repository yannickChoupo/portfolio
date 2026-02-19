const dbName = "portfolio_dev";

db = db.getSiblingDB(dbName);

db.createUser({
  user: process.env.MONGO_APP_USER,
  pwd: process.env.MONGO_APP_PASS,
  roles: [{ role: "readWrite", db: dbName }],
});
