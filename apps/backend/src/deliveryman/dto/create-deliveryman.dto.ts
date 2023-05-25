import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliveryManDto {
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
  public cpf: string;

  @IsString()
  @IsNotEmpty()
  public cnh: string;

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
