import { elevator, floor } from 'const';

export const changeState = state => ({ type: elevator.CHANGE_ELEVATOR_STATE, state });
export const changeDirection = direction => ({ type: elevator.CHANGE_ELEVATOR_DIRECTION, direction });

export const pushButton = (level) => (dispatch, getState) => {
  const state = getState();
  if (state.elevator.get('currentLevel') === level) {
    return;
  }
  if ((state.elevator.get('state') !== 'moving' && !state.elevator.get('activeButtons').size)
|| state.floor.get('up').size || state.floor.get('down').size) {
    console.log('pushButton move');
    setTimeout(() => { dispatch(move()); }, 1000);
  }
  dispatch({ type: elevator.PUSH_BUTTON_IN_ELEVATOR, level });
};


export const changeLevel = (level) => (dispatch, getState) => {
  const state = getState();
  const activeButtons = state.elevator.get('activeButtons');
  const direction = state.elevator.get('direction');
  const up = state.floor.get('up');
  const down = state.floor.get('down');
  dispatch({ type: elevator.CHANGE_ELEVATOR_LEVEL, level });
  const isSomeoneWantToGoUp = (direction > 0 && up.some(item => item === level));
  const isSomeoneWantToGoDown = (direction < 0 && down.some(item => item === level));
  if (activeButtons.has(level) || isSomeoneWantToGoUp || isSomeoneWantToGoDown) {
    setTimeout(() => {
      dispatch(changeState('stay'));
      dispatch(openElevatorDoors(isSomeoneWantToGoUp, isSomeoneWantToGoDown, level));
    }, 300);
  } else {
    setTimeout(() => { dispatch(move()); }, 1000);
  }
};

export const openElevatorDoors = (up, down, currentLevel) => (dispatch, getState) => {
  dispatch({ type: elevator.OPEN_ELEVATOR_DOORS });
  dispatch({ type: floor.LET_THOSE_PEOPLE_IN, up, down, currentLevel });

  setTimeout(() => { dispatch(closeElevatorDoors()); }, 300);
};

export const closeElevatorDoors = () => (dispatch, getState) => {
  dispatch({ type: elevator.CLOSE_ELEVATOR_DOORS });
  dispatch(changeState('stay'));
  setTimeout(() => { dispatch(move()); }, 300);
};


const needMoveToUp = (activeButtons, currentLevel, maxLevel, up, down) => {
  if (activeButtons.some(item => item > currentLevel)) {
    return true;
  }
  if (currentLevel !== maxLevel) {
    return true;
  }

  if (up.some((item) => item > currentLevel) || down.some((item) => item > currentLevel)) {
    return true;
  }

  return false;
};


const needMoveToDown = (activeButtons, currentLevel, maxLevel, up, down) => {
  if (activeButtons.some(item => item < currentLevel)) {
    return true;
  }

  if (currentLevel !== 1) {
    return true;
  }

  if (up.some((item) => item < currentLevel) || down.some((item) => item < currentLevel)) {
    return true;
  }

  return false;
};

export const move = () => (dispatch, getState) => {
  console.log('move');
  const state = getState();
  const direction = state.elevator.get('direction');
  const currentLevel = state.elevator.get('currentLevel');
  const activeButtons = state.elevator.get('activeButtons');
  const maxLevel = state.elevator.get('maxLevel');
  const elevatorState = state.elevator.get('state');

  const up = state.floor.get('up');
  const down = state.floor.get('down');

  if (!activeButtons.size && !up.size && !down.size) { //
    return;
  }
  if (elevatorState !== 'moving') dispatch(changeState('moving'));

  const isSomeoneWantToGoUp = (up.size === 1 && up.has(currentLevel));
  const isSomeoneWantToGoDown = (down.size === 1 && down.has(currentLevel));

  if (direction > 0) {
    if (needMoveToUp(activeButtons, currentLevel, maxLevel, up, down)) {
      dispatch(changeLevel(currentLevel + direction));
    } else if ((activeButtons.size === 1 && activeButtons.has(currentLevel)) ||
isSomeoneWantToGoUp ||
isSomeoneWantToGoDown
   ) {
      dispatch(openElevatorDoors(isSomeoneWantToGoUp, isSomeoneWantToGoDown, currentLevel));
    }
     else {
      dispatch(changeDirection(-1));
      dispatch(move());
    }
  } else {
    if (needMoveToDown(activeButtons, currentLevel, maxLevel, up, down)) {
      dispatch(changeLevel(currentLevel + direction));
    } else if ((activeButtons.size === 1 && activeButtons.has(currentLevel)) ||
isSomeoneWantToGoUp ||
isSomeoneWantToGoDown
   ) {
      dispatch(openElevatorDoors(isSomeoneWantToGoUp, isSomeoneWantToGoDown, currentLevel));
    } else {
      dispatch(changeDirection(1));
      dispatch(move());
    }
  }
};
