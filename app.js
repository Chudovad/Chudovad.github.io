let objQuestionsclass="mobile"
let objCategoryQuiz
let objQuestionsQuizEng
let countCorrectAnswer = 0
let numberAnswer = 0
let typeCurrentQuestion = 0
let categoryId = 0
let randomQuiz = false
let answer1, answer2, answer3, answer4
let answers

const inputSearch = document.querySelector('.form-control')

function createQuestions(json) {
  for (const el of json.data) {
    el.correct = el.answers[0]
    el.answers = shuffle(el.answers)
  }
  objQuestions = json
}
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

function paintQuiz(requestJson) {
  const container = document.querySelector('.container')
  container.innerHTML = ''
  container.innerHTML = `
  <div class="position-absolute top-50 start-50 translate-middle" id="e1">
          <div class="row justify-content-end">
            <div class="col">
              <h5>Количество баллов: <span class="badge badge-secondary">${countCorrectAnswer}</span></h5>
            </div>
            <div class="col-auto">
              <h5><span class="badge badge-secondary">${numberAnswer + 1}/${requestJson.data[numberAnswer].answers.length + 1}</span></h5>
            </div>
          </div>
        
        <div class="alert alert-primary" role="alert">
          <h2>${requestJson.data[numberAnswer].question}</h2>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="${requestJson.data[numberAnswer].answers[0]}">
          <label class="form-check-label answer" for="flexRadioDefault1">
            ${requestJson.data[numberAnswer].answers[0]}
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="${requestJson.data[numberAnswer].answers[1]}">
          <label class="form-check-label answer" for="flexRadioDefault2">
            ${requestJson.data[numberAnswer].answers[1]}
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="${requestJson.data[numberAnswer].answers[2]}">
          <label class="form-check-label answer" for="flexRadioDefault3">
            ${requestJson.data[numberAnswer].answers[2]}
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" value="${requestJson.data[numberAnswer].answers[3]}">
          <label class="form-check-label answer" for="flexRadioDefault4">
            ${requestJson.data[numberAnswer].answers[3]}
          </label>
        </div>
        <input type="button" value="Ответить" class="btn btn-primary btn-lg mt-3">
        <span class="error"></span>
      </div>
    `

  if (window.screen.width < 768) {
    const element = document.getElementById("e1")
    console.log(element)
    element.classList.remove("translate-middle")
    element.classList.remove("start-50")
    element.classList.remove("top-50")
    element.classList.remove("position-absolute")
    element.classList.add("mobile")
  }
  listenerForAnswerBtn()
}

function createQuestionsEng(requestJson) {
  let answers = requestJson.results[numberAnswer].incorrect_answers
  answers.push(requestJson.results[numberAnswer].correct_answer)
  answers = shuffle(answers)
  return answers
}

