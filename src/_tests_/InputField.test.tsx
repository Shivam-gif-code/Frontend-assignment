import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import InputField from '../components/InputField'

test('renders label and helper', () => {
  render(<InputField label="Name" helperText="help" />)
  expect(screen.getByText('Name')).toBeInTheDocument()
  expect(screen.getByText('help')).toBeInTheDocument()
})
