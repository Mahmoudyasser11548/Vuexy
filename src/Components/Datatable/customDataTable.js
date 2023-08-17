import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import {FilterMatchMode} from 'primereact/api'
import { InputText } from 'primereact/inputtext'

const CustomDataTable = (props) => {
  const {
    columns, 
    data, 
    headerSearch = true, 
    filterFieldsSet, 
    filterDisplay = false, 
    ...rest
  } = props

  // Filter Configration
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ...filterFieldsSet
  })
  
  const [globalFilterValue, setGlobalFilterValue] = useState('')

  // Global Filteration Function in Input Field at Table Header
  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    const _filters = { ...filters }
    
    console.log(filters)

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
      filters={filters} 
      filterDisplay={filterDisplay ? 'row' : ''}
      paginator
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