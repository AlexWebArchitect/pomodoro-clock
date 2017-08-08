import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

// ========================================

interface CounterProps {
  name: string;
  counter: number;
  onClick(name: string, value: string): void;
}
interface CounterState { }

class Counter extends React.Component<CounterProps, CounterState>  {
  render() {
    return (
      <div>
        {this.props.name} LENGTH
        <div>
          <button onClick={() => this.props.onClick(this.props.name, '-')}>-</button>
          {this.props.counter}
          <button onClick={() => this.props.onClick(this.props.name, '+')}>+</button>
        </div>
      </div>
    );
  }
}

interface Props { }
interface State {
  mode: string;
  break: number;
  session: number;
}

class PomodoroClock extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      mode: 'Start',
      break: 1,
      session: 1
    };
  }

  handleClick(n: string, i: string): void {
    let counter: number;
    switch (n) {
      case 'BREAK':
        counter = this.state.break;
        if ( i === '+') {
          this.setState({
            break: counter + 1
          });
        } else {
          this.setState({
            break: counter - 1 
          });
        }
        break;
      case 'SESSION':
        counter = this.state.session;
        if ( i === '+') {
          this.setState({
            session: counter + 1
          });
        } else {
          this.setState({
            session: counter - 1 
          });
        }
        break;
      default:
        break;
    }
  }

  handlePress() {
    
  }

  render() {
    return (
      <div>
        <button onClick={() => this.handlePress()}>{this.state.mode}</button>
        <Counter name="BREAK" counter={this.state.break} onClick={(n, i) => this.handleClick(n, i)} />
        <Counter name="SESSION" counter={this.state.session} onClick={(n, i) => this.handleClick(n, i)} />
      </div>
    );
  }
}

ReactDOM.render(<PomodoroClock />, document.getElementById('root'));