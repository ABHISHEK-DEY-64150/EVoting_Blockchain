
////register
import { Form, Input, InputNumber, Button } from "antd";
import styles from "../styles/Home.module.css";
import Leftsidebarsubmitelectionid from "../components/Leftsidebarsubmitelectionid";


import { useRouter } from "next/router";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 12,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

export default function SubmitElectionId() {
  const router = useRouter();

  const onFinish = async (values) => {
    console.log(values);

    const { electionId } = values.user;

    const url = "http://localhost:3000/submitelectionid";

    const requestBody = {
     
      electionId: electionId
    };
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
    });

    const data = await response.json();
    console.log(data);
    if ("error" in data) {
      alert("No election Found");
    } else {
      await router.push("/seecandidate");
    }
  };

  return (
     <>
      <Leftsidebarsubmitelectionid/>
    <div className={styles.shadowbox5}>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "electionId"]}
          label="Enter election Id"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
       

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <button className={styles.button5} type="primary" htmltype="submit" >
            Submit
          </button>
        </Form.Item>
      </Form>
    </div>

       </>
  );
}
