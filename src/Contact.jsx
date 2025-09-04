import React from 'react';
import { useForm } from 'react-hook-form';
import './Contact.css';

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
  });


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