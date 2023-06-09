/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { clerkClient } from "@clerk/nextjs";
import {
  Badge,
  Button,
  Container,
  Space,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Comment } from "~/components/layout/MessageCard";

import { api } from "~/utils/api";

const ListingPage: NextPage = () => {
  const [messageContent, setMessageContent] = useState<string>("");
  const router = useRouter();
  const listing = api.listings.get.useQuery(
    { listingId: router.query.id as string },
    { enabled: !!router.query.id }
  );
  const messages = api.listings.getMessages.useQuery();
  const sendMessage = api.listings.sendMessage.useMutation();
  const sendMessageHandler = () => {
    try {
      sendMessage.mutate({
        content: messageContent,
        listingId: router.query.id as string,
      });
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Badge>@marwahiisham@gmail.com</Badge>
        <Title>{listing.data?.name}</Title>
        <Text>{listing.data?.description}</Text>
        <Text>$ {listing.data?.price}</Text>
        <form className="mt-20" onSubmit={sendMessageHandler}>
          <Textarea
            placeholder="Leave a message"
            label="Your Message"
            onChange={(e) => setMessageContent(e.target.value)}
          />
          <Button className="bg-blue-500" type="submit" mt="md">
            Send
          </Button>
        </form>
        <Space h={50} />
        <Stack>
          {messages.data?.map((message) => (
            <Comment
              key={message.id}
              message={message.content}
              fromUsername={message.fromUsername}
            />
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default ListingPage;
