// class QuizDataService {

//     getNextQuestions() {
//         return fetch('https://quizgameserver-production.up.railway.app/questions', { method: 'GET' })
//     }

//     sendAnswer(answerIndex) {
//         return fetch(`https://quizgameserver-production.up.railway.app/answer/${answerIndex}`, { method: 'POST' })
//     }
//     reset() {
//         return fetch(`https://quizgameserver-production.up.railway.app/reset`, { method: 'GET' })
//     }
//     callToAFriend() {
//         return fetch(`https://quizgameserver-production.up.railway.app/help/friend`,
//             {
//                 method: "GET"
//             })
//     }
//     halfToHalf() {
//         return fetch(`https://quizgameserver-production.up.railway.app/help/half_to_half`)
//     }
//     askPublic() {
//         return fetch(`https://quizgameserver-production.up.railway.app/help/public`)
//     }


// }


//localhost
const api = 'http://127.0.0.1:5000'

class QuizDataService {

    getNextQuestions() {
        return fetch(`${api}/questions`, { method: 'GET' })
    }

    sendAnswer(answerIndex) {
        return fetch(`http://127.0.0.1:5000/answer/${answerIndex}`, { method: 'POST' })
    }
    reset() {
        return fetch(`http://127.0.0.1:5000/reset`, { method: 'GET' })
    }
    callToAFriend() {
        return fetch(`http://127.0.0.1:5000/help/friend`,
            {
                method: "GET"
            })
    }
    halfToHalf() {
        return fetch(`http://127.0.0.1:5000/help/half_to_half`)
    }
    askPublic() {
        return fetch(`http://127.0.0.1:5000/help/public`)
    }


}

export default new QuizDataService()