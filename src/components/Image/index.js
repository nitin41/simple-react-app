import React, { Component } from 'react';
import {Cropper} from 'react-image-cropper';
import axios from 'axios';
var Img = React.createClass({
  getInitialState: function () {
    return({imgSrc:"",cropImg:null});
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
  handleImageLoaded(state){
    this.setState({
        [state + 'Loaded']: true
    });
  },
  handleClick(state){
      let node = this.refs[state];
      this.setState({
          cropImg: node.crop()
      }, () => {
        axios.post('//localhost:9000/uploadImage', {
          file:this.state.cropImg
        })
        .then(function (response) {
          alert('File saved as ' + response.data.fileName);
        })
        .catch(function (error) {
          console.log(error);
        });
      });


  },
  render:function () {
    return (
      <div className="container">
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
        {this.state.imgSrc ?
          <div className="col-xs-4">
            <div className="well">
               <h3>Default image crop</h3>
               <Cropper src={this.state.imgSrc} ref="image" onImgLoad={() => this.handleImageLoaded('image')}/>
               <br/>
               {this.state.imageLoaded ? <button onClick={() => this.handleClick('image')}>crop</button> : null}
               <h4>after crop</h4>
               {this.state.cropImg ? <img src={this.state.cropImg} alt=""/> : null}
            </div>
          </div>
        : null}


      </div>
    );
  }
});
export default class Image extends React.Component {
    render() {
        return (
            <Img />
        );
    }
}
