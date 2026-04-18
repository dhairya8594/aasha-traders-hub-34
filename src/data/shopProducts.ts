export type ShopProduct = {
  id: string;
  name: string;
  category: "Industrial Cleaners" | "Lab Reagents" | "Agro Chemicals" | "Specialty Solvents";
  price: number;
  unit: string;
  packSize: string;
  rating: number;
  inStock: boolean;
  shortDescription: string;
  description: string;
  specs: { label: string; value: string }[];
  image: string;
};

export const shopProducts: ShopProduct[] = [
  {
    id: "ipa-99",
    name: "Isopropyl Alcohol 99% (IPA)",
    category: "Lab Reagents",
    price: 1450,
    unit: "₹",
    packSize: "5 Litre Can",
    rating: 4.8,
    inStock: true,
    shortDescription: "High-purity solvent ideal for electronics cleaning and lab use.",
    description:
      "Premium grade Isopropyl Alcohol 99% pure, suitable for laboratory, pharmaceutical, and electronics cleaning applications. Low residue and fast evaporation.",
    specs: [
      { label: "Purity", value: "99.9%" },
      { label: "CAS No.", value: "67-63-0" },
      { label: "Grade", value: "AR / LR" },
      { label: "Pack Size", value: "5 L" },
    ],
    image:
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "caustic-soda-flakes",
    name: "Caustic Soda Flakes",
    category: "Industrial Cleaners",
    price: 2800,
    unit: "₹",
    packSize: "25 kg Bag",
    rating: 4.6,
    inStock: true,
    shortDescription: "Commercial grade sodium hydroxide for industrial cleaning.",
    description:
      "High-quality caustic soda flakes used in soap manufacturing, paper, textile, and water treatment industries. Minimum 98% purity.",
    specs: [
      { label: "Purity", value: "98% min" },
      { label: "CAS No.", value: "1310-73-2" },
      { label: "Form", value: "Flakes" },
      { label: "Pack Size", value: "25 kg" },
    ],
    image:
      "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "citric-acid",
    name: "Citric Acid Monohydrate",
    category: "Lab Reagents",
    price: 950,
    unit: "₹",
    packSize: "1 kg Pack",
    rating: 4.9,
    inStock: true,
    shortDescription: "Food and pharma grade citric acid, multipurpose acidulant.",
    description:
      "Pure citric acid monohydrate used as a natural preservative, flavoring agent, and pH regulator in food, beverages, and pharma formulations.",
    specs: [
      { label: "Purity", value: "99.5%" },
      { label: "CAS No.", value: "5949-29-1" },
      { label: "Grade", value: "Food / Pharma" },
      { label: "Pack Size", value: "1 kg" },
    ],
    image:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "acetone-tech",
    name: "Acetone Technical Grade",
    category: "Specialty Solvents",
    price: 3200,
    unit: "₹",
    packSize: "20 L Drum",
    rating: 4.5,
    inStock: true,
    shortDescription: "Versatile solvent for paints, coatings, and degreasing.",
    description:
      "Technical grade acetone widely used in paint, adhesives, pharma, and cleaning industries. Fast evaporating with high solvency power.",
    specs: [
      { label: "Purity", value: "99%" },
      { label: "CAS No.", value: "67-64-1" },
      { label: "Grade", value: "Technical" },
      { label: "Pack Size", value: "20 L" },
    ],
    image:
      "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "urea-fertilizer",
    name: "Urea Fertilizer (Prilled)",
    category: "Agro Chemicals",
    price: 1100,
    unit: "₹",
    packSize: "50 kg Bag",
    rating: 4.7,
    inStock: true,
    shortDescription: "High-nitrogen fertilizer for crops and resin production.",
    description:
      "Premium prilled urea (46% N) — the most concentrated solid nitrogen fertilizer, ideal for a wide range of crops.",
    specs: [
      { label: "Nitrogen", value: "46%" },
      { label: "CAS No.", value: "57-13-6" },
      { label: "Form", value: "Prilled" },
      { label: "Pack Size", value: "50 kg" },
    ],
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "zinc-sulfate",
    name: "Zinc Sulfate Heptahydrate",
    category: "Agro Chemicals",
    price: 1800,
    unit: "₹",
    packSize: "25 kg Bag",
    rating: 4.6,
    inStock: false,
    shortDescription: "Micronutrient for soil enrichment and crop yield.",
    description:
      "Agricultural grade zinc sulfate heptahydrate used as a soil supplement to correct zinc deficiency in crops.",
    specs: [
      { label: "Zn Content", value: "21%" },
      { label: "CAS No.", value: "7446-20-0" },
      { label: "Grade", value: "Agricultural" },
      { label: "Pack Size", value: "25 kg" },
    ],
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "hcl-33",
    name: "Hydrochloric Acid 33%",
    category: "Industrial Cleaners",
    price: 1650,
    unit: "₹",
    packSize: "35 kg Carboy",
    rating: 4.4,
    inStock: true,
    shortDescription: "Industrial grade HCl for pickling and pH control.",
    description:
      "Commercial grade hydrochloric acid 33% concentration, used in steel pickling, water treatment, and chemical synthesis.",
    specs: [
      { label: "Concentration", value: "33%" },
      { label: "CAS No.", value: "7647-01-0" },
      { label: "Grade", value: "Technical" },
      { label: "Pack Size", value: "35 kg" },
    ],
    image:
      "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ethanol-denatured",
    name: "Denatured Ethanol",
    category: "Specialty Solvents",
    price: 4200,
    unit: "₹",
    packSize: "50 L Drum",
    rating: 4.7,
    inStock: true,
    shortDescription: "Multipurpose denatured ethanol for industrial use.",
    description:
      "Denatured ethanol suitable for cleaning, extraction, and chemical processing. Available in multiple denaturants.",
    specs: [
      { label: "Purity", value: "95%+" },
      { label: "CAS No.", value: "64-17-5" },
      { label: "Grade", value: "IP" },
      { label: "Pack Size", value: "50 L" },
    ],
    image:
      "https://images.unsplash.com/photo-1559757175-08f0b3a5e6f7?auto=format&fit=crop&w=800&q=80",
  },
];

export const shopCategories = [
  "All",
  "Industrial Cleaners",
  "Lab Reagents",
  "Agro Chemicals",
  "Specialty Solvents",
] as const;
