import { CQRS } from '../src/lib/CQRS'

describe('cqrs', () => {
  it('should be defined', () => {
    const cqrs = new CQRS()

    expect(cqrs).toBeDefined()
  })
})
