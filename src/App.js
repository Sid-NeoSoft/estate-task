/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { orderBy } from "lodash";
import { Pagination } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import DataTable from "./containers/DataTable";
import Filters from "./containers/Filters";
import "./App.css";
import { useLocation } from "react-router-dom";
import history from "./history";

const styles = {
    wrapper: {
        my: 2,
        p: 1,
        border: "1px solid whitesmoke",
        borderRadius: 1,
    },
};

const defaultTableFilters = {
    logId: "",
    applicationId: "",
    actionType: "",
    applicationType: "",
    fromDate: "",
    toDate: "",
};

const App = () => {
    const location = useLocation();
    const [defaultData, updateDefaultData] = useState([]);
    const [logsData, updateLogsData] = useState([]);
    const [tableConfigs, updateConfigs] = useState({
        currentPage: 0, orderByCol: "logId", rowCount: 10, sortOrder: "asc", loading: 'true',
    });
    const [tableFilters, updateFilters] = useState(defaultTableFilters);
    const [allDropdowns, updateDropDowns] = useState({ actionTypes: [], applicationTypes: [] })

    const { currentPage, loading, orderByCol, rowCount, sortOrder } = tableConfigs;

    const updateConfigsData = (obj) => {
        updateConfigs((dt) => ({ ...dt, ...obj }));
    };

    const updateFiltersData = (obj) => {
        updateFilters((dt) => ({ ...dt, ...obj }));
    };

    const sortByColumn = (currentData) => {
        updateLogsData(orderBy(currentData, [orderByCol], [sortOrder]));
    }

    const fetchAllLogs = async () => {
        const data = await axios.get(
            "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f"
        );
        const allLogs = data.data.result.auditLog;
        let actionTypes = [], applicationTypes = [];
        allLogs.forEach(({ actionType, applicationType }) => {
            if (actionType !== null) {
                actionTypes.push(actionType);
            }
            if (applicationType !== null) {
                applicationTypes.push(applicationType);
            }
        });
        updateDropDowns({
            actionTypes: ['', ...new Set(actionTypes)],
            applicationTypes: ['', ...new Set(applicationTypes)]
        })
        const queryParams = new URLSearchParams(location.search);
        let obj = {};
        Object.keys(defaultTableFilters).forEach((val) => {
            obj = { ...obj, [val]: queryParams.get(val) || '' }
        })
        const newLogs = getFilteredData(obj, allLogs);
        updateFiltersData(obj);
        updateDefaultData(allLogs);
        sortByColumn(newLogs);
        updateConfigsData({ loading: false })
    };

    const updateHistoryUrl = (config, onReset) => {
        const nonEmptyValue = Object.keys(config).filter((val) => tableFilters[val].trim() !== '');
        let search = '';
        nonEmptyValue.forEach((val, ix) => {
            search += ix === 0 ? `${val}=${config[val]}` : `&${val}=${config[val]}`
        })
        history.replace({ search: onReset ? '' : search })
    }

    const getFilteredData = (filters, data = defaultData) => {
        const { toDate, fromDate, ...rest } = filters;
        const nonEmptyValue = Object.keys(rest).filter((val) => (filters[val] || '').trim() !== '');
        let newLogs = [ ...data ];
        if (nonEmptyValue.length > 0) {
            newLogs = newLogs.filter((curLog) =>  {
                let status = true;
                nonEmptyValue.forEach((val) => {
                    status = status && (`${curLog[val]}` === `${(filters[val] || '').trim()}`)
                })
                return status;
            });
        }
        if (toDate !== '' || fromDate !== '') {
            const toDateWithZero = new Date(toDate).setHours(0,0,0,0)
            const fromDateWithZero = new Date(fromDate).setHours(0,0,0,0)
            newLogs = newLogs.filter(({ creationTimestamp }) => {
                const curDate = new Date(creationTimestamp).setHours(0,0,0,0)
                if (toDate !== '' && fromDate !== '') {
                    return (curDate - fromDateWithZero) >= 0 && (curDate - toDateWithZero) <= 0
                } else if (toDate !== '') {
                    return (curDate - toDateWithZero) <= 0;
                }
                return (curDate - fromDateWithZero) >= 0;
            })
        }
        return newLogs;
    }

    const onFilterApply = (onReset) => {
        const filters = onReset ? defaultTableFilters : tableFilters;
        const newLogs = getFilteredData(filters);
        if (onReset) {
            updateFilters(defaultTableFilters)
        }
        updateHistoryUrl(filters, onReset);
        updateConfigsData({ currentPage: 0 });
        sortByColumn(newLogs);
    }

    useEffect(() => {
        fetchAllLogs();
    }, []);


    useEffect(() => {
        sortByColumn(logsData);
    }, [orderByCol, sortOrder]);

    const tableProps = {
        currentPage,
        logsData,
        orderByCol,
        sortOrder,
        updateConfigsData,
    };

    return (
        <div className="app">
            {loading ? (
                <Box sx={{ textAlign: 'center '}}>Loading.....</Box>
            ) : (
                <>
                    <Box sx={styles.wrapper}>
                        <Filters
                            {...tableFilters}
                            {...allDropdowns}
                            onReset={() => onFilterApply(true)}
                            onFilterApply={() => onFilterApply()}
                            updateFiltersData={updateFiltersData}
                        />
                    </Box>
                    <DataTable {...tableProps} />
                    <Box sx={{ ...styles.wrapper, display: "flex", justifyContent: "center" }}>
                        <Pagination
                            page={currentPage + 1}
                            count={Math.ceil(logsData.length / rowCount)}
                            onChange={(e, page) => updateConfigsData({ currentPage: page - 1 })}
                            shape="rounded"
                            siblingCount={1}
                        />
                    </Box>
                </>
            )}
        </div>
    );
};

export default App;
