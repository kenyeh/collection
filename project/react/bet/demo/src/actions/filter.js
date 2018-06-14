import { login } from '../services/index'

// example
export const toggleVolumeSync = volume => ({
  type: 'SWITCH_VOLUME',
  volume,
});

// use thunk
export const toggleVolume = (volume) => (dispatch, getState) => {
  if (volume === undefined) {
    const {
      filter
    } = getState();
    volume = !filter.volume;
  }
  dispatch({
    type: 'SWITCH_VOLUME',
    volume,
  })
}

// async 
export const fetchSetting = () => dispatch => {
  return login().then((res) => {
    // dispatch(toggleVolumeSync(res.volume));
    dispatch(toggleVolumeSync(false));
  });
}
