import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { fetchSignUp } from 'components/store/authSlice';

import { Formik, Form } from 'formik';
import FormControl from 'components/pages/forms/FormControl';
import { signUpSchema } from 'components/pages/forms/schema';

import Button from 'components/pages/Button';
import ModalWindow from 'components/pages/ModalWindow';


function RegistrationForm() {
	let navigate = useNavigate();

	let dispatch = useDispatch();
	let {fetchStatus, fetchError} = useSelector(state => state.auth);
	
	let [modalWindowIsOpen, setModalWindowIsOpen] = useState(false);

	let initialValues = {
		email: '',
		password: '',
		firstName: '',
		lastName: ''
	};

	let onSubmit = (values, {resetForm, setStatus}) => {
		try {
			dispatch(fetchSignUp(values));
			resetForm();
			setModalWindowIsOpen(!modalWindowIsOpen)
		}
		catch(err) {
			setStatus({
        msg: `Ошибка обработки данных: ${err.message}!`
      })
		}
	};
	
	let toggleModal= () => {
    setModalWindowIsOpen(!modalWindowIsOpen);
		navigate('/');
  };

	return (
		<>
			<div className='form__intro'>
				<p className='form__intro-text'>
					Для использования информационных систем
					Вам необходимо пройти регистрацию.
					<br/>
					<br/>
					Пожалуйста, заполните все поля формы и
					нажмите кнопку &#171;Подвердить&#187;.
				</p>
			</div>
			<div className='form-mobile'>Регистрация</div>
			<Formik
				initialValues = {initialValues}
				validationSchema = {signUpSchema}
				onSubmit = {onSubmit}
			>
				{({isSubmitting, handleReset, status, dirty, errors, touched}) => (
					<Form className='form'>
						{status && status.msg && <p style={{color: "#fff"}}>{status.msg}</p>}
						<FormControl 
							control='input' 
							type='email' 
							name='email' 
							label='Email' 
							errors={errors}
							touched={touched}
						/>
						<FormControl 
							control='input' 
							type='password' 
							name='password' 
							label='Пароль'
							errors={errors}
							touched={touched}
						/>
						<FormControl 
							control='input' 
							name='firstName' 
							label='Имя'
							errors={errors}
							touched={touched}
						/>
						<FormControl 
							control='input' 
							name='lastName' 
							label='Фамилия'
							errors={errors} 
							touched={touched}
						/>
						<div className='form__buttons'>
							<Button 
								type='button'
								label='Очистить' 
								onClick={handleReset}
								className='form__btn'
								disabled={isSubmitting || !dirty} 
							/>
							<Button
								label='Подтвердить' 
								className='form__btn'
								disabled={isSubmitting || !dirty}
							/>
						</div>
					</Form>
					)
				}
			</Formik>
			<ModalWindow
				isOpen={modalWindowIsOpen}
				onRequestClose={toggleModal}
				title = {fetchStatus === 'loading' ? 'Обновление данных...' : fetchStatus === 'resolved' ? 'Регистрационные данные отправлены' : ''}
				textErr =  {fetchError ? `Ошибка: ${fetchError} !` : ''}
				onClick = {toggleModal}
			/>		
		</>
	)
}

export default RegistrationForm;