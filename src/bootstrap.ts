import 'dotenv/config'

import { CreatePostContract } from './web/post/CreatePostContract'
import { PostController } from './web/post/PostController'

import './core/post/CreatePostHandler'
import './core/post/GetPostQueryHandler'

import { CQRS } from './lib/CQRS'

async function run() {
  const cqrs = new CQRS()

  const controller = new PostController(cqrs)

  await controller.createPost(new CreatePostContract('title'))
  await controller.createPost(new CreatePostContract('title'))
  await controller.createPost(new CreatePostContract('title'))
  await controller.createPost(new CreatePostContract('title'))
  await controller.createPost(new CreatePostContract('title'))

  const result = await controller.findPost(1)
  console.log(result)
}

run()
