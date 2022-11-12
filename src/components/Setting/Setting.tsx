import React from "react";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


function Setting () {
    return (
        <div>Music</div>
    )
}
export default compose <React.ComponentType>(withAuthRedirect)(Setting)