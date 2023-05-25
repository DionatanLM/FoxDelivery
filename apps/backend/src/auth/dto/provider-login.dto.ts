import { IsNotEmpty, IsString } from 'class-validator';

export class ProviderLoginDto {
  @IsString({ message: 'Provider é necessário' })
  @IsNotEmpty()
  provider: string;

  @IsString({ message: 'Token é necessário' })
  @IsNotEmpty()
  idToken: string;
}
