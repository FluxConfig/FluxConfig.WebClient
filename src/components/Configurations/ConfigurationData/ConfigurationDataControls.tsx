import { Box, Button, CircularProgress, Pagination, Select, MenuItem, Typography } from '@mui/material';
import {ConfigurationDataUnit} from "../../../app/Interfaces/State/configurationDataState.ts";

interface ConfigurationDataControlsProps {
    data: ConfigurationDataUnit[];
    currentPage: number;
    rowsPerPage: number;
    selectedRows: number[];
    totalPages: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rows: number) => void;
    onUpdateData: () => void;
    onDeleteSelected: () => void;
    isUpdating: boolean;
}

export function ConfigurationDataControls({
                                              currentPage,
                                              rowsPerPage,
                                              selectedRows,
                                              totalPages,
                                              onPageChange,
                                              onRowsPerPageChange,
                                              onUpdateData,
                                              onDeleteSelected,
                                              isUpdating
                                          }: ConfigurationDataControlsProps) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {selectedRows.length > 0 && (
                    <>
                        <Typography variant="body2">
                            Selected: {selectedRows.length}
                        </Typography>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={onDeleteSelected}
                            size="small"
                        >
                            Delete Selected
                        </Button>
                    </>
                )}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Select
                    value={rowsPerPage}
                    onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
                    size="small"
                >
                    <MenuItem value={10}>10 rows</MenuItem>
                    <MenuItem value={20}>20 rows</MenuItem>
                    <MenuItem value={50}>50 rows</MenuItem>
                </Select>

                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, page) => onPageChange(page)}
                    color="secondary"
                    size="small"
                    variant="outlined"
                />

                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={onUpdateData}
                    disabled={isUpdating}
                >
                    {isUpdating ? <CircularProgress size={24} /> : 'Update Data'}
                </Button>
            </Box>
        </Box>
    );
}