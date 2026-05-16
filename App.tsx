import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Mail, 
  Info, 
  Search, 
  Heart,
  Code,
  Globe
} from 'lucide-react';
import { COLLEGES, SEMESTERS } from './constants';
import { searchStudents } from './services/searchService';
import type { StudentResult } from './types';

// --- Reusable Components ---

const Navigation = ({ currentView, onViewChange }: { currentView: string, onViewChange: (view: 'home' | 'about') => void }) => (
  <nav className="flex justify-center gap-4 mb-8" dir="rtl">
    <button
      onClick={() => onViewChange('home')}
      className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 font-medium ${
        currentView === 'home' 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
        : 'bg-white text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Search size={18} />
      <span>البحث</span>
    </button>
    <button
      onClick={() => onViewChange('about')}
      className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 font-medium ${
        currentView === 'about' 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
        : 'bg-white text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Info size={18} />
      <span>من نحن</span>
    </button>
  </nav>
);

const Header = () => (
  <header className="max-w-3xl mx-auto text-center mb-6">
    <h1 className="text-4xl font-bold text-blue-700 mb-2">Section FSJES - ابحث عن فوجك الدراسي</h1>
    <p className="text-lg text-gray-600">Powered by ACHRAF NAIMI</p>
  </header>
);

interface NoticeProps {
  onAccept: () => void;
}
const Notice: React.FC<NoticeProps> = ({ onAccept }) => (
  <div className="max-w-3xl mx-auto bg-yellow-50 border-r-4 border-yellow-400 p-4 rounded-lg mb-8 shadow-sm" role="alert">
    <h3 className="font-bold text-yellow-800">تنبيه هام</h3>
    <p className="text-yellow-700 mt-1">يرجى إدخال النسب باللغة الفرنسية كما هو مكتوب في موقع الكلية او البطاقة الوطنية.</p>
    <p className="text-sm text-yellow-600 mt-2">الموقع لا يتحمل مسؤولية أي خطأ في الفوج بسبب خطأ إداري أو من المستخدم.</p>
    <div className="mt-4">
      <button onClick={onAccept} className="px-5 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
        موافق
      </button>
    </div>
  </div>
);

interface CollegeSelectorProps {
  selectedCollege: string;
  onSelectCollege: (collegeId: string) => void;
  error?: boolean;
}
const CollegeSelector: React.FC<CollegeSelectorProps> = ({ selectedCollege, onSelectCollege, error }) => (
  <section className="mb-8">
    <label className="block text-lg font-semibold text-gray-800 mb-3">
      1) اختر الكلية <span className="text-red-500">*</span>
    </label>
    <div className={`flex flex-wrap gap-3 p-1 rounded-xl transition-all ${error ? 'ring-2 ring-red-500 bg-red-50' : ''}`}>
      {COLLEGES.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelectCollege(c.id)}
          className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${selectedCollege === c.id ? 'bg-blue-600 text-white border-blue-700 font-semibold shadow-md' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-600'}`}
          aria-pressed={selectedCollege === c.id}
        >
          {c.label}
        </button>
      ))}
    </div>
    {error && <p className="text-red-500 text-sm mt-2">هذا الحقل إجباري</p>}
  </section>
);

interface SemesterSelectorProps {
    selectedSemester: string;
    onSelectSemester: (semester: string) => void;
    error?: boolean;
}
const SemesterSelector: React.FC<SemesterSelectorProps> = ({ selectedSemester, onSelectSemester, error }) => (
    <section className="mb-8">
        <label htmlFor="semester-select" className="block text-lg font-semibold text-gray-800 mb-3">
          2) اختر الفصل المناسب لك <span className="text-red-500">*</span>
        </label>
        <div className="relative">
            <select
                id="semester-select"
                value={selectedSemester}
                onChange={(e) => onSelectSemester(e.target.value)}
                className={`w-full p-3 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
            >
                <option value="" disabled>-- اختر الفصل --</option>
                {SEMESTERS.map((s) => (
                    <option key={s} value={s}>
                        {s}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-gray-700">
                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">هذا الحقل إجباري</p>}
    </section>
);

interface SearchFormProps {
  familyName: string;
  onFamilyNameChange: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isLoading: boolean;
  error?: boolean;
}
const SearchForm: React.FC<SearchFormProps> = ({ familyName, onFamilyNameChange, onSubmit, onCancel, isLoading, error }) => (
  <form onSubmit={onSubmit} className="mb-8">
    <label htmlFor="family-name-input" className="block text-lg font-semibold text-gray-800 mb-3">
      3) إدخال النسب (بالفرنسية) <span className="text-red-500">*</span>
    </label>
    <input
      id="family-name-input"
      value={familyName}
      onChange={(e) => onFamilyNameChange(e.target.value)}
      placeholder="Ex: El Amrani"
      className={`w-full p-3 border rounded-lg mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
      aria-label="إدخال النسب"
    />
    {error && <p className="text-red-500 text-sm mb-4">هذا الحقل إجباري</p>}
    <div className={`flex gap-3 ${!error ? 'mt-4' : ''}`}>
      <button
        type="submit"
        className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        disabled={isLoading}
        aria-label="بحث"
      >
        {isLoading ? 'جاري البحث...' : 'بحث'}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-2 rounded-lg border border-gray-400 text-gray-700 font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors duration-200"
        aria-label="إلغاء"
      >
        إلغاء
      </button>
    </div>
  </form>
);

