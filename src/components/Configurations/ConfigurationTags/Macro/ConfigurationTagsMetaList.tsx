import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {Alert, AlertTitle, Box, CircularProgress, Pagination} from "@mui/material";
import Grid from "@mui/material/Grid";
import {getConfigurationTagsMetaAsync} from "../../../../app/storeSlices/configurationTagsSlice.ts";
import ConfigurationTagMetaItem from "./ConfigurationTagMetaItem.tsx";


function ConfigurationTagsMetaList({tagsPerPage, configurationId}: {tagsPerPage: number, configurationId: number}) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {error, isLoading, configurationTags} = useAppSelector((state) => state.configuration_tags);
    const dispatch = useAppDispatch();

    const totalTags = configurationTags.length;
    const totalPages = Math.ceil(totalTags / tagsPerPage);
    const startIndex = (currentPage - 1) * tagsPerPage;
    const endIndex = startIndex +tagsPerPage;

    const pageConfigurationTags = configurationTags.slice(startIndex, endIndex);

    useEffect(() => {
        const fetchTags = async () => {
            await dispatch(getConfigurationTagsMetaAsync({configuration_id: configurationId})).unwrap();
        }

        fetchTags().catch(console.error);
        setCurrentPage(1);
    }, [dispatch, configurationId]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        event.stopPropagation();
        setCurrentPage(page);
    };

    if (isLoading) {
        return (
            <Box minHeight="30vh" display="flex" justifyContent="center" alignItems="center">
                <CircularProgress color="secondary"/>
            </Box>
        );
    }

    if (error) {
        return (
            <Box minHeight="20vh" display="flex" justifyContent="center" alignItems="center">
                <Alert
                    severity="error"
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        maxWidth: 600
                    }}
                >
                    <AlertTitle>Unable to load configuration tags.</AlertTitle>
                    {error}
                </Alert>
            </Box>
        );
    }


    if (!error && configurationTags.length === 0){
        return (
            <Box  minHeight="20vh" display="flex" justifyContent="center" alignItems="center">
                <Alert
                    severity="info"
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        maxWidth: 600
                    }}
                >
                    <AlertTitle>Configuration doesn't have any tag.</AlertTitle>
                </Alert>
            </Box>
        );
    }


    return (
        <>
            <Grid
                container
                spacing={1}
                sx={{
                    flexGrow: 1,
                    overflow: 'auto',
                    pb: 1
                }}
            >
                {pageConfigurationTags.map((tag) => (
                    <ConfigurationTagMetaItem
                        key={tag.id}
                        tag={tag}
                    />
                ))}
            </Grid>

            <Box
                sx={{
                    position: 'sticky',
                    bottom: 0,
                    display: 'flex',
                    justifyContent: "center",
                    backgroundColor: 'background.default',
                    zIndex: 1,
                    py: 1,
                    borderTop: '1px solid',
                    borderColor: 'divider'
                }}
            ><Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="secondary"
                sx={{
                    '& .MuiPaginationItem-root': {
                        color: 'text.primary',
                        '&.Mui-selected': {
                            fontWeight: 'bold',
                        }
                    }
                }}
            />
            </Box>
        </>
    );
}

export default ConfigurationTagsMetaList;