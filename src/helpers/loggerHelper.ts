import {getLogger, Logger} from 'log4js'

export class LoggerHelper {
  private log4js: Logger
  private category: string

  constructor(category: string) {
    this.log4js = getLogger(category)
    this.log4js.level = 'trace'
    this.category = category
  }

  public info(message: string, ...args: any[]): void {
    this.log4js.info(`${message}`, ...args)
  }

  public error(message: string, ...args: any[]): void {
    this.log4js.error(`${message}`, ...args)
  }

  public warn(message: string, ...args: any[]): void {
    this.log4js.warn(`${message}`, ...args)
  }

}
