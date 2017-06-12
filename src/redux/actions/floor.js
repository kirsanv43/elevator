import { floor as floorConst } from 'const';
import elevatorActions from './elevator';

const anyButtonOnFloorIsPushed = (floorState) => {
  return (floorState.get('up').size || floorState.get('down').size);
};

const moveIfStay = (elevator, floor, dispatch) => {
  if ((elevator.get('state') !== 'moving' && !elevator.get('activeButtons').size)
        && anyButtonOnFloorIsPushed(floor)) {
    setTimeout(() => { dispatch(elevatorActions.move()); }, 1000);
  }
};


export const Up = (level) => (dispatch, getState) => {
  const state = getState();
  if (!state.floor.get('up').has(level)) {
    dispatch({ type: floorConst.PUSH_UP_BUTTON, level });
    moveIfStay(state.elevator, state.floor, dispatch);
  }
};


export const Down = (level) => (dispatch, getState) => {
  const state = getState();
  if (!state.floor.get('up').has(level)) {
    dispatch({ type: floorConst.PUSH_DOWN_BUTTON, level });
    moveIfStay(state.elevator, state.floor, dispatch);
  }

};
