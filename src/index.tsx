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
  status: string;
  intervalID: number;
  time: number;
}

class PomodoroClock extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      mode: 'Session',
      break: 1,
      session: 1,
      status: 'Pause',
      intervalID: 0,
      time: 60
    };
  }

  handleClick(n: string, i: string): void {
    let counter: number;
    let mode = this.state.mode;
    let status = this.state.status;
    switch (n) {
      case 'BREAK':
        counter = this.state.break;
        if (i === '+' && status === 'Pause') {
          this.setState({ break: counter + 1 });
          if (mode === 'Break') { this.setState({ time: (counter + 1) * 60 }); }
        } else if (i === '-' && counter > 1 && status === 'Pause') {
          this.setState({ break: counter - 1 });
          if (mode === 'Break') { this.setState({ time: (counter - 1) * 60 }); }
        }
        break;
      case 'SESSION':
        counter = this.state.session;
        if (i === '+' && status === 'Pause') {
          this.setState({ session: counter + 1 });
          if (mode === 'Session') { this.setState({ time: (counter + 1) * 60 }); }
        } else if (i === '-' && counter > 1 && status === 'Pause') {
          this.setState({ session: counter - 1 });
          if (mode === 'Session') { this.setState({ time: (counter - 1) * 60 }); }
        }
        break;
      default: break;
    }
  }

  handlePress() {
    let status = this.state.status;
    let intervalID: number;
    let seconds: number;
    if (status === 'Pause') {
      this.setState({ status: 'Play' });
      intervalID = setInterval(() => {
        seconds = this.state.time;
        if (seconds <= 1) { changeMode(this.state.mode); }
        this.setState({ time: seconds - 1 });
      }, 1000);
      this.setState({ intervalID: intervalID });
    } else {
      clearInterval(this.state.intervalID);
      this.setState({ status: 'Pause' });
    }
    let changeMode = (mode: string) => {
      let time: number;
      let delay: number;
      if (mode === 'Session') {
        time = this.state.break * 60;
        delay = setTimeout(() => {
          this.setState({ mode: 'Break', time: time });
        }, 100);
      } else {
        time = this.state.session * 60;
        delay = setTimeout(() => {
          this.setState({ mode: 'Session', time: time });
        }, 100);
      }
    };
  }

  render() {
    return (
      <div>
        <button onClick={() => this.handlePress()}>{this.state.mode}</button>
        {this.state.time}
        {this.state.status}
        <Counter name="BREAK" counter={this.state.break} onClick={(n, i) => this.handleClick(n, i)} />
        <Counter name="SESSION" counter={this.state.session} onClick={(n, i) => this.handleClick(n, i)} />
      </div>
    );
  }
}

ReactDOM.render(<PomodoroClock />, document.getElementById('root'));