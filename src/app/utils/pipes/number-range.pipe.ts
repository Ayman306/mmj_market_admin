import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberRange',
  standalone: true
})
export class NumberRangePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const regex = /^(?:\d{1,5} - \d{1,5}|\d{1,5})$/; // Matches "12000 - 10000" or "10000"
    return regex.test(value) ? value : ''; // Return value if valid, else empty
  }

}
