import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import React from "react";

export default function SwitchLabels({ branded, setBranded }) {
  const handleChange = () => {
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
