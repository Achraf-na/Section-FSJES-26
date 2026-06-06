import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Mail, 
  Info, 
  Search, 
  Code,
  Globe,
  BookOpen,
  Calendar,
  Shield
} from 'lucide-react';
import { COLLEGES, SEMESTERS } from './constants';
import { searchStudents } from './services/searchService';
import type { StudentResult } from './types';
import { CoursExamsPage } from './CoursExamsPage';
import { EmploiPage } from './EmploiPage';

// --- Reusable Components ---

const Navigation = ({ 
  currentView, 
  onNavigate
}: { 
  currentView: string; 
  onNavigate: (path: string) => void;
}) => {
  const isHome = currentView === 'home';
  const isCours = currentView === 'cours-exams';
  const isEmploi = currentView === 'emploi';
  const isAbout = currentView === 'about';
  
  return (
    <nav className="flex justify-center flex-wrap gap-4 mb-8" dir="rtl">
      <button
        onClick={() => onNavigate('/')}
        className={`flex items-center gap-3 px-6 py-2 rounded-2xl transition-all duration-300 cursor-pointer ${
          isHome 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98]' 
          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-150 hover:border-gray-300 hover:shadow-xs hover:scale-[1.02] active:scale-[0.98]'
        }`}
      >
        <Search size={18} className="shrink-0" />
        <div className="flex flex-col items-start leading-tight text-right">
          <span className="font-bold text-sm">البحث عن فوجك</span>
          <span className={`text-[9px] font-medium transition-colors ${isHome ? 'text-blue-200' : 'text-gray-400'}`}>Trouver votre section</span>
        </div>
      </button>

      <button
        onClick={() => onNavigate('/cours')}
        className={`flex items-center gap-3 px-6 py-2 rounded-2xl transition-all duration-300 cursor-pointer ${
          isCours 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98]' 
          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-150 hover:border-gray-300 hover:shadow-xs hover:scale-[1.02] active:scale-[0.98]'
        }`}
      >
        <BookOpen size={18} className="shrink-0" />
        <div className="flex flex-col items-start leading-tight text-right">
          <div className="flex items-center gap-1">
            <span className="font-bold text-sm">الدروس والامتحانات</span>
            <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold animate-pulse leading-none">جديد</span>
          </div>
          <span className={`text-[9px] font-medium transition-colors ${isCours ? 'text-blue-200' : 'text-gray-400'}`}>Cours & Examens</span>
        </div>
      </button>

      <button
        onClick={() => onNavigate('/emplois')}
        className={`flex items-center gap-3 px-6 py-2 rounded-2xl transition-all duration-300 cursor-pointer ${
          isEmploi 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98]' 
          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-150 hover:border-gray-300 hover:shadow-xs hover:scale-[1.02] active:scale-[0.98]'
        }`}
      >
        <Calendar size={18} className="shrink-0" />
        <div className="flex flex-col items-start leading-tight text-right">
          <span className="font-bold text-sm">استعمالات الزمن</span>
          <span className={`text-[9px] font-medium transition-colors ${isEmploi ? 'text-blue-200' : 'text-gray-400'}`}>Emploi du Temps</span>
        </div>
      </button>

      <button
        onClick={() => onNavigate('/about')}
        className={`flex items-center gap-3 px-6 py-2 rounded-2xl transition-all duration-300 cursor-pointer ${
          isAbout 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98]' 
          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-150 hover:border-gray-300 hover:shadow-xs hover:scale-[1.02] active:scale-[0.98]'
        }`}
      >
        <Info size={18} className="shrink-0" />
        <div className="flex flex-col items-start leading-tight text-right">
          <span className="font-bold text-sm">من نحن</span>
          <span className={`text-[9px] font-medium transition-colors ${isAbout ? 'text-blue-200' : 'text-gray-400'}`}>À propos</span>
        </div>
      </button>
    </nav>
  );
};

