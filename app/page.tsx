"use client";

import { useEffect, useState } from "react";

import MapHeader from "./components/header";
import Input from "./components/input";
import Logs from "./components/logs";
import Monster from "./components/monster";
import Status from "./components/status";
import { RESTARTMAP } from "./map";
import { useData } from "./store/store";
import { josa } from "es-hangul";
import { Sparkles } from "lucide-react";

function App(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [moving, setMoving] = useState(false);

  const { user, addLog, reset, map, move } = useData();

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
        move(RESTARTMAP);
      }, 3000);
    }
  }, [user.hp, user.name, addLog, reset, move]);

  useEffect(() => {
    const store = localStorage.getItem("store");
    if (!store || JSON.parse(store).state.logs.length === 0) {
      setLoading(true);
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
    }
  }, []);

  return (
    <main className="flex h-screen max-h-screen w-full max-w-5xl flex-col gap-4 px-4 pb-4 pt-20 md:px-8 md:pb-8 lg:px-12">
      <Status />
      <MapHeader />
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
