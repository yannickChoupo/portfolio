// initialization script for development MongoDB container
// it will create the root user if it doesn't already exist
const user = process.env.MONGO_INITDB_ROOT_USERNAME || 'admin';
const pwd = process.env.MONGO_INITDB_ROOT_PASSWORD || 'admin123';
const dbName = process.env.MONGO_INITDB_DATABASE || 'portfolio_dev';

const db = db.getSiblingDB(dbName);
try {
  db.createUser({
    user,
    pwd,
    roles: [{ role: 'root', db: 'admin' }]
  });
  print('created root user', user);
} catch (e) {
  print('user creation failed or already exists:', e);
}
