import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo } from '../store/reducers/UserReducer';
import '../todos.css';

const Li = (props) => {
    return (
        <li className='todolist'>
            <button className='spanbutton' onClick={() => { props.onSelect(props.id) }}>x</button>
            {props.text}
        </li>
    );
}


const Todos = () => {

    const dispatch = useDispatch();
    const [data, setData] = useState('');
    const { currentUser, token } = useSelector((state) => state.userSlice);

    const addItems = () => {
        var obj = {
            currentUser: currentUser,
            Todo: data,
            token: token
        }
        if (data !== '') {
            dispatch(addTodo(obj));
            setData('');
        }
        else {
            alert('Input field must not be empty');
        }
    }

    const deleteItems = (todoId) => { //id of item we want to delete
        var obj = {
            currentUser: currentUser,
            id: todoId,
            token: token
        }
        dispatch(deleteTodo(obj));
    }

    return (
        <>
            <div className='center_div'>
                <br />
                <h1 className='todoheader'>To-Do List</h1>
                <br />
                <input className='todoinput' type='text'
                    placeholder='Add an item..'
                    value={data}
                    onChange={(e) => setData(e.target.value)} />
                <button className='todobutton' onClick={addItems}>+</button>
                <ol className='todoorderlist'>
                    {currentUser.Todos.map((todo, index) =>
                        <Li text={todo}
                            id={index}
                            key={index}
                            onSelect={deleteItems}
                        />)}
                </ol>
            </div>
        </>
    )
}

export default Todos;