import {
  SignInButton,
  SignUpButton,
  UserButton,
  useClerk,
  useUser,
} from "@clerk/nextjs";
import {
  createStyles,
  Header,
  Group,
  Button,
  Text,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();
  const { isSignedIn } = useUser();
  const { openSignUp, openSignIn } = useClerk();

  return (
    <Box pb={90}>
      <Header height={80} px="xl">
        <Group position="apart" sx={{ height: "100%" }}>
          <Link href="/">
            <Image
              src="/brand.svg"
              alt="brand"
              className="hidden lg:flex"
              width={200}
              height={200}
            />
            <Image
              src="/logo.svg"
              alt="logo"
              className="lg:hidden"
              width={50}
              height={50}
            />
          </Link>
          {isSignedIn ? (
            <Group spacing={20}>
              <Link href="/sell-an-item">
                <Text>Sell an Item</Text>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </Group>
          ) : (
            <>
              <Group className={classes.hiddenMobile}>
                <Button onClick={() => openSignIn()} variant="light">
                  Log in
                </Button>
                <Button onClick={() => openSignUp()} variant="default">
                  Sign up
                </Button>
              </Group>
              <Burger
                opened={drawerOpened}
                onClick={toggleDrawer}
                className={classes.hiddenDesktop}
              />
            </>
          )}
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            <Button
              onClick={() => {
                openSignIn();
                closeDrawer();
              }}
              variant="light"
            >
              Log in
            </Button>
            <Button
              onClick={() => {
                openSignUp();
                closeDrawer();
              }}
              variant="default"
            >
              Sign up
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
