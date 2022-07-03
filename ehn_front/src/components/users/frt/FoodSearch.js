import React, {useState, useEffect} from 'react';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

const FoodSearch = (props) => {
  const {searchHandler, searchKeyword} = props;
  const [search, setSearch] = useState(searchKeyword);
  
  const changeHandler = (e) => {
    setSearch(e.target.value);
  }

  const clickHandler = () => {
    searchHandler(search);
  }
  return (
    <div className="flex flex-row mx-4 mb-4 justify-center">
      <TextField label="Search"
                 className="sm:w-full w-4/5"
                 onChange={changeHandler}
                 defaultValue={`${props.searchKeyword}`}
                 onKeyPress={(e) => {
                   if (e.key === 'Enter') {
                     searchHandler(search);
                   }
                 }} />
      <div className="sm:hidden">
        <Button className="w-1/5 h-full border"
                style={{ backgroundColor:"#8FBDD3" }}
                onClick={clickHandler}>
          <i className="fa-solid fa-magnifying-glass fa-2x"></i>
        </Button>
      </div>
    </div>
  )
}

export default FoodSearch;