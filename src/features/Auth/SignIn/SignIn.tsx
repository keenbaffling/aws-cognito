import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import * as authSlice from '../authSlice';
import styles from '../Auth.module.scss';

const formValues = {
  email: 'klintonballecer+demo1@gmail.com',
  password: 'Demo123',
};

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required.'),
});

const SignIn: React.FC = () => {
  const error = useSelector(authSlice.selectError);
  const status = useSelector(authSlice.selectStatus);
  const user = useSelector(authSlice.selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (
    payload: typeof formValues,
    { setSubmitting }: any
  ) => {
    dispatch(authSlice.signIn(payload));
    setSubmitting(false);
  };

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [history, user]);

  return (
    <div className={styles.container}>
      <h1 className={styles.form__title}>Sign In</h1>
      <Formik
        initialValues={formValues}
        validationSchema={SignInSchema}
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
              <button
                className={styles.form__button}
                type="submit"
                disabled={isSubmitting || status === authSlice.STATUS.PENDING}>
                Sign In
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
                onClick={() => history.push('/auth/signup')}>
                Sign Up
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
