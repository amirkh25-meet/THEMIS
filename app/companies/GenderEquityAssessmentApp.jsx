import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'


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
              onPress={handleComplete}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 8,
  },
  progressContainer: {
    marginTop: 20,
  },
  progressText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 4,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 280,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#e9ecef',
    paddingVertical: 20,
  },
  sectionNav: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  sectionActive: {
    backgroundColor: '#8b5cf6',
  },
  sectionCompleted: {
    backgroundColor: '#10b981',
  },
  sectionText: {
    fontSize: 14,
    color: '#6c757d',
    flex: 1,
  },
  sectionActiveText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
    flex: 1,
  },
  sectionCompletedText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
    flex: 1,
  },
  sectionBadge: {
    backgroundColor: '#fff',
    color: '#8b5cf6',
    fontSize: 12,
    fontWeight: 'bold',
    width: 20,
    height: 20,
    borderRadius: 10,
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionCompletedBadge: {
    backgroundColor: '#fff',
    color: '#10b981',
    fontSize: 12,
    fontWeight: 'bold',
    width: 20,
    height: 20,
    borderRadius: 10,
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionInactiveBadge: {
    backgroundColor: '#e9ecef',
    color: '#6c757d',
    fontSize: 12,
    fontWeight: 'bold',
    width: 20,
    height: 20,
    borderRadius: 10,
    textAlign: 'center',
    lineHeight: 20,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  contentHeader: {
    marginBottom: 24,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  contentSubtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
    marginBottom: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#dee2e6',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#8b5cf6',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8b5cf6',
  },
  radioLabel: {
    fontSize: 14,
    color: '#495057',
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  validationMessage: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeaa7',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  validationText: {
    color: '#856404',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  prevButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
  },
  prevButtonDisabled: {
    backgroundColor: '#e9ecef',
  },
  prevButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  prevButtonTextDisabled: {
    color: '#adb5bd',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
  },
  nextButtonDisabled: {
    backgroundColor: '#e9ecef',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButtonTextDisabled: {
    color: '#adb5bd',
    fontSize: 16,
    fontWeight: '500',
  },
  completeButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
  },
  completeButtonDisabled: {
    backgroundColor: '#e9ecef',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  completeButtonTextDisabled: {
    color: '#adb5bd',
    fontSize: 16,
    fontWeight: '500',
  },
});