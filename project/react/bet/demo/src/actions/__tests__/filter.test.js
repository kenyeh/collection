import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  toggleVolumeSync,
  toggleVolume,
  fetchSetting
} from '../filter';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('filter actions', () => {
  it('should create an action to switch volume', () => {
    const volume = true;
    const expectedAction = {
      type: 'SWITCH_VOLUME',
      volume,
    }
    expect(toggleVolumeSync(volume)).toEqual(expectedAction);
  });

  it('should create SWITCH_VOLUME action when thunk', () => {
    const expectedActions = [{
      type: 'SWITCH_VOLUME',
      volume: false
    }, ]
    const store = mockStore({
      filter: {
        volume: true
      }
    })

    store.dispatch(toggleVolume())
    expect(store.getActions()).toEqual(expectedActions);
  });

  // it('shoule create when fetch success', () => {
  //   const expectedActions = [{
  //     type: 'SWITCH_VOLUME',
  //     volume: false
  //   }, ]
  //   const store = mockStore({
  //     filter: {
  //       volume: true
  //     }
  //   })

  //   return store.dispatch(fetchSetting()).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);
  //   })
  // });
})
