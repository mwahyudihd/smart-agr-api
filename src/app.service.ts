import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHelp(){
    return {
      data: `{/dht: to dht sensor {/data},/soilmoisture: to soil sensor}`,
      statusCode: 200
    };
  }
}
