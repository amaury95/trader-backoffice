import { ValidationError } from "apollo-server-express";
import { Transaction } from "../entity/Transaction";
import { User } from "../entity/User";
import * as _ from "lodash";
import { Role } from "../entity/Role";
import { Money, Currencies } from "ts-money";

export const defaultRole = async () => {
  const users = await User.find();
  return users.length ? Role.investor : Role.admin;
};

export const send = async (amount: number, sender: User, receiver: User) => {
  if (sender.balance < amount) {
    throw new ValidationError("insufficient balance");
  }

  const transaction = await Transaction.create({
    receiverId: receiver.id,
    senderId: sender.id,
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
    amount,
  }).save();

  receiver.balance += amount;
  await receiver.save();

  return transaction;
};

export const profit = async (_amount: number, sender: User) => {
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

  console.log({
    incomes: incomes.map((i) => i.income.toDecimal()),
    totalFee: totalFee.toDecimal(),
  });

  const transactions: Transaction[] = [];

  for (let i = 0; i < incomes.length; i++) {
    const { receiver, income } = incomes[i];

    const amount = receiver.id === sender.id ? income.add(totalFee) : income;

    if (amount.toDecimal() === 0) continue;

    const transaction = await Transaction.create({
      amount: amount.toDecimal(),
      receiverId: receiver.id,
      senderId: sender.id,
    }).save();

    receiver.balance += amount.toDecimal();

    await receiver.save();

    transactions.push(transaction);
  }

  return transactions;
};
