import React from 'react';
import moment from "moment";

import './ViewBlock.css';
import '../General.css'

import Plot from 'react-plotly.js'


class ViewBlock extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            info: false,
            edit: false,
            subclasses: [''],
            classes: ['']
        };
    }

    componentDidMount() {
        this.getSubclassesList()
        this.getClassesList()
    }

    x_array = []
    y_array= []
    z_array= []

    traces = Array(1).fill(0).map((_, i) => {
        return {
            x: this.x_array,
            y: this.y_array,
            z: this.z_array,
            mode: 'markers',
            marker:
                {
                    size: 2,
                    color: '#EC6442',
                    opacity: 0.5,
                },
            type: 'scatter3d',
            hoverlabel:
                {
                    bgcolor: '#FFFFFF',
                    font:
                        {
                            family: 'Roboto, serif'
                        },
                },
        };
    });

    handleInfo (event) {
        if (this.props.info === true)
        {
            this.props.infchange(false)
        }
        if (this.props.info === false)
        {
            this.props.infchange(true)
        }
    }

    handleEdit (event) {
        if (this.state.edit === true)
        {
            this.setState({edit: false})
        }
        if (this.state.edit === false)
        {
            this.setState({edit: true})
        }
    }

    getSubclassesList () {
        fetch("api/subclasses", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({subclasses: data});
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getClassesList () {
        fetch("api/classes", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({classes: data});
            })
            .catch((err) => {
                console.log(err);
            });
    }

    trashHandler(objid){

        fetch("api/objects/", {
            method: "DELETE",
            headers: {
                "X-CSRFToken": this.props.csrf
            },
            credentials: "include",
            body: JSON.stringify({id: objid}),
        })
            .then((data) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        if (this.props.obj.file_data_x)
        {
            this.x_array.splice(0, this.x_array.length)
            this.y_array.splice(0, this.y_array.length)
            this.z_array.splice(0, this.z_array.length)

            for(let i = 0; i < this.props.obj.file_data_x.length; i++){
                this.x_array[i] = this.props.obj.file_data_x[i];
                this.y_array[i] = this.props.obj.file_data_y[i];
                this.z_array[i] = this.props.obj.file_data_z[i];
            }

            return(
                <>
                    <div className="spaceFont"/>
                    <div className="header">
                        <div className="name_text">
                            {this.props.obj.name}
                        </div>
                        {this.props.info === true &&
                            <>
                                {this.state.edit === true &&
                                <>
                                    <div className="save" style={{marginLeft: "auto"}}/>
                                    <div className="delete" onClick={(e) => this.handleEdit(e)}/>
                                    <div className="activeInfo" onClick={(e) => this.handleInfo(e)}/>
                                </>
                                }
                                {this.state.edit === false &&
                                    <>
                                        {this.props.group === "admin" &&
                                                <>
                                                    <div className="edit" style={{marginLeft: "auto"}} onClick={(e) => this.handleEdit(e)}/>
                                                    <div className="activeInfo" onClick={(e) => this.handleInfo(e)}/>
                                                </>
                                        }
                                        {this.props.group === "user" &&
                                            <>
                                                <div className="activeInfo" style={{marginLeft: "auto"}} onClick={(e) => this.handleInfo(e)}/>
                                            </>
                                        }
                                    </>
                                }
                            </>
                        }
                        {this.props.info === false &&
                            <>
                                <div className="info" style={{marginLeft: "auto"}} onClick={(e) => this.handleInfo(e)}/>
                            </>
                        }
                        <div className="download" onClick={() => {window.location = this.props.obj.file_url}}/>
                        {this.props.group === "admin" &&
                            <div className="trash" onClick={() => {if(window.confirm('Вы действительно хотите удалить объект ' + this.props.obj.name + '?')){this.trashHandler(this.props.obj.id)}}}/>
                        }
                    </div>
                    {this.props.info === false &&
                    <div className="plot">
                        <Plot
                            data={this.traces}
                            layout=
                                {{
                                    paper_bgcolor: '#F7F7F9',
                                    height: 480,
                                    width: 670,
                                    font:
                                        {
                                            family: 'Roboto, serif',
                                            size: 14
                                        },
                                    margin:
                                        {
                                            b: 20,
                                            l: 20,
                                            r: 20,
                                            t: 20,
                                        }
                                }}
                            config=
                                {{
                                    displayModeBar: false
                                }}
                        />
                    </div>
                    }
                    {this.props.info === true &&
                        <div className="infoForm">
                            <div className="infoGroup">
                                <label style={{color: 'black'}}>Название</label>
                                <input disabled={!this.state.edit} className="infoInput" value={this.props.obj.name}/>
                            </div>
                            <div className="space20"/>
                            <div className="infoGroup">
                                <label style={{color: 'black'}}>Класс</label>
                                <select disabled={!this.state.edit} style={{height: '5vh'}} className="infoInput">
                                    {this.state.classes.map(({ id, title }) => <option>{title}</option>)}
                                </select>
                            </div>
                            <div className="space20"/>
                            <div className="infoGroup">
                                <label style={{color: 'black'}}>Подкласс</label>
                                <select disabled={!this.state.edit} style={{height: '5vh'}} className="infoInput">
                                    {this.state.subclasses.map(({ id, title }) => <option>{title}</option>)}
                                </select>
                            </div>
                            <div className="space20"/>
                            <div className="infoGroup">
                                <label style={{color: 'black'}}>Длина</label>
                                <input disabled={!this.state.edit} className="infoInput" value={this.props.obj.length}/>
                            </div>
                            <div className="space20"/>
                            <div className="infoGroup">
                                <label style={{color: 'black'}}>Ширина</label>
                                <input disabled={!this.state.edit} className="infoInput" value={this.props.obj.width}/>
                            </div>
                            <div className="space20"/>
                            <div className="infoGroup">
                                <label style={{color: 'black'}}>Высота</label>
                                <input disabled={!this.state.edit} className="infoInput" value={this.props.obj.height}/>
                            </div>
                            <div className="space20"/>
                            <div className="infoGroup">
                                <label style={{color: 'black'}}>Номер аудитории</label>
                                <input disabled={!this.state.edit} className="infoInput" value={this.props.obj.num}/>
                            </div>
                            <div className="space20"/>
                            <div className="infoGroup">
                                <label style={{color: 'black'}}>Дата добавления</label>
                                <input disabled className="infoInput" value={moment(this.props.obj.time_create).format('DD.MM.YYYY, HH:mm:ss')}/>
                            </div>
                            <div className="space20"/>
                            <div className="infoGroup">
                                <label style={{color: 'black'}}>Добавил</label>
                                <input disabled className="infoInput" value={(this.props.obj.created_by_last_name + ' ' + this.props.obj.created_by_first_name + ' (' + this.props.obj.created_by_username + ')')}/>
                            </div>
                        </div>
                    }
                </>
            )
        }
        else
        {
            this.x_array.splice(0, this.x_array.length)
            this.y_array.splice(0, this.y_array.length)
            this.z_array.splice(0, this.z_array.length)
            return(
                <div className="choose_parent">
                    <div className="choose_child">
                        <div className="object_image"/>
                        <div className="space20"/>
                        Выберите объект для отображения...
                    </div>
                </div>
            )
        }
    }
}
export default ViewBlock;