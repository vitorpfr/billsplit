import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import * as React from 'react';
import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Bill Split
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', paddingTop: '32px'}}>
          <Card>
            <CardContent>
              <Typography variant="headline" component="h2">
                Easily split a restaurant or bar bill.
              </Typography>
              <Typography component="p">
                Bill split is free, and it works offline.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default App;
