import React from "react";
import { SquarePlus } from "tabler-icons-react";
import { AppShell, Navbar, Header, Group, ActionIcon } from "@mantine/core";
import MainLinks from "./MainLinks";
import User from "./User";
import { Logo } from "./Logo";

function Home() {
  return (
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
            <MainLinks />
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
            <ActionIcon variant="default" onClick={() => {}} size={30}>
              <SquarePlus size={16} />
            </ActionIcon>
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
      Your application goes here
    </AppShell>
  );
}

export default Home;
