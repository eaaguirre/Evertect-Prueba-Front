import {Action} from "@ngrx/store"
import { PersonData } from "src/app/models/person";
export enum PersonActionsTypes{
  LoadData = '[Person] LoadData',
  LoadDataCompleted = '[Person]  LoadDataCompleted'
}

export class LoadData implements Action {
  readonly type = PersonActionsTypes.LoadData;
  constructor(public page:number, public rows:number){}
}

export class LoadDataCompleted implements Action{
  readonly type  = PersonActionsTypes.LoadDataCompleted;
  constructor(public payload:PersonData[]) {}
}

export type PersonActions = LoadData| LoadDataCompleted;
