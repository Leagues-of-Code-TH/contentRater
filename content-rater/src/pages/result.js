import { Grid, Table, Text } from "@nextui-org/react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import logoPic from "/public/logo.png";
const Result = ({ scores, allQuestions }) => {
  const column_names = ["No.", "Title", "Avg. Score"];

  // Find average on each question numbers across all users
  console.log(scores, allQuestions);

  const TableCols = column_names.map((item) => {
    return <Table.Column>{item}</Table.Column>;
  });

  const TableRows = allQuestions.map((item, index) => {
    return (
      <Table.Row key={index}>
        <Table.Cell>{index+1}</Table.Cell>
        <Table.Cell>{item}</Table.Cell>
        <Table.Cell>{scores[index + 1]}</Table.Cell>
      </Table.Row>
    );
  });
  return (
    <Grid.Container gap={2}>
      <Grid xs={12}>
        <Image src={logoPic} alt="logo" width={300} height={50} />
      </Grid>
      <Grid xs={12}>
        <Text h2> ผลลัพธ์ </Text>
      </Grid>
      <Grid xs={12}>
        <Table
          sticked
          aria-label="Example static collection table"
          selectionMode="multiple"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>{TableCols}</Table.Header>
          <Table.Body>{TableRows}</Table.Body>
        </Table>
      </Grid>
    </Grid.Container>
  );
};

export default Result;

export const getServerSideProps = async (context) => {
  let { data } = await supabase.from("ResultScores").select("*");
  const questions = await supabase.from("Answers2").select("*");
  let scores = {};

  data.map((item) => {
    const current_score = item.score;
    Object.keys(current_score).map((key) => {
      if (scores[key]) {
        scores[key] = scores[key] + parseInt(current_score[key]);
      } else {
        scores[key] = parseInt(current_score[key]);
      }
    });
  });
  // find avg.
  Object.keys(scores).map((key) => {
    scores[key] = scores[key] / data.length;
  });

  const allQuestions = questions.data.map((item) => {
    return item.title;
  });

  return {
    props: {
      allQuestions: allQuestions,
      scores: scores,
    },
  };
};
