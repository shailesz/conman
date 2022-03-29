import React from "react";
import {
  AppShell,
  Navbar,
  Header,
  ActionIcon,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";

const ContactCard = ({
  contact,
  deleteContactCallback,
  editContactCallback,
}) => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ width: 340, margin: "auto" }}>
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image src={contact.photograph} height={160} alt="Norway" />
        </Card.Section>

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>{contact.name}</Text>
          {contact.favourite ? (
            <Badge color="pink" variant="light">
              On favourite list
            </Badge>
          ) : null}
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          {contact.phone}
        </Text>

        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
          onClick={editContactCallback}
        >
          Edit Contact
        </Button>
        <Button
          variant="light"
          color="red"
          fullWidth
          style={{ marginTop: 14 }}
          onClick={() => {
            deleteContactCallback(contact);
          }}
        >
          Delete Contact
        </Button>
      </Card>
    </div>
  );
};

export default ContactCard;
