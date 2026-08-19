import 'dotenv/config';
import { MongoClient } from 'mongodb';

const mongoRootUser = process.env.MONGO_INITDB_ROOT_USERNAME;
const mongoRootPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;

const dbName = process.env.MONGO_APP_DATABASE || 'portfolio_db_dev';
const appUser = process.env.MONGO_APP_USER;
const appPassword = process.env.MONGO_APP_PASS;

if (!mongoRootUser || !mongoRootPassword) {
  throw new Error('Missing MongoDB root credentials');
}

if (!appUser || !appPassword) {
  throw new Error('Missing MONGO_APP_USER or MONGO_APP_PASS');
}

const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || '27017';

const uri = `mongodb://${encodeURIComponent(mongoRootUser)}:${encodeURIComponent(
  mongoRootPassword,
)}@${mongoHost}:${mongoPort}/admin`;

const client = new MongoClient(uri);

async function createAppUser(): Promise<void> {
  try {
    await client.connect();

    const db = client.db(dbName);

    await db.command({
      createUser: appUser,
      pwd: appPassword,
      roles: [
        {
          role: 'readWrite',
          db: dbName,
        },
      ],
    });
  } finally {
    await client.close();
  }
}

createAppUser().catch((error) => {
  console.error('Failed to create MongoDB app user:', error);
  process.exit(1);
});