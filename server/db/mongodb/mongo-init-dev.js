const dbName = process.env.MONGO_APP_DATABASE || "portfolio_db_dev";

db = db.getSiblingDB(process.env.MONGO_APP_DATABASE);

db.createUser({
  user: process.env.MONGO_APP_USER,
  pwd: process.env.MONGO_APP_PASS,
  roles: [{ role: "readWrite", db: dbName }],
});
