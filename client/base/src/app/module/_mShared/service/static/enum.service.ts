import { Injectable } from '@angular/core';
import { NineStatus } from '../../enum/enum';

@Injectable({
  providedIn: 'root'
})
export class Enum {

  static convertEnum(isEnum:any){
    let enums = [];

    let texts = Object.keys(isEnum).filter((v) => isNaN(Number(v)));
    let values = Object.values(isEnum).filter((v) => !isNaN(Number(v)))
    for (let i = 0; i < texts.length; i++) {
      const text = texts[i];
      for (let j = 0; j < values.length; j++) {
        const value = values[j];
        if(i == j){
          let data = {
            text: text,
            value: value
          }
          enums.push(data)
        }
      }
    }

    return enums
  }

}
