import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Style from './home.css';
import Slider from "react-slick";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import starRatingImg from '../../images/star-rating.png';
import axios from 'axios';
import ReactStars from 'react-stars'
import ReadMoreReact from 'read-more-react';
class Testimonials extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            testimonials: [{
				    "title": "",
                    "description": "",
                    "image": "",
                    "testimonialUser": "",
                    "testimonialCity": ""
                }]
        };
    }    	
	componentDidMount(){
		console.log("ComponentDIDMOUNT")
		axios.get('testimonial/listTestimonial').then(result =>{
			console.log("result",result);			
			this.setState({testimonials:result.data.result})
		})
		
	}	
    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
               
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        };

        return (
                <div className="testimonialContainer">
					<div className='container'>
                    <h3><span>Testimonials</span></h3>
                    <Slider {...settings}>
                        {this.state.testimonials.map(function (testimonial) {
						return (
								<div key={testimonial}>
						<div className="testimonial-div" key={testimonial}>
										<div className='starRating' align="center"><ReactStars  count={5} size={15} color2={'#ffd700'} edit={false} value={testimonial.review}  /></div>
										<p align="center"><strong>{testimonial.title}</strong></p>
										<h4><ReadMoreReact text={testimonial.description.replace(/<(?:.|\n)*?>/gm, '')} min={1}  ideal={100} max={200} /></h4>
										<h5 className="">{(testimonial.author)?testimonial.author.userName:''}</h5>
										<p className="city">{testimonial.testimonialCity}</p>
									</div>
								</div>

								)
                        })
                        }
                    </Slider>
                    {/*<Link to='/' className='more-items'>See More</Link> */}
                </div>
                </div>
                            );
            }
        }
        export default Testimonials;
