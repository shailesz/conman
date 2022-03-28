import React from "react";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import { Heart } from "tabler-icons-react";
import { updateFavourite } from "./services/contacts.service";

function Contact({
  icon,
  trailingIcon,
  color,
  label,
  data,
  favouriteCallback,
  onClick = () => {},
}) {
  const [heartFillcolor, setHeartFillColor] = React.useState(
    data.favourite ? "red" : "none"
  );

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
      <Group position="apart">
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm">{data.name}</Text>
        </Group>

        <Heart
          fill={heartFillcolor}
          size={16}
          onClick={(event) => {
            event.stopPropagation();
            updateFavourite(data.contactId, {
              favourite: !data.favourite,
            }).then(({ data: { data } }) => {
              favouriteCallback(data);
            });
          }}
          onMouseEnter={() => {
            setHeartFillColor("pink");
          }}
          onMouseLeave={() => {
            data.favourite
              ? setHeartFillColor("red")
              : setHeartFillColor("none");
          }}
        />
      </Group>
    </UnstyledButton>
  );
}

export default Contact;
