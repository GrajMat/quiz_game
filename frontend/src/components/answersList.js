import { Button, Stack } from 'react-bootstrap';
const AnswersList = (props) => {
    const { answersList, activeBtnId, friendAnsId, half, publicAsk, result, sendAnswer } = props;
    const { firstId, secondId } = half
    const { publicAnswerId } = publicAsk

    const btnColor = result ? "success" : "danger"

    const showAnswersList = () => {
        if (answersList) {
            return answersList.map((answer, id) => {
                let disabled = false
                let variant = "primary"



                if (friendAnsId === id) variant = "info"
                if (publicAnswerId === id) variant = "info"
                if ((firstId === id || secondId === id)) disabled = true
                if (activeBtnId === id) variant = btnColor

                return <Button
                    disabled={disabled}
                    variant={variant}
                    onClick={sendAnswer}
                    value={id}
                    key={id} >
                    {answer}
                </Button >

            })
        }
    }


    return (
        <>
            <Stack direction='horizontal' gap={1}>
                {showAnswersList()}
            </Stack>
        </>
    );
}

export default AnswersList;