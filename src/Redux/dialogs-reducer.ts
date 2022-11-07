const SEND_MESSAGE = 'SEND-MESSAGE'


type ActionsType =
    ReturnType<typeof sendMessageAC>

export type DialogType = {
    id: number,
    name: string
}
export type MessageType = {
    id: number,
    message: string
}
/*export type InitDialogsReducerStateType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody:string
}*/
export type InitDialogsReducerStateType = typeof intState
const intState = {
    dialogs: [
        {id: 1, name: 'Inna'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sofia'},
        {id: 4, name: 'Ira'},
        {id: 5, name: 'Dimych'}] as Array<DialogType>,
    messages: [
        {id: 1, message: 'hi'},
        {id: 2, message: 'how are you'},
        {id: 3, message: 'its ok'},
        {id: 4, message: 'yo'},
        {id: 5, message: 'yo'}
    ] as Array<MessageType>,

}
export const dialogsReducer = (state: InitDialogsReducerStateType = intState, action: ActionsType): InitDialogsReducerStateType => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let body = action.newMessageBody;
           return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        }
        default:
            return state;

    }
}
export const sendMessageAC = (newMessageBody:string) => {
    return {
        type: SEND_MESSAGE,newMessageBody
    } as const
}


