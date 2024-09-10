const fs = require('fs');
const glob = require('glob');
const path = require('path');

const schemas = glob.sync('./src/modules/**/entities/*.prisma');

let schema = `datasource db {
    provider = "postgres"
    url      = env("POSTGRES_DATABASE_URL")
    shadowDatabaseUrl = env("SHADOW_DATABASE_URL")
}

generator client {
    provider = "prisma-client-js"
    previewFeatures = []
}\n`;

schema += schemas.reduce((currentSchema, filename) => {
  const partialSchema = fs.readFileSync(filename).toString();
  const cleanSchema = partialSchema.split(
    '// GENERATE-PRISMA-SCHEMA-DELETE //',
  )[0];
  return `${currentSchema}\n${cleanSchema}`;
}, '');

fs.writeFileSync(path.join(__dirname, './schema.prisma'), schema);
