import { render } from '@testing-library/react';
import App from './App';
import * as React from 'react';

test('renders learn react link', () => {
  const app = render(<App />);

  expect(app).toBeTruthy();
});
