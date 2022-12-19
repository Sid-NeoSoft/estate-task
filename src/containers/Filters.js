import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Dropdown from "../components/Dropdown";
import TextBox from "../components/TextBox";

const styles = {
    wrapper: {
        my: 1,
        display: "flex",
        flexWrap: {
            xs: "wrap",
            sm: "nowrap",
        },
    },
};

const Filters = ({
    actionType,
    actionTypes,
    applicationId,
    applicationType,
    applicationTypes,
    fromDate,
    logId,
    onFilterApply,
    onReset,
    toDate,
    updateFiltersData,
}) => {
    return (
        <>
            <Box sx={styles.wrapper}>
                <TextBox
                    label="Log ID"
                    value={logId}
                    onChange={(e) => updateFiltersData({ logId: e.target.value })}
                />
                <TextBox
                    label="Application ID"
                    value={applicationId}
                    onChange={(e) => updateFiltersData({ applicationId: e.target.value })}
                />
                <Dropdown
                    label="Action Types"
                    options={actionTypes}
                    value={actionType}
                    onChange={(e) => updateFiltersData({ actionType: e.target.value })}
                />
                <Dropdown
                    label="Application Type"
                    options={applicationTypes}
                    value={applicationType}
                    onChange={(e) => updateFiltersData({ applicationType: e.target.value })}
                />
            </Box>
            <Box sx={styles.wrapper}>
                <TextBox
                    label="From Date"
                    type="date"
                    value={fromDate}
                    inputProps={{ max: toDate }}
                    onChange={(e) => updateFiltersData({ fromDate: e.target.value })}
                />
                <TextBox
                    label="To Date"
                    type="date"
                    inputProps={{ min: fromDate }}
                    value={toDate}
                    onChange={(e) => updateFiltersData({ toDate: e.target.value })}
                />
            </Box>
            <Box sx={{ ...styles.wrapper, justifyContent: 'end', m: 1 }}>
                <Button variant="outlined" sx={{ mr: 1 }} onClick={onReset}>Reset</Button>
                <Button variant="outlined" onClick={onFilterApply}>Apply Filters</Button>
            </Box>
        </>
    );
};

export default Filters;
