import React from 'react';
import {changePriorityTasks, moveTask} from "../redux/actions";
import {connect} from "react-redux";

const Card = (props) => {
    const changeStatusHandler = (direction) => {
        const oldIndex = props.statuses.indexOf(props.task.status)
        const newIndex = oldIndex + direction
        const newStatus = props.statuses[newIndex]
        props.changeStatus(props.task._id, newStatus)
    }
    return (

        <div className="card">
            <div className="card-header">
                {props.task.name}
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{props.task.description}</li>
                <li className="list-group-item">Priority: {props.task.priority}<br/>
                    <button
                        disabled={+props.task.priority === props.priorities[props.priorities.length - 1]}
                        onClick={() => props.changePriority(props.task._id, {priority: +props.task.priority + 1})}
                        type="button" className="btn btn-outline-info">↑
                    </button>
                    <button
                        disabled={+props.task.priority === props.priorities[0]}
                        onClick={() => props.changePriority(props.task._id, {priority: +props.task.priority - 1})}
                        type="button" className="btn btn-outline-info">↓
                    </button>
                </li>
                <li className="list-group-item">Status: {props.task.status} <br/>
                    <button
                        disabled={props.task.status === props.statuses[0]}
                        onClick={() => changeStatusHandler(-1)}
                        type="button" className="btn btn-outline-info">←
                    </button>
                    <button
                        disabled={props.task.status === props.statuses[props.statuses.length-1]}
                        onClick={() => changeStatusHandler(+1)}
                        type="button" className="btn btn-outline-info">→
                    </button>
                    <hr/>
                    <button
                        onClick={()=>props.openModal("Delete Task", props.task)}
                        type="button" className="btn btn-outline-danger">Delete</button>
                    <button
                        onClick={()=>props.openModal("Edit Task", props.task)}
                        type="button" className="btn btn-outline-warning">Edit</button>
                </li>
            </ul>
        </div>
    )
};
const mapStateToProps = (state) => ({
    priorities: state.priorities,
    statuses: state.statuses.map(el => el.title)
})
const mapDispatchToProps = (dispatch) => ({
    changePriority: (id, updatePriorityTask) => dispatch(changePriorityTasks(id, updatePriorityTask)),
    changeStatus: (id, newStatus) => dispatch(moveTask(id, newStatus)),
    openModal:(modalTitle, task)=> dispatch({type: "MODAL_TOGGLE", payload:{modalTitle:modalTitle, task:task}})
})
export default connect(mapStateToProps, mapDispatchToProps)(Card);