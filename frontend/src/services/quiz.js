class QuizDataService {

    getNextQuestions() {
        return fetch('http://127.0.0.1:5000/questions', { method: 'GET' })
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