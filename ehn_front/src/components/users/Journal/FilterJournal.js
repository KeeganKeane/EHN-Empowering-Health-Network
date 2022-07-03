import React, { useState } from "react";
import Button from '@mui/material/Button';
import FilterDialog from "./FilterDialog";


const FilterJournal = (props) => {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    setOpen(true);
  }

  return (
    <div>
      <Button id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}>
        <i className="fa-solid fa-filter fa-2x sort-button"
            style= {{ textDecoration: 'none',
                      textTransform: 'none',
                      color: '#8A8A8A'}}></i>
        <span className= "text-3xl font-bold sort-button pl-2"
              style= {{ textDecoration: 'none',
                        textTransform: 'none',
                        color: '#8A8A8A',
                        }}>
          Filter </span>
      </Button>
      <FilterDialog isOpen={open}
                    handleClose={() => setOpen(false)}
                    setErrorFunc={(message) => setErrorMessage(message)}
                    filterFunc={(data) => props.filterJournalHandler(data)}/>
    </div>
  )
}

export default FilterJournal;