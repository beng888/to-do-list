import { useEffect, useState } from "react";
import { GiCheckMark } from "react-icons/gi";

import Input from "utils/Input";
import useGlobalContext from "context";

export default function WelcomeScreen() {
  const { user } = useGlobalContext(),
    [userValue, setUserValue] = user,
    [loading, setLoading] = useState(true),
    [reveal, setReveal] = useState(false),
    [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserValue({ ...userValue, email: email, done: [] });
    localStorage.setItem("userValue", JSON.stringify(userValue));
  };

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("userValue"));
    storageData && setUserValue(storageData);
    setLoading(false);
  }, []);

  userValue.email &&
    setTimeout(() => {
      setReveal(true);
    }, 2000);

  return (
    <div
      className={`${
        reveal && "opacity-0 pointer-events-none"
      } fixed inset-0 z-50 grid primary-bg duration-700 place-content-center`}
    >
      <div className="relative">
        {!loading && (
          <GiCheckMark
            className={`${
              userValue.email ? "right-1/2 translate-x-1/2 text-4xl" : "right-0"
            } transform absolute duration-700 text-xl text-white pointer-events-none`}
          />
        )}
        {!loading && (
          <form
            className={`flex gap-2 ${
              userValue.email &&
              "transform -translate-x-full duration-700 opacity-0"
            }`}
            autoComplete="off"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
              Enter your Email
            </Input>
            <button>
              <GiCheckMark className="opacity-0" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
