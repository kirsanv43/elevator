import FloorPanel from './components/floorPanel';
import ElevatorPanel from './components/elevatorPanel';
import Elevator from './components/elevator';
import '../assets/scss/main.scss';
import { connect } from 'react-redux';

@connect(state => ({
  currentLevel: state.elevator.toJS().currentLevel,
  activeButtons: state.elevator.get('activeButtons'),
  doorsIsOpen: state.elevator.get('doorsIsOpen')
}))
export default class App extends React.Component {

  static propTypes = {
    currentLevel: PropTypes.number,
  };

  render() {
    return (
      <div className="flex-row align-center justify-center" style={{ height: '100%' }}>
        <Elevator {...this.props} />
        <ElevatorPanel {...this.props} />
        <div className="elevator__floors">
          <FloorPanel level={5} />
          <FloorPanel level={4} />
          <FloorPanel level={3} />
          <FloorPanel level={2} />
          <FloorPanel level={1} />
        </div>
      </div>
    );
  }
}
