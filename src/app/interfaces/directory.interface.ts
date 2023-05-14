import { TestCase } from "./test-case.interface"

export interface Directory {
  name: string,
  directoryId?: number,
  isProject?: boolean,
  parentDirectoryId?: number,
  expand?: boolean,
  childDirectories?: Directory[]
  testCases?: TestCase[]
}

export interface ServerResponse <T> {
  result: T
}
