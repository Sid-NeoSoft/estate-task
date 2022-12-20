import { fireEvent, render, screen } from "@testing-library/react";
import TextBox from ".";

const defaultProps = {
    label: 'My Label',
    onChange: jest.fn()
}

describe("TextBox Component", () => {
    const Wrapper = (currentProps) => (
        <TextBox {...currentProps} />
    )

    test('Should render label passed', () => {
        render(<Wrapper {...defaultProps} />);
        expect(screen.getByLabelText('My Label')).toBeInTheDocument();
    })

    test('Should render value passed', () => {
        render(<Wrapper {...defaultProps} value="value" />);
        expect(screen.getByDisplayValue('value')).toBeInTheDocument();
    })

    test('Should able to change the value', () => {
        render(<Wrapper {...defaultProps} />);
        const event = { target: { value: 'value' }};
        const text = screen.getByLabelText('My Label')
        fireEvent.change(text, event);
        expect(screen.getByDisplayValue('value')).toBeInTheDocument();
    })
})