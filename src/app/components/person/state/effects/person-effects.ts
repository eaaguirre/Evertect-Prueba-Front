import { Injectable } from "@angular/core";
import {ofType, Actions} from '@ngrx/effects';
import { PersonService } from "src/app/services/person.service";
import { LoadData, LoadDataCompleted, PersonActionsTypes } from "../actions/person-actions";
import { switchMap,map } from "rxjs/operators";


@Injectable()
export class PersonEffects {

  constructor(private personService: PersonService,
             private actions$ : Actions ){}

//@Effect()
initialLoad$= this.actions$.pipe(
       ofType <LoadData>(PersonActionsTypes.LoadData),
       switchMap(action=>this.personService.getAll(action.page,action.rows)),
       map(items=>new LoadDataCompleted(items))

   );

}


