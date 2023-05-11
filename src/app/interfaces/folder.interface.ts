export interface Folder {
  name: string,
  folderId: number,
  state: boolean,
  path?: string,
  subFolders?: Folder[]
}