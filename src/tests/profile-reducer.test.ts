import {AddPostAC, deletePostAC, InitialProfileReducerStateType, profileReducer} from "../Redux/profile-reducer";

const state: InitialProfileReducerStateType = {
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount: 12},
        {id: 2, message: 'It\'s  my first post', likesCount: 4}
    ],
    profile: null,
    status: ""
}

it('new post should be added', ()=> {
    let action = AddPostAC('It-kamasutra.com')
    let newState = profileReducer((state),action);
    expect(newState.posts.length).toBe(3)
    })

it('after delete length of message should be decrement', ()=> {
    let action = deletePostAC(1)
    let newState = profileReducer(state,action);
    expect(newState.posts.length).toBe(1)
})

it('after delete length should`t be decrement if id is incorrect', ()=> {
    let action = deletePostAC(10)
    let newState = profileReducer(state,action);
    expect(newState.posts.length).toBe(2)
})