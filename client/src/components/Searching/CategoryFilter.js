import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default ({ setCategory, category }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={"Baked Goods"}>Baked Goods</MenuItem>
          <MenuItem value={"Soup"}>Soup</MenuItem>
          <MenuItem value={"AppetizersSides"}>AppetizersSides</MenuItem>
          <MenuItem value={"Pizza"}>Pizza</MenuItem>
          <MenuItem value={"Salads"}>Salads</MenuItem>
          <MenuItem value={"Burgers"}>Burgers</MenuItem>
          <MenuItem value={"Sandwiches"}>Sandwiches</MenuItem>
          <MenuItem value={"Entrees"}>Entrees</MenuItem>
          <MenuItem value={"ToppingsIngredients"}>ToppingsIngredients</MenuItem>
          <MenuItem value={"Beverages"}>Beverages</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
