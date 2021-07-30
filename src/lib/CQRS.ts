import { MetadataStore } from './MetadataStore'
import { Constr, ICommand, IHandler, IQuery } from './types'

export class CQRS {
  private readonly _eventBus
  constructor() {
    this._eventBus = new EventBus(MetadataStore)
    this._eventBus.init()
  }

  async execute(command: ICommand | IQuery) {
    return this._eventBus.execute(command)
  }
}

export function CommandHandler(command: Constr<ICommand>) {
  return (handler: any) => {
    const ctorName = command.prototype.constructor.name
    MetadataStore[ctorName] = handler
  }
}

export function QueryHandler(query: Constr<IQuery>) {
  return (handler: any) => {
    const ctorName = query.prototype.constructor.name
    MetadataStore[ctorName] = handler
  }
}

export class EventBus {
  private _events: Map<string, IHandler> = new Map()

  constructor(private readonly _store: Record<string, IHandler>) {}

  init() {
    Object.entries(this._store).forEach(([commandName, commandHandler]) => {
      this._events.set(commandName, commandHandler)
    })
  }

  async execute(command: ICommand) {
    // Get name from command with prototype
    const handler = this.getHandler(command) as unknown as Constr<IHandler>

    const instance = new handler()

    // Execute
    const result = await instance.handle(command)

    // Return
    return result
  }

  public getHandler = (command: ICommand) => {
    const ctorName = command.constructor.name

    const handler = this._events.get(ctorName)

    if (!handler) {
      throw new Error('Handler is not registered')
    }

    return handler
  }

  public getEvents() {
    return this._events
  }
}

export const eventBus = new EventBus(MetadataStore)
