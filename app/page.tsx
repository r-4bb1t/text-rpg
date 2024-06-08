"use client";

import { useEffect, useState } from "react";

import Header from "./components/header";
import Input from "./components/input";
import Logs from "./components/logs";
import Monster from "./components/monster";
import Status from "./components/status";
import { useData } from "./store/store";
import { josa } from "es-hangul";

function App(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [moving, setMoving] = useState(false);

  const { user, addLog, reset, map } = useData();

  useEffect(() => {
    if (user.hp <= 0) {
      setLoading(true);
      setTimeout(
        () =>
          addLog({
            text: `${josa(user.name, "은/는")} 쓰러졌다...`,
            type: "system",
            changes: [],
          }),
        1000,
      );
      setTimeout(() => {
        reset();
      }, 3000);
    }
  }, [user.hp, user.name, addLog]);

  useEffect(() => {
    if (!localStorage.getItem("store"))
      map.startLogs.forEach((log, i) => {
        setTimeout(
          () => {
            addLog({
              text: log,
              type: "system",
              changes: [],
            });
            if (i === map.startLogs.length - 1) {
              setLoading(false);
            }
          },
          1000 + 1500 * i,
        );
      });
  }, []);

  return (
    <main className="flex h-screen w-full max-w-5xl flex-col gap-4 overflow-hidden p-12 pt-16">
      <Status />
      <Header />
      <Monster setMoving={setMoving} moving={moving} setLoading={setLoading} />
      <Logs />
      <Input
        loading={loading}
        setLoading={setLoading}
        setMoving={setMoving}
        moving={moving}
      />
    </main>
  );
}

export default App;
