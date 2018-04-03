import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'responsesOfQuestion'
})
export class ResponsesOfQuestionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return value;

    return value.filter(element => element.id_question == args);

    
  }

}
