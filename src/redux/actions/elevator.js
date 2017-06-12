import { elevator } from 'const';


export const pushButton = (level) => (dispatch, getState) => {
  const state = getState();
  if (state.elevator.get('currentLevel') === level) return;
  if ((state.elevator.get('state') !== 'moving' && !state.elevator.get('activeButtons').size)
|| state.floor.get('up').size || state.floor.get('down').size) {
    console.log('pushButton move')
    setTimeout(() => { dispatch(move()); }, 1000);
  }
  dispatch({ type: elevator.PUSH_BUTTON_IN_ELEVATOR, level });
};

export const changeState = state => ({ type: elevator.CHANGE_ELEVATOR_STATE, state });
export const changeDirection = direction => ({ type: elevator.CHANGE_ELEVATOR_DIRECTION, direction });

export const changeLevel = (level) => (dispatch, getState) => {
  const state = getState();
  const activeButtons = state.elevator.get('activeButtons');
  dispatch({ type: elevator.CHANGE_ELEVATOR_LEVEL, level });

  if (activeButtons.has(level)) {
    setTimeout(() => { dispatch(changeState('stay')); dispatch(openElevatorDoors()); }, 300);
  } else {
    setTimeout(() => { dispatch(move()); }, 1000);
  }
};

export const openElevatorDoors = () => (dispatch, getState) => {
  dispatch({ type: elevator.OPEN_ELEVATOR_DOORS });
  setTimeout(() => { dispatch(closeElevatorDoors()); }, 300);
};

export const closeElevatorDoors = () => (dispatch, getState) => {
  dispatch({ type: elevator.CLOSE_ELEVATOR_DOORS });
  setTimeout(() => { dispatch(move()); }, 300);
};

 


export const move = () => (dispatch, getState) => {
  const state = getState();
  const direction = state.elevator.get('direction');
  const currentLevel = state.elevator.get('currentLevel');
  const activeButtons = state.elevator.get('activeButtons');
  const elevatorState = state.elevator.get('state');

  const up = state.floor.get('state');
  const down = state.floor.get('state');

  if (!activeButtons.size) { // && !up.size && !down.size
    return;
  }
  if (elevatorState !== 'moving') dispatch(changeState('moving'));

  if (direction > 0) {
    if (activeButtons.some(item => item > currentLevel)) {
      dispatch(changeLevel(currentLevel + direction));
    } else if (activeButtons.size === 1 && activeButtons.has(currentLevel)) {
      dispatch(openElevatorDoors());
    } else {
      dispatch(changeDirection(-1));
      dispatch(move());
    }
  } else {
    if (activeButtons.some(item => item < currentLevel)) {
      dispatch(changeLevel(currentLevel + direction));
    } else if (activeButtons.size === 1 && activeButtons.has(currentLevel)) {
      dispatch(openElevatorDoors());
    } else {
      dispatch(changeDirection(1));
      dispatch(move());
    }
  }
};
