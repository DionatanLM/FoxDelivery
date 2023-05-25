import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  provider: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  imgUrl: string;
}
