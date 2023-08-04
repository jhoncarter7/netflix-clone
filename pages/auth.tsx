import Input from "@/components/input";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
function Auth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [varient, setvarient] = useState("login");
  const router = useRouter();
  const toggleVarient = useCallback(() => {
    setvarient((currentVarient) =>
      currentVarient === "login" ? "signup" : "login"
    );
  }, []);
  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        name,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, router]);

  const register = useCallback(async () => {
    try {
      await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });
      login();
    } catch (error) {}
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover ">
      <div className="bg-black w-full h-full lg:bg-opacity-50 ">
        <nav>
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {varient === "login" ? "sign in" : "create new"}
            </h2>
            <div className="flex flex-col gap-4">
              {varient !== "login" && (
                <Input
                  id="name"
                  type="name"
                  label="username"
                  onChange={(ev: any) => setName(ev.target.value)}
                  value={name}
                />
              )}

              <Input
                id="email"
                type="email"
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                value={email}
              />

              <Input
                id="password"
                type="password"
                label="password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                value={password}
              />
            </div>
            <button
              onClick={varient === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {varient}
            </button>
            <div className="flex flex-row gap-4 mt-8 justify-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover: opacity-80 transition">
              <FcGoogle size={38} />
              </div>
              <div onClick={() => signIn('github', {callbackUrl: '/'})} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover: opacity-80 transition">
              <FaGithub size={38}  />
              </div>
      
            </div>
            <p className="text-neutral-500 mt-12">
              {varient === "login"
                ? " First Time using Netflix?"
                : "already have an account!"}
              <span
                onClick={toggleVarient}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {varient === "login" ? "create an account" : "sign-in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
