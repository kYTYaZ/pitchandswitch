import React, { Component } from 'react';
import { Alert, Form, Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ForgetPassword extends Component {
  constructor() {
    super();
    this.email = React.createRef();    
    this.state = {
      email: '',     
      message: '',
      code:9999
    };
  }


  onSubmit = (e) => {
    e.preventDefault();
    //console.log('REFS', this.email.value);
    const email = this.email.value;

    axios.post('/user/forgotPassword', { email: email, userType: '1'})
      .then((result) => {
        console.log('Forget password result', result)
        if(result.data.code ==200){
          localStorage.setItem('jwtToken', result.data.result.accessToken);         
          this.setState({
            message: result.data.message,
            code :result.data.code
          });        
          //this.props.history.push('/checkMail');
        }else{
          this.setState({
            message: result.data.message,
            code :result.data.code
          });
        }
      })
      .catch((error) => {
        console.log('error', error);
        if (!error.status) {
			 this.setState({ message: 'Login failed. Username or Email not match' });
			// network error
		}

      });
  }

 

  render() {
    const { email, password, message,code } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h2>Forgot Password</h2>
                    <p className="text-muted">Enter the registered Email id</p>
                    <Form onSubmit={this.onSubmit}>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" innerRef={input => (this.email = input)} placeholder="Username/Email" />
                    </InputGroup>
                   
                    {message !== '' && code === 200 &&
                      <Alert color="success">
                        { message }
                      </Alert>
                    } 
                    {message !== '' && code !== 200 &&
                      <Alert color="danger">
                        { message }
                      </Alert>
                    } 
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4">Submit</Button>
                      </Col>
                       <Col xs="6" className="text-right">
                        <Link to={'/login'}><Button color="link" className="px-0">Login</Button></Link>
                      </Col> 
                    </Row>
                    </Form>
                  </CardBody>
                </Card>                
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ForgetPassword;
