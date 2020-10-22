import React from 'react';

class AddTodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
    }

    handle_submit = e => {
        e.preventDefault();
        this.props.add_todo(this.state);

        this.setState({
            content: ''
        });
    }

    handle_change = e => {
        this.setState({
            content:e.target.value
        });
    }

    render() {
        return(
            <div>
                <form id="form" onSubmit={this.handle_submit}>
                    <input type="text" onChange={this.handle_change} value={this.state.content} />
                </form>
            </div>
        );
    }
}

export default AddTodoForm;