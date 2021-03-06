import React from 'react';
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
        player: null,
        disable_btn : false,
        stepNumber_temp: null,
        updateCheck: false,
        winner: null,
        clickCheck: false
      };
      this.handleClick = this.handleClick.bind(this);
      this.getDB();
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }

      if(!this.state.xIsNext & (this.state.player == "X")){
        return;
      }
      else if(this.state.xIsNext & (this.state.player == "O")){
        return;
      }
      else if(this.state.player == null){
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
        xIsNext: !this.state.xIsNext,
        clickCheck: true
      });
      console.log('CLICKKKKKK', this.state.stepNumber)
    }

    updateDB() {
        var data = {
            history: JSON.stringify(this.state.history),
            stepNumber: this.state.stepNumber,
            xIsNext: this.state.xIsNext,
            xIP: 0,
            oIP: 0
        };
        console.log('updatedb',this.state.stepNumber);
        XODataService.update(data)
        .then(response => {
            console.log(response.data);
            this.setState({
              updateCheck: false
          });
            //this.refreshList();
        })
        .catch(e => {
            console.log(e);
        });
    }

    getDB(a){
      if ( a == 's'){
        console.log('not get DB')
        return;
      }
      XODataService.getAll()
      .then(response =>{
          const dbval = Object.values(response.data);
          if (this.state.clickCheck == false) {
            console.log('getdb',dbval[2]);
            this.setState({
                history: JSON.parse(dbval[1]),
                stepNumber: dbval[2],
                xIsNext: dbval[3],
                xIP: dbval[4],
                oIP: dbval[5],
                //stepNumber_temp: dbval[2],
            });
          }
          this.setState({
            clickCheck: false
          })
        })
        .catch(e =>{
            console.log(e);
        })
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.stepNumber !== this.state.stepNumber) {
        console.log('pokemons state has changed.',prevState.stepNumber,this.state.stepNumber)
        const a = 's'
        this.getDB(a);
      }
    }

    componentDidMount(){
      this.interval = setInterval(
        () => {
          console.log('===============start===============')
          console.log('state',this.state.stepNumber,'  temp',this.state.stepNumber_temp);

          if (this.state.stepNumber !== this.state.stepNumber_temp) { //updateDB()
            this.setState({
              stepNumber_temp: this.state.stepNumber,
              updateCheck: true //not getDB when update
            });
            this.updateDB();
          };

          if (this.state.updateCheck == false) { //getDB()
            this.setState({
              updateCheck: false
            });
            this.getDB(1);
          };
          console.log('===============end===============')
        },1500)
    }

    handlePlayer = (value) => {
      this.setState({player: value, disable_btn : true});
    }
  
    resetBoard() {
      this.setState({
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
        player: this.state.player,
        //disable_btn : false,
        stepNumber_temp: null,
        updateCheck: false,
        winner: null,
        clickCheck: true
      });
      this.updateDB();
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
      const opponent = this.state.player == 'X' ?
      'O' : 'X'

      let status;

      const restart = winner == opponent || this.state.stepNumber == 9 ?
      <button onClick={i => {this.resetBoard();this.handleClick(i)}}>Restart</button> :
      null ;

      if (winner) {
        status = "Winner: " + winner;   
      } else {
        status = "Player: " + (this.state.xIsNext ? "X" : "O") + " turn";
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
          <div>
            {this.state.disable_btn ? <p>You are player : {this.state.player}</p> : <p>Please choose X or O </p>}
            {this.state.disable_btn ? null :
              <button onClick={()=>{this.handlePlayer('X')}} disabled={this.state.disable_btn}>
                X
              </button>
            }
            {this.state.disable_btn ? null :
              <button onClick={()=>{this.handlePlayer('O')}} disabled={this.state.disable_btn}>
                O
              </button>
            }
          </div>
          {
            !this.state.disable_btn ? null :
            <div>{status}</div>
          }
          {
            !this.state.disable_btn ? null :
            <div>{restart}</div>
          }
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