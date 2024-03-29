import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployeeList, fetchRemoveEmployee} from 'components/store/employeeSlice';

import { Formik, Form } from 'formik';
import FormControl from 'components/pages/forms/FormControl';

import Button from 'components/pages/Button';

import css from 'components/pages/employeepages/Employee.module.scss';


let handleEnterPress = (e) => {
	if (e.key  === 'Enter') {  
		e.preventDefault();
		return false;
	}
};

function EmployeeList() {

	let navigate = useNavigate();
	let location = useLocation();

	let dispatch = useDispatch();
	let {employees, fetchStatus, fetchError} = useSelector(state => state.employeeList);
	
	let [search, setSearch] = useState('');

	let handleRemove = (e, id) => {
		e.stopPropagation();
		try {
			dispatch(fetchRemoveEmployee(id));
		}
		catch(error) {
			console.error(error.message);
		}
		
	};

	let goTo = () => navigate('/newemployee', {state: location});

	useEffect(() => {
		dispatch(fetchEmployeeList())
		}, [dispatch])

	return (
		<article className={css.employeelist}>
			<div className={css.employeelist__title_container}>
				<h1 className={css.employeelist__title}>Список ответственных сотрудников</h1>
				<div className={css.employeelist__info}>
					Всего сотрудников: <span className={css.employeelist__info_bold}>{employees.length}</span>
				</div>
			</div>
			<Button 
				type='button'
				label='Регистрация нового сотрудника'
				className={css.employeelist__btn}
				onClick={goTo}
			/>
			{fetchError && <h3 className={css.employeelist__msgErr}>Ошибка загрузки данных: {fetchError} !</h3>}
			{fetchStatus === 'loading' ? <h3 className={css.employeelist__msg}>Загрузка данных...</h3> : (employees.length < 1 ? <h3 className={css.employeelist__msg}>Список сотрудников пуст</h3> : 
			<>
				<Formik>
					{() => {
						return (
							<Form className={css.employeelist__search}>
								<FormControl
									control='input'
									type='search'
									name='list'
									autoComplete='off' 
									placeholder='Поиск по фамилии'
									label='Найти по фамилии: '
									onChange={e => setSearch(e.target.value)}
									onKeyPress={handleEnterPress}
									errors={''}
									touched={''}
								/>
							</Form>
							)
						}
					}	
				</Formik>
				<section className='table__container'>
					<table className='table'>
						<thead className='table__head'>
							<tr key={'thead'}>
								<th className='table__th'>Фамилия</th>
								<th className='table__th table__th_mobile'>Имя</th>
								<th className='table__th table__th_mobile'>Email</th>
								<th className='table__th'>Одобрен</th>
								<th className='table__th'>Удалить</th>
							</tr>
						</thead>
						<tbody className='table__body'>
							{employees.filter(item => (search === '') ? item : item.lastName.toLowerCase().startsWith(search.toLowerCase()))	
								.map(item => (
									<tr key={item._id} onClick={() => navigate(`/employeelist/${item._id}`)} className='table__body_tr'>
										<td className='table__td'>{item.lastName}</td>
										<td className='table__td table__td_mobile'>{item.firstName}</td>
										<td className='table__td table__td_mobile'>{item.email}</td>
										<td className='table__td table__td_txt'>{item.approved ? 'Да' : 'Нет'}</td>
										<td className='table__td table__td_btn'>
											<Button 
												type='button'
												label='Удалить'
												className='table__btn'
												onClick={(e) => handleRemove(e, item._id)}
											/>
										</td>
									</tr>
								))}
							</tbody>
					</table>
				</section>
			</>
			)}
		</article>
	)
}

export default EmployeeList;