function paintQuizEng(requestJson) {
  const container = document.querySelector('.container')
  container.innerHTML = ''
  answers = createQuestionsEng(requestJson)
  if (requestJson.response_code == 0) {

    container.innerHTML = `
      <div class="position-absolute top-50 start-50 translate-middle" id="e1">
      <div class="row justify-content-end">
      <div class="col">
        <h5>Score: <span class="badge badge-secondary">${countCorrectAnswer}</span></h5>
      </div>
      <div class="col">
        <h5>Difficulty:   <span class="badge badge-secondary">${requestJson.results[numberAnswer].difficulty}</span></h5>
      </div>
      <div class="col">
        <h5><span class="badge badge-secondary">${requestJson.results[numberAnswer].category}</span></h5>
      </div>
      <div class="col-auto" style="">
        <h5>Question: <span class="badge badge-secondary">${numberAnswer + 1}/${requestJson.results.length}</span></h5>
      </div>
    </div>
    <div class="alert alert-primary" role="alert">
      <h2>${requestJson.results[numberAnswer].question}</h2>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="${answers[0]}">
      <label class="form-check-label answer" for="flexRadioDefault1">
        ${answers[0]}
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="${answers[1]}">
      <label class="form-check-label answer" for="flexRadioDefault2">
        ${answers[1]}
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="${answers[2]}">
      <label class="form-check-label answer" for="flexRadioDefault3">
        ${answers[2]}
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" value="${answers[3]}">
      <label class="form-check-label answer" for="flexRadioDefault4">
        ${answers[3]}
      </label>
    </div>
    <input type="button" value="Answer" class="btn btn-primary btn-lg mt-3">
    <button class="btn btn-warning btn-lg mt-3 btn__right" type="button"><p class="heart">♥</p></button>
    
    <div class="form-check form-switch btn__translate">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
      <label class="form-check-label" for="flexSwitchCheckChecked">English</label>
    </div>
  </div>
            `
  
    if (window.screen.width < 768) {
      const element = document.getElementById("e1")
      console.log(element)
      element.classList.remove("translate-middle")
      element.classList.remove("start-50")
      element.classList.remove("top-50")
      element.classList.remove("position-absolute")
      element.classList.add("mobile")
    }
    //<button class="btn btn-primary btn-lg mt-3 btn__translate" type="button">Translate</button>
  } else {
    console.log('error');
  }
  const navLiked = document.querySelector('.liked__questions')
  navLiked.classList.add('disabled')
  setTimeout(() => listenerForAnswerBtnEng(), 600)
  listenerForLikeBtnEng()
  listenerBtnTranslate()
  let answerLabels = document.querySelectorAll('.answer')
  queryToApiTranslationMemoryAnswers(answerLabels[0].innerHTML, answerLabels[1].innerHTML, answerLabels[2].innerHTML, answerLabels[3].innerHTML)
  let question = document.querySelector('.alert').querySelector('h2').innerHTML
  queryToApiTranslationMemoryQuestion(question)
}

function paintQuestionsMenu() {
  const dropdown = document.querySelector('.dropdown')
  dropdown.innerHTML = ''
  const question = document.createElement('div')
  question.classList.add('questions')
  const bestResults = localStorage.getItem('bestResults') ? JSON.parse(localStorage.getItem('bestResults')) : []

  question.innerHTML = `
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Russian quiz</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" id="1" href="#">light/comic (best result ${bestResults[0].countBestScore})</a></li>
                <li><a class="dropdown-item" id="2" href="#">average difficulty (best result ${bestResults[1].countBestScore})</a></li>
                <li><a class="dropdown-item" id="3" href="#">difficult (best result ${bestResults[2].countBestScore})</a></li>
                <li><a class="dropdown-item" id="4" href="#">for children (best result ${bestResults[3].countBestScore})</a></li>
              </ul>
    `
  dropdown.append(question)

  startGame()
}

function listenerForAnswerBtn() {
  const btnAnswer = document.querySelector('.btn-primary')
  btnAnswer.addEventListener('click', countScore)
}
function listenerForAnswerBtnEng() {
  const btnAnswer = document.querySelector('.btn-primary')
  btnAnswer.addEventListener('click', countScoreEng)
}

function listenerForLikeBtnEng() {
  const btnLike = document.querySelector('.btn__right')
  btnLike.addEventListener('click', () => {
    const like = document.querySelector('.heart')
    if (like.classList.length > 1) {
      like.classList.remove('like')
      const likedQuestions = localStorage.getItem('likedQuestions') ? JSON.parse(localStorage.getItem('likedQuestions')) : []
      deleteLikedQuestion(likedQuestions.length - 1)
    } else {
      like.classList.add('like')
      addToLocalStorageLikedQuestions(objQuestionsQuizEng.results)
    }
  })
}

function countScore() {
  const btnAnswer = document.querySelector('.badge-secondary')
  const error = document.querySelector('.alert')
  const answerInput = document.querySelector('.btn-primary')
  const checkInput = document.querySelector('input[type=radio]:checked')
  if (checkInput != null) {
    if (checkInput.value == objQuestions.data[numberAnswer].correct) {
      countCorrectAnswer++
      btnAnswer.innerHTML = countCorrectAnswer
      error.classList.add('alert-success')
    } else {
      error.classList.add('alert-danger')
      let answerDiv = document.querySelectorAll('.form-check')
      for (const el of answerDiv) {
        el.querySelector('input').value == objQuestions.data[numberAnswer].correct ? el.querySelector('label').classList.add('correct') : ''
      }
    }
    numberAnswer++
    if (numberAnswer == 5) {
      setTimeout(() => paintFinishMenu(), 3000)
    } else {
      setTimeout(() => paintQuiz(objQuestions), 3000)
    }
    answerInput.disabled = true
  } else {
    error.classList.add('alert-warning')
  }
  paintQuestionsMenu()
}

