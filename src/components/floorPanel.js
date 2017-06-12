import cn from 'classnames';
import { connect } from 'react-redux';
import { floor } from 'actions';

@connect((state, props) => ({
  upIsActive: state.floor.get('up').has(props.level),
  downIsActive: state.floor.get('down').has(props.level),
}))
export default class FloorPanel extends React.Component {

  handleUpClick = () => {
    const { dispatch, level } = this.props;
    dispatch(floor.Up(level));
  }

  handleDownClick = () => {
    const { dispatch, level } = this.props;
    dispatch(floor.Down(level));
  }

  render() {
    const { upIsActive, downIsActive, level } = this.props;
    return (
      <div className="elevator__panel">
        <div
          onClick={this.handleUpClick}
          className={cn('elevator__button elevator__button--lg', { 'elevator__button--active': upIsActive })}
        >
          up
        </div>
        <br />
        <div
          onClick={this.handleDownClick}
          className={cn('elevator__button elevator__button--lg', { 'elevator__button--active': downIsActive })}
        >
          down
        </div>
      </div>);
  }
}
