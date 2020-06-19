// dbのインポート
import { db } from '../lib/db';
import React from 'react'

class List extends React.Component {
    static async getInitialProps() {
        // db.jsのfirebaseのDB接続ファンクション
        // DBのpostsコレクション内を全て取得した結果 = result
        let result = await new Promise((resolve, reject) => {
            db.collection('results')
                .get()
                .then(snapshot => {
                    let data = []
                    snapshot.forEach((doc) => {
                        data.push(
                            Object.assign({
                                id: doc.id
                            }, doc.data())
                        )
                    })
                    console.log(data)
                    resolve(data)
                }).catch(error => {
                    reject([])
                })
        })
        return { results: result }
    }

    handleDelete = (id) => {
        db.collection('results')
            .doc(id)
            .delete()
            .then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
    }

    render() {
        const results = this.props.results;
        return (
            <React.Fragment>
                {results.map(result =>
                    <div className="result" key={result.id}>
                        <h2>
                            {result.user_name}
                        </h2>
                        <div>
                            回答数{result.answered_count}
                        </div>
                        <div>
                            タイプ回数{result.type_count}
                        </div>
                        <div>
                            ミスタイプ{result.typo_count}
                        </div>
                        <button onClick={this.handleDelete.bind(this, result.id)}>削除</button>
                    </div>
                )}
            </React.Fragment>
        );
    }
}
export default List