import React from 'react'
import { Book, Edit2, Gift, Trash2 } from "react-feather"
import { Button } from "reactstrap"

export const Columns = () => {

  return [
    {field: 'name', header: 'Name', style: '20rem', sortable: true},
    {field: 'quantity', header: 'Quantity', style: '20rem', sortable: true},
    {field: 'remaining', header: 'Remaining', style: '20rem', sortable: true},
    {field: 'consumed', header: 'Consumed', style: '20rem', sortable: true}
  ]
}