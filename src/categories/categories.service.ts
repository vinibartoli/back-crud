import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/typeorm/entities/category.entity';
import { In, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly userService: UsersService,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto, user_id: number) {
    const { name } = createCategoryDto;

    try {
      const user = await this.userService.getById(user_id);

      if (!user) {
        throw new NotFoundException(`Usuario não encontrado com o ID: ${user_id}`);
      }

      const category = this.categoryRepository.create({
        name: name,
        user: user
      });

      return this.categoryRepository.save(category);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findManyById(category_id: number[]) {
    return await this.categoryRepository.findBy({
      id: In(category_id)
    })
  }
}
