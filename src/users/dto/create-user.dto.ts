import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "O email deve ser informado" })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: "A senha deve ser informada" })
  password: string;

  @IsNotEmpty({ message: "O nome deve ser informado" })
  name: string;
}