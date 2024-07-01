import { LucideProps } from "lucide-react";

type Props = {
  metadata: {
    id: number;
    title: string;
    description: string | JSX.Element;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  };
};

export default function UVPCard({ metadata }: Props) {
  const { title, description, icon: CardIcon } = metadata;

  return (
    <div className="w-full h-full rounded-xl border border-foreground/10 p-4 flex flex-col items-start gap-4">
      <div className="flex items-center gap-3">
        <CardIcon className="text-blue-600" />

        <span className="font-medium">{title}</span>
      </div>

      <div className="text-foreground/70">{description}</div>
    </div>
  );
}
