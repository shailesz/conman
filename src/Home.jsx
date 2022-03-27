import React from "react";
import { SquarePlus, Logout, GitPullRequest } from "tabler-icons-react";
import {
  AppShell,
  Navbar,
  Header,
  ActionIcon,
  Modal,
  TextInput,
  Checkbox,
  Image,
  Button,
  Group,
  Box,
  MenuLabel,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import User from "./User";
import { Logo } from "./Logo";
import { addContact, getContacts } from "./services/contacts.service";
import Contact from "./Contact";
import ContactCard from "./components/card/ContactCard";
import CMDropzone from "./components/card/CMDropzone";

function Home() {
  const [contacts, setContacts] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [selectedContact, setSelectedContact] = React.useState({});
  const [opened, setOpened] = React.useState(false);
  const [image, setImage] = React.useState({
    file: undefined,
    isLoaded: false,
  });
  const [base64, setBase64] = React.useState("");

  React.useEffect(() => {
    getContacts().then(({ data: { results } }) => {
      setIsLoaded(true);
      setContacts(results);
    });
  }, []);

  React.useEffect(() => {
    const getImageString = (file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setBase64(reader.result);
      reader.onerror = (error) => {};
    };

    if (image.isLoaded) {
      getImageString(image.file);
    }
  }, [image]);

  const { getInputProps, onSubmit } = useForm({
    initialValues: {
      name: "",
      phone: "",
      photograph: "",
    },
  });

  return (
    <>
      <AppShell
        padding="md"
        navbar={
          <Navbar
            width={{ base: 300 }}
            height={500}
            p="xs"
            styles={(theme) => ({
              root: {
                height: "calc(100vh - 60px)",
              },
            })}
          >
            <Navbar.Section grow mt="xs">
              {contacts.map((contact, index) => (
                <Contact
                  key={index}
                  icon={<GitPullRequest size={16} />}
                  color="blue"
                  label="Pull Requests"
                  data={contact}
                  onClick={() => {
                    setSelectedContact(contact);
                  }}
                />
              ))}
            </Navbar.Section>
            <Navbar.Section>
              <User />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={60}>
            <Group sx={{ height: "100%" }} px={20} position="apart">
              <Logo />
              <Group sx={{ height: "100%" }} px={20} position="right">
                <ActionIcon
                  variant="default"
                  size={30}
                  onClick={() => {
                    setOpened(true);
                  }}
                >
                  <SquarePlus size={16} />
                </ActionIcon>
                <ActionIcon variant="default" onClick={() => {}} size={30}>
                  <Logout size={16} />
                </ActionIcon>
              </Group>
            </Group>
          </Header>
        }
        styles={(theme) => ({
          root: {
            height: "100vh",
          },
          body: { height: "100vh" },
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <ContactCard contact={selectedContact} />
      </AppShell>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        <Box mx="auto">
          <form
            onSubmit={onSubmit((values) => {
              const formData = new FormData();

              formData.append("images", image.file);
              formData.append("name", values.name);
              formData.append("phone", values.phone);

              addContact(formData).then(({ data: { data } }) => {
                setContacts([...contacts, data]);
              });
            })}
          >
            <TextInput
              required
              label="Name"
              placeholder="Enter name"
              {...getInputProps("name")}
            />
            <TextInput
              required
              label="Phone"
              placeholder="Enter phone"
              {...getInputProps("phone")}
            />
            <Group mt="md">
              {image.isLoaded ? (
                <Image radius="md" src={base64} alt="Random unsplash image" />
              ) : (
                <CMDropzone image={image} setImage={setImage} />
              )}
            </Group>
            <Group position="right" mt="md">
              <Button type="submit">Add Contact</Button>
            </Group>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default Home;
