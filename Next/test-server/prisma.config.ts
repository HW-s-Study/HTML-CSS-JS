import * as path from 'path';
import { defineConfig } from 'prisma/config';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const DB_URL = `file:${path.resolve(__dirname, 'prisma/dev.db')}`;

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: DB_URL,
  },
  migrate: {
    async adapter() {
      return new PrismaLibSql({ url: DB_URL });
    },
  },
});
