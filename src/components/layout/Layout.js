import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { fetchCheckAuth } from 'components/store/authSlice';

import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';

import css from 'components/layout/Layout.module.scss';


function Layout() {

	let dispatch = useDispatch();

	useEffect(() => {
		if(localStorage.getItem('token')){
			dispatch(fetchCheckAuth())
		}
	}, [dispatch]);

	return (
		<>
			<Header />
			<main className={css.main__wrapper}>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default Layout;