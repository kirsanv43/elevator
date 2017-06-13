import { floor as floorConst } from 'const';
import { move } from './elevator';

const anyButtonOnFloorIsPushed = (floor) => {
  return (floor.get('up').size || floor.get('down').size);
};

const moveIfStay = (dispatch, getState) => {
  const { elevator, floor } = getState();

  if ((elevator.get('state') !== 'moving' && !elevator.get('activeButtons').size) && !anyButtonOnFloorIsPushed(floor)) {
    setTimeout(() => { dispatch(move()); }, 1000);
  }
};


export const up = (level) => (dispatch, getState) => {
  const state = getState();
  if (!state.floor.get('up').has(level)) {
    moveIfStay(dispatch, getState);
    dispatch({ type: floorConst.PUSH_UP_BUTTON, level });
  }
};


export const down = (level) => (dispatch, getState) => {
  const state = getState();
  if (!state.floor.get('up').has(level)) {
    moveIfStay(dispatch, getState);
    dispatch({ type: floorConst.PUSH_DOWN_BUTTON, level });
  }
};
