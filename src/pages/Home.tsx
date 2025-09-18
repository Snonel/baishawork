import React, { useState, useEffect, useRef } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { cn } from '@/lib/utils';

// 模拟财务数据
const financialData = {
  overallPerformance: [
    { name: 'Q1', revenue: 1200, profit: 300, expenses: 900 },
    { name: 'Q2', revenue: 1500, profit: 450, expenses: 1050 },
  ],
  businessSegments: [
    { name: '软件服务', value: 45 },
    { name: '云计算', value: 30 },
    { name: '数据服务', value: 15 },
    { name: '其他', value: 10 },
  ],
  operationalEfficiency: [
    { name: 'Q1', employee: 120, revenuePerEmp: 10, costRatio: 0.75 },
    { name: 'Q2', employee: 130, revenuePerEmp: 11.5, costRatio: 0.70 },
  ],
  financialHealth: [
    { name: '现金', value: 500 },
    { name: '应收账款', value: 300 },
    { name: '存货', value: 150 },
    { name: '固定资产', value: 450 },
  ],
     issues: [
      "核心业务增长放缓，市场份额下滑2.3%，增长率从18%降至8%",
      "运营成本控制不力，管理费用上升15%，高于营收增长率8%",
      "研发投入产出比1:2.1，低于行业平均1:3.5，创新效率低"
    ],
    suggestions: {
      increases: [
        "加大云计算投入，提升市场份额至35%",
        "研发人员占比从25%提升至35%"
      ],
      decreases: [
        "非核心业务成本降低15%",
        "管理层级减少2个，提高决策效率30%"
      ]
  }
};

// 颜色配置
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// 分析维度数据
const reportSections = [
  { id: 'overview', title: '总体评价' },
  { id: 'performance', title: '整体经营业绩' },
  { id: 'business', title: '核心业务分析' },
  { id: 'efficiency', title: '运营效率与成本控制' },
  { id: 'financial', title: '财务状况' },
  { id: 'summary', title: '总结' },
];

