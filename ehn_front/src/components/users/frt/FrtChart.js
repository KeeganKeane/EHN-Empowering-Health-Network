import React, { useState, useCallback } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const FrtChart = (props) => {

  const { pieData } = props;
  let denominator = 0;
  for(let i=0;i < pieData.length; i++) {
    denominator += pieData[i].value;
  }



  const [opacity, setOpacity] = useState({
    noTastesCount: 1.0,
    tastesDifferentCount: 1.0,
    tastesSameCount: 1.0,
    tastesWorseCount: 1.0
  });


  const CustomTooltip = ({ active, payload}) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip font-bold"
             style={{ backgroundColor : "#FFFFFF"}}>
          {`${Math.round(payload[0].value*100 / denominator)}%`} of people said that it {`${payload[0].name}`}
        </div>
      );
    }
  
    return null;
  };
  

  const handleMouseMoveLegend = useCallback(
    (o) => {
      const { value } = o;
      let newOpacity = {}

      for(let i=0;i<pieData.length;i++){
        if (value===pieData[i].name) {
          newOpacity[pieData[i].name] = 1.0;
        }else {
          newOpacity[pieData[i].name] = 0.3;
        }
      }
      setOpacity(newOpacity);
    },
    [opacity, setOpacity]
  );

  const handleMouseLeaveLegend = useCallback(
    (o) => {
      const { value } = o;
      setOpacity({     
        noTastesCount: 1.0,
        tastesDifferentCount: 1.0,
        tastesSameCount: 1.0,
        tastesWorseCount: 1.0});
    },
    [opacity, setOpacity]
  );
  
  return (
    <ResponsiveContainer width={100}
                         height={100}>
      <PieChart width={100}
                height={100} >
        <Pie data={pieData}
             cx="50%"
             cy="50%"
             innerRadius={20}
             outerRadius={30}
             dataName="name"
             dataKey="value"
             label={false}
             labelLine={false}
             isAnimationActive={false}>
          {pieData.map((entry, index) => {
            return (
              <Cell key={`cell-${entry.name}`}
                    fill={entry.color}
                    fillOpacity={opacity[entry.name]} />
            )
          })}
        </Pie>
        <Tooltip content={CustomTooltip} />
      </PieChart>
    </ResponsiveContainer>
  )

}

export default FrtChart;