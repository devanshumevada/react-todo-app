import React from 'react';
import fire from './config/fire';
import AddTodoForm from './AddTodoForm';
import Todos from './Todos';
import './css/home.css';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            is_loading:false
        }
    }

    set_updated_todos = () => {
        const db = fire.firestore();
        db.collection("userdata").doc(this.props.user_id).collection("todos").orderBy("timestamp","desc").get()
        .then(todos => {
            const data = todos.docs.map(doc => {
                return {key:doc.id, value: doc.data()};
            });
            this.setState({
                todos:data
            });
        });
    }


    componentDidMount = () => {
        this.set_updated_todos();
    }

    add_todo = todo => {
        this.setState({
            is_loading:true
        });
        const db = fire.firestore();
        db.collection("userdata").doc(this.props.user_id).collection("todos").add({
            todo:todo.content,
            timestamp: Math.round(+new Date()/1000)
        }).then(() => {
            this.set_updated_todos();
            this.setState({
                is_loading: false
            });
        });

    }

    update_todo = (id, old_todo_task) => {
        const new_todo = prompt("Please enter the todo task here", old_todo_task);
            if (new_todo != null) {
                
            this.setState({
                is_loading:true
            });
            const db = fire.firestore();
            db.collection("userdata").doc(this.props.user_id).collection("todos").doc(id).update({
                todo: new_todo
            }).then(() => {
                this.set_updated_todos();
                this.setState({
                    is_loading:false
                });
            });
        }
    }

    delete_todo = id => {
        this.setState({
            is_loading:true
        });
        const db = fire.firestore();
        db.collection("userdata").doc(this.props.user_id).collection("todos").doc(id).delete()
        .then(() => {
            this.set_updated_todos();
            this.setState({
                is_loading:false
            });
        });
    }

    render() {
        return (
            <div className="app-home">
                <nav className="navbar">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/">
                            Todo App
                        </a>
                    </div>
                    <div className="navbar-end">
                        <div className="buttons">
                            <button onClick={this.props.logout} style={{marginRight: "20px"}} className="button is-warning">Logout</button>  
                        </div>
                    </div>
                </nav>
                <div id="home">
                    <div className="container">
                        <div className="columns">
                            <div className="column">
                                <div className="title is-1">
                                    <h1>Add Todo</h1>
                                    <AddTodoForm add_todo={this.add_todo} />
                                </div>
                            </div>
                            <div className="column">
                                {this.state.is_loading ? <progress className="progress is-small is-primary" max="100">15%</progress> : <Todos update_todo={this.update_todo} delete_todo={this.delete_todo} todos={this.state.todos} /> } 
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        );
    }
}


export default Home;