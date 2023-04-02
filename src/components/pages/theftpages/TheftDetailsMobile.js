import React from 'react';

import { status, bikeType, bikeColor } from 'components/store/theftSlice';
import FormControl from 'components/pages/forms/FormControl';
import css from 'components/pages/theftpages/TheftStyles.module.scss';


function TheftDetailsMobile({values, savedValues, officerList, errors, touched}) {
	return (
		<table className={css.theftdetails__table_mobile}>
			<tbody>
				<tr>
					<td className={css.theftdetails__detail}>Cтатус:</td>
					<td className={css.theftdetails__secondtd}>
						<FormControl 
							control='select'
							id='statusMobile'
							name='status' 
							options={status}
							errors={errors}
							touched={touched}  
						/>
					</td>
				</tr>
				<tr>
					<td className={css.theftdetails__detail}>Дата кражи:</td>
					<td>
						<FormControl 
							control='date'
							id='newTheftDateMobile'
							name='newTheftDate' 
							maxDate={new Date()}
							disabled = {values.status === 'done'}
							placeholderText={new Date(savedValues.date).toLocaleDateString()}
							errors={''}
							touched={''} 
						/>
					</td>
				</tr>
				<tr>
					<td className={css.theftdetails__detail}>Номер лицензии: </td>
					<td>
						<FormControl
							control='input'
							id='licenseNumberMobile'
							name='licenseNumber'
							disabled = {values.status === 'done'}
							errors={errors}
							touched={touched} 
						/>
					</td>
				</tr>
				<tr>
					<td className={css.theftdetails__detail}>Дата создания: </td>
					<td className={css.theftdetails__detail_data}>
						{new Date(savedValues.createdAt).toLocaleDateString()}
					</td>
				</tr>
				<tr>
					<td className={css.theftdetails__detail}>ФИО арендатора: </td>
					<td>
						<FormControl 
							control='input'
							id='ownerFullNameMobile'
							name='ownerFullName'
							errors={errors}
							touched={touched} 
							disabled = {values.status === 'done'} 
						/>
					</td>
				</tr>
				<tr>
					<td className={css.theftdetails__detail}>Дата обновления: </td>
					<td className={css.theftdetails__detail_data}>
						{new Date(savedValues.updatedAt).toLocaleDateString()}
					</td>
				</tr>
				<tr>
					<td className={css.theftdetails__detail}>Тип велосипеда: </td>
					<td>
						<FormControl 
							control='select'
							id='typeMobile' 
							name='type' 
							options={bikeType}
							errors={errors}
							touched={touched} 
							disabled = {values.status === 'done'}
						/>
					</td>
				</tr>
				<tr>
					<td className={css.theftdetails__detail}>Цвет велосипеда: </td>
					<td>
						<FormControl
							control='select'
							id='colorMobile'
							name='color'
							options={bikeColor}
							errors={''}
							touched={''} 
							disabled = {values.status === 'done'} 
						/>
					</td>
				</tr>
				<tr>
					<td className={css.theftdetails__detail}>Дополнительная информация: </td>
					<td>
						<FormControl 
							control='textarea'
							id='descriptionMobile' 
							name='description' 
							errors={''}
							touched={''}
							disabled = {values.status === 'done'} 
						/>
					</td>
				</tr>
				<tr>
					<td className={css.theftdetails__detail}>Ответственный: </td>
					<td>
						<FormControl 
							control='select' 
							type='select'
							id='officerMobile'  
							name='officer' 
							options={officerList}
							disabled = {values.status === 'done'}
							errors={''}
							touched={''} 
						/>
					</td>
				</tr>
				<tr>
					<td className={css.theftdetails__detail}>Завершающий комментарий: </td>
					<td>
						<FormControl 
							control='textarea'
							id='resolutionMobile' 
							name='resolution'
							errors={errors}
							touched={touched}
							disabled = {values.status !== 'done'}
						/>
					</td>
				</tr>
			</tbody>
		</table>	
	)
}

export default TheftDetailsMobile;