import { db } from '../lib/db';
import React from 'react';

 class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            answeredCount:0,
            typoCount:0,
            typeCount:0
        };
    }
    registerPost = async (evt) => {
        evt.preventDefault();
        db.collection("results").add({
            user_name: this.state.userName,
            answered_count: this.state.answeredCount,
            type_count: this.state.typeCount,
            typo_count: this.state.typoCount,
        })
        .then(function() {
            alert("Document successfully written!");
        })
        .catch(function(error) {
            alert("Error writing document: ", error);
        });
    }
    onChangeUserName = (evt) => {
        this.setState({ userName: evt.target.value });
    }
     onChangeAnsweredCount = (evt) => {
        this.setState({ answeredCount: evt.target.value });
    }
    onChangeTypoCount = (evt) => {
        this.setState({ typoCount: evt.target.value });
    }
     onChangeTypeCount = (evt) => {
        this.setState({ typeCount: evt.target.value });
    }
     render() {
        return (
            <div className="post-forms">
                <form onSubmit={this.registerPost}>
                    <label htmlFor="user-name">ユーザー名</label><br/>
                    <input name="user-name" value={this.state.title} onChange={this.onChangeUserName} /><br/>
                    <label htmlFor="answer">回答数</label><br/>
                    <input name="answer" value={this.state.body} onChange={this.onChangeAnsweredCount}/><br/>
                    <label htmlFor="type">タイプ回数</label><br/>
                    <input name="type" value={this.state.title} onChange={this.onChangeTypeCount} /><br/>
                    <label htmlFor="typo">ミス入力回数</label><br/>
                    <input name="typo" value={this.state.body} onChange={this.onChangeTypoCount}/><br/>
                    <button type="submit">投稿</button>
                </form>
                <style jsx>{`
                .post-forms {
                    width: 80%;
                    height: 50%;
                    margin: 0 auto;
                }
                input, textarea {
                    width: 70%;
                }
                textarea {
                    height: 100px;
                }
            `}</style>
            </div>
        )
    }
}
 export default CreatePost;