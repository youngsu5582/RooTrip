import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { LocalRegisterRequestDto } from '../dto/request/local-register.dto';
import { LocalRegisterService } from '../service/local-register.service';
import { randomId } from 'src/util/random-id.util';
import { ProfileCreateService } from 'src/profile/service/profile-create.service';
import { LocalRegisterResponseDto } from '../dto/response/local-register.response.dto';

@Controller('register')
export class LocalRegisterController {
    constructor(private readonly localRegisterService: LocalRegisterService, private readonly profileCreateService: ProfileCreateService) {}
    @TypedRoute.Post()
    async execute(@TypedBody() localRegisterRequestDto: LocalRegisterRequestDto): Promise<LocalRegisterResponseDto> {
        const userId = randomId();
        await this.localRegisterService.execute(localRegisterRequestDto, userId);
        await this.profileCreateService.execute(localRegisterRequestDto, userId);

        return new LocalRegisterResponseDto();
    }
}
