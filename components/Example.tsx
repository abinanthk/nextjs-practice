"use client";

import React from "react";
import { apiClient, BaseIn, BaseOut } from "@/api";
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useDebouncedState, useDebouncedTransition } from "@/hooks";

class UserRecordData {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
    geo?: {
      lat?: string;
      lng?: string;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name?: string;
    catchPhrase?: string;
    bs?: string;
  };
}

class GetUserOut extends BaseOut<UserRecordData> {}

class GetUserIn extends BaseIn {
  id?: number;
}

const getUserApi = async ({ queryKey }: QueryFunctionContext) => {
  console.log("queryKey : ", queryKey);

  try {
    const data = await apiClient.get<GetUserIn, GetUserOut>("/users", {
      params: {
        name: queryKey[1],
      },
    });

    console.log("success : ", data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const ExampleGet = () => {
  const [value, setValue, debouncedValue] = useDebouncedState("");
  const query = useQuery({
    queryKey: ["get-users", debouncedValue],
    queryFn: getUserApi,
  });

  const handleClick = async () => {};

  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>{JSON.stringify(query.error)}</div>;
  }

  const handleSearchChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input value={value} onChange={handleSearchChange} />
      <button onClick={handleClick}>click</button>
      <div>
        {/* {query.data?.map((record) => {
          return <div key={record.id}>{record.name}</div>;
        })} */}
      </div>
    </div>
  );
};

class AddUserIn extends BaseIn {
  name?: string;
  username?: string;
  email?: string;
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
  };
  phone?: string;
  website?: string;
  company?: {
    name?: string;
    catchPhrase?: string;
    bs?: string;
  };
}

class AddUserOut extends BaseOut {}

export const ExamplePost = () => {
  const query = useMutation({
    mutationKey: ["add-users"],
    mutationFn: async (input: AddUserIn) => {
      try {
        const data = await apiClient.post<AddUserIn, AddUserOut>(
          "/users",
          input
        );

        console.log("success : ", data);
        return data;
      } catch (error) {
        throw error;
      }
    },
  });

  const handleClick = async () => {
    const input = new AddUserIn();

    input.assign_({
      name: "Jane Doe",
      username: "janedoe",
      email: "jane@example.com",
      address: {
        street: "Main St",
        suite: "Apt. 1",
        city: "Metropolis",
        zipcode: "12345",
      },
      phone: "123-456-7890",
      website: "janedoe.com",
      company: {
        name: "Jane Co",
        catchPhrase: "Innovate the future",
        bs: "business strategy",
      },
    });

    query.mutate(input);
  };

  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>{JSON.stringify(query.error)}</div>;
  }

  return (
    <div>
      <button onClick={handleClick}>click</button>
      <div>{JSON.stringify(query.data)}</div>
    </div>
  );
};
