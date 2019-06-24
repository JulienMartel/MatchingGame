let allCards = document.querySelector(".deck").getElementsByTagName("li")
let gameWon = false
let clickedCards = []
let totalMoves = 0
let stars = 5
const allIcons = [
  `<i class="fa fa-diamond"></i>`, 
  `<i class="fa fa-paper-plane-o"></i>`, 
  `<i class="fa fa-anchor"></i>`, 
  `<i class="fa fa-bolt"></i>`, 
  `<i class="fa fa-cube"></i>`, 
  `<i class="fa fa-leaf"></i>`, 
  `<i class="fa fa-bicycle"></i>`, 
  `<i class="fa fa-bomb"></i>`, 
  `<i class="fa fa-diamond"></i>`, 
  `<i class="fa fa-paper-plane-o"></i>`, 
  `<i class="fa fa-anchor"></i>`, 
  `<i class="fa fa-bolt"></i>`, 
  `<i class="fa fa-cube"></i>`, 
  `<i class="fa fa-leaf"></i>`, 
  `<i class="fa fa-bicycle"></i>`, 
  `<i class="fa fa-bomb"></i>`, 
]


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}

  


const resetAll = function() {
  let shuffledIcons = shuffle(allIcons)

  for (let x of document.querySelectorAll(".card")) {
    x.style.transition = "transform 0.3s"
    x.classList.remove("open", "show", "match", "tada", "animated")
  }
  gameWon = false
  totalMoves = 0
  document.querySelector(".moves").textContent = totalMoves
  stars = 5
  for (let x of document.querySelectorAll(".stars li")) {
    x.innerHTML = `<i class="fa fa-star"></i>`
  }

  for (let i = 0; i < 16; i++) {
    document.querySelectorAll(".card")[i].innerHTML = shuffledIcons[i]
  }

}
resetAll()


document.querySelector(".fa-repeat").addEventListener("click", function() {
  resetAll()
  
})

const closeCards = function() {
  return new Promise( resolve => {
    if (clickedCards[0] != clickedCards[1]) {
      setTimeout(() => {
        document.querySelectorAll(".open").forEach(function(cardClicked) { 
          cardClicked.classList.remove("open", "show")
          activeCards = 0
  
          for (let x of allCards) {
            x.classList.remove("wait")
          }
        })
        clickedCards = []
      }, 300);
      resolve()
    } 
  });
}

let activeCards = 0
const displayCard = function(cardClicked) {
  if (activeCards <= 1) {
    cardClicked.classList.add("open", "show")
    activeCards++
  }
  if (activeCards === 2) {
    for (let x of allCards) {
      x.classList.add("wait")
      checkForMatch()
      
    }
    if (document.querySelectorAll(".match").length === 16) {
      setTimeout(() => {

        let winTitle
        if (stars === 5) {
          winTitle = `Amazing!`
        } else if (stars === 4) {
          winTitle = `Great Job!`
        } else if (stars === 3) {
          winTitle = `You're getting it!`
        } else if (stars === 2) {
          winTitle = `Better luck next time.`
        } else {
          winTitle = `Maybe try again...`
        }
        console.log("game over!")
        swal(`${winTitle}`, `You got ${stars} ${(stars === 1) ? "star" : "stars"}!`, {button: "Play again"});
        document.querySelector(".swal-title").insertAdjacentHTML(`afterend`, `<div class="star-holder"> </div>`)
        for (let x = 5; x > 0; x--) {
        document.querySelector(".star-holder").insertAdjacentHTML(`beforeend`, `<i class="fa fa-star"></i>`)
        }
        let allWinStars = document.querySelectorAll(".star-holder i")
        let counter = stars
        let showStarsInterval = setInterval(function() {
          allWinStars[counter - 1].classList.add("show-star", "animated", "slideInDown")
          counter--
          if (counter == 0) {
            clearInterval(showStarsInterval)
          }
        }, 300)
        document.querySelector(".swal-button").addEventListener("click", resetAll)
      }, 1000);
    }

    totalMoves++
    document.querySelector(".moves").textContent = totalMoves



    if (totalMoves === 15) {
      document.querySelector("#star5").innerHTML = `<i class="far fa-star"></i>`
      stars--
    } else if (totalMoves === 18){
      document.querySelector("#star4").innerHTML = `<i class="far fa-star"></i>`
      stars--
    } else if (totalMoves === 25){
      document.querySelector("#star3").innerHTML = `<i class="far fa-star"></i>`
      stars--
    } else if (totalMoves === 32){
      document.querySelector("#star2").innerHTML = `<i class="far fa-star"></i>`
      stars--
    }
  }
}


const checkForMatch = function() {
  let match = document.querySelectorAll(".open")
  if (match[0].innerHTML === match[1].innerHTML) {
    match[0].classList.add("match")
    match[1].classList.add("match")
    closeCards()

    setTimeout(function() {
      for (let x of document.querySelectorAll(".deck .card.match")) {
        x.style.transition = "0s"
        x.classList.add('animated', 'tada')
      }
    
      for (let x of allCards) {
        x.classList.remove("wait")
      }
      activeCards = 0
      
      for (let x of document.querySelector(".deck").getElementsByTagName("li")) {

      }

      

    }, 300)
  } else {
    setTimeout(() => {
      closeCards()
    }, 500);
  }
}



document.querySelector(".deck").addEventListener("click", function(e) {
  if (
    ((e.target.classList.contains("card") && 
    !e.target.classList.contains("show") &&
    !e.target.classList.contains("match") &&
    !e.target.classList.contains("open") &&
    !e.target.classList.contains("wait")) || 
    (e.target.parentElement.classlist.contains("card") && 
    !e.target.parentElement.classList.contains("show") && 
    !e.target.parentElement.classList.contains("match") && 
    !e.target.parentElement.classList.contains("open") && 
    !e.target.parentElement.classList.contains("wait"))) && 
    activeCards < 2
  ) {
    clickedCards.push(e.target);
    displayCard(e.target)
    
  }
})