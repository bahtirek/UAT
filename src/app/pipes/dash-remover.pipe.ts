import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dashRemover'})
export class DashRemoverPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/-/g, " ");
  }
}
