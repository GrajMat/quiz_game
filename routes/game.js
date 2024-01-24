import fs from 'fs'
const gameRoutes = (app) => {

    let goodAnswers = 0;
    let isGameOver = false;
    let isCorrect = false;
    let friendAnsUsed = false
    let halfUsed = false
    let askPublicUsed = false;
    let questions;
    const questionsAmount = 10;
    let usedQuestionsArray = []

    try {
        const data = fs.readFileSync('./data.json', 'utf8')
        questions = JSON.parse(data).pytania
    } catch (e) {
        console.log(e)
    }
    // fs.readFileSync('./data.json', 'utf8', (err, data) => {
    //     if (err) return console.log(err)
    //     questions = JSON.parse(data)
    //     questions = questions.pytania
    //     console.log(questions.length)

    // })



    // goodAnswers= questions.length



    // let questions2 = []
    // fs.readFile('./questions.json', 'utf8', (err, data) => {
    //     if (err) {
    //         console.log(err)
    //         return
    //     }
    //     // console.log(JSON.parse(data))
    //     questions2 = JSON.parse(data)
    //     questions2 = questions2.pytania

    //     const changedQuestions = questions2.map(question => {
    //         if (question.odp_poprawna === "A") return { question: question.tresc, answers: question.odp, correctAnswer: 0 }
    //         if (question.odp_poprawna === "B") return { question: question.tresc, answers: question.odp, correctAnswer: 1 }
    //         if (question.odp_poprawna === "C") return { question: question.tresc, answers: question.odp, correctAnswer: 2 }
    //         if (question.odp_poprawna === "D") return { question: question.tresc, answers: question.odp, correctAnswer: 3 }
    //     })
    //     const newQuestions = { pytania: changedQuestions }
    //     const newQuestionsJson = JSON.stringify(newQuestions)
    //     console.log(newQuestionsJson)
    //     fs.writeFile('data.json', newQuestionsJson, 'utf8', (err) => {
    //         if (err) {
    //             console.log(err)
    //             return
    //         }
    //         console.log("dane załadowane")
    //     })
    // })

    let LoopAmount = 0;
    // let nextQuestions = questions[goodAnswers]
    let nextQuestion;

    const setNextQuestions = () => {
        const index = Math.floor(Math.random() * questions.length)
        const result = usedQuestionsArray.find(element => element === index)
        if (!result) {
            usedQuestionsArray.push(index)
            nextQuestion = questions[index]
            return
        } else setNextQuestions()
        LoopAmount++

    }

    app.get('/questions', (req, res) => {
        if (goodAnswers === questionsAmount) {
            res.json({
                winner: true,
                questionsAmount
            })
            goodAnswers = 0
        }
        else {
            setNextQuestions()
            const { question, answers } = nextQuestion
            res.json({ question, answers, questionsAmount })
        }


    })

    app.post('/answer/:id', (req, res) => {

        const { id } = req.params
        isCorrect = nextQuestion.correctAnswer === Number(id)
        if (isCorrect) {
            goodAnswers++
        } else {
            isGameOver = true

        }

        res.json({
            isCorrect,
            isGameOver,
            goodAnswers: goodAnswers,
        })
    });

    app.get('/reset', (req, res) => {
        isCorrect = false;
        isGameOver = false;
        goodAnswers = 0;
        halfUsed = false
        askPublicUsed = false
        usedQuestionsArray = []

        // res.json({
        //     isCorrect,
        //     isGameOver,
        //     goodAnswers,
        //     halfUsed,
        //     askPublicUsed
        // })
        res.end()
    });


    app.get('/help/friend', (req, res) => {
        const { correctAnswer } = nextQuestion
        friendAnsUsed = true
        res.json({
            correctAnswer: correctAnswer,
            friendAnsUsed
        })
    })

    app.get('/help/half_to_half', (req, res) => {

        const { correctAnswer } = nextQuestion
        const answers = nextQuestion.answers
        let badAnswersIndex = []
        for (let i = 0; i < answers.length; i++) {
            if (i !== correctAnswer) badAnswersIndex.push(i)
        }

        const index1 = Math.floor(Math.random() * badAnswersIndex.length)
        const firstIdToDelete = badAnswersIndex[index1]
        badAnswersIndex.splice(index1, 1)
        const index2 = Math.floor(Math.random() * badAnswersIndex.length)
        const secondIdToDelete = badAnswersIndex[index2]

        halfUsed = true

        res.json({
            firstIdToDelete,
            secondIdToDelete,
            halfUsed
        })
    })

    app.get('/help/public', (req, res) => {
        const { correctAnswer } = nextQuestion
        const answers = nextQuestion.answers

        const randomIndex = Math.floor(Math.random() * answers.length)

        const indexesToShuffle = [correctAnswer, randomIndex]
        const public_response = indexesToShuffle[Math.floor(Math.random() * indexesToShuffle.length)]
        askPublicUsed = true

        res.json({
            public_response,
            askPublicUsed
        })
    })


}
export default gameRoutes