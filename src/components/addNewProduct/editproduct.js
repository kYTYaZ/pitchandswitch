import React, { Component } from 'react';
import Style from './addnewproduct.css';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import { SketchPicker } from 'react-color'
import PicturesWall from '../common/picturesWall';
import CategorySelectBox from '../../components/CategorySelectBox/CategorySelectBox';
//import BrandSelectBox from '../../components/BrandSelectBox/BrandSelectBox';
//import SizeSelectBox from '../../components/SizeSelectBox/SizeSelectBox';
import axios from 'axios';
var FD = require('form-data');
var fs = require('fs');


//~ class ColorPicker extends Component {
   //~ render() {
    //~ return <SketchPicker 
		//~ color={ this.state.background } 
		//~ onChangeComplete={ this.handleChangeComplete }
		//~ />
  //~ }
//~ }
class Form extends Component {
  state = {
    isValidated: false
  };
 
  validate = () => {
    const formEl = this.formEl;
    const formLength = formEl.length;
   if (formEl.checkValidity() === false) {
      for (let i = 0; i < formLength; i++) {
        const elem = formEl[i];
        const errorLabel = elem.parentNode.querySelector(".invalid-feedback");
        if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
          if (!elem.validity.valid) {
            errorLabel.textContent = elem.validationMessage;
          } else {
            errorLabel.textContent = "";
          }
        }
      }
      return false;
    } else {
      for (let i = 0; i < formLength; i++) {
        const elem = formEl[i];
        const errorLabel = elem.parentNode.querySelector(".invalid-feedback");
        if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
          errorLabel.textContent = "";
        }
      }
      return true;
    }
  };
  submitHandler = event => {
    event.preventDefault();
    if (this.validate()) {
      this.props.submit();
    }
    this.setState({ isValidated: true });
  };
  render() {
    const props = [...this.props];
    let classNames = [];
    if (props.className) {
      classNames = [...props.className];
      delete props.className;
    }
    if (this.state.isValidated) {
      classNames.push("was-validated");
    }
    return (
      <form
        {...props}
        className={classNames}
        noValidate
        ref={form => (this.formEl = form)}
        onSubmit={this.submitHandler}
      >
        {this.props.children}
      </form>
    );
  }
}
class Register extends React.Component {
	state = {
		productId: this.props.match.params.id,
		selectedFiles: '',
		editProductForm: {
			productName:'',
			description:'',
			productCategory:'',
			size:'',
			color:'',
			brand:'',
			productAge:'',
			condition:'',
			productImages:'',
			productStatus:'0'
		},
	   Categories: [],
	   brands: [],
	   sizes: [],
	   conditions: [],
	   categoryValue: '',
	   background: '#fff',
	   validation:{
		productName:{
		  rules: {
			notEmpty: {
			  message: 'Product name field can\'t be left blank',
			  valid: false
			}
		  },
		  valid: null,
		  message: ''
		},
		 showFormSuccess: false
	  }
	};
	constructor(props){
		super(props);
		this.categoryhandleContentChange = this.categoryhandleContentChange.bind(this)
	}


	categoryhandleContentChange(value) {
	this.setState({categoryValue:value })
	}
	
	cancelHandler(){
	this.props.history.push("/products");
	}
	
	// set the selected file in to state
	handlePictureChange = (event) => {
	  let oldFiles = [];
	  event.map((file) => {
		console.log('FIle', file);
		if (file.response && file.response.code === 200) {
		  // Component will show file.url as link
		  oldFiles.push({
			filename: file.response.result[0].filename,
			size: file.response.result[0].size,
			path: file.response.result[0].path
		  });
		}
	  });
	  this.setState({selectedFiles: JSON.stringify(oldFiles)});
	}
	handleCategory = (category) => {
		const productForm = {
		  ...this.state.editProductForm
		};
		productForm['productCategory'] = category;    
		this.setState({ editProductForm: productForm });
	}
	// Set The cureent color on change color
	handleChangeComplete = (color) => {
		const productForm = {
		  ...this.state.editProductForm
		};
		productForm['color'] = color.hex;    
		this.setState({ addProductForm: productForm });
	};		
	
