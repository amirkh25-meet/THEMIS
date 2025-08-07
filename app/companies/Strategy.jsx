import { StyleSheet, Text, View, ScrollView,TextInput, Button ,TouchableOpacity} from 'react-native'
import React, { use } from 'react'
import { useState } from 'react' 


export default function Strategy() {
  const [a,setA] = useState(0)
  const [b,setB] = useState(0)
  const [c,setC] = useState(0)
  const [d,setD] = useState(0)
  const [e,setE] = useState(0)
  const [if1,setIf1] = useState(0)
  const [if2,setIf2] = useState(0)
  const [showLangMenu, setShowLangMenu] = useState(false);


  if(if1===0&&if2===0)
    {
return (
    <View style={styles.container}>



      <TextInput
      value={a}
      onChangeText={text => setA(text)}
      placeholder="enter your HiringPractices rate"
      style={styles.input}/>

      <TextInput
      value={b}
      onChangeText={text => setB(text)}
      placeholder="enter your PromotionAdvancement rate"
      style={styles.input}/>

      <TextInput
      value={c}
      onChangeText={text => setC(text)}
      placeholder="enter your PayEquity rate"
      style={styles.input}/>

      <TextInput
      value={d}
      onChangeText={text => setD(text)}
      placeholder="enter your PerformanceMetrics rate"
      style={styles.input}/>

      <TextInput
      value={e}
      onChangeText={text => setE(text)}
      placeholder="enter your AdditionalConsiderations rate"
      style={styles.input}/>

      <Button title="Submit"
      onPress={() => {setIf1(1)}}
      style={styles.button}/>
      </View>
)
  }
  
  if(if1===1&&if2===0)
  {return (
    <ScrollView style={styles.container}>

      
    



      <Text style={styles.title}>Gender Equity Strategy</Text>
    {a < 80 ? (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>1. Hiring Practices</Text>
    <Text style={styles.goal}>Goal:</Text>
    <Text style={styles.text}>
      Ensure fair, inclusive, and transparent recruitment processes.
    </Text>
    <Text style={styles.subTitle}>Steps to Improve:</Text>
    <Text style={styles.bullet}>• Audit job descriptions for biased language and unnecessary requirements.</Text>
    <Text style={styles.bullet}>• Commit to diverse interview panels.</Text>
    <Text style={styles.bullet}>• Standardize interview questions.</Text>
    <Text style={styles.bullet}>• Track applicant demographics.</Text>
    <Text style={styles.bullet}>• Post openings on inclusive platforms.</Text>
  </View>
) : null}
      {b < 80 ? (

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Promotion & Advancement</Text>
        <Text style={styles.goal}>Goal:</Text>
        <Text style={styles.text}>Provide equal opportunities for career growth and leadership development.</Text>
        <Text style={styles.subTitle}>Steps to Improve:</Text>
        <Text style={styles.bullet}>• Implement transparent promotion criteria and communicate them clearly to all employees.</Text>
        <Text style={styles.bullet}>• Track promotion rates by gender to spot gaps and address them.</Text>
        <Text style={styles.bullet}>• Create mentorship or sponsorship programs that support women’s advancement.</Text>
        <Text style={styles.bullet}>• Encourage internal mobility by openly advertising roles to current employees.</Text>
        <Text style={styles.bullet}>• Offer leadership training programs targeted at high-potential women.</Text>
      </View>) : null}

      {c < 80 ? (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Pay Equity</Text>
        <Text style={styles.goal}>Goal:</Text>
        <Text style={styles.text}>Eliminate unjustified pay gaps and build a fair compensation system.</Text>
        <Text style={styles.subTitle}>Steps to Improve:</Text>
        <Text style={styles.bullet}>• Conduct a pay audit comparing salaries by role, gender, and tenure.</Text>
        <Text style={styles.bullet}>• Correct unjustified disparities immediately and transparently.</Text>
        <Text style={styles.bullet}>• Establish clear pay bands and make them accessible to employees.</Text>
        <Text style={styles.bullet}>• Ban asking for salary history in the hiring process.</Text>
        <Text style={styles.bullet}>• Commit to regular reviews of pay practices and adjustments.</Text>
      </View>) : null}


      {d < 80 ? (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Performance Metrics</Text>
        <Text style={styles.goal}>Goal:</Text>
        <Text style={styles.text}>Use data to understand and improve gender equity outcomes.</Text>
        <Text style={styles.subTitle}>Steps to Improve:</Text>
        <Text style={styles.bullet}>• Track key metrics like % of women in leadership, turnover by gender, and engagement survey results.</Text>
        <Text style={styles.bullet}>• Set internal goals (e.g., “30% women in leadership by 2026”) and track progress.</Text>
        <Text style={styles.bullet}>• Break down data by department to identify weak spots.</Text>
        <Text style={styles.bullet}>• Share selected results transparently with staff to build trust and accountability.</Text>
        <Text style={styles.bullet}>• Use metrics to guide decisions — don’t just collect them.</Text>
      </View>) : null}


      {e < 80 ? (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Culture & Support Systems</Text>
        <Text style={styles.goal}>Goal:</Text>
        <Text style={styles.text}>Create a workplace culture that supports and retains women.</Text>
        <Text style={styles.subTitle}>Steps to Improve:</Text>
        <Text style={styles.bullet}>• Establish and enforce zero-tolerance policies on harassment and discrimination.</Text>
        <Text style={styles.bullet}>• Provide flexible work options like hybrid schedules and parental leave.</Text>
        <Text style={styles.bullet}>• Create employee resource groups (ERGs) or women’s networks.</Text>
        <Text style={styles.bullet}>• Offer unconscious bias training for managers and hiring teams.</Text>
        <Text style={styles.bullet}>• Regularly survey employees about inclusion and respond to feedback.</Text>
      </View>) : null}
    </ScrollView>
  )
}
if(if1===0&&if2===1)
    {
return (
    <View style={styles.container}>
      

     <TextInput
  value={a}
  onChangeText={text => setA(text)}
  placeholder="أدخل تقييم ممارسات التوظيف"
  style={styles.input}
/>

<TextInput
  value={b}
  onChangeText={text => setB(text)}
  placeholder="أدخل تقييم الترقية والتقدم"
  style={styles.input}
/>

<TextInput
  value={c}
  onChangeText={text => setC(text)}
  placeholder="أدخل تقييم المساواة في الأجور"
  style={styles.input}
/>

<TextInput
  value={d}
  onChangeText={text => setD(text)}
  placeholder="أدخل تقييم مقاييس الأداء"
  style={styles.input}
/>

<TextInput
  value={e}
  onChangeText={text => setE(text)}
  placeholder="أدخل تقييم اعتبارات إضافية"
  style={styles.input}
/>


      <Button title="إرسال"
      onPress={() => {setIf1(1)}}
      style={styles.button}/>
      </View>
)
  }
  
  if(if1===1&&if2===1)
  {return (
    <ScrollView style={styles.container}>



      <Text style={styles.title}>استراتيجية المساواة بين الجنسين</Text>

{a < 80 ? (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>١. ممارسات التوظيف</Text>
    <Text style={styles.goal}>الهدف:</Text>
    <Text style={styles.text}>
      ضمان عمليات توظيف عادلة وشاملة وشفافة.
    </Text>
    <Text style={styles.subTitle}>خطوات للتحسين:</Text>
    <Text style={styles.bullet}>• مراجعة إعلانات الوظائف لاكتشاف اللغة المتحيزة والمتطلبات غير الضرورية.</Text>
    <Text style={styles.bullet}>• الالتزام بتشكيل لجان مقابلات متنوعة.</Text>
    <Text style={styles.bullet}>• توحيد أسئلة المقابلات.</Text>
    <Text style={styles.bullet}>• تتبع الخصائص الديمغرافية للمتقدمين.</Text>
    <Text style={styles.bullet}>• نشر الوظائف على منصات شاملة.</Text>
  </View>
) : null}

{b < 80 ? (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>٢. الترقية والتقدم الوظيفي</Text>
    <Text style={styles.goal}>الهدف:</Text>
    <Text style={styles.text}>توفير فرص متساوية للنمو المهني وتطوير القيادة.</Text>
    <Text style={styles.subTitle}>خطوات للتحسين:</Text>
    <Text style={styles.bullet}>• تنفيذ معايير ترقية شفافة والتواصل بها بوضوح مع جميع الموظفين.</Text>
    <Text style={styles.bullet}>• تتبع معدلات الترقية حسب الجنس لاكتشاف الفجوات ومعالجتها.</Text>
    <Text style={styles.bullet}>• إنشاء برامج إرشاد أو رعاية تدعم تقدم النساء.</Text>
    <Text style={styles.bullet}>• تشجيع التنقل الداخلي من خلال الإعلان عن الوظائف داخلياً.</Text>
    <Text style={styles.bullet}>• تقديم برامج تدريب قيادي تستهدف النساء ذوات الإمكانات العالية.</Text>
  </View>
) : null}

{c < 80 ? (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>٣. المساواة في الأجور</Text>
    <Text style={styles.goal}>الهدف:</Text>
    <Text style={styles.text}>القضاء على الفجوات غير المبررة في الأجور وبناء نظام تعويض عادل.</Text>
    <Text style={styles.subTitle}>خطوات للتحسين:</Text>
    <Text style={styles.bullet}>• إجراء مراجعة للأجور بمقارنة الرواتب حسب الدور والجنس وسنوات الخبرة.</Text>
    <Text style={styles.bullet}>• تصحيح الفروقات غير المبررة فورًا وبشفافية.</Text>
    <Text style={styles.bullet}>• تحديد نطاقات واضحة للرواتب وجعلها متاحة للموظفين.</Text>
    <Text style={styles.bullet}>• حظر السؤال عن الراتب السابق أثناء التوظيف.</Text>
    <Text style={styles.bullet}>• الالتزام بمراجعة دورية لممارسات الأجور وتعديلها.</Text>
  </View>
) : null}

{d < 80 ? (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>٤. مقاييس الأداء</Text>
    <Text style={styles.goal}>الهدف:</Text>
    <Text style={styles.text}>استخدام البيانات لفهم وتحسين نتائج المساواة بين الجنسين.</Text>
    <Text style={styles.subTitle}>خطوات للتحسين:</Text>
    <Text style={styles.bullet}>• تتبع مؤشرات مثل نسبة النساء في المناصب القيادية، ومعدلات ترك العمل حسب الجنس، ونتائج استبيانات المشاركة.</Text>
    <Text style={styles.bullet}>• وضع أهداف داخلية (مثل "30٪ من النساء في القيادة بحلول عام 2026") وتتبع التقدم.</Text>
    <Text style={styles.bullet}>• تحليل البيانات حسب القسم لتحديد النقاط الضعيفة.</Text>
    <Text style={styles.bullet}>• مشاركة النتائج المحددة بشفافية مع الموظفين لبناء الثقة والمساءلة.</Text>
    <Text style={styles.bullet}>• استخدام البيانات لاتخاذ القرارات — وليس فقط جمعها.</Text>
  </View>
) : null}

{e < 80 ? (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>٥. الثقافة وأنظمة الدعم</Text>
    <Text style={styles.goal}>الهدف:</Text>
    <Text style={styles.text}>خلق ثقافة مكان عمل تدعم النساء وتحتفظ بهن.</Text>
    <Text style={styles.subTitle}>خطوات للتحسين:</Text>
    <Text style={styles.bullet}>• وضع سياسات صارمة لمناهضة التحرش والتمييز وتطبيقها بجدية.</Text>
    <Text style={styles.bullet}>• توفير خيارات عمل مرنة مثل الجداول الهجينة وإجازة الوالدين.</Text>
    <Text style={styles.bullet}>• إنشاء مجموعات دعم أو شبكات للنساء داخل المؤسسة.</Text>
    <Text style={styles.bullet}>• تقديم تدريبات على التحيز اللاواعي للمديرين وفرق التوظيف.</Text>
    <Text style={styles.bullet}>• إجراء استطلاعات منتظمة حول الشمولية والاستجابة للتغذية الراجعة.</Text>
  </View>
) : null}

    </ScrollView>
  )
}

if(if1===0&&if2===2)
    {
return (
    <View style={styles.container}>
      
      
     

<TextInput
  value={a}
  onChangeText={text => setA(text)}
  placeholder="הזן את הציון של פרקטיקות הגיוס"
  style={styles.input}
/>

<TextInput
  value={b}
  onChangeText={text => setB(text)}
  placeholder="הזן את הציון של קידום והתפתחות"
  style={styles.input}
/>

<TextInput
  value={c}
  onChangeText={text => setC(text)}
  placeholder="הזן את הציון של שוויון שכר"
  style={styles.input}
/>

<TextInput
  value={d}
  onChangeText={text => setD(text)}
  placeholder="הזן את הציון של מדדי ביצועים"
  style={styles.input}
/>

<TextInput
  value={e}
  onChangeText={text => setE(text)}
  placeholder="הזן את הציון של שיקולים נוספים"
  style={styles.input}
/>

<Button title="שלח" onPress={() => { setIf1(1) }} style={styles.button} />

      </View>
)
  }
  
  if(if1===1&&if2===2)
  {return (
    <ScrollView style={styles.container}>







      <Text style={styles.title}>אסטרטגיית שוויון מגדרי</Text>

{a < 80 ? (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>1. פרקטיקות גיוס</Text>
    <Text style={styles.goal}>מטרה:</Text>
    <Text style={styles.text}>להבטיח תהליכי גיוס הוגנים, כוללים ושקופים.</Text>
    <Text style={styles.subTitle}>שלבים לשיפור:</Text>
    <Text style={styles.bullet}>• לבדוק תיאורי משרות לשפה מוטה ודרישות מיותרות.</Text>
    <Text style={styles.bullet}>• להרכיב פאנלים מגוונים לראיונות.</Text>
    <Text style={styles.bullet}>• לאחד את שאלות הראיונות.</Text>
    <Text style={styles.bullet}>• לעקוב אחרי נתוני מועמדים לפי מגדר.</Text>
    <Text style={styles.bullet}>• לפרסם משרות בפלטפורמות מכלילות.</Text>
  </View>
) : null}

{b < 80 ? (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>2. קידום והתפתחות</Text>
    <Text style={styles.goal}>מטרה:</Text>
    <Text style={styles.text}>להבטיח הזדמנויות שוות לצמיחה והתפתחות מנהיגותית.</Text>
    <Text style={styles.subTitle}>שלבים לשיפור:</Text>
    <Text style={styles.bullet}>• להחיל קריטריונים שקופים לקידום ולהסביר אותם לעובדים.</Text>
    <Text style={styles.bullet}>• לעקוב אחרי שיעורי קידום לפי מגדר ולצמצם פערים.</Text>
    <Text style={styles.bullet}>• להקים תוכניות חונכות או תמיכה לנשים.</Text>
    <Text style={styles.bullet}>• לעודד מעבר פנימי על ידי פרסום תפקידים פנימיים.</Text>
    <Text style={styles.bullet}>• להציע הכשרות מנהיגותיות לנשים מוכשרות.</Text>
  </View>
) : null}

{c < 80 ? (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>3. שוויון שכר</Text>
    <Text style={styles.goal}>מטרה:</Text>
    <Text style={styles.text}>לצמצם פערים לא מוצדקים בשכר ולבנות מערכת תגמול הוגנת.</Text>
    <Text style={styles.subTitle}>שלבים לשיפור:</Text>
    <Text style={styles.bullet}>• לערוך בדיקת שכר לפי תפקיד, מגדר, ותק.</Text>
    <Text style={styles.bullet}>• לתקן פערים לא מוצדקים מיד ובשקיפות.</Text>
    <Text style={styles.bullet}>• להקים טווחי שכר ברורים ולהנגיש אותם לעובדים.</Text>
    <Text style={styles.bullet}>• לא לשאול על שכר קודם בתהליך גיוס.</Text>
    <Text style={styles.bullet}>• לבצע סקירות שכר קבועות ולעדכן לפי הצורך.</Text>
  </View>
) : null}

{d < 80 ? (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>4. מדדי ביצועים</Text>
    <Text style={styles.goal}>מטרה:</Text>
    <Text style={styles.text}>להשתמש בנתונים להבנה ושיפור תוצאות שוויון מגדרי.</Text>
    <Text style={styles.subTitle}>שלבים לשיפור:</Text>
    <Text style={styles.bullet}>• לעקוב אחרי מדדים מרכזיים כמו אחוז נשים בהנהלה, עזיבה לפי מגדר ותוצאות סקרים.</Text>
    <Text style={styles.bullet}>• להגדיר מטרות פנימיות (למשל "30% נשים בהנהלה עד 2026") ולעקוב אחר ההתקדמות.</Text>
    <Text style={styles.bullet}>• לנתח לפי מחלקה כדי לזהות נקודות חלשות.</Text>
    <Text style={styles.bullet}>• לשתף תוצאות נבחרות עם עובדים בשקיפות כדי לבנות אמון.</Text>
    <Text style={styles.bullet}>• להשתמש בנתונים כדי להנחות החלטות — לא רק לאסוף אותם.</Text>
  </View>
) : null}

{e < 80 ? (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>5. תרבות ותמיכה</Text>
    <Text style={styles.goal}>מטרה:</Text>
    <Text style={styles.text}>ליצור תרבות ארגונית שתומכת בנשים ושומרת עליהן.</Text>
    <Text style={styles.subTitle}>שלבים לשיפור:</Text>
    <Text style={styles.bullet}>• להנהיג מדיניות אפס סובלנות להטרדות ואפליה.</Text>
    <Text style={styles.bullet}>• להציע גמישות בעבודה כמו שעות היברידיות וחופשת הורים.</Text>
    <Text style={styles.bullet}>• להקים קבוצות תמיכה או רשתות נשים.</Text>
    <Text style={styles.bullet}>• להציע הכשרה על הטיות לא מודעות למנהלים ומגייסים.</Text>
    <Text style={styles.bullet}>• לערוך סקרים קבועים על תחושת שייכות ולהגיב למשוב.</Text>
  </View>
) : null}

    </ScrollView>
  )
}

}



  
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEBFF',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#021F54',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E3A59',
    marginBottom: 10,
  },
  goal: {
    fontWeight: '600',
    color: '#374259',
    marginBottom: 4,
  },
  subTitle: {
    marginTop: 8,
    fontWeight: '600',
    color: '#374259',
    marginBottom: 6,
  },
  text: {
    textAlign: 'right',
writingDirection: 'rtl',
    marginBottom: 8,
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
  },
  bullet: {
    marginLeft: 10,
    marginBottom: 6,
    color: '#333',
    fontSize: 14,
  },
  input: {
    textAlign: 'right',
writingDirection: 'rtl',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#021F54',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
},

});
