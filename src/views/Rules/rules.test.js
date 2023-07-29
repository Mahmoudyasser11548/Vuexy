/* eslint-disable no-unused-expressions */
import React from 'react'
import Rules from './Rules'
import {renderWithProviders} from '../../../test-utils'
import {fireEvent, screen} from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { rest } from 'msw'
import { server } from '../../mocks/server' 

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
        // Open Modal
        await act(() => fireEvent.click(createBtn))
        expect(createBtn).toBeInTheDocument
        
        
        // Modal Header
        const modalHeader = screen.getByRole('heading', {
            name: /create rule/i,
            level: 5
        })
        expect(modalHeader).toBeInTheDocument
    
        // Radio (Refund and RefundRequest)
        const ruleRadio = screen.getAllByRole('radio')
        await act(() => fireEvent.click(ruleRadio[0]))
        expect(ruleRadio).toHaveLength(2)
    
        // textbox value Input
        const inputValue = screen.getByPlaceholderText('Rule Value')
        await act(() => fireEvent.change(inputValue, { target: { value: '2000' } }))
        expect(inputValue).toBeInTheDocument
    
        // Select Type of Rule & Options
        const selectTypeOfRule = screen.getAllByRole('combobox')
        const Options = screen.getAllByRole('option')
        await act(() => {
            fireEvent.change(selectTypeOfRule[0], { target: { value: 'Integer' } })
            fireEvent.change(selectTypeOfRule[1], { target: { value: 'Greater than' } })
        })
        expect(selectTypeOfRule).toHaveLength(2)
        expect(Options).toHaveLength(9)
    
        // CheckBox Activate
        const activateCheckBox = screen.getAllByRole('checkbox')
        await act(() => fireEvent.click(activateCheckBox[0]))
        expect(activateCheckBox).toHaveLength(2)
    
        // close Modal Button
        const closeModalBtn = screen.getByRole('button', {
            name: /Close/i
        })
        expect(closeModalBtn).toBeInTheDocument
    
        // Apply Button
        const applyBtn = screen.getByRole('button', {
            name: /Apply/i
        })
        await act(() => fireEvent.click(applyBtn))
        expect(applyBtn).toBeInTheDocument
    }, 10000)

    test("Test Server Wrong", async () => {
        server.use(
            rest.get(
                'http://localhost:3000/rules',
                (req, res, ctx) => {
                    return res(ctx.status(500))
                }
            )
        )
        renderWithProviders(<Rules />)
        const errorElemet = await screen.findByText("No Rules found")
        expect(errorElemet).toBeInTheDocument
    })
})