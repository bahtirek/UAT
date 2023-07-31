export interface ProjectItem {
  itemId?: number,
  name?: string,
  state?: boolean
}

export interface ServerResponse <T> {
result: T
}
