import { fireEvent, render, screen } from "@testing-library/react";
import Filters from ".";

const defaultProps = {
    actionType: '',
    actionTypes: [],
    applicationId: '',
    applicationType: '',
    applicationTypes: [],
    fromDate: '',
    logId: '',
    onFilterApply: jest.fn(),
    onReset: jest.fn(),
    toDate: '',
    updateFiltersData: jest.fn(),
};

const props = {
    ...defaultProps,
    actionTypes: ['ADD_EMPLOYEE', 'ADD'],
    actionType: 'ADD_EMPLOYEE',
    applicationId: '12345',
    applicationTypes: ['INITIATE', 'ADD_INITIATE'],
    applicationType: 'INITIATE',
    fromDate: '22-11-2022',
    logId: '23456',
    toDate: '30-11-2022',
};

describe("Filters Component", () => {
    const Wrapper = (currentProps) => (
        <Filters {...currentProps} />
    )

    test('Should render all components', () => {
        render(<Wrapper {...defaultProps} />)
        expect(screen.getByLabelText('Log ID')).toBeInTheDocument();
        expect(screen.getByLabelText('Application ID')).toBeInTheDocument();
        expect(screen.getByLabelText('Action Types')).toBeInTheDocument();
        expect(screen.getByLabelText('Application Types')).toBeInTheDocument();
        expect(screen.getByLabelText('From Date')).toBeInTheDocument();
        expect(screen.getByLabelText('To Date')).toBeInTheDocument();
        expect(screen.getByText('Reset')).toBeInTheDocument();
        expect(screen.getByText('Apply Filters')).toBeInTheDocument();
    });

    test('Should Render Disabled Buttons', () => {
        render(<Wrapper {...defaultProps} />)
        expect(screen.getByText('Reset')).toBeDisabled();
        expect(screen.getByText('Apply Filters')).toBeDisabled();
    })

    test('Should Render Values passed as a prop', () => {
        render(<Wrapper {...props} />)
        expect(screen.getByDisplayValue('23456')).toBeInTheDocument();
        expect(screen.getByDisplayValue('12345')).toBeInTheDocument();
        expect(screen.getByDisplayValue('ADD_EMPLOYEE')).toBeInTheDocument();
        expect(screen.getByDisplayValue('INITIATE')).toBeInTheDocument();
        expect(screen.getByText('Reset')).toBeEnabled();
        expect(screen.getByText('Apply Filters')).toBeEnabled();
    })

    test('Should Check Buttons Called', () => {
        render(<Wrapper {...props} />)
        const resetButton = screen.getByText('Reset');
        fireEvent.click(resetButton);
        const applyButton = screen.getByText('Apply Filters');
        fireEvent.click(applyButton);
        expect(defaultProps.onReset).toBeCalled();
        expect(defaultProps.onFilterApply).toBeCalled();
    })

    test('Should Check filters update on change', () => {
        render(<Wrapper {...props} />)
        const logId = '12345678';
        const text = screen.getByLabelText('Log ID')
        fireEvent.change(text, { target: { value: logId }});
        expect(defaultProps.updateFiltersData).toBeCalledWith({ logId });
    })
})