import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroName',
})
export class HeroNamePipe implements PipeTransform {
  public transform(value: string, ...args: string[]): string {
    return args[0] + value.toUpperCase() + args[0];
  }
}
