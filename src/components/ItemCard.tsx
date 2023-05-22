import { useUser } from "@clerk/nextjs";
import {
  Card,
  Text,
  Group,
  createStyles,
  Button,
  rem,
  Badge,
} from "@mantine/core";
import Link from "next/link";
import type { FC } from "react";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

interface ItemCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  username: string;
}

export const ItemCard: FC<ItemCardProps> = ({
  id,
  name,
  description,
  price,
  username,
}) => {
  const { classes } = useStyles();
  const { isSignedIn } = useUser();

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Badge>{username}</Badge>
      <Group position="apart" my={20}>
        <div>
          <Text fw={500}>{name}</Text>
          <Text fz="xs" c="dimmed">
            {description}
          </Text>
        </div>
      </Group>
      <Card.Section className={classes.section}>
        <Group spacing={50} position="apart">
          <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
            ${price}
          </Text>
          {isSignedIn && (
            <Link href={`/listings/${id}`}>
              <Button className="bg-blue-500" radius="lg">
                Buy Now
              </Button>
            </Link>
          )}
        </Group>
      </Card.Section>
    </Card>
  );
};
