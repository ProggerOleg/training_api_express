import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
  @IsEmail({}, { message: 'Неправильный email' })
  email: string;
  @IsString({ message: 'Неправильный пароль' })
  password: string;
}
