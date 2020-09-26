import React from 'react';

import Board from './Board'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.calculateWinner = this.calculateWinner.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            actualPlayer: 'X'
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            actualPlayer: ((step % 2) === 0 ? 'X' : 'O')
        });
    }

    handleClick(i) {
        const player = this.state.actualPlayer;
        const nextPlayer = (player === 'X' ? 'O' : 'X');
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const winner = this.calculateWinner(squares);

        if (winner || squares[i])
            return;

        squares[i] = player;
        
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            actualPlayer: nextPlayer
        });
    }

    calculateWinner(squares) {  //queria fazer minha solução, mas tô sem tempo
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

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const moves = history.map((step, move) => {
            let desc = move ? 'Go to move #' + move : 'Go to game start'
            return <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
        })

        const player = this.state.actualPlayer;
        const nextPlayer = (player === 'X' ? 'O' : 'X');
        const winner = this.calculateWinner(current.squares);
        let status = '';
        
        if (!winner)
            status = 'Now playing ' + player + '\tNext ' + nextPlayer;
        else
            status = 'The winner is ' + winner;
            
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares} 
                        player={player}
                        onClick={this.handleClick} 
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

export default Game;