export default function BusinessReport() {
  const [activeSection, setActiveSection] = useState('overview');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // 处理滚动导航
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of reportSections) {
        const ref = sectionRefs.current[section.id];
        if (ref) {
          const offsetTop = ref.offsetTop;
          const offsetBottom = offsetTop + ref.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 滚动到指定区域
  const scrollToSection = (sectionId: string) => {
    const ref = sectionRefs.current[sectionId];
    if (ref) {
      window.scrollTo({
        top: ref.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* 报告标题 */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-700 dark:text-blue-400">
            杭州某某科技公司 2025年上半年经营分析报告
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mt-1">
            报告期间: 2025年1月1日 - 2025年6月30日
          </p>
        </div>
      </header>
       
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 顶部导航 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 mb-8">
          <nav>
            <ul className="flex overflow-x-auto pb-2 space-x-2 md:justify-center">
              {reportSections.map((section) => (
                <li key={section.id} className="flex-shrink-0">
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "px-4 py-2 rounded-lg transition-colors whitespace-nowrap",
                      activeSection === section.id
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
         
        {/* 报告内容 */}
        <main className="flex-1 lg:max-w-3xl">
          {/* 1. 总体评价 */}
          <section 
            id="overview" 
            ref={el => sectionRefs.current.overview = el}
            className="mb-16 scroll-mt-24"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 p-2 rounded-lg mr-3">
                  <i className="fa-solid fa-chart-line"></i>
                </span>
                总体评价
              </h2>
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  2025年上半年，公司整体经营状况良好，实现营收稳步增长，盈利能力有所提升。Q2业绩表现优于Q1，
                  主要得益于云计算业务的快速增长和成本控制措施的有效实施。
                </p>
                
                <div className="h-80 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={financialData.overallPerformance}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#0088FE" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#00C49F" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#0088FE" 
                        fillOpacity={1} 
                        fill="url(#colorRevenue)" 
                        name="营收(万元)"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="profit" 
                        stroke="#00C49F" 
                        fillOpacity={1} 
                        fill="url(#colorProfit)" 
                        name="利润(万元)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl transform transition-transform hover:scale-105">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">上半年总营收</h3>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">2700万元</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      <i className="fa-solid fa-arrow-up"></i> 同比增长25%
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-xl transform transition-transform hover:scale-105">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">上半年总利润</h3>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">750万元</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      <i className="fa-solid fa-arrow-up"></i> 同比增长35%
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl transform transition-transform hover:scale-105">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">利润率</h3>
                    <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">27.8%</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      <i className="fa-solid fa-arrow-up"></i> 同比增长3.2%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* 2. 整体经营业绩 */}
          <section 
            id="performance" 
            ref={el => sectionRefs.current.performance = el}
            className="mb-16 scroll-mt-24"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
                <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-2 rounded-lg mr-3">
                  <i className="fa-solid fa-chart-bar"></i>
                </span>
                整体经营业绩
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">季度业绩对比</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={financialData.overallPerformance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" name="营收(万元)" fill="#0088FE" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="profit" name="利润(万元)" fill="#00C49F" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">业务结构占比</h3>
                  <div className="h-72 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={financialData.businessSegments}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {financialData.businessSegments.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, '占比']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">业绩亮点</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <i className="fa-solid fa-check-circle text-green-500 mt-1 mr-2"></i>
                    <span>云计算业务增长显著，Q2同比增长45%</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check-circle text-green-500 mt-1 mr-2"></i>
                    <span>利润率持续提升，从Q1的25%提升至Q2的30%</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check-circle text-green-500 mt-1 mr-2"></i>
                    <span>新客户获取成本降低12%，客户留存率提升至85%</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* 3. 核心业务分析 */}
          <section 
            id="business" 
            ref={el => sectionRefs.current.business = el}
            className="mb-16 scroll-mt-24"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 p-2 rounded-lg mr-3">
                  <i className="fa-solid fa-cubes"></i>
                </span>
                核心业务分析
              </h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">主要业务季度增长趋势</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { name: 'Q1', 软件服务: 180, 云计算: 120, 数据服务: 60 },
                      { name: 'Q2', 软件服务: 220, 云计算: 180, 数据服务: 75 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {['软件服务', '云计算', '数据服务'].map((service, index) => (
                        <Line 
                          key={service}
                          type="monotone" 
                          dataKey={service} 
                          name={`${service}(百万元)`}
                          stroke={COLORS[index % COLORS.length]} 
                          strokeWidth={2}
                          dot={{ r: 6 }}
                          activeDot={{ r: 8 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mb-3">
                    <i className="fa-solid fa-code text-blue-600 dark:text-blue-400"></i>
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">软件服务</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">核心业务收入稳定增长，市场份额保持领先</p>
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <i className="fa-solid fa-arrow-up mr-1"></i> 增长12.5%
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mb-3">
                    <i className="fa-solid fa-cloud text-purple-600 dark:text-purple-400"></i>
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">云计算</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">增长最快的业务板块，新签多个大客户</p>
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <i className="fa-solid fa-arrow-up mr-1"></i> 增长50%
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mb-3">
                    <i className="fa-solid fa-database text-green-600 dark:text-green-400"></i>
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">数据服务</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">新兴业务，增长潜力大，客户需求持续增加</p>
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <i className="fa-solid fa-arrow-up mr-1"></i> 增长25%
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* 4. 运营效率与成本控制 */}
          <section 
            id="efficiency" 
            ref={el => sectionRefs.current.efficiency = el}
            className="mb-16 scroll-mt-24"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
                <span className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 p-2 rounded-lg mr-3">
                  <i className="fa-solid fa-cog"></i>
                </span>
                运营效率与成本控制
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">人均效能分析</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={financialData.operationalEfficiency}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#0088FE" />
                        <YAxis yAxisId="right" orientation="right" stroke="#FF8042" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="revenuePerEmp" name="人均营收(万元)" fill="#0088FE" radius={[4, 4, 0, 0]} />
                        <Bar yAxisId="right" dataKey="employee" name="员工数量" fill="#FF8042" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">成本结构分析</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={financialData.overallPerformance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#FF8042" />
                        <YAxis yAxisId="right" orientation="right" stroke="#8884d8" />
                        <Tooltip />
                        <Legend />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="expenses" 
                          name="支出(万元)"
                          stroke="#FF8042" 
                          strokeWidth={2}
                          dot={{ r: 6 }}
                          activeDot={{ r: 8 }}
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="costRatio" 
                          name="成本收入比"
                          stroke="#8884d8" 
                          strokeWidth={2}
                          dot={{ r: 6 }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">效率提升措施</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start"><i className="fa-solid fa-check text-blue-600 dark:text-blue-400 mt-1 mr-2"></i>
                      <span>实施数字化办公系统，提升协作效率</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fa-solid fa-check text-blue-600 dark:text-blue-400 mt-1 mr-2"></i>
                      <span>优化业务流程，减少中间环节，缩短项目周期</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fa-solid fa-check text-blue-600 dark:text-blue-400 mt-1 mr-2"></i>
                      <span>引入自动化工具，减少重复性工作</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">成本控制重点</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <i className="fa-solid fa-check text-orange-600 dark:text-orange-400 mt-1 mr-2"></i>
                      <span>优化营销费用结构，提高投入产出比</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fa-solid fa-check text-orange-600 dark:text-orange-400 mt-1 mr-2"></i>
                      <span>推行远程办公，降低办公场地成本</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fa-solid fa-check text-orange-600 dark:text-orange-400 mt-1 mr-2"></i>
                      <span>供应商整合，获取更优采购价格</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* 5. 财务状况 */}
          <section 
            id="financial" 
            ref={el => sectionRefs.current.financial = el}
            className="mb-16 scroll-mt-24"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
                <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-2 rounded-lg mr-3">
                  <i className="fa-solid fa-wallet"></i>
                </span>
                财务状况
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">资产结构</h3>
                  <div className="h-72 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={financialData.financialHealth}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {financialData.financialHealth.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}万元`, '金额']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">财务指标</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">流动比率</span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">2.3</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">资产负债率</span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">35%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">毛利率</span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">42%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">净利率</span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">27.8%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-indigo-500 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '27.8%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">应收账款周转率</span>
                        <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">4.2次/年</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">财务健康状况总结</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      公司整体财务状况良好，资产结构合理，偿债能力较强，盈利能力稳定。
                      现金流充足，为后续业务发展提供了有力支持。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
           {/* 报告日期 */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              <i className="fa-solid fa-file-signature mr-2"></i>
              报告日期: 2025年7月15日
            </p>
          </div>
         </main>
        
        {/* 右侧问题与建议 */}
        <aside className="lg:w-80 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border-l-4 border-red-500">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                <i className="fa-solid fa-exclamation-triangle text-red-500 mr-2"></i>
                存在问题
              </h2>
              
              <ul className="space-y-4">
                {financialData.issues.map((issue, index) => (
                  <li key={index} className="flex">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-red-600 dark:text-red-400 text-sm font-medium">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{issue}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border-l-4 border-blue-500">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                <i className="fa-solid fa-lightbulb text-blue-500 mr-2"></i>
                改进建议
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <i className="fa-solid fa-arrow-up text-green-500 mr-2"></i>
                    两增策略
                  </h3>
                  <ul className="space-y-2 ml-6">
                    {financialData.suggestions.increases.map((item, index) => (
                      <li key={`increase-${index}`} className="flex items-start text-gray-700 dark:text-gray-300">
                         <i className="fa-solid fa-plus-circle text-green-500 mt-1 mr-2"></i>
                         {item}
                       </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <i className="fa-solid fa-arrow-down text-red-500 mr-2"></i>
                    两降策略
                  </h3>
                  <ul className="space-y-2 ml-6">
                    {financialData.suggestions.decreases.map((item, index) => (
                      <li key={`decrease-${index}`} className="flex items-start text-gray-700 dark:text-gray-300">
                        <i className="fa-solid fa-minus-circle text-red-500 mt-1 mr-2"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </aside>
       </div>
      </div>
      
      {/* 页脚 */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>杭州某某科技公司 © 2025 版权所有</p>
        </div>
      </footer>
    </div>
  );
}