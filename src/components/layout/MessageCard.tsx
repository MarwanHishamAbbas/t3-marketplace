import { createStyles, Text, Group, Paper, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
  },

  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));

interface CommentHtmlProps {
  message: string;
  fromUsername: string;
}

export function Comment({ message, fromUsername }: CommentHtmlProps) {
  const { classes } = useStyles();
  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        <div>
          <Text fz="sm">{fromUsername}</Text>
          <Text fz="xs" c="dimmed">
            {message}
          </Text>
        </div>
      </Group>
    </Paper>
  );
}
