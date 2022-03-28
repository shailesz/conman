import React from "react";
import { SquarePlus, Logout, GitPullRequest, Check } from "tabler-icons-react";
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
import { useNavigate } from "react-router-dom";
import { addContact, getContacts } from "./services/contacts.service";
import Contact from "./Contact";
import ContactCard from "./components/card/ContactCard";
import CMDropzone from "./components/card/CMDropzone";
import { deleteContact, updateContact } from "./services/contacts.service";
import { useNotifications } from "@mantine/notifications";

function Home() {
  const [contacts, setContacts] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [selectedContact, setSelectedContact] = React.useState({});
  const [opened, setOpened] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [image, setImage] = React.useState({
    file: undefined,
    isLoaded: false,
  });
  const [base64, setBase64] = React.useState("");

  const notifications = useNotifications();
  const navigate = useNavigate();

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

  const { getInputProps, onSubmit, reset } = useForm({
    initialValues: {
      name: "",
      phone: "",
      photograph: "",
    },
  });

  const closeModal = () => {
    setOpened(false);
    setIsEdit(false);
    setImage({ file: undefined, isLoaded: false });
    reset();
  };

  const deleteContactCallback = (selectedContact) => {
    deleteContact(selectedContact.contactId);
    setContacts(contacts.filter((contact) => contact !== selectedContact));
    setSelectedContact({});
  };

  const isContactSelected = Object.keys(selectedContact).length > 0;

  const addContactOnSubmit = (values) => {
    const formData = new FormData();

    formData.append("images", image.file);
    formData.append("name", values.name);
    formData.append("phone", values.phone);

    addContact(formData).then(({ data: { data } }) => {
      setContacts([...contacts, data]);
      closeModal();
    });
  };

  const editContactOnSubmit = (values) => {
    const formData = new FormData();

    formData.append("images", image.file);
    formData.append("name", values.name);
    formData.append("phone", values.phone);

    updateContact(selectedContact.contactId, formData)
      .then(({ data: { data } }) => {
        const editedContacts = [...contacts];
        editedContacts.splice(contacts.indexOf(selectedContact), 1, data);
        setSelectedContact(editedContacts[contacts.indexOf(selectedContact)]);
        setContacts(editedContacts);
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const favouriteCallback = ({ contactId, favourite }) => {
    const [favouriteContact] = contacts.filter(
      (contact) => contact.contactId === parseInt(contactId)
    );

    const editedContacts = [...contacts];
    editedContacts.splice(contacts.indexOf(favouriteContact), 1, {
      ...favouriteContact,
      favourite,
    });
    setContacts(editedContacts);

    notifications.showNotification({
      autoClose: 2000,
      color: "teal",
      title: "success",
      message:
        "Hey there, your contact was " +
        (favourite ? "added to" : "removed from") +
        " favourites! 🤘",
    });
  };

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
                  favouriteCallback={favouriteCallback}
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
                <ActionIcon
                  variant="default"
                  onClick={() => {
                    localStorage.removeItem("jwtToken");
                    navigate("/");
                  }}
                  size={30}
                >
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
        {isContactSelected ? (
          <ContactCard
            contact={selectedContact}
            deleteContactCallback={deleteContactCallback}
            editContactCallback={() => {
              setIsEdit(true);
              setOpened(true);
            }}
          />
        ) : (
          "nothing to show here..."
        )}
      </AppShell>
      <Modal
        opened={opened}
        onClose={closeModal}
        title={isEdit ? "Edit Contact" : "Add Contact"}
      >
        <Box mx="auto">
          <form
            onSubmit={onSubmit(
              isEdit ? editContactOnSubmit : addContactOnSubmit
            )}
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
                <Image radius="md" src={base64} alt="Contact image" />
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
