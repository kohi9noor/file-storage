"use client";
import { Button } from "@/components/ui/button";
import { useOrganization, useUser } from "@clerk/nextjs";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

const Home = () => {
  const organization = useOrganization();
  const user = useUser();
  const createFile = useMutation(api.file.createFile);

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.file.getFiles, orgId ? { orgId } : "skip");

  const handleCreateFile = async () => {
    if (!orgId) return;
    try {
      await createFile({
        name: "Hello world",
        orgId: orgId,
      });
      alert("File created successfully");
    } catch (error) {
      console.error("Error creating file:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
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
