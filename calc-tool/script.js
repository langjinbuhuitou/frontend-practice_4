const courses = [
  { name: '高等数学', score: 85, credit: 4 },
  { name: '大学英语', score: 76, credit: 3 },
  { name: '程序设计基础', score: 92, credit: 4 },
  { name: '体育', score: 68, credit: 1 },
  { name: '非法成绩测试1', score: -5, credit: 2 },
  { name: '非法成绩测试2', score: 108, credit: 3 },
  { name: '非法学分测试', score: 80, credit: -2 }
];

/*数据清洗函数*/
const cleanCourses = (list) => {
  return list.filter(course => {
    return course.score >= 0 && course.score <= 100 && course.credit > 0;
  });
};

/*成绩转换函数*/
const scoreToGpa = (score) => {
  if (score >= 90) return 4.0;
  if (score >= 80) return 3.0;
  if (score >= 70) return 2.0;
  if (score >= 60) return 1.0;
  return 0;
};

/*加权平均绩点计算函数*/
const calcTotalGpa = (validList) => {
  if (validList.length === 0) return 0;
  // 分子：每门课绩点 * 学分 的总和
  const totalWeight = validList.reduce((sum, course) => {
    return sum + scoreToGpa(course.score) * course.credit;
  }, 0);
  // 分母：总学分
  const totalCredit = validList.reduce((sum, course) => {
    return sum + course.credit;
  }, 0);
  return (totalWeight / totalCredit).toFixed(2);
};
