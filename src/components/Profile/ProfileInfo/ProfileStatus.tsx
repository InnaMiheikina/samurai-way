import React, { PureComponent} from 'react';

export type ProfileStatusType = {
    status:string
    updateStatus:(status: string) => void
}

class ProfileStatus extends PureComponent<ProfileStatusType>  {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode =()  =>{
        this.setState({editMode:true, status: this.props.status})
    }
    deActivateEditMode =() => {
        this.setState({editMode:false})
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e:any)=> {
        this.setState({status:e.currentTarget.value})
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>, snapshot?: any) {
        if(prevProps.status !== this.props.status){
            this.setState({
                status:this.props.status
            })
        }
    }

    render() {
        console.log('pureComponent')
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                </div>}
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange}
                           autoFocus={true}
                           onBlur={this.deActivateEditMode}
                           value={this.state.status}/>
                </div>}
            </div>
        );
    };
}

export default ProfileStatus;
