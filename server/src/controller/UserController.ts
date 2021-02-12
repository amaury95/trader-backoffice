import { ValidationError } from "apollo-server-express";
import { Transaction } from "../entity/Transaction";
import { User } from "../entity/User";
import * as _ from "lodash";
import { Role } from "../entity/Role";

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

export const profit = async (amount: number, sender: User) => {
  const users = await User.find();

  const balance = users
    .map((u) => u.balance)
    .reduce((acum, curr) => acum + curr);

  const transactions: Transaction[] = [];

  for (const receiver of users) {
    const participation = receiver.balance / balance;
    const income = amount * participation;
    const fee = receiver.fee * income;

    const receiverProfit = income - fee;
    if (receiverProfit != 0) {
      const transaction = await Transaction.create({
        senderId: sender.id,
        receiverId: receiver.id,
        amount: receiverProfit,
      }).save();

      receiver.balance += income - fee;
      await receiver.save();

      transactions.push(transaction);
    }

    const senderProfit = fee;
    if (senderProfit != 0) {
      const feeTransaction = await Transaction.create({
        senderId: sender.id,
        receiverId: sender.id,
        amount: senderProfit,
      }).save();

      sender.balance += fee;
      await sender.save();

      transactions.push(feeTransaction);
    }
  }

  return transactions;
};
