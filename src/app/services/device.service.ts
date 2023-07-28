import { Injectable } from '@angular/core';
import { Device, ServerResponse } from '../interfaces/device.interface';
import { api } from '../data/api-url';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  url = api.url;
  device: Device;
  productId: number;

  constructor(private http: HttpClient) { }


  deviceSource = new Subject<Device>()

  getAllDevices(){
    return this.http.get<any>(this.url + '/device-list')
    .pipe(map(response => response?.result))
  }

  getDeviceById(id: number) {
    const params = new HttpParams().set('deviceId', id);
    return this.http.get<ServerResponse<Device>>(this.url + '/device', {params})
    .pipe(map(response => response?.result))
  }

  addDevice(device: Device) {
    return this.http.post<ServerResponse<Device>>(this.url + '/device', device)
    .pipe(map(response => response?.result))
  }

  updateDevice(device: Device) {
    return this.http.patch<ServerResponse<Device>>(this.url + '/device', device)
    .pipe(map(response => response?.result))
  }

  deleteDevice(deviceId: number) {
    const params = new HttpParams()
    .set('deviceId', deviceId)
    return this.http.delete<ServerResponse<Device>>(this.url + '/device', {params: params})
    .pipe(map(response => response?.result))
  }
}

