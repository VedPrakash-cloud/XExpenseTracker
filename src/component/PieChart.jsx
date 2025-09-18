import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function PieData({expenseList}){
    const COLORS = ["#A000FF", "#FF9304", "#FDE006", "#0088FE"];

    const categoryTotals = expenseList.reduce((acc,expense)=>{
        acc[expense.category]= (acc[expense.category] || 0)+ expense.amount;
        return acc;
    },{});

    const chartData = Object.entries(categoryTotals).map(([name,value])=>({
        name,
        value,
    }));

    const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) / 2; // middle of slice
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x >cx ? "start": "end"}
        dominantBaseline="central"
        fontSize={16}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

    if(!expenseList?.length){
        return(
            <div className="w-full flex items-center justify-center">
                No Transaction!
            </div>
        )
    }
    
    return(
        <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height={250}>
                <PieChart width={400} height={400}>
                    <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    dataKey='value'
                    label={renderLabel}>
                        {chartData.map((_, index)=>(
                            <Cell 
                            key={`cell-${index}`}
                            fill={COLORS[index%COLORS.length]}/>
                        ))}
                    </Pie>
                    <Legend iconType="rect" verticalAlign="bottom" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}