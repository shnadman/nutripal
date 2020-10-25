// import React from "react";
// import makeStyles from "@material-ui/core/styles/makeStyles";
// import Typography from "@material-ui/core/Typography";
// import Step from "@material-ui/core/Step";
// import StepLabel from "@material-ui/core/StepLabel";
// import Stepper from "@material-ui/core/Stepper";
// import clsx from "clsx";
// import Check from "@material-ui/icons/Check";
// import SettingsIcon from "@material-ui/icons/Settings";
// import GroupAddIcon from "@material-ui/icons/GroupAdd";
// import VideoLabelIcon from "@material-ui/icons/VideoLabel";
// import StepConnector from "@material-ui/core/StepConnector";
// import Button from "@material-ui/core/Button";
//
// const QontoConnector = withStyles({
//   alternativeLabel: {
//     top: 10,
//     left: "calc(-50% + 16px)",
//     right: "calc(50% + 16px)",
//   },
//   active: {
//     "& $line": {
//       borderColor: "#784af4",
//     },
//   },
//   completed: {
//     "& $line": {
//       borderColor: "#784af4",
//     },
//   },
//   line: {
//     borderColor: "#eaeaf0",
//     borderTopWidth: 3,
//     borderRadius: 1,
//   },
// })(StepConnector);
//
// function ColorlibStepIcon(props) {
//   const classes = useColorlibStepIconStyles();
//   const { active, completed } = props;
//
//   const icons = {
//     1: <SettingsIcon />,
//     2: <GroupAddIcon />,
//     3: <VideoLabelIcon />,
//   };
//
//   return (
//     <div
//       className={clsx(classes.root, {
//         [classes.active]: active,
//         [classes.completed]: completed,
//       })}
//     >
//       {icons[String(props.icon)]}
//     </div>
//   );
// }
//
// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//   },
//   button: {
//     marginRight: theme.spacing(1),
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
// }));
//
// function getSteps() {
//   return ["Select campaign settings", "Create an ad group", "Create an ad"];
// }
//
// export default function CustomizedSteppers() {
//   const classes = useStyles();
//   const [activeStep, setActiveStep] = React.useState(1);
//   const steps = getSteps();
//
//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };
//
//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };
//
//   const handleReset = () => {
//     setActiveStep(0);
//   };
//
//   return (
//     <div className={classes.root}>
//       <Stepper alternativeLabel activeStep={activeStep}>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <Stepper
//         alternativeLabel
//         activeStep={activeStep}
//         connector={<QontoConnector />}
//       >
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <Stepper
//         alternativeLabel
//         activeStep={activeStep}
//         connector={<ColorlibConnector />}
//       >
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <div>
//         {activeStep === steps.length ? (
//           <div>
//             <Typography className={classes.instructions}>
//               All steps completed - you&apos;re finished
//             </Typography>
//             <Button onClick={handleReset} className={classes.button}>
//               Reset
//             </Button>
//           </div>
//         ) : (
//           <div>
//             <Typography className={classes.instructions}>
//               {getStepContent(activeStep)}
//             </Typography>
//             <div>
//               <Button
//                 disabled={activeStep === 0}
//                 onClick={handleBack}
//                 className={classes.button}
//               >
//                 Back
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleNext}
//                 className={classes.button}
//               >
//                 {activeStep === steps.length - 1 ? "Finish" : "Next"}
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
