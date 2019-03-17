import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import renderer from 'react-test-renderer';

describe('Card component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<List />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
        .create(<List key={1} header="First list" card={[{ id: 'a', title: 'First card', content: 'lorem ipsum' }, { id: 'b', title: 'Second card', content: 'lorem ipsum' }]} />)
        .toJSON();
        expect(tree).toMatchSnapshot();
    })

})