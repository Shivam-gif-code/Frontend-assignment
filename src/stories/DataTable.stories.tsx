import React from 'react'
import DataTable from '../components/InputField'
import { Meta, StoryObj } from '@storybook/react'

type Row = { id: number; name: string; email: string }

const sample: Row[] = [
  { id: 1, name: 'Zara', email: 'zara@example.com' },
  { id: 2, name: 'Yusuf', email: 'yusuf@example.com' },
  { id: 3, name: 'Anita', email: 'anita@example.com' },
]

export default {
  title: 'Components/DataTable',
  component: DataTable,
} as Meta

export const Default: StoryObj = {
  args: {
    data: sample,
    columns: [
      { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
      { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
      { key: 'email', title: 'Email', dataIndex: 'email' },
    ],
    selectable: true
  }
}
