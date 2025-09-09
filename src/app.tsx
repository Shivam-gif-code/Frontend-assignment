import React from 'react'
import InputField from './components/InputField'
import DataTable from './components/DataTable'

type Row = { id: number; name: string; email: string }

const data: Row[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
]

const columns = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' }
] as const

export default function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Components Demo</h1>
      <div className="mb-6">
        <InputField label="Name" placeholder="Enter name" helperText="Type your name" />
      </div>
      <DataTable data={data} columns={columns} selectable onRowSelect={(rows)=>console.log(rows)} />
    </div>
  )
}
