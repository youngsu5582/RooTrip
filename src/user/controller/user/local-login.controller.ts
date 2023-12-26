import { TypedBody } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { LocalLoginDto } from 'src/user/dto/request/local-login.dto';

@Controller('')
export class LocalLoginController {
    async localLogin(@TypedBody() localLoginDto: LocalLoginDto) {
        localLoginDto;
    }
}
