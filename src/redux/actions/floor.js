import { floor as floorConst } from 'const';
import { move } from './elevator';

const anyButtonOnFloorIsPushed = (floor) => {
  return (floor.get('up').size || floor.get('down').size);
};

const moveIfStay = (dispatch, getState) => {
  const { elevator, floor } = getState();

  if ((elevator.get('state') !== 'moving' && !elevator.get('activeButtons').size) && anyButtonOnFloorIsPushed(floor)) {
    setTimeout(() => { dispatch(move()); }, 1000);
  }
};


export const Up = (level) => (dispatch, getState) => {
  const state = getState();
  if (!state.floor.get('up').has(level)) {
    dispatch({ type: floorConst.PUSH_UP_BUTTON, level });
    moveIfStay(dispatch, getState);
  }
};


export const Down = (level) => (dispatch, getState) => {
  const state = getState();
  if (!state.floor.get('up').has(level)) {
    dispatch({ type: floorConst.PUSH_DOWN_BUTTON, level });
    moveIfStay(dispatch, getState);
  }
};
