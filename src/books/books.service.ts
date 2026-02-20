import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity, BookStatus } from 'src/typeorm/entities/book.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    private readonly categoriesService: CategoriesService
  ) {}

  async createBook(createBookDto: CreateBookDto) {
    const { name, num_pages, price, status, category_ids } = createBookDto;

    try {
      const categories = category_ids && category_ids.length
        ? await this.categoriesService.findManyById(category_ids) : [];

      const book = this.bookRepository.create({
        name,
        num_pages,
        price,
        status: status as BookStatus,
        categories,
      });

      return this.bookRepository.save(book);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