function countScoreEng() {
  const btnAnswer = document.querySelector('.badge-secondary')
  const error = document.querySelector('.alert')
  const answerInput = document.querySelector('.btn-primary')
  const checkInput = document.querySelector('input[type=radio]:checked')
  const navLiked = document.querySelector('.liked__questions')
  if (checkInput != null) {
    if (checkInput.value == objQuestionsQuizEng.results[numberAnswer].correct_answer) {
      countCorrectAnswer++
      btnAnswer.innerHTML = countCorrectAnswer
      error.classList.add('alert-success')
    } else {
      error.classList.add('alert-danger')
      let answerDiv = document.querySelectorAll('.form-check')
      for (const el of answerDiv) {
        el.querySelector('input').value == objQuestionsQuizEng.results[numberAnswer].correct_answer ? el.querySelector('label').classList.add('correct') : ''
      }
    }
    numberAnswer++
    if (numberAnswer == objQuestionsQuizEng.results.length) {
      navLiked.classList.remove('disabled')
      setTimeout(() => paintFinishMenuEng(), 3000)
    } else {
      setTimeout(() => paintQuizEng(objQuestionsQuizEng), 3000)
    }
    answerInput.disabled = true
  } else {
    error.classList.add('alert-warning')
  }
  paintQuestionsMenu()
}

function paintFinishMenuEng() {
  const container = document.querySelector('.container')
  if (window.screen.width > 768) {
    container.innerHTML = `
    <div class="position-absolute top-50 start-50 translate-middle" id="e1">
      <div class="alert alert-primary" role="alert">
        <h2>Number of correct answers ${countCorrectAnswer} of ${numberAnswer}</h2>
      </div>
    </div>
  `
  }
  else {
    container.innerHTML = `
    <div class="mobile" id="e1">
      <div class="alert alert-primary" role="alert">
        <h2>Number of correct answers ${countCorrectAnswer} of ${numberAnswer}</h2>
      </div>
    </div>
  `
  }

  categoryId == 0 ? addToLocalStorageBestResultEng() : addToLSBestResultByCategory()
  numberAnswer = 0
  countCorrectAnswer = 0
  setTimeout(() => paintStartMenu(), 3000)
}
function paintFinishMenu() {
  const container = document.querySelector('.container')

      if (window.screen.width > 768) {
        container.innerHTML = `
        <div class="position-absolute top-50 start-50 translate-middle" id="e1">
          <div class="alert alert-primary" role="alert">
            <h2>Количество правильных ответов ${countCorrectAnswer} из ${numberAnswer}</h2>
          </div>
        </div>
      `
      }
      else {
        container.innerHTML = `
        <div class="mobile" id="e1">
          <div class="alert alert-primary" role="alert">
            <h2>Количество правильных ответов ${countCorrectAnswer} из ${numberAnswer}</h2>
          </div>
        </div>
      `
      }
  addToLocalStorageBestResult()
  numberAnswer = 0
  countCorrectAnswer = 0
  setTimeout(() => paintStartMenu(), 3000)
}
function paintStartMenu() {
  queryToApiQuestionsQuizEngRand()
  const container = document.querySelector('.container')
  container.innerHTML = ''

  container.innerHTML = `
      <button id="go">
        Start 
      </button>
    `
  listenerForModal()
}

