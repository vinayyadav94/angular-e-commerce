import { createReducer, on } from "@ngrx/store";
import { Category } from "src/app/models/category.model";
import { setCategoryData } from "./category.actions";

const initialState: Category[] = [];

export const categoryReducer = createReducer(
    initialState,
    on(setCategoryData, (state, {categories}) => {
        console.log('category state changing...')
        return [...categories];
    })
    );