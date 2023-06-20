import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { USER_ROLE } from 'src/config/constants/user-role.enum';

export class CreateUserStoreDto {
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

  //Store
  @IsString()
  @IsNotEmpty()
  public responsibleName?: string;

  @IsString()
  @IsNotEmpty()
  public cnpj?: string;

  @IsString()
  @IsNotEmpty()
  public cellphone?: string;

  @IsString()
  @IsOptional()
  public category?: string;

  @IsString()
  @IsNotEmpty()
  public address?: string;

  @IsString()
  @IsNotEmpty()
  public lat?: string;

  @IsString()
  @IsNotEmpty()
  public lng?: string;

  @IsString()
  @IsNotEmpty()
  public neighborhood?: string;

  @IsString()
  @IsNotEmpty()
  public postalCode?: string;
}
