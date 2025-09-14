import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useOutletContext } from "react-router-dom"; 

// ✅ Sample initial customers data
const initialCustomers = [
  { id: 267881, name: "Robert White", company: "DataCorp", status: "Active", progress: 85, delays: 0 },
  { id: 298762, name: "Chris Evans", company: "Techify", status: "Inactive", progress: 20, delays: 1 },
  { id: 238768, name: "Sarah Kim", company: "Innovate Inc.", status: "Active", progress: 100, delays: 0 },
  { id: 231344, name: "Jason Brown", company: "Solutions Co.", status: "Active", progress: 60, delays: 0 },
  { id: 254765, name: "Elizabeth Grey", company: "Tech Corp.", status: "Inactive", progress: 45, delays: 2 },
  { id: 298776, name: "Laura Green", company: "Data Systems", status: "Active", progress: 95, delays: 0 }
];

const Customers = () => {
  // ✅ Getting search query from parent (Topbar via Outlet)
  const { searchQuery } = useOutletContext();

  // ✅ States
  const [customers, setCustomers] = useState(initialCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState(initialCustomers);
  const [editingCustomer, setEditingCustomer] = useState(null); // store customer being edited
  const [addingCustomer, setAddingCustomer] = useState(false);  // add dialog visibility
  const [newCustomerData, setNewCustomerData] = useState({
    name: "",
    company: "",
    status: "Active",
    progress: 0,
    delays: 0,
  });

  // ✅ Filter customers whenever search query changes
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const result = customers.filter(customer =>
      Object.values(customer).some(value =>
        String(value).toLowerCase().includes(lowercasedQuery)
      )
    );
    setFilteredCustomers(result);
  }, [searchQuery, customers]);

  // ================================
  // 👉 Add New Customer Handlers
  // ================================
  const handleAddClick = () => {
    setNewCustomerData({ name: "", company: "", status: "Active", progress: 0, delays: 0 });
    setAddingCustomer(true);
  };

  const handleAddClose = () => {
    setAddingCustomer(false);
    // reset form data when closing
    setNewCustomerData({ name: "", company: "", status: "Active", progress: 0, delays: 0 });
  };

  const handleAddSave = () => {
    const customerToAdd = {
      ...newCustomerData,
      id: Math.floor(Math.random() * 100000) + 100000, // random 6-digit ID
    };
    setCustomers(prev => [...prev, customerToAdd]); // add new customer
    handleAddClose();
  };

  // ================================
  // 👉 Edit Customer Handlers
  // ================================
  const handleEditClick = (customer) => setEditingCustomer({ ...customer });

  const handleSave = () => {
    setCustomers(prev => prev.map(c => (c.id === editingCustomer.id ? editingCustomer : c)));
    setEditingCustomer(null); // close dialog
  };

  const handleCancel = () => setEditingCustomer(null);

  // ================================
  // 👉 Helpers for color coding
  // ================================
  const getStatusColor = (status) => (status === "Active" ? "success" : "error");

  const getProgressColor = (progress) => {
    if (progress === 100) return "success";
    if (progress > 50) return "primary";
    return "warning";
  };

  return (
    <Container maxWidth={false} sx={{ py: 4, width: "100%" }}>
      {/* ================================
          Header Section
      ================================= */}
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
        flexDirection: { xs: "column", md: "row" } // responsive
      }}>
        <Typography variant="h4" component="h1" sx={{ mb: { xs: 2, md: 0 }, textAlign: "center" }}>
          Customers Dashboard 📊
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add New Customer
        </Button>
      </Box>

      {/* ================================
          Customers Table
      ================================= */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="customer table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Delays</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.company}</TableCell>
                <TableCell>
                  <Chip label={customer.status} color={getStatusColor(customer.status)} size="small" />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ width: "100%", mr: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={customer.progress}
                        color={getProgressColor(customer.progress)}
                      />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography variant="body2" color="text.secondary">{`${customer.progress}%`}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  {customer.delays > 0
                    ? <Chip label={`${customer.delays} Delays`} color="error" size="small" />
                    : "—"}
                </TableCell>
                <TableCell>
                  <IconButton color="secondary" size="small" onClick={() => handleEditClick(customer)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ================================
          Add Customer Dialog
      ================================= */}
      <Dialog open={addingCustomer} onClose={handleAddClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Add New Customer
          <IconButton onClick={handleAddClose} sx={{ float: "right" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField 
              fullWidth 
              label="Name" 
              value={newCustomerData.name}
              onChange={(e) => setNewCustomerData({ ...newCustomerData, name: e.target.value })} 
            />
            <TextField 
              fullWidth 
              label="Company" 
              value={newCustomerData.company}
              onChange={(e) => setNewCustomerData({ ...newCustomerData, company: e.target.value })} 
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={newCustomerData.status}
                onChange={(e) => setNewCustomerData({ ...newCustomerData, status: e.target.value })}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <TextField 
              fullWidth 
              label="Progress (%)" 
              type="number"
              value={newCustomerData.progress}
              onChange={(e) => setNewCustomerData({ ...newCustomerData, progress: parseInt(e.target.value, 10) || 0 })}
              InputProps={{ inputProps: { min: 0, max: 100 } }} 
            />
            <TextField 
              fullWidth 
              label="Delays" 
              type="number"
              value={newCustomerData.delays}
              onChange={(e) => setNewCustomerData({ ...newCustomerData, delays: parseInt(e.target.value, 10) || 0 })}
              InputProps={{ inputProps: { min: 0 } }} 
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} startIcon={<CancelIcon />}>Cancel</Button>
          <Button onClick={handleAddSave} startIcon={<SaveIcon />} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* ================================
          Edit Customer Dialog
      ================================= */}
      <Dialog open={!!editingCustomer} onClose={handleCancel} fullWidth maxWidth="sm">
        <DialogTitle>
          Edit Customer
          <IconButton onClick={handleCancel} sx={{ float: "right" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField 
              fullWidth 
              label="Name" 
              value={editingCustomer?.name ?? ""}
              onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })} 
            />
            <TextField 
              fullWidth 
              label="Company" 
              value={editingCustomer?.company ?? ""}
              onChange={(e) => setEditingCustomer({ ...editingCustomer, company: e.target.value })} 
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={editingCustomer?.status ?? "Active"}
                onChange={(e) => setEditingCustomer({ ...editingCustomer, status: e.target.value })}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <TextField 
              fullWidth 
              label="Progress (%)" 
              type="number"
              value={editingCustomer?.progress ?? ""}
              onChange={(e) => setEditingCustomer({ ...editingCustomer, progress: parseInt(e.target.value, 10) || 0 })}
              InputProps={{ inputProps: { min: 0, max: 100 } }} 
            />
            <TextField 
              fullWidth 
              label="Delays" 
              type="number"
              value={editingCustomer?.delays ?? ""}
              onChange={(e) => setEditingCustomer({ ...editingCustomer, delays: parseInt(e.target.value, 10) || 0 })}
              InputProps={{ inputProps: { min: 0 } }} 
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} startIcon={<CancelIcon />}>Cancel</Button>
          <Button onClick={handleSave} startIcon={<SaveIcon />} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Customers;
