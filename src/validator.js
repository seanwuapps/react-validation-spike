export class Validator {
    component = null
  
    constructor(component) {
      if (!component) {
        console.warn('Remember to do setComponent!')
      }
      this.setComponent(component)
    }
  
    setComponent = (component) => {
      this.component = component
    }
  
    getErrors = () => {
      return this.component.state.errors
    }
  
    // returns the first error for a field
    getError = (field) => {
      if(this.component.state.errors[field]){
        for( let type in this.component.state.errors[field]){
           return this.component.state.errors[field][type]
        }
      }
    }
  
    // must be called in the validation functions
    setError = (field, type, msg) => {
      let errors = this.component.state.errors
      errors[field] = {}
      errors[field][type] = msg
      this.component.setState({errors : errors})
    }
  
    removeError = (field, type) => {
      let errors = this.component.state.errors
      if(errors[field] && errors[field][type]){
        delete errors[field][type]
        if(Object.keys(errors[field]).length === 0) {
          // no error on this field
          delete errors[field]
        }        
        this.component.setState({errors: errors})
      }
    }
  
    isValid = () => {
      console.log(this.component.state.errors)
      return Object.keys(this.component.state.errors).length === 0
    }
  
    /**
     * validation functions
     * must call setError() when validation fails, 
     * must call removeError() when valid
     */
    require = (field, msg) => {
      let value = this.component.state.data[field]
      if (!value.toString().trim().length) {
        this.setError(field, 'require', msg ? msg : 'This is required')
      }else{
        this.removeError(field, 'require')      
      }
    }
  
    isEmail = (field, msg) => {
      let value = this.component.state.data[field]
      let re = /[\w\d.+]+@[\w\d]+(?:\.[a-z]{2,4}){1,2}/ig
      if( !re.test(value) ){
        this.setError(field, 'isEmail', msg ? msg : 'This is not a valid email.')
      }else{
        this.removeError(field, 'isEmail')      
      }
    }
  
  }