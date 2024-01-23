import { useEffect, useState } from "react";
import Results from "../components/results";
import AnswersList from "../components/answersList";
import LifeBands from "../components/lifeBands";

import { Button, Container, Col, Row } from "react-bootstrap";

import QuizDataService from '../services/quiz'

const Game = () => {
    const [nextQuestion, setNextQuestion] = useState()
    const [answersList, setAnswersList] = useState()
    const [result, setResult] = useState(false)
    const [resultText, setResultText] = useState()
    const [isWinner, setIsWinner] = useState(false)
    const [isGameOver, setIsGameOver] = useState(false)
    const [goodAnswers, setGoodAnswers] = useState(0)
    const [isAnswerChecked, setIsAnswerChecked] = useState(false)
    const [questionsAmount, setQuestionsAmount] = useState(null)

    //askFriends
    const [friendAns, setFriendAns] = useState({})
    //half to half
    const [half, setHalf] = useState({})
    //askPublic
    const [publicAsk, setPublicAsk] = useState({})

    const [activeBtnId, setActiveBtnId] = useState(null)



    const getNextQuestion = async () => {
        const response = await QuizDataService.getNextQuestions()
        const data = await response.json()
        setQuestionsAmount(data.questionsAmount)
        setNextQuestion(data.question)
        setAnswersList(data.answers)
        if (data.winner) setIsWinner(true)
        else setIsWinner(false)
        setIsGameOver(false)
        setResultText("")
        setIsAnswerChecked(false)
        setResult(false)
        setFriendAns(prevState => ({
            ...prevState,
            answerId: null
        }));
        setHalf(prevState => ({
            ...prevState,
            firstId: null,
            secondId: null,
        }))
        setPublicAsk(prevState => ({
            ...prevState,
            publicAnswerId: null
        }))

        setActiveBtnId(null)

    }

    const sendAnswer = async (e) => {
        if (!isAnswerChecked) {
            const answerIndex = e.target.value
            const response = await QuizDataService.sendAnswer(answerIndex)
            const data = await response.json()
            setResult(data.isCorrect)
            setGoodAnswers(data.goodAnswers)
            setIsGameOver(data.isGameOver)
            setActiveBtnId(Number(answerIndex))
            if (data.isCorrect) {
                setResultText("Brawo! Dobra odpowiedź!")
            } else {
                setResultText("Niestety, przegrałeś")
            }
            setIsAnswerChecked(true)

        } else {
            alert("Nie możesz zmienić odpowiedzi")
        }

    }




    const resetGame = async () => {
        await QuizDataService.reset()
        setResult(false)
        if (isWinner) setIsWinner(false)
        if (isGameOver) setIsGameOver(false)
        setResultText("")
        setGoodAnswers(0)
        getNextQuestion()
        setFriendAns({})
        setHalf({});
        setPublicAsk({})
        setActiveBtnId(null)
    }

    useEffect(() => {
        getNextQuestion()
    }, []);
    return (
        <>

            <Container className="justify-content-md-center p-1" >
                <Row className="p-2" >
                    <Col>
                        <h5>Dobre odpowiedzi: {goodAnswers}/{questionsAmount}</h5>
                    </Col>
                </Row>
                <Row className="p-2" >
                    <Col>
                        <LifeBands
                            publicAsk={publicAsk}
                            setPublicAsk={setPublicAsk}
                            half={half}
                            setHalf={setHalf}
                            friendAns={friendAns}
                            setFriendAns={setFriendAns}
                        />
                    </Col>
                </Row>
                <Row className="p-2">
                    <Col>
                        <h3>{nextQuestion}</h3>
                    </Col>
                </Row>
                <Row className="p-2">
                    <Col>
                        <AnswersList
                            publicAsk={publicAsk}
                            activeBtnId={activeBtnId}
                            result={result}
                            half={half}
                            friendAnsId={friendAns.answerId}
                            answersList={answersList}
                            sendAnswer={sendAnswer} />
                    </Col>
                </Row>
                <Row className="p-2">
                    <Col>
                        <Results
                            isGameOver={isGameOver} isWinner={isWinner} resetGame={resetGame} result={result} resultTest={resultText} getNextQuestion={getNextQuestion}
                        />
                    </Col>
                </Row>
                <Row className="p-2">
                    <Col>
                        <p>{resultText}</p>
                        <Button variant="danger" onClick={resetGame}>Resetuj wyniki gry</Button>

                    </Col>
                </Row>

            </Container >
        </>

    );
}

export default Game;