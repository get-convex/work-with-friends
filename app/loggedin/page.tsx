"use client";

import { Code } from "@/components/typography/code";
import { Link } from "@/components/typography/link";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Skeleton } from "@/components/ui/skeleton";
import { FormEvent, useRef, useState } from "react";
import { Dashboard } from "@/components/dashboard";

export default function LoggedInHome() {
  const [spaceName, setSpaceName] = useState("");
  const [spaceCapacity, setSpaceCapacity] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>();

  const fileInput = useRef<HTMLInputElement>(null);

  const generatedUploadUrl = useMutation(api.spaces.generateUploadUrl);

  const { viewer, numbers } =
    useQuery(api.myFunctions.listNumbers, {
      count: 10,
    }) ?? {};
  const addNumber = useMutation(api.myFunctions.addNumber);

  const addSpace = useMutation(api.spaces.addSpace);

  const { spaceOwner, spaces } =
    useQuery(api.spaces.listSpaces, {
      count: 10,
    }) ?? {};

  if (viewer === undefined || numbers === undefined) {
    return (
      <>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </>
    );
  }

  async function handleSendImage(event: FormEvent) {
    event.preventDefault();

    // Step 1: Get a short-lived upload URL
    const postUrl = await generatedUploadUrl();
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": selectedFile!.type },
      body: selectedFile,
    });
    const { storageId } = await result.json();
    // Step 3: Save the newly allocated storage id to the database
    //await sendImage({ storageId, author: name });

    console.log(storageId);

    setSelectedFile(null);
    fileInput.current!.value = "";

    return;
  }

  return <Dashboard />;

  return (
    <>
      <p className="mt-8">Welcome {viewer ?? "N/A"}!</p>
      <p>
        Click the button below and open this page in another window - this data
        is persisted in the Convex cloud database!
      </p>
      <p>
        <Button
          onClick={() => {
            void addNumber({ value: Math.floor(Math.random() * 10) });
          }}
        >
          Add a random number
        </Button>
      </p>
      <p>
        Numbers:{" "}
        {numbers?.length === 0
          ? "Click the button!"
          : numbers?.join(", ") ?? "..."}
      </p>
      <p>
        Spaces: <br />
        {spaces?.length === 0
          ? "Space available"
          : spaces?.map((space) => {
              return (
                <>
                  {space.name}
                  <br />
                </>
              );
            }) ?? "..."}
      </p>
      <p>
        <input
          type="text"
          placeholder="Space name"
          onChange={(event) => {
            setSpaceName(event.target.value);
            setSpaceCapacity;
          }}
        />
        <input
          type="number"
          placeholder="Space capacity"
          onChange={(event) => {
            setSpaceCapacity(Number(event.target.value));
          }}
        />

        <form
          onSubmit={(event) => {
            handleSendImage(event);
          }}
        >
          <input
            type="file"
            accept="image/*"
            ref={fileInput}
            onChange={(event) => setSelectedFile(event.target.files![0])}
          />
          <input type="submit" value="Send Image" />
        </form>

        <Button
          onClick={() => {
            void addSpace({
              name: spaceName,
              capacity: 10,
            });
          }}
        >
          Create a new space
        </Button>
      </p>
      <p>
        <Link href="/loggedin/preloaded">
          Same example, but with preloading on the server
        </Link>
      </p>
      <p>
        Edit <Code>convex/myFunctions.ts</Code> to change your backend
      </p>
      <p>
        Edit <Code>app/(fullstack)/page.tsx</Code> to change your frontend
      </p>
      <p>
        Check out{" "}
        <Link target="_blank" href="https://docs.convex.dev/home">
          Convex docs
        </Link>
      </p>
      <p>
        To build a full page layout copy one of the included{" "}
        <Link target="_blank" href="/layouts">
          layouts
        </Link>
      </p>
    </>
  );
}
