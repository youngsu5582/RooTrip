import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { LocalLoginService } from '../service/local-login.service';
import { LocalLoginResponseDto } from '../dto/response/local-login.response.dto';
import { LocalLoginRequestDto } from '../dto/request/local-login.request.dto';

@Controller('login')
export class LocalLoginController {
    constructor(private readonly localLoginService: LocalLoginService) {}
    /**
     * 로컬 로그인을 진행한다.
     * @param localLoginRequestDto 로그인 하기 위한 DTO
     * @returns 
     */
    @TypedRoute.Post()
    async execute(@TypedBody() localLoginRequestDto: LocalLoginRequestDto) : Promise<LocalLoginResponseDto> {
        const loginTokenInfo = await this.localLoginService.execute(localLoginRequestDto);
        return new LocalLoginResponseDto(loginTokenInfo);
    }
}
