import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testPipe'
})
export class TestPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value.length === 0) {
      return '';
    }
    return value.replace(/\w\S*/g, txt => (txt[0].toUpperCase() + txt.substr(1).toLowerCase()));
  }

}
