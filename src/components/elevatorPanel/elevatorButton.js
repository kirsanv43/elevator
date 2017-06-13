import cn from 'classnames';

const ElevatorButton = ({ level, onClick, currentLevel, activeButtons }) => (
  <div
    className={cn('elevator__button', {
      'elevator__button--active': activeButtons.has(level) && currentLevel !== level,
    })}
    onClick={(e) => onClick(e, level)}
  >
        {level}
  </div>
);

ElevatorButton.propTypes = {
  currentLevel: PropTypes.number,
  level: PropTypes.number,
  onClick: PropTypes.func,
  activeButtons: PropTypes.object,
};

export default ElevatorButton;
