import React from 'react'
import InputField from '../components/InputField'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
}
export default meta
type Story = StoryObj<typeof InputField>

export const Default: Story = {
  args: {
    label: 'Full name',
    placeholder: 'Enter your full name',
    helperText: 'This will be used on your profile',
  }
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@domain.com',
    invalid: true,
    errorMessage: 'Invalid email address'
  }
}

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password'
  }
}
