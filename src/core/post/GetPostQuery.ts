import { IQuery } from '../../lib'
export class GetPostQuery implements IQuery {
  constructor(public readonly id: number) {}
}
