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
  inter: number;
  intervalID: number;
}

class PomodoroClock extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      mode: 'Start',
      break: 1,
      session: 1,
      inter: 0,
      intervalID: 0
    };
  }

  handleClick(n: string, i: string): void {
    let counter: number;
    let mode = this.state.mode;
    switch (n) {
      case 'BREAK':
        counter = this.state.break;
        if (i === '+' && mode === 'Start') {
          this.setState({ break: counter + 1 });
        } else if (i === '-' && counter > 1 && mode === 'Start') {
          this.setState({ break: counter - 1 });
        }
        break;
      case 'SESSION':
        counter = this.state.session;
        if (i === '+' && mode === 'Start') {
          this.setState({ session: counter + 1 });
        } else if (i === '-' && counter > 1 && mode === 'Start') {
          this.setState({ session: counter - 1 });
        }
        break;
      default: break;
    }
  }

  handlePress() {
    let mode = this.state.mode;
    let sessionTimer: number;
    let breakTimer: number;
    let timeoutID: number;
    let inter: number;
    let intervalID: number;
    if (mode === 'Start') {
      this.setState({ mode: 'Session' });
      sessionTimer = this.state.session * 60000;
      breakTimer = this.state.break * 60000;
      timeoutID = setTimeout(() => {
        this.setState({ mode: 'Break' });
        inter = setInterval(() => {
          this.setState({ mode: 'Break' });
        }, sessionTimer + breakTimer);
        this.setState({ inter: inter });
      }, sessionTimer);
      intervalID = setInterval(() => {
        this.setState({ mode: 'Session' });
      }, sessionTimer + breakTimer);
      this.setState({ intervalID: intervalID });
    } else {
      clearInterval(this.state.inter);
      clearInterval(this.state.intervalID);
      this.setState({ mode: 'Start' });
    }
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