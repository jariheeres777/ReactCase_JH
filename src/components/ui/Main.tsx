import {Typography} from "@material-ui/core";
import * as React from 'react';
import StyledMain from "./styled/StyledMain";
import TodoItems from "../todo/TodoItems";



const Main = () => {
    return (
        <StyledMain>
            <Typography paragraph>
                <TodoItems />
            </Typography>
        </StyledMain>
    );
};

export default Main;