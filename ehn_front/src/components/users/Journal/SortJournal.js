import React, { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';


const SortJournal = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  }

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  }

  const handleAction = (event) => {
    handleOnChange(event);
    handleClose();
  }

  const handleOnChange = (event) => {
    const sortKey = event.currentTarget.dataset.value;
    props.sortJournalHandler(sortKey);
  }

  return (
    <div>
      <Button id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}>
        <i className="fa-solid fa-arrow-down-wide-short fa-2x sort-button"
            style= {{ textDecoration: 'none',
                      textTransform: 'none',
                      color: '#8A8A8A'}}></i>
        <span className= "text-3xl font-bold sort-button"
              style= {{ textDecoration: 'none',
                        textTransform: 'none',
                        color: '#8A8A8A',
                        }}>
          Sort </span>
      </Button>
      <span className= "text-3xl font-bold sort-button"
              style= {{ textDecoration: 'none',
                        textTransform: 'none',
                        color: '#8A8A8A'}}>
          by: {props.sort} </span>

      <Menu id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            value={props.sort}
            PaperProps={{ style: { left: '50%',
                                    transform: 'translateX(0%) translateY(-20%)',
                                  }
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            MenuListProps={{'aria-labelledby': 'basic-button'}}>
        {
          props.sortGenre.map((genre, index) => {
            return(
              <MenuItem onClick={handleAction}
                        style= {{ color:"#8A8A8A",
                                  textTransform: 'uppercase'}}
                        data-value={genre}
                        key={index}>

                {genre}
              </MenuItem>
            );
        })
        }
      </Menu>
    </div>
  )
}

export default SortJournal;