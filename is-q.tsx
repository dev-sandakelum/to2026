"use client";
import React, { useState, useEffect } from "react";
import { notesData, Section, ContentItem } from "./is-data";
// import { motion, AnimatePresence } from "framer-motion"; // Removed unused import

// --- Components ---

const SidebarItem = ({
  section,
  isActive,
  onClick,
}: {
  section: Section;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 group ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
        : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
    }`}
  >
    <div
      className={`w-1.5 h-1.5 rounded-full transition-all ${
        isActive ? "bg-white scale-125" : "bg-gray-300 group-hover:bg-blue-400"
      }`}
    />
    <span className="font-medium text-sm sm:text-base">{section.title}</span>
  </button>
);

const MobileNavItem = ({
  section,
  isActive,
  onClick,
}: {
  section: Section;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "bg-white text-gray-600 border border-gray-100 shadow-sm"
    }`}
  >
    {section.title}
  </button>
);

const RenderContentItem = ({ item }: { item: ContentItem }) => {
  // Unified Card Style
  const cardStyle = "bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 mb-4";
  
  switch (item.type) {
    case "qa":
      return (
        <div className={cardStyle}>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">
              Q
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 font-semibold text-base sm:text-lg leading-snug pt-1 mb-2">
                {item.question}
              </h3>
              <div className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {item.answer}
              </div>
            </div>
          </div>
        </div>
      );
    case "text":
      return (
        <div className="mb-4 px-2">
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            {Array.isArray(item.content)
              ? item.content.map((line, i) => (
                  <span key={i} className="block mb-2">
                    {line}
                  </span>
                ))
              : item.content}
          </p>
        </div>
      );
    case "list":
      return (
        <div className="mb-4 px-2">
          <ul className="space-y-3">
            {Array.isArray(item.content) &&
              item.content.map((li, idx) => (
                <li key={idx} className="flex gap-3 text-gray-600 text-sm sm:text-base group">
                  <span className="w-2 h-2 rounded-full bg-blue-200 mt-2 flex-shrink-0 group-hover:bg-blue-500 transition-colors" />
                  <span className="leading-relaxed">{li}</span>
                </li>
              ))}
          </ul>
        </div>
      );
    case "highlight":
      // Unified Highlight Style - Always Blue/Primary
      return (
        <div className={`${cardStyle} bg-blue-50/50 border-blue-100`}>
          <div className="flex gap-3 mb-2">
             <div className="w-1 h-6 bg-blue-500 rounded-full"/>
             {item.title && (
              <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                {item.title}
              </h4>
            )}
          </div>
          
          <div className="text-sm sm:text-base text-gray-700 leading-relaxed pl-4">
            {Array.isArray(item.content) ? (
              <ul className="space-y-2">
                {item.content.map((li, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-blue-400">•</span>
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            ) : (
              item.content
            )}
          </div>
        </div>
      );
    case "subsection":
      return (
        <div className="mb-8 mt-8 first:mt-0 pt-4 border-t border-gray-100 first:border-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-1.5 bg-blue-600 rounded-r-full" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
              {item.title}
            </h3>
          </div>
          
          <div className="pl-0 sm:pl-4">
            {item.question && ( 
               <div className={cardStyle}>
                 <p className="font-bold text-gray-900 mb-2 text-lg">{item.question}</p>
                 <p className="text-gray-600 leading-relaxed">{item.content}</p>
               </div>
            )}
            
            {!item.question && item.content && (
               <div className="text-gray-600 leading-relaxed text-sm sm:text-base mb-4 px-2">
                  {item.content}
               </div>
            )}
            
            {item.items && (
              <div className="mt-4 space-y-4">
                {item.items.map((subItem, idx) => (
                  <RenderContentItem key={idx} item={subItem} />
                ))}
              </div>
            )}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default function InformationSystemsNotes() {
  const [activeSectionId, setActiveSectionId] = useState("intro");
  const activeSection = notesData.find((s) => s.id === activeSectionId);

  // Scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSectionId]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Mobile Navigation (Sticky Top) */}
      <div className="lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="flex overflow-x-auto gap-2 p-3 no-scrollbar">
          {notesData.map((section) => (
            <MobileNavItem
              key={section.id}
              section={section}
              isActive={activeSectionId === section.id}
              onClick={() => setActiveSectionId(section.id)}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar (Sticky) */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-1">
              <div className="px-4 mb-6">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Contents
                </h2>
              </div>
              {notesData.map((section) => (
                <SidebarItem
                  key={section.id}
                  section={section}
                  isActive={activeSectionId === section.id}
                  onClick={() => setActiveSectionId(section.id)}
                />
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-3">
                learning-ict
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">
                {activeSection?.title}
              </h1>
              <p className="text-lg text-gray-500">
                Fundamentals of Information Systems
              </p>
            </div>

            {/* Content Render */}
            <div className="space-y-10">
              {activeSection?.content.map((block, idx) => (
                <section key={idx} className="scroll-mt-24">
                  {block.title && (
                    <div className="flex items-center gap-4 mb-6">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                        {block.title}
                      </h2>
                      <div className="h-px bg-gray-200 flex-1" />
                    </div>
                  )}
                  <div className="space-y-4">
                    {block.items.map((item, itemIdx) => (
                      <RenderContentItem key={itemIdx} item={item} />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Footer for Section */}
            <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between text-sm text-gray-500">
               <span></span>
               <span>Generated by A*********y</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
