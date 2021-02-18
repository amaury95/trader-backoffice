import { ValidationError } from "apollo-server-express";
import { Transaction } from "../entity/Transaction";
import { User } from "../entity/User";
import * as _ from "lodash";
import { Money, Currencies } from "ts-money";

export const send = async (amount: number, sender: User, receiver: User) => {
  if (sender.balance < amount) {
    throw new ValidationError("insufficient balance");
  }

  const transaction = await Transaction.create({
    receiverId: receiver.id,
    senderId: sender.id,
    type: "transaction",
    amount,
  }).save();

  receiver.balance += amount;
  await receiver.save();

  sender.balance -= amount;
  await sender.save();

  return transaction;
};

export const deposit = async (amount: number, sender: User, receiver: User) => {
  const transaction = await Transaction.create({
    receiverId: receiver.id,
    senderId: sender.id,
    type: "deposit",
    amount,
  }).save();

  receiver.balance += amount;
  await receiver.save();

  return transaction;
};

export const income = async (_amount: number, sender: User) => {
  const users = await User.find();
  const amount = Money.fromDecimal(_amount, Currencies.USD, Math.ceil);

  const allocations = amount.allocate(users.map((u) => u.balance));

  const incomes = allocations.map((a, i) => {
    const receiver = users[i];
    const fee = a.multiply(receiver.fee);
    const income = a.subtract(fee);
    return { receiver, income, fee };
  });

  const totalFee = incomes.reduce(
    (prev, curr) => prev.add(curr.fee),
    new Money(0, Currencies.USD)
  );

  const transactions: Transaction[] = [];

  for (const element of incomes) {
    const { receiver, income } = element;

    const value = (receiver.id === sender.id
      ? income.add(totalFee)
      : income
    ).toDecimal();

    if (value === 0) continue;

    const transaction = await Transaction.create({
      receiverId: receiver.id,
      senderId: sender.id,
      amount: value,
      type: "income",
    }).save();

    receiver.balance += value;

    await receiver.save();

    transactions.push(transaction);
  }

  return transactions;
};

export const hasRoles = (realmAccess: any, ...roles: string[]) => {
  return roles.some((role) => realmAccess.roles.includes(role));
};
