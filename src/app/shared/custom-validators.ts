import {AbstractControl, ValidationErrors} from "@angular/forms";

export class CustomValidators {
  static nameValidator(control:AbstractControl): ValidationErrors | null {
    const result = /^[?!,.a-zA-Zа-яА-ЯёЁ\s]+$/.test(control.value);
    return result ? null : {name: { value: control.value }};
  }
  static phoneValidator(control:AbstractControl): ValidationErrors | null {
    const result = /^\+?\d{11,}$/.test(control.value);
    return result ? null : {phone: { value: control.value }};
  }
  static addressValidator(control:AbstractControl): ValidationErrors | null {
    const result = /^[а-яА-ЯёЁa-zA-Z0-9\s/-]+$/.test(control.value);
    return result ? null : {address: { value: control.value }};
  }


}
