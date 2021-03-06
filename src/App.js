import React, {Component} from 'react';
import Popup from 'react-popup';
import Style from './App.css';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Header from './components/header';
import Footer from './components/footer';
// import LeftNav from './components/leftNav'
import MyTrades from './components/myTrades/MyTrades';
import MyTradesDetail from './components/myTrades/MyTradesDetail';
import Home from './components/home/home';
import Login from './components/login/login'
import Logout from './components/login/logout'
import Register from './components/register/register'
import Forget from './components/forgotPassword/forget'
import Reset from './components/resetPassword/reset'
import Subscription from './components/subscription/subscription'
import Dashboard from './components/dashboard/dashboard';
import SearchListing from './components/seacrh-listing/seacrh-listing';
import SearchDetail from './components/seacrh-listing/searchDetail';
import AddNewProduct from './components/addNewProduct/addnewproduct';
import EditProduct from './components/addNewProduct/editproduct';
import myTreasureChest from './components/myTreasureChest/myTreasureChest';
import TradeMatch from './components/myTreasureChest/trade-match';
import donatedProducts from './components/donation/donatedProducts';
import DonateProduct from './components/donation/donateProduct';
import Wishlist from './components/wishList/wishlist';
import EmptyWishlist from './components/wishList/clearWishlist';
import SettingProfile from './components/setting-profile';
import SettingSubscription from './components/setting-subscription';
import SettingEmailNotification from './components/setting-email-notification';
import PublicProfile from './components/myTreasureChest/public_profile';
import SettingPassword from './components/setting-change-password';
import PublicReviews from './components/myTreasureChest/public_reviews';
import Help from './components/pages/contactUs';
import contactUs from './components/pages/contactUs';
import privacy from './components/pages/privacy';
import term from './components/pages/terms';
import aboutUs from './components/pages/about';
import Style1 from './media.css';
import axios from 'axios';
import NotFound from './NotFound';
const constant = require("./config/constant");
//import http from 'http';
const history = createHistory();
const port=4001;
const basePath ='';// '/react-test';
//axios.defaults.baseURL = window.location.protocol + '//' + window.location.hostname + ':' + port + basePath;
axios.defaults.baseURL = constant.BASE_SERVER_URL;
//axios.defaults.baseURL = 'http://demo.newmediaguru.co:5001'+ basePath;
axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
//const SERVER_URL='http://localhost:5001';

class App extends Component {
	constructor(props){
    super(props);
		//console.log('Version', React.version);
	//console.log('TOken', localStorage.getItem('jwtToken'));
    // if(localStorage.getItem('jwtToken') === null){
    //    window.location.href="#/login";
    // }
  }
  componentDidMount() {
	//the function call just after render the html
  }
    render() {
        return(
               <Router>
                    <div className="layout">
                        <Header history = {history}/>
                        <div id="content">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/logout' component={Logout} />
                            <Route exact path='/register' component={Register} />
                            <Route exact path='/forget' component={Forget} />
                            <Route exact path='/reset/:id?' component={Reset} />
                            <Route exact path='/verifyUserEmail/:id?' component={Login} />
                            <Route exact path='/subscription' component={Subscription} />
                            <Route exact path='/dashboard' component={Dashboard} />
                            <Route path='/search-listing/:id?/:latitude?/:longitude?' component={SearchListing} />
                            <Route exact path='/search-result/:id?' component={SearchDetail} />
                            <Route exact path='/search-result' component={SearchDetail} />
                            <Route exact path='/add-new-product' component={AddNewProduct} />
                            <Route exact path='/edit-product/:id?' component={EditProduct} />
                            <Route exact path='/my-trades' component={MyTrades} />
                            <Route exact path='/my-trade-detail/:id?' component={MyTradesDetail} />
                            <Route exact path='/my-trade-detail' component={MyTradesDetail} />
                            <Route exact path="/my-treasure-chest" component={myTreasureChest} />
                            <Route exact path="/trade-match" component={TradeMatch} />
                            <Route exact path='/donated-products' component={donatedProducts} />
                            <Route exact path='/donate-product' component={DonateProduct} />
                            <Route exact path='/wishlist' component={Wishlist} />
                            <Route exact path='/empty-wishlist' component={EmptyWishlist} />
                            <Route exact path="/setting-profile" component={SettingProfile} />
                            <Route exact path="/setting-subscription" component={SettingSubscription} />
                            <Route exact path="/setting-email-notification" component={SettingEmailNotification} />
                            <Route exact path="/setting-change-password" component={SettingPassword} />
                            <Route exact path="/public-profile/:id" component={PublicProfile} />
                           {/*<Route exact path="/public-profile" component={PublicProfile} /> 
                            <Route exact path="/public-reviews" component={PublicReviews} />*/}
                            <Route exact path="/help" component={Help} />
                            <Route exact path='/about-us' component={aboutUs} />
                            <Route exact path='/contact-us' component={contactUs} />
                            <Route exact path='/privacy-policy' component={privacy} />
                            <Route exact path='/term-and-condition' component={term} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                        </div>
                        <Footer />
                    </div>
                </Router>
            )

    }
}
export default App;
