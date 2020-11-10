import React, {useState,useEffect} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip} from 'recharts';

const moo = [{date: '10/11', requests: 12},
{date: '10/12', requests: 15},
{date: '10/13', requests: 4},
{date: '10/14', requests: 6},
{date: '10/15', requests: 1},
{date: '10/16', requests: 0},
{date: '10/17', requests: 20}];


export default function Chart() {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() =>{
    fetch('/api/chart/requestsbydays')
      .then(res => res.json())
      .then(data => {
          setPoints(data);
        })
      .then(() => setLoading(false));
  },[])
  return (
    <div style ={{
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
    }}>
        <p># of Requests</p>
        {!loading && <LineChart  width={600} height={300} data={points}>
            <Line type="monotone" dataKey="Requests" stroke="#fac420" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
        </LineChart>}
    </div>
  );
}