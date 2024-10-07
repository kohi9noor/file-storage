"use client";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  SignInButton,
} from "@clerk/nextjs";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

const Home = () => {
  const createFile = useMutation(api.file.createFile);

  const files = useQuery(api.file.getFiles);

  const handleCreateFile = async () => {
    try {
      await createFile({
        name: "Hello world",
      });
      alert("File created successfully");
    } catch (error) {
      console.error("Error creating file:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <SignedIn>
        <SignOutButton>
          <Button>Sign out</Button>
        </SignOutButton>
      </SignedIn>

      <SignedOut>
        <SignInButton>
          <Button>Sign in</Button>
        </SignInButton>
      </SignedOut>

      <Button onClick={handleCreateFile}>Click Me</Button>

      {files ? (
        <ul>
          {files.map((file) => (
            <li key={file._id}>{file.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading files...</p>
      )}
    </main>
  );
};

export default Home;
