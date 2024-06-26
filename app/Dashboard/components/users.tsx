"use client"
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import prisma from "@/prisma";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import EditUserForm from "@/app/Dashboard/components/edituser";
import { ToastContainer } from 'react-toastify';
import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSWR from "swr";
import AddUserForm from "@/app/Dashboard/components/AddUserForm";


interface User {
    id: number;
    name: string | null; // Allow 'null' for 'fullName'
    email: string | null; // Allow 'null' for 'email'
    password?: string;
}




interface HeadCell {
    disablePadding: boolean;
    id: keyof User;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'id',
    },

    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Full Name',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
];

type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof User>(
    order: Order,
    orderBy: Key,
): (
    a: User,
    b: User,
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof User) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof User) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Users
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}
interface User {
    id: number;
    name: string | null;
    email: string | null;
}
interface UsersProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    handleUserDelete: (id: number) => void;
    refreshkey : number;
}



export default function EnhancedTable({ handleUserDelete,users,setUsers ,refreshkey }: UsersProps) {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof User>('id');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [dense, setDense] = React.useState(false);
    const [editingUser, setEditingUser] = React.useState<User | null>(null);
    const [isAddUserFormVisible, setIsAddUserFormVisible] = React.useState(false);
    const handleEdit = (user: User) => {
        setEditingUser(user);
        setRefreshKey((oldKey) => oldKey + 1);
    };

    const [refreshKey, setRefreshKey] = React.useState(0);

    const getUsers = async () => {
        const response = await fetch('/api/getusers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-store"
        });
        const usersFromDb = await response.json();
        setUsers(usersFromDb);
    };

    React.useEffect(() => {
        getUsers();
    }, [refreshKey]); // Add refreshKey to the dependency array


    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof User,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = users.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;
    const handleDelete = async (id: number) => {
        const toastLoadingId = toast.loading("Waiting for confirmation...");

        try {
            const confirmDelete = await toast.promise(
                new Promise<void>((resolve, reject) => {
                    const deleteUser = async () => {
                        try {
                            // Call the handleUserDelete function from props
                            handleUserDelete(id);

                            // Show success message
                            toast.success('User deleted successfully');


                            // Resolve the promise
                            resolve();

                            // Dismiss the confirmation prompt
                            toast.dismiss(toastLoadingId);
                        } catch (error) {
                            toast.error('Failed to delete user');
                            console.error('Failed to delete user:', error);
                            reject();
                        }
                    };

                    const confirmationJSX = (
                        <div>
                            <p>Are you sure you want to delete this user?</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
                                    onClick={() => {
                                        toast.dismiss(toastLoadingId);
                                        reject();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                                    onClick={deleteUser}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    );

                    toast.update(toastLoadingId, {
                        render: confirmationJSX,
                        type: "info",
                        isLoading: false,
                        autoClose: false,
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: false,
                    });
                }),
                {
                    pending: "Waiting for confirmation...",
                }
            );

            await confirmDelete;

        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    return (

        <div className="container mx-auto px-4 py-8">
            <div className="overflow-x-auto">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon/>}
                        onClick={() => setIsAddUserFormVisible(true)}
                    >
                        Add User
                    </Button>
                </div>
                <div className="bg-white shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <Checkbox
                                    color="primary"
                                    indeterminate={selected.length > 0 && selected.length < users.length}
                                    checked={users.length > 0 && selected.length === users.length}
                                    onChange={handleSelectAllClick}
                                />
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {users
                            .slice()
                            .sort(getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user, index) => {
                                const isItemSelected = isSelected(user.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <tr
                                        key={user.id}
                                        className={`${isItemSelected ? 'bg-gray-100' : ''} hover:bg-gray-50 cursor-pointer`}
                                        onClick={(event) => handleClick(event, user.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" id={labelId}>
                                            {user.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button className="text-blue-600 hover:text-blue-900 mr-2"
                                                    onClick={() => handleEdit(user)}>
                                                <FaEdit/>
                                            </button>
                                            <button className="text-red-600 hover:text-red-900"
                                                    onClick={() => handleDelete(user.id)}>
                                                <FaTrashAlt/>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {editingUser && (
                        <EditUserForm
                            user={editingUser}
                            onUpdate={(updatedUser) => {
                                setUsers(users.map((user) => user.id === updatedUser.id ? updatedUser : user));
                                setEditingUser(null);
                            }}
                            onCancel={() => setEditingUser(null)} // Add this line
                        />
                    )}
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>

                </div>
            </div>
            {isAddUserFormVisible && (
                <AddUserForm
                    onCancel={() => setIsAddUserFormVisible(false)}
                    setUsers={setUsers}
                />
            )}
        </div>
    );
}

