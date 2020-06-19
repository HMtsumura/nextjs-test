import App from '../components/App'
import { Radar } from 'react-chartjs-2'

const data = {
  labels: ['Speed', 'Accuracy', 'Something'],
  datasets: [
    {
      label: 'Type Skill',
      backgroundColor: 'rgba(117,255,214,0.2)',
      borderColor: 'rgba(117,255,214,1)',
      pointBackgroundColor: 'rgba(117,255,214,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(117,255,214,1)',
      data: []
    }
  ]
};


export default function Result({ url: { query: { answeredCount, typoCount, typeCount } } }) {
  data.datasets[0].data = [typeCount,30-typoCount,answeredCount];
  return (
    <App>
      <p>You got this in 1 min</p>
      <p>Got {answeredCount} Words</p>
      <p>Typed {typeCount} Times</p>
      <p>Misstyped {typoCount} times</p>
      <Radar data={data} />
    </App>
  )
}
