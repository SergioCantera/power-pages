import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  TextField
} from '@mui/material';
import {
  Add as AddIcon
} from '@mui/icons-material';

interface Lead {
  sample_accountid: number;
  sample_name: string;
  sample_type: string;
  sample_description: string;
  sample_amount: number;
}

const SalesLeads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [formData, setFormData] = useState<Partial<Lead>>({});

  const handleOpen = (lead?: Lead) => {
    if (lead) {
      setSelectedLead(lead);
      setFormData(lead);
    } else {
      setSelectedLead(null);
      setFormData({});
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLead(null);
    setFormData({});
  };

  const handleSubmit = async () => {
    try{
      const newLead: Lead = {
        sample_accountid: leads.length + 1,
        sample_name: formData.sample_name || '',
        sample_type: formData.sample_type || '',
        sample_description: formData.sample_description || '',
        sample_amount: formData.sample_amount || 0,
      };
      const response = await fetch('/_api/sample_salesleads',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'OData-MaxVersion': '4.0',
            'OData-Version': '4.0'
          },
          body: JSON.stringify(newLead),
        }
      );
      if (!response.ok){
        throw new Error(`Failed to create a new Lead`)
      }
    setLeads([...leads, newLead]);
    } catch (err) {

    } finally {
      //doing common actions like setUpdating, close modal, etc
      handleClose();
    }
  };

  const fetchLeads = async () => {
    try {
      const response = await fetch(
        "/_api/sample_salesleads?$select=sample_accountid,sample_name,sample_type,sample_description,sample_amount");

      if (response.status === 403) {
        setIsUnauthorized(true);
        return [];
      }

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json();
      const leads = data.value;
      const returnData: Lead[] = [];

      for (let i = 0; i < leads.length; i++) {
        const lead = leads[i];
        const sample_accountid = lead.sample_accountid;
        const sample_name = lead.sample_name;
        const sample_type = lead.sample_type;
        const sample_description = lead.sample_description;
        const sample_amount = lead.sample_amount;
        returnData.push({ sample_accountid, sample_name, sample_type, sample_description, sample_amount });
      }

      return returnData;
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  };

  React.useEffect(() => {
    const loadLeads = async () => {
      try {
        setIsLoading(true);
        setIsUnauthorized(false);
        const leads = await fetchLeads();
        setLeads(leads);
      } catch (error) {
        console.error('Error fetching leads:', error);
        // You might want to show an error state here
      } finally {
        setIsLoading(false);
      }
    };
    loadLeads();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Sales Leads
        </Typography>
        {!isLoading && (
          <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpen()}
            >
            Add Lead
          </Button>
        )}
      </Box>

      {isUnauthorized && (
        <Alert severity="error" sx={{ mb: 2 }}>
          You are not authorized to view this data. Please contact your administrator.
        </Alert>
      )}

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Account Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.sample_accountid}>
                  <TableCell>{lead.sample_accountid}</TableCell>
                  <TableCell>{lead.sample_name}</TableCell>
                  <TableCell>{lead.sample_type}</TableCell>
                  <TableCell>{lead.sample_description}</TableCell>
                  <TableCell>{lead.sample_amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedLead ? 'Edit Customer' : 'Add New Customer'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={formData.sample_name || ''}
            onChange={(e) => setFormData({ ...formData, sample_name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Type"
            type="string"
            fullWidth
            value={formData.sample_type || ''}
            onChange={(e) => setFormData({ ...formData, sample_type: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={formData.sample_description || ''}
            onChange={(e) => setFormData({ ...formData, sample_description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={formData.sample_amount || 0}
            onChange={(e) => setFormData({ ...formData, sample_amount: parseFloat(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedLead ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SalesLeads;
