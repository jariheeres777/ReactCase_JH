import * as React from "react";
import {Button, Divider, InputLabel, TextField} from "@material-ui/core";
import {useState} from "react";

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div style={{display: 'grid', placeItems: 'center', paddingTop: '200px'}}>
            <InputLabel margin='dense'>
                username
                <br/><br/>
                <TextField id="name" variant="outlined"
                           margin='dense'
                           value={username}
                           onChange={(event) => setUsername(event.target.value)}/>
            </InputLabel>
            <br/><br/>
            <InputLabel margin='dense'>
                password
                <br/><br/>
                <TextField id="name" variant="outlined"
                           margin='dense'
                           value={password}
                           onChange={(event) => setPassword(event.target.value)}/>
            </InputLabel>
            <br/><br/>
            <Button disabled={username === ''}
                    onClick={() => {
                        localStorage.setItem('user', username)
                        // eslint-disable-next-line no-restricted-globals
                        location.reload();
                    }}>
                confirm
            </Button>
            <br/>
            <Divider/>
            <Button>
                cancel
            </Button>
        </div>
    );
};

export default LoginPage;
