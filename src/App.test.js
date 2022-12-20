import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import history from "./history";

describe("App Component", () => {
    render(
        <BrowserRouter history={history}>
            <App />
        </BrowserRouter>
    );

    test("renders learn react link", () => {
        const text = screen.getByText('Loading.....')
        expect(text).toBeInTheDocument();
    });
})

