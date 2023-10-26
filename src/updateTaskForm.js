import React, { useState } from 'react';
import CategoryField from './addtaskcaterory';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDateTimePicker } from '@mui/x-date-pickers';
import { DesktopTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { data } from 'jquery';



function UpdateTaskForm({ onSubmit, task}) {
    console.log(task.name)
    const deadline = new Date(task.deadline)
    const [selectedDate, setSelectedDate] = useState(dayjs(deadline));

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(selectedDate.toString());
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const now = new Date().toISOString().slice(0, 10);
        const formData = new FormData(event.target);
        const task = {
            name: formData.get('name'),
            category: formData.get('category'),
            priority: formData.get('priority'),
            deadline: new Date(selectedDate).toISOString(),
            duration: parseFloat(formData.get('duration')),
            time: new Date()
        };
        onSubmit(task);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        id="task-name-input"
                        name="name"
                        className="form-control"
                        placeholder="New Task"
                        aria-describedby="emailHelp"
                        defaultValue={task.name}
                    />
                </div>

                <CategoryField  cateroryFromUser ={task.category}/>

                <div className="mb-3">
                    <select id="task-priority-input" name="priority" className="form-control" defaultValue={task.priority}>
                        <option value="" disabled selected>Select Priority</option>
                        <option value="1">High</option>
                        <option value="2">Medium</option>
                        <option value="3">Low</option>
                    </select>
                </div>

                <div className="mb-3" >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDateTimePicker label="Select date and time" value={selectedDate}
                            onChange={handleDateChange} slotProps={{ textField: { fullWidth: true } }}/>
                    </LocalizationProvider>
                </div>


                <div className="mb-3">
                    <input type="text"  pattern="[0-9]+([.,][5]+)?"  id="task-duration-input" name="duration" className="form-control"
                        placeholder="Duration" required  defaultValue={task.duration} />
                </div>
                <div className='class="d-grid gap-2"'>
                    <button className="btn  btn-dark" style={{ width: '100%' }} type="submit">Update Task</button>
                </div>
            </form>
            <br></br>
            <br></br>

        </>
    );
}

export default UpdateTaskForm;
