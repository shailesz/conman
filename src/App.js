import logo from "./logo.svg";
import "./App.css";
import {
  Center,
  Card,
  TextInput,
  Button,
  Group,
  Box,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

function App() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div className="signin-card-wrapper">
      <Card shadow="sm" p="lg">
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
              <Button variant="light" color="pink" size="md">
                Signin
              </Button>
              <Button variant="light" color="grape" size="md">
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
