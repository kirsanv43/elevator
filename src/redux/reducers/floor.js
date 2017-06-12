import { floor } from 'const';
import { Map, Set } from 'immutable';

const initState = new Map({
  up: new Set(),
  down: new Set(),
});

export default function (state = initState, action) {
  switch (action.type) {
    case floor.PUSH_UP_BUTTON: {
      return state.set('up', state.get('up').add(action.level));
    }
    case floor.PUSH_DOWN_BUTTON: {
      return state.set('down', state.get('down').add(action.level));
    }
    default:
      return state;
  }
}
