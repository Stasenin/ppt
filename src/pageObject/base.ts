import {LoggerHelper} from '../helpers/loggerHelper'

export abstract class Base {
    protected readonly pageName: string
    protected logger: LoggerHelper

    protected constructor(pageObjName: string) {
        this.pageName = pageObjName
        this.logger = new LoggerHelper(`[${this.pageName}]`)
    }
}
