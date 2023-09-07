import { IConfigService } from './config.service.interface';
import { DotenvConfigOptions, DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';
import { ILogger } from '../logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();

    if (result.error) {
      this.logger.error('\n[ConfigService] Не удалось прочитать файл .env или он отсутствует');
    } else {
      this.logger.log('\n[ConfigService] Конфигурация .env загружена');
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}
