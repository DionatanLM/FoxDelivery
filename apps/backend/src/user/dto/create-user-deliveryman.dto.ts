import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { USER_ROLE } from 'src/config/constants/user-role.enum';

export class CreateUserDeliveryManDto {
  //User
  @IsEmail()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  public userRole: USER_ROLE;

  //DeliveryMan
  @IsString()
  @IsOptional()
  public birthdate?: Date;

  @IsString()
  @IsOptional()
  public cellphone?: string;

  @IsString()
  @IsOptional()
  public cpf?: string;

  @IsString()
  @IsOptional()
  public cnh?: string;

  @IsString()
  @IsOptional()
  public postalCode?: string;

  @IsString()
  @IsOptional()
  public address?: string;

  @IsString()
  @IsOptional()
  public neighborhood?: string;
}
