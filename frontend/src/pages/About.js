const About = () => {
    return (
        <>
            <h1>About</h1>
            <p>
                Quiz Game is an application created by Mateusz Grajko using React, Node.js and Express.js.
                The logic of the game is reminiscent of the millionaires game where you have to guess a certain number of questions to win. It only takes one wrong answer to lose, but the player can use three options for help:
            </p>
            <ul>
                <li>
                    <b>phone a friend</b> - your friend is very smart and always knows the right answer,
                </li>
                <li>
                    <b>half-and-half option</b> - two wrong answers are eliminated - you have at least a 50% chance of winning,
                </li>
                <li>
                    <b>question to the audience</b> - they usually know the answer to the question but sometimes they can be wrong - be careful.
                </li>
            </ul>
            <p>
                I wish you a lot of fun.
            </p>
            <p>
                P.S.
                <br />
                Apologies for missing last letters in some answers - this is out of my control.
            </p>
            <p>
                M.G.
            </p>
        </>

    );
}

export default About;