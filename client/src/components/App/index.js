import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Review from '../Review';
import Landing from '../Landing';
import Search from '../Search';
import MyPage from '../MyPage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/review" element={<Review />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;