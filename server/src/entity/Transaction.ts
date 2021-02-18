import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity("transactions")
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "double" })
  amount: number;

  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  senderId: string;

  @Column()
  receiverId: string;

  @ManyToOne(() => User, (user) => user.outcome)
  @JoinColumn({ name: "senderId" })
  sender: Promise<User>;

  @ManyToOne(() => User, (user) => user.income)
  @JoinColumn({ name: "receiverId" })
  receiver: Promise<User>;

  involve = (userId: string) =>
    userId === this.senderId || userId === this.receiverId;
}
