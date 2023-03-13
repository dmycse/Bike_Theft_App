import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from 'components/layout/Layout';
import TheftMessageForm from 'components/pages/theftpages/TheftMessageForm';
import TheftsRecords from 'components/pages/theftpages/TheftsRecords';
import TheftDetails from 'components/pages/theftpages/TheftDetails';
import EmployeeRegistration from 'components/pages/employeepages/employeeRegistration';
import EmployeeList from 'components/pages/employeepages/EmployeeList';
import EmployeeDetails from 'components/pages/employeepages/EmployeeDetails';
import RegistrationForm from 'components/pages/registration/RegistrationForm';
import AuthPage from 'components/pages/authorization/AuthPage';
import RequireAuth from 'components/pages/authorization/RequireAuth';
import NotFoundPage from 'components/pages/page404/NotFoundPage';

import css from 'App.module.scss';

let pages = [
	{id: 1, path: 'theftrecords', element: <TheftsRecords/>},
	{id: 2, path: 'theftrecords/:_id', element: <TheftDetails/>},
	{id: 3, path: 'employeelist', element: <EmployeeList/>},
	{id: 4, path: 'employeelist/:_id', element: <EmployeeDetails/>},
	{id: 5, path: 'newemployee', element: <EmployeeRegistration/>},
];


function App() {
  return (
    <div className={css.container}>
      <Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<TheftMessageForm />} />
					{pages.map(page => (
						<Route key={page.id} path={page.path} element={
							<RequireAuth>
								{page.element}
							</RequireAuth>
						}/>
						)
					)}
					<Route path='registration' element={<RegistrationForm />} />
					<Route path='auth' element={<AuthPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>
    </div>
  );
}

export default App;
