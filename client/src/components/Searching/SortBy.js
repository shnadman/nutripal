import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect({
  setSortBy,
  sortBy,
  ascending,
  setAscending,
}) {
  const classes = useStyles();

  const handleChange = (event) => {
    setSortBy(event.target.value);
    debugger;
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={sortBy}
          onChange={handleChange}
        >
          <MenuItem value="calories">
            <em>Calories</em>
          </MenuItem>
          <MenuItem value={"protein"}>Protein</MenuItem>
          <MenuItem value={"carbs"}>Carbs</MenuItem>
          <MenuItem value={"fat"}>Fat</MenuItem>
        </Select>
        <FormHelperText>Sorted by 'Calories' by default</FormHelperText>
      </FormControl>
      <IconButton onClick={() => setAscending(!ascending)}>
        {ascending ? <ArrowUpwardRoundedIcon /> : <ArrowDownwardRoundedIcon />}
      </IconButton>
    </div>
  );
}
