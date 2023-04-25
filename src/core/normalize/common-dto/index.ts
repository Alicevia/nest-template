import { Expose, Type } from "class-transformer";
import { IsNumber,Min } from "class-validator";


export class PaginationDto {
  @Expose()
  @Type(()=>Number)
  @IsNumber()
  @Min(1)
  page:number=1

  @Expose()
  @IsNumber()
  @Type(()=>Number)
  @Min(1)
  pageSize:number=20

  constructor(partial: Partial<PaginationDto>) {
    Object.assign(this, partial);
  }
}

