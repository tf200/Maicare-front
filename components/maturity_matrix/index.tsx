import { cn } from "@/utils/cn";
import { useDomains } from "@/utils/domains";

const GRADIENT_COLORS = [
  "bg-meta-7/[0.4]",
  "bg-meta-8/[0.4]",
  "bg-meta-8/[0.2]",
  "bg-meta-3/[0.2]",
  "bg-meta-3/[0.4]",
];

type ClientMaturityMatrixProps = {
  clientId: number;
};

const M_LEVELS = [
  "1 Acute problematiek",
  "2 Niet zelfredzaam",
  "3 Beperkt zelfredzaam",
  "4 Voldoende zelfredzaam",
  "5 Volledig zelfredzaam",
] as const;

export default function ClientMaturityMatrix({ clientId }: ClientMaturityMatrixProps) {
  const { data: domains, isLoading } = useDomains();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <table className="table-fixed w-full">
      <thead>
        <tr>
          <th className="border border-stroke bg-yellow-400 text-black text-lg">Domein</th>
          {M_LEVELS.map((level, index) => (
            <th
              className={cn(
                GRADIENT_COLORS[index],
                "px-5 py-2 border border-stroke w-1/6 text-black"
              )}
              key={level}
            >
              {level}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {domains.map((domain, index) => (
          <tr key={domain.name}>
            <td className="w-1/8 align-top border border-stroke p-2 font-bold bg-yellow-400 text-black text-lg">
              {domain.name}
            </td>
            {domain.levels.map((level) => (
              <td
                key={level.level}
                className="align-top w-1/6 border border-stroke whitespace-pre-wrap"
              >
                <MatrixColumn selected={Math.random() > 0.5}>
                  {parseAssessments(level.assessments).map((goal, index) => {
                    return <p key={index}>◾ {goal}</p>;
                  })}
                </MatrixColumn>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function parseAssessments(assessments: string) {
  try {
    return JSON.parse(assessments.replace(/'/g, '"'));
  } catch (error) {
    console.error("Invalid string format");
    return [];
  }
}

function MatrixColumn({
  children,
  selected = false,
}: {
  children: React.ReactNode;
  selected?: boolean;
}) {
  return (
    <div
      className={cn(
        " p-2 min-h-[250px]",
        selected && "border-4 border-dashed bg-purple-100 border-purple-300 text-black"
      )}
    >
      {children}
    </div>
  );
}
