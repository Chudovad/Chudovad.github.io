let bestResults = [
    {
        typeQuestion: 1,
        countBestScore: 0
    },
    {
        typeQuestion: 2,
        countBestScore: 0
    },
    {
        typeQuestion: 3,
        countBestScore: 0
    },
    {
        typeQuestion: 4,
        countBestScore: 0
    }
]
let bestResultsEng = 0

let bestResultsEngByCategory = [
    {
        categoryId: 0,
        countBestScore: 0
    }]
let likedQuestions = []
localStorage.getItem('bestResults') ? false : localStorage.setItem('bestResults', JSON.stringify(bestResults))
localStorage.getItem('likedQuestions') ? false : localStorage.setItem('likedQuestions', JSON.stringify(likedQuestions))
localStorage.getItem('bestResultsEngByCategory') ? false : localStorage.setItem('bestResultsEngByCategory', JSON.stringify(bestResultsEngByCategory))
localStorage.getItem('Difficulty') ? false : localStorage.setItem('Difficulty', 'easy')

function addToLocalStorageBestResult() {
    const bestResults = localStorage.getItem('bestResults') ? JSON.parse(localStorage.getItem('bestResults')) : []
    for (const el of bestResults) {
        if (el.typeQuestion == typeCurrentQuestion && el.countBestScore < countCorrectAnswer) {
            el.countBestScore = countCorrectAnswer
            break
        }
    }
    localStorage.setItem('bestResults', JSON.stringify(bestResults))
}

function addToLocalStorageBestResultEng() {
    let bestResults = localStorage.getItem('bestResultsEngByCategory') ? JSON.parse(localStorage.getItem('bestResultsEngByCategory')) : []
    let score = bestResults.find(item => item.categoryId == 0)

    if (typeof score == 'undefined') {
        bestResults.push({
            categoryId: Number(categoryId),
            countBestScore: countCorrectAnswer
        })
    } else {
        if (score.countBestScore < countCorrectAnswer) {
            score.countBestScore = countCorrectAnswer
        }
    }
    localStorage.setItem('bestResultsEngByCategory', JSON.stringify(bestResults))
}

function addToLSBestResultByCategory() {
    let bestResults = localStorage.getItem('bestResultsEngByCategory') ? JSON.parse(localStorage.getItem('bestResultsEngByCategory')) : []
    let score = bestResults.find(id => id.categoryId == categoryId)

    if (typeof score == 'undefined') {
        bestResults.push({
            categoryId: Number(categoryId),
            countBestScore: countCorrectAnswer
        })
    } else {
        if (score.countBestScore < countCorrectAnswer) {
            score.countBestScore = countCorrectAnswer
        }
    }
    localStorage.setItem('bestResultsEngByCategory', JSON.stringify(bestResults))
}

function addToLocalStorageLikedQuestions(obj) {
    const likedQuestions = localStorage.getItem('likedQuestions') ? JSON.parse(localStorage.getItem('likedQuestions')) : []
    likedQuestions.push(obj[numberAnswer])
    localStorage.setItem('likedQuestions', JSON.stringify(likedQuestions))
}

function setToLocalStorageDifficulty(selectedDifficulty) {
    localStorage.setItem('Difficulty', selectedDifficulty)
}


