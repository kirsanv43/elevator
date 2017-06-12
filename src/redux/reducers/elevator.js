import { elevator } from 'const';
import { Map, Set } from 'immutable';

const initState = new Map({
  currentLevel: 1,
  activeButtons: new Set(),
  state: 'stay',
  direction: 1,
  doorsIsOpen: false,
  maxLevel: 5,
});

export default function (state = initState, action) {
  switch (action.type) {
    case elevator.PUSH_BUTTON_IN_ELEVATOR: {
      if (state.get('currentLevel') === action.level || state.get('activeButtons').has(action.level)) {
        return state;
      }
      return state.set('activeButtons', state.get('activeButtons').add(action.level));
    }
    case elevator.CHANGE_ELEVATOR_STATE: {
      return state.set('state', action.state);
    }
    case elevator.CHANGE_ELEVATOR_DIRECTION: {
      return state.set('direction', action.direction);
    }
    case elevator.CHANGE_ELEVATOR_LEVEL: {
      return state.set('currentLevel', action.level);
    }
    case elevator.OPEN_ELEVATOR_DOORS: {
      return state.set('doorsIsOpen', true).set('activeButtons', state.get('activeButtons').remove(state.get('currentLevel')));
    }
    case elevator.CLOSE_ELEVATOR_DOORS: {
      return state.set('doorsIsOpen', false);
    }

    default:
      return state;
  }
}
