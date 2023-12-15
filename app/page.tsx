"use client";
import Navbar from "@/components/Navbar";
import { Button, H2, H4, Input } from "@/components/ui";
import { useToast } from "@/components/ui/use-toast";
import { hashNodeAPI } from "@/lib/hashnode";
import { ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [posts, setPosts] = useState<any[]>([]);

  const onSubmit = async () => {
    if (!userName) return;
    setPosts([]);
    setIsLoading(true);
    const query = `
      query GetUserArticles($page: Int!) {
        user(username: "${userName}") {
          publication {
            posts(page: $page) {
              title
              brief
              slug
              coverImage
              contentMarkdown
            }
          }
        }
      }
      `;
    const variables = {
      page: 0,
    };
    const { data } = await hashNodeAPI(query, variables);
    console.log(data);

    if (data?.user?.publication?.posts) {
      setPosts(data.user.publication.posts);
    } else {
      toast({
        variant: "destructive",
        title: "Error finding data or user",
        description: "User doesn't exists or don't have any posts.",
      });
    }
    setIsLoading(false);
  };

  const _renderPosts = useCallback(() => {
    if (isLoading) return <Loader2 className="animate-spin" />;

    if (posts.length > 0) {
      return posts.map((post) => (
        <div
          key={post.slug}
          className="mt-2 border rounded p-4 flex items-center hover:bg-zinc-900 hover:cursor-pointer"
        >
          <div className="w-1/2">
            <Image
              height={220}
              width={220}
              src={post.coverImage}
              className="rounded"
              alt={post.slug}
            />
          </div>
          <div className="ml-3">
            <H4>{post.title}</H4>
            <p className="text-sm text-ellipsis text-slate-300">{post.brief}</p>
          </div>
          <div>
            <ChevronRight className="ml-5 text-gray-400" />
          </div>
        </div>
      ));
    }
    return (
      <div className="border rounded-sm p-10 flex justify-center">
        No posts to display. Search user name
      </div>
    );
  }, [posts, isLoading]);

  // useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     const currentUser = await fetch(
  //       `/api/user/get?email=${session?.user?.email}`,
  //       {
  //         method: "GET",
  //       }
  //     );
  //     const parsedUser = await currentUser.json();
  //     console.log(parsedUser);
  //     saveUserOnLocalStorage(parsedUser);
  //   };

  //   fetchCurrentUser();
  // }, [session]);
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center p-10 ">
        {/* @ts-ignore */}
        <div className="flex justify-between w-4/5">
          <Input
            value={userName}
            placeholder="Enter your Hashnode username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <Button onClick={onSubmit} className="ml-5">
            Submit
          </Button>
        </div>
        <div className="w-4/5 mt-6 align-middle">
          {_renderPosts()}
        </div>
      </div>
    </>
  );
}
