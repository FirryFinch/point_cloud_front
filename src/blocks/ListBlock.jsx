import React from 'react';
import './ListBlock.css';


class ListBlock extends React.Component {

    state = {
        objects: [],
    }

    componentDidMount() {
        fetch("/api/objects", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                this.setState({objects: res});
            })
            .catch((err) => {
                console.log(err);
            });
    }


    getUniqueSubclasses() {
        var subclasses = []

        function eliminateDuplicates(arr) {
            var i,
                len = arr.length,
                out = [],
                obj = {};

            for (i = 0; i < len; i++) {
                obj[arr[i]] = 0;
            }
            for (i in obj) {
                out.push(i);
            }
            return out;
        }

        for (let i in this.state.objects) {
            this.state.objects.map((output, i) => (
                subclasses[i] = output.subcl
            ))
        }

        return (
            // this.state.objects.map((output, id) => (
            //     <li key={id}>{output.name}</li>
            // ))
            eliminateDuplicates(subclasses)
        );
    }

    render() {

        return (
            <nav className="list_position">
                <ul>
                    <li>{this.getUniqueSubclasses()}</li>
                </ul>
            </nav>
        );
    }
}

export default ListBlock;