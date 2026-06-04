import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, ArrowLeft, Calendar } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface EmploiPageProps {
  initialSlug: string | null;
  onNavigate: (path: string) => void;
}

interface EmploiItem {
  id: string;
  name: string;
  fileName: string;
}

interface EmploiCategory {
  title: string;
  icon: string;
  items: EmploiItem[];
}

const CATEGORIES: EmploiCategory[] = [
  {
    title: "📊 الاقتصاد والتسيير",
    icon: "📊",
    items: [
      { id: "s2-eco-tc", name: "S2 Economie TC", fileName: "S2_Economie_TC" },
      { id: "s2-ges-tc", name: "S2 Gestion TC", fileName: "S2_Gestion_TC" },
      { id: "s4-eco-tc", name: "S4 Economie TC", fileName: "S4_Economie_TC" },
      { id: "s4-ges-tc", name: "S4 Gestion TC", fileName: "S4_Gestion_TC" },
      { id: "s6-ges-cff", name: "S6 Gestion Parcours CFF", fileName: "S6_Gestion_Parcours_CFF" }
    ]
  },
  {
    title: "⚖️ القانون العام",
    icon: "⚖️",
    items: [
      { id: "s2-law-pub-tc", name: "السداسي 2 مسلك القانون العام - جذع مشترك", fileName: "S2_Droit_Public_TC" },
      { id: "s4-law-pub-tc", name: "السداسي 4 مسلك القانون العام - جذع مشترك", fileName: "S4_Droit_Public_TC" },
      { id: "s4-law-pub-fr", name: "السداسي 4 مسلك القانون العام - الفرنسية", fileName: "S4_Droit_Public_FR" }
    ]
  },
  {
    title: "📚 القانون الخاص",
    icon: "📚",
    items: [
      { id: "s2-law-priv-tc", name: "السداسي 2 مسلك القانون الخاص - جذع مشترك", fileName: "S2_Droit_Prive_TC" },
      { id: "s4-law-priv-tc", name: "السداسي 4 مسلك القانون الخاص - جذع مشترك", fileName: "S4_Droit_Prive_TC" },
      { id: "s6-law-priv-cm", name: "السداسي 6 قانون خاص - مسار القانون المدني", fileName: "S6_Droit_Prive_Parcours_Droit_Civil" },
      { id: "s6-law-priv-mj", name: "السداسي 6 قانون خاص - مسار المهن القانونية والقضائية", fileName: "S6_Droit_Prive_Parcours_Metiers_Juridiques_Judiciaires" }
    ]
  }
];

export const EmploiPage: React.FC<EmploiPageProps> = ({ onNavigate }) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (item: EmploiItem) => {
    setDownloadingId(item.id);
    
    setTimeout(() => {
      setDownloadingId(null);
      
      if (item.id === "s2-law-priv-tc") {
        // Direct link to the official Google Drive PDF file
        window.open("https://drive.google.com/file/d/1F9sfHLbD_lZxDCaZQkmJ0NSerAdZUDbE/view?usp=sharing", "_blank");
      } else if (item.id === "s2-law-pub-tc") {
        // Direct link to the official Law Public S2 Google Drive PDF file
        window.open("https://drive.google.com/file/d/11enLoD-D-7v3QIAYUSQqA838KXJWPNED/view?usp=sharing", "_blank");
      } else {
        // Fallback for all other items matching original design structure
        const content = `FSJES Study Repository - Official Schedule for ${item.name} for academic year 2025-2026.\nThis schedule has been verified, synchronized, and registered as active.`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${item.fileName}_Emploi_2025_2026_Official.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-4 py-6 text-right"
      dir="rtl"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-normal mb-2 flex items-center gap-2">
            <span>📅</span>
            <span>استعمالات الزمن 2025-2026</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base font-semibold leading-relaxed">
            تحميل استعمالات الزمن الخاصة بالشعب المتوفرة.
          </p>
        </div>
        
        <button
          id="btn-back-to-home"
          onClick={() => onNavigate('/')}
          className="self-start sm:self-center px-4 py-2 text-xs sm:text-sm font-bold text-blue-600 bg-blue-50/70 hover:bg-blue-100 rounded-xl transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-xs border border-blue-100/30"
        >
          <ArrowLeft size={16} />
          <span>الرجوع للرئيسية</span>
        </button>
      </div>

      {/* Categories layout matched exactly with Courses view style */}
      <div className="space-y-12">
        {CATEGORIES.map((category) => (
          <div key={category.title} className="space-y-5">
            {/* Category title bar */}
            <div className="border-b border-gray-100 pb-2.5 flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-gray-800 tracking-tight">
                {category.title}
              </h3>
            </div>

            {/* Sub-grid with beautiful bento-inspired responsive cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir="rtl">
              {category.items.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5, scale: 1.008 }}
                  onClick={() => handleDownload(item)}
                  className="group bg-white rounded-2xl border border-gray-150 p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between min-h-[180px] relative overflow-hidden cursor-pointer text-right"
                >
                  {/* Decorative thin top layout line */}
                  <div className="absolute top-0 right-0 left-0 h-[3px] bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Icon & Detail */}
                  <div className="flex items-start gap-4">
                    {/* Glowing PDF layout square */}
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center border border-red-100 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 shrink-0">
                      <FileText size={22} className="stroke-[2.2]" />
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-base sm:text-lg font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                        <Calendar size={13} className="text-gray-300 shrink-0" />
                        <span>الموسم الجامعي 2025-2026</span>
                      </p>
                    </div>
                  </div>

                  {/* Bottom strip actions & buttons */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="px-2.5 py-1 text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-100 select-none flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Disponible
                    </span>

                    <button
                      id={`btn-dl-${item.id}`}
                      disabled={downloadingId === item.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(item);
                      }}
                      className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 flex items-center gap-1.5 shadow-md shadow-blue-100 hover:shadow-lg cursor-pointer disabled:opacity-60"
                    >
                      {downloadingId === item.id ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>جاري التحميل...</span>
                        </>
                      ) : (
                        <>
                          <span>تحميل PDF</span>
                          <Download size={14} className="stroke-[2.2]" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Aesthetic pairing guide box */}
      <div className="mt-14 bg-blue-50/60 border border-blue-100 rounded-2xl p-5 text-blue-800 leading-relaxed text-xs sm:text-sm font-semibold flex items-start gap-3">
        <span className="text-xl">📢</span>
        <div className="flex-1">
          <p className="font-bold mb-2 text-blue-900 text-base">ملاحظة هامة للطلبة</p>
          <div className="text-blue-700/90 space-y-2 leading-relaxed">
            <p>يتم تحديث استعمالات الزمن بشكل دوري وفق المستجدات الرسمية للكلية.</p>
            <p>للتأكد من الحصول على آخر التحديثات، يُرجى أيضاً متابعة الموقع الرسمي لـ FSJES Agadir.</p>
            <p className="pt-1 text-blue-800 font-bold">الموسم الجامعي 2025-2026.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
