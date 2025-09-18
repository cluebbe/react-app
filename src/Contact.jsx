import React from 'react';
import { useForm } from 'react-hook-form';
import './Contact.css';

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
  });

// SAME AS:
//   const ContactForm = () => {
//   // Call useForm and store the result in a variable
//   const form = useForm({ mode: 'onChange' });

//   // Extract register and handleSubmit from the form object
//   const register = form.register;
//   const handleSubmit = form.handleSubmit;

//   // Extract errors and isValid from the formState object inside form
//   const errors = form.formState.errors;
//   const isValid = form.formState.isValid;


  const onSubmit = (data) => {
    console.log('Form valid:', isValid);
    console.log('Message errors:', errors.message);
    alert( 'Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form-group">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            {...register('name', { required: 'Name is required.' })}
          />
          {errors.name && <span className="validation-error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid format',
              },
            })}
            /* What’s happening here?
            id="email": Sets the HTML id attribute for the input, useful for labels and accessibility.

            {...register('email', {...})}:

            The register function from React Hook Form connects this input to the form state and validation.
            The first argument 'email' is the field name.
            The second argument is an object specifying validation rules:
            required: 'Email is required.' means the field must be filled in, or this message will show.
            pattern: { value: ..., message: 'Invalid format' } means the input must match the provided regular expression (a basic email pattern), or the message will show.
            The spread operator (...):

            register returns an object with properties like onChange, onBlur, ref, and name.
            {...register(...)} spreads these as props onto the <input>, so React Hook Form can track and validate the field automatically. 
            
            This is equivalent to manually setting each prop like this:
            <textarea
              id="message"
              name={register('email').name}
              onChange={register('email').onChange}
              onBlur={register('email').onBlur}
              ref={register('email').ref}
            />
            */
          />

          {errors.email && <span className="validation-error">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            {...register('message', {
              required: 'Message is required.',
              minLength: { value: 10, message: 'At least 10 characters' },
              maxLength: { value: 20, message: 'At most 20 characters' },
            })}
          />
          {errors.message && <span className="validation-error">{errors.message.message}</span>}
        </div>

        <button type="submit" disabled={!isValid}>Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;