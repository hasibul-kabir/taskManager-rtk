import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    filterByProjects: [],
    searchBy: ''
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        filterKeys: (state, action) => {
            state.filterByProjects = [...action.payload]
        },
        searchKey: (state, action) => {
            state.searchBy = action.payload
        }
    }
})
export default filterSlice.reducer;
export const { filterKeys, searchKey } = filterSlice.actions;