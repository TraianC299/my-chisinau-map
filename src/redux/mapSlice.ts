import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of a Building based on your JSON
export interface Building {
  shortcode: string;
  title: string;
  description: string;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

interface MapState {
  selectedBuilding: Building['shortcode'] | null;
}

const initialState: MapState = {
  selectedBuilding: null,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    // This action will save the building to the global state
    setSelectedBuilding: (state, action: PayloadAction<Building['shortcode'] | null>) => {
      state.selectedBuilding = action.payload;
    },
  },
});

export const { setSelectedBuilding } = mapSlice.actions;
export default mapSlice.reducer;