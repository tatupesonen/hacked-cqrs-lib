import { db } from '@/data/Database'
import { IHandler, Mustard } from '@/lib'
import { GetPostQuery } from './GetPostQuery'

@Mustard.QueryHandler(GetPostQuery)
export class CreatePostHandler implements IHandler {
  async handle(cq: GetPostQuery) {
    return db.findOne(cq.id)
  }
}
