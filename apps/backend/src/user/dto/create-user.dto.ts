import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { USER_ROLE } from 'src/config/constants/user-role.enum';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public userRole: USER_ROLE;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  public imgUrl: string;
}
