import Button from 'react-bootstrap/Button';
import { Stack } from 'react-bootstrap';
import QuizDataService from '../services/quiz'

const LifeBands = (props) => {

    const { friendAns, setFriendAns, setHalf, half, publicAsk, setPublicAsk } = props

    const callToAFriend = () => {
        QuizDataService.callToAFriend()
            .then(response => response.json())
            .then(data => setFriendAns({ used: data.friendAnsUsed, answerId: data.correctAnswer }))

    }

    const halfToHalf = () => {
        QuizDataService.halfToHalf()
            .then(response => response.json())
            .then(data => {
                setHalf({
                    firstId: data.firstIdToDelete,
                    secondId: data.secondIdToDelete,
                    halfUsed: data.halfUsed
                })
            })

    }
    const askPublic = () => {
        QuizDataService.askPublic()
            .then(response => response.json())
            .then(data => {
                setPublicAsk({
                    publicAnswerId: data.public_response,
                    askPublicUsed: data.askPublicUsed
                })
            })
    }

    return (
        <Stack gap={1} className="col-md-5 mx-auto">
            {!friendAns.used ?
                <Button variant="secondary" onClick={callToAFriend}>
                    Tel. do przyjaciela
                </Button>
                :
                <Button disabled variant="secondary">
                    Tel. do przyjaciela
                </Button>
            }
            {
                !half.halfUsed ?
                    <Button onClick={halfToHalf} variant="secondary">
                        Pół na pół
                    </Button>
                    :
                    <Button disabled variant="secondary">
                        Pół na pół
                    </Button>

            }
            {
                !publicAsk.askPublicUsed ?
                    <Button onClick={askPublic} variant="secondary">Pytanie do publiczności</Button>
                    :
                    <Button disabled variant="secondary">Pytanie do publiczności</Button>

            }

        </Stack>
    );
}

export default LifeBands;