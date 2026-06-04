export interface ScheduleFile {
  id: string;
  name: string;
  type: 'pdf';
  size: string;
  url: string; // Dynamic mock download blob
  pages: number;
}

export interface Schedule {
  id: string;
  title: string;
  titleAr: string;
  slug: string;
  faculte: 'fsjes_agadir' | 'fsjes_ait_melloul';
  filiere: 'droit_fr' | 'droit_ar' | 'economie' | 'gestion';
  semestre: 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6';
  section: string; // e.g. "Section A", "Section B", "Toutes les Sections"
  anneeUniversitaire: string; // e.g. "2025/2026"
  derniereMiseAJour: string; // e.g. "22 Mai 2026"
  estTemporaire: boolean;
  notes?: string;
  notesAr?: string;
  file: ScheduleFile;
  aiInsightsAr?: string; // High quality study assistant tips
}

export const FILIERES = [
  { id: 'all', name: 'الجميع', nameFr: 'Toutes les filières' },
  { id: 'droit_fr', name: 'القانون بالفرنسية (Droit Fr)', nameFr: 'Droit Français' },
  { id: 'droit_ar', name: 'القانون بالعربية (Droit Ar)', nameFr: 'Droit Arabe' },
  { id: 'economie', name: 'الاقتصاد (Économie)', nameFr: 'Sciences Économiques' },
  { id: 'gestion', name: 'التدبير والعلوم التجارية (Gestion)', nameFr: 'Gestion & Management' }
];

export const FACULTIES = [
  { id: 'all', name: 'جميع الكليات', nameFr: 'Toutes les facultés' },
  { id: 'fsjes_agadir', name: 'كلية Agadir', nameFr: 'FSJES Agadir' },
  { id: 'fsjes_ait_melloul', name: 'كلية Ait Melloul', nameFr: 'FSJES Ait Melloul' }
];

export const SEMESTRES_LIST = [
  { id: 'all', name: 'جميع الفصول', nameFr: 'Tous les semestres' },
  { id: 'S1', name: 'السداسي الأول (S1)', nameFr: 'Semestre 1' },
  { id: 'S2', name: 'السداسي الثاني (S2)', nameFr: 'Semestre 2' },
  { id: 'S3', name: 'السداسي الثالث (S3)', nameFr: 'Semestre 3' },
  { id: 'S4', name: 'السداسي الرابع (S4)', nameFr: 'Semestre 4' },
  { id: 'S5', name: 'السداسي الخامس (S5)', nameFr: 'Semestre 5' },
  { id: 'S6', name: 'السداسي السادس (S6)', nameFr: 'Semestre 6' }
];

export const SECTIONS_LIST = [
  { id: 'all', name: 'جميع الأفواج', nameFr: 'Toutes les sections' },
  { id: 'A', name: 'الفوج A', nameFr: 'Section A' },
  { id: 'B', name: 'الفوج B', nameFr: 'Section B' },
  { id: 'C', name: 'الفوج C', nameFr: 'Section C' },
  { id: 'D', name: 'الفوج D', nameFr: 'Section D' }
];

export const ANNEES_LIST = [
  { id: 'all', name: 'جميع السنوات', nameFr: 'Toutes les années' },
  { id: '2025/2026', name: '2025/2026', nameFr: '2025/2026' }
];

export const EMPLOIS_DATA: Schedule[] = [
  {
    id: 'emp-droit-fr-s2-aga',
    title: 'Droit Français — Semestre 2',
    titleAr: 'القانون بالفرنسية — الفصل الثاني',
    slug: 'droit-francais-s2-agadir',
    faculte: 'fsjes_agadir',
    filiere: 'droit_fr',
    semestre: 'S2',
    section: 'Toutes les Sections (A, B)',
    anneeUniversitaire: '2025/2026',
    derniereMiseAJour: '21 Mai 2026',
    estTemporaire: false,
    notesAr: 'الحصص مبرمجة بالمدرج 1 والمدرج 2 بالكلية المركزية بأكادير.',
    file: {
      id: 'file-emp-1',
      name: 'Emploi du Temps S2 Droit Noir/Blanc Officiel',
      type: 'pdf',
      size: '1.2 MB',
      url: '#',
      pages: 2
    },
    aiInsightsAr: '📌 **تحليل ذكي للجدول**: نلاحظ وجود حصتين متتاليتين في صباح الأربعاء لمادة "Droit Constitutionnel"، وهي فرصة رائعة لتسريع تحصيل المحاور قبل الامتحانات!'
  },
  {
    id: 'emp-droit-fr-s1-ait',
    title: 'Droit Français — Semestre 1',
    titleAr: 'القانون بالفرنسية — الفصل الأول',
    slug: 'droit-francais-s1-ait-melloul',
    faculte: 'fsjes_ait_melloul',
    filiere: 'droit_fr',
    semestre: 'S1',
    section: 'Section A, B, C, D',
    anneeUniversitaire: '2025/2026',
    derniereMiseAJour: '19 Mai 2026',
    estTemporaire: false,
    notesAr: 'القاعات والمدرجات تابعة لملحقة الكلية بآيت ملول.',
    file: {
      id: 'file-emp-2',
      name: 'Emploi S1 Droit Français - Ait Melloul',
      type: 'pdf',
      size: '950 KB',
      url: '#',
      pages: 1
    },
    aiInsightsAr: '📌 **ملاحظة المساعد**: جدول الفصل الأول خفيف نسبياً مع التركيز على مهارات التواصل ومصطلحات الدستور.'
  },
  {
    id: 'emp-eco-s2-aga',
    title: 'Économie & Gestion — Semestre 2',
    titleAr: 'الاقتصاد والتسيير — الفصل الثاني',
    slug: 'economie-gestion-s2-agadir',
    faculte: 'fsjes_agadir',
    filiere: 'economie',
    semestre: 'S2',
    section: 'Section A, B',
    anneeUniversitaire: '2025/2026',
    derniereMiseAJour: '23 Mai 2026',
    estTemporaire: false,
    notesAr: 'تشمل حصص مادة Microéconomie والرياضيات المالية والمحاسبة العامة 2.',
    file: {
      id: 'file-emp-3',
      name: 'Emploi du Temps S2 Sciences Éco - Agadir',
      type: 'pdf',
      size: '1.5 MB',
      url: '#',
      pages: 4
    },
    aiInsightsAr: '📌 **تحليل المساعد**: انتبه! تقييد حضور دروس التسيير يوم الثلاثاء أساسي جداً لفهم المخطط المحاسبي المغربي والتطبيقات الرياضية.'
  },
  {
    id: 'emp-eco-s4-ait',
    title: 'Économie TC — Semestre 4',
    titleAr: 'الاقتصاد المشترك — الفصل الرابع',
    slug: 'economie-s4-ait-melloul',
    faculte: 'fsjes_ait_melloul',
    filiere: 'economie',
    semestre: 'S4',
    section: 'Sections C & D',
    anneeUniversitaire: '2025/2026',
    derniereMiseAJour: '18 Mai 2026',
    estTemporaire: false,
    notesAr: 'الحصص مقسمة بين الفترة الصباحية والمسائية حسب المجموعات.',
    file: {
      id: 'file-emp-4',
      name: 'Emploi S4 Sciences Économiques Ait Melloul',
      type: 'pdf',
      size: '1.1 MB',
      url: '#',
      pages: 2
    },
    aiInsightsAr: '📌 **نصيحة ذكية**: يُفضل التركيز على حصص المالية العامة (Finances Publiques) والتحليل النقدي لزيادة معدل نقاطك بهذا السداسي.'
  },
  {
    id: 'emp-gestion-s6-aga',
    title: 'Gestion (CFF) — Semestre 6',
    titleAr: 'التسيير المالي والمحاسبي — الفصل السادس',
    slug: 'gestion-s6-cff-agadir',
    faculte: 'fsjes_agadir',
    filiere: 'gestion',
    semestre: 'S6',
    section: 'Toutes les Sections',
    anneeUniversitaire: '2025/2026',
    derniereMiseAJour: '22 Mai 2026',
    estTemporaire: false,
    notesAr: 'سداسي التخصص والتخرّج لعلوم المحاسبة والتمويل والتحليل الاستراتيجي.',
    file: {
      id: 'file-emp-5',
      name: 'Planning S6 Option Comptabilité & Fiscalité',
      type: 'pdf',
      size: '1.8 MB',
      url: '#',
      pages: 3
    },
    aiInsightsAr: '📌 **تحليل ذكي**: السبت مخصص بالكامل لورش العمل التطبيقية ومشاريع التخرج واللغات الاحترافية.'
  },
  {
    id: 'emp-droit-ar-s2-aga',
    title: 'Droit Arabe — Semestre 2',
    titleAr: 'القانون العربي — الفصل الثاني',
    slug: 'droit-arabe-s2-agadir',
    faculte: 'fsjes_agadir',
    filiere: 'droit_ar',
    semestre: 'S2',
    section: 'الجميع (أ، ب، ج)',
    anneeUniversitaire: '2025/2026',
    derniereMiseAJour: '20 Mai 2026',
    estTemporaire: false,
    notesAr: 'المحاضرات بمدرجات الكلية والمجموعات التطبيقية ستنشر لاحقاً.',
    file: {
      id: 'file-emp-6',
      name: 'استعمال الزمن القانون العربي الفصل الثاني أكادير',
      type: 'pdf',
      size: '1.3 MB',
      url: '#',
      pages: 2
    },
    aiInsightsAr: '📌 **توجيه دراسي**: القانون الجنائي الدولي وقانون الالتزامات يتطلبان حضوراً متكاملاً منذ الأسبوع الأول.'
  }
];
