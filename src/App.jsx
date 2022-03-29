import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import {
  Card,
  TextInput,
  Button,
  Group,
  Box,
  PasswordInput,
  Badge,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";

function App() {
  const [isAuth] = React.useState(localStorage.getItem("jwtToken"));
  const [{ isError, message }, setMessage] = React.useState({
    isError: false,
    message: "",
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, [isAuth]);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const submitLogin = async (values) => {
    const url = "http://localhost:4000/signin";
    try {
      const {
        data: {
          data: { token },
        },
      } = await axios.post(url, values);
      localStorage.setItem("jwtToken", token);
      navigate("/home");
    } catch (error) {
      if (error.response) {
        setMessage({ isError: true, message: error.response.data.message });
      } else {
        console.log(error);
      }
    }
  };

  const submitSignup = async (values) => {
    const url = "http://localhost:4000/signup";
    try {
      const {
        data: {
          data: { token },
        },
      } = await axios.post(url, values);
      localStorage.setItem("jwtToken", token);
      navigate("/home");
    } catch (error) {
      if (error.response) {
        setMessage({ isError: true, message: error.response.data.message });
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="signin-card-wrapper">
      <Card shadow="sm" p="lg">
        <Box sx={{ maxWidth: 300 }} mx="auto">
          {isError ? (
            <Box
              sx={(theme) => ({
                textAlign: "center",
              })}
            >
              <Badge color="orange">{message}</Badge>
            </Box>
          ) : null}
          <form>
            <TextInput
              required
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              required
              label="Password"
              placeholder="password"
              {...form.getInputProps("password")}
            />

            <Group position="center" mt="md">
              <Button
                type
                variant="light"
                color="pink"
                size="md"
                onClick={form.onSubmit(submitLogin)}
              >
                Signin
              </Button>
              <Button
                variant="light"
                color="grape"
                size="md"
                onClick={form.onSubmit(submitSignup)}
              >
                Signup
              </Button>
            </Group>
          </form>
        </Box>
      </Card>
    </div>
  );
}

export default App;
