
import * as fromPerson from '../reducers/person-reducer';
import {ActionReducerMap,createFeatureSelector,createSelector} from "@ngrx/store";
export  interface PersonState{
person:fromPerson.State;

}

// export  const reducers: ActionReducerMap<PersonState> = {
//   person: fromPerson.PersonReducer
// };

// Feature module state composition

export  const getPersonModuleState = createFeatureSelector<PersonState>("person");
export   const getPersonState = createSelector(getPersonModuleState,state=>state.person);
export const getPersonItems = createSelector(getPersonState,fromPerson.getPersonItems);
