import {storeCategory} from '../shared/data'
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    storeCategory,

}

export const Category = createSlice({
    name: "category",
    initialState,
    reducers: {

    }
})

export default Category.reducer