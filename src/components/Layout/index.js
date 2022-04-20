
import { AppShell, Navbar, Header, Group, useMantineColorScheme, Title } from "@mantine/core";
import MainLinks from "./MainLinks";
import { Logo } from "./Logo";
import { Outlet } from "react-router-dom";


const Layout = () => {
    const { colorScheme } = useMantineColorScheme();

    return (
        <AppShell
            padding="md"
            navbar={
                <Navbar width={{ base: 150 }} height={500} p="xs">
                    <Navbar.Section grow mt="xs">
                        <MainLinks />
                    </Navbar.Section>
                </Navbar>
            }

            header={
                <Header height={60}>
                    <Group sx={{ height: "100%" }} px={20} position="left">
                        <Logo colorScheme={colorScheme} />
                        <Title order={3}>Vaccination Center</Title>
                    </Group>
                </Header>
            }
            styles={(theme) => ({
                main: {
                    height: "90vh",
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            })}
        >
            <Outlet />
        </AppShell>
    );
};

export default Layout