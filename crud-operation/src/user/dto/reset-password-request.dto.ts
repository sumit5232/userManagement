// reset-password-request.dto.ts
import { IsEmail } from 'class-validator';

export class ResetPasswordRequestDto {
  @IsEmail()
  email: string;
}
