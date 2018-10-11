import React, { Component } from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import rcvProduct from '../../images/rcv-product-img.jpg';
import offerProduct1 from '../../images/offer-product-img1.jpg';
import offerProduct3 from '../../images/offer-product-img3.jpg';
import userPic from '../../images/user-pic.png';
import rejected from '../../images/rejected.png';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

const constant = require('../../config/constant')
const contentStyle = {
    maxWidth: "900px",
    width: "90%"
};


class viewPitchPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {				
			offerTrade:this.props.offerTrade,
			offerTradeProducts:[]
		}				
	 }   
	  
	  conditionsChange = (objectSelectedPitch) => {
          this.setState({categoriesValues: objectSelectedPitch.target.value});
          //console.log('categoriesValues',this.state.categoriesValues);
           axios.get('/trade/getProductByCategory/'+this.state.categoriesValues).then(result => {
			 if(result.data.code === 200){
			   this.setState({offerTradeProducts:result.data.result})	
		    }
		})
      }
	
	componentWillMount(){
		this.setState({offerTradeId:this.props.offerTrade._id})
		   axios.get('/trade/getAllProduct/').then(result => {
			  if(result.data.code === 200){
			    this.setState({getAllProduct:result.data.result})				
			     //console.log('getAllProduct',this.state.getAllProduct)
		    }
		})
	}
	
	componentDidMount(){
		axios.get('/trade/offerTradeProduct/'+this.props.offerTrade._id).then(result => {
			if(result.data.code === 200){
			  this.setState({offerTradeProducts:result.data.result})
		   }
		})		
		
				
		axios.get('/category/categoriesActive/').then(result => {
			if(result.data.code === 200){
			  this.setState({categoryActive:result.data.result})				
			  //console.log('categoryActive',this.state.categoryActive);
		   }
		})		
	}

   render() {
	 let optionTemplate;
	    if(this.state.categoryActive){
			let conditionsList = this.state.categoryActive;
			console.log('conditionsList',conditionsList)
		    optionTemplate = conditionsList.map(v => (<option key={v._id} value={v._id}>{v.title}</option>));
       }
    let img = this.props.offerTrade.userId?this.props.offerTrade.userId.profilePic:"";
    let productImg = 
    this.props.offerTrade.productImages?this.props.offerTrade.productImages[0]:"";
   return (
   <Popup trigger={<a href='#' className= 'ditch'>Pitch Now</a>}
    modal
    contentStyle = {contentStyle}  lockScroll >
    { close => (
         <div className="modal">
        <a className="close" onClick={close}>
            &times;
        </a>
        <div className="header">Choose products to <span className="yellow">Pitch</span> on 
        <div className="select-box top-right">
             <select id="select" innerRef={input => (this.condition = input)} className="form-control" onChange={this.conditionsChange}>
				{optionTemplate}
			</select>
		</div>
		<div className="cl"></div>
		</div>
			<div className="content">
			<div className="received-product">
				<div className="received-product-box">
					<div className="received-product-image-box">
					<img src={constant.BASE_IMAGE_URL+'Products/'+productImg} alt="recieved-product image" />
					</div>
					<div className="received-product-content-box">
						<span>Product ID: <strong>{this.props.offerTrade._id}</strong></span>
						<h4>{this.props.offerTrade.productName}</h4>
						<a className="catLink" href="/">{this.props.offerTrade.description}</a>
							<div className="ratingRow">
							<div className="pic"><img src={constant.BASE_IMAGE_URL+'ProfilePic/'+img} alt="" /></div>
							<p>{this.props.offerTrade.description}</p>
							<div className="rated">4</div>
							<div className="cl"></div>
						</div> 
					</div>
				</div>
				<div className="cl"></div>
				  <div className="switch-product-section choose-product-div border-top">
						<Scrollbars className="Scrollsdiv" style={{height: 585 }}>
						  <If condition={this.state.getAllProduct.length > 0}>
							<Then>
							{ this.state.getAllProduct.map((productsListing, index) => {
								var productImages = (productsListing.productImages)?(productsListing.productImages[0]):'';
								return(
								<div className="switch-product-box">
								<div className="switch-product-image-box">
								 <img src={constant.BASE_IMAGE_URL+'Products/'+productImages} alt="recieved-product image" />
								 <div className="switch-option-mask"> <div className="check-box"><input id="pitch1" type="checkbox" /><label htmlFor="pitch1">&nbsp;</label></div> </div>
								</div>
								<div className="switch-product-content-box">
								  <h4>{productsListing.productName?productsListing.productName:""}</h4>
								   <a className="catLink" href="/">{productsListing.productCategory?productsListing.productCategory.title:""}</a>
								</div>
								</div>
								  )
								})
							  }
							</Then>							
							<Else>
							   <p>No Data Available</p>
							</Else>
							</If>
						   </Scrollbars>
						  <div className="btm-btns">
						<a className="more-items" href="#">Pitch Now</a>
					   <a className="ditch cancel-ditch"> Cancel Pitch </a>
					 </div>
				</div>
			</div>
		</div>
      </div>
    )}
</Popup>
)}
}

export default viewPitchPopup;
//export default Warper(CustomModal);