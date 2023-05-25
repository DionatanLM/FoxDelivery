import { User } from 'src/entities/User.entity';

export class ResponseLoginDto {
  token: string;
  user: User;
}
