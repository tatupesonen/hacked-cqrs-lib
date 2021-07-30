export interface Entity {
  id: number
}

export class DB {
  data: Entity[] = []

  public findOne(id: number) {
    return this.data.find((item) => item.id === id)
  }

  public createOne(data: any) {
    return this.data.push({
      ...data,
      id: this.data.length + 1,
    })
  }

  public updateOne(id: number, data: any) {
    let foundEntity = this.findOne(id)

    if (!foundEntity) {
      throw new Error('with mustard')
    }

    foundEntity = {
      ...data,
      id: foundEntity.id,
    }

    return foundEntity
  }
}

export const db = new DB()
