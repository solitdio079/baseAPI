import * as argon from "argon2";
async function hashPassword(password: string):Promise<string> {
  try {
    const hash = await argon.hash(password);
    return hash;
  } catch (error) {
    return `An error occured`
  }
}

async function verifyPassword(password: string, hash:string) {
  try {
    const verified = await argon.verify(hash,password);
    return verified;
  } catch (error) {
    return error;
  }
}

export default {
    hashPassword,
    verifyPassword
}
