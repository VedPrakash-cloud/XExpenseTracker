import {BarChart, XAxis, YAxis, ResponsiveContainer, Bar} from 'recharts'

export default function BarData({expenseList}){
    return (
        <div>
            <h2 className='text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-5'>Top Expenses</h2>
            <div className='border bg-white rounded-xl w-full'>
                {expenseList?.length ?(
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart
                        data={expenseList}
                        layout='vertical'
                        >
                            <XAxis type='number' axisLine={false} display="none" />
                            <YAxis type='category' width="100%" dataKey="name" axisLine={false} />
                            <Bar dataKey="value" fill="#0088FE" barSize={25}/>
                        </BarChart>
                    </ResponsiveContainer>
                ):(
                    <div className='bg-white w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-xl flex items-center justify-center'>
                        No transactions!
                    </div>
                )}
            </div>
        </div>
    )
}