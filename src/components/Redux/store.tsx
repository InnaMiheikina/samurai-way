import {AddPostAC, profileReducer, UpDateNewPostTextAC} from "./profile-reducer";
import {dialogsReducer, sendMessageAC, updateNewMessageBodyAC} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";

type PostsType = {
    id: number,
    message: string,
    likesCount: number
}
type dialogsType = {
    id: number,
    name: string
}
type messagesType = {
    id: number,
    message: string
}
type profilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
type dialogsPageType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
    newMessageBody:string
}
type sidebarType = {}
export type RootStateType = {
    profilePage: profilePageType,
    dialogsPage: dialogsPageType,
    sidebar: sidebarType
}
export type StoreType = {
    _state: RootStateType
    addPost: (newPostText: string) => void
    updateNewPostText: (newText: string) => void
    callSubscriber: () => void //onchange
    subscribe: (callback: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionType) => void
}


type AddPostActionType = ReturnType<typeof AddPostAC>
type upDateNewPostTextActionType = ReturnType<typeof UpDateNewPostTextAC>
type SendMessageActionType = ReturnType<typeof sendMessageAC>
type UpdateNewMessageBodyActionType = ReturnType<typeof updateNewMessageBodyAC>
export type ActionType = AddPostActionType | upDateNewPostTextActionType | SendMessageActionType | UpdateNewMessageBodyActionType;


let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you', likesCount: 12},
                {id: 2, message: 'It\'s  my first post', likesCount: 4}
            ],
            newPostText: "введите сooбщение..."
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Inna'},
                {id: 2, name: 'Andrew'},
                {id: 3, name: 'Sofia'},
                {id: 4, name: 'Ira'},
                {id: 5, name: 'Dimych'}],
            messages: [
                {id: 1, message: 'hi'},
                {id: 2, message: 'how are you'},
                {id: 3, message: 'its ok'},
                {id: 4, message: 'yo'},
                {id: 5, message: 'yo'}
            ],
            newMessageBody: ""
        },
        sidebar: {}
    },
    getState() {
        return this._state;
    },
    callSubscriber() {
        console.log('vdss')
    },
    addPost() {
        const newPost: PostsType = {
            id: new Date().getTime(),
            message: this._state.profilePage.newPostText,
            likesCount: 0
        };
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = '';
        this.callSubscriber()
    },
    updateNewPostText(newText: string) {
        this._state.profilePage.newPostText = newText;
        this.callSubscriber()
    },
    subscribe(callback: ()=> void) {
        this.callSubscriber = callback;//наблюдатель
    },
    dispatch(action: any) {
        //this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this.callSubscriber()
    },
}

export default store;