import React from 'react';

const Todos = props => {
    const todos = props.todos;
    const todo_list = todos.length ? (
        todos.map(todo => {
            return (
                <div className="notification" key={todo.key}>
                    <span>{todo.value.todo}</span>
                    <button onClick={() => {
                        props.delete_todo(todo.key)
                    }}>Delete</button>
                    
                    <button onClick={() => {
                        props.update_todo(todo.key, todo.value.todo)
                    }}>Update</button>
                </div>
                
            );
        })
    ) : (
        <p className="center">You don't have any Todo's left</p>
    );

    return (
        <div className="todos collection">
            {todo_list}
        </div>
    );

}

export default Todos;