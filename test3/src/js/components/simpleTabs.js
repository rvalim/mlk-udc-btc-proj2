import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RegisterStar from './StarActions/register';
import ReadStar from './StarActions/read';
import PutStarForSale from './StarActions/putForSale';
import BuyStar from './StarActions/buy';

const buttons = [
  { label: 'Register Star', link: '/' },
  { label: 'Show Star', link: '/read' },
  { label: 'Let\'s win some money', link: '/putforsale' },
  { label: 'Let\'s spend it all', link: '/buy' }
]
function SimpleTabs(props) {
  return (
    <Router>
      <div>
        {
          buttons.map((item, i) =>
            <Link
              key={i}
              to={item.link}
              style={{ cursor: 'pointer' }}>
              {item.label}
            </Link>
          )
        }
        <Route exact path="/" component={RegisterStar} />
        <Route path="/read" component={ReadStar} />
        <Route path="/putforsale" component={PutStarForSale} />
        <Route path="/buy" component={BuyStar} />
      </div>
    </Router >
  );
}

export default SimpleTabs;