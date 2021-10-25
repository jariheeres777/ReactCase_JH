import {IList} from "../model/interfaces/IList";

const initialLists: IList[] = [
    {
        id: 'default_list',
        color: 'blue',
        name: 'Inbox',
        default: true,
        order: -1,
        active: true,
        private:false,
        user:''
    },
    {
        id: 'default_list_upcoming',
        color: 'blue',
        name: 'upcoming',
        default: true,
        order: 0,
        active: false,
        private:false,
        user:''
    },
    {
        id: `default_my_todo's`,
        color: 'blue',
        name: 'My todos',
        default: true,
        order: 1,
        active: false,
        private: false,
        user: ''
    }
];

export default initialLists;