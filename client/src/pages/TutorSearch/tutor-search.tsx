import React, { useState } from "react";
import { Box, FormControl, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import { Navbar } from "../../components/navbar/navbar";

export const TutorSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (event: SelectChangeEvent<string>) => {
    setFilter(event.target.value);
  };

  return(
    <>
      <Navbar />
      <Box display="flex" justifyContent="center" alignItems="center" marginTop="100px">
        <TextField
          id="search-bar"
          label="Search"
          variant="outlined"
          size="medium"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FormControl variant="outlined">
                  <Select value={filter} onChange={handleFilter} label="Filter" size="small">
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                    <MenuItem value="option3">Option 3</MenuItem>
                  </Select>
                </FormControl>
              </InputAdornment>
            ),
          }}
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>
    </>
  );
};
