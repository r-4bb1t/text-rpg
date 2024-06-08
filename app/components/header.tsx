import { useData } from "../store/store";
import { icons } from "lucide-react";

export default function Header(): JSX.Element {
  const { map } = useData();
  return (
    <header className="flex items-center justify-between">
      <div className="text-sm">
        {map.name}
        <div className="text-xs">{map.description}</div>
      </div>
      <div className="flex items-center gap-2">
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
    </header>
  );
}
