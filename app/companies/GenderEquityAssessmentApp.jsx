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
        pages={pages}
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
  getCompletedSectionsCount,
  pages
}) {
  const [responses, setResponses] = useState(allResponses);

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

  return (
    <View style={styles.container}>
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
  getCompletedSectionsCount,
  pages
}) {
  const [responses, setResponses] = useState(allResponses);

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

  return (
    <View style={styles.container}>
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
  getCompletedSectionsCount,
  pages
}) {
  const [responses, setResponses] = useState(allResponses);

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

  return (
    <View style={styles.container}>
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
  getCompletedSectionsCount,
  pages
}) {
  const [responses, setResponses] = useState(allResponses);

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

  return (
    <View style={styles.container}>
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
  getCompletedSectionsCount,
  pages
}) {
  const [responses, setResponses] = useState(allResponses);

 

  

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

  return (
    <View style={styles.container}>
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
  getCompletedSectionsCount,
  pages
}){

// 
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

  return (
    <View style={styles.container}>
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
  },
});