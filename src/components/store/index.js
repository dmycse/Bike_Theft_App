import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from 'components/store/employeeSlice';
import theftSlice from 'components/store/theftSlice';
import authSlice from 'components/store/authSlice';


const store = configureStore({
	reducer: {
		employeeList: employeeSlice,
		theftRecords: theftSlice,
		auth: authSlice,
	}
});

export default store;