export interface CourseFile {
  id: string;
  name: string;
  nameAr?: string;
  type: 'cours' | 'resume' | 'examen' | 'corrige';
  size: string;
  clicks: number;
  url: string; // Dynamic simulated preview/download
  pages?: number;
}

export interface Course {
  id: string;
  title: string;
  titleAr: string;
  category: 'droit' | 'economie' | 'gestion' | 'francais';
  slug: string;
  semester: string;
  description: string;
  descriptionAr: string;
  downloadsCount: number;
  lastUpdated: string;
  rating: number;
  files: CourseFile[];
  aiSummaryFallback: string; // Realistic AI responsive summary for Moroccan students
  aiTidbits: string[]; // Key takeaways
  aiSampleQuestions: { q: string; a: string }[]; // Mock Q&A for study assistant
}

export const CATEGORIES = [
  { id: 'all', name: 'الجميع', nameFr: 'Tous', icon: 'Globe' },
  { id: 'economie', name: 'اقتصاد (Économie)', nameFr: 'Économie', icon: 'TrendingUp', color: 'blue', desc: 'تحليل اقتصادي، اقتصاد كلي وجزئي، وإحصاء', descAr: 'ملخصات وامتحانات التحليل الاقتصادي الكلي والجزئي والأنظمة الاقتصادية.' },
  { id: 'gestion', name: 'تدبير (Gestion)', nameFr: 'Gestion', icon: 'Briefcase', color: 'emerald', desc: 'محاسبة عامة، إدارة، وتحليل مالي للمقاولات', descAr: 'المحاسبة العامة، تقنيات التسيير والتدبير، والتحليل المالي.' },
  { id: 'droit', name: 'قانون (Droit)', nameFr: 'Droit', icon: 'BookOpen', color: 'purple', desc: 'القانون الخاص والعام باللغتين العربية والفرنسية', descAr: 'محاضرات مادة القانون الدستوري والمدني والتجاري والتزامات وعقود.' },
  { id: 'francais', name: 'تواصل (Communication & Soft Skills)', nameFr: 'Soft Skills', icon: 'MessageSquare', color: 'rose', desc: 'مهارات اللغة، المصطلحات، والتطوير الذاتي', descAr: 'منهجية العمل الجامعي، مهارات التواصل، ومصطلحات التخصص.' }
];

