import App from '../components/App'
import Router from 'next/router'
import axios from 'axios';
import withAuth from '../helpers/withAuth';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: "",
            answeredCount: 0,
            typoCount: 0,
            typeCount: 0,
            time: 10,
            inputDisbaled: false
        };
    }

    keyDown(e) {
        //グローバルかどこかで定義する
        const keycode = { 65: 'a', 66: 'b', 67: 'c', 68: 'd', 69: 'e', 70: 'f', 71: 'g', 72: 'h', 73: 'i', 74: 'j', 75: 'k', 76: 'l', 77: 'm', 78: 'n', 79: 'o', 80: 'p', 81: 'q', 82: 'r', 83: 's', 84: 't', 85: 'u', 86: 'v', 87: 'w', 88: 'x', 89: 'y', 90: 'z' };

        //一文字ずつ確認していって、一致したら次の文字に進むようにする。
        //一致しない場合はずっとそのまま、wrongTypingCountを+1していく
        //1単語分タイピングできたらtypedCountを+1
        //単語の回答が終わった場合はもう一度APIを叩く
        if (keycode[e.keyCode] !== this.state.word[0]) {
            e.preventDefault();
            this.setState({
                typoCount: this.state.typoCount + 1,
                typeCount: this.state.typeCount + 1
            });
        } else {
            //1文字ずつ減らしていく
            this.setState({
                word: this.state.word.slice(1),
                typeCount: this.state.typeCount + 1
            })
            console.log(this.state.word);
        }
        //原因不明だがword.lengthが0になるのは、全部おわった次の週
        if (this.state.word.length === 1) {
            //文字がなくなった後に複数回inputすると何回もkeyDownが実行されるのを防止するため
            //入力を禁止する。
            this.setState({ inputDisbaled: true });
            const server = '//random-word-api.herokuapp.com/word?number=1';
            axios.get(server)
                .then((res) => {
                    console.log(res.data[0]);
                    this.refs['text-cell'].value = '';
                    this.setState({ word: res.data[0], answeredCount: this.state.answeredCount + 1, inputDisbaled: false });
                    this.refs['text-cell'].focus();
                    console.log(this.state.word);
                })
                .catch(console.error);
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.countDownNumber(),
            1000
        );
        //inputが選択された状態にする
        this.refs['text-cell'].focus();
        //wordにAPIで取得してきた値を取得する
        const server = '//random-word-api.herokuapp.com/word?number=1';
        axios.get(server)
            .then((res) => {
                console.log(res.data[0]);
                this.setState({ word: res.data[0] });
                console.log(this.state.word);
            })
            .catch(console.error);

    };

    countDownNumber() {
        if (this.state.time > 0) {
            this.setState({
                time: this.state.time - 1
            });
        } else {

            clearInterval(this.timerID);
            this.state.inputDisbaled = true;
            //countが0になったら別のページにとばす
            //queryの中に、正解した問題数と、ミスタイプの数を渡す
            Router.push({
                pathname: '/result',
                query: {
                    answeredCount: this.state.answeredCount,
                    typoCount: this.state.typoCount,
                    typeCount: this.state.typeCount
                }
            });
        }
    }

    render() {
        var style = {
            color: "red",
            // fontSize: '40px',
            display: "inline-block",
            _display: "inline"
        };
        return (
            <App>
                <div>残り時間:{this.state.time}</div>
                <div>正解数:{this.state.answeredCount}</div>
                <div>ミスタイプ:{this.state.typoCount}</div>
                <div className="word" style={style}>{this.state.word[0]}</div>
                {this.state.word.substring(1)}
                <div>
                    <input disabled={this.state.inputDisbaled} ref="text-cell" onKeyDown={(e) => this.keyDown(e)}></input>
                </div>
            </App>
        )
    }
}

export default withAuth(Test);
