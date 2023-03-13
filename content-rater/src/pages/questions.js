import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";
import {
  Grid,
  Pagination,
  Text,
  Radio,
  Button,
  Divider,
  Spacer,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import logoPic from "/public/logo.png";
export default function Questions({ answers }) {
  const router = useRouter();
  const { name } = router.query;
  const [page, setPage] = useState(1);
  const [rating, setRating] = useState({});
  const [questionFields, setQuestionFields] = useState({
    title: "",
    format: "",
    description: "",
  });
  const [isSelect, setIsSelect] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    if (!Object.keys(rating).includes(page.toString())) {
      setIsSelect(false);
    } else {
      setIsSelect(true);
    }
    setQuestionFields({
      title: answers[page - 1].title,
      format: answers[page - 1].format,
      description: answers[page - 1].description,
    });
  }, [page]);
  const submitHandler = async () => {
    // Change object to JSON
    supabase
    .from('ResultScores')
    .insert([
      { name: name, score: rating },
    ]).then((e) => {
      router.push('/result')
    })
  };
  return (
    <Grid.Container gap={2} css={{ pl: 120 }}>
      <Grid xs={12}>
        <Image src={logoPic} alt="logo" width={300} height={50} />
      </Grid>
      <Grid xs={1}>
        <Text h4 css={{ marginBlockStart: 24 }}>
          {" "}
          หัวข้อ:{" "}
        </Text>
      </Grid>
      <Grid xs={11}>
        <Text h1> {questionFields.title} </Text>
      </Grid>
      <Grid xs={1}>
        <Text h4> รูปแบบ: </Text>
      </Grid>
      <Grid xs={11}>
        <Text h4> {questionFields.format} </Text>
      </Grid>
      <Grid xs={1}>
        <Text h4> คำอธิบาย: </Text>
      </Grid>
      <Grid xs={11} direction="column" css={{ paddingBottom: 0 }}>
        <Text p> {questionFields.description} </Text>
        <Spacer y={2} />
      </Grid>
      <Grid xs={12} direction="column">
        <Radio.Group
          label="ให้คะแนนได้เลยนะ"
          orientation="horizontal"
          color="success"
          onChange={(val) => {
            setIsSelect(true);
            setRating({ ...rating, [page]: val });
          }}
        >
          <Radio value="1">1</Radio>
          <Radio value="2">2</Radio>
          <Radio value="3">3</Radio>
          <Radio value="4">4</Radio>
          <Radio value="5">5</Radio>
        </Radio.Group>
        {!isSelect && (
          <Text p size={12} color="error">
            {" "}
            กรุณาเลือกคะแนน{" "}
          </Text>
        )}
      </Grid>
      <Grid xs={12}>
        <Pagination
          color="gradient"
          total={answers.length}
          page={page}
          onChange={(e) => setPage(e)}
        />
      </Grid>
      <Grid xs={1} direction="column">
        <Button
          color="gradient"
          disabled={Object.keys(rating).length !== answers.length}
          onClick={submitHandler}
          auto
        >
          {" "}
          ส่ง{" "}
        </Button>
        <Text p size={12} color="error">
          {" "}
          {errorMsg}{" "}
        </Text>
      </Grid>
    </Grid.Container>
  );
}

export const getServerSideProps = async (context) => {
  let { data, error } = await supabase.from("Answers2").select("*");

  return {
    props: {
      answers: data,
    },
  };
};
