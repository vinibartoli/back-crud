import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { password, email, name } = createUserDto;

    try {
      const emailExist = await this.verifyIfEmailExist(email);

      if(emailExist) {
        throw new ConflictException("Email já cadastrado.")
      }

      const hashPassword = await bcrypt.hash(password, 12);

      const user = this.userRepository.create({
        email: email,
        name: name,
        password: hashPassword
      })

      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async verifyIfEmailExist(email: string) {
    const emailExist = await this.userRepository.findOneBy({
      email: email
    })

    return emailExist;
  }

  async getById(id: number) {
    return await this.userRepository.findOneBy({
      id: id
    });
  }
}
