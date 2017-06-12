import { elevator } from 'const';
import actions from 'actions';

const manager = store => next => action => {
  next(action);
  const state = store.getState();
  const activeButtons = state.elevator.get('activeButtons');
  if (action.type === elevator.PUSH_BUTTON_IN_ELEVATOR && state.elevator.get('state') !== 'moving' && !activeButtons.size) {
    setTimeout(() => { store.dispatch(actions.elevator.move()); }, 1000);

  }
};
export default manager;
