import { Box, Button, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";

type SellItemForm = {
  name: string;
  description: string;
  price: string;
};

const SellAnItem: NextPage = () => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<SellItemForm>({
    initialValues: {
      name: "",
      description: "",
      price: "",
    },
  });

  const createListings = api.listings.create.useMutation();
  const listItemHandler = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      createListings.mutate({
        ...form.values,
        price: parseInt(form.values.price),
      });
      form.reset();
      router.replace("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maw={400} mx="auto">
      <Text size={50} align="center" mb={"xl"} weight={500}>
        Sell An Item
      </Text>
      <form onSubmit={listItemHandler}>
        <TextInput
          required
          label="Name"
          placeholder="Item Name"
          {...form.getInputProps("name")}
        />
        <TextInput
          required
          label="Description"
          placeholder="Description"
          mt="md"
          {...form.getInputProps("description")}
        />
        <TextInput
          required
          type="number"
          label="Price"
          placeholder="Item Price"
          mt="md"
          {...form.getInputProps("price")}
        />
        <Button
          loading={loading}
          disabled={loading}
          className="bg-blue-500"
          type="submit"
          mt="md"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default SellAnItem;
