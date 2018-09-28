import React, { Component } from 'react';
import DitchPopup from './shippingTypePopup'
import axios from 'axios';
class Ditch extends React.Component {
    constructor() {
        super();		
        this.state = {
           currentUser:'',		
			ditchedPitches: [{
				id: 1,
				pitchType: false,
				user: "Oleksandr Pid",
				status: "received",
				action: "Ditched QUICK1 BINGE60",
				messageType: false,
				isMessage: true,
				message: [{username: "213496"},
					{message: "Pitch and Switch connects thoughtful consumers around the world with creative entrepreneurs."}
				]

			}]
        }
    }
    
    componentDidMount(){
		axios.get('/trade/ditchTrades').then(result => {
		  if(result.data.code === 200){
			  console.log("result.data.result",result.data.result)
			this.setState({
				ditchedPitches:result.data.result,
				currentUser: result.data.currentUser				  
			});
		  }
		})
		.catch((error) => {		
		  if(error.code === 401) {
			this.props.history.push("/login");
		  }
		});
	}
    render() {
        return (<div>
					{this.state.ditchedPitches.map((pitch, index) => {
							var send = (pitch.pitchUserId && pitch.pitchUserId._id == this.state.currentUser)?1:0;		let ditchClasses = ['ditch'];                                                       
                            var ditch = 'Ditched';
                            if(send===1 && pitch.ditchCount > 0 && pitch.ditchCount < 3){
								var ditch = 'Pitch Again';
							}else if(send===1 && pitch.ditchCount > 0 && pitch.ditchCount < 3){
								var ditch = 'Last Ditch';
							}
							
                            return (<div className="pitch-row" key={index}>
                                <div className="pitch-div">
                                    { (pitch.SwitchUserId &&  pitch.SwitchUserId._id === this.state.currentUser) ? <div className="newPitch">New Pitch</div> : null }
                                    <div className="colum user width1"><span>{(send===1)?(pitch.SwitchUserId)?pitch.SwitchUserId.userName:'N/A':(pitch.pitchUserId)?pitch.pitchUserId.userName:'N/A'}</span></div>
                                    <div className="colum status"><span className={(send===1)?'sent':'received'}>{(send===1)?'Send':'Received'}</span></div>
                                    <div className="colum">  <DitchPopup /> </div>
                                    <div className="colum message"> </div> 
                                    <div className="colum action">{pitch.status === 4 ? <a href="#" className={'ditch blocked '}>{ditch}</a> : <a href="#" className={'ditch '}>{ditch}</a>}</div>
                                </div>
                        
                            </div>)
					}
            )}
        
        
        </div>
                    );
    }
}

export default Ditch;