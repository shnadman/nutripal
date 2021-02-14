import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default function SwitchLabels({ branded, setBranded }) {
  const handleChange = (event) => {
    setBranded(!branded);
  };

  return (
    <FormControlLabel
      control={
        <Switch checked={branded} onChange={handleChange} name="brand" />
      }
      label="Branded"
    />
  );
}
