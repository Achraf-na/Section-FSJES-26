import type { College, SemesterDistribution } from './types';

export const COLLEGES: College[] = [
  { id: "fsjes_agadir", label: "FSJES Agadir" },
  { id: "fsjes_ait_melloul", label: "FSJES Ait Melloul" },
];

export const SEMESTERS: string[] = [
    "S2 Economie TC (25-26)",
    "S2 Gestion TC (25-26)",
    "S4 Economie TC (25-26)",
    "S4 Gestion TC (25-26)",
    "S6 Gestion (CFF) (25-26)",
];

export const SECTION_DISTRIBUTIONS: SemesterDistribution[] = [
  {
    semester: "S2 Economie TC (25-26)",
    ranges: [
      { section: "A", from: "AABAID", to: "EL YOUSSOUFI" },
      { section: "B", from: "EL YOUSSOUFY", to: "ZYATI" },
    ]
  },
  {
    semester: "S2 Gestion TC (25-26)",
    ranges: [
      { section: "A", from: "AABADA", to: "AKARKOUR" },
      { section: "B", from: "AKARKOURI", to: "BANAN" },
      { section: "C", from: "BANANE", to: "BOUTAIB" },
      { section: "D", from: "BOUTAIBI", to: "EL MALIKI" },
      { section: "E", from: "EL MALIKY", to: "HADRI" },
      { section: "F", from: "HADRY", to: "LAKRACHI" },
      { section: "G", from: "LAKRACHY", to: "OULAHCEN" },
      { section: "H", from: "OULAHCENE", to: "ZYAN" },
    ]
  },
  {
    semester: "S4 Economie TC (25-26)",
    ranges: [
      { section: "A", from: "AALIOUA", to: "EL KHARACHI" },
      { section: "B", from: "EL KHARACHY", to: "ZMOUR" },
    ]
  },
  {
    semester: "S4 Gestion TC (25-26)",
    ranges: [
      { section: "A", from: "AABA", to: "AOUINA" },
      { section: "B", from: "AOUINI", to: "BOULAICH" },
      { section: "C", from: "BOULAICHI", to: "EL KHIAR" },
      { section: "D", from: "EL KHIARI", to: "IDMOULA" },
      { section: "E", from: "IDMOULAY", to: "OUAHMAN" },
      { section: "F", from: "OUAHMANE", to: "ZYATI" },
    ]
  },
  {
    semester: "S6 Gestion (CFF) (25-26)",
    ranges: [
      { section: "A", from: "AABID", to: "ATMAN" },
      { section: "B", from: "ATMANI", to: "BOUSSAID" },
      { section: "C", from: "BOUSSAIDI", to: "EL YOUSSOUFI" },
      { section: "D", from: "EL YOUSSOUFY", to: "IDMALK" },
      { section: "E", from: "IDMALKI", to: "NOUAH" },
      { section: "F", from: "NOUAHI", to: "ZOUHAIR" },
    ]
  }
];
