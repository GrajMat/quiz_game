import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


const Results = (props) => {
    const { isGameOver, isWinner, resetGame, result, resultText, getNextQuestion } = props

    if (result && !isWinner) {
        return (

            <>
                <p>{resultText}</p>
                <Button variant="outline-success" onClick={getNextQuestion}>Następne pytanie</Button>

            </>

        );
    } else if (!result && !isWinner && isGameOver) {
        return (

            <>
                <p>{resultText}</p>
                <Button variant="warning" onClick={resetGame}>Zacznij grę od nowa</Button >

            </>

        );
    }
    else if (isWinner) {
        return (

            <>
                <p>Gratulacje. Wygrałeś!</p>
                <Button variant="warning" onClick={resetGame}>Zacznij grę od nowa</Button >
            </>

        )
    }

}

export default Results;