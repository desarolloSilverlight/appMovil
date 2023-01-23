import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {NgControl} from '@angular/forms';
import {DecimalPipe} from '@angular/common';

@Directive({
  selector: '[appOnly]'
})
export class OnlyDirective {

  @Input('appOnly') type: 'Letters' | 'Numbers' | 'Currency' | 'NumbersLetters' | 'Percentage' |
    'Money' | 'Decimal' | 'Address' | 'BussinessName' | 'Identi' | 'VIN' | 'DecimalValores' | 'NumbersLettersDot' | 'NumbersLettersOnly' | 'NumbersLettersPG' | 'NumbersLettersLine' | 'LettersOnly';
  @Input() option: 'Capitalize' | 'Lower' | 'Upper';

  blank = new RegExp(/^[\ ]+|[\ ]{2,}?|[\ ]+$/g);
  lastword = new RegExp(/([a-zA-z]+$)/g);
  decimalPipe: DecimalPipe;

  constructor(private el: ElementRef, private render: Renderer2, private control: NgControl) {
    this.decimalPipe = new DecimalPipe('en-US');
  }

  @HostListener('input') oninput() {
    const abstractControl = this.control.control;
    let value = this.el.nativeElement.value;
    let r;
    let result;
    if (this.type === 'Letters') { // no permite caracteres
      r = new RegExp(/[0-9_-]+/g);
      result = value.replace(r, '');
      r = new RegExp(/[\\#+\[\]@$~%'":*¿?<°(),.&/|¨´;>{}!¡=]/g);
      result = result.replace(r, '');
      this.render.setProperty(this.el.nativeElement, 'value', result);
      abstractControl.setValue(result);
    }
    if (this.type === 'LettersOnly') { // permite caracteres -(&)/
      r = new RegExp(/[0-9_]+/g);
      result = value.replace(r, '');
      r = new RegExp(/[\\#+\[\]@$~%'":*¿?<°|¨´;>{}!¡=]/g);
      result = result.replace(r, '');
      this.render.setProperty(this.el.nativeElement, 'value', result);
    }
    if (this.type === 'Numbers') {
      r = new RegExp(/\D/g);
      result = value.replace(r, '');
      this.render.setProperty(this.el.nativeElement, 'value', result);
      this.control.valueAccessor.writeValue(result);
      abstractControl.setValue(result);
    }
    if (this.type === 'Currency') {
      r = new RegExp('[\.,]', 'g');
      const numberFormat = parseInt(String(value).replace(r, ''));
      const money = isNaN(numberFormat) ? '' : numberFormat.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
      this.render.setProperty(this.el.nativeElement, 'value', money);
    }
    if (this.type === 'NumbersLetters') {// no permite caracteres
      r = new RegExp(/[\\#+\[\]@$~|¬^°¨%'"_;&:*¿?<>(/´)\-,.{}!¡=]/g);
      result = value.replace(r, '');
      this.render.setProperty(this.el.nativeElement, 'value', result);
      abstractControl.setValue(result);
    }
    if (this.type === 'NumbersLettersOnly') {// permite caracteres ()-/&.,
      r = new RegExp(/[\\#+\[\]@$~|¬^°¨%'"_;:*¿?<>{}!¡=]/g);
      result = value.replace(r, '');
      this.render.setProperty(this.el.nativeElement, 'value', result);
      abstractControl.setValue(result);
    }
    if (this.type === 'NumbersLettersPG') {// permite caracteres ()-/&.,
      r = new RegExp(/[\\#+\[\]@$~|¬^°¨'"_;:*¿?<>{}!¡=]/g);
      result = value.replace(r, '');
      this.render.setProperty(this.el.nativeElement, 'value', result);
      abstractControl.setValue(result);
    }
    if (this.type === 'NumbersLettersLine') {// permite guion -
      r = new RegExp(/[\\#+\[\]@$~|¬^°¨%'"_;&:*¿?<>(),.{´}!¡=]/g);
      result = value.replace(r, '');
      this.render.setProperty(this.el.nativeElement, 'value', result);
      abstractControl.setValue(result);
    }
    if (this.type === 'NumbersLettersDot') {// permite .
      r = new RegExp(/[\\#+\[\]@$~|¬^°¨%'"_;&:*¿?<>(/´)\-,{}!¡=]/g);
      result = value.replace(r, '');
      this.render.setProperty(this.el.nativeElement, 'value', result);
      abstractControl.setValue(result);
    }
    if (this.type === 'Identi') {// no permite espacion ni caracteres
      r = new RegExp(/[\\#+\[\]@$~|¬^°¨%'"_;&:*¿?<>(/´)\-,.{}!¡=]/g);
      result = value.trim().replace(r, '');
      this.render.setProperty(this.el.nativeElement, 'value', result);
      abstractControl.setValue(result);
    }
    if (this.type === 'Address') {
      r = new RegExp(/[\\+\[\]&,|()@$~%¨'";:*°´_¿?<>{}!¡=]/g);
      result = value.replace(r, '');
      this.render.setProperty(this.el.nativeElement, 'value', result);
      abstractControl.setValue(result);
    }
    if (this.type === 'BussinessName') {
      r = new RegExp(/[\\+\[\]@$~%¨'":*;¿?<>{°|#´_}!¡=]/g);
      result = value.replace(r, '');
      this.render.setProperty(this.el.nativeElement, 'value', result);
      abstractControl.setValue(result);
    }


    if (this.type === 'Decimal') {
      r = new RegExp(/[&\/\\a-zA-Z #,+()$~%'":*°|¨´_;¿?<>{}!¡=]/g);
      result = value.replace(r, '');
      this.render.setProperty(this.el.nativeElement, 'value', result);
    }
    if (this.type === 'DecimalValores') {
      r = new RegExp(/^\d{0,10}(\.\d{0,6})?$/g);
      result = value.match(r);
      this.render.setProperty(this.el.nativeElement, 'value', result);
    }
    if (this.type === 'VIN') {
      r = new RegExp(/[IOQÑioqñ]/g);
      result = value.replace(r, '');
      this.render.setProperty(this.el.nativeElement, 'value', result);

      //  const v = value.match(r);
      // if(v) {
      //     this.setValueControl(abstractControl.errors, "true");
      //   }
    }

    if (this.option === 'Capitalize') {
      const lw = this.lastword.exec(value);
      if (lw != null) {
        value = result.replace(this.lastword, '') + this.capitalize(lw[0]);
      }
      result = result.replace(r, '');
      this.render.setProperty(this.el.nativeElement, 'value', result);
    }

    if (this.option === 'Lower') {
      value = result.toLowerCase();
      this.render.setProperty(this.el.nativeElement, 'value', value);
      this.setValueControl(abstractControl, value);
    }
    if (this.option === 'Upper') {
      if (result) {
        value = result.toUpperCase();
        this.render.setProperty(this.el.nativeElement, 'value', value);
        this.setValueControl(abstractControl, value);
      }
    }


  }


  @HostListener('change') onchange() {
    let value = this.el.nativeElement.value;
    value = value.trim();
    if (value === '') {
      value = null;
      const abstractControl = this.control.control;
      abstractControl.setValue(value);
      abstractControl.updateValueAndValidity();
    }
    this.render.setProperty(this.el.nativeElement, 'value', value);
  }

  setValueControl(abstractControl, value) {
    if (abstractControl) {
      abstractControl.setValue(value);
    }
  }

  capitalize(s) {
    if (typeof s !== 'string') {
      return '';
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}

