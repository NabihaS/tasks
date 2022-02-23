import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
// cmds: npm run start, npm run test:cov, ctrl+c to cancel run start, git push --set-upstream origin solved-html-css, CMD+K+S for shortcuts, OPT+CMD+S for save all
function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript - Nabiha Syed
            </header>
            <Container>
                <Row>
                    <Col>
                        <div className="red-box">
                            <img
                                src="https://picsum.photos/id/870/200/300?blur=1"
                                alt="A lovely image of a lonely lighthouse"
                            />
                        </div>
                    </Col>
                    <Col>
                        <h1>A Collection of Fragments</h1>
                        <ul>
                            <li>Explore</li>
                            <li>Search</li>
                            <li>Reinvent</li>
                        </ul>
                        <div className="red-box"></div>
                    </Col>
                </Row>
            </Container>
            <p>
                Edit <code>src/App.tsx</code> and save. This page will
                automatically reload. Hello World.
            </p>
            <Button onClick={() => console.log("Hello World!")}>
                Log Hello World
            </Button>
        </div>
    );
}

export default App;
