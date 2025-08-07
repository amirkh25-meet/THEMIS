import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router';


export default function GenderEquityAssessmentApp() {
  const [currentPage, setCurrentPage] = useState(0);
  const [allResponses, setAllResponses] = useState({});
  const [completedSections, setCompletedSections] = useState([]);
  

  const pages = [
    { 
      component: HiringPractices, 
      name: 'Hiring Practices',
      requiredQuestions: ['track_gender_breakdown', 'job_descriptions_audited', 'interview_panels', 'diversity_formal_goal', 'entry_roles_offered']
    },
    { 
      component: PromotionAdvancement, 
      name: 'Promotion & Advancement',
      requiredQuestions: ['promotion_data_analyzed', 'leadership_development', 'mentoring_program', 'promotion_criteria', 'women_overlooked']
    },
    { 
      component: PayEquity, 
      name: 'Pay Equity',
      requiredQuestions: ['pay_audit_conducted', 'adjust_salaries', 'starting_salaries_compared', 'transparent_pay_bands', 'manager_training']
    },
    { 
      component: PerformanceMetrics, 
      name: 'Performance Metrics',
      requiredQuestions: ['women_applied_percentage', 'women_hired_percentage', 'women_promotions_percentage', 'women_salary_raises_percentage', 'women_leadership_percentage']
    },
    { 
      component: AdditionalConsiderations, 
      name: 'Additional Considerations',
      requiredQuestions: ['parental_leave_policy', 'flexible_work_policies', 'employee_survey', 'bias_incidents_tracked', 'internal_champion']
    },{component:GenderEquityAssesmentApp2,
    name:'Results',
    requiredQuestions: []
    }
  ];

const pages1 = [
  { 
    component: HiringPractices, 
    name: 'ممارسات التوظيف',
    requiredQuestions: ['track_gender_breakdown', 'job_descriptions_audited', 'interview_panels', 'diversity_formal_goal', 'entry_roles_offered']
  },
  { 
    component: PromotionAdvancement, 
    name: 'الترقية والتقدم الوظيفي',
    requiredQuestions: ['promotion_data_analyzed', 'leadership_development', 'mentoring_program', 'promotion_criteria', 'women_overlooked']
  },
  { 
    component: PayEquity, 
    name: 'الإنصاف في الأجور',
    requiredQuestions: ['pay_audit_conducted', 'adjust_salaries', 'starting_salaries_compared', 'transparent_pay_bands', 'manager_training']
  },
  { 
    component: PerformanceMetrics, 
    name: 'مقاييس الأداء',
    requiredQuestions: ['women_applied_percentage', 'women_hired_percentage', 'women_promotions_percentage', 'women_salary_raises_percentage', 'women_leadership_percentage']
  },
  { 
    component: AdditionalConsiderations, 
    name: 'اعتبارات إضافية',
    requiredQuestions: ['parental_leave_policy', 'flexible_work_policies', 'employee_survey', 'bias_incidents_tracked', 'internal_champion']
  },
  {
    component: GenderEquityAssesmentApp2,
    name: 'النتائج',
    requiredQuestions: []
  }
];


const pages2 = [
  { 
    component: HiringPractices, 
    name: 'נהלי גיוס',
    requiredQuestions: ['track_gender_breakdown', 'job_descriptions_audited', 'interview_panels', 'diversity_formal_goal', 'entry_roles_offered']
  },
  { 
    component: PromotionAdvancement, 
    name: 'קידום והתקדמות מקצועית',
    requiredQuestions: ['promotion_data_analyzed', 'leadership_development', 'mentoring_program', 'promotion_criteria', 'women_overlooked']
  },
  { 
    component: PayEquity, 
    name: 'שוויון בשכר',
    requiredQuestions: ['pay_audit_conducted', 'adjust_salaries', 'starting_salaries_compared', 'transparent_pay_bands', 'manager_training']
  },
  { 
    component: PerformanceMetrics, 
    name: 'מדדי ביצועים',
    requiredQuestions: ['women_applied_percentage', 'women_hired_percentage', 'women_promotions_percentage', 'women_salary_raises_percentage', 'women_leadership_percentage']
  },
  { 
    component: AdditionalConsiderations, 
    name: 'שיקולים נוספים',
    requiredQuestions: ['parental_leave_policy', 'flexible_work_policies', 'employee_survey', 'bias_incidents_tracked', 'internal_champion']
  },
  {
    component: GenderEquityAssesmentApp2,
    name: 'תוצאות',
    requiredQuestions: []
  }
];



  const navigateToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const isPageComplete = (pageIndex) => {
    const requiredQuestions = pages[pageIndex].requiredQuestions;
    return requiredQuestions.every(questionKey => {
      const response = allResponses[questionKey];
      return response && response.toString().trim() !== '';
    });
  };

  const goToNextPage = () => {
    if (currentPage < pages.length - 1 && isPageComplete(currentPage)) {
      if (!completedSections.includes(currentPage)) {
        setCompletedSections(prev => [...prev, currentPage]);
      }
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const updateGlobalResponses = (pageResponses) => {
    setAllResponses(prev => ({
      ...prev,
      ...pageResponses
    }));
  };

  const getCompletedSectionsCount = () => {
    let completed = 0;
    for (let i = 0; i < pages.length; i++) {
      if (isPageComplete(i)) {
        completed++;
      }
    }
    return completed;
  };

  const getCompletedSectionsCount1 = () => {
    let completed = 0;
    for (let i = 0; i < pages1.length; i++) {
      if (isPageComplete(i)) {
        completed++;
      }
    }
    return completed;
  };

  const getCompletedSectionsCount2 = () => {
    let completed = 0;
    for (let i = 0; i < pages2.length; i++) {
      if (isPageComplete(i)) {
        completed++;
      }
    }
    return completed;
  };

  const renderCurrentPage = () => {
    const CurrentPageComponent = pages[currentPage].component;
    return (
      <CurrentPageComponent
        currentPage={currentPage}
        totalPages={pages.length}
        navigateToPage={navigateToPage}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        allResponses={allResponses}
        updateGlobalResponses={updateGlobalResponses}
        isPageComplete={isPageComplete(currentPage)}
        completedSections={completedSections}
        getCompletedSectionsCount={getCompletedSectionsCount}
        getCompletedSectionsCount1={getCompletedSectionsCount1}
        getCompletedSectionsCount2={getCompletedSectionsCount2}
        pages={pages}
        pages1={pages1}
        pages2={pages2}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderCurrentPage()}
    </View>
  )
}
export function HiringPractices({ 
  currentPage, 
  totalPages, 
  navigateToPage, 
  goToNextPage, 
  goToPreviousPage, 
  allResponses, 
  updateGlobalResponses,
  isPageComplete,
  completedSections,
  getCompletedSectionsCount,getCompletedSectionsCount1,getCompletedSectionsCount2,
  pages,pages1,pages2
}) {
  const [responses, setResponses] = useState(allResponses);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [if2, setIf2] = useState(0);


  const updateResponse = (questionKey, value) => {
    const newResponses = {
      ...responses,
      [questionKey]: value
    };
    setResponses(newResponses);
    updateGlobalResponses(newResponses);
  };



  const RadioButton = ({ selected, onPress, label }) => (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View style={[styles.radioCircle, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const QuestionCard = ({ question, options, questionKey }) => (
    <View style={styles.questionCard}>
      <Text style={styles.questionText}>{question}</Text>
      {options.map((option) => (
        <RadioButton
          key={option}
          selected={responses[questionKey] === option}
          onPress={() => updateResponse(questionKey, option)}
          label={option}
        />
      ))}
    </View>
  );

  const ProgressBar = () => {
    const completedCount = getCompletedSectionsCount();
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{completedCount} of {totalPages} sections completed</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalPages) * 100}%` }]} />
        </View>
      </View>
    );
  };

  const ProgressBar1 = () => {
    const completedCount = getCompletedSectionsCount1();
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{completedCount} of {totalPages} </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalPages) * 100}%` }]} />
        </View>
      </View>
    );
  };

  const ProgressBar2 = () => {
    const completedCount = getCompletedSectionsCount2();
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{completedCount} of {totalPages} sections completed</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalPages) * 100}%` }]} />
        </View>
      </View>
    );
  };

  const getSectionStatus = (pageIndex) => {
    if (completedSections.includes(pageIndex) || (pageIndex < pages.length && pages[pageIndex].requiredQuestions.every(q => allResponses[q] && allResponses[q].toString().trim() !== ''))) {
      return 'completed';
    } else if (pageIndex === currentPage) {
      return 'active';
    } else {
      return 'inactive';
    }
  };

  const SectionNav = () => (
    <View style={styles.sectionNav}>
      <Text style={styles.sectionTitle}>Sections</Text>
      
      {pages.map((page, index) => {
        const status = getSectionStatus(index);
        return (
          <TouchableOpacity 
            key={index}
            style={[
              styles.sectionItem, 
              status === 'completed' && styles.sectionCompleted,
              status === 'active' && styles.sectionActive
            ]}
            
          >
            <Text style={[
              styles.sectionText,
              status === 'completed' && styles.sectionCompletedText,
              status === 'active' && styles.sectionActiveText
            ]}>
              {page.name}
            </Text>
            <Text style={[
              styles.sectionInactiveBadge,
              status === 'completed' && styles.sectionCompletedBadge,
              status === 'active' && styles.sectionBadge
            ]}>
              {status === 'completed' ? '✓' : index + 1}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );


  const SectionNav1 = () => (
    <View style={styles.sectionNav}>
      <Text style={styles.sectionTitle}>Sections</Text>
      
      {pages1.map((page, index) => {
        const status = getSectionStatus(index);
        return (
          <TouchableOpacity 
            key={index}
            style={[
              styles.sectionItem, 
              status === 'completed' && styles.sectionCompleted,
              status === 'active' && styles.sectionActive
            ]}
            
          >
            <Text style={[
              styles.sectionText,
              status === 'completed' && styles.sectionCompletedText,
              status === 'active' && styles.sectionActiveText
            ]}>
              {page.name}
            </Text>
            <Text style={[
              styles.sectionInactiveBadge,
              status === 'completed' && styles.sectionCompletedBadge,
              status === 'active' && styles.sectionBadge
            ]}>
              {status === 'completed' ? '✓' : index + 1}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const SectionNav2 = () => (
    <View style={styles.sectionNav}>
      <Text style={styles.sectionTitle}>Sections</Text>
      
      {pages2.map((page, index) => {
        const status = getSectionStatus(index);
        return (
          <TouchableOpacity 
            key={index}
            style={[
              styles.sectionItem, 
              status === 'completed' && styles.sectionCompleted,
              status === 'active' && styles.sectionActive
            ]}
            
          >
            <Text style={[
              styles.sectionText,
              status === 'completed' && styles.sectionCompletedText,
              status === 'active' && styles.sectionActiveText
            ]}>
              {page.name}
            </Text>
            <Text style={[
              styles.sectionInactiveBadge,
              status === 'completed' && styles.sectionCompletedBadge,
              status === 'active' && styles.sectionBadge
            ]}>
              {status === 'completed' ? '✓' : index + 1}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
if(if2 === 0)
  {return (
    <View style={styles.container}>
      {/* Header */}
       <View style={styles.topRightContainer}>
              <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            
              {showLangMenu && (
                <View style={styles.languageMenu}>
                  <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>العربية</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>עברית</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gender Equity Assessment</Text>
        <Text style={styles.headerSubtitle}>Evaluate your organization's practices across key areas of gender equity</Text>
        <ProgressBar />
      </View>

      <View style={styles.content}>
        {/* Sidebar Navigation */}
        <View style={styles.sidebar}>
          <SectionNav />
        </View>

        {/* Main Content */}
        <ScrollView style={styles.mainContent}>
          <View style={styles.contentHeader}>
            <Text style={styles.contentTitle}>Hiring Practices</Text>
            <Text style={styles.contentSubtitle}>Evaluate fairness and transparency in recruitment processes</Text>
          </View>

          <QuestionCard
            question="Do you track the gender breakdown of applicants at each hiring stage?"
            options={['Yes', 'Partially', 'No', 'Unsure']}
            questionKey="track_gender_breakdown"
          />

          <QuestionCard
            question="Are job descriptions audited for gender-biased language?"
            options={['Always', 'Sometimes', 'Rarely', 'Never']}
            questionKey="job_descriptions_audited"
          />

          <QuestionCard
            question="Do your interview panels include at least one woman?"
            options={['Always', 'Sometimes', 'Rarely', 'Never']}
            questionKey="interview_panels"
          />

          <QuestionCard
            question="Is diversity being a formal goal with KPIs?"
            options={['Yes', 'In Progress', 'No']}
            questionKey="diversity_formal_goal"
          />

          <QuestionCard
            question="Are entry-level roles explicitly offered to women?"
            options={['Yes', 'Planning To', 'No']}
            questionKey="entry_roles_offered"
          />

          {!isPageComplete && (
            <View style={styles.validationMessage}>
              <Text style={styles.validationText}>Please answer all questions before proceeding to the next section.</Text>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.prevButton, styles.prevButtonDisabled]} 
              disabled={true}
            >
              <Text style={styles.prevButtonTextDisabled}>Previous Section</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.nextButton, !isPageComplete && styles.nextButtonDisabled]} 
              onPress={goToNextPage}
              disabled={!isPageComplete}
            >
              <Text style={[styles.nextButtonText, !isPageComplete && styles.nextButtonTextDisabled]}>
                Next Section
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
if(if2 === 1)
  {return (
    <View style={styles.container}>
      {/* Header */}
       <View style={styles.topRightContainer}>
              <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            
              {showLangMenu && (
                <View style={styles.languageMenu}>
                  <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>العربية</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>עברית</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
      <View style={styles.header}>
  <Text style={styles.headerTitle}>تقييم المساواة بين الجنسين</Text>
  <Text style={styles.headerSubtitle}>قم بتقييم ممارسات مؤسستك في مجالات رئيسية من المساواة بين الجنسين</Text>
  <ProgressBar1 />
</View>

<View style={styles.content}>
  {/* Sidebar Navigation */}
  <View style={styles.sidebar}>
    <SectionNav1 />
  </View>

  {/* Main Content */}
  <ScrollView style={styles.mainContent}>
    <View style={styles.contentHeader}>
      <Text style={styles.contentTitle}>ممارسات التوظيف</Text>
      <Text style={styles.contentSubtitle}>قيّم العدالة والشفافية في عمليات التوظيف</Text>
    </View>

    <QuestionCard
      question="هل تتابعون التوزيع حسب الجنس للمتقدمين في كل مرحلة من مراحل التوظيف؟"
      options={['نعم', 'جزئيًا', 'لا', 'لست متأكدًا']}
      questionKey="track_gender_breakdown"
    />

    <QuestionCard
      question="هل يتم تدقيق الوصف الوظيفي للغة متحيزة جنسياً؟"
      options={['دائمًا', 'أحيانًا', 'نادرًا', 'أبدًا']}
      questionKey="job_descriptions_audited"
    />

    <QuestionCard
      question="هل تضم لجان المقابلات امرأة واحدة على الأقل؟"
      options={['دائمًا', 'أحيانًا', 'نادرًا', 'أبدًا']}
      questionKey="interview_panels"
    />

    <QuestionCard
      question="هل التنوع هدف رسمي له مؤشرات أداء؟"
      options={['نعم', 'قيد التنفيذ', 'لا']}
      questionKey="diversity_formal_goal"
    />

    <QuestionCard
      question="هل يتم تقديم الأدوار المبدئية بشكل صريح للنساء؟"
      options={['نعم', 'نخطط لذلك', 'لا']}
      questionKey="entry_roles_offered"
    />

    {!isPageComplete && (
      <View style={styles.validationMessage}>
        <Text style={styles.validationText}>يرجى الإجابة على جميع الأسئلة قبل الانتقال إلى القسم التالي.</Text>
      </View>
    )}

    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={[styles.prevButton, styles.prevButtonDisabled]} 
        disabled={true}
      >
        <Text style={styles.prevButtonTextDisabled}>القسم السابق</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.nextButton, !isPageComplete && styles.nextButtonDisabled]} 
        onPress={goToNextPage}
        disabled={!isPageComplete}
      >
        <Text style={[styles.nextButtonText, !isPageComplete && styles.nextButtonTextDisabled]}>
          القسم التالي
        </Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
</View>

    </View>
  )
}

if(if2 === 2)
  {return (
    <View style={styles.container}>
      {/* Header */}
       <View style={styles.topRightContainer}>
              <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            
              {showLangMenu && (
                <View style={styles.languageMenu}>
                  <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>العربية</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>עברית</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
      <View style={styles.header}>
  <Text style={styles.headerTitle}>הערכת שוויון מגדרי</Text>
  <Text style={styles.headerSubtitle}>העריכו את מדיניות הארגון בתחומים המרכזיים של שוויון בין המינים</Text>
  <ProgressBar2 />
</View>

<View style={styles.content}>
  {/* Sidebar Navigation */}
  <View style={styles.sidebar}>
    <SectionNav2 />
  </View>

  {/* Main Content */}
  <ScrollView style={styles.mainContent}>
    <View style={styles.contentHeader}>
      <Text style={styles.contentTitle}>נהלי גיוס</Text>
      <Text style={styles.contentSubtitle}>העריכו את ההוגנות והשקיפות בתהליכי הגיוס</Text>
    </View>

    <QuestionCard
      question="האם אתם עוקבים אחר הפילוח המגדרי של המועמדים בכל שלב בגיוס?"
      options={['כן', 'חלקית', 'לא', 'לא בטוח/ה']}
      questionKey="track_gender_breakdown"
    />

    <QuestionCard
      question="האם מנותחים תיאורי משרות לשפה מוטה מגדרית?"
      options={['תמיד', 'לפעמים', 'לעיתים נדירות', 'אף פעם לא']}
      questionKey="job_descriptions_audited"
    />

    <QuestionCard
      question="האם צוותי הראיונות כוללים לפחות אישה אחת?"
      options={['תמיד', 'לפעמים', 'לעיתים נדירות', 'אף פעם לא']}
      questionKey="interview_panels"
    />

    <QuestionCard
      question="האם הגיוון הוא מטרה רשמית עם מדדי ביצוע (KPI)?"
      options={['כן', 'בתהליך', 'לא']}
      questionKey="diversity_formal_goal"
    />

    <QuestionCard
      question="האם תפקידים התחלתיים מוצעים באופן יזום לנשים?"
      options={['כן', 'בתכנון', 'לא']}
      questionKey="entry_roles_offered"
    />

    {!isPageComplete && (
      <View style={styles.validationMessage}>
        <Text style={styles.validationText}>נא להשיב על כל השאלות לפני המעבר לחלק הבא.</Text>
      </View>
    )}

    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={[styles.prevButton, styles.prevButtonDisabled]} 
        disabled={true}
      >
        <Text style={styles.prevButtonTextDisabled}>החלק הקודם</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.nextButton, !isPageComplete && styles.nextButtonDisabled]} 
        onPress={goToNextPage}
        disabled={!isPageComplete}
      >
        <Text style={[styles.nextButtonText, !isPageComplete && styles.nextButtonTextDisabled]}>
          החלק הבא
        </Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
</View>

    </View>
  )
}
}

// PromotionAdvancement.js
export function PromotionAdvancement({ 
  currentPage, 
  totalPages, 
  navigateToPage, 
  goToNextPage, 
  goToPreviousPage, 
  allResponses, 
  updateGlobalResponses,
  isPageComplete,
  completedSections,
  getCompletedSectionsCount,getCompletedSectionsCount1,getCompletedSectionsCount2,
  pages,pages1,pages2
}) {
  const [responses, setResponses] = useState(allResponses);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [if2, setIf2] = useState(0);

const ProgressBar1 = () => {
    const completedCount = getCompletedSectionsCount1();
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{completedCount} of {totalPages} </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalPages) * 100}%` }]} />
        </View>
      </View>
    );
  };

  const ProgressBar2 = () => {
    const completedCount = getCompletedSectionsCount2();
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{completedCount} of {totalPages} sections completed</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalPages) * 100}%` }]} />
        </View>
      </View>
    );
  };
  const SectionNav1 = () => (
    <View style={styles.sectionNav}>
      <Text style={styles.sectionTitle}>Sections</Text>
      
      {pages1.map((page, index) => {
        const status = getSectionStatus(index);
        return (
          <TouchableOpacity 
            key={index}
            style={[
              styles.sectionItem, 
              status === 'completed' && styles.sectionCompleted,
              status === 'active' && styles.sectionActive
            ]}
            
          >
            <Text style={[
              styles.sectionText,
              status === 'completed' && styles.sectionCompletedText,
              status === 'active' && styles.sectionActiveText
            ]}>
              {page.name}
            </Text>
            <Text style={[
              styles.sectionInactiveBadge,
              status === 'completed' && styles.sectionCompletedBadge,
              status === 'active' && styles.sectionBadge
            ]}>
              {status === 'completed' ? '✓' : index + 1}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const SectionNav2 = () => (
    <View style={styles.sectionNav}>
      <Text style={styles.sectionTitle}>Sections</Text>
      
      {pages2.map((page, index) => {
        const status = getSectionStatus(index);
        return (
          <TouchableOpacity 
            key={index}
            style={[
              styles.sectionItem, 
              status === 'completed' && styles.sectionCompleted,
              status === 'active' && styles.sectionActive
            ]}
            
          >
            <Text style={[
              styles.sectionText,
              status === 'completed' && styles.sectionCompletedText,
              status === 'active' && styles.sectionActiveText
            ]}>
              {page.name}
            </Text>
            <Text style={[
              styles.sectionInactiveBadge,
              status === 'completed' && styles.sectionCompletedBadge,
              status === 'active' && styles.sectionBadge
            ]}>
              {status === 'completed' ? '✓' : index + 1}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const updateResponse = (questionKey, value) => {
    const newResponses = {
      ...responses,
      [questionKey]: value
    };
    setResponses(newResponses);
    updateGlobalResponses(newResponses);
  };

  const RadioButton = ({ selected, onPress, label }) => (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View style={[styles.radioCircle, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const QuestionCard = ({ question, options, questionKey }) => (
    <View style={styles.questionCard}>
      <Text style={styles.questionText}>{question}</Text>
      {options.map((option) => (
        <RadioButton
          key={option}
          selected={responses[questionKey] === option}
          onPress={() => updateResponse(questionKey, option)}
          label={option}
        />
      ))}
    </View>
  );

  const ProgressBar = () => {
    const completedCount = getCompletedSectionsCount();
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{completedCount} of {totalPages} sections completed</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalPages) * 100}%` }]} />
        </View>
      </View>
    );
  };

  const getSectionStatus = (pageIndex) => {
    if (completedSections.includes(pageIndex) || (pageIndex < pages.length && pages[pageIndex].requiredQuestions.every(q => allResponses[q] && allResponses[q].toString().trim() !== ''))) {
      return 'completed';
    } else if (pageIndex === currentPage) {
      return 'active';
    } else {
      return 'inactive';
    }
  };

  const SectionNav = () => (
    <View style={styles.sectionNav}>
      <Text style={styles.sectionTitle}>Sections</Text>
      
      {pages.map((page, index) => {
        const status = getSectionStatus(index);
        return (
          <TouchableOpacity 
            key={index}
            style={[
              styles.sectionItem, 
              status === 'completed' && styles.sectionCompleted,
              status === 'active' && styles.sectionActive
            ]}
            
          >
            <Text style={[
              styles.sectionText,
              status === 'completed' && styles.sectionCompletedText,
              status === 'active' && styles.sectionActiveText
            ]}>
              {page.name}
            </Text>
            <Text style={[
              styles.sectionInactiveBadge,
              status === 'completed' && styles.sectionCompletedBadge,
              status === 'active' && styles.sectionBadge
            ]}>
              {status === 'completed' ? '✓' : index + 1}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
if(if2 === 0)
  {return (
    <View style={styles.container}>
       <View style={styles.topRightContainer}>
              <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            
              {showLangMenu && (
                <View style={styles.languageMenu}>
                  <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>العربية</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>עברית</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gender Equity Assessment</Text>
        <Text style={styles.headerSubtitle}>Evaluate your organization's practices across key areas of gender equity</Text>
        <ProgressBar />
      </View>

      <View style={styles.content}>
        {/* Sidebar Navigation */}
        <View style={styles.sidebar}>
          <SectionNav />
        </View>

        {/* Main Content */}
        <ScrollView style={styles.mainContent}>
          <View style={styles.contentHeader}>
            <Text style={styles.contentTitle}>Promotion & Advancement</Text>
            <Text style={styles.contentSubtitle}>Assess equity in career advancement opportunities</Text>
          </View>

          <QuestionCard
            question="Is promotion data broken down by gender and analyzed regularly?"
            options={['Yes', 'Sometimes', 'No', 'Unsure']}
            questionKey="promotion_data_analyzed"
          />

          <QuestionCard
            question="Are women equally represented in leadership development programs?"
            options={['Yes', 'Somewhat', 'No']}
            questionKey="leadership_development"
          />

          <QuestionCard
            question="Is there a formal mentoring or sponsorship program for women employees?"
            options={['Yes', 'Informal', 'No']}
            questionKey="mentoring_program"
          />

          <QuestionCard
            question="Are promotion criteria transparent and standardized across roles?"
            options={['Yes', 'Partially', 'No']}
            questionKey="promotion_criteria"
          />

          <QuestionCard
            question="Have women reported feeling overlooked or passed over in internal reviews?"
            options={['Yes', 'Occasionally', 'Rarely', 'Never']}
            questionKey="women_overlooked"
          />

          {!isPageComplete && (
            <View style={styles.validationMessage}>
              <Text style={styles.validationText}>Please answer all questions before proceeding to the next section.</Text>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.prevButton} onPress={goToPreviousPage}>
              <Text style={styles.prevButtonText}>Previous Section</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.nextButton, !isPageComplete && styles.nextButtonDisabled]} 
              onPress={goToNextPage}
              disabled={!isPageComplete}
            >
              <Text style={[styles.nextButtonText, !isPageComplete && styles.nextButtonTextDisabled]}>
                Next Section
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
if(if2 === 1)
  {return (
    <View style={styles.container}>
       <View style={styles.topRightContainer}>
              <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            
              {showLangMenu && (
                <View style={styles.languageMenu}>
                  <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>العربية</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>עברית</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
      {/* Header */}
      <View style={styles.header}>
  <Text style={styles.headerTitle}>تقييم المساواة بين الجنسين</Text>
  <Text style={styles.headerSubtitle}>قيّم ممارسات مؤسستك في المجالات الرئيسية للمساواة بين الجنسين</Text>
  <ProgressBar1 />
</View>

<View style={styles.content}>
  {/* Sidebar Navigation */}
  <View style={styles.sidebar}>
    <SectionNav1/>
  </View>

  {/* Main Content */}
  <ScrollView style={styles.mainContent}>
    <View style={styles.contentHeader}>
      <Text style={styles.contentTitle}>الترقيات والتقدم المهني</Text>
      <Text style={styles.contentSubtitle}>قيّم مدى العدالة في فرص التقدم الوظيفي</Text>
    </View>

    <QuestionCard
      question="هل يتم تحليل بيانات الترقيات حسب النوع الاجتماعي بشكل منتظم؟"
      options={['نعم', 'أحياناً', 'لا', 'غير متأكد/ة']}
      questionKey="promotion_data_analyzed"
    />

    <QuestionCard
      question="هل يتم تمثيل النساء بشكل متساوٍ في برامج تطوير القيادة؟"
      options={['نعم', 'إلى حد ما', 'لا']}
      questionKey="leadership_development"
    />

    <QuestionCard
      question="هل يوجد برنامج رسمي للإرشاد أو الرعاية للموظفات؟"
      options={['نعم', 'غير رسمي', 'لا']}
      questionKey="mentoring_program"
    />

    <QuestionCard
      question="هل معايير الترقية شفافة وموحدة عبر الأدوار المختلفة؟"
      options={['نعم', 'جزئياً', 'لا']}
      questionKey="promotion_criteria"
    />

    <QuestionCard
      question="هل أبلغت النساء عن شعورهن بالتجاهل أو الاستبعاد في المراجعات الداخلية؟"
      options={['نعم', 'أحياناً', 'نادراً', 'أبداً']}
      questionKey="women_overlooked"
    />

    {!isPageComplete && (
      <View style={styles.validationMessage}>
        <Text style={styles.validationText}>يرجى الإجابة على جميع الأسئلة قبل الانتقال إلى القسم التالي.</Text>
      </View>
    )}

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.prevButton} onPress={goToPreviousPage}>
        <Text style={styles.prevButtonText}>القسم السابق</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.nextButton, !isPageComplete && styles.nextButtonDisabled]} 
        onPress={goToNextPage}
        disabled={!isPageComplete}
      >
        <Text style={[styles.nextButtonText, !isPageComplete && styles.nextButtonTextDisabled]}>
          القسم التالي
        </Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
</View>

    </View>
  )
}
if(if2 === 2)
  {return (
    <View style={styles.container}>
       <View style={styles.topRightContainer}>
              <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            
              {showLangMenu && (
                <View style={styles.languageMenu}>
                  <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>العربية</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>עברית</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
      {/* Header */}
      <View style={styles.header}>
  <Text style={styles.headerTitle}>הערכת שוויון מגדרי</Text>
  <Text style={styles.headerSubtitle}>הערך את נהלי הארגון בתחומים המרכזיים של שוויון מגדרי</Text>
  <ProgressBar2 />
</View>

<View style={styles.content}>
  {/* Sidebar Navigation */}
  <View style={styles.sidebar}>
    <SectionNav2 />
  </View>

  {/* Main Content */}
  <ScrollView style={styles.mainContent}>
    <View style={styles.contentHeader}>
      <Text style={styles.contentTitle}>קידום והתפתחות מקצועית</Text>
      <Text style={styles.contentSubtitle}>הערך את שוויון ההזדמנויות לקידום מקצועי</Text>
    </View>

    <QuestionCard
      question="האם נתוני הקידום מפורקים לפי מגדר ומנותחים באופן קבוע?"
      options={['כן', 'לפעמים', 'לא', 'לא בטוח/ה']}
      questionKey="promotion_data_analyzed"
    />

    <QuestionCard
      question="האם נשים מיוצגות באופן שווה בתוכניות לפיתוח מנהיגות?"
      options={['כן', 'באופן חלקי', 'לא']}
      questionKey="leadership_development"
    />

    <QuestionCard
      question="האם קיים תוכנית רשמית לחונכות או חסות עבור נשים בעבודה?"
      options={['כן', 'בלתי פורמלי', 'לא']}
      questionKey="mentoring_program"
    />

    <QuestionCard
      question="האם קריטריוני הקידום שקופים ומאוחדים בכל התפקידים?"
      options={['כן', 'חלקית', 'לא']}
      questionKey="promotion_criteria"
    />

    <QuestionCard
      question="האם נשים דיווחו על תחושת הדרה או פספוס בהערכות פנימיות?"
      options={['כן', 'לפעמים', 'לעיתים נדירות', 'אף פעם']}
      questionKey="women_overlooked"
    />

    {!isPageComplete && (
      <View style={styles.validationMessage}>
        <Text style={styles.validationText}>נא לענות על כל השאלות לפני המעבר לסעיף הבא.</Text>
      </View>
    )}

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.prevButton} onPress={goToPreviousPage}>
        <Text style={styles.prevButtonText}>סעיף קודם</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.nextButton, !isPageComplete && styles.nextButtonDisabled]} 
        onPress={goToNextPage}
        disabled={!isPageComplete}
      >
        <Text style={[styles.nextButtonText, !isPageComplete && styles.nextButtonTextDisabled]}>
          סעיף הבא
        </Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
</View>

    </View>
  )
}
}

export function PayEquity({ 
  currentPage, 
  totalPages, 
  navigateToPage, 
  goToNextPage, 
  goToPreviousPage, 
  allResponses, 
  updateGlobalResponses,
  isPageComplete,
  completedSections,
  getCompletedSectionsCount,getCompletedSectionsCount1,getCompletedSectionsCount2,
  pages,pages1,pages2
}) {
  const [responses, setResponses] = useState(allResponses);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [if2, setIf2] = useState(0);


  const updateResponse = (questionKey, value) => {
    const newResponses = {
      ...responses,
      [questionKey]: value
    };
    setResponses(newResponses);
    updateGlobalResponses(newResponses);
  };

  const RadioButton = ({ selected, onPress, label }) => (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View style={[styles.radioCircle, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const QuestionCard = ({ question, options, questionKey }) => (
    <View style={styles.questionCard}>
      <Text style={styles.questionText}>{question}</Text>
      {options.map((option) => (
        <RadioButton
          key={option}
          selected={responses[questionKey] === option}
          onPress={() => updateResponse(questionKey, option)}
          label={option}
        />
      ))}
    </View>
  );


  const ProgressBar1 = () => {
    const completedCount = getCompletedSectionsCount1();
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{completedCount} of {totalPages} </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalPages) * 100}%` }]} />
        </View>
      </View>
    );
  };

  const ProgressBar2 = () => {
    const completedCount = getCompletedSectionsCount2();
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{completedCount} of {totalPages} sections completed</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalPages) * 100}%` }]} />
        </View>
      </View>
    );
  };
  const SectionNav1 = () => (
    <View style={styles.sectionNav}>
      <Text style={styles.sectionTitle}>Sections</Text>
      
      {pages1.map((page, index) => {
        const status = getSectionStatus(index);
        return (
          <TouchableOpacity 
            key={index}
            style={[
              styles.sectionItem, 
              status === 'completed' && styles.sectionCompleted,
              status === 'active' && styles.sectionActive
            ]}
            
          >
            <Text style={[
              styles.sectionText,
              status === 'completed' && styles.sectionCompletedText,
              status === 'active' && styles.sectionActiveText
            ]}>
              {page.name}
            </Text>
            <Text style={[
              styles.sectionInactiveBadge,
              status === 'completed' && styles.sectionCompletedBadge,
              status === 'active' && styles.sectionBadge
            ]}>
              {status === 'completed' ? '✓' : index + 1}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const SectionNav2 = () => (
    <View style={styles.sectionNav}>
      <Text style={styles.sectionTitle}>Sections</Text>
      
      {pages2.map((page, index) => {
        const status = getSectionStatus(index);
        return (
          <TouchableOpacity 
            key={index}
            style={[
              styles.sectionItem, 
              status === 'completed' && styles.sectionCompleted,
              status === 'active' && styles.sectionActive
            ]}
            
          >
            <Text style={[
              styles.sectionText,
              status === 'completed' && styles.sectionCompletedText,
              status === 'active' && styles.sectionActiveText
            ]}>
              {page.name}
            </Text>
            <Text style={[
              styles.sectionInactiveBadge,
              status === 'completed' && styles.sectionCompletedBadge,
              status === 'active' && styles.sectionBadge
            ]}>
              {status === 'completed' ? '✓' : index + 1}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );


  const ProgressBar = () => {
    const completedCount = getCompletedSectionsCount();
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{completedCount} of {totalPages} sections completed</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalPages) * 100}%` }]} />
        </View>
      </View>
    );
  };

  const getSectionStatus = (pageIndex) => {
    if (completedSections.includes(pageIndex) || (pageIndex < pages.length && pages[pageIndex].requiredQuestions.every(q => allResponses[q] && allResponses[q].toString().trim() !== ''))) {
      return 'completed';
    } else if (pageIndex === currentPage) {
      return 'active';
    } else {
      return 'inactive';
    }
  };

  const SectionNav = () => (
    <View style={styles.sectionNav}>
      <Text style={styles.sectionTitle}>Sections</Text>
      
      {pages.map((page, index) => {
        const status = getSectionStatus(index);
        return (
          <TouchableOpacity 
            key={index}
            style={[
              styles.sectionItem, 
              status === 'completed' && styles.sectionCompleted,
              status === 'active' && styles.sectionActive
            ]}
          >
            <Text style={[
              styles.sectionText,
              status === 'completed' && styles.sectionCompletedText,
              status === 'active' && styles.sectionActiveText
            ]}>
              {page.name}
            </Text>
            <Text style={[
              styles.sectionInactiveBadge,
              status === 'completed' && styles.sectionCompletedBadge,
              status === 'active' && styles.sectionBadge
            ]}>
              {status === 'completed' ? '✓' : index + 1}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
if(if2 === 0)
  { 
  return (
    <View style={styles.container}>
       <View style={styles.topRightContainer}>
              <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            
              {showLangMenu && (
                <View style={styles.languageMenu}>
                  <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>العربية</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>עברית</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gender Equity Assessment</Text>
        <Text style={styles.headerSubtitle}>Evaluate your organization's practices across key areas of gender equity</Text>
        <ProgressBar />
      </View>

      <View style={styles.content}>
        {/* Sidebar Navigation */}
        <View style={styles.sidebar}>
          <SectionNav />
        </View>

        {/* Main Content */}
        <ScrollView style={styles.mainContent}>
          <View style={styles.contentHeader}>
            <Text style={styles.contentTitle}>Pay Equity</Text>
            <Text style={styles.contentSubtitle}>Review compensation practices and gender pay gaps</Text>
          </View>

          <QuestionCard
            question="Has a gender pay audit been conducted within the past 2 years?"
            options={['Yes', 'No']}
            questionKey="pay_audit_conducted"
          />

          <QuestionCard
            question="Do you adjust salaries if gender-based gaps are found?"
            options={['Always', 'Sometimes', 'Never']}
            questionKey="adjust_salaries"
          />

          <QuestionCard
            question="Are starting salaries for men and women in similar roles compared?"
            options={['Yes', 'No', "Don't Know"]}
            questionKey="starting_salaries_compared"
          />

          <QuestionCard
            question="Do employees have access to transparent pay bands or salary ranges?"
            options={['Yes', 'Some Roles', 'No']}
            questionKey="transparent_pay_bands"
          />

          <QuestionCard
            question="Do managers receive training on equitable compensation practices?"
            options={['Yes', 'Some Managers', 'No']}
            questionKey="manager_training"
          />

          {!isPageComplete && (
            <View style={styles.validationMessage}>
              <Text style={styles.validationText}>Please answer all questions before proceeding to the next section.</Text>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.prevButton} onPress={goToPreviousPage}>
              <Text style={styles.prevButtonText}>Previous Section</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.nextButton, !isPageComplete && styles.nextButtonDisabled]} 
              onPress={goToNextPage}
              disabled={!isPageComplete}
            >
              <Text style={[styles.nextButtonText, !isPageComplete && styles.nextButtonTextDisabled]}>
                Next Section
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
if(if2 === 1)
  { 
  return (
    <View style={styles.container}>
       <View style={styles.topRightContainer}>
              <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            
              {showLangMenu && (
                <View style={styles.languageMenu}>
                  <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>العربية</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>עברית</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
      {/* Header */}
      <View style={styles.header}>
  <Text style={styles.headerTitle}>تقييم المساواة بين الجنسين</Text>
  <Text style={styles.headerSubtitle}>قيّم ممارسات مؤسستك في المجالات الأساسية للمساواة بين الجنسين</Text>
  <ProgressBar1 />
</View>

<View style={styles.content}>
  {/* Sidebar Navigation */}
  <View style={styles.sidebar}>
    <SectionNav1 />
  </View>

  {/* Main Content */}
  <ScrollView style={styles.mainContent}>
    <View style={styles.contentHeader}>
      <Text style={styles.contentTitle}>المساواة في الأجور</Text>
      <Text style={styles.contentSubtitle}>مراجعة ممارسات التعويض والفجوات في الأجور بين الجنسين</Text>
    </View>

    <QuestionCard
      question="هل تم إجراء تدقيق في الأجور حسب الجنس خلال العامين الماضيين؟"
      options={['نعم', 'لا']}
      questionKey="pay_audit_conducted"
    />

    <QuestionCard
      question="هل تقوم بتعديل الرواتب إذا تم العثور على فجوات قائمة على الجنس؟"
      options={['دائمًا', 'أحيانًا', 'أبدًا']}
      questionKey="adjust_salaries"
    />

    <QuestionCard
      question="هل تتم مقارنة الرواتب الابتدائية بين الرجال والنساء في الأدوار المشابهة؟"
      options={['نعم', 'لا', 'لا أعرف']}
      questionKey="starting_salaries_compared"
    />

    <QuestionCard
      question="هل يمكن للموظفين الوصول إلى نطاقات رواتب شفافة؟"
      options={['نعم', 'لبعض الوظائف', 'لا']}
      questionKey="transparent_pay_bands"
    />

    <QuestionCard
      question="هل يتلقى المديرون تدريبًا على ممارسات التعويض العادلة؟"
      options={['نعم', 'بعض المديرين', 'لا']}
      questionKey="manager_training"
    />

    {!isPageComplete && (
      <View style={styles.validationMessage}>
        <Text style={styles.validationText}>يرجى الإجابة على جميع الأسئلة قبل الانتقال إلى القسم التالي.</Text>
      </View>
    )}

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.prevButton} onPress={goToPreviousPage}>
        <Text style={styles.prevButtonText}>القسم السابق</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.nextButton, !isPageComplete && styles.nextButtonDisabled]} 
        onPress={goToNextPage}
        disabled={!isPageComplete}
      >
        <Text style={[styles.nextButtonText, !isPageComplete && styles.nextButtonTextDisabled]}>
          القسم التالي
        </Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
</View>

    </View>
  )
}
if(if2 === 2)
  { 
  return (
    <View style={styles.container}>
       <View style={styles.topRightContainer}>
              <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            
              {showLangMenu && (
                <View style={styles.languageMenu}>
                  <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>العربية</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>עברית</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
      {/* Header */}
      <View style={styles.header}>
  <Text style={styles.headerTitle}>הערכת שוויון מגדרי</Text>
  <Text style={styles.headerSubtitle}>הערך את נהלי הארגון שלך בתחומים מרכזיים של שוויון מגדרי</Text>
  <ProgressBar2 />
</View>

<View style={styles.content}>
  {/* Sidebar Navigation */}
  <View style={styles.sidebar}>
    <SectionNav2 />
  </View>

  {/* Main Content */}
  <ScrollView style={styles.mainContent}>
    <View style={styles.contentHeader}>
      <Text style={styles.contentTitle}>שוויון בשכר</Text>
      <Text style={styles.contentSubtitle}>סקור נהלי תגמול ופערים מגדריים בשכר</Text>
    </View>

    <QuestionCard
      question="האם נערך סקר שכר מגדרי במהלך השנתיים האחרונות?"
      options={['כן', 'לא']}
      questionKey="pay_audit_conducted"
    />

    <QuestionCard
      question="האם מתבצע תיקון שכר כאשר מתגלים פערים מגדריים?"
      options={['תמיד', 'לפעמים', 'לעולם לא']}
      questionKey="adjust_salaries"
    />

    <QuestionCard
      question="האם שכר התחלתי מושווה בין נשים לגברים בתפקידים דומים?"
      options={['כן', 'לא', 'לא יודע/ת']}
      questionKey="starting_salaries_compared"
    />

    <QuestionCard
      question="האם לעובדים יש גישה לטווחי שכר שקופים?"
      options={['כן', 'בחלק מהתפקידים', 'לא']}
      questionKey="transparent_pay_bands"
    />

    <QuestionCard
      question="האם מנהלים מקבלים הכשרה בנושא תגמול שוויוני?"
      options={['כן', 'חלק מהמנהלים', 'לא']}
      questionKey="manager_training"
    />

    {!isPageComplete && (
      <View style={styles.validationMessage}>
        <Text style={styles.validationText}>אנא ענה/עני על כל השאלות לפני המעבר לסעיף הבא.</Text>
      </View>
    )}

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.prevButton} onPress={goToPreviousPage}>
        <Text style={styles.prevButtonText}>הסעיף הקודם</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.nextButton, !isPageComplete && styles.nextButtonDisabled]} 
        onPress={goToNextPage}
        disabled={!isPageComplete}
      >
        <Text style={[styles.nextButtonText, !isPageComplete && styles.nextButtonTextDisabled]}>
          הסעיף הבא
        </Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
</View>

    </View>
  )
}

}


export function PerformanceMetrics({ 
  currentPage, 
  totalPages, 
  navigateToPage, 
  goToNextPage, 
  goToPreviousPage, 
  allResponses, 
  updateGlobalResponses,
  isPageComplete,
  completedSections,
  getCompletedSectionsCount,getCompletedSectionsCount1,getCompletedSectionsCount2,
  pages,pages1,pages2
}) {
  const [responses, setResponses] = useState(allResponses);
const [showLangMenu, setShowLangMenu] = useState(false);
  const [if2, setIf2] = useState(0);

const ProgressBar1 = () => {
    const completedCount = getCompletedSectionsCount1();
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{completedCount} of {totalPages} </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalPages) * 100}%` }]} />
        </View>
      </View>
    );
  };

  const ProgressBar2 = () => {
    const completedCount = getCompletedSectionsCount2();
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{completedCount} of {totalPages} sections completed</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalPages) * 100}%` }]} />
        </View>
      </View>
    );
  };


  const SectionNav1 = () => (
    <View style={styles.sectionNav}>
      <Text style={styles.sectionTitle}>Sections</Text>
      
      {pages1.map((page, index) => {
        const status = getSectionStatus(index);
        return (
          <TouchableOpacity 
            key={index}
            style={[
              styles.sectionItem, 
              status === 'completed' && styles.sectionCompleted,
              status === 'active' && styles.sectionActive
            ]}
            
          >
            <Text style={[
              styles.sectionText,
              status === 'completed' && styles.sectionCompletedText,
              status === 'active' && styles.sectionActiveText
            ]}>
              {page.name}
            </Text>
            <Text style={[
              styles.sectionInactiveBadge,
              status === 'completed' && styles.sectionCompletedBadge,
              status === 'active' && styles.sectionBadge
            ]}>
              {status === 'completed' ? '✓' : index + 1}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const SectionNav2 = () => (
    <View style={styles.sectionNav}>
      <Text style={styles.sectionTitle}>Sections</Text>
      
      {pages2.map((page, index) => {
        const status = getSectionStatus(index);
        return (
          <TouchableOpacity 
            key={index}
            style={[
              styles.sectionItem, 
              status === 'completed' && styles.sectionCompleted,
              status === 'active' && styles.sectionActive
            ]}
            
          >
            <Text style={[
              styles.sectionText,
              status === 'completed' && styles.sectionCompletedText,
              status === 'active' && styles.sectionActiveText
            ]}>
              {page.name}
            </Text>
            <Text style={[
              styles.sectionInactiveBadge,
              status === 'completed' && styles.sectionCompletedBadge,
              status === 'active' && styles.sectionBadge
            ]}>
              {status === 'completed' ? '✓' : index + 1}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const updateResponse = (questionKey, value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const number = parseInt(numericValue, 10);

    if (!isNaN(number) && number >= 0 && number <= 100) {
      const newResponses = {
        ...responses,
        [questionKey]: numericValue
      };
      setResponses(newResponses);
      updateGlobalResponses(newResponses);
    } else if (numericValue === '') {
      const newResponses = {
        ...responses,
        [questionKey]: ''
      };
      setResponses(newResponses);
      updateGlobalResponses(newResponses);
    }
  };

  const TextInputQuestion = ({ question, questionKey, placeholder }) => (
    <View style={styles.questionCard}>
      <Text style={styles.questionText}>{question}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={responses[questionKey] || ''}
        onChangeText={(text) => updateResponse(questionKey, text)}
        keyboardType="numeric"
      />
    </View>
  );

  const ProgressBar = () => {
    const completedCount = getCompletedSectionsCount();
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{completedCount} of {totalPages} sections completed</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalPages) * 100}%` }]} />
        </View>
      </View>
    );
  };

  const getSectionStatus = (pageIndex) => {
    if (completedSections.includes(pageIndex) || (pageIndex < pages.length && pages[pageIndex].requiredQuestions.every(q => allResponses[q] && allResponses[q].toString().trim() !== ''))) {
      return 'completed';
    } else if (pageIndex === currentPage) {
      return 'active';
    } else {
      return 'inactive';
    }
  };

  const SectionNav = () => (
    <View style={styles.sectionNav}>
      <Text style={styles.sectionTitle}>Sections</Text>
      
      {pages.map((page, index) => {
        const status = getSectionStatus(index);
        return (
          <TouchableOpacity 
            key={index}
            style={[
              styles.sectionItem, 
              status === 'completed' && styles.sectionCompleted,
              status === 'active' && styles.sectionActive
            ]}
          >
            <Text style={[
              styles.sectionText,
              status === 'completed' && styles.sectionCompletedText,
              status === 'active' && styles.sectionActiveText
            ]}>
              {page.name}
            </Text>
            <Text style={[
              styles.sectionInactiveBadge,
              status === 'completed' && styles.sectionCompletedBadge,
              status === 'active' && styles.sectionBadge
            ]}>
              {status === 'completed' ? '✓' : index + 1}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
if(if2 === 0)
  {
  return (
    <View style={styles.container}>
       <View style={styles.topRightContainer}>
              <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            
              {showLangMenu && (
                <View style={styles.languageMenu}>
                  <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>العربية</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>עברית</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gender Equity Assessment</Text>
        <Text style={styles.headerSubtitle}>Evaluate your organization's practices across key areas of gender equity</Text>
        <ProgressBar />
      </View>

      <View style={styles.content}>
        {/* Sidebar Navigation */}
        <View style={styles.sidebar}>
          <SectionNav />
        </View>

        {/* Main Content */}
        <ScrollView style={styles.mainContent}>
          <View style={styles.contentHeader}>
            <Text style={styles.contentTitle}>Performance Metrics</Text>
            <Text style={styles.contentSubtitle}>Quantitative data on women in your organization</Text>
          </View>

          <TextInputQuestion
            question="What percentage of women applied for positions in the last 12 months?"
            questionKey="women_applied_percentage"
            placeholder="Enter percentage (0-100)"
          />

          <TextInputQuestion
            question="What percentage of women were hired in the last 12 months?"
            questionKey="women_hired_percentage"
            placeholder="Enter percentage (0-100)"
          />

          <TextInputQuestion
            question="What percentage of promotions went to women in the last 12 months?"
            questionKey="women_promotions_percentage"
            placeholder="Enter percentage (0-100)"
          />

          <TextInputQuestion
            question="What percentage of salary raises went to women in the last 12 months?"
            questionKey="women_salary_raises_percentage"
            placeholder="Enter percentage (0-100)"
          />

          <TextInputQuestion
            question="What percentage of your leadership team (manager level and above) are women?"
            questionKey="women_leadership_percentage"
            placeholder="Enter percentage (0-100)"
          />

          {!isPageComplete && (
            <View style={styles.validationMessage}>
              <Text style={styles.validationText}>Please answer all questions before proceeding to the next section.</Text>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.prevButton} onPress={goToPreviousPage}>
              <Text style={styles.prevButtonText}>Previous Section</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.nextButton, !isPageComplete && styles.nextButtonDisabled]} 
              onPress={goToNextPage}
              disabled={!isPageComplete}
            >
              <Text style={[styles.nextButtonText, !isPageComplete && styles.nextButtonTextDisabled]}>
                Next Section
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
if(if2 === 1)
  {
  return (
    <View style={styles.container}>
       <View style={styles.topRightContainer}>
              <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            
              {showLangMenu && (
                <View style={styles.languageMenu}>
                  <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>العربية</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>עברית</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
      {/* Header */}
      <View style={styles.header}>
  <Text style={styles.headerTitle}>تقييم المساواة بين الجنسين</Text>
  <Text style={styles.headerSubtitle}>قيّم ممارسات مؤسستك في المجالات الرئيسية للمساواة بين الجنسين</Text>
  <ProgressBar1/>
</View>

<View style={styles.content}>
  {/* Sidebar Navigation */}
  <View style={styles.sidebar}>
    <SectionNav1/>
  </View>

  {/* Main Content */}
  <ScrollView style={styles.mainContent}>
    <View style={styles.contentHeader}>
      <Text style={styles.contentTitle}>الإنصاف في الأجور</Text>
      <Text style={styles.contentSubtitle}>راجع ممارسات التعويضات والفجوات في الأجور بين الجنسين</Text>
    </View>

    <QuestionCard
      question="هل تم إجراء تدقيق على الأجور حسب النوع الاجتماعي خلال العامين الماضيين؟"
      options={['نعم', 'لا']}
      questionKey="pay_audit_conducted"
    />

    <QuestionCard
      question="هل تقومون بتعديل الرواتب في حال وجود فجوات قائمة على النوع الاجتماعي؟"
      options={['دائمًا', 'أحيانًا', 'أبدًا']}
      questionKey="adjust_salaries"
    />

    <QuestionCard
      question="هل تتم مقارنة الرواتب الابتدائية للنساء والرجال في نفس الأدوار؟"
      options={['نعم', 'لا', 'لا أعلم']}
      questionKey="starting_salaries_compared"
    />

    <QuestionCard
      question="هل لدى الموظفين إمكانية الوصول إلى نطاقات الأجور الشفافة؟"
      options={['نعم', 'لبعض الوظائف', 'لا']}
      questionKey="transparent_pay_bands"
    />

    <QuestionCard
      question="هل يتلقى المديرون تدريبًا على ممارسات التعويض العادل؟"
      options={['نعم', 'بعض المديرين', 'لا']}
      questionKey="manager_training"
    />

    {!isPageComplete && (
      <View style={styles.validationMessage}>
        <Text style={styles.validationText}>يرجى الإجابة على جميع الأسئلة قبل الانتقال إلى القسم التالي.</Text>
      </View>
    )}

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.prevButton} onPress={goToPreviousPage}>
        <Text style={styles.prevButtonText}>القسم السابق</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.nextButton, !isPageComplete && styles.nextButtonDisabled]} 
        onPress={goToNextPage}
        disabled={!isPageComplete}
      >
        <Text style={[styles.nextButtonText, !isPageComplete && styles.nextButtonTextDisabled]}>
          القسم التالي
        </Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
</View>

    </View>
  )
}
if(if2 === 2)
  {
  return (
    <View style={styles.container}>
       <View style={styles.topRightContainer}>
              <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            
              {showLangMenu && (
                <View style={styles.languageMenu}>
                  <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>العربية</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>עברית</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
      {/* Header */}
<View style={styles.header}>
  <Text style={styles.headerTitle}>הערכת שוויון מגדרי</Text>
  <Text style={styles.headerSubtitle}>הערך את נהלי הארגון שלך בתחומים מרכזיים של שוויון מגדרי</Text>
  <ProgressBar2 />
</View>

<View style={styles.content}>
  {/* Sidebar Navigation */}
  <View style={styles.sidebar}>
    <SectionNav2 />
  </View>

  {/* Main Content */}
  <ScrollView style={styles.mainContent}>
    <View style={styles.contentHeader}>
      <Text style={styles.contentTitle}>שוויון בשכר</Text>
      <Text style={styles.contentSubtitle}>סקור נהלי תגמול ופערים מגדריים בשכר</Text>
    </View>

    <QuestionCard
      question="האם נערך סקר שכר מגדרי במהלך השנתיים האחרונות?"
      options={['כן', 'לא']}
      questionKey="pay_audit_conducted"
    />

    <QuestionCard
      question="האם מתבצע תיקון שכר כאשר מתגלים פערים מגדריים?"
      options={['תמיד', 'לפעמים', 'לעולם לא']}
      questionKey="adjust_salaries"
    />

    <QuestionCard
      question="האם שכר התחלתי מושווה בין נשים לגברים בתפקידים דומים?"
      options={['כן', 'לא', 'לא יודע/ת']}
      questionKey="starting_salaries_compared"
    />

    <QuestionCard
      question="האם לעובדים יש גישה לטווחי שכר שקופים?"
      options={['כן', 'בחלק מהתפקידים', 'לא']}
      questionKey="transparent_pay_bands"
    />

    <QuestionCard
      question="האם מנהלים מקבלים הכשרה בנושא תגמול שוויוני?"
      options={['כן', 'חלק מהמנהלים', 'לא']}
      questionKey="manager_training"
    />

    {!isPageComplete && (
      <View style={styles.validationMessage}>
        <Text style={styles.validationText}>אנא ענה/עני על כל השאלות לפני המעבר לסעיף הבא.</Text>
      </View>
    )}

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.prevButton} onPress={goToPreviousPage}>
        <Text style={styles.prevButtonText}>הסעיף הקודם</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.nextButton, !isPageComplete && styles.nextButtonDisabled]} 
        onPress={goToNextPage}
        disabled={!isPageComplete}
      >
        <Text style={[styles.nextButtonText, !isPageComplete && styles.nextButtonTextDisabled]}>
          הסעיף הבא
        </Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
</View>

    </View>
  )
}


}




export function AdditionalConsiderations({ 
  currentPage, 
  totalPages, 
  navigateToPage, 
  goToNextPage, 
  goToPreviousPage, 
  allResponses, 
  updateGlobalResponses,
  isPageComplete,
  completedSections,
  getCompletedSectionsCount,getCompletedSectionsCount1,getCompletedSectionsCount2,
  pages,pages1,pages2
}) {
  const [responses, setResponses] = useState(allResponses);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [if2, setIf2] = useState(0);
 

  const SectionNav1 = () => (
    <View style={styles.sectionNav}>
      <Text style={styles.sectionTitle}>Sections</Text>
      
      {pages1.map((page, index) => {
        const status = getSectionStatus(index);
        return (
          <TouchableOpacity 
            key={index}
            style={[
              styles.sectionItem, 
              status === 'completed' && styles.sectionCompleted,
              status === 'active' && styles.sectionActive
            ]}
            
          >
            <Text style={[
              styles.sectionText,
              status === 'completed' && styles.sectionCompletedText,
              status === 'active' && styles.sectionActiveText
            ]}>
              {page.name}
            </Text>
            <Text style={[
              styles.sectionInactiveBadge,
              status === 'completed' && styles.sectionCompletedBadge,
              status === 'active' && styles.sectionBadge
            ]}>
              {status === 'completed' ? '✓' : index + 1}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );


  const ProgressBar1 = () => {
    const completedCount = getCompletedSectionsCount1();
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{completedCount} of {totalPages} </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalPages) * 100}%` }]} />
        </View>
      </View>
    );
  };

  const ProgressBar2 = () => {
    const completedCount = getCompletedSectionsCount2();
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{completedCount} of {totalPages} sections completed</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalPages) * 100}%` }]} />
        </View>
      </View>
    );
  };

  const SectionNav2 = () => (
    <View style={styles.sectionNav}>
      <Text style={styles.sectionTitle}>Sections</Text>
      
      {pages2.map((page, index) => {
        const status = getSectionStatus(index);
        return (
          <TouchableOpacity 
            key={index}
            style={[
              styles.sectionItem, 
              status === 'completed' && styles.sectionCompleted,
              status === 'active' && styles.sectionActive
            ]}
            
          >
            <Text style={[
              styles.sectionText,
              status === 'completed' && styles.sectionCompletedText,
              status === 'active' && styles.sectionActiveText
            ]}>
              {page.name}
            </Text>
            <Text style={[
              styles.sectionInactiveBadge,
              status === 'completed' && styles.sectionCompletedBadge,
              status === 'active' && styles.sectionBadge
            ]}>
              {status === 'completed' ? '✓' : index + 1}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const updateResponse = (questionKey, value) => {
    const newResponses = {
      ...responses,
      [questionKey]: value
    };
    setResponses(newResponses);
    updateGlobalResponses(newResponses);
  };

  const RadioButton = ({ selected, onPress, label }) => (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View style={[styles.radioCircle, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const QuestionCard = ({ question, options, questionKey }) => (
    <View style={styles.questionCard}>
      <Text style={styles.questionText}>{question}</Text>
      {options.map((option) => (
        <RadioButton
          key={option}
          selected={responses[questionKey] === option}
          onPress={() => updateResponse(questionKey, option)}
          label={option}
        />
      ))}
    </View>
  );

  const ProgressBar = () => {
    const completedCount = getCompletedSectionsCount();
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{completedCount} of {totalPages} sections completed</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalPages) * 100}%` }]} />
        </View>
      </View>
    );
  };

  const getSectionStatus = (pageIndex) => {
    if (completedSections.includes(pageIndex) || (pageIndex < pages.length && pages[pageIndex].requiredQuestions.every(q => allResponses[q] && allResponses[q].toString().trim() !== ''))) {
      return 'completed';
    } else if (pageIndex === currentPage) {
      return 'active';
    } else {
      return 'inactive';
    }
  };

  const SectionNav = () => (
    <View style={styles.sectionNav}>
      <Text style={styles.sectionTitle}>Sections</Text>
      
      {pages.map((page, index) => {
        const status = getSectionStatus(index);
        return (
          <TouchableOpacity 
            key={index}
            style={[
              styles.sectionItem, 
              status === 'completed' && styles.sectionCompleted,
              status === 'active' && styles.sectionActive
            ]}
          >
            <Text style={[
              styles.sectionText,
              status === 'completed' && styles.sectionCompletedText,
              status === 'active' && styles.sectionActiveText
            ]}>
              {page.name}
            </Text>
            <Text style={[
              styles.sectionInactiveBadge,
              status === 'completed' && styles.sectionCompletedBadge,
              status === 'active' && styles.sectionBadge
            ]}>
              {status === 'completed' ? '✓' : index + 1}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const handleComplete = () => {
    if (!isPageComplete) {
      alert('Please answer all questions before completing the assessment.');
      return;
    }

    // Calculate basic score based on responses
    let score = 0;
    let totalQuestions = 0;
    
    // Simple scoring logic - you can make this more sophisticated
    Object.values(responses).forEach(response => {
      if (response) {
        totalQuestions++;
        // Basic scoring - positive answers get higher scores
        if (response === 'Yes' || response === 'Always') score += 3;
        else if (response === 'Sometimes' || response === 'Partially' || response === 'Somewhat') score += 2;
        else if (response === 'Rarely' || response === 'No') score += 1;
      }
    });

    const percentage = totalQuestions > 0 ? Math.round((score / (totalQuestions * 3)) * 100) : 0;
    
    console.log('Assessment completed with responses:', responses);
    console.log('Score:', percentage + '%');
    
    alert(`Assessment Complete! \n\nYour Gender Equity Score: ${percentage}%\n\nThank you for completing the Gender Equity Assessment. Consider reviewing areas where you scored lower to improve your organization's gender equity practices.`);
  };
if(if2 === 0)
  {
  return (
    <View style={styles.container}>
       <View style={styles.topRightContainer}>
              <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            
              {showLangMenu && (
                <View style={styles.languageMenu}>
                  <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>العربية</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>עברית</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gender Equity Assessment</Text>
        <Text style={styles.headerSubtitle}>Evaluate your organization's practices across key areas of gender equity</Text>
        <ProgressBar />
      </View>

      <View style={styles.content}>
        {/* Sidebar Navigation */}
        <View style={styles.sidebar}>
          <SectionNav />
        </View>

        {/* Main Content */}
        <ScrollView style={styles.mainContent}>
          <View style={styles.contentHeader}>
            <Text style={styles.contentTitle}>Additional Considerations</Text>
            <Text style={styles.contentSubtitle}>Examine workplace culture and support systems</Text>
          </View>

          <QuestionCard
            question="Does your parental leave policy meet or exceed national legal minimums?"
            options={['Yes', 'Meets', 'Below', 'Not Sure']}
            questionKey="parental_leave_policy"
          />

          <QuestionCard
            question="Are flexible work policies equally accessible and encouraged for all genders?"
            options={['Yes', 'Informally', 'No']}
            questionKey="flexible_work_policies"
          />

          <QuestionCard
            question="Have employees been surveyed on their experience with gender equity?"
            options={['Yes', 'Planning To', 'No']}
            questionKey="employee_survey"
          />

          <QuestionCard
            question="Are incidents of gender bias or discrimination formally tracked and addressed?"
            options={['Always', 'Sometimes', 'Rarely', 'Never']}
            questionKey="bias_incidents_tracked"
          />

          <QuestionCard
            question="Is there an internal champion or team responsible for gender equity efforts?"
            options={['Yes', 'Informal Role', 'No']}
            questionKey="internal_champion"
          />

          {!isPageComplete && (
            <View style={styles.validationMessage}>
              <Text style={styles.validationText}>Please answer all questions before completing the assessment.</Text>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.prevButton} onPress={goToPreviousPage}>
              <Text style={styles.prevButtonText}>Previous Section</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.completeButton, !isPageComplete && styles.completeButtonDisabled]} 
              onPress={goToNextPage}
              disabled={!isPageComplete}
            >
              <Text style={[styles.completeButtonText, !isPageComplete && styles.completeButtonTextDisabled]}>
                Complete Assessment
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
if(if2 === 1)
  {
  return (
    <View style={styles.container}>
       <View style={styles.topRightContainer}>
              <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            
              {showLangMenu && (
                <View style={styles.languageMenu}>
                  <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>العربية</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>עברית</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
      {/* Header */}
      <View style={styles.header}>
  <Text style={styles.headerTitle}>تقييم المساواة بين الجنسين</Text>
  <Text style={styles.headerSubtitle}>قيّم ممارسات مؤسستك في المجالات الرئيسية للمساواة بين الجنسين</Text>
  <ProgressBar1 />
</View>

<View style={styles.content}>
  {/* Sidebar Navigation */}
  <View style={styles.sidebar}>
    <SectionNav1 />
  </View>

  {/* Main Content */}
  <ScrollView style={styles.mainContent}>
    <View style={styles.contentHeader}>
      <Text style={styles.contentTitle}>اعتبارات إضافية</Text>
      <Text style={styles.contentSubtitle}>افحص ثقافة مكان العمل وأنظمة الدعم</Text>
    </View>

    <QuestionCard
      question="هل سياسة إجازة الوالدين تفي بالحد الأدنى القانوني الوطني أو تتجاوزه؟"
      options={['نعم', 'تفي', 'أقل', 'لست متأكدًا']}
      questionKey="parental_leave_policy"
    />

    <QuestionCard
      question="هل سياسات العمل المرنة متاحة ومشجعة بالتساوي لجميع الفئات؟"
      options={['نعم', 'بشكل غير رسمي', 'لا']}
      questionKey="flexible_work_policies"
    />

    <QuestionCard
      question="هل تم إجراء استطلاع للموظفين حول تجربتهم مع المساواة بين الجنسين؟"
      options={['نعم', 'قيد التخطيط', 'لا']}
      questionKey="employee_survey"
    />

    <QuestionCard
      question="هل يتم تتبع ومعالجة حوادث التحيز أو التمييز الجنسي بشكل رسمي؟"
      options={['دائمًا', 'أحيانًا', 'نادراً', 'أبدًا']}
      questionKey="bias_incidents_tracked"
    />

    <QuestionCard
      question="هل هناك جهة أو فريق داخلي مسؤول عن جهود المساواة بين الجنسين؟"
      options={['نعم', 'دور غير رسمي', 'لا']}
      questionKey="internal_champion"
    />

    {!isPageComplete && (
      <View style={styles.validationMessage}>
        <Text style={styles.validationText}>يرجى الإجابة على جميع الأسئلة قبل إكمال التقييم.</Text>
      </View>
    )}

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.prevButton} onPress={goToPreviousPage}>
        <Text style={styles.prevButtonText}>القسم السابق</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.completeButton, !isPageComplete && styles.completeButtonDisabled]} 
        onPress={goToNextPage}
        disabled={!isPageComplete}
      >
        <Text style={[styles.completeButtonText, !isPageComplete && styles.completeButtonTextDisabled]}>
          إكمال التقييم
        </Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
</View>

    </View>
  )
}
if(if2 === 2)
  {
  return (
    <View style={styles.container}>
       <View style={styles.topRightContainer}>
              <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            
              {showLangMenu && (
                <View style={styles.languageMenu}>
                  <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>العربية</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>עברית</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
      {/* Header */}
<View style={styles.header}>
  <Text style={styles.headerTitle}>הערכת שוויון מגדרי</Text>
  <Text style={styles.headerSubtitle}>הערך את נהלי הארגון שלך בתחומים מרכזיים של שוויון מגדרי</Text>
  <ProgressBar2 />
</View>

<View style={styles.content}>
  {/* Sidebar Navigation */}
  <View style={styles.sidebar}>
    <SectionNav2 />
  </View>

  {/* Main Content */}
  <ScrollView style={styles.mainContent}>
    <View style={styles.contentHeader}>
      <Text style={styles.contentTitle}>שיקולים נוספים</Text>
      <Text style={styles.contentSubtitle}>בדוק את תרבות מקום העבודה ומערכות התמיכה</Text>
    </View>

    <QuestionCard
      question="האם מדיניות חופשת ההורות שלכם עומדת או עולה על הדרישות החוקיות?"
      options={['כן', 'עומדת בדרישות', 'פחות מהנדרש', 'לא בטוח/ה']}
      questionKey="parental_leave_policy"
    />

    <QuestionCard
      question="האם מדיניות העבודה הגמישה נגישה ומעודדת לכל המגדרים באופן שווה?"
      options={['כן', 'באופן לא פורמלי', 'לא']}
      questionKey="flexible_work_policies"
    />

    <QuestionCard
      question="האם נערך סקר לעובדים על החוויה שלהם בנוגע לשוויון מגדרי?"
      options={['כן', 'מתוכנן', 'לא']}
      questionKey="employee_survey"
    />

    <QuestionCard
      question="האם מדווחים ומטופלים מקרים של אפליה או הטיה מגדרית באופן פורמלי?"
      options={['תמיד', 'לפעמים', 'לעיתים רחוקות', 'אף פעם']}
      questionKey="bias_incidents_tracked"
    />

    <QuestionCard
      question="האם יש גורם או צוות פנימי שאחראי למאמצי שוויון מגדרי?"
      options={['כן', 'תפקיד לא פורמלי', 'לא']}
      questionKey="internal_champion"
    />

    {!isPageComplete && (
      <View style={styles.validationMessage}>
        <Text style={styles.validationText}>אנא ענה/עני על כל השאלות לפני סיום ההערכה.</Text>
      </View>
    )}

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.prevButton} onPress={goToPreviousPage}>
        <Text style={styles.prevButtonText}>הסעיף הקודם</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.completeButton, !isPageComplete && styles.completeButtonDisabled]} 
        onPress={goToNextPage}
        disabled={!isPageComplete}
      >
        <Text style={[styles.completeButtonText, !isPageComplete && styles.completeButtonTextDisabled]}>
          סיום ההערכה
        </Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
</View>

    </View>
  )
}
}





export function GenderEquityAssesmentApp2({ 
  currentPage, 
  totalPages, 
  navigateToPage, 
  goToNextPage, 
  goToPreviousPage, 
  allResponses, 
  updateGlobalResponses,
  isPageComplete,
  completedSections,
  getCompletedSectionsCount,getCompletedSectionsCount1,getCompletedSectionsCount2,
  pages,pages1,pages2
}){
const [showLangMenu, setShowLangMenu] = useState(false);
  const [if2, setIf2] = useState(0);
  

  const ProgressBar1 = () => {
    const completedCount = getCompletedSectionsCount1();
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{completedCount} of {totalPages} </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalPages) * 100}%` }]} />
        </View>
      </View>
    );
  };

  const ProgressBar2 = () => {
    const completedCount = getCompletedSectionsCount2();
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{completedCount} of {totalPages} sections completed</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalPages) * 100}%` }]} />
        </View>
      </View>
    );
  };
  // Calculate score for a specific section based on responses
 const calculateSectionScore = (questionKeys) => {
    if (!questionKeys || questionKeys.length === 0) return 0;
    
    let totalScore = 0;
    let answeredQuestions = 0;
    
    questionKeys.forEach(key => {
      const response = allResponses[key];
      if (response && response.toString().trim() !== '') {
        answeredQuestions++;
        let questionScore = 0;
        
        // Scoring logic based on response type
        if (response === 'Yes' || response === 'Always') {
          questionScore = 100;
        } else if (response === 'Sometimes' || response === 'Partially' || response === 'Somewhat' || response === 'Planning To' || response === 'Some Roles' || response === 'Some Managers' || response === 'Informally' || response === 'Informal Role') {
          questionScore = 66;
        } else if (response === 'Rarely' || response === 'No' || response === 'Never' || response === 'Below') {
          questionScore = 33;
        } else if (response === 'Unsure' || response === "Don't Know" || response === 'Not Sure') {
          questionScore = 25;
        } else if (response === 'In Progress' || response === 'Meets') {
          questionScore = 75;
        } else if (!isNaN(response)) {
          // For percentage inputs
          const percentage = parseInt(response);
          questionScore = Math.min(100, Math.max(0, percentage));
        }
        
        totalScore += questionScore;
      }
    });
    
    return answeredQuestions > 0 ? Math.round(totalScore / answeredQuestions) : 0;
  };

  // Define section mappings
  const sectionMappings = {
    'Hiring Practices': [
      'track_gender_breakdown',
      'job_descriptions_audited', 
      'interview_panels',
      'diversity_formal_goal',
      'entry_roles_offered'
    ],
    'Promotion & Advancement': [
      'promotion_data_analyzed',
      'leadership_development',
      'mentoring_program', 
      'promotion_criteria',
      'women_overlooked'
    ],
    'Pay Equity': [
      'pay_audit_conducted',
      'adjust_salaries',
      'starting_salaries_compared',
      'transparent_pay_bands',
      'manager_training'
    ],
    'Performance Metrics': [
      'women_applied_percentage',
      'women_hired_percentage',
      'women_promotions_percentage',
      'women_salary_raises_percentage',
      'women_leadership_percentage'
    ],
    'Additional Considerations': [
      'parental_leave_policy',
      'flexible_work_policies',
      'employee_survey',
      'bias_incidents_tracked',
      'internal_champion'
    ]
  };

  // Calculate scores for each section
  const sectionScores = Object.keys(sectionMappings).reduce((scores, sectionName) => {
    scores[sectionName] = calculateSectionScore(sectionMappings[sectionName]);
    return scores;
  }, {});

  // Calculate overall score
  const overallScore = Math.round(
    Object.values(sectionScores).reduce((sum, score) => sum + score, 0) / 
    Object.keys(sectionScores).length
  );

  // Get score label and color
  const getScoreLabel = (score) => {
    if (score >= 80) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Poor';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#22c55e'; // Green
    if (score >= 60) return '#f59e0b'; // Yellow/Orange
    return '#ef4444'; // Red
  };

  const SectionCard = ({ title, score, description }) => (
    <View style={[styles.sectionCard, { borderLeftColor: getScoreColor(score) }]}>
      <View style={styles.sectionCardHeader}>
        <Text style={styles.sectionCardTitle}>{title}</Text>
        <View style={styles.sectionScoreContainer}>
          <View style={[styles.scoreBadge, { backgroundColor: getScoreColor(score) + '20' }]}>
            <Text style={[styles.scoreBadgeText, { color: getScoreColor(score) }]}>
              {getScoreLabel(score)}
            </Text>
          </View>
          <Text style={styles.sectionScoreText}>{score}%</Text>
        </View>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View 
            style={[
              styles.progressBarFill, 
              { 
                width: `${score}%`, 
                backgroundColor: getScoreColor(score) 
              }
            ]} 
          />
        </View>
      </View>
      
      <Text style={styles.sectionDescription}>{description}</Text>
      
      <TouchableOpacity style={styles.actionPlanButton}>
        <View style={styles.actionPlanIcon} />
        <Text style={styles.actionPlanText}>View Action Plan</Text>
      </TouchableOpacity>
    </View>
  );

  const ProgressBar = () => {
    const completedCount = getCompletedSectionsCount();
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{completedCount} of {totalPages} sections completed</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalPages) * 100}%` }]} />
        </View>
      </View>
    );
  };

  const getSectionStatus = (pageIndex) => {
    if (completedSections.includes(pageIndex) || (pageIndex < pages.length && pages[pageIndex].requiredQuestions.every(q => allResponses[q] && allResponses[q].toString().trim() !== ''))) {
      return 'completed';
    } else if (pageIndex === currentPage) {
      return 'active';
    } else {
      return 'inactive';
    }
  };

  const SectionNav = () => (
    <View style={styles.sectionNav}>
      <Text style={styles.sectionTitle}>Sections</Text>
      
      {pages.slice(0, -1).map((page, index) => {
        const status = getSectionStatus(index);
        return (
          <TouchableOpacity 
            key={index}
            style={[
              styles.sectionItem, 
              status === 'completed' && styles.sectionCompleted,
              status === 'active' && styles.sectionActive
            ]}
            onPress={() => navigateToPage(index)}
          >
            <Text style={[
              styles.sectionText,
              status === 'completed' && styles.sectionCompletedText,
              status === 'active' && styles.sectionActiveText
            ]}>
              {page.name}
            </Text>
            <Text style={[
              styles.sectionInactiveBadge,
              status === 'completed' && styles.sectionCompletedBadge,
              status === 'active' && styles.sectionBadge
            ]}>
              {status === 'completed' ? '✓' : index + 1}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
if(if2 === 0)
  {
  return (
    <View style={styles.container}>
       <View style={styles.topRightContainer}>
              <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            
              {showLangMenu && (
                <View style={styles.languageMenu}>
                  <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>العربية</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>עברית</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gender Equity Assessment</Text>
        <Text style={styles.headerSubtitle}>Comprehensive analysis of your organization's gender equity practices</Text>
        <ProgressBar />
      </View>

      <View style={styles.content}>
        {/* Sidebar Navigation */}
        <View style={styles.sidebar}>
          <SectionNav />
        </View>

        {/* Main Content */}
        <ScrollView style={styles.mainContent}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>Your Gender Equity Assessment Results</Text>
            <Text style={styles.resultsSubtitle}>
              Comprehensive analysis of your organization's gender equity practices
            </Text>
          </View>

          {/* Overall Score */}
          <View style={styles.overallScoreContainer}>
            <View style={styles.overallScoreCircle}>
              <Text style={styles.overallScoreNumber}>{overallScore}%</Text>
            </View>
            <Text style={styles.overallScoreLabel}>
              Overall Score: {getScoreLabel(overallScore)}
            </Text>
            <Text style={styles.overallScoreDescription}>
              Your organization shows {overallScore >= 80 ? 'strong' : overallScore >= 60 ? 'fair' : 'limited'} practices in gender equity across all assessed areas.
            </Text>
          </View>

          {/* Section Results */}
          <View style={styles.sectionResults}>
            <SectionCard
              title="Hiring Practices"
              score={sectionScores['Hiring Practices']}
              description="Evaluate fairness and transparency in recruitment processes"
            />
            
            <SectionCard
              title="Promotion & Advancement"
              score={sectionScores['Promotion & Advancement']}
              description="Assess equity in career advancement opportunities"
            />
            
            <SectionCard
              title="Pay Equity"
              score={sectionScores['Pay Equity']}
              description="Review compensation practices and gender pay gaps"
            />
            
            <SectionCard
              title="Performance Metrics"
              score={sectionScores['Performance Metrics']}
              description="Quantitative data on women in your organization"
            />
            
            <SectionCard
              title="Additional Considerations"
              score={sectionScores['Additional Considerations']}
              description="Examine workplace culture and support systems"
            />
          </View>

          {/* Key Recommendations */}
          <View style={styles.recommendationsContainer}>
            <Text style={styles.recommendationsTitle}>🔑 Key Recommendations</Text>
            <View style={styles.recommendationItem}>
              <View style={styles.recommendationNumber}>
                <Text style={styles.recommendationNumberText}>1</Text>
              </View>
              <Text style={styles.recommendationText}>
                Implement structured diversity tracking and bias-free hiring practices
              </Text>
            </View>
            <View style={styles.recommendationItem}>
              <View style={styles.recommendationNumber}>
                <Text style={styles.recommendationNumberText}>2</Text>
              </View>
              <Text style={styles.recommendationText}>
                Establish transparent promotion criteria and mentorship programs
              </Text>
            </View>
            <View style={styles.recommendationItem}>
              <View style={styles.recommendationNumber}>
                <Text style={styles.recommendationNumberText}>3</Text>
              </View>
              <Text style={styles.recommendationText}>
                Enhance workplace policies and create formal support systems
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.primaryActionButton}>
              <Text style={styles.primaryActionButtonText}>👥 Connect with Similar Companies</Text>
            </TouchableOpacity>
            
            <View style={styles.secondaryButtonsRow}>
              <TouchableOpacity style={styles.secondaryActionButton}>
                <Text style={styles.secondaryActionButtonText}>📄 Download Report</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.secondaryActionButton}
                onPress={() => navigateToPage(0)}
              >
                <Text style={styles.secondaryActionButtonText}>🔄 Take Assessment Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );}

  if(if2 === 1)
  {
  return (
    <View style={styles.container}>
       <View style={styles.topRightContainer}>
              <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            
              {showLangMenu && (
                <View style={styles.languageMenu}>
                  <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>العربية</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>עברית</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
      {/* Header */}
      <View style={styles.header}>
  <Text style={styles.headerTitle}>تقييم المساواة بين الجنسين</Text>
  <Text style={styles.headerSubtitle}>تحليل شامل لممارسات المساواة بين الجنسين في مؤسستك</Text>
  <ProgressBar1 />
</View>

<View style={styles.content}>
  <View style={styles.sidebar}>
    <SectionNav />
  </View>

  <ScrollView style={styles.mainContent}>
    <View style={styles.resultsHeader}>
      <Text style={styles.resultsTitle}>نتائج تقييم المساواة بين الجنسين</Text>
      <Text style={styles.resultsSubtitle}>
        تحليل شامل لممارسات المساواة بين الجنسين في مؤسستك
      </Text>
    </View>

    <View style={styles.overallScoreContainer}>
      <View style={styles.overallScoreCircle}>
        <Text style={styles.overallScoreNumber}>{overallScore}%</Text>
      </View>
      <Text style={styles.overallScoreLabel}>
        النتيجة العامة: {getScoreLabel(overallScore)}
      </Text>
      <Text style={styles.overallScoreDescription}>
        تُظهر مؤسستك ممارسات {overallScore >= 80 ? 'قوية' : overallScore >= 60 ? 'متوسطة' : 'محدودة'} في مجال المساواة بين الجنسين عبر جميع المجالات المُقيَّمة.
      </Text>
    </View>

    <View style={styles.sectionResults}>
      <SectionCard title="ممارسات التوظيف" score={sectionScores['Hiring Practices']} description="تقييم العدالة والشفافية في عمليات التوظيف" />
      <SectionCard title="الترقيات والتقدم" score={sectionScores['Promotion & Advancement']} description="تقييم الإنصاف في فرص الترقية" />
      <SectionCard title="العدالة في الأجور" score={sectionScores['Pay Equity']} description="مراجعة ممارسات التعويضات والفجوات بين الجنسين" />
      <SectionCard title="مقاييس الأداء" score={sectionScores['Performance Metrics']} description="بيانات كمية عن النساء في المؤسسة" />
      <SectionCard title="اعتبارات إضافية" score={sectionScores['Additional Considerations']} description="فحص ثقافة العمل وأنظمة الدعم" />
    </View>

    <View style={styles.recommendationsContainer}>
      <Text style={styles.recommendationsTitle}>🔑 توصيات رئيسية</Text>
      <View style={styles.recommendationItem}>
        <View style={styles.recommendationNumber}>
          <Text style={styles.recommendationNumberText}>1</Text>
        </View>
        <Text style={styles.recommendationText}>
          تنفيذ تتبع منظم للتنوع وممارسات توظيف خالية من التحيز
        </Text>
      </View>
      <View style={styles.recommendationItem}>
        <View style={styles.recommendationNumber}>
          <Text style={styles.recommendationNumberText}>2</Text>
        </View>
        <Text style={styles.recommendationText}>
          وضع معايير شفافة للترقية وبرامج إرشاد
        </Text>
      </View>
      <View style={styles.recommendationItem}>
        <View style={styles.recommendationNumber}>
          <Text style={styles.recommendationNumberText}>3</Text>
        </View>
        <Text style={styles.recommendationText}>
          تعزيز السياسات الداخلية وإنشاء أنظمة دعم رسمية
        </Text>
      </View>
    </View>

    <View style={styles.actionButtonsContainer}>
      <TouchableOpacity style={styles.primaryActionButton}>
        <Text style={styles.primaryActionButtonText}>👥 التواصل مع شركات مشابهة</Text>
      </TouchableOpacity>
      <View style={styles.secondaryButtonsRow}>
        <TouchableOpacity style={styles.secondaryActionButton}>
          <Text style={styles.secondaryActionButtonText}>📄 تحميل التقرير</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryActionButton} onPress={() => navigateToPage(0)}>
          <Text style={styles.secondaryActionButtonText}>🔄 إعادة التقييم</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
</View>

    </View>
  );}

  if(if2 === 2)
  {
  return (
    <View style={styles.container}>
       <View style={styles.topRightContainer}>
              <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            
              {showLangMenu && (
                <View style={styles.languageMenu}>
                  <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>العربية</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
                    <Text style={styles.menuItem}>עברית</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
      {/* Header */}
      <View style={styles.header}>
  <Text style={styles.headerTitle}>הערכת שוויון מגדרי</Text>
  <Text style={styles.headerSubtitle}>ניתוח מקיף של נהלי השוויון המגדרי בארגון שלך</Text>
  <ProgressBar2 />
</View>

<View style={styles.content}>
  <View style={styles.sidebar}>
    <SectionNav />
  </View>

  <ScrollView style={styles.mainContent}>
    <View style={styles.resultsHeader}>
      <Text style={styles.resultsTitle}>תוצאות הערכת השוויון המגדרי שלך</Text>
      <Text style={styles.resultsSubtitle}>
        ניתוח מקיף של נהלי השוויון המגדרי בארגון שלך
      </Text>
    </View>

    <View style={styles.overallScoreContainer}>
      <View style={styles.overallScoreCircle}>
        <Text style={styles.overallScoreNumber}>{overallScore}%</Text>
      </View>
      <Text style={styles.overallScoreLabel}>
        ציון כולל: {getScoreLabel(overallScore)}
      </Text>
      <Text style={styles.overallScoreDescription}>
        הארגון שלך מציג נהלים {overallScore >= 80 ? 'חזקים' : overallScore >= 60 ? 'בינוניים' : 'מוגבלים'} לשוויון מגדרי בכל התחומים שנבדקו.
      </Text>
    </View>

    <View style={styles.sectionResults}>
      <SectionCard title="נהלי גיוס" score={sectionScores['Hiring Practices']} description="הערכת הוגנות ושקיפות בתהליכי הגיוס" />
      <SectionCard title="קידום והתפתחות" score={sectionScores['Promotion & Advancement']} description="הערכת שוויון בהזדמנויות הקידום" />
      <SectionCard title="שוויון בשכר" score={sectionScores['Pay Equity']} description="בדיקת פערי שכר ונהלי תגמול" />
      <SectionCard title="מדדי ביצוע" score={sectionScores['Performance Metrics']} description="נתונים כמותיים על נשים בארגון" />
      <SectionCard title="שיקולים נוספים" score={sectionScores['Additional Considerations']} description="בדיקת תרבות ארגונית ומערכות תמיכה" />
    </View>

    <View style={styles.recommendationsContainer}>
      <Text style={styles.recommendationsTitle}>🔑 המלצות מרכזיות</Text>
      <View style={styles.recommendationItem}>
        <View style={styles.recommendationNumber}>
          <Text style={styles.recommendationNumberText}>1</Text>
        </View>
        <Text style={styles.recommendationText}>
          יישום מעקב אחר גיוון וגיוס ללא הטיה
        </Text>
      </View>
      <View style={styles.recommendationItem}>
        <View style={styles.recommendationNumber}>
          <Text style={styles.recommendationNumberText}>2</Text>
        </View>
        <Text style={styles.recommendationText}>
          קביעת קריטריונים ברורים לקידום ותוכניות חונכות
        </Text>
      </View>
      <View style={styles.recommendationItem}>
        <View style={styles.recommendationNumber}>
          <Text style={styles.recommendationNumberText}>3</Text>
        </View>
        <Text style={styles.recommendationText}>
          שיפור מדיניות הארגון והקמת מערכות תמיכה רשמיות
        </Text>
      </View>
    </View>

    <View style={styles.actionButtonsContainer}>
      <TouchableOpacity style={styles.primaryActionButton}>
        <Text style={styles.primaryActionButtonText}>👥 התחברו עם חברות דומות</Text>
      </TouchableOpacity>
      <View style={styles.secondaryButtonsRow}>
        <TouchableOpacity style={styles.secondaryActionButton}>
          <Text style={styles.secondaryActionButtonText}>📄 הורדת הדו״ח</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryActionButton} onPress={() => navigateToPage(0)}>
          <Text style={styles.secondaryActionButtonText}>🔄 בצע הערכה מחדש</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
</View>

    </View>
  );}

}
  



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  progressContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#eeeeee',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6c5ce7',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  contentHeader: {
    marginBottom: 20,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  contentSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  questionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 16,
    lineHeight: 22,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#cccccc',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#6c5ce7',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6c5ce7',
  },
  radioLabel: {
    fontSize: 16,
    color: '#444444',
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#ffffff',
    marginTop: 8,
  },
  validationMessage: {
    backgroundColor: '#fff3e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  validationText: {
    color: '#e65100',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingHorizontal: 8,
  },
  prevButton: {
    backgroundColor: '#b0bec5',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  prevButtonDisabled: {
    backgroundColor: '#eceff1',
  },
  prevButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  prevButtonTextDisabled: {
    color: '#b0bec5',
  },
  nextButton: {
    backgroundColor: '#6c5ce7',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
  },
  nextButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  nextButtonTextDisabled: {
    color: '#9e9e9e',
  },
  completeButton: {
    backgroundColor: '#00b894',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
  },
  completeButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  completeButtonTextDisabled: {
    color: '#9e9e9e',
  },
  sectionNav: {
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  sectionActive: {
    backgroundColor: '#6c5ce7',
  },
  sectionCompleted: {
    backgroundColor: '#00b894',
  },
  sectionText: {
    fontSize: 12,
    color: '#666666',
    flex: 1,
    marginBottom:0,
  },
  sectionActiveText: {
    color: '#ffffff',
  },
  sectionCompletedText: {
    color: '#ffffff',
  },
  sectionBadge: {
    backgroundColor: '#ffffff',
    color: '#6c5ce7',
    fontSize: 14,
    fontWeight: 'bold',
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
  },
  sectionCompletedBadge: {
    color: '#00b894',
  },
  sectionInactiveBadge: {
    backgroundColor: '#e0e0e0',
    color: '#666666',
  },resultsHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  resultsSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    maxWidth: 400,
  },
  overallScoreContainer: {
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    marginBottom: 30,
  },
  overallScoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  overallScoreNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  overallScoreLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  overallScoreDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 20,
  },
  sectionResults: {
    marginBottom: 30,
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderLeftWidth: 4,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sectionCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  sectionScoreContainer: {
    alignItems: 'flex-end',
  },
  scoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  scoreBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  sectionScoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  progressBarContainer: {
    marginBottom: 16,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  actionPlanButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionPlanIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#3b82f6',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionPlanText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  recommendationsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 20,
    marginBottom: 30,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recommendationNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  recommendationNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3b82f6',
  },
  recommendationText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    flex: 1,
  },
  actionButtonsContainer: {
    marginBottom: 30,
  },
  primaryActionButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
  },
  primaryActionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryActionButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  secondaryActionButtonText: {
    color: '#4b5563',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },topRightContainer: {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 999,
  alignItems: 'flex-end',
},

menuIcon: {
  fontSize: 24,
  padding: 5,
},

languageMenu: {
  backgroundColor: '#fff',
  borderRadius: 6,
  padding: 8,
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
},

menuItem: {
  paddingVertical: 6,
  paddingHorizontal: 10,
  fontSize: 16,
},textAlign: 'right',
writingDirection: 'rtl',
});