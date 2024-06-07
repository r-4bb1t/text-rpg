import { useCallback, useEffect, useState } from "react";

import Header from "./components/header";
import Input from "./components/input";
import Logs from "./components/logs";
import Monster from "./components/monster";
import Status from "./components/status";
import { useData } from "./store/store";
import { josa } from "es-hangul";

function App(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [moving, setMoving] = useState(false);

  const { user, addLog, map, reset } = useData();

  const setDefaultLogs = useCallback(() => {
    setLoading(true);
    map.startLogs.forEach((log, i) => {
      setTimeout(() => {
        addLog({
          text: log,
          type: "system",
          changes: [],
        });
        if (i === map.startLogs.length - 1) {
          setLoading(false);
        }
      }, 1500 * i);
    });
  }, [map, user]);

  useEffect(() => {
    setDefaultLogs();
  }, [map]);

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

  return (
    <main className="text-primary flex h-screen w-full flex-col gap-4 overflow-hidden bg-gray-950 p-12">
      <Status />
      <Header />
      <Monster setMoving={setMoving} moving={moving} />
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
