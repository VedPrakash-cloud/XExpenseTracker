import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function PieData({expenseList}){
    const COLORS = ["#A000FF", "#FF9304", "#FDE006"];

    const categoryTotals = expenseList.reduce((acc,expenses)=>{
        acc[expenses.category]= (acc[expenses.category] || 0)+ expenses.amount;
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
            <div className="w-full flex items-center justify-center h-[250px]">
                No transactions!
            </div>
        )
    }
    
    return(
        <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius="70%"
                    dataKey='value'
                    label={renderLabel}
                    >
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