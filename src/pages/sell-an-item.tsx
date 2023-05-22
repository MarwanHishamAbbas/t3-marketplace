import { Box, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { NextPage } from "next";
import { FormEvent, useState } from "react";
import { api } from "~/utils/api";

const SellAnItem: NextPage = () => {
  const [loading, setIsLoading] = useState<boolean>(false);
  type SellItemForm = {
    name: string;
    description: string;
    price: number;
  };

  const form = useForm<SellItemForm>({
    initialValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  const createListings = api.listings.create.useMutation();
  const listItemHandler = (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      createListings.mutate({ ...form.values });
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maw={400} mx="auto">
      <form onSubmit={listItemHandler}>
        <TextInput
          label="Name"
          placeholder="Item Name"
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Item Description"
          placeholder="Description"
          mt="md"
          {...form.getInputProps("description")}
        />
        <TextInput
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
