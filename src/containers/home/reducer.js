import {
  GET_CITIES_REQUEST,
  GET_CITIES,
  GET_CITIES_FAILURE,
  GET_WEATHER_REQUEST,
  GET_WEATHER,
  GET_WEATHER_FAILURE,
  SET_CITIES
} from "../../store";

export const initialState = {
  cities: {
    loading: false,
    loaded: false,
    data: [],
    selectedData: []
  },
  weather: {
    loading: false,
    loaded: false,
    data: []
  }
};

export function reducer(state, action) {
  switch (action.type) {
    case GET_CITIES_REQUEST:
      return {
        ...state,
        cities: {
          ...state.cities,
          loading: true
        }
      };

    case GET_CITIES: {
      const data = action.payload;
      return {
        ...state,
        cities: {
          ...state.cities,
          loading: false,
          loaded: true,
          data
        }
      };
    }

    case GET_CITIES_FAILURE: {
      return {
        ...state,
        cities: {
          ...state.cities,
          loading: false,
          loaded: true,
          data: []
        }
      };
    }

    case SET_CITIES: {
      return {
        ...state,
        cities: {
          ...state.cities,
          selectedData: action.payload
        }
      };
    }

    case GET_WEATHER_REQUEST: {
      return {
        ...state,
        weather: {
          ...state.weather,
          loading: true
        }
      };
    }

    case GET_WEATHER: {
      return {
        ...state,
        weather: {
          ...state.weather,
          loading: false,
          loaded: true,
          data: [...state.weather.data, action.payload]
        }
      };
    }

    case GET_WEATHER_FAILURE: {
      return {
        ...state,
        weather: {
          ...state.weather,
          loading: false,
          loaded: true,
          data: []
        }
      };
    }

    default:
      return state;
  }
}
