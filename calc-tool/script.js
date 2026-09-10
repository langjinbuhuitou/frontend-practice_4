// 交互式prompt录入流程
const inputCourses = [];
// 先询问要录入几门课程
const courseCountStr = prompt('请输入你要计算绩点的课程总门数：');
// 把输入转成数字，非法输入默认设为0
const courseCount = parseInt(courseCountStr) || 0;

// 循环逐门录入课程信息
for (let i = 0; i < courseCount; i++) {
  const name = prompt(`请输入第${i+1}门课程的名称：`);
  const scoreStr = prompt(`请输入【${name}】的百分制成绩：`);
  const creditStr = prompt(`请输入【${name}】的课程学分：`);

  // 自动转类型，非法输入直接生成非法数据交给清洗函数处理
  inputCourses.push({
    name: name || `未命名课程${i+1}`,
    score: Number(scoreStr) || 0,
    credit: Number(creditStr) || 0
  });
}

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

/*报告生成函数*/
const generateReport = (originList) => {
  const validCourses = cleanCourses(originList);
  if (validCourses.length === 0) {
    return '没有合法的有效课程数据，无法计算绩点';
  }
  const totalGpa = calcTotalGpa(validCourses);
  const totalCredit = validCourses.reduce((sum, c) => sum + c.credit, 0);

  return `===== 绩点计算报告 =====
原始课程共 ${originList.length} 门
清洗后有效课程共 ${validCourses.length} 门
总修读学分：${totalCredit} 学分
你的加权平均绩点为：${totalGpa}
========================`;
};

// 运行程序，捕获异常保证程序不会崩溃
try {
  console.log('你录入的所有课程原始数据：');
  console.table(inputCourses);
  console.log(generateReport(inputCourses));
} catch (err) {
  console.error('绩点计算出错：', err.message);
}