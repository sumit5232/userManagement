import { ApiProperty } from '@nestjs/swagger';

export class SignInSignUpDto {
    
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ maxLength: 10 })
  phone: number;

  // @ApiProperty()
  // password: string;

}
