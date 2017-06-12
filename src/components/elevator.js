import cn from 'classnames';


const Elevator = ({ currentLevel, doorsIsOpen }) => (
  <div className={cn('elevator', { 'elevator--open': doorsIsOpen })}>
    <div className="elevator__people">
      <img src="public/images/hangover.jpg" alt="" />
    </div>
    <div className="elevator__board">{currentLevel}</div>
  </div>
);

Elevator.propTypes = {
  currentLevel: PropTypes.number,
  doorsIsOpen: PropTypes.bool,
};

export default Elevator;
