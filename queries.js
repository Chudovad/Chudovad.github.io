let queryToApiQuiz = async () => {
  let url = 'https://engine.lifeis.porn/api/millionaire.php?'
  let response = await fetch(url +
    new
      URLSearchParams({
        qType: typeCurrentQuestion,
        count: 5,
      }));

  if (response.ok) {
    let json = await response.json();
    createQuestions(json)
    paintQuiz(objQuestions)
  } else {
    console.log("Ошибка HTTP: " + response.status);
  }
}

let queryToApiCategoryQuizEng = async () => {
  let url = 'https://opentdb.com/api_category.php'
  let response = await fetch(url)

  if (response.ok) {
    let json = await response.json();
    objCategoryQuiz = json.trivia_categories
  } else {
    console.log("Ошибка HTTP: " + response.status);
  }
}

let queryToApiQuestionsQuizEng = async (categoryId) => {
  const difficulty = localStorage.getItem('Difficulty') ? localStorage.getItem('Difficulty') : ''
  let url = `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`
  let response = await fetch(url)

  if (response.ok) {
    let json = await response.json();
    objQuestionsQuizEng = json
  } else {
    console.log("Ошибка HTTP: " + response.status);
  }
}

let queryToApiQuestionsQuizEngRand = async () => {
  const difficulty = localStorage.getItem('Difficulty') ? localStorage.getItem('Difficulty') : ''
  let url = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`
  let response = await fetch(url)

  if (response.ok) {
    let json = await response.json();
    objQuestionsQuizEng = json
  } else {
    console.log("Ошибка HTTP: " + response.status);
  }
}

let translationQuestion
let queryToApiTranslate = async (text) => {
  const encodedParams = new URLSearchParams();
  encodedParams.append("q", text);
  encodedParams.append("target", "ru");
  encodedParams.append("source", "en");

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': '762fe13f7fmsh0f3fcdae3f2ab95p14b51bjsne8e229b0d304',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },
    body: encodedParams
  };

  fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
    .then(response => response.json())
    .then(response => translations = response)
    .catch(err => console.error(err));
} 

let queryToApiTranslationMemoryQuestion = (text) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '762fe13f7fmsh0f3fcdae3f2ab95p14b51bjsne8e229b0d304',
      'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
    }
  };
  fetch(`https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=en%7Cru&q=${text}&mt=1&onlyprivate=0&de=a%40b.c`, options)
    .then(response => response.json())
    .then(response => translationQuestion = response.responseData.translatedText)
    .catch(err => console.error(err));
}

let queryToApiTranslationMemoryAnswers = (_answer1, _answer2, _answer3, _answer4) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '762fe13f7fmsh0f3fcdae3f2ab95p14b51bjsne8e229b0d304',
      'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
    }
  };
  fetch(`https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=en%7Cru&q=${_answer1}&mt=1&onlyprivate=0&de=a%40b.c`, options)
  .then(response => response.json())
  .then(response => answer1 = response.responseData.translatedText)
  .catch(err => console.error(err));
  fetch(`https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=en%7Cru&q=${_answer2}&mt=1&onlyprivate=0&de=a%40b.c`, options)
  .then(response => response.json())
  .then(response => answer2 = response.responseData.translatedText)
  .catch(err => console.error(err));
  fetch(`https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=en%7Cru&q=${_answer3}&mt=1&onlyprivate=0&de=a%40b.c`, options)
  .then(response => response.json())
  .then(response => answer3 = response.responseData.translatedText)
  .catch(err => console.error(err));
  fetch(`https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=en%7Cru&q=${_answer4}&mt=1&onlyprivate=0&de=a%40b.c`, options)
  .then(response => response.json())
  .then(response => answer4 = response.responseData.translatedText)
  .catch(err => console.error(err));
}

