import { Pool } from "pg";

const globalForDb = globalThis as unknown as { pool?: Pool };
const connectionString = process.env.DATABASE_URL;

export const hasDatabase = Boolean(connectionString);

export const db = hasDatabase
  ? globalForDb.pool ?? new Pool({ connectionString, connectionTimeoutMillis: 3_000 })
  : {
      query: async () => {
        throw new Error("База данных не настроена. Добавьте DATABASE_URL в .env или запустите проект через Docker Compose.");
      },
    };

if (process.env.NODE_ENV !== "production" && db instanceof Pool) globalForDb.pool = db;
