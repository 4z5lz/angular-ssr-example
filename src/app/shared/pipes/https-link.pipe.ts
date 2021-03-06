import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'httpsLink',
})
export class HttpsLinkPipe implements PipeTransform {
  transform(value: string): string {
    return value && value.replace('http://', 'https://');
  }
}
