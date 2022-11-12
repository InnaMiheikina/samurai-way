import React from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import Dialogs from "../Dialogs/Dialogs";


function News () {
    return (
        <div>News</div>
    )
}
export default compose <React.ComponentType>(withAuthRedirect)(News)
