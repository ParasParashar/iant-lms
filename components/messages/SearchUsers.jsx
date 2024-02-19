"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { searchUserByName } from "@/actions/user.actions";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import UserAvatar from "./UserAvatar";

const SearchUsers = ({ children }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [result, setResult] = useState([]);
  // searchUser function
  async function searchUser() {
    const data = await searchUserByName(search);
    setResult(data);
  }
  // using debounce to create latency in search
  const debounce = useDebounce(searchUser, 200);
  useEffect(() => {
    debounce();
  }, [search]);
  const handleClick = (id) => {
    router.push(`/messages/${id}`);
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search User</DialogTitle>
          <DialogDescription>
            <input
              autoFocus
              className="w-full rounded-lg border-none outline-none text-lg p-1   bg-secondary "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search User"
            />
            {result?.length > 0 ? (
              <div className="flex transition-all duration-300 ease-in-out  flex-col gap-2 mt-2 p-1">
                {result?.slice(0, 3)?.map((item) => (
                  <section
                    href={`/messages/${item._id}`}
                    key={item._id}
                    onClick={() => handleClick(item._id)}
                    className="flex cursor-pointer items-center  gap-1 hover:bg-secondary rounded-lg shadow-inner px-2 p-1 hover:border-blue-400 border-2  bg-zinc-100 dark:bg-slate-900  font-mono"
                  >
                    <UserAvatar name={item.name} />
                    <div className="flex flex-col items-start">
                      <p className="text-lg font-light text-primary">
                        {item.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.email}
                      </p>
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <p className="text-lg text-muted-foreground mt-4 text-center">
                No User Found
              </p>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SearchUsers;
