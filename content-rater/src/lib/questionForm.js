import { Grid, Text } from "@nextui-org/react";

export const questionForm = ({ title, format, description }) => {
  <Grid xs={12}>
    <Text h2>{title}</Text>
    <Text>{description}</Text>
    <Text> {format} </Text>
  </Grid>;
};
