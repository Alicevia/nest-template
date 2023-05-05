import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import {WinstonModule} from 'nest-winston'
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file'
@Module({
  controllers: [],
  imports:[
    WinstonModule.forRootAsync({
      inject:[ConfigService],
      useFactory(configService:ConfigService){
        const conf = configService.get('logger')
        return {
          transports:[
            new winston.transports.Console({
              level:'info',
              format: winston.format.combine(
                winston.format.colorize({all:true,colors:{ info: 'blue',warn:'yellow',error: 'red' }}),
                winston.format.splat()
              ),
            }),
            new DailyRotateFile({
              filename: './logs/app-%DATE%.log',
              datePattern: 'YYYY-MM-DD',
              maxSize: '20m',
              maxFiles: '14d',
              level:'error',
              format:winston.format.combine(
                winston.format.timestamp({
                  format:'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.json()
              )
            })
          ]
        }
      }
    })
  ],
  providers: [LoggerService],
  exports:[LoggerService]
})
export class LoggerModule {}
