// initialization script for development MongoDB container
// it will create the root user in the admin database if it doesn't already exist
const user = process.env.MONGO_INITDB_ROOT_USERNAME || 'admin';
const pwd = process.env.MONGO_INITDB_ROOT_PASSWORD || 'admin123';

const adminDb = db.getSiblingDB('admin');
try {
  adminDb.createUser({
    user,
    pwd,
    roles: [{ role: 'root', db: 'admin' }]
  });
  print('created root user', user, 'in admin database');
} catch (e) {
  print('user creation failed or already exists:', e.message);
}
