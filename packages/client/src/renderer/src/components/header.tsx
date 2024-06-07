import { environments } from "@shared/environments";
import { MAPS, maps } from "@shared/maps";

export default function Header({
  map,
}: {
  map: keyof typeof MAPS;
}): JSX.Element {
  return (
    <header className="flex items-center justify-between">
      <div>
        {maps[map].title}
        <div className="text-sm">{maps[map].description}</div>
      </div>
      <div className="flex items-center gap-2">
        {maps[map].environments.map((env) => {
          const Icon = environments[env].icon;
          return (
            <div
              key={environments[env].name}
              className="group relative flex items-center justify-center"
            >
              <Icon className="stroke-1" size={24} />
              <div className="text-primary border-primary absolute bottom-[calc(100%+0.5rem)] whitespace-nowrap border bg-gray-950 px-3 py-0.5 text-sm opacity-0 group-hover:opacity-100">
                {environments[env].name}
              </div>
            </div>
          );
        })}
      </div>
    </header>
  );
}
