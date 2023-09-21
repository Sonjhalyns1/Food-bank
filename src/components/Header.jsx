import React from 'react';
import { useLocation } from 'react-router-dom';
import Category from './Category';
import Search from './Search';

function Header() {
  const location = useLocation();
  const renderCategoryAndSearch = !location.pathname.startsWith('/mealprep');

  return (
    <div>
      {renderCategoryAndSearch && (
        <>
          <Search />
          <Category />
        </>
      )}
    </div>
  );
}

export default Header;
