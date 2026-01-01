import { v4 as uuidv4 } from 'uuid'; // For generating unique emails
import 'dotenv/config';

const DOMAIN = process.env.MAILOSAUR_DOMAIN || 'test.mailosaur.net';

export const signUpTestData = [
  {
    testName: "Steve Shorts",
    firstName: "Steve",
    lastName: "Shorts",
    email: `steve.shorts.${uuidv4()}@${DOMAIN}`, // dynamic unique email
    password: "Password@123"
  },
  // {
  //   testName: "Jane Smith",
  //   firstName: "Jane",
  //   lastName: "Smith",
  //   email: `jane.smith.${uuidv4()}@${DOMAIN}`, // dynamic unique email
  //   password: "Passw0rD"
  // },
  // {
  //   testName: "Valid user signup as Alina William",
  //   firstName: "Alina",
  //   lastName: "William",
  //   email: `alina.william.${uuidv4()}@${DOMAIN}`, // dynamic unique email
  //   password: "P@ssw0Rd"
  // },
  // {
  //   testName: "Valid user signup as Sarah Dock",
  //   firstName: "Sarah",
  //   lastName: "Dock",
  //   email: `sarah.dock.${uuidv4()}@${DOMAIN}`, // dynamic unique email
  //   password: "p@ssw0rD"
  // }
];
