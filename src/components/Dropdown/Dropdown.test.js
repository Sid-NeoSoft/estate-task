import { fireEvent, render, screen } from "@testing-library/react";
import Dropdown from ".";

const options = ['value', 'change']

const defaultProps = {
    value: '',
    label: 'My Label',
    options,
    onChange: jest.fn()
}

describe("TextBox Component", () => {
    const Wrapper = (currentProps) => (
        <Dropdown {...currentProps} />
    )

    test('Should render label passed', () => {
        render(<Wrapper {...defaultProps} />);
        expect(screen.getByLabelText('My Label')).toBeInTheDocument();
    })

    test('Should render value passed', () => {
        render(<Wrapper {...defaultProps} value="value" />);
        expect(screen.getByDisplayValue('value')).toBeInTheDocument();
    })

    test('Should call onchange method', () => {
        render(<Wrapper {...defaultProps} value="value" />);
        const text = screen.getByLabelText('My Label')
        fireEvent.change(text);
        expect(screen.getByDisplayValue('value')).toBeInTheDocument();
    })
})