function startGame() {
  const dropdownMenu = document.querySelector('.dropdown-menu')
  dropdownMenu.addEventListener('click', (e) => {
    e.preventDefault()
    typeCurrentQuestion = e.target.id
    queryToApiQuiz()
  })
}
function paintDropdownSearch(arr) {
  const dropdownSearch = document.querySelector('.dropdown__search').firstElementChild
  dropdownSearch.innerHTML = ''
  if (arr.length == 0) {
    dropdownSearch.innerHTML += `
      <li><a class="dropdown-item disabled" href="#">No result</a></li>
    `
  } else {
    arr.forEach(element => {
      dropdownSearch.innerHTML += `
        <li><a class="dropdown-item category" id="${element.id}" href="#">${element.name}</a></li>
      `
    });
  }
  listenerForSearchDropdown()
}
function listenerForSearchDropdown() {
  const searchMenu = document.querySelector('.search')
  searchMenu.addEventListener('click', choosСategory)
}
function listenerForModal() {
  document.getElementById('go').addEventListener('click', () => {
    //document.documentElement.classList.toggle('wipe');
    categoryId = 0
    queryToApiCategoryQuizEng()
    setTimeout(() => paintQuizEng(objQuestionsQuizEng), 700)
  });
}

function listenerBtnTranslate() {
  document.querySelector('.btn__translate').addEventListener('click', () => {
    const check = document.getElementById('flexSwitchCheckChecked')
    if (check.checked) {
      let question = document.querySelector('.alert').querySelector('h2')
      question.innerHTML = objQuestionsQuizEng.results[numberAnswer].question

      let answerLabels = document.querySelectorAll('.answer')
      for (let i = 0; i < answerLabels.length; i++) {
        answerLabels[i].innerHTML = answers[i]
      }
    } else {
      writeTranslationQuestion()
      writeTranslationAnswers()
    }
  });
}
function writeTranslationQuestion() {
  const question = document.querySelector('.alert').querySelector('h2')
  question.innerHTML = translationQuestion
}

function writeTranslationAnswers() {
  const answersLabel = document.querySelectorAll('.form-check-label')
  answersLabel[0].innerHTML = answer1
  answersLabel[1].innerHTML = answer2
  answersLabel[2].innerHTML = answer3
  answersLabel[3].innerHTML = answer4
}
function choosСategory(event) {
  event.preventDefault()
  //inputSearch.removeEventListener('focusout', closeSearchMenu)
  categoryId = event.target.id
  queryToApiQuestionsQuizEng(event.target.id)
  closeSearchMenu()
  setTimeout(() => paintQuizEng(objQuestionsQuizEng), 600)
}

paintQuestionsMenu()
listenerForModal()
queryToApiCategoryQuizEng()
queryToApiQuestionsQuizEngRand()


inputSearch.addEventListener('input', openSearchMenu)

function closeSearchMenu() {
  const searchMenu = document.querySelector('.search')
  searchMenu.classList.remove('show')
}

function openSearchMenu() {
  const inputValue = inputSearch.value
  const dropdownSearch = document.querySelector('.dropdown__search')

  const arr = objCategoryQuiz.filter(item =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  )
  paintDropdownSearch(arr)
  dropdownSearch.firstElementChild.classList.add('show')
}

