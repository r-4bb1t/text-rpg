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
              <div className="text-primary border-primary absolute bottom-[calc(100%+0.5rem)] whitespace-nowrap border bg-gray-950 px-3 py-0.5 text-sm opacity-0 group-hover:opacity-100">
                {env.name}
              </div>
            </div>
          );
        })}
      </div>
    </header>
  );
}
