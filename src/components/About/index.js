import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
var Shell = React.createClass({
    getInitialState: function() {
      return ({editing:false});
    },
    edit: function(){
      this.setState({editing:true});
    },
    remove: function() {
      this.props.removeTodoValue(this.props.index);
    },
    save: function() {
      var val = this.refs.newText.value;
      this.props.editTodoValue(val,this.props.index);
      this.setState({editing:false});
    },
    renderNormal: function() {
      return (
          <div className="row">
            <div className="well col-xs-6">
              <p>{this.props.children}</p>
              <Button onClick={this.edit} bsStyle="warning">Edit</Button>
              <Button onClick={this.remove} bsStyle="danger" className="pull-right">Remove</Button>
              </div>
            </div>

      );
    },
    renderForm: function(){
      return (
          <div className="row">
            <div className="well col-xs-6">
              <textarea ref="newText" defaultValue={this.props.children}></textarea>
              <Button onClick={this.save} bsStyle="success">Done</Button>
            </div>
          </div>

      );
    },
    render: function(){
        if(this.state.editing){
          return this.renderForm();
        }else{
          return this.renderNormal();
        }
    }
});

var List = React.createClass({
  getInitialState: function(){
    return {
      imgSrc:null,
      todolist: [
      ]
    };
  },
  removeValue: function (i) {
    var arr = this.state.todolist;
    arr.splice(i,1);
    this.setState({todolist:arr});
  },
  updateValue: function (newText,i) {
    var arr = this.state.todolist;
    arr[i] = newText;
    this.setState({todolist:arr});
  },
  eachValue: function (text,i) {
      return (<Shell key={i} index={i} editTodoValue={this.updateValue} removeTodoValue={this.removeValue}>{text}</Shell>);
  },
  addValue: function(){
    var arr = this.state.todolist;
    arr.push(this.refs.addText.value);
    this.refs.addText.value = '';
    this.setState({todolist:arr});
  },
  onChange: function(){
    // Assuming only image
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

     reader.onloadend = function (e) {
        this.setState({
            imgSrc: [reader.result]
        })
      }.bind(this);

  },
  render:function () {
    return (
      <div className="container">
        <input className="form-control" ref="addText" placeholder="Add new name"></input>
        <Button onClick={this.addValue} bsStyle="primary">Add New</Button>
        {
          this.state.todolist.map(this.eachValue)
        }
        <div>
        <form>
          <input
            ref="file"
            type="file"
            name="user[image]"
            multiple="true"
            onChange={this.onChange}/>
         </form>
        </div>
        <img src={this.state.imgSrc} width="300" />
      </div>
    );
  }
});
export default class About extends React.Component {
    render() {
        return (
            <List />
        );
    }
}
