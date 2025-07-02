const tiles = document.querySelector(".tile-container"); 
 const backspaceAndEnterRow = document.querySelector("#backspaceAndEnterRow"); 
 const keyboardFirstRow = document.querySelector("#keyboardFirstRow"); 
 const keyboardSecondRow = document.querySelector("#keyboardSecondRow"); 
 const keyboardThirdRow = document.querySelector("#keyboardThirdRow"); 

 const keysFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]; 
 const keysSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]; 
 const keysThirdRow = ["Z", "X", "C", "V", "B", "N", "M"]; 




 // Função para formatar o tempo 
 function formatarTempo(segundos) { 
   const horas = Math.floor(segundos / 3600); 
   segundos %= 3600; 
   const minutos = Math.floor(segundos / 60); 
   const segundosRestantes = segundos % 60; 

   return `${horas < 10 ? '0' : ''}${horas}:${minutos < 10 ? '0' : ''}${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`; 
 } 


 // Função principal do contador 
 function iniciarContador() { 
   let segundos = 0; 
   const contadorElement = document.getElementById('contador'); 

   // Atualiza o contador a cada segundo 
   const contadorInterval = setInterval(() => { 
       segundos++; 
       contadorElement.textContent = formatarTempo(segundos); 
   }, 1000); 

   return contadorInterval; // Retorna o identificador do intervalo para parar o contador se necessário 
 } 

 // Inicia o contador 
 const intervalID = iniciarContador(); 

 function pararContador(intervalID) { 
   clearInterval(intervalID); 
 } 

 document.getElementById("reloadButton").addEventListener("click", function() { 
   location.reload(); 
 }); 






 const rows = 6; 
 const columns = 5; 
 let currentRow = 0; 
 let currentColumn = 0; 
 let letreco = "MILHO"; // Lembre-se que se a palavra secreta tiver acento, você deve escrevê-la com acento aqui.
 let letrecoMap = {}; 
 for (let index = 0; index < letreco.length; index++) { 
   letrecoMap[letreco[index]] = index; 
 } 
 const guesses = []; 

 for (let rowIndex = 0; rowIndex < rows; rowIndex++) { 
   guesses[rowIndex] = new Array(columns); 
   const tileRow = document.createElement("div"); 
   tileRow.setAttribute("id", "row" + rowIndex); 
   tileRow.setAttribute("class", "tile-row"); 
   for (let columnIndex = 0; columnIndex < columns; columnIndex++) { 
     const tileColumn = document.createElement("div"); 
     tileColumn.setAttribute("id", "row" + rowIndex + "column" + columnIndex); 
     tileColumn.setAttribute( 
       "class", 
       rowIndex === 0 ? "tile-column typing" : "tile-column disabled" 
     ); 
     tileRow.append(tileColumn); 
     guesses[rowIndex][columnIndex] = ""; 
   } 
   tiles.append(tileRow); 
 } 

 async function verificarPalavra(palavra) {
  
  const url = `https://api.dicionario-aberto.net/word/${palavra}`;

  
  console.log("Consultando a API com a URL:", url);

  try {
    
    const response = await fetch(url);

    if (response.ok) {
      
      const data = await response.json();

     
      console.log("Dados recebidos da API:", data);

      if (data && data.length > 0) {
        return true; 
      } else {
        return false; 
      }
    } else {
      
      console.error('A resposta da API não foi "ok". Status:', response.status);
      return false; 
    }
  } catch (error) {
    
    console.error('Ocorreu um erro ao tentar consultar a API:', error.message);
    return false; 
  }
}

 const checkGuess = async () => { 
   const guess = guesses[currentRow].join(""); 
   if (guess.length !== columns) { 
     return; 
   } 

   // Verifica se a palavra é válida na língua portuguesa 
   const isValidWord = await verificarPalavra(guess.toLowerCase()); 
   if (!isValidWord) { 
     alert('Por favor, insira uma palavra válida na língua portuguesa.'); 
     return; 
   } 

   var currentColumns = document.querySelectorAll(".typing"); 
   for (let index = 0; index < columns; index++) { 
     const letter = guess[index]; 
     if (letrecoMap[letter] === undefined) { 
       currentColumns[index].classList.add("wrong") 
     } else { 
       if (letrecoMap[letter] === index) { 
         currentColumns[index].classList.add("right") 
       } else { 
         currentColumns[index].classList.add("displaced") 
       } 
     } 
   } 

   if (guess === letreco) { 
      
      var autism = document.getElementById("contador").textContent; 
      console.log(autism); 
      coisarmodal(autism); 
      pararContador(intervalID); // Use a função para parar o contador corretamente
    
     return; 
   } else { 
     if (currentRow === rows - 1) { 
       window.alert("Errrrrrou! A palavra era: " + letreco); // Melhor feedback para o usuário

     } else { 
       moveToNextRow(); 
     } 
   } 
 }; 
 const moveToNextRow = () => { 
   var typingColumns = document.querySelectorAll(".typing") 
   for (let index = 0; index < typingColumns.length; index++) { 
     typingColumns[index].classList.remove("typing") 
     typingColumns[index].classList.add("disabled") 
   } 
   currentRow++ 
   currentColumn = 0 

   const currentRowEl = document.querySelector("#row" + currentRow) 
   var currentColumns = currentRowEl.querySelectorAll(".tile-column") 
   for (let index = 0; index < currentColumns.length; index++) { 
     currentColumns[index].classList.remove("disabled") 
     currentColumns[index].classList.add("typing") 
   } 
 } 

 const handleKeyboardOnClick = (key) => { 
   if (currentColumn === columns) { 
     return; 
   } 
   const currentTile = document.querySelector( 
     "#row" + currentRow + "column" + currentColumn 
   ); 
   currentTile.textContent = key; 
   guesses[currentRow][currentColumn] = key; 
   currentColumn++; 
 }; 

 const createKeyboardRow = (keys, keyboardRow) => { 
   keys.forEach((key) => { 
     var buttonElement = document.createElement("button"); 
     buttonElement.textContent = key; 
     buttonElement.setAttribute("id", key); 
     buttonElement.addEventListener("click", () => handleKeyboardOnClick(key)); 
     keyboardRow.append(buttonElement); 
   }); 
 }; 

 createKeyboardRow(keysFirstRow, keyboardFirstRow); 
 createKeyboardRow(keysSecondRow, keyboardSecondRow); 
 createKeyboardRow(keysThirdRow, keyboardThirdRow); 

 const handleBackspace = () => { 
   if (currentColumn === 0) { 
     return 
   } 

   currentColumn-- 
   guesses[currentRow][currentColumn] = "" 
   const tile = document.querySelector("#row" + currentRow + "column" + currentColumn) 
   tile.textContent = "" 
 }; 

 const backspaceButton = document.createElement("button"); 
 backspaceButton.addEventListener("click", handleBackspace); 
 backspaceButton.textContent = "DELETE"; 
 backspaceAndEnterRow.append(backspaceButton); 

 const enterButton = document.createElement("button"); 
 enterButton.addEventListener("click", checkGuess); 
 enterButton.textContent = "ENTER"; 
 backspaceAndEnterRow.append(enterButton); 

 // ############# CÓDIGO CORRIGIDO AQUI #############
 document.onkeydown = function (evt) {
  evt = evt || window.evt;
  const key = evt.key.toUpperCase();
  // Verifica se a tecla pressionada é uma letra, incluindo acentos e 'Ç'
  if (/^[A-ZÇÁÉÍÓÚÀÂÊÔÃÕ]$/.test(key)) {
    handleKeyboardOnClick(key);
  } else if (evt.key === "Enter") {
    checkGuess();
  } else if (evt.key === "Backspace") {
    handleBackspace();
  }
};



 function coisarmodal(autism) { 
   const modalElement = document.getElementById('exampleModalCenter'); 
   const modal = new bootstrap.Modal(modalElement); 
    
   const mensagem1 = "Tu é demais, simplesmente o detetivão do entretenimento!" 
   const mensagem2 = "Tempo decorrido:" 
   const mensagem3 = autism; 
    
   document.getElementById("mensagem1").textContent = mensagem1; 
   document.getElementById("mensagem2").textContent = mensagem2; 
   document.getElementById("mensagem3").textContent = mensagem3; 

   modal.show(); // Abre o modal 
 }