import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import RegisterStar from './StarActions/register';
import ReadStar from './StarActions/read';
import PutStarForSale from './StarActions/putForSale';
import BuyStar from './StarActions/buy';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;


    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Register Star" />
            <Tab label="Show Star Data" />
            <Tab label="Let's get some money" />
            <Tab label="Let's spend it all" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><RegisterStar></RegisterStar></TabContainer>}
        {value === 1 && <TabContainer><ReadStar></ReadStar></TabContainer>}
        {value === 2 && <TabContainer><PutStarForSale></PutStarForSale></TabContainer>}
        {value === 3 && <TabContainer><BuyStar></BuyStar></TabContainer>}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);