const Header = () => (
  <header className="max-w-3xl mx-auto text-center mb-6">
    <div className="flex items-center justify-center gap-3 mb-2" dir="ltr">
      <img 
        src="https://i.postimg.cc/RFNvr0vj/section-fsjes-logo-(3).png" 
        alt="Section FSJES Logo" 
        className="h-12 w-12 sm:h-16 sm:w-16 object-contain shrink-0"
        referrerPolicy="no-referrer"
      />
      <div className="text-3xl sm:text-4xl font-bold text-blue-700">Section FSJES</div>
    </div>
    <p className="text-lg text-gray-700">تعرف على فوجك الدراسي بسرعة</p>
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
  onAitMelloulClick: () => void;
  error?: boolean;
}
const CollegeSelector: React.FC<CollegeSelectorProps> = ({ selectedCollege, onSelectCollege, onAitMelloulClick, error }) => (
  <section className="mb-8">
    <label className="block text-lg font-bold text-gray-800 mb-3 text-right">
      1) اختر الكلية <span className="text-red-500">*</span>
    </label>
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-1.5 rounded-2xl transition-all ${error ? 'ring-2 ring-red-500 bg-red-50' : ''}`} dir="ltr">
      {COLLEGES.map((c) => {
        const isAitMelloul = c.id === 'fsjes_ait_melloul';
        const isSelected = selectedCollege === c.id && !isAitMelloul;
        
        if (isAitMelloul) {
          return (
            <button
              key={c.id}
              type="button"
              onClick={onAitMelloulClick}
              className="px-6 py-5 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/40 text-gray-405 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50/10 flex flex-col justify-between items-start text-left relative group cursor-pointer shadow-xs select-none opacity-80 min-h-[140px]"
              aria-pressed={false}
            >
              <div className="flex justify-between items-start w-full">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Université Ibn Zohr</span>
                  <span className="font-extrabold text-gray-700 text-lg sm:text-xl mt-1.5 group-hover:text-blue-600 transition-colors leading-none">{c.label}</span>
                </div>
                <span className="px-2.5 py-1 text-[9px] font-bold bg-amber-500 text-white rounded-lg border border-amber-600 uppercase tracking-wide shadow-sm animate-pulse">
                  Bientôt
                </span>
              </div>
              <div className="mt-3 text-left">
                <span className="text-xs font-semibold text-gray-400 block max-w-[250px] leading-tight">
                  Campus Universitaire Ait Melloul
                </span>
              </div>
            </button>
          );
        }

        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelectCollege(c.id)}
            className={`px-6 py-5 rounded-xl border-2 transition-all duration-300 text-left flex flex-col justify-between items-start min-h-[140px] shadow-xs cursor-pointer ${
              isSelected 
                ? 'bg-blue-600 border-blue-700 text-white shadow-md scale-[1.01]' 
                : 'bg-white border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:scale-[1.01]'
            }`}
            aria-pressed={isSelected}
          >
            <div className="flex flex-col text-left">
              <span className={`text-[10px] font-bold uppercase tracking-widest leading-none ${isSelected ? 'text-blue-200' : 'text-gray-400'}`}>
                Université Ibn Zohr
              </span>
              <span className="font-extrabold text-lg sm:text-xl mt-1.5 leading-none">
                {c.label}
              </span>
            </div>
            <div className="mt-3 text-left w-full">
              <span className={`text-[11px] sm:text-xs font-semibold block leading-normal ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                Faculté des Sciences Juridiques, Économiques et Sociales d'Agadir
              </span>
            </div>
          </button>
        );
      })}
    </div>
    {error && <p className="text-red-500 text-sm mt-2 text-right">هذا الحقل إجباري</p>}
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
  selectedSemester?: string;
}
const Results: React.FC<ResultsProps> = ({ results, isLoading, searched, selectedSemester }) => {
  const isSupported = selectedSemester ? [
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
    "السداسي 6 قانون خاص - مسار المهن القانونية والقضائية (25-26)"
  ].includes(selectedSemester) : true;

  return (
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
      ) : !isSupported ? (
        <div className="flex justify-center animate-fade-in">
          <div className="w-full max-w-sm p-10 border border-gray-100 rounded-3xl bg-white shadow-2xl shadow-blue-900/5 transition-all hover:shadow-blue-900/10 flex flex-col items-center text-center">
            {/* Top Graphic or Icon */}
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-500 border border-blue-100 shadow-xs">
              <span className="text-3xl">🚧</span>
            </div>
            
            {/* Title */}
            <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight leading-relaxed">
              قريباً
            </h3>
            
            {/* Divider */}
            <div className="w-16 h-0.5 bg-gray-100 mx-auto mb-4"></div>
            
            {/* Message */}
            <p className="text-gray-600 text-base font-medium leading-relaxed">
              هذه الشعبة قيد الإضافة وستكون متاحة قريباً.
            </p>
          </div>
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
              <div className={`font-black text-blue-700 mb-6 drop-shadow-sm select-none ${
                r.section && r.section.length > 5 
                  ? 'text-4xl sm:text-5xl' 
                  : r.section && r.section.length > 2 
                    ? 'text-6xl' 
                    : 'text-8xl'
              }`}>
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
};

const Footer = ({ currentView, onNavigate }: { currentView: string; onNavigate: (path: string) => void }) => (
  <footer className="mt-16 border-t border-gray-200/80 pt-8 pb-12 text-center animate-fade-in" dir="rtl">
    <div className="max-w-3xl mx-auto px-4 flex flex-col items-center gap-6">
      
      {/* Navigation Links */}
      <div className="flex justify-center flex-wrap gap-x-8 gap-y-3 text-sm font-bold">
        <button
          onClick={() => onNavigate('/')}
          className={`transition-colors duration-200 cursor-pointer ${
            currentView === 'home' 
              ? 'text-blue-600 font-extrabold' 
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          الرئيسية
        </button>
        <button
          onClick={() => onNavigate('/cours')}
          className={`transition-colors duration-200 cursor-pointer ${
            currentView === 'cours-exams' 
              ? 'text-blue-600 font-extrabold' 
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          الدروس والامتحانات
        </button>
        <button
          onClick={() => onNavigate('/emplois')}
          className={`transition-colors duration-200 cursor-pointer ${
            currentView === 'emploi' 
              ? 'text-blue-600 font-extrabold' 
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          استعمالات الزمن
        </button>
        <button
          onClick={() => onNavigate('/about')}
          className={`transition-colors duration-200 cursor-pointer ${
            currentView === 'about' 
              ? 'text-blue-600 font-extrabold' 
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          من نحن
        </button>
        <button
          onClick={() => onNavigate('/privacy-policy')}
          className={`transition-colors duration-200 cursor-pointer ${
            currentView === 'privacy' 
              ? 'text-blue-600 font-extrabold' 
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          سياسة الخصوصية
        </button>
      </div>

      {/* Footer SEO Text */}
      <p className="text-gray-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mt-4" dir="rtl">
        Section FSJES aide les étudiants à trouver rapidement leur section académique, les répartitions et les emplois du temps en quelques clics.
      </p>

      {/* Creator & Copyright Badge */}
      <div className="flex flex-col items-center gap-3 mt-2">
        <div className="flex items-center justify-center gap-1.5 text-sm text-gray-500 font-medium select-none" dir="ltr">
          <span>Powered by</span>
          <span className="font-bold text-gray-700 hover:text-blue-600 transition-colors duration-300">ACHRAF NAIMI</span>
        </div>
        
        <p className="text-[13px] sm:text-sm text-gray-400 font-medium select-none" dir="ltr">
          Copyright © 2026 Section FSJES. All rights reserved.
        </p>
      </div>

    </div>
  </footer>
);

const PrivacyPage = () => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    className="max-w-3xl mx-auto text-right"
    dir="rtl"
  >
    <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 mb-8 border border-gray-100 relative overflow-hidden animate-fade-in">
      {/* Decorative Top Accent */}
      <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-blue-600 to-blue-500"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-150 pb-6 mb-8 mt-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-xs border border-blue-100/40">
            <Shield size={22} className="shrink-0" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-none mb-1">سياسة الخصوصية</h2>
            <p className="text-gray-400 text-[11px] font-bold">آخر تحديث: يونيو 2026</p>
          </div>
        </div>
        <span className="self-start sm:self-center px-3.5 py-1.5 text-[10px] font-bold text-blue-700 bg-blue-50 rounded-xl border border-blue-100 select-none uppercase tracking-wider">
          Section FSJES
        </span>
      </div>

      <p className="text-gray-700 leading-relaxed font-semibold mb-8 text-sm sm:text-base bg-blue-50/20 rounded-2xl p-5 border border-blue-100/30">
        مرحباً بكم في موقع <span className="text-blue-600 font-bold">Section FSJES</span>. يهدف هذا الموقع إلى مساعدة طلبة كليات FSJES في العثور على السكسيون أو الفوج الدراسي الخاص بهم بسرعة وسهولة.
      </p>

      <div className="space-y-8">
        {/* Section 1 */}
        <div className="relative pr-5 border-r-[3px] border-blue-500/80">
          <h3 className="text-lg font-black text-gray-900 mb-2">المعلومات التي نجمعها:</h3>
          <ul className="text-gray-650 text-sm leading-relaxed space-y-2 list-disc list-inside font-medium pr-1">
            <li>لا نقوم بجمع أي معلومات شخصية حساسة.</li>
            <li>لا نطلب التسجيل أو إنشاء حساب.</li>
            <li>قد يتم استخدام بيانات إحصائية مجهولة المصدر لتحسين أداء الموقع وتجربة المستخدم.</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="relative pr-5 border-r-[3px] border-blue-500/80">
          <h3 className="text-lg font-black text-gray-900 mb-2">ملفات تعريف الارتباط (Cookies):</h3>
          <p className="text-gray-655 text-sm leading-relaxed font-medium">
            قد يستخدم الموقع ملفات تعريف الارتباط لتحسين تجربة المستخدم وتحليل أداء الموقع.
          </p>
        </div>

        {/* Section 3 */}
        <div className="relative pr-5 border-r-[3px] border-blue-500/80">
          <h3 className="text-lg font-black text-gray-900 mb-2">روابط خارجية:</h3>
          <p className="text-gray-655 text-sm leading-relaxed font-medium">
            قد يحتوي الموقع على روابط لمواقع خارجية، ولسنا مسؤولين عن محتوى أو سياسات تلك المواقع.
          </p>
        </div>

        {/* Section 4 */}
        <div className="relative pr-5 border-r-[3px] border-blue-500/80">
          <h3 className="text-lg font-black text-gray-900 mb-2">حماية البيانات:</h3>
          <p className="text-gray-655 text-sm leading-relaxed font-medium">
            نسعى إلى حماية خصوصية المستخدمين وعدم مشاركة أي بيانات مع أي طرف ثالث.
          </p>
        </div>

        {/* Section 5 */}
        <div className="relative pr-5 border-r-[3px] border-blue-500/80">
          <h3 className="text-lg font-black text-gray-900 mb-2">التعديلات:</h3>
          <p className="text-gray-655 text-sm leading-relaxed font-medium">
            قد يتم تحديث سياسة الخصوصية من وقت لآخر، وسيتم نشر أي تغييرات في هذه الصفحة.
          </p>
        </div>
      </div>
    </div>
  </motion.div>
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
        <p className="text-blue-600 font-semibold mb-6">AI Automation Builder</p>
        
        <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
          أنا أشرف، شاب في مقتبل العشرينات شغوف بالذكاء الاصطناعي وبناء الحلول الذكية باستخدامه. أسعى دائماً لترك أثر إيجابي في محيطي من خلال مشاركة الأفكار المفيدة وتطوير مشاريع تساعد الناس وتسهل عليهم حياتهم.
        </p>
        
        {/* Divider */}
        <div className="w-24 h-0.5 bg-gray-100 mx-auto my-8"></div>
        
        {/* Contact Section */}
        <div className="mt-6">
          <h4 className="text-xl font-bold text-gray-800 mb-6 relative inline-block">
            تواصل معي
            <span className="absolute bottom-[-6px] right-0 left-0 h-[3px] bg-blue-600 rounded-full"></span>
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mt-2">
            {/* Email Card */}
            <a 
              href="mailto:achrafn314@gmail.com" 
              className="flex flex-col items-center justify-center p-5 bg-gray-50 hover:bg-blue-50/50 rounded-2xl border border-gray-100 hover:border-blue-100 transition-all duration-300 group cursor-pointer"
            >
              <div className="p-3 bg-white rounded-xl shadow-xs text-gray-700 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300 border border-gray-100">
                <Mail size={22} />
              </div>
              <span className="text-sm font-semibold text-gray-800 mt-3 group-hover:text-blue-600 transition-colors">البريد الإلكتروني</span>
              <span className="text-xs text-gray-500 mt-1 select-all font-mono" dir="ltr">achrafn314@gmail.com</span>
            </a>

            {/* Instagram Card */}
            <a 
              href="https://www.instagram.com/achrafn.ai/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center justify-center p-5 bg-gray-50 hover:bg-blue-50/50 rounded-2xl border border-gray-100 hover:border-blue-100 transition-all duration-300 group cursor-pointer"
            >
              <div className="p-2.5 bg-white rounded-xl shadow-xs text-gray-700 group-hover:scale-110 transition-all duration-300 border border-gray-100 flex items-center justify-center">
                <img 
                  src="https://i.postimg.cc/Y0HfgxtM/images.jpg" 
                  alt="Instagram" 
                  className="w-7 h-7 rounded-sm object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-sm font-semibold text-gray-800 mt-3 group-hover:text-blue-600 transition-colors">أنستغرام</span>
              <span className="text-xs text-gray-500 mt-1 font-mono" dir="ltr">@achrafn.ai</span>
            </a>
          </div>
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
          <h3 className="text-xl font-bold mb-2">💡 كلمة للمستخدمين</h3>
          <p className="opacity-90 leading-relaxed mb-3">
            تم تطوير Section FSJES لمساعدة الطلبة على العثور على الفوج الدراسي بطريقة سريعة وبسيطة.
          </p>
          <p className="opacity-95 font-medium leading-relaxed">
            شكراً لاستخدامكم المنصة، ونتمنى لكم التوفيق والنجاح.
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- Main App Component ---

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Synchronize on navigation popstate or custom pushstate actions
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pushstate-changed', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate-changed', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Simple HTML5 history parser supporting SEO subroutes
  const parsePath = (path: string) => {
    const decodedPath = decodeURIComponent(path);
    if (decodedPath === '/' || decodedPath === '/home' || decodedPath === '') {
      return { view: 'home' as const, slug: null, tab: undefined };
    }
    if (decodedPath === '/about' || decodedPath === '/about/') {
      return { view: 'about' as const, slug: null, tab: undefined };
    }
    if (
      decodedPath === '/privacy-policy' || 
      decodedPath === '/privacy-policy/' || 
      decodedPath === '/privacy' || 
      decodedPath === '/privacy/'
    ) {
      return { view: 'privacy' as const, slug: null, tab: undefined };
    }
    if (decodedPath === '/cours' || decodedPath === '/cours/') {
      return { view: 'cours-exams' as const, slug: null, tab: undefined };
    }
    if (
      decodedPath === '/emploi-du-temps' || 
      decodedPath === '/emploi-du-temps/' || 
      decodedPath === '/emploi' || 
      decodedPath === '/emploi/' ||
      decodedPath === '/emplois' ||
      decodedPath === '/emplois/'
    ) {
      return { view: 'emploi' as const, slug: null, tab: undefined };
    }
    if (decodedPath.startsWith('/cours/')) {
      const slug = decodedPath.substring(7).replace(/\/$/, '');
      return { view: 'cours-exams' as const, slug, tab: undefined };
    }
    if (decodedPath.startsWith('/emploi-du-temps/')) {
      const slug = decodedPath.substring(17).replace(/\/$/, '');
      return { view: 'emploi' as const, slug, tab: undefined };
    }
    if (decodedPath.startsWith('/emploi/')) {
      const slug = decodedPath.substring(8).replace(/\/$/, '');
      return { view: 'emploi' as const, slug, tab: undefined };
    }
    if (decodedPath.startsWith('/emplois/')) {
      const slug = decodedPath.substring(9).replace(/\/$/, '');
      return { view: 'emploi' as const, slug, tab: undefined };
    }
    if (decodedPath.startsWith('/examens/')) {
      const slug = decodedPath.substring(9).replace(/\/$/, '');
      return { view: 'cours-exams' as const, slug, tab: 'examen' };
    }
    // Fallback to home
    return { view: 'home' as const, slug: null, tab: undefined };
  };

  const { view, slug, tab } = parsePath(currentPath);

  // State configurations for college search
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
  const [showAitMelloulModal, setShowAitMelloulModal] = useState<boolean>(false);
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);

  // Dynamic Document title of the SPA & search engine meta description injection
  const updateCanonicalLink = (path: string) => {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    const base = "https://sectionfsjes.com";
    link.setAttribute('href', `${base}${path === '/' ? '/' : path}`);
  };

  useEffect(() => {
    updateCanonicalLink(currentPath);
    if (view === 'home') {
      document.title = "Section FSJES | البحث عن الفوج الدراسي";
      updateMetaDescription("منصة تساعد طلبة FSJES على العثور على الفوج الدراسي بسرعة وسهولة.");
      updateMetaProperty("og:title", "Section FSJES | البحث عن الفوج الدراسي");
      updateMetaProperty("og:description", "منصة تساعد طلبة FSJES على العثور على الفوج الدراسي بسرعة وسهولة.");
      updateMetaProperty("og:url", "https://sectionfsjes.com/");
      updateMetaName("twitter:title", "Section FSJES | البحث عن الفوج الدراسي");
      updateMetaName("twitter:description", "منصة تساعد طلبة FSJES على العثور على الفوج الدراسي بسرعة وسهولة.");
      updateMetaName("twitter:url", "https://sectionfsjes.com/");
    } else if (view === 'about') {
      document.title = "من نحن - Section FSJES - Powered by ACHRAF NAIMI";
      updateMetaDescription("تعرف على منصة وموقع Section FSJES لتسهيل البحث عن الفوج الدراسي لطلبة كليات المغرب.");
    } else if (view === 'privacy') {
      document.title = "سياسة الخصوصية | Section FSJES";
      updateMetaDescription("سياسة الخصوصية الخاصة بموقع Section FSJES المخصص لمساعدة طلبة FSJES في العثور على السكسيون والفوج الدراسي.");
    } else if (view === 'cours-exams') {
      document.title = "تحميل دروس ومؤلفات وامتحانات مادة الاقتصاد والقانون FSJES - Section FSJES";
      updateMetaDescription("المستودع الأكاديمي الشامل لطلبة كليات العلوم القانونية والاقتصادية والاجتماعية بالمغرب. تحميل المحاضرات، التلخيصات، ونماذج امتحانات مصححة.");
    } else if (view === 'emploi') {
      // Handled inside EmploiPage itself for customized SEO scheduling metadata
    }
  }, [view, slug, currentPath]);

  const updateMetaDescription = (desc: string) => {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);
  };

  const updateMetaProperty = (property: string, content: string) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  const updateMetaName = (name: string, content: string) => {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

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
      <div className={`mx-auto transition-all duration-300 ${(view === 'cours-exams' || view === 'emploi') ? 'max-w-5xl' : 'max-w-3xl'}`}>
        <Header />
        <Navigation 
          currentView={view} 
          onNavigate={navigateTo} 
        />
        
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
              <main className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transition-all border border-gray-100 relative">
                <h1 className="sr-only font-bold">Trouver votre section académique FSJES 2025-2026</h1>
                <CollegeSelector 
                  selectedCollege={selectedCollege} 
                  onSelectCollege={(id) => {
                    setSelectedCollege(id);
                    if (validationErrors.college) setValidationErrors(prev => ({ ...prev, college: false }));
                  }} 
                  onAitMelloulClick={() => setShowAitMelloulModal(true)}
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
                <Results results={results} isLoading={isLoading} searched={searched} selectedSemester={selectedSemester} />
              </main>
            </motion.div>
          ) : view === 'about' ? (
            <AboutPage key="about" />
          ) : view === 'privacy' ? (
            <PrivacyPage key="privacy" />
          ) : view === 'emploi' ? (
            <motion.div
              key="emploi"
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 25 }}
              transition={{ duration: 0.3 }}
            >
              <EmploiPage initialSlug={slug} onNavigate={navigateTo} />
            </motion.div>
          ) : (
            <motion.div
              key="cours-exams"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <CoursExamsPage initialSlug={slug} initialTab={tab} onNavigate={navigateTo} />
            </motion.div>
          )}
        </AnimatePresence>
        
        <Footer currentView={view} onNavigate={navigateTo} />
      </div>

      {/* Ait Melloul Coming Soon Modal */}
      <AnimatePresence>
        {showAitMelloulModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAitMelloulModal(false)}
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs cursor-pointer z-40"
            />
            
            {/* Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative z-50 border border-gray-100 text-center"
              dir="rtl"
            >
              {/* Top Graphic or Icon */}
              <div className="mx-auto w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 text-amber-500 border border-amber-100 shadow-xs">
                <span className="text-3xl">🚧</span>
              </div>
              
              {/* Arabic main text */}
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 tracking-tight leading-relaxed">
                قريباً - قيد الإعداد
              </h3>
              
              {/* Divider */}
              <div className="w-16 h-0.5 bg-gray-100 mx-auto mb-6"></div>
              
              {/* French translation */}
              <p className="text-gray-500 text-xs sm:text-sm font-semibold tracking-wide italic mb-8" dir="ltr">
                Les sections de FSJES Ait Melloul seront disponibles prochainement.
              </p>
              
              {/* Close Button */}
              <button
                onClick={() => setShowAitMelloulModal(false)}
                className="w-full py-3 px-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-none transition-all duration-300 cursor-pointer text-sm"
              >
                فهمت، شكراً
              </button>
              
              {/* Absolute Close Option (top right) (positioned reasonably inside the card) */}
              <button
                onClick={() => setShowAitMelloulModal(false)}
                className="absolute top-4 left-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all cursor-pointer"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


    </div>
  );
}

export default App;
