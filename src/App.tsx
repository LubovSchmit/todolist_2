import React, {useState} from 'react';
import './App.css';
import {ToDoList} from './ToDoList';
import {v1} from 'uuid';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'completed' | 'active';


export function App() {
    //BLL
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('all');

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks])
    }


    let tasksForToDoList = tasks;
    if (filter === 'completed') {
        tasksForToDoList = tasks.filter(t => t.isDone);
    }
    if (filter === 'active') {
        tasksForToDoList = tasks.filter(t => !t.isDone)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }


//UI
    return (
        <div className='App'>
            <ToDoList title='What to learn'
                      tasks={tasksForToDoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );

}

