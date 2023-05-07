import React from 'react';
import './NavigationBlock.css';

class NavigationBlock extends React.Component  {
    state = {
        classes: [],
    }

    componentDidMount() {
        fetch("/api/classes", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                this.setState({ classes: res });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return(
            <nav className="navframe_position">
                <ul>
                    <li>Все</li>
                    {this.state.classes.map((output, id) => (
                        <li key={id}>{output.title}</li>
                    ))}
                </ul>
            </nav>
            )
    }
}
export default NavigationBlock;