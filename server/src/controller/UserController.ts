import { ValidationError } from "apollo-server-express";
import { Transaction } from "../entity/Transaction";
import { User } from "../entity/User";
import * as _ from "lodash";
import { Money, Currencies } from "ts-money";

export const send = async (amount: number, sender: User, receiver: User) => {
  if (sender.balance < amount) {
    throw new ValidationError("insufficient balance");
  }

  await Transaction.create({
    receiverId: receiver.id,
    senderId: sender.id,
    type: "transaction",
    amount,
  }).save();

  receiver.balance += amount;
  await receiver.save();

  sender.balance -= amount;
  await sender.save();

  return [sender, receiver];
};

export const deposit = async (amount: number, sender: User, receiver: User) => {
  await Transaction.create({
    receiverId: receiver.id,
    senderId: sender.id,
    type: "deposit",
    amount,
  }).save();

  receiver.balance += amount;
  return await receiver.save();
};

export const income = async (_amount: number, sender: User) => {
  const users = await User.find();
  const amount = Money.fromDecimal(_amount, Currencies.USD, Math.ceil);

  const allocations = amount.allocate(users.map((u) => u.balance));

  const isProfit = amount.toDecimal() > 0;

  const incomes = allocations.map((a, i) => {
    const receiver = users[i];
    const userFee = isProfit ? receiver.fee : 0;
    const fee = a.multiply(userFee);
    const income = a.subtract(fee);
    return { receiver, income, fee };
  });

  const totalFee = incomes.reduce(
    (prev, curr) => prev.add(curr.fee),
    new Money(0, Currencies.USD)
  );

  const accounts: User[] = [];

  for (const element of incomes) {
    const { receiver, income } = element;

    const receiverBalance = Money.fromDecimal(
      receiver.balance,
      Currencies.USD,
      Math.floor
    );

    const value = receiver.id === sender.id ? income.add(totalFee) : income;

    if (value.toDecimal() === 0) continue;

    await Transaction.create({
      receiverId: receiver.id,
      senderId: sender.id,
      amount: value.toDecimal(),
      type: "income",
    }).save();

    const newBalance = receiverBalance.add(value);

    receiver.balance = newBalance.toDecimal();

    accounts.push(await receiver.save());
  }

  return accounts;
};

export const hasRoles = (realmAccess: any, ...roles: string[]) => {
  return roles.some((role) => realmAccess.roles.includes(role));
};
