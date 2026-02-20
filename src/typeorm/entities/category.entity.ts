import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.categories)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}