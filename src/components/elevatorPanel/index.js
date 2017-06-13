import { elevator } from 'actions';
import ElevatorButton from './elevatorButton';

export default class ElevatorPanel extends React.Component {

  static propTypes = {
    currentLevel: PropTypes.number,
    activeButtons: PropTypes.object,
    dispatch: PropTypes.func,
  };

  handleButtonClick = (e, level) => {
    this.props.dispatch(elevator.pushButton(level));
  }

  render() {
    return (
      <div className="elevator__panel">
        <ElevatorButton
          level={5}
          onClick={this.handleButtonClick}
          currentLevel={this.props.currentLevel}
          activeButtons={this.props.activeButtons}
        />
        <br />
        <ElevatorButton
          level={3}
          onClick={this.handleButtonClick}
          currentLevel={this.props.currentLevel}
          activeButtons={this.props.activeButtons}
        />
        <ElevatorButton
          level={4}
          onClick={this.handleButtonClick}
          currentLevel={this.props.currentLevel}
          activeButtons={this.props.activeButtons}
        />
        <br />
        <ElevatorButton
          level={1}
          onClick={this.handleButtonClick}
          currentLevel={this.props.currentLevel}
          activeButtons={this.props.activeButtons}
        />
        <ElevatorButton
          level={2}
          onClick={this.handleButtonClick}
          currentLevel={this.props.currentLevel}
          activeButtons={this.props.activeButtons}
        />
      </div>);
  }
}
