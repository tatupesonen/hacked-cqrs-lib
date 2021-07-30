export type Constr<T> = new (...args: any) => T

export interface IHandler<T = any> {
  handle(cq: ICommand): Promise<T> | T
}

export interface ICommand {}
export interface IQuery {}
