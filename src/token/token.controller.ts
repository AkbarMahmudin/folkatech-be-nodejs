import { Body, Controller, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  async createToken(@Body() { id }: CreateTokenDto) {
    return this.tokenService.createToken(id);
  }
}
