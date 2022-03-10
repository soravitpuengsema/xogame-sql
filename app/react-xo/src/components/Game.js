import React from 'react';
import ReactDOM from 'react-dom';
import XODataService from "../services/xo.service";
import Board from './Board.js';

export default class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
      };
      console.log(this.state.history);
      this.getDB();
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });

      this.updateDB();
      //this.getDB();
    }

    updateDB() {
        var data = {
            history: JSON.stringify(this.state.history),
            stepNumber: this.state.stepNumber,
            xIsNext: this.state.xIsNext,
            xIP: 0,
            oIP: 0
        };
        console.log('update',this.state.history);
        XODataService.update(data)
        .then(response => {
            console.log(response.data);
            //this.refreshList();
        })
        .catch(e => {
            console.log(e);
        });
    }

    getDB(){
        XODataService.getAll()
        .then(response =>{
            const dbval = Object.values(response.data[0]);
            //console.log(response.data)
            console.log('getdb',JSON.parse(dbval[1]));
            this.setState({
                history: JSON.parse(dbval[1]),
                stepNumber: dbval[2],
                xIsNext: dbval[3],
                xIP: dbval[4],
                oIP: dbval[5]
            });
        })
        .catch(e =>{
            console.log(e);
        })
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }
  
    render() {

      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
  
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }