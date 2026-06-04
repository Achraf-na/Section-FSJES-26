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
    "السداسي 2 مسلك القانون العام - جذع مشترك (25-26)",
    "السداسي 4 مسلك القانون العام - جذع مشترك (25-26)",
    "السداسي 4 مسلك القانون العام - الفرنسية (25-26)",
    "السداسي 2 مسلك القانون الخاص - جذع مشترك (25-26)",
    "السداسي 4 مسلك القانون الخاص - جذع مشترك (25-26)",
    "السداسي 6 قانون خاص - مسار القانون المدني (25-26)",
    "السداسي 6 قانون خاص - مسار المهن القانونية والقضائية (25-26)",
];

export const SECTION_DISTRIBUTIONS: SemesterDistribution[] = [
  {
    semester: "السداسي 6 قانون خاص - مسار المهن القانونية والقضائية (25-26)",
    ranges: [
      { section: "A", from: "AABAID", to: "AMAR" },
      { section: "B", from: "AMARA", to: "BOUAARAB" },
      { section: "C", from: "BOUAARABE", to: "EL AAMRI" },
      { section: "D", from: "EL AAMRY", to: "ELKHAYATI" },
      { section: "E", from: "ELKHAYATY", to: "INAJAREN" },
      { section: "F", from: "INAJARENE", to: "LOUIZAT" },
      { section: "G", from: "LOUIZATE", to: "OULMERAGH" },
      { section: "H", from: "OULMERAGHI", to: "ZRIDI" },
    ]
  },
  {
    semester: "السداسي 6 قانون خاص - مسار القانون المدني (25-26)",
    ranges: [
      { section: "A", from: "AAMER", to: "CHARRA" },
      { section: "B", from: "CHARRAI", to: "JOUL" },
      { section: "C", from: "JOULI", to: "ZOUITEN" },
    ]
  },
  {
    semester: "السداسي 4 مسلك القانون الخاص - جذع مشترك (25-26)",
    ranges: [
      { section: "A", from: "A'MIL", to: "AIT BOUDDI" },
      { section: "B", from: "AIT BOUDDY", to: "AMZIL" },
      { section: "C", from: "AMZILE", to: "BAMMAD" },
      { section: "D", from: "BAMMADI", to: "BOUADN" },
      { section: "E", from: "BOUADNI", to: "BOUTCHKIL" },
      { section: "F", from: "BOUTCHKILI", to: "EL AATID" },
      { section: "G", from: "EL AATIDI", to: "EL MILOUD" },
      { section: "H", from: "EL MILOUDI", to: "ESSAADI" },
      { section: "I", from: "ESSAADY", to: "HMIDOU" },
      { section: "J", from: "HMIDOUCH", to: "KHADIR" },
      { section: "K", from: "KHADIRI", to: "LOUZAL" },
      { section: "L", from: "LOUZALI", to: "OUAHNIN" },
      { section: "M", from: "OUAHNINI", to: "ROUISSAM" },
      { section: "N", from: "ROUISSAME", to: "ZYATI" },
    ]
  },
  {
    semester: "السداسي 2 مسلك القانون الخاص - جذع مشترك (25-26)",
    ranges: [
      { section: "A", from: "A'MIL", to: "AHACHTAR" },
      { section: "B", from: "AHACHTARI", to: "AIT TAMANET" },
      { section: "C", from: "AIT TAMANETE", to: "AMZIL" },
      { section: "D", from: "AMZILE", to: "BABA" },
      { section: "E", from: "BABA ALI", to: "BEN CHRIF" },
      { section: "F", from: "BEN CHRIFI", to: "BOUDLAL" },
      { section: "G", from: "BOUDLALI", to: "BOUSTI" },
      { section: "H", from: "BOUSTID", to: "DAOU" },
      { section: "I", from: "DAOUAICHE", to: "EL BOURAHI" },
      { section: "J", from: "EL BOURAHY", to: "EL MANSOURI" },
      { section: "K", from: "EL MANSOURY", to: "ELIBRAHIM" },
      { section: "L", from: "ELIBRAHIMI", to: "ETTALIBI" },
      { section: "M", from: "ETTALIBY", to: "HAMIDI" },
      { section: "N", from: "HAMIDY", to: "IRIDOD" },
      { section: "O", from: "IRIDODI", to: "KRAK" },
      { section: "P", from: "KRAKI", to: "MAHRACH" },
      { section: "Q", from: "MAHRACHE", to: "NOGOT" },
      { section: "R", from: "NOGOTI", to: "OUMARI" },
      { section: "S", from: "OUMARY", to: "SEYDA" },
      { section: "T", from: "SEYDI", to: "ZYNIAH" },
    ]
  },
  {
    semester: "السداسي 4 مسلك القانون العام - الفرنسية (25-26)",
    ranges: [
      { section: "Fr-A", from: "AAICHAOU", to: "EL OUAFI" },
      { section: "Fr-B", from: "EL OUAFY", to: "ZRAFA" },
    ]
  },
  {
    semester: "السداسي 4 مسلك القانون العام - جذع مشترك (25-26)",
    ranges: [
      { section: "A", from: "AAICHAOU", to: "BENSAID" },
      { section: "B", from: "BENSAIDI", to: "EL OUAFI" },
      { section: "C", from: "EL OUAFY", to: "LATTAB" },
      { section: "D", from: "LATTABI", to: "ZRAFA" },
    ]
  },
  {
    semester: "السداسي 2 مسلك القانون العام - جذع مشترك (25-26)",
    ranges: [
      { section: "A", from: "AABID", to: "BENAMRANE" },
      { section: "B", from: "BENAMRANI", to: "EL OULJAOUI" },
      { section: "C", from: "EL OULJAOUY", to: "LAQSOUBI" },
      { section: "D", from: "LAQSOUBY", to: "ZOURDAN" },
    ]
  },
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
