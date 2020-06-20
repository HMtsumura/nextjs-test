import App from '../components/App'
import { Radar } from 'react-chartjs-2'
import { db } from '../lib/db';
import { firebase } from "../firebase";

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
    const user = firebase.auth().currentUser;
    async function registerPost(event, answeredCount, typoCount, typeCount) {
        event.preventDefault();
        db.collection("results").add({
            user_name: user.displayName,
            answered_count: answeredCount,
            type_count: typeCount,
            typo_count: typoCount,
        })
            .then(function () {
                alert("Document successfully written!");
            })
            .catch(function (error) {
                alert("Error writing document: ", error);
            });
    }
    data.datasets[0].data = [typeCount, 30 - typoCount, answeredCount];
    return (
        <App>
            <p>You got this in 1 min</p>
            <p>Got {answeredCount} Words</p>
            <p>Typed {typeCount} Times</p>
            <p>Misstyped {typoCount} times</p>
            <Radar data={data} />
            <button onClick={(e) => registerPost(e, answeredCount, typoCount, typeCount)}>ランキング登録</button>
            <button><a href="/test">もう一回</a></button>
        </App>
    )
}
