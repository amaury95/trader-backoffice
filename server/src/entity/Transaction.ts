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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  senderId: number;

  @Column()
  receiverId: number;

  @ManyToOne(() => User, (user) => user.outcome)
  @JoinColumn({ name: "senderId" })
  sender: Promise<User>;

  @ManyToOne(() => User, (user) => user.income)
  @JoinColumn({ name: "receiverId" })
  receiver: Promise<User>;

  involve = (userId: number) =>
    userId === this.senderId || userId === this.receiverId;
}
