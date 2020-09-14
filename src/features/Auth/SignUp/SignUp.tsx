import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import * as Yup from 'yup';
import * as authSlice from '../authSlice';
import styles from '../Auth.module.scss';

const formValues = {
  email: '',
  password: '',
  passwordConfirm: '',
};

const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .matches(
      passwordRegExp,
      'Password should have at least 8 alphanumeric characters, 1 Uppercase and 1 lowercase'
    )
    .required('Password is required.'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords did not match')
    .required('Please confirm password'),
});

const SignUp: React.FC = () => {
  const error = useSelector(authSlice.selectError);
  const status = useSelector(authSlice.selectStatus);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (
    { passwordConfirm, ...payload }: typeof formValues,
    { setSubmitting }: any
  ) => {
    dispatch(authSlice.signUp(payload));
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.form__title}>Sign Up</h1>
      <Formik
        initialValues={formValues}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            {error && <div className={styles.form__errors}>{error}</div>}
            <div className={styles.form__field}>
              <label className={styles.form__label} htmlFor="email">
                Email
              </label>
              <Field
                className={styles.form__input}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
              <ErrorMessage
                className={styles['form__field-invalid']}
                name="email"
                component="div"
              />
            </div>
            <div className={styles.form__field}>
              <label className={styles.form__label} htmlFor="password">
                Password
              </label>
              <Field
                className={styles.form__input}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
              <ErrorMessage
                className={styles['form__field-invalid']}
                name="password"
                component="div"
              />
            </div>
            <div className={styles.form__field}>
              <label className={styles.form__label} htmlFor="passwordConfirm">
                Confirm Password
              </label>
              <Field
                className={styles.form__input}
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                placeholder="Confirm Password"
              />
              <ErrorMessage
                className={styles['form__field-invalid']}
                name="passwordConfirm"
                component="div"
              />
            </div>
            <div className={styles.form__field}>
              <button
                className={styles.form__button}
                type="submit"
                disabled={isSubmitting || status === authSlice.STATUS.PENDING}>
                Sign Up
              </button>
            </div>
            <div
              className={clsx(
                styles.form__field,
                styles['form__field--text-center']
              )}>
              <button
                className={clsx(
                  styles.form__button,
                  styles['form__button--link']
                )}
                type="button"
                onClick={() => history.push('/auth/signin')}>
                Sign In
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
