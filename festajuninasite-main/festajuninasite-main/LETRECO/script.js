const tiles = document.querySelector(".tile-container")

const rows = 6 
const columns = 5

for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    guesses[rowIndex] = new Array(columns);
    const tileRow = document.createElement("div");
    tileRow.setAttribute("id", "row" + rowIndex);
    tileRow.setAttribute("class", "tile-row");
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      const tileColumn = document.createElement("div");
      tileColumn.setAttribute("id", "row" + rowIndex + "column" + columnIndex);
       tileColumn.setAttribute("class", "tile-column")
       tileRow.append(tileColumn)
   
    }
    tiles.append(tileRow);
  }
  