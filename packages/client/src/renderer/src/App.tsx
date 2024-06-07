import { useCallback, useEffect, useState } from "react";

import Header from "./components/header";
import Input from "./components/input";
import Logs from "./components/logs";
import Status from "./components/status";
import { useData } from "./store/store";
import { replaceLog } from "./utils/log";

function App(): JSX.Element {
  const [loading, setLoading] = useState(true);

  const { user, addLog, map } = useData();

  const setDefaultLogs = useCallback(() => {
    setLoading(true);
    map.startLogs.forEach((log, i) => {
      setTimeout(() => {
        addLog({
          text: replaceLog(log, user.name, map.name),
          type: "system",
          changes: [],
        });
        if (i === map.startLogs.length - 1) {
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
      <Header />
      <Logs />
      <Input loading={loading} setLoading={setLoading} />
    </div>
  );
}

export default App;
