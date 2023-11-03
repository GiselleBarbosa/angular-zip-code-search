import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ZipcodeMaskService {
  public zipCodePatterMask(event: KeyboardEvent): void {
    const field = event.target as HTMLInputElement;
    const fieldLength = field?.value.length;

    if (fieldLength === 5) {
      field.value += '-';
    }
  }
}
