import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const users = [
  {
    name: 'Admin User',
    email: 'admin@sportsara.com',
    password: bcrypt.hashSync('password123', salt),
    role: 'admin',
  },
  {
    name: 'Regular Customer',
    email: 'customer@sportsara.com',
    password: bcrypt.hashSync('password123', salt),
    role: 'user',
  },
];

export default users;