import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function ToDoList(props: ToDoListPropsType) {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);


    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle('');
        } else {
            setError('Field title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            props.addTask(title);
            setTitle('');
        }
    }


    const onAllClickHandler = () => {
        props.changeFilter('all')
    };
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    };
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    };


    return (<div>
            <h3>{props.title}</h3>

            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}> +</button>
                {error && <div className='error-message'>{error}</div>}
            </div>

            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked);
                        }

                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type='checkbox'
                                   onChange={onChangeHandler}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}> x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : '' }
                        onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : '' }
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : '' }
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}


