import React from 'react';
import Card from "./Card";
import {connect} from "react-redux";

const Column = (props) => {
    return (

            <div className="col">
                <h3> {props.status.title}</h3>
                {props.tasks.filter(task =>
                    task.status === props.status.title).map(el =>
                    <Card
                        key={el._id}
                        task={el}
                    />
                )}
            </div>

    );
};
const mapStateToProps = (state) => ({
    tasks: state.tasks
})
export default connect(mapStateToProps)(Column);