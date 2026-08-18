const dbName = process.env.MONGO_INITDB_DATABASE || "portfolio_dev";
print("INIT script running. dbName=" + dbName);

const user = process.env.MONGO_APP_USER;
const pass = process.env.MONGO_APP_PASS;
print("Creating user: " + user);

db = db.getSiblingDB(dbName);

db.createUser({
  user,
  pwd: pass,
  roles: [{ role: "readWrite", db: dbName }],
});

print("✅ User created successfully");
