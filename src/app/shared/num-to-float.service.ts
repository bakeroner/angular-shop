import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NumToFloatService {
	toFloat(value: number): string {
    	let stringValue: string = value.toString();
    	if (value - Math.floor(value) != 0) {
    	  let afterDot = stringValue.substr(stringValue.indexOf('.'));
    	  if (afterDot.length == 2) {
    	    stringValue += '0';
    	  }
    	}
    	else {
    	  stringValue += '.00';
    	}
    	return stringValue;
  	}
	constructor() { }
}