function openModalBestResults() {
  const modalBody = document.querySelector('.model__best_results')
  let bestResults = localStorage.getItem('bestResultsEngByCategory') ? JSON.parse(localStorage.getItem('bestResultsEngByCategory')) : []
  modalBody.innerHTML = `
    <div class="container text-center">
    <div class="row align-items-start">
    <div class="col">
    Category
    </div>
    <div class="col">
    Score
    </div>
    </div>
    <hr class="bg-primary border-2 border-top border-primary">
  `

  for (const el of bestResults) {
    objCategoryQuiz.push({
      id: 0,
      name: 'Random category'
    })
    let categoryName = objCategoryQuiz.filter(item => item.id == el.categoryId)
    if (typeof categoryName != 'undefined') {
      modalBody.innerHTML += `
        <div class="container text-center">
          <div class="row align-items-start">
            <div class="col">
            ${categoryName[0].name}
            </div>
            <div class="col">
            ${el.countBestScore}
            </div>
          </div>
        </div>      
    `
    }
  }
  modalBody.innerHTML += `
  </div>
  `
}
function openModalLikedQuestions() {
  const modalBody = document.querySelector('.model__likes_questions')
  let likedQuestions = localStorage.getItem('likedQuestions') ? JSON.parse(localStorage.getItem('likedQuestions')) : []
  if (likedQuestions.length > 0) {
    modalBody.innerHTML = `
    <div class="container text-center">
      <div class="row align-items-start">
        <div class="col">
          Question
        </div>
        <div class="col">
          Category
        </div>
        <div class="col">
          Difficulty
        </div>
        <div class="col-auto">
          Answers
        </div>
        <div class="col-auto">
          Remove
        </div>
      </div>
        <hr class="bg-primary border-2 border-top border-primary">
  `
    let i = 0
    for (const el of likedQuestions) {
      modalBody.innerHTML += `
        <div class="container text-center item__question">
          <div class="row align-items-start">
            <div class="col">
              ${el.question}
            </div>
            <div class="col">
              ${el.category}
            </div>
            <div class="col">
              ${el.difficulty}
            </div>
            <div class="col-auto">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Answers</a>
              <ul class="dropdown-menu">
                <li class="${el.incorrect_answers[0] == el.correct_answer ? 'correct' : ''}"><a class="dropdown-item" id="1" href="#">${el.incorrect_answers[0]}</a></li>
                <li class="${el.incorrect_answers[1] == el.correct_answer ? 'correct' : ''}"><a class="dropdown-item" id="2" href="#">${el.incorrect_answers[1]}</a></li>
                <li class="${el.incorrect_answers[2] == el.correct_answer ? 'correct' : ''}"><a class="dropdown-item" id="3" href="#">${el.incorrect_answers[2]}</a></li>
                <li class="${typeof el.incorrect_answers[3] != 'undefined' ? el.incorrect_answers[3] : el.correct_answer == el.correct_answer ? 'correct' : ''}"><a class="dropdown-item" id="4" href="#">${typeof el.incorrect_answers[3] != 'undefined' ? el.incorrect_answers[3] : el.correct_answer}</a></li>
              </ul>
            </div>
            <div class="col-auto">
              <button class="btn btn-outline-secondary btn__basket" data-id="${i}" type="button"><p class="heart">🗑</p></button>
            </div>
          </div>
        </div> 
        <hr class="bg-primary border-2 border-top border-primary">     
    `
      i++
    }
    modalBody.innerHTML += `
  </div>
  `
  } else {
    modalBody.innerHTML = `
    <div class="container text-center">
      <h4>No liked questions</h4>
    </div>
    `
  }
}
// //${el.difficulty}

function deleteLikedQuestion(id) {
  const likedQuestions = localStorage.getItem('likedQuestions') ? JSON.parse(localStorage.getItem('likedQuestions')) : []
  likedQuestions.splice(id, 1)
  localStorage.setItem('likedQuestions', JSON.stringify(likedQuestions))
  openModalLikedQuestions()
}
const modalLikedQuestion = document.querySelector('.model__likes_questions')
modalLikedQuestion.addEventListener('click', (event) => {
  event.preventDefault()
  if (event.target.closest('.btn__basket')) {
    const card = event.target.closest('.btn__basket')
    currentId = card.dataset.id
    deleteLikedQuestion(currentId)
  }
})
const selectedDifficulty = document.querySelector('.form-select')
selectedDifficulty.addEventListener('change', () => {
  setToLocalStorageDifficulty(selectedDifficulty.value)
  queryToApiQuestionsQuizEngRand()
})

function setDifficulty() {
  const formSelectOptions = document.querySelector('.form-select').querySelectorAll('option')
  for (const el of formSelectOptions) {
    const difficulty = localStorage.getItem('Difficulty') ? localStorage.getItem('Difficulty') : ''
    el.value == difficulty ? el.selected = true : false
  }
}
setDifficulty()
inputSearch.addEventListener("focus", openSearchMenu)
document.querySelector('.best__results').addEventListener("click", openModalBestResults)
document.querySelector('.liked__questions').addEventListener("click", openModalLikedQuestions)
//inputSearch.addEventListener("focusout", closeSearchMenu)

