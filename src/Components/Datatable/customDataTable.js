import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import { InputText } from 'primereact/inputtext'

const CustomDataTable = (prop) => {
  const {columns, data, headerSearch = true, filters, setFilters, ...rest} = prop

  const [globalFilterValue, setGlobalFilterValue] = useState()

  // Global Filteration Function in Input Field at Table Header
  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    const _filters = { ...filters }
    
    _filters['global'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  // Table Header Component
  const renderHeader = () => {
    return (
        <div className="d-flex justify-content-end">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText 
                  value={globalFilterValue} 
                  onChange={onGlobalFilterChange} 
                  placeholder="search" 
                />
            </span>
        </div>
    )
  }

  const header = renderHeader()

  return (
    <DataTable 
      header={headerSearch ? header : ''}
      value={data} 
      {...rest}>
      {columns.map((col) => (
        <Column 
          sortable={col.sortable}
          key={col.field} 
          field={col.field} 
          header={col.header}
          body={col?.bodyTemplate} 
          style={{ minWidth: col.style }}
          filter={col?.filter} 
          filterPlaceholder={`Search by ${col.field}`} 
          filterElement={col?.filterElement}
        />
      ))}
    </DataTable>
  )
}

export default CustomDataTable