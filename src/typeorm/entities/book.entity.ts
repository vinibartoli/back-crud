import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";

export enum BookStatus {
  NOT_STARTED = "NOT_STARTED",
  READING = "READING",
  FINISHED = "FINISHED"
}

@Entity({ name: 'books' })
export class BookEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  num_pages: number;

  @Column()
  price: number;

  @Column({
    type: "enum",
    enum: BookStatus,
    default: BookStatus.NOT_STARTED
  })
  status: BookStatus

  @ManyToMany(() => CategoryEntity)
  @JoinTable({ name: 'books_categories' })
  categories: CategoryEntity[]
}