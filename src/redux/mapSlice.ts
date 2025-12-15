import { HistoricalBuilding } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of a Building based on your JSON


interface MapState {
  selectedBuilding: HistoricalBuilding['shortcode'] | null;
}

const initialState: MapState = {
  selectedBuilding: null,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    // This action will save the building to the global state
    setSelectedBuilding: (state, action: PayloadAction<HistoricalBuilding['shortcode'] | null>) => {
      state.selectedBuilding = action.payload;
    },
  },
});

export const { setSelectedBuilding } = mapSlice.actions;
export default mapSlice.reducer;