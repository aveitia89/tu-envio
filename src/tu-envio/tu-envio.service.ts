import { Injectable } from '@nestjs/common';

@Injectable()
export class TuEnvioService {

    constructor() { }

    async hola(): Promise<String> {
        return "hola mundo";
    }

    async getTuEnvio(url: string): Promise<any> {
        const axios = require('axios');
        return await axios.get(url);

    }

    async login(url: string, user: string, pass: string): Promise<any> {
        const axios = require('axios');
        try {
            const response = await axios.get(url);
            return response;
        } catch (error) {
            console.error(error)
        }
        return null;
    }

    async analisisCharptar(){
        var Jimp = require("jimp");
        var file = __dirname + "/imagenGenerada.jpg";
        Jimp.read(__dirname + '/imagenInicial.jpeg', function (err, image) {
            if (err) throw err;
            image.brightness(-.45).contrast(1).write(file, function(err,image){ //Type1
                if (err) throw err;
            });
        });
    }

    async reconocerTextoImagen() {
        var Tesseract = require('tesseract.js')
        var Jimp = require("jimp");
        var file = __dirname + "/imagenGenerada.jpg";
        Jimp.read(__dirname + '/imagenInicial.jpeg', function (err, image) {
            if (err) throw err;
            image.brightness(-.45).contrast(1).write(file, function(err,image){ //Type1
                if (err) throw err;
                Tesseract.recognize(file)
                  .then(function(result){
                      console.log(result.text.trim());
                  })
            });
        });
    }
}
