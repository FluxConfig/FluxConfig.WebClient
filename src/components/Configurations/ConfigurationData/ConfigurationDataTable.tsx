import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Select, TextField, Checkbox, IconButton,
    MenuItem, useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ConfigurationDataUnit } from '../../../app/Interfaces/State/configurationDataState';

interface ConfigurationDataTableProps {
    data: ConfigurationDataUnit[];
    selectedRows: number[];
    onDataChange: (index: number, field: string, value: string) => void;
    onAddRow: () => void;
    onSelectRows: (selected: number[]) => void;
}

function ConfigurationDataTable({
                                    data, selectedRows, onDataChange, onAddRow, onSelectRows
                                }: ConfigurationDataTableProps) {
    const theme = useTheme();
    const allSelected = data.length > 0 && selectedRows.length === data.length;

    const handleSelectAll = () => {
        if (allSelected) {
            onSelectRows([]);
        } else {
            onSelectRows(data.map(item => item.id));
        }
    };

    const handleSelectRow = (id: number) => {
        const selectedIndex = selectedRows.indexOf(id);
        let newSelected: number[];

        if (selectedIndex === -1) {
            newSelected = [...selectedRows, id];
        } else {
            newSelected = selectedRows.filter(item => item !== id);
        }

        onSelectRows(newSelected);
    };

    return (
        <div style={{ overflowX: 'auto' }}>
            <TableContainer component={Paper}>
                <Table size="small" sx={{ minWidth: 600 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox" sx={{ width: '48px' }}>
                                <Checkbox
                                    size="small"
                                    color="error"
                                    indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                                    checked={allSelected}
                                    onChange={handleSelectAll}
                                />
                            </TableCell>
                            <TableCell sx={{ minWidth: 200 }}>Key</TableCell>
                            <TableCell sx={{ minWidth: 200 }}>Value</TableCell>
                            <TableCell sx={{ minWidth: 120, maxWidth: 160 }}>Type</TableCell>
                            <TableCell sx={{ width: '48px' }}>
                                <IconButton onClick={onAddRow} color="secondary" size="small">
                                    <AddIcon fontSize="small" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell padding="checkbox" sx={{ width: '48px' }}>
                                    <Checkbox
                                        size="small"
                                        color="error"
                                        checked={selectedRows.includes(item.id)}
                                        onChange={() => handleSelectRow(item.id)}
                                    />
                                </TableCell>
                                <TableCell sx={{ minWidth: 200 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={item.key}
                                        onChange={(e) => onDataChange(index, 'key', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell sx={{ minWidth: 200 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={item.value}
                                        onChange={(e) => onDataChange(index, 'value', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell sx={{ minWidth: 120, maxWidth: 160 }}>
                                    <Select
                                        fullWidth
                                        size="small"
                                        value={item.type}
                                        onChange={(e) => onDataChange(index, 'type', e.target.value)}
                                        sx={{
                                            maxWidth: '100%',
                                            '& .MuiSelect-select': {
                                                padding: theme.spacing(1),
                                            }
                                        }}
                                    >
                                        <MenuItem value="String">String</MenuItem>
                                        <MenuItem value="Number">Number</MenuItem>
                                        <MenuItem value="Bool">Bool</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell sx={{ width: '48px' }} />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ConfigurationDataTable;