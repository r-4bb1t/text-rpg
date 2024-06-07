import { useCallback, useEffect, useState } from "react";

import Header from "./components/header";
import Input from "./components/input";
import Logs from "./components/logs";
import Status from "./components/status";
import { useData } from "./store/store";
import { replaceLog } from "./utils/log";

import { MAPS, maps } from "@shared/maps";

function App(): JSX.Element {
  const [map, setMap] = useState<keyof typeof MAPS>(MAPS.START);
  const [loading, setLoading] = useState(true);

  const { user, addLog } = useData();

  const setDefaultLogs = useCallback(() => {
    setLoading(true);
    maps[map].defaultLog.forEach((log, i) => {
      setTimeout(() => {
        addLog({
          text: replaceLog(log, user.name, maps[map].title),
          type: "system",
          changes: [],
        });
        if (i === maps[map].defaultLog.length - 1) {
          setLoading(false);
        }
      }, 1000 * i);
    });
  }, [map, user]);

  useEffect(() => {
    setDefaultLogs();
  }, [map]);

  return (
    <div className="text-primary flex h-screen w-full flex-col gap-4 overflow-hidden bg-gray-950 p-12">
      <Status />
      <Header map={map} />
      <Logs />
      <Input
        map={map}
        setMap={setMap}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}

export default App;
