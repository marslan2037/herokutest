import React from 'react'
import * as axios from 'axios'
import FormValidator from './FormValidator'
import CircularProgress from '@material-ui/core/CircularProgress'
import BannerMessage from './BannerMessage'

class Contact extends React.Component {

  constructor (props) {
    super(props)
    this.validator = new FormValidator([
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'Email is required.'
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'That is not a valid email.'
      },
      {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide a name.'
      },
      {
        field: 'message',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide a name.'
      },
    ])
    this.state = {
      name: '',
      email: '',
      message: '',
      error: '',
      loading: false,
      validation: this.validator.valid(),
    }
    this.submitted = false
    this.BACKEND_URL = process.env.REACT_APP_BACKEND_URL
  }

  handleInputChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleFormSubmit = event => {
    event.preventDefault()
    const validation = this.validator.validate(this.state)
    this.setState({ validation })
    this.submitted = true

    if (validation.isValid) {
      this.setState({ loading: true })
      let bodyFormData = new FormData();
      bodyFormData.append('name', this.state.name);
      bodyFormData.append('email', this.state.email);
      bodyFormData.append('message', this.state.message);
      const body = {
        name: this.state.name,
        email: this.state.email,
        message: this.state.message
      }

      axios({
        method: 'post',
        url: this.BACKEND_URL + '/contact',
        data: body,
        headers: {
          'Access-Control-Allow-Origin': '*',
        }

      }).then(() => {
        this.setState({ loading: false })
        this.submitted = false;
        this.setState({ email: '' })
        this.setState({ name: '' })
        this.setState({ message: '' })
        this.setState({ error: 'Success' })
      }).catch(err => {
        this.setState({ loading: false })
        this.setState({
          error: err.message || 'unknown error'
        })
      })
    }
  }

  render () {
    let validation = this.submitted ?                         // if the form has been submitted at least once
      this.validator.validate(this.state) :   // then check validity every time we render
      this.state.validation                   // otherwise just use what's in state
    return (
      <main>
        <div className='container'>
          <div className='row mainsearch'>
            <div className='tagline'>
              <p>Contact</p>
              <form id={'contact'}>
                  <input
                    className={validation.name.isInvalid ? 'has-error textBox' : 'textBox'}
                    name={'name'}
                    placeholder={'Name....'}
                    type="text"
                    onChange={this.handleInputChange}
                  />
                  <input
                    placeholder={'E-Mail....'}
                    className={validation.email.isInvalid ? 'has-error textBox' : 'textBox'}
                    name={'email'}
                    type="text"
                    onChange={this.handleInputChange}
                  />
                <textarea
                  placeholder={'Message....'}
                  className={validation.message.isInvalid ? 'has-error textBox' : 'textBox'}
                  name={'message'}
                  onChange={this.handleInputChange}
                />
                <div style={{ display: 'flex' }}>
                  {
                    this.state.error ? <BannerMessage message={this.state.error}/> : null
                  }
                  {
                    this.state.loading ? <CircularProgress id='contact-progress'/>
                      : <button id='contact-submit' type='submit' className='btn btn-primary'
                                                       onClick={this.handleFormSubmit}>Submit</button>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Contact
