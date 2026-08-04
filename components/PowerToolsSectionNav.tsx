import Link from "next/link";

const sections = [
  {
    name: "Power Tools",
    href: "/categories/power-tools",
    description: "Machines grouped by tool family, with all available brands and models.",
  },
  {
    name: "Accessories",
    href: "/categories/power-tools/accessories",
    description: "Blades, wheels, bits, chisels, pads, hoses and other power-tool accessories.",
  },
  {
    name: "Spare Parts",
    href: "/categories/power-tools/spare-parts",
    description: "Replacement parts for angle grinders, drills, breakers and related machines.",
  },
] as const;

type PowerToolsSection = "power-tools" | "accessories" | "spare-parts";

export default function PowerToolsSectionNav({ activeSection }: { activeSection: PowerToolsSection }) {
  return (
    <nav aria-label="Power tools sections" className="grid gap-4 md:grid-cols-3">
      {sections.map((section) => {
        const sectionKey = section.href.split("/").at(-1) as PowerToolsSection;
        const isActive = sectionKey === activeSection;

        return (
          <Link
            key={section.href}
            href={section.href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-red-300 ${
              isActive ? "border-red-600 bg-red-50 ring-1 ring-red-600" : "border-gray-200 bg-white"
            }`}
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold">{section.name}</h2>
              {isActive && (
                <span className="rounded-full bg-red-700 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Selected
                </span>
              )}
            </div>
            <p className="text-sm leading-6 text-gray-600">{section.description}</p>
          </Link>
        );
      })}
    </nav>
  );
}
