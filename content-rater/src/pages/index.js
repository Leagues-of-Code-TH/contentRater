import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Grid, Text, Button, Input, Spacer } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/router";
import logoPic from "/public/logo.png";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();
  return (
    <Grid.Container gap={2} css={{ p: 120 }}>
      <Grid xs={12}>
        <Image src={logoPic} alt="logo" width={300} height={50} />
      </Grid>
      <Grid xs={12}>
        <Text h1> สวัสดีครับ กรุณากรอกชื่อด้วยนะ</Text>
      </Grid>
      <Grid direction="column" xs={4}>
          <Input
            placeholder="ชื่อ"
            xl
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Spacer y={2} />
          <Button
            type="submit"
            color="gradient"
            onClick={(e) => {
              if (name === "") {
                alert("กรุณากรอกชื่อด้วยนะครับ");
                return;
              }
              router.push(`/questions?name=${name}`);
            }}
          >
            ไปต่อ
          </Button>
      </Grid>
    </Grid.Container>
  );
}
