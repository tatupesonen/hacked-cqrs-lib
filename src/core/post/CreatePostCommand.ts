import { ICommand } from '../../lib'

export class CreatePostCommand implements ICommand {
  constructor(public readonly title: string) {}
}
