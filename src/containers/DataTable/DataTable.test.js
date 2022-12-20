import { fireEvent, render, screen } from "@testing-library/react";
import DataTable from ".";

const tableColumns = [
    { id: "1", name: "Log ID", dataKey: "logId" },
    { id: "2", name: "Application Type", dataKey: "applicationType" },
    { id: "3", name: "Application ID", dataKey: "applicationId" },
    { id: "4", name: "Action Type", dataKey: "actionType" },
    { id: "5", name: "Source", dataKey: "source" },
    { id: "6", name: "Date Time", dataKey: "creationTimestamp" },
];

const logsData = [
    { logId: '1', applicationId: '6', actionType: 'ADD', applicationType: 'Change', source: 'ONLINE', creationTimestamp: '22/11/2022'  },
];

const defaultProps = {
    currentPage: 0,
    logsData: [],
    orderByCol: "logId",
    rowCount: 10,
    sortOrder: "asc",
    updateConfigsData: jest.fn(),
};

describe("Data table component", () => {
    const Wrapper = (currentProps) => <DataTable {...currentProps} />;

    test("should render no results found text", () => {
        render(<Wrapper {...defaultProps} />);
        expect(screen.getByText("No results Found")).toBeInTheDocument();
    });

    test("should update sort direction", () => {
        render(<Wrapper {...defaultProps} />);
        expect(screen.getByLabelText('asc')).toBeInTheDocument();
    });

    test("should render sort direction", () => {
        render(<Wrapper {...defaultProps} />);
        const logHeading = screen.getByText('Log ID');
        fireEvent.click(logHeading);
        expect(defaultProps.updateConfigsData).toBeCalledWith({ orderByCol: 'logId', sortOrder: "desc" });
    });

    test("should render column headings", () => {
        render(<Wrapper {...defaultProps} />);
        tableColumns.forEach(({ name }) => {
            expect(screen.getByText(name)).toBeInTheDocument();
        })
    });

    test("should render table data", () => {
        const newProps = { ...defaultProps, logsData };
        render(<Wrapper {...newProps} />);
        logsData.forEach((curLog) => {
            tableColumns.forEach(({ dataKey }) => {
                expect(screen.getByText(curLog[dataKey])).toBeInTheDocument();
            })
        })
    });
});
