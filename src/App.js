import React from "react";
import "./style/App.css";
import Board from "./components/Board.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 0, 2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0, 2, 0]
      ],
      fillings: [
        "",
        "https://cdn.shopify.com/s/files/1/1218/5438/products/IMG_5341_clipped_rev_3_1024x1024.png?v=1527185281",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Location_dot_black.svg/1024px-Location_dot_black.svg.png",
        "https://images-na.ssl-images-amazon.com/images/I/81-yKbVND-L._SY355_.png",
        "https://media0.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif?cid=790b76115d0a4d1b7442634759187d4c&rid=giphy.gif",
        "https://thumbs.gfycat.com/FreeAnyIndianelephant-max-1mb.gif",
        "https://media.tenor.com/images/fd967aeb717528e87c36a6b32e7b9b1a/tenor.gif",
      ],
      player1: true
    };
    // this.handleButtonChange = this.handleButtonChange.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.addColumn = this.addColumn.bind(this);
    this.addRow = this.addRow.bind(this);
  }

  render() {
    return (
      <div id="main">
        <Board
          data={this.state.data}
          fillings={this.state.fillings}
          handleButtonChange={this.handleButtonChange}
          handleDrag={this.handleDrag}
        />
        <br />
        {/* <input type="button" onClick={this.addColumn} value="Add Column"></input>
        <input type="button" onClick={this.addRow} value="Add Row"></input> */}
      </div>
    );
  }

  // handleButtonChange(i,j){
  //   let new_data = this.state.data.map( (row) => {return [...row]} )
  //   let icons_qty = this.state.fillings.length - 1
  //   let button_state = this.state.data[i][j]
  //   if (button_state < icons_qty) {
  //     new_data[i][j] += 1
  //   }
  //   else{
  //     new_data[i][j] = 0
  //   }

  //   this.setState({data: new_data})
  // };

  validateMove(startI, startJ, endI, endJ) {
    let player = this.state.data[startI][startJ];
    let destiny = this.state.data[endI][endJ];
    let distanceI = endI - startI; //fila
    let distanceJ = endJ - startJ; //columna

    return (
      (distanceI === 1 &&
        Math.abs(distanceJ) === 1 &&
        player === 1 &&
        destiny !== player && !this.state.player1) ||
      (distanceI === -1 &&
        Math.abs(distanceJ) === 1 &&
        player === 2 &&
        destiny !== player && this.state.player1)
    );
  }

  validateEat(startI, startJ, endI, endJ) {
    let player = this.state.data[startI][startJ];
    let destiny = this.state.data[endI][endJ];

    return destiny !== 0 && player !== destiny;
  }

  calculateNewPositionAfterEat(startI, startJ, endI, endJ) {
    let newEndI;
    let newEndJ;
    if (endJ < startJ) {
      newEndJ = endJ - 1;
    } else {
      newEndJ = endJ + 1;
    }
    if (endI < startI) {
      newEndI = endI - 1;
    } else {
      newEndI = endI + 1;
    }
    if (this.state.data[newEndI][newEndJ] === 0) {
      return [newEndI, newEndJ];
    } else {
      return -1;
    }
  }

  handleDrag(start_i, start_j, end_i, end_j) {
    let nextPlayer = !this.state.player1;
    let new_data = this.state.data.map(row => {
      return [...row];
    });
    if (this.validateMove(start_i, start_j, end_i, end_j)) {
      if (this.validateEat(start_i, start_j, end_i, end_j)) {
        let coords = this.calculateNewPositionAfterEat(
          start_i,
          start_j,
          end_i,
          end_j
        );
        if (coords === -1) {
          return;
        } else {
          new_data[coords[0]][coords[1]] = new_data[start_i][start_j];
          new_data[end_i][end_j] = 0;
          new_data[start_i][start_j] = 0;
          this.setState({ data: new_data, player1: nextPlayer });
        }
      } else {
        new_data[end_i][end_j] = new_data[start_i][start_j];
        new_data[start_i][start_j] = 0;
        this.setState({ data: new_data, player1: nextPlayer });
      }
    }
  }

  addColumn() {
    let new_data = this.state.data.map(row => {
      return [...row];
    });
    new_data.map(row => {
      row.push(0);
    });
    this.setState({ data: new_data });
  }

  addRow() {
    let new_data = this.state.data.map(row => {
      return [...row];
    });
    let new_row = [];
    new_data[0].map(row => {
      new_row.push(0);
    });
    new_data.push(new_row);
    this.setState({ data: new_data });
  }
}

export default App;