export const COURSES: Course[] = [
  {
    id: 'eco-gen',
    title: 'Économie Générale',
    titleAr: 'الاقتصاد العام',
    category: 'economie',
    slug: 'economie-generale',
    semester: 'S1',
    description: 'Introduction aux concepts clés de l\'économie générale, marché, inflation, investissement et croissance.',
    descriptionAr: 'مدخل للمفاهيم الاقتصادية الأساسية: السوق، التضخم، البطالة، الاستهلاك، والسياسات المالية والنقدية للدولة.',
    downloadsCount: 3840,
    lastUpdated: '15 Mai 2026',
    rating: 4.8,
    files: [
      { id: 'eco-gen-c1', name: 'Livre Complet - Introduction à l\'Économie', nameAr: 'كتاب كامل - مدخل للاقتصاد العام', type: 'cours', size: '4.2 MB', clicks: 1245, url: '#', pages: 124 },
      { id: 'eco-gen-c2', name: 'Polycope de Cours Officiel FSJES', nameAr: 'مطبوع المحاضرات الرسمي للكلية', type: 'cours', size: '2.8 MB', clicks: 940, url: '#', pages: 85 },
      { id: 'eco-gen-r1', name: 'Fiches de Synthèse - Concepts Essentiels', nameAr: 'بطاقات التلخيص - المفاهيم الأساسية المستهدفة', type: 'resume', size: '820 KB', clicks: 1780, url: '#', pages: 18 },
      { id: 'eco-gen-r2', name: 'Résumé sous schéma - Révision Rapide', nameAr: 'مخططات تلخيصية ذكية للمراجعة السريعة', type: 'resume', size: '1.1 MB', clicks: 1540, url: '#', pages: 12 },
      { id: 'eco-gen-e1', name: 'Examen de Session Ordinaire 2025', nameAr: 'امتحان الدورة العادية 2025 مع عناصر الإجابة', type: 'corrige', size: '1.5 MB', clicks: 2300, url: '#', pages: 6 },
      { id: 'eco-gen-e2', name: 'Collection des Examens Corrigés (2021-2024)', nameAr: 'مجموعة الامتحانات المصححة للسنوات الماضية', type: 'examen', size: '3.6 MB', clicks: 1980, url: '#', pages: 42 }
    ],
    aiSummaryFallback: `مرحبًا بك في مساعد الدراسة الذكي لمادة **الاقتصاد العام** (Économie Générale)! 🎓

هذا المقرر هو الأساس المتين لفهم الآليات الاقتصادية ويتمحور حول أربعة مواضيع رئيسية:
1. **التعريف بالفاعلين الاقتصاديين (Agents Économiques)**: الأسر، المقاولات، الإدارات العمومية، والمؤسسات المالية، ومفهوم التدفق الدائري للنشاط الاقتصادي (Circuit Économique).
2. **العمليات الاقتصادية الرئيسية (Opérations Économiques)**: الإنتاج (Production)، الاستهلاك (Consommation)، والادخار (Épargne).
3. **دراسة السوق وأشكاله المختلفة**: المنافسة الكاملة والمثالية (Concurrence Pure et Parfaite)، والاحتكار (Monopole).
4. **الاختلالات الاقتصادية وعلاجها**: معالجة التضخم (Inflation) والبطالة (Chômage) عبر السياسيات العمومية.

💡 **أنوية الفهم الأساسية**: احرص على التمييز الدقيق بين الاقتصاد الجزئي (Micro) الكلي (Macro) في ورقة الامتحان!`,
    aiTidbits: [
      "مبدأ الندرة (Rareté) هو النواة المحركة لجميع العلوم الاقتصادية.",
      "مؤشر الناتج الداخلي الخام (PIB) يقيس القيمة الإجمالية للثروة المنتجة داخل البلد خلال سنة واحدة.",
      "قانون العرض والطلب: يرتفع السعر بزيادة الطلب أو نقص العرض، وينخفض بزيادة العرض أو نقص الطلب."
    ],
    aiSampleQuestions: [
      {
        q: "ما الفرق بين الناتج الداخلي الخام (PIB) والناتج الوطني الخام (PNB)؟",
        a: "الناتج الداخلي الخام (PIB) يقيس الثروة المنتجة داخل النطاق الجغرافي للبلاد بغض النظر عن جنسية المنتِج (مبدأ الإقليمية)، بينما الناتج الوطني الخام (PNB) يقيس الثروة المنتجة من طرف الحاملين للجنسية المغربية سواء كانوا داخل الوطن أو خارجه (مبدأ الجنسية)."
      },
      {
        q: "وضح مفهوم المنافسة الكاملة والمثالية (Concurrence Pure et Parfaite).",
        a: "هو نموذج نظري للسوق يفترض توفر 5 شروط رئيسية: التفرد (Atomicitat)، التجانس (Homogénéité)، حرية الدخول والخروج من السوق، المعرفة التامة بالسوق (Transparence)، وحركية عوامل الإنتاج."
      }
    ]
  },
  {
    id: 'micro-eco',
    title: 'Microéconomie I & II',
    titleAr: 'التحليل الاقتصادي الجزئي',
    category: 'economie',
    slug: 'microeconomie-s1',
    semester: 'S1 / S2',
    description: 'Théorie du comportement du consommateur, fonctions d\'utilité, droites de budget, décision du producteur.',
    descriptionAr: 'دراسة سلوك المستهلك وتفضيلاته، دالة المنفعة، معادلة الميزانية، ثم سلوك المنتج، تكاليف الإنتاج وهيكل السوق.',
    downloadsCount: 5210,
    lastUpdated: '19 Mai 2026',
    rating: 4.9,
    files: [
      { id: 'micro-c1', name: 'Cours Détaillé: Théorie du Consommateur', nameAr: 'محاضرات مفصلة: نظرية سلوك المستهلك', type: 'cours', size: '3.1 MB', clicks: 2100, url: '#', pages: 96 },
      { id: 'micro-c2', name: 'Cours du Producteur & Coûts', nameAr: 'نظرية سلوك المنتج وحساب التكاليف', type: 'cours', size: '2.5 MB', clicks: 1450, url: '#', pages: 72 },
      { id: 'micro-r1', name: 'Formulaire Complet de Microéconomie', nameAr: 'ملف القوانين والاشتقاقات الرياضية الشاملة', type: 'resume', size: '680 KB', clicks: 3120, url: '#', pages: 8 },
      { id: 'micro-e1', name: 'Examens Corrigés S1 FSJES avec barème', nameAr: 'امتحان الدورة العادية مع عناصر التصحيح المفصلة', type: 'corrige', size: '1.9 MB', clicks: 2890, url: '#', pages: 14 },
      { id: 'micro-e2', name: 'Exercices Corrigés - Taux Marginal de Substitution', nameAr: 'سلسلة تمارين مصححة حول معدل الاستبدال الحدي TMS', type: 'corrige', size: '2.2 MB', clicks: 2450, url: '#', pages: 11 }
    ],
    aiSummaryFallback: `أهلاً بك في منصة تيسير مادة **التحليل الاقتصادي الجزئي** (Microéconomie)! 📈 

تركز هذه المادة الرياضية على كيفية اتخاذ الوحدات الفردية (مستهلك ومقاولة) للقرارات الاقتصادية المثلى:
1. **نظرية المستهلك (Consommateur)**: كيف يوزع دخله المحدود لشراء سلع تحقق له أعلى منفعة (Utilité) ممكنة. نستخدم هنا منحنيات السواء (Courbes d'Indifférence) وخط الميزانية (Droite de Budget).
2. **نظرية المنتج (Producteur)**: كيف تختار المقاولة مزيج عوامل الإنتاج (العمل K ورأس المال L) لتعظيم الربح أو تقليل التكلفة عند مستوى إنتاج محدد.
3. **توازن السوق (Équilibre du Marché)**: اللقاء بين منحنى الطلب سالب الميل ومنحنى العرض موجب الميل لتحديد سعر التوازن.

⚠️ **أهم مفاهيم الامتحان**: تمكن جيدًا من حساب مشتقات **دالة كوب-دوغلاس (Cobb-Douglas)** واستخراج السعر والكمية التوازنية!`,
    aiTidbits: [
      "المعدل الحدي للاستبدال (TMS) يقيس مقدار السلعة Y التي يتنازل عنها المستهلك مقابل زيادة وحدة من X مع البقاء على نفس منحنى السواء.",
      "في المدى القصير، تمتلك المقاولة عوامل إنتاج ثابتة (غالباً رأس المال L). في المدى الطويل، تصبح جميع عوامل الإنتاج متغيرة.",
      "نقطة تعظيم الأرباح للمنتج التنافسي تتحقق دائمًا عندما يتساوى السعر مع التكلفة الحدية (P = Cm)."
    ],
    aiSampleQuestions: [
      {
        q: "كيف نحسب توازن المستهلك باستخدام طريقة مضاعف لاغرانج (Méthode de Lagrange)؟",
        a: "نقوم بصياغة دالة لاغرانج: L = U(X,Y) + λ(R - Px.X - Py.Y)، ثم نحسب المشتقات الجزئية بالنسبة لـ X و Y و λ ونساويها بالصفر لاستخراج قيم الـ TMS وتساوي النِّسب الاستبدادية مع سعر السلع: UmX / Px = UmY / Py."
      },
      {
        q: "ما معنى الاحتكار الطبيعي (Monopole Naturel)؟",
        a: "هو حالة يتميز فيها القطاع بتكاليف ثابتة ضخمة جدًا (مثل السكك الحديدية أو الكهرباء)، بحيث يستطيع فاعل واحد تلبية طلب السوق بتكلفة متوسطة تقل باستمرار مع نمو الإنتاج، مما يستحيل معه منافسة شركات أخرى له."
      }
    ]
  },
  {
    id: 'compta-gen',
    title: 'Comptabilité Générale',
    titleAr: 'المحاسبة العامة',
    category: 'gestion',
    slug: 'comptabilite-generale',
    semester: 'S1 / S2',
    description: 'Principes comptables fondamentaux, Journal, Grand Livre, Balance, Bilan, et CPC d\'une entreprise.',
    descriptionAr: 'المبادئ السبعة الأساسية، تقييدات الدفتر اليومي، الحسابات الختامية (الميزانية وقائمة العائدات والتكاليف CPC).',
    downloadsCount: 6100,
    lastUpdated: '18 Mai 2026',
    rating: 4.9,
    files: [
      { id: 'compta-c1', name: 'Manuel de Base de Comptabilité de l\'Entreprise', nameAr: 'كتاب أساسيات المحاسبة للمقاولة طبقًا للمخطط المغربي', type: 'cours', size: '5.1 MB', clicks: 2800, url: '#', pages: 145 },
      { id: 'compta-c2', name: 'Guide Pratique des Écritures Comptables', nameAr: 'الدليل التطبيقي للتسجيلات المحاسبية', type: 'cours', size: '3.4 MB', clicks: 2100, url: '#', pages: 68 },
      { id: 'compta-r1', name: 'Plan Comptable Marocain Complet (Recherchable PDF)', nameAr: 'المخطط المحاسبي المغربي كاملاً مع البحث السريع', type: 'resume', size: '1.8 MB', clicks: 4200, url: '#', pages: 32 },
      { id: 'compta-r2', name: 'Résumé PDF des Opérations Actif/Passif', nameAr: 'تلخيص شامل لعمليات الأصول والخصوم (الدورة المحاسبية)', type: 'resume', size: '950 KB', clicks: 1950, url: '#', pages: 10 },
      { id: 'compta-e1', name: 'Examen Pratique - Écritures au Journal (Session 2025)', nameAr: 'المحاكاة التطبيقية لدفتر اليومية المعتمدة في امتحانات الكلية', type: 'corrige', size: '2.4 MB', clicks: 3100, url: '#', pages: 15 }
    ],
    aiSummaryFallback: `مرحبًا بك في دليل **المحاسبة العامة** (Comptabilité Générale) وفقًا للمخطط المغربي (Plan Comptable Marocain)! 💼

المحاسبة هي نظام للمعلومات يسمح بتقييم وتوثيق الوضعية المالية للشركة عبر وثائق رسمية:
1. **الميزانية (Bilan)**: لقطة فوتوغرافية للمقومة توضح أصولها (Actif - ما تملك) وخصومها (Passif - مصادر التمويل). تتوازن دائمًا بقاعدة: Actif = Passif.
2. **جدول الأعباء والمنتجات (CPC)**: يقيس نشاط الشركة الكلي والربح أو الخسارة المحققة خلال سنة (Classe 6 / Classe 7).
3. **التسجيل المحاسبي الثنائي**: قاعدة القيد المزدوج (Partie Double)، حيث يقيد كل مدين بدائن مطابق له في القيمة بالموازاة.

🔥 **نصيحة الامتحان**: تذكر أهم المبادئ مثل مبدأ الحيطة والحذر (Prudence) وتكلفة الشراء التاريخية (Coût Historique)!`,
    aiTidbits: [
      "القيد الثنائي يعني أنه لا يمكن تسجيل أي عملية إلا ويكون مجموع المبالغ المقيدة في الطرف المدين مساوياً تماماً لمجموع الطرف الدائن.",
      "الأصول الرأسمالية تنقسم إلى خمسة أصناف في المخطط المغربي، وتبدأ الفئة الأولى دائمًا بأموال التمويل الدائم.",
      "قائمة حساب النتائج (CPC) لا تشتمل على الاستثمارات، وإنما تركز حصرياً على مصاريف التسيير (Charges) وعوائد النشاط (Produits)."
    ],
    aiSampleQuestions: [
      {
        q: "ما هي المبادئ السبعة الأساسية لمدونة المحاسبة المغربية (Code Général de Normalisation Comptable - CGNC)؟",
        a: "المبادئ السبعة هي: استمرارية النشاط (Continuité d'exploitation)، ثبات طرق التقييم (Permanence des méthodes)، التكلفة التاريخية (Coût historique)، استقلالية السنوات (Spécialisation des exercices)، الحيطة والحذر (Prudence)، الوضوح (Clarté)، والأهمية النسبية (Importance significative)."
      },
      {
        q: "ما هو الفرق بين ميزانية الافتتاح (Bilan d'Ouverture) وميزانية الإقفال (Bilan de Clôture)؟",
        a: "ميزانية الافتتاح تظهر وضعية الشركة في اليوم الأول من السنة (عادة 1 يناير) دون تضمين أي أرباح مستخرجة. بينما ميزانية الإقفال في نهاية السنة (31 دجنبر) تظهر المتغيرات المحاسبية السنوية بعد استخراج صافي النتيجة (Résultat Net du bilan) سواء ربح أو خسارة."
      }
    ]
  },
  {
    id: 'droit-const',
    title: 'Droit Constitutionnel',
    titleAr: 'القانون الدستوري',
    category: 'droit',
    slug: 'droit-constitutionnel',
    semester: 'S1',
    description: 'Théorie de l\'État, notion de Constitution, régimes politiques comparés, et Constitution du Maroc.',
    descriptionAr: 'نظرية الدولة، نشأة الدساتير، أنواع الأنظمة السياسية المعاصرة، مع دراسة تفصيلية للدستور المغربي لعام 2011.',
    downloadsCount: 4290,
    lastUpdated: '12 Mai 2026',
    rating: 4.7,
    files: [
      { id: 'droit-const-c1', name: 'Introduction Générale aux Théories de l\'État', nameAr: 'المحاضرة الشاملة في نظريات نشأة الدولة والسيادة', type: 'cours', size: '3.6 MB', clicks: 1540, url: '#', pages: 110 },
      { id: 'droit-const-c2', name: 'Analyse Analytique de la Constitution 2011 Maroc', nameAr: 'تحليل دقيق لأبواب الدستور المغربي لسنة 2011', type: 'cours', size: '2.9 MB', clicks: 1220, url: '#', pages: 76 },
      { id: 'droit-const-r1', name: 'Fiches de Synthèse - Les Régimes Politiques', nameAr: 'بطاقات التلخيص المقارن للأنظمة السياسية (رئاسي، برلماني)', type: 'resume', size: '710 KB', clicks: 2310, url: '#', pages: 12 },
      { id: 'droit-const-r2', name: 'Schéma Mental complet des Institutions Constitutionnelles', nameAr: 'خرائط ذهنية ذكية تلخص العلاقات بين السلط بالمغرب', type: 'resume', size: '1.4 MB', clicks: 1780, url: '#', pages: 5 },
      { id: 'droit-const-e1', name: 'Questions type d\'examens QCR/Sujets d\'Analyse', nameAr: 'نموذج أسئلة مادة القانون الدستوري - مواضيع إنشائية مصححة', type: 'corrige', size: '1.2 MB', clicks: 2010, url: '#', pages: 9 }
    ],
    aiSummaryFallback: `مرحبًا بك في الفضاء التعليمي المخصص لمادة **القانون الدستوري** (Droit Constitutionnel)! 📘 

هذه المادة القانونية الأساسية تدرس تنظيم السلطات داخل الدولة وشكلها وعلاقتها بالمواطنين:
1. **نظرية الدولة**: عناصر تكوين الدولة (الشعب، الإقليم، والسلطة السياسية)، ومفهوم السيادة والنظريات الديمقراطية المصاحبة لها.
2. **الدستور (La Constitution)**: القانون الأسمى للدولة، كيفية صياغته وتعديله، ومفهوم الرقابة على دستورية القوانين (المحكمة الدستورية).
3. **الأنظمة السياسية المقارنة**: فحص نظام فصل السلطات وتطبيقه في النظام البرلماني البريطاني، الرئاسي الأمريكي، وشبه الرئاسي الفرنسي.
4. **النظام الدستوري المغربي**: دراسة بنية وعلاقة السلطات الثلاث (المؤسسة الملكية، الحكومة، والبرلمان) ومستجدات وثيقة 2011.

⚖️ **مفتاح التفوق**: ركز على فقه صياغة الإشكالية القانونية (Problématique) والتسلسل المنطقي عند مناقشة مواضيع الامتحان!`,
    aiTidbits: [
      "مبدأ فصل السلطات (Séparation des Pouvoirs) وضعه جون لوك وطوره مونتسكيو في فكرته لمنع الاستبداد.",
      "تعتبر وثيقة الدستور المغربي لسنة 2011 قفزة دستورية عززت من صلاحيات رئيس الحكومة وسلطة البرلمان والجهوية المتقدمة.",
      "الرقابة على دستورية القوانين تباشر في المغرب من لدن المحكمة الدستورية لضمان سمو الدستور على جميع التشريعات."
    ],
    aiSampleQuestions: [
      {
        q: "ما هو الفرق الجوهري بين نظام الحكم البرلماني ونظام الحكم الرئاسي؟",
        a: "النظام البرلماني يقوم على الفصل المرن بين السلطات مع وجود تعاون وتوازن (حق البرلمان في مساءلة الحكومة وإسقاطها مقابل حق السلطة التنفيذية في حل البرلمان مثل بريطانيا)، بينما النظام الرئاسي يقسم السلطة فصلاً جامداً حيث لا يملك الرئيس حل الكونغرس ولا يملك الكونغرس إسقاط الرئيس بشكل مباشر سياسياً (مثل الولايات المتحدة الأمريكية)."
      },
      {
        q: "ما دور المحكمة الدستورية في الهندسة الدستورية المغربية طبقاً لدستور 2011؟",
        a: "تتولى المحكمة الدستورية مراقبة مدى مطابقة القوانين التنظيمية والأنظمة الداخلية لمجلسي البرلمان للدستور قبل إصدار الأمر بتنفيذها بشكل إلزامي، كما تبت في دستورية القوانين العادية بناء على إحالة من الملك أو رئيس الحكومة أو رئيسي مجلسي النواب والمستشارين، أو عبر آلية الدفع بعدم الدستورية المثارة من المتقاضين."
      }
    ]
  }
];
