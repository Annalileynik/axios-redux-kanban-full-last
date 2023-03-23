import React, {useState, useEffect} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {createTask, deleteTask, editTask} from "../redux/actions";
import {connect} from "react-redux";

function ModalWindow(props) {

    const [name, setName] = useState(props.modalData.modalTitle === "Create Task" ? '' : props.modalData.task?.name)
    const [description, setDescription] = useState(props.modalData.modalTitle === "Create Task" ? '' : props.modalData.task?.description)
    const [priority, setPriority] = useState(props.modalData.modalTitle === "Create Task" ? props.priorities[0] : props.modalData.task?.priority)
    const [status, setStatus] = useState(props.modalData.modalTitle === "Create Task" ? props.statuses[0].title : props.modalData.task?.status)

    const yesButtonHandler = () => {
        toggle()
        if (props.modalData.modalTitle === "Delete Task") {
            props.onDeleteTask(props.modalData.task?._id)
        }
        console.log(props.modalData)
        if (props.modalData.modalTitle === "Create Task") {
            const createTasks = {id: Math.random().toString(), name, description, status, priority}
            props.onCreateTask(createTasks)
        }
        if (props.modalData.modalTitle === "Edit Task") {
            const updateTasks = {name, description, status, priority}
            props.onUpdateTask(props.modalData.task?._id, updateTasks)
        }
    }

useEffect(()=>{
    console.log("Hello open!")
},[])
    const toggle = () => {
        props.closeModalWindow()
    }
    console.log(props.modalData.modalTitle)
    return (

        <Modal isOpen={props.modalData.open} toggle={toggle}>
            <ModalHeader toggle={toggle}>{props.modalData.modalTitle}</ModalHeader>
            <ModalBody>
                {props.modalData.modalTitle === "Delete Task" &&
                    <div> Are you sure <b> {props.modalData.task.name}</b> delete?</div>}
                {(props.modalData.modalTitle === "Create Task" || props.modalData.modalTitle ==='Edit Task') &&

                    <div>
                        <div className="input-group input-group-lg">
                            <span className="input-group-text" id="inputGroup-sizing-lg">Name</span>
                            <input
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                type="text" className="form-control" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-lg"/>
                        </div>
                        <br/>

                        <div className="input-group input-group-lg">
                            <span className="input-group-text" id="inputGroup-sizing-lg">Description</span>
                            <input
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                type="text" className="form-control" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-lg"/>
                        </div>
                        <br/>
                        <select
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                            className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                            {props.statuses.map(status =>
                                <option
                                    key={status._id}
                                    value={status.title}>{status.title}</option>)}
                        </select><br/>

                        <select
                            value={priority}
                            onChange={(event) => setPriority(event.target.value)}
                            className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                            {props.priorities.map((el, index) =>
                                <option
                                    key={index}

                                    value={el}>{el}</option>)}
                        </select>

                    </div>}

            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={yesButtonHandler}>
                    Yes
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

const maoStateToProps = (state) => ({
    modalData: state.modalData,
    priorities: state.priorities,
    statuses: state.statuses
})
const mapDispatchToProps = (dispatch) => ({
    closeModalWindow: () => dispatch({type: "MODAL_TOGGLE"}),
    onDeleteTask: (id) => dispatch(deleteTask(id)),
    onCreateTask: (createTasks) => dispatch(createTask(createTasks)),
    onUpdateTask: (id, updateTasks) => dispatch(editTask(id, updateTasks))
})
export default connect(maoStateToProps, mapDispatchToProps)(ModalWindow);