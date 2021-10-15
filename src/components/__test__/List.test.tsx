import TodoList from "../list/TodoList";
import React from 'react';
import { shallow } from 'enzyme';

describe('Lists', () => {
    it('should render', () => {
        const container = shallow(<TodoList />);

        expect(container.exists()).toBeTruthy();
    });
})