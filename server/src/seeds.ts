import { User } from "./entity/User";
import * as bcrypt from "bcryptjs";
import { Role } from "./entity/Role";

export async function seeds() {
  try {
    await CreateUser(
      "Alexi Masso",
      "aleximasso781@gmail.com",
      "current",
      950,
      0,
      Role.admin
    );
    await CreateUser("Amaury Diaz", "amauryuh@gmail.com", "current", 50);
    await CreateUser("Gabriela Rodriguez", "gabi.santacruzpacheco@gmail.com");

    console.log("created seed");
  } catch {}
}

async function CreateUser(
  name: string,
  email: string,
  password: string = "current",
  balance: number = 0,
  fee: number = 0.1,
  role: number = Role.investor
) {
  const admin = await User.create({
    name,
    email,
    balance,
    fee,
    password: await bcrypt.hash(password, 10),
  }).save();

  await Role.create({ value: role, userId: admin.id }).save();
}
