import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'src/typeorm/entities/book.entity';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity]), CategoriesModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
