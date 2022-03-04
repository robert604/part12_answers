import { render, screen } from '@testing-library/react';
import Todo from './Todo';

test('renders Todo', () => {
  const todo = {
    _id:'some_id',
    text:'some text',
    done:false
  }

  render(<Todo todo={todo} onClickDelete={()=>{}} onClickComplete={()=>{}}/>);
  const linkElement = screen.getByText(/some text/i);
  expect(linkElement).toBeInTheDocument();
});