interface ResultsProps {
  results: StudentResult[];
  isLoading: boolean;
  searched: boolean;
}
const Results: React.FC<ResultsProps> = ({ results, isLoading, searched }) => (
  <section aria-live="polite">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 text-center">الفصول الدراسية</h2>
    {isLoading ? (
      <div className="flex flex-col justify-center items-center p-12 space-y-4">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 text-lg">جاري البحث في قاعدة البيانات...</p>
      </div>
    ) : !searched ? (
       <div className="text-center p-10 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl">
         <p className="text-gray-400">أدخل النسب للبحث عن فوجك الدراسي.</p>
       </div>
    ) : results.length === 0 ? (
      <div className="bg-red-50 border border-red-100 p-8 rounded-2xl text-center">
        <p className="text-red-600 font-bold text-xl">لم يتم العثور على أي نتيجة.</p>
        <p className="text-red-400 mt-2 text-sm">تأكد من كتابة النسب بشكل صحيح وبالفرنسية.</p>
      </div>
    ) : (
      <div className="flex justify-center">
        {results.map(r => (
          <div key={r.id} className="w-full max-w-sm p-10 border border-gray-100 rounded-3xl bg-white shadow-2xl shadow-blue-900/5 transition-all hover:shadow-blue-900/10 flex flex-col items-center text-center">
            {/* Section Header */}
            <div className="mb-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                Section
              </span>
            </div>
            
            {/* Massive Section Letter */}
            <div className="text-8xl font-black text-blue-700 mb-6 drop-shadow-sm select-none">
              {r.section}
            </div>
            
            {/* Separator */}
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent rounded-full mb-6"></div>
            
            {/* Last Name */}
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 tracking-tight">{r.familyName}</p>
              <p className="text-sm text-gray-400 font-medium tracking-wide">النسب (بناءً على النطاق)</p>
            </div>
            
            {/* Modern Badge */}
            <div className="mt-8 pt-8 border-t border-gray-50 w-full">
              <div className="inline-flex items-center space-x-2 space-x-reverse text-blue-500">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 <span className="text-xs font-semibold">تأكد من مراجعة لوائح الكلية الرسمية</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </section>
);

const Footer = () => (
  <footer className="mt-12 text-center text-sm text-gray-500 pb-8">
    <div className="flex justify-center items-center gap-2 mb-2">
      <span>Made with</span>
      <Heart size={14} className="text-red-500 fill-current" />
      <span>by ACHRAF NAIMI</span>
    </div>
    <p>© {new Date().getFullYear()} Section FSJES - ابحث عن فوجك الدراسي.</p>
  </footer>
);

const AboutPage = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-3xl mx-auto text-right"
    dir="rtl"
  >
    {/* Profile Section */}
    <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-blue-600 opacity-10"></div>
      
      <div className="relative z-10">
        <div className="w-40 h-40 bg-white rounded-full mx-auto mb-6 border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden relative">
          <img 
            src="https://i.postimg.cc/sXtHLSyM/AI-profile-portrait-creation-202605162017-(1).jpg" 
            alt="ACHRAF NAIMI"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2">ACHRAF NAIMI</h2>
        <p className="text-blue-600 font-semibold mb-6">AI Builder & AI Automation Enthusiast</p>
        
        <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
          أنا أشرف، شاب في مقتبل العشرينات شغوف بالذكاء الاصطناعي وبناء الحلول الذكية باستخدامه. أسعى دائماً لترك أثر إيجابي في محيطي من خلال مشاركة الأفكار المفيدة وتطوير مشاريع تساعد الناس وتسهل عليهم حياتهم.
        </p>
        
        <div className="flex justify-center gap-4">
          <a href="mailto:achrafn314@gmail.com" className="p-3 bg-gray-100 rounded-full text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300">
            <Mail size={20} />
          </a>
          <a href="https://www.instagram.com/achrafn.ai/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-gray-100 rounded-full text-gray-700 hover:bg-white hover:shadow-md transition-all duration-300 flex items-center justify-center">
            <img 
              src="https://i.postimg.cc/Y0HfgxtM/images.jpg" 
              alt="Instagram" 
              className="w-6 h-6 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>
      </div>
    </div>

    {/* Purpose Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-2xl shadow-lg border-r-4 border-blue-500"
      >
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-600">
          <Search size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">الغرض من الموقع</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          تم إنشاء هذا الموقع لتسهيل عملية البحث عن الفوج الدراسي لطلبة كليات FSJES. بدلاً من البحث اليدوي الذي قد يأخذ وقتاً طويلاً، يمكنك الآن العثور على فوجك الدراسي بسهولة وفي ثوانٍ معدودة.
        </p>
      </motion.div>

      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-2xl shadow-lg border-r-4 border-green-500"
      >
        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 text-green-600">
          <Code size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">التكنولوجيا المستخدمة</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          يعتمد الموقع على أحدث التقنيات لضمان السرعة والكفاءة، مع تصميم متجاوب يعمل بشكل ممتاز على كافة الأجهزة، سواء الهواتف الذكية أو الحواسيب.
        </p>
      </motion.div>
    </div>

    {/* Message Section */}
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl mb-8">
      <div className="flex items-start gap-4">
        <div className="mt-1">
          <Info size={28} />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">كلمة للمستخدمين</h3>
          <p className="opacity-90 leading-relaxed">
            نتمنى أن يكون هذا العمل المتواضع مفيداً لكم في مساركم الدراسي. نحن نعمل باستمرار على تحديث قاعدة البيانات لضمان دقة النتائج. بالتوفيق لجميع الطلبة والطالبات.
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- Main App Component ---

function App() {
  const [view, setView] = useState<'home' | 'about'>('home');
  const [selectedCollege, setSelectedCollege] = useState<string>(COLLEGES[0]?.id || '');
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [familyName, setFamilyName] = useState<string>('');
  const [results, setResults] = useState<StudentResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);
  const [noticeAccepted, setNoticeAccepted] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState({
    college: false,
    semester: false,
    familyName: false
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const errors = {
      college: !selectedCollege,
      semester: !selectedSemester,
      familyName: !familyName.trim()
    };
    
    setValidationErrors(errors);
    
    if (errors.college || errors.semester || errors.familyName) {
      return;
    }

    setIsLoading(true);
    setSearched(true);
    setResults([]);

    try {
      const studentResults = await searchStudents(selectedCollege, familyName, selectedSemester);
      setResults(studentResults);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFamilyName('');
    setResults([]);
    setSearched(false);
    setValidationErrors({
      college: false,
      semester: false,
      familyName: false
    });
  };

  const acceptNotice = () => {
    setNoticeAccepted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <Header />
        <Navigation currentView={view} onViewChange={setView} />
        
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {!noticeAccepted && <Notice onAccept={acceptNotice} />}
              <main className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transition-all">
                <CollegeSelector 
                  selectedCollege={selectedCollege} 
                  onSelectCollege={(id) => {
                    setSelectedCollege(id);
                    if (validationErrors.college) setValidationErrors(prev => ({ ...prev, college: false }));
                  }} 
                  error={validationErrors.college}
                />
                <SemesterSelector 
                  selectedSemester={selectedSemester} 
                  onSelectSemester={(val) => {
                    setSelectedSemester(val);
                    if (validationErrors.semester) setValidationErrors(prev => ({ ...prev, semester: false }));
                  }} 
                  error={validationErrors.semester}
                />
                <SearchForm
                  familyName={familyName}
                  onFamilyNameChange={(val) => {
                    setFamilyName(val);
                    if (validationErrors.familyName) setValidationErrors(prev => ({ ...prev, familyName: false }));
                  }}
                  onSubmit={handleSearch}
                  onCancel={handleCancel}
                  isLoading={isLoading}
                  error={validationErrors.familyName}
                />
                <Results results={results} isLoading={isLoading} searched={searched} />
              </main>
            </motion.div>
          ) : (
            <AboutPage key="about" />
          )}
        </AnimatePresence>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;
