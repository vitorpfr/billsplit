import * as React from 'react';

interface INameFieldSetState {
  names: string[]
}

export class NamesFieldSet extends React.Component<any, INameFieldSetState>{
  public state = {
    names: []
  }

  private addHandler = this.add.bind(this);
  private changeNameHandler = this.changeName.bind(this);

  public add() {
    this.setState({ names: [...this.state.names, ""] });
  }

  public changeName(index: number) {
    return (event: Event) => {
      const newNames: string[] = [...this.state.names];
      newNames[index] = (event.target as HTMLInputElement).value!;
      this.setState({ names: newNames });
    }
  }

  public render () {
    const names = this.state.names.map((element: Element, index: number) => {
      return <input type="text" value={ this.state.names[index] } onChange={this.changeNameHandler(index)} key ={ index } />
    });

    return <div>
      <button onClick={ this.addHandler }>Add</button>

      <div className="inputs">
        { names }
      </div>
    </div>
  }
}
