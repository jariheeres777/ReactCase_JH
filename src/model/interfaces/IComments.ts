export interface IComments {
    id: string;
    todoId: string;
    parentCommentId?: string;
    comment: string;
    date: string;
    user: string;
}