import React from 'react';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import Navbar from './navbar';
import UpdateTaskForm from './updateTaskForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function UserTasks({ userId ,onLogout }) {
    const [tasks, setTasks] = React.useState([]);
    const [isUpdate, setIsUpdate] = React.useState(false);
    const [taskFromUser, setTask] = React.useState(null)

  
    const handleUpdateFromUser = (task) => {
        setIsUpdate(false);
        setTask(task);
        setTimeout(function(){setIsUpdate(true);},null);
    };



    const handleUpdateTask = (updatedTask) => {
        fetch(`https://eteh2euzvc.execute-api.us-east-1.amazonaws.com/dev/users/${userId}/tasks/${taskFromUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
        .then(response => response.json())
        .then(tasks => {
            setIsUpdate(false);
            setTasks(tasks);
        })
        .catch(error => {
            console.error(error);
        });
    };
    
  

    const handleAddTask = (task) => {
        fetch(`https://eteh2euzvc.execute-api.us-east-1.amazonaws.com/dev/users/${userId}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(response => response.json())
            .then(tasks => {

                setTasks(tasks);
            })
            .catch(error => {
                console.error(error);
            });
    };
    const handleDeleteTask = (taskId) => {
        fetch(`https://eteh2euzvc.execute-api.us-east-1.amazonaws.com/dev/users/${userId}/tasks/${taskId}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((tasks) => {
                setIsUpdate(false);
                setTasks(tasks);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    React.useEffect(() => {
        fetch(`https://eteh2euzvc.execute-api.us-east-1.amazonaws.com/dev/users/${userId}/tasks`)
            .then(response => response.json())
            .then(tasks => {
                setTasks(tasks);
            })
            .catch(error => {
                console.error(error);
            });
    }, [userId]);

    return (
        <div>
            <div><Navbar onLogout1 ={onLogout} /></div>
            <div className='container-xxl container-xl  container-lg  container-md container-sm'>
                <br></br>
                <Row>
                    <Col lg={9} md={7} sm={12}><TaskList tasks={tasks} onDelete={handleDeleteTask} hedleUpdate ={handleUpdateFromUser} /></Col>
                    <Col lg={3} sm={12} md={4}> {isUpdate? <UpdateTaskForm onSubmit ={handleUpdateTask} task = {taskFromUser} /> : <AddTaskForm onSubmit={handleAddTask} />}</Col>
                    <Col lg={4} md={0} sm={12} ></Col>
                </Row>

            </div>
        </div>

    );
}

export default UserTasks;
