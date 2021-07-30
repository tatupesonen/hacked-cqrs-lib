import { db } from '@/data/Database'
import { ICommand, IHandler, Mustard } from '@/lib'
import { CreatePostCommand } from './CreatePostCommand'

@Mustard.CommandHandler(CreatePostCommand)
export class CreatePostHandler implements IHandler {
  async handle(cq: ICommand) {
    return db.createOne(cq)
  }
}
