
// example
export const initialState = {
  volume: true,
};

const preference = (state = initialState, action) => {
  switch (action.type) {
    case "SWITCH_VOLUME":
      return { ...state, volume: action.volume};
    default:
      return state;
  }
};

export default preference;
