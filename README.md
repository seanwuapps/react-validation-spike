This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

`validator.js` is a class that manages form states of a react component.

structure of a form component state:
```
state = {
  data : {    // form data
    name : ''
  },
  errors: {}  // form errors
}
```

where `errors` is a object that look like this:

```
{
  ...
  errors : {
    email : {
      required : 'This field is required.',
      isEmail : 'This field is not a valid email',
      // error_type : error_message
    }
    ... // another field
  }
}
```
and you specify validation rules in the react component like this: 

```jsx
import { Validator } from './validator'
...
validator = new Validator(this)

validate = () => {
  this.validator.require('email')
  this.validator.isEmail('email')
  return this.validator.isValid()
}
```

and in the `render` function you can use `this.validator.getError(FIELD)` to get the error message (it'll return the first error message)