import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip} from 'recharts';

const data = [{date: '10/11', requests: 12},
{date: '10/12', requests: 15},
{date: '10/13', requests: 4},
{date: '10/14', requests: 6},
{date: '10/15', requests: 1},
{date: '10/16', requests: 0},
{date: '10/17', requests: 20}];


export default function Chart() {

  return (
    <div style ={{
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
    }}>
        <p># of Requests</p>
        <LineChart  width={600} height={300} data={data}>
            
            <Line type="monotone" dataKey="requests" stroke="#fac420" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
        </LineChart>
    </div>
  );
}