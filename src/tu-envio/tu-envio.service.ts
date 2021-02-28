import { Injectable } from '@nestjs/common';

@Injectable()
export class TuEnvioService {

    constructor() { }

    async hola(): Promise<String> {
        return "hola mundo";
    }

    async getTuEnvio(url:string) {
        const axios = require('axios')
        try {
            const response = await axios.get(url);
            return response;
        } catch (error) {
            console.error(error)
        }
        return null;
    }
}
