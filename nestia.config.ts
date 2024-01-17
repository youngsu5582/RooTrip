import { INestiaConfig } from '@nestia/sdk';
 

const config: INestiaConfig = {
    input: 'src/**/**.controller.ts',
    swagger: {
        output: 'docs/swagger.json',
        security: {
            bearer: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            },
        },
        servers: [
            {
                url: process.env.SERVER_URL? process.env.SERVER_URL : 'http://localhost:37001',   
                description: 'Local Server'
            }
        ],
        decompose:true,
    }
};
export default config;