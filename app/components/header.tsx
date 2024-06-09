import { useData } from "../store/store";
import { icons } from "lucide-react";

export default function MapHeader(): JSX.Element {
  const { map } = useData();
  return (
    <div className="flex w-full flex-col justify-between gap-2 md:flex-row md:items-center">
      <div className="w-full text-sm">
        {map.name}
        <div className="text-xs">{map.description}</div>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {map.environments.map((env, i) => {
          const Icon = icons[env.icon as keyof typeof icons];
          if (!Icon) return <></>;
          return (
            <div key={i} className="flex items-center gap-2 text-sm">
              <Icon className="stroke-2" size={18} />
              {env.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
