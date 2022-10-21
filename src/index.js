import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className="square-day" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function TaskList(props) {
  return (
  <div> <ol>
    {props.tasks.map((x, i) => <li><label key={i}>
            <input
              type="checkbox"
              name="lang"
              value={i}
            /> {x}
          </label></li>)}
      </ol>
        <div>
        <button>New Task</button>
        </div>
  </div>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      showPlans: false,
      tasks: [["Zalando -Interviw", "Weekly shopping", "Hangout with Rooby"],
               ["Flix bus -Interviw", "Hangout!!!", "Hangout with Kevin"] ,
                ["Interviw with Amir", "Hangout!!!", "Erik Neudert", "Maya devakikku"],
                ["Zalando -Interviw", "Weekly shopping", "Hangout with Rooby"],
                ["Flix bus -Interviw", "Hangout!!!", "Hangout with Kevin"] ,
                ["Interviw with Amir", "Hangout!!!", "Erik Neudert", "Maya devakikku"],
                ["Zalando -Interviw", "Weekly shopping", "Hangout with Rooby"]],
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      day: 0,
    };
  }

  handleClick(i) {
   const squares = this.state.squares.slice();
      squares[i] = i;
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
        showPlans: true,
        day: i,
      });
   //return <TaskList/>;
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.days[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

   renderTaskList() {
    if(this.state.showPlans)
      return (<TaskList tasks={this.state.tasks[this.state.day]}/>);
    }

  render() {
    let status = 'Weekly Planner - ';
    let week = 'KW37';
    return (
      <div>
              <div>
                  <button onClick={() => window.print()}>PRINT</button>
              </div>
        <div className="status"><h1>{status}{week}</h1></div>
        <div className="board-day">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
        </div>
        <div className="board-day">
          {this.renderTaskList()}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

