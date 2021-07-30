import { GetPostQuery } from '@/core/post/GetPostQuery'
import { CQRS } from '@/lib/CQRS'
import { CreatePostCommand } from '../../core/post/CreatePostCommand'
import { CreatePostContract } from './CreatePostContract'

export class PostController {
  constructor(private readonly _cqrs: CQRS) {}

  async createPost(contract: CreatePostContract) {
    return this._cqrs.execute(new CreatePostCommand(contract.title))
  }

  async findPost(contract: number) {
    return this._cqrs.execute(new GetPostQuery(contract))
  }
}
