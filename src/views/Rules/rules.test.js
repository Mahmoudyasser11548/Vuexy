/* eslint-disable no-unused-expressions */
import React from 'react'
import Rules from './Rules'
import {renderWithProviders} from '../../../test-utils'
import {fireEvent, screen} from '@testing-library/react'
import { act } from 'react-dom/test-utils'

describe('Rules Components', () => {
    test('render Correctly', () => { 
        renderWithProviders(<Rules />)

        const titleName = screen.getByRole('heading', {
            name: 'Rules',
            level: 2
        })

        expect(titleName).toBeInTheDocument
    })
    test('Check Create Rule Modal', async () => {
        renderWithProviders(<Rules />)
        
        const createBtn = screen.getByRole('button', {
            name: /Create Rule/i
        })
        expect(createBtn).toBeInTheDocument
        
        // Open Modal
        act(() => fireEvent.click(createBtn))
        
        // Modal Header
        const modalHeader = screen.getByRole('heading', {
            name: /create rule/i,
            level: 5
        })
        expect(modalHeader).toBeInTheDocument
    
        // Radio (Refund and RefundRequest)
        const ruleRadio = screen.getAllByRole('radio')
        expect(ruleRadio).toHaveLength(2)
        
        act(() => fireEvent.click(ruleRadio[0]))
    
        // textbox value Input
        const inputValue = screen.getByPlaceholderText('Rule Value')
        expect(inputValue).toBeInTheDocument
    
        act(() => fireEvent.change(inputValue, { target: { value: '2000' } }))
    
        // Select Type of Rule & Options
        const selectTypeOfRule = screen.getAllByRole('combobox')
        expect(selectTypeOfRule).toHaveLength(2)
    
        const Options = screen.getAllByRole('option')
        expect(Options).toHaveLength(9)
        
        act(() => {
            fireEvent.change(selectTypeOfRule[0], { target: { value: 'Integer' } })
            fireEvent.change(selectTypeOfRule[1], { target: { value: 'Greater than' } })
        })
    
        // CheckBox Activate
        const activateCheckBox = screen.getAllByRole('checkbox')
        expect(activateCheckBox).toHaveLength(2)
    
        act(() => fireEvent.click(activateCheckBox[0]))
    
        // close Modal Button
        const closeModalBtn = screen.getByRole('button', {
            name: /Close/i
        })
        expect(closeModalBtn).toBeInTheDocument
    
        // Apply Button
        const applyBtn = screen.getByRole('button', {
            name: /Apply/i
        })
        expect(applyBtn).toBeInTheDocument
        
        act(() => fireEvent.click(applyBtn))
        
    }, 10000)
})