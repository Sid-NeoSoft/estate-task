import { Box } from "@mui/system";

const tableStyles = {
    arrow: {
        color: "green",
        marginLeft: "4px",
        rotate: "z -90deg",
    },
    heading: {
        display: "flex",
        alignItems: "center",
        height: "19px",
    },
    table: {
        tableLayout: "fixed",
        width: "100%",
        backgroundColor: "whitesmoke",
        borderRadius: 1,
    },
    tableHeadeing: {
        backgroundColor: "whitesmoke",
        fontWeight: 500,
    },
    td: {
        p: 1,
        fontSize: "14px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        backgroundColor: "white",
    },
};

const DataTable = ({
    currentPage,
    logsData = [],
    orderByCol,
    rowCount = 10,
    sortOrder,
    updateConfigsData,
}) => {
    const updateSortByColumn = (colName) => {
        let obj = { orderByCol: colName, sortOrder: "asc" };
        if (colName === orderByCol) {
            obj = { ...obj, sortOrder: sortOrder === "asc" ? "desc" : "asc" };
        }
        updateConfigsData(obj);
    };

    const tableColumns = [
        { id: "1", name: "Log ID", dataKey: "logId", width: "20%" },
        {
            id: "2",
            name: "Application Type",
            dataKey: "applicationType",
            width: "15%",
        },
        {
            id: "3",
            name: "Application ID",
            dataKey: "applicationId",
            width: "20%",
        },
        { id: "4", name: "Action Type", dataKey: "actionType", width: "15%" },
        { id: "5", name: "Source", dataKey: "source", width: "12%" },
        {
            id: "6",
            name: "Date Time",
            dataKey: "creationTimestamp",
            width: "18%",
        },
    ];

    const startIndex = currentPage * rowCount;
    const displayLogs = logsData.slice(startIndex, startIndex + rowCount);
    return (
        <>
            <Box component="table" sx={tableStyles.table}>
                <Box component="thead" sx={tableStyles.tHead}>
                    <Box component="tr">
                        {tableColumns.map(({ dataKey, id, name, width }) => (
                            <Box
                                align="left"
                                component="td"
                                key={id}
                                onClick={() => updateSortByColumn(dataKey)}
                                sx={{
                                    ...tableStyles.td,
                                    ...tableStyles.tableHeadeing,
                                    width,
                                }}
                                title={name}
                            >
                                <Box sx={tableStyles.heading}>
                                    {name}
                                    {orderByCol === dataKey && (
                                        <Box
                                            aria-label={sortOrder}
                                            component="span"
                                            sx={tableStyles.arrow}
                                        >
                                            {sortOrder === "asc" ? ">" : "<"}
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box component="tbody">
                    {displayLogs.map((log) => (
                        <Box
                            component="tr"
                            sx={{ borderBottom: "1px solid black" }}
                            key={log.logId}
                        >
                            {tableColumns.map(
                                ({ align = "left", id, dataKey, width }) => (
                                    <Box
                                        align={align}
                                        component="td"
                                        key={`${id}-${log.logId}`}
                                        sx={{ ...tableStyles.td, width }}
                                        title={log[dataKey]}
                                    >
                                        {log[dataKey]}
                                    </Box>
                                )
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>
            {displayLogs.length === 0 && (
                <Box sx={{ textAlign: "center", py: 1 }}>No results Found</Box>
            )}
        </>
    );
};

export default DataTable;
