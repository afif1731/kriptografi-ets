import { PrismaClient } from '@prisma/client';

import csv from 'csvtojson';
import * as bcryptjs from 'bcryptjs';
import { medicineList } from './data/medicine';

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

async function medicine() {
  const dataMedicine = medicineList;

  for(const med of dataMedicine) {
    await prisma.medicine.upsert({
      where: { id: med.id },
      update: {
        name: med.name,
        description: med.description,
        price: med.price,
        img_link: med.img_link
      },
      create: {
        id: med.id,
        name: med.name,
        description: med.description,
        price: med.price,
        img_link: med.img_link
      }
    })
  }
}

const main = async () => {
  await accounts();
  await medicine();
};

main()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
