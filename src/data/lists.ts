import {IList} from "../model/interfaces/IList";

const initialLists: IList[] = [
    {
        id: 'default_list',
        color: 'blue',
        name: 'Inbox',
        default: true,
        order: 0,
        active: false
    },
    {
        id: 'default_list_upcoming',
        color: 'blue',
        name: 'upcoming',
        default: true,
        order: 1,
        active: true
    }
];

export default initialLists;