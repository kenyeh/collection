import React from 'react';
import SelectList from '../containers/selectList';
import ChooseList from '../containers/chooseList';
import Abilities from '../containers/abilities';

/*
class App extends Component {
    render() {
        return (
            <div className="app">
                <SelectList />
                <ChooseList />
                <Abilities />
            </div>
        );
    }
}
*/

const App = () => (
    <div className="app">
        <SelectList />
        <ChooseList />
        <Abilities />
    </div>
)

export default App;