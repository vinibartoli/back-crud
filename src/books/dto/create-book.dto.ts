import { IsArray, IsNumber } from "class-validator";

export class CreateBookDto {
    name: string;
  
    num_pages: number;
  
    price: number;
  
    status: string;
  
    @IsArray()
    @IsNumber({}, { each: true })
    category_ids: number[];
}