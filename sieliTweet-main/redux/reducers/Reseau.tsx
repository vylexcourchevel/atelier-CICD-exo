import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Reseaux } from "../../interfaces/Reseau";

type initialReseau = {
  data: Reseaux[];
  loading: boolean | null;
  error: boolean
}

const initialState: initialReseau = {
  data: [],
  loading: null,
  error: false
} 

export const Reseau = createSlice({
  name: "Reseau",
  initialState,
  /* 
    C'EST ICI QUE LES "REDUCERS" sont définis.
    les "reducers" sont des fonctions qui decrivent comment l'état de l'application change en réponse à des actions.
    Dans ce cas, trois "reducers" sont definis:
    FETCH_START, FETCH_SUCCES et FETCH_FAILURE 
  */
  reducers: {
    FETCH_START: (draft: initialReseau) => {
      draft.loading = true
    }, 
    FETCH_SUCCES: (draft: initialReseau, actions: PayloadAction<Reseaux[]> ) => {
      draft.loading = false
      draft.data = actions.payload
    },
    FETCH_FAILURE: (draft: initialReseau) => {
      draft.loading = false
      draft.error = true
    }
  }
})

export const {
  FETCH_START,
  FETCH_SUCCES,
  FETCH_FAILURE
} = Reseau.actions

export default Reseau.reducer
