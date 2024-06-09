import { useData } from "../store/store";
import { icons } from "lucide-react";

export default function MapHeader(): JSX.Element {
  const { map } = useData();
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="shrink-0 text-sm">
        {map.name}
        <div className="text-xs">{map.description}</div>
      </div>
      <div className="flex w-full shrink flex-wrap items-center gap-2">
        {map.environments.map((env) => {
          const Icon = icons[env.icon as keyof typeof icons];
          if (!Icon) return <></>;
          return (
            <div key={env.name} className="flex items-center gap-2 text-sm">
              <Icon className="stroke-2" size={20} />
              {env.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
