import { useData } from "../store/store";
import { icons } from "lucide-react";

export default function Header(): JSX.Element {
  const { map } = useData();
  return (
    <header className="flex items-center justify-between">
      <div>
        {map.name}
        <div className="text-sm">{map.description}</div>
      </div>
      <div className="flex items-center gap-2">
        {map.environments.map((env) => {
          const Icon = icons[env.icon as keyof typeof icons];
          return (
            <div
              key={env.name}
              className="group relative flex items-center justify-center"
            >
              <Icon className="stroke-1" size={24} />
              <div className="hover">{env.name}</div>
            </div>
          );
        })}
      </div>
    </header>
  );
}
