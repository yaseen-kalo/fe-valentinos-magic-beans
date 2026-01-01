import fs from 'fs';
import path from 'path';

const loginDataPath = path.resolve(
  process.cwd(),
  'test-data/loginData.js'
);

export const saveLoginCredentials = async({ email, password }) => {
  let existingData = [];

  // Check if file exists
  if (fs.existsSync(loginDataPath)) {
    const module = await import(`file://${loginDataPath}?update=${Date.now()}`);
    existingData = module.loginData;
  }

  // Add new user
  existingData.push({
    email,
    password,
    createdAt: new Date().toISOString()
  });

  console.log(`Saved login credentials for ${email}`);

  // Write back as JS module
  const fileContent = `export const loginData = ${JSON.stringify(existingData, null, 2)};\n`;

  fs.writeFileSync(loginDataPath, fileContent);
};
