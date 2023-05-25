import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public birthdate: Date;

  @IsString()
  @IsNotEmpty()
  public cellphone: string;

  @IsString()
  @IsNotEmpty()
  public cnpj: string;

  @IsOptional()
  @IsNotEmpty()
  public category: string;

  @IsString()
  @IsNotEmpty()
  public postalCode: string;

  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsString()
  @IsNotEmpty()
  public neighborhood: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
