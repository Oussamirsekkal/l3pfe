import React from 'react';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Child {
    id: number;
    name: string;
    age: number;
}

interface ManageChildrenProps {
    onCancel: () => void;
    childs: Child[];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ManageChildren: React.FC<ManageChildrenProps> = ({ onCancel, childs }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onCancel}></div>
            <div className="relative bg-white rounded-lg max-w-screen-md mx-auto px-4 py-6 md:px-8">
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    onClick={onCancel}
                >
                    <FaTimes/>
                </button>
                <div
                    className="bg-slate-50 mx-auto mt-4 mb-10 flex w-full flex-wrap items-center space-x-4 py-4 md:mb-20 md:justify-center md:px-10">
                        <span
                            className="hidden h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white shadow md:inline-flex">1</span>
                    <span className="hidden text-teal-500 md:inline">Children</span>
                    <span className="hidden h-0.5 w-10 bg-teal-400 md:inline"></span>
                    <span
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow">2</span>
                    <span className="font-semibold text-blue-600 md:inline">manage children</span>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="right">Age</StyledTableCell>
                                <StyledTableCell align="right">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {childs.map((child) => (
                                <StyledTableRow key={child.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {child.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{child.age}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <button className="mr-2 text-blue-500 hover:text-blue-700">
                                            <FaEdit/>
                                        </button>
                                        <button className="text-red-500 hover:text-red-700">
                                            <FaTrash/>
                                        </button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default ManageChildren;