import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: string) {
    const date = new Date(value);

    if (isNaN(date.getTime())) return null;

    return date;
  }
}
