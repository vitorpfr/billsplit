import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import * as React from 'react';

interface INameFieldSetState {
  names: string[]
}

export class NamesFieldSet extends React.Component<any, INameFieldSetState>{
  public state = {
    names: ["", ""]
  }

  public add = () => {
    this.setState({ names: [...this.state.names, ""] });
  }

  public changeName = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNames: string[] = [...this.state.names];
    newNames[index] = event.target.value!;
    this.setState({ names: newNames });
  }

  public render () {
    const names = this.state.names.map((value: string, index: number) => {
      return (<div key={ index }>
                <TextField type="text"
                           label="Name"
                           value={ value } 
                           onChange={ this.changeName(index) }
                />
              </div>);
    });

    return (
      <Card>
        <CardContent>
            <Typography component="p">
              Who is splitting the bill? 
              <IconButton aria-label="Add person" onClick={ this.add }>
                <PersonAddIcon />
              </IconButton>
            </Typography>
            <div className="inputs" style={{marginBottom: '16px'}}>
              { names }
            </div>
            <Button variant="contained" color="primary">
              Split bill
            </Button>
        </CardContent>
      </Card>
    );
  }
}
