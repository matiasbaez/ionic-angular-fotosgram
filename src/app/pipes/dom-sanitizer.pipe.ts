import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {

  constructor(
    private domSanitizer: DomSanitizer
  ) {}

  transform(imageUrl: string): any {
    const domImg = `background-image: url('${imageUrl}')`;
    return this.domSanitizer.bypassSecurityTrustStyle(domImg);
  }

}
