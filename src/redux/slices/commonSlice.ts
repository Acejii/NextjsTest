import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
    menuCollapsed: boolean;
}

const initialState: CommonState = {
    menuCollapsed: true,
};

const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        toggleMenuCollapsed(state) {
            state.menuCollapsed = !state.menuCollapsed;
        }
    }
});

export const { toggleMenuCollapsed } = commonSlice.actions;

export default commonSlice.reducer;