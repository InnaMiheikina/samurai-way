export type PostsType = {
    id: number,
    message: string,
    likesCount: number
}
export type dialogsType = {
    id: number,
    name: string
}
export type messagesType = {
    id: number,
    message: string
}
export type profilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
export type dialogsPageType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
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
    callSubscriber: () => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionType) => void
}
type AddPostActionType = ReturnType<typeof AddPostAC>
type upDateNewPostTextActionType = ReturnType<typeof UpDateNewPostTextAC>
export type ActionType = AddPostActionType | upDateNewPostTextActionType;

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

export const AddPostAC = (newPostText: string) => {
    return {
        type: ADD_POST,
        newPostText: newPostText
    } as const
}
export const UpDateNewPostTextAC = (newText: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: newText
    }as const
};


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
                {id: 5, message: 'yo'}]
        },
        sidebar: {}
    },
    getState() {
        return this._state;
    },
    callSubscriber() {
        console.log('state')
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
    subscribe(observer) {
        this.callSubscriber = observer;//наблюдатель
    },
    dispatch(action) {
        if (action.type === ADD_POST) {
            const newPost: PostsType = {
                id: new Date().getTime(),
                message: action.newPostText,
                likesCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this.callSubscriber()
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this.callSubscriber()
        }

    }
}
export default store;