import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
// import renderer from 'react-test-renderer';
// import UserEvent from '@testing-library/user-event';
import App from './App';


describe('the App component', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test('renders bookmark!t', () => {
    render(<App />);
    const linkElement = screen.getByText('bookmark!t');
    expect(linkElement).toBeInTheDocument();
  });
});
