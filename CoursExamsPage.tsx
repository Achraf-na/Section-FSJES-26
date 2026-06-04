import React from 'react';
import { motion } from 'motion/react';
import { FolderOpen, ExternalLink, ArrowLeft } from 'lucide-react';

interface CoursExamsPageProps {
  initialSlug?: string | null;
  initialTab?: string;
  onNavigate: (path: string) => void;
}

interface ResourceFolder {
  id: string;
  title: string;
  titleAr: string;
  semester: string;
  section: string;
  detailsAr: string;
  driveUrl: string;
}

const AVAILABLE_RESOURCES: ResourceFolder[] = [
  {
    id: "s4-gestion-ef",
    title: "Cours & Examens S4 Gestion (Section E-F)",
    titleAr: "دروس وامتحانات S4 تدبير",
    semester: "S4",
    section: "Section E-F",
    detailsAr: "المستودع الرقمي الشامل لدروس، ملخصات، وامتحانات الفصل الرابع شعبة الاقتصاد والتدبير.",
    driveUrl: "https://drive.google.com/drive/folders/1mpNk4Yw9ucR3jhfZOF_Ldk6b73IGh3tY?usp=sharing"
  },
  {
    id: "s3-gestion-ef",
    title: "Cours & Examens S3 Gestion (Section E-F)",
    titleAr: "دروس وامتحانات S3 تدبير",
    semester: "S3",
    section: "Section E-F",
    detailsAr: "المستودع الرقمي الشامل لدروس، ملخصات، وامتحانات الفصل الثالث شعبة الاقتصاد والتدبير.",
    driveUrl: "https://drive.google.com/drive/folders/1Dd2UtV2DwfEoH8HsFHYne5erP-jweffS?usp=sharing"
  }
];

export const CoursExamsPage: React.FC<CoursExamsPageProps> = ({ onNavigate }) => {
  const handleOpenFolder = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
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
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-normal mb-2">
            الدروس والامتحانات
          </h2>
          <p className="text-gray-500 text-sm sm:text-base font-semibold leading-relaxed">
            الدروس والملخصات والامتحانات المتوفرة حالياً.
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

      {/* Grid Layout of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir="ltr">
        {AVAILABLE_RESOURCES.map((folder) => (
          <motion.div
            key={folder.id}
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => handleOpenFolder(folder.driveUrl)}
            className="group bg-white rounded-2xl border border-gray-150/80 p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[220px] relative overflow-hidden cursor-pointer text-left"
          >
            {/* Top decorative gradient border */}
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Top Section */}
            <div>
              <div className="flex justify-between items-start mb-4">
                {/* Folder Icon with dynamic glowing design */}
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100/50 shadow-xs group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <FolderOpen size={24} className="stroke-[2.2]" />
                </div>
                
                {/* Status Badge */}
                <span className="px-3 py-1 text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-100 select-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Disponible
                </span>
              </div>

              {/* Title & Info */}
              <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-snug">
                {folder.title}
              </h3>
              
              <div className="mt-2 text-right" dir="rtl">
                <span className="text-xs font-bold text-gray-400 block mb-1">
                  {folder.titleAr}
                </span>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  {folder.detailsAr}
                </p>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              {/* Semester & Section Indicators */}
              <div className="flex gap-1.5">
                <span className="px-2.5 py-1 text-[10px] font-extrabold bg-gray-50 text-gray-500 rounded-md border border-gray-200">
                  {folder.semester}
                </span>
                <span className="px-2.5 py-1 text-[10px] font-extrabold bg-blue-50/50 text-blue-600 rounded-md border border-blue-100/50">
                  {folder.section}
                </span>
              </div>

              {/* Button */}
              <button
                id={`btn-open-${folder.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenFolder(folder.driveUrl);
                }}
                className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 flex items-center gap-1.5 shadow-md shadow-blue-100 group-hover:shadow-lg cursor-pointer"
              >
                <span>Ouvrir les fichiers</span>
                <ExternalLink size={14} className="stroke-[2]" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Warning notice box */}
      <div className="mt-12 bg-amber-50/60 border border-amber-100 rounded-2xl p-5 text-amber-800 leading-relaxed text-xs sm:text-sm font-semibold flex items-start gap-3">
        <span className="text-xl">💡</span>
        <div className="flex-1">
          <p className="font-bold mb-1 text-amber-900">ملاحظة هامة للطلبة:</p>
          <p className="text-amber-700/95 leading-normal">
            نقوم حالياً بجمع وتنظيم المحتويات لبقية الفصول والأقسام الجامعية. سيتم إضافة الروابط والملفات الخاصة بها بمجرد توفرها وتأكيد مطابقتها للمقرر الرسمي. شكراً لتفهمكم.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
