import { PersonData } from "src/app/models/person";
import { PersonActions, PersonActionsTypes } from "../actions/person-actions";

export interface State{
  items: PersonData[];
}
const initialState:State = {
  items:[]
};
export function PersonReducer (state= initialState,action:PersonActions):State{
  switch(action.type){
    case PersonActionsTypes.LoadData:
      return { ...state };
      case PersonActionsTypes.LoadDataCompleted:
        return {
           ...state,
            items: action.payload
          };
    default:
      return state || initialState;
  }
}

export const getPersonItems =(state:State) => state.items;
