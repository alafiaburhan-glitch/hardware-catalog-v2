import pneumaticBrassFittingsData from "@/data/pneumaticBrassFittings.generated.json";

export type PneumaticBrassFitting = {
  id: string;
  name: string;
  slug: string;
  code: string;
  category: "pneumatic-brass-fittings";
  description: string;
  image: string;
  specifications: Record<string, string>;
};

export const pneumaticBrassFittings =
  pneumaticBrassFittingsData as PneumaticBrassFitting[];

export function getPneumaticBrassFitting(slug: string) {
  return pneumaticBrassFittings.find((product) => product.slug === slug);
}
