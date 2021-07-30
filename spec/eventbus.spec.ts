import { ICommand, IHandler } from '@/lib'
import { mocked } from 'ts-jest'
import { EventBus } from '../src/lib/CQRS'
import { MetadataStore } from '../src/lib/MetadataStore'

class MockedHandler implements IHandler {
  handle(cq: ICommand) {
    return true
  }
}
class MockedCommand implements ICommand {}

describe('eventbus', () => {
  it('should be defined', () => {
    const eventBus = new EventBus({})

    expect(eventBus).toBeDefined()
  })

  it('should register a cqrs action', () => {
    const store = {
      test: {
        handle: jest.fn(),
      },
    }

    const eventBus = new EventBus(store)

    eventBus.init()

    expect(eventBus.getEvents().size).toBe(1)
  })

  it('should register all cqrs actions', () => {
    const store = {
      test: {
        handle: jest.fn(),
      },
      woef: {
        handle: jest.fn(),
      },
    }

    const eventBus = new EventBus(store)

    eventBus.init()

    expect(eventBus.getEvents().size).toBe(2)
  })

  // AAA
  it('should return us a handler when provided with a key that exists', () => {
    // Arrange
    const store: Record<string, any> = {
      [MockedCommand.constructor.name]: MockedHandler,
    }

    const eventBus = new EventBus(store)
    eventBus.init()

    // Act
    const result = eventBus.getHandler(MockedCommand)

    // Assert
    expect(result).toBeDefined()
  })

  it('should throw an exception when there is no handler', () => {
    const eventBus = new EventBus({})

    eventBus.init()

    expect(() => eventBus.getHandler(MockedCommand)).toThrow()
  })

  describe('execute', () => {
    let eventBus: EventBus

    beforeAll(() => {
      const store: Record<string, any> = {
        [MockedCommand.prototype.constructor.name]: MockedHandler,
      }

      eventBus = new EventBus(store)
      eventBus.init()
    })

    it('Check if a valid command is being passed into getHandler', async () => {
      // Arrange
      const spy = jest.spyOn(eventBus, 'getHandler')

      // Act
      await eventBus.execute(new MockedCommand())

      // Assert
      expect(spy.mock.calls[0][0]).toBeInstanceOf(MockedCommand)
    })

    it('Should return a truthy value', async () => {
      const result = await eventBus.execute(new MockedCommand())

      expect(result).toBeTruthy()
    })
  })
})
