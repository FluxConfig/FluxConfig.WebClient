import { useEffect, useState } from 'react';
import ConfigurationDataTable from './ConfigurationDataTable';
import {Alert, AlertTitle, Box, CircularProgress} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {
    clearUpdateDataSuccess, clearUpdateDateError,
    loadConfigurationDataAsync,
    updateConfigurationDataAsync
} from "../../../app/storeSlices/configurationDataSlice.ts";
import {ConfigurationDataType} from "../../../app/Interfaces/State/configurationDataState.ts";
import {ConfigurationDataControls} from "./ConfigurationDataControls.tsx";

interface ConfigurationDataSectionProps {
    configurationId: number;
    tagId: number;
    dataType: ConfigurationDataType;
}

function ConfigurationDataSection({ configurationId, tagId, dataType }: ConfigurationDataSectionProps) {
    const dispatch = useAppDispatch();
    const {
        selectedConfigurationData,
        isLoading,
        error,
        isUpdateDataLoading,
        updateDataError,
        updateDataSuccess
    } = useAppSelector((state) => state.configuration_data);

    const [localData, setLocalData] = useState(selectedConfigurationData);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const totalPages = Math.ceil(localData.length / rowsPerPage);
    const currentData = localData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );


    useEffect(() => {
        const fetchData = async () => {
            await dispatch(loadConfigurationDataAsync({
                configuration_id: configurationId,
                tag_id: tagId,
                data_type: dataType
            })).unwrap();
        }

        fetchData().catch(console.error);
    }, [dispatch, configurationId, dataType, tagId]);

    useEffect(() => {
        setLocalData(selectedConfigurationData);
    }, [selectedConfigurationData]);

    useEffect(() => {
        if (updateDataSuccess) {
            const timer = setTimeout(() => {
                dispatch(clearUpdateDataSuccess());
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [updateDataSuccess, updateDataError, dispatch]);

    const handleDataChange = (index: number, field: string, value: string) => {
        const newData = [...localData];
        const actualIndex = (currentPage - 1) * rowsPerPage + index;
        newData[actualIndex] = { ...newData[actualIndex], [field]: value };
        if (updateDataError) {
            dispatch(clearUpdateDateError());
        }
        setLocalData(newData);
    };

    const handleAddRow = () => {
        const newRow = {
            id: Date.now(),
            key: '',
            value: '',
            type: 'String'
        };
        setLocalData([...localData, newRow]);
    };

    const handleDeleteRows = () => {
        const newData = localData.filter(item => !selectedRows.includes(item.id));
        setLocalData(newData);
        setSelectedRows([]);
        if (currentPage > Math.ceil(newData.length / rowsPerPage)) {
            setCurrentPage(Math.ceil(newData.length / rowsPerPage) || 1);
        }
    };

    const handleUpdateData = async () => {
        const result = await dispatch(updateConfigurationDataAsync({
            configuration_id: configurationId,
            tag_id: tagId,
            data_type: dataType,
            data: localData
        }));

        if (updateConfigurationDataAsync.fulfilled.match(result)) {
            dispatch(loadConfigurationDataAsync({
                configuration_id: configurationId,
                tag_id: tagId,
                data_type: dataType
            }));
        }
    };

    return (
            <>
                {isLoading ? (
                    <Box minHeight="30vh" display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress color="secondary"/>
                    </Box>
                ) : error ? (
                    <Box minHeight="20vh" display="flex" justifyContent="center" alignItems="center">
                        <Alert
                            severity="error"
                            sx={{
                                border: "1px solid",
                                borderColor: "divider",
                                maxWidth: 600
                            }}
                        >
                            <AlertTitle>Unable to load configuration data.</AlertTitle>
                            {error}
                        </Alert>
                    </Box>
                ) : (
                    <>
                        {updateDataError && (
                            <Alert severity="error" sx={{ my: 2 }}>
                                {updateDataError}
                            </Alert>
                        )}
                        {updateDataSuccess && (
                            <Alert severity="success" sx={{ my: 2 }}>
                                {updateDataSuccess}
                            </Alert>
                        )}

                        <ConfigurationDataControls
                            data={localData}
                            currentPage={currentPage}
                            rowsPerPage={rowsPerPage}
                            selectedRows={selectedRows}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            onRowsPerPageChange={setRowsPerPage}
                            onUpdateData={handleUpdateData}
                            onDeleteSelected={handleDeleteRows}
                            isUpdating={isUpdateDataLoading}
                        />

                        <ConfigurationDataTable
                            data={currentData}
                            onDataChange={handleDataChange}
                            onAddRow={handleAddRow}
                            selectedRows={selectedRows}
                            onSelectRows={setSelectedRows}
                        />
                    </>
                )}
        </>
    );
}

export default ConfigurationDataSection;