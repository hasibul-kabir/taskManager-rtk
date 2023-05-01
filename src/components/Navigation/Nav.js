import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';
import { searchKey } from '../../redux/features/filters/filterSlice';

const Nav = () => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchKey(search))
    }, [search])

    return (
        <nav className="container relative py-3">
            <div className="flex items-center justify-between">
                <Link to='/'>
                    <img src={Logo} alt='BrandLogo' />
                </Link>
                <div className="flex-1 max-w-xs search-field group">
                    <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
                    <input type="text" placeholder="Search Task" className="search-input" id="lws-searchTask" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
        </nav>
    )
}

export default Nav