	componentDidMount() {			
		axios.get('/product/viewProduct/' + this.state.productId).then(result => {
		  if(result.data.code === 200) {
			let productData = result.data.result;
			productData.productCategory = productData.productCategory._id;
			productData.brand = productData.brand._id;
			productData.size = productData.size._id;
			this.setState({editProductForm: productData});
			//console.log('Product Data',result.data.result, productData);
			
			//~ this.setState({productImages: result.data.result.productImages});       
		   }      
		 });			
		//GET ALL Brand
		axios.get('/brand/listingbrand').then(result => {			
			this.setState({brands:result.data.result})
		})	
		//GET ALL Condition
		axios.get('/donation/getConstant').then(result => {			
			this.setState({conditions:result.data.result})
		})	
		//GET ALL Size
		axios.get('/size/listingsize').then(result => {			
			this.setState({sizes:result.data.result})
		})
	}		

	conditionsChange = (value) => {
	   this.setState({conditionValue: value.target.value});
	}
	
	inputChangedHandler = (event, inputIdentifier) => {
		const productForm = {
		  ...this.state.editProductForm
		};
		productForm[inputIdentifier] = event.target.value;    
		this.setState({ editProductForm: productForm });
	};
  
	submit = () => {	  
		
		
		
		const data =new FD()		
		const formData = this.state.editProductForm;
		for (let [key, value] of Object.entries(formData)) {
			if(key != '__v'){
				  if(key == 'productImages'){
					  if(this.state.selectedFiles){
						data.append('files', this.state.selectedFiles);
					  } 
				  }else if(key == 'userId'){
					  data.append('userId', formData.userId._id);	
				  }else{
					  data.append(key, value);
				  }
			  }
		}
		
		//console.log('DATA', formData);
        axios.put('/product/updateProduct', data).then(result => {
          console.log('USER DATA', data)
         if(result.data.code ==200){			    
			  this.setState({
				message: result.data.message,
				code :result.data.code, 
				showFormSuccess: true,
				showFormError: false
			  });
			  this.props.history.push("/my-treasure-chest");
			}else{
			  this.setState({
				message: result.data.messaage,
				code :result.data.code,
				showFormError: true,
				showFormSuccess: false,
			  });
			}
		  })
		  .catch((error) => {
			console.log('error', error);
			if (!error.status) {
				 this.setState({ showFormError: true,showFormSuccess: false,message: 'ERROR in Adding Product, Please try again!!!' });
				
			}
		  });   
		setTimeout(() => {this.setState({showFormSuccess: false,showFormError: false});}, 12000);
	  
    this.setState({showFormSuccess: true});
    setTimeout(() => {this.setState({showFormSuccess: false});}, 5000)
  }
  _renderSuccessMessage() {
    return (
      <div className={"alert alert-success mt-4"} role="alert">
        Form was successfully validated and is ready to be submitted!
      </div>
    );
  }
  render() {	
	let editForm = <div className="example"><Spin /></div>;
	if(this.state.editProductForm._id != undefined){
		editForm = <div className="add-product-container">
        <div  className="container">
        <div className="breadcrumb">
        <ul>
        <li><a href="/">Home</a></li><li><a href={'/my-treasure-chest'}>My Treasure Chest</a></li><li>Edit Product</li>
        </ul>
        </div>
              <div className="cl"></div>
       <div className="add-product">
           {this.state.showFormSuccess ? this._renderSuccessMessage() : null}
		<div className="form-row">
			  <h3>Edit Product</h3>
		</div>
	  
        <Form submit={this.submit}>
                 
		<div className="form-row">
			<div className="invalid-feedback validation"> </div>   
			<span className="astrik">*</span>
			<label className="label" htmlFor={"name"}>Product name</label>
			<input id={"productName"} value={this.state.editProductForm.productName} className={"form-control textBox"} required={true} name={"productName"} type={"productName"} placeholder="Enter your name"  onChange={(e) => this.inputChangedHandler(e, 'productName')} />
		</div>
		
		<div className="form-row">
			<div className="invalid-feedback validation"> </div>
			<span className="astrik">*</span>
			<label className="label" htmlFor={"description"} >Description</label>
			<textarea
			id={"description"}
			className={"form-control textBox"}
			required={true}
			name={"description"}
			type={"description"}
			value={this.state.editProductForm.description}
			onChange={(e) => this.inputChangedHandler(e, 'description')}
			placeholder=""
			></textarea>
		</div>
		
		<div className="form-row">
			<label className="label">Add product a photo</label>
			<PicturesWall onHandlePicture={this.handlePictureChange}/>
		</div>
		
		<div className="form-row">
			<label className="label">Color</label>
			<SketchPicker 
				color={ this.state.background } 
				onChangeComplete={ this.handleChangeComplete }
			/>
			{/*<ColorPicker /> */}
		</div>
               
		<div className="form-row">
			<div className="invalid-feedback validation"> </div>   
			<span className="astrik">*</span>
			<label className="label" htmlFor={"category"}>Category<br/></label>
			<CategorySelectBox onSelectCategory={this.handleCategory} value={this.state.editProductForm.productCategory} />
		</div>                 
		<div className="form-row">
			<div className="colum">
				<div className="invalid-feedback validation"> </div>             
				<span className="astrik">*</span>
				<label className="label" htmlFor={"size"}>Size</label>
				{/*<input id={"size"} className={"form-control textBox"} required={true} name={"size"} type={"text"} placeholder="" defaultValue="Meduim" />*/}
				{/*  <SizeSelectBox onSelectSize={this.handleSize}/> */}
				<div className="select-box">
						<select required={true} name={"size"} id={"size"}  onChange={(e) => this.inputChangedHandler(e, 'size')}>
						<option value="">Select Size</option>
						{ 
						this.state.sizes.map(size =>{
							return(<option key={size._id} selected={(this.state.editProductForm.size == size._id)?"selected":""} value={size._id}>{size.size}</option>)
						})
						}
						</select>
				</div>
			</div>

			<div className="colum right">
				<div className="invalid-feedback validation"> </div>             
				<span className="astrik">*</span>
				<label className="label" htmlFor={"brand"}>Brand</label>
				<div className="select-box">
					<select required={true} name={"brand"}  id={"brand"} onChange={(e) => this.inputChangedHandler(e, 'brand')}>
						<option value="">Select Brand</option>
						{
						this.state.brands.map(brand =>{
						return (<option key={brand._id} value={brand._id} selected={(this.state.editProductForm.brand == brand._id)?"selected":""}>{brand.brandName}</option>)
						})
						}
					</select>
				</div>
				{/*<input id={"brand"} className={"form-control textBox"} required={true} name={"brand"} type={"text"} placeholder="" defaultValue="barbie" /> */}
				{/*	<BrandSelectBox onSelectBrand={this.handleBrand}/> */}
			</div>

			<div className="cl"></div>

		</div>
		<div className="form-row">
			<div className="colum">
				<div className="invalid-feedback validation"> </div>   
				<span className="astrik">*</span>
				<label className="label" htmlFor={"age"}>Age</label>
				<input id={"productAge"} value={this.state.editProductForm.productAge} className={"form-control textBox"} onChange={(e) => this.inputChangedHandler(e, 'productAge')} required={true} name={"productAge"} type={"text"} placeholder="Age" defaultValue="" />
			</div>
			<div className="colum right">
				<div className="invalid-feedback validation"> </div>          
				<span className="astrik">*</span>
				<label className="label" htmlFor={"condition"}>Condition</label>
				<div className="select-box">
					<select required={true} name={"condition"} id={"condition"} onChange={(e) => this.inputChangedHandler(e, 'condition')}>
					<option value="">Select</option>
					{this.state.conditions.map(condition => {
						return (<option  key={condition.id} value={condition.id} selected={(this.state.editProductForm.condition === condition.id)?"selected":""}>{condition.name}</option>)
					})
					}
					</select>
				</div>
			</div>
			<div className="cl"></div>
		</div>
		<div className="form-row">
			<div className="colum">
				<div className="invalid-feedback validation"> </div>   
				<span className="astrik">*</span>
				<label className="label" htmlFor={"status"}>Status</label>
				<div className="select-box">
					<select required={true} name={"productStatus"} id={"productStatus"} onChange={(e) => this.inputChangedHandler(e, 'productStatus')}>                 
					<option value="1" selected={(this.state.editProductForm.productStatus =='1')?"selected":""}>Active</option>
					<option value="0" selected={(this.state.editProductForm.productStatus =='0')?"selected":""}>In-Active</option>
					</select>
				</div>
			</div>
			<div className="colum right">&nbsp;</div>
			<div className="cl"></div>
		</div>
		<div className="form-row no-padding">
			<button
				type={"submit"}
				className={"submitBtn"}
				>
				Save
			</button>
		</div>
	</Form>
</div>
<div className="cl"> </div>
</div>
</div>;
	}
	  
    return editForm;
  }
}
 
export default Register;
