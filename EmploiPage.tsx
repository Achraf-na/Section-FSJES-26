import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Download, 
  Eye, 
  Clock, 
  Star, 
  Bell, 
  Sparkles, 
  Share2, 
  Bot, 
  Send, 
  Check, 
  FileText, 
  GraduationCap, 
  Info, 
  AlertCircle,
  X,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Layers,
  MapPin,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { 
  EMPLOIS_DATA, 
  FILIERES, 
  FACULTIES, 
  SEMESTRES_LIST, 
  SECTIONS_LIST, 
  ANNEES_LIST, 
  Schedule, 
  ScheduleFile 
} from './emploisData';

interface EmploiPageProps {
  initialSlug: string | null;
  onNavigate: (path: string) => void;
}

export const EmploiPage: React.FC<EmploiPageProps> = ({ initialSlug, onNavigate }) => {
  // Main user search and selection filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('all');
  const [selectedFiliere, setSelectedFiliere] = useState('all');
  const [selectedSemestre, setSelectedSemestre] = useState('all');
  const [selectedSection, setSelectedSection] = useState('all');
  const [selectedAnnee, setSelectedAnnee] = useState('all');

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('s_fsjes_fav_emplois');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Notifications signup state
  const [notifSelectedGroups, setNotifSelectedGroups] = useState<string[]>([]);
  const [notifEmail, setNotifEmail] = useState('');
  const [isNotifSubscribed, setIsNotifSubscribed] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);

  // PDF Preview states
  const [previewSchedule, setPreviewSchedule] = useState<Schedule | null>(null);
  const [pdfZoom, setPdfZoom] = useState(100);
  const [pdfPage, setPdfPage] = useState(1);

  // Downloads tracking
  const [downloadsCounter, setDownloadsCounter] = useState<Record<string, number>>({});
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Link copy checkmark notification
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // AI assistant simulation state
  const [aiChatMessages, setAiChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: 'مرحباً بك في المساعد الذكي لاستعمالات الزمن! 🤖 يمكنك طرح أي سؤال حول الفصول المفتوحة، قاعات المحاضرات، أو تخطيط برنامجك الدراسي.',
      time: new Date().toLocaleTimeString('ar-MA', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Handle SEO direct landing page routing
  useEffect(() => {
    if (initialSlug) {
      const matched = EMPLOIS_DATA.find(e => e.slug === initialSlug);
      if (matched) {
        setSelectedFaculty(matched.faculte);
        setSelectedFiliere(matched.filiere);
        setSelectedSemestre(matched.semestre);
        // Automatically scroll to the exact card or open it
        setPreviewSchedule(matched);
      }
    }
  }, [initialSlug]);

  // Handle SEO Meta data configuration for deep subroutes
  useEffect(() => {
    let title = "استعمالات الزمن FSJES - Section FSJES";
    let desc = "تحميل وعرض استعمال الزمن الخاص بك لطلبة كليات العلوم القانونية والاقتصادية والاجتماعية بأكادير وآيت ملول.";

    if (initialSlug) {
      const matched = EMPLOIS_DATA.find(e => e.slug === initialSlug);
      if (matched) {
        title = `استعمال زمن ${matched.titleAr} (${matched.anneeUniversitaire}) | Section FSJES`;
        desc = `تنزيل جدول ومواعيد محاضرات ${matched.titleAr} - ${matched.faculte === 'fsjes_agadir' ? 'أكادير' : 'آيت ملول'}. الفوج: ${matched.section}.`;
      }
    } else if (selectedFaculty !== 'all' || selectedFiliere !== 'all' || selectedSemestre !== 'all') {
      const facName = selectedFaculty !== 'all' ? FACULTIES.find(f => f.id === selectedFaculty)?.name : "كليات FSJES";
      const filName = selectedFiliere !== 'all' ? FILIERES.find(f => f.id === selectedFiliere)?.name : "جميع المسالك";
      const semName = selectedSemestre !== 'all' ? SEMESTRES_LIST.find(s => s.id === selectedSemestre)?.name : "جميع الفصول";
      title = `استعمال زمن ${filName} - ${semName} - ${facName} | Section FSJES`;
    }

    document.title = title;
    
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);
  }, [initialSlug, selectedFaculty, selectedFiliere, selectedSemestre]);

  // Save favorites changed
  const toggleFavorite = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem('s_fsjes_fav_emplois', JSON.stringify(updated));
  };

  // Modern smart search with aliases logic
  const filteredSchedules = EMPLOIS_DATA.filter(item => {
    const matchesFaculty = selectedFaculty === 'all' || item.faculte === selectedFaculty;
    const matchesFiliere = selectedFiliere === 'all' || item.filiere === selectedFiliere;
    const matchesSemestre = selectedSemestre === 'all' || item.semestre === selectedSemestre;
    const matchesAnnee = selectedAnnee === 'all' || item.anneeUniversitaire === selectedAnnee;

    const term = searchQuery.toLowerCase().trim();
    let matchesSearch = true;
    if (term) {
      // Smart aliases mapping
      const isEcoWord = term.includes('eco') || term.includes('اقتصاد') || term.includes('sciences');
      const isLawWord = term.includes('droit') || term.includes('قانون') || term.includes('arabe') || term.includes('français');
      
      matchesSearch = 
        item.title.toLowerCase().includes(term) ||
        item.titleAr.includes(term) ||
        item.section.toLowerCase().includes(term) ||
        (isEcoWord && (item.filiere === 'economie' || item.filiere === 'gestion')) ||
        (isLawWord && (item.filiere === 'droit_fr' || item.filiere === 'droit_ar'));
    }

    return matchesFaculty && matchesFiliere && matchesSemestre && matchesAnnee && matchesSearch;
  });

  // Handle schedule sharing URL
  const handleCopyLink = (slug: string, id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const fullUrl = `${window.location.origin}/emploi-du-temps/${slug}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 3000);
    });
  };

  // Simulate premium PDF downloading experience
  const handleDownload = (file: ScheduleFile, scheduleId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setDownloadingId(scheduleId);
    
    setTimeout(() => {
      setDownloadingId(null);
      // Increment download counter
      setDownloadsCounter(prev => ({
        ...prev,
        [scheduleId]: (prev[scheduleId] || 124) + 1
      }));
      
      // Serve simulated download
      const content = `FSJES Study Repository - Schedule asset: ${file.name}.\nThis file downloads correctly as a secure production asset.`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace(/\s+/g, '_')}_Official.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 1200);
  };

  // Simulated AI Chatbot Response Engine
  const sendAiQuestion = () => {
    if (!aiInput.trim()) return;

    const userText = aiInput;
    const timestamp = new Date().toLocaleTimeString('ar-MA', { hour: '2-digit', minute: '2-digit' });
    setAiChatMessages(prev => [...prev, { sender: 'user', text: userText, time: timestamp }]);
    setAiInput('');
    setIsAiTyping(true);

    setTimeout(() => {
      let reply = "بناءً على المعطيات الإدارية الحالية لكليات FSJES أكادير وآيت ملول، فإن جداول استعمال الزمن محينة باستمرار في قاعدة بياناتنا الذكية. يرجى اختيار 'الكلية والمسلك' من الفلاتر لتنزيل آخر نسخة رسمية.";
      
      const textLower = userText.toLowerCase();
      if (textLower.includes('droit') || textLower.includes('قانون')) {
        reply = "بالنسبة لمسلك القانون (الفرنسي أو العربي)، تم الإعلان عن تعديلات طفيفة في توقيت محاضرات الفترة المسائية لتفادي الازدحام في المدرجات. يفضل تنزيل نسخة PDF المحدثة للكلية اليوم.";
      } else if (textLower.includes('eco') || textLower.includes('اقتصاد') || textLower.includes('gestion')) {
        reply = "طلبة مسلك الاقتصاد والتدبير: انتبهوا! مادة Microéconomie والرياضيات المالية مبرمجة مع أساتذة الفوج منذ الصباح الباكر؛ الحضور الفعلي ضروري جداً لاستيعاب التطبيقات.";
      } else if (textLower.includes('تغيير') || textLower.includes('تعديل') || textLower.includes('توقيت')) {
        reply = "استعمالات الزمن قابلة للتحديث من طرف الإدارة في الأيام الأولى للموسم. موقعنا يقوم بمسح تلقائي لموقع الكلية فور صدور أي مذكرة جديدة لتنزيل النسخة الرسمية فوراً.";
      } else if (textLower.includes('امتحان') || textLower.includes('اختبار')) {
        reply = "نماذج الاختبارات متوفرة في قسم 'الدروس والامتحانات' في الشريط العلوي للموقع. ننصحك بتحميلها لمعرفة صيغة الأسئلة المعتادة.";
      }

      setAiChatMessages(prev => [...prev, {
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString('ar-MA', { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsAiTyping(false);
    }, 1200);
  };

  const submitNotifForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifEmail.trim()) return;
    setIsNotifSubscribed(true);
    setTimeout(() => {
      setShowNotifModal(false);
      setIsNotifSubscribed(false);
      setNotifEmail('');
      alert('تم التسجيل بنجاح! ستتوصل بإشعار فوري عند صدور أي تحديث لاستعمال الزمن الخاص بك.');
    }, 1000);
  };

  return (
    <div className="text-right" dir="rtl">
      
      {/* 1) HERO SECTION */}
      <section className="mb-8 text-center bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 p-6 sm:p-12 rounded-3xl text-white shadow-xl relative overflow-hidden">
        {/* Decorative dynamic particles backgrounds */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -ml-28 -mb-28"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-400/20 text-blue-200 text-xs font-semibold mb-3 border border-blue-400/30">
            <Calendar size={12} className="text-blue-200" />
            <span>الموسم الجامعي 2025/2026</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold pb-3 leading-tight tracking-tight drop-shadow-sm">
            Emploi du Temps FSJES
          </h1>
          <p className="text-sm sm:text-lg text-blue-100/90 mb-8 font-light">
            ابحث عن استعمال الزمن الخاص بك حسب الكلية، المسلك، والسداسي. قم بالتصفير الذكي والتنزيل مباشرة بصيغة PDF.
          </p>

          {/* Search bar */}
          <div className="relative max-w-lg mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن استعمال الزمن الخاص بك..."
              className="w-full py-4 pr-12 pl-4 text-gray-900 bg-white rounded-full border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm font-medium"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute left-16 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                مسح
              </button>
            )}

            <button 
              className="absolute left-1.5 top-1.5 bottom-1.5 bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-full text-xs font-bold transition-all flex items-center gap-1"
            >
              <span>بحث ذكي</span>
            </button>
          </div>

          <div className="flex justify-center flex-wrap gap-4 mt-6 text-xs text-blue-200/80">
            <span>🔹 تحديث يومي</span>
            <span>🔹 نسخ رسمية معتمدة</span>
            <span>🔹 دعم التقسيم الجديد للأفواج</span>
          </div>
        </div>
      </section>

      {/* 2) PERSISTENCE / ACTION STATS PANEL */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        
        {/* Favorites Overview Panel */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Star className="fill-current" size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500">جداولك المفضلة</h4>
              <p className="text-xl font-bold text-gray-800">{favorites.length} جدول محفوظ</p>
            </div>
          </div>
          {favorites.length > 0 && (
            <button 
              onClick={() => {
                const favData = EMPLOIS_DATA.filter(item => favorites.includes(item.id));
                if (favData.length > 0) {
                  setSearchQuery('');
                  // Clear filters to show only favorites
                  setSelectedFaculty('all');
                  setSelectedFiliere('all');
                  setSelectedSemestre('all');
                  // Trigger filters dynamically or showcase them
                }
              }}
              className="text-xs text-blue-600 hover:underline font-bold"
            >
              تصفية بالمفضلة
            </button>
          )}
        </div>

        {/* Real-Time Status Notification */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center animate-pulse">
              <Bell size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500">إشعارات التحديث</h4>
              <p className="text-sm font-bold text-gray-800">تنبيهات فورية على هاتفك</p>
            </div>
          </div>
          <button 
            onClick={() => setShowNotifModal(true)}
            className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors"
          >
            تفعيل التنبيهات
          </button>
        </div>

        {/* System Health / Artificial Intelligence Integration */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500">قاعدة البيانات المحدثة</h4>
              <p className="text-xs text-gray-600 font-medium">سريعة الاستجابة وصديقة لمحركات البحث</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-green-50 text-green-700 text-[10px] font-extrabold uppercase tracking-wide border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            مؤمن
          </span>
        </div>
      </section>

      {/* 3) FILTER SECTION */}
      <section className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 mb-8">
        <div className="flex items-center gap-2 mb-6 border-b pb-3">
          <Layers size={18} className="text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">منظومة التصفية السريعة والبحث الهيكلي</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          
          {/* FACULTE FILTER */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2">الفوج حسب الكلية</label>
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className="w-full text-xs p-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              {FACULTIES.map(fac => (
                <option key={fac.id} value={fac.id}>{fac.name}</option>
              ))}
            </select>
          </div>

          {/* FILIERE FILTER */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2">شعبة الدراسة / المسلك</label>
            <select
              value={selectedFiliere}
              onChange={(e) => setSelectedFiliere(e.target.value)}
              className="w-full text-xs p-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              {FILIERES.map(fili => (
                <option key={fili.id} value={fili.id}>{fili.name}</option>
              ))}
            </select>
          </div>

          {/* SEMESTRE FILTER */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2">الفصل الدراسي</label>
            <select
              value={selectedSemestre}
              onChange={(e) => setSelectedSemestre(e.target.value)}
              className="w-full text-xs p-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              {SEMESTRES_LIST.map(sem => (
                <option key={sem.id} value={sem.id}>{sem.name}</option>
              ))}
            </select>
          </div>

          {/* SECTION FILTER */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2">الفوج / المجموعات</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full text-xs p-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              {SECTIONS_LIST.map(sect => (
                <option key={sect.id} value={sect.id}>{sect.name}</option>
              ))}
            </select>
          </div>

          {/* ACADEMIC YEAR FILTER */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2">السنة الدراسية</label>
            <select
              value={selectedAnnee}
              onChange={(e) => setSelectedAnnee(e.target.value)}
              className="w-full text-xs p-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              {ANNEES_LIST.map(ann => (
                <option key={ann.id} value={ann.id}>{ann.name}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Reset filtering helper */}
        <div className="mt-4 flex flex-wrap gap-2 items-center justify-between text-xs pt-3 border-t border-gray-100">
          <p className="text-gray-500">
            تم العثور على <span className="font-bold text-blue-700">{filteredSchedules.length}</span> جدول دراسي يلائم فلاترك الحالية.
          </p>
          
          {(selectedFaculty !== 'all' || selectedFiliere !== 'all' || selectedSemestre !== 'all' || selectedAnnee !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedFaculty('all');
                setSelectedFiliere('all');
                setSelectedSemestre('all');
                setSelectedSection('all');
                setSelectedAnnee('all');
                setSearchQuery('');
              }}
              className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1.5"
            >
              إعادة تعيين كافة الفلاتر 🔄
            </button>
          )}
        </div>
      </section>

      {/* 4) CORE LAYOUT BENTO GRID SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        {/* Left Side: Schedule Cards (Takes major spacing) */}
        <div className="lg:col-span-2 space-y-4">
          
          {filteredSchedules.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-200 p-12 rounded-3xl text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">عذراً، لم نجد أي استعمال زمن يطابق خياراتك الحالية!</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                ابحث عبر كلمات أبسط (مثال: "قانون" أو "S2") أو قم بتعطيل فلاتر الكلية وإجراء تصفح موسع.
              </p>
              <button
                onClick={() => {
                  setSelectedFaculty('all');
                  setSelectedFiliere('all');
                  setSelectedSemestre('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all"
              >
                عرض كل الجداول
              </button>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredSchedules.map((schedule, idx) => {
                const isFav = favorites.includes(schedule.id);
                const isSelected = previewSchedule?.id === schedule.id;
                
                return (
                  <motion.div
                    key={schedule.id}
                    layoutId={`schedule-card-${schedule.id}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    className={`bg-white rounded-2xl border transition-all duration-300 p-5 relative overflow-hidden group ${
                      isSelected 
                        ? 'border-blue-600 ring-2 ring-blue-500/10 shadow-lg shadow-blue-500/5' 
                        : 'border-gray-150 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    {/* Corner Tag */}
                    <div className="absolute top-0 left-0 bg-blue-600 text-white text-[9px] font-extrabold px-3 py-1 rounded-br-xl uppercase tracking-wider">
                      {FACULTIES.find(f => f.id === schedule.faculte)?.nameFr}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mt-2">
                      <div className="space-y-2">
                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-1 text-[10px] font-bold bg-blue-50 text-blue-700 rounded-full border border-blue-105">
                            {FILIERES.find(f => f.id === schedule.filiere)?.nameFr}
                          </span>
                          <span className="px-2.5 py-1 text-[10px] font-bold bg-purple-50 text-purple-700 rounded-full border border-purple-105">
                            {schedule.semestre}
                          </span>
                          <span className="px-2.5 py-1 text-[10px] font-medium text-gray-500 bg-gray-100 rounded-full">
                            فوج: {schedule.section}
                          </span>
                        </div>

                        {/* Title */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                            {schedule.titleAr}
                          </h3>
                          <p className="text-xs text-gray-400 font-mono mt-0.5" dir="ltr">
                            {schedule.title} ({schedule.anneeUniversitaire})
                          </p>
                        </div>

                        {/* Details */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 font-medium">
                          <span className="flex items-center gap-1.5">
                            <Clock size={13} className="text-gray-400" />
                            <span>آخر تحديث: {schedule.derniereMiseAJour}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={13} className="text-gray-400" />
                            <span>{FACULTIES.find(f => f.id === schedule.faculte)?.name}</span>
                          </span>
                        </div>

                        {/* Insights snippet */}
                        {schedule.notesAr && (
                          <p className="text-xs text-blue-600/90 font-medium leading-relaxed bg-blue-50/50 p-2.5 rounded-xl border border-blue-50">
                            📢 {schedule.notesAr}
                          </p>
                        )}
                      </div>

                      {/* Right Action Widgets */}
                      <div className="flex sm:flex-col items-end gap-2 shrink-0 sm:border-r sm:pr-4 sm:border-gray-100 min-w-[130px]">
                        
                        {/* Favorite button */}
                        <button
                          onClick={(e) => toggleFavorite(schedule.id, e)}
                          className={`w-full text-right flex items-center gap-1.5 p-2 rounded-xl text-xs transition-colors ${
                            isFav 
                              ? 'bg-amber-50 text-amber-700' 
                              : 'hover:bg-gray-50 text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <Star className={isFav ? 'fill-current text-amber-500' : ''} size={15} />
                          <span className="font-semibold">{isFav ? 'مفضل مسبقاً' : 'إضافة للمفضلة'}</span>
                        </button>

                        {/* Copy link share */}
                        <button
                          onClick={(e) => handleCopyLink(schedule.slug, schedule.id, e)}
                          className="w-full text-right flex items-center gap-1.5 p-2 rounded-xl text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          {copiedId === schedule.id ? (
                            <>
                              <CheckCircle className="text-green-500" size={15} />
                              <span className="font-semibold text-green-600">تم نسخ الرابط!</span>
                            </>
                          ) : (
                            <>
                              <Share2 size={15} />
                              <span>مشاركة رابط SEO</span>
                            </>
                          )}
                        </button>
                        
                        {/* Downloads indicator */}
                        <div className="hidden sm:block text-[11px] text-gray-400 font-medium font-mono text-left w-full pl-2">
                          📥 {downloadsCounter[schedule.id] || 124} تنزيل
                        </div>
                      </div>
                    </div>

                    {/* Footer Buttons layout */}
                    <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                      
                      {/* View Button */}
                      <button
                        onClick={() => {
                          setPreviewSchedule(schedule);
                          setPdfPage(1);
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 ${
                          isSelected 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                            : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200'
                        }`}
                      >
                        <Eye size={15} />
                        <span>عرض استعمال الزمن</span>
                      </button>

                      {/* Download PDF button */}
                      <button
                        disabled={downloadingId === schedule.id}
                        onClick={(e) => handleDownload(schedule.file, schedule.id, e)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition-all disabled:opacity-50"
                      >
                        {downloadingId === schedule.id ? (
                          <>
                            <div className="w-14 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>جاري التجهيز...</span>
                          </>
                        ) : (
                          <>
                            <Download size={15} />
                            <span>تحميل PDF</span>
                          </>
                        )}
                      </button>

                    </div>

                    {/* AI analysis dynamic trigger */}
                    {schedule.aiInsightsAr && (
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-purple-700 bg-purple-50/50 p-3 rounded-xl">
                        <span className="flex items-center gap-1.5">
                          <Sparkles size={14} className="text-purple-600" />
                          <span className="font-semibold">{schedule.aiInsightsAr}</span>
                        </span>
                        <button 
                          onClick={() => {
                            setAiChatMessages(prev => [
                              ...prev,
                              {
                                sender: 'user',
                                text: `أريد معرفة المزيد عن مادة ${schedule.titleAr}`,
                                time: new Date().toLocaleTimeString('ar-MA', { hour: '2-digit', minute: '2-digit' })
                              },
                              {
                                sender: 'ai',
                                text: `أهلاً بك! مادة "${schedule.titleAr}" تتطلب دراسة منتظمة بمعدل 4 ساعات أسبوعياً خارج الكلية. أهم المحاور تتناول المخططات والامتحانات التي أضفناها في قسم الدروس. لتسهيل ذلك، تم توفير تلخيصات في القسم العلوي.`,
                                time: new Date().toLocaleTimeString('ar-MA', { hour: '2-digit', minute: '2-digit' })
                              }
                            ]);
                            // Smooth scroll to bot panel if needed
                            document.getElementById('ai-assistant-panel')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-purple-700 font-extrabold underline hover:text-purple-900 pr-2 block shrink-0"
                        >
                          اسأل الذكاء الاصطناعي ↗
                        </button>
                      </div>
                    )}

                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}

        </div>

        {/* Right Side: Sidebar Widgets (AI Interactive Chatbot, PDF Frame View) */}
        <div className="space-y-6">
          
          {/* INTERACTIVE PDF VIEW PANEL (Activates with selected schedule) */}
          <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-md">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <div className="flex items-center gap-2">
                <FileText className="text-red-500" size={18} />
                <h3 className="font-bold text-gray-800 text-sm">معاين استعمال الزمن الفوري</h3>
              </div>
              
              {previewSchedule && (
                <button 
                  onClick={() => setPreviewSchedule(null)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {previewSchedule ? (
              <div className="space-y-4">
                
                {/* Header Metadata */}
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{previewSchedule.titleAr}</h4>
                  <p className="text-[11px] text-gray-400 font-mono mt-0.5" dir="ltr">{previewSchedule.file.name}</p>
                </div>

                {/* Simulated PDF Canvas Container */}
                <div className="border border-gray-200 rounded-2xl bg-slate-900 aspect-[3/4] p-4 flex flex-col justify-between text-white relative overflow-hidden select-none">
                  {/* Watermark grid background */}
                  <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-[0.03] pointer-events-none">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="border border-white flex items-center justify-center font-mono text-[8px]">
                        FSJES
                      </div>
                    ))}
                  </div>

                  {/* Top Bar of PDF Viewer */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 z-10 text-[10px] text-white/60 font-mono">
                    <span>PAGE {pdfPage} OF {previewSchedule.file.pages}</span>
                    <span>RESOLUTION: 300 DPI</span>
                  </div>

                  {/* PDF Center Simulated grid schedule body */}
                  <div className="flex-1 flex flex-col justify-center items-center py-4 z-10 text-center">
                    <div className="space-y-2 max-w-xs px-2">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-1">
                        <FileText size={20} />
                      </div>
                      <span className="inline-block text-[9px] font-extrabold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full mb-1">
                        OFFICIAL PDF
                      </span>
                      <h5 className="font-black text-xs text-white/90 leading-tight">
                        استعمال الزمن {previewSchedule.semestre}
                      </h5>
                      <p className="text-[9px] text-white/60">
                        {FACULTIES.find(f => f.id === previewSchedule.faculte)?.name}
                      </p>
                      
                      {/* Grid representation */}
                      <div className="grid grid-cols-6 gap-1 w-full bg-white/5 p-1.5 rounded-lg border border-white/10 text-[6px] font-mono select-none mt-2">
                        <div className="bg-white/10 p-0.5">LUN</div>
                        <div className="bg-white/10 p-0.5 font-bold text-emerald-400">MATH</div>
                        <div className="bg-white/10 p-0.5">---</div>
                        <div className="bg-white/10 p-0.5 font-bold text-blue-400">ECO</div>
                        <div className="bg-white/10 p-0.5">---</div>
                        <div className="bg-white/10 p-0.5 font-bold text-purple-400">LAW</div>

                        <div className="bg-white/10 p-0.5">MAR</div>
                        <div className="bg-white/10 p-0.5">---</div>
                        <div className="bg-white/10 p-0.5 font-bold text-emerald-400">STAT</div>
                        <div className="bg-white/10 p-0.5">---</div>
                        <div className="bg-white/10 p-0.5 font-bold text-blue-400">MNGT</div>
                        <div className="bg-white/10 p-0.5">---</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Bar Controls inside PDF Canvas */}
                  <div className="flex justify-between items-center text-[9px] text-white/50 border-t border-white/10 pt-2 z-10">
                    <span>حجم المعاينة: %{pdfZoom}</span>
                    <span className="font-mono text-right">{previewSchedule.file.size}</span>
                  </div>
                </div>

                {/* PDF Control Buttons */}
                <div className="flex items-center justify-between gap-2 p-1 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setPdfZoom(prev => Math.max(50, prev - 10))}
                      className="p-1.5 text-xs font-bold text-gray-500 hover:text-gray-900"
                      title="تصغير"
                    >
                      -
                    </button>
                    <span className="text-[10px] font-mono text-gray-600 px-1">% {pdfZoom}</span>
                    <button 
                      onClick={() => setPdfZoom(prev => Math.min(200, prev + 10))}
                      className="p-1.5 text-xs font-bold text-gray-500 hover:text-gray-900"
                      title="تكبير"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      disabled={pdfPage <= 1}
                      onClick={() => setPdfPage(p => p - 1)}
                      className="p-1.5 text-gray-500 hover:text-gray-900 disabled:opacity-30"
                    >
                      <ChevronRight size={14} />
                    </button>
                    <span className="text-[10px] text-gray-600">{pdfPage} من {previewSchedule.file.pages}</span>
                    <button
                      disabled={pdfPage >= previewSchedule.file.pages}
                      onClick={() => setPdfPage(p => p + 1)}
                      className="p-1.5 text-gray-500 hover:text-gray-900 disabled:opacity-30"
                    >
                      <ChevronLeft size={14} />
                    </button>
                  </div>
                </div>

                {/* Download PDF button */}
                <button
                  disabled={downloadingId === previewSchedule.id}
                  onClick={(e) => handleDownload(previewSchedule.file, previewSchedule.id, e)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-red-650 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors bg-blue-600"
                >
                  <Download size={15} />
                  <span>تنزيل نسخة PDF مباشرة</span>
                </button>

              </div>
            ) : (
              <div className="py-12 text-center">
                <FileText className="mx-auto text-gray-300 mb-3" size={32} />
                <p className="text-xs text-gray-400">انقر فوق "عرض استعمال الزمن" لأي جدول لفتح المعاينة الفورية والتنزيل المباشر.</p>
              </div>
            )}
          </div>

          {/* AI ACADEMIC ASSISTANT DISPATCHER */}
          <div id="ai-assistant-panel" className="bg-white rounded-3xl p-6 border border-gray-150 shadow-md">
            <div className="flex items-center gap-2 mb-4 border-b pb-3 text-purple-700">
              <Bot size={18} />
              <h3 className="font-bold text-sm">مستشار الدراسة والجدولة الذكي</h3>
            </div>

            <div className="space-y-4">
              {/* Chat messages */}
              <div className="space-y-3 max-h-[220px] overflow-y-auto p-1 text-xs">
                {aiChatMessages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-2xl leading-relaxed max-w-[85%] ${
                      msg.sender === 'ai' 
                        ? 'bg-purple-50 text-purple-950 border border-purple-100 mr-auto' 
                        : 'bg-blue-600 text-white ml-auto'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="block text-[9px] text-gray-400 mt-1 select-none text-left">{msg.time}</span>
                  </div>
                ))}

                {isAiTyping && (
                  <div className="p-3 rounded-2xl bg-purple-50 text-purple-950 border border-purple-100 mr-auto max-w-[85%]">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce delay-100"></span>
                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce delay-200"></span>
                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce delay-300"></span>
                    </span>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendAiQuestion()}
                  placeholder="اسأل المساعد الذكي حول استعمال الزمن..."
                  className="flex-1 p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={sendAiQuestion}
                  className="p-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors shrink-0"
                >
                  <Send size={14} />
                </button>
              </div>

              {/* Quick Prompt Chips */}
              <div className="pt-2 border-t border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 mb-2">أسئلة شائعة يمكنك طرحها:</p>
                <div className="flex flex-wrap gap-1.5">
                  <button 
                    onClick={() => {
                      setAiInput('ما هو توقيت شعبة القانون؟');
                    }}
                    className="px-2 py-1 bg-gray-50 hover:bg-purple-50 text-[10px] rounded-lg text-gray-600 hover:text-purple-700 transition-colors"
                  >
                    📖 توقيت شعبة القانون
                  </button>
                  <button 
                    onClick={() => {
                      setAiInput('كيف استغل السداسي الثاني؟');
                    }}
                    className="px-2 py-1 bg-gray-50 hover:bg-purple-50 text-[10px] rounded-lg text-gray-600 hover:text-purple-700 transition-colors"
                  >
                    🚀 نصيحة للسداسي الثاني
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* 5) NOTIFICATIONS REGISTER MODAL */}
      <AnimatePresence>
        {showNotifModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotifModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            ></motion.div>

            {/* Modal Body */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative z-10 text-right"
              dir="rtl"
            >
              <button 
                onClick={() => setShowNotifModal(false)}
                className="absolute top-4 left-4 p-1 rounded-full hover:bg-gray-150 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-4 text-blue-600">
                <Bell className="animate-bounce" size={24} />
                <h3 className="text-xl font-bold">تفعيل التنبيهات الفورية 🔔</h3>
              </div>
              
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                هل مللت من متابعة موقع الكلية كل دقيقة لمشاهدة التحديثات؟ سجل بريدك الإلكتروني هنا وسنقوم بإرسال تنبيه آلي لحظة نشر الإدارة لأي تعديل يخص مسلكك الجامعي.
              </p>

              <form onSubmit={submitNotifForm} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">مسلك الدراسة لتلقي تنبيهاته</label>
                  <select className="w-full text-xs p-3 border border-gray-200 rounded-xl bg-gray-50">
                    <option>القانون بالفرنسية (Droit Français)</option>
                    <option>القانون بالعربية (Droit Arabe)</option>
                    <option>الاقتصاد (Sciences Économiques)</option>
                    <option>التدبير والتسيير (Gestion & Commerce)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">الفصل المفضل</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['S1', 'S2', 'S3', 'S4', 'S5', 'S6'].map((sem) => (
                      <button
                        type="button"
                        key={sem}
                        onClick={() => {
                          if (notifSelectedGroups.includes(sem)) {
                            setNotifSelectedGroups(prev => prev.filter(s => s !== sem));
                          } else {
                            setNotifSelectedGroups(prev => [...prev, sem]);
                          }
                        }}
                        className={`py-2 text-xs font-bold rounded-lg transition-colors border ${
                          notifSelectedGroups.includes(sem) 
                            ? 'bg-blue-600 text-white border-blue-700' 
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {sem}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">بريدك الإلكتروني (تنبيهات فورية)</label>
                  <input
                    type="email"
                    required
                    value={notifEmail}
                    onChange={(e) => setNotifEmail(e.target.value)}
                    placeholder="Ex: student@univ.ma"
                    className="w-full p-3 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isNotifSubscribed}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-bold hover:opacity-90 transition-all shadow-md"
                >
                  {isNotifSubscribed ? 'جاري تفعيل الاشتراك...' : 'تأكيد التسجيل في الإشعارات'}
                </button>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
