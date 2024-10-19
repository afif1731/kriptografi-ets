import { PrismaClient } from '@prisma/client';

import csv from 'csvtojson';
import * as bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

const salt = bcryptjs.genSaltSync(12);

async function accounts() {
  const dataAccounts = await csv().fromFile(__dirname + '/data/accounts.csv');

  let accounts = dataAccounts.map(account => {
    return {
      id: account.id,
      name: account.name,
      email: account.email,
      password: bcryptjs.hashSync(account.password, salt),
      role: account.role,
      is_email_verified: account.verified == 'true' ? true : false,
    };
  });

  for (const account of accounts) {
    await prisma.accounts.upsert({
      where: {
        id: account.id,
      },
      update: {
        email: account.email,
        password: account.password,
        is_email_verified: account.is_email_verified,
        role: account.role,
        name: account.name,
      },
      create: {
        id: account.id,
        email: account.email,
        password: account.password,
        is_email_verified: account.is_email_verified,
        role: account.role,
        name: account.name,
      },
    });
  }
}

const main = async () => {
  await accounts();
};

main()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
