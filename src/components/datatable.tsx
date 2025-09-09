import React, { useMemo, useState } from 'react'

export type Column<T> = {
  key: string
  title: string
  dataIndex: keyof T
  sortable?: boolean
}

export type DataTableProps<T> = {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (rows: T[]) => void
}

function sortData<T>(data: T[], column?: Column<T>, direction: 'asc'|'desc' = 'asc') {
  if (!column || !column.sortable) return data
  const key = column.dataIndex as string
  return [...data].sort((a:any,b:any) =>
    direction === 'asc'
      ? String(a[key]).localeCompare(String(b[key]))
      : String(b[key]).localeCompare(String(a[key]))
  )
}

export default function DataTable<T extends { id?: string | number }>({
  data, columns, loading, selectable, onRowSelect
}: DataTableProps<T>) {
  const [sort, setSort] = useState<{column?: Column<T>, dir: 'asc'|'desc'}>({ dir: 'asc' })
  const [selected, setSelected] = useState<Record<string, boolean>>({})

  const sorted = useMemo(() => sortData(data, sort.column, sort.dir), [data, sort])

  if (loading) return <div role="status" className="p-4">Loading...</div>
  if (!data || data.length === 0) return <div className="p-4">No records found.</div>

  return (
    <div className="overflow-auto border rounded-md">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th className="p-2">
                <input
                  aria-label="Select all rows"
                  type="checkbox"
                  onChange={() => {
                    const allSelected = data.every(d => selected[String(d.id)])
                    const next = allSelected ? {} : Object.fromEntries(data.map(d => [String(d.id), true]))
                    setSelected(next)
                    onRowSelect?.(allSelected ? [] : data)
                  }}
                  checked={data.length > 0 && data.every(d => selected[String(d.id)])}
                />
              </th>
            )}
            {columns.map(col => (
              <th key={col.key} className="text-left p-2">
                <button onClick={() => col.sortable && setSort(s => ({
                  column: col,
                  dir: s.column?.key === col.key && s.dir === 'asc' ? 'desc' : 'asc'
                }))}>
                  {col.title} {col.sortable && (sort.column?.key === col.key ? (sort.dir === 'asc' ? '▲' : '▼') : '↕')}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, idx) => (
            <tr key={idx} className="border-t">
              {selectable && (
                <td className="p-2">
                  <input
                    aria-label={`Select row ${idx+1}`}
                    type="checkbox"
                    checked={!!selected[String(row.id)]}
                    onChange={() => {
                      const id = String(row.id)
                      const next = { ...selected, [id]: !selected[id] }
                      setSelected(next)
                      onRowSelect?.(data.filter(d => next[String(d.id)]))
                    }}
                  />
                </td>
              )}
              {columns.map(col => (
                <td key={String(col.dataIndex)} className="p-2">{String(row[col.dataIndex] ?? '')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
