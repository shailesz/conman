import React from "react";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";

function Contact({ icon, color, label, data, onClick = () => {} }) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
      onClick={onClick}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{data.Name}</Text>
      </Group>
    </UnstyledButton>
  );
}

export default Contact;
