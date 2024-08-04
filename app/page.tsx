import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const Home = async () => {
  const session = await auth();

  const showSession = () => {
    if (session) {
      return redirect("/dashboard");
    } else {
      return redirect("/login");
    }
  };
  return (
    <main className="min-h-screen flex flex-col w-full h-full items-center">
      <div className="flex max-w-4xl items-center flex-col"></div>
      {showSession()}
    </main>
  );
};

export default Home;
