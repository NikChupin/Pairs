(()=>{
const buttonWrap = document.createElement('div');
buttonWrap.classList.add('button-wrap');
const button = document.createElement('button');
button.textContent = 'Сыграть ещё раз';
button.classList.add('visibility');
const section = document.querySelector('section');
let numArray = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
let hasFlip = false;
let notActive = false;
let firstCard, secondCard;
let pairCount = 0;

start();

function start() {  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  section.innerHTML = '';
  numArray = shuffle(numArray);

  numArray.forEach(function(el) {
    let card = document.createElement("div");
    card.classList.add('memory-card')
    card.dataset.card = el;
    card.addEventListener('click', flipCard);
    section.append(card);
    let fontCard = document.createElement("div");
    let backCard = document.createElement("div");
    fontCard.classList.add('front');
    backCard.classList.add('back');
    fontCard.textContent = el;
    backCard.textContent = '?';
    card.append(fontCard);
    card.append(backCard);
  });
  section.append(buttonWrap);
  buttonWrap.append(button);
}

function flipCard() {
    if (notActive) return;

    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlip) {
        hasFlip = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }
    notActive = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard()
    }, 1500);

}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    pairCount++;
    if (pairCount === 8) {
        button.classList.toggle('visibility');
        
    } 

    resetBoard();
}

function resetBoard() {
    [hasFlip, notActive] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

button.addEventListener('click', () => {
    button.classList.toggle('visibility');
    pairCount = 0;
    document.querySelectorAll('.memory-card').forEach(card => {
        card.classList.remove('flip')
        console.log(card);
    });
    setTimeout(() => {
        start();
    }, 1500);
    
}); 
})();
