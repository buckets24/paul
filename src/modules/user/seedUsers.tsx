import { Role, Salutation } from '@prisma/client';
import { generate } from 'namor';

const usersData = [];

for (let i = 1; i < 500; i++) {
  usersData.push({
    salutation: Math.random() < 0.5 ? Salutation.HERR : Salutation.FRAU,
    title: generate({ words: 1, saltLength: 0 }),
    firstName: generate({ words: 1, saltLength: 0, subset: 'manly' }),
    lastName: generate({ words: 1, saltLength: 0, subset: 'manly' }),
    company: generate({ words: 1, saltLength: 0, subset: 'manly' }),
    phone: generate({ words: 1, saltLength: 0, subset: 'manly' }),
    mobile: generate({ words: 1, saltLength: 0, subset: 'manly' }),
    position: generate({ words: 1, saltLength: 0, subset: 'manly' }),
    role: Role.USER,
    email: `user${i}@email.com`,
  });
}

export const users = usersData;
