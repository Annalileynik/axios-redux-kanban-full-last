import axios from "axios";

export const fetchStatuses = () => {
    return (dispatch)=>{
        axios.get('https://expressjs-server.vercel.app/statuses')
            .then((res)=>{
                dispatch({type:"GET_STATUSES", payload:res.data})
            })
            .catch((err)=>
            alert('Server cannot give statuses'))
    }}
export const fetchTasks = () => {
    return(dispatch)=>{
        axios.get('https://expressjs-server.vercel.app/tasks')
            .then((res)=>{
                dispatch({type:"GET_TASKS", payload:res.data})
            })
            .catch((err)=>{
                alert('Server cannot read Tasks')
            })
    }}
export const changePriorityTasks = (id, updatePriorityTask ) => {
    return(dispatch)=>{
        console.log(updatePriorityTask)
        axios.patch(`https://expressjs-server.vercel.app/tasks/${id}`,updatePriorityTask)
            .then((res)=>{
                console.log(res)
                dispatch(fetchTasks())
            })
            .catch((err)=>
            alert('Server cannot change priority'))
    }}
export const moveTask = (id, newStatus ) => {
    return(dispatch)=>{
        axios.patch(`https://expressjs-server.vercel.app/tasks/${id}`, {status:newStatus})
            .then((res)=>{
                console.log(res)
                dispatch(fetchTasks())
            })
            .catch((err)=>
            alert('Server cannot change status'))
    }}
export const deleteTask = (id) => {
    return(dispatch)=>{
        axios.delete(`https://expressjs-server.vercel.app/tasks/${id}`)
            .then((res)=>{
                console.log(res)
                dispatch(fetchTasks())
            })
            .catch((err)=>
            alert('Server cannot delete task'))
    }}
export const createTask = (createTasks) => {
    return(dispatch)=>{
        axios.post('https://expressjs-server.vercel.app/tasks', createTasks)
            .then((res)=>{
                dispatch(fetchTasks())
            })
            .catch((err)=>
            alert("Could not create task"))
    }}
export const editTask = (id, updateTasks) => {
    return (dispatch)=>{
        axios.patch(`https://expressjs-server.vercel.app/tasks/${id}`, updateTasks)
            .then((res)=>{
                dispatch(fetchTasks())
            })
            .catch((err)=>
            alert('Could not update task'))
    }}