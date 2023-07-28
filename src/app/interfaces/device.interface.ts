export interface Device {
    deviceId?: number,
    name?: string,
    state?: boolean
}

export interface ServerResponse <T> {
  result: T
}
